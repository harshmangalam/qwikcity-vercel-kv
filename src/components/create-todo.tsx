import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { useCreateTodo } from "~/routes";

export const CreateTodo = component$(() => {
  const action = useCreateTodo();
  return (
    <Form action={action} class="flex gap-4 items-start">
      <div class="w-full">
        <input
          type="text"
          placeholder="Type here..."
          class="input input-bordered w-full "
          name="task"
          autoFocus
        />
        {action.value?.fieldErrors?.task && (
          <label class="label">
            <span class="label-text text-error">
              {action.value.fieldErrors.task[0]}
            </span>
          </label>
        )}
      </div>

      <button
        type="submit"
        class={["btn btn-square btn-primary", { loading: action.isRunning }]}
      >
        {!action.isRunning && (
          <svg
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            ></path>
          </svg>
        )}
      </button>
    </Form>
  );
});
