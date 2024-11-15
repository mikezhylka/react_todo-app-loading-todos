import React, { SetStateAction } from 'react';
import { CustomError } from '../../types/Error';
import { Filter as FilterType } from '../../types/Filter';
import { LoadingTodo } from '../../types/LoadingTodo';
import { Todo } from '../../types/Todo';
import { ClearCompletedButton } from './ClearCompletedButton';
import { Filter } from './Filter/Filter';
import { TodosLeft } from './TodosLeft';

type FilteringPanelProps = {
  todos: Todo[];
  setTodos: React.Dispatch<SetStateAction<Todo[]>>;
  setErrorMessage: React.Dispatch<SetStateAction<CustomError>>;
  setLoadingTodos: React.Dispatch<SetStateAction<LoadingTodo[]>>;
  setFilter: React.Dispatch<SetStateAction<FilterType>>;
};

export const FilteringPanel: React.FC<FilteringPanelProps> = ({
  todos,
  setTodos,
  setErrorMessage,
  setLoadingTodos,
  setFilter,
}) => (
  <footer className="todoapp__filtering-panel" data-cy="Footer">
    <TodosLeft todos={todos} />

    <Filter setFilter={setFilter} />

    <ClearCompletedButton
      todos={todos}
      setTodos={setTodos}
      setErrorMessage={setErrorMessage}
      setLoadingTodos={setLoadingTodos}
    />
  </footer>
);
