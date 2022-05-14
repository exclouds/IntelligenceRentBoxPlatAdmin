<template>
  <div class="app-container OtherInsideTransaction"  v-loading="bthloading">
    <el-form size="mini" @submit.native.prevent label-width="90px">
    <el-row>
         
          <el-col :span="4">
            <el-form-item label="BU："  label-width="70px">
             <el-select
              v-model="search.PreparationUnit"
              placeholder="BU"
             
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
         <el-col :span="3">
                <el-form-item label="所属年份：" prop="budyear" style="position:relative;">               
                    <el-date-picker v-model="budyear" 
                    type="year" 
                    placeholder="所属年份"    
                    style="width:100%"
                     ></el-date-picker>    
                </el-form-item>
            </el-col>
             <el-col :span="4">
                <el-form-item label="所属月份：" prop="month" style="position:relative;" >               
                     <el-select v-model="search.month"  
                     placeholder="请选择月份" 
                     style="width:100%" 
                     clearable filterable
                     multiple collapse-tags
                     >
                        <el-option v-for="item in monthlist" 
                        :key="item.value" 
                        :label="item.label" 
                        :value="item.value">

                        </el-option>
                    </el-select>   
                </el-form-item>
            </el-col>
              <el-col :span="4">
            <el-form-item label="是否提交：" prop="budgettype">
             <el-select
              v-model="search.IsSubmit"
              placeholder="是否提交"
              clearable
              filterable     
              style="width:100%"     
            >
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
            </el-form-item>
          </el-col>
    <!-- </el-row>
    <el-row> -->
            <el-col :span="4">
            <el-form-item label="是否撤回：" prop="budgettype" >
             <el-select
              v-model="search.IsWithdraw"
              placeholder="是否撤回"
              clearable
              filterable          
            >
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
            </el-form-item>
          </el-col>
        <el-col :span="5">
          <el-form-item label prop label-width="10px">
           <el-button type="primary" size="mini" @click="getTableList()">搜索</el-button>       
            <!-- <el-button type="primary" size="mini" @click="openAdd()" v-if="checkBtnPeimission(OtherInsideTransaction.add.permission)">新增</el-button> -->
         
           <el-popover
            placement="bottom"
            popper-class="btnGroup-popover"
       
            trigger="hover">
                  <el-button type="primary" size="mini" @click="onBatchDelete()"  v-if="checkBtnPeimission(OtherInsideTransaction.delete.permission)">删除</el-button> 
                  <el-button type="primary" size="mini" @click="SubmitData()"  v-if="checkBtnPeimission(OtherInsideTransaction.Submitbud.permission)">提交</el-button>
                  <el-button type="primary" size="mini" @click="CancelSubmit()"  v-if="checkBtnPeimission(OtherInsideTransaction.CancelSubmitbud.permission)">取消提交</el-button>
                  <el-button type="primary" size="mini" @click="AgreeCancelSubmit()"  v-if="checkBtnPeimission(OtherInsideTransaction.AgreeCancelSubmitbud.permission)">同意取消提交</el-button>
                  <el-button type="primary" size="mini" @click="InitInsideMonthData()"  v-if="checkBtnPeimission(OtherInsideTransaction.update.permission)">初始化数据</el-button>
            
              <el-button slot="reference" type="primary" size="mini" plain>操作</el-button>
          </el-popover>
          <el-popover
            placement="bottom"
            popper-class="btnGroup-popover"
           
            trigger="hover">
                  <el-button type="primary" size="mini" @click="BathOperation(4)"  v-if="checkBtnPeimission(OtherInsideTransaction.delete.permission)">批量删除</el-button>
                  <el-button type="primary" size="mini" @click="BathOperation(1)"  v-if="checkBtnPeimission(OtherInsideTransaction.Submitbud.permission)">批量提交</el-button>
                  <el-button type="primary" size="mini" @click="BathOperation(2)"  v-if="checkBtnPeimission(OtherInsideTransaction.CancelSubmitbud.permission)">批量取消提交</el-button>
                  <el-button type="primary" size="mini" @click="BathOperation(3)"  v-if="checkBtnPeimission(OtherInsideTransaction.AgreeCancelSubmitbud.permission)">批量同意取消提交</el-button>
                  <el-button type="primary" size="mini" @click="BathOperation(5)"  v-if="checkBtnPeimission(OtherInsideTransaction.update.permission)">批量初始化数据</el-button>
                  
              <el-button slot="reference" type="primary" size="mini" plain>查询批量操作</el-button>
          </el-popover>
               <el-button type="primary" size="mini" @click="Importdata()" v-if="checkBtnPeimission(OtherInsideTransaction.update.permission)">导入</el-button>   
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
        height="calc(100% - 90px)"
        style="width: 100%"
        ref="table"
        @sort-change="sortChange"
        @selection-change="onSelectChange"
      >
       <el-table-column :reserve-selection="true" type="selection" width="40"></el-table-column>
        <el-table-column type="index" align="center" label="序号" width="50"   fixed="left">
          <template slot-scope="scope">{{countIndex(scope.$index)}}</template>
        </el-table-column>
       
        <el-table-column
          align="center"
          prop="displayName"
          label="公司"       
           sortable="custom"
            width="200"
           fixed="left"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="preparationUnit"
          show-overflow-tooltip
          label="BU"
          width="120"
           sortable="custom"
            fixed="left"
        ></el-table-column>      
        <el-table-column
          align="center"
          prop="year"
          show-overflow-tooltip
          label="年"
          width="100"
           sortable="custom"
            fixed="left"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="month"
          show-overflow-tooltip
          label="月"
          width="80"
           sortable="custom"
            fixed="left"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="mainBusinessInc"
          show-overflow-tooltip
          label="主营业务收入"
            width="120"
           sortable="custom"
        >
        </el-table-column>
         <el-table-column
          align="center"
          prop="otherBusinessInc"
          show-overflow-tooltip
          label="其他业务收入"
            width="120"
           sortable="custom"
        >
        </el-table-column>
         <el-table-column
          align="center"
          prop="mainBusinessCost"
          show-overflow-tooltip
          label="主营业务成本"
            width="120"
           sortable="custom"
        >
        </el-table-column>
         <el-table-column
          align="center"
          prop="otherBusinessCost"
          show-overflow-tooltip
          label="其他业务成本"
            width="120"
           sortable="custom"
        >
        </el-table-column>
         <el-table-column
          align="center"
          prop="salesExpense"
          show-overflow-tooltip
          label="销售费用"
            width="120"
           sortable="custom"
        >
        </el-table-column>
          <el-table-column
          align="center"
          prop="managementCosts"
          show-overflow-tooltip
          label="管理费用"
            width="120"
           sortable="custom"
        >
        </el-table-column>
         <el-table-column
          align="center"
          prop="rdExpense"
          show-overflow-tooltip
          label="研发费用"
            width="120"
           sortable="custom"
        >
        </el-table-column>

         <el-table-column
          align="center"
          prop="accumulMainBusinessInc"
          show-overflow-tooltip
          label="累计主营业务收入"
            width="150"
           sortable="custom"
        >
        </el-table-column>
         <el-table-column
          align="center"
          prop="accumulOtherBusinessInc"
          show-overflow-tooltip
          label="累计其他业务收入"
            width="150"
           sortable="custom"
        >
        </el-table-column>
         <el-table-column
          align="center"
          prop="accumulMainBusinessCost"
          show-overflow-tooltip
          label="累计主营业务成本"
            width="150"
           sortable="custom"
        >
        </el-table-column>
         <el-table-column
          align="center"
          prop="accumulOtherBusinessCost"
          show-overflow-tooltip
          label="累计其他业务成本"
            width="150"
           sortable="custom"
        >
        </el-table-column>
         <el-table-column
          align="center"
          prop="accumulSalesExpense"
          show-overflow-tooltip
          label="累计销售费用"
            width="150"
           sortable="custom"
        >
        </el-table-column>
          <el-table-column
          align="center"
          prop="accumulManagementCosts"
          show-overflow-tooltip
          label="累计管理费用"
            width="150"
           sortable="custom"
        >
        </el-table-column>
         <el-table-column
          align="center"
          prop="accumulRDExpense"
          show-overflow-tooltip
          label="累计研发费用"
            width="120"
           sortable="custom"
        >
        </el-table-column>

         <el-table-column
          align="center"
          prop="remarks"
          show-overflow-tooltip
          label="备注"
           width="200"
           sortable="custom"
        >
        </el-table-column>
        <el-table-column
                  align="center"
                  prop="isSubmit"
                  label="是否提交"
                  width="100"
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
                  label="是否撤回"
                  width="100"
                  :show-overflow-tooltip="true"
                   sortable="custom"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row.isWithdraw?"是":"否"}}</span>
                  </template>
                </el-table-column>
                 <!-- <el-table-column
                  align="center"
                  prop="islock"
                  label="是否锁账"
                  width="100"
                  :show-overflow-tooltip="true"
                   
                >
                  <template slot-scope="scope">
                    <span>{{(scope.row.isAllLock || scope.row.isLock)?"是":"否"}}</span>
                  </template>
                </el-table-column> -->
         <el-table-column align="center" label="操作" width="130" fixed="right">
            <template slot-scope="scope"   v-if="scope.row.isSubmit!==true  && scope.row.isAllLock!==true && scope.row.isLock!==true">
                <div class="tableBtn"  @click="openUpdate(scope.row)" v-if="checkBtnPeimission(OtherInsideTransaction.update.permission)">编辑</div>
                <div class="tableBtn"  @click="deletesinge(scope.row)" 
                v-if="checkBtnPeimission(OtherInsideTransaction.delete.permission) && scope.row.id !==''&& scope.row.id !==null && scope.row.id !==undefined">删除</div>                      
            </template>
          </el-table-column>
      
      </el-table>
      <el-pagination
        style="margin-top:10px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        :total="page.total"
        :page-sizes="page.pageSelectArr"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
     <EditInsideTransaction  ref="EditComp" :pshow="EditComp.show" @on-show-change="onEditCompShowChange"
          @on-save-success="onSaveSuccess">
        </EditInsideTransaction>
        <InsideTransImport ref="ImportComp" :pshow="ImportComp.show" @on-show-change="onImportCompShowChange"
          @on-save-success="onSaveSuccess">
        </InsideTransImport>
  </div>
</template>
<style lang="scss">
.OtherInsideTransaction {
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
import { getDicListByDitType } from "api/publicBase/dictionaryMng";
import treeSelect from 'components/treeSelect/treeSelect'
import tree from 'components/tree/tree'
import {getOrganizatonTreeNoUsers} from 'api/user/organization'
import { PostInTransactQueryList,BathDeleteInTransact,SubmitData 
,CancelSubmit,AgreeCancelSubmit,BathOperation 
,InitInsideMonthData} from "api/DataMaintenance/OtherInsideTransaction";
import EditInsideTransaction from  "./EditInsideTransaction"
import {warnMsg,successMsg} from 'utils/messageBox'
import {checkBtnPeimission,OtherInsideTransaction} from 'utils/btnRole'
import { GetInsideBuComboBox } from "api/publicBase/Combox";
import InsideTransImport from './InsideTransImport'


export default {
  name: "OtherInsideTransactionIndex",
  components: { treeSelect,InsideTransImport,
                tree,EditInsideTransaction},
  mixins: [tableMixin],
  data() {
    return {
      OtherInsideTransaction,
      TableDataList:[],//表格数据,显示导入数据
      search:{
         code:"",     
         month:[new Date().getMonth()+1],
         PreparationUnit:"",
         IsSubmit:undefined,
         IsWithdraw:undefined
      },
      typeList:[],//bu类别
      bthloading:false,
      EditComp: {
          show: false
      },
      ImportComp: {
          show: false
      },
       treeComp: {
              show: false,
              data: [],
              choosedTreeNodeId: [],  //回显树节点ID
          },
      deptreeComp: {
          data: [],
      },
      choosedTreeNode: [],
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
    checkBtnPeimission,
    getRowKeys(row) {
            return row.id;
    },
     //添加查询combox
    setComBox() {
      GetInsideBuComboBox().then((res) => {
        this.typeList = res.result;
        if(res.result.length>0){
          this.search.PreparationUnit=this.typeList[0].value;
          //  this.typeList.splice(
          //   this.typeList.findIndex((item1) => item1.value === "青岛全球"),
          //   1
          // );
          // var ii=  this.typeList.findIndex((item1) => item1.value === "青岛全球");
          // if(ii>-1){
          //     this.typeList.splice(ii,1 );

          // }
          //  if(this.typeList.length>0){
          //     this.search.PreparationUnit=this.typeList[0].value;
          //  }
        }
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
                  this.treeComp.choosedTreeNodeId=[res.result[0].nodeId]
                }
            })
        },
    
        //树数据回调事件
        onNodeClick(clickNode)   //choosedNodeID
        {
            this.search.code = clickNode.length > 0 ? clickNode[0].nodeUUid : ''
            this.choosedTreeNode=clickNode;
           
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
    //获取国家列表
    getTableList() {
       if(this.search.PreparationUnit==="" || this.search.PreparationUnit===null ||this.search.PreparationUnit===undefined)
      {
        warnMsg("请选择BU");
        return;
      }
       if(this.budyear==="" || this.budyear===null || this.budyear===undefined) {
             warnMsg("请选择所属时间");
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
       data.maxResultCount= this.page.pageSize;
       data.skipCount= (this.page.currentPage - 1)*this.page.pageSize;
       data.sorting= this.table.order.sort;
       this.table.loading = true;
       this.$refs.table.clearSelection();
        PostInTransactQueryList(data).then(res => {
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
    deletesinge(row){
       this.$confirm('是否删除该数据?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                BathDeleteInTransact([row.id]).then(res => {             
                    if(res.success){
                        if(res.result!="" && res.result!==null){
                          warnMsg(res.result);
                        }
                        else{
                          successMsg("删除成功！");
                        }
                        this.getTableList();
                    }      
                  }
                )
            }).catch(() => {
                
            });
    },
     //批量删除
    onBatchDelete() {
     
      if (this.table.choosedRow.length === 0) {
        warnMsg("请选择要删除的数据");
        return;
      }
      this.$confirm("是否确定删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(({ value }) => {
       let arr = this.table.choosedRow.filter(item=>item.id!=="" && item.id!==null && item.id!==undefined).map(item => {
         return item.id;
          
        });
         if (arr.length === 0) {
          warnMsg("请选择已编辑的信息");
          return;
        }
          this.bthloading=true;
        BathDeleteInTransact(arr).then(res => {
           if(res.success)
          {
            this.bthloading=false;
            this.$refs.table.clearSelection();
            this.getTableList();
             if(res.result!="" && res.result!==null){
               warnMsg(res.result);
             }
             else{
               successMsg("删除成功！");
             }

          }
           
         
        }) .catch(err=>{
           this.bthloading=false;
        });
      });
    },
     onSaveSuccess(){
      this.getTableList();
    },
    
    onEditCompShowChange(val){
      this.EditComp.show = val 
    },
    onImportCompShowChange(val){
      this.ImportComp.show = val 
    },
    openUpdate(row){
      if(row.id==="" || row.id===null || row.id===undefined)
      {
         this.$refs.EditComp.pageType = 'insert';
         this.$refs.EditComp.form.code=row.code;
         this.$refs.EditComp.form.preparationUnit=row.bu;         
          this.$refs.EditComp.setbudtime(row);

      }
      else{
        this.$refs.EditComp.pageType = 'update';
         this.$refs.EditComp.GetInTransactById(row.id);

      }
       
      this.EditComp.show = true;    
      this.$refs.EditComp.setComBox();
       this.$refs.EditComp.getOrganizationTree();

     
    },
    openAdd(){
      this.EditComp.show = true
      this.$refs.EditComp.pageType = 'insert'
      this.$refs.EditComp.setComBox();
      this.$refs.EditComp.getOrganizationTree();


    },
     SubmitData() {
     
      if (this.table.choosedRow.length === 0) {
        warnMsg("请选择要提交的信息");
        return;
      }
      
      this.$confirm("是否确定提交", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(({ value }) => {
        let arr = this.table.choosedRow.filter(item=>item.id!=="" && item.id!==null && item.id!==undefined).map(item => {
         return item.id;
          
        });
        if (arr.length === 0) {
          warnMsg("请选择已编辑的信息");
          return;
        }
        this.bthloading=true;
        SubmitData(arr).then(res => {
           if(res.success)
          {
            this.bthloading=false;
            this.$refs.table.clearSelection();
            this.onSaveSuccess();
             if(res.result!="" && res.result!==null){
               warnMsg(res.result);
             }
             else{
               successMsg("提交成功！");
             }

          }
           
         
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
    
      this.$confirm("是否确定取消提交", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(({ value }) => {
        let arr = this.table.choosedRow.filter(item=>item.id!=="" && item.id!==null && item.id!==undefined).map(item => {
         return item.id;
          
        });
         if (arr.length === 0) {
          warnMsg("请选择已编辑的信息");
          return;
        }
        this.bthloading=true;
        CancelSubmit(arr).then(res => {
           if(res.success)
          {
            this.bthloading=false;         
             if(res.result!="" && res.result!==null){
               warnMsg(res.result);
             }
             else{
               successMsg("取消提交成功！");
             }

          }
           this.bthloading=false;
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
      var selecs=this.table.choosedRow;
     
      this.$confirm("是否确定同意取消提交", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(({ value }) => {
         let arr = this.table.choosedRow.filter(item=>item.id!=="" && item.id!==null && item.id!==undefined).map(item => {
         return item.id;
          
        });
         if (arr.length === 0) {
          warnMsg("请选择已编辑的信息");
          return;
        }
        this.bthloading=true;
        AgreeCancelSubmit(arr).then(res => {
           if(res.success)
          {
            this.bthloading=false;
           
             if(res.result!=="" && res.result!==null){
               warnMsg(res.result);
             }
             else{
               successMsg("同意取消提交成功！");
             }

          }
           this.bthloading=false;
          this.$refs.table.clearSelection();
          this.onSaveSuccess();
         
        })
        .catch(err=>{
           this.bthloading=false;
        });
      });
    },
     InitInsideMonthData() {
     
      if (this.table.choosedRow.length === 0) {
        warnMsg("请选择要初始化数据的信息");
        return;
      }
      var selecs=this.table.choosedRow;
     
      this.$confirm("是否确定初始化数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(({ value }) => {
         let arr = this.table.choosedRow.filter(item=>item.id!=="" && item.id!==null && item.id!==undefined).map(item => {
         return item.id;
          
        });
         if (arr.length === 0) {
          warnMsg("请选择已编辑的信息");
          return;
        }
        this.bthloading=true;
        InitInsideMonthData(arr).then(res => {
           if(res.success)
          {
            this.bthloading=false;
           
             if(res.result!=="" && res.result!==null){
               warnMsg(res.result);
             }
             else{
               successMsg("初始化数据成功！");
             }

          }
           this.bthloading=false;
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
      if(this.search.PreparationUnit==="" || this.search.PreparationUnit===null ||this.search.PreparationUnit===undefined)
      {
        warnMsg("请选择BU");
        return;
      }
       if(this.budyear==="" || this.budyear===null || this.budyear===undefined) {
             warnMsg("请选择所属时间");
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
          type:val
        }
        this.bthloading=true;
        BathOperation(query).then(res => {
          
          if(res.success)
          {
            this.bthloading=false;
            this.$refs.table.clearSelection();
             this.onSaveSuccess();
             if(res.result!="" && res.result!==null){
               warnMsg(res.result);
             }
             else{
               successMsg("批量操作成功！");
             }

          }
         
         
        })
        .catch(err=>{
           this.bthloading=false;
        });
      });
    },
   Importdata(){
         this.$refs.ImportComp.setComBox();
         this.ImportComp.show = true;
      
    },

  
  },
  created() {
    this.setComBox();
   // this.getOrganizationTree();
  }
  
}
</script>