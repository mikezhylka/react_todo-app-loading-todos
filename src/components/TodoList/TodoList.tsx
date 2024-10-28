import React, { SetStateAction, useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from './TodoItem';

type TodoListProps = {
  todos: Todo[];
  setTodos: React.Dispatch<SetStateAction<Todo[]>>;
  sortedTodos: Todo[];
};

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  setTodos,
  sortedTodos,
}) => {
  const [renderedTodos, setRenderedTodos] = useState<Todo[]>([]);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('rerendered');

    return sortedTodos && sortedTodos.length > 0
      ? setRenderedTodos(sortedTodos)
      : setRenderedTodos(todos);
  }, [sortedTodos, todos]);

  return (
    <section className="todoapp__todo-list" data-cy="TodoList">
      {renderedTodos.map(todo => (
        <TodoItem todo={todo} setTodos={setTodos} key={todo.id} />
      ))}
    </section>
  );
};
