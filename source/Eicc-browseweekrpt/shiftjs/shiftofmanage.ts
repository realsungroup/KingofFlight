var KingofAttendances = KingofAttendances || {};
KingofAttendances.ShiftManage=new function() {
    var shiftManage = this;
      var dbs;
    shiftManage.setData=function(data,adbs){
       var o = data[0];
           dbs=adbs;
           
            $("#spCount").html(data[0].C3_525716987383);
            $("#spHour").html(data[0].C3_526578576195);
            $("#spDate").html(data[0].C3_525699725313+"~"+data[0].C3_526580294945);
            //$("#spMajordomo").html(data[0].C3_525699845153);
            $("#spMonth").html(data[0].C3_525699725531);
            $("#spManage").html(data[0].C3_525699725094);
          
             function fnSuccess(data,subdata){ mini.parse();mini.get("cbReasons").set({"data":data});}      
           
            if (data[0].C3_526393969049=="Y")
            {
             
        $("#isIllegal").html("超标");
    
    var list="<tr>"+
  "<td class='title'>"+
     "<span>超标原因类型：</span></td>"+
 "<td colspan=2><input class='mini-combobox' style='width:100%;' name='C3_526417619516' id='cbReasons' textField='C3_526765634258' valueField='C3_526765634258' showNullItem='true' allowInput='true'/></td>"+
  "<td><span lang='EN-US' style='color:#0070C0' </span>"+
 "</td></tr><tr>"+
 " <td class='title'><span>超标原因描述：</span>"+
  "</td></td><td colspan=2>"+
  "<input  name='C3_526417619250' class='mini-textarea'  />"+
  "</td><td  >"+
  "<a class='mini-button' id='asave' onclick='KingofAttendances.ShiftManage.saveData' >超标申请</a>  </td></tr>";

        
          $("#tbManage tbody").append(list);
          
        var resid=526765618499;
        var subresid="";
        var cmswhere=""
      
         dbs.dbGetdata(resid,0,cmswhere,fnSuccess,null,null);
      
   
            }
            else 
            {
                 $("#isIllegal").html("正常");
             
            }
              if (data[0].C3_526417619765=="Y")
           {
             mini.parse();
            mini.get("asave").set({"text":"已申请"});
               mini.get("asave").enabled=false;
           }
            
             new mini.Form("form1").setData(o);
            return;
    }
  shiftManage.saveData=function(){
      
     
         var o =  new mini.Form("form1").getData(); 
             o.C3_526417619765="Y";  
             o._id=1;
             o._state="modified";
            var json = mini.encode([o]);
             dbs.dbSavedata(525699610587,0,json,dataSaved,fnerror,fnhttperror);
              function dataSaved(text)
            {
                alert("申请成功");
                mini.get("asave").set({"text":"已申请"});
                mini.get("asave").enabled=false;
            }
         function fnerror(text){
                alert("申请失败");

         }
         function fnhttperror(jqXHR, textStatus, errorThrown){
             alert("error");

         }
            
  }
  shiftManage.setData2=function(data,bdbs){
    dbs=bdbs;
     
            $("#spHour").html(data[0].C3_526577949788);
			 $("#spCount").html(data[0].C3_525716459309);
            $("#spDate").html(data[0].C3_525698252634+"~"+data[0].C3_526580236305);
            $("#spMonth").html(data[0].C3_525698252852);
            $("#spSupervisor").html(data[0].C3_525697777450);
          
             var o = data[0];
           
            
			  if (data[0].C3_526393560160=="Y")
            {
             
      $("#isIllegal").html("超标");
               var list="<tr>"+
  "<td class='title' >"+
     " <span>超标原因类型：</span></td>"+
 "<td><input  name='C3_526393593762' class='mini-textarea' allowInput='false' /></span></td>"+
  "<td><span ><span lang='EN-US' style='color:#0070C0' </span>"+
 "</td></tr><tr>"+
 " <td class='title'><span>超标原因描述：</span>"+
  "</td></td><td  colspan='2' "+
  "<input  name='C3_526416460460' class='mini-textarea' allowInput='false' /></td><td  >"+
  "<a class='mini-button' id='asp' onclick='KingofAttendances.ShiftManage.saveData2' >超标审批</a>  </td></tr>";

        var a=list;
          $("#tbsupervisor tbody").append(list);
    
            }
            else 
            {
                 $("#isIllegal").html("正常");
             
            }
              if (data[0].C3_526416147534=="Y")
           {
            mini.parse();
            mini.get("asp").set({"text":"已审批"});
             mini.get("asp").enabled=false;
           }
              mini.parse();
             new mini.Form("form1").setData(o);
            return;
}

 shiftManage. saveData2=function() {
        var url=$("#hfurl").val();
     
            var o = new mini.Form("form1").getData();            
             o._id=1;
             o._state="modified";
             o.C3_526416147534="Y";
            var json = mini.encode([o]);
                 dbs.dbSavedata(525697747154,0,json,dataSaved,fnerror,fnhttperror);
              function dataSaved(text)
            {
                 alert("审批成功");
                   mini.get("asp").set({"text":"已审批"});
               mini.get("asp").enabled=false;
            }
         function fnerror(text){
                    alert("审批失败");

         }
         function fnhttperror(jqXHR, textStatus, errorThrown){
             alert("error");

         }
          
        }

}