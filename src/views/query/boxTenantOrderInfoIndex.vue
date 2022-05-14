<template>
  <div class="createUser">
    <el-dialog
      :title="'箱东发布信息审批'"
      v-dialogDrag
      :visible.sync="windowShow"
      width="800px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-row>
        <el-col>
          <el-card>
            <el-form
              size="mini"
              :model="form"
              ref="ruleForm"
              :rules="rules"
              label-width="100px"
            >
              <el-row>
                <el-col :span="12">
                  <el-form-item label="单号：" prop="billNo">
                    <el-input
                      size="mini"
                      maxlength="10"
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
                      placeholder="请选择起运站"
                      style="width: 100%"
                      readonly
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
                      placeholder="请选择目的站"
                      style="width: 100%"
                      readonly
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
                      placeholder="请选择还箱站"
                      style="width: 100%"
                      readonly
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
                  <el-form-item label="是否库存：" prop="isInStock">
                    <el-switch v-model="form.isInStock"></el-switch>
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
                      placeholder="选择日期"
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="有效时间起：" prop="effectiveSTime">
                    <el-date-picker
                      v-model="form.effectiveSTime"
                      type="datetime"
                      value-format="yyyy-MM-dd HH:mm:dd"
                      format="yyyy-MM-dd HH:mm"
                      placeholder="选择日期"
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="有效时间止：" prop="effectiveETime">
                    <el-date-picker
                      v-model="form.effectiveETime"
                      type="datetime"
                      value-format="yyyy-MM-dd HH:mm:dd"
                      format="yyyy-MM-dd HH:mm"
                      placeholder="选择日期"
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="租金：" prop="sellingPrice">
                    <el-input
                      size="mini"
                      maxlength="10"
                      v-model="form.sellingPrice"
                      placeholder="请输入租金"
                      readonly
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="所属路线：" prop="">
                    <el-select
                      v-model="form.line"
                      collapse-tags
                      placeholder="请选择路线"
                      style="width: 100%"
                      readonly
                    >
                      <el-option
                        v-for="item in lines"
                        :key="item.value"
                        :label="item.displayText"
                        :value="item.value"
                      ></el-option>
                    </el-select>
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
                  <el-form-item label="审批意见：" prop="verifyRem">
                    <el-input
                      type="textarea"
                      :maxlength="500"
                      :autosize="{ minRows: 5, maxRows: 5 }"
                      v-model="form.verifyRem"
                      placeholder=""
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-card>
        </el-col>
        <el-col>
          <el-card>
            <el-form
              size="mini"
              :model="form"
              ref="ruleForm"
              :rules="rules"
              label-width="100px"
            >
              <el-row>
                <el-col :span="12">
                  <el-form-item label="单号：" prop="billNo">
                    <el-input
                      size="mini"
                      maxlength="10"
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
                      placeholder="请选择起运站"
                      style="width: 100%"
                      readonly
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
                      placeholder="请选择目的站"
                      style="width: 100%"
                      readonly
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
                  <el-form-item label="有效时间起：" prop="effectiveSTime">
                    <el-date-picker
                      v-model="form.effectiveSTime"
                      type="datetime"
                      value-format="yyyy-MM-dd HH:mm:dd"
                      format="yyyy-MM-dd HH:mm"
                      placeholder="选择日期"
                      style="width: 100%"
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
                      placeholder="选择日期"
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="租金：" prop="sellingPrice">
                    <el-input
                      size="mini"
                      maxlength="10"
                      v-model="form.hopePrice"
                      placeholder="请输入租金"
                      readonly
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="所属路线：" prop="line">
                    <el-select
                      v-model="form.line"
                      collapse-tags
                      placeholder="请选择路线"
                      style="width: 100%"
                      readonly
                    >
                      <el-option
                        v-for="item in lines"
                        :key="item.value"
                        :label="item.displayText"
                        :value="item.value"
                      ></el-option>
                    </el-select>
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
                  <el-form-item label="审批意见：" prop="verifyRem">
                    <el-input
                      type="textarea"
                      :maxlength="500"
                      :autosize="{ minRows: 5, maxRows: 5 }"
                      v-model="form.verifyRem"
                      placeholder=""
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save(true)" size="small"
          >通过</el-button
        >
        <el-button type="danger" @click="save(false)" size="small"
          >不通过</el-button
        >
        <el-button @click="windowShow = false" size="small">取 消</el-button>
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
          isInStock: undefined,
          predictTime: undefined,
          effectiveSTime: undefined,
          effectiveETime: undefined,
          sellingPrice: 0,
          line: undefined,
          remarks: "",
          verifyRem: "",
        };
        this.treeComp.choosedTreeNodeId = [];
        this.$emit("on-show-change", newValue);
      }
    },
  },
  data() {
    return {
      pageType: "", //insert update
      windowShow: this.pshow,
      form: {
        id: "",
        billNo: "",
        startStation: "",
        endStation: "",
        returnStation: "",
        isInStock: undefined,
        predictTime: undefined,
        effectiveSTime: undefined,
        effectiveETime: undefined,
        sellingPrice: 0,
        line: undefined,
        remarks: "",
        verifyRem: "",
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
    };
  },
  methods: {
    //添加查询combox
    setComBox() {
      getDicListByDitType({
        BaseKeyValueTypeCode: "ZD",
        Code: "",
        Name: "",
      }).then((res) => {
        this.ZDs = res.result.comboxs;
      });
      getDicListByDitType({
        BaseKeyValueTypeCode: "LX",
        Code: "",
        Name: "",
      }).then((res) => {
        this.HXs = res.result.comboxs;
      });
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
        this.form.id = res.result.id;
        this.form.billNo = res.result.BillNO;
        this.form.startStation = res.result.StartStation;
        this.form.endStation = res.result.EndStation;
        this.form.returnStation = res.result.ReturnStation;
        this.form.isInStock = res.result.IsInStock;
        this.form.predictTime = res.result.PredictTime;
        this.form.effectiveSTime = res.result.EffectiveSTime;
        this.form.effectiveETime = res.result.EffectiveETime;
        this.form.sellingPrice = res.result.SellingPrice;
        this.form.line = res.result.user.Line;
        this.form.remarks = res.result.Remarks;
        this.form.verifyRem = res.result.VerifyRem;
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
              Id: this.form.id,
              IsVerify: true,
              VerifyRem: this.form.verifyRem,
              IsEnable: flag,
            };
            updateBoxReleaseInfo(data).then((res) => {
              successMsg("审批成功");
              this.windowShow = false;
              this.$emit("on-save-success");
            });
          }
        }
      });
    },
  },
  created() {
    this.setComBox();
  },
};
</script>