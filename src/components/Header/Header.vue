<template>
  <div>
    <v-app-bar absolute class="main-header" height="64" fixed>
      <v-btn icon class="mx-1" @click.stop="TOGGLE_DRAWER">
        <template v-if="DRAWER_STATE">
          <v-icon style="font-size: 28px">mdi-arrow-left</v-icon>
        </template>
        <template v-else>
          <v-icon style="font-size: 28px">mdi-menu</v-icon>
        </template>
      </v-btn>
      <v-toolbar-title>{{ currentRouteName }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title>{{ getName }} <br />{{ getTypeUser }}</v-toolbar-title>
      <div class="d-md-block d-none">
        <!-- cartCount  -->
        <v-btn
          @click="drawer = true"
          elevation="0"
          fab
          color="grey lighten-2"
          small
        >
          <v-icon color="">mdi-account</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      right
      width="320"
      class="z-999"
    >
      <div class="secondary-siebar-content">
        <v-list-item>
          <v-list-item-avatar class="mr-0">
            <v-icon color="">mdi-account-outline</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class=""> Mi Perfil</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon color="" @click="drawer = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="">
              Nombre: {{ getName }}</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="">
              Rol: {{ getTypeUser }}</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="">
              Tipo de Usuario: {{ getTypeUser }}</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class=""> Areas asignadas: </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <div v-for="(n, index) in areaCampusName" :key="index">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class=""> {{ n }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
        <div class="d-flex justify-center my-3">
          <v-btn
            width="80%"
            large
            outlined
            color="primary"
            class="text-capitalize"
            @click="UpdatePassword"
            >Cambiar contraseña
          </v-btn>
        </div>
        <div class="d-flex justify-center my-3">
          <v-btn
            width="80%"
            large
            outlined
            color="primary"
            class="text-capitalize"
            @click="logOut"
            >Salir Sesión
          </v-btn>
        </div>
      </div>
      <!-- <template v-slot:append v-if="getCartProducts.length >= 1">
        <div class="pa-2">
          <v-btn to="/cart" class="text-capitalize mb-3" block color="primary">
            Ordenar mi pedido
          </v-btn>
        </div>
      </template> -->
    </v-navigation-drawer>
        <DialogUpdatePwd 
  :visible="dialogUpdatePwd"
  @close="dialogUpdatePwd=false"/>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import config from "../../config";
import DialogUpdatePwd from "./dialogUpdatePwd.vue";

export default {
  components: {
    DialogUpdatePwd
  },
  name: "Header",
  data: () => ({
    dialogUpdatePwd:false,
    textSearchVar: "",
    cartCount: 0,
    colorNav: false,
    dialog: false,
    isToggleNavbar: false,
    itemTwo: ["Foo", "Bar", "Fizz", "Buzz"],
    drawer: false,
    group: null,
    config,
    searchCollapse: true,
    notifications: [
      {
        text: "Check out this awesome ticket",
        icon: "mdi-tag",
        color: "warning",
      },
      {
        text: "What is the best way to get ...",
        icon: "mdi-thumb-up",
        color: "success",
      },
      {
        text: "This is just a simple notification",
        icon: "mdi-flag",
        color: "error",
      },
      {
        text: "12 new orders has arrived today",
        icon: "mdi-cart",
        color: "primary",
      },
    ],
    account: [{ text: "Perfil", icon: "mdi-account", color: "textColor" }],
    notificationsBadge: true,
    messageBadge: true,
  }),
  computed: {
    ...mapState(["drawer"]),
    ...mapGetters({
      areaCampusName: "auth/getAreaCampus",
    }),

    DRAWER_STATE: {
      get() {
        return this.drawer;
      },
    },
    currentRouteName() {
      return this.$route.name;
    },
    getName() {
      return window.localStorage.getItem("adm_name");
    },
    getTypeUser() {
      return window.localStorage.getItem("type_user");
    },
  },
  methods: {
    ...mapActions(["TOGGLE_DRAWER"]),
    ...mapActions({ signOutAction: "auth/signOut" }),
    logOut() {
      this.signOutAction().then(() => {
        this.$router.replace("/login");
      });
    },
    UpdatePassword(){
      this.dialogUpdatePwd=true;
    }
  },
};
</script>

<style src="./Header.scss" lang="scss">
$z-index-sub-topbar: 2;
$md: 959px;
$z-99: 99;
.z-999 {
  z-index: 999;
}

.logo {
  border-radius: 50%;
}
.v-list-item {
  min-height: 34px;
}
.top-bar {
  height: 40px;
  display: flex;
  align-items: center;
}
.sale-page-one {
  .sub-topbar {
    &.v-app-bar--is-scrolled {
      position: relative;
      .dropdown-ecommerce {
        display: none;
      }
    }
  }

  .navbar {
    &.v-app-bar--is-scrolled {
      top: 0;
      margin-bottom: 0px;
    }
  }
}
.sale-page-two {
  .sub-topbar {
    &.v-app-bar--is-scrolled {
      position: relative;
      .dropdown-ecommerce {
        display: none;
      }
    }
  }

  .navbar {
    &.v-app-bar--is-scrolled {
      top: 0;
      margin-bottom: 0px;
    }
  }
}
.sub-topbar {
  position: relative;
  box-shadow: none !important;
  width: 100%;
  height: 120px !important;
  z-index: $z-99;
  .dropdown-ecommerce {
    display: none;
  }
  &.v-app-bar--fixed {
    position: unset;
  }
  z-index: $z-index-sub-topbar;

  // &.v-app-bar--is-scrolled {
  //   position: fixed;
  //   top: 0;
  //   box-shadow: none !important;
  //   .dropdown-ecommerce {
  //     display: block;
  //   }
  // }
  @media (max-width: $md) {
  }
}

.navbar {
  height: 60px;
  width: 100%;
  z-index: 2;
  box-shadow: rgb(43 52 69 / 10%) 0px 16px 16px -16px !important;
  &.v-app-bar--is-scrolled {
    position: relative;
    top: 64px;
    margin-bottom: 64px;
    box-shadow: rgb(43 52 69 / 10%) 0px 16px 16px -16px !important;
    // box-shadow: none !important;
  }
  @media (max-width: 992px) {
    display: none;
  }
}
.search-bar {
  ::v-deep .v-input__slot {
    border: 1px solid rgb(218, 225, 231);
    background-color: #fff !important;
  }
  .search-bar-dropdown {
    height: 39px;
    position: absolute;
    top: 20px;
    transform: translateY(-50%);
    right: 2px;
    border-radius: 22px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border-left: 1px solid rgb(218, 225, 231) !important;
    box-shadow: none !important;
    @media (max-width: $md) {
      display: none;
    }
  }
  ::v-deep .v-text-field__details {
    display: none;
  }
}

// toggleNavbarButton
.navbar-toggle-dropdown {
  z-index: 98;
  display: none;
  &.open {
    display: block;
    top: 64px;
  }
}
.v-hidden {
  visibility: hidden;
}
.empty-cart-sidebar {
  height: 80vh;
}
</style>
