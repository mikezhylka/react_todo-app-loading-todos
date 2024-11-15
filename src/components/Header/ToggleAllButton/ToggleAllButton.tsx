import classNames from 'classnames';
import React, { SetStateAction } from 'react';
import { CustomError } from '../../../types/Error';
import { LoadingTodo } from '../../../types/LoadingTodo';
import { Todo } from '../../../types/Todo';
import { toggleAllTodosCompletion } from '../../../utils/todoHandlers';

type ToggleAllButtonProps = {
  todos: Todo[];
  setTodos: React.Dispatch<SetStateAction<Todo[]>>;
  setErrorMessage: React.Dispatch<SetStateAction<CustomError>>;
  setLoadingTodos: React.Dispatch<SetStateAction<LoadingTodo[]>>;
};

export const ToggleAllButton: React.FC<ToggleAllButtonProps> = ({
  todos,
  setTodos,
  setErrorMessage,
  setLoadingTodos,
}) => (
  <button
    type="button"
    className={classNames('todoapp__toggle-all', {
      active: todos.every(todo => todo.completed),
    })}
    data-cy="ToggleAllButton"
    onClick={() => {
      toggleAllTodosCompletion(
        todos,
        setTodos,
        setErrorMessage,
        setLoadingTodos,
      );
    }}
  />
);
