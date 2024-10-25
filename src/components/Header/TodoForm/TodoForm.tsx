import React, { SetStateAction } from 'react';
import { Todo } from '../../../types/Todo';
import { handleKeyDown } from '../../../utils/todoHandlers';

type TodoFormProps = {
  query: string;
  setQuery: React.Dispatch<SetStateAction<string>>;
  todos: Todo[];
  setTodos: React.Dispatch<SetStateAction<Todo[]>>;
};

export const TodoForm: React.FC<TodoFormProps> = ({
  query,
  setQuery,
  todos,
  setTodos,
}) => (
  <form name="todoForm">
    <input
      data-cy="NewTodoField"
      type="text"
      className="todoapp__new-todo"
      placeholder="What needs to be done?"
      value={query}
      onKeyDown={event =>
        handleKeyDown(event, query, setQuery, todos, setTodos)
      }
      onChange={event => setQuery(event.target.value)}
    />
  </form>
);
