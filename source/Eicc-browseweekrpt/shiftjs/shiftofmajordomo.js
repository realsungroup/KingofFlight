var KingofAttendances = KingofAttendances || {};
KingofAttendances.ShiftMajordomo=new function() {
    var shiftMajordomo = this;
    shiftMajordomo.setData=function(data){
       var o = data[0];
          
           
            $("#spMajordomo").html(data[0].C3_526389708747);
            $("#spCount").html(data[0].C3_526389709403);
            $("#spHour").html(data[0].C3_526578899253);
            $("#spDate").html(data[0].C3_526389708966+"~"+data[0].C3_526580475483);
           
            $("#spMonth").html(data[0].C3_526389709184);
            new mini.Form("form1").setData(o);
          
    }
  shiftMajordomo.setData2=function(data,url){
     
            $("#spHour").html(data[0].C3_526578576195);
			 $("#spCount").html(data[0].C3_525716987383);
            $("#spDate").html(data[0].C3_525699725313+"~"+data[0].C3_526580294945);
            $("#spMonth").html(data[0].C3_525699725531);
            $("#spSupervisor").html(data[0].C3_525699725094);
          
             var o = data[0];
           
            
			  if (data[0].C3_526393969049=="Y")
            {
             
      $("#isIllegal").html("超标");
        var list="<tr>"+
  "<td class='title' >"+
     " <span>超标原因类型：</span></td>"+
 "<td><input  name='C3_526417619516' class='mini-textarea' allowInput='false' /></span></td>"+
  "<td><span lang='EN-US' style='color:#0070C0' </span>"+
 "</td></tr><tr>"+
 " <td class='title'><span>超标原因描述：</span>"+
  "</td></td><td width='415' colspan='2'  >"+
  "<input  name='C3_526417619250' class='mini-textarea' allowInput='false' /></td><td   >"+
  "<p ><span ><a class='mini-button' id='asp' onclick='KingofAttendances.ShiftMajordomo.saveData2' >超标审批</a>  </span></p></td></tr>";
               
          $("#tbsupervisor tbody").append(list);
     

            }
            else 
            {
                 $("#isIllegal").html("正常");
             
            }
              if (data[0].C3_526417619032=="Y")
           {
            
             mini.parse();
              mini.get("asp").set({"text":"已审批"});
               mini.get("asp").enabled=false;
           }
            mini.parse();
             new mini.Form("form1").setData(o);
            return;
}

 shiftMajordomo. saveData2=function() {
      var url=$("#hfurl").val();
     
            var o = new mini.Form("form1").getData();            
             o._id=1;
             o._state="modified";
             o.C3_526417619032="Y";
            var json = mini.encode([o]);
            $.ajax({
                url:  url,
                async:false,
                dataType:"jsonp",
                jsonp: "jsoncallback",
		        type: 'post',
                data: { data: json,resid:525699610587},
                cache: false,
                success: function (text) {
                   
                     if (text.error=="0")
              {
                  alert("审批成功");
                   mini.get("asp").set({"text":"已审批"});
               mini.get("asp").enabled=false;
            }
                else    
                {
               alert("审批失败");
                }  
                 
               
                },
                error: function (jqXHR, textStatus, errorThrown) {
                  
                    alert(jqXHR.responseText);
                    
                }
            });
        }
}
