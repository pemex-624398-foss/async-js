<template>
  <v-form>
    <v-text-field
      v-model="argument.nombre"
      label="Nombre"
      :disabled="saving"
    ></v-text-field>

    <v-text-field
      v-model="argument.apellido"
      label="Apellido"
      :disabled="saving"
    ></v-text-field>

    <v-row>
      <v-col>
        <v-text-field
          v-model="argument.genero"
          label="Género"
          :disabled="saving"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="argument.fechaNacimiento"
          label="Fecha de Nacimiento"
          :disabled="saving"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-text-field
      v-model="argument.rfc"
      label="RFC"
      :disabled="saving"
    ></v-text-field>

    <v-text-field
      v-model="argument.correo"
      type="email"
      label="Correo"
      :disabled="saving"
    ></v-text-field>

    <v-row class="pa-6">
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        class="me-3"
        :disabled="saving"
        @click="$emit('save')"
        >Guardar</v-btn
      >
      <v-btn
        color="primary"
        outlined
        :disabled="saving"
        @click="$emit('reset')"
      >
        Restablecer
      </v-btn>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Argument } from "@/core/use-cases/empleados/registrar-empleado-command";

@Component({
  name: "EditorRegistroEmpleado"
})
export default class EditorRegistroEmpleado extends Vue {
  @Prop({ type: Object, required: true })
  protected argument!: Argument;

  @Prop({ type: Boolean, default: false })
  protected saving!: boolean;
}
</script>
