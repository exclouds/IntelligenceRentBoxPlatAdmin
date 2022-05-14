<template>
  <div class="app-container ctryIdentifler" >
    <el-row :gutter="100" style="margin-bottom:10px;">
      <el-col :span="18">
        <el-button type="primary" size="mini" @click="addTableRow()">新增海关舱单识别码</el-button>
      </el-col>
    </el-row>
    <el-row style="height:calc(100% - 15px)">  
      <el-form
        :rules="tableForm.rules"
        :model="tableForm"
        ref="form"
        
      >
        <el-table
          :data="tableForm.indentList"
          :cell-style="{padding: '5px'}"
          stripe
          style="width: 100%;height:100%"
          ref="table"
        >
          <el-table-column align="center" label="海关舱单识别码" min-width="50%">
            <template slot-scope="scope">
              <span v-if="scope.row.isSet">
                <el-form-item
                  :prop="'indentList.' + scope.$index + '.identifuerCode'"
                  :rules="tableForm.rules.identifuerCode"
                >
                  <el-input size="mini" maxlength="50" @input="scope.row.identifuerCode = scope.row.identifuerCode.toUpperCase()"  v-model.trim="scope.row.identifuerCode"></el-input>
                </el-form-item>
              </span>
              <span v-else>{{scope.row.identifuerCode}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="是否使用" min-width="20%">
            <template slot-scope="scope">
              <el-form-item v-if="scope.row.isSet">
                <el-switch
                  
                  v-model="scope.row.isUse"
                  active-color="#13ce66"
                  
                  inactive-color="#C0C4CC"
                ></el-switch>
              </el-form-item>
              <span v-else>{{scope.row.isUse}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" min-width="20%">
               <template slot-scope="scope">
              <el-popover placement="top" width="160" v-model="scope.row.popShow">
                <p>是否确认删除？</p>
                <div style="text-align: right margin: 0">
                    <el-button size="mini" type="text" @click="scope.row.popShow = false">取消</el-button>
                    <el-button type="danger" size="mini" @click="removeTableRow(scope.row)">删除</el-button>
                </div>
                <div class="tableBtn" slot="reference">删除</div>
            </el-popover>
               </template>
          </el-table-column>
        </el-table>
       
      </el-form>
    </el-row>
  </div>
</template>

<script>
import {getIndentList} from "api/publicBase/baseCountry"
export default {
     name:'countryIdentifier',
    components: {
        
    },
    data() {
        return {
            tableForm: {
                rules: {
                    identifuerCode:[
                      { required: true, message: '请输入海关舱单识别码', trigger: 'blur' },
                      {pattern:/[^0-9\u4e00-\u9fa5]+$/,message:'只能输入英文与特殊字符', trigger: 'blur' }
                    ],
                },
                indentList: [],
                updateOldRow:{},    //修改之前的列
            },
            count:0
            
        }
    },
    methods:{
         //新增行
        addTableRow(){
            this.count+=1
            let newData = {
                id:this.count,
                isDefault:false,
                identifuerCode:"",
                isUse: true,
                isSet:true,
                
            }
            this.tableForm.indentList.unshift(newData)
            this.$refs.table.bodyWrapper.scrollTop =0
        },
        //删除行
        removeTableRow(row){  
             this.tableForm.indentList=this.tableForm.indentList.filter(p=>p.id!=row.id)
        },
         //获取识别码列表
        getTableList(cid) {
            let data = {
                CountryCode: cid,
                IdentifuerCode:""
            }
            getIndentList(data).then(res => {
                if(res.success) {
                    this.tableForm.indentList = res.result
                    console.log(res.result)
                    this.tableForm.indentList.forEach(item => { 
                        this.$set(item, "isSet", true)
                        this.$set(item, "popShow", false)
                    })
                }  
            })
        },
    }
}
</script>
<style lang="scss">
  .ctryIdentifler{
    .el-table .el-form-item__content{
      line-height:normal !important;
    }
    .el-row{
      margin-right:0px !important;
    }
  }
</style>