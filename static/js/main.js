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
    $('#todos').html(html.join(''));
  }
};

$(() => {
  TodoApp.getTodos(TodoApp.render);
});
