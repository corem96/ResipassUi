<template>
  <v-select label="domicilioCompleto" :reduce="domicilio => domicilio.id"
    :options="domicilios" v-model="domicilioId" @input="setSelected"></v-select>
</template>

<script>
import Vue from 'vue';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import { servicioDomicilio } from '@/servicios/usuario/ServicioDomicilio';

Vue.component('v-select', vSelect);
export default {
  data() {
    return {
      domicilios: [],
      domicilioId: 0
    };
  },
  created() {
    servicioDomicilio.obtenerDomicilios()
      .then(datos => {
        if (datos) {
          this.domicilios = datos;
        }
      });
  },
  methods: {
    setSelected(value) {
      this.residente = value;
    }
  }
}
</script>