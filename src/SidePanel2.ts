import * as $ from 'jquery';

import { JupyterLab } from "@jupyterlab/application";
import { MainAreaWidget } from '@jupyterlab/apputils';
import { IOutputAreaModel, SimplifiedOutputArea } from '@jupyterlab/outputarea';

import { DOMWidgetView } from '@jupyter-widgets/base';
import { OutputView } from "@jupyter-widgets/output";

import { find } from '@phosphor/algorithm';
import { Message, MessageLoop } from '@phosphor/messaging';
import { UUID } from '@phosphor/coreutils';
import { Panel } from '@phosphor/widgets';

import {SidePanelModel} from "./SidePanelModel";


export
class SidePanel extends OutputView {
  constructor(options: any) {
    console.log('SidePanel2', options);
    super(options);
    this.app = options.app;
  }

  _createElement(tagName: string):any {
    console.log('create element', tagName);
    this.pWidget = new SidePanelOutputArea({ view: this });
    return this.pWidget.node;
  }

  _setElement(el: HTMLElement) {
    console.log('set element', el);
    if (this.el || el !== this.pWidget.node) {
          // Boxes don't allow setting the element beyond the initial creation.
          throw new Error('Cannot reset the DOM element.');
      }

      this.el = this.pWidget.node;
      this.$el = $(this.pWidget.node);
  }

 render() {
    console.log('sidepanel 2: render()');
    super.render();
    this.outputArea = new SimplifiedOutputArea({
      rendermime: this.model.widget_manager.rendermime,
      contentFactory: SimplifiedOutputArea.defaultContentFactory,
      model: this.model.outputs
    });
    this.update();
    let shell = this.app.shell;
    let w = new MainAreaWidget({content: this.outputArea});
    w.id = `SidePanel-${UUID.uuid4()}`;
    w.title.label = this.model.get('title') || 'no title';
    w.title.closable = true;
    this.outputArea.model.changed.connect(this.refresh, this);
    let label = this.model.get('ref');

    let ref_id:any = null;
    if (label) {
      let ref = find(shell.widgets('main'), w => w.title.label == label);
      if (ref) ref_id = ref.id;
    }
    console.log('render: label=', label, ref_id);
    shell.add(w, 'main', {mode : this.model.get('side'), ref:ref_id});
 }

  refresh(model:IOutputAreaModel, args:IOutputAreaModel.ChangedArgs)  {
    console.log('sidepanel.referesh', model, args);
    MessageLoop.postMessage(this.outputArea, new Message('resize'));
  }

 remove() {
    this.outputArea.dispose();
    return super.remove();
 }

  app: JupyterLab;
  model: SidePanelModel;
  pWidget: Panel;
  outputArea: SimplifiedOutputArea;
}

class SidePanelOutputArea extends Panel {
  constructor(options:any) {
    let view = options.view;
    delete options.view;
    super(options);
    this._view = view;
  }

  processMessage(msg: Message) {
      super.processMessage(msg);
      this._view.processPhosphorMessage(msg);
  }

  dispose() {
    if (this.isDisposed) {
        return;
    }
    super.dispose();
    if (this._view) {
        this._view.remove();
    }
    this._view = null;
  }

    private _view: DOMWidgetView;
}