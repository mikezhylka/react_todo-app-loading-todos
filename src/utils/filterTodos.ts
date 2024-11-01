import { SetStateAction } from 'react';
import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

export const filterTodos = (
  filterType: Filter,
  setRenderedTodos: React.Dispatch<SetStateAction<Todo[]>>,
  initialTodos: Todo[],
) => {
  switch (filterType) {
    case 'active':
      setRenderedTodos(initialTodos.filter(todo => !todo.completed));
      break;
    case 'completed':
      setRenderedTodos(initialTodos.filter(todo => todo.completed));
      break;
    default:
      setRenderedTodos(initialTodos);
      break;
  }
};
