import CalculatorOperation from "@/core/model/calculator-operation";
import CalculationError from "@/core/model/calculation-error";
import ValidationError from "@/core/model/validation-error";

export interface CalculationArgument {
  a: number;
  b: number;
  operation: CalculatorOperation;
}

export type CalculationCallback = (
  error: CalculationError | undefined,
  result: number | undefined,
  argument: CalculationArgument
) => void;

export default class CalculateCommand {
  execute(
    argument: CalculationArgument,
    callback: CalculationCallback | undefined = undefined
  ): number {
    const { a, b, operation } = argument;

    if (isNaN(a) || isNaN(b)) {
      throw new ValidationError("Operandos no válidos");
    }

    let result = NaN;

    switch (operation) {
      case CalculatorOperation.Addition:
        result = a + b;
        break;
      case CalculatorOperation.Subtraction:
        result = a - b;
        break;
      case CalculatorOperation.Multiplication:
        result = a * b;
        break;
      case CalculatorOperation.Division:
        if (b === 0) {
          const error = new CalculationError("División por 0");
          if (callback) {
            callback(error, undefined, argument);
            return result;
          } else {
            throw error;
          }
        }

        result = a / b;
        break;
    }

    if (callback) callback(undefined, result, argument);
    return result;
  }
}
