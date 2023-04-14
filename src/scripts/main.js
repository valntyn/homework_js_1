/* eslint-disable no-undef */
'use strict';

const myAge = 22;
const input = document.querySelector('.queue__input');
const onAdd = document.querySelector('.queue__add');
const onRemove = document.querySelector('.queue__remove');
const queueList = document.querySelector('.queue__queueList');

const items = JSON.parse(localStorage.getItem('queue')) || [];

render();

const addItem = () => {
  if (!input.value) {
    notificationWarning('write something to add :)');

    return;
  }

  if (items.length >= myAge) {
    notificationProblem('there can not be more elements than your age :(');

    return;
  }

  items.push(input.value.trim());
  input.value = '';

  localStorage.setItem('queue', JSON.stringify(items));
  render();
  notificationOk('you have added the item');
};

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addItem();
  }
});

onAdd.addEventListener('click', addItem);

onRemove.addEventListener('click', () => {
  if (!items.length) {
    notificationWarning('queue is empty, add some before');

    return;
  }
  items.shift();

  localStorage.setItem('queue', JSON.stringify(items));
  render();
  notificationOk('item was deleted');
});

function pushNotification(posTop, posRight, title, description, type) {
  document.body.insertAdjacentHTML(
    'afterbegin',
    `
    <div class="notification" style="top:${posTop}px; right:${posRight}px;">
      <h2 class="title">${title}</h2>
      <p>${description}</p>
    </div>
  `
  );

  const div = document.querySelector('div');

  div.classList.add(type);

  setTimeout(() => div.remove(), 2000);
}

function notificationOk(description) {
  pushNotification(
    200,
    10,
    'Everything is ok!',
    'Successfully!! \n ' + description,
    'success'
  );
}

function notificationProblem(description) {
  pushNotification(
    300,
    10,
    'Something happened',
    'Fix the problem!! \n ' + description,
    'error'
  );
}

function notificationWarning(description) {
  pushNotification(
    400,
    10,
    'Something happened',
    'Warning!! \n ' + description,
    'warning'
  );
}

function render() {
  queueList.innerHTML = items
    .map((item) => `<li class="queue__item">${item}</li>`)
    .join('');
}
