<template>
  <div id="login" class="container">
    <div class="row justify-content-md-center">
      <form @submit.prevent="loginSubmit" class="col-md-4">
        <h2>Inicio de sesión</h2>
        <div class="form-group">
          <input
            type="text"
            id="nombreUsuario"
            v-model="nombreUsuario"
            class="form-control"
            placeholder="nombre de usuario"
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            id="password"
            v-model="password"
            class="form-control"
            placeholder="contraseña"
          />
        </div>
        <div class="form-group">
          <input type="checkbox" name="admin" id="admin">
        </div>
        <div class="form-group col-md-12">
          <button type="submit" class="btn btn-info">Entrar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { router } from "../../router";
import { server } from "../../helper";
import { servicioUsuario } from "../../servicios/usuario/ServicioUsuario";

export default {
  data() {
    return {
      nombreUsuario: "",
      password: "",
      esAdmin: false
    };
  },
  created() {
    servicioUsuario.logout();
  },
  methods: {
    loginSubmit() {
      let usuario = {
        nombreUsuario: this.nombreUsuario,
        password: this.password,
        esAdmin: this.esAdmin
      };
      this._submit(usuario);
    },
    _submit(datos) {
      servicioUsuario.login(datos).then(
        usuario => {
          if (usuario) {
            router.push("/usuario");
          }
        },
        error => {
          this.error = error;
        }
      );
    }
  }
};
</script>