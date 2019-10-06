<template>
  <div class="container-fluid">
      <h2 class="text-left">Registro de tarjetas</h2>
      <div class="row">
        <form @submit.prevent="registroDom" class="col-md-6">
          <div class="form-group">
            <label for="codigo">Código</label>
            <input type="text" class="form-control" v-model="codigo" name="codigo" id="codigo">
          </div>
          <div class="form-group">
            <label for="vigencia">Vigencia</label>
            <input type="date" class="form-control" v-model="vigencia" name="vigencia" id="vigencia">
          </div>
          <div class="form-group">
            <ResidenteSelector />
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
import ResidenteSelector from '@/components/residente/ResidenteSelector.vue'

export default {
  data() {
    return {
      errors: [],
      success: '',
      codigo: '',
      vigencia: ''
    };
  },
  components: {
    ResidenteSelector
  }
}
</script>

<style>

</style>