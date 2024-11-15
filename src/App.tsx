/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos, USER_ID } from './api/todos';
import { ErrorNotification } from './components/ErrorNotification';
import { FilteringPanel } from './components/FilteringPanel';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { CustomError } from './types/Error';
import { Filter } from './types/Filter';
import { LoadingTodo } from './types/LoadingTodo';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState(''); // for new todo title
  const [errorMessage, setErrorMessage] = useState<CustomError>('');
  const [filter, setFilter] = useState<Filter>('all');
  const [loadingTodo, setLoadingTodo] = useState<LoadingTodo>(null);
  const [loadingTodos, setLoadingTodos] = useState<LoadingTodo[]>([]);

  useEffect(() => {
    getTodos()
      .then(setTodos)
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
          todos={todos}
          setTodos={setTodos}
          query={query}
          setQuery={setQuery}
          setErrorMessage={setErrorMessage}
          setLoadingTodo={setLoadingTodo}
          setLoadingTodos={setLoadingTodos}
        />

        <TodoList
          todos={todos}
          setTodos={setTodos}
          setErrorMessage={setErrorMessage}
          loadingTodo={loadingTodo}
          setLoadingTodo={setLoadingTodo}
          loadingTodos={loadingTodos}
          filter={filter}
        />

        {todos.length > 0 && (
          <FilteringPanel
            todos={todos}
            setTodos={setTodos}
            setErrorMessage={setErrorMessage}
            setLoadingTodos={setLoadingTodos}
            setFilter={setFilter}
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
