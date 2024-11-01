import React from 'react';
import { CustomError } from '../../types/Error';

type ErrorNotificationProps = {
  errorMessage: CustomError;
};

export const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  errorMessage,
}) => (
  <div
    data-cy="ErrorNotification"
    className="notification is-danger is-light has-text-weight-normal"
  >
    <button data-cy="HideErrorButton" type="button" className="delete" />
    {errorMessage}
  </div>
);
