import React, { SetStateAction } from 'react';
import { USER_ID } from '../api/todos';
import * as todoService from '../services/todo';
import { CustomError } from '../types/Error';
import { Todo } from '../types/Todo';

const generateNextTodoId = (todos: Todo[]): number => {
  return Math.max(...todos.map(todo => todo.id), 0) + 1;
};

export const removeTodo = async (
  setRenderedTodos: React.Dispatch<SetStateAction<Todo[]>>,
  setInitialTodos: React.Dispatch<SetStateAction<Todo[]>>,
  todoId: number,
) => {
  await todoService.deleteTodo(todoId);

  // eslint-disable-next-line no-console
  console.log(todoId);

  setRenderedTodos(prevTodos => prevTodos.filter(item => item.id !== todoId));
  setInitialTodos(prevTodos => prevTodos.filter(item => item.id !== todoId));
};

export const onEnterAddTodo = async (
  event: React.KeyboardEvent<HTMLInputElement>,
  query: string,
  setQuery: React.Dispatch<SetStateAction<string>>,
  initialTodos: Todo[],
  setInitialTodos: React.Dispatch<SetStateAction<Todo[]>>,
  setRenderedTodos: React.Dispatch<SetStateAction<Todo[]>>,
  setErrorMessage: React.Dispatch<SetStateAction<CustomError>>,
) => {
  if (event.key === 'Enter') {
    if (!query.trim()) {
      setErrorMessage('Title should not be empty');

      return;
    }

    const newTodo: Todo = {
      id: generateNextTodoId(initialTodos),
      userId: USER_ID,
      title: query.trim(),
      completed: false,
    };

    try {
      await todoService.createTodo(newTodo);
      setRenderedTodos(prevTodos => [...prevTodos, newTodo]);
      setInitialTodos(prevTodos => [...prevTodos, newTodo]);
      setQuery('');
    } catch (error) {
      setErrorMessage('Unable to add a todo');
    }
  }
};

export const onEnterRenameTodo = (
  todo: Todo,
  event: React.KeyboardEvent<HTMLInputElement>,
  query: string,
  setQuery: React.Dispatch<SetStateAction<string>>,
  initialTodos: Todo[],
  setInitialTodos: React.Dispatch<SetStateAction<Todo[]>>,
  setRenderedTodos: React.Dispatch<SetStateAction<Todo[]>>,
  setIsEdited: React.Dispatch<SetStateAction<boolean>>,
) => {
  const todoIndex = initialTodos.findIndex(t => t === todo);

  if (event.key === 'Enter') {
    const updatedTodo = { ...todo, title: query };

    todoService.renameTodo(updatedTodo);

    setInitialTodos(prev =>
      prev.map((item, index) => (todoIndex === index ? updatedTodo : item)),
    );

    setRenderedTodos(prev =>
      prev.map((item, index) => (todoIndex === index ? updatedTodo : item)),
    );

    setQuery(updatedTodo.title);
    setIsEdited(false);
  }
};

export const toggleTodoCompletion = (
  id: number,
  setTodos: React.Dispatch<SetStateAction<Todo[]>>,
) => {
  let changedTodo: Todo = {
    id: 0,
    completed: false,
    title: '',
    userId: 0,
  };

  setTodos(prevTodos =>
    prevTodos.map(todo => {
      if (todo.id === id) {
        changedTodo = { ...todo, completed: !todo.completed };

        return changedTodo;
      } else {
        return todo;
      }
    }),
  );

  todoService.changeCompletedStatus(changedTodo);
};

export const toggleAllTodosCompletion = (
  renderedTodos: Todo[],
  setRenderedTodos: React.Dispatch<SetStateAction<Todo[]>>,
  setInitialTodos: React.Dispatch<SetStateAction<Todo[]>>,
) => {
  const completedTodoExists = renderedTodos.some(todo => todo.completed);
  const uncompletedTodoExists = renderedTodos.some(todo => !todo.completed);
  const allTodosCompleted = renderedTodos.every(todo => todo.completed);

  if ((completedTodoExists && uncompletedTodoExists) || !allTodosCompleted) {
    setRenderedTodos(prevTodos =>
      prevTodos.map(todo => {
        const updatedTodo = { ...todo, completed: true };

        if (!todo.completed) {
          todoService.changeCompletedStatus(updatedTodo);
        }

        return updatedTodo;
      }),
    );

    setInitialTodos(prevTodos =>
      prevTodos.map(todo => {
        return { ...todo, completed: true };
      }),
    );
  } else {
    setRenderedTodos(prevTodos =>
      prevTodos.map(todo => {
        const updatedTodo = { ...todo, completed: false };

        todoService.changeCompletedStatus(updatedTodo);

        return updatedTodo;
      }),
    );

    setInitialTodos(prevTodos =>
      prevTodos.map(todo => {
        return { ...todo, completed: false };
      }),
    );
  }
};

export const removeCompletedTodos = async (
  setRenderedTodos: React.Dispatch<SetStateAction<Todo[]>>,
  setInitialTodos: React.Dispatch<SetStateAction<Todo[]>>,
) => {
  const completedTodos: Todo[] = [];

  setRenderedTodos(prevTodos => {
    completedTodos.push(...prevTodos.filter(todo => todo.completed));

    return prevTodos.filter(todo => !todo.completed);
  });

  await Promise.all(
    completedTodos.map(todo => todoService.deleteTodo(todo.id)),
  );

  setInitialTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
};
