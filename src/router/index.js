import Vue from 'vue';
import Router from 'vue-router';
import {
  orgPage,
  budimport,
  AccountBalanceImport,
  AnalysisReportImport,
  subaccount,
  busdata,
  specialfee, reportquery, AccountSpecialFee,
  ReportSpecialFee, InsideTransaction, NonOperatIncome, OtherInsideTransaction,
  countryPage, BUReportExport, LockAccount, OriginalBudgetImport, RegionalCost, RegisterReview
} from 'utils/btnRole'
import imServer from '@/components/imServer/imServer'
import imClient from '@/components/imClient/imClient'
Vue.use(Router);

/* layout */
import Layout from '../views/layout/Layout';

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will no redirct in the levelbar
 * noDropdown : if `noDropdown:true` will has no submenu
 * meta : { role: ['admin'] }  will control the page role
 **/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index').then(m => m.default),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index').then(m => m.default),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '用户首页',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index').then(m => m.default),
        meta: {
          roles: ['Customs.BaseCustomInfo']
        },
      },
      {
        path: 'home',
        component: () => import('@/views/home/index').then(m => m.default),
        meta: {
          roles: ['Pages.Administration.Users']
        },
      },
    ]
  },
  {
    path: '/authredirect',
    component: () => import('@/views/login/authredirect').then(m => m.default),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error/404').then(m => m.default),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401').then(m => m.default),
    hidden: true
  },
  {
    path: '/codeCallback',
    component: () => import('@/views/modules/ssoclient/codeCallback').then(m => m.default),
    hidden: true
  },
  {
    path: '/choosedTenement',
    component: () => import('@/views/permission/choosedTenement/choosedTenementIndex').then(m => m.default),
    hidden: true
  }
]

export const asyncRouterMap = [
  {
    path: '/administration',
    component: Layout,
    redirect: '/administration/index',
    alwaysShow: true,
    meta: {
      title: '基础数据',
      icon: '个人中心',
    },
    children: [
      {
        path: 'organizationUnits',
        component: () => import('@/views/permission/organizationManage/organizationIndex').then(m => m.default),
        name: 'organizationIndex',
        meta: {
          title: '组织机构',
          icon: '个人中心',
          keepAlive: true,
          roles: ['Pages.Administration.OrganizationUnits']
        },
        btn: orgPage
      },
      {
        path: 'Users',
        component: () => import('@/views/permission/user/userManageIndex').then(m => m.default),
        name: 'userManageIndex',
        meta: {
          title: '用户',
          icon: '个人中心',
          keepAlive: true,
          roles: ['Pages.Administration.Users']

        }
      },
      {
        path: 'roles',
        component: () => import('@/views/permission/roles/roleManageIndex').then(m => m.default),
        name: 'roleManageIndex',
        meta: {
          title: '角色',
          icon: '个人中心',
          keepAlive: true,
          roles: ['Pages.Administration.Roles']

        },

      },
      {
        path: 'dictionaryManage',
        component: () => import('@/views/publicBase/dictionaryManage/dictionaryIndex').then(m => m.default),
        name: 'dictionaryIndex',
        meta: {
          title: '字典管理',
          icon: '个人中心',
          keepAlive: true,
          roles: ['Customs.Dictionary']
        },
      },
      {
        path: 'BaseCountry',
        component: () => import('@/views/publicBase/baseCountry/countryIndex').then(m => m.default),
        name: 'countryIndex',
        keepAlive: true,
        meta: {
          title: '国家资料',
          icon: '个人中心',
          roles: ['Customs.BaseCountry']
        },
      },
      {
        path: 'siteTables',
        component: () => import('@/views/publicBase/siteTables/siteTablesIndex').then(m => m.default),
        name: 'siteTables',
        keepAlive: true,
        meta: {
          title: '站点维护',
          icon: '个人中心',
          roles: ['Customs.SiteTable']
        },
      },
      {
        path: 'line',
        component: () => import('@/views/publicBase/line/lineIndex').then(m => m.default),
        name: 'line',
        keepAlive: true,
        meta: {
          title: '路线维护',
          icon: '个人中心',
          roles: ['Customs.CountryLine']
        },
      },
      {
        path: 'linSite',
        component: () => import('@/views/publicBase/linSite/linSiteIndex').then(m => m.default),
        name: 'linSite',
        keepAlive: true,
        meta: {
          title: '站点路线维护',
          icon: '个人中心',
          roles: ['Customs.LinSite']
        },
      },
    ]
  },


  //信息审核
  {
    path: '/review',
    component: Layout,
    redirect: '/tools/index',
    alwaysShow: true,
    meta: {
      title: '信息审核',
      icon: '个人客户',
    },
    children: [
      {
        path: 'registerReviewIndex',
        component: () => import('@/views/review/registerReview/registerReviewIndex').then(m => m.default),
        name: 'registerReviewIndex',
        meta: {
          title: '注册信息审核',
          icon: '个人客户',
          keepAlive: true,
          roles: ['Customs.RegisterCheck']
        },
        //btn: RegisterReview
      },
      {
        path: 'boxReleaseReviewIndex',
        component: () => import('@/views/review/releaseReview/boxReleaseReviewIndex').then(m => m.default),
        name: 'boxReleaseReviewIndex',
        meta: {
          title: '箱东发布审核',
          icon: '个人客户',
          keepAlive: true,
          roles: ['Customs.XDBoxCheck']
        },
        //btn: RegisterReview
      },
      {
        path: 'tenantReleaseReviewIndex',
        component: () => import('@/views/review/releaseReview/tenantReleaseReviewIndex').then(m => m.default),
        name: 'tenantReleaseReviewIndex',
        meta: {
          title: '租客发布审核',
          icon: '个人客户',
          keepAlive: true,
          roles: ['Customs.ZKTenantCheck']
        },
        //btn: RegisterReview
      },
    ]
  },
  //
  {
    path: '/query',
    component: Layout,
    redirect: '/tools/index',
    alwaysShow: true,
    meta: {
      title: '信息查询',
      icon: '个人客户',
    },
    children: [
      {
        path: 'boxReleaseQueryIndex',
        component: () => import('@/views/query/boxReleaseQueryIndex').then(m => m.default),
        name: 'boxReleaseQueryIndex',
        meta: {
          title: '船东信息查询',
          icon: '个人客户',
          keepAlive: true,
          roles: ['Customs.BoxRelease']
        },
        //btn: busdata
      },
      {
        path: 'tenantReleaseQueryIndex',
        component: () => import('@/views/query/tenantReleaseQueryIndex').then(m => m.default),
        name: 'tenantReleaseQueryIndex',
        meta: {
          title: '租客信息查询',
          icon: '个人客户',
          keepAlive: true,
          roles: ['Customs.TenantRelease']
        },
        //btn: specialfee
      },
      {
        path: 'boxTenantOrderQueryIndex',
        component: () => import('@/views/query/boxTenantOrderQueryIndex').then(m => m.default),
        name: 'boxTenantOrderQueryIndex',
        meta: {
          title: '提单信息确认',
          icon: '个人客户',
          keepAlive: true,
          roles: ['Customs.BoxTenantOrder']
        },
        //btn: specialfee
      },
      {
        path: 'interRecomQuery',
        component: () => import('@/views/query/interRecomQuery').then(m => m.default),
        name: 'interRecomQuery',
        meta: {
          title: '智能推荐',
          icon: '个人客户',
          keepAlive: true,
          roles: ['Customs.InterRecomQuery']
        },
        //btn: specialfee
      },
    ]
  },
  {
    path: '/imChat',
    component: Layout,
    redirect: '/tools/index',
    alwaysShow: true,
    meta: {
      title: '客服中心',
      icon: '个人客户',
    },
    children: [
      {
        path: 'imChatServer',
        component: () => import('@/views/imChat/imChatServer').then(m => m.default),
        name: 'imChatServer',
        meta: {
          title: '客服上线',
          icon: '个人客户',
          keepAlive: true,
          roles: ['Customs.ImChatServer']
        },
        //btn: specialfee
      },
    ]
  }
  // { path: '/imServer', name: 'imServer', component: imServer },
  // { path: '/imClient', name: 'imClient', component: imClient },
]


export default new Router({
  // mode: 'history', //后端支持可开
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     if (from.meta.keepAlive) {
  //       from.meta.savedPosition = document.body.scrollTop
  //     }
  //     return { x: 0, y: to.meta.savedPosition || 0 }
  //   }
  // },
  routes: constantRouterMap
});




