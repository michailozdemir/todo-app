import React from "react";
import TodoItem from "./todo-item";
import { Todos } from "@prisma/client";
import { useTodos } from "../todos-provider";
import { Loader2 } from "lucide-react";

const TodosList = () => {
  const { todos } = useTodos();

  if (!todos)
    return (
      <div className="mt-5 text-center mx-auto">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );

  if (!todos?.length)
    return (
      <div className="mt-5 text-center py-16 px-5 max-w-3xl mx-auto w-full bg-black bg-opacity-5 rounded-xl dark:bg-white dark:bg-opacity-5">
        <p className="text-3xl font-semibold">No todos yet :(</p>
        <p className="mt-2 text-zinc-500">Add your first todo and well, don&apos;t forget to complete it</p>
      </div>
    );

  return (
    <div className="grid place-items-center gap-2 max-w-3xl mx-auto w-full">
      {todos?.map((todo: Todos) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodosList;
