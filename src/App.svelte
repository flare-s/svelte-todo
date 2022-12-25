<script>
	import "./css/reset.css";
	import "./css/style.css";
	import {fade} from "svelte/transition";
  import NewTodoForm from "./NewTodoForm.svelte";
  import TodoList from "./TodoList.svelte";
  import {todos} from "./store/todoStore"

	let todoListEmpty;

	
  </script>
  
  <div class="todo-app-container">
	<div class="todo-app">
	  <h2>Todo App</h2>
	  <NewTodoForm />
	  {#if $todos.length > 0}
		 <TodoList    />
	  {:else}
		 <p class="todo-list-empty" bind:this={todoListEmpty} in:fade={{delay: 1000}}>You don't have any todos at the moment</p>
	  {/if}
	  
	</div>
  </div>


