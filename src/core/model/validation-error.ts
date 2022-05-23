import AbstractError from "@/core/model/abstract-error";
import ErrorCode from "@/core/model/error-code";

export default class ValidationError extends AbstractError {
  constructor(message: string) {
    super(ErrorCode.Validation, message);
  }
}
