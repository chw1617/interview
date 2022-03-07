// new 处理
1,处理组件配置项
  初始化根组件进行选项合并。将全局配置项合并到根组件局部配置项
  初始化每一个子组件性能优化，将组件配置对象上一些深层次属性放置到vm.$options选项上

2,初始化组件实例的关系属性 $parent,$root,$children,$refs
3,处理自定义事件$emit,$off,$on
4,调用beforeCreate
5,初始化inject配置项
6,响应式数据处理 prompt,methods,data,computed,watch
7,解析provide配置项
8,调用create
9,$mount实现挂载