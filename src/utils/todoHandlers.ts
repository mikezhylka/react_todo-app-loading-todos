import React, { SetStateAction } from 'react';
import { USER_ID } from '../api/todos';
import * as todoService from '../services/todo';
import { CustomError } from '../types/Error';
import { LoadingTodo } from '../types/LoadingTodo';
import { Todo } from '../types/Todo';

export const removeTodo = async (
  setTodos: React.Dispatch<SetStateAction<Todo[]>>,
  todoId: number,
  setErrorMessage: React.Dispatch<SetStateAction<CustomError>>,
  setLoadingTodo: React.Dispatch<SetStateAction<LoadingTodo>>,
) => {
  try {
    setLoadingTodo({ id: todoId, action: 'removing' });
    setTimeout(() => setLoadingTodo(null), 900);

    await todoService.deleteTodo(todoId);

    setTodos(prevTodos => prevTodos.filter(item => item.id !== todoId));
  } catch (error) {
    setErrorMessage('Unable to delete a todo');
  }
};

export const onEnterAddTodo = async (
  query: string,
  setQuery: React.Dispatch<SetStateAction<string>>,
  setTodos: React.Dispatch<SetStateAction<Todo[]>>,
  setErrorMessage: React.Dispatch<SetStateAction<CustomError>>,
  setLoadingTodo: React.Dispatch<SetStateAction<LoadingTodo>>,
  setIsDisabled: React.Dispatch<SetStateAction<boolean>>,
) => {
  if (!query.trim()) {
    setErrorMessage('Title should not be empty');

    return;
  }

  const newTodo: Omit<Todo, 'id'> = {
    userId: USER_ID,
    title: query.trim(),
    completed: false,
  };

  try {
    setIsDisabled(true);
    const createdTodo = await todoService.createTodo(newTodo);

    setLoadingTodo({ id: createdTodo.id, action: 'adding' });
    setTimeout(() => setLoadingTodo(null), 900);

    setTodos(prevTodos => [...prevTodos, createdTodo]);
    setQuery('');
  } catch (error) {
    setErrorMessage('Unable to add a todo');
  } finally {
    setIsDisabled(false);
  }
};

export const onEnterRenameTodo = async (
  todo: Todo,
  event: React.KeyboardEvent<HTMLInputElement>,
  query: string,
  setQuery: React.Dispatch<SetStateAction<string>>,
  todos: Todo[],
  setTodos: React.Dispatch<SetStateAction<Todo[]>>,
  setIsEdited: React.Dispatch<SetStateAction<boolean>>,
  setErrorMessage: React.Dispatch<SetStateAction<CustomError>>,
  setLoadingTodo: React.Dispatch<SetStateAction<LoadingTodo>>,
) => {
  if (event.key !== 'Enter') {
    return;
  }

  if (!query.trim()) {
    setLoadingTodo({ id: todo.id, action: 'removing' });
    await todoService.deleteTodo(todo.id);

    setTodos(prev => prev.filter(t => t !== todo));

    setTimeout(() => setLoadingTodo(null), 900);

    return;
  }

  if (setErrorMessage && query.trim()) {
    setErrorMessage('');
  }

  const updatedTodo = { ...todo, title: query };
  const todoIndex = todos.findIndex(t => t === todo);

  try {
    setLoadingTodo({ id: todo.id, action: 'updating' });
    await todoService.renameTodo(updatedTodo);

    setTodos(prev =>
      prev.map((item, index) => (todoIndex === index ? updatedTodo : item)),
    );

    setQuery(updatedTodo.title);
    setIsEdited(false);
    setTimeout(() => setLoadingTodo(null), 900);
  } catch (error) {
    setErrorMessage('Unable to update a todo');
    setLoadingTodo(null);
  }
};

export const toggleTodoCompletion = async (
  id: number,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<CustomError>>,
  setLoadingTodo: React.Dispatch<React.SetStateAction<LoadingTodo>>,
) => {
  try {
    setLoadingTodo({ id, action: 'updating' });

    let changedTodo: Todo | null = null;

    const updateTodos = (todos: Todo[]) =>
      todos.map(todo => {
        if (todo.id === id) {
          changedTodo = { ...todo, completed: !todo.completed };

          return changedTodo;
        }

        return todo;
      });

    await setTodos(prevTodos => updateTodos(prevTodos));

    if (changedTodo) {
      await todoService.changeCompletedStatus(changedTodo);
    }

    setTimeout(() => setLoadingTodo(null), 900);
  } catch (error) {
    setErrorMessage('Unable to update a todo');
    setLoadingTodo(null);
  }
};

export const toggleAllTodosCompletion = async (
  todos: Todo[],
  setTodos: React.Dispatch<SetStateAction<Todo[]>>,
  setErrorMessage: React.Dispatch<SetStateAction<CustomError>>,
  setLoadingTodos: React.Dispatch<SetStateAction<LoadingTodo[]>>,
) => {
  const completedTodoExists = todos.some(todo => todo.completed);
  const uncompletedTodoExists = todos.some(todo => !todo.completed);
  const allTodosCompleted = todos.every(todo => todo.completed);

  try {
    if ((completedTodoExists && uncompletedTodoExists) || !allTodosCompleted) {
      setTodos(prevTodos =>
        prevTodos.map(todo => {
          const updatedTodo = { ...todo, completed: true };

          if (!todo.completed) {
            setLoadingTodos(prev => [
              ...prev,
              { id: updatedTodo.id, action: 'updating' },
            ]);
            todoService.changeCompletedStatus(updatedTodo);
          }

          return updatedTodo;
        }),
      );

      setTodos(prevTodos =>
        prevTodos.map(todo => {
          return { ...todo, completed: true };
        }),
      );
    } else {
      setTodos(prevTodos =>
        prevTodos.map(todo => {
          const updatedTodo = { ...todo, completed: false };

          setLoadingTodos(prev => [
            ...prev,
            { id: updatedTodo.id, action: 'updating' },
          ]);
          todoService.changeCompletedStatus(updatedTodo);

          return updatedTodo;
        }),
      );

      setTodos(prevTodos =>
        prevTodos.map(todo => {
          return { ...todo, completed: false };
        }),
      );
    }

    setTimeout(() => setLoadingTodos([]), 900);
  } catch (error) {
    setErrorMessage('Unable to update todos');
    setLoadingTodos([]);
  }
};

export const removeCompletedTodos = async (
  todos: Todo[],
  setTodos: React.Dispatch<SetStateAction<Todo[]>>,
  setErrorMessage: React.Dispatch<SetStateAction<CustomError>>,
  setLoadingTodos: React.Dispatch<SetStateAction<LoadingTodo[]>>,
) => {
  try {
    const completedTodos = todos.filter(todo => todo.completed);

    await Promise.all(
      completedTodos.map(async todo => {
        setLoadingTodos(prev => [...prev, { id: todo.id, action: 'removing' }]);
        try {
          await todoService.deleteTodo(todo.id);
        } catch (error) {
          setErrorMessage('Unable to delete completed todos');
        } finally {
          setLoadingTodos(prev =>
            prev.filter(loadingTodo => loadingTodo?.id !== todo.id),
          );
        }
      }),
    );

    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  } catch (error) {
    setErrorMessage('Unable to delete completed todos');
    setLoadingTodos([]);
  }
};
