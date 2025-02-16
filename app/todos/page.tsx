import React from "react";
import AddTodoForm from "@/components/ui/add-todo-form";
import TodosList from "@/components/ui/todos-list";
import Container from "@/components/ui/container";

const Page = () => {
  return (
    <section className="py-16 sm:py-32">
      <Container>
        <div className="max-w-[800px] mx-auto px-4 grid gap-10 sm:gap-4">
          <AddTodoForm />
          <TodosList />
        </div>
      </Container>
    </section>
  );
};

export default Page;
