import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { useUpdateTodo } from "~/routes";

export const CompleteTodo = component$(({ id }: { id: string }) => {
  const action = useUpdateTodo();
  return (
    <Form action={action}>
      <input type="hidden" name="id" value={id} />
      <button
        class={[
          "btn btn-warning btn-sm btn-circle",
          { loading: action.isRunning },
        ]}
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
              d="M4.5 12.75l6 6 9-13.5"
            ></path>
          </svg>
        )}
      </button>
    </Form>
  );
});
