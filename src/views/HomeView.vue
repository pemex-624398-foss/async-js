<template>
  <app-frame contained>
    <v-card class="pa-6">
      <v-container>
        <heading title="FOSS" subtitle="Async Programming"></heading>
        <v-divider class="my-6"></v-divider>
        <v-row class="my-8">
          <v-col v-for="(link, index) in links" :key="index">
            <v-sheet color="primary" dark outlined>
              <v-list-item :to="link.target" :exact="link.exact || false">
                <v-list-item-icon v-if="link.icon">
                  <v-icon color="accent" x-large v-text="link.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="link.title"></v-list-item-title>
                  <v-list-item-subtitle
                    v-text="link.subtitle"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-sheet>
          </v-col>
        </v-row>
        <v-divider class="my-6"></v-divider>
        <v-row>
          <v-col>
            <code>promise().then().catch().finally();</code>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </app-frame>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AppFrame from "@/components/AppFrame.vue";
import NavigationLink from "@/core/model/navigation-link";
import Heading from "@/components/Heading.vue";

@Component({
  components: { Heading, AppFrame }
})
export default class HomeView extends Vue {
  // Computed
  private get links(): Array<NavigationLink> {
    return this.$store.state.navigation.links.filter((l: NavigationLink) => {
      return l.code !== "home";
    });
  }
}
</script>
