declare var mini: any,getQueryString:any;
 
class baseObjectM{
    REC_ID:string;
}
class LineSupervisor extends baseObjectM{


}
class Manage extends baseObjectM{

 
}
class Shiftrptofmanage {
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
    
    appendLineSupervisor(parentelement: HTMLElement,panelid :string ,data :any,mini:any){
        var aLineSupervisor=new LineSupervisor();
        aLineSupervisor=data[0]
        this.mini_control=document.createElement('div');
        this.mini_control.id = panelid;
          if(data[0].C3_526393560160=="Y"){
          
            this.mini_control.className="mini-panel mini-panel-danger";

      }
      else{
     this.mini_control.className="mini-panel mini-panel-success";
      }
      
        this.mini_control.title=data[0].C3_525697777450+"排班"+data[0].C3_525716459309+"人，"+"排班"+data[0].C3_526577949788+"小时";
        parentelement.appendChild(this.mini_control);
        mini.parse();
        var aPanel = mini.get(panelid);
        aPanel.set({"width":"auto","showCollapseButton":"true","expanded":false});
         aPanel.set({"height":"auto"});
        aPanel.load("./dist/component/shiftofmanage-weekform.html", function () {
          var iFrame = aPanel.getIFrameEl();
         
          var ucode = getQueryString('ucode');
        var user  = getQueryString('user');
            var url = "http://www.realsun.me:8003/rispweb/risphost/data/AjaxService.aspx?method=SaveData_Ajax&uiver=200&dynlogin=1&user="+user+"&ucode="+ucode+""; 
          iFrame.contentWindow.SetData(data,url);
        },null);
    }
    appendManage(parentelement: HTMLElement,data :any,subdata:any,mini:any)
    {
       var aManage=new Manage();
       aManage=data[0]
       this.mini_control=document.createElement('div');
       this.mini_control.id = "manage";
       if(data[0].C3_526393969049=="Y"){
          
            this.mini_control.className="mini-panel mini-panel-danger";

      }
      else{
     this.mini_control.className="mini-panel mini-panel-success";
      }
      
       var yearmonth=aManage.C3_525699725531;//主表考勤月份
       var dates:string =(aManage.C3_525699725313)//主表开始时间
        
       
       var startDate=new Date(dates.substr(0,4)+'-'+ dates.substr(4,2)+'-'+ dates.substr(6,2));
       var title=dates+"日产线排班整体情况";
       this.mini_control.title=title;
       parentelement.appendChild(this.mini_control);
       mini.parse();
      
      var aManagePanel = mini.get("manage");
       aManagePanel.set({"width":"auto","showCollapseButton":"true"});
       aManagePanel.set({"height":"400px"});
        aManagePanel.load("./dist/component/shiftmanage.html", function () {
        var iFrame = aManagePanel.getIFrameEl();
         var ucode = getQueryString('ucode');
        var user  = getQueryString('user');
      var url = "http://www.realsun.me:8003/rispweb/risphost/data/AjaxService.aspx?method=SaveData_Ajax&uiver=200&dynlogin=1&user="+user+"&ucode="+ucode+""; 
             iFrame.contentWindow.SetData(data,url,user,ucode);
        
        },null);
        
    }
}

window.onload = () => {
    var el = document.getElementById('content');
    var datagrids = document.getElementById('datagrids');
    var shiftPanel = new Shiftrptofmanage(el);
    var baseUrl="http://www.realsun.me:8003/rispweb/risphost/data/AjaxService.aspx?uiver=200&dynlogin=1";
    var method="ShowHostTableDatas_Ajax";
     var ucode = getQueryString('ucode');
    var user  = getQueryString('user');
    var resid=526417296293;//主表id
    var subresid=525697747154;//字表id
    var cmswhere="C3_525699724860=392";//主表数据的编号
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
                shiftPanel.appendManage(datagrids,adata,subdata,mini);
                $.each(subdata, function (i, item) {
                    var row=[];
                    row.push(item);
                    shiftPanel.appendLineSupervisor(datagrids,"dynamicgrid" + i.toString(),row,mini);
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
        }
    });

};