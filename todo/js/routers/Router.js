var app = app || {};
app.TodoRouter = Backbone.Router.extend({
  routes: {
    '*filter': 'setFilter'
  },
  setFilter: function(filter) {
    if (filter) {
      filter = filter.trim();
    }

    app.TodoFilter = filter || '';

    // 自定义事件
    app.todoList.trigger('filter');

    console.log(app.TodoFilter);
  }
});

// 路由器实例
app.todoRouter = new app.TodoRouter;
Backbone.history.start();