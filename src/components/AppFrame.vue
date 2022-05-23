<template>
  <v-app>
    <v-app-bar app color="primary" dark flat elevation="1">
      <v-toolbar-title>Async FOSS</v-toolbar-title>
      <template #extension>
        <v-tabs icons-and-text fixed-tabs>
          <v-tab
            v-for="link in links"
            :key="link.code"
            :to="link.target"
            :exact="link.exact || false"
          >
            <span v-text="link.title" class="mb-3"></span>
            <v-icon v-if="link.icon" v-text="link.icon"></v-icon>
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-main class="blue-grey lighten-5">
      <template v-if="contained">
        <v-container class="py-10">
          <v-row>
            <v-col>
              <slot name="default"></slot>
            </v-col>
          </v-row>
        </v-container>
      </template>
      <template v-else>
        <slot name="default"></slot>
      </template>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import NavigationLink from "@/core/model/navigation-link";

@Component({
  name: "AppFrame"
})
export default class AppFrame extends Vue {
  // Props
  @Prop({ type: Boolean, default: false }) private contained!: boolean;

  // Computed
  private get links(): Array<NavigationLink> {
    return this.$store.state.navigation.links;
  }
}
</script>
