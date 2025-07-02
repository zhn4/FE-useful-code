function treeToArray(tree, childrenKey = 'children') {
  const result = []
  function traverse(nodes) {
    nodes.forEach((node) => {
      const { [childrenKey]: children, ...rest } = node
      result.push(rest)
      if (children && children.length) {
        traverse(children)
      }
    })
  }
  traverse(tree)
  return result
}

export default treeToArray
