import React, { SetStateAction } from 'react';
import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

export const filterTodos = (
  filterType: Filter,
  setSortedTodos: React.Dispatch<SetStateAction<Todo[]>>,
) => {
  switch (filterType) {
    case 'active':
      setSortedTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
      break;
    case 'completed':
      setSortedTodos(prevTodos => prevTodos.filter(todo => todo.completed));
      break;
    default:
      setSortedTodos(prevTodos => prevTodos);
  }
};
