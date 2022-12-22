<script>
    import {createEventDispatcher} from "svelte";
    const dispatcher = createEventDispatcher();
    let todoTitle = "";
    const addedNewTodo = () => {
        dispatcher("newTodoAdded", {
            todoTitle,
        })
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