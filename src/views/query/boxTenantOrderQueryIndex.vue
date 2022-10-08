<template>
  <div class="app-container userMng">
    <el-row>
      <el-col :span="12">
        <el-card style="height: calc(100%)">
          <el-form size="mini" label-width="100px">
            <el-row style="padding-bottom: 10px">
              <el-col :span="8">
                <el-form-item label="箱东单号：" prop="boxBillNO">
                  <el-input
                    placeholder="单号/箱东Id"
                    v-model="search.boxBillNO"
                    size="mini"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="" prop="" label-width="20px">
                  <el-button type="primary" size="mini" @click="getInfo()"
                    >搜索</el-button
                  >
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-card>
            <el-form
              size="mini"
              :model="form"
              ref="ruleForm"
              :rules="rules"
              label-width="100px"
            >
              <el-row>
                <el-col :span="8">
                  <el-form-item label="单号：" prop="billNo">
                    <el-input
                      size="mini"
                      v-model="box.billNo"
                      placeholder=""
                      readonly
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="起运站：" prop="startStation">
                    <el-select
                      v-model="box.startStation"
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
                <el-col :span="8">
                  <el-form-item label="目的站：" prop="endStation">
                    <el-select
                      v-model="box.endStation"
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
                <el-col :span="8">
                  <el-form-item label="还箱地：" prop="returnStation">
                    <el-select
                      v-model="box.returnStation"
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
              <!-- <el-row>
                <el-col :span="8">
                  <el-form-item label="是否库存：" prop="isInStock">
                    <el-switch v-model="box.isInStock" disabled></el-switch>
                  </el-form-item>
                </el-col>
                <el-col :span="16">
                  <el-form-item label="预计到站时间：" prop="predictTime">
                    <el-date-picker
                      v-model="box.predictTime"
                      type="datetime"
                      value-format="yyyy-MM-dd HH:mm:dd"
                      format="yyyy-MM-dd HH:mm"
                      placeholder=""
                      style="width: 45%"
                      disabled
                    />
                  </el-form-item>
                </el-col>
              </el-row> -->
              <el-row>
                <el-col :span="16">
                  <el-form-item label="有效时间起止：" prop="effectiveSTime">
                    <el-date-picker
                      v-model="box.effectiveSTime"
                      type="datetime"
                      value-format="yyyy-MM-dd HH:mm:dd"
                      format="yyyy-MM-dd HH:mm"
                      placeholder=""
                      disabled
                      style="width: 45%"
                    />
                    -
                    <el-date-picker
                      v-model="box.effectiveETime"
                      type="datetime"
                      value-format="yyyy-MM-dd HH:mm:dd"
                      format="yyyy-MM-dd HH:mm"
                      placeholder=""
                      disabled
                      style="width: 45%"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="租金：" prop="sellingPrice">
                    <el-input
                      size="mini"
                      v-model="box.sellingPrice"
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
                      v-model="box.remarks"
                      placeholder=""
                      readonly
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="制单人：" prop="createName">
                    <el-input
                      size="mini"
                      v-model="box.createName"
                      placeholder=""
                      readonly
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="公司：" prop="company">
                    <el-input
                      size="mini"
                      v-model="box.company"
                      placeholder=""
                      readonly
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="电话：" prop="telNumber">
                    <el-input
                      size="mini"
                      maxlength="13"
                      v-model="box.telNumber"
                      placeholder=""
                      readonly
                    ></el-input>
                    <!-- <el-tag
                      placeholder=""
                      style="width: 100%; height: 28px"
                      v-text="box.telNumber"
                    ></el-tag> -->
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="手机：" prop="phoneNumber">
                    <el-input
                      size="mini"
                      maxlength="13"
                      v-model="box.phoneNumber"
                      placeholder=""
                      readonly
                    ></el-input>
                    <!-- <el-tag
                      v-text="box.phoneNumber"
                      placeholder=""
                      style="width: 100%; height: 28px"
                    ></el-tag> -->
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-card>
          <el-row style="height: 200px">
            <Box-Details
              ref="boxDetailsComp1"
              style="padding-top: 10px; padding-bottom: 30px"
            ></Box-Details>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card style="margin-left: 15px">
          <el-form size="mini" label-width="100px">
            <el-row style="padding-bottom: 10px">
              <el-col :span="8">
                <el-form-item label="租客单号：" prop="tenantBillNO">
                  <el-input
                    placeholder="单号/租客Id"
                    v-model="search.tenantBillNO"
                    size="mini"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="" prop="" label-width="20px">
                  <el-button type="primary" size="mini" @click="getInfo()"
                    >搜索</el-button
                  >
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-card>
            <el-form
              size="mini"
              :model="form"
              ref="ruleForm"
              :rules="rules"
              label-width="100px"
            >
              <el-row>
                <el-col :span="8">
                  <el-form-item label="单号：" prop="billNo">
                    <el-input
                      size="mini"
                      v-model="tenant.billNo"
                      placeholder=""
                      readonly
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="起运站：" prop="startStation">
                    <el-select
                      v-model="tenant.startStation"
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
                <el-col :span="8">
                  <el-form-item label="目的站：" prop="endStation">
                    <el-select
                      v-model="tenant.endStation"
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
                <el-col :span="16">
                  <el-form-item label="用箱时间起：" prop="effectiveSTime">
                    <el-date-picker
                      v-model="tenant.effectiveSTime"
                      type="datetime"
                      value-format="yyyy-MM-dd HH:mm:dd"
                      format="yyyy-MM-dd HH:mm"
                      placeholder=""
                      style="width: 45%"
                      disabled
                    />
                    -
                    <el-date-picker
                      v-model="tenant.effectiveETime"
                      type="datetime"
                      value-format="yyyy-MM-dd HH:mm:dd"
                      format="yyyy-MM-dd HH:mm"
                      placeholder=""
                      style="width: 45%"
                      disabled
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="希望成交价：" prop="hopePrice">
                    <el-input
                      size="mini"
                      v-model="tenant.hopePrice"
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
                      v-model="tenant.remarks"
                      placeholder=""
                      readonly
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="制单人：" prop="createName">
                    <el-input
                      size="mini"
                      v-model="tenant.createName"
                      placeholder=""
                      readonly
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="公司：" prop="company">
                    <el-input
                      size="mini"
                      v-model="tenant.company"
                      placeholder=""
                      readonly
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="电话：" prop="telNumber">
                    <el-input
                      size="mini"
                      maxlength="13"
                      v-model="tenant.telNumber"
                      placeholder=""
                      readonly
                    ></el-input>
                    <!-- <el-tag
                      v-text="tenant.telNumber"
                      placeholder=""
                      style="width: 100%; height: 28px"
                    ></el-tag> -->
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="手机：" prop="phoneNumber">
                    <el-input
                      size="mini"
                      maxlength="13"
                      v-model="tenant.phoneNumber"
                      placeholder=""
                      readonly
                    ></el-input>
                    <!-- <el-tag
                      v-text="tenant.phoneNumber"
                      placeholder=""
                      style="width: 100%; height: 28px"
                    ></el-tag> -->
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-card>
          <el-row style="height: 200px">
            <Box-Details
              ref="boxDetailsComp2"
              style="padding-top: 10px; padding-bottom: 30px"
            ></Box-Details>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="padding-top: 10px">
      <el-card>
        <el-form
          size="mini"
          :model="form"
          ref="ruleForm"
          :rules="rules"
          label-width="100px"
        >
          <el-row>
            <el-col :span="4">
              <el-form-item label="租客保证金：" prop="tenantMargin">
                <el-input
                  size="mini"
                  maxlength="10"
                  v-model="form.tenantMargin"
                  placeholder="请输入租客保证金"
                  type="number"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="实际卖价：" prop="sellingPrice">
                <el-input
                  size="mini"
                  maxlength="10"
                  v-model="form.sellingPrice"
                  placeholder="请输入实际卖价"
                  type="number"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="实际买价：" prop="purchasePrice">
                <el-input
                  size="mini"
                  maxlength="10"
                  v-model="form.purchasePrice"
                  placeholder="请输入实际买价"
                  type="number"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="" prop="">
                <el-button type="primary" size="small" @click="save()"
                  >信息确认</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
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
  .el-input.is-disabled .el-input__inner {
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #606266;
    cursor: not-allowed;
  }
}
</style>
<script>
import boxDetailsIndex from "./boxDetailsIndex";
import {
  getBusinessConfirmInfo,
  updateBusinessConfirmInfo,
} from "api/businessConfirm";
import { warnMsg, successMsg } from "utils/messageBox";
import { checkBtnPeimission, RegisterReview } from "utils/btnRole";
import { getSiteList } from "api/publicBase/Combox";
export default {
  name: "boxReleaseQueryIndex",
  components: {
    "Box-Details": boxDetailsIndex,
  },
  data() {
    return {
      RegisterReview,
      search: {
        id: "",
        boxBillNO: "",
        tenantBillNO: "",
        boxId: undefined,
        tenantId: undefined,
      },
      box: {
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
        remarks: "",
        creatorUserId: 0,
        createName: "",
        company: "",
        telNumber: "",
        phoneNumber: "",
      },
      tenant: {
        id: "",
        billNo: "",
        startStation: "",
        endStation: "",
        effectiveSTime: undefined,
        effectiveETime: undefined,
        hopePrice: 0,
        line: "",
        remarks: "",
        creatorUserId: 0,
        createName: "",
        company: "",
        telNumber: "",
        phoneNumber: "",
      },
      qyz: [],
      mdz: [],
      ZDs: [],
      form: {
        tenantMargin: 0,
        sellingPrice: 0,
        purchasePrice: 0,
      },
      rules: {},
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
        this.ZDs = res.result;
      });
    },
    getInfo() {
      let data = {
        id: "",
        boxInfoBillNO: this.search.boxBillNO,
        tenantInfoBillNO: this.search.tenantBillNO,
      };
      getBusinessConfirmInfo(data).then((res) => {
        if (res.result.msg != null && res.result.msg != "") {
          warnMsg(res.result.msg);
        }
        if (res.result.boxInfo != null) {
          this.box.id = res.result.boxInfo.id;
          this.box.billNo = res.result.boxInfo.billNO;
          this.box.startStation = res.result.boxInfo.startStation;
          this.box.endStation = res.result.boxInfo.endStation;
          this.box.returnStation = res.result.boxInfo.returnStation;
          //this.box.isInStock = res.result.boxInfo.isInStock;
          //this.box.predictTime = res.result.boxInfo.predictTime;
          this.box.effectiveSTime = res.result.boxInfo.effectiveSTime;
          this.box.effectiveETime = res.result.boxInfo.effectiveETime;
          this.box.sellingPrice = res.result.boxInfo.sellingPrice;
          this.box.remarks = res.result.boxInfo.remarks;
          this.box.creatorUserId = res.result.boxInfo.creatorUserId;
          this.box.createName = res.result.createName;
          this.box.company = res.result.company;
          this.box.telNumber = res.result.telNumber;
          this.box.phoneNumber = res.result.phoneNumber;
          this.$refs.boxDetailsComp1.search.BoxTenantNO =
            res.result.boxInfo.billNO;
          this.$refs.boxDetailsComp1.getTableList();
        }
        if (res.result.tenantInfo != null) {
          this.tenant.id = res.result.tenantInfo.id;
          this.tenant.billNo = res.result.tenantInfo.billNO;
          this.tenant.startStation = res.result.tenantInfo.startStation;
          this.tenant.endStation = res.result.tenantInfo.endStation;
          this.tenant.effectiveSTime = res.result.tenantInfo.effectiveSTime;
          this.tenant.effectiveETime = res.result.tenantInfo.effectiveETime;
          this.tenant.hopePrice = res.result.tenantInfo.hopePrice;
          this.tenant.remarks = res.result.tenantInfo.remarks;
          this.tenant.creatorUserId = res.result.tenantInfo.creatorUserId;
          this.tenant.createName = res.result.createName;
          this.tenant.company = res.result.company;
          this.tenant.telNumber = res.result.telNumber;
          this.tenant.phoneNumber = res.result.phoneNumber;
          this.$refs.boxDetailsComp2.search.BoxTenantNO =
            res.result.tenantInfo.billNO;
          this.$refs.boxDetailsComp2.getTableList();
        }
      });
    },
    save(flag) {
      if (this.box.billNo === "") {
        warnMsg("请查询箱东提单信息");
        return;
      }
      if (this.tenant.billNo === "") {
        warnMsg("请查询租客提单信息");
        return;
      }
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          let data = {
            id: this.form.id,
            boxInfoBillNO: this.box.billNo,
            boxId: this.box.creatorUserId,
            tenantInfoBillNO: this.tenant.billNo,
            tenantId: this.tenant.creatorUserId,
            tenantMargin: this.form.tenantMargin,
            sellingPrice: this.form.sellingPrice,
            purchasePrice: this.form.purchasePrice,
          };
          updateBusinessConfirmInfo(data).then((res) => {
            successMsg("确认成功");
          });
        }
      });
    },
    onRouter() {
      if (this.$route.query.bNo && this.$route.query.tNo) {
        //加层判断 防止重复查询产生的提示
        if (
          this.search.boxBillNO !== this.$route.query.bNo ||
          this.search.tenantBillNO !== this.$route.query.tNo
        ) {
          this.search.boxBillNO = this.$route.query.bNo;
          this.search.tenantBillNO = this.$route.query.tNo;
          this.getInfo();
        }
      }
    },
  },
  created() {
    this.setComBox();
    this.onRouter();
  },
};
</script>