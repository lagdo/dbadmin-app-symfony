jaxon.config.requestURI = '/jaxon';
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
  c0: 'Lagdo.DbAdmin.App.Ajax.Admin.AppFunc',
  c1: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Command.DumpStorage',
  c2: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Command.Query.Favorite',
  c3: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Command.Query.FavoriteFunc',
  c4: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Command.Query.FavoritePage',
  c5: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Command.Query.History',
  c6: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Command.Query.HistoryPage',
  c7: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Database.Database',
  c8: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Database.EditorFunc',
  c9: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Database.Events',
  c10: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Database.Export',
  c11: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Database.Import',
  c12: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Database.QueryEditor',
  c13: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Database.Routines',
  c14: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Database.Sequences',
  c15: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Database.Tables',
  c16: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Database.UserTypes',
  c17: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Database.Views',
  c18: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.QueryBuilder.Fields.Columns',
  c19: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.QueryBuilder.Fields.Filters',
  c20: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.QueryBuilder.Fields.Foreigns',
  c21: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.QueryBuilder.Fields.Form.Columns',
  c22: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.QueryBuilder.Fields.Form.Filters',
  c23: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.QueryBuilder.Fields.Form.Sorters',
  c24: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.QueryBuilder.Fields.Sorters',
  c25: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.QueryBuilder.Values',
  c26: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Server.Databases',
  c27: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Server.EditorFunc',
  c28: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Server.Export',
  c29: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Server.Import',
  c30: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Server.Privilege',
  c31: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Server.Privileges',
  c32: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Server.Processes',
  c33: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Server.QueryEditor',
  c34: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Server.Status',
  c35: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Server.Variables',
  c36: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Table.Ddl.Alter',
  c37: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Table.Ddl.Column.CreateFunc',
  c38: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Table.Ddl.Column.DeleteFunc',
  c39: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Table.Ddl.Column.MoveFunc',
  c40: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Table.Ddl.Column.UpdateFunc',
  c41: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Table.Ddl.Create',
  c42: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Table.Ddl.SqlCodeFunc',
  c43: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Table.Ddl.Table',
  c44: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Table.Ddl.TableFunc',
  c45: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Table.Dml.DeleteFunc',
  c46: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Table.Dml.InsertFunc',
  c47: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Table.Dml.SearchFunc',
  c48: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Table.Dml.SqlCodeFunc',
  c49: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Table.Dml.UpdateFunc',
  c50: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Table.Dql.ResultSet',
  c51: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.Table.Dql.Select',
  c52: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.View.Ddl.Form',
  c53: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.View.Ddl.View',
  c54: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.View.Ddl.ViewFunc',
  c55: 'Lagdo.DbAdmin.App.Ajax.Admin.Db.View.Dql.Select',
  c56: 'Lagdo.DbAdmin.App.Ajax.Admin.DbFunc',
};

Lagdo = {
  DbAdmin: {
    App: {
      Ajax: {
        Admin: {
          AppFunc: {
            start: (...args) => jx.rc(jx.c0, 'start', args, { bags: ["dbadmin.app","dbadmin","dbadmin.tab"], mode: 'synchronous' }),
            addSavedTabs: (...args) => jx.rc(jx.c0, 'addSavedTabs', args, { bags: ["dbadmin.app","dbadmin","dbadmin.tab"], mode: 'synchronous' }),
            addSavedTab: (...args) => jx.rc(jx.c0, 'addSavedTab', args, { bags: ["dbadmin.app","dbadmin","dbadmin.tab"], mode: 'synchronous' }),
            addTab: (...args) => jx.rc(jx.c0, 'addTab', args, { bags: ["dbadmin.app","dbadmin","dbadmin.tab"] }),
            delTab: (...args) => jx.rc(jx.c0, 'delTab', args, { bags: ["dbadmin.app","dbadmin","dbadmin.tab"] }),
            editTabTitle: (...args) => jx.rc(jx.c0, 'editTabTitle', args, { bags: ["dbadmin.app","dbadmin","dbadmin.tab"] }),
            saveTabTitle: (...args) => jx.rc(jx.c0, 'saveTabTitle', args, { bags: ["dbadmin.app","dbadmin","dbadmin.tab"] }),
            saveAppTabs: (...args) => jx.rc(jx.c0, 'saveAppTabs', args, { bags: ["dbadmin.app","dbadmin","dbadmin.tab"] }),
            toggleSidebar: (...args) => jx.rc(jx.c0, 'toggleSidebar', args, { bags: ["dbadmin.app","dbadmin","dbadmin.tab"] }),
          },
          Db: {
            Command: {
              DumpStorage: {
                showStorages: (...args) => jx.rc(jx.c1, 'showStorages', args, { bags: ["dbadmin.app","dbadmin"] }),
                showDumps: (...args) => jx.rc(jx.c1, 'showDumps', args, { bags: ["dbadmin.app","dbadmin"] }),
                selectDump: (...args) => jx.rc(jx.c1, 'selectDump', args, { bags: ["dbadmin.app","dbadmin"] }),
              },
              Query: {
                Favorite: {
                  render: (...args) => jx.rc(jx.c2, 'render', args, { bags: ["dbadmin.app","dbadmin"] }),
                },
                FavoriteFunc: {
                  add: (...args) => jx.rc(jx.c3, 'add', args, { bags: ["dbadmin.app","dbadmin"] }),
                  create: (...args) => jx.rc(jx.c3, 'create', args, { bags: ["dbadmin.app","dbadmin"] }),
                  edit: (...args) => jx.rc(jx.c3, 'edit', args, { bags: ["dbadmin.app","dbadmin"] }),
                  update: (...args) => jx.rc(jx.c3, 'update', args, { bags: ["dbadmin.app","dbadmin"] }),
                  delete: (...args) => jx.rc(jx.c3, 'delete', args, { bags: ["dbadmin.app","dbadmin"] }),
                },
                FavoritePage: {
                  page: (...args) => jx.rc(jx.c4, 'page', args, { bags: ["dbadmin.app","dbadmin"] }),
                },
                History: {
                  render: (...args) => jx.rc(jx.c5, 'render', args, { bags: ["dbadmin.app","dbadmin"] }),
                },
                HistoryPage: {
                  page: (...args) => jx.rc(jx.c6, 'page', args, { bags: ["dbadmin.app","dbadmin"] }),
                },
              },
            },
            Database: {
              Database: {
                add: (...args) => jx.rc(jx.c7, 'add', args, { bags: ["dbadmin.app","dbadmin"] }),
                create: (...args) => jx.rc(jx.c7, 'create', args, { bags: ["dbadmin.app","dbadmin"] }),
                drop: (...args) => jx.rc(jx.c7, 'drop', args, { bags: ["dbadmin.app","dbadmin"] }),
              },
              EditorFunc: {
                saveTabs: (...args) => jx.rc(jx.c8, 'saveTabs', args, { bags: ["dbadmin.app","dbadmin","dbadmin.tab"] }),
                addTab: (...args) => jx.rc(jx.c8, 'addTab', args, { bags: ["dbadmin.app","dbadmin","dbadmin.tab"] }),
                cloneTab: (...args) => jx.rc(jx.c8, 'cloneTab', args, { bags: ["dbadmin.app","dbadmin","dbadmin.tab"] }),
                delTab: (...args) => jx.rc(jx.c8, 'delTab', args, { bags: ["dbadmin.app","dbadmin","dbadmin.tab"] }),
              },
              Events: {
                show: (...args) => jx.rc(jx.c9, 'show', args, { bags: ["dbadmin.app","dbadmin"] }),
              },
              Export: {
                database: (...args) => jx.rc(jx.c10, 'database', args, { bags: ["dbadmin.app","dbadmin"] }),
                export: (...args) => jx.rc(jx.c10, 'export', args, { bags: ["dbadmin.app","dbadmin"] }),
              },
              Import: {
                database: (...args) => jx.rc(jx.c11, 'database', args, { bags: ["dbadmin.app","dbadmin"] }),
                importFromUpload: (...args) => jx.rc(jx.c11, 'importFromUpload', args, { bags: ["dbadmin.app","dbadmin"], callback: [jaxon.dbadmin.upload], upload: 'dbadmin-import-upload-input' }),
                importFromStorage: (...args) => jx.rc(jx.c11, 'importFromStorage', args, { bags: ["dbadmin.app","dbadmin"] }),
                updateStatus: (...args) => jx.rc(jx.c11, 'updateStatus', args, { bags: ["dbadmin.app","dbadmin"] }),
              },
              QueryEditor: {
                database: (...args) => jx.rc(jx.c12, 'database', args, { bags: ["dbadmin.app","dbadmin","dbadmin.tab"] }),
                exec: (...args) => jx.rc(jx.c12, 'exec', args, { bags: ["dbadmin.app","dbadmin","dbadmin.tab"] }),
              },
              Routines: {
                show: (...args) => jx.rc(jx.c13, 'show', args, { bags: ["dbadmin.app","dbadmin"] }),
              },
              Sequences: {
                show: (...args) => jx.rc(jx.c14, 'show', args, { bags: ["dbadmin.app","dbadmin"] }),
              },
              Tables: {
                show: (...args) => jx.rc(jx.c15, 'show', args, { bags: ["dbadmin.app","dbadmin"] }),
              },
              UserTypes: {
                show: (...args) => jx.rc(jx.c16, 'show', args, { bags: ["dbadmin.app","dbadmin"] }),
              },
              Views: {
                show: (...args) => jx.rc(jx.c17, 'show', args, { bags: ["dbadmin.app","dbadmin"] }),
              },
            },
            QueryBuilder: {
              Fields: {
                Columns: {
                  edit: (...args) => jx.rc(jx.c18, 'edit', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table","dbadmin.builder"] }),
                  save: (...args) => jx.rc(jx.c18, 'save', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table","dbadmin.builder"] }),
                },
                Filters: {
                  edit: (...args) => jx.rc(jx.c19, 'edit', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table","dbadmin.builder"] }),
                  save: (...args) => jx.rc(jx.c19, 'save', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table","dbadmin.builder"] }),
                },
                Foreigns: {
                  toggle: (...args) => jx.rc(jx.c20, 'toggle', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table","dbadmin.builder"] }),
                },
                Form: {
                  Columns: {
                    show: (...args) => jx.rc(jx.c21, 'show', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table","dbadmin.builder"] }),
                    add: (...args) => jx.rc(jx.c21, 'add', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table","dbadmin.builder"] }),
                    del: (...args) => jx.rc(jx.c21, 'del', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table","dbadmin.builder"] }),
                  },
                  Filters: {
                    show: (...args) => jx.rc(jx.c22, 'show', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table","dbadmin.builder"] }),
                    add: (...args) => jx.rc(jx.c22, 'add', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table","dbadmin.builder"] }),
                    del: (...args) => jx.rc(jx.c22, 'del', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table","dbadmin.builder"] }),
                  },
                  Sorters: {
                    show: (...args) => jx.rc(jx.c23, 'show', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table","dbadmin.builder"] }),
                    add: (...args) => jx.rc(jx.c23, 'add', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table","dbadmin.builder"] }),
                    del: (...args) => jx.rc(jx.c23, 'del', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table","dbadmin.builder"] }),
                  },
                },
                Sorters: {
                  edit: (...args) => jx.rc(jx.c24, 'edit', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table","dbadmin.builder"] }),
                  save: (...args) => jx.rc(jx.c24, 'save', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table","dbadmin.builder"] }),
                  upsert: (...args) => jx.rc(jx.c24, 'upsert', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table","dbadmin.builder"] }),
                  remove: (...args) => jx.rc(jx.c24, 'remove', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table","dbadmin.builder"] }),
                },
              },
              Values: {
                saveSelectLimit: (...args) => jx.rc(jx.c25, 'saveSelectLimit', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table","dbadmin.builder"] }),
                saveSelectTotal: (...args) => jx.rc(jx.c25, 'saveSelectTotal', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table","dbadmin.builder"] }),
                saveTextLength: (...args) => jx.rc(jx.c25, 'saveTextLength', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table","dbadmin.builder"] }),
              },
            },
            Server: {
              Databases: {
                show: (...args) => jx.rc(jx.c26, 'show', args, { bags: ["dbadmin.app","dbadmin"] }),
              },
              EditorFunc: {
                saveTabs: (...args) => jx.rc(jx.c27, 'saveTabs', args, { bags: ["dbadmin.app","dbadmin","dbadmin.tab"] }),
                addTab: (...args) => jx.rc(jx.c27, 'addTab', args, { bags: ["dbadmin.app","dbadmin","dbadmin.tab"] }),
                cloneTab: (...args) => jx.rc(jx.c27, 'cloneTab', args, { bags: ["dbadmin.app","dbadmin","dbadmin.tab"] }),
                delTab: (...args) => jx.rc(jx.c27, 'delTab', args, { bags: ["dbadmin.app","dbadmin","dbadmin.tab"] }),
              },
              Export: {
                server: (...args) => jx.rc(jx.c28, 'server', args, { bags: ["dbadmin.app","dbadmin"] }),
                export: (...args) => jx.rc(jx.c28, 'export', args, { bags: ["dbadmin.app","dbadmin"] }),
              },
              Import: {
                server: (...args) => jx.rc(jx.c29, 'server', args, { bags: ["dbadmin.app","dbadmin"] }),
                importFromUpload: (...args) => jx.rc(jx.c29, 'importFromUpload', args, { bags: ["dbadmin.app","dbadmin"], callback: [jaxon.dbadmin.upload], upload: 'dbadmin-import-upload-input' }),
                importFromStorage: (...args) => jx.rc(jx.c29, 'importFromStorage', args, { bags: ["dbadmin.app","dbadmin"] }),
                updateStatus: (...args) => jx.rc(jx.c29, 'updateStatus', args, { bags: ["dbadmin.app","dbadmin"] }),
              },
              Privilege: {
                add: (...args) => jx.rc(jx.c30, 'add', args, { bags: ["dbadmin.app","dbadmin"] }),
                create: (...args) => jx.rc(jx.c30, 'create', args, { bags: ["dbadmin.app","dbadmin"] }),
                edit: (...args) => jx.rc(jx.c30, 'edit', args, { bags: ["dbadmin.app","dbadmin"] }),
                update: (...args) => jx.rc(jx.c30, 'update', args, { bags: ["dbadmin.app","dbadmin"] }),
              },
              Privileges: {
                show: (...args) => jx.rc(jx.c31, 'show', args, { bags: ["dbadmin.app","dbadmin"] }),
              },
              Processes: {
                show: (...args) => jx.rc(jx.c32, 'show', args, { bags: ["dbadmin.app","dbadmin"] }),
              },
              QueryEditor: {
                server: (...args) => jx.rc(jx.c33, 'server', args, { bags: ["dbadmin.app","dbadmin","dbadmin.tab"] }),
                exec: (...args) => jx.rc(jx.c33, 'exec', args, { bags: ["dbadmin.app","dbadmin","dbadmin.tab"] }),
              },
              Status: {
                show: (...args) => jx.rc(jx.c34, 'show', args, { bags: ["dbadmin.app","dbadmin"] }),
              },
              Variables: {
                show: (...args) => jx.rc(jx.c35, 'show', args, { bags: ["dbadmin.app","dbadmin"] }),
              },
            },
            Table: {
              Ddl: {
                Alter: {
                  render: (...args) => jx.rc(jx.c36, 'render', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table"] }),
                },
                Column: {
                  CreateFunc: {
                    add: (...args) => jx.rc(jx.c37, 'add', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table"] }),
                    save: (...args) => jx.rc(jx.c37, 'save', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table"], callback: [jaxon.dbadmin.bagTableForm] }),
                  },
                  DeleteFunc: {
                    exec: (...args) => jx.rc(jx.c38, 'exec', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table"], callback: [jaxon.dbadmin.bagTableForm] }),
                    cancel: (...args) => jx.rc(jx.c38, 'cancel', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table"], callback: [jaxon.dbadmin.bagTableForm] }),
                  },
                  MoveFunc: {
                    up: (...args) => jx.rc(jx.c39, 'up', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table"] }),
                    down: (...args) => jx.rc(jx.c39, 'down', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table"] }),
                  },
                  UpdateFunc: {
                    edit: (...args) => jx.rc(jx.c40, 'edit', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table"] }),
                    save: (...args) => jx.rc(jx.c40, 'save', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table"], callback: [jaxon.dbadmin.bagTableForm] }),
                    cancel: (...args) => jx.rc(jx.c40, 'cancel', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table"], callback: [jaxon.dbadmin.bagTableForm] }),
                  },
                },
                Create: {
                  render: (...args) => jx.rc(jx.c41, 'render', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table"] }),
                },
                SqlCodeFunc: {
                  showCreateChanges: (...args) => jx.rc(jx.c42, 'showCreateChanges', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table"] }),
                  showAlterChanges: (...args) => jx.rc(jx.c42, 'showAlterChanges', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table"] }),
                  showCreateQueries: (...args) => jx.rc(jx.c42, 'showCreateQueries', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table"] }),
                  showAlterQueries: (...args) => jx.rc(jx.c42, 'showAlterQueries', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table"] }),
                },
                Table: {
                  show: (...args) => jx.rc(jx.c43, 'show', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table"] }),
                },
                TableFunc: {
                  create: (...args) => jx.rc(jx.c44, 'create', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table"] }),
                  alter: (...args) => jx.rc(jx.c44, 'alter', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table"] }),
                  drop: (...args) => jx.rc(jx.c44, 'drop', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table"] }),
                },
              },
              Dml: {
                DeleteFunc: {
                  exec: (...args) => jx.rc(jx.c45, 'exec', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table","dbadmin.builder"] }),
                },
                InsertFunc: {
                  show: (...args) => jx.rc(jx.c46, 'show', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table","dbadmin.builder"] }),
                  save: (...args) => jx.rc(jx.c46, 'save', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table","dbadmin.builder"] }),
                  showQueryForm: (...args) => jx.rc(jx.c46, 'showQueryForm', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table","dbadmin.builder"] }),
                },
                SearchFunc: {
                  search: (...args) => jx.rc(jx.c47, 'search', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table","dbadmin.builder"], mode: 'synchronous' }),
                },
                SqlCodeFunc: {
                  showInsertRowQuery: (...args) => jx.rc(jx.c48, 'showInsertRowQuery', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table"] }),
                  showUpdateRowQuery: (...args) => jx.rc(jx.c48, 'showUpdateRowQuery', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table"] }),
                  showDeleteRowQuery: (...args) => jx.rc(jx.c48, 'showDeleteRowQuery', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table"] }),
                  showDropTableQuery: (...args) => jx.rc(jx.c48, 'showDropTableQuery', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table"] }),
                  showDropViewQuery: (...args) => jx.rc(jx.c48, 'showDropViewQuery', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table"] }),
                },
                UpdateFunc: {
                  edit: (...args) => jx.rc(jx.c49, 'edit', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table","dbadmin.builder"] }),
                  save: (...args) => jx.rc(jx.c49, 'save', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table","dbadmin.builder"] }),
                  showQueryForm: (...args) => jx.rc(jx.c49, 'showQueryForm', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table","dbadmin.builder"] }),
                },
              },
              Dql: {
                ResultSet: {
                  page: (...args) => jx.rc(jx.c50, 'page', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table","dbadmin.builder"] }),
                },
                Select: {
                  show: (...args) => jx.rc(jx.c51, 'show', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table","dbadmin.builder"] }),
                  foreign: (...args) => jx.rc(jx.c51, 'foreign', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table","dbadmin.builder"] }),
                  back: (...args) => jx.rc(jx.c51, 'back', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table","dbadmin.builder"] }),
                  edit: (...args) => jx.rc(jx.c51, 'edit', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table","dbadmin.builder","dbadmin.tab"] }),
                },
              },
            },
            View: {
              Ddl: {
                Form: {
                  add: (...args) => jx.rc(jx.c52, 'add', args, { bags: ["dbadmin.app","dbadmin"] }),
                  edit: (...args) => jx.rc(jx.c52, 'edit', args, { bags: ["dbadmin.app","dbadmin"] }),
                },
                View: {
                  show: (...args) => jx.rc(jx.c53, 'show', args, { bags: ["dbadmin.app","dbadmin"] }),
                },
                ViewFunc: {
                  create: (...args) => jx.rc(jx.c54, 'create', args, { bags: ["dbadmin.app","dbadmin"] }),
                  update: (...args) => jx.rc(jx.c54, 'update', args, { bags: ["dbadmin.app","dbadmin"] }),
                  drop: (...args) => jx.rc(jx.c54, 'drop', args, { bags: ["dbadmin.app","dbadmin"] }),
                },
              },
              Dql: {
                Select: {
                  show: (...args) => jx.rc(jx.c55, 'show', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table","dbadmin.builder"] }),
                  edit: (...args) => jx.rc(jx.c55, 'edit', args, { bags: ["dbadmin.app","dbadmin","dbadmin.table","dbadmin.builder","dbadmin.tab"] }),
                },
              },
            },
          },
          DbFunc: {
            server: (...args) => jx.rc(jx.c56, 'server', args, { bags: ["dbadmin.app","dbadmin","dbadmin.tab"] }),
            database: (...args) => jx.rc(jx.c56, 'database', args, { bags: ["dbadmin.app","dbadmin","dbadmin.tab"] }),
          },
        },
      },
    },
  },
};