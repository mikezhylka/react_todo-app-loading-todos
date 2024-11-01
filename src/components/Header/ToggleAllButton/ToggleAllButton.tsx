import classNames from 'classnames';
import React, { SetStateAction } from 'react';
import { Todo } from '../../../types/Todo';
import { toggleAllTodosCompletion } from '../../../utils/todoHandlers';

type ToggleAllButtonProps = {
  renderedTodos: Todo[];
  setRenderedTodos: React.Dispatch<SetStateAction<Todo[]>>;
  setInitialTodos: React.Dispatch<SetStateAction<Todo[]>>;
};

export const ToggleAllButton: React.FC<ToggleAllButtonProps> = ({
  renderedTodos,
  setRenderedTodos,
  setInitialTodos,
}) => (
  <button
    type="button"
    className={classNames('todoapp__toggle-all', {
      active: renderedTodos.every(todo => todo.completed),
    })}
    data-cy="ToggleAllButton"
    onClick={() => {
      toggleAllTodosCompletion(
        renderedTodos,
        setRenderedTodos,
        setInitialTodos,
      );
    }}
  />
);
