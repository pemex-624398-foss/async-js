import ValidationError from "@/core/model/validation-error";
import UseCase from "@/core/use-cases/use-case";
import RestService from "@/core/services/rest-service";

export interface Argument {
  nombre: string;
  apellido: string;
  genero: string;
  fechaNacimiento: string;
  rfc: string;
  correo: string;
}

export interface Result {
  idEmpleado: string;
}

export default class RegistrarEmpleadoCommand extends UseCase<
  Argument,
  Result
> {
  constructor() {
    super({
      nombre: "",
      apellido: "",
      genero: "",
      fechaNacimiento: "",
      rfc: "",
      correo: ""
    });
  }

  validate() {
    const { nombre, apellido, genero, fechaNacimiento, rfc, correo } =
      this.argument;

    if (!nombre) throw new ValidationError("El nombre es requerido");
    if (!apellido) throw new ValidationError("El apellido es requerido");
    if (!genero) throw new ValidationError("El género es requerido");

    if (!fechaNacimiento)
      throw new ValidationError("La fecha de nacimiento es requerida");

    if (!rfc) throw new ValidationError("El RFC es requerido");
    if (!correo) throw new ValidationError("El correo es requerido");
  }

  async executeAsync(): Promise<Result> {
    this._executing = true;
    try {
      this.validate();
      this._result = <Result>(
        await RestService.backend.post("/Empleado", this.argument)
      );
      return this._result;
    } catch (error) {
      this._error = error;
      throw error;
    } finally {
      this._executing = false;
    }
  }
}
