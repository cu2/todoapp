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
  editTodo: (todoId, updateObj, callback) => {
    $.ajax({
      type: 'PUT',
      url: '/todo/' + todoId + '/',
      data: JSON.stringify(updateObj),
      contentType: 'application/json',
      success: callback,
    });
  },
  deleteTodo: (todoId, callback) => {
    $.ajax({
      type: 'DELETE',
      url: '/todo/' + todoId + '/',
      contentType: 'application/json',
      success: callback,
    });
  },
  render: () => {
    let html = [];
    html.push('<ul>');
    $.each(TodoApp.items, (idx, item) => {
      html.push('<li id="todo_' + item._id + '">');
      html.push(item.text);
      html.push(' <span class="checkmark' + (item.done ? ' done' : '') + '">&check;</span>');
      html.push(' <span class="trashbin">&cross;</span>');
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
    $(document).on('click', '.checkmark', (e) => {
      let newDone = !$(e.target).hasClass('done');
      let todoId = $(e.target).closest('li').attr('id').slice(5);
      TodoApp.editTodo(todoId, { done: newDone }, () => {
        TodoApp.getTodos(TodoApp.render);
      });
    });
    $(document).on('click', '.trashbin', (e) => {
      let todoId = $(e.target).closest('li').attr('id').slice(5);
      TodoApp.deleteTodo(todoId, () => {
        TodoApp.getTodos(TodoApp.render);
      });
    });
  },
};

$(() => {
  TodoApp.getTodos(TodoApp.init);
});
