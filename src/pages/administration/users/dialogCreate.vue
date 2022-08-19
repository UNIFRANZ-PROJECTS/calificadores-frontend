<template>
  <v-dialog v-model="show" max-width="800px">
    <v-card>
      <v-card-title>
        <span class="headline">Nuevo Tipo de usuario</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="4">
              <v-text-field
                v-model="estructure.adm_name"
                color="cyan"
                clear-icon="mdi-close-circle-outline"
                @click:clear="clearVariable('nombre')"
                clearable
                label="Nombre"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="4">
              <v-text-field
                v-model="estructure.adm_lastName"
                color="cyan"
                clear-icon="mdi-close-circle-outline"
                @click:clear="clearVariable('nombre')"
                clearable
                label="Apellidos"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="4">
              <v-select
                :item-text="
                  (item) =>
                    item.ars_name +
                    ' - ' +
                    item.hdq_name
                "
                item-value="id"
                :items="getAreaCampus"
                label="Area - Sede"
                chips
                multiple
                hint="puedes seleccionar más de uno"
                v-model="estructure.id_area_campus"
                persistent-hint
              ></v-select>
              <!-- <v-select
                item-text="ars_name"
                item-value="id"
                :items="getAreaCampus"
                label="Sedes"
                multiple
                chips
                hint="puedes seleccionar uno"
                v-model="estructure.id_campus"
                persistent-hint
              ></v-select> -->
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex" cols="12" sm="12" md="6">
              <v-select
                item-text="tyUsr_name"
                item-value="id"
                :items="getTypeUsers"
                label="Tipo de usuario"
                chips
                hint="puedes seleccionar mas de uno"
                v-model="estructure.id_type_user"
                persistent-hint
              ></v-select>
            </v-col>
            <v-col class="d-flex" cols="12" sm="12" md="6">
              <v-select
                item-text="rls_name"
                item-value="id"
                :items="getRoles"
                label="Rol"
                chips
                hint="puedes seleccionar mas de uno"
                v-model="estructure.id_rol"
                persistent-hint
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" md="6">
              <v-text-field
                v-model="estructure.adm_email"
                color="cyan"
                :rules="emailRules"
                clear-icon="mdi-close-circle-outline"
                @click:clear="clearVariable('nombre')"
                clearable
                label="Correo"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="show = false">
          Cancelar
        </v-btn>
        <v-btn
          v-if="stateBtn"
          color="blue darken-1"
          text
          @click="createAdmin()"
        >
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    show1:false,
      emailRules: [
        (v) => !!v || "Correo es requerido",
        (v) => v.includes('@unifranz.edu.bo') || "correo debe incluir @unifranz.edu.bo",
      ],
  }),
  props: ["visible", "editedIndex", "infoData"],
  computed: {
    ...mapGetters([
      "getAreaCampus",
      "getAdministrators",
      "getTypeUsers",
      "getRoles",
    ]),
    estructure() {
      return this.infoData;
    },
    stateBtn() {
      let stateBtn = false;
      if (this.estructure.adm_name.length > 0) {
        if (this.estructure.adm_lastName.length > 0) {
          if (this.estructure.id_type_user > 0) {
            if (this.estructure.id_rol > 0) {
              if (this.estructure.adm_email.length > 0 && this.estructure.adm_email.includes('@unifranz.edu.bo')) {
                if (this.estructure.id_area_campus.length > 0) {
                  if(this.editedIndex === -1){
                      stateBtn = true;
                  }else{
                    stateBtn = true;
                  }
                }
              }
            }
          }
        }
      }
      return stateBtn;
    },
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      },
    },
  },
  methods: {
    ...mapActions(["addOneAdministrator","updateAdministrator"]),
    createAdmin() {
      if (this.editedIndex === -1) {
        this.$http
          .post("admin/register", this.estructure)
          .then((result) => {
            this.show = false;
            this.addOneAdministrator(result.data.result)
          });
      } else {
        this.$http
          .put("admin/update/"+this.estructure.id,
          {
            id_responsable:localStorage.getItem("user"),
            id_type_user:this.estructure.id_type_user,
            id_rol:this.estructure.id_rol,
            id_area_campus: this.estructure.id_area_campus,
            adm_name:this.estructure.adm_name,
            adm_lastName:this.estructure.adm_lastName,
            adm_email:this.estructure.adm_email
          }
          )
          .then((result) => {
            this.show = false;
            this.updateAdministrator(result.data)
          });
      }
    }
  },
};
</script>
