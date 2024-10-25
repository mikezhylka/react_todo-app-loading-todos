import React, { SetStateAction } from 'react';
import { Todo } from '../../../types/Todo';

type ClearCompletedButtonProps = {
  todos: Todo[];
  setTodos: React.Dispatch<SetStateAction<Todo[]>>;
};

export const ClearCompletedButton: React.FC<ClearCompletedButtonProps> = ({
  setTodos,
}) => (
  <button
    type="button"
    className="todoapp__clear-completed"
    data-cy="ClearCompletedButton"
    onClick={() =>
      setTodos(prevTodos => prevTodos.filter(todo => !todo.completed))
    }
  >
    Clear completed
  </button>
);
