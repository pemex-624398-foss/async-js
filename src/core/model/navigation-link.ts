import { RawLocation } from "vue-router";

export default interface NavigationLink {
  code: string;
  title: string;
  subtitle?: string;
  icon?: string;
  culture?: string;
  target?: RawLocation;
  exact?: boolean;
  links?: Array<NavigationLink>;
}
