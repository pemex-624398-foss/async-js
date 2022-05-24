import ValidationError from "@/core/model/validation-error";
import RestService from "@/core/services/rest-service";
import UseCase from "@/core/use-cases/use-case";

export interface Argument {
  idEmpleado: string;
  nombre: string;
  apellido: string;
}

export default class ActualizarNombreEmpleadoCommand extends UseCase<Argument> {
  constructor() {
    super({
      idEmpleado: "",
      nombre: "",
      apellido: ""
    });
  }

  validate() {
    const { idEmpleado, nombre, apellido } = this.argument;

    if (!idEmpleado)
      throw new ValidationError("El identificador de empleado es requerido");

    if (!nombre) throw new ValidationError("El nombre es requerido");
    if (!apellido) throw new ValidationError("El apellido es requerido");
  }

  async executeAsync(): Promise<void> {
    if (this.executing)
      throw new ValidationError(
        "Ya se está actualizando el nombre y apellido del empleado"
      );

    this.validate();

    this._executing = true;
    try {
      await RestService.backend.patch(
        `/Empleado/${this.argument.idEmpleado}/Nombre`,
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
