var app = app || {};

/**
 * 定义视图
 */
app.TodoView = Backbone.View.extend({
  // 定义标签
  tagName: 'li',

  // 选择模版
  template: _.template($('#item-template').html()),
  
  events: {
    
    // 点击勾选按钮触发事件
    'click .toggle': 'toggleCompleted',

    // 双击修改 标签内容
    'dblclick label': 'edit',

    // 修改标签并按下键盘输入内容时触发函数
    'keypress .edit': 'updateOnEnter',

    // 失去焦点触发函数
    'blur .edit': 'close',
    
    // 删除当前列表
    'click .destroy': 'clear',
  },

  initialize: function() {
    // 监听当前模型修改时,触发当前列表渲染
    this.listenTo(this.model, 'change', this.render),

    // 监听当前模型销毁时,删除当前列表
    this.listenTo(this.model, 'destroy', this.remove),


    this.listenTo(this.model, 'visible', this.toggleVisible)
  },

  /**
   * 点击勾选按钮事件函数
   */
  toggleCompleted: function() {
    // 当前模型触发 toggle()
    this.model.toggle();
  },

  /**
   * 修改标签内容触发类名修改及输入框激活
   */
  edit: function() {
    // 当前模型添加类名 li .editing
    this.$el.addClass('editing');

    // 当前 li的子元素 .edit 元素激活, 也就是可以输入内容 
    this.$('.edit').focus();
  },

  /**
   * 修改标签内容
   */
  updateOnEnter: function(event){
    // 按下回车键时
    if (event.which === 13) {
      this.close();
    }
  },

  /**
   * 修改标签输入宽内容完成动作
   */
  close: function() {
    // 获取当前 li 的子元素类名 .edit 的内容并修剪
    var newTitle = this.$('.edit').val().trim();

    // 如果有值的话,修改当前模型标题
    if (newTitle) {
      this.model.save({title: newTitle});
    
    // 没有内容则删除
    } else{
      this.clear();
    }
    // 溢出当前 li 的类名 .editing
    this.$el.removeClass('editing');
  },

  /**
   * 删除当前模型
   */
  clear: function(){
    this.model.destroy();
  },
  
  
  /**
   * 渲染 todo 视图
   * @return 返回当前对象
   */
  render: function(){
    // this.$el 是当前todo 视图模型 标签属性 tagName: li
    // this.$el 里填充 html 代码
    //  -> 即 this.template 指定的模版 _.template($('#item-template').html()); 
    //  -> html 代码模版 <script type="text/template" id="item-template"> 的模版
    //  -> 给 _.template($('#item-template').html()) 传递当前模型对象的所有属性, 即 app.todoList.create({title: val,completed: false}); 的对象
    this.$el.html(this.template(this.model.attributes));
    
    
    this.$el.toggleClass('completed', this.model.get('completed'));
    this.toggleVisible();

    return this;
  },

  
  toggleVisible: function() {
    this.$el.toggleClass('hidden', this.isHidden());
  },

  isHidden: function(){
    var completed = this.model.get('completed');
    return (
      (!completed && app.TodoFilter === 'completed')
      ||
      (completed && app.TodoFilter === 'active')

    );
  }
  


});