"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "./textarea";
import { Loader2 } from "lucide-react";
import { useTodos } from "../todos-provider";

const formSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  completed: z.boolean(),
});

const AddTodoForm = () => {
  const { addTodo } = useTodos();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      completed: false,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitted(true);

    await addTodo(data);

    setIsSubmitted(false);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 flex-1 sm:flex-row sm:items-center sm:px-5"
      >
        <div className="grid gap-3 flex-1">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Write down the title"
                    className="p-0 rounded-none bg-transparent text-lg sm:h-auto placeholder:opacity-80 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    value={field.value}
                    autoComplete="off"
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
                  <Textarea
                    {...field}
                    placeholder="Add a short description (optional)"
                    className="p-0 rounded-none min-h-[64px] max-h-16 bg-transparent text-sm text-zinc-500 resize-none sm:h-auto placeholder:opacity-80 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    value={field.value}
                    
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isSubmitted}>
          {isSubmitted && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {isSubmitted ? "Adding" : "Add todo"}
        </Button>
      </form>
    </Form>
  );
};

export default AddTodoForm;
