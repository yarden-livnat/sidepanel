import {
  find
} from '@phosphor/algorithm';

import {
   Message, MessageLoop
} from '@phosphor/messaging';

import {
  JupyterLab
} from '@jupyterlab/application';

import {
    UUID
} from '@phosphor/coreutils';

import {
  IOutputAreaModel
} from '@jupyterlab/outputarea';

import {
  SimplifiedOutputView
} from './SimplifiedOutput';

import {
  SidePanelModel
} from './SidePanelModel';

import './SidePanel.css';

export
class SidePanel extends SimplifiedOutputView {
  app: JupyterLab;
  model: SidePanelModel;

  constructor(options: any) {
    super(options);
    this.app = options.app;
  }

  refresh(model:IOutputAreaModel, args:IOutputAreaModel.ChangedArgs)  {
    MessageLoop.postMessage(this._outputView, new Message('resize'));
  }

  render() {
    if (!this.model.rendered) {
      super.render();
      let w = this._outputView;
      w.addClass('rg_sidepanel');
      w.addClass('jp-LinkedOutputView');
      w.title.label = this.model.get('title');
      w.title.closable = true;
      w.id = UUID.uuid4();
      w.model.changed.connect(this.refresh, this);
      if (Object.keys(this.model.views).length > 1) {
        w.node.style.display = 'none';
        let key = Object.keys(this.model.views)[0];
        this.model.views[key].then((v: SimplifiedOutputView) => {
          v._outputView.activate();
        });
      } else {
        let { shell } = this.app;
        let label = this.model.get('ref');
        let ref_id:any = null;
        if (label) {
          let ref = find(shell.widgets('main'), w => w.title.label == label);
          if (ref) ref_id = ref.id;
        }
        shell.addToMainArea(w, {mode : this.model.get('side'), ref:ref_id});
        // shell.activateById(w.id);
      }
    }
  }
}
