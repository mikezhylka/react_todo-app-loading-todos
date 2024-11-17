import classNames from 'classnames';
import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { useToggleAllTodosCompletion } from '../../utils/todoHandlers';
import { TodoForm } from './TodoForm';

export const Header: React.FC = () => {
  const { todos } = useAppContext();
  const toggleAllTodosCompletion = useToggleAllTodosCompletion();

  function handleToggleAllTodosCompletion() {
    toggleAllTodosCompletion();
  }

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: todos.every(todo => todo.completed),
        })}
        data-cy="ToggleAllButton"
        onClick={() => handleToggleAllTodosCompletion()}
      />

      <TodoForm />
    </header>
  );
};
