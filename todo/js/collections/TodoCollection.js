var app = app || {};
/**
 * 定义集合独享
 */
app.TodoCollection = Backbone.Collection.extend({
  
  // 指定模型
  model: app.Todo,

  // 本地缓存存储命名空间前缀 todo 
  localStorage: new Backbone.LocalStorage('todo'),

  /**
   * 已经完成的的列表集合 
   */
  getCompleted: function() {
    // 遍历集合元素中的每个对象，返回当前遍历对象的 completed 属性值得是否为真
    return this.filter(function(todo) {
      return todo.get('completed') === true;
    });
  },

  /**
   * 还没有完成的的列表集合 
   */
  getRemaining: function() {
    // 遍历集合元素中的每个对象，返回当前遍历对象的 completed 属性值得是否为假
    return this.filter(function(todo) {
      return todo.get('completed') === false;
    });
  }
});

// 实例化todo 集合
app.todoList = new app.TodoCollection;

// 创建模型
// app.todoList.create({title: '发布新的课程'});

// fetch 数据源中提取数据
// console.log(app.todoList.fetch());

// 查看集合模型数据
// app.todoList.at(0).attributes

// 销毁集合模型数据
// app.todoList.at(0).destroy();