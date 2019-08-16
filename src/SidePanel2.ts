import {JupyterLab} from "@jupyterlab/application";
import {MainAreaWidget} from '@jupyterlab/apputils';

// import { Widget } from '@jupyter-widgets/base';
import { VBoxView } from '@jupyter-widgets/controls';

import {find} from '@phosphor/algorithm';
// import {Message, MessageLoop} from '@phosphor/messaging';
import {UUID} from '@phosphor/coreutils';
// import {Panel} from '@phosphor/widgets';

// import {SidePanelModel} from "./SidePanelModel";
import '../css/SidePanel.css';

export class SidePanel2 extends VBoxView {
  constructor(options: any) {
    // console.log('SidePanel2', options);
    super(options);
    this.app = options.app;
  }


  render() {
    super.render();

    // this.pWidget.insertWidget(0, this.outputArea);
    // this.pWidget.addClass('jupyter-widgets');
    // this.pWidget.addClass('widget-output');
    // this.update();
    //
    // this.outputArea.addClass('sidepanel');
    // this.outputArea.addClass('jp-LinkedOutputView');

    let shell = this.app.shell;
    let w = new MainAreaWidget({content: this.pWidget});
    w.id = `SidePanel-${UUID.uuid4()}`;
    w.title.label = this.model.get('title') || '';
    w.title.closable = true;

    let ref_id: any = null;
    let label = this.model.get('ref');
    if (label) {
      let ref = find(shell.widgets('main'), (w:any) => w.title.label == label);
      if (ref) ref_id = ref.id;
    }
    shell.add(w, 'main', {mode: this.model.get('side'), ref: ref_id});
  }


  app: JupyterLab;
  // model: SidePanelModel;
  // pWidget: JupyterPhosphorPanelWidget;
}