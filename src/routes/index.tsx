import { component$ } from "@builder.io/qwik";
import {
  type DocumentHead,
  routeAction$,
  z,
  zod$,
  routeLoader$,
} from "@builder.io/qwik-city";
import { kv } from "@vercel/kv";
import { CreateTodo } from "~/components/create-todo";
import { DeleteTodo } from "~/components/delete-todo";
import { EditTodo } from "~/components/edit-todo";

export type Todo = {
  id: string;
  task: string;
  isCompleted: false;
};
export const useTodos = routeLoader$(async () => {
  const todos = await kv.lrange<Todo>("todos", 0, -1);
  return todos;
});
export const useCreateTodo = routeAction$(
  async ({ task }) => {
    const todo: Todo = {
      id: crypto.randomUUID(),
      task,
      isCompleted: false,
    };
    await kv.lpush("todos", todo);
  },
  zod$({
    task: z.string().nonempty("Task must not be empty"),
  })
);
export default component$(() => {
  const todosLoader = useTodos();
  return (
    <div class="max-w-md mx-auto w-full py-6">
      <CreateTodo />

      <ul class="flex flex-col space-y-2 mt-8">
        {todosLoader.value?.map((todo) => (
          <li key={todo.id} class="flex items-center justify-between gap-4">
            <p class="flex-1">{todo.task}</p>
            <div class="flex items-center gap-2">
              <DeleteTodo />
              <EditTodo />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
