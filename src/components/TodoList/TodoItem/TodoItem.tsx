import classNames from 'classnames';
import React, { SetStateAction } from 'react';
import { Todo } from '../../../types/Todo';
import { toggleCompleted } from '../../../utils/todoHandlers';

type TodoProps = {
  todo: Todo;
  setTodos: React.Dispatch<SetStateAction<Todo[]>>;
};

export const TodoItem: React.FC<TodoProps> = ({ todo, setTodos }) => (
  <div
    data-cy="Todo"
    className={classNames('todo', {
      // completed: todo.completed || modifiedTodoIds.includes(todo.id),
      completed: todo.completed,
    })}
  >
    <label
      className="todo__status-label"
      aria-label="Toggle todo status"
      onChange={() => toggleCompleted(todo.id, setTodos)}
    >
      <input
        data-cy="TodoStatus"
        type="checkbox"
        className="todo__status"
        defaultChecked
      />
    </label>

    <span data-cy="TodoTitle" className="todo__title">
      {todo.title}
    </span>
    <button
      type="button"
      className="todo__remove"
      data-cy="TodoDelete"
      onClick={() => {
        setTodos(prevTodos => prevTodos.filter(item => item.id !== todo.id));
      }}
    >
      ×
    </button>

    <div data-cy="TodoLoader" className="modal overlay">
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  </div>
);