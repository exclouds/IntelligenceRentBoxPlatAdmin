<template>
  <div class="app-container RegionAnalyze"  v-loading="bthloading">
    <el-form size="mini" @submit.native.prevent label-width="90px">
    <el-row>
         <el-col :span="3">
          <el-form-item label="大区：" prop  label-width="50px">
           
             <el-select
              v-model="search.Region"
              placeholder="大区"
              clearable
              filterable
              style="width: 100%"
            
            >
             <el-option
                v-for="item in regionList"
                :key="item"
                :label="item"
                :value="item"
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
    <el-tabs v-model="tabActiveName" type="card">
        <el-tab-pane
            v-for="(item1, index1) in TableDataList"
            :key="index1"
            :label="item1.title"
            :name="'report'+index1"
        
        >  
      <el-table
      :cell-class-name="tableRowClassName"
        v-loading="table.loading"
        :data="item1.data.contents"
         :row-key = "getRowKeys"
        border
        stripe
        highlight-current-row
        fit
        height="710px"
        style="width: 100%"
        ref="table"
        :span-method="arraySpanMethod"
      >
      
           <el-table-column
          type="index"
          align="center"
          label="序号"
          width="50"
          
        >
          <template slot-scope="scope">{{ countIndex(scope.$index) }}</template>
        </el-table-column>
           <el-table-column
            align="center"
            prop="showparentproject"
            show-overflow-tooltip
            width="100"
            label="项目"
           
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="project"
            show-overflow-tooltip
           
            label="项目"
            width="160"
          >
          </el-table-column>


        <el-table-column
          v-for="(item, index) in item1.data.titles"
          :key="index"
          :label="item.name"
        
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope" v-if="item.MaxLevel !== item.level">
            <span>{{ scope.row.value[item.index] }}</span>
          </template>
          <el-table-column
            v-for="(setitem, setindex) in item.children"
            :key="setindex"
            :label="setitem.name"
            width="150"
            align="center"
            show-overflow-tooltip
            :v-if="item.MaxLevel === item.level"
          >
            <template slot-scope="scope" v-if="item.MaxLevel !== setitem.level">
              <span>{{ scope.row.value[setitem.index] }}</span>
            </template>
            <el-table-column
              v-for="(threetitem, threeindex) in setitem.children"
              :key="threeindex"
              :label="threetitem.name"
              width="150"
              align="center"
              show-overflow-tooltip
              :v-if="item.MaxLevel === setitem.level"
            >
              <template
                slot-scope="scope"
                v-if="item.MaxLevel !== threetitem.level"
              >
                <span>{{ scope.row.value[threetitem.index] }}</span>
              </template>
              <el-table-column
                v-for="(fourtitem, fourindex) in threetitem.children"
                :key="fourindex"
                :label="fourtitem.name"
                width="150"
                align="center"
                show-overflow-tooltip
                :v-if="item.MaxLevel === threetitem.level"
              >
                <template
                  slot-scope="scope"
                  v-if="item.MaxLevel !== threetitem.level"
                >
                  <span>{{ scope.row.value[fourtitem.index] }}</span>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table-column>
          <!-- <column-item v-for="(colitem,colindex) in item.children" :key="colindex" :col="colitem"></column-item> -->
        </el-table-column>
      
      </el-table>
       </el-tab-pane>
        </el-tabs>
    
  </div>
</template>
<style lang="scss">
.RegionAnalyze {
  height: 100%;
   
}
</style>
<script>
import { tableMixin } from "mixin/commTable"
import {RegionAnalyzeInquire ,ExportGroupAnalyzeFile} from "api/ReportFunction/BUAnalyze";
import { GetRegionList } from "api/publicBase/Combox";
import {warnMsg,successMsg} from 'utils/messageBox'

export default {
  name: "RegionAnalyzeIndex",
  components: {},
  mixins: [tableMixin],
  data() {
    return {
    tabActiveName: "report0",
      TableDataList:[],//表格数据,显示导入数据
       search:{  
          Region:"",          
          IsDurMonth:0,       
       },
 
      bthloading:false,
      budyear:new Date(),
       regionList: [], //bu类别
    }
  },
  methods: {
    
    getRowKeys(row) {
            return row.id;
    },
          //添加查询combox
    setComBox() {
      GetRegionList({IsAuthority:true,IsShowAll:true}).then((res) => {
               this.regionList = res.result;
                if(res.result.length===1){
                  this.search.Region=res.result[0];
                }
            });
     
    },
   setColSpan:function() {
     
      // // 获取表头的所有单元格
    
      // var x = document.getElementsByClassName("el-table__header")[0].rows[0].cells;
      // // 将第二列表头单元格的colSpan设为2
      // x[1].colSpan = 2;
      // // 将第三列表头单元格的display设为none
      // x[2].style.display = 'none';
      // 获取表头的所有单元格
      var alltable=document.getElementsByClassName("el-table__header");
      for(var i=0;i<alltable.length;i++)
      {
        if(alltable[i].innerText.includes("项目")){
           var x = alltable[i].rows[0].cells;
            // 将第二列表头单元格的colSpan设为2
            x[1].colSpan = 2;
            // 将第三列表头单元格的display设为none
            x[2].style.display = 'none'; 
        }
      }
  
    }, 
    
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        if (row.parentproject !== "") {
          return [row.rowspaln, 1];
        } else if (row.rowspaln > 0) {
          return [0, 0];
        } else {
          return [1, 2];
        }
      } else if (columnIndex === 2) {
        if (row.parentproject === "") {
          if (row.rowspaln === 0) {
            return [0, 0];
          }
        }
      }
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
       this.bthloading=true;
       this.table.loading = true;
        RegionAnalyzeInquire(data).then(res => {
          if(res.success)
          {
              this.bthloading=false;
             this.table.loading = false;
             this.TableDataList = res.result;
             this.tabActiveName= "report0";
             this.TableDataList.forEach((item,mainindex)=>{
                var rows = 0;
                var parentname = "";
                var ishb = false;
                //记录
                var startindex = -1;
                item.data.contents.forEach((ele, index) => {
                if (ele.project.includes("/")) {
                  var namelist = ele.project.split("/");

                  if (parentname === namelist[0]) {
                    rows++;
                    ele.parentproject = "";
                    ele.rowspaln = 1;
                    ele.showparentproject = parentname;
                    ele.project = namelist[1];
                  } else {
                    if (startindex > -1 && ishb === true) {
                      //sheetdata.data[startindex].rowspaln = rows;
                       this.TableDataList.bulist[mainindex].data.contents[startindex].rowspaln = rows;
                    }
                    ishb = true;
                    rows = 1;
                    startindex = index;
                    ele.project = namelist[1];
                    ele.parentproject = namelist[0];
                    parentname = namelist[0];
                    ele.showparentproject = parentname;
                  }
                } else {
                  if (ishb === true) {
                    this.TableDataList.bulist[mainindex].data.contents[startindex].rowspaln = rows;
                  }
                  ishb = false;
                  rows = 0;
                  parentname = "";
                  ele.parentproject = "";
                  ele.showparentproject = ele.project;
                  ele.rowspaln = 0;
                  startindex = -1;
                }
                });
                if (ishb === true) {
                  this.TableDataList[mainindex].data.contents[startindex].rowspaln = rows;
                }
              

            })
             this.$nextTick(function(){
              this.setColSpan();
            })
          
          }
              
        }).catch(err=>{
            this.bthloading=false;
           this.table.loading = false;
        }) 

    },  
     Importdata() {
      if(this.TableDataList.length<1){
        warnMsg("当前无导出数据");
        return;
      }
      this.bthloading=true;
      // let data={
      //   filename:"集团分析报表导出",
      //   IsShowWY:1,
      //   data:this.TableDataList
      // };
     
     
      ExportGroupAnalyzeFile(this.TableDataList).then(res=>{
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