<template>
    <div class="editOtherInsideTransaction">
        <el-dialog :title="pageType === 'insert' ? '新增内部交易抵消费用信息' : '编辑内部交易抵消费用信息'" 
        v-dialogDrag
        :visible.sync="windowShow" 
        width="800px" 
        :close-on-click-modal="false" 
        :close-on-press-escape="false">
            <el-form size="mini" :model="form" ref="ruleForm" :rules="rules" label-width="160px" >
                 <el-row>
                   <el-row>
                        <el-col :span="24">
                           <el-form-item label="公司：" prop="code" style="position:relative;" >            
                            <el-select
                                v-model="form.code"
                                placeholder="公司"
                                clearable
                                filterable      
                                style="width:100%"    
                                disabled                    
                                >
                                <el-option
                                    v-for="item in comlist"
                                    :key="item.nodeUUid"
                                    :label="item.nodeName"
                                    :value="item.nodeUUid"
                                ></el-option>
                                </el-select>
                           
                        </el-form-item>
                    </el-col>
                      
                  
                </el-row>        
                   
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="所属时间：" prop="budtime" >               
                            <el-date-picker v-model="form.budtime" 
                            type="month" 
                            placeholder="所属时间"     
                            style="width:100%"
                           disabled
                           
                            ></el-date-picker>    
                        </el-form-item>
                         
                    </el-col>
                  
                    <el-col :span="12">
                      <el-form-item label="BU：" prop="preparationUnit" >
                        <el-select
                        v-model="form.preparationUnit"
                        placeholder="BU"
                        clearable
                        filterable      
                        style="width:100%"    
                        disabled
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
                            <el-form-item label="主营业务收入：" prop="mainBusinessInc" >
                            <!-- <el-input size="mini" v-model="form.volume" placeholder="请输入金额"></el-input> -->
                            <el-input-number
                                placeholder="金额"
                                v-model="form.mainBusinessInc"
                                controls-position="right"                                                        
                                :step="0.01"
                                clearable
                                style="width: 100%"
                                ></el-input-number> 
                            </el-form-item>
                            
                        </el-col>
                           <el-col :span="12">
                            <el-form-item label="累计主营业务收入：" prop="accumulMainBusinessInc" >
                            <!-- <el-input size="mini" v-model="form.volume" placeholder="请输入金额"></el-input> -->
                            <el-input-number
                                placeholder="金额"
                                v-model="form.accumulMainBusinessInc"
                                controls-position="right"                                                        
                                :step="0.01"
                                clearable
                                style="width: 100%"
                                ></el-input-number> 
                            </el-form-item>
                            
                        </el-col>
                          </el-row>
                 <el-row>
                        <el-col :span="12">
                            <el-form-item label="其他业务收入：" prop="otherBusinessInc" >
                            <!-- <el-input size="mini" v-model="form.volume" placeholder="请输入金额"></el-input> -->
                            <el-input-number
                                placeholder="其他业务收入"
                                v-model="form.otherBusinessInc"
                                controls-position="right"                                                        
                                :step="0.01"
                                clearable
                                style="width: 100%"
                                ></el-input-number> 
                            </el-form-item>
                            
                        </el-col>
                         <el-col :span="12">
                            <el-form-item label="累计其他业务收入：" prop="otherBaccumulOtherBusinessIncusinessInc" >
                            <!-- <el-input size="mini" v-model="form.volume" placeholder="请输入金额"></el-input> -->
                            <el-input-number
                                placeholder="累计其他业务收入"
                                v-model="form.accumulOtherBusinessInc"
                                controls-position="right"                                                        
                                :step="0.01"
                                clearable
                                style="width: 100%"
                                ></el-input-number> 
                            </el-form-item>
                            
                        </el-col>
                </el-row>
                 <el-row>
                    
                    <el-col :span="12">
                            <el-form-item label="主营业务成本：" prop="mainBusinessCost" >
                            <!-- <el-input size="mini" v-model="form.volume" placeholder="请输入金额"></el-input> -->
                            <el-input-number
                                placeholder="主营业务成本"
                                v-model="form.mainBusinessCost"
                                controls-position="right"                                                        
                                :step="0.01"
                                clearable
                                style="width: 100%"
                                ></el-input-number> 
                            </el-form-item>
                            
                        </el-col>
                         <el-col :span="12">
                            <el-form-item label="累计主营业务成本：" prop="accumulMainBusinessCost" >
                            <!-- <el-input size="mini" v-model="form.volume" placeholder="请输入金额"></el-input> -->
                            <el-input-number
                                placeholder="累计主营业务成本"
                                v-model="form.accumulMainBusinessCost"
                                controls-position="right"                                                        
                                :step="0.01"
                                clearable
                                style="width: 100%"
                                ></el-input-number> 
                            </el-form-item>
                            
                        </el-col>
                          </el-row>
                 <el-row>
                        <el-col :span="12">
                            <el-form-item label="其他业务成本：" prop="otherBusinessCost" >
                            <!-- <el-input size="mini" v-model="form.volume" placeholder="请输入金额"></el-input> -->
                            <el-input-number
                                placeholder="其他业务成本"
                                v-model="form.otherBusinessCost"
                                controls-position="right"                                                        
                                :step="0.01"
                                clearable
                                style="width: 100%"
                                ></el-input-number> 
                            </el-form-item>
                            
                        </el-col>
                         <el-col :span="12">
                            <el-form-item label="累计其他业务成本：" prop="accumulOtherBusinessCost" >
                            <!-- <el-input size="mini" v-model="form.volume" placeholder="请输入金额"></el-input> -->
                            <el-input-number
                                placeholder="累计其他业务成本"
                                v-model="form.accumulOtherBusinessCost"
                                controls-position="right"                                                        
                                :step="0.01"
                                clearable
                                style="width: 100%"
                                ></el-input-number> 
                            </el-form-item>
                            
                        </el-col>
                </el-row>
                 <el-row>
                    
                    <el-col :span="12">
                            <el-form-item label="销售费用：" prop="salesExpense" >
                            <!-- <el-input size="mini" v-model="form.volume" placeholder="请输入金额"></el-input> -->
                            <el-input-number
                                placeholder="销售费用"
                                v-model="form.salesExpense"
                                controls-position="right"                                                        
                                :step="0.01"
                                clearable
                                style="width: 100%"
                                ></el-input-number> 
                            </el-form-item>
                            
                        </el-col>
                         <el-col :span="12">
                            <el-form-item label="累计销售费用：" prop="accumulSalesExpense" >
                            <!-- <el-input size="mini" v-model="form.volume" placeholder="请输入金额"></el-input> -->
                            <el-input-number
                                placeholder="累计销售费用"
                                v-model="form.accumulSalesExpense"
                                controls-position="right"                                                        
                                :step="0.01"
                                clearable
                                style="width: 100%"
                                ></el-input-number> 
                            </el-form-item>
                            
                        </el-col>
                        </el-row>
                         <el-row>
                        <el-col :span="12">
                            <el-form-item label="管理费用：" prop="managementCosts" >
                            <!-- <el-input size="mini" v-model="form.volume" placeholder="请输入金额"></el-input> -->
                            <el-input-number
                                placeholder="管理费用"
                                v-model="form.managementCosts"
                                controls-position="right"                                                        
                                :step="0.01"
                                clearable
                                style="width: 100%"
                                ></el-input-number> 
                            </el-form-item>
                            
                        </el-col>
                          <el-col :span="12">
                            <el-form-item label="累计管理费用：" prop="accumulManagementCosts" >
                            <!-- <el-input size="mini" v-model="form.volume" placeholder="请输入金额"></el-input> -->
                            <el-input-number
                                placeholder="累计管理费用"
                                v-model="form.accumulManagementCosts"
                                controls-position="right"                                                        
                                :step="0.01"
                                clearable
                                style="width: 100%"
                                ></el-input-number> 
                            </el-form-item>
                            
                        </el-col>
                </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="研发费用：" prop="rdExpense" >
                            <!-- <el-input size="mini" v-model="form.volume" placeholder="请输入金额"></el-input> -->
                            <el-input-number
                                placeholder="研发费用"
                                v-model="form.rdExpense"
                                controls-position="right"                                                        
                                :step="0.01"
                                clearable
                                style="width: 100%"
                                ></el-input-number> 
                            </el-form-item>
                            
                        </el-col>
                          <el-col :span="12">
                            <el-form-item label="累计研发费用：" prop="accumulRDExpense" >
                            <!-- <el-input size="mini" v-model="form.volume" placeholder="请输入金额"></el-input> -->
                            <el-input-number
                                placeholder="累计研发费用"
                                v-model="form.accumulRDExpense"
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
.editOtherInsideTransaction{
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
import {GetInTransactById,CreateOrUpdateInTransact} from 'api/DataMaintenance/OtherInsideTransaction'
import {warnMsg,successMsg} from 'utils/messageBox'
import { GetBuComboBox } from "api/publicBase/Combox";

export default {
    components:{ },
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
           

            if(!newValue)  //窗口关闭
            {
                 if(this.$refs["ruleForm"])
                  this.$refs["ruleForm"].resetFields();   //清空验证
                 this.form.id="";
                 this.form.code="";
                 this.form.mainBusinessInc=0;
                 this.form.otherBusinessInc=0;
                 this.form.mainBusinessCost=0;
                 this.form.otherBusinessCost=0;
                 this.form.salesExpense=0;
                 this.form.managementCosts=0;

                 this.form.accumulMainBusinessInc=0;
                 this.form.accumulOtherBusinessInc=0;
                 this.form.accumulMainBusinessCost=0;
                 this.form.accumulOtherBusinessCost=0;
                 this.form.accumulSalesExpense= 0;
                 this.form.accumulManagementCosts=0;

                  this.form.rdExpense=0;
                 this.form.accumulRDExpense=0;

                // this.form = {
                   
                //     budtime:new Date(),
                                                     
                // }
                 this.$set(this.form, 'budtime', new Date())
                this.$emit("on-show-change",newValue);
            }
        }
    },
    data() {
        return {
            pageType: '',    //insert update
            windowShow: this.pshow,
            comlist:[],//公司
            form: {                    
                budtime:new Date(),
               
            },
            rules: {
                       
                code: {required: true, message: '请选择公司', trigger: 'change'},                                   
                 preparationUnit: [
                    { required: true, message: '请选择bu', trigger: 'change' },
                ],           
               
                budtime: [
                  { required: true, message: '请选择所属时间'},
                  {validator: this.validatetime},
                  ],
            },
            typeList:[],
          
          
            
            
        }
    },
    methods: {
            //添加查询combox
      setComBox() {
        GetBuComboBox().then((res) => {
            this.typeList = res.result;
       
        // var ii=  this.typeList.findIndex((item1) => item1.value === "青岛全球");
        // if(ii>-1){
        //     this.typeList.splice(ii,1 );

        // }
        //    if(this.typeList.length>0){
        //      this.form.BU=this.typeList[0].value;
        //    }
        });
        
        },   

         //获取组织树
        getOrganizationTree() {
            //{IsShowdep:true}
            getOrganizatonTreeNoUsers().then(res => {
            if(res.success)
                this.comlist = res.result
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
        //获取单个数据
        GetInTransactById(id) {
            GetInTransactById({id: id}).then(res => {
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
                   
                    let data=this.form;   
                    data.month= this.form.budtime.getMonth()+1;
                    data.year=this.form.budtime.getFullYear();    
                    CreateOrUpdateInTransact(data).then(res => {
                        this.windowShow = false
                        this.$emit("on-save-success");
                    })
                }
            })
        },
        setbudtime(row){
          var newdd= row.year+"-";
          var month=row.month;          
          if(month<10)
          {
              newdd+="0";
          }
          newdd+=month+"-01";
          var dd=new Date(newdd);
        
         this.$set(this.form, 'budtime', dd)
        },
         changeTime() {
            this.$forceUpdate();
        },
    }
}
</script>