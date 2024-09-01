import { Result, ValidationError } from "express-validator";

export default function expressValidatorHelper(
  errors: Result<ValidationError>
) {
  if (!errors.isEmpty()) {
    const error = {
      code: 400,
      message: "Validation error!",
      details: errors.array(),
    };

    return error;
  }
}
