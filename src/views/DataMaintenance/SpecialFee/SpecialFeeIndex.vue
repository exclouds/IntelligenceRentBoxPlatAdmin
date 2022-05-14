<template>
  <div class="app-container SpecialFee"  v-loading="bthloading">
    <el-form size="mini" @submit.native.prevent label-width="100px">
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
            <el-form-item label="部门：" prop="">
                <el-select v-model="search.depcode"  
                 placeholder="请选择部门" 
                 style="width:100%"  
                 clearable
                 filterable     >
                        <el-option v-for="item in deptreeComp.data" 
                        :key="item.nodeId"
                        :label="item.nodeName" 
                        :value="item.nodeUUid"></el-option>
                    </el-select>   
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="预算类别："  label-width="90px">
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
         <el-col :span="3">
                <el-form-item label="所属年份：" prop="budyear" style="position:relative;" label-width="90px">               
                    <el-date-picker v-model="budyear" 
                    type="year" 
                    placeholder="所属年份"    
                    style="width:100%"
                     ></el-date-picker>    
                </el-form-item>
            </el-col>
             <el-col :span="3">
                <el-form-item label="所属月份：" prop="month" style="position:relative;" label-width="90px">               
                     <el-select v-model="search.month"  placeholder="请选择月份" style="width:100%" clearable filterable>
                        <el-option v-for="item in monthlist" 
                        :key="item.value" 
                        :label="item.label" 
                        :value="item.value">

                        </el-option>
                    </el-select>   
                </el-form-item>
            </el-col>
              <el-col :span="4">
            <el-form-item label="是否提交：" prop="budgettype" >
             <el-select
              v-model="search.IsSubmit"
              placeholder="是否提交"
              clearable
              filterable          
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
            <el-button type="primary" size="mini" @click="openAdd()" v-if="checkBtnPeimission(specialfee.add.permission)">新增</el-button>
          
          <el-popover
            placement="bottom"
            popper-class="btnGroup-popover"
            width="400"
            trigger="hover">
                   <el-button type="primary" size="mini" @click="onBatchDelete()"  v-if="checkBtnPeimission(specialfee.delete.permission)">删除</el-button>
                  <el-button type="primary" size="mini" @click="SubmitSpecialFee()"  v-if="checkBtnPeimission(specialfee.Submitbud.permission)">提交</el-button>
                  <el-button type="primary" size="mini" @click="CancelSubmit()"  v-if="checkBtnPeimission(specialfee.CancelSubmitbud.permission)">取消提交</el-button>
                  <el-button type="primary" size="mini" @click="AgreeCancelSubmit()"  v-if="checkBtnPeimission(specialfee.AgreeCancelSubmitbud.permission)">同意取消提交</el-button>
              <el-button slot="reference" type="primary" size="mini" plain>操作</el-button>
          </el-popover>
          <el-popover
            placement="bottom"
            popper-class="btnGroup-popover"
            width="480"
            trigger="hover">
                  <el-button type="primary" size="mini" @click="BathOperation(4)"  v-if="checkBtnPeimission(specialfee.delete.permission)">批量删除</el-button>
                  <el-button type="primary" size="mini" @click="BathOperation(1)"  v-if="checkBtnPeimission(specialfee.Submitbud.permission)">批量提交</el-button>
                  <el-button type="primary" size="mini" @click="BathOperation(2)"  v-if="checkBtnPeimission(specialfee.CancelSubmitbud.permission)">批量取消提交</el-button>
                  <el-button type="primary" size="mini" @click="BathOperation(3)"  v-if="checkBtnPeimission(specialfee.AgreeCancelSubmitbud.permission)">批量同意取消提交</el-button>
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
          prop="dispalyname"
          label="公司"  
           width="230"    
           sortable="custom"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="depname"
          show-overflow-tooltip
          label="部门"
        width="150"
           sortable="custom"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="budgetType"
          show-overflow-tooltip
          label="预算类别"
         width="120"
           sortable="custom"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="project"
          show-overflow-tooltip
          label="科目"
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
         width="130"
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
            <template slot-scope="scope"  v-if="scope.row.isSubmit!==true  && scope.row.isAllLock!==true && scope.row.isLock!==true">
                <div class="tableBtn"  @click="openUpdate(scope.row)"  v-if="checkBtnPeimission(specialfee.update.permission)">编辑</div>
                <div class="tableBtn"  @click="deletesinge(scope.row)"  v-if="checkBtnPeimission(specialfee.delete.permission)">删除</div>                      
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
     <EditSpecialFee  ref="EditComp" :pshow="EditComp.show" @on-show-change="onEditCompShowChange"
          @on-save-success="onSaveSuccess">
        </EditSpecialFee>
  </div>
</template>
<style lang="scss">
.SpecialFee {
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
import { GetSpecialFeeQueryList,BathDeleteSpecialFee,SubmitSpecialFee,CancelSubmit,AgreeCancelSubmit,BathOperation } from "api/DataMaintenance/SpecialFee";
import EditSpecialFee from  "./EditSpecialFee"
import {warnMsg,successMsg} from 'utils/messageBox'
import {checkBtnPeimission,specialfee} from 'utils/btnRole'

export default {
  name: "SpecialFeeIndex",
  components: { treeSelect,
                tree,EditSpecialFee},
  mixins: [tableMixin],
  data() {
    return {
      specialfee,
      TableDataList:[],//表格数据,显示导入数据
      search:{
         code:"",
         depcode:"",
         month:"",
         budgettype:"",
          IsSubmit:undefined,
        IsWithdraw:undefined
      },
      typeList:[],//借贷放向
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
      getDicListByDitType({ BaseKeyValueTypeCode: "BUDGETTYPE", Code: "", Name: ""  }).then(res => {
        this.typeList = res.result.comboxs;
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
        //根据公司获取部门
        getdeplist(){
            this.search.depcode="";
            this.deptreeComp.data=[];
            GetDeptUnitList({code:this.search.code}).then(res => {
            if(res.success)
                this.deptreeComp.data = res.result
            })

        },
        //树数据回调事件
        onNodeClick(clickNode)   //choosedNodeID
        {
            this.search.code = clickNode.length > 0 ? clickNode[0].nodeUUid : ''
            this.choosedTreeNode=clickNode;
            this.getdeplist();
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
       data.maxResultCount= this.page.pageSize;
       data.skipCount= (this.page.currentPage - 1)*this.page.pageSize;
       data.sorting= this.table.order.sort;
       this.table.loading = true;
       this.$refs.table.clearSelection();
        GetSpecialFeeQueryList(data).then(res => {
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
       this.$confirm('是否删除该特殊费用?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                BathDeleteSpecialFee([row.id]).then(res => {
                    if(res.success){
                        this.getTableList();
                         if(res.result!="" && res.result!==null){
                            warnMsg(res.result);
                          }
                          else{
                            successMsg("删除成功！");
                          }
                      }

                    }
                )
            }).catch(() => {
                
            });
    },
     //批量删除
    onBatchDelete() {
     
      if (this.table.choosedRow.length === 0) {
        warnMsg("请选择要删除的特殊费用");
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
        BathDeleteSpecialFee(arr).then(res => {
           this.bthloading=false;
            if(res.result!="" && res.result!==null){
               warnMsg(res.result);
             }
             else{
               successMsg("删除成功！");
             }

          this.$refs.table.clearSelection();
          this.getTableList();
         
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

      this.$refs.EditComp.GetSpecialFeeById(row.id);
    },
    openAdd(){
      this.EditComp.show = true
      this.$refs.EditComp.pageType = 'insert'
      this.$refs.EditComp.setComBox();
       this.$refs.EditComp.getOrganizationTree();
          this.$refs.EditComp.getprojectlis('');
    },
      SubmitSpecialFee() {
     
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
        SubmitSpecialFee(arr).then(res => {
           this.bthloading=false;
            if(res.result!="" && res.result!==null){
               warnMsg(res.result);
             }
             else{
               successMsg("提交成功！");
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
           this.bthloading=false;
            if(res.result!="" && res.result!==null){
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
           this.bthloading=false;
            if(res.result!=="" && res.result!==null){
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
          type:val
        }
        this.bthloading=true;
        BathOperation(query).then(res => {
           this.bthloading=false;
          this.$refs.table.clearSelection();
          this.onSaveSuccess();
           if(res.result!="" && res.result!==null){
               warnMsg(res.result);
             }
             else{
               successMsg("批量操作成功！");
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