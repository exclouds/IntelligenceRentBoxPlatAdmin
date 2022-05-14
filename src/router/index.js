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
          //roles: ['root.bd.ggxx.gj']
        },
      },
      //  {
      //   path: 'AccountsubjectIndex',
      //   component: () => import('@/views/publicBase/Accountingsubjects/AccountsubjectIndex').then(m => m.default),
      //   name: 'AccountsubjectIndex',
      //   meta: {
      //     title: '会计科目',
      //     icon: '个人中心',
      //     keepAlive: true,
      //     roles: ['Customs.AccountSubject']

      //   },
      //   btn: subaccount
      // },
      // {
      //   path: 'ImportDataSituationIndex',
      //   component: () => import('@/views/publicBase/ImportData/ImportDataSituationIndex').then(m => m.default),
      //   name: 'ImportDataSituationIndex',
      //   meta: {
      //     title: '公司预算导入查询',
      //     icon: '个人中心',
      //     keepAlive: true,
      //     roles: ['Customs.ImportDataSituation']

      //   },      
      // },
      // {
      //   path: 'LockAccountIndex',
      //   component: () => import('@/views/publicBase/LockAccount/LockAccountIndex').then(m => m.default),
      //   name: 'LockAccountIndex',
      //   meta: {
      //     title: '锁账设置',
      //     icon: '个人中心',
      //     keepAlive: true,
      //     roles: ['Customs.LockAccount']

      //   },
      //   btn: LockAccount
      // },

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
          //roles: ['Customs.RegisterReview']
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
          //roles: ['Customs.RegisterReview']
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
          //roles: ['Customs.RegisterReview']
        },
        //btn: RegisterReview
      },
      // {
      //   path: 'budgetImportIndex',
      //   component: () => import('@/views/DataImport/Budget/BudgetImportIndex').then(m => m.default),
      //   name: 'budgetImportIndex',
      //   meta: {
      //     title: '预算导入',
      //     icon: '个人客户',
      //     keepAlive: true,
      //     roles: ['Customs.BudgetImport']
      //   },
      //   btn: budimport
      // },
      // {
      //   path: 'SubjectAssistanceImportIndex',
      //   component: () => import('@/views/DataImport/SubjectAssistance/SubjectAssistanceImportIndex').then(m => m.default),
      //   name: 'SubjectAssistanceImportIndex',
      //   meta: {
      //     title: '科目辅助余额数据导入',
      //     icon: '个人客户',
      //     keepAlive: true,
      //     roles: ['Customs.AccountBalanceImport']
      //   },
      //   btn: AccountBalanceImport
      // },

      // {
      //   path: 'AnalysisReportImportIndex',
      //   component: () => import('@/views/DataImport/AnalysisReport/AnalysisReportImportIndex').then(m => m.default),
      //   name: 'AnalysisReportImportIndex',
      //   meta: {
      //     title: '合资公司经营分析报表导入',
      //     icon: '个人客户',
      //     keepAlive: true,
      //     roles: ['Customs.AnalysisReportImport']
      //   },
      //   btn: AnalysisReportImport
      // },
      // {
      //   path: 'OriginalBudgetImportIndex',
      //   component: () => import('@/views/DataImport/OriginalBudget/OriginalBudgetImportIndex').then(m => m.default),
      //   name: 'OriginalBudgetImportIndex',
      //   meta: {
      //     title: '2020年报表导入',
      //     icon: '个人客户',
      //     keepAlive: true,
      //     roles: ['Customs.OriginalBudgetImport']
      //   },
      //   btn: OriginalBudgetImport
      // },

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
          //roles: ['Customs.BusinessData']
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
          //roles: ['Customs.SpecialFee']
        },
        //btn: specialfee
      },
      // {
      //   path: 'ReportSpecialFeeIndex',
      //   component: () => import('@/views/DataMaintenance/ReportSpecialFee/ReportSpecialFeeIndex').then(m => m.default),
      //   name: 'ReportSpecialFeeIndex',
      //   meta: {
      //     title: '集团报表特殊费用维护',
      //     icon: '个人客户',
      //     keepAlive: true,
      //     roles: ['Customs.ReportSpecialFee']
      //   },
      //   btn: ReportSpecialFee
      // },
      // {
      //   path: 'InsideTransactionIndex',
      //   component: () => import('@/views/DataMaintenance/InsideTransaction/InsideTransactionIndex').then(m => m.default),
      //   name: 'InsideTransactionIndex',
      //   meta: {
      //     title: '内部交易抵消费用维护',
      //     icon: '个人客户',
      //     keepAlive: true,
      //     roles: ['Customs.InsideTransaction']
      //   },
      //   btn: InsideTransaction
      // },
      // {
      //   path: 'OtherInsideTransactionIndex',
      //   component: () => import('@/views/DataMaintenance/OtherInsideTransaction/OtherInsideTransactionIndex').then(m => m.default),
      //   name: 'OtherInsideTransactionIndex',
      //   meta: {
      //     title: '集团2内部交易抵消费用维护',
      //     icon: '个人客户',
      //     keepAlive: true,
      //     roles: ['Customs.OtherInsideTransact']
      //   },
      //   btn: OtherInsideTransaction
      // },
      // {
      //   path: 'NonOperatIncomeIndex',
      //   component: () => import('@/views/DataMaintenance/NonOperatIncome/NonOperatIncomeIndex').then(m => m.default),
      //   name: 'NonOperatIncomeIndex',
      //   meta: {
      //     title: '非经营性收支费用维护',
      //     icon: '个人客户',
      //     keepAlive: true,
      //     roles: ['Customs.NonOperatIncome']
      //   },
      //   btn: NonOperatIncome
      // },
      // {
      //   path: 'AccountSpecialFeeIndex',
      //   component: () => import('@/views/DataMaintenance/AccountSpecialFee/AccountSpecialFeeIndex').then(m => m.default),
      //   name: 'AccountSpecialFeeIndex',
      //   meta: {
      //     title: '调整事项单据维护',
      //     icon: '个人客户',
      //     keepAlive: true,
      //     roles: ['Customs.AccountSpecialFee']
      //   },
      //   btn: AccountSpecialFee
      // },
      // {
      //   path: 'RegionalCostIndex',
      //   component: () => import('@/views/DataMaintenance/RegionalCost/RegionalCostIndex').then(m => m.default),
      //   name: 'RegionalCostIndex',
      //   meta: {
      //     title: '大区费用分摊',
      //     icon: '个人客户',
      //     keepAlive: true,
      //     roles: ['Customs.RegionalCost']
      //   },
      //   btn: RegionalCost
      // },

    ]
  },

  //报表查询导出
  // {
  //   path: '/ReportFunction',
  //   component: Layout,
  //   redirect: '/tools/index',
  //   alwaysShow: true,
  //   meta: {
  //     title: '报表查询导出',
  //     icon: '个人客户',
  //   },
  //   children: [
  //     {
  //       path: 'BudgetReportIndex',
  //       component: () => import('@/views/ReportFunction/BudgetReport/BudgetReportIndex').then(m => m.default),
  //       name: 'BudgetReportIndex',
  //       meta: {
  //         title: '报表查询',
  //         icon: '个人客户',
  //         keepAlive: true,
  //         roles: ['Customs.ReportExport']
  //       },
  //       btn: reportquery
  //     },
  //     {
  //       path: 'BUReportIndex',
  //       component: () => import('@/views/ReportFunction/BUReport/BUReportIndex').then(m => m.default),
  //       name: 'BUReportIndex',
  //       meta: {
  //         title: ' BU报表查询',
  //         icon: '个人客户',
  //         keepAlive: true,
  //         roles: ['Customs.BUReportExport']
  //       },
  //       btn: BUReportExport
  //     },
  //     {
  //       path: 'SpecialFeeReportIndex',
  //       component: () => import('@/views/ReportFunction/SpecialFeeReport/SpecialFeeReportIndex').then(m => m.default),
  //       name: 'SpecialFeeReportIndex',
  //       meta: {
  //         title: ' 特殊费用报表查询',
  //         icon: '个人客户',
  //         keepAlive: true,
  //         roles: ['Customs.SpecialFeeReportExport']
  //       },

  //     },
  //     {
  //       path: 'RegionReportIndex',
  //       component: () => import('@/views/ReportFunction/RegionReport/RegionReportIndex').then(m => m.default),
  //       name: 'RegionReportIndex',
  //       meta: {
  //         title: ' 大区报表查询',
  //         icon: '个人客户',
  //         keepAlive: true,
  //         roles: ['Customs.RegionReportExport']
  //       },

  //     },
  //     {
  //       path: 'ZHYReportIndex',
  //       component: () => import('@/views/ReportFunction/ZHYReport/ZHYReportIndex').then(m => m.default),
  //       name: 'ZHYReportIndex',
  //       meta: {
  //         title: ' 中航运汇总报表查询',
  //         icon: '个人客户',
  //         keepAlive: true,
  //         roles: ['Customs.ZHYReportExport']
  //       },

  //     },
  //     {
  //       path: 'BUSummaryReportIndex',
  //       component: () => import('@/views/ReportFunction/BUSummaryReport/BUSummaryReportIndex').then(m => m.default),
  //       name: 'BUSummaryReportIndex',
  //       meta: {
  //         title: ' 集团1报表查询',
  //         icon: '个人客户',
  //         keepAlive: true,
  //         roles: ['Customs.BUSummaryExport']
  //       },

  //     },
  //     {
  //       path: 'FeeInsideReportIndex',
  //       component: () => import('@/views/ReportFunction/BUSummaryReport/FeeInsideReportIndex').then(m => m.default),
  //       name: 'FeeInsideReportIndex',
  //       meta: {
  //         title: '费用汇总表',
  //         icon: '个人客户',
  //         keepAlive: true,
  //         roles: ['Customs.FEEBUSummaryExport']
  //       },

  //     },
  //     {
  //       path: 'NonOperatReportIndex',
  //       component: () => import('@/views/ReportFunction/NonOperatReport/NonOperatReportIndex').then(m => m.default),
  //       name: 'NonOperatReportIndex',
  //       meta: {
  //         title: ' 集团2报表查询',
  //         icon: '个人客户',
  //         keepAlive: true,
  //         roles: ['Customs.NonOperatExport']
  //       },

  //     },
  //     {
  //       path: 'Report3Index',
  //       component: () => import('@/views/ReportFunction/Report/Report3Index').then(m => m.default),
  //       name: 'Report3Index',
  //       meta: {
  //         title: '集团3报表查询',
  //         icon: '个人客户',
  //         keepAlive: true,
  //         roles: ['Customs.Report3Export']
  //       },
  //       btn: reportquery
  //     },
  //     {
  //       path: 'NewBudgetReportIndex',
  //       component: () => import('@/views/ReportFunction/NewBudgetReport/NewBudgetReportIndex').then(m => m.default),
  //       name: 'NewBudgetReportIndex',
  //       meta: {
  //         title: '报表查询（比对）',
  //         icon: '个人客户',
  //         keepAlive: true,
  //         roles: ['Customs.ReportExport']
  //       },
  //       btn: reportquery
  //     },

  //     {
  //       path: 'BUAnalyzeIndex',
  //       component: () => import('@/views/ReportFunction/BUAnalyze/BUAnalyzeIndex').then(m => m.default),
  //       name: 'BUAnalyzeIndex',
  //       meta: {
  //         title: 'BU分析报表',
  //         icon: '个人客户',
  //         keepAlive: true,
  //         roles: ['Customs.BUAnalyzeExport']
  //       },
  //       btn: reportquery
  //     },
  //     {
  //       path: 'GroupAnalyzeIndex',
  //       component: () => import('@/views/ReportFunction/GroupAnalyze/GroupAnalyzeIndex').then(m => m.default),
  //       name: 'GroupAnalyzeIndex',
  //       meta: {
  //         title: '集团分析报表',
  //         icon: '个人客户',
  //         keepAlive: true,
  //         roles: ['Customs.GroupAnalyzeExport']
  //       },
  //       btn: reportquery
  //     },
  //     {
  //       path: 'RegionAnalyzeIndex',
  //       component: () => import('@/views/ReportFunction/RegionAnalyze/RegionAnalyzeIndex').then(m => m.default),
  //       name: 'RegionAnalyzeIndex',
  //       meta: {
  //         title: '大区分析报表',
  //         icon: '个人客户',
  //         keepAlive: true,
  //         roles: ['Customs.RegionAnalyzeExport']
  //       },

  //     },


  //   ]
  // },


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




