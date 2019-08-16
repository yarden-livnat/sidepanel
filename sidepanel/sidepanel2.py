from ipywidgets import VBox, register
from traitlets import Unicode
from ._version import EXTENSION_SPEC_VERSION

MODULE_NAME = "sidepanel"


@register
class SidePanel2(VBox):
    _model_name = Unicode('SidePanelModel2').tag(sync=True)
    _model_module = Unicode(MODULE_NAME).tag(sync=True)
    _model_module_version = Unicode(EXTENSION_SPEC_VERSION).tag(sync=True)

    _view_name = Unicode('SidePanel2').tag(sync=True)
    _view_module = Unicode(MODULE_NAME).tag(sync=True)
    _view_module_version = Unicode(EXTENSION_SPEC_VERSION).tag(sync=True)

    title = Unicode('SidePanel ver 3').tag(sync=True)
    side = Unicode('split-right').tag(sync=True)
    ref = Unicode(None, allow_none=True).tag(sync=True)

    def __init__(self, **kwargs):
        super().__init__( **kwargs)
        self._view_count = 0

