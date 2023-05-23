import { component$ } from "@builder.io/qwik";
import {
  type DocumentHead,
  routeAction$,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { kv } from "@vercel/kv";
import { CreateTodo } from "~/components/create-todo";
import { DeleteTodo } from "~/components/delete-todo";
import { EditTodo } from "~/components/edit-todo";

export const useCreateTodo = routeAction$(
  async ({ task }) => {
    const todo = {
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
  return (
    <div class="max-w-md mx-auto w-full py-6">
      <CreateTodo />

      <ul class="flex flex-col space-y-2 mt-8">
        {[...new Array(10)].map((todo) => (
          <li class="flex items-center justify-between gap-4">
            <p class="flex-1">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </p>
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
