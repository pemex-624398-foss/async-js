import CalculateCommand, {
  CalculationArgument
} from "@/core/use-cases/calculate-command";

export default class CalculateExtendedCommand extends CalculateCommand {
  private _executing = false;
  private _result: number | undefined;

  executeAsync(argument: CalculationArgument): Promise<number> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this._result = undefined;
        this._executing = true;

        try {
          const result = this.execute(argument);
          resolve(result);
        } catch (error) {
          reject(error);
        } finally {
          this._executing = false;
        }
      }, 4000);
    });
  }

  public get executing(): boolean {
    return this._executing;
  }

  public get result(): number | undefined {
    return this._result;
  }
}
