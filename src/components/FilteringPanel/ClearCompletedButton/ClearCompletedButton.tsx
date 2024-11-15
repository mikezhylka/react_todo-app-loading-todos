import React, { SetStateAction } from 'react';
import { CustomError } from '../../../types/Error';
import { LoadingTodo } from '../../../types/LoadingTodo';
import { Todo } from '../../../types/Todo';
import { removeCompletedTodos } from '../../../utils/todoHandlers';

type ClearCompletedButtonProps = {
  todos: Todo[];
  setTodos: React.Dispatch<SetStateAction<Todo[]>>;
  setErrorMessage: React.Dispatch<SetStateAction<CustomError>>;
  setLoadingTodos: React.Dispatch<SetStateAction<LoadingTodo[]>>;
};

export const ClearCompletedButton: React.FC<ClearCompletedButtonProps> = ({
  todos,
  setTodos,
  setErrorMessage,
  setLoadingTodos,
}) => (
  <button
    type="button"
    className="todoapp__clear-completed"
    data-cy="ClearCompletedButton"
    onClick={() =>
      removeCompletedTodos(todos, setTodos, setErrorMessage, setLoadingTodos)
    }
  >
    Clear completed
  </button>
);
