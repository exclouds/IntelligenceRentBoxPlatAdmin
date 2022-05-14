<template>
  <div class="editOrgdep">
    <el-dialog
      :title="type === 'insert' ? '新增部门信息' : '编辑部门信息'"
      v-dialogDrag
      :visible.sync="windowShow"
      width="800px"
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
            <el-form-item label="上级公司：" prop="parentId">
              <tree-select
                ref="chooseEquNode"
                @on-treeShow-change="ontreeShowChange"
                :choosedEquipmentNode="choosedTreeNode"
              ></tree-select>
              <div class="editOrgdep-row-tree" v-show="treeComp.show">
                <tree
                  ref="treeComp"
                  :pCheckStrictly="true"
                  :radio="true"
                  :pTreeDefaultProps="treeComp.treeConfig"
                  :pTreeData="treeComp.data"
                  :pChoosedNode="treeComp.choosedTreeNodeId"
                  @on-nodeChange="onNodeClick"
                  @on-outside-click="onClickOutSide"
                ></tree>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="depCode" label="部门编码：">
              <el-input
                size="small"
                clearable
                v-model="form.depCode"
                placeholder="请输入部门编码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="depName" label="部门名称：">
              <el-input
                size="small"
                clearable
                v-model="form.depName"
                placeholder="请输入部门名称"
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
.editOrgdep {
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
  .editOrgdep-row-tree {
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
  createdepartment,
  GetDepartmentForEdit,
  updatedepartment,
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
        this.form.curOrgId = "";
        this.form.code = "";
        this.form.depCode = "";
        this.form.depName = "";
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
        curOrgId: "", //当前
        parentId: "-1",
        code: "", //公司编码
        depCode: "", //部门编码
        depName: "", //部门名称
        rules: {
          parentId: [
            { required: true, message: "请选择上级公司", trigger: "change" },
          ],
          depCode: [
            { required: true, message: "请输入部门编码", trigger: "blur" },
          ],
          depName: [
            {
              required: true,
              message: "请输入部门名称",
              trigger: "blur",
            },
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
    //单击树选择框控件
    ontreeShowChange(val) {
      this.treeComp.show = val;
    },
    //树数据回调事件
    onNodeClick(
      clickNode //choosedNodeID
    ) {
      this.form.parentId = clickNode.length > 0 ? clickNode[0].nodeId : "-1";
      this.form.code = clickNode.length > 0 ? clickNode[0].nodeUUid : "";
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
      GetDepartmentForEdit({ id: id }).then((res) => {
        if (res.success) {
          this.form.code = res.result.code;
          this.form.depCode = res.result.depCode;
          this.form.depName = res.result.depName;
          this.form.parentId = res.result.parentId || "-1";
          this.choosedTreeNode = res.result.parentName
            ? [{ nodeName: res.result.parentName }]
            : [];

          this.$nextTick(() => {
            this.treeComp.choosedTreeNodeId = [res.result.parentId];
          });
        }
      });
    },
    Initparent(node) {
      this.onNodeClick(node);
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
            Code: this.form.code,
            DepCode: this.form.depCode,
            DepName: this.form.depName,
          };
          //新建
          if (this.type === "insert") {
            createdepartment(data).then((res) => {
              if (res.success) {
                //关闭信息框，刷新主页面树
                _this.windowShow = false;
                _this.$emit("on-save-success");
              }
            });
          } //修改
          else {
            data.Id = _this.form.curOrgId;
            updatedepartment(data).then((res) => {
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
};
</script>