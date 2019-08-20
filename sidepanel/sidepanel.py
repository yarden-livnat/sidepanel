from ipywidgets import Box, register, Widget
from traitlets import List, Unicode
from .sidecore import SidePanelCore


@register
class SidePanel(SidePanelCore, Box):
    _model_name = Unicode('SidePanelModel').tag(sync=True)
    _view_name = Unicode('SidePanel').tag(sync=True)

    title = Unicode('No title').tag(sync=True)
    side = Unicode('split-right').tag(sync=True)
    ref = Unicode(None, allow_none=True).tag(sync=True)

    _headers = List([])
    _open = List([])
    _expand = List([])

    def __init__(self, **kwargs):
        super().__init__( **kwargs)
        self._view_count = 0

    def _insert(self, tuple, index, item):
        l = list(tuple)
        l.insert(index, item)
        return l

    def _remove(self, tuple, index):
        l = list(tuple)
        del l[index]
        return l

    def add(self, widget, header='', open=True, expand=False):
        self.insert(len(self.children), widget, header, open, expand)

    def insert(self, index, widget, header='', open=True, expand=False ):
        self.children = self._insert(self.children, index, widget)
        self._headers = self._insert(self._headers, index, header)
        self._open = self._insert(self._open, index, open)
        self._expand = self._insert(self._expand, index, expand)

    def remove(self, item):
        if isinstance(item, Widget):
            idx = self.children.index(item)
        else:
            idx = int(item)
        self.children = self._remove(self._children, idx)
        del self._headers[idx]
        del self._open[idx]
        del self._expand[idx]
