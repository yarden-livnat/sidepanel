import { JupyterFrontEnd, JupyterFrontEndPlugin } from '@jupyterlab/application';
import { IJupyterWidgetRegistry } from '@jupyter-widgets/base';

import { SidePanel, SidePanelModel } from './SidePanel';
import { SideOutput, SideOutputModel } from './SideOutput';
import { SidePanel3, SidePanelModel3 } from './SidePanel3';

import { EXTENSION_SPEC_VERSION } from './version';

const EXTENSION_ID = 'sidepanel';


function activate(app: JupyterFrontEnd, registry: IJupyterWidgetRegistry): void {
  let AppSideOutput = class extends SideOutput {
    constructor(options: any) {
      super({app, ...options});
    }
  };

  let AppSidePanel = class extends SidePanel {
    constructor(options: any) {
      super({app, ...options});
    }
  };

   let AppSidePanel3 = class extends SidePanel3 {
    constructor(options: any) {
      super({app, ...options});
    }
  };

  registry.registerWidget({
    name: EXTENSION_ID,
    version: EXTENSION_SPEC_VERSION,
    exports: {
      SideOutputModel: SideOutputModel,
      SideOutput: AppSideOutput,
      SidePanelModel: SidePanelModel,
      SidePanel: AppSidePanel,
      SidePanelModel3: SidePanelModel3,
      SidePanel3: AppSidePanel3
    }
  });
}

const plugin: JupyterFrontEndPlugin<void> = {
  id: EXTENSION_ID,
  requires: [IJupyterWidgetRegistry],
  activate: activate,
  autoStart: true
};

export default  plugin;
