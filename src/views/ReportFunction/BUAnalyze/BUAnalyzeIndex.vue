<template>
  <div class="app-container BUAnalyze"  v-loading="bthloading">
    <el-form size="mini" @submit.native.prevent label-width="90px">
    <el-row>
        <el-col :span="3">
          <el-form-item label="BU：" prop  label-width="50px">
           
             <el-select
              v-model="search.BU"
              placeholder="BU"
              clearable
              filterable
              style="width: 100%"
            
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
         <el-col :span="3">
                <el-form-item label="所属时间：" prop="budyear" style="position:relative;" >               
                    <el-date-picker v-model="budyear" 
                    type="month" 
                    placeholder="所属时间："    
                    style="width:100%"
                     ></el-date-picker>    
                </el-form-item>
            </el-col>
        <el-col :span="4">
          <el-form-item label="是否查询单月：" label-width="110px">
            <el-select
              v-model="search.IsDurMonth"
              placeholder="类型"
              clearable
              filterable
            >
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            
            </el-select>
          </el-form-item>
        </el-col>    
          
        <el-col :span="4">
          <el-form-item label prop label-width="10px">
           <el-button type="primary" size="mini" @click="getTableList()">搜索</el-button>         
            <el-button type="primary" size="mini"   @click="Importdata()" :loading="bthloading"           
              >导出</el-button >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form> 
      <el-table
      :cell-class-name="tableRowClassName"
        v-loading="table.loading"
        :data="TableDataList.value"
         :row-key = "getRowKeys"
        border
        stripe
        highlight-current-row
        fit
        height="calc(100% - 60px)"
        style="width: 100%"
        ref="table"
        @sort-change="sortChange"
        @selection-change="onSelectChange"
      >
       <el-table-column
              v-for="(item,index) in TableDataList.title"
              :key="index"
              :label="item.name"
            
              align="center"
              show-overflow-tooltip
             
            >
            <template slot-scope="scope" >
              <span>{{ scope.row.data[item.cloumorder] }}</span>
            </template>
          </el-table-column>
      
      </el-table>
     
    
  </div>
</template>
<style lang="scss">
.BUAnalyze {
  height: 100%;
   
}
</style>
<script>
import { tableMixin } from "mixin/commTable"
import { GetBuComboBox } from "api/publicBase/Combox";
import {BUAnalyzeInquire ,ExportFileBydata} from "api/ReportFunction/BUAnalyze";

import {warnMsg,successMsg} from 'utils/messageBox'


export default {
  name: "BUAnalyzeIndex",
  components: {},
  mixins: [tableMixin],
  data() {
    return {
      typeList: [], //bu类别
      TableDataList:[],//表格数据,显示导入数据
       search:{      
         BU:"",    
          IsDurMonth:0,       
       },
 
      bthloading:false,
      budyear:new Date(),
    
    }
  },
  methods: {
    
    getRowKeys(row) {
            return row.id;
    },
        
        //添加查询combox
    setComBox() {
      GetBuComboBox().then((res) => {
        this.typeList = res.result;
        if(res.result.length===1){
          this.search.BU=res.result[0].value;
        }
      });
     
    },
    //获取国家列表
    getTableList() {
       if(this.search.BU==="" || this.search.BU===null || this.search.BU===undefined){
        warnMsg("请选择BU");
        return;
      }
       let data=this.search;
        if(this.budyear!=="" && this.budyear!==null && this.budyear!==undefined)
        {
            data.year=this.budyear.getFullYear();
            data.month=this.budyear.getMonth()+1;

        }
        else{
            warnMsg("请选择时间");
            return;
        }
       
       this.table.loading = true;
        BUAnalyzeInquire(data).then(res => {
          if(res.success)
          {
             this.table.loading = false;
             this.TableDataList = res.result;
          
          }
              
        }).catch(err=>{
           this.table.loading = false;
        }) 

    },  
     Importdata() {
      if(this.TableDataList.length<1){
        warnMsg("当前无导出数据");
        return;
      }
      this.bthloading=true;
      let data={
        filename:"BU分析报表导出",
        IsShowWY:1
      };
      var arr=[];
      arr.push(this.TableDataList);
      data.data=arr;
     
     
      ExportFileBydata(data).then(res=>{
        if(res.success){
           this.bthloading=false;
            //window.open(res.result);
             if (res.result.indexOf("http") > -1) {
              window.location.href = res.result;
              this.excelLoading = false;
            } else {
              warnMsg(res.result);
            }
        }

      }).catch(err=>{
         this.bthloading=false;
      })
  
    },
  
  },
  created() {
   this.setComBox();
  }
  
}
</script>