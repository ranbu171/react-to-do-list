import { registerApplication, start } from "single-spa";
import Base from "./base/BaseLists";

// create base to connect information 
window.base = Base();


registerApplication({
  name: "@test-to-do/week-of-to-do",
  app: () => System.import("@test-to-do/week-of-to-do"),
  activeWhen: ["/"],
  customProps: { domElement: document.querySelector('#week-container') }
});
registerApplication({
  name: "@test-to-do/to-do-list",
  app: () => System.import("@test-to-do/to-do-list"),
  activeWhen: ["/"],
  customProps: { domElement: document.querySelector('#task-container') }
});

start({
  urlRerouteOnly: true,
});
