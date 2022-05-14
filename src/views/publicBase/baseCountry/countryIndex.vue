<template>
  <div class="app-container country">
    <el-form size="mini" @submit.native.prevent>
      <el-row style="margin-bottom: 10px">
        <el-col :span="4">
          <el-form-item label="所属大洲：">
            <el-select
              size="mini"
              v-model="search.continent"
              filterable
              clearable
              placeholder="所属大洲"
              @change="
                onSearchBefore();
                getTableList();
              "
              style="width: 70%"
            >
              <el-option
                v-for="item in search.continentList"
                :key="item.id"
                :label="item.code"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="代码：">
            <el-input
              placeholder="国家代码/集团编码"
              style="width: 70%"
              v-model="search.countryCode"
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
          <el-form-item label="中文名称：">
            <el-input
              placeholder="中文简称/ 中文全称"
              style="width: 70%"
              v-model="search.chineseName"
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
          <el-form-item label="英文名称：">
            <el-input
              placeholder="英文简称/英文全称"
              style="width: 70%"
              v-model="search.englishName"
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
          <el-form-item label="是否AGM检验国：" style="position: relative">
            <el-select
              v-model="search.isAgm"
              collapse-tags
              clearable
              placeholder="是否AGM检验国"
              style="width: 50%"
              @change="getTableList()"
            >
              <el-option
                v-for="item in equClassifyList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label="海关舱单识别码：" style="position: relative">
            <el-select
              v-model="search.isIden"
              collapse-tags
              clearable
              placeholder="海关舱单识别码"
              style="width: 50%"
              @change="getTableList()"
            >
              <el-option
                v-for="item in equClassifyList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-form-item label="是否疫区：" style="position: relative">
            <el-select
              v-model="search.isPestArea"
              collapse-tags
              clearable
              placeholder="是否疫区"
              style="width: 70%"
              @change="getTableList()"
            >
              <el-option
                v-for="item in equClassifyList"
                :key="item.value"
                :label="item.label"
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
            <el-button type="primary" size="mini" @click="openAddCountryComp"
              >新增</el-button
            >
            <el-button type="primary" size="mini" @click="onBatchDelete"
              >批量删除</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-row class="country-tableRow">
      <el-table
        :cell-class-name="tableRowClassName"
        v-loading="table.loading"
        :data="countryList"
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
          prop="continent"
          sortable="custom"
          label="洲"
          min-width="4%"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="countryCode"
          sortable="custom"
          label="国家代码"
          min-width="6%"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="englishShortName"
          sortable="custom"
          show-overflow-tooltip
          label="英文简称"
          min-width="9%"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="englishFullName"
          sortable="custom"
          show-overflow-tooltip
          label="英文全称"
          min-width="10%"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="chineseShortName"
          sortable="custom"
          show-overflow-tooltip
          label="中文简称"
          min-width="10%"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="chineseFullName"
          sortable="custom"
          show-overflow-tooltip
          label="中文全称"
          min-width="10%"
        ></el-table-column>
        <el-table-column align="center" prop="isAGM" label="AGM" min-width="4%">
          <template slot-scope="scope">{{
            scope.row.isAGM == 0 ? "否" : "是"
          }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="indentCode1"
          sortable="custom"
          show-overflow-tooltip
          label="海关代码1"
          min-width="7%"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="indentCode2"
          sortable="custom"
          show-overflow-tooltip
          label="海关代码2"
          min-width="7%"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="isPestArea"
          label="疫区"
          min-width="4%"
        >
          <template slot-scope="scope">{{
            scope.row.isPestArea == 0 ? "否" : "是"
          }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="mainDataCode"
          label="数字代码"
          sortable="custom"
          min-width="6%"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="remarks"
          show-overflow-tooltip
          label="备注"
          min-width="8%"
        ></el-table-column>

        <el-table-column align="center" label="操作" min-width="7%">
          <template slot-scope="scope">
            <div class="tableBtn" @click="openUpdateCountryComp(scope.row)">
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
                  @click="deleteSingleCountry(scope.row.id)"
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
    <create-country
      ref="createCountryComp"
      :pshow="createCountryComp.show"
      @on-show-change="oncreateCountryCompShowChange"
      @on-save-success="onSaveSuccess"
    ></create-country>
  </div>
</template>
<style lang="scss">
.country {
  height: 100%;
  .country-tableRow {
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
  getAllCountryList,
  deleteBatchCountry,
} from "api/publicBase/baseCountry";
import { Server } from "net";
import createCountry from "./createCountry";
//import {checkBtnPeimission,countryPage} from 'utils/btnRole'
import { getDicListByDitType } from "api/publicBase/dictionaryMng";
import { equClassifyList } from "consts/common";
import { warnMsg } from "utils/messageBox";
export default {
  name: "countryIndex",
  components: { createCountry },
  mixins: [tableMixin],
  data() {
    return {
      equClassifyList: equClassifyList,
      //countryPage,
      countryList: [],
      createCountryComp: {
        show: false,
      },
      search: {
        countryCode: "",
        chineseName: "",
        englishName: "",
        filter: "",
        isdun: "",
        isAgm: "",
        isIden: "",
        isPestArea: "",
        continentList: [],
        continent: "",
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
        CountryCode: this.search.countryCode,
        ChineseName: this.search.chineseName,
        EnglishName: this.search.englishName,
        IsAGM: this.search.isAgm,
        isCount: this.search.isIden,
        IsPestArea: this.search.isPestArea,
        Continent: this.search.continent,
        maxResultCount: this.page.pageSize,
        skipCount: (this.page.currentPage - 1) * this.page.pageSize,
        sorting: this.table.order.sort,
      };

      getAllCountryList(data).then((res) => {
        this.table.loading = false;
        if (res.success) {
          this.countryList = res.result.items;
          this.countryList.forEach((item) => {
            this.$set(item, "popShow", false);
          });
          this.page.total = res.result.totalCount;
        }
      });
    },
    //取所属大洲列表
    getContinentList() {
      getDicListByDitType({ TypeCode: "DZLX", Code: "", Name: "" }).then(
        (res) => {
          this.search.continentList = res.result;
        }
      );
    },
    //删除单个国家
    deleteSingleCountry(id) {
      deleteBatchCountry([id]).then((res) => {
        this.batchDeleteSearch();
      });
    },
    //打开新增国家窗口
    openAddCountryComp() {
      this.createCountryComp.show = true;
      //取所属大洲列表
      this.$refs.createCountryComp.getContinentList();
    },
    //打开编辑国家窗口
    openUpdateCountryComp(row) {
      this.createCountryComp.show = true;
      //取所属大洲列表
      this.$refs.createCountryComp.getContinentList();
      this.$refs.createCountryComp.getCountryInfoById(row.id);
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
        deleteBatchCountry(arr).then((res) => {
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
    oncreateCountryCompShowChange(val) {
      this.createCountryComp.show = val;
    },
    //新增或编辑用户成功事件
    onSaveSuccess() {
      this.getTableList();
    },
  },
  created() {
    this.getContinentList();
    this.getTableList();
  },
};
</script>