import classNames from 'classnames';
import React, { SetStateAction } from 'react';
import { Todo } from '../../../types/Todo';
import { toggleAllTodos } from '../../../utils/todoHandlers';

type ToggleAllButtonProps = {
  todos: Todo[];
  setTodos: React.Dispatch<SetStateAction<Todo[]>>;
};

export const ToggleAllButton: React.FC<ToggleAllButtonProps> = ({
  todos,
  setTodos,
}) => (
  <button
    type="button"
    className={classNames('todoapp__toggle-all', {
      active: todos.every(todo => todo.completed),
    })}
    data-cy="ToggleAllButton"
    onClick={() => {
      toggleAllTodos(todos, setTodos);
    }}
  />
);
