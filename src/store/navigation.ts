import NavigationLink from "@/core/model/navigation-link";

export interface NavigationState {
  links: Array<NavigationLink>;
}

const namespaced = true;

const state: NavigationState = {
  links: [
    {
      code: "home",
      title: "Inicio",
      icon: "mdi-home",
      target: { name: "home" },
      exact: true
    },
    ...[
      {
        subtitle: "Calculator with Callback Functions"
      },
      {
        subtitle: "Calculator with Promises"
      },
      {
        subtitle: "Promises & The Backend"
      }
    ].map((link, index) => ({
      ...link,
      code: `example${index + 1}`,
      title: `Ejemplo #${index + 1}`,
      icon: `mdi-numeric-${index + 1}-circle-outline`,
      target: { name: "example", params: { id: String(index + 1) } }
    }))
  ]
};

export default {
  namespaced,
  state
};
