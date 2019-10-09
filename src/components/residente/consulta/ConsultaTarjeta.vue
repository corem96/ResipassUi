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
import { servicioTarjeta } from '@/servicios/usuario/ServicioTarjeta';

export default {
  data() {
    return {
      errors: [],
      success: '',
      campos: [
          {key: 'id', label: '#'},
          'codigo',
          { key: 'residenteNombreCompleto', label: 'Residente', class: 'largeColumn' },
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
    };
  },
  created() {
    servicioTarjeta.obtenerTarjetas()
      .then(resp => {
        if (!resp.error) {
            this.tarjetas = resp;
          } else {
            this.errors.push(resp.error);
          }
      });
  }
}
</script>

<style>
.largeColumn {
    width: 40%;
}
</style>