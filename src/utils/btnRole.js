import store from 'store/index'

//按钮验证
export function checkBtnPeimission(peimission) {
    return store.getters.permission.some(item => item === peimission)
}


export class Permission {
    //组织机构页面
    static orgPage = {
        addOrg: { name: '新增公司', permission: 'Pages.Administration.OrganizationUnits.Create' },
        updateOrg: { name: '编辑公司', permission: 'Pages.Administration.OrganizationUnits.Create' },
        deleteOrg: { name: '删除公司', permission: 'Pages.Administration.OrganizationUnits.Delete' },
        addUser: { name: '新增用户', permission: 'Pages.Administration.OrganizationUnits.AddUsers' }
    }
    //关区页面
    static DistrictPage = {
        addDistrict: { name: '添加', permission: 'Pages.Administration.BaseCustomDistrict.Create' },
        deleteDistrict: { name: '删除', permission: 'Pages.Administration.BaseCustomDistrict.Delete' },
        batchDeleteDistrict: { name: '批量删除', permission: 'Pages.Administration.BaseCustomDistrict.BatchDelete' },
        updateDistrict: { name: '修改', permission: 'Pages.Administration.BaseCustomDistrict.Update' }
    }

}

//组织机构页面
export const orgPage = {
    addOrg: { name: '新增公司', permission: 'Pages.Administration.OrganizationUnits.Create' },
    updateOrg: { name: '编辑公司', permission: 'Pages.Administration.OrganizationUnits.Create' },
    deleteOrg: { name: '删除公司', permission: 'Pages.Administration.OrganizationUnits.Delete' },
    addUser: { name: '新增用户', permission: 'Pages.Administration.OrganizationUnits.AddUsers' }

}
//会计科目
export const subaccount = {
    add: { name: '新增', permission: 'Customs.AccountSubject.Create' },
    update: { name: '编辑', permission: 'Customs.AccountSubject.Edit' },
    delete: { name: '删除', permission: 'Customs.AccountSubject.Delete' },

}
//锁账
export const LockAccount = {
    add: { name: '新增', permission: 'Customs.LockAccount.Create' },
    update: { name: '编辑', permission: 'Customs.LockAccount.Edit' },
    delete: { name: '删除', permission: 'Customs.LockAccount.Delete' },
    Lockdata: { name: '锁账', permission: 'Customs.LockAccount.Lock' },
}

//预算导入
export const budimport = {
    Createbud: { name: '导入', permission: 'Customs.BudgetImport.Create' },
    Editbud: { name: '编辑', permission: 'Customs.BudgetImport.Edit' },
    Deletebud: { name: '删除', permission: 'Customs.BudgetImport.Delete' },
    Submitbud: { name: '提交', permission: 'Customs.BudgetImport.Submit' },
    CancelSubmitbud: { name: '取消提交', permission: 'Customs.BudgetImport.CancelSubmit' },
    AgreeCancelSubmitbud: { name: '同意取消提交', permission: 'Customs.BudgetImport.AgreeCancelSubmit' },

}

//科目辅助约数数据导入
export const AccountBalanceImport = {
    import: { name: '导入', permission: 'Customs.AccountBalanceImport.import' },
    Createbud: { name: '新增', permission: 'Customs.AccountBalanceImport.Create' },
    Editbud: { name: '编辑', permission: 'Customs.AccountBalanceImport.Edit' },
    Deletebud: { name: '删除', permission: 'Customs.AccountBalanceImport.Delete' },
    Submitbud: { name: '提交', permission: 'Customs.AccountBalanceImport.Submit' },
    CancelSubmitbud: { name: '取消提交', permission: 'Customs.AccountBalanceImport.CancelSubmit' },
    AgreeCancelSubmitbud: { name: '同意取消提交', permission: 'Customs.AccountBalanceImport.AgreeCancelSubmit' },

}

//合资公司经营报表导入
export const AnalysisReportImport = {
    Createbud: { name: '导入', permission: 'Customs.AnalysisReportImport.Create' },
    Editbud: { name: '编辑', permission: 'Customs.AnalysisReportImport.Edit' },
    Deletebud: { name: '删除', permission: 'Customs.AnalysisReportImport.Delete' },
    Submitbud: { name: '提交', permission: 'Customs.AnalysisReportImport.Submit' },
    CancelSubmitbud: { name: '取消提交', permission: 'Customs.AnalysisReportImport.CancelSubmit' },
    AgreeCancelSubmitbud: { name: '同意取消提交', permission: 'Customs.AnalysisReportImport.AgreeCancelSubmit' },

}
//2020年及之前预算导入
export const OriginalBudgetImport = {
    Createbud: { name: '导入', permission: 'Customs.OriginalBudgetImport.Create' },
    Editbud: { name: '编辑', permission: 'Customs.OriginalBudgetImport.Edit' },
    Deletebud: { name: '删除', permission: 'Customs.OriginalBudgetImport.Delete' },
    Submitbud: { name: '提交', permission: 'Customs.OriginalBudgetImport.Submit' },
    CancelSubmitbud: { name: '取消提交', permission: 'Customs.OriginalBudgetImport.CancelSubmit' },
    AgreeCancelSubmitbud: { name: '同意取消提交', permission: 'Customs.OriginalBudgetImport.AgreeCancelSubmit' },

}

//业务数据维护
export const busdata = {
    add: { name: '新增', permission: 'Customs.BusinessData.Create' },
    update: { name: '编辑', permission: 'Customs.BusinessData.Edit' },
    delete: { name: '删除', permission: 'Customs.BusinessData.Delete' },
    Submitbud: { name: '提交', permission: 'Customs.BusinessData.Submit' },
    CancelSubmitbud: { name: '取消提交', permission: 'Customs.BusinessData.CancelSubmit' },
    AgreeCancelSubmitbud: { name: '同意取消提交', permission: 'Customs.BusinessData.AgreeCancelSubmit' },

}

//特殊费用维护
export const specialfee = {
    add: { name: '新增', permission: 'Customs.SpecialFee.Create' },
    update: { name: '编辑', permission: 'Customs.SpecialFee.Edit' },
    delete: { name: '删除', permission: 'Customs.SpecialFee.Delete' },
    Submitbud: { name: '提交', permission: 'Customs.SpecialFee.Submit' },
    CancelSubmitbud: { name: '取消提交', permission: 'Customs.SpecialFee.CancelSubmit' },
    AgreeCancelSubmitbud: { name: '同意取消提交', permission: 'Customs.SpecialFee.AgreeCancelSubmit' },

}
//特殊费用维护
export const ReportSpecialFee = {
    add: { name: '新增', permission: 'Customs.ReportSpecialFee.Create' },
    update: { name: '编辑', permission: 'Customs.ReportSpecialFee.Edit' },
    delete: { name: '删除', permission: 'Customs.ReportSpecialFee.Delete' },
    Submitbud: { name: '提交', permission: 'Customs.ReportSpecialFee.Submit' },
    CancelSubmitbud: { name: '取消提交', permission: 'Customs.ReportSpecialFee.CancelSubmit' },
    AgreeCancelSubmitbud: { name: '同意取消提交', permission: 'Customs.ReportSpecialFee.AgreeCancelSubmit' },

}
//特殊费用维护
export const RegionalCost = {
    add: { name: '新增', permission: 'Customs.RegionalCost.Create' },
    update: { name: '编辑', permission: 'Customs.RegionalCost.Edit' },
    delete: { name: '删除', permission: 'Customs.RegionalCost.Delete' },
    Submitbud: { name: '提交', permission: 'Customs.RegionalCost.Submit' },
    CancelSubmitbud: { name: '取消提交', permission: 'Customs.RegionalCost.CancelSubmit' },
    AgreeCancelSubmitbud: { name: '同意取消提交', permission: 'Customs.RegionalCost.AgreeCancelSubmit' },

}
//调整事项维护
export const AccountSpecialFee = {
    add: { name: '新增', permission: 'Customs.AccountSpecialFee.Create' },
    update: { name: '编辑', permission: 'Customs.AccountSpecialFee.Edit' },
    delete: { name: '删除', permission: 'Customs.AccountSpecialFee.Delete' },
    Submitbud: { name: '提交', permission: 'Customs.AccountSpecialFee.Submit' },
    CancelSubmitbud: { name: '取消提交', permission: 'Customs.AccountSpecialFee.CancelSubmit' },
    AgreeCancelSubmitbud: { name: '同意取消提交', permission: 'Customs.AccountSpecialFee.AgreeCancelSubmit' },

}
//集团1
export const InsideTransaction = {
    add: { name: '新增', permission: 'Customs.InsideTransaction.Create' },
    update: { name: '编辑', permission: 'Customs.InsideTransaction.Edit' },
    delete: { name: '删除', permission: 'Customs.InsideTransaction.Delete' },
    Submitbud: { name: '提交', permission: 'Customs.InsideTransaction.Submit' },
    CancelSubmitbud: { name: '取消提交', permission: 'Customs.InsideTransaction.CancelSubmit' },
    AgreeCancelSubmitbud: { name: '同意取消提交', permission: 'Customs.InsideTransaction.AgreeCancelSubmit' },
    // InitInsideMonthDatabtn: { name: '初始化数据', permission: 'Customs.InsideTransaction.InitMonthData' },

}
//集团2内部交易
export const OtherInsideTransaction = {
    add: { name: '新增', permission: 'Customs.OtherInsideTransact.Create' },
    update: { name: '编辑', permission: 'Customs.OtherInsideTransact.Edit' },
    delete: { name: '删除', permission: 'Customs.OtherInsideTransact.Delete' },
    Submitbud: { name: '提交', permission: 'Customs.OtherInsideTransact.Submit' },
    CancelSubmitbud: { name: '取消提交', permission: 'Customs.OtherInsideTransact.CancelSubmit' },
    AgreeCancelSubmitbud: { name: '同意取消提交', permission: 'Customs.OtherInsideTransact.AgreeCancelSubmit' },

}
//集团2
export const NonOperatIncome = {
    add: { name: '新增', permission: 'Customs.NonOperatIncome.Create' },
    update: { name: '编辑', permission: 'Customs.NonOperatIncome.Edit' },
    delete: { name: '删除', permission: 'Customs.NonOperatIncome.Delete' },
    Submitbud: { name: '提交', permission: 'Customs.NonOperatIncome.Submit' },
    CancelSubmitbud: { name: '取消提交', permission: 'Customs.NonOperatIncome.CancelSubmit' },
    AgreeCancelSubmitbud: { name: '同意取消提交', permission: 'Customs.NonOperatIncome.AgreeCancelSubmit' },

}

//报表查询
export const reportquery = {
    export: { name: '导出', permission: 'Customs.ReportExport.Export' },

}
//BU报表查询
export const BUReportExport = {
    export: { name: '导出', permission: 'Customs.BUReportExport.Export' },

}

export const RegisterReview = {
    review: { name: '审核', permission: 'Customs.RegisterReview.Review' }
}