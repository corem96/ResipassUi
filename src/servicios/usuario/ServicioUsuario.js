/*jshint esversion: 6 */
import axios from 'axios';
import { server } from '../../helper';

function login(nombreUsuario, password) {
  return axios({
    method: 'post',
    headers: {'Content-Typ': 'application/json'},
    url: `${server.baseUrl}/api/usuario/login`,
    data: {
      nombreUsuario: nombreUsuario,
      password: password
    },
  }).then(resp => {
      const usuario = resp.data;
      if (resp) {
        if (usuario) {
          localStorage.setItem('usuario', JSON.stringify(usuario));
        }
      }
      return usuario;
    });
}

function logout() {
  localStorage.removeItem('usuario');
}

export const servicioUsuario = { login, logout };