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
                $("#tds_"+i).addClass('ytj');
            }else if(o[i].C3_528049541154=="待确认出票"){
                $("#a_"+i).text("确认").attr('onclick','KingofAttendances.domestic.conClick('+o[i].REC_ID+')');
                $("#tds_"+i).addClass('dqr');
            }else if(o[i].C3_528049541154=="待行政确认出票"){
                $("#a_"+i).text("已确认").attr('onclick','');
                $("#tds_"+i).addClass('dsh');
            }else if(o[i].C3_528049541154=="订单完成"){
                $("#tdb_"+i).remove();
                $("#tds_"+i).addClass('none');
            }
        };
        this.bill=function(o,i){//动态加载单据信息
            list=`<tr height="30px">
                    <td colspan="2" class="head" width="15%">出差单据号</td>
                    <td colspan="2">`+o[i].C3_526656513019+`</td>
                    <td class="title1">单据状态</td>
                    <td align="center" id="tds_`+i+`">`+o[i].C3_528049541154+`</td>
                    <td rowspan="3" width="5" align="center" id="tdb_`+i+`">
                        <a class="mini-button m_btn" id="a_`+i+`" iconCls="icon-upload" onclick="KingofAttendances.domestic.submitClick(`+o[i].REC_ID+`)">提交</a>
                        <a class="mini-button m_btn" iconCls="icon-edit" onclick="KingofAttendances.domestic.editClick(`+o[i].REC_ID+`)">编辑</a>
                        <a class="mini-button m_btn" iconCls="icon-remove" onclick="KingofAttendances.domestic.revokeClick(`+o[i].REC_ID+`)">撤销</a>
                    </td>
                  </tr>
                  <tr align="center">
                    <td class="title1">出发地</td>
                    <td>`+o[i].C3_526656511963+`</td>
                    <td class="title1">出发日期</td>
                    <td>`+o[i].C3_528048113321+`</td>
                    <td class="title1">航班号</td>
                    <td>`+o[i].C3_526656513426+`</td>
                  </tr>
                  <tr align="center">
                    <td class="title1">目的地</td>
                    <td>`+o[i].C3_526656512229+`</td>
                    <td class="title1">行程类别</td>
                    <td>`+o[i].C3_526656512808+`</td>
                    <td class="title1">航班时间</td>
                    <td>`+o[i].C3_529016446872+`</td>
                  </tr>`
        }
        this.addClick=function(){
            var win = mini.open({
                url: 'http://wux-hr03:8009//dist/component/dsetdata.html',
                showModal: false,
                width: 400,
                height: 450,
                onload: function () {       //弹出页面加载完成
                    var iframe = this.getIFrameEl();
                    iframe.contentWindow.Setdbs(adbs,aappConfig);
                },
                ondestroy: function (action) {
                   parent.location.reload();
                }
            });
        };
        this.editClick=function(REC_ID){
            var win = mini.open({
                url: 'http://wux-hr03:8009//dist/component/deditdata.html',
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
                    alert("设置成功");
                }
                function fnerror(text){
                    alert("设置失败");
                }
                function fnhttperror(jqXHR, textStatus, errorThrown){
                    alert("error");
                }
                parent.location.reload();
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
                parent.location.reload();
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
        var si=`<tr height="40px" align="center">
                    <td width="15%" class="title">员工号</td>
                    <td width="15%">`+o[0].C3_526656511106+`</td>
                    <td width="15%" class="title">姓名</td>
                    <td width="15%">`+o[0].C3_526656510920+`</td>
                    <td width="15%" class="title">身份证号</td><td width="25%">`+o[0].C3_526656510713+`</td>
                </tr>`
        $("#si").html(si);
        for(var i=0;i<o.length;i++){
            this.bill(o,i);
            $("#tbManage tbody").append(list);
            mini.parse();
            this.jState(o,i);
        };
    };
}