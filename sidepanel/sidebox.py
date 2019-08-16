from ipywidgets import Box, Label


class SideBox(Box):
    def __init__(self, children=(), **kwargs):
        self.ctrl = Label('header')
        children = list(children)
        children.insert(0, self.ctrl)
        super().__init__(children=children, **kwargs)
        self.layout.display = 'flex'
        self.layout.flex_flow = 'column'

    def add(self, item):
        c = list(self.children)
        c.append(item)
        self.children = c
