import React from 'react';
import { Todo } from '../../../types/Todo';

type TodosLeftProps = {
  renderedTodos: Todo[];
};

export const TodosLeft: React.FC<TodosLeftProps> = ({ renderedTodos }) => (
  <span className="todo-count" data-cy="TodosCounter">
    {renderedTodos?.filter(todo => !todo.completed).length} items left
  </span>
);
