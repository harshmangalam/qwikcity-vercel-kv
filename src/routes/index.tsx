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
import { TodoItem } from "~/components/todo-item";

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
export const useDeleteTodo = routeAction$(
  async ({ id }, { fail }) => {
    const todos = await kv.lrange<Todo>("todos", 0, -1);
    const indexToRemove = todos.findIndex((todo) => todo.id === id);
    if (indexToRemove === -1) {
      return fail(404, {
        message: "Todo not found",
      });
    }
    await kv.lrem("todos", 0, todos[indexToRemove]);
  },
  zod$({
    id: z.string().nonempty("Todo id must not be empty"),
  })
);
export default component$(() => {
  const todosLoader = useTodos();
  return (
    <div class="max-w-md mx-auto w-full py-6">
      <CreateTodo />

      <ul class="flex flex-col space-y-2 mt-8">
        {todosLoader.value?.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
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
