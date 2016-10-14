declare var mini: any;

declare  var baseUrl;
declare var getMethod;

declare var saveMethod;

class baseObjectM1{
    REC_ID:string;
}
// class Manage1 extends baseObjectM1{

// }
//class internationalfilght extends miniPanel {
      
    // constructor(element: HTMLElement) {
    //     super(element);
    // }

    // appendManage(parentelement: HTMLElement,data :any,subdata:any,mini:any,dbs:any)
    // {
    //    var aManage=new Manage1();
    //    var panelid="manager";
    //    var className="mini-panel mini-panel-primary";
     
    //    aManage=data[0];
 
    //    var title="国际机票预定信息";

        //super.appendPanel(parentelement,panelid,mini,className,title,appConfig.internationalfilght.mainHtml,
        //    function(iFrame){
             
               
        //         iFrame.contentWindow.KingofAttendances.international.setData(data,dbs,appConfig);
                 
        //     }
            //,true,"");
    //}
//}

function main(){
    $.getJSON("./dist/app.config.json",function(data,textStatus,hr){
         appConfig=data;
         appConfig.appfunction=appfunctions;
         submain();});
}
function submain() {
    baseUrl=appConfig.app.baseUrl;
    getMethod=appConfig.app.getMethod;
    saveMethod=appConfig.app.saveMethod;
    var ucode = getQueryString('ucode');
    var user  = getQueryString('user');
    var dbs=new dbHelper(baseUrl,user,ucode);
    //var el = document.getElementById('content');
    //var datagrids = document.getElementById('datagrids');
    //var shiftPanel = new internationalfilght(el);
  
    
    var resid=appConfig.internationalfilght.guojiResid;
    //var subresid=appConfig.shifrpttofmanager.subresid;
    var cmswhere="";
    //if (appConfig.app.debug)
    // {cmswhere="C3_525699724860=392";}
    //shiftPanel.start();
    //KingofAttendances.international.setData(data,dbs,appConfig);
    var url ;
    mini.parse();
    dbs.dbGetdata(resid,"",cmswhere,dataGot,fnerror,fnhttperror);
    function dataGot(data,subdata)
    {
        // alert(1);
       //console.log(data);
       KingofAttendances.international.setData(data,dbs,appConfig);
       //setTimeout(function() {
           
      
        //shiftPanel.appendManage(datagrids,data,subdata,mini,dbs);
        //},500);        
    }
    function fnerror(data){   
       // alert(1);
        //alert(data);

    }
    function fnhttperror(jqXHR, textStatus, errorThrown){
       //alert(2);
       console.log(jqXHR);
      //  alert(jqXHR.responseText);
    }

};
/////////////////////////////////////////////////////////////////////////////////////////////
var KingofAttendances = KingofAttendances || {};
KingofAttendances.international=new function() {
    this.setData=function(data,adbs,aappConfig){
        var me=this;
        var list;
        var o = data;     
        this.jState=function(o,i){//判断单据状态改变按钮
            if(o[i].C3_527946742678=="未提交"){
                $("#tds_"+i).addClass('wtj');
            }else if(o[i].C3_527946742678=="已提交"){
                $("#a_"+i).text("已提交").attr('onclick','');
                $("#b_"+i).remove();
                $("#c_"+i).remove();
                $("#tds_"+i).addClass('ytj');
            }else if(o[i].C3_527946742678=="待确认出票"){
                $("#a_"+i).text("确认").attr('onclick','KingofAttendances.international.conClick('+o[i].REC_ID+')');
                $("#b_"+i).remove();
                $("#c_"+i).remove();
                $("#tds_"+i).addClass('dqr');
            }else if(o[i].C3_527946742678=="待行政确认出票"){
                $("#a_"+i).text("已确认").attr('onclick','');
                $("#b_"+i).remove();
                $("#c_"+i).remove();
                $("#tds_"+i).addClass('dsh');
            }else if(o[i].C3_527946742678=="订单完成"){
                $("#tdb_"+i).remove();
                $("#tds_"+i).addClass('none');
            }
        };
        this.bill=function(o,i){//动态加载单据信息
            list=`<tr height="30px">
                      <td class="head" width="10%" colspan="2">出差单据号</td>
                      <td colspan="3">`+o[i].C3_526655624603+`</td>
                      <td class="head1" align="center" width="10%">单据状态</td>
                      <td align="center" width="15%" id="tds_`+i+`">`+o[i].C3_527946742678+`</td>
                      <td rowspan="5" width="5%" align="center" id="tdb_`+i+`">
                          <a class="mini-button m_btn" id="a_`+i+`" iconCls="icon-upload" onclick="KingofAttendances.international.submitClick(`+o[i].REC_ID+`)">提交</a>
                          <a class="mini-button m_btn" id="b_`+i+`" iconCls="icon-edit" onclick="KingofAttendances.international.editClick(`+o[i].REC_ID+`)">编辑</a>
                          <a class="mini-button m_btn" id="c_`+i+`" iconCls="icon-remove" onclick="KingofAttendances.international.revokeClick(`+o[i].REC_ID+`)">撤销</a>
                      </td>
                  </tr>
                  <tr class="tc">
                      <td width="10%" class="title" rowspan="2">出发日期</td>
                      <td width="10%" rowspan="2">`+o[i].C3_527948208338+`</td>
                      <td width="10%" class="title" rowspan="2">出发地</td>
                      <td width="10%" rowspan="2">`+o[i].C3_526655262089+`</td>
                      <td rowspan="2" width="15%">
                          签证扫描件
                          <img src="../../scripts/miniui/themes/icons/search.gif" width="15px" style="cursor:pointer" onclick="KingofAttendances.international.enlClick('`+o[i].C3_526655353950+`')"/>
                      </td>
                      <td  class="title1">往程航班号</td>
                      <td>`+o[i].C3_526655793514+`</td>
                  </tr>
                  <tr class="tc">
                      <td class="title1">航班时间</td>
                      <td>`+o[i].C3_528400651698+`</td>
                  </tr>
                  <tr class="tc">
                      <td class="title" rowspan="2">返回日期</td>
                      <td rowspan="2">`+o[i].C3_527948869929+`</td>
                      <td class="title" rowspan="2">返回地</td>
                      <td rowspan="2">`+o[i].C3_526655271756+`</td>
                      <td rowspan="2">
                          护照扫描件
                          <img src="../../scripts/miniui/themes/icons/search.gif" width="15px" style="cursor:pointer" onclick="KingofAttendances.international.enlClick('`+o[i].C3_527873192635+`')"/>
                      </td>
                      <td class="title1">返程航班号</td>
                      <td>`+o[i].C3_528311923010+`</td>
                  </tr>
                  <tr class="tc">
                      <td class="title1">航班时间</td>
                      <td>`+o[i].C3_528400600428+`</td>
                  </tr>`;
        }
        this.addClick=function(){//新增航班单据
            var win = mini.open({
                url: 'http://wux-hr03:8009/dist/component/setdata.html',
                showModal: false,
                width: 550,
                height: 550,
                onload: function () {       //弹出页面加载完成
                    var iframe = this.getIFrameEl(); 
                    iframe.contentWindow.Setdbs(adbs,aappConfig);
                },
                ondestroy: function (action) {
                   parent.location.reload();
                }
            });
        };
        this.enlClick=function(imgUrl){//放大图片
          var win = mini.open({

                url: 'http://wux-hr03:8009/dist/component/imgenl.html',
                showModal: false,
                width: 600,
                height: 600,
                onload: function () {       //弹出页面加载完成
                    var iframe = this.getIFrameEl(); 
                    iframe.contentWindow.Setdbs(imgUrl);
                }
            });
        };
        this.editClick=function(REC_ID){//编辑航班单据
          var win = mini.open({
                url: 'http://wux-hr03:8009/dist/component/editdata.html',
                showModal: false,
                width: 600,
                height: 550,
                onload: function () {       //弹出页面加载完成
                    var iframe = this.getIFrameEl(); 
                    iframe.contentWindow.Setdbs(adbs,aappConfig,REC_ID);
                },
                ondestroy: function (action) {
                     parent.location.reload();     
                }
            });
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
                adbs.dbSavedata(aappConfig.internationalfilght.guojiResid,0,json,dataSaved,fnerror,fnhttperror);
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
        this.submitClick=function(REC_ID){//提交单据
            if(confirm('您确定要提交么？')){
    		    mini.parse();
                var form = new mini.Form("form1");
                var o =  new mini.Form("form1").getData();
                form.validate(); 
                if (form.isValid() == false) return;
                o._id=1;
                o._state="modified";
                o.REC_ID=REC_ID;
                o.C3_526655608924="Y";
                var json = mini.encode([o]);
                adbs.dbSavedata(aappConfig.internationalfilght.guojiResid,0,json,dataSaved,fnerror,fnhttperror);
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
                o.C3_526655868769="Y";
                var json = mini.encode([o]);
                adbs.dbSavedata(aappConfig.internationalfilght.guojiResid,0,json,dataSaved,fnerror,fnhttperror);
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
                parent.location.reload();
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
                    mini.parse();
                }
            };
        };
        var si=`<tr height="40px" align="center">
                  <td width="15%" class="title1">员工号</td>
                  <td width="15%">`+o[0].C3_526655169418+`</td>
                  <td width="15%" class="title1">姓名</td>
                  <td width="15%">`+o[0].C3_526655177113+`</td>
                  <td width="15%" class="title1">身份证号</td><td width="25%">`+o[0].C3_526655197108+`</td>
                </tr>
                <tr height="40px" align="center">
                  <td class="title1">护照号</td>
                  <td>`+o[0].C3_526655213359+`</td>
                  <td class="title1">护照有效期</td>
                  <td>`+o[0].C3_527948550902+`</td>
                  <td colspan="2"></td>
                </tr>`
                $("#si").html(si);
             
        for(var i=0;i<o.length;i++){
            this.bill(o,i);
                $("#tbManage tbody").append(list);
            this.jState(o,i);
        };
        
        mini.parse();
    }
}