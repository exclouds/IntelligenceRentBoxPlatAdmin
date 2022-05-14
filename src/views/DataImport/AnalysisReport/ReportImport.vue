<template>
    <div class="budimport" >
        <el-dialog title="经营报表导入" 
        v-dialogDrag
        :visible.sync="windowShow" 
        width="1600px"
        :close-on-click-modal="false" 
        :close-on-press-escape="false">
        <el-form size="mini" ref="ruleForm"  @submit.native.prevent label-width="100px">
          <el-row>
           <el-col :span="6">
                <el-form-item label="所属公司：" prop="code" style="position:relative;" >                      
                    <tree-select ref="chooseEquNode" @on-treeShow-change="ontreeShowChange" :choosedEquipmentNode="choosedTreeNode" style="width:100%"></tree-select>
                    <div class="editOrgComp-row-tree" v-show="treeComp.show" >                
                        <tree ref='treeComp' :pCheckStrictly="true" :radio="true" :pTreeDefaultProps="treeComp.treeConfig" :pTreeData="treeComp.data" :pChoosedNode="treeComp.choosedTreeNodeId"
                          @on-nodeChange="onNodeClick" @on-outside-click="onClickOutSide"></tree>  
                    </div>
                                 
                </el-form-item>
                
            </el-col>    
             <el-col :span="3">
                <el-form-item label="所属版本：" prop="version" style="position:relative;"  >               
                        <el-select v-model="form.version"   style="width:100%" 
                        :disabled="!ischoose"
                        filterable>
                         <el-option
                          v-for="item in typeList"
                          :key="item.value"
                          :label="item.displayText"
                          :value="Number(item.value)"
                        ></el-option>
                    </el-select>  
                </el-form-item>
            </el-col>    
              <el-col :span="3">
                <el-form-item label="所属年份：" prop="year" style="position:relative;" >               
                    <el-date-picker v-model="form.year" 
                    type="year" 
                    placeholder="年份"     
                    style="width:100%"
                     ></el-date-picker>    
                </el-form-item>
            </el-col>
        <el-col :span="5">
            <el-form-item label="导入文件：" prop="filecontent" >
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
    <el-row style="height:600px">
   <el-tabs v-model="tabActiveName" type="card">
        <el-tab-pane
            v-for="(item, index) in TableDataList"
            :key="index"
            :label="item.name"
            :name="'budget'+index"
        
        >       
          <el-table
            :cell-class-name="tableRowClassName"
                v-loading="table.loading"
                :data="TableDataList[index].data"
                :row-key = "getRowKeys"
                border
                stripe
                highlight-current-row
                fit
                height="550px"
                style="width: 100%"
                ref="table"
            >
            <el-table-column :reserve-selection="true" type="selection" width="40"></el-table-column>
                <!-- <el-table-column type="index" align="center" label="序号" width="50">
                <template slot-scope="scope">{{countIndex(scope.$index)}}</template>
                </el-table-column> -->
            
               <el-table-column v-for=" (titem, tindex) in TableDataList[index].showListNameList" 
               :key="tindex" 
               :label="titem.cellName"
                :width="tindex===0?'50px':'150'" 
                align="center" 
                 show-overflow-tooltip
               >
                <template slot-scope="scope"  v-if="titem.issecond===false">               
                    <span v-if="titem.dataName==='feename'" >
                            {{ (scope.row["feename1"]==="" || scope.row["feename1"]===null || scope.row["feename1"]===undefined)? scope.row[titem.dataName] :scope.row["feename1"]}}
                            </span>
                           <span v-else>{{ scope.row[titem.dataName] }}</span>
                </template>
                  <el-table-column  v-for=" (setitem, setindex) in titem.secondetitle"  
                    :key="setindex" 
                    :label="setitem.cellName"
                      width="150" 
                      align="center" 
                      show-overflow-tooltip                   
                      :v-if="titem.issecond===true">
                        <!-- <span >{{ setitem.dataName }}</span> -->
                      <template slot-scope="scope">
                          
                           <span >{{ scope.row[setitem.dataName] }}</span>
                      </template>
                  </el-table-column>
            </el-table-column>
              
            </el-table>
       
        </el-tab-pane>
    </el-tabs>
    </el-row>
            <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="windowShow = false" size="small">取 消</el-button>
                <el-button type="primary" @click="save()" size="small">确 定</el-button>
            </span> -->
        </el-dialog>
    </div>
</template>
<style lang="scss">
.budimport{
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
    
</style>
<script>
import { tableMixin } from "mixin/commTable"
import upload from 'components/upload/upload'
import xlsx from 'xlsx'
import {warnMsg,successMsg,htmlMsg} from 'utils/messageBox'
import {getOrganizatonTreeNoUsers} from 'api/user/organization'
import treeSelect from 'components/treeSelect/treeSelect'
import tree from 'components/tree/tree'
import {ImportReport,CheckImportReport} from 'api/DataImport/AnalysisReport'
import { getDicListByDitType } from "api/publicBase/dictionaryMng";

export default {
    components:{ upload, treeSelect,
                tree},
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
                this. tabActiveName="budget0";
                this.form = {     
                    code:"",
                    year:undefined ,
                    version: 0         
                }
                this.ischoose=false  ;
                this.treeComp.choosedTreeNodeId=[];
                this.choosedTreeNode=[];
                this.$emit("on-show-change",newValue);
            }
        }
    },
    data() {
        return {      
            windowShow: this.pshow,
            bthloading:false,
            TableDataList:[],//表格数据,显示导入数据
            filecontent:"",
            tabActiveName:"budget0",
             treeComp: {
                show: false,
                data: [],
                choosedTreeNodeId: [],  //回显树节点ID
            },
           
             choosedTreeNode: [],
             form:{
                  code:"",
                   year:undefined  ,
                   version: 0    
             },     
             ischoose:false  ,
             typeList:[]
                      
        }
    },
    methods: {
       getRowKeys(row) {
            return row.id;
       },
       setComBox() {
          getDicListByDitType({ BaseKeyValueTypeCode: "JOINMULIMPORT", Code: "", Name: ""  }).then(res => {
            this.typeList = res.result.comboxs;
          });
          
        },
        //获取组织树
        getOrganizationTree() {
            getOrganizatonTreeNoUsers({IsByHZ:true}).then(res => {
            if(res.success)
                this.treeComp.data = res.result;             
                
            })
        },
        getTreeData(data){
            for(let i=0;i<data.length;i++){
                if(data[i].children.length<1){
                // child若为空数组，则将child设为undefined
                data[i].children=undefined;
                }else {
                // child若不为空数组，则继续 递归调用 本方法
                getTreeData(data[i].children);
                }
            }
            return data;
        },

        //
        onNodeClick(clickNode)   //choosedNodeID
        {
            this.form.code = clickNode.length > 0 ? clickNode[0].nodeUUid : ''
            this.choosedTreeNode=clickNode;
            this.ischoose=clickNode[0].ismulti;
            if(clickNode[0].ismulti!==true)
            {
              this.form.version=0;
            }
                      
        },
         onClickOutSide() {
            if(this.treeComp.show==true){
                this.treeComp.show=false;
                this.$refs.chooseEquNode.iconChange()
            }
        },
         //单击树选择框控件
        ontreeShowChange(val) {
            this.treeComp.show=val;
        },
          
       importaccount(file) {      
          this.filecontent=file.name;
          
          
          this.TableDataList=[];
            var showmsg="";
          //数据后台
          let contrast = {
              0: 'orderid',
              1: 'feename',
              2: 'feename1',
              3: 'allbudget',
              4: 'actcomtotal',
              5: 'combudschedule',
              6: 'cumulbudget',
              7: 'cumcompbudget',
              8: 'budget1',
              9: 'actbudget1',
              10: 'compbudget1',
              11: 'budget2',
              12: 'actbudget2',
              13: 'compbudget2',
              14: 'budget3',
              15: 'actbudget3',
              16: 'compbudget3',
              17: 'budget4',
              18: 'actbudget4',
              19: 'compbudget4',
              20: 'budget5',
              21: 'actbudget5',
              22: 'compbudget5',
              23: 'budget6',
              24: 'actbudget6',
              25: 'compbudget6',
              26: 'budget7',
              27: 'actbudget7',
              28: 'compbudget7',
              29: 'budget8',
              30: 'actbudget8',
              31: 'compbudget8',
              32: 'budget9',
              33: 'actbudget9',
              34: 'compbudget9',
              35: 'budget10',
              36: 'actbudget10',
              37: 'compbudget10',
              38: 'budget11',
              39: 'actbudget11',
              40: 'compbudget11',
              41: 'budget12',
              42: 'actbudget12',
              43: 'compbudget12'
            }
          let contrastName = {
            0: '行号',
            1: '父级项目',
            2: '项目',
            3: '全年预算合计',
            4: '1月预算数',
            5: '2月预算数',
            6: '3月预算数',
            7: '4月预算数',
            8: '5月预算数',
            9: '6月预算数',
            10: '7月预算数',
            11: '8月预算数',
            12: '9月预算数',
            13: '10月预算数',
            14: '11月预算数',
            15: '12月预算数'
        }
         
            this.importFile(file, (data) => {
              
              var allTableDataList=[];//所有的工作表数据

              data[0].parseData.forEach((arrItem,i) => {
                   var filemsg=[];
                if(arrItem.name==="利润表-小计" || arrItem.name==="成本明细表-小计" 
                || arrItem.name==="费用表-小计" ||arrItem.name==="收入明细表-小计"){
                  
                        //获取的单个工作表数据信息
                      var tabledata={
                          name:arrItem.name
                      };
                    
                      let shownnamelist=[];//获取列名
                      var firno=false;//从行号一行开始;
                      var firrowno=0;//获取行号所在行的行号
                    
                        let arr = [];
                        var lastrow=arrItem.data.length;
                        arrItem.data.forEach((dataitem,mindex)=>{ 
                           var msg=[];                                                    
                            if(firno && mindex <lastrow) {
                              let obj = {} 
                              for(let [index,item] of dataitem.entries()) {
                               // var celldata=Number(item.toString());
                                contrast[index] && (obj[contrast[index]] = item || '')
                                if(index>2 && mindex>(firrowno+1) && item !=="" && item !=null && item !==undefined && item !=="-")
                                {                                   
                                        var newamt=Math.round(Number(item) * 1000) / 1000;
                                        obj[contrast[index]] = newamt;
                                        var amt=newamt.toString();
                                        var num = amt.split(".");
                                        if(num.length>1)
                                        {                                                                         
                                            var showname=contrastName[index];
                                            if(num[1].length>2)
                                            {
                                              msg.push(index);                                                                                      
                                            }
                                                                                                

                                        }                            
                                    
                                }
                              }
                              if(msg.length>0)
                              {
                                let molde={
                                  LinNO:obj.orderid,
                                  data:msg
                                }
                                filemsg.push(molde)
                              }
                              if(obj.orderid=="费用合计"){
                                obj.feename=obj.orderid;
                                obj.orderid="0";
                                arr.push(obj)  
                            }        
                            else if( (obj.feename !=="" && obj.feename !==null && obj.feename !==undefined )
                              ||(obj.feename1 !=="" && obj.feename1 !==null && obj.feename1 !==undefined )  )
                              { 
                                if(obj.feename ==="注：" )
                                {
                                  lastrow=mindex;
                                }   
                                                      
                                else {
                                
                                  arr.push(obj)  
                                }       
                                                          
                              } 
                                // if( (obj.feename !=="" && obj.feename !==null && obj.feename !==undefined )
                                // ||(obj.feename1 !=="" && obj.feename1 !==null && obj.feename1 !==undefined )  )
                                // { 
                                //   if(obj.feename ==="注：" )
                                //   {
                                //     lastrow=mindex;
                                //   }   
                                                        
                                //   else {
                                  
                                //     arr.push(obj)  
                                //   }       
                                                            
                                // } 
                                // else if(obj.orderid=="费用合计"){
                                //     obj.feename=obj.orderid;
                                //     obj.orderid="0";
                                //     arr.push(obj)  
                                // }             
                            }
                            else if( mindex <lastrow){
                              if(dataitem[0]=="行号"){
                                  firrowno=mindex;  
                                  firno=true;                  
                                }                            
                            }
                              

                      })
                      var showtitle=[];

                      var title1= arrItem.data[firrowno];//标题所在行
                      var title2=[];
                      if(arrItem.data.length>firrowno+1)
                      {
                        title2= arrItem.data[firrowno+1];//第二行标题所在行

                      }
                      var ismerge=false;//是否是合并单元格
                      var hbrowno=0;
                      title1.forEach((item,index)=>{
                          
                        if(item!==""  && item !==null && item !==undefined)
                        {   
                                  
                          //当前未为合并标题 ,二级标题列追加到以及标题列
                          if(ismerge===true)
                          {
                            for(var t=hbrowno;t<index;t++)
                            {
                              if(title2[t] !=="" && title2[t] !==null && title2[t] !==undefined)
                                {                           
                                    var sectitle={
                                      cellName:title2[t],
                                      dataName:contrast[t]
                                    };                    
                                  shownnamelist[shownnamelist.length-1].secondetitle.push(sectitle);
                                   var  nntitle=shownnamelist[shownnamelist.length-1].cellName+title2[t] ;
                                      showtitle.push(nntitle);
                                }
                              
                            }
                            
                          }
                          var stitle=item; 
                          //默认该标题列不是合并单元格
                          ismerge=false;
                          var tltle={
                            cellName:item,
                            issecond:false,
                            secondetitle:[],
                            dataName:contrast[index]
                          }
                        
                          if(title2.length>index)
                          {
                            //当该二级标题列数据不为空时默认为合并标题列
                            if(title2[index] !=="" && title2[index] !==null && title2[index] !==undefined)
                            {
                              ismerge=true;
                              hbrowno=index;
                              tltle.issecond=true;
                              if(index===title1.length-1)
                              {
                                for(var t=index;t<title2.length;t++)
                                {
                                  if(title2[t] !=="" && title2[t] !==null && title2[t] !==undefined)
                                    {                         
                                        var sectitle={
                                          cellName:title2[t],
                                          dataName:contrast[t]
                                        };                    
                                      tltle.secondetitle.push(sectitle);
                                      var  nntitle=stitle+title2[t] ;
                                      showtitle.push(nntitle);
                                    }
                                  
                                }
                              }
                                                                       
                            }
                           
                          }  
                          else{
                                showtitle.push(stitle);
                          }          
                          shownnamelist.push(tltle);

                        }
                                  

                      });
                      
                      // if(filemsg.length>0)
                      // {
                      //   var nowmsg=arrItem.name+"下的";
                      //   filemsg.forEach(tt =>{
                      //     var ttmm="第"+tt.LinNO+ "行数据";
                      //     var tts="";
                      //     for(var i=0;i<tt.data;i<tt.data.length)
                      //     {
                      //       if(tts===""){
                      //         tts+=showtitle[tt.data[i]];
                      //       }
                      //       else{
                      //         var ord=tt.data[i];
                      //          tts+="、"+showtitle[ord];
                      //       }

                      //     }
                      //      ttmm=ttmm+tts+"<br>";
                      //      nowmsg+=ttmm;
                      //   })
                      //    showmsg+=nowmsg;

                      // }

                        
                      tabledata.data=arr;
                      tabledata.showListNameList=shownnamelist;
                      allTableDataList.push(tabledata) ;
                }
          
              });
                if(showmsg==="")
                {
                    this.TableDataList=allTableDataList;   
                }
                else{
                    this.TableDataList=[];
                    showmsg="以下数据小数点超过两位，请数据重新核算后导入：<br>"+showmsg;
                  // showmsg+="小数点超过两位，请将该行数据重新核算后导入"
                    htmlMsg(showmsg,{type: "warning", duration: 0, showClose: true});
                } 
              this.TableDataList=allTableDataList;   
              this.table.loading = false;       
            })
    },
    importFile(fileArr,  func) {
     this.table.loading = true; 
      fileArr = toString.call(fileArr) === '[object Array]' ? fileArr : [fileArr]
      let fileData = fileArr.map(item => {
        return {
          name: item.name,
          file: item,
          extensionName: (item.name.lastIndexOf('.') == -1 ? '' : item.name.substr(item.name.lastIndexOf('.')+1)).toLowerCase(), 
          parseData: []
        }
      })

      let parseXlsx = (file) => {
        let reader = new FileReader();
        reader.onload = (e) => {
          
          const bstr = e.target.result
      
          var binary = "";
          var bytes = new Uint8Array(bstr);
          var length = bytes.byteLength;
          for(var i = 0; i < length; i++) { 
              binary += String.fromCharCode(bytes[i]);
          }
      
          const wb = xlsx.read(binary, {type: 'binary', raw: true,cellDates: true})
    


          var parseData=[];
          wb.SheetNames.forEach((item,index) => {
              const wsname = wb.SheetNames[index];
              const ws = wb.Sheets[wsname];
             const data = xlsx.utils.sheet_to_json(ws, {header: 1})
             let nowdata={
                 name:item,
                 data:data
             }
            parseData.push(nowdata);
         });
            fileData.find(item => item.name === file.name).parseData = parseData;
            if(fileData.filter(item => !item.parseData).length === 0)
                func(fileData)
          
        }
        reader.readAsArrayBuffer(file)
      }

      //修改标识
      fileData.forEach(item => {
        if(/xlsx|xls|XLS|XLSX/.test(item.extensionName))
          parseXlsx(item.file)
        else {
            this.table.loading = false; 
        }
      });
    },  
        //导入
        Importdata() {
            var code="";
           if(this.form.code==="" || this.form.code===null || this.form.code===undefined)
           {
                warnMsg("请选择所属公司");
                return;
           }
           var arr=[];
            var budlist=[]
           this.TableDataList.forEach(item=>{
            
              if(item.data.filter(items=>items.orderid==="" || items.orderid===null || items.orderid===undefined).length>0)
              {
                    budlist.push(item.name);
              }
              else{
                 var datalist=[];
                  let currdata={
                    Name:item.name
                  }
                item.data.forEach(daitem=>{
                 
               
                    for(var i=1 ;i<13;i++)
                    {                          
                      let savedata={
                        LinNO:daitem.orderid,
                        ParentProjectName:daitem.feename,
                        ProjectName:daitem.feename1,
                        TotalBudget:daitem.allbudget,
                        CompletedTotal:daitem.actcomtotal,
                        Month:i,
                        BudgetAmount:daitem["budget"+i],
                        CompletedAmount:daitem["actbudget"+i]
                        
                      }
                      datalist.push(savedata);
                          

                  }

                })
                currdata.Data=datalist;
                arr.push(currdata);

              }
              
           })
            if(budlist.length>0)
           {
               var budmsg=budlist.toString();
               budmsg=budmsg.replace(/,/g,"<br>")
               var msg="以下导入表格存在没有行号的数据，请重新核对导入文件:<br>";
               msg+=budmsg;
               htmlMsg(msg,{type: "warning", duration: 0, showClose: true});
                // warnMsg(msg);
                 return;
           }

            let data={
                      code:this.form.code,                     
                      year:this.form.year.getFullYear(),
                      version:this.form.version,
                      Data:arr
                  };
             this.bthloading=true;
              CheckImportReport(data).then(res => {
                if(res.success)
                {
                  this.bthloading=false;
                  if(res.result==="" || res.result===null)
                  {
                     this.savedata(data);
                  }
                  else{
                     this.$confirm('<div style="height:300px;overflow:auto;">'+res.result+'</div>',"提示",
                    {
                      dangerouslyUseHTMLString: true,
                      confirmButtonText: "确定",
                      cancelButtonText: "取消",
                    }).then(({ value }) => {
                       this.savedata(data);

                    });
                   
                      //  this.$confirm(res.result,"以下导入全年合计与已导入全年合计金额数值不同，是否继续导入?",
                      // {
                      //     confirmButtonText: '确定',
                      //     cancelButtonText: '取消',
                      //     type: 'warning'
                      // }).then(({ value }) => {
                      //    this.savedata(data);

                      // });
                  }
                 
                    
                }
            })
            .catch(err=>{
                this.bthloading=false;
            });
                  // var showmsg=JSON.stringify(data);
                  // htmlMsg(showmsg.toString(),{type: "warning", duration: 0, showClose: true});
                 
        },
        savedata(data){
           this.bthloading=true;
            ImportReport(data).then(res => {
                if(res.success)
                {
                  this.bthloading=false;
                  if(res.result!=="" && res.result !==null && res.result !==undefined)
                  {
                    htmlMsg(res.result,{type: "warning", duration: 0, showClose: true});

                  }
                  else{
                     successMsg("经营报表导入成功");
                  }
                                                                        
                }
            })
            .catch(err=>{
                this.bthloading=false;
            });
        }
    }
}
</script>