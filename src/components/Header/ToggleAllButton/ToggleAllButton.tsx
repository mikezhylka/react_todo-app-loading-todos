import classNames from 'classnames';
import React, { SetStateAction } from 'react';
import { CustomError } from '../../../types/Error';
import { LoadingTodo } from '../../../types/LoadingTodo';
import { Todo } from '../../../types/Todo';
import { toggleAllTodosCompletion } from '../../../utils/todoHandlers';

type ToggleAllButtonProps = {
  renderedTodos: Todo[];
  setRenderedTodos: React.Dispatch<SetStateAction<Todo[]>>;
  setInitialTodos: React.Dispatch<SetStateAction<Todo[]>>;
  setErrorMessage: React.Dispatch<SetStateAction<CustomError>>;
  setLoadingTodos: React.Dispatch<SetStateAction<LoadingTodo[]>>;
};

export const ToggleAllButton: React.FC<ToggleAllButtonProps> = ({
  renderedTodos,
  setRenderedTodos,
  setInitialTodos,
  setErrorMessage,
  setLoadingTodos,
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
        setErrorMessage,
        setLoadingTodos,
      );
    }}
  />
);
