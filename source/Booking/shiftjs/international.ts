var KingofAttendances = KingofAttendances || {};
KingofAttendances.international=new function() {
    this.setData=function(data,adbs,aappConfig){
        var me=this;
        var list;
        var o = data;
        this.jState=function(o,i){//判断单据状态改变按钮
            if(o[i].C3_527946742678=="已提交"){
                $("#a_"+i).text("已提交").attr('onclick','');
            }else if(o[i].C3_527946742678=="待确认出票"){
                $("#a_"+i).text("确认").attr('onclick','KingofAttendances.international.conClick('+o[i].REC_ID+')');
            }else if(o[i].C3_527946742678=="待行政确认出票"){
                $("#a_"+i).text("已确认").attr('onclick','');
            } if(o[i].C3_527946742678=="订单完成"){
                $("#td_"+i).remove();
            }
        };
        this.bill=function(o,i){//动态加载单据信息
            list=`<tr height="30px">
                      <td class="head" width="10%" colspan="2">出差单据号</td>
                      <td colspan="4">`+o[i].C3_526655624603+`</td>
                      <td class="head1" align="center" width="10%">单据状态</td>
                      <td align="center" width="15%">`+o[i].C3_527946742678+`</td>
                      <td rowspan="5" width="5%" align="center" id="td_`+i+`">
                          <a class="mini-button" id="a_`+i+`" style="width:80px;height:30px;" iconCls="icon-upload" onclick="KingofAttendances.international.submitClick(`+o[i].REC_ID+`)">提交</a>
                          <a class="mini-button" style="width:80px;height:30px;" iconCls="icon-edit" onclick="KingofAttendances.international.editClick(`+o[i].REC_ID+`)">编辑</a>
                          <a class="mini-button" style="width:80px;height:30px;" iconCls="icon-remove" onclick="KingofAttendances.international.revokeClick(`+o[i].REC_ID+`)">撤销</a>
                      </td>
                  </tr>
                  <tr class="tc">
                      <td width="10%" class="title" rowspan="2">出发日期</td>
                      <td width="10%" rowspan="2">`+o[i].C3_527948208338+`</td>
                      <td width="10%" class="title" rowspan="2">出发地</td>
                      <td width="10%" rowspan="2">`+o[i].C3_526655262089+`</td>
                      <td rowspan="3" width="15%"><img src="`+o[i].C3_527873192635+`" width="60px" style="max-width:80px;max-height:80px;"/></td>
                      <td rowspan="3" width="15%"><img src="`+o[i].C3_526655353950+`" width="60px" style="max-width:80px;max-height:80px;"/></td>
                      <!--<td rowspan="3" width="30px"><img src="`+o[i].C3_527873192635+`" width="60px"/></td>-->
                      <!--<td rowspan="3" width="30px"><img src="`+o[i].C3_526655353950+`" width="60px"/></td>-->
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
            // list='<tr height="30px"><td class="head" width="10%" colspan="2">出差单据号</td><td colspan="4">'+o[i].C3_526655624603+'</td><td class="head1" align="center" width="10%">单据状态</td><td align="center" width="15%">'+o[i].C3_527946742678+'</td><td rowspan="5" width="5%" align="center" id="td_'+i+'"><a class="mini-button" id="a_'+i+'" style="width:80px;height:30px;" iconCls="icon-upload" onclick="KingofAttendances.international.submitClick('+o[i].REC_ID+')">提交</a><a class="mini-button" style="width:80px;height:30px;" iconCls="icon-edit" onclick="KingofAttendances.international.editClick('+o[i].REC_ID+')">编辑</a><a class="mini-button" style="width:80px;height:30px;" iconCls="icon-remove" onclick="KingofAttendances.international.revokeClick('+o[i].REC_ID+')">撤销</a></td></tr><tr class="tc"><td width="10%" class="title" rowspan="2">出发日期</td><td width="10%" rowspan="2">'+o[i].C3_527948208338+'</td><td width="10%" class="title" rowspan="2">出发地</td><td width="10%" rowspan="2">'+o[i].C3_526655262089+'</td><td rowspan="3" width="15%"><img src="'+o[i].C3_527873192635+'" style="max-width:80px;max-height:80px;"/></td><td rowspan="3" width="15%"><img src="'+o[i].C3_526655353950+'" style="max-width:80px;max-height:80px;"/></td><td align="center">往程航班号</td><td>'+o[i].C3_526655793514+'</td></tr><tr class="tc"><td>航班时间</td><td>'+o[i].C3_528400651698+'</td></tr><tr class="tc"><td class="title" rowspan="2">返回日期</td><td rowspan="2">'+o[i].C3_527948869929+'</td><td class="title" rowspan="2">返回地</td><td rowspan="2">'+o[i].C3_526655271756+'</td><td align="center"">返程航班号</td><td>'+o[i].C3_528311923010+'</td></tr><tr class="tc"><td>护照扫描件</td><td>签证扫描件</td><td>航班时间</td><td>'+o[i].C3_528400600428+'</td></tr>'
        }
        this.addClick=function(){//新增航班单据
          var win = mini.open({
                url: '../dist/component/setdata.html',
                showModal: false,
                width: 600,
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
        this.editClick=function(REC_ID){//编辑航班单据
          var win = mini.open({
                
                url: '../dist/component/editdata.html',
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
                console.log(REC_ID);
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
                console.log(REC_ID);
                o.C3_526655868769="Y";
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
        this.navClick=function(_number,state){//导航
            $("#tbManage tbody").empty()
            for(var i=0;i<o.length;i++){
                if(o[i].C3_527946742678==state){
                    me.bill(o,i);
                    $("#tbManage tbody").append(list);
                    me.jState(o,i);
                }
            };
        	$(".mature-progress").html(list2);
        	var mamture = $('#mamture');
        	var l = 0;
        	var timer = null;
        	var pro = 0;
        	if ( _number < 200 ) {
        		lad(_number, 200, '.progress-box-1',function(){});
        	};
        	if ( _number >= 200 && _number < 400  ) {
        		lad(_number, 200, '.progress-box-1', function(){
        			mamture.addClass('v1');
        			lad(_number-200, 200, '.progress-box-2',function(){
        				$('.progress-box-2').addClass('active');
        			});
        		});
        	};
        	if ( _number >= 400 && _number < 600  ) {
        		lad(200, 200, '.progress-box-1', function(){
        			mamture.addClass('v1')
        			lad(400, 400, '.progress-box-2',function(){
        				mamture.addClass('v2');
        				lad(0, 200, '.progress-box-3',function(){
        					$('.progress-box-3').addClass('active');
        				})
        			});
        		});
        	};
        	if ( _number >= 600 && _number < 800  ) {
        		lad(200, 200, '.progress-box-1', function(){
        			mamture.addClass('v1')
        			lad(400, 400, '.progress-box-2',function(){
        				mamture.addClass('v2')
        				lad(600, 600, '.progress-box-3', function(){
        					mamture.addClass('v3')
        					lad(0, 200, '.progress-box-4',function(){
        						$('.progress-box-4').addClass('active');
        					})
        				})
        			});
        		});
        	};
        	if ( _number >= 800) {
        		lad(200, 200, '.progress-box-1', function(){
        			mamture.addClass('v1')
        			lad(400, 400, '.progress-box-2',function(){
        				mamture.addClass('v2')
        				lad(600, 600, '.progress-box-3', function(){
        					mamture.addClass('v3')
        					lad(800, 800, '.progress-box-4',function(){
        						mamture.addClass('v4')
        					})
        				})
        			});
        		});
        	};
        	function lad(number, max, cls, callback){
        		l = 0;
        		timer = setInterval(function(){
        			if ( number <= 200 ) {
        				l+=2;
        			}else if( number > 200 && number <= 400 ){
        				l+=4;
        			}else if( number > 400 && number <= 600 ){
        				l+=8;
        			}else if( number > 600 && number <= 800 ){
        				l+=16;
        			};
        			pro = (l/max)*100;				//100为  div的长度
        			if ( l >= number ) {
        				clearInterval(timer);
        				if ( callback ) callback();   //回调
        			};
        			$(cls).css({
        				width : pro+'px'
        			})
        		},1)
        	}
        };
        var list2=`<div class="mature-progress-box v0" id="mamture">
        			    <dl onclick="KingofAttendances.international.navClick(0,'未提交')">
        					<dt><a>未提交</a></dt>
        				</dl>
        				<dl onclick="KingofAttendances.international.navClick(200,'已提交')">
        					<dt><a>已提交</a></dt>
        				</dl>
        				<dl onclick="KingofAttendances.international.navClick(400,'待确认出票')">
        					<dt><a>待申请人确认</a></dt>
        				</dl>
        				<dl onclick="KingofAttendances.international.navClick(600,'待行政确认出票')">
        					<dt><a>待行政确认</a></dt>
        				</dl>
        				<dl onclick="KingofAttendances.international.navClick(800,'订单完成')">
        					<dt><a>订单完成</p></dt>
        				</dl>
        				<div class="progress-box">
        					<i class="progress-box-1"></i>
        					<i class="progress-box-2"></i>
        					<i class="progress-box-3"></i>
        					<i class="progress-box-4"></i>
        				</div>
        			</div>
        			<div class="mature-progress-box bgtwos">
                        <dl><dt></dt></dl><dl><dt></dt></dl><dl><dt></dt></dl><dl><dt></dt></dl><dl><dt></dt></dl>
        			</div>`;
        $(".mature-progress").html(list2);
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
    }
}