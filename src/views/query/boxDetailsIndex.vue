<template>
  <div class="app-container userMng">
    <el-row style="height: calc(100%)">
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
          prop="BoxTenantInfo"
          label="箱东信息"
          show-overflow-tooltip
          width="100"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="Box"
          label="箱型"
          show-overflow-tooltip
          width="120"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="Size"
          label="尺寸"
          show-overflow-tooltip
          width="120"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="Quantity"
          label="箱量"
          show-overflow-tooltip
          width="120"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="BoxNO"
          label="箱号"
          show-overflow-tooltip
          width="120"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="BoxAge"
          label="箱龄"
          show-overflow-tooltip
          width="200"
        ></el-table-column>
        <!-- <el-table-column
          align="center"
          prop="IsVerify"
          label="是否审核"
          show-overflow-tooltip
          width="120"
        ></el-table-column> -->
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
import { getBoxDetailsInfoList } from "api/releaseReview/boxDetails";
import { warnMsg, successMsg } from "utils/messageBox";
import treeSelect from "components/treeSelect/treeSelect";
import tree from "components/tree/tree";
import { checkBtnPeimission, RegisterReview } from "utils/btnRole";
export default {
  name: "boxReleaseReviewIndex",
  mixins: [tableMixin],
  components: {
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
        boxTenantId: "",
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
        filter: "",
        boxTenantId: this.search.BoxTenantId,
      };

      this.tableData = [];

      this.table.loading = true;
      getBoxDetailsInfoList(data)
        .then((res) => {
          this.table.loading = false;
          if (res.success) {
            this.tableList = res.result.items;
            this.tableList.forEach((item) => {
              this.$set(item, "popShow", false);
              this.$set(item, "pop1Show", false);
            });
            this.page.total = res.result.totalCount;
          }
        })
        .catch((err) => {
          this.table.loading = false;
        });
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
  },
  created() {
    this.getTableList();
    this.search.IsVerify = false;
  },
};
</script>