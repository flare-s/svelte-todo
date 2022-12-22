<script>
	import "./css/reset.css";
	import "./css/style.css";
	import {fade, fly} from "svelte/transition";
  import NewTodoForm from "./NewTodoForm.svelte";
  import TodoList from "../TodoList.svelte";

	let todos = [
		{
			id: 1,
		title: "Finish Svelte course",
		isComplete: false,
		isEditing: false},
		{
			id: 2,
		title: "Go for a run",
		isComplete: false,
		isEditing: false},
		{
		id: 3,
		title: "Cook something to eat",
		isComplete: true,
		isEditing: false}
	]


	let currentFilter = "all"
	$: 
		filteredTodos = currentFilter === "all" ? todos 
		: currentFilter === "active" 
		? todos.filter(todo => !todo.isComplete) 
		: todos.filter(todo => todo.isComplete)


	const createId = () => {
		return todos.length === 0 ? 1 : todos[todos.length - 1].id + 1
	}

	$: uncompletedTodos = todos.filter(todo => !todo.isComplete).length

	const addNewTodo = (event) => {
		todos = [...todos, {
			id: createId(),
			title: event.detail.todoTitle,
			isComplete: false,
			isEditing: false
		}]
	}

	const deleteTodo = (id) => {
		todos = todos.filter(todo => todo.id !== id)
	}

	const checkAllTodos = () => {
		todos = todos.map(todo => {
			todo.isComplete = true;
			return todo
		})
	}

	const clearCompletedTodos = () => {
		todos = todos.filter(todo => !todo.isComplete)
	}

	const updateFilter = (filter) => {
		currentFilter = filter
	}

	let cachedEditedTodoTitle = "";

	const editTodo = (todo) => {
		cachedEditedTodoTitle = todo.title;
		todo.isEditing = true;
		todos = todos;
	}

	const editTodoDone = (todo) => {
		todo.isEditing = false;
		if (todo.title.trim() === "") {
			todo.title = cachedEditedTodoTitle;
		}
		cachedEditedTodoTitle = ""
		todos = todos;
	}

	const exitEditingByKeyup = (event, todo) => {
		if (event.key === "Enter") {
			editTodoDone(todo);
		}

		if (event.key === "Escape") {
			todo.isEditing = false;
			todo.title = cachedEditedTodoTitle;
			cachedEditedTodoTitle = ""
			todos = todos;
		}
	}
	let todoListEmpty;

	
  </script>
  
  <div class="todo-app-container">
	<div class="todo-app">
	  <h2>Todo App</h2>
	  <NewTodoForm on:newTodoAdded={addNewTodo} />
	  {#if todos.length > 0}
		 <!-- content here -->
		 <TodoList filteredTodos={filteredTodos} currentFilter={currentFilter} uncompletedTodos={uncompletedTodos} on:todoDeleted={(event) => deleteTodo(event.detail.id)} on:allTodosChecked={checkAllTodos} on:completedTodosCleared={clearCompletedTodos} on:todoEdited={(event) => editTodo(event.detail.todo)} on:todoEditingDone={(event) => editTodoDone(event.detail.todo)} on:exitedEditing={(event) => exitEditingByKeyup(event.detail.event, event.detail.todo)} on:filterUpdated={(event) => updateFilter(event.detail.filter)}  />
	  {:else}
		 <p class="todo-list-empty" bind:this={todoListEmpty} in:fade={{delay: 1000}}>You don't have any todos at the moment</p>
	  {/if}
	  
	</div>
  </div>


