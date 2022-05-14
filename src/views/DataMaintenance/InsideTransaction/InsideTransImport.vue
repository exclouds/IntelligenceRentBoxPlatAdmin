<template>
  <div class="app-container InsideImportclass" v-loading="bthloading">
     <el-dialog title="内部交易抵消费用导入" 
        v-dialogDrag
        :visible.sync="windowShow" 
        width="1400px"
        :close-on-click-modal="false" 
        :close-on-press-escape="false">
    <el-form size="mini" @submit.native.prevent label-width="100px">
    <el-row>
       <el-col :span="6">
          <el-form-item label="BU：" prop="BU" style="position:relative;" >
                   
            <el-select
              v-model="form.BU"
              placeholder="BU"
             
              filterable          
            >
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.displayText"
                :value="item.value"
              ></el-option>
            </el-select>
                </el-form-item>
        </el-col>
          <el-col :span="4">
             <el-form-item label="所属月份：" prop="budtime" style="position:relative;" >               
                    <el-date-picker v-model="budtime" 
                    type="month" 
                    placeholder="年份"     
                    style="width:100%"
                     ></el-date-picker>    
            </el-form-item>
         </el-col>
        <el-col :span="7">
            <el-form-item label="导入文件：" prop="filecontent" label-width="100px">
              <el-input
                size="mini"
                v-model="filecontent"
                placeholder="请选择导入文件"
                style="width:100%"
              ></el-input>
            </el-form-item>
          </el-col>
        <el-col :span="4">
          <el-form-item label prop label-width="10px">
            <!-- <el-button type="primary" size="mini" @click="onSearchBefore();getTableList()" >搜索</el-button> -->
        <upload pAcceptFormat=".xlsx,.xls" :pIsOss="false" @onCustomUpload="importaccount" style="margin-bottom:5px;display: inline-block;float:none !important;">
          <el-button type="primary" size="mini" style="margin-left:0px;">浏览</el-button>
        </upload>
          <el-button type="primary" size="mini" @click="Importdata" :loading="bthloading">导入</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form> 
      <el-table
      :cell-class-name="tableRowClassName"
        v-loading="table.loading"
        :data="TableDataList"
         :row-key = "getRowKeys"
        border
        stripe
        highlight-current-row
        fit
        height="600px"
        style="width: 100%"
        ref="table"
      >
        <el-table-column type="index" align="center" label="序号" width="50">
          <template slot-scope="scope">{{countIndex(scope.$index)}}</template>
        </el-table-column>
         <el-table-column
          align="center"
          prop="pzno"
          label="凭证号"
          show-overflow-tooltip
         width="120"
        ></el-table-column>
       
        <el-table-column
          align="center"
          prop="company"
          label="公司"
          show-overflow-tooltip
        
        ></el-table-column>
       
        <el-table-column
          align="center"
          prop="project"
          show-overflow-tooltip
          label="指标"
         width="200"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="debitamt"
          show-overflow-tooltip
          label="借方金额"
        width="120"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="lendamt"
          show-overflow-tooltip
          label="贷方金额"
          width="120"
        ></el-table-column>
        
            <el-table-column
              align="center"
              prop="diffdebitamt"
              show-overflow-tooltip
              label="差额规则后借方金额"
              width="160"
            ></el-table-column>
       <el-table-column
              align="center"
              prop="difflendamt"
              show-overflow-tooltip
              label="差额规则后贷方金额"
              width="160"
            ></el-table-column>
          
      </el-table>
     </el-dialog>
 
  </div>
</template>
<style lang="scss">
.InsideImportclass {
  .country-tableRow {
    .tableX .el-table--scrollable-x .el-table__body-wrapper {       
        overflow: auto !important;
    }
    
      .chsEqp{
            width:100%;
            .textPromt{float:left;}
            .chsEqp-select{height:26px;line-height: 24px;}
            i{float: right;margin-top: 6px;}
        }
        .editOrgComp-row-tree{
                position:absolute;
                top:40px;
                left:70px;
                background-color: #fff;
                z-index: 10;
                padding:0;
                margin:0;
                width:300px;
                height:450px;
                clear: both;

                
            }
  }
}
</style>
<script>
import { tableMixin } from "mixin/commTable"
import upload from 'components/upload/upload'
import xlsx from 'xlsx'
import {warnMsg,successMsg,htmlMsg} from 'utils/messageBox'
import { GetInsideBuComboBox } from "api/publicBase/Combox";
import{ImportInTransactData} from 'api/DataMaintenance/InsideTransaction'

export default {
  components: {upload},
  mixins: [tableMixin],
      props:{
        pshow: {
            type: Boolean,
            default: false
        },
    },
    watch: {
        pshow(newValue, oldValue){
            this.windowShow = newValue;
            
        },
        windowShow(newValue, oldValue){
            if(this.$refs["ruleForm"])
                this.$refs["ruleForm"].resetFields();   //清空验证

            if(!newValue)  //窗口关闭
            {
                this.TableDataList=[];
                this.filecontent="";
                this.form = {     
                    BU:""   
                }
                // this.deptreeComp.data=[];
                this.choosedTreeNode=[];
                this.$emit("on-show-change",newValue);
            }
        }
    },
  data() {
    return {
       windowShow: this.pshow,
       TableDataList:[],//表格数据,显示导入数据
       filecontent:"",
       daterange:"",
       budtime:new Date(),
       currency:"",
       bthloading:false,    
      typeList: [],
      form:{
          BU:""
      },    
    }
  },
  methods: {
    getRowKeys(row) {
            return row.id;
    },
        //添加查询combox
    setComBox() {
      GetInsideBuComboBox().then((res) => {
        this.typeList = res.result;
        if(res.result.length>0){
          this.form.BU=res.result[0].value;
        }
      });
      
    },
    importaccount(file) {       
      this.filecontent=file.name;
  
      let contrast = {
        0: 'pzno',
        1: 'remarks',
        2: 'project',
        3: 'debitamt',
        4: 'lendamt',
        5: 'diffdebitamt',
        6: 'difflendamt',
        7: 'company',
       
        
      }
      
      let arr = []
      this.TableDataList=[];
      this.importFile(file, (data) => {
        this.table.loading = true;     
        data[0].parseData.forEach((arrItem,i) => {
         
          if(i > 0) {
            let obj = {}
            for(let [index,item] of arrItem.entries()) {
              contrast[index] && (obj[contrast[index]] = item || '')
            
              
            }
            if(obj.company!=="" && obj.company!==null && obj.company!==undefined
             && obj.project!=="" && obj.project!==null && obj.project!==undefined)
             arr.push(obj);          
          }
        });
           
        this.TableDataList=arr;   
         this.table.loading = false;       
      })
    },
    setnumber(amttxt){
      var txtamt=amttxt.toString()
      var amt=txtamt.replace(/,/g, '');
      amt=amt.replace(/\s*/g,"");
      var namt=Number(amt);
      if( namt!==undefined)
      {
        return namt;
      }
        
      return amttxt;
       

    },
    importFile(fileArr,  func) {
      fileArr = toString.call(fileArr) === '[object Array]' ? fileArr : [fileArr]
      let fileData = fileArr.map(item => {
        return {
          name: item.name,
          file: item,
          extensionName: (item.name.lastIndexOf('.') == -1 ? '' : item.name.substr(item.name.lastIndexOf('.')+1)).toLowerCase(), 
          parseData: null
        }
      })

      let parseXlsx = (file) => {
        let reader = new FileReader()
        reader.onload = (e) => {
          
          const bstr = e.target.result
      
          var binary = "";
          var bytes = new Uint8Array(bstr);
          var length = bytes.byteLength;
          for(var i = 0; i < length; i++) { 
              binary += String.fromCharCode(bytes[i]);
          }
      
          const wb = xlsx.read(binary, {type: 'binary', raw: true,cellDates: true})
          const wsname = wb.SheetNames[0]
          const ws = wb.Sheets[wsname]
          const data = xlsx.utils.sheet_to_json(ws, {header: 1})
      
          fileData.find(item => item.name === file.name).parseData = data
          if(fileData.filter(item => !item.parseData).length === 0)
            func(fileData)
          
        }
        reader.readAsArrayBuffer(file)
      }

      let parseText = file => {
        let reader = new FileReader()
        reader.onload = (e) => {
          fileData.find(item => item.name === file.name).parseData = e.target.result
          if(fileData.filter(item => !item.parseData).length === 0)
            func(fileData)
        }
        reader.readAsText(file)
      }

      //修改标识
      fileData.forEach(item => {
        if(/xlsx|xls|XLS|XLSX/.test(item.extensionName))
          parseXlsx(item.file)
        else {
          parseText(item.file)
        }
      });
    },
    //导入
        Importdata() {
            var code="";
           if(this.form.BU==="" || this.form.BU===null || this.form.BU===undefined)
           {
                warnMsg("请选择BU");
                return;
           }
           if(this.budtime==="" || this.budtime===null || this.budtime===undefined)
           {
                warnMsg("请选择所属时间");
                return;
           }
          
                     
            let data={
                      BU:this.form.BU,
                      Year:this.budtime.getFullYear(),
                      Month:this.budtime.getMonth()+1,
                      Data: this.TableDataList
                  };
             this.bthloading=true;
              ImportInTransactData(data).then(res => {
                if(res.success)
                {
                  this.bthloading=false;
                  if(res.result==="" || res.result===null)
                  {
                      successMsg("内部交易抵消费用导入成功");

                  }
                  // else if(res.result.msg !=="" && res.result.msg !==null && res.result.msg !==undefined)
                  // {
                  //     htmlMsg(res.result.msg,{type: "warning", duration: 0, showClose: true});
                  // }
                  else{
                      htmlMsg(res.result,{type: "warning", duration: 0, showClose: true});
                  }
                    
                }
            })
            .catch(err=>{
                this.bthloading=false;
            });
                 
        },
  
  }
  
}
</script>