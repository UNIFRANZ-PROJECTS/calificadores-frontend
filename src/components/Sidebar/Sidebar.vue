<template>
  <v-navigation-drawer
    class="primary"
    dark
    app
    v-model="DRAWER_STATE"
    :mini-variant="!DRAWER_STATE"
    :width="sidebarWidth"
    :permanent="$vuetify.breakpoint.mdAndUp"
    :temporary="$vuetify.breakpoint.smAndDown"
    :mini-variant-width="sidebarMinWidth"
    :class="{ 'drawer-mini': !DRAWER_STATE }"
  >
    <v-list>
      <v-list-item two-line :class="'px-0'">
        <!-- <v-avatar size="80"> -->

        <img
          class="pa-md-4 mx-lg-auto"
          src="../../assets/icons/icon.png"
          width="80"
        />
        <!-- </v-avatar> -->

        <v-list-item-content>
          <!-- <v-list-item-title>{{ getName }}</v-list-item-title> -->
          <v-col cols="12" outlined tile> CALIFICADOR DE SERVICIOS </v-col>
          <!-- <v-list-item-subtitle>{{getName}}</v-list-item-subtitle> -->
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <template v-for="(item, i) in items">
        <v-row v-if="item.heading" :key="item.heading" align="center">
          <v-col cols="6" class="py-5">
            <span
              style="padding-left: 32px"
              class="text-body-1 subheader"
              :class="item.heading && DRAWER_STATE ? 'show ' : 'hide'"
            >
              {{ item.heading }}
            </span>
          </v-col>
          <v-col cols="6" class="text-center"> </v-col>
        </v-row>
        <v-divider v-else-if="item.divider" :key="i" class="my-4"></v-divider>
        <v-list-group
          color="primary"
          v-else-if="item.children && DRAWER_STATE"
          :key="item.title"
          v-model="item.model"
          append-icon=""
        >
          <template v-slot:prependIcon>
            <v-icon size="28">{{ item.icon }}</v-icon>
          </template>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(child, i) in item.children"
            :key="i"
            :to="child.link"
            link
          >
            <v-list-item-action v-if="child.icon">
              <v-icon size="">{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ child.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item
          color="primary"
          v-else
          :key="item.text"
          :href="item.href ? item.href : null"
          :to="item.link === '#' ? null : item.link"
          link
        >
          <v-list-item-action>
            <v-icon size="28" :color="item.color ? item.color : ''">{{
              item.icon
            }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title link>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  props: {
    source: String,
  },
  data() {
    return {
      itemsSideBar: [],
      sidebarWidth: 280,
      sidebarMinWidth: 96,
    };
  },
  computed: {
    ...mapState(["drawer"]),
    ...mapGetters({
      permitions: "auth/permisions",
    }),
    DRAWER_STATE: {
      get() {
        return this.drawer;
      },
      set(newValue) {
        if (newValue === this.drawer) return;
        this.TOGGLE_DRAWER();
      },
    },
    items() {
      // let item = this.itemsSideBar;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.itemsSideBar.push(
        { title: "Tablero", icon: "mdi-home", link: "/dashboard" },
        {
          title: "Encuestas",
          icon: "mdi-emoticon-excited-outline",
          // link: '/icons',
          model: false,
          children: [],
        },
        {
          title: "Administración",
          icon: "mdi-account-group",
          model: false,
          children: [],
        },
        {
          title: "Reportes",
          icon: "mdi-view-dashboard",
          model: false,
          children: [],
        }
      );
      if (this.permitions.includes(6)) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.itemsSideBar[1].children.push({
          title: "Formularios",
          icon: "mdi-circle-small",
          link: "/surveys",
        });
      }
      if (this.permitions.includes(5)) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.itemsSideBar[1].children.push({
          title: "Preguntas",
          icon: "mdi-circle-small",
          link: "/questions",
        });
      }
      if (this.permitions.includes(10)) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.itemsSideBar[1].children.push({
          title: "Terminales Encuestas",
          icon: "mdi-circle-small",
          link: "/terminals",
        });
      }
      if (this.permitions.includes(10)) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.itemsSideBar[2].children.push({
          title: "Terminales",
          icon: "mdi-circle-small",
          link: "/terminals",
        });
      }
      if (this.permitions.includes(4)) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.itemsSideBar[2].children.push({
          title: "Areas",
          icon: "mdi-circle-small",
          link: "/areas",
        });
      }
      if (this.permitions.includes(3)) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.itemsSideBar[2].children.push({
          title: "Usuarios",
          icon: "mdi-circle-small",
          link: "/users",
        });
      }
      if (this.permitions.includes(2)) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.itemsSideBar[2].children.push({
          title: "Tipo de usuario",
          icon: "mdi-circle-small",
          link: "/type_users",
        });
      }
      if (this.permitions.includes(1)) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.itemsSideBar[2].children.push({
          title: "Roles",
          icon: "mdi-circle-small",
          link: "/roles",
        });
      }
      if (this.permitions.includes(7)) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.itemsSideBar[2].children.push({
          title: "Permisos",
          icon: "mdi-circle-small",
          link: "/permisions",
        });
      }
      if (this.permitions.includes(8)) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.itemsSideBar[1].children.push({
          title: "Tipos de respuestas",
          icon: "mdi-circle-small",
          link: "/type_answers",
        });
      }
      if (this.permitions.includes(9)) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.itemsSideBar[3].children.push({
          title: "Reportes",
          icon: "mdi-circle-small",
          link: "/report",
        });
      }
      return this.itemsSideBar;
    },
    getName() {
      return window.localStorage.getItem("adm_name");
    },
  },
  methods: {
    ...mapActions(["TOGGLE_DRAWER"]),
  },
};
</script>

<style src="./Sidebar.scss" lang="scss"/>
