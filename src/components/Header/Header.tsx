import React, { SetStateAction } from 'react';
import { Todo } from '../../types/Todo';
import { TodoForm } from './TodoForm';
import { ToggleAllButton } from './ToggleAllButton';

type HeaderProps = {
  query: string;
  setQuery: React.Dispatch<SetStateAction<string>>;
  todos: Todo[];
  setTodos: React.Dispatch<SetStateAction<Todo[]>>;
};

export const Header: React.FC<HeaderProps> = ({
  query,
  setQuery,
  todos,
  setTodos,
}) => {
  return (
    <header className="todoapp__header">
      <ToggleAllButton todos={todos} setTodos={setTodos} />

      <TodoForm
        query={query}
        setQuery={setQuery}
        todos={todos}
        setTodos={setTodos}
      />
    </header>
  );
};
