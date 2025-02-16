import React from "react";
import AddTodoForm from "@/components/todo/add-todo-form";
import Container from "@/components/ui/container";
import TodosList from "@/components/todo/todos-list";

const Page = () => {
  return (
    <section className="py-16 sm:py-32">
      <Container>
        <div className="max-w-[800px] mx-auto px-4 grid gap-12">
          <AddTodoForm />
          <TodosList />
        </div>
      </Container>
    </section>
  );
};

export default Page;
