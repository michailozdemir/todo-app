"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Todo } from "@/app/types";
import { Todos } from "@prisma/client";

const useTodosController = () => {
  const [todos, setTodos] = useState<Todos[]>();

  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    const todos = await res.json();

    setTodos(todos);
  };

  const addTodo = async (todo: Todo) => {
    await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    fetchTodos();
  };

  const deleteTodo = async (id: string) => {
    await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });

    setTodos((prevTodos) => prevTodos?.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return { todos, addTodo, fetchTodos, deleteTodo };
};

const TodosContext = createContext<ReturnType<typeof useTodosController>>({
  todos: [],
  addTodo: () => Promise.resolve(),
  fetchTodos: () => Promise.resolve(),
  deleteTodo: () => Promise.resolve(),
});

export const TodosProvider = ({ children }: { children: React.ReactNode }) => {
  return <TodosContext.Provider value={useTodosController()}>{children}</TodosContext.Provider>;
};

export const useTodos = () => useContext(TodosContext);
