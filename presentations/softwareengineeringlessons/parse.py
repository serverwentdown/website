import sys
import re
from html.parser import HTMLParser
from typing import Iterable, Tuple, List, Union


"""
TODO:
- Build a proper tree
- Drop <p></p> empty tags and replace with section
"""


def attrs_match(
    attrs: Iterable[Tuple[str, str]], name: str, value: Union[str]
) -> bool:
    for aname, avalue in attrs:
        if type(value) == str:
            if aname == name and avalue == value:
                return True
        elif type(value) == re.Pattern:
            if aname == name and value.fullmatch(avalue):
                return True
    return False


INLINE = (
    "span",
    "code",
    "del",
    "strong",
    "em",
    "a",
)


WHITELIST = {
    "ul": ("type", "start"),
    "ol": ("type", "start"),
    "a": ("href", "target"),
}


def filter_attrs(
    tag: str, attrs: Iterable[Tuple[str, str]]
) -> str:
    fattrs = ""
    whitelist = WHITELIST.get(tag, tuple())
    for aname, avalue in attrs:
        if aname in whitelist:
            fattrs += f' {aname}="{avalue}"'
    return fattrs


class NotionParser(HTMLParser):
    body_depth: int = -1
    drop_depth: int = -1

    nodes: List[str] = []
    current_node: str = ""
    data: str = ""

    def handle_starttag(self, tag, attrs):
        if self.body_depth != -1:
            self.body_depth += 1

            if self.drop_depth != -1:
                self.drop_depth += 1
                return
            if tag == "figure" and self.drop_depth == -1:
                self.drop_depth = 0
                return

            fattrs = filter_attrs(tag, attrs)
            self.current_node += f"<{tag}{fattrs}>"

        if attrs_match(attrs, "class", re.compile(r'.*page-body.*')):
            self.body_depth = 0

    def handle_endtag(self, tag):
        if self.body_depth != -1:
            self.body_depth -= 1

            if self.drop_depth != -1:
                self.drop_depth -= 1
                return
            self.current_node += f"</{tag}>"
            if tag not in INLINE:
                pass
                #self.current_node += "\n"

            if self.body_depth == 0 and tag == "p" and self.data.strip() == "":
                node = self.current_node.removesuffix("<p>\n</p>")
                if node != "":
                    self.nodes.append(node)
                self.current_node = ""
        if self.body_depth == -1:
            if self.current_node != "":
                self.nodes.append(self.current_node)
                self.current_node = ""

    def handle_startendtag(self, tag, attrs):
        if self.body_depth != -1:
            if self.drop_depth != -1:
                return
            self.current_node += f"<{tag}/>"

    def handle_data(self, data):
        if self.body_depth != -1:
            if self.drop_depth != -1:
                return
            self.current_node += data
            self.data = data

    def handle_entityref(self, name):
        if self.body_depth != -1:
            if self.drop_depth != -1:
                return
            self.current_node += f"&{name};"

    def handle_charref(self, name):
        if self.body_depth != -1:
            if self.drop_depth != -1:
                return
            self.current_node += f"&#{name};"

    def print(self):
        for node in self.nodes:
            print('<section>')
            print('<div class="wrapper">')
            print(node)
            print('</div>')
            print('</section>')


if __name__ == "__main__":
    parser = NotionParser()
    parser.feed(sys.stdin.read())
    parser.print()

# vim: set et ts=4 sw=4:
