import AbstractError from "@/core/model/abstract-error";
import ErrorCode from "@/core/model/error-code";

export default class CalculationError extends AbstractError {
  constructor(message: string) {
    super(ErrorCode.Calculation, message);
  }
}
