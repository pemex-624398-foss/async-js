import UseCase from "@/core/use-cases/use-case";
import Empleado from "@/core/model/empleados/empleado";
import RestService from "@/core/services/rest-service";

export default class GetEmpleadoListQuery extends UseCase<
  undefined,
  Array<Empleado>
> {
  constructor() {
    super(undefined, []);
  }

  async executeAsync(): Promise<Array<Empleado>> {
    this._error = undefined;
    this._executing = true;
    try {
      this._result = await RestService.backend.get("/Empleado");
      return <Array<Empleado>>this._result;
    } catch (error) {
      this._error = error;
      throw error;
    } finally {
      this._executing = false;
    }
  }
}
