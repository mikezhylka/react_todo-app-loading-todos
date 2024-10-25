import React, { SetStateAction } from 'react';
import { USER_ID } from '../api/todos';
import { Todo } from '../types/Todo';

export const handleKeyDown = (
  event: React.KeyboardEvent<HTMLInputElement>,
  query: string,
  setQuery: React.Dispatch<SetStateAction<string>>,
  todos: Todo[],
  setTodos: React.Dispatch<SetStateAction<Todo[]>>,
) => {
  if (event.key === 'Enter' && query !== '') {
    const newId = Math.max(...todos.map(todo => todo.id), 0) + 1;

    const newTodo: Todo = {
      id: newId,
      userId: USER_ID,
      title: query,
      completed: false,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    setQuery('');
  }
};

export const toggleCompleted = (
  id: number,
  setTodos: React.Dispatch<SetStateAction<Todo[]>>,
) => {
  setTodos(prevTodos =>
    prevTodos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    ),
  );
};

export const toggleAllTodos = (
  todos: Todo[],
  setTodos: React.Dispatch<SetStateAction<Todo[]>>,
) => {
  const completedTodoExists = todos.some(todo => todo.completed);
  const uncompletedTodoExists = todos.some(todo => !todo.completed);
  const allTodosCompleted = todos.every(todo => todo.completed);

  if ((completedTodoExists && uncompletedTodoExists) || !allTodosCompleted) {
    setTodos(prevTodos =>
      prevTodos.map(todo => {
        return { ...todo, completed: true };
      }),
    );
  } else {
    setTodos(prevTodos =>
      prevTodos.map(todo => {
        return { ...todo, completed: false };
      }),
    );
  }
};
