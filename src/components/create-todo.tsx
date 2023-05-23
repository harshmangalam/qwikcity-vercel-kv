import { component$ } from "@builder.io/qwik";

export const CreateTodo = component$(() => {
  return (
    <form class="flex gap-4 items-center">
      <input
        type="text"
        placeholder="Type here"
        class="input input-bordered w-full "
      />
      <button type="submit" class="btn btn-square btn-primary">
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
      </button>
    </form>
  );
});
