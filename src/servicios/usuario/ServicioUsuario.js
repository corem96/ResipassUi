/*jshint esversion: 6 */
import axios from 'axios';
import { server } from '../../helper';

const loginApi = `${server.baseUrl}/api/auth`;

async function login(datosLogin) {
  try {
    const resp = await axios.post(loginApi, datosLogin);
    if (resp) {
      const usuario = resp.data;
      if (datosLogin.esUsuarioAdmin) {
        usuario.esUsuarioAdmin = datosLogin.esUsuarioAdmin;
      }
      localStorage.setItem('usuario', JSON.stringify(usuario));
      return usuario;
    }
  }
  catch (error) {
    if (error.response) {
      const { data } = error.response;
      return { error: data };
    }
  }
}

function logout() {
  localStorage.removeItem('usuario');
}

export const servicioUsuario = { login, logout };