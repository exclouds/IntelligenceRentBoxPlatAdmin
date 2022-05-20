<template>
  <div class="app-container userMng">
    <el-form size="mini" label-width="80px">
      <el-row style="margin-bottom: 10px">
        <el-col :span="4">
          <el-form-item label="起运站：" prop="startStation">
            <el-select
              v-model="search.startStation"
              collapse-tags
              placeholder="请选择起运站"
              style="width: 100%"
              readonly
            >
              <el-option
                v-for="item in qyz"
                :key="item.value"
                :label="item.displayText"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="目的站：" prop="endStation">
            <el-select
              v-model="search.endStation"
              collapse-tags
              placeholder="请选择目的站"
              style="width: 100%"
              readonly
            >
              <el-option
                v-for="item in mdz"
                :key="item.value"
                :label="item.displayText"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="有效时间："
            prop="effectiveSTime"
            label-width="100px"
          >
            <el-date-picker
              v-model="search.effectiveSTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:dd"
              format="yyyy-MM-dd HH:mm"
              placeholder="选择日期"
            />
            -
            <el-date-picker
              v-model="search.effectiveETime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:dd"
              format="yyyy-MM-dd HH:mm"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="尺寸：" prop="size" label-width="70px">
            <el-input
              placeholder="尺寸"
              v-model="search.size"
              size="mini"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="箱型：" prop="box" label-width="70px">
            <el-input
              placeholder="箱型"
              v-model="search.box"
              size="mini"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item
            label="完成状态："
            prop="IsVerify"
            style="position: relative"
          >
            <el-select
              v-model="search.finish"
              collapse-tags
              placeholder="完成状态"
              style="width: 100%"
            >
              <el-option
                v-for="item in finishes"
                :key="item.val"
                :label="item.name"
                :value="item.val"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="" prop="">
            <el-button
              type="primary"
              size="mini"
              @click="
                onSearchBefore();
                getTableList();
              "
              >搜索</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row style="height: calc(70% - 195px)">
      <el-table
        :cell-class-name="tableRowClassName"
        :data="tableList"
        :row-key="getRowKeys"
        v-loading="table.loading"
        @selection-change="onSelectChange"
        border
        stripe
        highlight-current-row
        fit
        height="100%"
        :cell-style="{ padding: '5px' }"
        style="width: 100%; height: 100%"
        ref="table"
        @row-click="onRowDbclick"
      >
        <!-- <el-table-column type="index" align="center" label="序号">
            <template slot-scope="scope">
                {{countIndex(scope.$index)}}
            </template>
        </el-table-column> fixed="left"-->
        <el-table-column
          :reserve-selection="true"
          type="selection"
          width="50"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="billNO"
          label="单号"
          show-overflow-tooltip
          width="120"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="startStation"
          label="起运站"
          show-overflow-tooltip
          width="120"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="endStation"
          label="目的站"
          show-overflow-tooltip
          width="120"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="returnStation"
          label="还箱地"
          show-overflow-tooltip
          width="120"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="isInStock"
          label="是否库存"
          show-overflow-tooltip
          width="120"
        >
          <template slot-scope="scope">
            {{ scope.row.IsInStock ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="predictTime"
          label="预计到站时间"
          show-overflow-tooltip
          width="145"
        >
          <template slot-scope="scope">
            {{ scope.row.predictTime | parseTime("{y}-{m}-{d} {h}:{i}:{s}") }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="effectiveSTime"
          label="有效时间起"
          show-overflow-tooltip
          width="145"
        >
          <template slot-scope="scope">
            {{
              scope.row.effectiveSTime | parseTime("{y}-{m}-{d} {h}:{i}:{s}")
            }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="effectiveETime"
          label="有效时间止"
          show-overflow-tooltip
          width="145"
        >
          <template slot-scope="scope">
            {{
              scope.row.effectiveETime | parseTime("{y}-{m}-{d} {h}:{i}:{s}")
            }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="lineName"
          label="所属路线"
          show-overflow-tooltip
          width="80"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="sellingPrice"
          label="租金"
          show-overflow-tooltip
          width="190"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="inquiryNum"
          label="询价次数"
          show-overflow-tooltip
          width="80"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="remarks"
          label="备注"
          show-overflow-tooltip
          min-width="80"
        ></el-table-column>
        <!-- <el-table-column align="center" label="操作" width="140px">
          <template slot-scope="scope">
            <div
              class="tableBtn"
              @click="openUpdateUserComp(scope.row)"
              v-if="!search.IsVerify"
            >
              审核
            </div>
            <div
              class="tableBtn"
              @click="openUpdateUserComp(scope.row)"
              v-if="search.IsVerify"
            >
              详情
            </div>
          </template>
        </el-table-column> -->
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
      >
      </el-pagination>
    </el-row>
    <el-row style="height: calc(30%)">
      <Box-Details ref="boxDetailsComp" style="margin-top: 50px"></Box-Details>
    </el-row>
  </div>
</template>
<style lang="scss">
.userMng {
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
}
</style>
<script>
import { tableMixin } from "mixin/commTable";
import boxDetailsIndex from "./boxDetailsIndex";
import { getBoxReleaseInfoList } from "api/releaseReview/boxReleaseReview";
import { warnMsg, successMsg } from "utils/messageBox";
import { checkBtnPeimission, RegisterReview } from "utils/btnRole";
import { getSiteList } from "api/publicBase/Combox";
export default {
  name: "boxReleaseQueryIndex",
  mixins: [tableMixin],
  components: {
    "Box-Details": boxDetailsIndex,
  },
  data() {
    return {
      RegisterReview,
      tableList: [],
      search: {
        name: "",
        startStation: "",
        endStation: "",
        effectiveSTime: undefined,
        effectiveETime: undefined,
        size: "",
        box: "",
        finish: false,
      },
      finishes: [
        { name: "未完成", val: false },
        { name: "已完成", val: true },
      ],
      createBoxComp: {
        show: false,
      },
      qyz: [],
      mdz: [],
    };
  },
  methods: {
    checkBtnPeimission,
    setComBox() {
      getSiteList({
        CountryCode: "",
        IsEnable: true,
      }).then((res) => {
        this.qyz = res.result;
        this.mdz = res.result;
      });
    },
    getRowKeys(row) {
      return row.id.toString();
    },
    //获取列表
    getTableList() {
      let data = {
        maxResultCount: this.page.pageSize,
        skipCount: (this.page.currentPage - 1) * this.page.pageSize,
        filter: this.search.name,
        IsVerify: true,
        startStation: this.search.startStation,
        endStation: this.search.endStation,
        effectiveSTime: this.search.effectiveSTime,
        effectiveETime: this.search.effectiveETime,
        size: this.search.size,
        box: this.search.box,
        finish: this.search.finish,
      };

      this.tableData = [];

      this.table.loading = true;
      getBoxReleaseInfoList(data)
        .then((res) => {
          this.table.loading = false;
          if (res.success) {
            this.tableList = res.result.items;
            this.tableList.forEach((item) => {
              this.$set(item, "popShow", false);
              this.$set(item, "pop1Show", false);
            });
            this.page.total = res.result.totalCount;

            this.$refs.boxDetailsComp.tableList = [];
          }
        })
        .catch((err) => {
          this.table.loading = false;
        });
    },
    //打开修改箱东信息窗口
    openUpdateUserComp(row) {
      this.createBoxComp.show = true;
      this.$refs.createBoxComp.pageType = "update";
      this.$refs.createBoxComp.getBoxReleaseInfoById(row.id);
    },
    oncreateBoxCompShowChange(val) {
      this.createBoxComp.show = val;
    },

    //添加或修改用户成功事件
    onSaveSuccess() {
      this.getTableList();
    },
    onRowDbclick(row, column, event) {
      this.$refs.boxDetailsComp.search.BoxTenantNO = row.billNO;
      this.$refs.boxDetailsComp.search.size = this.search.size;
      this.$refs.boxDetailsComp.search.box = this.search.box;
      this.$refs.boxDetailsComp.getTableList();
    },
  },
  created() {
    this.setComBox();
    this.getTableList();
    this.search.IsVerify = false;
  },
};
</script>