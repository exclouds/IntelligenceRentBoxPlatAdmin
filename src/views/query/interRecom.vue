<template>
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
    <!-- v-if="search.belong == 'ZK'" -->
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
      label="起运站"
      show-overflow-tooltip
      width="90"
    ></el-table-column>
    <el-table-column
      align="center"
      prop="endStation"
      label="目的站"
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
      label="期望成交价"
      show-overflow-tooltip
      width="100"
    ></el-table-column>
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
</template>

<script>
import { tableMixin } from "mixin/commTable";
export default {
  mixins: [tableMixin],
  data() {
    return {
      tableList: [],
    };
  },
  methods: {
    getRowKeys(row) {
      return row.id.toString();
    },
    onloadRefTable(loading) {
      this.table.loading = loading;
    },
  },
  created() {},
};
</script>

<style>
</style>