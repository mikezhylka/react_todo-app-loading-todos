import React from 'react';

type ErrorNotificationProps = {};

export const ErrorNotification: React.FC<ErrorNotificationProps> = ({}) => (
  <div
    data-cy="ErrorNotification"
    className="notification is-danger is-light has-text-weight-normal"
  >
    <button data-cy="HideErrorButton" type="button" className="delete" />
    Unable to load todos
    <br />
    Title should not be empty
    <br />
    Unable to add a todo
    <br />
    Unable to delete a todo
    <br />
    Unable to update a todo
  </div>
);
