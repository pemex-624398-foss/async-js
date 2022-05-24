<template>
  <v-list v-if="list">
    <template v-if="list.length > 0">
      <template v-for="empleado in list">
        <empleado-list-item
          :key="empleado.idEmpleado"
          :empleado="empleado"
        ></empleado-list-item>
      </template>
    </template>
    <v-list-item v-else>
      <v-list-item-content>
        <v-list-item-title>Lista vacía</v-list-item-title>
        <v-list-item-subtitle>No hay datos para mostrar</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import EmpleadoListItem from "@/components/empleados/EmpleadoListItem.vue";
import Empleado from "@/core/model/empleados/empleado";

@Component({
  name: "EmpleadoList",
  components: { EmpleadoListItem }
})
export default class EmpleadoList extends Vue {
  @Prop({ type: Array, required: true }) protected list!: Array<Empleado>;
}
</script>
