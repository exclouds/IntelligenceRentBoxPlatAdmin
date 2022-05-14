<template>
  <div class="createCountry">
    <el-dialog
      :title="form.id?'编辑国家资料':'新增国家资料'"
      v-dialogDrag
      :visible.sync="windowShow"
      width="800px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
    <el-scrollbar class="page-component__scroll">
      <el-form size="mini" v-loading="loading" :model="form" ref="ruleForm" :rules="rules" label-width="120px" style="padding-right:15px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属大洲：" prop="continent">
              <el-select size="mini" v-model="form.continent" filterable placeholder="请选择所属大洲" style="width:100%">
                <el-option
                  v-for="item in form.continentList"
                  :key="item.id"
                  :label="item.code"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="国家代码：" prop="countryCode">
              <el-input size="mini" maxlength="2" @input="form.countryCode = form.countryCode.toUpperCase()" v-model="form.countryCode" placeholder="请输入国家代码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="英文简称：" prop="englishShortName">
              <el-input size="mini" maxlength="200" v-model="form.englishShortName" @input="form.englishShortName = form.englishShortName.toUpperCase()" placeholder="请输入英文简称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="英文全称：" prop="englishFullName">
              <el-input size="mini" maxlength="200" v-model="form.englishFullName" @input="form.englishFullName = form.englishFullName.toUpperCase()" placeholder="请输入英文全称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="中文简称：" prop="chineseShortName">
              <el-input size="mini" maxlength="20" v-model="form.chineseShortName" placeholder="请输入中文简称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="中文全称：" prop="chineseFullName">
              <el-input size="mini" maxlength="30" v-model="form.chineseFullName" placeholder="请输入中文全称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="是否AGM检验国：" prop="isAGM">
              <el-switch v-model="form.isAGM" active-color="#13ce66" inactive-color="#C0C4CC"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否疫区：" prop="isPestArea">
              <el-switch v-model="form.isPestArea" active-color="#13ce66" inactive-color="#C0C4CC"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="数字代码：" prop="mainDataCode">
              <el-input size="mini" maxlength="10" v-model="form.mainDataCode" placeholder="请输入数字代码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
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
      <country-identifier ref="createCountryComp"></country-identifier>
      <pest-area ref="pestAreaComp" :pshow="form.isPestArea"></pest-area>
    </el-scrollbar>
      <span slot="footer" class="dialog-footer">
        <el-button @click="windowShow = false" size="small">取 消</el-button>
        <el-button type="primary" @click="save" size="small" :loading="btnLoading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style lang="scss">
.createCountry{
  .el-dialog__body{height:600px;}
}
</style>
<script>
import {
  getCountryInfoById,
  createorUpdateCountry
} from "api/publicBase/baseCountry"
import { getDicListByDitType } from "api/publicBase/dictionaryMng"
import countryIdentifier from "./countryIdentifier"
import pestArea from "./pestArea"
import {englishOrCharacter,english,noEnglish,numbers} from 'utils/validate'; 
export default {
  components: { countryIdentifier, pestArea },
  props: {
    pshow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    pshow(newValue, oldValue) {
      this.windowShow = newValue
    },
    windowShow(newValue, oldValue) {
      if (this.$refs["ruleForm"]) this.$refs["ruleForm"].resetFields() //清空验证

      if (!newValue) {
        //窗口关闭
        this.form = {
          id: "",
          continent: "",
          countryCode: "",
          englishShortName: "",
          englishFullName: "",
          chineseShortName: "",
          continentList:[],
          chineseFullName: "",
          mainDataCode: "",
          isAGM: false,
          remarks: "",
          isPestArea: false
        }
        this.$refs.createCountryComp.tableForm.indentList = []
        this.$refs.pestAreaComp.tableForm.pestAreaList = []
        this.$refs.pestAreaComp.tableForm.updateOldRow = []
        this.$emit("on-show-change", newValue)
      }
    }
  },
  data() {
    return {
      loading:false,
      btnLoading:false,
      windowShow: this.pshow,
      form: {
        id: "",
        continent: "",
        countryCode: "",
        englishShortName: "",
        englishFullName: "",
        chineseShortName: "",
        chineseFullName: "",
        mainDataCode: "",
        isAGM: false,
        remarks: "",
        isPestArea: false,
        continentList: []
      },
      rules: {
        continent: [
          { required: true, message: "请选择所属大洲", trigger: "change" },
        ],
        countryCode: [
          { required: true, message: "请输入国家代码", trigger: "blur" },
          { min: 2, max: 2, message: "长度为2个字符", trigger: "blur" },
          { pattern: english, message: "只能输入英文" }
        ],
        chineseShortName: [
          { required: true, message: "请输入中文简称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur"
          },
          { pattern: noEnglish, message: "只能输入汉字、数字、特殊字符" }
        ],
        chineseFullName: [
          { required: true, message: "请输入中文全称", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "长度在 1 到 30 个字符",
            trigger: "blur"
          },
          { pattern: noEnglish, message: "只能输入汉字、数字、特殊字符" }
        ],
        englishShortName: [
          { required: true, message: "请输入英文简称", trigger: "blur" },
          {
            min: 1,
            max: 200,
            message: "长度在 1 到 200 个字符",
            trigger: "blur"
          },
          {
            pattern: englishOrCharacter,
            message: "只能输入英文与特殊字符"
          }
        ],
        englishFullName: [
          { required: true, message: "请输入英文全称", trigger: "blur" },
          {
            min: 1,
            max: 200,
            message: "长度在 1 到 200 个字符",
            trigger: "blur"
          },
          {
            pattern: englishOrCharacter,
            message: "只能输入英文与特殊字符"
          }
        ],
        mainDataCode: [
          {
            min: 0,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur"
          },
          { pattern: numbers, message: "只能输入数字" }
        ]
      }
    }
  },
  methods: {
    //获取单个国家信息
    getCountryInfoById(id) {
      
      let _this = this
      this.loading = true
      getCountryInfoById({ id: id }).then(res => {
        _this.form.id = res.result.id
        _this.form.countryCode = res.result.countryCode
        _this.form.englishShortName = res.result.englishShortName
        _this.form.englishFullName = res.result.englishFullName
        _this.form.chineseShortName = res.result.chineseShortName
        _this.form.chineseFullName = res.result.chineseFullName
        _this.form.mainDataCode = res.result.mainDataCode
        _this.form.isAGM = res.result.isAGM
        _this.form.continent = res.result.continent
        _this.form.remarks = res.result.remarks
        _this.form.isPestArea = res.result.isPestArea
        //识别码列表
        _this.$refs.createCountryComp.getTableList(_this.form.countryCode)
        //识瘟疫列表
        _this.$refs.pestAreaComp.getPestAreaTableList(_this.form.countryCode)
         this.loading = false
      }).catch(err=>{
        this.loading = false
      })
    },
    //取所属大洲列表
    getContinentList() {

      getDicListByDitType({ TypeCode: "DZLX", Code: "", Name: "" }).then(
        res => {
          this.form.continentList = res.result
        }
      )
    },
    //提交
    async save() {
      
      let val = await this.$refs["ruleForm"].validate().catch(e => {})
      let val1 = await this.$refs.createCountryComp.$refs["form"]
        .validate()
        .catch(e => {})
      let val2 = await this.$refs.pestAreaComp.$refs["form"]
        .validate()
        .catch(e => {})
      if (val && val1 && val2) {
         this.btnLoading = true
        let data = {
          CountryInfo: {
            id: this.form.id,
            continent: this.form.continent,
            countryCode: this.form.countryCode,
            englishShortName: this.form.englishShortName,
            englishFullName: this.form.englishFullName,
            chineseShortName: this.form.chineseShortName,
            chineseFullName: this.form.chineseFullName,
            mainDataCode: this.form.mainDataCode,
            isAGM: this.form.isAGM,
            remarks: this.form.remarks,
            isPestArea: this.form.isPestArea
          },
          IdentifierList: this.$refs.createCountryComp.tableForm.indentList.map(
            item => {
              return { identifuerCode: item.identifuerCode, IsUse: item.isUse }
            }
          ),
          PestAreaList: this.$refs.pestAreaComp.tableForm.updateOldRow.map(
            item => {
              return {
                id: item.id,
                PestName: item.pestName,
                countryCode: this.form.countryCode,
                IsDeleted: item.isDeleted,
                IsNew: item.isNew
              }
            }
          )
        }
        createorUpdateCountry(data).then(res => {
          this.btnLoading = false
          this.windowShow = false
          this.$emit("on-save-success")
        }).catch(err=>{
        this.btnLoading = false
      })
      }
    }
  }
}
</script>