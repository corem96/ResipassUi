<template>
  <div class="container-fluid">
      <h2 class="text-left">Registro de residente</h2>
      <div class="row">
        <form @submit.prevent="registroDom" class="col-md-6">
          <div class="form-group">
            <label for="direccion">Nombre</label>
            <input type="text" class="form-control" v-model="nombre" name="nombre" id="nombre">
          </div>
          <div class="form-group">
            <label for="numero">Apellido</label>
            <input type="text" class="form-control" v-model="apellido" name="apellido" id="apellido">
          </div>
          <div class="form-group">
            <label for="numero">Nombre de usuario</label>
            <input type="text" class="form-control" v-model="nombreUsuario" name="nombreUsuario" id="nombreUsuario">
          </div>
          <div class="form-group">
            <label for="numero">Contraseña</label>
            <input type="password" class="form-control" v-model="password" name="password" id="password">
          </div>
          <div class="form-group">
            <label for="numero">Confirmar Contraseña</label>
            <input type="password" class="form-control" v-model="passwordConfirm" name="passwordConfirm" id="passwordConfirm">
          </div>
          <div class="form-group">
            <label for="domicilio">Domicilio</label>
            <DomicilioSelector :value="domicilioId"/>
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
import { router } from '@/router';
import { servicioResidente } from '@/servicios/residente/ServicioResidente';
import DomicilioSelector from '@/components/residente/DomicilioSelector';

export default {
  data() {
    return {
      errors: [],
      success: '',
      domicilioId: 0,
      nombre: '',
      apellido: '',
      nombreUsuario: '',
      password: '',
      passwordConfirm: ''
    };
  },
  components: {
    DomicilioSelector
  },
  methods: {
    registroDom() {
      if(this.validaForm()) {
        let residente = {
          nombre: this.nombre,
          apellido: this.apellido,
          nombreUsuario: this.nombreUsuario,
          password: this.password,
          passwordConfirm: this.passwordConfirm,
          domicilioId: this.$children[0].domicilioId
        };
        console.log(residente);
        this._submit(residente);
      }
    },
    _submit(datos) {
      servicioResidente.registroResidente(datos)
        .then(resp => {
          if (!resp.error) {
            this.$router.push({path: '/residente'});
          } else {
            this.errors.push(resp.error);
          }
        });
    },
    validaForm() {
      this.errors = [];
      this.success = '';
      if (this.nombre === '') {
        this.errors.push('debe escribir una nombre válido');
      }
      if (this.apellido === '') {
        this.errors.push('debe escribir un apellido válido');
      }
      if (this.nombreUsuario === '') {
        this.errors.push('debe escribir un nombre de usuario válido');
      }
      if (this.password === '') {
        this.errors.push('debe escribir un pasword válido');
      }
      if (this.passwordConfirm === '') {
        this.errors.push('debe confirmar el password');
      }
      if (this.password !== this.passwordConfirm) {
        const errorMsj = 'el password y la confirmación no coinciden, por favor revise de nuevo';
        this.errors.push(errorMsj);
      }
      if (this.$children[0].domicilioId == '') {
        this.errors.push('debe seleccionar un domicilio');
      }
      if (this.errors.length > 0) {
        return false;
      }
      return true;
    }
  }
}
</script>