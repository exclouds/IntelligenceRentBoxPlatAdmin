<template>
    <div class="editReportSpecialFee">
        <el-dialog :title="pageType === 'insert' ? '新增报表特殊费用单据' : '编辑报表特殊费用单据'" 
        v-dialogDrag
        :visible.sync="windowShow" 
        width="800px" 
        :close-on-click-modal="false" 
        :close-on-press-escape="false">
            <el-form size="mini" :model="form" ref="ruleForm" :rules="rules" label-width="100px" >
                 <el-row>
                   <el-row>
                        <el-col :span="12">
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
                       <el-col :span="12">
                      <el-form-item label="报表类别：" prop="reportType" >
                        <el-select
                        v-model="form.reportType"
                        placeholder="报表类别"
                        clearable
                        filterable      
                        style="width:100%"   
                        
                        >
                        <el-option
                            v-for="item in typeList"
                            :key="item.value"
                            :label="item.displayText"
                            :value="item.value"
                        ></el-option>
                        </el-select>
                        </el-form-item>
                    </el-col>
                  
                </el-row>        
                   
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="所属时间：" prop="budtime" style="position:relative;">               
                            <el-date-picker v-model="form.budtime" 
                            type="month" 
                            placeholder="所属时间"     
                            style="width:100%"
                            ></el-date-picker>    
                        </el-form-item>
                    </el-col>
                                  
                        <el-col :span="12">
                            <el-form-item label="金额：" prop="amount" >                    
                           <el-input-number
                                placeholder="金额"
                                v-model="form.amount"
                                controls-position="right"                                                          
                                :step="0.01"
                                clearable
                                style="width: 100%"
                                ></el-input-number> 
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
                <el-button type="primary" @click="save()" size="small">确 定</el-button>
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
import {GetReportSpecialFeeById,CreateOrUpdateReportSpecialFee} from 'api/DataMaintenance/ReportSpecialFee'
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
                this.form = {
                    id: '',
                    code: "",                
                    reportType: "",
                    amount: 0, 
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
            form: {
                id: '',
                code: "",           
                reportType: "",
                amount: 0,             
                budtime:new Date(),
                remarks:""  
            },
            rules: {
                 code: [
                  { required: true, message: '请选择公司', trigger: 'change'},               
                  ],                                 
                 amount: [
                    { required: true, message: '请输入金额', trigger: 'blur' },
                ],
                 reportType: [
                    { required: true, message: '请选择报表类别', trigger: 'change' },
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
            getOrganizatonTreeNoUsers({IsShowhz:false}).then(res => {
            if(res.success)
                this.treeComp.data = res.result
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
        //获取单个报表特殊费用
        GetReportSpecialFeeById(id) {
            GetReportSpecialFeeById({id: id}).then(res => {
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
                    
                    let data={
                         id: this.form.id,
                        code: this.form.code,                    
                        reportType: this.form.reportType,
                        amount: this.form.amount,  
                        remarks:this.form.remarks  
                    };   
                    data.month= this.form.budtime.getMonth()+1;
                    data.year=this.form.budtime.getFullYear();    
                    CreateOrUpdateReportSpecialFee(data).then(res => {
                        this.windowShow = false
                        this.$emit("on-save-success");
                    })
                }
            })
        },
    }
}
</script>