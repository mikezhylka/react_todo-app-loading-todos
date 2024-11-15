import React from 'react';
import { Todo } from '../../../types/Todo';

type TodosLeftProps = {
  todos: Todo[];
};

export const TodosLeft: React.FC<TodosLeftProps> = ({ todos }) => (
  <span className="todo-count" data-cy="TodosCounter">
    {todos.filter(todo => !todo.completed).length} items left
  </span>
);
