import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach(error => {
    const { path } = error;
    if (path) {
      validationErrors[path] = error.message;
    }
  });

  return validationErrors;
}
