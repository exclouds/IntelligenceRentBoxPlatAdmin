<template>
  <div class="app-container userMng">
    <el-form size="mini" label-width="100px" role="rules">
      <el-row style="margin-bottom: 10px">
        <!-- <el-col :span="4">
          <el-form-item label="单号：" prop="billNo">
            <el-input
              placeholder="*请填写完整单号"
              v-model="search.billNo"
              size="mini"
              clearable
              @change="onBelongChange()"
              @keydown="getTableList()"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item
            label=""
            prop="belong"
            style="position: relative"
            label-width="10px"
          >
            <el-select
              v-model="search.belong"
              collapse-tags
              placeholder=""
              style="width: 100%"
              @change="getTableList()"
            >
              <el-option
                v-for="item in belongs"
                :key="item.val"
                :label="item.name"
                :value="item.val"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
        <el-col :span="4">
          <el-form-item label="提箱地：" prop="startStation">
            <big-data-select
              class="cusEnabled"
              :val.sync="search.startStation"
              placeholder="请选择提箱地"
              style="width: 100%"
              size="mini"
              clearable
              filterable
              :data="qyz"
              optionkey="displayText"
              optionValue="value"
            ></big-data-select>
            <!-- <el-select
              v-model="search.startStation"
              collapse-tags
              placeholder="请选择提箱地"
              style="width: 100%"
              clearable
              filterable
            >
              <el-option
                v-for="item in qyz"
                :key="item.value"
                :label="item.displayText"
                :value="item.value"
              ></el-option>
            </el-select> -->
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="还箱地：" prop="endStation">
            <big-data-select
              class="cusEnabled"
              :val.sync="search.endStation"
              placeholder="请选择还箱地"
              style="width: 100%"
              size="mini"
              clearable
              filterable
              :data="qyz"
              optionkey="displayText"
              optionValue="value"
            ></big-data-select>
            <!-- <el-select
              v-model="search.endStation"
              collapse-tags
              placeholder="请选择还箱地"
              style="width: 100%"
              clearable
              filterable
            >
              <el-option
                v-for="item in mdz"
                :key="item.value"
                :label="item.displayText"
                :value="item.value"
              ></el-option>
            </el-select> -->
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="路线：" prop="line">
            <el-select
              v-model="search.line"
              collapse-tags
              placeholder="请选择路线"
              style="width: 100%"
            >
              <el-option
                v-for="item in Lines"
                :key="item.value"
                :label="item.displayText"
                :value="item.value"
              ></el-option>
            </el-select>
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
        <el-col :span="6">
          <el-form-item label="" prop="" label-width="20px">
            <el-button
              type="primary"
              size="mini"
              @click="
                onSearchBefore();
                getTableList();
              "
              >搜索</el-button
            >
            <el-button type="primary" size="mini" @click="onInfoMate()"
              >信息匹配</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-col :span="12" style="padding-left: 15px"
        ><el-tag style="border: 0px; background-color: white"
          >箱东发布信息</el-tag
        ></el-col
      >
      <el-col :span="12" style="padding-left: 15px"
        ><el-tag style="border: 0px; background-color: white"
          >租箱匹配信息</el-tag
        ></el-col
      >
    </el-row>
    <el-row style="height: calc(100% - 180px)">
      <el-col :span="12" style="height: calc(100%)">
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
          <!-- v-if="search.belong == 'XD'" -->
          <!-- <el-table-column type="index" align="center" label="序号">
            <template slot-scope="scope">
                {{countIndex(scope.$index)}}
            </template>
        </el-table-column> fixed="left"-->
          <el-table-column
            :reserve-selection="true"
            type="selection"
            width="50"
            fixed="left"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="billNO"
            label="单号"
            show-overflow-tooltip
            width="100"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="startStation"
            label="提箱地"
            show-overflow-tooltip
            width="90"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="endStation"
            label="还箱地"
            show-overflow-tooltip
            width="90"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="line"
            label="所属路线"
            show-overflow-tooltip
            width="80"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="xxcc"
            label="尺寸箱型"
            show-overflow-tooltip
            width="120"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="price"
            label="租金"
            show-overflow-tooltip
            width="80"
          ></el-table-column>
          <!-- <el-table-column
            align="center"
            prop="returnStation"
            label="还箱地"
            show-overflow-tooltip
            width="90"
          ></el-table-column> -->
          <!-- <el-table-column
          align="center"
          prop="isInStock"
          label="是否库存"
          show-overflow-tooltip
          width="100"
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
            width="115"
          >
            <!-- <template slot-scope="scope">
            {{
              scope.row.effectiveSTime | parseTime("{y}-{m}-{d} {h}:{i}:{s}")
            }}
          </template> -->
          </el-table-column>
          <el-table-column
            align="center"
            prop="effectiveETime"
            label="有效时间止"
            show-overflow-tooltip
            width="115"
          >
            <!-- <template slot-scope="scope">
            {{
              scope.row.effectiveETime | parseTime("{y}-{m}-{d} {h}:{i}:{s}")
            }}
          </template> -->
          </el-table-column>
          <!-- <el-table-column
          align="center"
          prop="remarks"
          label="备注"
          show-overflow-tooltip
          min-width="80"
        ></el-table-column>
        <el-table-column align="center" label="操作" width="100px">
          <template slot-scope="scope">
            <div class="tableBtn" @click="openInfoComp(scope.row)">详情</div>
          </template>
        </el-table-column> -->
        </el-table>
      </el-col>
      <el-col :span="12" style="height: calc(100%); padding-left: 10px">
        <Inter-Recom ref="interRecomComp"></Inter-Recom>
      </el-col>
    </el-row>
    <el-row>
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
    <!-- <el-row style="height: calc(30%)">
      <Box-Details ref="boxDetailsComp" style="margin-top: 50px"></Box-Details>
    </el-row> -->
    <Tenant-Release
      ref="createTenantComp"
      :pshow="createTenantComp.show"
      @on-show-change="oncreateTenantCompShowChange"
      @on-save-success="onSaveSuccess"
    ></Tenant-Release>
    <Box-Release
      ref="createBoxComp"
      :pshow="createBoxComp.show"
      @on-show-change="oncreateBoxCompShowChange"
      @on-save-success="onSaveSuccess"
    ></Box-Release>
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
import interRecom from "./interRecom";
import tenantReleaseReviewInfoIndex from "../review/releaseReview/tenantReleaseReviewInfoIndex";
import boxReleaseReviewInfoIndex from "../review/releaseReview/boxReleaseReviewInfoIndex";
import {
  getInterRecomList,
  getInterRecomAllList,
} from "api/releaseReview/interRecom";
import { getSiteList, getLineList } from "api/publicBase/Combox";
import { warnMsg, successMsg } from "utils/messageBox";
import { checkBtnPeimission, RegisterReview } from "utils/btnRole";
export default {
  name: "interRecomQuery",
  mixins: [tableMixin],
  components: {
    "Tenant-Release": tenantReleaseReviewInfoIndex,
    "Box-Release": boxReleaseReviewInfoIndex,
    "Box-Details": boxDetailsIndex,
    "Inter-Recom": interRecom,
  },
  data() {
    return {
      RegisterReview,
      tableList: [],
      zkTableList: [],
      search: {
        //billNo: "",
        //belong: "",
        startStation: "",
        endStation: "",
        effectiveSTime: undefined,
        effectiveETime: undefined,
        size: "",
        box: "",
        line: "",
      },
      belongs: [
        { name: "箱东", val: "XD" },
        { name: "租客", val: "ZK" },
      ],
      createTenantComp: {
        show: false,
      },
      createBoxComp: {
        show: false,
      },
      qyz: [],
      mdz: [],
      Lines: [],
      rules: {
        // billNo: [
        //   { required: true, message: "请输入完整单号", trigger: "blur" },
        // ],
        // belong: [{ required: true, message: "请选择类别", trigger: "change" }],
      },
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
      getLineList({
        Code: "",
        IsEnable: true,
      }).then((res) => {
        this.Lines = res.result;
      });
    },
    getRowKeys(row) {
      return row.id.toString();
    },
    //获取用户列表
    getTableList() {
      // if (this.search.billNo.length > 2) {
      //   var bel = this.search.billNo.substring(0, 2);
      //   if (bel == "XD") {
      //     this.search.belong = "ZK";
      //   } else if (bel == "ZK") {
      //     this.search.belong = "XD";
      //   }
      // }
      let data = {
        maxResultCount: this.page.pageSize,
        skipCount: (this.page.currentPage - 1) * this.page.pageSize,
        //billNo: this.search.billNo,
        //belong: this.search.belong,
        startStation: this.search.startStation,
        endStation: this.search.endStation,
        effectiveSTime: this.search.effectiveSTime,
        effectiveETime: this.search.effectiveETime,
        size: this.search.size,
        box: this.search.box,
        line: this.search.line,
      };

      this.tableData = [];
      this.table.loading = true;
      this.$refs.interRecomComp.table.loading = true;
      getInterRecomAllList(data)
        .then((res) => {
          this.table.loading = false;
          this.$refs.interRecomComp.table.loading = false;
          if (res.success) {
            this.tableList = res.result.xdlist;
            this.$refs.interRecomComp.tableList = res.result.zklist;
            // if (this.search.belong == "XD") {
            //   this.tableList = res.result.xdlist;
            // }
            // if (this.search.belong == "ZK") {
            //   this.tableList = res.result.zklist;
            // }
            // this.tableList.forEach((item) => {
            //   this.$set(item, "popShow", false);
            //   this.$set(item, "pop1Show", false);
            // });
            this.page.total = res.result.totalCount;
            this.$refs.boxDetailsComp.tableList = [];
          }
        })
        .catch((err) => {
          this.table.loading = false;
          this.$refs.interRecomComp.table.loading = false;
        });
    },
    //打开详情租客信息窗口
    openInfoComp(row) {
      if (this.search.belong == "ZK") {
        this.createTenantComp.show = true;
        this.$refs.createTenantComp.pageType = "recomInfo";
        this.$refs.createTenantComp.getTenantReleaseInfoById(row.id);
        this.$refs.createTenantComp.getfileList(row.id, row.billNO);
      }
      if (this.search.belong == "XD") {
        this.createBoxComp.show = true;
        this.$refs.createBoxComp.pageType = "recomInfo";
        this.$refs.createBoxComp.getBoxReleaseInfoById(row.id);
        this.$refs.createBoxComp.getfileList(row.id, row.billNO);
      }
    },
    oncreateTenantCompShowChange(val) {
      this.createTenantComp.show = val;
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
    onBelongChange() {
      if (this.search.billNo.length > 2) {
        var bel = this.search.billNo.substring(0, 2);
        if (bel == "XD") {
          this.search.belong = "ZK";
        } else if (bel == "ZK") {
          this.search.belong = "XD";
        }
      }
    },
    onInfoMate() {
      if (this.table.choosedRow.length === 0) {
        warnMsg("请选择箱东发布信息");
        return;
      }
      if (this.table.choosedRow.length > 1) {
        warnMsg("请选择其中一条箱东发布信息");
        return;
      }
      if (this.$refs.interRecomComp.table.choosedRow.length === 0) {
        warnMsg("请选择租客匹配信息");
        return;
      }
      if (this.$refs.interRecomComp.table.choosedRow.length > 1) {
        warnMsg("请选择其中一条租客匹配信息");
        return;
      }
      this.$router.push({
        path: "boxTenantOrderQueryIndex",
        query: {
          bNo: this.table.choosedRow[0].billNO,
          tNo: this.$refs.interRecomComp.table.choosedRow[0].billNO,
        },
      });
    },
  },
  created() {
    this.setComBox();
    //this.search.belong = "XD";
    //this.getTableList();
  },
};
</script>