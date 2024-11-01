import classNames from 'classnames';
import React, { SetStateAction, useState } from 'react';
import { Filter as FilterType } from '../../../types/Filter';
import { Todo } from '../../../types/Todo';
import { filterTodos } from '../../../utils/filterTodos';

type FilterProps = {
  initialTodos: Todo[];
  setRenderedTodos: React.Dispatch<SetStateAction<Todo[]>>;
  renderedTodos: Todo[];
};

export const Filter: React.FC<FilterProps> = ({
  initialTodos,
  setRenderedTodos,
  // renderedTodos,
}) => {
  const [selectedLink, setSelectedLink] = useState<FilterType>('all');

  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: selectedLink === 'all',
        })}
        data-cy="FilterLinkAll"
        onClick={() => {
          setSelectedLink('all');
          filterTodos('all', setRenderedTodos, initialTodos);
        }}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: selectedLink === 'active',
        })}
        data-cy="FilterLinkActive"
        onClick={() => {
          setSelectedLink('active');
          filterTodos('active', setRenderedTodos, initialTodos);
        }}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: selectedLink === 'completed',
        })}
        data-cy="FilterLinkCompleted"
        onClick={() => {
          setSelectedLink('completed');
          filterTodos('completed', setRenderedTodos, initialTodos);
        }}
      >
        Completed
      </a>
    </nav>
  );
};
