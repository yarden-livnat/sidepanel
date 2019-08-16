// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { JupyterFrontEnd, JupyterFrontEndPlugin } from '@jupyterlab/application';
import { IJupyterWidgetRegistry } from '@jupyter-widgets/base';

import { SidePanelModel } from './SidePanelModel';
import { SidePanel } from './SidePanel';
import { SidePanelModel2 } from './SidePanelModel2';
import { SidePanel2 } from './SidePanel2';
import { SidePanel3, SidePanelModel3 } from './SidePanel3';

import { EXTENSION_SPEC_VERSION } from './version';

const EXTENSION_ID = 'sidepanel';


function activate(app: JupyterFrontEnd, registry: IJupyterWidgetRegistry): void {
  let AppSidePanel = class extends SidePanel {
    constructor(options: any) {
      console.log('activate sidepanel. options=', options);
      super({app, ...options});
    }
  };

   let AppSidePanel2 = class extends SidePanel2 {
    constructor(options: any) {
      console.log('activate sidepanel2. options=', options);
      super({app, ...options});
    }
  };

   let AppSidePanel3 = class extends SidePanel3 {
    constructor(options: any) {
      console.log('activate sidepanel3. options=', options);
      super({app, ...options});
    }
  };

  registry.registerWidget({
    name: EXTENSION_ID,
    version: EXTENSION_SPEC_VERSION,
    exports: {
      SidePanelModel: SidePanelModel,
      SidePanel: AppSidePanel,
      SidePanelModel2: SidePanelModel2,
      SidePanel2: AppSidePanel2,
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
