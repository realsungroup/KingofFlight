declare var mini: any;

declare  var baseUrl;
declare var getMethod;

declare var saveMethod;

class baseObjectM3{
    REC_ID:string;
}
class Manage3 extends baseObjectM3{

}
class internationalmanage extends miniPanel {
      
    constructor(element: HTMLElement) {
        super(element);
    }

    appendManage(parentelement: HTMLElement,data :any,subdata:any,mini:any,dbs:any)
    {
       var aManage=new Manage3();
       var panelid="manager";
       var className="mini-panel mini-panel-primary";
     
       aManage=data[0];
 
       var title="国际机票预定情况";

        super.appendPanel(parentelement,panelid,mini,className,title,appConfig.internationalmanage.mainHtml,
           function(iFrame){
                iFrame.contentWindow.KingofAttendances.i_manage.setData(data,dbs,appConfig);
            },true,"");
    }
}

function main3(){
    // alert(21);
    $.getJSON("./dist/app.config.json",function(data,textStatus,hr){
         appConfig=data;
         appConfig.appfunction=appfunctions;
         submain3();});
}
function submain3() {
   
   
    baseUrl=appConfig.app.baseUrl;
    getMethod=appConfig.app.getMethod;
    saveMethod=appConfig.app.saveMethod;
    var ucode = getQueryString('ucode');
    var user  = getQueryString('user');
    var dbs=new dbHelper(baseUrl,user,ucode);
    var el = document.getElementById('content');
    var datagrids = document.getElementById('datagrids');
    var shiftPanel = new internationalmanage(el);
  
    
    var resid=appConfig.internationalmanage.guojiResid;
    var cmswhere="";
    
    
    var url ;
    mini.parse();
    dbs.dbGetdata(resid,"",cmswhere,dataGot,fnerror,fnhttperror);
    function dataGot(data,subdata)
    {
       // console.log(data);
       KingofAttendances.i_manage.setData(data,dbs,appConfig);
               
    }
    function fnerror(data){   
       //
        alert(data);

    }
    function fnhttperror(jqXHR, textStatus, errorThrown){
       //alert(2);
      // console.log(jqXHR);
      //  alert(jqXHR.responseText);
    }

};
/////////////////////////////////////////////////////////////////////////////
var KingofAttendances = KingofAttendances || {};
KingofAttendances.i_manage=new function() {
    this.setData=function(data,adbs,aappConfig){
        var me=this;
        var list;
        var o = data;
        this.jState=function(o,i){//判断单据状态改变按钮
            if(o[i].C3_527946742678=="未提交"){
                $("#tds_"+i).addClass('wtj');
            }else if(o[i].C3_527946742678=="已提交"){
                $("#tds_"+i).addClass('ytj');
            }else if(o[i].C3_527946742678=="待确认出票"){
                $("#a_"+i).text("编辑").attr('onclick','KingofAttendances.i_manage.i_meditClick('+o[i].REC_ID+')');
                $("#b_"+i).remove();
                $("#c_"+i).remove();
                $("#tds_"+i).addClass('dqr');
            }else if(o[i].C3_527946742678=="待行政确认出票"){
                $("#a_"+i).text("确认出票").attr('onclick','KingofAttendances.i_manage.conClick('+o[i].REC_ID+')');
                $("#b_"+i).remove();
                $("#c_"+i).remove();
                $("#tds_"+i).addClass('dsh');
            }else if(o[i].C3_527946742678=="订单完成"){
                $("#td_"+i).remove();
                $("#tds_"+i).addClass('none');
            }
        };
        this.bill=function(o,i){//动态加载单据信息
            list=`<tr height="30px">
                      <td class="head" colspan="2">出差单据号</td>
                      <td colspan="3">`+o[i].C3_526655624603+`</td>
                      <td class="head1" align="center" width="10%">单据状态</td>
                      <td align="center" width="15%" id="tds_`+i+`">`+o[i].C3_527946742678+`</td>
                      <td rowspan="7" width="10%" align="center" id="td_`+i+`">
                          <a class="mini-button m_btn" id="a_`+i+`" onclick="KingofAttendances.i_manage.i_meditClick(`+o[i].REC_ID+`)">航班信息</a>
                          <a class="mini-button m_btn" id="b_`+i+`" iconCls="icon-upgrade" onclick="KingofAttendances.i_manage.rebutClick(`+o[i].REC_ID+`)">驳回</a>
                          <a class="mini-button m_btn" id="c_`+i+`" iconCls="icon-remove" onclick="KingofAttendances.i_manage.revokeClick(`+o[i].REC_ID+`)">撤销</a>
                      </td>
                  </tr>
                  <tr class="tc">
                      <td rowspan="2" width="10%" class="title1">姓名</td>
                      <td rowspan="2" width="10%">`+o[i].C3_526655177113+`</td>
                      <td rowspan="2" width="10%" class="title1">身份证号</td>
                      <td rowspan="2" colspan="2">`+o[i].C3_526655197108+`</td>
                      <td class="title1" width="10%">护照号</td>
                      <td width="25%">`+o[i].C3_526655213359+`</td>
                  </tr>
                  <tr class="tc">
                      <td class="title1">护照有效期</td>
                      <td>`+o[i].C3_527948550902+`</td>
                  </tr>
                  <tr class="tc">
                      <td class="title" rowspan="2">出发地</td>
                      <td rowspan="2" width="10%">`+o[i].C3_526655262089+`</td>
                      <td class="title" rowspan="2">出发日期</td>
                      <td rowspan="2" width="15%">`+o[i].C3_527948208338+`</td>
                      <td rowspan="2">
                          护照扫描件
                          <img src="../../scripts/miniui/themes/icons/search.gif" width="15px" style="cursor:pointer" onclick="KingofAttendances.i_manage.enlClick1('`+o[i].C3_527873192635+`')"/>
                      </td>
                      <td  class="title1">往程航班号</td>
                      <td>`+o[i].C3_526655793514+`</td>
                  </tr>
                  <tr class="tc">
                      <td class="title1">航班时间</td>
                      <td>`+o[i].C3_528400651698+`</td>
                  </tr>
                  <tr class="tc">
                      <td class="title" rowspan="2">目的地</td>
                      <td rowspan="2">`+o[i].C3_526655271756+`</td>
                      <td class="title" rowspan="2">返回日期</td>
                      <td rowspan="2">`+o[i].C3_527948869929+`</td>
                      <td rowspan="2" width="10%">
                          签证扫描件
                          <img src="../../scripts/miniui/themes/icons/search.gif" width="15px" style="cursor:pointer" onclick="KingofAttendances.i_manage.enlClick1('`+o[i].C3_526655353950+`')"/>
                      </td>
                      <td class="title1">返程航班号</td>
                      <td>`+o[i].C3_528311923010+`</td>
                  </tr>
                  <tr class="tc">
                      <td class="title1">航班时间</td>
                      <td>`+o[i].C3_528400600428+`</td>
                  </tr>`;
        }
        this.i_meditClick=function(REC_ID){//编辑航班单据
          var win = mini.open({
                url: 'http://wux-hr03:8009/dist/component/i_medit.html',
                showModal: true,
                width: 600,
                height: 470,
                onload: function () {       //弹出页面加载完成
                    var iframe = this.getIFrameEl(); 
                    iframe.contentWindow.Setdbs(adbs,aappConfig,REC_ID);
                },
                ondestroy: function (action) {
                     window.location.reload();
                }
            });
        };
        this.enlClick1=function(imgUrl){//放大图片
          var win = mini.open({

                url: 'http://wux-hr03:8009/dist/component/imgenl.html',
                showModal: true,
                width: 600,
                height: 600,
                onload: function () {       //弹出页面加载完成
                    var iframe = this.getIFrameEl(); 
                    iframe.contentWindow.Setdbs(imgUrl);
                }
            });
        };
        this.conClick=function(REC_ID){//确认单据
            if(confirm('您是否要确认么？')){
    		    mini.parse();
                var form = new mini.Form("form1");
                var o =  new mini.Form("form1").getData();
                form.validate(); 
                if (form.isValid() == false) return;
                o._id=1;
                o._state="modified";
                o.REC_ID=REC_ID;
                o.C3_526655932836="Y";
                var json = mini.encode([o]);
                adbs.dbSavedata(aappConfig.internationalmanage.guojiResid,0,json,dataSaved,fnerror,fnhttperror);
                function dataSaved(text){
                    alert("操作成功");
                }
                function fnerror(text){
                    alert("操作失败");
                }
                function fnhttperror(jqXHR, textStatus, errorThrown){
                    alert("error");
                }
                window.location.reload();
    		}else{
    			return;
    		}
        };         
        this.revokeClick=function(REC_ID){//撤销单据
            if(confirm('您确定要撤销么？')){
    		    mini.parse();
                var form = new mini.Form("form1");
                var o =  new mini.Form("form1").getData();
                form.validate(); 
                if (form.isValid() == false) return;
                o._id=1;
                o._state="modified";
                o.REC_ID=REC_ID;
                o.C3_527965048090="Y";
                var json = mini.encode([o]);
                adbs.dbSavedata(aappConfig.internationalmanage.guojiResid,0,json,dataSaved,fnerror,fnhttperror);
                function dataSaved(text){
                    alert("操作成功");
                }
                function fnerror(text){
                    alert("操作失败");
                }
                function fnhttperror(jqXHR, textStatus, errorThrown){
                    alert("error");
                }
                window.location.reload();
    		}else{
    			return;
    		}
        };
        this.rebutClick=function(REC_ID){//驳回单据
            if(confirm('您确定要驳回么？')){
    		    mini.parse();
                var form = new mini.Form("form1");
                var o =  new mini.Form("form1").getData();
                form.validate(); 
                if (form.isValid() == false) return;
                o._id=1;
                o._state="modified";
                o.REC_ID=REC_ID;
                o.C3_526655608924="";
                var json = mini.encode([o]);
                adbs.dbSavedata(aappConfig.internationalmanage.guojiResid,0,json,dataSaved,fnerror,fnhttperror);
                function dataSaved(text){
                    alert("操作成功");
                }
                function fnerror(text){
                    alert("操作失败");
                }
                function fnhttperror(jqXHR, textStatus, errorThrown){
                    alert("error");
                }
                window.location.reload();
    		}else{
    			return;
    		}
        };
        this.navClick=function(state){//导航
            $("#tbManage tbody").empty()
            for(var i=0;i<o.length;i++){
                if(o[i].C3_527946742678==state){
                    me.bill(o,i);
                    $("#tbManage tbody").append(list);
                    me.jState(o,i);
                }
            };
            mini.parse();
        };
        for(var i=0;i<o.length;i++){
            if(o[i].C3_527946742678=="待确认出票"){
                this.bill(o,i);
                $("#tbManage tbody").append(list);
                this.jState(o,i);
            }
        };
        mini.parse();
    }
}