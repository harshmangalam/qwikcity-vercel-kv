import { component$ } from "@builder.io/qwik";
import { DeleteTodo } from "./delete-todo";
import { CompleteTodo } from "./complete-todo";

interface TodoItem {
  id: string;
  task: string;
  isCompleted: boolean;
}
export const TodoItem = component$((props: TodoItem) => {
  const { task, id, isCompleted } = props;
  return (
    <li class="flex items-center justify-between gap-4">
      <p class={["flex-1", { "line-through": isCompleted }]}>{task}</p>
      <div class="flex items-center gap-2">
        <DeleteTodo id={id} />
        <CompleteTodo id={id} isCompleted={isCompleted} />
      </div>
    </li>
  );
});
