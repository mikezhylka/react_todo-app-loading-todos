import classNames from 'classnames';
import React, { SetStateAction, useState } from 'react';
import { Todo } from '../../../types/Todo';
import {
  onTodoRenameKeyDown,
  toggleCompleted,
} from '../../../utils/todoHandlers';

import { deleteTodo } from '../../../utils/todoHandlers';

type TodoProps = {
  todo: Todo;
  setRenderedTodos: React.Dispatch<SetStateAction<Todo[]>>;
  setInitialTodos: React.Dispatch<SetStateAction<Todo[]>>;
  renderedTodos: Todo[];
};

export const TodoItem: React.FC<TodoProps> = ({
  todo,
  setRenderedTodos,
  setInitialTodos,
  renderedTodos,
}) => {
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [todoQuery, setTodoQuery] = useState<string>(todo.title);

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
      })}
      onDoubleClick={() => {
        setIsEdited(true);
      }}
    >
      <label
        className="todo__status-label"
        aria-label="Toggle todo status"
        onChange={() => toggleCompleted(todo.id, setRenderedTodos)}
      >
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked
        />
      </label>

      {isEdited ? (
        <form name="todoForm">
          <input
            data-cy="NewTodoField"
            type="text"
            className="todo__title-field"
            value={todoQuery}
            onBlur={() => setIsEdited(false)}
            onKeyDown={event =>
              onTodoRenameKeyDown(
                todo,
                event,
                todoQuery,
                setTodoQuery,
                renderedTodos,
                setRenderedTodos,
                setInitialTodos,
                setIsEdited,
              )
            }
            onChange={event => setTodoQuery(event.target.value)}
            autoFocus
          />
        </form>
      ) : (
        <span data-cy="TodoTitle" className="todo__title">
          {todo.title}
        </span>
      )}

      {!isEdited && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => deleteTodo(setRenderedTodos, setInitialTodos, todo.id)}
        >
          ×
        </button>
      )}

      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
