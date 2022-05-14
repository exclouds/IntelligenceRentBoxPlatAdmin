<template>
  <div class="app-container lockacc">
    <el-form size="mini" @submit.native.prevent label-width="100px">
    <el-row>
     
                  
          <el-col :span="4">
            <el-form-item label="锁账类型：" >
                 <el-select
                  v-model="search.locktype"
                  placeholder="锁账类型"
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
          
        <el-col :span="8">
          <el-form-item label prop label-width="10px">
           <el-button type="primary" size="mini" @click="getTableList()" >搜索</el-button>        
            <el-button type="primary" size="mini" @click="openAddAccount()" v-if="checkBtnPeimission(LockAccount.add.permission)">新增</el-button>
             <el-button type="primary" size="mini" @click="onBatchDelete()" :loading="bthloading" v-if="checkBtnPeimission(LockAccount.delete.permission)">批量删除</el-button>
              <el-button type="primary" size="mini" @click="onBatchLock(false)" :loading="bthloading" v-if="checkBtnPeimission(LockAccount.Lockdata.permission)">批量解锁</el-button>
           <el-button type="primary" size="mini" @click="onBatchLock(true)" :loading="bthloading" v-if="checkBtnPeimission(LockAccount.Lockdata.permission)">批量锁账</el-button>
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
        height="calc(100% - 80px)"
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
          prop="locktype"
          label="锁账类别"
          min-width="12%"
           sortable="custom"
        >
        <template slot-scope="scope">
          <span v-if="!scope.row.popShow">{{scope.row.locktype}}</span>
             <el-select
                  v-model="scope.row.locktypecode"
                  placeholder="锁账类别"                 
                  filterable 
                  v-if="scope.row.popShow"         
                >
                  <el-option
                    v-for="item in typeList"
                    :key="item.value"
                    :label="item.displayText"
                    :value="item.value"
                  ></el-option>
                </el-select>
         </template>
        </el-table-column>
         <el-table-column
          align="center"
          prop="isLock"
          show-overflow-tooltip
          label="是否锁账"
          min-width="10%"
          sortable="custom"
        >
         <template slot-scope="scope">
           <span v-if="!scope.row.popShow">{{scope.row.isLock?"是":"否"}}</span>
             <el-select
                  v-model="scope.row.isLock"
                  placeholder="是否锁账"                 
                  filterable 
                  v-if="scope.row.popShow"         
                >
                  <el-option label="是" :value="true"></el-option>
                  <el-option label="否" :value="false"></el-option>
                </el-select>
         </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="lockTime"
          show-overflow-tooltip
          label="锁账时间"
          min-width="12%"
           sortable="custom"
        >
          <template slot-scope="scope">
           <span v-if="!scope.row.popShow"> {{scope.row.lockTime | parseTime('{y}-{m}')}}</span>
              <el-date-picker
              v-model="scope.row.lockTime"
              type="month" 
              format="yyyy-MM" 
              value-format="yyyy-MM"

              size="mini"
              clearable
              style="width: 100%"
              placeholder="锁账时间"
               v-if="scope.row.popShow"
               
            >
            </el-date-picker>
            
          </template>
        </el-table-column>
        
        <el-table-column
          align="center"
          prop="remarks"
          show-overflow-tooltip
          label="备注"
          min-width="12%"
           sortable="custom"
        >
         <template slot-scope="scope">
                        
              <el-input
               v-if="scope.row.popShow "
              placeholder="备注"
              v-model="scope.row.remarks"
              type="textarea"
              size="mini"
              clearable
              style="width: 100%"        
            ></el-input>
            
            <span v-else>{{ scope.row.remarks }}</span>
          </template>
        </el-table-column>
         <el-table-column align="center" label="操作" width="200" >
            <template slot-scope="scope" >
                <!-- <div class="tableBtn"  @click="updatelockinfo(scope.row)"  v-if="checkBtnPeimission(LockAccount.update.permission)">编辑</div>                -->
                 <div
              class="tableBtn"
              @click="                         
                scope.row.popShow = true;
              "
              v-show="checkBtnPeimission(LockAccount.update.permission) && !scope.row.popShow "
            >
              编辑
            </div>
            <div
              class="tableBtn"
              @click="updatelockinfo(scope.row)"
              v-show="checkBtnPeimission(LockAccount.update.permission) && scope.row.popShow"
            >
              保存
            </div>
            <div
              class="tableBtn"
              @click="cancelrow(scope.row,scope.$index)"
              v-show="checkBtnPeimission(LockAccount.update.permission) && scope.row.popShow"
            >
              取消
            </div>
             <div class="tableBtn"  @click="getislock(scope.row)"  
             v-if="checkBtnPeimission(LockAccount.Lockdata.permission)">
             {{scope.row.isLock?"解锁":"锁账"}}
             </div>                      
                <div class="tableBtn"  @click="deletesinge(scope.row)" 
                 v-if="checkBtnPeimission(LockAccount.delete.permission)">
                 删除
                 </div>                      
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
   
  </div>
</template>
<style lang="scss">
.lockacc {
  height: 100%;
}
</style>
<script>
import { tableMixin } from "mixin/commTable"
import { getDicListByDitType } from "api/publicBase/dictionaryMng";
import { GetLockAccountList,BathLockAsync,CreateOrUpdateLock ,onBatchDelete} from "api/publicBase/LockAccount";
import { parseTime } from "utils";
import {checkBtnPeimission,LockAccount} from 'utils/btnRole'
import {warnMsg,successMsg} from 'utils/messageBox'

export default {
  name: "LockAccountIndex",
  components: {},
  mixins: [tableMixin],
  data() {
    return {
      LockAccount,
      TableDataList:[],//表格数据,显示导入数据
      search:{
        locktype:"",
        
      },
      typeList:[],//锁账类型
      bthloading:false,
     
    }
  },
  methods: {
    checkBtnPeimission,
    getRowKeys(row) {
            return row.id;
    },
     //添加查询combox
    setComBox() {
      getDicListByDitType({ BaseKeyValueTypeCode: "LOCKTYPE", Code: "", Name: ""  }).then(res => {
        this.typeList = res.result.comboxs;
        // if(this.typeList.length>0)
        // {
        //   this.search.locktype=this.typeList[0].value;
           this.getTableList();
        // }
      });
      
    },
    //获取列表
    getTableList() {
       let data=this.search;
       data.maxResultCount= this.page.pageSize;
       data.skipCount= (this.page.currentPage - 1)*this.page.pageSize;
       data.sorting= this.table.order.sort;
       this.table.loading = true;
       this.$refs.table.clearSelection();
        GetLockAccountList(data).then(res => {
          if(res.success)
          {
             this.table.loading = false;
             this.TableDataList = res.result.items;
             this.TableDataList.forEach((item) => {
              this.$set(item, "huancuncode", item.locktypecode);
              this.$set(item, "huancunremarks", item.remarks);
                this.$set(item, "huancunlockTime", item.lockTime);
                  this.$set(item, "huancunisLock", item.isLock);
             
              this.$set(item, "popShow", false);                                        
            });
             this.page.total = res.result.totalCount
          }
              
        }).catch(err=>{
           this.table.loading = false;
        }) 

    },
    updatelockinfo(row){
      var dd=row.lockTime;
        let data=row;        
        CreateOrUpdateLock(data).then(res => {
           this.getTableList();
        })

    },
    getislock(row){
      var msg=(row.isLock?"解锁":"锁账");
       this.$confirm('是否确定进行'+msg+"?", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
              let data={
                IdList:[row.id],
                Islock:!row.isLock

              };
                BathLockAsync(data).then(res => {
                    if(res.success)
                        this.getTableList();
                        successMsg(msg+'成功');
                    }
                )
            }).catch(() => {
                
            });
    },
      //批量删除
    onBatchLock(val) {
     var msg=val?"锁账":"解锁";
      if (this.table.choosedRow.length === 0) {
        warnMsg("请选择要"+msg+"信息");
        return;
      }
      this.$confirm('是否确定进行'+msg+'?', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(({ value }) => {
        let arr = this.table.choosedRow.map(item => {
          return item.id;
        });
         let data={
                IdList:arr,
                Islock:val
              };
          this.bthloading=true;
        BathLockAsync(data).then(res => {
           this.bthloading=false;
          this.$refs.table.clearSelection();
          this.getTableList();
          successMsg(msg+'成功');
         
        }) .catch(err=>{
           this.bthloading=false;
        });
      });
    },
     deletesinge(row){
     
       this.$confirm('是否确定进行删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
             
                onBatchDelete([row.id]).then(res => {
                    if(res.success){
                      this.getTableList();
                        successMsg('删除成功');
                    }                       
                 }
                )
            }).catch(() => {
                
            });
    },
      //批量删除
    onBatchDelete() {
 
      if (this.table.choosedRow.length === 0) {
        warnMsg("请选择要删除信息");
        return;
      }
      this.$confirm('是否确定进行删除?', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(({ value }) => {
        let arr = this.table.choosedRow.map(item => {
          return item.id;
        });
       
          this.bthloading=true;
        onBatchDelete(arr).then(res => {
           this.bthloading=false;
          this.$refs.table.clearSelection();
          this.getTableList();
          successMsg('删除成功');
         
        }) .catch(err=>{
           this.bthloading=false;
        });
      });
    },
     onSaveSuccess(){
      this.getTableList();
    },
    openAddAccount(){
      if (this.TableDataList.filter(x => x.popShow).length > 0) {
        warnMsg("请保存后再添加行")
        return;
      }
      const newData = {
        id: "",
        locktype: '',
        locktypecode: "",
        IsLock:true,
        popShow: true
      };

      //this.sensitiveList=[...this.sensitiveList,newData];
      this.TableDataList.unshift(newData);
      this.$refs.table.bodyWrapper.scrollTop = 0;

    },
    cancelrow(row, index){
      if(row.id==="" || row.id===null || row.id=== undefined)
      {
        this.TableDataList.splice(index, 1)
      }
      else{
         row.locktypecode = row.huancuncode;   
         row.isLock = row.huancunisLock;           
         row.lockTime = row.huancunlockTime;           
         row.remarks = row.huancunremarks;                   
         row.popShow = false;
         
      }
     
    }
    
  
  },
  created() {
    this.setComBox();
    //this.getTableList();
  }
  
}
</script>