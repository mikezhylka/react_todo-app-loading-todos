import React from 'react';
import { Todo } from '../../../types/Todo';

type TodosLeftProps = {
  initialTodos: Todo[];
};

export const TodosLeft: React.FC<TodosLeftProps> = ({ initialTodos }) => (
  <span className="todo-count" data-cy="TodosCounter">
    {initialTodos.filter(todo => !todo.completed).length} items left
  </span>
);
