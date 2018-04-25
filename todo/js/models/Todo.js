var app = app || {};

/**
 * 定义模型
 */
app.Todo = Backbone.Model.extend({

  // 默认属性
  defaults: {

    // 模型标题
    title: '',

    // 任务状态
    completed:  false
  },

  /**
   * 修改当前模型对象 completed 属性
   */
  toggle: function() {
    this.save({
      // 获取当前模型对象属性 completed 取反
      completed: !this.get('completed')
    });
  }
});

