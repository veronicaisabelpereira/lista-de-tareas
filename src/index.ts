import { initHomePage } from "./pages/home";
import { initCardComponent } from "./components/card";
import { state } from "./state";

(function () {
  initCardComponent();
  initHomePage(document.querySelector(".root")!);
  state.init();
  state.clearCache();
})();
