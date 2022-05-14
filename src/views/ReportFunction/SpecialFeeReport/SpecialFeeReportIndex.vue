<template>
  <div class="app-container SFeeReSituation"  v-loading="bthloading">
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
          <el-form-item label prop label-width="10px">
           <el-button type="primary" size="mini" @click="getTableList()">搜索</el-button>         
           <el-button
              type="primary"
              size="mini"
              @click="Importdata()"
              :loading="bthloading"         
              >导出</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form> 
    <div id="out-table" style="height:calc(100% - 60px)">
      <el-table
      :cell-class-name="tableRowClassName"
        v-loading="table.loading"
        :data="TableDataList.value"
         :row-key = "getRowKeys"
        border
        stripe
        highlight-current-row
        fit
        height="100%"
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
       <!-- <el-table-column :reserve-selection="true" type="selection" width="40"></el-table-column> -->
        <!-- <el-table-column type="index" align="center" label="序号" width="50">
          <template slot-scope="scope">{{countIndex(scope.$index)}}</template>
        </el-table-column>
       
        <el-table-column
          align="center"
          prop="code"
          label="公司代码"       
          
            min-width="35%"
        ></el-table-column>
       
        <el-table-column
          align="center"
          prop="displayName"
          show-overflow-tooltip
          label="公司名称"
          
           
        ></el-table-column>
        <el-table-column
          align="center"
          prop="shortName"
          show-overflow-tooltip
          label="公司简称"
          min-width="35%"
           
        ></el-table-column>
        
        <el-table-column
          align="center"
          prop="budImportsituation"
          show-overflow-tooltip
          label="预算导入情况"
          min-width="40%"
           
        ></el-table-column>
        <el-table-column
          align="center"
          prop="busDatasituation"
          show-overflow-tooltip
          label="业务数据录入情况"
          min-width="40%"
        
        ></el-table-column>
        <el-table-column
          align="center"
          prop="speciafFeesituation"
          show-overflow-tooltip
          label="特殊费用录入情况"
          min-width="40%"         
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="actNumsituation"
          show-overflow-tooltip
          label="实际数/科目余额表导入情况" 
           min-width="40%"                  
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="balancesituation"
          show-overflow-tooltip
          label="部门辅助余额表" 
           min-width="40%"                  
        >
        </el-table-column> -->
      
      </el-table>
    </div>
    
  </div>
</template>
<style lang="scss">
.SFeeReSituation {
  height: 100%;
   
}
</style>
<script>
import { tableMixin } from "mixin/commTable"

import {SpecialFeeStatement } from "api/ReportFunction/SpecialFeeReport";

import {warnMsg,successMsg} from 'utils/messageBox'

import XLSX from "xlsx";
import FileSaver from "file-saver";


export default {
  name: "SpecialFeeReportIndex",
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
        SpecialFeeStatement(data).then(res => {
          if(res.success)
          {
             this.table.loading = false;
             this.TableDataList = res.result;
          
          }
              
        }).catch(err=>{
           this.table.loading = false;
        }) 

    },  
    Importdata()
    {
      if(this.TableDataList.length<1){
        warnMsg("当前无导出数据");
        return;
      }
     var fileName ="特殊费用报表导出";
     if(this.budyear!=="" && this.budyear!==null && this.budyear!==undefined)
        {
           
            fileName=this.budyear.getFullYear()+"-"+(this.budyear.getMonth()+1)+"-"+fileName;

        }
       var htnl= "<html><head><meta charset='utf-8' /><style> table,table tr th, table tr td { border:1px solid black;} </style></head><body>"
                     + document.getElementById('out-table').outerHTML + "</body></html>";

      try {
        FileSaver.saveAs(
        　　new Blob([htnl], {
                type: "application/vnd.ms-excel"
            }),
            // 导出的文件名称
            `${fileName}.xlsx`
        )
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
                  
    },
     s2ab(s) {
      if (typeof ArrayBuffer !== 'undefined') {
          var buf = new ArrayBuffer(s.length);
          var view = new Uint8Array(buf);
          for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
          return buf;
      } else {
          var buf = new Array(s.length);
          for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
          return buf;
      }
    },
     saveAs(obj, fileName) {
        var tmpa = document.createElement("a");
        tmpa.download = fileName || "下载";
        tmpa.href = URL.createObjectURL(obj);
        tmpa.click();
        setTimeout(function () {
            URL.revokeObjectURL(obj);
        }, 100);
      }
  
  },
  created() {
   
  }
  
}
</script>