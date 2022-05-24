export default class UseCase<A = undefined, R = undefined> {
  public readonly argument: A;
  protected _executing = false;
  protected _result: R | undefined = undefined;
  protected _error: any;

  protected constructor(argument: A, result: R | undefined = undefined) {
    this.argument = argument;
    this._result = result;
  }

  public get executing(): boolean {
    return this._executing;
  }

  public get result(): R | undefined {
    return this._result;
  }

  public get error(): any {
    return this._error;
  }
}
