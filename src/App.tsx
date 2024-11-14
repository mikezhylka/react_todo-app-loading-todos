/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos, USER_ID } from './api/todos';
import { ErrorNotification } from './components/ErrorNotification';
import { FilteringPanel } from './components/FilteringPanel';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { CustomError } from './types/Error';
import { LoadingTodo } from './types/LoadingTodo';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';

export const App: React.FC = () => {
  const [initialTodos, setInitialTodos] = useState<Todo[]>([]);
  const [renderedTodos, setRenderedTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState<string>(''); // for new todo title
  const [errorMessage, setErrorMessage] = useState<CustomError>('');

  const [loadingTodo, setLoadingTodo] = useState<LoadingTodo>(null);
  const [loadingTodos, setLoadingTodos] = useState<LoadingTodo[]>([]);

  useEffect(() => {
    getTodos()
      .then(data => {
        setRenderedTodos(data);
        setInitialTodos(data);
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todo</h1>

      <div className="todoapp__content">
        <Header
          query={query}
          setQuery={setQuery}
          renderedTodos={renderedTodos}
          setRenderedTodos={setRenderedTodos}
          setInitialTodos={setInitialTodos}
          setErrorMessage={setErrorMessage}
          setLoadingTodo={setLoadingTodo}
          setLoadingTodos={setLoadingTodos}
        />

        <TodoList
          renderedTodos={renderedTodos}
          setRenderedTodos={setRenderedTodos}
          initialTodos={initialTodos}
          setInitialTodos={setInitialTodos}
          setErrorMessage={setErrorMessage}
          loadingTodo={loadingTodo}
          setLoadingTodo={setLoadingTodo}
          loadingTodos={loadingTodos}
        />

        {initialTodos.length > 0 && (
          <FilteringPanel
            renderedTodos={renderedTodos}
            setRenderedTodos={setRenderedTodos}
            initialTodos={initialTodos}
            setInitialTodos={setInitialTodos}
            setErrorMessage={setErrorMessage}
            setLoadingTodos={setLoadingTodos}
          />
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
