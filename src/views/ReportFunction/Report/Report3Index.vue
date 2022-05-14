<template>
  <div class="app-container Report3class"  v-loading="bthloading">
    <el-form size="mini" @submit.native.prevent label-width="90px">
    <el-row>       
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
              min-width="120px"
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
.Report3class {
  height: 100%;
   
}
</style>
<script>
import { tableMixin } from "mixin/commTable"
import { ExportFileBydata} from "api/ReportFunction/BUAnalyze";
import { Report3Inquire} from "api/ReportFunction/Report";
import {warnMsg,successMsg} from 'utils/messageBox'


export default {
  name: "Report3Index",
  components: {},
  mixins: [tableMixin],
  data() {
    return {
      typeList: [], //bu类别
      TableDataList:[],//表格数据,显示导入数据
       search:{        
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
        
    //获取国家列表
    getTableList() {
     
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
        Report3Inquire(data).then(res => {
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
        filename:"报表3报表导出",
        IsShowWY:0
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
 
  }
  
}
</script>