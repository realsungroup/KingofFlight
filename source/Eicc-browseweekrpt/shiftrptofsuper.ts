
declare var mini: any,getQueryString:any;
declare  var baseUrl:string;
baseUrl="http://www.realsun.me:8003/rispweb/risphost/data/AjaxService.aspx?uiver=200&dynlogin=1";
declare var getMethod;
getMethod="ShowHostTableDatas_Ajax";
declare var saveMethod;
saveMethod="SaveData_Ajax";
class baseObject{
    REC_ID:string;
}
class Lineleader extends baseObject{


}
class Supervisor extends baseObject{

 
}
class Shiftrptofsuper {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;
    mini_grid: HTMLElement;
    mini_control:HTMLElement;
    constructor(element: HTMLElement) {
        this.element = element;
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toLocaleTimeString();
    }

    start() {
         var jsonString :string  = '{"messge": "ok","error":"-1"}';
        this.timerToken = setInterval(() => this.span.innerHTML = new Date().toLocaleTimeString(), 500);
    }

    stop() {
        clearTimeout(this.timerToken);
    }
    
    appendLineleader(parentelement: HTMLElement,panelid :string ,data :any,mini:any,dbs:any){
        var aLineleader=new Lineleader();
        aLineleader=data[0]
        this.mini_control=document.createElement('div');
        this.mini_control.id = panelid;
      if(data[0].C3_526410163545=="Y"){
          
            this.mini_control.className="mini-panel mini-panel-danger";

      }
      else{
     this.mini_control.className="mini-panel mini-panel-success";
      }
      
        this.mini_control.title=data[0].C3_525642615889+data[0].C3_525715020942+"排班"+data[0].C3_525715678864+"人，"+"排班"+data[0].C3_526578100819+"小时";
        parentelement.appendChild(this.mini_control);
        mini.parse();
        var aPanel = mini.get(panelid);
 
        aPanel.set({"width":"auto","iconCls":"icon-date","buttons":"collapse ","expanded":false,"onbuttonclick":"onbuttonclick"});
        aPanel.load("./dist/component/shiftrptofsuper-weekform.html", function () {
            var iFrame = aPanel.getIFrameEl();
            var ucode = getQueryString('ucode');
            var user  = getQueryString('user');
            var url ;
             url=baseUrl+"&method="+saveMethod+"&user="+user+"&ucode="+ucode;
          //  iFrame.contentWindow.SetData(data,url,user,ucode);
           iFrame.contentWindow.SetData(data,dbs);
        },null);
           
    }
    
    appendSupervisor(parentelement: HTMLElement,data :any,subdata:any,mini:any,dbs:any)
    {
       var aSupervisor=new Supervisor();
       aSupervisor=data[0]
       this.mini_control=document.createElement('div');
       this.mini_control.id = "supervisor";
         if(data[0].C3_526393560160=="Y"){
          
            this.mini_control.className="mini-panel mini-panel-danger";

      }
      else{
     this.mini_control.className="mini-panel mini-panel-success";
      }
      
       
       var yearmonth=aSupervisor.C3_525698252852;
       var dates:string =(aSupervisor.C3_525698252634)
        
       
       var startDate=new Date(dates.substr(0,4)+'-'+ dates.substr(4,2)+'-'+ dates.substr(6,2));
       var title=dates+"日产线排班整体情况";
       this.mini_control.title=title;
       parentelement.appendChild(this.mini_control);
       mini.parse();
      
      var aSupervisorPanel = mini.get("supervisor");
       aSupervisorPanel.set({"width":"auto","showCollapseButton":"true"});
        aSupervisorPanel.set({"height":"450px"});
        aSupervisorPanel.load("./dist/component/shiftsupervisor.html", function () {
        var iFrame = aSupervisorPanel.getIFrameEl();
        var ucode = getQueryString('ucode');
        var user  = getQueryString('user');
        var url ;
        url=baseUrl+"&method="+saveMethod+"&user="+user+"&ucode="+ucode;
            
        iFrame.contentWindow.SetData(data,dbs);
        },null);
        
    }
}

window.onload = () => {
    
    
    var el = document.getElementById('content');
    var datagrids = document.getElementById('datagrids');
    var shiftPanel = new Shiftrptofsuper(el);
    
    var ucode = getQueryString('ucode');
    var user  = getQueryString('user');
    var dbs=new dbHelper(baseUrl,user,ucode);
    var resid=526415710928;
    var subresid=525642459751;
    var cmswhere="C3_525697777216=1959"
    shiftPanel.start();
    var url ;
    mini.parse();
    dbs.dbGetdata(resid,subresid,cmswhere,dataGot,fnerror,fnhttperror);
    function dataGot(data,subdata)
    {
        shiftPanel.appendSupervisor(datagrids,data,subdata,mini,dbs);
                $.each(subdata, function (i, item) {
                    var row=[];
                    row.push(item);
                    shiftPanel.appendLineleader(datagrids,"dynamicgrid" + i.toString(),row,mini,dbs);
                });
    }
    function fnerror(data){   alert(data.message);

    }
    function fnhttperror(jqXHR, textStatus, errorThrown){alert(jqXHR.responseText);}
 

};