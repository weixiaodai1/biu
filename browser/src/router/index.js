import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/** note: submenu only apppear when children.length>=1
 *   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
 *  roles: ['admin','editor']     will control the page roles (you can set multiple roles)
 *  perm: 'device:add'            基于资源控制菜单权限，写默认会显示出来，如果有值，会判断是否跟后台返回的资源权限匹配
 *  btns: [                       基于资源的按钮权限，这里定义一个页面上可以做权限控制的按钮权限值
 *    {pval: 'user:add', pname: '添加用户'},
 *    {pval: 'user:delete', pname: '删除用户'},
 *    {pval: 'user:update', pname: '更新用户'},
 *  ]
 *  title: 'title'               the name show in submenu and breadcrumb (recommend set)
 *  icon: 'svg-name'             the icon show in the sidebar,
 *  noCache: true                if true ,the page will no be cached(default is false)
 *}
 **/
export const constantRouterMap = [
  {path: '/login', component: _import('login/index'), hidden: true},
  {path: '/authredirect', component: _import('login/authredirect'), hidden: true},
  {path: '/404', component: _import('errorPage/404'), hidden: true},
  {path: '/401', component: _import('errorPage/401'), hidden: true},
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: {title: 'dashboard', icon: 'dashboard', noCache: true}
    }]
  },
  {
    path: '/documentation',
    component: Layout,
    redirect: '/documentation/index',
    children: [{
      path: 'index',
      component: _import('documentation/index'),
      name: 'documentation',
      meta: {title: 'documentation', icon: 'documentation', noCache: true}
    }]
  }


]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

export const asyncRouterMap = [

  {
    path: '/system',
    component: Layout,
    redirect: '/system/user_manage',
    meta: { title: 'system', icon: 'component', perm: 'system' },
    children: [
      // 用户管理
      {
        path: 'user_manage',
        name: 'user_manage',
        component: _import('system/user/index'),
        meta: {
          title: 'user_manage',
          icon: 'documentation',
          perm: 'system:user_manage',
          btns: [
            {perm: 'user:add', title: '新增用户'},
            {perm: 'user:delete', title: '删除用户'},
            {perm: 'user:update', title: '更新用户'},
          ]
        },
      },
      // 角色管理
      {
        path: 'role_manage',
        name: 'role_manage',
        component: _import('system/role/index'),
        meta: {
          title: 'role_manage',
          icon: 'documentation',
          perm: 'system:role_manage',
          btns: [
            {perm: 'role:add', title: '新增角色'},
            {perm: 'role:delete', title: '删除权限'},
            {perm: 'role:update', title: '更新权限'},
          ]
        },
      },
      // 权限管理
      {
        path: 'perm_manage', name: 'perm_manage', component: _import('system/perm/index'),
        meta: {
          title: 'perm_manage',
          icon: 'documentation',
          perm: 'system:perm_manage',
          btns: [
            {perm: 'perm:add', title: '新增权限'},
            {perm: 'perm:delete', title: '删除权限'},
            {perm: 'perm:update', title: '更新权限'},
          ]
        }
      },
      // 权限分配
      {
        path: 'perm_assign', name: 'perm_assign', component: _import('system/perm/perm_assign'),
        meta: {
          title: 'perm_assign',
          icon: 'documentation',
          perm: 'system:perm_assign',
          btns: [
            {perm: 'perm_assign:add', title: '添加权限分配'},
            {perm: 'perm_assign:delete', title: '删除权限分配'},
            {perm: 'perm_assign:update', title: '更新权限分配'},
          ]
        },
      },

    ]
  },

  // 权限测试
  {
    path: '/permission',
    redirect: '/permission/index',
    component: Layout,
    children: [{
      path: 'index',
      name: 'permission',
      component: _import('permission/index'),
      meta: { title: 'permission', icon: 'lock'}
    }]
  },

  // 菜单1
  {
    path: '/menu1',
    redirect: '/menu1/index',
    component: Layout,
    meta: { perm: 'menu:1' },
    children: [{
      path: 'index',
      name: 'menu1',
      component: _import('menu1/index'),
      meta: { title:'menu1', icon: 'lock' }
    }]
  },
  // 菜单2
  {
    path: '/menu2',
    redirect: '/menu2/index',
    component: Layout,
    meta: { perm: 'menu:2'},
    children: [{
      path: 'index',
      name: 'menu2',
      component: _import('menu2/index'),
      meta: {title: 'menu2', icon: 'lock'}
    }]
  },
  // 菜单3
  {
    path: '/menu3',
    redirect: '/menu3/index',
    component: Layout,
    meta: { perm: 'menu:3'},
    children: [{
      path: 'index',
      name: 'menu3',
      component: _import('menu3/index'),
      meta: {title: 'menu3', icon: 'lock'}
    }]
  },


  {
    path: '/icon',
    component: Layout,
    children: [{
      path: 'index',
      component: _import('svg-icons/index'),
      name: 'icons',
      meta: {title: 'icons', icon: 'icon', noCache: true}
    }]
  },

  {
    path: '/components',
    component: Layout,
    redirect: 'noredirect',
    name: 'component-demo',
    meta: {
      title: 'components',
      icon: 'component'
    },
    children: [
      {path: 'tinymce', component: _import('components-demo/tinymce'), name: 'tinymce-demo', meta: {title: 'tinymce'}},
      {
        path: 'markdown',
        component: _import('components-demo/markdown'),
        name: 'markdown-demo',
        meta: {title: 'markdown'}
      },
      {
        path: 'json-editor',
        component: _import('components-demo/jsonEditor'),
        name: 'jsonEditor-demo',
        meta: {title: 'jsonEditor'}
      },
      {path: 'dnd-list', component: _import('components-demo/dndList'), name: 'dndList-demo', meta: {title: 'dndList'}},
      {
        path: 'splitpane',
        component: _import('components-demo/splitpane'),
        name: 'splitpane-demo',
        meta: {title: 'splitPane'}
      },
      {
        path: 'avatar-upload',
        component: _import('components-demo/avatarUpload'),
        name: 'avatarUpload-demo',
        meta: {title: 'avatarUpload'}
      },
      {
        path: 'dropzone',
        component: _import('components-demo/dropzone'),
        name: 'dropzone-demo',
        meta: {title: 'dropzone'}
      },
      {path: 'sticky', component: _import('components-demo/sticky'), name: 'sticky-demo', meta: {title: 'sticky'}},
      {path: 'count-to', component: _import('components-demo/countTo'), name: 'countTo-demo', meta: {title: 'countTo'}},
      {
        path: 'mixin',
        component: _import('components-demo/mixin'),
        name: 'componentMixin-demo',
        meta: {title: 'componentMixin'}
      },
      {
        path: 'back-to-top',
        component: _import('components-demo/backToTop'),
        name: 'backToTop-demo',
        meta: {title: 'backToTop'}
      }
    ]
  },

  {
    path: '/charts',
    component: Layout,
    redirect: 'noredirect',
    name: 'charts',
    meta: {
      title: 'charts',
      icon: 'chart'
    },
    children: [
      {
        path: 'keyboard',
        component: _import('charts/keyboard'),
        name: 'keyboardChart',
        meta: {title: 'keyboardChart', noCache: true}
      },
      {path: 'line', component: _import('charts/line'), name: 'lineChart', meta: {title: 'lineChart', noCache: true}},
      {
        path: 'mixchart',
        component: _import('charts/mixChart'),
        name: 'mixChart',
        meta: {title: 'mixChart', noCache: true}
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table/complex-table',
    name: 'example',
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [
      {
        path: '/example/table',
        component: _import('example/table/index'),
        redirect: '/example/table/complex-table',
        name: 'Table',
        meta: {
          title: 'Table',
          icon: 'table'
        },
        children: [
          {
            path: 'dynamic-table',
            component: _import('example/table/dynamicTable/index'),
            name: 'dynamicTable',
            meta: {title: 'dynamicTable'}
          },
          {
            path: 'drag-table',
            component: _import('example/table/dragTable'),
            name: 'dragTable',
            meta: {title: 'dragTable'}
          },
          {
            path: 'inline-edit-table',
            component: _import('example/table/inlineEditTable'),
            name: 'inlineEditTable',
            meta: {title: 'inlineEditTable'}
          },
          {
            path: 'tree-table',
            component: _import('example/table/treeTable/treeTable'),
            name: 'treeTableDemo',
            meta: {title: 'treeTable'}
          },
          {
            path: 'custom-tree-table',
            component: _import('example/table/treeTable/customTreeTable'),
            name: 'customTreeTableDemo',
            meta: {title: 'customTreeTable'}
          },
          {
            path: 'complex-table',
            component: _import('example/table/complexTable'),
            name: 'complexTable',
            meta: {title: 'complexTable'}
          }
        ]
      },
      {path: 'tab/index', icon: 'tab', component: _import('example/tab/index'), name: 'tab', meta: {title: 'tab'}}
    ]
  },

  {
    path: '/form',
    component: Layout,
    redirect: 'noredirect',
    name: 'form',
    meta: {
      title: 'form',
      icon: 'form'
    },
    children: [
      {
        path: 'create-form',
        component: _import('form/create'),
        name: 'createForm',
        meta: {title: 'createForm', icon: 'table'}
      },
      {path: 'edit-form', component: _import('form/edit'), name: 'editForm', meta: {title: 'editForm', icon: 'table'}}
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'errorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      {path: '401', component: _import('errorPage/401'), name: 'page401', meta: {title: 'page401', noCache: true}},
      {path: '404', component: _import('errorPage/404'), name: 'page404', meta: {title: 'page404', noCache: true}}
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    redirect: 'noredirect',
    children: [{
      path: 'log',
      component: _import('errorLog/index'),
      name: 'errorLog',
      meta: {title: 'errorLog', icon: 'bug'}
    }]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: _import('excel/exportExcel'),
        name: 'exportExcel',
        meta: {title: 'exportExcel'}
      },
      {
        path: 'export-selected-excel',
        component: _import('excel/selectExcel'),
        name: 'selectExcel',
        meta: {title: 'selectExcel'}
      },
      {path: 'upload-excel', component: _import('excel/uploadExcel'), name: 'uploadExcel', meta: {title: 'uploadExcel'}}
    ]
  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    meta: {title: 'zip', icon: 'zip'},
    children: [{path: 'download', component: _import('zip/index'), name: 'exportZip', meta: {title: 'exportZip'}}]
  },

  {
    path: '/theme',
    component: Layout,
    redirect: 'noredirect',
    children: [{path: 'index', component: _import('theme/index'), name: 'theme', meta: {title: 'theme', icon: 'theme'}}]
  },

  {
    path: '/clipboard',
    component: Layout,
    redirect: 'noredirect',
    children: [{
      path: 'index',
      component: _import('clipboard/index'),
      name: 'clipboardDemo',
      meta: {title: 'clipboardDemo', icon: 'clipboard'}
    }]
  },

  {
    path: '/i18n',
    component: Layout,
    children: [{
      path: 'index',
      component: _import('i18n-demo/index'),
      name: 'i18n',
      meta: {title: 'i18n', icon: 'international'}
    }]
  },

  {path: '*', redirect: '/404', hidden: true}
]
