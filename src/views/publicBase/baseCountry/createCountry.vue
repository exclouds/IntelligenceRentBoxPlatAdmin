<template>
  <div class="createCountry">
    <el-dialog
      :title="form.id ? '编辑国家资料' : '新增国家资料'"
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
              <el-form-item label="国家代码：" prop="code">
                <el-input
                  size="mini"
                  @input="form.code = form.code.toUpperCase()"
                  v-model="form.code"
                  placeholder="请输入国家代码"
                  style="width: 100%"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="国家名称：" prop="name">
                <el-input
                  size="mini"
                  maxlength="200"
                  v-model="form.name"
                  placeholder="请输入国家名称"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="是否启用：" prop="name">
                <el-switch v-model="form.isEnable"></el-switch>
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
.createCountry {
  .el-dialog__body {
    height: 280px;
  }
}
</style>
<script>
import {
  getCountryInfoById,
  createorUpdateCountry,
} from "api/publicBase/baseCountry";
import { getDicListByDitType } from "api/publicBase/dictionaryMng";
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
          name: "",
          isEnable: true,
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
        name: "",
        isEnable: true,
        remarks: "",
      },
      rules: {},
    };
  },
  methods: {
    //获取单个国家信息
    getCountryInfoById(id) {
      let _this = this;
      this.loading = true;
      getCountryInfoById({ id: id })
        .then((res) => {
          _this.form.id = res.result.id;
          _this.form.code = res.result.code;
          _this.form.name = res.result.name;
          _this.form.isEnable = res.result.isEnable;
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
          name: this.form.name,
          isEnable: this.form.isEnable,
          remarks: this.form.remarks,
        };
        createorUpdateCountry(data)
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
};
</script>