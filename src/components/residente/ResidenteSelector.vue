<template>
  <v-select label="nombreCompleto" :reduce="residente => residente.id"
    :options="residentes" v-model="residenteId" @input="setSelected"></v-select>
</template>

<script>
import Vue from 'vue';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import { servicioUsuario } from '../../servicios/usuario/ServicioUsuario';
import { servicioResidente } from '../../servicios/residente/ServicioResidente';

Vue.component('v-select', vSelect);
export default {
  data() {
    return {
      residentes: [],
      residenteId: 0
    };
  },
  created() {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) { servicioUsuario.logout(); }

    const residentes = servicioResidente.obtenerResidentes()
      .then(datos => {
        if (datos) {
          this.residentes = datos;
        }
      });
  },
  methods: {
    setSelected(value) {
      this.residente = value;
      // return value;
    }
  }
}
</script>