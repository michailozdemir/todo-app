"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormField, FormItem, FormControl, FormMessage } from "./form";
import clsx from "clsx";
import { Checkbox } from "./checkbox";
import TodoDeleteButton from "./todo-delete-button";
import { Todos } from "@prisma/client";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Textarea } from "./textarea";
import { useSwipeable } from "react-swipeable";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  description: z.string(),
  completed: z.boolean(),
});

const TodoItem = ({ todo }: { todo: Todos }) => {
  const { id, title, description, completed } = todo;
  const [isSwiped, setIsSwiped] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [todoCompleted, setTodoCompleted] = useState(completed);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => !todoCompleted && setIsSwiped(true),
    onSwipedRight: () => !todoCompleted && setIsSwiped(false),
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    <div className="relative w-full overflow-hidden rounded-xl">
      <div
        className={clsx(
          "relative py-5 px-5 flex items-center gap-4 ease-in-out duration-300 bg-[#F4F4F4] rounded-xl z-10 dark:bg-[#2A2A2A]",
          todoCompleted && "bg-[#F8F8F8] dark:bg-[#232323]",
          isSwiped && isMobile && "translate-x-[-62px]"
        )}
        {...swipeHandlers}
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
                        <Textarea
                          {...field}
                          className={clsx(
                            "min-h-[unset] h-[24px] text-lg font-medium resize-none p-0 bg-transparent border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0",
                            todoCompleted && "line-through"
                          )}
                          onChange={field.onChange}
                          value={field.value}
                          onBlur={form.handleSubmit(updateTodo)}
                          autoComplete="off"
                          disabled={todoCompleted}
                          maxLength={512}
                          rows={1}
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
                        <Textarea
                          {...field}
                          className="min-h-[unset] h-[24px] resize-none text-sm text-zinc-500 font-medium p-0 bg-transparent border-0 rounded-none placeholder:opacity-50 focus-visible:ring-0 focus-visible:ring-offset-0"
                          value={field.value}
                          onBlur={form.handleSubmit(updateTodo)}
                          placeholder="You can still add a description here"
                          autoComplete="off"
                          disabled={todoCompleted}
                          maxLength={512}
                          rows={1}
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

        {!todoCompleted && !isMobile && (
          <div className="ml-auto flex items-center gap-2">
            <TodoDeleteButton id={id} />
          </div>
        )}
      </div>
      {!todoCompleted && isMobile && (
        <div className="absolute top-0 right-0 h-full w-full flex items-center justify-end px-3 rounded-xl bg-red-900">
          <TodoDeleteButton id={id} />
        </div>
      )}
    </div>
  );
};

export default TodoItem;
