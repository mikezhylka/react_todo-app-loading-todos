// import { SetStateAction } from 'react';
import { SetStateAction } from 'react';
import { USER_ID } from '../api/todos';
import { useAppContext } from '../context/AppContext';
import * as todoService from '../services/todo';
import { LoadingTodo } from '../types/LoadingTodo';
import { Todo } from '../types/Todo';

function showSpinner(setState: React.Dispatch<SetStateAction<LoadingTodo[]>>) {
  setTimeout(() => setState([]), 900);
}

export function useRemoveTodo() {
  const { setTodos, setLoadingTodos, setError } = useAppContext();

  async function removeTodo(todoId: number) {
    try {
      setLoadingTodos(prev => [...prev, { id: todoId, action: 'removing' }]);
      showSpinner(setLoadingTodos);
      await todoService.deleteTodo(todoId);
      setTodos(prevTodos => prevTodos.filter(item => item.id !== todoId));
    } catch (error) {
      setError('Unable to delete a todo');
    }
  }

  return removeTodo;
}

export function useAddTodo() {
  const {
    query,
    setQuery,
    setIsFormDisabled,
    setError,
    setLoadingTodos,
    setTodos,
  } = useAppContext();

  const newTodo: Omit<Todo, 'id'> = {
    userId: USER_ID,
    title: query.trim(),
    completed: false,
  };

  async function addTodo() {
    if (!query.trim()) {
      setError('Title should not be empty');

      return;
    }

    try {
      const createdTodo = await todoService.createTodo(newTodo);

      setIsFormDisabled(true);
      setLoadingTodos([{ id: createdTodo.id, action: 'adding' }]);
      showSpinner(setLoadingTodos);
      setTodos(prevTodos => [...prevTodos, createdTodo]);
      setQuery('');
    } catch (error) {
      setError('Unable to add a todo');
    } finally {
      setIsFormDisabled(false);
    }
  }

  return addTodo;
}

export function useRenameTodo(
  todoQuery: string,
  setTodoQuery: React.Dispatch<SetStateAction<string>>,
  setIsTodoEdited: React.Dispatch<SetStateAction<boolean>>,
) {
  const { setTodos, setError, setIsNewTodoFieldEdited, setLoadingTodos } =
    useAppContext();

  const isInputEmpty = !todoQuery.trim();

  async function renameTodo(todo: Todo, e: React.KeyboardEvent) {
    if (e.key !== 'Enter') {
      return;
    }

    if (isInputEmpty) {
      setLoadingTodos(prev => [...prev, { id: todo.id, action: 'removing' }]);
      await todoService.deleteTodo(todo.id);
      showSpinner(setLoadingTodos);
      await setTodos(prevTodos =>
        prevTodos.filter(prevTodo => prevTodo !== todo),
      );

      return;
    } else {
      setError('');
    }

    const updatedTodo = { ...todo, title: todoQuery };

    try {
      setLoadingTodos(prev => [...prev, { id: todo.id, action: 'updating' }]);
      showSpinner(setLoadingTodos);
      await todoService.renameTodo(updatedTodo);
      setTodos(prev =>
        prev.map(item => (item.id === todo.id ? updatedTodo : item)),
      );
      setTodoQuery(updatedTodo.title);
      setIsNewTodoFieldEdited(false);
    } catch (error) {
      setError('Unable to update a todo');
      setLoadingTodos([]);
    } finally {
      setIsTodoEdited(false);
    }
  }

  return renameTodo;
}

export function useToggleTodoCompletion() {
  const { setTodos, setLoadingTodos, setError } = useAppContext();

  async function ToggleTodoCompletion(id: number) {
    try {
      let newTodo: Todo | null = null;
      const updateTodos = (todos: Todo[]) =>
        todos.map(todo => {
          if (todo.id === id) {
            newTodo = { ...todo, completed: !todo.completed };

            return newTodo;
          }

          return todo;
        });

      setLoadingTodos(prev => [...prev, { id, action: 'updating' }]);
      showSpinner(setLoadingTodos);
      await setTodos(prevTodos => updateTodos(prevTodos));

      if (newTodo) {
        await todoService.changeCompletedStatus(newTodo);
      }
    } catch (error) {
      setError('Unable to update a todo');
      setLoadingTodos([]);
    }
  }

  return ToggleTodoCompletion;
}

export function useToggleAllTodosCompletion() {
  const { todos, setTodos, setLoadingTodos, setError } = useAppContext();

  const hasUncompletedTodo = todos.some(todo => !todo.completed);
  const isAllCompleted = todos.every(todo => todo.completed);
  const shouldToggleAllToCompleted = hasUncompletedTodo || !isAllCompleted;

  async function toggleAllTodosCompletion() {
    try {
      if (shouldToggleAllToCompleted) {
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
      }

      showSpinner(setLoadingTodos);
    } catch (error) {
      setError('Unable to update todos');
      setLoadingTodos([]);
    }
  }

  return toggleAllTodosCompletion;
}

export function useRemoveCompletedTodos() {
  const { todos, setLoadingTodos, setError, inputRef, setTodos } =
    useAppContext();

  async function removeCompletedTodos() {
    try {
      const completedTodos = todos.filter(todo => todo.completed);

      await Promise.all(
        completedTodos.map(async todo => {
          setLoadingTodos(prev => [
            ...prev,
            { id: todo.id, action: 'removing' },
          ]);
          try {
            await todoService.deleteTodo(todo.id);
          } catch (error) {
            setError('Unable to delete a todo');
          } finally {
            setLoadingTodos(prev =>
              prev.filter(loadingTodo => loadingTodo?.id !== todo.id),
            );

            return inputRef.current && inputRef.current.focus();
          }
        }),
      );

      setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
    } catch (error) {
      setError('Unable to delete a todo');
      setLoadingTodos([]);
    }
  }

  return removeCompletedTodos;
}
