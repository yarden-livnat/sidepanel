import {JupyterLab} from "@jupyterlab/application";
import {MainAreaWidget} from '@jupyterlab/apputils';

import {BoxModel, VBoxView} from '@jupyter-widgets/controls';
// import {output} from "@jupyter-widgets/jupyterlab-manager";

import {find} from '@phosphor/algorithm';
import {UUID} from '@phosphor/coreutils';
// import {Panel, Widget} from '@phosphor/widgets';

import {EXTENSION_SPEC_VERSION} from "./version";

import '../css/SidePanel.css';
const MODULE_NAME = 'sidepanel';

export class SidePanelModel extends BoxModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: 'SidePanelModel',
      _model_module: MODULE_NAME,
      _model_module_version: EXTENSION_SPEC_VERSION,

      _view_name: 'SidePanel',
      _view_module: MODULE_NAME,
      _view_module_version: EXTENSION_SPEC_VERSION,

      title: 'SidePanel',
      side: 'split-right',
      ref: null,

      _headers: [],
      _open: [],
      _expand: []
    }
  }

  initialize(attributes: any, options: any) {
    super.initialize(attributes, options);
    this.widget_manager.display_model(undefined, this, {});
  }

  static serializers: any = {
    ...BoxModel.serializers,
  };
}

export class SidePanel extends VBoxView {
  constructor(options: any) {
    super(options);
    this.app = options.app;
  }

  initialize(parameters: any) {
    super.initialize(parameters);
    this.listenTo(this.model, 'change:_headers', () => this.update_headers());
    this.listenTo(this.model, 'change:_open', () => this.update_open);
    this.listenTo(this.model, 'change:_expand', () => this.update_expand());

   this.pWidget.addClass('sidepanel');
  }

  /**
   * Called when view is rendered.
   */
  render() {
    console.log('new SidePanel');
    super.render();

    let w = new MainAreaWidget({content: this.pWidget});
    w.id = `SidePanel-${UUID.uuid4()}`;
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


  update_headers() {
  }

  update_open() {
  }

  update_expand() {
  }

  remove() {
    console.log('SidePanel removed');
    super.remove();
  }

  app: JupyterLab;
}


// We implement our own tab widget since Phoshpor's TabPanel uses an absolute
// positioning BoxLayout, but we want a more an html/css-based Panel layout.

// export class JupyterPhosphorTabPanelWidget extends TabPanel {
//   constructor(options: JupyterPhosphorWidget.IOptions & TabPanel.IOptions) {
//     let view = options.view;
//     delete options.view;
//     super(options);
//     this._view = view;
//     // We want the view's messages to be the messages the tabContents panel
//     // gets.
//     MessageLoop.installMessageHook(this.tabContents, (handler, msg) => {
//       // There may be times when we want the view's handler to be called
//       // *after* the message has been processed by the widget, in which
//       // case we'll need to revisit using a message hook.
//       this._view.processPhosphorMessage(msg);
//       return true;
//     });
//   }
//
//   /**
//    * Dispose the widget.
//    *
//    * This causes the view to be destroyed as well with 'remove'
//    */
//   dispose() {
//     if (this.isDisposed) {
//       return;
//     }
//     super.dispose();
//     if (this._view) {
//       this._view.remove();
//     }
//     this._view = null;
//   }
//
//   private _view: DOMWidgetView;
// }