<template>
  <div class="container-fluid">
      <h2 class="text-left">Registro de pago</h2>
      <div class="row">
        <form @submit.prevent="registroPago" class="col-md-6">
          <div class="form-group">
            <label for="codigo">Folio</label>
            <input type="text" class="form-control" v-model="folio" name="folio">
          </div>
          <div class="form-group">
            <label for="vigencia">Autorización</label>
            <input type="text" class="form-control" v-model="autorizacion" name="autorizacion">
          </div>
          <div class="form-group">
            <label for="vigencia">Sucursal</label>
            <input type="text" class="form-control" v-model="sucursal" name="sucursal">
          </div>
          <div class="form-group">
            <label for="vigencia">Cajero</label>
            <input type="text" class="form-control" v-model="cajero" name="cajero">
          </div>
          <div class="form-group">
            <label for="vigencia">Importe</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">$</span>
              </div>
                <input type="number" class="form-control" aria-label="Dollar amount (with dot and two decimal places)" name="importe" v-model="importe">
              </div>
          </div>
          <div class="form-group">
            <label for="vigencia">Tarjeta</label>
            <input type="text" class="form-control disabled" :value="tarjeta.codigo" name="tarjeta" readonly>
          </div>
          <div class="form-group col-md-12">
            <button type="submit" class="btn btn-info">Registrar pago</button>
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
import { servicioPago } from '@/servicios/residente/ServicioPago'
import { servicioTarjeta } from '@/servicios/residente/ServicioTarjeta';

export default {
  data() {
    return {
      errors: [],
      success: '',
      tarjeta: {},
      folio: '',
      autorizacion: '',
      sucursal: '',
      cajero: '',
      importe: 300.00,
      usuarioId: 0,
      tarjetaId: 0
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
    registroPago() {
      if(this.validaForm()) {
        let registroPago = {
          numeroFolio: this.folio,
          numeroAutorizacion: this.autorizacion,
          sucursal: this.sucursal,
          cajero: this.cajero,
          importe: this.importe,
          residenteId: this.usuarioId,
          tarjetaId: this.tarjetaId 
        };
        this._submit(registroPago);
      }
    },
    _submit(datos) {
      servicioPago.registroPago(datos)
        .then(resp => {
          if (!resp.error) {
            this.success = 'Pago registrado';
          } else {
            this.errors.push(resp.error);
          }
        });
    },
    obtieneTarjeta() {
      const me = this;
      servicioTarjeta.obtenerTarjetaResidente(this.usuarioId)
        .then(resp => {
          if (!resp.error) {
            if (resp) {
              me.tarjeta = resp;
              me.tarjetaId = me.tarjeta.id;
            }
          } else {
            me.errors.push(resp.error);
          }
        });
    },
    validaForm() {
      this.errors = [];
      this.success = '';
      if (this.tarjetaId <= 0) {
        this.errors.push('debe tener una tarjeta asociada');
      }
      if (this.folio === '') {
        this.errors.push('debe escribir un número de folio válido');
      }
      if (this.autorizacion === '') {
        this.errors.push('debe escribir un npumero de autorización válido');
      }
      if (this.sucursal === '') {
        this.errors.push('debe escribir una sucursal válida');
      }
      if (this.cajero === '') {
        this.errors.push('debe escribir una cajero válido');
      }
      if (this.importe <= 0) {
        this.errors.push('debe escribir un importe válio');
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