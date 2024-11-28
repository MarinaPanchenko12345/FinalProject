import { useState } from "react";

const useValidation = (schema) => {
  const [errorMessages, setErrorMessages] = useState({});

  const validate = (data) => {
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      const errors = {};
      error.details.forEach((detail) => {
        const key = detail.path.join(".");
        errors[key] = detail.message;
      });
      setErrorMessages(errors);
      return false;
    }
    setErrorMessages({});
    return true;
  };

  const resetErrorMessages = () => {
    setErrorMessages({});
  };

  return { errorMessages, validate, resetErrorMessages };
};

export default useValidation;
