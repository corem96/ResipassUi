<template>
  <div class="container-fluid">
      <h2 class="text-left">Consulta de {{ fechaActual }}</h2>
      <div class="row">
        <div class="com-md-12">
          <b-table striped hover responsive fixed :items="pagos" :fields="campos">
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
import { servicioPago } from '@/servicios/residente/ServicioPago';

export default {
  data() {
    return {
      errors: [],
      success: '',
      fechaActual: this.fechaConsulta(),
      campos: [
          { key: 'id', label: '#' },
          { key: 'fechaPago', formatter: value => {
              let fecha = new Date(Date.parse(value)).toLocaleString();
              return fecha }, label: 'Fecha pago' },
          { key: 'fechaVencimiento', formatter: value => {
              let fecha = new Date(Date.parse(value)).toLocaleString();
              return fecha }, label: 'Fecha vencimiento' },
          { key: 'tarjetaCodigo', label: 'Codigo tarjeta' },
          { key: 'importe', formatter: value => {return `$ ${value}`} , label: 'Importe' }
      ],
      pagos: [],
      usuarioId: 0,
      cargando: false,
    };
  },
  created() {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario) {
      this.usuarioId = usuario.id;
      this.obtienePagos(this.usuarioId);
    }
  },
  methods: {
    fechaConsulta() {
        const meses = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
        const fecha = new Date();
        return `${meses[fecha.getMonth()]} de ${fecha.getFullYear()}`
    },
    obtienePagos(usuarioId) {
      servicioPago.consultaPagosMensual()
      .then(resp => {
        if (!resp.error) {
            this.pagos = resp;
          } else {
            this.errors.push(resp.error);
          }
      });
    }
  }

}
</script>

<style>
.largeColumn {
    width: 85%;
}
</style>