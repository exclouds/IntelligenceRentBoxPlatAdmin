<template>
  <div class="createUser">
    <el-dialog
      :title="'箱东发布信息'"
      v-dialogDrag
      :visible.sync="windowShow"
      width="1200px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        size="mini"
        :model="form"
        ref="ruleForm"
        :rules="rules"
        label-width="100px"
      >
        <el-row>
          <el-col :span="12">
            <el-row>
              <el-col :span="12">
                <el-form-item label="单号：" prop="billNo">
                  <el-input
                    size="mini"
                    v-model="form.billNo"
                    placeholder="请输入单号"
                    readonly
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="起运站：" prop="startStation">
                  <el-select
                    v-model="form.startStation"
                    collapse-tags
                    placeholder=""
                    style="width: 100%"
                    disabled
                  >
                    <el-option
                      v-for="item in ZDs"
                      :key="item.value"
                      :label="item.displayText"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="目的站：" prop="endStation">
                  <el-select
                    v-model="form.endStation"
                    collapse-tags
                    placeholder=""
                    style="width: 100%"
                    disabled
                  >
                    <el-option
                      v-for="item in ZDs"
                      :key="item.value"
                      :label="item.displayText"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="还箱地：" prop="returnStation">
                  <el-select
                    v-model="form.returnStation"
                    collapse-tags
                    placeholder=""
                    style="width: 100%"
                    disabled
                  >
                    <el-option
                      v-for="item in ZDs"
                      :key="item.value"
                      :label="item.displayText"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12">
                <el-form-item label="是否库存：" prop="isInStock">
                  <el-switch v-model="form." disabled></el-switch>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="预计到站时间：" prop="predictTime">
                  <el-date-picker
                    v-model="form.predictTime"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:dd"
                    format="yyyy-MM-dd HH:mm"
                    placeholder=""
                    style="width: 100%"
                    disabled
                  />
                </el-form-item>
              </el-col> -->
              <el-col :span="12">
                <el-form-item label="租金：" prop="sellingPrice">
                  <el-input
                    size="mini"
                    v-model="form.sellingPrice"
                    placeholder=""
                    readonly
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="有效时间起：" prop="effectiveSTime">
                  <el-date-picker
                    v-model="form.effectiveSTime"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:dd"
                    format="yyyy-MM-dd HH:mm"
                    placeholder=""
                    style="width: 100%"
                    disabled
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="有效时间止：" prop="effectiveETime">
                  <el-date-picker
                    v-model="form.effectiveETime"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:dd"
                    format="yyyy-MM-dd HH:mm"
                    placeholder=""
                    style="width: 100%"
                    disabled
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="所属路线：" prop="line">
                  <el-select
                    v-model="form.line"
                    collapse-tags
                    placeholder=""
                    style="width: 100%"
                    disabled
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
              <el-col :span="12">
                <el-form-item label="制单人：" prop="createName">
                  <el-input
                    size="mini"
                    v-model="form.createName"
                    placeholder=""
                    readonly
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="公司：" prop="company">
                  <el-input
                    size="mini"
                    v-model="form.company"
                    placeholder=""
                    readonly
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="电话：" prop="telNumber">
                  <el-input
                    size="mini"
                    maxlength="13"
                    v-model="form.telNumber"
                    placeholder=""
                    readonly
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="手机：" prop="phoneNumber">
                  <el-input
                    size="mini"
                    maxlength="13"
                    v-model="form.phoneNumber"
                    placeholder=""
                    readonly
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注：" prop="remarks">
                  <el-input
                    type="textarea"
                    :maxlength="500"
                    :autosize="{ minRows: 5, maxRows: 5 }"
                    v-model="form.remarks"
                    placeholder=""
                    readonly
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item
                  label="审批意见："
                  prop="verifyRem"
                  v-if="pageType != 'recomInfo'"
                >
                  <el-input
                    type="textarea"
                    :maxlength="500"
                    :autosize="{ minRows: 5, maxRows: 5 }"
                    v-model="form.verifyRem"
                    placeholder=""
                    :readonly="pageType == 'info'"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row style="padding: 10px">
              <div style="padding-bottom: 10px; padding-left: 15px">
                附件信息
              </div>
            </el-row>
            <el-row>
              <el-col :span="22" :offset="1">
                <el-table
                  :cell-class-name="tableRowClassName"
                  v-loading="table.loading"
                  :data="filelist"
                  :row-key="getRowKeys"
                  border
                  stripe
                  highlight-current-rowc
                  fit
                  height="300px"
                  style="width: 100%"
                  ref="table"
                >
                  <el-table-column
                    type="index"
                    align="center"
                    label="序号"
                    width="50"
                  >
                    <template slot-scope="scope">{{
                      countIndex(scope.$index)
                    }}</template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="name"
                    show-overflow-tooltip
                    label="文件名称"
                  >
                    <template slot-scope="scope">
                      <div
                        class="tableBtn"
                        @click="showimg(scope.row.url)"
                        v-if="scope.row.url != '' && scope.row.url != null"
                      >
                        {{ scope.row.name }}
                      </div>
                      <span v-else>{{ scope.row.url }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="creationTime"
                    label="上传时间"
                    width="150"
                    show-overflow-tooltip
                  >
                    <template slot-scope="scope">{{
                      scope.row.creationTime | parseTime()
                    }}</template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="save(true)"
          size="small"
          v-if="pageType == 'update'"
          >通过</el-button
        >
        <el-button
          type="danger"
          @click="save(false)"
          size="small"
          v-if="pageType == 'update'"
          :loading="btnloading"
          >不通过</el-button
        >
        <el-button @click="windowShow = false" size="small" :loading="btnloading">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style lang="scss">
.createUser {
  .orgForm {
    .el-form-item__content {
      height: 28px;
    }
  }
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
    left: 0;
    background-color: #fff;
    z-index: 10;
    padding: 0;
    margin: 0;
    width: 300px;
    height: 450px;
    clear: both;
  }
  .el-input.is-disabled .el-input__inner {
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #606266;
    cursor: not-allowed;
  }
  .el-textarea.is-disabled .el-textarea__inner {
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #606266;
    cursor: not-allowed;
  }
}
</style>
<script>
import treeSelect from "components/treeSelect/treeSelect";
import tree from "components/tree/tree";
import {
  updateBoxReleaseInfo,
  getBoxReleaseInfoById,
} from "api/releaseReview/boxReleaseReview";
import { warnMsg, successMsg } from "utils/messageBox";
import { getDicListByDitType } from "api/publicBase/dictionaryMng";
import { getSiteList, getLineList } from "api/publicBase/Combox";
import { GetUPFile } from "api/publicBase/Attachment";
import { tableMixin } from "mixin/commTable";
export default {
  components: {
    treeSelect,
    tree,
  },
  props: {
    pshow: {
      type: Boolean,
      default: false,
    },
  },
  mixins: [tableMixin],
  watch: {
    pshow(newValue, oldValue) {
      this.windowShow = newValue;
    },
    windowShow(newValue, oldValue) {
      if (this.$refs["ruleForm"]) this.$refs["ruleForm"].resetFields(); //清空验证

      if (!newValue) {
        //窗口关闭
        this.form = {
          id: "",
          billNo: "",
          startStation: "",
          endStation: "",
          returnStation: "",
          //isInStock: undefined,
          //predictTime: undefined,
          effectiveSTime: undefined,
          effectiveETime: undefined,
          sellingPrice: 0,
          line: "1",
          remarks: "",
          verifyRem: "",
          createName: "",
          company: "",
          telNumber: "",
          phoneNumber: "",
        };
        this.filelist = [];
        this.treeComp.choosedTreeNodeId = [];
        this.btnloading=false;
        this.$emit("on-show-change", newValue);
      }
    },
  },
  data() {
    return {
      pageType: "", //insert update
      windowShow: this.pshow,
      btnloading:false,
      form: {
        id: "",
        billNo: "",
        startStation: "",
        endStation: "",
        returnStation: "",
        //: undefined,
        //predictTime: undefined,
        effectiveSTime: undefined,
        effectiveETime: undefined,
        sellingPrice: 0,
        line: "1",
        remarks: "",
        verifyRem: "",
        createName: "",
        company: "",
        telNumber: "",
        phoneNumber: "",
      },
      rules: {},
      ZDs: [],
      Lines: [],
      treeComp: {
        show: false,
        data: [],
        choosedTreeNodeId: [], //回显树节点ID
      },
      deptreeComp: {
        data: [],
      },
      filelist: [],
    };
  },
  methods: {
    getRowKeys(row) {
      return row.id.toString();
    },
    //添加查询combox
    setComBox() {
      getSiteList({
        CountryCode: "",
        IsEnable: true,
      }).then((res) => {
        this.ZDs = res.result;
      });
      getLineList({
        Code: "",
        IsEnable: true,
      }).then((res) => {
        this.Lines = res.result;
      });
      // getDicListByDitType({
      //   BaseKeyValueTypeCode: "ZD",
      //   Code: "",
      //   Name: "",
      // }).then((res) => {
      //   this.ZDs = res.result.comboxs;
      // });
      // getDicListByDitType({
      //   BaseKeyValueTypeCode: "LX",
      //   Code: "",
      //   Name: "",
      // }).then((res) => {
      //   this.Lines = res.result.comboxs;
      // });
    },
    //单击树选择框控件
    ontreeShowChange(val) {
      this.treeComp.show = val;
    },
    //树数据回调事件
    onNodeClick() {
      var codes = this.form.choosedTreeNode.toString();

      this.form.code = codes;
      this.getdeplist("");
    },
    //
    onClickOutSide() {
      if (this.treeComp.show == true) {
        this.treeComp.show = false;
        this.$refs.chooseEquNode.iconChange();
      }
    },
    //获取单个用户
    getBoxReleaseInfoById(boxId) {
      getBoxReleaseInfoById({ id: boxId }).then((res) => {
        this.form.id = res.result.boxInfo.id;
        this.form.billNo = res.result.boxInfo.billNO;
        this.form.startStation = res.result.boxInfo.startStation;
        this.form.endStation = res.result.boxInfo.endStation;
        this.form.returnStation = res.result.boxInfo.returnStation;
        //this.form.isInStock = res.result.boxInfo.isInStock;
        //this.form.predictTime = res.result.boxInfo.predictTime;
        this.form.effectiveSTime = res.result.boxInfo.effectiveSTime;
        this.form.effectiveETime = res.result.boxInfo.effectiveETime;
        this.form.sellingPrice = res.result.boxInfo.sellingPrice;
        this.form.line = res.result.boxInfo.line.toString();
        this.form.remarks = res.result.boxInfo.remarks;
        this.form.verifyRem = res.result.boxInfo.verifyRem;
        this.form.createName = res.result.createName;
        this.form.company = res.result.company;
        this.form.telNumber = res.result.telNumber;
        this.form.phoneNumber = res.result.phoneNumber;
      });
    },
    //提交
    save(flag) {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          if (this.pageType == "update") {
            if (this.form.verifyRem === "") {
              if (flag) {
                this.form.verifyRem = "审批通过";
              } else {
                warnMsg("请填写审批意见");
                return;
              }
            }
            let data = {
              id: this.form.id,
              isVerify: true,
              verifyRem: this.form.verifyRem,
              isEnable: flag,
            };
            this.btnloading=true;
            updateBoxReleaseInfo(data).then((res) => {
              successMsg("审批成功");
               this.btnloading=false;
               this.windowShow = false;             
               this.$emit("on-save-success");
            })
            .catch(err=>{
              this.btnloading=false;
            });
          }
        }
      });
    },
    getfileList(id, billNo) {
      this.table.loading = true;
      GetUPFile({ id: id, billno: billNo })
        .then((res) => {
          if (res.success) {
            this.filelist = res.result;
            this.table.loading = false;
          }
        })
        .catch(() => {
          this.table.loading = true;
        });
    },
    showimg(eleurl) {
      if (eleurl === "" || eleurl === null) {
        warnMsg("未找相关附件地址");
        return;
      }
      window.open(eleurl, "_blank");
    },
  },
  created() {
    this.setComBox();
  },
};
</script>