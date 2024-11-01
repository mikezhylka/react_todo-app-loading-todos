import React, { SetStateAction } from 'react';
import { CustomError } from '../../types/Error';
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
};

export const Header: React.FC<HeaderProps> = ({
  query,
  setQuery,
  renderedTodos,
  setRenderedTodos,
  setInitialTodos,
  setErrorMessage,
}) => {
  return (
    <header className="todoapp__header">
      <ToggleAllButton
        renderedTodos={renderedTodos}
        setRenderedTodos={setRenderedTodos}
        setInitialTodos={setInitialTodos}
      />

      <TodoForm
        query={query}
        setQuery={setQuery}
        renderedTodos={renderedTodos}
        setRenderedTodos={setRenderedTodos}
        setInitialTodos={setInitialTodos}
        setErrorMessage={setErrorMessage}
      />
    </header>
  );
};
