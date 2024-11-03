import React, { SetStateAction } from 'react';
import { CustomError } from '../../../types/Error';
import { LoadingTodo } from '../../../types/LoadingTodo';
import { Todo } from '../../../types/Todo';
import { onEnterAddTodo } from '../../../utils/todoHandlers';

type TodoFormProps = {
  query: string;
  setQuery: React.Dispatch<SetStateAction<string>>;
  renderedTodos: Todo[];
  setRenderedTodos: React.Dispatch<SetStateAction<Todo[]>>;
  setInitialTodos: React.Dispatch<SetStateAction<Todo[]>>;
  setErrorMessage: React.Dispatch<SetStateAction<CustomError>>;
  setLoadingTodo: React.Dispatch<SetStateAction<LoadingTodo>>;
};

export const TodoForm: React.FC<TodoFormProps> = ({
  query,
  setQuery,
  setRenderedTodos,
  setInitialTodos,
  setErrorMessage,
  setLoadingTodo,
}) => {
  return (
    <form name="todoForm" onSubmit={e => e.preventDefault()}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={query}
        onKeyDown={event =>
          onEnterAddTodo(
            event,
            query,
            setQuery,
            setInitialTodos,
            setRenderedTodos,
            setErrorMessage,
            setLoadingTodo,
          )
        }
        onChange={event => setQuery(event.target.value)}
        autoFocus
      />
    </form>
  );
};
