<template>
    <div class="editNonOperatIncome">
        <el-dialog :title="pageType === 'insert' ? '新增经营性收支费用信息' : '编辑经营性收支费用信息'" 
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
                           <el-select
                                v-model="form.code"
                                placeholder="公司"
                                clearable
                                filterable      
                                style="width:100%"    
                                                    
                                >
                                <el-option
                                    v-for="item in treeComp.data"
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
                        <el-form-item label="科目名称：" prop="linNO" >
                            <el-select v-model="form.linNO"  
                                placeholder="请选择科目" 
                                style="width:100%"  
                                clearable
                                filterable     >
                                   <el-option
                                    v-for="item in linoList"
                                    :key="item.id"
                                    :label="item.projectName"
                                    :value="item.linNO"
                                ></el-option>
                                </el-select>   
                            </el-form-item>
                        </el-col>
                   
                    <el-col :span="12">
                      <el-form-item label="项目名称：" prop="projectCode" >
                        <el-select
                        v-model="form.projectCode"
                        placeholder="项目名称"
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
                            <!-- <el-input size="mini" v-model="form.amount" placeholder="请输入金额"></el-input> -->
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
.editNonOperatIncome{
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
import treeSelect from 'components/treeSelect/treeSelect'
import tree from 'components/tree/tree'
import {getOrganizatonTreeNoUsers,GetDeptUnitList} from 'api/user/organization'
import {GetLinNoList,GetNonOperatById,CreateOrUpdateNonOperat} from 'api/DataMaintenance/NonOperatIncome'
import {warnMsg,successMsg} from 'utils/messageBox'
import {GetProjectList} from 'api/publicBase/Combox'

export default {
    components:{ treeSelect,
                tree},
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
                    depCode: "",
                    linNO: "",
                    projectCode: "",
                    amount: "", 
                    budtime:new Date(),
                    choosedTreeNode: [],  
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
            linoList:[],//行号项目
            form: {
                id: '',
                code: "",              
                linNO: "",
                projectCode: "",
                amount: "",                       
                budtime:new Date(),
                 remarks:"" 
            },
            rules: {
                code: {required: true, message: '请选择公司', trigger: 'change'},              
                linNO: {required: true, message: '请选择科目', trigger: 'change'},        
              
                 amount: [
                    { required: true, message: '请输入金额', trigger: 'blur' },
                ],
                 projectCode: [
                    { required: true, message: '请选择项目名称', trigger: 'change' },
                ],           
                
                budtime: [
                  { required: true, message: '请选择所属时间'},
                  {validator: this.validatetime},
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
        getDicListByDitType({ BaseKeyValueTypeCode: "NONOPERATINCOME", Code: "", Name: ""  }).then(res => {
            this.typeList = res.result.comboxs;
        });
        GetLinNoList().then(res => {
          this.linoList = res.result;
        });
                              
      },
         //获取组织树
        getOrganizationTree() {
            //{IsShowdep:true}
            getOrganizatonTreeNoUsers().then(res => {
            if(res.success)
                this.treeComp.data = res.result
            })
        },
       
        
        //单击树选择框控件
        ontreeShowChange(val) {
            this.treeComp.show=val;
        }, 
          //校验公司
        validatedepartment(rule, value, callback) {
          
          if(this.form.choosedTreeNode.length === 0) {
            console.log('error')
            callback(new Error('请选择公司'));
          }
          else {
            console.log('no error')
            callback();
          }
            
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
        GetNonOperatById(id) {
            GetNonOperatById({id: id}).then(res => {
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
                        linNO: this.form.linNO,
                        projectCode: this.form.projectCode,
                        amount: this.form.amount,   
                        remarks:this.form.remarks  
                    };   
                    data.month= this.form.budtime.getMonth()+1;
                    data.year=this.form.budtime.getFullYear();    
                    CreateOrUpdateNonOperat(data).then(res => {
                        this.windowShow = false
                        this.$emit("on-save-success");
                    })
                }
            })
        },
    }
}
</script>