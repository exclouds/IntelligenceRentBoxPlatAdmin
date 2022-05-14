<template>
  <div class="app-container pestArea">
    <el-row :gutter="100" style="margin-bottom:10px;">
      <el-col :span="18">
        <el-button v-if="pshow" type="primary" size="mini" @click="addTableRow">新增瘟疫</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-form
        :rules="tableForm.rules"
        :model="tableForm"
        ref="form"
        style="height:calc(100% - 15px)"
      >
        <el-table
          :data="tableForm.pestAreaList"
          :cell-style="{padding: '5px'}"
          stripe
          style="width: 100%"
          ref="table"
        >
          <el-table-column align="center" label="瘟疫名" min-width="50%">
            <template slot-scope="scope">
              <span v-if="scope.row.isSet">
                <el-form-item
                  :prop="'pestAreaList.' + scope.$index + '.pestName'"
                  :rules="tableForm.rules.pestName"
                >
                  <el-input size="mini" maxlength="200" @input="scope.row.pestName = scope.row.pestName.toUpperCase()" v-model.trim="scope.row.pestName"></el-input>
                </el-form-item>
              </span>
              <span v-else>{{scope.row.pestName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="开始时间" min-width="50%">
            <template slot-scope="scope">
              <span>{{scope.row.startTime|parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="结束时间" min-width="50%">
            <template slot-scope="scope">
              <span>{{scope.row.endTime|parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" min-width="20%">
            <template slot-scope="scope">
              <el-popover placement="top" width="160" v-model="scope.row.popShow">
                <p>是否确认删除？</p>
                <div style="text-align: right margin: 0">
                  <el-button size="mini" type="text" @click="scope.row.popShow = false">取消</el-button>
                  <el-button type="danger" size="mini" @click="removeTableRow(scope.row)">删除</el-button>
                </div>
                <div class="tableBtn" slot="reference">删除</div>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </el-row>
  </div>
</template>
<style lang="scss">
  .pestArea{
    .el-table .el-form-item__content{
      line-height:normal !important;
    }
    .el-row{
      margin-right:0px !important;
    }
  }
</style>
<script>
import {
  getPestNameList,
  getpestAreaList
} from "api/publicBase/baseCountry"
import {generateUUID} from 'utils'
export default {
  name: "pestArea",
  components: {},
   props: {
    pshow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableForm: {
        rules: {
          pestName: [
            { required: true, message: "请输入瘟疫名", trigger: "blur" }
          ]
        },
        pestAreaList: [],
        updateOldRow: [] //上传的数据
      },
      count: 0
    }
  },
  watch: {
    pshow(newValue, oldValue) {
      console.log(newValue)
      if(!newValue){
        this.tableForm.pestAreaList = this.tableForm.pestAreaList.filter(p => p.isNew ==false)
        this.tableForm.updateOldRow=[...this.tableForm.pestAreaList]
      }
    }
  },
  methods: {
    //监测是否疫区按钮，如果选择否，则将新增的瘟疫删除掉，只显示已经保存过的数据 
   
    //新增行
    addTableRow() {
      let newData = {
        id: generateUUID(),
        isDeleted: false,
        isNew: true,
        pestName: "",
        isSet: true
      }
      this.tableForm.pestAreaList.unshift(newData)
      this.tableForm.updateOldRow=[...this.tableForm.pestAreaList]
      this.$refs.table.bodyWrapper.scrollTop = 0
    },
    //删除行
    removeTableRow(row) {
      this.tableForm.pestAreaList = this.tableForm.pestAreaList.filter(
        p => p.id != row.id
      )
      //修改上传数据，isDeleted=true
      this.tableForm.updateOldRow.forEach(item => {
        if (item.id == row.id) {
          item.isDeleted = true
        }
      })
    },
    //获取瘟疫列表
    getPestAreaTableList(cid) {
      let data = {
        CountryCode: cid
      }
      getPestNameList(data).then(res => {
        if (res.success) {
          this.tableForm.pestAreaList = res.result
          this.tableForm.updateOldRow = res.result
          this.tableForm.pestAreaList.forEach(item => {
            if (item.endTime == null) {
              this.$set(item, "isSet", true)
            }
            this.$set(item, "isNew", false)
            this.$set(item, "popShow", false)
          })
        }
      })
    }
  }
}
</script>