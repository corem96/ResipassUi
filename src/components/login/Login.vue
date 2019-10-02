<template>
    <div id="login" class="container">
        <div class="row justify-content-md-center">
            <form @submit.prevent="loginSubmit" class="col-md-4">
                <h2>Inicio de sesión</h2>
                <div class="form-group">
                    <input type="text" name="usuario" id="usuario" class="form-control" placeholder="nombre de usuario"/>
                </div>
                <div class="form-group">
                <input type="password" name="contraseña" id="contraseña" class="form-control" placeholder="contraseña">
                </div>
                <div class="form-group col-md-12">
                    <button type="submit" class="btn btn-info">Entrar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { server } from '../../helper'
import router from '../../router'

export default {
    data() {
        return {
            nombreUsuario: '',
            password: ''
        };
    },
    methods: {
        login() {
            let usuario = {
                nombreUsuario: this.nombreUsuario,
                password: this.password
            };
            this._submit(usuario);
        },
        _submit(datos) {
            axios.get(`${server.baseUrl}/api/usuario/`, datos)
            .then(resp => {
                if (resp) {
                    console.log(resp);
                }
            })
        }
    }
}
</script>