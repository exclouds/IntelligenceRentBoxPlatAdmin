<template>
  <div class="app-container siteTables">
    <el-form size="mini" @submit.native.prevent>
      <el-row style="margin-bottom: 10px">
        <el-col :span="4">
          <el-form-item label="代码：" style="padding-left: 15px">
            <el-input
              placeholder="代码"
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
          <el-form-item label="名称：">
            <el-input
              placeholder="名称"
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
            <el-button type="primary" size="mini" @click="openAddSiteTablesComp"
              >新增</el-button
            >
            <el-button type="primary" size="mini" @click="onBatchDelete"
              >批量删除</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-row class="siteTables-tableRow">
      <el-table
        :cell-class-name="tableRowClassName"
        v-loading="table.loading"
        :data="siteTablesList"
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
        <el-table-column
          align="center"
          prop="code"
          sortable="custom"
          label="站点代码"
          min-width="6%"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="siteName"
          sortable="custom"
          show-overflow-tooltip
          label="站点名称"
          min-width="9%"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="enSiteName"
          sortable="custom"
          show-overflow-tooltip
          label="英文名称"
          min-width="9%"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="countryCode"
          sortable="custom"
          show-overflow-tooltip
          label="国家代码"
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
            <div class="tableBtn" @click="openUpdateSiteTablesComp(scope.row)">
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
                  @click="deleteSingleSiteTables(scope.row.id)"
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
    <create-siteTable
      ref="createSiteTablesComp"
      :pshow="createSiteTablesComp.show"
      @on-show-change="oncreateSiteTablesCompShowChange"
      @on-save-success="onSaveSuccess"
    ></create-siteTable>
  </div>
</template>
<style lang="scss">
.siteTables {
  height: 100%;
  .siteTables-tableRow {
    height: calc(100% - 130px);
    .el-table__body-wrapper {
      height: calc(100% - 51px) !important;
    }
  }
}
</style>
<script>
import { tableMixin } from "mixin/commTable";
import {
  getAllSiteTablesList,
  deleteBatchSiteTables,
} from "api/publicBase/siteTables";
import { Server } from "net";
import createSiteTable from "./createSiteTable";
//import {checkBtnPeimission,countryPage} from 'utils/btnRole'
import { warnMsg } from "utils/messageBox";
export default {
  name: "siteTablesIndex",
  components: { "create-siteTable": createSiteTable },
  mixins: [tableMixin],
  data() {
    return {
      //countryPage,
      siteTablesList: [],
      createSiteTablesComp: {
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
    //获取国家列表
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

      getAllSiteTablesList(data).then((res) => {
        this.table.loading = false;
        if (res.success) {
          this.siteTablesList = res.result.items;
          this.siteTablesList.forEach((item) => {
            this.$set(item, "popShow", false);
          });
          this.page.total = res.result.totalCount;
        }
      });
    },
    //删除单个国家
    deleteSingleSiteTables(id) {
      deleteBatchSiteTables([id]).then((res) => {
        this.batchDeleteSearch();
      });
    },
    //打开新增国家窗口
    openAddSiteTablesComp() {
      this.createSiteTablesComp.show = true;
    },
    //打开编辑国家窗口
    openUpdateSiteTablesComp(row) {
      this.createSiteTablesComp.show = true;
      this.$refs.createSiteTablesComp.getSiteTablesInfoById(row.id);
    },
    //批量删除
    onBatchDelete() {
      if (this.table.choosedRow.length === 0) {
        warnMsg("请选择要删除的国家");
        return;
      }
      this.$confirm("是否确定删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(({ value }) => {
        let arr = this.table.choosedRow.map((item) => item.id);
        deleteBatchSiteTables(arr).then((res) => {
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
    oncreateSiteTablesCompShowChange(val) {
      this.createSiteTablesComp.show = val;
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