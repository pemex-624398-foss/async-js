import ValidationError from "@/core/model/validation-error";
import RestService from "@/core/services/rest-service";
import UseCase from "@/core/use-cases/use-case";

export interface Argument {
  idEmpleado: string;
  genero: string;
}

export default class ActualizarGeneroEmpleadoCommand extends UseCase<Argument> {
  constructor() {
    super({
      idEmpleado: "",
      genero: ""
    });
  }

  validate() {
    const { idEmpleado, genero } = this.argument;

    if (!idEmpleado)
      throw new ValidationError("El identificador de empleado es requerido");

    if (!genero) throw new ValidationError("El género es requerido");
  }

  async executeAsync(): Promise<void> {
    if (this.executing)
      throw new ValidationError(
        "Ya se está actualizando el género del empleado"
      );

    this.validate();

    this._executing = true;
    try {
      await RestService.backend.patch(
        `/Empleado/${this.argument.idEmpleado}/Genero`,
        this.argument
      );
    } catch (error) {
      this._error = error;
      throw error;
    } finally {
      this._executing = false;
    }
  }
}
