import React, { SetStateAction } from 'react';
import { CustomError } from '../../types/Error';
import { Filter } from '../../types/Filter';
import { LoadingTodo } from '../../types/LoadingTodo';
import { Todo } from '../../types/Todo';
import { TodoItem } from './TodoItem';

type TodoListProps = {
  todos: Todo[];
  setTodos: React.Dispatch<SetStateAction<Todo[]>>;
  setErrorMessage: React.Dispatch<SetStateAction<CustomError>>;
  loadingTodo: LoadingTodo;
  setLoadingTodo: React.Dispatch<SetStateAction<LoadingTodo>>;
  loadingTodos: LoadingTodo[];
  filter: Filter;
};

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  setTodos,
  setErrorMessage,
  loadingTodo,
  setLoadingTodo,
  loadingTodos,
  filter,
}) => {
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  return (
    <section className="todoapp__todo-list" data-cy="TodoList">
      {filteredTodos.map((todo, index) => (
        <TodoItem
          todo={todo}
          todos={todos}
          setTodos={setTodos}
          key={index}
          setErrorMessage={setErrorMessage}
          loadingTodo={loadingTodo}
          setLoadingTodo={setLoadingTodo}
          loadingTodos={loadingTodos}
        />
      ))}
    </section>
  );
};
