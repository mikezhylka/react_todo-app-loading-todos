import { SetStateAction } from 'react';
import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

export const filterTodos = (
  filterType: Filter,
  setTodos: React.Dispatch<SetStateAction<Todo[]>>,
) => {
  switch (filterType) {
    case 'active':
      setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
      break;
    case 'completed':
      setTodos(prevTodos => prevTodos.filter(todo => todo.completed));
      break;
    default:
      setTodos(prevTodos => prevTodos);
      break;
  }
};
