# Sidepanel

A widget that provides a fancy vbox in a separate windown in JupyterLab 

## Installation

```bash
jupyter labextension install @jupyter-widgets/jupyterlab-manager  # if not installed already
pip install @regulus/sidepanel
jupyter labextension install @regulus/sidepanel
```

For development
```bash
./dev-install.sh
```

## Usage

```python
from sidepanel import SidePanel
from ipywidgets import IntSlider

panel = SidePanel(title='Sidepanel')
sl = IntSlider(description='Some slider')
panel.add(sl)
```


<!-- ![sidecar](sidepanel.gif) -->
