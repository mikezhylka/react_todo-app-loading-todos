import React, { SetStateAction } from 'react';
import { CustomError } from '../../types/Error';
import { LoadingTodo } from '../../types/LoadingTodo';
import { Todo } from '../../types/Todo';
import { TodoForm } from './TodoForm';
import { ToggleAllButton } from './ToggleAllButton';

type HeaderProps = {
  query: string;
  setQuery: React.Dispatch<SetStateAction<string>>;
  renderedTodos: Todo[];
  setRenderedTodos: React.Dispatch<SetStateAction<Todo[]>>;
  setInitialTodos: React.Dispatch<SetStateAction<Todo[]>>;
  setErrorMessage: React.Dispatch<SetStateAction<CustomError>>;
  setLoadingTodo: React.Dispatch<SetStateAction<LoadingTodo>>;
  setLoadingTodos: React.Dispatch<SetStateAction<LoadingTodo[]>>;
};

export const Header: React.FC<HeaderProps> = ({
  query,
  setQuery,
  renderedTodos,
  setRenderedTodos,
  setInitialTodos,
  setErrorMessage,
  setLoadingTodo,
  setLoadingTodos,
}) => {
  return (
    <header className="todoapp__header">
      <ToggleAllButton
        renderedTodos={renderedTodos}
        setRenderedTodos={setRenderedTodos}
        setInitialTodos={setInitialTodos}
        setErrorMessage={setErrorMessage}
        setLoadingTodos={setLoadingTodos}
      />

      <TodoForm
        query={query}
        setQuery={setQuery}
        renderedTodos={renderedTodos}
        setRenderedTodos={setRenderedTodos}
        setInitialTodos={setInitialTodos}
        setErrorMessage={setErrorMessage}
        setLoadingTodo={setLoadingTodo}
      />
    </header>
  );
};
