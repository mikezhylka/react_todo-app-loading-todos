import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import { CustomError } from '../../../types/Error';
import { LoadingTodo } from '../../../types/LoadingTodo';
import { Todo } from '../../../types/Todo';
import { onEnterAddTodo } from '../../../utils/todoHandlers';

type TodoFormProps = {
  query: string;
  setQuery: React.Dispatch<SetStateAction<string>>;
  setTodos: React.Dispatch<SetStateAction<Todo[]>>;
  setErrorMessage: React.Dispatch<SetStateAction<CustomError>>;
  setLoadingTodo: React.Dispatch<SetStateAction<LoadingTodo>>;
};

export const TodoForm: React.FC<TodoFormProps> = ({
  query,
  setQuery,
  setTodos,
  setErrorMessage,
  setLoadingTodo,
}) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onEnterAddTodo(
      query,
      setQuery,
      setTodos,
      setErrorMessage,
      setLoadingTodo,
      setIsDisabled,
    );
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [query]);

  return (
    <form name="todoForm" onSubmit={event => handleSubmit(event)}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        ref={inputRef}
        placeholder="What needs to be done?"
        value={query}
        onChange={event => setQuery(event.target.value)}
        autoFocus
        disabled={isDisabled}
      />
    </form>
  );
};
