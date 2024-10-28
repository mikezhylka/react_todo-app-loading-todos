/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos, USER_ID } from './api/todos';
import { ErrorNotification } from './components/ErrorNotification';
import { FilteringPanel } from './components/FilteringPanel';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState<string>(''); // for new todo title
  const [sortedTodos, setSortedTodos] = useState<Todo[]>(todos);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          query={query}
          setQuery={setQuery}
          todos={todos}
          setTodos={setTodos}
        />

        <TodoList todos={todos} setTodos={setTodos} sortedTodos={sortedTodos} />

        <FilteringPanel
          todos={todos}
          setTodos={setTodos}
          setSortedTodos={setSortedTodos}
        />
      </div>

      {false && <ErrorNotification />}
    </div>
  );
};
