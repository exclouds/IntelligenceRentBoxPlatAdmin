<template>
  <div class="createSiteTables">
    <el-dialog
      :title="form.id ? '编辑站点资料' : '新增站点资料'"
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
              <el-form-item label="站点代码：" prop="code">
                <el-input
                  size="mini"
                  @input="form.code = form.code.toUpperCase()"
                  v-model="form.code"
                  placeholder="请输入站点代码"
                  style="width: 100%"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="站点名称：" prop="name">
                <el-input
                  size="mini"
                  maxlength="200"
                  v-model="form.siteName"
                  placeholder="请输入站点名称"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="英文名称：" prop="name">
                <el-input
                  size="mini"
                  maxlength="200"
                  v-model="form.enSiteName"
                  placeholder="请输入站点名称"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="国家：" prop="name">
                <el-select
                  v-model="form.countryCode"
                  collapse-tags
                  placeholder="请选择国家"
                  style="width: 100%"
                  readonly
                >
                  <el-option
                    v-for="item in countries"
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
.createSiteTables {
  .el-dialog__body {
    height: 360px;
  }
}
</style>
<script>
import {
  getSiteTablesInfoById,
  createorUpdateSiteTables,
} from "api/publicBase/siteTables";
import { getAllCountryList } from "api/publicBase/baseCountry";
import { getCountryList } from "api/publicBase/Combox";
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
          siteName: "",
          enSiteName: "",
          countryCode: "",
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
        countryCode: "",
        siteName: "",
        enSiteName: "",
        isEnable: true,
        remarks: "",
      },
      countries: [],
      rules: {},
    };
  },
  methods: {
    setComBox() {
      getCountryList({
        IsEnable: true,
      }).then((res) => {
        this.countries = res.result;
      });
    },
    //获取单个站点信息
    getSiteTablesInfoById(id) {
      let _this = this;
      this.loading = true;
      getSiteTablesInfoById({ id: id })
        .then((res) => {
          _this.form.id = res.result.id;
          _this.form.code = res.result.code;
          _this.form.countryCode = res.result.countryCode;
          _this.form.siteName = res.result.siteName;
          _this.form.enSiteName = res.result.enSiteName;
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
          siteName: this.form.siteName,
          enSiteName: this.form.enSiteName,
          countryCode: this.form.countryCode,
          isEnable: this.form.isEnable,
          remarks: this.form.remarks,
        };
        createorUpdateSiteTables(data)
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