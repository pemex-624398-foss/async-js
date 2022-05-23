<template>
  <v-list dense>
    <v-list v-for="(record, index) in records" :key="index">
      <v-list-item-content>
        <v-list-item-title v-text="record.name"></v-list-item-title>
        <v-list-item-subtitle
          v-if="record.description"
          v-text="record.description"
        ></v-list-item-subtitle>
      </v-list-item-content>
    </v-list>
  </v-list>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import DataRecord from "@/core/model/data-record";

@Component({
  name: "DataRecordList"
})
export default class DataRecordList extends Vue {
  @Prop({ type: Array, required: true }) private records!: Array<DataRecord>;
}
</script>
