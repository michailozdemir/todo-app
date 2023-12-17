"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormField, FormItem, FormControl, FormMessage } from "./form";
import { Input } from "./input";
import clsx from "clsx";
import { Checkbox } from "./checkbox";
import TodoDeleteButton from "./todo-delete-button";
import { Todos } from "@prisma/client";
import { CheckedState } from "@radix-ui/react-checkbox";

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  completed: z.boolean(),
});

const TodoItem = ({ todo }: { todo: Todos }) => {
  const { id, title, description, completed } = todo;
  const [todoCompleted, setTodoCompleted] = useState(completed);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title,
      description: description,
      completed: completed,
    },
  });

  const updateTodo = (data: z.infer<typeof formSchema>) => {
    fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    setTodoCompleted(data.completed);
  };

  return (
    <li
      className={clsx(
        "w-full py-5 px-5 flex items-center bg-black bg-opacity-5 rounded-xl dark:bg-white dark:bg-opacity-5",
        todoCompleted && "opacity-60"
      )}
    >
      <Form {...form}>
        <form className="flex-1">
          <div className="flex items-center gap-4">
            <FormField
              control={form.control}
              name="completed"
              render={({ field }) => (
                <FormItem className="flex">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked: CheckedState) => {
                        field.onChange(checked);
                        form.handleSubmit(updateTodo)();
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="grid gap-1 flex-1">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className={clsx(
                          "text-lg font-medium  p-0 bg-transparent border-0 h-auto rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:opacity-100",
                          todoCompleted && "line-through"
                        )}
                        onChange={field.onChange}
                        value={field.value}
                        onBlur={form.handleSubmit(updateTodo)}
                        autoComplete="off"
                        disabled={todoCompleted}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="text-sm text-zinc-500 font-medium p-0 bg-transparent border-0 h-auto rounded-none placeholder:opacity-50 focus-visible:ring-0 focus-visible:ring-offset-0 disabled:opacity-100"
                        value={field.value}
                        onBlur={form.handleSubmit(updateTodo)}
                        placeholder="You can still add a description here"
                        autoComplete="off"
                        disabled={todoCompleted}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>

      {!todoCompleted && (
        <div className="ml-auto flex items-center gap-2">
          <TodoDeleteButton id={id} />
        </div>
      )}
    </li>
  );
};

export default TodoItem;
