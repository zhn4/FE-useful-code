# code style

## 文件目录

- 文件夹，小写驼峰  
todoList

- 页面文件，小写驼峰  
listPage.vue

- 通用组件 大写开头  
Board.vue

## CSS

- 不建议使用 BEM 写法
> 具体规则可以网上搜，不建议使用这个方法

- 减号分割
```css
#custom-header {}
.common-header {}
.common-footer {}
```

## JavaScript

- 事件函数  
```javascript
  onChange(){
    // data change
  },
  onSelect(){
    // component action method
  },
  onCreate(){
    // button method
  },
```

- 逻辑函数
```javascript
  isCreator() {
    // TODO:
  },
  hasPermission() {
    // TODO:
  },
  judgeDataLength() {
    // TODO:
  },
```
