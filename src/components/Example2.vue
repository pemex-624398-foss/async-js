<template>
  <v-row>
    <v-col>
      <v-card>
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Origen</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn text @click="moveToTarget">
            Mover
            <v-icon right>mdi-arrow-right-thick</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container fluid>
          <data-record-list :records="sourceRecordList"></data-record-list>
        </v-container>
      </v-card>
    </v-col>
    <v-col>
      <v-card>
        <v-toolbar color="accent" dark flat>
          <v-btn text @click="moveToSource">
            <v-icon left>mdi-arrow-left-thick</v-icon>
            Mover
          </v-btn>
          <v-spacer></v-spacer>
          <v-toolbar-title>Destino</v-toolbar-title>
        </v-toolbar>
        <v-container fluid>
          <data-record-list :records="targetRecordList"></data-record-list>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import DataRecord from "@/core/model/data-record";
import DataRecordList from "@/components/DataRecordList.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Example2",
  components: { DataRecordList }
})
export default class Example2 extends Vue {
  // Data
  protected sourceRecordList: Array<DataRecord> = [];
  protected targetRecordList: Array<DataRecord> = [];
  protected working = false;

  // Methods
  moveRecord(
    index: number,
    sourceList: Array<DataRecord>,
    targetList: Array<DataRecord>
  ) {
    if (index < 0 || index >= sourceList.length) return;

    const record = sourceList[index];
    sourceList.splice(index, 1);
    targetList.push(record);
  }

  moveToTarget() {
    if (this.working) return;
  }

  moveToSource() {
    if (this.working) return;
  }

  // Hooks
  mounted() {
    for (let num = 1; num <= 10; num++) {
      this.sourceRecordList.push({
        name: `Registro ${num}`,
        description: `Elemento número ${num} de la lista`
      });
    }
  }
}
</script>
