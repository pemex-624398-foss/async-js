<template>
  <app-frame contained>
    <heading :title="`Ejemplo #${exampleId}`" :subtitle="exampleName"></heading>
    <v-divider class="mt-4 mb-8"></v-divider>
    <example1 v-if="exampleId === 1"></example1>
    <example2 v-else-if="exampleId === 2"></example2>
    <example3 v-else-if="exampleId === 3"></example3>
  </app-frame>
</template>

<script lang="ts">
import AppFrame from "@/components/AppFrame.vue";
import Example1 from "@/components/Example1.vue";
import Example2 from "@/components/Example2.vue";
import Example3 from "@/components/Example3.vue";
import Heading from "@/components/Heading.vue";
import { Component, Vue } from "vue-property-decorator";
import NavigationLink from "@/core/model/navigation-link";

@Component({
  name: "ExampleView",
  components: { AppFrame, Example1, Example2, Example3, Heading }
})
export default class ExampleView extends Vue {
  // Computed
  protected get exampleId(): number {
    return Number(this.$route.params.id);
  }

  protected get exampleName(): string {
    const links = this.$store.state.navigation.links;
    if (!links) return "";

    const link = links.find(
      (l: NavigationLink) => l.code === `${this.$route.name}${this.exampleId}`
    );
    return link ? link.subtitle || link.title : "";
  }
}
</script>
