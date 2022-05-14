<template>
  <div class="app-container ImportDataSituation"  v-loading="bthloading">
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
             <!-- <el-col :span="3">
                <el-form-item label="所属月份：" prop="month" style="position:relative;">               
                     <el-select v-model="search.month"  placeholder="请选择月份" style="width:100%"  filterable>
                        <el-option v-for="item in monthlist" 
                        :key="item.value" 
                        :label="item.label" 
                        :value="item.value">

                        </el-option>
                    </el-select>   
                </el-form-item>
            </el-col>          -->
          
        <el-col :span="2">
          <el-form-item label prop label-width="10px">
           <el-button type="primary" size="mini" @click="getTableList()">搜索</el-button>         
       
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
.ImportDataSituation {
  height: 100%;
   
}
</style>
<script>
import { tableMixin } from "mixin/commTable"

import {GetIMportData } from "api/publicBase/ImportData";

import {warnMsg,successMsg} from 'utils/messageBox'


export default {
  name: "ImportDataSituationIndex",
  components: {},
  mixins: [tableMixin],
  data() {
    return {
      
      TableDataList:[],//表格数据,显示导入数据
      // search:{          
      //    month:"",       
      // },
 
      bthloading:false,
      budyear:new Date(),
      monthlist:[
          {
              label:"1月",
              value:1,
          },
           {
              label:"2月",
              value:2,
          },
           {
              label:"3月",
              value:3,
          },
           {
              label:"4月",
              value:4,
          },
           {
              label:"5月",
              value:5,
          },
           {
              label:"6月",
              value:6,
          },
           {
              label:"7月",
              value:7,
          },
           {
              label:"8月",
              value:8,
          },
           {
              label:"9月",
              value:9,
          },
           {
              label:"10月",
              value:10,
          },
           {
              label:"11月",
              value:11,
          },
           {
              label:"12月",
              value:12,
          }
      ]
    }
  },
  methods: {
    
    getRowKeys(row) {
            return row.id;
    },
        
    //获取国家列表
    getTableList() {
     
       let data={};
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
        GetIMportData(data).then(res => {
          if(res.success)
          {
             this.table.loading = false;
             this.TableDataList = res.result;
          
          }
              
        }).catch(err=>{
           this.table.loading = false;
        }) 

    },  
  
  },
  created() {
   
  }
  
}
</script>