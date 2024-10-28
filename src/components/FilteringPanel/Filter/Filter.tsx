import classNames from 'classnames';
import React, { SetStateAction, useState } from 'react';
import { Filter as FilterType } from '../../../types/Filter';
import { Todo } from '../../../types/Todo';
import { filterTodos } from '../../../utils/filterTodos';

type FilterProps = {
  setSortedTodos: React.Dispatch<SetStateAction<Todo[]>>;
  todos: Todo[];
};

export const Filter: React.FC<FilterProps> = ({ setSortedTodos, todos }) => {
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
          filterTodos('all', setSortedTodos, todos);
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
          filterTodos('active', setSortedTodos);
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
          filterTodos('completed', setSortedTodos);
        }}
      >
        Completed
      </a>
    </nav>
  );
};
