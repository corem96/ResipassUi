<template>
  <div class="container-fluid">
      <h2 class="text-left">Registro de avisos</h2>
      <div class="row">
        <form @submit.prevent="registroAviso" class="col-md-6">
          <div class="form-group">
            <label for="comunicado">comunicado</label>
            <b-form-textarea id="textarea" v-model="comunicado" rows="3" max-rows="6"></b-form-textarea>
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
      <div class="row">
        <div class="com-md-12">
          <b-table striped hover :items="comunicados" :fields="[{key: 'id', label: '#'},'comunicado']"></b-table>
        </div>
      </div>
  </div>
</template>

<script>
import { router } from '../../../router';
import { servicioUsuario } from '../../../servicios/usuario/ServicioUsuario';
import { servicioAviso } from '../../../servicios/usuario/ServicioAviso'

export default {
  data() {
    return {
      errors: [],
      success: '',
      comunicados: [],
      comunicado: '',
      usuarioId: ''
    };
  },
  created() {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (!usuario) { servicioUsuario.logout(); }

    this.usuarioId = usuario.id;
    this.obtenerComunicados();
  },
  methods: {
    registroAviso() {
      if(this.validaForm()) {
        const usuario = localStorage.getItem('usuario');
        console.log(usuario);
        let aviso = {
          comunicado: this.comunicado,
          usuarioId: this.usuarioId
        };
        this._submit(aviso);
      }
    },
    _submit(datos) {
      servicioAviso.registroAviso(datos)
        .then(resp => {
          if (!resp.error) {
            this.success = 'Aviso registrado';
            this.obtenerComunicados();
          } else {
            this.errors.push(resp.error);
          }
        });
    },
    obtenerComunicados() {
      servicioAviso.obtenerAvisos()
        .then(resp => {
          if (!resp.error) {
            this.comunicados = resp;
          } else {
            this.errors.push(resp.error);
          }
        });
    },
    validaForm() {
      this.errors = [];
      this.success = '';
      if (this.comunicado == '') {
        this.errors.push('debe escribir una aviso válido');
      }
      if (this.errors.length > 0) {
        return false;
      }
      return true;
    }
  }
}
</script>