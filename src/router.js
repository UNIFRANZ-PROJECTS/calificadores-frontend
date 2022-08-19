import Vue from "vue";
import Router from "vue-router";

import Layout from "@/components/Layout/Layout";

// Pages
import Dashboard from "@/pages/Dashboard/Dashboard";

//pages Administration users
import terminals from "@/pages/administration/terminals/terminals";
import areas from "@/pages/administration/areas/areas";
import users from "@/pages/administration/users/users";
import type_users from "@/pages/administration/type_users/type_users";
import roles from "@/pages/administration/roles/roles";
import permisions from "@/pages/administration/permisions";
//pages Surveys
import surveys from "@/pages/surveys/surveys/surveys";
import questions from "@/pages/surveys/questions/questions";
import type_answers from "@/pages/surveys/type_answers";


import Error from "@/pages/Error/Error";
import Login from "@/pages/Login/Login";

import report from "@/pages/reports/report";

//middleware
import auth from '@/middleware/auth';
import log from "@/middleware/log";
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        middleware: log,
      },
    },
    {
      path: "/",
      redirect: "login",
      name: "Layout",
      component: Layout,
      children: [
        {
          path: "dashboard",
          name: "Tablero",
          component: Dashboard,
          meta: {
            middleware: [auth,log],
          },
        },
        {
          path: "terminals",
          name: "Terminales",
          component: terminals,
          meta: {
            middleware: [auth,log],
          },
        },
        {
          path: "areas",
          name: "Areas",
          component: areas,
          meta: {
            middleware: [auth,log],
          },
        },
        {
          path: "users",
          name: "Usuarios",
          component: users,
          meta: {
            middleware: [auth,log],
          },
        },
        {
          path: "type_users",
          name: "Tipos de usuarios",
          component: type_users,
          meta: {
            middleware: [auth,log],
          },
        },
        {
          path: "roles",
          name: "Roles",
          component: roles,
          meta: {
            middleware: [auth,log],
          },
        },
        {
          path: "permisions",
          name: "Permisos",
          component: permisions,
          meta: {
            middleware: [auth,log],
          },
        },
        {
          path: "surveys",
          name: "Formularios",
          component: surveys,
          meta: {
            middleware: [auth,log],
          },
        },
        {
          path: "questions",
          name: "Preguntas",
          component: questions,
          meta: {
            middleware: [auth,log],
          },
        },
        {
          path: "type_answers",
          name: "Tipos de Respuestas",
          component: type_answers,
          meta: {
            middleware: [auth,log],
          },
        },
        {
          path: "report",
          name: "Reportes",
          component: report,
          meta: {
            middleware: [auth,log],
          },
        },
      ],
    },
    {
      path: "*",
      name: "Error",
      component: Error,
    },
  ],
  // mode: "history",
});

function nextFactory(context, middleware, index) {
  // console.log('context '+context )
  // console.log('middleware '+middleware)
  // console.log('index '+index)
  const subsequentMiddleware = middleware[index];
  // console.log('subsequentMiddleware '+subsequentMiddleware)
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  // console.log('beforeEach')
  if (to.meta.middleware) {
    // console.log(from)
    // console.log('to.meta.middleware '+to.meta.middleware)
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});

export default router;
