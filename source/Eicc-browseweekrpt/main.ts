/// <reference path="../interfaces/jquery.d.ts" />
import * as $ from "jquery";
declare var mini: any;
 

class Greeters {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;
    mini_grid: HTMLElement;
    
    constructor(element: HTMLElement) {
        this.element = element;
        this.element.innerHTML += "The time is new1222: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }

    start() {
        this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
    }

    stop() {
        clearTimeout(this.timerToken);
    }
    appendGrid(parentelement: HTMLElement, gridid: string, columns: any,row, mini:any) {
       
        this.mini_grid = document.createElement('div');
        this.mini_grid.className = "mini-datagrid";
        this.mini_grid.id = gridid;
        parentelement.appendChild(this.mini_grid);
        mini.parse();
        var grid = mini.get(gridid);
        grid.setColumns(columns);
        
        //grid.setData(row);
         
        grid.set({"showPager":false,"data":row,"idField":"REC_ID"});
    }
    

}

window.onload = () => {
    var el = document.getElementById('content');
    var datagrids = document.getElementById('datagrids');
    var greeter = new Greeters(el);
    greeter.start();
  //  greeter.appendGrid(el,"tesgrid1");
    var url = 'http:9//www.realsun.me:8003/rispweb/rispservice/apiSvrLogin.aspx?user=demo1&upass=123456&clienttype=mobile&apitoken=KingOfDinner123456789';
    url = "http://www.realsun.me:8003/rispweb/risphost/data/AjaxService.aspx?method=ShowHostTableDatas_Ajax&uiver=200&resid=491762412839&dynlogin=1&user=demo1&ucode=bTqoF2CcMCj7uIOBllZtDw==";
    mini.parse();
    var columns = [{ "field": "REC_ID", "header": "recid1" }, { "field": "fName", "header": "fName" }, { "field": "fDescription", "header": "fDescription" }];
     
    $.ajax({
        url: url,
        success: function (text) {
            if (text !== "") {
                var data = mini.decode(text);
               // alert(text);
                if (data.error == -1) {
                    alert(data.message);

                }
               // var grid = mini.get("grid1");
                //var tesgrid1 = mini.get("tesgrid1");
                var adata = [];
               
                adata = data.data;
               // tesgrid1.setColumns(columns);
                //tesgrid1.setData(adata);
               // grid.setData(adata);
                $.each(adata, function (i, item) {
                    var row=[];
                    row.push(item);
                    greeter.appendGrid(datagrids, "dynamicgrid" + i.toString(), columns,row, mini);
                });

            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
        }
    });
};