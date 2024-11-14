import classNames from 'classnames';
import React, { SetStateAction } from 'react';
import { CustomError } from '../../types/Error';

type ErrorNotificationProps = {
  errorMessage: CustomError;
  setErrorMessage: React.Dispatch<SetStateAction<CustomError>>;
};

export const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  errorMessage,
  setErrorMessage,
}) => {
  setInterval(() => {
    setErrorMessage('');
  }, 3000);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !errorMessage },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setErrorMessage('')}
      />
      {errorMessage}
    </div>
  );
};
