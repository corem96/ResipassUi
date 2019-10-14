<template>
  <div class="container-fluid">
      <h2 class="text-left">Consulta de tarjetas</h2>
      <div class="row">
        <div class="com-md-12">
          <!-- <b-button @click="toggleBusy">Toggle Busy State</b-button> -->
          <b-table striped hover responsive fixed :items="tarjetas" :fields="campos">
            <template v-slot:cell(activa)="data">
                {{ data.item.activa }} == true ? 'Activa' : 'Inactiva'
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
import { servicioTarjeta } from '@/servicios/residente/ServicioTarjeta';

export default {
  data() {
    return {
      errors: [],
      success: '',
      campos: [
          {key: 'id', label: '#'},
          'codigo',
          { key: 'residenteNombreCompleto', label: 'Residente', class: 'extendido' },
          { key: 'vigencia', formatter: value => {
              let fecha = new Date(value)
              let formatted_date = `${fecha.getDay()}/${fecha.getMonth()}/${fecha.getFullYear()}`
              return formatted_date
          }},
          { key: 'activa', formatter: value => {
              return value ? 'ACTIVA' : 'BLOQUEADA'
          }}],
      tarjetas: [],
      cargando: false,
      usuarioId: 0
    };
  },
  created() {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario) {
      this.usuarioId = usuario.id;
      this.obtieneTarjeta();
    }
  },
  methods: {
    obtieneTarjeta() {
      const me = this;
      servicioTarjeta.obtenerTarjetaResidente(this.usuarioId)
        .then(resp => {
          if (!resp.error) {
            if (resp) {
              me.tarjetas.push(resp);
            }
          } else {
            me.errors.push(resp.error);
          }
        });
    }
  }
}
</script>

<style>
.extendido {
    width: 50%;
}
</style>