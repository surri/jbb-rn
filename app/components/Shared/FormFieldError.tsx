import React from 'react';
import { FieldError } from 'react-hook-form/dist/types';

// This is my own form context (separate from react-hook-form's context).
type Props = {
  error?: FieldError;
};

const FormFieldError = ({ error }: Props) => {
    if (!error || !error.message) {
        return <></>;
    }

    const errorMessage = error.message;

    return <>{errorMessage}</>;
};

export { FormFieldError };