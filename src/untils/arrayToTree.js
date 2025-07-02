// 将对象数组组装成树结构
function arrayToTree(arr, idKey = 'id', parentIdKey = 'parentId', childrenKey = 'children') {
  const map = {};
  const tree = [];
  arr.forEach(item => {
    map[item[idKey]] = { ...item, [childrenKey]: [] };
  });
  arr.forEach(item => {
    const parentId = item[parentIdKey];
    if (parentId && map[parentId]) {
      map[parentId][childrenKey].push(map[item[idKey]]);
    } else {
      tree.push(map[item[idKey]]);
    }
  });
  return tree;
}

export default arrayToTree