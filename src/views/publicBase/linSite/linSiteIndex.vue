<template>
  <div class="app-container linSite">
    <el-form size="mini" @submit.native.prevent>
      <el-row style="margin-bottom: 10px">
        <el-col :span="4">
          <el-form-item label="站点：" style="padding-left: 15px">
            <el-select v-model="search.code" collapse-tags placeholder="站点">
              <el-option
                v-for="item in ZDs"
                :key="item.value"
                :label="item.displayText"
                :value="item.value"
              ></el-option>
            </el-select>
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
            <el-button type="primary" size="mini" @click="openAddLinSiteComp"
              >新增</el-button
            >
            <el-button type="primary" size="mini" @click="onBatchDelete"
              >批量删除</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-row class="linSite-tableRow">
      <el-table
        :cell-class-name="tableRowClassName"
        v-loading="table.loading"
        :data="linSiteList"
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
          label="站点"
          min-width="6%"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="lineId"
          sortable="custom"
          show-overflow-tooltip
          label="路线"
          min-width="9%"
        ></el-table-column>
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
            <div class="tableBtn" @click="openUpdateLinSiteComp(scope.row)">
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
                  @click="deleteSingleLinSite(scope.row.id)"
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
    <create-linSite
      ref="createLinSiteComp"
      :pshow="createLinSiteComp.show"
      @on-show-change="oncreateLinSiteCompShowChange"
      @on-save-success="onSaveSuccess"
    ></create-linSite>
  </div>
</template>
<style lang="scss">
.linSite {
  height: 100%;
  .linSite-tableRow {
    height: calc(100% - 130px);
    .el-table__body-wrapper {
      height: calc(100% - 51px) !important;
    }
  }
}
</style>
<script>
import { tableMixin } from "mixin/commTable";
import { getAllLinSiteList, deleteBatchLinSite } from "api/publicBase/linSite";
import { Server } from "net";
import createLinSite from "./createLinSite";
//import {checkBtnPeimission,linSitePage} from 'utils/btnRole'
import { getSiteList } from "api/publicBase/Combox";
import { warnMsg } from "utils/messageBox";
export default {
  name: "linSiteIndex",
  components: { "create-linSite": createLinSite },
  mixins: [tableMixin],
  data() {
    return {
      //linSitePage,
      linSiteList: [],
      createLinSiteComp: {
        show: false,
      },
      search: {
        code: "",
        name: "",
      },
      ZDs: [],
    };
  },
  methods: {
    //checkBtnPeimission,
    setComBox() {
      getSiteList({
        CountryCode: "",
        IsEnable: true,
      }).then((res) => {
        this.ZDs = res.result;
      });
    },
    getRowKeys(row) {
      return row.id.toString();
    },
    //获取路线列表
    getTableList() {
      this.tableData = [];
      this.table.loading = true;
      let data = {
        code: this.search.code,
        filter: "",
        maxResultCount: this.page.pageSize,
        skipCount: (this.page.currentPage - 1) * this.page.pageSize,
        sorting: this.table.order.sort,
      };

      getAllLinSiteList(data).then((res) => {
        this.table.loading = false;
        if (res.success) {
          this.linSiteList = res.result.items;
          this.linSiteList.forEach((item) => {
            this.$set(item, "popShow", false);
          });
          this.page.total = res.result.totalCount;
        }
      });
    },
    //删除单个路线
    deleteSingleLinSite(id) {
      deleteBatchLinSite([id]).then((res) => {
        this.batchDeleteSearch();
      });
    },
    //打开新增路线窗口
    openAddLinSiteComp() {
      this.createLinSiteComp.show = true;
    },
    //打开编辑路线窗口
    openUpdateLinSiteComp(row) {
      this.createLinSiteComp.show = true;
      this.$refs.createLinSiteComp.getLinSiteInfoById(row.id);
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
        deleteBatchLinSite(arr).then((res) => {
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
    oncreateLinSiteCompShowChange(val) {
      this.createLinSiteComp.show = val;
    },
    //新增或编辑用户成功事件
    onSaveSuccess() {
      this.getTableList();
    },
  },
  created() {
    this.setComBox();
    this.getTableList();
  },
};
</script>