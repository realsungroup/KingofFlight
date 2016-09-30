var KingofAttendances = KingofAttendances || {};
KingofAttendances.i_manage=new function() {
    this.setData=function(data,adbs,aappConfig){
        var me=this;
        var list;
        var o = data;
        this.big=function(id,i){
            $(id).removeClass("oImg").addClass('oImg1');
            $(id).parent().removeClass("oh");
	    }
        this.small=function(id,i){
            $(id).removeClass("oImg1").addClass('oImg');
            $(id).parent().addClass("oh");
	    }        
        this.jState=function(o,i){//判断单据状态改变按钮
            if(o[i].C3_527946742678=="未提交"){
                $("#tds_"+i).addClass('wtj');
            }else if(o[i].C3_527946742678=="已提交"){
                $("#tds_"+i).addClass('ytj');
            }else if(o[i].C3_527946742678=="待确认出票"){
                $("#a_"+i).text("确认").attr('onclick','');
                $("#tds_"+i).addClass('dqr');
            }else if(o[i].C3_527946742678=="待行政确认出票"){
                $("#a_"+i).text("确认出票").attr('onclick','KingofAttendances.i_manage.conClick('+o[i].REC_ID+')');
                $("#tds_"+i).addClass('dsh');
            }else if(o[i].C3_527946742678=="订单完成"){
                $("#td_"+i).remove();
                $("#tds_"+i).addClass('none');
            }
        };
        this.bill=function(o,i){//动态加载单据信息
            list=`<tr height="30px">
                      <td class="head" width="10%" colspan="2">出差单据号</td>
                      <td colspan="4">`+o[i].C3_526655624603+`</td>
                      <td class="head1" align="center" width="10%">单据状态</td>
                      <td align="center" width="15%" id="tds_`+i+`">`+o[i].C3_527946742678+`</td>
                      <td rowspan="6" width="5%" align="center" id="td_`+i+`">
                          <a class="mini-button" id="a_`+i+`" style="width:80px;height:30px;line-height:30px;" onclick="KingofAttendances.i_manage.i_meditClick(`+o[i].REC_ID+`)">航班信息</a>
                          <a class="mini-button" style="width:80px;height:30px;line-height:30px;" iconCls="icon-upgrade" onclick="KingofAttendances.i_manage.rebutClick(`+o[i].REC_ID+`)">驳回</a>
                          <a class="mini-button" style="width:80px;height:30px;line-height:30px;" iconCls="icon-remove" onclick="KingofAttendances.i_manage.revokeClick(`+o[i].REC_ID+`)">撤销</a>
                      </td>
                  </tr>
                  <tr height="40px" align="center">
                      <td class="title1">姓名</td>
                      <td>`+o[i].C3_526655177113+`</td>
                      <td class="title1">护照号</td>
                      <td>`+o[i].C3_526655213359+`</td>
                      <td class="title1">护照有效期</td>
                      <td>`+o[i].C3_527948550902+`</td>
                      <td class="title1">身份证号</td>
                      <td>`+o[i].C3_526655197108+`</td>
                  </tr>
                  <tr class="tc">
                      <td width="10%" class="title" rowspan="2">出发日期</td>
                      <td width="10%" rowspan="2">`+o[i].C3_527948208338+`</td>
                      <td width="10%" class="title" rowspan="2">出发地</td>
                      <td width="10%" rowspan="2">`+o[i].C3_526655262089+`</td>
                      <td rowspan="3" class="ImgBox oh">
                          <img src="`+o[i].C3_527873192635+`" class="oImg" onmouseover="KingofAttendances.i_manage.big(i1_`+i+`,`+i+`)" onmouseout="KingofAttendances.i_manage.small(i1_`+i+`,`+i+`)" id="i1_`+i+`"/>
                      </td>
                      <td rowspan="3" class="ImgBox oh">
                          <img src="`+o[i].C3_526655353950+`" class="oImg" onmouseover="KingofAttendances.i_manage.big(i2_`+i+`,`+i+`)" onmouseout="KingofAttendances.i_manage.small(i2_`+i+`,`+i+`)" id="i2_`+i+`"/>
                      </td>
                      <td align="center">往程航班号</td>
                      <td>`+o[i].C3_526655793514+`</td>
                  </tr>
                  <tr class="tc">
                      <td>航班时间</td>
                      <td>`+o[i].C3_528400651698+`</td>
                      </tr>
                      <tr class="tc">
                      <td class="title" rowspan="2">返回日期</td>
                      <td rowspan="2">`+o[i].C3_527948869929+`</td>
                      <td class="title" rowspan="2">返回地</td>
                      <td rowspan="2">`+o[i].C3_526655271756+`</td>
                      <td align="center"">返程航班号</td>
                      <td>`+o[i].C3_528311923010+`</td>
                  </tr>
                  <tr class="tc">
                      <td>护照扫描件</td>
                      <td>签证扫描件</td>
                      <td>航班时间</td>
                      <td>`+o[i].C3_528400600428+`</td>
                  </tr>`;
        }
        this.i_meditClick=function(REC_ID){//编辑航班单据
          var win = mini.open({
                
                url: '../dist/component/i_medit.html',
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
                console.log(REC_ID);
                o.C3_526655932836="Y";
                var json = mini.encode([o]);
                adbs.dbSavedata(aappConfig.internationalfilght.guojiResid,0,json,dataSaved,fnerror,fnhttperror);
                function dataSaved(text){
                    alert("申请成功");
                }
                function fnerror(text){
                    alert("申请失败");
                    console.log(text);
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
                adbs.dbSavedata(aappConfig.internationalmanage.guojiResid,0,json,dataSaved,fnerror,fnhttperror);
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
                console.log(REC_ID);
                o.C3_526655608924="";
                var json = mini.encode([o]);
                adbs.dbSavedata(aappConfig.internationalmanage.guojiResid,0,json,dataSaved,fnerror,fnhttperror);
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
                if(o[i].C3_527946742678==state){
                    me.bill(o,i);
                    $("#tbManage tbody").append(list);
                    me.jState(o,i);
                }
            };
        };
        for(var i=0;i<o.length;i++){
            if(o[i].C3_527946742678=="已提交"){
                this.bill(o,i);
                $("#tbManage tbody").append(list);
                this.jState(o,i);
                $("#tds_"+i).addClass('ytj');
            }
        };
    }
}