# Sidepanel

<!-- [![Build Status](https://travis-ci.org/jupyter-widgets/jupyterlab-sidecar.svg?branch=master)](https://travis-ci.org/jupyter-widgets/jupyterlab-sidecar)
[![codecov](https://codecov.io/gh/jupyter-widgets/jupyterlab-sidecar/branch/master/graph/badge.svg)](https://codecov.io/gh/jupyter-widgets/jupyterlab-sidecar) -->

A fork of jupyterlab/Sidecar with an additional Sidepanel

## Installation

```bash
jupyter labextension install @jupyter-widgets/jupyterlab-manager  # if not installed already
pip install sidepanel
jupyter labextension install sidepanel
```

For development
```bash
./dev-install.sh
```

## Usage

The sidepanel widget is used as a context manager, just like ipywidgets' output
widget.

```python
from sidepanel import sidepanel
from ipywidgets import IntSlider

panel = sidepanel('Sidepanel')
sl = IntSlider(description='Some slider')
with panels:
    display(sl)
```


<!-- ![sidecar](sidecar.gif) -->
