<template>
  <div class="container-fluid">
      <h2 class="text-left">Consulta de tarjetas</h2>
      <div class="row">
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
export default {

}
</script>

<style>

</style>