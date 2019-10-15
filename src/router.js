/*jshint esversion: 6 */
import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './components/login/Login.vue';
import RegistroResidente from '@/components/RegistroResidente.vue';
import Perfil from './components/usuario/Perfil.vue';
import RegistroDomicilio from '@/components/usuario/registro/RegistroDomicilio.vue';
import RegistroTarjeta from '@/components/usuario/registro/RegistroTarjeta.vue';
import RegistroAviso from '@/components/usuario/registro/RegistroAviso.vue';
import CobranzaMensual from '@/components/usuario/consulta/CobranzaMensual.vue';
import PerfilResidente from '@/components/residente/Perfil.vue';
import ConsultaTarjeta from '@/components/residente/consulta/ConsultaTarjeta.vue';
import ConsultaAviso from '@/components/residente/consulta/ConsultaAviso.vue';
import RegistroPago from '@/components/residente/registro/RegistroPago.vue';
import ConsultaPagos from '@/components/residente/consulta/ConsultaPagos.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: { name: 'home' } },
    { path: '/home', name: 'home', component: Home },
    { path: '/login', name: 'Login', component: Login },
    { path: '/registro-residente', component: RegistroResidente },
    { path: '/usuario', component: Perfil,
      children: [
        {
          path: '/registro-dom',
          component: RegistroDomicilio
        },
        {
          path: '/registro-tarjeta',
          component: RegistroTarjeta
        },
        {
          path: '/registro-aviso',
          component: RegistroAviso
        },
        {
          path: '/cobranza',
          component: CobranzaMensual
        }
      ]
    },
    { path: '/residente', component: PerfilResidente,
      children: [
        {
          path: '/consulta-tarjeta',
          component: ConsultaTarjeta
        },
        {
          path: '/consulta-aviso',
          component: ConsultaAviso
        },
        {
          path: '/registro-pago',
          component: RegistroPago
        },
        {
          path: '/reporte-pagos',
          component: ConsultaPagos
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  const login = ['/login'];
  const auth = !login.includes(to.path);
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  if(to.path == '/registro-residente') {
    return next();
  }

  if(to.path == '/home') {
    return next({
      path: usuario.esUsuarioAdmin ? '/usuario' : '/residente'
    });
  }

  if (auth && !usuario) {
    return next({ path: '/login', });
  }

  next();
});
