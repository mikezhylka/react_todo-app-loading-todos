import React, { SetStateAction } from 'react';
import { Todo } from '../../types/Todo';
import { ClearCompletedButton } from './ClearCompletedButton';
import { Filter } from './Filter';
import { TodosLeft } from './TodosLeft';

type FilteringPanelProps = {
  initialTodos: Todo[];
  renderedTodos: Todo[];
  setRenderedTodos: React.Dispatch<SetStateAction<Todo[]>>;
  setInitialTodos: React.Dispatch<SetStateAction<Todo[]>>;
};

export const FilteringPanel: React.FC<FilteringPanelProps> = ({
  initialTodos,
  renderedTodos,
  setRenderedTodos,
  setInitialTodos,
}) => (
  <footer className="todoapp__filtering-panel" data-cy="Footer">
    <TodosLeft renderedTodos={renderedTodos} />

    <Filter
      initialTodos={initialTodos}
      setRenderedTodos={setRenderedTodos}
      renderedTodos={renderedTodos}
    />

    <ClearCompletedButton
      renderedTodos={renderedTodos}
      setRenderedTodos={setRenderedTodos}
      setInitialTodos={setInitialTodos}
    />
  </footer>
);
