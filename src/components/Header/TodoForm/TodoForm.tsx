import React, { SetStateAction } from 'react';
import { CustomError } from '../../../types/Error';
import { Todo } from '../../../types/Todo';
import { handleKeyDown } from '../../../utils/todoHandlers';

type TodoFormProps = {
  query: string;
  setQuery: React.Dispatch<SetStateAction<string>>;
  renderedTodos: Todo[];
  setRenderedTodos: React.Dispatch<SetStateAction<Todo[]>>;
  setInitialTodos: React.Dispatch<SetStateAction<Todo[]>>;
  setErrorMessage: React.Dispatch<SetStateAction<CustomError>>;
};

export const TodoForm: React.FC<TodoFormProps> = ({
  query,
  setQuery,
  renderedTodos,
  setRenderedTodos,
  setInitialTodos,
  setErrorMessage,
}) => {
  return (
    <form name="todoForm">
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={query}
        onKeyDown={event =>
          handleKeyDown(
            event,
            query,
            setQuery,
            renderedTodos,
            setRenderedTodos,
            setInitialTodos,
            setErrorMessage,
          )
        }
        onChange={event => setQuery(event.target.value)}
        autoFocus
      />
    </form>
  );
};
