/*jshint esversion: 6 */
import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './components/login/Login.vue';
import Perfil from './components/usuario/Perfil.vue';
import RegistroDomicilio from '@/components/usuario/registro/RegistroDomicilio.vue';
import RegistroTarjeta from '@/components/usuario/registro/RegistroTarjeta.vue';
import RegistroAviso from '@/components/usuario/registro/RegistroAviso.vue';
import PerfilResidente from '@/components/residente/Perfil.vue';
import ConsultaTarjeta from '@/components/residente/consulta/ConsultaTarjeta.vue';
import ConsultaAviso from '@/components/residente/consulta/ConsultaAviso.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: { name: 'home' } },
    { path: '/home', name: 'home', component: Home },
    { path: '/login', name: 'Login', component: Login },
    { path: '/usuario', component: Perfil,
      children: [
        {
          path: '/registrodom',
          component: RegistroDomicilio
        },
        {
          path: '/registrotar',
          component: RegistroTarjeta
        },
        {
          path: '/registroaviso',
          component: RegistroAviso
        }
      ]
    },
    { path: '/residente', component: PerfilResidente,
      children: [
        {
          path: '/consultatarjeta',
          component: ConsultaTarjeta
        },
        {
          path: '/consultaaviso',
          component: ConsultaAviso
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  const login = ['/login'];
  const auth = !login.includes(to.path);
  const logeado = localStorage.getItem('usuario');

  if (auth && !logeado) {
    return next({
      path: '/login',
    });
  }

  next();
});
