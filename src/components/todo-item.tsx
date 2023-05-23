import { component$ } from "@builder.io/qwik";
import { DeleteTodo } from "./delete-todo";
import { EditTodo } from "./edit-todo";

interface TodoItem {
  id: string;
  task: string;
  isCompleted: boolean;
}
export const TodoItem = component$((props: TodoItem) => {
  const { task, id } = props;
  return (
    <li class="flex items-center justify-between gap-4">
      <p class="flex-1">{task}</p>
      <div class="flex items-center gap-2">
        <DeleteTodo id={id} />
        <EditTodo />
      </div>
    </li>
  );
});
