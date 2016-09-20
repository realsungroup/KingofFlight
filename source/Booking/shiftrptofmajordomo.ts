declare var mini: any;

declare  var baseUrl;

declare var getMethod;

declare var saveMethod;

class baseObjectC{
    REC_ID:string;
}
class LineManage extends baseObjectC{


}
class Majordomo extends baseObjectC{

 
}
class ShiftrptofMajordomo extends miniPanel {

    constructor(element: HTMLElement) {
         super(element);
    }

    
    
    appendLineManage(parentelement: HTMLElement,panelid :string ,data :any,mini:any,dbs:any){
        var aLineManage=new LineManage();
         var className="";
        var dates:string="";
        var title;
        aLineManage=data[0]
        
          if(data[0].C3_526393969049=="Y"){
        
          
            className="mini-panel mini-panel-danger";
      }
      else{
    
            className="mini-panel mini-panel-success";
      }
        title=data[0].C3_525699725094+"排班"+data[0].C3_525716987383+"人 "+" 排班"+data[0].C3_526578576195+"小时";
        data[0].C3_525717403432=(data[0].C3_525717403432*100);
        data[0].C3_525717403651=(data[0].C3_525717403651*100);
       data[0].C3_525717403838=(data[0].C3_525717403838*100);
       data[0].C3_525717404025=(data[0].C3_525717404025*100);
       super.appendPanel(parentelement,panelid,mini,className,title,appConfig.shifrpttofdirector.subHtml,
           function(iFrame){
                iFrame.contentWindow.KingofAttendances.ShiftMajordomo.setData2(data,dbs,appConfig);

            }
              ,false,"icon-user");
    }
    
    appendMajordomo(parentelement: HTMLElement,data :any,subdata:any,mini:any,dbs:any)
    {
       var aMajordomo=new Majordomo();
       var panelid="director";
       var className="";
       var title;
       aMajordomo=data[0]
    
       className="mini-panel mini-panel-success";
       var yearmonth=data[0].C3_526389709184;
       var dates:string =(data[0].C3_526389708966)
       var startDate=new Date(dates.substr(0,4)+'-'+ dates.substr(4,2)+'-'+ dates.substr(6,2));
       title=dates+"日产线排班整体情况";
        data[0].C3_526389712164=(data[0].C3_526389712164*100);
        data[0].C3_526389711477=(data[0].C3_526389711477*100);
        data[0].C3_526389711696=(data[0].C3_526389711696*100);
       data[0].C3_526389711930=(data[0].C3_526389711930*100);
       super.appendPanel(parentelement,panelid,mini,className,title,appConfig.shifrpttofdirector.mainHtml,
           function(iFrame){
               iFrame.contentWindow.KingofAttendances.ShiftMajordomo.setData(data,dbs,appConfig);

            }
              ,true,"");
        
    }
}

function main() {
    baseUrl=appConfig.app.baseUrl;
    getMethod=appConfig.app.getMethod;
    saveMethod=appConfig.app.saveMethod;
    var el = document.getElementById('content');
    var datagrids = document.getElementById('datagrids');
    var shiftPanel = new ShiftrptofMajordomo(el);
    var ucode = getQueryString('ucode');
    var user  = getQueryString('user');
    var dbs=new dbHelper(baseUrl,user,ucode);
    var resid=appConfig.shifrpttofdirector.resid;
    var subresid=appConfig.shifrpttofdirector.subresid;;
    var cmswhere="";
     if (appConfig.app.debug)
    {cmswhere="C3_526389708467=27647";}
    shiftPanel.start();
    var url ;
    mini.parse();
    dbs.dbGetdata(resid,subresid,cmswhere,dataGot,fnerror,fnhttperror);
    function dataGot(data,subdata)
    {
        shiftPanel.appendMajordomo(datagrids,data,subdata,mini,dbs);
                $.each(subdata, function (i, item) {
                    var row=[];
                    row.push(item);
                    shiftPanel.appendLineManage(datagrids,"dynamicgrid" + i.toString(),row,mini,dbs);
                });
    }
    function fnerror(data){   alert(data.message);

    }
    function fnhttperror(jqXHR, textStatus, errorThrown){alert(jqXHR.responseText);}

};