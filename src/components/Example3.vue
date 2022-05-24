<template>
  <v-container>
    <v-row>
      <v-col v-if="registrarEmpleadoCommand" cols="12" sm="6">
        <v-card :loading="registrarEmpleadoCommand.executing">
          <v-toolbar color="secondary" dark flat>
            <v-toolbar-title>
              <v-icon left>mdi-account-edit-outline</v-icon>
              Registro de Empleado
            </v-toolbar-title>
          </v-toolbar>
          <v-container class="px-6">
            <v-row>
              <v-col>
                <editor-registro-empleado
                  :argument="registrarEmpleadoCommand.argument"
                  :saving="registrarEmpleadoCommand.executing"
                  @save="registrarEmpleado"
                  @reset="restablecerRegistroEmpleado"
                ></editor-registro-empleado>
              </v-col>
            </v-row>
          </v-container>
          <v-sheet v-if="registrarEmpleadoCommand.error" class="px-6 pb-1">
            <v-alert type="error" border="bottom">
              {{ registrarEmpleadoCommand.error.message }}
            </v-alert>
          </v-sheet>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card :loading="getEmpleadoListQuery.executing">
          <v-toolbar color="accent" dark flat>
            <v-toolbar-title>
              <v-icon left>mdi-account-group-outline</v-icon>
              Empleados Registrados
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
              <template #activator="{ on }">
                <v-btn
                  icon
                  v-on="on"
                  :disabled="getEmpleadoListQuery.executing"
                  @click="getEmpleadoList"
                >
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </template>
              Actualizar
            </v-tooltip>
          </v-toolbar>
          <empleado-list :list="getEmpleadoListQuery.result"></empleado-list>
          <v-sheet v-if="getEmpleadoListQuery.error" class="px-6 pb-1">
            <v-alert type="error" border="bottom">
              {{ getEmpleadoListQuery.error.message }}
            </v-alert>
          </v-sheet>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import RegistrarEmpleadoCommand from "@/core/use-cases/empleados/registrar-empleado-command";
import { Component, Vue } from "vue-property-decorator";
import EditorRegistroEmpleado from "@/components/empleados/EditorRegistroEmpleado.vue";
import EmpleadoList from "@/components/empleados/EmpleadoList.vue";
import GetEmpleadoListQuery from "@/core/use-cases/empleados/get-empleado-list-query";

@Component({
  name: "Example3",
  components: { EmpleadoList, EditorRegistroEmpleado }
})
export default class Example3 extends Vue {
  // Data
  protected getEmpleadoListQuery = new GetEmpleadoListQuery();
  protected registrarEmpleadoCommand: RegistrarEmpleadoCommand | null = null;

  // Methods
  async getEmpleadoList() {
    try {
      await this.getEmpleadoListQuery.executeAsync();
    } catch (error) {
      console.error(error);
    }
  }

  async registrarEmpleado() {
    try {
      await this.registrarEmpleadoCommand?.executeAsync();
    } catch (error) {
      console.error(error);
    }
  }

  restablecerRegistroEmpleado() {
    this.registrarEmpleadoCommand = new RegistrarEmpleadoCommand();
  }

  // Hooks
  mounted() {
    this.restablecerRegistroEmpleado();
    this.getEmpleadoList();
  }
}
</script>
