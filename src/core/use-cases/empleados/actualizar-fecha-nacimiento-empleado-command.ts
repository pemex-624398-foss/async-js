import ValidationError from "@/core/model/validation-error";
import RestService from "@/core/services/rest-service";
import UseCase from "@/core/use-cases/use-case";

export interface Argument {
  idEmpleado: string;
  fechaNacimiento: string;
}

export default class ActualizarFechaNacimientoEmpleadoCommand extends UseCase<Argument> {
  constructor() {
    super({
      idEmpleado: "",
      fechaNacimiento: ""
    });
  }

  validate() {
    const { idEmpleado, fechaNacimiento } = this.argument;

    if (!idEmpleado)
      throw new ValidationError("El identificador de empleado es requerido");

    if (!fechaNacimiento)
      throw new ValidationError("La fecha de nacimiento es requerida");
  }

  async executeAsync(): Promise<void> {
    if (this.executing)
      throw new ValidationError(
        "Ya se está actualizando la fecha de nacimiento del empleado"
      );

    this.validate();

    this._executing = true;
    try {
      await RestService.backend.patch(
        `/Empleado/${this.argument.idEmpleado}/FechaNacimiento`,
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
