declare var mini: any;

declare  var baseUrl;
declare var getMethod;

declare var saveMethod;


function main4(){
    $.getJSON("./dist/app.config.json",function(data,textStatus,hr){
         appConfig=data;
         appConfig.appfunction=appfunctions;
         submain4();});
}
function submain4() {
    baseUrl=appConfig.app.baseUrl;
    getMethod=appConfig.app.getMethod;
    saveMethod=appConfig.app.saveMethod;
    var ucode = getQueryString('ucode');
    var user  = getQueryString('user');
    var dbs=new dbHelper(baseUrl,user,ucode);
  
    
    var resid=appConfig.domesticmanage.guoneiResid;
    var cmswhere="";
    mini.parse();
    dbs.dbGetdata(resid,"",cmswhere,dataGot,fnerror,fnhttperror);
    function dataGot(data,subdata)
    {
       // console.log(data);
        KingofAttendances.d_manage.setData(data,dbs,appConfig);
               
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
////////////////////////////////////////////////////////////////
var KingofAttendances = KingofAttendances || {};
KingofAttendances.d_manage=new function() {
    this.setData=function(data,adbs,aappConfig){
        var me=this;
        var list;
        var o = data;     
        this.jState=function(o,i){//判断单据状态改变按钮
            if(o[i].C3_528049541154=="未提交"){
                $("#tds_"+i).addClass('wtj');
            }else if(o[i].C3_528049541154=="已提交"){
                $("#tds_"+i).addClass('ytj');
            }else if(o[i].C3_528049541154=="待确认出票"){
                $("#a_"+i).text("确认").attr('onclick','');
                $("#b_"+i).remove();
                $("#c_"+i).remove();
                $("#tds_"+i).addClass('dqr');
            }else if(o[i].C3_528049541154=="待行政确认出票"){
                $("#a_"+i).text("确认出票").attr('onclick','KingofAttendances.d_manage.conClick('+o[i].REC_ID+')');
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
                      <td class="head" colspan="2">出差单据号</td>
                      <td colspan="2">`+o[i].C3_526656513019+`</td>
                      <td class="head1" align="center" width="10%">单据状态</td>
                      <td align="center" width="15%" id="tds_`+i+`">`+o[i].C3_528049541154+`</td>
                      <td rowspan="4" width="5%" align="center" id="td_`+i+`">
                          <a class="mini-button m_btn" id="a_`+i+`" onclick="KingofAttendances.d_manage.d_meditClick(`+o[i].REC_ID+`)">航班信息</a>
                          <a class="mini-button m_btn" id="b_`+i+`" iconCls="icon-upgrade" onclick="KingofAttendances.d_manage.rebutClick(`+o[i].REC_ID+`)">驳回</a>
                          <a class="mini-button m_btn" id="c_`+i+`" iconCls="icon-remove" onclick="KingofAttendances.d_manage.revokeClick(`+o[i].REC_ID+`)">撤销</a>
                      </td>
                  </tr>
                  <tr height="40px" align="center">
                      <td class="title1">姓名</td>
                      <td>`+o[i].C3_526656510920+`</td>
                      <td class="title1">身份证号</td>
                      <td colspan="3">`+o[i].C3_526656510713+`</td>
                  </tr>
                  <tr class="tc">
                      <td class="title1">出发地</td>
                      <td>`+o[i].C3_526656511963+`</td>
                      <td class="title1">出发日期</td>
                      <td>`+o[i].C3_528048113321+`</td>
                      <td align="center">航班号</td>
                      <td>`+o[i].C3_526656513426+`</td>
                  </tr>
                  <tr class="tc">
                      <td class="title1">目的地</td>
                      <td>`+o[i].C3_526656512229+`</td>
                      <td class="title1">行程类别</td>
                      <td>`+o[i].C3_526656512808+`</td>
                      <td>航班时间</td>
                      <td>`+o[i].C3_529016446872+`</td>
                  </tr>`;
        }
        this.d_meditClick=function(REC_ID){//编辑航班单据
          var win = mini.open({
                url: 'http://wux-hr03:8009/dist/component/d_medit.html',
                showModal: false,
                width: 600,
                height: 470,
                onload: function () {       //弹出页面加载完成
                    var iframe = this.getIFrameEl(); 
                    iframe.contentWindow.Setdbs(adbs,aappConfig,REC_ID);
                },
                ondestroy: function (action) {
                     parent.location.reload();     
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
                o.C3_526656514479="Y";
                var json = mini.encode([o]);
                adbs.dbSavedata(aappConfig.domesticmanage.guoneiResid,0,json,dataSaved,fnerror,fnhttperror);
                function dataSaved(text){
                    alert("申请成功");
                }
                function fnerror(text){
                    alert("申请失败");
                }
                function fnhttperror(jqXHR, textStatus, errorThrown){
                    alert("error");
                }
                parent.location.reload();
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
                adbs.dbSavedata(aappConfig.domesticmanage.guojiResid,0,json,dataSaved,fnerror,fnhttperror);
                function dataSaved(text){
                    alert("申请成功");
                }
                function fnerror(text){
                    alert("申请失败");
                }
                function fnhttperror(jqXHR, textStatus, errorThrown){
                    alert("error");
                }
                parent.location.reload();
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
                adbs.dbSavedata(aappConfig.domesticmanage.guojiResid,0,json,dataSaved,fnerror,fnhttperror);
                function dataSaved(text){
                    alert("申请成功");
                }
                function fnerror(text){
                    alert("申请失败");
                }
                function fnhttperror(jqXHR, textStatus, errorThrown){
                    alert("error");
                }
                parent.location.reload();
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
        };
        for(var i=0;i<o.length;i++){
            if(o[i].C3_528049541154=="已提交"){
                this.bill(o,i);
                $("#tbManage tbody").append(list);
                this.jState(o,i);
                $("#tds_"+i).addClass('ytj');
            }
        };
    }
}