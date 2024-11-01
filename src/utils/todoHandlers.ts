import React, { SetStateAction } from 'react';
import { USER_ID } from '../api/todos';
import * as todoService from '../services/todo';
import { CustomError } from '../types/Error';
import { Todo } from '../types/Todo';

export const deleteTodo = (
  setRenderedTodos: React.Dispatch<SetStateAction<Todo[]>>,
  setInitialTodos: React.Dispatch<SetStateAction<Todo[]>>,
  todoId: number,
) => {
  setRenderedTodos(prevTodos => prevTodos.filter(item => item.id !== todoId));
  setInitialTodos(prevTodos => prevTodos.filter(item => item.id !== todoId));
  todoService.deleteTodo(todoId);
};

export const handleKeyDown = async (
  event: React.KeyboardEvent<HTMLInputElement>,
  query: string,
  setQuery: React.Dispatch<SetStateAction<string>>,
  initialTodos: Todo[],
  setInitialTodos: React.Dispatch<SetStateAction<Todo[]>>,
  setRenderedTodos: React.Dispatch<SetStateAction<Todo[]>>,
  setErrorMessage: React.Dispatch<SetStateAction<CustomError>>,
) => {
  if (event.key === 'Enter' && query.trim() !== '') {
    const newId = Math.max(...initialTodos.map(todo => todo.id), 0) + 1;

    const newTodo: Todo = {
      id: newId,
      userId: USER_ID,
      title: query.trim(),
      completed: false,
    };

    try {
      console.log(newTodo);
      await todoService.createTodo(newTodo);
      setRenderedTodos(prevTodos => [...prevTodos, newTodo]);
      setInitialTodos(prevTodos => [...prevTodos, newTodo]);
      setQuery('');
    } catch (error) {
      setErrorMessage('Unable to add a todo');
    }
  }
};

export const onTodoRenameKeyDown = (
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

export const toggleCompleted = (
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

export const toggleAllTodos = (
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

export const clearCompleted = (
  setRenderedTodos: React.Dispatch<SetStateAction<Todo[]>>,
  setInitialTodos: React.Dispatch<SetStateAction<Todo[]>>,
) => {
  setRenderedTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  setInitialTodos(prevTodos =>
    prevTodos.filter(todo => {
      if (todo.completed) {
        todoService.deleteTodo(todo.id);

        return false;
      }

      return true;
    }),
  );
};
