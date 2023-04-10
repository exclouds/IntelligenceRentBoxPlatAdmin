<template>
  <div class="createUser">
    <el-dialog
      :title="'用户注册信息审批'"
      v-dialogDrag
      :visible.sync="windowShow"
      width="800px"
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
            <el-form-item label="真实姓名：" prop="realName">
              <el-input
                size="mini"
                v-model="form.realName"
                placeholder=""
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="登陆账户：" prop="userName">
              <el-input
                size="mini"
                v-model="form.userName"
                placeholder=""
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="性别：" prop="sex">
              <el-radio v-model="form.sex" label="0" disabled
                ><icon name="男" scale="1.5"
              /></el-radio>
              <el-radio v-model="form.sex" label="1" disabled
                ><icon name="女" scale="1.5"
              /></el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属公司：" prop="groupJobNum">
              <el-select
                v-model="form.groupJobNum"
                collapse-tags
                placeholder=""
                style="width: 100%"
                disabled
              >
                <el-option
                  v-for="item in companyList"
                  :key="item.value"
                  :label="item.displayText"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属角色：" prop="roleIds">
              <!-- <el-input v-model="form.userName" placeholder="请选择所属角色"></el-input> -->
              <el-select
                v-model="form.roleIds"
                collapse-tags
                placeholder=""
                style="width: 100%"
                disabled
              >
                <el-option
                  v-for="item in roleList"
                  :key="item.id"
                  :label="item.displayName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮箱：" prop="email">
              <el-input
                size="mini"
                v-model="form.email"
                placeholder=""
                clearable
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话：" prop="phone">
              <el-input
                size="mini"
                v-model="form.phone"
                placeholder=""
                clearable
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机：" prop="mobilePhone">
              <el-input
                size="mini"
                v-model="form.mobilePhone"
                placeholder=""
                clearable
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="图片附件：" prop="">
              <div :span="12" v-for="(item, index) in fileList" :key="index">
                <div class="tableBtn" @click="showimg(item.url)">
                  {{ item.name }}
                </div>
              </div>
            </el-form-item>
          </el-col>
          <!-- <el-col
            :span="12"
            v-for="(item, index) in fileList"
            :key="index"
            style="padding: 20px"
          >
            <el-form-item label="图片附件：" prop="">
              <el-image :src="item.url" :preview-src-list="[item.url]">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="审批意见：" prop="VerifyRem">
              <el-input
                type="textarea"
                :maxlength="500"
                :autosize="{ minRows: 5, maxRows: 5 }"
                v-model="form.VerifyRem"
                placeholder=""
                :disabled="pageType === 'info'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="save(true)"
          size="small"
          v-if="pageType === 'update'"
          >通过</el-button
        >
        <el-button
          type="danger"
          @click="save(false)"
          size="small"
          v-if="pageType === 'update'"
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
import { getRoleSelectList } from "api/user/roles";
import { createUser, CheckUsrInfo, getUserInfoById } from "api/user/user";
import { GetDeptUnitList, getOrganizatonByType } from "api/user/organization";
import { mobile, telephone, email } from "utils/validate";
import { warnMsg, successMsg } from "utils/messageBox";
import { getCustCompanyList } from "api/publicBase/Combox";
import { GetUPFile } from "api/publicBase/Attachment";
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
          realName: "",
          userName: "",
          password: "",
          checkPass: "",
          groupJobNum: "",
          companyJobNum: "",
          roleIds: [],
          phone: "",
          mobilePhone: "",
          email: "",
          sex: "0",
          choosedTreeNode: [],
          deptCode: "",
          code: "",
          buAuthority: [],
          insideBUAuthority: [],
          regionAuthority: [],
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
        realName: "",
        userName: "",
        password: "",
        checkPass: "",
        groupJobNum: "",
        companyJobNum: "",
        roleIds: [],
        phone: "",
        mobilePhone: "",
        email: "",
        sex: "0",
        choosedTreeNode: [],
        deptCode: "",
        code: "",
        buAuthority: [],
        insideBUAuthority: [],
        regionAuthority: [],
      },
      rules: {
        // realName: [
        //   { required: true, message: "请输入真实姓名", trigger: "blur" },
        // ],
        // userName: [
        //   { required: true, message: "请输入登陆账户", trigger: "blur" },
        // ],
        //   choosedTreeNode: {required: true, message: '请选择公司', trigger: 'change'},
        // choosedTreeNode:
        //   { required: true, message: '请选择公司', trigger: 'change'},
        // //   {validator: this.validatedepartment},
        // deptCode: {required: true, message: '请选择部门', trigger: 'change'},
        // roleIds: { required: true, message: "请选择角色", trigger: "change" },
        // password: [
        //     {required: true, message: '请输入密码'},
        //     {validator: this.validatePass}
        // ],
        // checkPass: [
        //     {required: true, message: '请输入确认密码'},
        //     {validator: this.validatePass2}
        // ],
        // phone: [
        //   // {required: true, message: '请输入电话'},
        //   { pattern: telephone, message: "请输入正确格式的电话号码" },
        // ],
        // mobilePhone: [{ pattern: mobile, message: "请输入正确格式的手机号码" }],
        // email: [
        //   // {required: true, message: '请输入邮箱'},
        //   { pattern: email, message: "请输入正确格式的邮箱" },
        // ],
        // companyJobNum: [
        //   { required: true, message: "请输入公司编号", trigger: "blur" },
        // ],
        // sex: [{ required: true, message: "请选择性别", trigger: "change" }],
      },
      roleList: [],
      treeComp: {
        show: false,
        data: [],
        choosedTreeNodeId: [], //回显树节点ID
      },
      deptreeComp: {
        data: [],
      },
      companyList: [],
      fileList: [],
    };
  },
  methods: {
    //添加查询combox
    setComBox() {
      getCustCompanyList({
        isAdmin: true,
      }).then((res) => {
        this.companyList = res.result;
      });
    },
    //单击树选择框控件
    ontreeShowChange(val) {
      this.treeComp.show = val;
    },
    //树数据回调事件
    onNodeClick() {
      //choosedNodeID
      // this.form.parentId = clickNode.nodeId
      //     var codes="";
      //     if(clickNode.length > 0)
      //     {
      //       var  codelist=clickNode.map(item => {
      //             return item.nodeUUid;
      //             });
      //        codes=codelist.toString();
      //     }
      //    // this.form.code=clickNode.length > 0 ? clickNode[0].nodeUUid : '';
      //    this.form.code=codes;
      //     this.form.choosedTreeNode = clickNode;

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
    //获取角色列表
    GetRoleList() {
      getRoleSelectList().then((res) => {
        if (res.success) {
          this.roleList = res.result;
        }
      });
    },
    //获取组织树
    getOrganizationTree() {
      getOrganizatonByType().then((res) => {
        if (res.success) this.treeComp.data = res.result;
      });
    },
    //根据公司获取部门
    getdeplist(dep) {
      this.form.deptCode = "";
      this.deptreeComp.data = [];
      GetDeptUnitList({ code: this.form.code }).then((res) => {
        if (res.success) this.deptreeComp.data = res.result;
      });
      this.form.deptCode = dep;
    },

    //校验密码
    validatePass(rule, value, callback) {
      if (!!value && !!this.form.password) {
        if (
          !/(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}/.test(this.form.password)
        ) {
          callback(new Error("要同时含有数字和字母，且长度要在8-16位之间"));
        } else {
          this.$refs.ruleForm.validateField("checkPass");
          callback();
        }
      }
    },
    //校验确认密码
    validatePass2(rule, value, callback) {
      if (!!!value) {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    },

    //校验公司
    validatedepartment(rule, value, callback) {
      if (this.form.choosedTreeNode.length === 0) {
        console.log("error");
        callback(new Error("请选择公司"));
      } else {
        console.log("no error");
        callback();
      }
    },

    //获取单个用户
    getUserInfoById(userId) {
      getUserInfoById({ id: userId }).then((res) => {
        this.form.id = res.result.user.id;
        this.form.realName = res.result.user.name;
        this.form.companyJobNum = res.result.user.surname;
        this.form.groupJobNum = res.result.user.organizationCode;
        this.form.userName = res.result.user.userName;
        this.form.email = res.result.user.emailAddress;
        this.form.phone = res.result.user.telNumber;
        this.form.mobilePhone = res.result.user.phoneNumber;
        this.form.sex = res.result.user.sex;
        this.form.roleIds = res.result.roleId;
        this.form.code = res.result.user.organizationCode;
        this.form.deptCode = res.result.user.deptCode;
      });
    },
    //提交
    save(flag) {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          if (this.pageType == "insert") {
            let data = {
              user: {
                password: "000000",
                name: this.form.realName,
                surname: this.form.companyJobNum, //工号
                companyWorkNo: this.form.groupJobNum,
                userName: this.form.userName,
                emailAddress: this.form.email,
                phoneNumber: this.form.mobilePhone,
                telNumber: this.form.phone,
                sex: this.form.sex,
                OrganizationCode: this.form.code,
                DeptCode: this.form.deptCode,
              },
              //dpts: this.$refs.treeComp.$refs.tree.getCheckedNodes(true, false).map(item => {return {id: item.nodeId.toString()}}),
              dpts: [],
              roles: this.form.roleIds,
            };
            createUser(data).then((res) => {
              this.windowShow = false;
              this.$emit("on-save-success");
            });
          }
          if (this.pageType == "update") {
            if (this.form.VerifyRem === "" || this.form.VerifyRem === null || this.form.VerifyRem === undefined ) {
              if (flag) {
                this.form.VerifyRem = "审批通过";
              } else {
                warnMsg("请填写审批意见");
                return;
              }
            }
            // let data = {
            // //   user: {
            // //     id: this.form.id,
            // //     name: this.form.realName,
            // //     surname: this.form.companyJobNum, //工号
            // //     companyWorkNo: this.form.groupJobNum,
            // //     userName: this.form.userName,
            // //     emailAddress: this.form.email,
            // //     phoneNumber: this.form.mobilePhone,
            // //     telNumber: this.form.phone,
            // //     sex: this.form.sex,
            // //     OrganizationCode: this.form.code,
            // //     DeptCode: this.form.deptCode,
            // //     IsVerify: true,
            // //     VerifyRem: this.form.VerifyRem,
            // //     IsActive: flag,
            // //   },
            // //   //dpts: this.$refs.treeComp.$refs.tree.getCheckedNodes(true, false).map(item => {return {id: item.nodeId.toString()}}),
            // //   dpts: [],
            // //   roles: this.form.roleIds,
            // // };
            // // updateUser(data).then((res) => {
            // //   successMsg("审批成功");
            // //   this.windowShow = false;
            // //   this.$emit("on-save-success");
            // // });
          
            //   //dpts: this.$refs.treeComp.$refs.tree.getCheckedNodes(true, false).map(item => {return {id: item.nodeId.toString()}}),
            //   dpts: [],
            //   roles: this.form.roleIds,
            // };
              let data =  {
                Id: this.form.id,              
                IsVerify: true,
                VerifyRem: this.form.VerifyRem , 
                IsActive: flag          
              };
            CheckUsrInfo(data).then((res) => {
              successMsg("审批成功");
              this.windowShow = false;
              this.$emit("on-save-success");
            });
          }
        }
      });
    },
    getfileList(id, billno) {
      GetUPFile({ id: id, billno: billno }).then((res) => {
        if (res.success) {
          this.fileList = res.result;
        }
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