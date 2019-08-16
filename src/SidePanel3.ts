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
import {IOutputAreaModel} from "@jupyterlab/outputarea";
import {Message, MessageLoop} from "@phosphor/messaging";


const MODULE_NAME = 'sidepanel';

export class SidePanelModel3 extends DOMWidgetModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: SidePanelModel3.model_name,
      _model_module: SidePanelModel3.model_module,
      _model_module_version: SidePanelModel3.model_module_version,

      _view_name: SidePanelModel3.view_name,
      _view_module: SidePanelModel3.view_module,
      _view_module_version: SidePanelModel3.view_module_version,

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

  static model_name = 'SidePanelModel3';
  static model_module = MODULE_NAME;
  static model_module_version = EXTENSION_SPEC_VERSION;

  static view_name = 'SidePanel3';
  static view_module = MODULE_NAME;
  static view_module_version = EXTENSION_SPEC_VERSION;
}

export class SidePanel3 extends DOMWidgetView {
  constructor(options: any) {
    console.log('SidePanel 3', options);
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

  render() {
    super.render();
    this.pWidget.addClass('jupyter-widgets');
    this.pWidget.addClass('sidepanl');
    this.update();

    this.model.on('change:child', this.on_child_changed, this);
    this.on_child_changed();
    // this.pWidget.insertWidget(0, this.outputArea);
    // this.pWidget.addClass('jupyter-widgets');
    // this.pWidget.addClass('widget-output');
    // this.update();
    //
    // this.outputArea.addClass('sidepanel');
    // this.outputArea.addClass('jp-LinkedOutputView');

    let shell = this.app.shell;
    let w = new MainAreaWidget({content: this.pWidget});
    w.id = `SidePanel3-${UUID.uuid4()}`;
    w.title.label = this.model.get('title') || '';
    w.title.closable = true;

    let ref_id: any = null;
    let label = this.model.get('ref');
    if (label) {
      let ref = find(shell.widgets('main'), w => w.title.label == label);
      if (ref) ref_id = ref.id;
    }
    shell.add(w, 'main', {mode: this.model.get('side'), ref: ref_id});
  }

  on_child_changed() {
    console.log('on_child_changed:', this.model.get('child'));
    let child = this.model.get('child');
    let current = this.pWidget.widgets;
    if (current.length > 0) {
      current[0].dispose();
    }

    this.create_child_view(child).then( (view:DOMWidgetView) => {
      this.pWidget.insertWidget(0, view.pWidget);
      MessageLoop.postMessage(view.pWidget, Widget.ResizeMessage.UnknownSize);
    });
  }

  refresh(model: IOutputAreaModel, args: IOutputAreaModel.ChangedArgs) {
    console.log('sidepanel3.referesh', model, args);
    MessageLoop.postMessage(this.pWidget, new Message('resize'));
  }

  remove() {
    console.log('sidepanel3 removed');
    // this.outputArea.dispose();
    return super.remove();
  }

  dispose():void {
    console.log('SidePanel3 dispose');
    this.remove();
  }

  app: JupyterLab;
  model: SidePanelModel3;
  _childView: any;
  pWidget: Panel;
}