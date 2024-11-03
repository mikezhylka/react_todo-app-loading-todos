import React, { SetStateAction, useEffect, useState } from 'react';
import { CustomError } from '../../types/Error';
import { LoadingTodo } from '../../types/LoadingTodo';
import { Todo } from '../../types/Todo';
import { TodoItem } from './TodoItem';

type TodoListProps = {
  renderedTodos: Todo[];
  setRenderedTodos: React.Dispatch<SetStateAction<Todo[]>>;
  initialTodos: Todo[];
  setInitialTodos: React.Dispatch<SetStateAction<Todo[]>>;
  setErrorMessage: React.Dispatch<SetStateAction<CustomError>>;
  loadingTodo: LoadingTodo;
  setLoadingTodo: React.Dispatch<SetStateAction<LoadingTodo>>;
  loadingTodos: LoadingTodo[];
};

export const TodoList: React.FC<TodoListProps> = ({
  renderedTodos,
  setRenderedTodos,
  initialTodos,
  setInitialTodos,
  setErrorMessage,
  loadingTodo,
  setLoadingTodo,
  loadingTodos,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    return renderedTodos !== initialTodos
      ? setTodos(renderedTodos)
      : setTodos(initialTodos);
  }, [renderedTodos, initialTodos]);

  return (
    <section className="todoapp__todo-list" data-cy="TodoList">
      {todos.map((todo, index) => (
        <TodoItem
          todo={todo}
          setRenderedTodos={setRenderedTodos}
          key={index}
          renderedTodos={renderedTodos}
          setInitialTodos={setInitialTodos}
          setErrorMessage={setErrorMessage}
          loadingTodo={loadingTodo}
          setLoadingTodo={setLoadingTodo}
          loadingTodos={loadingTodos}
        />
      ))}
    </section>
  );
};
