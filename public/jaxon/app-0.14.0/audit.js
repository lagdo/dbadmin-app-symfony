jaxon.config.requestURI = '/audit/jaxon';
jaxon.config.statusMessages = false;
jaxon.config.waitCursor = true;
jaxon.config.version = 'Jaxon 5.x';
jaxon.config.defaultMode = 'asynchronous';
jaxon.config.defaultMethod = 'POST';
jaxon.config.responseType = 'JSON';

jaxon.dom.ready(() => jaxon.processCustomAttrs());

const jx = {
  rc: (name, method, parameters, options = {}) => jaxon.request({ type: 'class', name, method }, { parameters, ...options}),
  rf: (name, parameters, options = {}) => jaxon.request({ type: 'func', name }, { parameters, ...options}),
  c0: 'Lagdo.DbAdmin.App.Ajax.Audit.AppFunc',
  c1: 'Lagdo.DbAdmin.App.Ajax.Audit.Commands',
};

Lagdo = {
  DbAdmin: {
    App: {
      Ajax: {
        Audit: {
          AppFunc: {
            start: (...args) => jx.rc(jx.c0, 'start', args, { bags: ["dbadmin.app","dbadmin","dbadmin.audit"] }),
            toggleSidebar: (...args) => jx.rc(jx.c0, 'toggleSidebar', args, { bags: ["dbadmin.app","dbadmin","dbadmin.audit"] }),
          },
          Commands: {
            page: (...args) => jx.rc(jx.c1, 'page', args, { bags: ["dbadmin.audit"] }),
            show: (...args) => jx.rc(jx.c1, 'show', args, { bags: ["dbadmin.audit"] }),
          },
        },
      },
    },
  },
};