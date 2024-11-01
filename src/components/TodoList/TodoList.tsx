import React, { SetStateAction, useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from './TodoItem';

type TodoListProps = {
  renderedTodos: Todo[];
  setRenderedTodos: React.Dispatch<SetStateAction<Todo[]>>;
  initialTodos: Todo[];
  setInitialTodos: React.Dispatch<SetStateAction<Todo[]>>;
};

export const TodoList: React.FC<TodoListProps> = ({
  renderedTodos,
  setRenderedTodos,
  initialTodos,
  setInitialTodos,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    return renderedTodos !== initialTodos
      ? setTodos(renderedTodos)
      : setTodos(initialTodos);
  }, [renderedTodos, initialTodos]);

  return (
    <section className="todoapp__todo-list" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          setRenderedTodos={setRenderedTodos}
          key={todo.id}
          renderedTodos={renderedTodos}
          setInitialTodos={setInitialTodos}
        />
      ))}
    </section>
  );
};
