import "./styles/main.css";
import "./i18n";
import { App } from "./App";
import r2wc from "@r2wc/react-to-web-component";

const mfName = import.meta.env.VITE_MF_NAME;

if (!customElements.get("mf-appointments")) {
  customElements.define(
    "mf-appointments",
    r2wc(App, {
      props: {
        documentType: "string",
        documentNumber: "string",
        fullName: "string",
        tenant: "string"
      }
    })
  );
}
