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
          <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="checkadmin" v-model="esUsuarioAdmin" />
            <label class="form-check-label" for="checkadmin">Soy administrador</label>
          </div>
        </div>
        <div class="form-group col-md-12">
          <button type="submit" class="btn btn-info">Entrar</button>
        </div>
        <div v-if="error" class="alert alert-danger">{{error}}</div>
      </form>
    </div>
  </div>
</template>

<script>
import { router } from "../../router";
import { servicioUsuario } from "../../servicios/usuario/ServicioUsuario";

export default {
  data() {
    return {
      nombreUsuario: '',
      password: '',
      esUsuarioAdmin: false,
      error: '',
      returnUrl: ''
    };
  },
  created() {
    servicioUsuario.logout();
    this.returnUrl = this.$route.query.returnUrl || "/";
  },
  methods: {
    loginSubmit() {
      let usuario = {
        nombreUsuario: this.nombreUsuario,
        password: this.password,
        esUsuarioAdmin: this.esUsuarioAdmin
      };
      this._submit(usuario);
    },
    _submit(datos) {
      this.error = '';
      servicioUsuario.login(datos)
      .then(resp => {
        if (!resp.error) {
          resp.esUsuarioAdmin = datos.esUsuarioAdmin;
          const ruta = datos.esUsuarioAdmin ? '/usuario' : '/residente'
          router.push(ruta);
        } else {
          this.error = resp.error;
        }
      });
    }
  }
};
</script>