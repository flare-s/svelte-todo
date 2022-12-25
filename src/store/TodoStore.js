import { writable } from "svelte/store";


export let todos = writable([
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
]);