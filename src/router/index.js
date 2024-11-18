import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/payment/buy/failed',
    name: 'PagoFallido',
    component: () => import(/* webpackChunkName: "FailedPayment" */ '../views/shows/FailedPayment.vue'),
    meta: {
      requiresAuth: true,
      layout: 'user',
      title: 'Pago fallido',
    }
  },
  {
    path: '/payment/buy/success',
    name: 'PagoAprobado',
    component: () => import(/* webpackChunkName: "register" */ '../views/shows/SuccessfullPayment.vue'),
    meta: {
      requiresAuth: true,
      title: 'Pago exitoso',
      link_name: 'PaymentSuccessfull',
      layout: 'user'
    }
  },
  {
    path: '/edit-my-profile',
    name: 'EditMyProfile',
    component: () => import('../views/EditMyProfile.vue'),
    meta: {
      title: 'Editar mi perfil',
      requiresAuth: true,
    },
  },
  {
    path: '/user/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
    meta: {
      title: 'Registrarse',
      guest: true,
      link_name: 'Registrarse',
    },
  },
  {
    path: '/new/:id',
    name: 'NewView',
    component: () => import( /* webpackChunkName: "register" */ '../views/news/NewView.vue'),
    meta: {
      title: 'Noticia',
    },
  },
  {
    path: '/user/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      guest: true,
      title: 'Login',
      link_name: 'Log In',
    },
  },
  // {
  //   path: '/admin/social',
  //   name: 'Redes',
  //   component: () => import(/* webpackChunkName: "usermanagement" */ '../views/social/Social.vue'),
  //   meta: {
  //     requiresAuth: true,
  //     title: 'Redes sociales',
  //     is_admin: true,
  //     link_name: 'Redes Sociales'
  //   },
  //   redirect: { name: 'SocialList' },
  //   children: [
  //     {
  //       path: '',
  //       name: 'SocialList',
  //       component: () => import(/* webpackChunkName: "usermanagement" */ '../views/social/SocialList.vue'),
  //       meta: {
  //         requiresAuth: true,
  //         title: 'Redes Sociales',
  //         is_admin: true,
  //         link_name: 'Redes sociales'
  //       },
  //     },
  //     {
  //       path: 'add',
  //       name: 'addSocial',
  //       component: () => import(/* webpackChunkName: "usermanagement" */ '../views/social/SocialAdd.vue'),
  //       meta: {
  //         requiresAuth: true,
  //         is_admin: true,
  //         title: 'Agregar red',
  //         link_name: 'Redes'
  //       },
  //     },
  //     {
  //       path: ':id/editar',
  //       name: 'EditSocial',
  //       component: () => import(/* webpackChunkName: "usermanagement" */ '../views/social/SocialAdd.vue'),
  //       meta: {
  //         requiresAuth: true,
  //         is_admin: true,
  //         link_name: 'edicionred'
  //       },
  //     },
  //   ]
  // },
  {
    path: '/user/:id',
    name: 'UserProfile',
    component: () => import('../views/UserProfile.vue'),
    meta: {
      title: 'Perfil de usuario',
      requiresAuth: true
    }
  },
  {
    path: '/shows/:id',
    name: 'ShowView',
    component: () => import('../views/shows/Show.vue'),
    meta: {
      requiresAuth: false,
      title: 'Show',
      link_name: 'ShowView',
      layout: 'user'
    },
  },
  {
    path: '/shows/:id/buy',
    name: 'BuyTickets',
    component: () => import('../views/shows/BuyTickets.vue'),
    meta: {
      requiresAuth: true,
      title: 'Comprar entrada',
      link_name: 'BuyTickets',
      layout: 'user'
    },
  },
  {
    path: '/tickets',
    name: 'MyTickets',
    component: () => import('../views/shows/UserShows'),
    meta: {
      requiresAuth: true,
      link_name: 'MyTickets',
      title: 'Mis entradas',
      layout: 'user',
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: false,
      title: 'Home',
      link_name: 'Home',
      layout: 'user-home'
    },
  },
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
    meta: {
      requiresAuth: true,
      title: 'Dashboard',
      is_admin: true,
      link_name: 'Dashboard',
    },
  },
  {
    path: '/admin/resources',
    name: 'Recursos',
    component: () => import(/* webpackChunkName: "usermanagement" */ '../views/MusicalResources.vue'),
    meta: {
      requiresAuth: true,
      title: 'Recursos',
      is_admin: true,
      link_name: 'Recursos'
    },
    redirect: { name: 'ResourcesList' },
    children: [
      {
        path: '',
        name: 'ResourcesList',
        component: () => import(/* webpackChunkName: "usermanagement" */ '../views/MusicalResourcesList.vue'),
        meta: {
          requiresAuth: true,
          title: 'Recursos',
          is_admin: true,
          link_name: 'Recursos'
        },
      },
      {
        path: 'add/:type',
        name: 'CrearRecurso',
        component: () => import(/* webpackChunkName: "usermanagement" */ '../views/MusicalResourceAdd.vue'),
        meta: {
          requiresAuth: true,
          is_admin: true,
          title: 'Nuevo recurso',
          link_name: 'Recursos'
        },
      },
      {
        path: ':id',
        name: 'VerRecurso',
        component: () => import(/* webpackChunkName: "usermanagement" */ '../views/MusicalResourceView.vue'),
        meta: {
          requiresAuth: true,
          is_admin: true,
          title: 'Recurso',
          link_name: 'VistaRecurso'
        },
      },
      {
        path: ':id/editar',
        name: 'EditarRecurso',
        component: () => import(/* webpackChunkName: "usermanagement" */ '../views/MusicalResourceAdd.vue'),
        meta: {
          requiresAuth: true,
          is_admin: true,
          link_name: 'edicionRecurso'
        },
      },
    ]
  },
  {
    path: '/admin/users',
    name: 'Usuarios',
    component: () => import(/* webpackChunkName: "usermanagement" */ '../views/UserManagement.vue'),
    redirect: { name: 'UserList' },
    meta: {
      requiresAuth: true,
      is_admin: true,
      title: 'Usuario',
      link_name: 'Usuarios',
    },
    children: [
      {
        path: '',
        name: 'UserList',
        component: () => import(/* webpackChunkName: "UserList" */ '../views/UserList.vue'),
        meta: {
          requiresAuth: true,
          is_admin: true,
          title: 'Usuarios',
          link_name: 'Gestión de Usuarios'
        },
      },
      {
        path: 'add',
        name: 'CrearUsuario',
        component: () => import(/* webpackChunkName: "useradd" */ '../views/UserAdd.vue'),
        meta: {
          requiresAuth: true,
          title: 'Crear usuario',
          is_admin: true,
          link_name: 'Crear Usuario',
        },
      },
      {
        path: 'edit/:id',
        name: 'EditarUsuario',
        component: () => import(/* webpackChunkName: "useradd" */ '../views/UserAdd.vue'),
        meta: {
          requiresAuth: true,
          is_admin: true,
          title: 'Editar usuario',
          link_name: 'Editar Usuario'
        }
      }
    ]
  },
  {
    path: '/docs',
    name: 'Docs',
    component: () => import('../views/docs/Docs'),
    meta: {
      requiresAuth: true,
      is_docs: true,
      title: 'Documentacion',
      link_name: 'Documentacion',
      layout: 'docs',
    },
    children: [
      {
        path: '/docs',
        component: () => import('../views/docs/Index'),
        name: 'IndiceDocs',
        meta: {
          requiresAuth: true,
          is_docs: true,
          title: 'Indice',
          link_name: 'Indice',
          layout: 'docs',
        },
      },
      {
        path: '/docs/resources',
        component: () => import('../views/docs/ResourcesDocs'),
        meta: {
          requiresAuth: true,
          is_docs: true,
          title: 'Recursos Musicales',
          link_name: 'Recursos musicales',
          layout: 'docs',
        },
      },
      {
        path: '/docs/users',
        component: () => import('../views/docs/UsersDocs'),
        meta: {
          requiresAuth: true,
          is_docs: true,
          title: 'Usuarios',
          link_name: 'Usuarios',
          layout: 'docs',
        },
      },
      {
        path: '/docs/news',
        component: () => import('../views/docs/NewsDocs'),
        meta: {
          requiresAuth: true,
          is_docs: true,
          title: 'Noticias',
          link_name: 'Noticias',
          layout: 'docs',
        },
      },
      {
        path: '/docs/shows',
        component: () => import('../views/docs/ShowsDocs'),
        meta: {
          requiresAuth: true,
          is_docs: true,
          title: 'Shows',
          link_name: 'Shows',
          layout: 'docs',
        },
      },{
        path: '/docs/register',
        component: () => import('../views/docs/RegisterDocs'),
        meta: {
          requiresAuth: true,
          is_docs: true,
          title: 'Registrarse',
          link_name: 'Registrarse',
          for_guest: true,
          layout: 'docs',
        },
      },
      {
        path: '/docs/login',
        component: () => import('../views/docs/LoginDocs'),
        meta: {
          requiresAuth: true,
          is_docs: true,
          title: 'Inicio de Sesión',
          link_name: 'Inicio de Sesión',
          for_guest: true,
          layout: 'docs',
        },
      }
,
      {
        path: '/docs/showPurchase',
        component: () => import('../views/docs/showPurchaseDocs'),
        meta: {
          requiresAuth: true,
          is_docs: true,
          title: 'Shows y Entradas',
          link_name: 'Shows y Entradas',
          for_guest: true,
          layout: 'docs',
        },
      },
      {
        path: '/docs/guestNews',
        component: () => import('../views/docs/GuestNewsDocs'),
        meta: {
          requiresAuth: true,
          is_docs: true,
          for_guest: true,
          title: 'Noticias',
          link_name: 'Noticias',
          layout: 'docs',
        },
      }	  
    ]
  },
  {
    path: '/admin/news',
    name: 'NewsManagement',
    component: () => import('../views/news/NewsManagement'),
    meta: {
      requiresAuth: true,
      is_admin: true,
      title: 'Noticias',
      link_name: 'Noticias'
    },
    redirect: { name: 'NewsList' },
    children: [
      {
        path: '',
        name: 'NewsList',
        component: () => import('../views/news/NewsList'),
        meta: {
          requiresAuth: true,
          is_admin: true,
          title: 'Noticias',
          link_name: 'Noticias'
        }
      },
      {
        path: 'add',
        name: 'CrearNoticia',
        component: () => import(/* webpackChunkName: "useradd" */ '../views/news/NewAdd.vue'),
        meta: {
          requiresAuth: true,
          is_admin: true,
          title: 'Crear noticia',
        },
      },
      {
        path: 'edit/:id',
        name: 'EditarNoticia',
        component: () => import(/* webpackChunkName: "useradd" */ '../views/news/NewAdd.vue'),
        meta: {
          requiresAuth: true,
          link_name: 'Editar Noticia',
          is_admin: true,
          title: 'Editar noticia',
        }
      }
    ]
  },
  {
    path: '/admin/shows/scan',
    name: 'ScanShows',
    component: () => import('../views/shows/Scan'),
    meta: {
      requiresAuth: true,
      is_admin: true,
      title: 'Escanear entradas',
      link_name: 'Escanear entradas',
    }
  },
  {
    path: '/admin/shows',
    name: 'ShowsManagement',
    component: () => import('../views/shows/ShowsManagement'),
    meta: {
      requiresAuth: true,
      is_admin: true,
      link_name: 'Shows',
      title: 'Shows',
    },
    redirect: { name: 'ShowsList' },
    children: [
      {
        path: '',
        name: 'ShowsList',
        component: () => import('../views/shows/ShowsList'),
        meta: {
          requiresAuth: true,
          is_admin: true,
          link_name: 'Shows',
          title: 'Shows',
        }
      },
      {
        path: 'add',
        name: 'CrearShow',
        component: () => import(/* webpackChunkName: "useradd" */ '../views/shows/ShowAdd.vue'),
        meta: {
          requiresAuth: true,
          is_admin: true,
          link_name: 'Crear show',
          title: 'Nuevo show',
        },
      },
      {
        path: 'edit/:id',
        name: 'EditarShow',
        component: () => import(/* webpackChunkName: "useradd" */ '../views/shows/ShowAdd.vue'),
        meta: {
          requiresAuth: true,
          is_admin: true,
          link_name: 'Editar Show',
          title: 'Editar Show',
        }
      }
    ]
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {

  document.title = to.meta.title;

  console.log("to", to)
  console.log("from", from)
  console.log("from", from)
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    console.log("1")
    if (localStorage.getItem('jwt') == null) {
      console.log("2")
      next({
        name: 'Login',
        params: { nextUrl: to.fullPath },
      });
    } else {
      console.log("3")
      const user = JSON.parse(localStorage.getItem('user'));
      console.log(user);
      if (to.matched.some((record) => record.meta.is_admin)) {
        console.log("4")
        if (user.rolesUser.map(rol => rol.id).includes(1)) {
          console.log("5")
          next();
        } else {
          console.log("6")
          next({ name: 'Home' });
        }
      } else {
        console.log("7")
        next();
      }
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    console.log("8")
    if (localStorage.getItem('jwt') == null) {
      console.log("9")
      next();
    } else {
      console.log("10")
      next({ name: 'Home' });
    }
  } else {
    console.log("10")
    next();
  }
});

export default router;
