import {
   VBoxModel
} from '@jupyter-widgets/controls';

import {
  EXTENSION_SPEC_VERSION
} from './version';

const MODULE_NAME = 'sidepanel';

export
class SidePanelModel2 extends VBoxModel {
  rendered: boolean;

  defaults() {
    return {...super.defaults(),
      _model_name: SidePanelModel2.model_name,
      _model_module: SidePanelModel2.model_module,
      _model_module_version: SidePanelModel2.model_module_version,

      _view_name: SidePanelModel2.view_name,
      _view_module: SidePanelModel2.view_module,
      _view_module_version: SidePanelModel2.view_module_version,
      title: 'SidePanel',
      side: 'split-right',
      ref: null
    };
  }

  initialize(attributes: any, options: { model_id: string; comm?: any; widget_manager: any }): void {
    super.initialize(attributes, options);
    this.widget_manager.display_model(undefined, this, {});
  }

  static model_name = 'SidePanelModel2';
  static model_module = MODULE_NAME;
  static model_module_version = EXTENSION_SPEC_VERSION;

  static view_name = 'SidePanel2';
  static view_module = MODULE_NAME;
  static view_module_version = EXTENSION_SPEC_VERSION;
}
