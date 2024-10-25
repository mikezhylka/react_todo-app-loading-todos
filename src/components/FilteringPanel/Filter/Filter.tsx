import React, { SetStateAction } from 'react';
import { Todo } from '../../../types/Todo';
import { filterTodos } from '../../../utils/filterTodos';

type FilterProps = {
  setTodos: React.Dispatch<SetStateAction<Todo[]>>;
};

export const Filter: React.FC<FilterProps> = ({ setTodos }) => (
  <nav className="filter" data-cy="Filter">
    <a
      href="#/"
      className="filter__link selected"
      data-cy="FilterLinkAll"
      onClick={() => filterTodos('all', setTodos)}
    >
      All
    </a>

    <a
      href="#/active"
      className="filter__link"
      data-cy="FilterLinkActive"
      onClick={() => filterTodos('active', setTodos)}
    >
      Active
    </a>

    <a
      href="#/completed"
      className="filter__link"
      data-cy="FilterLinkCompleted"
      onClick={() => filterTodos('completed', setTodos)}
    >
      Completed
    </a>
  </nav>
);
