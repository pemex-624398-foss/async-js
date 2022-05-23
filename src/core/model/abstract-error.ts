import ErrorCode from "@/core/model/error-code";

export default class AbstractError {
  public readonly code: ErrorCode;
  public readonly message: string;

  protected constructor(code: ErrorCode, message: string) {
    this.code = code;
    this.message = message;
  }
}
