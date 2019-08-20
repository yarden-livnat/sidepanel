#!/usr/bin/env python
# coding: utf-8

from .sideoutput import SideOutput
from .sidepanel import SidePanel
from .sidepanel2 import SidePanel2
from .sidepanel3 import SidePanel3
from ._version import __version__, version_info


registry = dict()


def sidepanel(name, clear=True, **kwargs):
    if name not in registry:
        if 'title' not in kwargs:
            kwargs['title'] = name
        registry[name] = SidePanel(**kwargs)
    panel = registry[name]
    if clear:
        panel.clear_output()
    return panel


def find(name):
    if name in registry:
        return registry[name]
    return None
