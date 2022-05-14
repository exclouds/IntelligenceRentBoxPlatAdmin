<template>
  <div class="app-container budgetreport" v-loading="bthloading">
    <el-form size="mini" @submit.native.prevent label-width="70px">
      <el-row>
        <el-col :span="5">
          <el-form-item label="公司：" prop="" style="position: relative">
            <tree-select
              ref="chooseEquNode"
              @on-treeShow-change="ontreeShowChange"
              :choosedEquipmentNode="choosedTreeNode"
              style="width: 100%"
            ></tree-select>
            <div class="editOrgComp-row-tree" v-show="treeComp.show">
              <tree
                ref="treeComp"
                :pCheckStrictly="true"
                :radio="true"
                :pTreeDefaultProps="treeComp.treeConfig"
                :pTreeData="treeComp.data"
                :pChoosedNode="treeComp.choosedTreeNodeId"
                @on-nodeChange="onNodeClick"
                @on-outside-click="onClickOutSide"
              ></tree>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="部门归属：" prop="" label-width="90px">
            <el-select
              v-model="selectdep"
              placeholder="请选择部门"
              style="width: 100%"
              multiple
              collapse-tags
              clearable
              filterable
            >
              <el-option
                v-for="item in deptreeComp.data"
                :key="item.nodeId"
                :label="item.nodeName"
                :value="item.nodeName"
              ></el-option>
            </el-select>
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
        <el-col :span="4">
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
        <el-col :span="4">
          <el-form-item label="预算类别：" prop="BudgetType" label-width="90px">
            <el-select
              v-model="selectbud"
              placeholder="预算类别"
              clearable
              filterable
              multiple
              collapse-tags
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

        <el-col :span="4">
          <el-form-item label="是否查询调整事项：" label-width="150px">
            <el-select
              v-model="search.Special"
              placeholder="是否查询调整事项"
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
        <el-col :span="5">
          <el-form-item label="是否查询所有部门：" label-width="150px">
            <el-select
              v-model="search.AllDep"
              placeholder="是否查询所有部门"             
              filterable
            >
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="是否查询所有报表：" label-width="150px">
            <el-select
              v-model="search.AllReport"
              placeholder="是否查询所有报表"
             
              filterable
            >
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label prop label-width="10px">
            <el-button type="primary" size="mini" @click="getTableList()"
              >搜索</el-button
            >
          
            <el-button type="primary" size="mini" @click="Importdata()" :loading="bthloading" v-if="checkBtnPeimission(reportquery.export.permission)">导出</el-button> 
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-tabs v-model="tabActiveName" type="card">
      <el-tab-pane
        v-for="(item, index) in TableDataList"
        :key="index"
        :label="item.sheetName"
        :name="'budget' + index"
      >
       <div style="overflow:scroll;width:100%;height:680px" :id="'out-table-'+index"> 
         <el-table
            :cell-class-name="tableRowClassName"
                v-loading="table.loading"
                :data="TableDataList[index].data"
                :span-method="arraySpanMethod"
                :row-key = "getRowKeys"
                border
                stripe
                highlight-current-row
                fit
                :height="item.isjust ===true ?'500px':'100%'"
                style="width: 100%"
                ref="table"
              
                @selection-change="onSelectChange"
            >
            
               <el-table-column
                align="center"
                prop="linNO"
                label="行号"
                show-overflow-tooltip
                fixed="left"
                 width="80"
                >        
                </el-table-column>
              
                <!-- <el-table-column
                  align="center"         
                  label="项目"
                  show-overflow-tooltip   
                  

                >      
                    
                </el-table-column>            -->
                 <el-table-column
                      align="center"
                      prop="showparentprojectName"
                      label="项目"
                      show-overflow-tooltip                   
                      width="150"
                       fixed="left"
                    >     
                 
                    </el-table-column> 
                    <el-table-column
                      align="center"
                      prop="projectName"
                      label="项目"
                      show-overflow-tooltip
                      fixed="left"
                      width="150"
                    >        
                    </el-table-column> 
                <el-table-column
                 align="center"              
                 :label="item.isjust ===true?'本年累计数':' 全年情况'"
                 show-overflow-tooltip             
                >  
                    <el-table-column
                    align="center"
                    prop="fullYearBudget"
                    :label="item.isjust ===true?'本年实际数':' 全年预算合计'"
                    show-overflow-tooltip
                    fixed="left"
                      width="130"
                    >        
                    </el-table-column>
                      <el-table-column
                        align="center"
                        prop="fullYearActual"
                        :label="item.isjust ===true?'调整项':' 实际完成合计'"
                        show-overflow-tooltip
                        fixed="left"
                          width="130"
                        >        
                        </el-table-column>
                          <el-table-column
                        align="center"
                        prop="fullYearBudgetSchedule"
                        :label="item.isjust ===true?'调整后实际数':' 完成预算进度%'"
                        show-overflow-tooltip
                        fixed="left"
                          width="130"
                        >        
                        </el-table-column>
                          <el-table-column
                        align="center"
                        prop="fullYearCumulativeBudget"
                        label="累计预算数"
                        show-overflow-tooltip
                        fixed="left"
                          width="130"
                          v-if="item.isjust !==true"
                        >        
                        </el-table-column>
                          <el-table-column
                        align="center"
                        prop="fullYearCumulativeBC"
                        label="累计预算完成"
                        show-overflow-tooltip
                        fixed="left"
                        width="130"
                          v-if="item.isjust !==true"
                        >        
                        </el-table-column>                   
                </el-table-column>
                <el-table-column
                 align="center"              
                 label="1月"
                 show-overflow-tooltip             
                >   
                  <el-table-column
                    align="center"
                    prop="januaryBudget"
                    :label="item.isjust ===true?'当月实际数':' 当月预算数'"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                   <el-table-column
                    align="center"
                    prop="januaryAcctual"
                    :label="item.isjust ===true?'调整项':' 当月实际数'"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                   <el-table-column
                    align="center"
                    prop="januaryBudgetCompletedl"
                    :label="item.isjust ===true?'调整后实际数':' 预算完成%'"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                </el-table-column>
             
                <el-table-column
                 align="center"              
                 label="2月"
                 show-overflow-tooltip             
                >   
                  <el-table-column
                    align="center"
                    prop="februaryBudget"
                    :label="item.isjust ===true?'当月实际数':' 当月预算数'"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                   <el-table-column
                    align="center"
                    prop="februaryAcctual"
                    :label="item.isjust ===true?'调整项':' 当月实际数'"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                   <el-table-column
                    align="center"
                    prop="februaryBudgetCompletedl"
                    :label="item.isjust ===true?'调整后实际数':' 预算完成%'"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                </el-table-column>
                 <el-table-column
                 align="center"              
                 label="3月"
                 show-overflow-tooltip             
                >   
                  <el-table-column
                    align="center"
                    prop="marchBudget"
                    :label="item.isjust ===true?'当月实际数':' 当月预算数'"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                   <el-table-column
                    align="center"
                    prop="marchAcctual"
                    :label="item.isjust ===true?'调整项':' 当月实际数'"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                   <el-table-column
                    align="center"
                    prop="marchBudgetCompletedl"
                    :label="item.isjust ===true?'调整后实际数':' 预算完成%'"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                </el-table-column>
                <el-table-column
                 align="center"              
                 label="4月"
                 show-overflow-tooltip             
                >   
                  <el-table-column
                    align="center"
                    prop="aprilBudget"
                    :label="item.isjust ===true?'当月实际数':' 当月预算数'"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                   <el-table-column
                    align="center"
                    prop="aprilAcctual"
                    :label="item.isjust ===true?'调整项':' 当月实际数'"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                   <el-table-column
                    align="center"
                    prop="aprilBudgetCompletedl"
                    :label="item.isjust ===true?'调整后实际数':' 预算完成%'"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                </el-table-column>
                <el-table-column
                 align="center"              
                 label="5月"
                 show-overflow-tooltip             
                >   
                  <el-table-column
                    align="center"
                    prop="mayBudget"
                    :label="item.isjust ===true?'当月实际数':' 当月预算数'"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                   <el-table-column
                    align="center"
                    prop="mayAcctual"
                    :label="item.isjust ===true?'调整项':' 当月实际数'"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                   <el-table-column
                    align="center"
                    prop="mayBudgetCompletedl"
                    :label="item.isjust ===true?'调整后实际数':' 预算完成%'"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                </el-table-column>
                <el-table-column
                 align="center"              
                 label="6月"
                 show-overflow-tooltip             
                >   
                  <el-table-column
                    align="center"
                    prop="juneBudget"
                    :label="item.isjust ===true?'当月实际数':' 当月预算数'"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                   <el-table-column
                    align="center"
                    prop="juneAcctual"
                    :label="item.isjust ===true?'调整项':' 当月实际数'"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                   <el-table-column
                    align="center"
                    prop="juneBudgetCompletedl"
                    :label="item.isjust ===true?'调整后实际数':' 预算完成%'"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                </el-table-column>
                <el-table-column
                 align="center"              
                 label="7月"
                 show-overflow-tooltip             
                >   
                  <el-table-column
                    align="center"
                    prop="julyBudget"
                    :label="item.isjust ===true?'当月实际数':' 当月预算数'"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                   <el-table-column
                    align="center"
                    prop="julyAcctual"
                    :label="item.isjust ===true?'调整项':' 当月实际数'"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                   <el-table-column
                    align="center"
                    prop="julyBudgetCompletedl"
                    :label="item.isjust ===true?'调整后实际数':' 预算完成%'"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                </el-table-column>
                <el-table-column
                 align="center"              
                 label="8月"
                 show-overflow-tooltip             
                >   
                  <el-table-column
                    align="center"
                    prop="augustBudget"
                    :label="item.isjust ===true?'当月实际数':' 当月预算数'"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                   <el-table-column
                    align="center"
                    prop="augustAcctual"
                    :label="item.isjust ===true?'调整项':' 当月实际数'"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                   <el-table-column
                    align="center"
                    prop="augustBudgetCompletedl"
                    :label="item.isjust ===true?'调整后实际数':' 预算完成%'"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                </el-table-column>
                <el-table-column
                 align="center"              
                 label="9月"
                 show-overflow-tooltip             
                >   
                  <el-table-column
                    align="center"
                    prop="septemberBudget"
                    :label="item.isjust ===true?'当月实际数':' 当月预算数'"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                   <el-table-column
                    align="center"
                    prop="septemberAcctual"
                    :label="item.isjust ===true?'调整项':' 当月实际数'"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                   <el-table-column
                    align="center"
                    prop="septemberBudgetCompletedl"
                    :label="item.isjust ===true?'调整后实际数':' 预算完成%'"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                </el-table-column>
                <el-table-column
                 align="center"              
                 label="10月"
                 show-overflow-tooltip             
                >   
                  <el-table-column
                    align="center"
                    prop="octoberBudget"
                    :label="item.isjust ===true?'当月实际数':' 当月预算数'"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                   <el-table-column
                    align="center"
                    prop="octoberAcctual"
                    :label="item.isjust ===true?'调整项':' 当月实际数'"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                   <el-table-column
                    align="center"
                    prop="octoberBudgetCompletedl"
                    :label="item.isjust ===true?'调整后实际数':' 预算完成%'"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                </el-table-column>
                <el-table-column
                 align="center"              
                 label="11月"
                 show-overflow-tooltip             
                >   
                  <el-table-column
                    align="center"
                    prop="novemberBudget"
                    :label="item.isjust ===true?'当月实际数':' 当月预算数'"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                   <el-table-column
                    align="center"
                    prop="novemberAcctual"
                    :label="item.isjust ===true?'调整项':' 当月实际数'"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                   <el-table-column
                    align="center"
                    prop="novemberBudgetCompletedl"
                    :label="item.isjust ===true?'调整后实际数':' 预算完成%'"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                </el-table-column>
                <el-table-column
                 align="center"              
                 label="12月"
                 show-overflow-tooltip             
                >   
                  <el-table-column
                    align="center"
                    prop="decemberBudget"
                    :label="item.isjust ===true?'当月实际数':' 当月预算数'"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                   <el-table-column
                    align="center"
                    prop="decemberAcctual"
                    :label="item.isjust ===true?'调整项':' 当月实际数'"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                   <el-table-column
                    align="center"
                    prop="decemberBudgetCompletedl"
                    :label="item.isjust ===true?'调整后实际数':' 预算完成%'"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                </el-table-column>
            
               
     
            </el-table>
       <div style="padding-top:20px"   v-if="item.isjust ===true "> 
           <el-table
            :cell-class-name="tableRowClassName"
                v-loading="table.loading"
                :data="TableDataList[index].juststData"         
                :row-key = "getRowKeys"
                border
                stripe
                highlight-current-row
                fit
              
                style="width: 100%"
                ref="table"
              
                @selection-change="onSelectChange"
            >
            
               <el-table-column
                align="center"
                prop="linNO"
                label="序号"
                show-overflow-tooltip
                fixed="left"
                 width="80"
                >    
                <template slot-scope="scope">{{countIndex(scope.$index)}}</template>    
                </el-table-column>
                <el-table-column
                align="center"
                prop="linNO"
                label="对方公司"
                show-overflow-tooltip
                fixed="left"
                 width="120px"
                >                     
                </el-table-column>
              
                 <el-table-column
                      align="center"
                      prop="parentprojectName"
                      label="特殊事项"
                      show-overflow-tooltip                   
                      width="230"
                       fixed="left"
                    >     
                 </el-table-column>   
                  <el-table-column
                      align="center"
                      prop="projectName"
                      label="对应科目"
                      show-overflow-tooltip                   
                      width="160"
                       fixed="left"
                    >     
                 </el-table-column> 
                  <el-table-column
                      align="center"
                      prop="fullYearBudget"
                      label="累计"
                      show-overflow-tooltip                   
                      width="130"
                       fixed="left"
                    >     
                 </el-table-column>  
                  <el-table-column
                    align="center"
                    prop="januaryBudget"
                    label="1月"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                <el-table-column
                    align="center"
                    prop="februaryBudget"
                    label="2月"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="marchBudget"
                    label="3月"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="aprilBudget"
                    label="4月"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="mayBudget"
                    label="5月"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="juneBudget"
                    label="6月"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="julyBudget"
                    label="7月"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="augustBudget"
                    label="8月"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="septemberBudget"
                    label="9月"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="octoberBudget"
                    label="10月"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="novemberBudget"
                    label="11月"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="decemberBudget"
                    label="12月"
                    show-overflow-tooltip
                   
                      width="130"
                    >        
                  </el-table-column>
            
               
     
            </el-table>
       </div>
     </div> 
     
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style lang="scss">
.budgetreport {
  height: 100%;
  .chsEqp {
    width: 100%;
    .textPromt {
      float: left;
    }
    .chsEqp-select {
      height: 26px;
      line-height: 24px;
    }
    i {
      float: right;
      margin-top: 6px;
    }
  }
  .editOrgComp-row-tree {
    position: absolute;
    top: 40px;
    left: 70px;
    background-color: #fff;
    z-index: 10;
    padding: 0;
    margin: 0;
    width: 300px;
    height: 450px;
    clear: both;
  }
  .tableset{
    width:100%; 
   
    padding: 5,5; 
    
      
    .title {
       background: rgb(225, 228, 235);
       font-weight: bold;
      } 
      line-height: 40px;
      font-size: 16px;
     
     
  }
}
</style>
<script>
import { tableMixin } from "mixin/commTable";
import treeSelect from "components/treeSelect/treeSelect";
import tree from "components/tree/tree";
import { getOrganizatonTreeNoUsers, GetDepList } from "api/user/organization";
import { getDicListByDitType } from "api/publicBase/dictionaryMng";
import { InquireProfitStatement,ExportFile } from "api/ReportFunction/BudgetReport";
import { warnMsg, htmlMsg } from "utils/messageBox";
import { checkBtnPeimission, reportquery } from "utils/btnRole";



export default {
  name: "BudgetReportIndex",
  components: { treeSelect, tree },
  mixins: [tableMixin],
  data() {
    return {
      reportquery,
      titlename:"",
      tabActiveName:"budget0",
      TableDataList: [], //表格数据,显示导入数据
      budyear: new Date(),
      bthloading: false,
      selectdep: [], //选择部门所属
      selectbud: [], //选择预算类别
      search: {
        Code: "",
        DepName: "",
        BudgetType: "",
        Special: false,
        AllDep: false,
        AllReport: false,
        Version: 0 ,
      },
      typeList: [], //预算类别
     vstypeList:[],//版本类别
      treeComp: {
        show: false,
        data: [],
        choosedTreeNodeId: [], //回显树节点ID
      },
      deptreeComp: {
        data: [],
      },
      choosedTreeNode: [],
      ischoose:false
    };
  },
  methods: {
    checkBtnPeimission,
    getRowKeys(row) {
      return row.id;
    },
    //添加查询combox
    setComBox() {
      getDicListByDitType({
        BaseKeyValueTypeCode: "BUDGETTYPE",
        Code: "",
        Name: "",
      }).then((res) => {
        this.typeList = res.result.comboxs;
      });
      getDicListByDitType({ BaseKeyValueTypeCode: "JOINMULIMPORT", Code: "", Name: ""  }).then(res => {
            this.vstypeList = res.result.comboxs;
          });
    },
    //获取组织树
    getOrganizationTree() {
      //{IsShowdep:true}
      getOrganizatonTreeNoUsers().then((res) => {
        if (res.success) this.treeComp.data = res.result;
        if (res.result.length > 0) {
          this.onNodeClick([res.result[0]]);
          this.treeComp.choosedTreeNodeId = [res.result[0].nodeId];
        }
      });
    },
    //根据公司获取部门
    getdeplist() {
      this.selectdep = [];
      this.deptreeComp.data = [];
      GetDepList({ code: this.search.Code }).then((res) => {
        if (res.success) this.deptreeComp.data = res.result;
      });
    },
    //树数据回调事件
    onNodeClick(clickNode //choosedNodeID
    ) {
      this.search.Code = clickNode.length > 0 ? clickNode[0].nodeUUid : "";
      this.choosedTreeNode = clickNode;
      this.titlename=clickNode.length > 0 ? clickNode[0].nodeName : "";
      this.getdeplist();
       this.ischoose=clickNode[0].ismulti;
            if(clickNode[0].ismulti !==true)
            {
              this.search.Version=0;
            }
    },
    //
    onClickOutSide() {
      if (this.treeComp.show == true) {
        this.treeComp.show = false;
        this.$refs.chooseEquNode.iconChange();
      }
    },
    //单击树选择框控件
    ontreeShowChange(val) {
      this.treeComp.show = val;
    },
    setColSpan() {
     
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
      // alltable.forEach(item => {
      //   if(item.innerText.includes("项目")){
      //      var x = item.rows[0].cells;
      //       // 将第二列表头单元格的colSpan设为2
      //       x[1].colSpan = 2;
      //       // 将第三列表头单元格的display设为none
      //       x[2].style.display = 'none'; 
      //   }
      // });
          
    },
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
       if(columnIndex===1 )
          {
            if(row.parentprojectName!=="")
            {
               return [row.rowspaln, 1];

            }
            else if  (row.rowspaln>0)
            {
               return [0, 0];

            }
            else{
               return [1, 2];
            }
           
          }
          else if(columnIndex===2 )
          {
             if(row.parentprojectName==="")
            {
              if  (row.rowspaln===0)
              {
                return [0, 0];

              }            

            }
           
          }
        
     
        // if (rowIndex % 2 === 0) {//判断条件可以设置成你想合并的行的起始位置
        //   if (columnIndex === 0) {//判断条件可以设置成你想合并的列的起始位置
        //     return [1, 2];
        //   } else if (columnIndex === 1) {
        //     return [0, 0];
        //     }
        // }
    },
    //获取列表
    getTableList() {
      if (
        this.search.Code === "" ||
        this.search.Code === null ||
        this.search.Code === undefined
      ) {
        warnMsg("请选择公司");
        return;
      }
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
      if (this.selectdep.length > 0) {
        var dep = this.selectdep.toString();
        data.DepName =";"+ dep.replace(/,/g, ";")+";";
      } else {
        data.DepName = "";
      }
      if (this.selectbud.length > 0) {
        var bud = this.selectbud.toString();
        data.BudgetType = bud.replace(/,/g, ";");
      } else {
        data.BudgetType = "";
      }
      //  var showmsg=JSON.stringify(data);
      //  htmlMsg(showmsg.toString(),{type: "warning", duration: 0, showClose: true});
       this.TableDataList=[];
      this.bthloading = true;
      InquireProfitStatement(data)
        .then((res) => {
          if (res.success) {
            this.bthloading = false;
            
            var arr=[];
            
             res.result.forEach(item => {
                 let sheetdata=item;
                 sheetdata.titlename=this.titlename;
                 sheetdata.Year= this.budyear.getFullYear();
                  sheetdata.month= this.budyear.getMonth()+1;
                 if(item.sheetName.includes("调整"))
                 {
                     sheetdata.isjust=true;
                 }
                 else
                 {
                     sheetdata.isjust=false;
                 }
                 var rows=0;
                 var parentname="";
                 var ishb=false;
                 //记录
                 var startindex=-1;
                 sheetdata.data.forEach((ele,index)=>{
                     
                     if(ele.projectName.includes('/'))
                     {
                         var namelist=ele.projectName.split('/');
                         
                        //    ele.projectName=namelist[1];
                        //    ele.parentprojectName=namelist[0];

                            if(parentname===namelist[0])
                            {
                               rows++;
                               ele.parentprojectName="";
                               ele.rowspaln=1;
                               ele.showparentprojectName=parentname;
                               ele.projectName=namelist[1];
                        
                            }
                            else{
                                if(startindex>-1 &&  ishb===true)
                                {
                                     sheetdata.data[startindex].rowspaln=rows;

                                }
                                ishb=true;
                                rows=1;
                                startindex=index;
                                ele.projectName=namelist[1];
                                ele.parentprojectName=namelist[0];
                                parentname=namelist[0];
                                ele.showparentprojectName=parentname;
                            }
                     }
                     else{
                          if(ishb===true)
                            {
                                sheetdata.data[startindex].rowspaln=rows;
                            }
                          ishb=false;
                          rows=0;
                          parentname="";
                          ele.parentprojectName="";
                           ele.showparentprojectName=ele.projectName;
                          ele.rowspaln=0;
                          startindex=-1;
                     }
                   

                   

                 })
                if(ishb===true)
                    {
                        sheetdata.data[startindex].rowspaln=rows;
                    }
                 arr.push(sheetdata);
             });;
             this.TableDataList=arr;
               this.bthloading = false;

                this.$nextTick(function(){
                  this.setColSpan();
                })
          
          }
        })
        .catch((err) => {
          this.bthloading = false;
        });
    },
    Importdata()
    {
      if(this.TableDataList.length<1){
        warnMsg("当前无导出数据");
        return;
      }
      this.bthloading=true;
      let data={
        data:this.TableDataList
      };
      ExportFile(data).then(res=>{
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

      //  const wb = {
      //    SheetNames:[],
      //    Sheets:[],

      //  };
     


      //   //   this.TableDataList.forEach((item,index)=>{
      //   //      wb.SheetNames.push(item.sheetName);
      //   //     //let lnws= XLSX.sh
           
      //   //     // var html = "<html><head><meta charset='utf-8' /></head><body>"
      //   //     //           + document.getElementById('out-table-'+index).outerHTML + "</body></html>";
      //   //       var html =  document.getElementById('out-table-'+index).outerHTML;

      //   //  //   let lnws=XLSX2.utils.table_to_sheet(html);
      //   //      let lnws=XLSX2.utils.table_to_sheet(document.getElementById('out-table-'+index));
      //   //       //列宽
      //   //     // lnws['!cols'] = siteColWidth(item.data)

      //   //     // var column=item.isjust===true?39:40;
      //   //     // var closlist=[
      //   //     //   {wch: 100}, // A列
      //   //     //   {wch: 200}, 
      //   //     //   {wch: 200}
      //   //     //   ];
      //   //     //  for (var i=0;i<column;i++)
      //   //     //  {
      //   //     //    var setcloum={
      //   //     //      wch: 200
      //   //     //    }
      //   //     //    closlist.push(setcloum);
      //   //     //  }
      //   //     // lnws['!cols'] = closlist;
      //   //     wb.Sheets[item.sheetName]=lnws;
             
         
      //   //   })               
      //   //  var workbookOut  = XLSX.write(wb, {
      //   //     bookType: 'xlsx',
      //   //     bookSST: false,
      //   //     type: 'binary'
      //   //   });



      //   //   var fileName ="报表导出"
      //   //     //下载
      //   //   this.saveAs(
      //   //     new Blob([this.s2ab(workbookOut)], 
      //   //     {
      //   //       type: 'application/octet-stream'
      //   //     }), 
      //   //     `${fileName}.xlsx`
      //   //   )

      //  this.TableDataList.forEach((item,index)=>{
      //        wb.SheetNames.push(item.sheetName);
            
      //        let lnws=XLSX2.utils.table_to_sheet(document.getElementById('out-table-'+index));
      //       // XLSX.
      //       wb.Sheets[item.sheetName]=lnws;
             
         
      //     })               
      //    var workbookOut  = XLSX.write(wb, {
      //       bookType: 'xlsx',
      //       bookSST: false,
      //       type: 'binary'
      //     });
      //   var fileName ="报表导出"
      //       //下载
      //     this.saveAs(
      //       new Blob([this.s2ab(workbookOut)], 
      //       {
      //         type: 'application/octet-stream'
      //       }), 
      //       `${fileName}.xlsx`
      //     )



      //   //   var alltable=[];
      //   //   this.TableDataList.forEach((item,index)=>{
      //   //      wb.SheetNames.push(item.sheetName);
          
             
      //   //      var html = "<html><head><meta charset='utf-8' /></head><body>"
      //   //              + document.getElementById('out-table-'+index).outerHTML + "</body></html>";
      //   //     //  wb.Sheets[item.sheetName]=html;
      //   //     alltable.push(html);
         
      //   //   })               
       
      //   //    var fileName ="报表导出"
         
         
      //   // //  var htnl= "<html><head><meta charset='utf-8' /></head><body>"
      //   // //              + document.getElementById('out-table-0').outerHTML + "</body></html>";
      //   // // 实例化一个Blob对象，其构造函数的第一个参数是包含文件内容的数组，第二个参数是包含文件类型属性的对象
      //   // var blob = new Blob(alltable, { type: "application/vnd.ms-excel" });
      //   //  this.saveAs(blob, 
      //   //     `${fileName}.xlsx`
      //   //   )
      

     
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
    this.setComBox();
    this.getOrganizationTree();
  },
 
  
};
</script>