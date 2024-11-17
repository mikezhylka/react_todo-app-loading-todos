import React, { useEffect } from 'react';
import { useAppContext } from '../../../context/AppContext';
import { useAddTodo } from '../../../utils/todoHandlers';

export const TodoForm: React.FC = () => {
  const { query, setQuery, isFormDisabled, inputRef } = useAppContext();
  const addTodo = useAddTodo();

  function handleAddingTodo() {
    addTodo();
  }

  useEffect(() => {
    if (!isFormDisabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef, isFormDisabled]);

  return (
    <form
      name="todoForm"
      onSubmit={event => {
        event.preventDefault();
        handleAddingTodo();
      }}
    >
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        ref={inputRef}
        placeholder="What needs to be done?"
        value={query}
        onChange={event => setQuery(event.target.value)}
        autoFocus
        disabled={isFormDisabled}
      />
    </form>
  );
};
