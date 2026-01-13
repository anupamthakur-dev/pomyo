import { create } from "zustand";
import type { ITodo } from "../type";

import type { UUIDTypes } from "../type";

const COMPLETION_DISPLAY_MS = 3000;

export interface ITodoStore {
  todos: ITodo[];
  activeTodoId: UUIDTypes | null;
  lastCompletedTodoId?: UUIDTypes | null;
  completionResetTimer?: ReturnType<typeof setTimeout>;

  addTodo(todo: ITodo): void;
  updateTodo(id: UUIDTypes, data: Partial<ITodo>): void;
  deleteTodo(id: UUIDTypes): void;
  recordCompletion(id: UUIDTypes): void;

  activateTodo(id: UUIDTypes): void;
  deactivateActiveTodo(): void;
  markCompleted(id: UUIDTypes): void;
  getTodos(): ITodo[];
  isTaskCompleted(id: UUIDTypes): boolean;
}

export const useTodoStore = create<ITodoStore>((set, get) => ({
  todos: [],
  activeTodoId: null,
  lastCompletedTodoId: undefined,
  completionResetTimer: undefined,
  addTodo: (newTodo) => set((state) => ({ todos: [...state.todos, newTodo] })),
  updateTodo: (id, data) =>
    set((state) => {
      const nextTodos = state.todos.map((todo) => {
        if (todo.id !== id) return todo;

        const updateTodo = { ...todo, ...data };

        return {
          ...updateTodo,
          status: resolveTodoStatus(updateTodo),
        };
      });
      return { todos: nextTodos };
    }),
  deleteTodo: (id) =>
    set((state) => {
      const filtered = state.todos.filter((todo) => todo.id !== id);
      return { todos: filtered };
    }),
  activateTodo: (id) => {
    const { activeTodoId } = get();
    if (activeTodoId === id) return;

    set({ activeTodoId: id });
  },

  deactivateActiveTodo: () => {
    const { activeTodoId } = get();

    if (!activeTodoId) return;

    set({
      activeTodoId: null,
    });
  },
  markCompleted: (id) => {
    const { activeTodoId, todos, completionResetTimer } = get();
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    if (completionResetTimer) {
      clearTimeout(completionResetTimer);
    }

    const timer = setTimeout(() => {
      set({ lastCompletedTodoId: null, completionResetTimer: undefined });
    }, COMPLETION_DISPLAY_MS);

    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id
          ? { ...t, completedPomo: t.estimatedPomo, status: "completed" }
          : t
      ),
      activeTodoId: activeTodoId === id ? null : state.activeTodoId,
      lastCompletedTodoId: id === activeTodoId?id:state.lastCompletedTodoId,
      completionResetTimer: timer,
    }));
  },
  recordCompletion(id) {
    const { completionResetTimer } = get();

    if (completionResetTimer) {
      clearTimeout(completionResetTimer);
    }

    let justCompleted = false;
    set((state) => {
      const nextTodos = state.todos.map((todo) => {
        if (todo.id !== id) return todo;

        const updateTodo: ITodo = {
          ...todo,
          completedPomo: todo.completedPomo + 1,
        };

        if (updateTodo.completedPomo >= updateTodo.estimatedPomo) {
          justCompleted = true;
        }

        return {
          ...updateTodo,
          status: resolveTodoStatus(updateTodo),
        };
      });
      let timer: ReturnType<typeof setTimeout> | undefined;

      if (justCompleted) {
        timer = setTimeout(() => {
          set({
            lastCompletedTodoId: null,
            completionResetTimer: undefined,
          });
        }, COMPLETION_DISPLAY_MS);
      }
      return {
        todos: nextTodos,
        activeTodoId: justCompleted ? null : state.activeTodoId,
        lastCompletedTodoId: justCompleted ? id : state.lastCompletedTodoId,
        completionResetTimer: timer,
      };
    });
  },
  isTaskCompleted(id) {
    if (!id) return false;
    const task = get().todos.find((t) => t.id === id);
    if (!task) return false;

    return task.completedPomo === task.estimatedPomo;
  },
  getTodos: () => get().todos,
}));

function resolveTodoStatus(todo: ITodo): ITodo["status"] {
  if (todo.completedPomo >= todo.estimatedPomo) return "completed";
  return "pending";
}
