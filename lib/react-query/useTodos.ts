import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { Todo } from "@prisma/client";

const TODOS_KEY = ["todos"] as const;

type CreateTodoInput = Pick<Todo, "title" | "completed"> & { description?: string | undefined };
type UpdateTodoInput = Pick<Todo, "title" | "completed"> & { description?: string | undefined };

const TODOS_API = {
  list: "/api/todos",
  detail: (id: string) => `/api/todos/${id}`,
};

type TodosResponse = Todo[];

const todosApi = {
  list: () => fetcher<TodosResponse>(TODOS_API.list),

  create: (input: CreateTodoInput) =>
    fetcher<Todo>(TODOS_API.list, {
      method: "POST",
      body: input,
    }),

  update: (id: string, input: UpdateTodoInput) =>
    fetcher<Todo>(TODOS_API.detail(id), {
      method: "PUT",
      body: input,
    }),

  delete: (id: string) =>
    fetcher<{ success: boolean }>(TODOS_API.detail(id), {
      method: "DELETE",
    }),
};

export function useTodos() {
  return useQuery({
    queryKey: TODOS_KEY,
    queryFn: todosApi.list,
  });
}

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: todosApi.create,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: TODOS_KEY, exact: true });
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTodoInput }) => todosApi.update(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: TODOS_KEY, exact: true });
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: todosApi.delete,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: TODOS_KEY, exact: true });
    },
  });
}
