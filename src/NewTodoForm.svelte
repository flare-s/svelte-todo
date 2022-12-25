<script>
    import {createEventDispatcher} from "svelte";
    import {todos} from "./store/TodoStore";
    let todoTitle = "";
    const createId = () => {
		return $todos.length === 0 ? 1 : $todos[$todos.length - 1].id + 1
	}
    const addedNewTodo = () => {
		todos.update(todos => [...todos, {
			id: createId(),
			title: todoTitle,
			isComplete: false,
			isEditing: false
		}])
        todoTitle = ""
    }
</script>

<form action="#" on:submit|preventDefault={addedNewTodo}>
    <input
      type="text"
      class="todo-input"
      placeholder="What do you need to do?"
      bind:value={todoTitle}
    />
  </form>