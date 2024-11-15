import React, { SetStateAction } from 'react';
import { CustomError } from '../../types/Error';
import { LoadingTodo } from '../../types/LoadingTodo';
import { Todo } from '../../types/Todo';
import { TodoForm } from './TodoForm';
import { ToggleAllButton } from './ToggleAllButton';

type HeaderProps = {
  query: string;
  setQuery: React.Dispatch<SetStateAction<string>>;
  todos: Todo[];
  setTodos: React.Dispatch<SetStateAction<Todo[]>>;
  setErrorMessage: React.Dispatch<SetStateAction<CustomError>>;
  setLoadingTodo: React.Dispatch<SetStateAction<LoadingTodo>>;
  setLoadingTodos: React.Dispatch<SetStateAction<LoadingTodo[]>>;
};

export const Header: React.FC<HeaderProps> = ({
  query,
  setQuery,
  todos,
  setTodos,
  setErrorMessage,
  setLoadingTodo,
  setLoadingTodos,
}) => {
  return (
    <header className="todoapp__header">
      <ToggleAllButton
        todos={todos}
        setTodos={setTodos}
        setErrorMessage={setErrorMessage}
        setLoadingTodos={setLoadingTodos}
      />

      <TodoForm
        query={query}
        setQuery={setQuery}
        // todos={todos}
        setTodos={setTodos}
        setErrorMessage={setErrorMessage}
        setLoadingTodo={setLoadingTodo}
      />
    </header>
  );
};
