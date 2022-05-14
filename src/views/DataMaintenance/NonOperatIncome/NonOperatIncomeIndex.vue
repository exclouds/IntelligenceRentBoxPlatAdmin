<template>
  <div class="app-container NonOperatIncome"  v-loading="bthloading">
    <el-form size="mini" @submit.native.prevent label-width="90px">
    <el-row>
         <el-col :span="5">
               <el-form-item label="公司：" prop="" style="position:relative;" >            
                    
                    <tree-select ref="chooseEquNode" @on-treeShow-change="ontreeShowChange" :choosedEquipmentNode="choosedTreeNode" style="width:100%"></tree-select>
                    <div class="editOrgComp-row-tree" v-show="treeComp.show" >                      
                        <tree ref='treeComp' :pCheckStrictly="true" :radio="true" :pTreeDefaultProps="treeComp.treeConfig" :pTreeData="treeComp.data" :pChoosedNode="treeComp.choosedTreeNodeId"
                          @on-nodeChange="onNodeClick" @on-outside-click="onClickOutSide"></tree>  
                    </div>
                </el-form-item>
           
          </el-col>  
            <el-col :span="4">
            <el-form-item label="科目名称："  >
             <el-select
              v-model="search.LinNO"
              placeholder="科目名称"
              clearable
              filterable          
              multiple collapse-tags
            >
              <el-option
                v-for="item in linoList"
                :key="item.id"
                :label="item.projectName"
                :value="item.linNO"
              ></el-option>
            </el-select>
            </el-form-item>
          </el-col>      
          <el-col :span="4">
            <el-form-item label="项目名称："  >
             <el-select
              v-model="search.ProjectCode"
              placeholder="项目名称"
              clearable
              filterable          
              multiple collapse-tags
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
                <el-form-item label="所属年份：" prop="budyear" style="position:relative;" >               
                    <el-date-picker v-model="budyear" 
                    type="year" 
                    placeholder="所属年份"    
                    style="width:100%"
                     ></el-date-picker>    
                </el-form-item>
            </el-col>
             <el-col :span="4">
                <el-form-item label="所属月份：" prop="month" style="position:relative;" >               
                     <el-select v-model="search.Month"  placeholder="请选择月份"
                      style="width:100%"
                       clearable filterable
                       multiple collapse-tags>
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
    </el-row>
    <el-row>
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
            <el-button type="primary" size="mini" @click="openAdd()" v-if="checkBtnPeimission(NonOperatIncome.add.permission)">新增</el-button>
         
           <el-popover
            placement="bottom"
            popper-class="btnGroup-popover"
            width="400"
            trigger="hover">
                  <el-button type="primary" size="mini" @click="onBatchDelete()"  v-if="checkBtnPeimission(NonOperatIncome.delete.permission)">删除</el-button> 
                  <el-button type="primary" size="mini" @click="SubmitData()"  v-if="checkBtnPeimission(NonOperatIncome.Submitbud.permission)">提交</el-button>
                  <el-button type="primary" size="mini" @click="CancelSubmit()"  v-if="checkBtnPeimission(NonOperatIncome.CancelSubmitbud.permission)">取消提交</el-button>
                  <el-button type="primary" size="mini" @click="AgreeCancelSubmit()"  v-if="checkBtnPeimission(NonOperatIncome.AgreeCancelSubmitbud.permission)">同意取消提交</el-button>
              <el-button slot="reference" type="primary" size="mini" plain>操作</el-button>
          </el-popover>
          <el-popover
            placement="bottom"
            popper-class="btnGroup-popover"
            width="480"
            trigger="hover">
                  <el-button type="primary" size="mini" @click="BathOperation(4)"  v-if="checkBtnPeimission(NonOperatIncome.delete.permission)">批量删除</el-button>
                  <el-button type="primary" size="mini" @click="BathOperation(1)"  v-if="checkBtnPeimission(NonOperatIncome.Submitbud.permission)">批量提交</el-button>
                  <el-button type="primary" size="mini" @click="BathOperation(2)"  v-if="checkBtnPeimission(NonOperatIncome.CancelSubmitbud.permission)">批量取消提交</el-button>
                  <el-button type="primary" size="mini" @click="BathOperation(3)"  v-if="checkBtnPeimission(NonOperatIncome.AgreeCancelSubmitbud.permission)">批量同意取消提交</el-button>
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
        height="calc(100% - 130px)"
        style="width: 100%"
        ref="table"
        @sort-change="sortChange"
        @selection-change="onSelectChange"
      >
       <el-table-column :reserve-selection="true" type="selection" width="40"></el-table-column>
        <el-table-column type="index" align="center" label="序号" width="50">
          <template slot-scope="scope">{{countIndex(scope.$index)}}</template>
        </el-table-column>
       
        <el-table-column
          align="center"
          prop="displayName"
          label="公司"       
           sortable="custom"
            width="230"
           
        ></el-table-column>
         <el-table-column
          align="center"
          prop="parentproject"
          show-overflow-tooltip
          label="科目名称"
          width="150"
           sortable="custom"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="projectName"
          show-overflow-tooltip
          label="项目名称"
          width="150"
           sortable="custom"
        ></el-table-column>
      
      
        <el-table-column
          align="center"
          prop="year"
          show-overflow-tooltip
          label="年"
          width="100"
           sortable="custom"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="month"
          show-overflow-tooltip
          label="月"
          width="80"
           sortable="custom"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="amount"
          show-overflow-tooltip
          label="金额"
            width="120"
           sortable="custom"
        >
        </el-table-column>
         <el-table-column
          align="center"
          prop="remarks"
          show-overflow-tooltip
          label="备注"
         
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
                 <el-table-column
                  align="center"
                  prop="islock"
                  label="是否锁账"
                  width="100"
                  :show-overflow-tooltip="true"
                   
                >
                  <template slot-scope="scope">
                    <span>{{(scope.row.isAllLock || scope.row.isLock)?"是":"否"}}</span>
                  </template>
                </el-table-column>
         <el-table-column align="center" label="操作" width="130" >
            <template slot-scope="scope"   v-if="scope.row.isSubmit!==true  && scope.row.isAllLock!==true && scope.row.isLock!==true">
                <div class="tableBtn"  @click="openUpdate(scope.row)" v-if="checkBtnPeimission(NonOperatIncome.update.permission)">编辑</div>
                <div class="tableBtn"  @click="deletesinge(scope.row)" v-if="checkBtnPeimission(NonOperatIncome.delete.permission)">删除</div>                      
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
     <EditNonOperatIncome  ref="EditComp" :pshow="EditComp.show" @on-show-change="onEditCompShowChange"
          @on-save-success="onSaveSuccess">
        </EditNonOperatIncome>
  </div>
</template>
<style lang="scss">
.NonOperatIncome {
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
import {getOrganizatonTreeNoUsers,GetDeptUnitList} from 'api/user/organization'
import {GetLinNoList, PostNonOperatQueryList,BathDeleteNonOperat,SubmitData ,CancelSubmit,AgreeCancelSubmit,BathOperation } from "api/DataMaintenance/NonOperatIncome";
import EditNonOperatIncome from  "./EditNonOperatIncome"
import {warnMsg,successMsg} from 'utils/messageBox'
import {checkBtnPeimission,NonOperatIncome} from 'utils/btnRole'

export default {
  name: "NonOperatIncomeIndex",
  components: { treeSelect,
                tree,EditNonOperatIncome},
  mixins: [tableMixin],
  data() {
    return {
      NonOperatIncome,
      linoList:[],//行号项目
      TableDataList:[],//表格数据,显示导入数据
      search:{
         Code:"",
         LinNO:[],
         ProjectCode:[],
         Month:[],
         budgettype:"",
         IsSubmit:undefined,
         IsWithdraw:undefined
      },
      typeList:[],//非营业项目下拉
      bthloading:false,
      EditComp: {
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
            this.search.Code = clickNode.length > 0 ? clickNode[0].nodeUUid : ''
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
       if(this.search.Code==="" || this.search.Code===null ||this.search.Code===undefined)
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
       data.maxResultCount= this.page.pageSize;
       data.skipCount= (this.page.currentPage - 1)*this.page.pageSize;
       data.sorting= this.table.order.sort;
       this.table.loading = true;
       this.$refs.table.clearSelection();
        PostNonOperatQueryList(data).then(res => {
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
                BathDeleteNonOperat([row.id]).then(res => {             
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
        let arr = this.table.choosedRow.map(item => {
          return item.id;
        });
          this.bthloading=true;
        BathDeleteNonOperat(arr).then(res => {
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
    openUpdate(row){
       this.$refs.EditComp.pageType = 'update'
      this.EditComp.show = true;    
      this.$refs.EditComp.setComBox();
       this.$refs.EditComp.getOrganizationTree();

      this.$refs.EditComp.GetNonOperatById(row.id);
    },
    openAdd(){
      this.EditComp.show = true
      this.$refs.EditComp.pageType = 'insert'
      this.$refs.EditComp.setComBox();
      this.$refs.EditComp.getOrganizationTree();
       this.$refs.EditComp.getprojectlis('');


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
        let arr = this.table.choosedRow.map(item => {
          return item.id;
        });
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
        let arr = this.table.choosedRow.map(item => {
          return item.id;
        });
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
        let arr = this.table.choosedRow.map(item => {
          return item.id;
        });
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
    BathOperation(val)
    {
       if(this.search.Code==="" || this.search.Code===null ||this.search.Code===undefined)
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
    }

  
  },
  created() {
    this.setComBox();
    this.getOrganizationTree();
  }
  
}
</script>