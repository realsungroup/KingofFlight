declare var mini: any;

declare  var baseUrl;
declare var getMethod;

declare var saveMethod;

class baseObjectM{
    REC_ID:string;
}
class LineSupervisor extends baseObjectM{


}
class Manage extends baseObjectM{

 
}
class Shiftrptofmanage extends miniPanel {
  
    constructor(element: HTMLElement) {
        super(element);
    }

   
    
    appendLineSupervisor(parentelement: HTMLElement,panelid :string ,data :any,mini:any,dbs:any){
        var aLineSupervisor=new LineSupervisor();
        var className="";
        var title="";

        aLineSupervisor=data[0]
    
          if(data[0].C3_526393560160=="Y"){
            className="mini-panel mini-panel-danger";
          

      }
      else{
           className="mini-panel mini-panel-success";
          
      }
      
       
        title=data[0].C3_525697777450+"排班"+data[0].C3_525716459309+"人，"+"排班"+data[0].C3_526577949788+"小时";
        data[0].C3_525718184010=(data[0].C3_525718184010*100);
        data[0].C3_525718184259=(data[0].C3_525718184259*100);
        data[0].C3_525718184478=(data[0].C3_525718184478*100);
        data[0].C3_525718184727=(data[0].C3_525718184727*100);
        
         super.appendPanel(parentelement,panelid,mini,className,title,appConfig.shifrpttofmanager.subHtml,
           function(iFrame){
                iFrame.contentWindow.KingofAttendances.ShiftManage.setData2(data,dbs,appConfig);
                 }
              ,false,"icon-user");
         
    }
    appendManage(parentelement: HTMLElement,data :any,subdata:any,mini:any,dbs:any)
    {
       var aManage=new Manage();
       var panelid="manager";
       var className="";
     
       aManage=data[0]
     
       if(data[0].C3_526393969049=="Y"){
            className="mini-panel mini-panel-danger";
       

      }
      else{
          className="mini-panel mini-panel-success";
    
      }
      
       var yearmonth=data[0].C3_525699725531;//主表考勤月份
       var dates:string =(data[0].C3_525699725313)//主表开始时间
        
       
       var startDate=new Date(dates.substr(0,4)+'-'+ dates.substr(4,2)+'-'+ dates.substr(6,2));
       var title=dates+"日产线排班整体情况";
       data[0].C3_525717403432=(data[0].C3_525717403432*100).toString();
       data[0].C3_525717403651=(data[0].C3_525717403651*100).toString();
       data[0].C3_525717403838=(data[0].C3_525717403838*100).toString();
       data[0].C3_525717404025=(data[0].C3_525717404025*100).toString();
        super.appendPanel(parentelement,panelid,mini,className,title,appConfig.shifrpttofmanager.mainHtml,
           function(iFrame){
               iFrame.contentWindow.KingofAttendances.ShiftManage.setData(data,dbs,appConfig);

            }
              ,true,"");
        
    }
}

function main() {
   
   
    baseUrl=appConfig.app.baseUrl;
    getMethod=appConfig.app.getMethod;
    saveMethod=appConfig.app.saveMethod;
    var ucode = getQueryString('ucode');
    var user  = getQueryString('user');
    var dbs=new dbHelper(baseUrl,user,ucode);
    var el = document.getElementById('content');
    var datagrids = document.getElementById('datagrids');
    var shiftPanel = new Shiftrptofmanage(el);
  
   
    var resid=appConfig.shifrpttofmanager.resid;
    var subresid=appConfig.shifrpttofmanager.subresid;
    var cmswhere;
    if (appConfig.app.debug)
    {cmswhere="C3_525699724860=392";}
    shiftPanel.start();
    var url ;
    mini.parse();
    dbs.dbGetdata(resid,subresid,cmswhere,dataGot,fnerror,fnhttperror);
    function dataGot(data,subdata)
    {
        shiftPanel.appendManage(datagrids,data,subdata,mini,dbs);
                $.each(subdata, function (i, item) {
                    var row=[];
                    row.push(item);
                    shiftPanel.appendLineSupervisor(datagrids,"dynamicgrid" + i.toString(),row,mini,dbs);
                });
    }
    function fnerror(data){   alert(data.message);

    }
    function fnhttperror(jqXHR, textStatus, errorThrown){alert(jqXHR.responseText);}

};