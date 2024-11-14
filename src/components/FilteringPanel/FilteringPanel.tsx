import React, { SetStateAction } from 'react';
import { CustomError } from '../../types/Error';
import { LoadingTodo } from '../../types/LoadingTodo';
import { Todo } from '../../types/Todo';
import { ClearCompletedButton } from './ClearCompletedButton';
import { Filter } from './Filter';
import { TodosLeft } from './TodosLeft';

type FilteringPanelProps = {
  initialTodos: Todo[];
  renderedTodos: Todo[];
  setRenderedTodos: React.Dispatch<SetStateAction<Todo[]>>;
  setInitialTodos: React.Dispatch<SetStateAction<Todo[]>>;
  setErrorMessage: React.Dispatch<SetStateAction<CustomError>>;
  setLoadingTodos: React.Dispatch<SetStateAction<LoadingTodo[]>>;
};

export const FilteringPanel: React.FC<FilteringPanelProps> = ({
  initialTodos,
  renderedTodos,
  setRenderedTodos,
  setInitialTodos,
  setErrorMessage,
  setLoadingTodos,
}) => (
  <footer className="todoapp__filtering-panel" data-cy="Footer">
    <TodosLeft initialTodos={initialTodos} />

    <Filter
      initialTodos={initialTodos}
      setRenderedTodos={setRenderedTodos}
      renderedTodos={renderedTodos}
    />

    <ClearCompletedButton
      initialTodos={initialTodos}
      setRenderedTodos={setRenderedTodos}
      setInitialTodos={setInitialTodos}
      setErrorMessage={setErrorMessage}
      setLoadingTodos={setLoadingTodos}
    />
  </footer>
);
