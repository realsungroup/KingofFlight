
declare var mini: any,getQueryString:any;
 
class baseObject{
    REC_ID:string;
}
class Lineleader extends baseObject{


}
class Supervisor extends baseObject{

    C3_525698252852:string;
    C3_525698252634:string;
}
class Shiftrptofsuper {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;
    mini_grid: HTMLElement;
    mini_control:HTMLElement;
    constructor(element: HTMLElement) {
        this.element = element;
       // this.element.innerHTML += "The time is: ";
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
    
    appendLineleader(parentelement: HTMLElement,panelid :string ,data :any,mini:any){
        var aLineleader=new Lineleader();
        aLineleader=data[0]
        this.mini_control=document.createElement('div');
        this.mini_control.id = panelid;
        this.mini_control.className="mini-panel mini-panel-warning";
        this.mini_control.title=aLineleader.REC_ID;
        parentelement.appendChild(this.mini_control);
        mini.parse();
        var aPanel = mini.get(panelid);
        aPanel.set({"width":"auto","showCollapseButton":"true"});
        aPanel.set({"height":"350px"});
        aPanel.load("./dist/component/shiftrptofsuper-weekform.html", function () {
          var iFrame = aPanel.getIFrameEl();
          iFrame.contentWindow.SetData(data);
           
        },null);
    }
    
    appendSupervisor(parentelement: HTMLElement,data :any,subdata:any,mini:any)
    {
       var aSupervisor=new Supervisor();
       aSupervisor=data[0]
       this.mini_control=document.createElement('div');
       this.mini_control.id = "supervisor";
       this.mini_control.className="mini-panel mini-panel-success";
       var yearmonth=aSupervisor.C3_525698252852;
       var dates:string =(aSupervisor.C3_525698252634)
        
       
       var startDate=new Date(dates.substr(0,4)+'-'+ dates.substr(4,2)+'-'+ dates.substr(6,2));
       var title=dates+"日产线排班整体情况";
       this.mini_control.title=title;
       parentelement.appendChild(this.mini_control);
       mini.parse();
      
      var aSupervisorPanel = mini.get("supervisor");
       aSupervisorPanel.set({"width":"auto","showCollapseButton":"true"});
        aSupervisorPanel.set({"height":"250px"});
        aSupervisorPanel.load("./dist/component/shiftsupervisor.html", function () {
        var iFrame = aSupervisorPanel.getIFrameEl();
        iFrame.contentWindow.SetData(data);
        
        },null);
        
    }
}

window.onload = () => {
    var el = document.getElementById('content');
    var datagrids = document.getElementById('datagrids');
    var shiftPanel = new Shiftrptofsuper(el);
    var baseUrl="http://www.realsun.me:8003/rispweb/risphost/data/AjaxService.aspx?uiver=200&dynlogin=1";
    var method="ShowHostTableDatas_Ajax";
     var ucode = getQueryString('ucode');
    var user  = getQueryString('user');
    var resid=526415710928;
    var subresid=525642459751;
    var cmswhere="C3_525697777216=1959"
    shiftPanel.start();
    var url ;
    mini.parse();
    var columns = [{ "field": "REC_ID", "header": "recid1" }, { "field": "fName", "header": "fName" }, { "field": "fDescription", "header": "fDescription" }];
     url=baseUrl+"&method="+method+"&user="+user+"&ucode="+ucode+"&resid="+resid+"&subresid="+subresid+"&cmswhere="+cmswhere;
     $.ajax({
        url: url,
        dataType:"jsonp",
        jsonp: "jsoncallback",
        success: function (text) {
            if (text !== "") {    
                var data = mini.decode(text);
                console.log(data.message);
                if (data.error == -1) {
                    alert(data.message);

                }
                var adata = [];
                var subdata=[];
                adata = data.data;
                if (data.subdata!=null){subdata=data.subdata.data;}
                shiftPanel.appendSupervisor(datagrids,adata,subdata,mini);
                $.each(subdata, function (i, item) {
                    var row=[];
                    row.push(item);
                    shiftPanel.appendLineleader(datagrids,"dynamicgrid" + i.toString(),row,mini);
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
        }
    });

};