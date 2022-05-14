<template>
    <div class="editReportSpecialFee">
        <el-dialog :title="pageType === 'insert' ? '新增报表大区费用分摊单据' : '编辑报表大区费用分摊单据'" 
        v-dialogDrag
        :visible.sync="windowShow" 
        width="800px" 
        :close-on-click-modal="false" 
        :close-on-press-escape="false">
            <el-form size="mini" :model="form" ref="ruleForm" :rules="rules" label-width="100px" >
                 <el-row>
                   <el-row>
                        <el-col :span="24">
                           <el-form-item label="公司：" prop="code" style="position:relative;" >            
                            <el-select v-model="form.code"  
                            placeholder="请选择公司" 
                            style="width:100%"                             
                            filterable     >
                            <el-option v-for="item in treeComp.data" 
                            :key="item.nodeId"
                            :label="item.nodeName" 
                            :value="item.nodeUUid"></el-option>
                        </el-select>                           
                        </el-form-item>
                        </el-col>
                       <el-col :span="24">
                      <el-form-item label="对方公司：" prop="toCode" >
                         <el-select v-model="form.toCode"  
                            placeholder="请选择公司" 
                            style="width:100%"                             
                            filterable     >
                            <el-option v-for="item in treeComp.tocomlist" 
                            :key="item.nodeId"
                            :label="item.nodeName" 
                            :value="item.nodeUUid"></el-option>
                        </el-select>
                        </el-form-item>
                    </el-col>
                  
                </el-row>        
                   
                <el-row>
                 
                                  
                        <el-col :span="12">
                            <el-form-item label="预算：" prop="budgetAmount" >                    
                           <el-input-number
                                placeholder="预算"
                                v-model="form.budgetAmount"
                                controls-position="right"                                                          
                                :step="0.01"
                                clearable
                                style="width: 100%"
                                ></el-input-number> 
                            </el-form-item>
                        </el-col>
                           <el-col :span="12">
                            <el-form-item label="实际完成：" prop="completedAmount" >                    
                           <el-input-number
                                placeholder="实际完成"
                                v-model="form.completedAmount"
                                controls-position="right"                                                          
                                :step="0.01"
                                clearable
                                style="width: 100%"
                                ></el-input-number> 
                            </el-form-item>
                        </el-col>
                           <el-col :span="12">
                        <el-form-item label="所属时间：" prop="budtime" style="position:relative;">               
                            <el-date-picker v-model="form.budtime" 
                            type="month" 
                            placeholder="所属时间"     
                            style="width:100%"
                            ></el-date-picker>    
                        </el-form-item>
                    </el-col>
                </el-row>
                  <el-row>
                    <el-col :span="24">
                            <el-form-item label="备注：" prop="remarks">                               
                                <el-input size="mini" v-model="form.remarks" type="textarea"  placeholder="备注"></el-input>
                            </el-form-item>
                    </el-col>
                </el-row>
                  
                </el-row>            
                                    
                  
              
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="windowShow = false" size="small">取 消</el-button>
                <el-button type="primary" @click="save()" size="small" :loading="btnloading">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<style lang="scss">
.editReportSpecialFee{
  .orgForm{
    .el-form-item__content{
      height:28px;
    }
  }
    .chsEqp{
            width:100%;
            .textPromt{float:left;}
            .chsEqp-select{height:26px;line-height: 24px;}
            i{float: right;margin-top: 6px;}
        }
    .editOrgComp-row-tree{
            position:absolute;
            top:40px;
            left:70px;
            background-color: #fff;
            z-index: 10;
            padding:0;
            margin:0;
            width:300px;
            height:450px;
            clear: both;               
        }

}
    
</style>
<script>
import { getDicListByDitType } from "api/publicBase/dictionaryMng";

import {getOrganizatonTreeNoUsers} from 'api/user/organization'
import {GetRegionalCostById,CreateOrUpdateRegionalCost} from 'api/DataMaintenance/RegionalCost'
import {warnMsg,successMsg} from 'utils/messageBox'


export default {
    components:{},
    props:{
        pshow: {
            type: Boolean,
            default: false
        },
    },
    watch: {
        pshow(newValue, oldValue){
            this.windowShow = newValue;
            
        },
        windowShow(newValue, oldValue){
            if(this.$refs["ruleForm"])
                this.$refs["ruleForm"].resetFields();   //清空验证

            if(!newValue)  //窗口关闭
            {
                this.btnloading=false;
                this.form = {
                    id: '',
                    code: "",  
                    toCode: "",              
                    reportType: "",
                    budgetAmount: 0,
                    completedAmount: 0,
                    budtime:new Date(),                    
                    remarks:""                                        
                }
                this.$emit("on-show-change",newValue);
            }
        }
    },
    data() {
        return {
            pageType: '',    //insert update
            windowShow: this.pshow,
            btnloading:false,         
            form: {
                id: '',
                code: "",           
                toCode: "",  
                budgetAmount: 0,
                completedAmount: 0,             
                budtime:new Date(),
                remarks:""  
            },
            rules: {
                 code: [
                  { required: true, message: '请选择公司', trigger: 'change'},               
                  ],                                 
                //  amount: [
                //     { required: true, message: '请输入金额', trigger: 'blur' },
                // ],
                toCode: [
                  { required: true, message: '请选择对方公司', trigger: 'change'},               
                  ],          
                 
                budtime: [
                  { required: true, message: '请选择所属时间'},
                  {validator: this.validatetime},
                  ],
                remarks: [
                    { required: true, message: '请输入备注', trigger: 'blur' },
                ],
            },
            typeList:[],
          
             treeComp: {      
              data: [],  
              tocomlist: [],          
          },
                      
        }
    },
    methods: {
            //添加查询combox
      setComBox() {
        getDicListByDitType({ BaseKeyValueTypeCode: "REPORTTYPE", Code: "", Name: ""  }).then(res => {
            this.typeList = res.result.comboxs;
        });
          
        
        },   
       
         //获取组织树
        getOrganizationTree() {
            //{IsShowdep:true}
            getOrganizatonTreeNoUsers().then(res => {
            if(res.success)
                this.treeComp.data = res.result
            })

             getOrganizatonTreeNoUsers({IsByUser:false,IsRegionalCost:true}).then(res => {
            if(res.success)
                this.treeComp.tocomlist = res.result;
               
            })
        },
          
          //校验时间
        validatetime(rule, value, callback) {
          
          if(this.form.budtime==="" || this.form.budtime===null || this.form.budtime===undefined) {
            console.log('error')
            callback(new Error('请选择所属时间'));
          }
          else {
            console.log('no error')
            callback();
          }
            
        },
        //获取单个报表大区费用分摊
        GetRegionalCostById(id) {
            GetRegionalCostById({id: id}).then(res => {
                this.form = res.result;        
                var newdd= res.result.year+"-";
                var month=res.result.month;
                if(month<10)
                {
                    newdd+="0";
                }
                newdd+=month+"-01";
                var dd=new Date(newdd);               
                this.$set(this.form, 'budtime', dd)        
               
            })
        },
        //提交
        save() {
            this.$refs["ruleForm"].validate((valid) => {
                if (valid) {
                     this.btnloading=true;
                    let data={
                         id: this.form.id,
                        code: this.form.code,  
                        ToCode: this.form.toCode,                  
                        BudgetAmount: this.form.budgetAmount,
                        CompletedAmount: this.form.completedAmount,  
                        remarks:this.form.remarks  
                    };   
                    data.month= this.form.budtime.getMonth()+1;
                    data.year=this.form.budtime.getFullYear();    
                    CreateOrUpdateRegionalCost(data).then(res => {
                         this.btnloading=false;
                        this.windowShow = false;
                        this.$emit("on-save-success");

                    })
                    .catch(err=>{
                         this.btnloading=false;
                    })
                }
            })
        },
    }
}
</script>