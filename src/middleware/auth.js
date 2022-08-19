import store from "@/store";

export default function auth({ to, next, router }) {
  if (!store.getters["auth/authenticated"]) {
    return router.push({ name: "login" });
  } else {
    switch (to.name) {
      case "Roles":
        if (!store.getters["auth/permisions"].includes(1)) {
          return router.push({ name: "Tablero" });
        }
        return next();
      case "Tipos de usuarios":
        if (!store.getters["auth/permisions"].includes(2)) {
          return router.push({ name: "Tablero" });
        }
        return next();
      case "Usuarios":
        if (!store.getters["auth/permisions"].includes(3)) {
          return router.push({ name: "Tablero" });
        }
        return next();
      case "Areas":
        if (!store.getters["auth/permisions"].includes(4)) {
          return router.push({ name: "Tablero" });
        }
        return next();
      case "Preguntas":
        console.log("holaaaaaaaaaa");
        if (!store.getters["auth/permisions"].includes(5)) {
          return router.push({ name: "Tablero" });
        }
        return next();
      case "Formularios":
        if (!store.getters["auth/permisions"].includes(6)) {
          return router.push({ name: "Tablero" });
        }
        return next();
      case "Permisos":
        if (!store.getters["auth/permisions"].includes(7)) {
          return router.push({ name: "Tablero" });
        }
        return next();
      case "Tipos de Respuestas":
        if (!store.getters["auth/permisions"].includes(8)) {
          return router.push({ name: "Tablero" });
        }
        return next();
      case "Reportes de Respuestas":
        if (!store.getters["auth/permisions"].includes(9)) {
          return router.push({ name: "Tablero" });
        }
        return next();
      default:
        return next();
    }
  }
}
