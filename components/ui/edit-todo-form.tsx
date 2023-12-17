"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormField, FormItem, FormControl, FormMessage } from "./form";
import { Input } from "./input";
import clsx from "clsx";
import { Checkbox } from "./checkbox";
import { Todos } from "@prisma/client";

type EditTodoFormProps = {
  todo: Todos;
};

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  completed: z.boolean(),
});

const EditTodoForm = ({ todo }: EditTodoFormProps) => {
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

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    try {
      fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setTodoCompleted(data.completed);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form>
        <div className="flex items-center gap-4">
          <FormField
            control={form.control}
            name="completed"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      form.handleSubmit(onSubmit)();
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="grid gap-1">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      {...field}
                      className={clsx(
                        "text-lg font-medium  p-0 bg-transparent border-0 h-auto rounded-none focus-visible:ring-0 focus-visible:ring-offset-0",
                        todoCompleted && "line-through"
                      )}
                      onChange={field.onChange}
                      value={field.value}
                      onBlur={form.handleSubmit(onSubmit)}
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
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      {...field}
                      className="text-sm text-zinc-500 font-medium p-0 bg-transparent border-0 h-auto rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      value={field.value}
                      onBlur={form.handleSubmit(onSubmit)}
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
  );
};

export default EditTodoForm;
