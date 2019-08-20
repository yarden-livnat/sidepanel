import * as $ from 'jquery';

import {JupyterLab} from "@jupyterlab/application";
import {MainAreaWidget} from '@jupyterlab/apputils';
import { Panel, Widget } from '@phosphor/widgets';

import { DOMWidgetView, DOMWidgetModel , unpack_models} from '@jupyter-widgets/base';
import { output } from '@jupyter-widgets/jupyterlab-manager';

import {find} from '@phosphor/algorithm';
// import {Message, MessageLoop} from '@phosphor/messaging';
import {UUID} from '@phosphor/coreutils';
// import {Panel} from '@phosphor/widgets';

import '../css/SidePanel.css';
import {EXTENSION_SPEC_VERSION} from "./version";
import {Message, MessageLoop} from "@phosphor/messaging";


const MODULE_NAME = 'sidepanel';

export class SidePanelModel3 extends DOMWidgetModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: 'SidePanelModel3',
      _model_module: MODULE_NAME,
      _model_module_version: EXTENSION_SPEC_VERSION,

      _view_name: 'SidePanel3',
      _view_module: MODULE_NAME,
      _view_module_version: EXTENSION_SPEC_VERSION,

      title: 'SidePanel',
      side: 'split-right',
      ref: null,
      child: null
    }
  }

  initialize(attributes: any, options: { model_id: string; comm?: any; widget_manager: any }): void {
    super.initialize(attributes, options);
    this.widget_manager.display_model(undefined, this, {});

  }

  static serializers = {
    ...DOMWidgetModel.serializers,
    child: {deserialize: unpack_models}
  };
}

export class SidePanel3 extends DOMWidgetView {
  constructor(options: any) {
    super(options);
    this.app = options.app;
  }

  _createElement(tagName: string) {
        this.pWidget = new output.JupyterPhosphorPanelWidget({ view: this });
        return this.pWidget.node;
    }

  _setElement(el: HTMLElement) {
      if (this.el || el !== this.pWidget.node) {
          // Boxes don't allow setting the element beyond the initial creation.
          throw new Error('Cannot reset the DOM element.');
      }

      this.el = this.pWidget.node;
      this.$el = $(this.pWidget.node);
  }

  initialize(parameters: any): void {
    super.initialize(parameters);
    this.listenTo(this.model, 'change:child', this.update_child);
    this.pWidget.addClass('jupyter-widgets');
    this.pWidget.addClass('widget-container');
    this.pWidget.addClass('sidepanel');
  }

  render() {
    console.log('render', this);
    super.render();
    this.update();
    this.update_child();
    console.log(`model: cid= ${this.model.cid} model_id=${this.model.model_id} title=${this.model.attributes.title}` );

    let w = new MainAreaWidget({content: this.pWidget});
    w.id = `SidePanel3-${UUID.uuid4()}`;
    w.title.label = this.model.get('title') || '';
    w.title.closable = true;

    let shell = this.app.shell;

    let ref_id: any = null;
    let label = this.model.get('ref');
    if (label) {
      let ref = find(shell.widgets('main'), w => w.title.label == label);
      if (ref) ref_id = ref.id;
    }
    shell.add(w, 'main', {mode: this.model.get('side'), ref: ref_id});


  }

  update_child() {
    if (this.view) {
      this.view.remove();
    }
    // let current = this.pWidget.widgets;
    // if (current.length > 0) {
    //   current[0].dispose();
    // }
    let that = this;
    this.create_child_view(this.model.get('child')).then( (view:DOMWidgetView) => {
      console.log('check:', this, that);
      console.log('update_child', view, this.pWidget);
      this.view = view;
      this.pWidget.insertWidget(0, view.pWidget);
      MessageLoop.postMessage(view.pWidget, Widget.ResizeMessage.UnknownSize);
      MessageLoop.postMessage(this.pWidget, Widget.ResizeMessage.UnknownSize);
    });
  }

  refresh(model: any, args: any) {
    console.log('sidepanel3.referesh', model, args);
    MessageLoop.postMessage(this.pWidget, new Message('resize'));
  }

  remove() {
    console.log('sidepanel3 removed');
    if (this.view) {
      this.view.remove();
      this.view = null;
    }
    // this.pWidget.dispose();
    return super.remove();
  }

  dispose():void {
    console.log('SidePanel3 dispose');
  }

  app: JupyterLab;
  // model: SidePanelModel3;
  view: DOMWidgetView;
  pWidget: Panel;
}