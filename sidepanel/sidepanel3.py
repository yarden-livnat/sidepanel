from ipywidgets import DOMWidget, Widget, register, widget_serialization
from traitlets import Instance, Unicode
from ._version import EXTENSION_SPEC_VERSION

MODULE_NAME = "sidepanel"


@register
class SidePanel3(DOMWidget):
    _model_name = Unicode('SidePanelModel3').tag(sync=True)
    _model_module = Unicode(MODULE_NAME).tag(sync=True)
    _model_module_version = Unicode(EXTENSION_SPEC_VERSION).tag(sync=True)

    _view_name = Unicode('SidePanel3').tag(sync=True)
    _view_module = Unicode(MODULE_NAME).tag(sync=True)
    _view_module_version = Unicode(EXTENSION_SPEC_VERSION).tag(sync=True)

    title = Unicode('No title').tag(sync=True)
    side = Unicode('split-right').tag(sync=True)
    ref = Unicode(None, allow_none=True).tag(sync=True)

    child = Instance(Widget).tag(sync=True, **widget_serialization)

    def __init__(self, **kwargs):
        super().__init__( **kwargs)
        self._view_count = 0
