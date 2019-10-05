/*jshint esversion: 6 */
import axios from 'axios';
import { server } from '../../helper';

async function login(datosLogin) {
  console.log(datosLogin);  
  try {
    const resp = await axios.post(`${server.baseUrl}/api/auth`, datosLogin);
    const usuario = resp.data;
    if (usuario) {
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