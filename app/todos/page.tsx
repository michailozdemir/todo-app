"use client";

import React from "react";
import AddTodoForm from "@/components/ui/add-todo-form";
import TodosList from "@/components/ui/todos-list";
import { TodosProvider } from "@/components/todos-provider";

const Page = () => {
  return (
    <section className="py-16 sm:py-32 max-w-3xl w-full">
      <div className="px-4 grid gap-10 sm:gap-4">
        <TodosProvider>
          <AddTodoForm />
          <TodosList />
        </TodosProvider>
      </div>
    </section>
  );
};

export default Page;
