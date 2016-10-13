declare var mini: any;

declare  var baseUrl;
declare var getMethod;

declare var saveMethod;

class baseObjectM3{
    REC_ID:string;
}
class Manage3 extends baseObjectM3{

}
class internationalmanage extends miniPanel {
      
    constructor(element: HTMLElement) {
        super(element);
    }

    appendManage(parentelement: HTMLElement,data :any,subdata:any,mini:any,dbs:any)
    {
       var aManage=new Manage3();
       var panelid="manager";
       var className="mini-panel mini-panel-primary";
     
       aManage=data[0];
 
       var title="国际机票预定情况";

        super.appendPanel(parentelement,panelid,mini,className,title,appConfig.internationalmanage.mainHtml,
           function(iFrame){
                iFrame.contentWindow.KingofAttendances.i_manage.setData(data,dbs,appConfig);
            },true,"");
    }
}

function main3(){
    // alert(21);
    $.getJSON("./dist/app.config.json",function(data,textStatus,hr){
         appConfig=data;
         appConfig.appfunction=appfunctions;
         submain3();});
}
function submain3() {
   
   
    baseUrl=appConfig.app.baseUrl;
    getMethod=appConfig.app.getMethod;
    saveMethod=appConfig.app.saveMethod;
    var ucode = getQueryString('ucode');
    var user  = getQueryString('user');
    var dbs=new dbHelper(baseUrl,user,ucode);
    var el = document.getElementById('content');
    var datagrids = document.getElementById('datagrids');
    var shiftPanel = new internationalmanage(el);
  
    
    var resid=appConfig.internationalmanage.guojiResid;
    var cmswhere="";
    if (appConfig.app.debug)
    shiftPanel.start();
    var url ;
    mini.parse();
    dbs.dbGetdata(resid,"",cmswhere,dataGot,fnerror,fnhttperror);
    function dataGot(data,subdata)
    {
       // console.log(data);
       shiftPanel.appendManage(datagrids,data,subdata,mini,dbs);
               
    }
    function fnerror(data){   
       //
        alert(data);

    }
    function fnhttperror(jqXHR, textStatus, errorThrown){
       //alert(2);
      // console.log(jqXHR);
      //  alert(jqXHR.responseText);
    }

};