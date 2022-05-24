import CalculatorOperation from "@/core/model/calculator/calculator-operation";
import CalculationError from "@/core/model/calculator/calculation-error";
import ValidationError from "@/core/model/validation-error";
import UseCase from "@/core/use-cases/use-case";

export interface Argument {
  operation: CalculatorOperation;
  operand1: number;
  operand2: number;
}

export type CalculationCallback = (
  error: CalculationError | undefined,
  result: number,
  argument: Argument
) => void;

export default class CalculateCommand extends UseCase<Argument, number> {
  constructor() {
    super({
      operation: CalculatorOperation.Addition,
      operand1: 0,
      operand2: 0
    });
  }

  execute(callback: CalculationCallback | undefined = undefined): number {
    const { operation, operand1, operand2 } = this.argument;

    if (isNaN(operand1) || isNaN(operand2)) {
      throw new ValidationError("Operandos no válidos");
    }

    this._result = NaN;
    this._error = undefined;

    switch (operation) {
      case CalculatorOperation.Addition:
        this._result = operand1 + operand2;
        break;
      case CalculatorOperation.Subtraction:
        this._result = operand1 - operand2;
        break;
      case CalculatorOperation.Multiplication:
        this._result = operand1 * operand2;
        break;
      case CalculatorOperation.Division:
        if (operand2 === 0) {
          this._error = new CalculationError("División por 0");
          if (callback) {
            callback(this._error, this._result, this.argument);
            return this._result;
          } else {
            throw this._error;
          }
        }

        this._result = operand1 / operand2;
        break;
    }

    if (callback) callback(undefined, this._result, this.argument);
    return this._result;
  }
}
