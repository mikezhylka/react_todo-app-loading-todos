import classNames from 'classnames';
import React, { SetStateAction, useState } from 'react';
import { Filter as FilterType } from '../../../types/Filter';

type FilterProps = {
  setFilter: React.Dispatch<SetStateAction<FilterType>>;
};

export const Filter: React.FC<FilterProps> = ({ setFilter }) => {
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
          setFilter('all');
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
          setFilter('active');
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
          setFilter('completed');
        }}
      >
        Completed
      </a>
    </nav>
  );
};
