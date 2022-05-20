<template>
  <div class="app-container line">
    <el-form size="mini" @submit.native.prevent>
      <el-row style="margin-bottom: 10px">
        <el-col :span="4">
          <el-form-item label="代码：" style="padding-left: 15px">
            <el-input
              placeholder="路线代码"
              style="width: 70%"
              v-model="search.code"
              size="mini"
              @keyup.enter.native="
                onSearchBefore();
                getTableList();
              "
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="路线名称：">
            <el-input
              placeholder="路线名称"
              style="width: 70%"
              v-model="search.name"
              size="mini"
              @keyup.enter.native="
                onSearchBefore();
                getTableList();
              "
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label prop>
            <el-button
              type="primary"
              size="mini"
              @click="
                onSearchBefore();
                getTableList();
              "
              >搜索</el-button
            >
            <el-button type="primary" size="mini" @click="openAddLineComp"
              >新增</el-button
            >
            <el-button type="primary" size="mini" @click="onBatchDelete"
              >批量删除</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-row class="line-tableRow">
      <el-table
        :cell-class-name="tableRowClassName"
        v-loading="table.loading"
        :data="lineList"
        :row-key="getRowKeys"
        @selection-change="onSelectChange"
        border
        stripe
        highlight-current-row
        fit
        height="100%"
        style="width: 100%height:100%"
        ref="table"
        @sort-change="sortChange"
      >
        <el-table-column
          :reserve-selection="true"
          type="selection"
          width="40"
        ></el-table-column>
        <el-table-column type="index" align="center" label="序号" width="50">
          <template slot-scope="scope">{{ countIndex(scope.$index) }}</template>
        </el-table-column>
        <!-- <el-table-column
          align="center"
          prop="code"
          sortable="custom"
          label="路线代码"
          min-width="6%"
        ></el-table-column> -->
        <el-table-column
          align="center"
          prop="lineName"
          sortable="custom"
          show-overflow-tooltip
          label="路线名称"
          min-width="9%"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="isEnable"
          sortable="custom"
          show-overflow-tooltip
          label="是否启用"
          min-width="10%"
        >
          <template slot-scope="scope">
            {{ scope.row.isEnable ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="remarks"
          sortable="custom"
          show-overflow-tooltip
          label="备注"
          min-width="10%"
        ></el-table-column>
        <el-table-column align="center" label="操作" min-width="7%">
          <template slot-scope="scope">
            <div class="tableBtn" @click="openUpdateLineComp(scope.row)">
              编辑
            </div>
            <el-popover placement="top" width="160" v-model="scope.row.popShow">
              <p>是否确认删除？</p>
              <div style="text-align: right margin: 0">
                <el-button
                  size="mini"
                  type="text"
                  @click="scope.row.popShow = false"
                  >取消</el-button
                >
                <el-button
                  type="danger"
                  size="mini"
                  @click="deleteSingleLine(scope.row.id)"
                  >删除</el-button
                >
              </div>
              <div class="tableBtn" slot="reference">删除</div>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 10px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        :total="page.total"
        :page-sizes="page.pageSelectArr"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
    </el-row>
    <create-line
      ref="createLineComp"
      :pshow="createLineComp.show"
      @on-show-change="oncreateLineCompShowChange"
      @on-save-success="onSaveSuccess"
    ></create-line>
  </div>
</template>
<style lang="scss">
.line {
  height: 100%;
  .line-tableRow {
    height: calc(100% - 130px);
    .el-table__body-wrapper {
      height: calc(100% - 51px) !important;
    }
  }
}
</style>
<script>
import { tableMixin } from "mixin/commTable";
import { getAllLineList, deleteBatchLine } from "api/publicBase/line";
import { Server } from "net";
import createLine from "./createLine";
//import {checkBtnPeimission,linePage} from 'utils/btnRole'
import { warnMsg } from "utils/messageBox";
export default {
  name: "lineIndex",
  components: { "create-line": createLine },
  mixins: [tableMixin],
  data() {
    return {
      //linePage,
      lineList: [],
      createLineComp: {
        show: false,
      },
      search: {
        code: "",
        name: "",
      },
    };
  },
  methods: {
    //checkBtnPeimission,
    getRowKeys(row) {
      return row.id.toString();
    },
    //获取路线列表
    getTableList() {
      console.log(this.search.continent);
      this.tableData = [];
      this.table.loading = true;
      let data = {
        code: this.search.code,
        filter: this.search.name,
        maxResultCount: this.page.pageSize,
        skipCount: (this.page.currentPage - 1) * this.page.pageSize,
        sorting: this.table.order.sort,
      };

      getAllLineList(data).then((res) => {
        this.table.loading = false;
        if (res.success) {
          this.lineList = res.result.items;
          this.lineList.forEach((item) => {
            this.$set(item, "popShow", false);
          });
          this.page.total = res.result.totalCount;
        }
      });
    },
    //删除单个路线
    deleteSingleLine(id) {
      deleteBatchLine([id]).then((res) => {
        this.batchDeleteSearch();
      });
    },
    //打开新增路线窗口
    openAddLineComp() {
      this.createLineComp.show = true;
    },
    //打开编辑路线窗口
    openUpdateLineComp(row) {
      this.createLineComp.show = true;
      this.$refs.createLineComp.getLineInfoById(row.id);
    },
    //批量删除
    onBatchDelete() {
      if (this.table.choosedRow.length === 0) {
        warnMsg("请选择要删除的路线");
        return;
      }
      this.$confirm("是否确定删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(({ value }) => {
        let arr = this.table.choosedRow.map((item) => item.id);
        deleteBatchLine(arr).then((res) => {
          this.$refs.table.clearSelection();
          this.batchDeleteSearch();
        });
      });
    },
    // //排序
    // sortChange(param) {
    //   var ss = ""
    //   if (param.order === "ascending") ss = param.prop + " asc"
    //   if (param.order === "descending") ss = param.prop + " desc"
    //   this.getTableList(ss)
    // },
    oncreateLineCompShowChange(val) {
      this.createLineComp.show = val;
    },
    //新增或编辑用户成功事件
    onSaveSuccess() {
      this.getTableList();
    },
  },
  created() {
    this.getTableList();
  },
};
</script>