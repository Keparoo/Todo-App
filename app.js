const form = document.querySelector('form');
const todoEls = document.querySelector('#todos');

// Handle input form
form.addEventListener('submit', function(e) {
	e.preventDefault();
	const todo = document.querySelector('#newTodo');
	const newTodo = document.createElement('li');

	if (todo.value) {
		newTodo.innerText = todo.value + ' ';
		newButton = document.createElement('button');
		newButton.innerText = 'X';
		newTodo.append(newButton);
		todoEls.append(newTodo);
		todo.value = '';
		todo.focus();
	}
});

// Handle marking items complete and item deletion
todoEls.addEventListener('click', function(e) {
	if (e.target.tagName === 'BUTTON') {
		e.target.parentElement.remove();
	}
	if (e.target.tagName === 'LI') {
		e.target.classList.toggle('completed');
	}
});
