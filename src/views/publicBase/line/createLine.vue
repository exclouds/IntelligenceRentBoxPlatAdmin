<template>
  <div class="createLine">
    <el-dialog
      :title="form.id ? '编辑路线资料' : '新增路线资料'"
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
          <!-- <el-row>
            <el-col :span="20">
              <el-form-item label="路线代码：" prop="code">
                <el-input
                  size="mini"
                  @input="form.code = form.code.toUpperCase()"
                  v-model="form.code"
                  placeholder="请输入路线代码"
                  style="width: 100%"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-row>
            <el-col :span="20">
              <el-form-item label="路线名称：" prop="lineName">
                <el-input
                  size="mini"
                  maxlength="200"
                  v-model="form.lineName"
                  placeholder="请输入路线名称"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="是否启用：" prop="lineName">
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
.createLine {
  .el-dialog__body {
    height: 240px;
  }
}
</style>
<script>
import { getLineInfoById, createorUpdateLine } from "api/publicBase/line";
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
          //code: "",
          lineName: "",
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
        //code: "",
        lineName: "",
        isEnable: true,
        remarks: "",
      },
      rules: {},
    };
  },
  methods: {
    //获取单个路线信息
    getLineInfoById(id) {
      let _this = this;
      this.loading = true;
      getLineInfoById({ id: id })
        .then((res) => {
          _this.form.id = res.result.id;
          //_this.form.code = res.result.code;
          _this.form.lineName = res.result.lineName;
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
          //code: this.form.code,
          lineName: this.form.lineName,
          isEnable: this.form.isEnable,
          remarks: this.form.remarks,
        };
        createorUpdateLine(data)
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