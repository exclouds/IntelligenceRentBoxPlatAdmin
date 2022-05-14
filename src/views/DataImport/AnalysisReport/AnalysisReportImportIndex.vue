<template>
  <div class="app-container reportimport" v-loading="bthloading">
    <el-form size="mini" @submit.native.prevent label-width="70px">
    <el-row>
        <el-col :span="5">
               <el-form-item label="公司：" prop="choosedTreeNode" style="position:relative;" >            
                    
                    <tree-select ref="chooseEquNode" @on-treeShow-change="ontreeShowChange" :choosedEquipmentNode="choosedTreeNode" style="width:100%"></tree-select>
                    <div class="editOrgComp-row-tree" v-show="treeComp.show" >                       
                        <tree ref='treeComp' :pCheckStrictly="true" :radio="true" :pTreeDefaultProps="treeComp.treeConfig" :pTreeData="treeComp.data" :pChoosedNode="treeComp.choosedTreeNodeId"
                          @on-nodeChange="onNodeClick" @on-outside-click="onClickOutSide"></tree>  
                    </div>
                </el-form-item>
          
          </el-col>       
            <el-col :span="3">
                <el-form-item label="版本："   >               
                        <el-select v-model="search.Version"   style="width:100%" 
                      :disabled="!ischoose"
                        filterable>
                         <el-option
                          v-for="item in vstypeList"
                          :key="item.value"
                          :label="item.displayText"
                          :value="Number(item.value)"
                        ></el-option>
                    </el-select>  
                </el-form-item>
            </el-col>     
         <el-col :span="3">
                <el-form-item label="所属年份：" prop="budyear" style="position:relative;" label-width="90px">               
                    <el-date-picker v-model="budyear" 
                    type="year" 
                    placeholder="所属年份"    
                    style="width:100%"
                     ></el-date-picker>    
                </el-form-item>
            </el-col>
             <el-col :span="4">
                <el-form-item label="月份：" prop="month" style="position:relative;" >               
                     <el-select v-model="search.month"
                      multiple 
                      collapse-tags  
                      clearable
                      filterable 
                      placeholder="请选择月份" 
                      style="width:100%">
                        <el-option v-for="item in monthlist" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>   
                </el-form-item>
            </el-col>
             <el-col :span="4">
            <el-form-item label="预算类别：" prop="budgettype" label-width="90px">
             <el-select
              v-model="search.budgettype"
              placeholder="预算类别"
              clearable
              filterable          
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
          
       
    <!-- </el-row>
    <el-row> -->
        <el-col :span="3">
            <el-form-item label="项目：" prop="feename" >
              <el-input placeholder="项目"  style="width:100%;" v-model="search.feename" size="mini" clearable ></el-input>
            </el-form-item>
          </el-col>
             <el-col :span="2">
          <el-form-item label prop label-width="10px">
          <el-button type="primary" size="mini" @click="getTableList()">搜索</el-button>
           <el-button type="primary" size="mini" @click="Importdata()" v-if="checkBtnPeimission(AnalysisReportImport.Createbud.permission)">导入</el-button>
          </el-form-item>
           </el-col>
           </el-row>
        <el-row>
           <el-col :span="4">
            <el-form-item label="预算是否提交：" prop="budgettype" label-width="120px">
             <el-select
              v-model="search.IsSubmit"
              placeholder="预算是否提交"
              clearable
              filterable     
              style="width:100%"     
            >
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
            </el-form-item>
          </el-col>
   
            <el-col :span="4">
            <el-form-item label="预算是否撤回：" prop="budgettype" label-width="120px">
             <el-select
              v-model="search.IsWithdraw"
              placeholder="预算是否撤回"
              clearable
              filterable  
             style="width:100%"      
            >
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
            </el-form-item>
          </el-col>
           <el-col :span="4">
            <el-form-item label="实际数是否提交：" prop="budgettype" label-width="120px">
             <el-select
              v-model="search.IsSubmitCompleted"
              placeholder="实际数是否提交"
              clearable
              filterable
              style="width:100%"           
            >
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
            </el-form-item>
          </el-col>
            <el-col :span="4">
            <el-form-item label="实际数是否撤回：" prop="budgettype" label-width="120px">
             <el-select
              v-model="search.IsWithdrawCompleted"
              placeholder="实际数是否撤回"
              clearable
              filterable   
              style="width:100%"        
            >
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
            </el-form-item>
          </el-col>
        
           <el-col :span="3">
            <el-form-item label="操作类别："  label-width="90px">
             <el-select
              v-model="subtype"
              placeholder=""
              style="width:100%"          
            >
              <el-option label="预算" :value=1></el-option>
              <el-option label="实际数" :value=2></el-option>
              <el-option label="全部" :value=3></el-option>
            </el-select>
            </el-form-item>
          </el-col>
        <el-col :span="3">
          <el-form-item label prop label-width="10px">      
         <el-popover
            placement="bottom"
            popper-class="btnGroup-popover"
            width="400"
            trigger="hover">
                  <el-button type="primary" size="mini" @click="onBatchDelete()"  v-if="checkBtnPeimission(AnalysisReportImport.Deletebud.permission)">删除</el-button>
                  <el-button type="primary" size="mini" @click="SubmitReport()"  v-if="checkBtnPeimission(AnalysisReportImport.Submitbud.permission)">提交</el-button>
                  <el-button type="primary" size="mini" @click="CancelSubmit()"  v-if="checkBtnPeimission(AnalysisReportImport.CancelSubmitbud.permission)">取消提交</el-button>
                  <el-button type="primary" size="mini" @click="AgreeCancelSubmit()"  v-if="checkBtnPeimission(AnalysisReportImport.AgreeCancelSubmitbud.permission)">同意取消提交</el-button>
              <el-button slot="reference" type="primary" size="mini" plain>操作</el-button>
          </el-popover>
          <el-popover
            placement="bottom"
            popper-class="btnGroup-popover"
            width="480"
            trigger="hover">
                  <el-button type="primary" size="mini" @click="BathOperation(4)" v-if="checkBtnPeimission(AnalysisReportImport.Deletebud.permission)">批量删除</el-button>
                  <el-button type="primary" size="mini" @click="BathOperation(1)"  v-if="checkBtnPeimission(AnalysisReportImport.Submitbud.permission)">批量提交</el-button>
                  <el-button type="primary" size="mini" @click="BathOperation(2)"  v-if="checkBtnPeimission(AnalysisReportImport.CancelSubmitbud.permission)">批量取消提交</el-button>
                  <el-button type="primary" size="mini" @click="BathOperation(3)"  v-if="checkBtnPeimission(AnalysisReportImport.AgreeCancelSubmitbud.permission)">批量同意取消提交</el-button>
              <el-button slot="reference" type="primary" size="mini" plain>查询批量操作</el-button>
          </el-popover>
        
         
         
          </el-form-item>
        </el-col>
      </el-row>
    </el-form> 

          <el-table
            :cell-class-name="tableRowClassName"
                v-loading="table.loading"
                :data="TableDataList"
                :row-key = "getRowKeys"
                border
                stripe
                highlight-current-row
                fit
                height="700px"
                style="width: 100%"
                ref="table"
                @sort-change="sortChange"
                @selection-change="onSelectChange"
            >
            <el-table-column :reserve-selection="true" type="selection" width="40"></el-table-column>
                <!-- <el-table-column type="index" align="center" label="序号" width="50">
                <template slot-scope="scope">{{countIndex(scope.$index)}}</template>
                </el-table-column> -->
                <el-table-column
                align="center"
                prop="company"
                label="公司"
                show-overflow-tooltip
                sortable="custom"
                 width="200"
                >        
                </el-table-column>
              
                <el-table-column
                align="center"
                prop="budgetType"
                label="预算类别"
                show-overflow-tooltip
                 sortable="custom"
                  width="120"
                >        
                </el-table-column>
                 <el-table-column
                align="center"
                prop="version"
                label="预算版本"
                show-overflow-tooltip
                 sortable="custom"
                  width="120"
                >        
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="year"
                  label="年份"
                  show-overflow-tooltip
                  sortable="custom"
                    width="100"
                >   
                </el-table-column>  
                 <el-table-column
                  align="center"
                  prop="month"
                  label="月"
                  show-overflow-tooltip
                  sortable="custom"
                  width="80"
                >      
                </el-table-column>
                <el-table-column
                align="center"
                prop="linNO"
                label="行号"
                show-overflow-tooltip
                 sortable="custom"
                  width="100"
                >        
                </el-table-column>
            
                <el-table-column
                align="center"
                prop="parentProjectName"
                label="父级项目"
                show-overflow-tooltip
                sortable="custom"
                width="150"
                >        
                </el-table-column>
                <el-table-column
                align="center"
                prop="projectName"
                label="项目"
                show-overflow-tooltip
                sortable="custom"
                width="150"
                >              
                </el-table-column>
               
                <!-- <el-table-column
                align="center"
                prop="totalBudget"              
                show-overflow-tooltip
                label="全年合计"
                width="150"
                sortable="custom"
                ></el-table-column>
                <el-table-column
                align="center"
                prop="completedTotal"    
                show-overflow-tooltip
                label="全年实际完成合计"
                 width="150"
                  sortable="custom"
                ></el-table-column> -->
                <el-table-column
                align="center"
                prop="budgetAmount"    
                show-overflow-tooltip
                label="预算"
                 width="100"
                  sortable="custom"
                ></el-table-column>
                <el-table-column
                align="center"
                prop="completedAmount"
                sortable="custom"
                show-overflow-tooltip
                label="实际完成"
                 width="100"
                ></el-table-column>    
                 <el-table-column
                  align="center"
                  prop="isSubmit"
                  label="预算是否提交"
                  width="150"
                  :show-overflow-tooltip="true"
                   sortable="custom"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row.isSubmit?"是":"否"}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="isWithdraw"
                  label="预算是否撤回"
                  width="150"
                  :show-overflow-tooltip="true"
                   sortable="custom"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row.isWithdraw?"是":"否"}}</span>
                  </template>
                </el-table-column>
                  <el-table-column
                  align="center"
                  prop="islock"
                  label="预算是否锁账"
                  width="100"
                  :show-overflow-tooltip="true"
                   
                >
                  <template slot-scope="scope">
                    <span>{{(scope.row.isAllLock || scope.row.isLock)?"是":"否"}}</span>
                  </template>
                </el-table-column>
                  <el-table-column
                  align="center"
                  prop="isSubmitCompleted"
                  label="实际数是否提交"
                  width="150"
                  :show-overflow-tooltip="true"
                   sortable="custom"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row.isSubmitCompleted?"是":"否"}}</span>
                  </template>
                </el-table-column>
                 <el-table-column
                  align="center"
                  prop="isWithdrawCompleted"
                  label="实际数是否撤回"
                  width="150"
                  :show-overflow-tooltip="true"
                   sortable="custom"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row.isWithdrawCompleted?"是":"否"}}</span>
                  </template>
                </el-table-column>           
               
                 <el-table-column
                  align="center"
                  prop="isACLock"
                  label="实际数预算是否锁账"
                  width="100"
                  :show-overflow-tooltip="true"
                   
                >
                  <template slot-scope="scope">
                    <span>{{(scope.row.isACLock || scope.row.isLock)?"是":"否"}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="110" fixed="right" >
                    <template slot-scope="scope" v-if="(scope.row.isSubmit!==true || scope.row.isSubmitCompleted!==true)
                                                  && scope.row.isAllLock!==true && (scope.row.isLock!==true || scope.row.isACLock!==true)">
                        <div class="tableBtn"  @click="openUpdate(scope.row)" v-if="checkBtnPeimission(AnalysisReportImport.Editbud.permission)">编辑</div>
                        <div class="tableBtn"  @click="deletesinge(scope.row)" v-if="checkBtnPeimission(AnalysisReportImport.Deletebud.permission)">删除</div>                      
                    </template>
                  </el-table-column>
     
            </el-table>
             <el-pagination
                style="margin-top:10px;"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.currentPage"
                :page-size="page.pageSize"
                :total="page.total"
                :page-sizes="page.pageSelectArr"
                layout="total, sizes, prev, pager, next, jumper"
            >
            </el-pagination>
        <ReportImport ref="ImportComp" :pshow="ImportComp.show" @on-show-change="onImportCompShowChange"
          @on-save-success="onSaveSuccess"
        ></ReportImport>
       <EditReport  ref="EditReportComp" :pshow="EditReportComp.show" @on-show-change="onEditReportCompShowChange"
          @on-save-success="onSaveSuccess">
        </EditReport>
  </div>
</template>
<style lang="scss">
.reportimport {
  height: 100%;
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
import { tableMixin } from "mixin/commTable"
import ReportImport from "./ReportImport"
import treeSelect from 'components/treeSelect/treeSelect'
import tree from 'components/tree/tree'
import {getOrganizatonTreeNoUsers,GetDeptUnitList} from 'api/user/organization'
import { getDicListByDitType } from "api/publicBase/dictionaryMng";
import {GetReportQueryList,BathDeleteReport,SubmitReport,CancelSubmit,AgreeCancelSubmit,BathOperation} from 'api/DataImport/AnalysisReport'
import {warnMsg,htmlMsg,successMsg} from 'utils/messageBox'
 import EditReport from "./EditReport"
import {checkBtnPeimission,AnalysisReportImport} from 'utils/btnRole'


export default {
  name: "AnalysisReportImportIndex",
  components: {ReportImport,EditReport,
                treeSelect,
                tree
              },
  mixins: [tableMixin],
  data() {
    return {
      AnalysisReportImport,
      TableDataList:[],//表格数据,显示导入数据
      budyear:new Date(),
      bthloading:false,
      search:{
        code:"",
        month:[],
        feename:"",
        budgettype:"",
        Version: 0 ,
        IsSubmit:undefined,
        IsWithdraw:undefined,
        IsSubmitCompleted:undefined,
        IsWithdrawCompleted:undefined   

      },
      subtype:3,//操作类别
      typeList:[],//预算类别
      vstypeList:[],//版本类别
       ischoose:false  ,
      ImportComp: {
                show: false
            },
      EditReportComp: {
          show: false
      },
      treeComp: {
              show: false,
              data: [],
              choosedTreeNodeId: [],  //回显树节点ID      
          },
      choosedTreeNode: [],
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
    checkBtnPeimission,
    getRowKeys(row) {
            return row.id;
    },
     //添加查询combox
    setComBox() {
      getDicListByDitType({ BaseKeyValueTypeCode: "BUDGETTYPE", Code: "", Name: ""  }).then(res => {
        this.typeList = res.result.comboxs;
      });
       getDicListByDitType({ BaseKeyValueTypeCode: "JOINMULIMPORT", Code: "", Name: ""  }).then(res => {
            this.vstypeList = res.result.comboxs;
          });
      
    },
    //获取组织树
        getOrganizationTree() {
            //{IsShowdep:true}
            getOrganizatonTreeNoUsers().then(res => {
            if(res.success)
                this.treeComp.data = res.result;
                if(res.result.length>0)
                {
                  this.onNodeClick([res.result[0]]);
                  this.treeComp.choosedTreeNodeId=[res.result[0].nodeId];
                  this.ischoose=res.result[0].ismulti;
                  
                }
            })
        },
       
        //树数据回调事件
        onNodeClick(clickNode)   //choosedNodeID
        {
            this.search.code = clickNode.length > 0 ? clickNode[0].nodeUUid : ''
            this.choosedTreeNode=clickNode;
             this.ischoose=clickNode[0].ismulti;
            if(clickNode[0].ismulti !==true)
            {
              this.search.Version=0;
            }
        },
        //
        onClickOutSide() {
            if(this.treeComp.show==true){
                this.treeComp.show=false;
                this.$refs.chooseEquNode.iconChange()
            }
        },
        //单击树选择框控件
        ontreeShowChange(val) {
            this.treeComp.show=val;
        },   
    //获取列表
    getTableList() {
      if(this.search.code==="" || this.search.code===null ||this.search.code===undefined)
      {
        warnMsg("请选择公司");
        return;
      }
      let data=this.search;
      if(this.budyear!=="" && this.budyear!==null && this.budyear!==undefined)
      {
        data.year=this.budyear.getFullYear();

      }
      else{
         data.year=null;
      }
      //  if(this.search.month.length>0)
      // {
      //   data.month=this.search.month;

      // }
      // else{
      //    data.month=[];
      // }
     
      
      data.maxResultCount= this.page.pageSize;
      data.skipCount= (this.page.currentPage - 1)*this.page.pageSize;
      data.sorting= this.table.order.sort;
      this.table.loading = true;
      this.$refs.table.clearSelection();
      GetReportQueryList(data).then(res => {
          if(res.success)
          {
             this.table.loading = false;
             this.TableDataList = res.result.items;
             this.page.total = res.result.totalCount
          }
              
        }).catch(err=>{
           this.table.loading = false;
        }) 

    },
    Importdata(){
       
         var dd=new Date();
        this.$refs.ImportComp.form.year=dd;
        this.$refs.ImportComp.getOrganizationTree();
          this.$refs.ImportComp.setComBox();
         this.ImportComp.show = true;
        // this.$refs.ImportComp.pageType = 'insert'
        // this.$refs.ImportComp.GetRoleList()
        // this.$refs.ImportComp.getOrganizationTree()
    },
    onImportCompShowChange(val){
      this.ImportComp.show = val 
    },
    onEditReportCompShowChange(val){
      this.EditReportComp.show = val 
    },
    onSaveSuccess(){
      this.getTableList();

    },
    deletesinge(row){
       this.$confirm('是否删除该预算信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                BathDeleteReport([row.id]).then(res => {
                    if(res.success)
                     {
                       if(res.result!="" && res.result!==null && res.result !==undefined){
                          warnMsg(res.result);
                        }
                        else{
                          successMsg("删除成功！");
                        }
                        this.onSaveSuccess()

                    }
                       
                    }
                )
            }).catch(() => {
                
            });
    },
      //批量删除
    onBatchDelete() {
     
      if (this.table.choosedRow.length === 0) {
        warnMsg("请选择要删除的预算信息");
        return;
      }
      this.$confirm("是否确定删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(({ value }) => {
        let arr = this.table.choosedRow.map(item => {
          return item.id;
        });
          this.bthloading=true;
        BathDeleteReport(arr).then(res => {
          if(res.success){
               this.bthloading=false;
                if(res.result!="" && res.result!==null && res.result !==undefined){
                warnMsg(res.result);
              }
              else{
                successMsg("删除成功！");
              }
                
              this.$refs.table.clearSelection();
              this.onSaveSuccess();
          }
        
         
        }) .catch(err=>{
           this.bthloading=false;
        });
      });
    },

    openUpdate(row){
       this.$refs.EditReportComp.pageType = 'update'
      // //this.$refs.editOrganizatonComp.form.name=''
       this.EditReportComp.show = true;
      // //获取组织树
       this.$refs.EditReportComp.getOrganizationTree();
       this.$refs.EditReportComp.setComBox();

       this.$refs.EditReportComp.GetReportById(row.id);
    },
     SubmitReport() {
     
      if (this.table.choosedRow.length === 0) {
        warnMsg("请选择要提交的信息");
        return;
      }
      // var selecs=this.table.choosedRow;
      // if (selecs.filter(item=>item.isSubmit ===true).length>0) {
      //   warnMsg("存在已提交的信息");
      //   return;
      // }
      this.$confirm("是否确定提交", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(({ value }) => {
        let arr = this.table.choosedRow.map(item => {
          return item.id;
        });
        this.bthloading=true;
        SubmitReport({ids:arr,type:this.subtype}).then(res => {
           this.bthloading=false;
           if(res.success){
             if(res.result!=="" && res.result!==null && res.result !==undefined){
             
                  // showmsg+="小数点超过两位，请将该行数据重新核算后导入"
                    htmlMsg(res.result,{type: "warning", duration: 0, showClose: true});

             }
             else{
               successMsg("提交成功");
             }
           }
          this.$refs.table.clearSelection();
          this.onSaveSuccess();
         
        })
        .catch(err=>{
           this.bthloading=false;
        });
      });
    },
      CancelSubmit() {
     
      if (this.table.choosedRow.length === 0) {
        warnMsg("请选择要取消提交的信息");
        return;
      }
     // var selecs=this.table.choosedRow;
      // if (selecs.filter(item=>item.isSubmit !==true).length>0) {
      //   warnMsg("存在未提交的信息");
      //   return;
      // }
      // if (selecs.filter(item=>item.isWithdraw ===true).length>0) {
      //   warnMsg("存在已提交撤回的信息");
      //   return;
      // }
      this.$confirm("是否确定取消提交", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(({ value }) => {
        let arr = this.table.choosedRow.map(item => {
          return item.id;
        });
        this.bthloading=true;
        CancelSubmit({ids:arr,type:this.subtype}).then(res => {
           this.bthloading=false;
           if(res.result!="" && res.result!==null && res.result !==undefined){
               warnMsg(res.result);
             }
             else{
               successMsg("取消提交成功！");
             }
          this.$refs.table.clearSelection();
          this.onSaveSuccess();
         
        })
        .catch(err=>{
           this.bthloading=false;
        });
      });
    },
     AgreeCancelSubmit() {
     
      if (this.table.choosedRow.length === 0) {
        warnMsg("请选择要同意取消提交的信息");
        return;
      }
      // var selecs=this.table.choosedRow;
      // if (selecs.filter(item=>item.isSubmit !==true).length>0) {
      //   warnMsg("存在未提交的信息");
      //   return;
      // }
      //  if (selecs.filter(item=>item.isWithdraw !==true).length>0) {
      //   warnMsg("存在未提交撤回的信息");
      //   return;
      // }
      this.$confirm("是否确定同意取消提交", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(({ value }) => {
        let arr = this.table.choosedRow.map(item => {
          return item.id;
        });
        this.bthloading=true;
        AgreeCancelSubmit({ids:arr,type:this.subtype}).then(res => {
           this.bthloading=false;
            if(res.result!=="" && res.result!==null && res.result !==undefined){
               warnMsg(res.result);
             }
             else{
               successMsg("同意取消提交成功！");
             }
          this.$refs.table.clearSelection();
          this.onSaveSuccess();
         
        })
        .catch(err=>{
           this.bthloading=false;
        });
      });
    },
    BathOperation(val)
    {
      if(this.search.code==="" || this.search.code===null ||this.search.code===undefined)
        {
          warnMsg("请选择公司");
          return;
        }
      this.$confirm("是否确定按照查询条件进行批量操作", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(({ value }) => {
         
        let data=this.search;
        if(this.budyear!=="" && this.budyear!==null && this.budyear!==undefined)
        {
          data.year=this.budyear.getFullYear();

        }
        else{
          data.year=null;
        }
        let query={
          dto:data,
          type:val,
          genre:this.subtype
        }
        this.bthloading=true;
        BathOperation(query).then(res => {
           this.bthloading=false;
            if(res.result!=="" && res.result!==null){
             
                  // showmsg+="小数点超过两位，请将该行数据重新核算后导入"
                    htmlMsg(res.result,{type: "warning", duration: 0, showClose: true});

             }
             else {
               successMsg("操作成功");

             }
          this.$refs.table.clearSelection();
          this.onSaveSuccess();
         
        })
        .catch(err=>{
           this.bthloading=false;
        });
      });
    }

  
  },
  created() {
    this.setComBox();
    this.getOrganizationTree();
  }
  
}
</script>