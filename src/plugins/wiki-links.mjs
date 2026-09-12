/** Explicit paths keep links stable even when titles change. */
export default function remarkWikiLinks() {
  return (tree) => {
    function walk(parent) {
      if (!parent.children || ['link', 'linkReference'].includes(parent.type)) return;
      parent.children = parent.children.flatMap((node) => {
        if (node.type !== 'text') { walk(node); return [node]; }
        const parts = [];
        let offset = 0;
        for (const match of node.value.matchAll(/\[\[((?:notes|projects)\/[a-z0-9-]+)(?:\|([^\]]+))?\]\]/g)) {
          parts.push({ type: 'text', value: node.value.slice(offset, match.index) });
          parts.push({ type: 'link', url: `/${match[1]}/`, children: [{ type: 'text', value: match[2] || match[1].split('/')[1].replaceAll('-', ' ') }] });
          offset = match.index + match[0].length;
        }
        parts.push({ type: 'text', value: node.value.slice(offset) });
        return parts;
      });
    }
    walk(tree);
  };
}
