<template>
  <div class="container-fluid">
      <h2 class="text-left">Registro de domicilios</h2>
      <div class="row">
        <form @submit.prevent="registroDom" class="col-md-6">
          <div class="form-group">
            <label for="direccion">Dirección</label>
            <input type="text" class="form-control" v-model="direccion" name="direccion" id="direccion">
          </div>
          <div class="form-group">
            <label for="numero">Número</label>
            <input type="text" class="form-control" v-model="numero" name="numero" id="numero">
          </div>
          <div class="form-group col-md-12">
            <button type="submit" class="btn btn-info">Registrar</button>
          </div>
        </form>
        <div class="col-md-6">
          <div v-if="success" class="alert alert-success">{{success}}</div>
          <div v-if="errors.length" class="alert alert-danger">
            <ul>
              <li v-for="error in errors">{{error}}</li>
            </ul>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { router } from '../../../router';
import { servicioUsuario } from '../../../servicios/usuario/ServicioUsuario';
import { servicioDomicilio } from '../../../servicios/usuario/ServicioDomicilio'

export default {
  data() {
    return {
      errors: [],
      success: '',
      direccion: '',
      numero: ''
    };
  },
  created() {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) { servicioUsuario.logout(); }
  },
  methods: {
    registroDom() {
      if(this.validaForm()) {
        let domicilio = {
          direccion: this.direccion,
          numero: this.numero
        };
        this._submit(domicilio);
      }
    },
    _submit(datos) {
      servicioDomicilio.registroDomicilio(datos)
        .then(resp => {
          if (!resp.error) {
            this.success = 'Domicilio registrado';
          } else {
            this.errors.push(resp.error);
          }
        });
    },
    validaForm() {
      this.errors = [];
      this.success = '';
      if (this.direccion == '') {
        this.errors.push('debe escribir una direccion válida');
      }
      if (this.numero == '') {
        this.errors.push('debe escribir un número válido');
      }
      if (this.errors.length > 0) {
        return false;
      }
      return true;
    }
  }
}
</script>

<style>

</style>