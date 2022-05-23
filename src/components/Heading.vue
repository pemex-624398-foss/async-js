<template>
  <v-row>
    <v-col>
      <div class="primary--text text-h2">{{ title }}</div>
      <div v-if="subtitle" class="blue-grey--text text-h4">{{ subtitle }}</div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "Heading"
})
export default class Heading extends Vue {
  @Prop({ type: String, required: true }) private title!: string;
  @Prop({ type: String, required: false }) private subtitle?: string;
}
</script>
