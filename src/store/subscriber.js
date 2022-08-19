import store from "@/store";
import axios from "axios";

store.subscribe((mutation) => {
  console.log(mutation.type);
  switch (mutation.type) {
    case "auth/SET_TOKEN":
      console.log(mutation.payload);
      if (mutation.payload) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${mutation.payload}`;
        localStorage.setItem("token", mutation.payload);
      } else {
        axios.defaults.headers.common["Authorization"] = null;
        localStorage.removeItem("token");
      }
      break;
    case "auth/SET_USER":
      console.log(mutation.payload);
      if (mutation.payload) {
        localStorage.setItem("user", mutation.payload);
      } else {
        localStorage.removeItem("user");
      }
      break;
      case "auth/SET_ROL":
        console.log(mutation.payload);
        if (mutation.payload) {
          localStorage.setItem("rol", mutation.payload);
        } else {
          localStorage.removeItem("rol");
        }
        break;
  }
});
