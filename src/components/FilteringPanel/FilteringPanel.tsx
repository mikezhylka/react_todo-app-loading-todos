import React, { SetStateAction } from 'react';
import { Todo } from '../../types/Todo';
import { ClearCompletedButton } from './ClearCompletedButton';
import { Filter } from './Filter';
import { TodosLeft } from './TodosLeft';

type FilteringPanelProps = {
  todos: Todo[];
  setTodos: React.Dispatch<SetStateAction<Todo[]>>;
  setSortedTodos: React.Dispatch<SetStateAction<Todo[]>>;
};

export const FilteringPanel: React.FC<FilteringPanelProps> = ({
  todos,
  setTodos,
  setSortedTodos,
}) => (
  <footer className="todoapp__filtering-panel" data-cy="Footer">
    <TodosLeft todos={todos} />

    <Filter setSortedTodos={setSortedTodos} />

    <ClearCompletedButton todos={todos} setTodos={setTodos} />
  </footer>
);
