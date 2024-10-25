import React, { SetStateAction } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from './TodoItem';

type TodoListProps = {
  todos: Todo[];
  setTodos: React.Dispatch<SetStateAction<Todo[]>>;
};

export const TodoList: React.FC<TodoListProps> = ({ todos, setTodos }) => {
  let renderedTodos: Todo[] = todos;

  return (
    <section className="todoapp__todo-list" data-cy="TodoList">
      {renderedTodos.map(todo => (
        <TodoItem todo={todo} setTodos={setTodos} key={todo.id} />
      ))}
    </section>
  );
};
