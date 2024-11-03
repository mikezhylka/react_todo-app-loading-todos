import classNames from 'classnames';
import React, { SetStateAction, useState } from 'react';
import { Todo } from '../../../types/Todo';
import {
  onEnterRenameTodo,
  toggleTodoCompletion,
} from '../../../utils/todoHandlers';

import { CustomError } from '../../../types/Error';
import { LoadingTodo } from '../../../types/LoadingTodo';
import { removeTodo } from '../../../utils/todoHandlers';

type TodoProps = {
  todo: Todo;
  setRenderedTodos: React.Dispatch<SetStateAction<Todo[]>>;
  setInitialTodos: React.Dispatch<SetStateAction<Todo[]>>;
  renderedTodos: Todo[];
  setErrorMessage: React.Dispatch<SetStateAction<CustomError>>;
  loadingTodo: LoadingTodo;
  setLoadingTodo: React.Dispatch<SetStateAction<LoadingTodo>>;
  loadingTodos: LoadingTodo[];
};

export const TodoItem: React.FC<TodoProps> = ({
  todo,
  setRenderedTodos,
  setInitialTodos,
  renderedTodos,
  setErrorMessage,
  loadingTodo,
  setLoadingTodo,
  loadingTodos,
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
        onChange={() =>
          toggleTodoCompletion(
            todo.id,
            setRenderedTodos,
            setInitialTodos,
            setErrorMessage,
            setLoadingTodo,
          )
        }
      >
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked
        />
      </label>

      {isEdited ? (
        <form name="todoForm" onSubmit={e => e.preventDefault()}>
          <input
            data-cy="NewTodoField"
            type="text"
            className="todo__title-field"
            value={todoQuery}
            onBlur={() => setIsEdited(false)}
            onKeyDown={event =>
              onEnterRenameTodo(
                todo,
                event,
                todoQuery,
                setTodoQuery,
                renderedTodos,
                setRenderedTodos,
                setInitialTodos,
                setIsEdited,
                setErrorMessage,
                setLoadingTodo,
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
          onClick={() =>
            removeTodo(
              setRenderedTodos,
              setInitialTodos,
              todo.id,
              setErrorMessage,
              setLoadingTodo,
            )
          }
        >
          ×
        </button>
      )}

      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', {
          'is-active':
            loadingTodo?.id === todo.id ||
            loadingTodos.find(t => t?.id === todo.id),
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
