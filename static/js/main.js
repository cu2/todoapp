'use strict';

var TodoApp = {
  items: [],
  filter: 2,
  getTodos: (callback) => {
    $.getJSON('/todo/', (data) => {
      TodoApp.items = data;
      callback();
    });
  },
  createTodo: (todo, callback) => {
    $.ajax({
      type: 'POST',
      url: '/todo/',
      data: JSON.stringify(todo),
      contentType: 'application/json',
      success: callback,
    });
  },
  render: () => {
    let html = [];
    html.push('<ul>');
    $.each(TodoApp.items, (key, val) => {
      html.push('<li>');
      html.push(val.text);
      html.push(val.done ? ' &check;' : '');
      html.push('</li>');
    });
    html.push('</ul>');
    $('#todo_list').html(html.join(''));
  },
  init: () => {
    let html = [];
    html.push('<h1>Todos:</h1>');
    html.push('<div id="todo_list"></div>');
    html.push('<input type="text" id="new_todo" />');
    $('#todoapp').html(html.join(''));
    $('#new_todo').keyup((e) => {
      if (e.keyCode === 13) {
        TodoApp.createTodo({
          text: $(e.target).val()
        }, () => {
          TodoApp.getTodos(TodoApp.render);
        });
        $(e.target).val('');
      }
    });
    TodoApp.render();
    $('#new_todo').focus();
  },
};

$(() => {
  TodoApp.getTodos(TodoApp.init);
});
