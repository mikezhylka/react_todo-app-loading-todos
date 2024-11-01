import React, { SetStateAction } from 'react';
import { Todo } from '../../../types/Todo';
import { removeCompletedTodos } from '../../../utils/todoHandlers';

type ClearCompletedButtonProps = {
  renderedTodos: Todo[];
  setRenderedTodos: React.Dispatch<SetStateAction<Todo[]>>;
  setInitialTodos: React.Dispatch<SetStateAction<Todo[]>>;
};

export const ClearCompletedButton: React.FC<ClearCompletedButtonProps> = ({
  setRenderedTodos,
  setInitialTodos,
}) => (
  <button
    type="button"
    className="todoapp__clear-completed"
    data-cy="ClearCompletedButton"
    onClick={() => removeCompletedTodos(setRenderedTodos, setInitialTodos)}
  >
    Clear completed
  </button>
);
