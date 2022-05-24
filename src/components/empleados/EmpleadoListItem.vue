<template>
  <v-list-item v-if="empleado" three-line>
    <v-list-item-icon>
      <v-icon
        :color="empleado.registroConfirmado ? 'accent' : 'blue-grey lighten-4'"
        v-text="
          empleado.registroConfirmado
            ? 'mdi-account-check'
            : 'mdi-account-outline'
        "
      ></v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>
        {{ empleado.nombre }} {{ empleado.apellido }} ({{ empleado.rfc }})
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ empleado.correo }}
      </v-list-item-subtitle>
      <v-list-item-subtitle>
        Género {{ empleado.genero }}, Nacimiento:
        {{ new Date(empleado.fechaNacimiento).toLocaleDateString() }}
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Empleado from "@/core/model/empleados/empleado";

@Component({
  name: "EmpleadoListItem"
})
export default class EmpleadoListItem extends Vue {
  @Prop({ type: Object, required: true }) protected empleado!: Empleado;
}
</script>
