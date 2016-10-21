declare var mini: any;

declare  var baseUrl;
declare var getMethod;

declare var saveMethod;

class baseObjectM2{
    REC_ID:string;
}
// class Manage2 extends baseObjectM2{

// }
// class domesticfilght extends miniPanel {
      
//     constructor(element: HTMLElement) {
//         super(element);
//     }

//     appendManage(parentelement: HTMLElement,data :any,subdata:any,mini:any,dbs:any)
//     {
//        var aManage=new Manage2();
//        var panelid="manager";
//        var className="mini-panel mini-panel-primary";
     
//        aManage=data[0];
 
//        var title="国内机票预定信息";

//         super.appendPanel(parentelement,panelid,mini,className,title,appConfig.domesticfilght.mainHtml,
//            function(iFrame){
//                 iFrame.contentWindow.KingofAttendances.domestic.setData(data,dbs,appConfig);
//             },true,"");
//     }
// }

function main2(){
    $.getJSON("./dist/app.config.json",function(data,textStatus,hr){
         appConfig=data;
         appConfig.appfunction=appfunctions;
         submain2();});
}
function submain2() {
   
   
    baseUrl=appConfig.app.baseUrl;
    getMethod=appConfig.app.getMethod;
    saveMethod=appConfig.app.saveMethod;
    var ucode = getQueryString('ucode');
    var user  = getQueryString('user');
    var dbs=new dbHelper(baseUrl,user,ucode);
  
    
    var resid=appConfig.domesticfilght.guoneiResid;
    var cmswhere="";
    var url ;
    mini.parse();
    dbs.dbGetdata(resid,"",cmswhere,dataGot,fnerror,fnhttperror);
    function dataGot(data,subdata)
    {
       // console.log(data);
      KingofAttendances.domestic.setData(data,dbs,appConfig);
               
    }
    function fnerror(data){   
       // alert(1);
        alert(data);

    }
    function fnhttperror(jqXHR, textStatus, errorThrown){
       //alert(2);
       //console.log(jqXHR);
      //  alert(jqXHR.responseText);
    }

};
////////////////////////////////////////////////////////////////////////////////////////
var KingofAttendances = KingofAttendances || {};
KingofAttendances.domestic=new function() {
    this.setData=function(data,adbs,aappConfig){
        var me=this;
        var list;
        var o = data;
        this.jState=function(o,i){//判断单据状态改变按钮
            if(o[i].C3_528049541154=="未提交"){
                $("#tds_"+i).addClass('wtj');
            }else if(o[i].C3_528049541154=="已提交"){
                $("#a_"+i).text("已提交").attr('onclick','');
                $("#b_"+i).remove();
                $("#c_"+i).remove();
                $("#tds_"+i).addClass('ytj');
            }else if(o[i].C3_528049541154=="待确认出票"){
                $("#a_"+i).text("确认").attr('onclick','KingofAttendances.domestic.conClick('+o[i].REC_ID+')');
                $("#tds_"+i).addClass('dqr');
                $("#b_"+i).remove();
                $("#c_"+i).remove();
            }else if(o[i].C3_528049541154=="待行政确认出票"){
                $("#a_"+i).text("已确认").attr('onclick','');
                $("#b_"+i).remove();
                $("#c_"+i).remove();
                $("#tds_"+i).addClass('dsh');
            }else if(o[i].C3_528049541154=="订单完成"){
                $("#td_"+i).remove();
                $("#tds_"+i).addClass('none');
            }
            mini.parse();
        };
        this.bill=function(o,i){//动态加载单据信息
            list=`<tr height="30px">
                    <td colspan="2" class="head">出差单据号</td>
                    <td colspan="2">`+o[i].C3_526656513019+`</td>
                    <td width="10%" class="tc">`+o[i].C3_526656512808+`</td>
                    <td class="title1" width="10%">单据状态</td>
                    <td class="tc" id="tds_`+i+`" width="25%">`+o[i].C3_528049541154+`</td>
                    <td rowspan="5" width="10%" class="tc" id="td_`+i+`">
                        <a class="mini-button m_btn" id="a_`+i+`" iconCls="icon-upload" onclick="KingofAttendances.domestic.submitClick(`+o[i].REC_ID+`)">提交</a>
                        <a class="mini-button m_btn" id="b_`+i+`"iconCls="icon-edit" onclick="KingofAttendances.domestic.editClick(`+o[i].REC_ID+`)">编辑</a>
                        <a class="mini-button m_btn" id="c_`+i+`"iconCls="icon-remove" onclick="KingofAttendances.domestic.revokeClick(`+o[i].REC_ID+`)">撤销</a>
                    </td>
                  </tr>
                  <tr class="tc">
                    <td width="10%" rowspan="2" class="title1">出发地</td>
                    <td width="10%" rowspan="2">`+o[i].C3_526656511963+`</td>
                    <td width="10%" rowspan="2" class="title1">出发日期</td>
                    <td width="25%" rowspan="2" colspan="2">`+o[i].C3_528048113321+`</td>
                    <td class="title1">去程航班号</td>
                    <td>`+o[i].C3_526656513426+`</td>
                  </tr>
                  <tr class="tc">
                    <td class="title1">航班时间</td>
                    <td>`+o[i].C3_529016446872+`</td>
                  </tr>
                  <tr class="tc">
                    <td rowspan="2" class="title1">目的地</td>
                    <td rowspan="2">`+o[i].C3_526656512229+`</td>
                    <td rowspan="2" class="title1">返回日期</td>
                    <td rowspan="2" colspan="2">`+o[i].C3_530114959734+`</td>
                    <td class="title1">返程航班号</td>
                    <td>`+o[i].C3_530118289053+`</td>
                  </tr>
                  <tr class="tc">
                    <td class="title1">航班时间</td>
                    <td>`+o[i].C3_530118810885+`</td>
                  </tr>`
        }
        this.addClick=function(){
            var win = mini.open({
                url: 'http://wux-hr03:8009/dist/component/dsetdata.html',
                showModal: true,
                width: 400,
                height: 500,
                onload: function () {       //弹出页面加载完成
                    var iframe = this.getIFrameEl();
                    iframe.contentWindow.Setdbs(adbs,aappConfig);
                },
                ondestroy: function (action) {
                   window.location.reload();
                }
            });
        };
        this.noteClick=function(){//新增航班单据
            var win = mini.open({
                url: aappConfig.app.note,
                showModal: true,
                width: 800,
                height: 550,
                title:"订票须知"
            });
        };
        this.editClick=function(REC_ID){
            var win = mini.open({
                url: 'http://wux-hr03:8009/dist/component/deditdata.html',
                showModal: true,
                width: 400,
                height: 500,
                onload: function () {       //弹出页面加载完成
                    var iframe = this.getIFrameEl(); 
                    iframe.contentWindow.Setdbs(adbs,aappConfig,REC_ID);
                },
                ondestroy: function (action) {
                     window.location.reload();     
                }
            });
        };
        this.submitClick=function(REC_ID){
            if(confirm('您确定要提交么？')){
    		    mini.parse();
                var form = new mini.Form("form1");
                var o =  new mini.Form("form1").getData();
                form.validate(); 
                if (form.isValid() == false) return;
                o._id=1;
                o._state="modified";
                o.REC_ID=REC_ID;
                o.C3_526656513243="Y";
                var json = mini.encode([o]);
                adbs.dbSavedata(aappConfig.domesticfilght.guoneiResid,0,json,dataSaved,fnerror,fnhttperror);
                function dataSaved(text){
                    alert("提交成功");
                }
                function fnerror(text){
                    alert("提交失败");
                }
                function fnhttperror(jqXHR, textStatus, errorThrown){
                    alert("error");
                }
                window.location.reload();
    		}else{
    			return;
    		}
        }     
        this.revokeClick=function(REC_ID){
            if(confirm('您确定要撤销么？')){
    		    mini.parse();
                var form = new mini.Form("form1");
                var o =  new mini.Form("form1").getData();
                form.validate(); 
                if (form.isValid() == false) return;
                o._id=1;
                o._state="modified";
                o.REC_ID=REC_ID;
                o.C3_528049577044="Y";
                var json = mini.encode([o]);
                adbs.dbSavedata(aappConfig.domesticfilght.guoneiResid,0,json,dataSaved,fnerror,fnhttperror);
                function dataSaved(text){
                    alert("设置成功");
                }
                function fnerror(text){
                    alert("设置失败");
                }
                function fnhttperror(jqXHR, textStatus, errorThrown){
                    alert("error");
                }
                window.location.reload();
    		}else{
    			return;
    		}
        }
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
                o.C3_526656513624="Y";
                var json = mini.encode([o]);
                adbs.dbSavedata(aappConfig.domesticfilght.guoneiResid,0,json,dataSaved,fnerror,fnhttperror);
                function dataSaved(text){
                    alert("申请成功");
                }
                function fnerror(text){
                    alert("申请失败");
                    alert(text);
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
                if(o[i].C3_528049541154==state){
                    me.bill(o,i);
                    $("#tbManage tbody").append(list);
                    me.jState(o,i);
                }
            };
            mini.parse();
        };
        var si=`<tr height="40px" align="center">
                    <td width="15%" class="title">员工号</td>
                    <td width="15%">`+o[0].C3_526656511106+`</td>
                    <td width="15%" class="title">姓名</td>
                    <td width="15%">`+o[0].C3_526656510920+`</td>
                    <td width="15%" class="title">身份证号</td><td width="25%">`+o[0].C3_526656510713+`</td>
                </tr>`
        $("#si").html(si);
        for(var i=0;i<o.length;i++){
            if(o[i].C3_528049541154=="未提交"){
            this.bill(o,i);
            $("#tbManage tbody").append(list);
            mini.parse();
            this.jState(o,i);
            mini.parse();
            }
        };
    };
}