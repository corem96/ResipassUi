/*jshint esversion: 6 */
import axios from 'axios';
import { server } from '../../helper';

function login(datosLogin) {
  const { nombreUsuario, password, esAdmin } = datosLogin;
  // return axios({
  //   method: 'post',
  //   headers: {'Content-Type': 'application/json'},
  //   url: `${server.baseUrl}/api/auth`,
  //   data: {
  //     nombreUsuario: nombreUsuario,
  //     password: password,
  //     esUsuarioAdmin: esAdmin
  //   },
  // })
  
  return axios.post(`${server.baseUrl}/api/auth`,
  {
    nombreUsuario: nombreUsuario,
    password: password,
    esUsuarioAdmin: esAdmin
  })
  .then(resp => {
    const usuario = resp.data;
    if (usuario) {
      localStorage.setItem('usuario', JSON.stringify(usuario));
      return usuario;
    }
  })
  .catch(error => {
    if (error.response) {
      const { data } = error.response;
      return { error: data };
    }
  });
}

function logout() {
  localStorage.removeItem('usuario');
}

export const servicioUsuario = { login, logout };