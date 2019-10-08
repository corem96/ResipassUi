<template>
  <div class="container-fluid">
      <h2 class="text-left">Consulta de tarjetas</h2>
      <div class="row">
        <div class="com-md-12">
          <!-- <b-button @click="toggleBusy">Toggle Busy State</b-button> -->
          <b-table striped hover :items="tarjetas"
            :fields="[{key: 'id', label: '#'},'codigo', 'vigencia', 'activa']"
            :busy="cargando" >
            <template v-slot:table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
          </b-table>
        </div>
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
import { servicioTarjeta } from '../../../servicios/usuario/ServicioTarjeta';

export default {
  data() {
    return {
      errors: [],
      success: '',
      tarjetas: [],
      cargando: false,
    };
  },
  created() {
    this.toggleBusy();
    servicioTarjeta.obtenerTarjetas()
      .then(resp => {
        if (!resp.error) {
            this.tarjetas = resp;
          } else {
            this.errors.push(resp.error);
          }
          this.toggleBusy();
      });

  },
  methods: {
    toggleBusy() {
      this.cargando = !this.cargando
    }
  }
}
</script>