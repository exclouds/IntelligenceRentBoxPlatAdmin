<template>
  <div class="app-container boxReleaseReview">
    <el-form size="mini" label-width="100px">
      <el-row style="margin-bottom: 10px">
        <el-col :span="3">
          <el-form-item
            label="审核状态："
            prop="IsVerify"
            style="position: relative"
          >
            <el-select
              v-model="search.IsVerify"
              collapse-tags
              placeholder="审核状态"
              style="width: 100%"
            >
              <el-option
                v-for="item in isVerifys"
                :key="item.val"
                :label="item.name"
                :value="item.val"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="单号：" prop="">
            <el-input
              placeholder="单号"
              style="width: 100%"
              v-model="search.name"
              size="mini"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="4">
          <el-form-item label="尺寸：" prop="">
            <el-input
              placeholder="尺寸"
              style="width: 100%"
              v-model="search.CC"
              size="mini"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="箱型：" prop="">
            <el-input
              placeholder="箱型"
              style="width: 100%"
              v-model="search.XX"
              size="mini"
              clearable
            ></el-input>
          </el-form-item>
        </el-col> -->
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
    <el-row style="height: calc(70% - 150px)">
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
          label="提箱地"
          show-overflow-tooltip
          width="120"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="endStation"
          label="还箱地"
          show-overflow-tooltip
          width="120"
        ></el-table-column>
        <!-- <el-table-column
          align="center"
          prop="returnStation"
          label="还箱地"
          show-overflow-tooltip
          width="120"
        ></el-table-column> -->
        <!-- <el-table-column
          align="center"
          prop="isInStock"
          label="是否库存"
          show-overflow-tooltip
          width="80"
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
        </el-table-column> -->
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
          prop="sellingPrice"
          label="租金"
          show-overflow-tooltip
          width="100"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="lineName"
          label="所属路线"
          show-overflow-tooltip
          width="80"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="createName"
          label="制单人"
          show-overflow-tooltip
          width="80"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="company"
          label="公司"
          show-overflow-tooltip
          width="100"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="telNumber"
          label="电话"
          show-overflow-tooltip
          width="120"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="phoneNumber"
          label="手机"
          show-overflow-tooltip
          width="110"
        ></el-table-column>
        <!-- <el-table-column
          align="center"
          prop="IsEnable"
          label="是否启用"
          show-overflow-tooltip
          width="120"
        >
          <template slot-scope="scope">
            {{ scope.row.IsEnable ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="IsVerify"
          label="是否审核"
          show-overflow-tooltip
          width="120"
        >
          <template slot-scope="scope">
            {{ scope.row.IsVerify ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="VerifyRem"
          label="审核评语"
          show-overflow-tooltip
          width="80"
        ></el-table-column> -->
        <el-table-column
          align="center"
          prop="remarks"
          label="备注"
          show-overflow-tooltip
          min-width="80"
        ></el-table-column>
        <el-table-column
          align="center"
          label="操作"
          width="140px"
          fixed="right"
        >
          <template slot-scope="scope">
            <div
              class="tableBtn"
              @click="openUpdateUserComp(scope.row)"
              v-if="!search.IsVerify"
            >
              <!-- v-if="checkBtnPeimission(RegisterReview.review.permission)" -->
              审核
            </div>
            <div
              class="tableBtn"
              @click="openInfoComp(scope.row)"
              v-if="search.IsVerify"
            >
              详情
            </div>
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
      >
      </el-pagination>
    </el-row>
    <el-row style="height: calc(30%)">
      <Box-Details ref="boxDetailsComp" style="margin-top: 50px"></Box-Details>
    </el-row>
    <Box-Release
      ref="createBoxComp"
      :pshow="createBoxComp.show"
      @on-show-change="oncreateBoxCompShowChange"
      @on-save-success="onSaveSuccess"
    ></Box-Release>
  </div>
</template>
<style lang="scss">
.boxReleaseReview {
  height: 100%;
}
</style>
<script>
import { tableMixin } from "mixin/commTable";
import boxReleaseReviewInfoIndex from "./boxReleaseReviewInfoIndex";
import boxDetailsIndex from "./boxDetailsIndex";
import { getBoxReleaseInfoList } from "api/releaseReview/boxReleaseReview";
import { warnMsg, successMsg } from "utils/messageBox";
import treeSelect from "components/treeSelect/treeSelect";
import tree from "components/tree/tree";
import { checkBtnPeimission, RegisterReview } from "utils/btnRole";
export default {
  name: "boxReleaseReviewIndex",
  mixins: [tableMixin],
  components: {
    "Box-Release": boxReleaseReviewInfoIndex,
    "Box-Details": boxDetailsIndex,
    treeSelect,
    tree,
  },
  data() {
    return {
      RegisterReview,
      SetKesDept: {
        value: "nodeUUid",
        label: "nodeName",
        children: "children",
      }, //自定义  级联选择器value label
      tableList: [],
      search: {
        name: "",
        IsVerify: false,
      },
      isVerifys: [
        { name: "未审核", val: false },
        { name: "已审核", val: true },
      ],
      treeComp: {
        show: false,
        data: [],
      },
      choosedTreeNode: [],
      createBoxComp: {
        show: false,
      },
    };
  },
  methods: {
    checkBtnPeimission,
    getRowKeys(row) {
      return row.id.toString();
    },
    //获取用户列表
    getTableList() {
      let data = {
        maxResultCount: this.page.pageSize,
        skipCount: (this.page.currentPage - 1) * this.page.pageSize,
        filter: this.search.name,
        IsVerify: this.search.IsVerify,
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
      this.$refs.createBoxComp.getfileList(row.id, row.billNO);
    },
    openInfoComp(row) {
      this.createBoxComp.show = true;
      this.$refs.createBoxComp.pageType = "info";
      this.$refs.createBoxComp.getBoxReleaseInfoById(row.id);
      this.$refs.createBoxComp.getfileList(row.id, row.billNO);
    },
    oncreateBoxCompShowChange(val) {
      this.createBoxComp.show = val;
    },

    //添加或修改用户成功事件
    onSaveSuccess() {
      this.getTableList();
    },
    //树数据回调事件
    onNodeClick(
      clickNode //choosedNodeID
    ) {
      // this.form.parentId = clickNode.nodeId
      this.choosedTreeNode = clickNode;
      this.search.code = clickNode.nodeUUid;
      this.getdeplist();
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
    onRowDbclick(row, column, event) {
      this.$refs.boxDetailsComp.search.BoxTenantNO = row.billNO;
      this.$refs.boxDetailsComp.getTableList();
    },
  },
  created() {
    this.getTableList();
    this.search.IsVerify = false;
  },
};
</script>