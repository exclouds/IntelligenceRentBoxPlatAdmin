<template>
  <div class="app-container feereport" v-loading="bthloading">
    <el-form size="mini" @submit.native.prevent label-width="70px">
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
          <el-form-item
            label="所属时间："
            prop="budyear"
            style="position: relative"
            label-width="90px"
          >
            <el-date-picker
              v-model="budyear"
              type="month"
              placeholder="所属时间"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="类型：">
            <el-select
              v-model="search.FinanceBudget"
              placeholder="类型"
              clearable
              filterable
            >
              <el-option label="财务" :value="0"></el-option>
              <el-option label="预算" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
         <el-col :span="3">
          <el-form-item label="是否比对：" label-width="90px">
            <el-select
              v-model="search.IsCompare"
              placeholder="是否比对"
              clearable
              filterable
            >           
              <el-option label="是" :value="1"></el-option>
               <el-option label="否" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
          <el-col :span="3">
          <el-form-item label="万元：" >
            <el-select
              v-model="search.IsShowWY"
              placeholder="万元"             
              filterable
             @change="changeshowwy"
            >
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
         <el-col :span="3">
          <el-form-item label="是否合并：" label-width="90px">
            <el-select
              v-model="search.IsMerge"
              placeholder="万元"             
              filterable
              :disabled="search.IsShowWY==0"
            >
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
     <el-col :span="3">
          <el-form-item label="查询公司：" label-width="80px">
            <el-select
              v-model="search.QryCorpFlag"
              placeholder="查询公司"             
              filterable
            >
              <el-option label="全部" :value="0"></el-option>
              <el-option label="控股" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label prop label-width="10px">
            <el-button type="primary" size="mini" @click="getTableList()"
              >搜索</el-button
            >

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
    <div id="out-table" style="height: calc(100% - 40px);">
        <el-tabs v-model="tabActiveName" type="card">
        <el-tab-pane
            v-for="(item, index) in TableDataList.bulist"
            :key="index"
            :label="item.title"
            :name="'budget'+index"
        
        >     
        
      <el-table
        :cell-class-name="tableRowClassName"
        v-loading="table.loading"
        :data="item.data.contents"
        :span-method="arraySpanMethod"
        :row-key="getRowKeys"
        border
        stripe
        highlight-current-row
        fit
        height="730px"
        style="width: 100%"
        ref="table"
       
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
          v-for="(item, index) in item.data.titles"
          :key="index"
          :label="item.name"
          width="130px"
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
  </div>
</template>
<style lang="scss">
.feereport {
  height: 100%; 
}
</style>
<script>
import { tableMixin } from "mixin/commTable";
import { GetBuComboBox } from "api/publicBase/Combox";
import {
  BUSummaryReportInquire,
  ExportBUSummaryFile,
} from "api/ReportFunction/BUSummaryReport";
import { warnMsg, htmlMsg } from "utils/messageBox";


import { getDicListByDitType } from "api/publicBase/dictionaryMng";

export default {
  name: "FeeInsideReportIndex",
  components: {  },
  mixins: [tableMixin],
  data() {
    return {
     
      titlename: "",
      tabActiveName: "budget0",
      TableDataList: [], //表格数据,显示导入数据
      budyear: new Date(),
      bthloading: false,
      selectbud: [], //选择预算类别
      search: {
        BU: "",
        FinanceBudget: 0,
        Version: 1 ,
        IsCompare:0,
        IsShowWY:0,
        IsMerge:0,
        QryCorpFlag:0
      },
      typeList: [], //bu类别
       vstypeList:[],//版本类别
    };
  },
  methods: {
   
    getRowKeys(row) {
      return row.id;
    },
     changeshowwy(){
      if(this.search.IsShowWY===0){
        this.search.IsMerge=0;
      }
    },
    //添加查询combox
    setComBox() {
      GetBuComboBox({IsShowAll:true}).then((res) => {
        this.typeList = res.result;
        if(res.result.length===1){
          this.search.BU=res.result[0].value;
        }
      });
      getDicListByDitType({ BaseKeyValueTypeCode: "JOINMULIMPORT", Code: "", Name: ""  }).then(res => {
            this.vstypeList = res.result.comboxs;
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
    //获取列表
    getTableList() {
      let data = this.search;
      if (
        this.budyear !== "" &&
        this.budyear !== null &&
        this.budyear !== undefined
      ) {
        data.Year = this.budyear.getFullYear();
        data.Month = this.budyear.getMonth() + 1;
      } else {
        warnMsg("请选择所属时间");
        return;
      }
     data.IsInside=false;
     data.retype=2;
      //  var showmsg=JSON.stringify(data);
      //  htmlMsg(showmsg.toString(),{type: "warning", duration: 0, showClose: true});
      this.TableDataList = [];
      this.bthloading = true;
      BUSummaryReportInquire(data)
        .then((res) => {
          if (res.success) {
            this.bthloading = false;
            this.TableDataList = res.result;

           
            this.TableDataList.bulist.forEach((item,mainindex)=>{
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
                this.TableDataList.bulist[mainindex].data.contents[startindex].rowspaln = rows;
              }

            })
            this.$nextTick(function(){
              this.setColSpan();
            })
          }
        })
        .catch((err) => {
          this.bthloading = false;
        });
    },
    Importdata() {
      if(this.TableDataList.bulist.length<1){
        warnMsg("当前无导出数据");
        return;
      }
      this.bthloading=true;
      let data=this.TableDataList;

       var filename="集团1报表费用汇总";
       if (
        this.budyear !== "" &&
        this.budyear !== null &&
        this.budyear !== undefined
      ) {
        filename=filename+"-"+this.budyear.getFullYear()+"-"
        +(this.budyear.getMonth()>9?(this.budyear.getMonth()+1):("0"+(this.budyear.getMonth()+1)));
        
      } 
      filename=(this.search.BU==="ALL"?"":this.search.BU)+filename+"-"+(this.search.FinanceBudget===0?"财务":"预算")
      +(this.search.IsCompare===0?"":"比对")
      +(this.search.IsShowWY===0?"":"万元版")
      +(this.search.IsMerge===0?"":"合并")
       +(this.search.QryCorpFlag===0?"":"控股公司");
      data.filename=filename;
     // data.filename="集团1报表导出";   
      let data1={
        data:data,
        IsShowWY:this.search.IsShowWY,
        IsInside:false
      }
      ExportBUSummaryFile(data1).then(res=>{
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
    s2ab(s) {
      if (typeof ArrayBuffer !== "undefined") {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
      } else {
        var buf = new Array(s.length);
        for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xff;
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
    },
  },
  created() {
    this.setComBox();
  },
  mounted() {
    // // 注意一定要保证DOM渲染完成后在进行合并操作，否则会找不到元素
    // this.$nextTick(function(){
    //   this.setColSpan();
    // })
  }
};
</script>