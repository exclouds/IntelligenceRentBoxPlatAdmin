<template>
  <div class="createLinSite">
    <el-dialog
      :title="form.id ? '编辑站点路线' : '新增站点路线'"
      v-dialogDrag
      :visible.sync="windowShow"
      width="500px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-scrollbar class="page-component__scroll">
        <el-form
          size="mini"
          v-loading="loading"
          :model="form"
          ref="ruleForm"
          :rules="rules"
          label-width="100px"
        >
          <el-row>
            <el-col :span="20">
              <el-form-item label="站点：">
                <el-select
                  v-model="form.code"
                  collapse-tags
                  placeholder="请选择站点"
                  style="width: 100%"
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
            <el-col :span="20">
              <el-form-item label="路线：" prop="lineId">
                <el-select
                  v-model="form.lineId"
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
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="备注：" prop="remarks">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入备注"
                  maxlength="500"
                  @input="form.remarks = form.remarks.toUpperCase()"
                  v-model="form.remarks"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-scrollbar>
      <span slot="footer" class="dialog-footer">
        <el-button @click="windowShow = false" size="small">取 消</el-button>
        <el-button
          type="primary"
          @click="save"
          size="small"
          :loading="btnLoading"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<style lang="scss">
.createLinSite {
  .el-dialog__body {
    height: 240px;
  }
}
</style>
<script>
import {
  getLinSiteInfoById,
  createorUpdateLinSite,
} from "api/publicBase/linSite";
import { getDicListByDitType } from "api/publicBase/dictionaryMng";
import { getSiteList, getLineList } from "api/publicBase/Combox";
export default {
  components: {},
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
          code: "",
          lineId: "",
          remarks: "",
        };
        this.$emit("on-show-change", newValue);
      }
    },
  },
  data() {
    return {
      loading: false,
      btnLoading: false,
      windowShow: this.pshow,
      form: {
        id: "",
        code: "",
        lineId: "",
        remarks: "",
      },
      rules: {},
      ZDs: [],
      Lines: [],
    };
  },
  methods: {
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
    },
    //获取单个路线信息
    getLinSiteInfoById(id) {
      let _this = this;
      this.loading = true;
      getLinSiteInfoById({ id: id })
        .then((res) => {
          _this.form.id = res.result.id;
          _this.form.code = res.result.code;
          _this.form.lineId = res.result.lineId;
          _this.form.remarks = res.result.remarks;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    //提交
    async save() {
      let val = await this.$refs["ruleForm"].validate().catch((e) => {});
      if (val) {
        this.btnLoading = true;
        let data = {
          id: this.form.id,
          code: this.form.code,
          lineId: this.form.lineId,
          remarks: this.form.remarks,
        };
        createorUpdateLinSite(data)
          .then((res) => {
            this.btnLoading = false;
            this.windowShow = false;
            this.$emit("on-save-success");
          })
          .catch((err) => {
            this.btnLoading = false;
          });
      }
    },
  },
  created() {
    this.setComBox();
  },
};
</script>