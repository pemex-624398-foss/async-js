import CalculateCommand from "@/core/use-cases/calculator/calculate-command";

export default class CalculateExtendedCommand extends CalculateCommand {
  constructor() {
    super();
  }

  executeAsync(): Promise<number> {
    this._result = NaN;
    this._error = undefined;
    this._executing = true;

    const promise = new Promise<number>((resolve, reject) => {
      setTimeout(() => {
        try {
          this._result = this.execute();
          resolve(this._result);
        } catch (error) {
          this._error = error;
          reject(error);
        }
      }, 3000);
    });

    promise.finally(() => (this._executing = false));
    return promise;
  }
}
