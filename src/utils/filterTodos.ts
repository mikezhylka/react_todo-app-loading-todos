import React, { SetStateAction } from 'react';
import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

export const filterTodos = (
  filterType: Filter,
  setSortedTodos: React.Dispatch<SetStateAction<Todo[]>>,
  todos?: Todo[],
) => {
  switch (filterType) {
    case 'active':
      return todos && setSortedTodos(todos.filter(todo => !todo.completed));

    case 'completed':
      return todos && setSortedTodos(todos.filter(todo => todo.completed));

    default:
      return todos && setSortedTodos(todos);
  }
};
