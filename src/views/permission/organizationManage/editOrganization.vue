<template>
  <div class="editOrgComp">
    <el-dialog
      :title="type === 'insert' ? '新增公司信息' : '编辑公司信息'"
      v-dialogDrag
      :visible.sync="windowShow"
      width="550px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        size="mini"
        :model="form"
        :rules="form.rules"
        ref="ruleForm"
        label-width="150px"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="上级公司：">
              <tree-select
                ref="chooseEquNode"
                @on-treeShow-change="ontreeShowChange"
                :choosedEquipmentNode="choosedTreeNode"
                style="width: 100%"
              ></tree-select>
              <div class="editOrgComp-row-tree" v-show="treeComp.show">
                <tree
                  ref="treeComp"
                  :pCheckStrictly="true"
                  :radio="true"
                  :pTreeDefaultProps="treeComp.treeConfig"
                  :pTreeData="treeComp.data"
                  :pChoosedNode="treeComp.choosedTreeNodeId"
                  @on-nodeChange="onNodeClick"
                  @on-outside-click="onClickOutSide"
                  style="width: 100%"
                ></tree>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item prop="code" label="公司编码：">
              <el-input
                size="small"
                clearable
                v-model="form.code"
                placeholder="请输入公司编码"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item prop="name" label="公司名称：">
              <el-input
                size="small"
                clearable
                v-model="form.name"
                placeholder="请输入公司名称"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item prop="shortName" label="公司简称：">
              <el-input
                size="small"
                clearable
                v-model="form.shortName"
                placeholder="请输入公司简称"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="windowShow = false" size="small">取 消</el-button>
        <el-button type="primary" @click="save()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style lang="scss">
.editOrgComp {
  .chsEqp {
    height: 32px;
    width: 100%;
    .textPromt {
      float: left;
      height: 30px;
      line-height: 30px;
    }
    .chsEqp-select {
      height: 30px;
      line-height: 30px;
    }
    i {
      float: right;
      margin-top: 8px;
    }
  }
  .editOrgComp-row-tree {
    position: absolute;
    top: 40px;
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
  getOrganizatonTreeNoUsers,
  createOrganizaton,
  getOrgDetailById,
  updateOrganizaton,
} from "api/user/organization";
export default {
  props: {
    // pForm:{
    //     type: Object,
    //     default: function () {
    //         return {}
    //     }
    // },
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
        this.form.name = "";
        this.form.parentId = "-1";
        this.choosedTreeNode = [];
        this.$emit("on-show-change", newValue);
      }
    },
  },
  data() {
    return {
      type: "insert",
      windowShow: this.pshow,
      form: {
        curOrgId: "", //当前id
        name: "",
        parentId: "-1",
        parentCode: "",
        shortName: "",
        code: "",
        rules: {
          code: [
            { required: true, message: "请输入公司编码", trigger: "blur" },
          ],
          name: [
            { required: true, message: "请输入公司名称", trigger: "blur" },
          ],
        },
      },

      treeComp: {
        show: false,
        data: [],
        choosedTreeNodeId: [], //回显树节点ID
      },
      choosedTreeNode: [],
    };
  },
  components: {
    treeSelect,
    tree,
  },
  methods: {
    //添加查询combox

    //单击树选择框控件
    ontreeShowChange(val) {
      this.treeComp.show = val;
    },
    //树数据回调事件
    onNodeClick(
      clickNode //choosedNodeID
    ) {
      this.form.parentId = clickNode.length > 0 ? clickNode[0].nodeId : "-1";
      this.form.parentCode = clickNode.length > 0 ? clickNode[0].nodeUUid : "";
      this.choosedTreeNode = clickNode;
    },
    //获取树数据
    getOrganizationTree() {
      getOrganizatonTreeNoUsers().then((res) => {
        if (res.success) this.treeComp.data = res.result;
        this.disabledchooseCurOrg(this.treeComp.data);
        //
      });
    },
    Initparent(node) {
      this.onNodeClick(node);
    },

    //修改当前修改部门树数据不能被选中(A节点上级不能指定A)
    disabledchooseCurOrg(nodes) {
      nodes.forEach((node) => {
        if (node.nodeId == this.form.curOrgId) node.disabled = true;
        if (node.children && node.children.length > 0)
          return this.disabledchooseCurOrg(node.children);
      });
    },

    //根据部门ID获取部门详情
    getOrgDetailById(id) {
      this.form.curOrgId = id;
      getOrgDetailById({ id: id }).then((res) => {
        if (res.success) {
          this.form.name = res.result.displayName;
          this.form.parentCode = res.result.parentCode;
          this.form.shortName = res.result.shortName;
          this.form.code = res.result.code;

          this.form.parentId = res.result.parentId || "-1";
          //this.choosedTreeNode = res.result.parentCode ? [{nodeUUid:res.result.parentCode}] : []
          this.choosedTreeNode = res.result.parentName
            ? [{ nodeName: res.result.parentName }]
            : [];

          this.$nextTick(() => {
            this.treeComp.choosedTreeNodeId = [res.result.ParentId];
          });
        }
      });
    },
    //
    onClickOutSide() {
      if (this.treeComp.show == true) {
        this.treeComp.show = false;
        this.$refs.chooseEquNode.iconChange();
      }
    },
    //提交部门信息
    save() {
      let _this = this;
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          let data = {
            ParentCode: this.form.parentCode,
            DisplayName: _this.form.name,
            Code: this.form.code,
            ShortName: this.form.shortName,
            CompanyType: 1,
          };
          //新建
          if (this.type === "insert") {
            createOrganizaton(data).then((res) => {
              if (res.success) {
                //关闭信息框，刷新主页面树
                _this.windowShow = false;
                _this.$emit("on-save-success");
              }
            });
          } //修改
          else {
            data.Id = _this.form.curOrgId;
            updateOrganizaton(data).then((res) => {
              if (res.success) {
                //关闭信息框，刷新主页面树
                _this.windowShow = false;
                _this.$emit("on-save-success");
              }
            });
          }
        }
      });
    },
  },
  created() {},
};
</script>