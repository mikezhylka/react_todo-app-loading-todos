import classNames from 'classnames';
import React from 'react';
import { useAppContext } from '../../../context/AppContext';

export const Filter: React.FC = () => {
  const { filter, setFilter } = useAppContext();

  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: filter === 'all',
        })}
        data-cy="FilterLinkAll"
        onClick={() => {
          setFilter('all');
        }}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: filter === 'active',
        })}
        data-cy="FilterLinkActive"
        onClick={() => {
          setFilter('active');
        }}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: filter === 'completed',
        })}
        data-cy="FilterLinkCompleted"
        onClick={() => {
          setFilter('completed');
        }}
      >
        Completed
      </a>
    </nav>
  );
};
