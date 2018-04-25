var app = app || {};

// 定义应用视图
app.AppView = Backbone.View.extend({
  
  //  应用元素
  el: '#todoapp',

  // 应用监听事件
  events: {

    // 绑定事件元素

    // 输入框输入信息触发键盘按下事件; #new-todo 输入框ID; 触发函数 createOnEnter
    'keypress #new-todo': 'createOnEnter',
    
    'click #clear-completed': 'clearCompleted',
    'click #toggle-all': 'toggleAll'
  },

  // 初始化应用
  initialize: function() {

    // app.todoList.create({}) 事件监听函数 this.addOne 函数
    // "add" (model, collection, options) — 当一个model（模型）被添加到一个collection（集合）时触发。
    this.listenTo(app.todoList, 'add', this.addOne);
    
    // "all" — 所有事件发生都能触发这个特别的事件，第一个参数是触发事件的名称。
    this.listenTo(app.todoList, 'all', this.render);

    this.listenTo(app.todoList, 'filter', this.filterAll);

    // 获取存储在 localstorage 数据
    app.todoList.fetch();
  },

  /**
   * 初始化绑定事件: 通过todo 集合对象创建模型对象元素触发事件函数
   * @paam todo 接收 app.todoList.create({title: val,completed: false}); 的 {title: val,completed: false}对象
   */
  addOne: function(todo) {

    // 创建 todo 应用视图
    var todoView= new app.TodoView({model: todo});

    // 在 #todo-list 指定位置渲染上面创建的 todo 视图模型
    $('#todo-list').append(todoView.render().el);
  },

  /**
   * app.todoList 发生所有事件时触发此函数; 包括存储数据事件
   */
  render: function() {
    // 完成集合列表数量    
    var completed = app.todoList.getCompleted().length;
    
    // 没有完成集合列表数量
    var remaining = app.todoList.getRemaining().length;

    // #footer 里添加 #stats-template 模版,并传递对象 {completed: completed,remaining: remaining}    
    this.$('#footer').html(this.statsTemplate({
      completed: completed,
      remaining: remaining
    }));

    this.$('#filters li a')
      .removeClass('selected')
      .filter('[href="#/' + (app.TodoFilter || '') + '"]')
      .addClass('selected');
  },

  /**
   * 统计模版
   */
  statsTemplate: _.template($('#stats-template').html()),

  /**
   * 输入框绑定键盘按下事件方法
   * @params event 事件对象
   */
  createOnEnter: function(event) {
    // 获取输入框对象
    var targetObj = this.$('#new-todo');
    
    // 获取输入框内容并修剪前后空白字符
    var val = targetObj.val().trim();

    // 输入内容不等于回车键或等于空的时候直接返回
    // event.which 判断输入键盘keycode; 回车键的 keycode是13
    if (event.which !== 13 ||  val=== '') {
      return;
    }

    // 通过 todo 集合对象创建一个模型对象
    app.todoList.create({
      // 输入内容为todo 模型对象的 title 属性值
      title: val,

      // 模型属性完成任务属性为还没完成任务状态为 false
      completed: false
    });

    //  输入框内容为空
    targetObj.val(''); 
  },


  filterOne: function(todo) {
    todo.trigger('visible');
  },
  filterAll: function() {
    app.todoList.each(this.filterOne, this);
  },
  toggleAll: function() {
    var completed = $('#toggle-all')[0].checked;
    app.todoList.each(function(todo) {
      todo.save({
        'completed': completed 
      });
    })
  },
  clearCompleted: function() {
    _.invoke(app.todoList.getCompleted(), 'destroy');
    return false;
  },




});