var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
baseUrl = "http://www.realsun.me:8003/rispweb/risphost/data/AjaxService.aspx?uiver=200&dynlogin=1";
getMethod = "ShowHostTableDatas_Ajax";
saveMethod = "SaveData_Ajax";
var baseObjectM = (function () {
    function baseObjectM() {
    }
    return baseObjectM;
}());
var LineSupervisor = (function (_super) {
    __extends(LineSupervisor, _super);
    function LineSupervisor() {
        _super.apply(this, arguments);
    }
    return LineSupervisor;
}(baseObjectM));
var Manage = (function (_super) {
    __extends(Manage, _super);
    function Manage() {
        _super.apply(this, arguments);
    }
    return Manage;
}(baseObjectM));
var Shiftrptofmanage = (function () {
    function Shiftrptofmanage(element) {
        this.element = element;
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toLocaleTimeString();
    }
    Shiftrptofmanage.prototype.start = function () {
        var _this = this;
        var jsonString = '{"messge": "ok","error":"-1"}';
        this.timerToken = setInterval(function () { return _this.span.innerHTML = new Date().toLocaleTimeString(); }, 500);
    };
    Shiftrptofmanage.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    Shiftrptofmanage.prototype.appendLineSupervisor = function (parentelement, panelid, data, mini, dbs) {
        var aLineSupervisor = new LineSupervisor();
        aLineSupervisor = data[0];
        this.mini_control = document.createElement('div');
        this.mini_control.id = panelid;
        if (data[0].C3_526393560160 == "Y") {
            this.mini_control.className = "mini-panel mini-panel-danger";
        }
        else {
            this.mini_control.className = "mini-panel mini-panel-success";
        }
        this.mini_control.title = data[0].C3_525697777450 + "排班" + data[0].C3_525716459309 + "人，" + "排班" + data[0].C3_526577949788 + "小时";
        parentelement.appendChild(this.mini_control);
        mini.parse();
        var aPanel = mini.get(panelid);
        aPanel.set({ "width": "auto", "buttons": "collapse ", "expanded": false, "onbuttonclick": "onbuttonclick" });
        aPanel.set({ "height": "auto" });
        aPanel.load("./dist/component/shiftofmanage-weekform.html", function () {
            var iFrame = aPanel.getIFrameEl();
            var ucode = getQueryString('ucode');
            var user = getQueryString('user');
            iFrame.contentWindow.SetData(data, dbs);
        }, null);
    };
    Shiftrptofmanage.prototype.appendManage = function (parentelement, data, subdata, mini, dbs) {
        var aManage = new Manage();
        aManage = data[0];
        this.mini_control = document.createElement('div');
        this.mini_control.id = "manage";
        if (data[0].C3_526393969049 == "Y") {
            this.mini_control.className = "mini-panel mini-panel-danger";
        }
        else {
            this.mini_control.className = "mini-panel mini-panel-success";
        }
        var yearmonth = aManage.C3_525699725531;
        var dates = (aManage.C3_525699725313);
        var startDate = new Date(dates.substr(0, 4) + '-' + dates.substr(4, 2) + '-' + dates.substr(6, 2));
        var title = dates + "日产线排班整体情况";
        this.mini_control.title = title;
        parentelement.appendChild(this.mini_control);
        mini.parse();
        var aManagePanel = mini.get("manage");
        aManagePanel.set({ "width": "auto", "showCollapseButton": "true" });
        aManagePanel.set({ "height": "400px" });
        aManagePanel.load("./dist/component/shiftmanage.html", function () {
            var iFrame = aManagePanel.getIFrameEl();
            var ucode = getQueryString('ucode');
            var user = getQueryString('user');
            iFrame.contentWindow.SetData(data, dbs);
        }, null);
    };
    return Shiftrptofmanage;
}());
window.onload = function () {
    var el = document.getElementById('content');
    var datagrids = document.getElementById('datagrids');
    var shiftPanel = new Shiftrptofmanage(el);
    var ucode = getQueryString('ucode');
    var user = getQueryString('user');
    var dbs = new dbHelper(baseUrl, user, ucode);
    var resid = 526417296293;
    var subresid = 525697747154;
    var cmswhere = "C3_525699724860=392";
    shiftPanel.start();
    var url;
    mini.parse();
    dbs.dbGetdata(resid, subresid, cmswhere, dataGot, fnerror, fnhttperror);
    function dataGot(data, subdata) {
        shiftPanel.appendManage(datagrids, data, subdata, mini, dbs);
        $.each(subdata, function (i, item) {
            var row = [];
            row.push(item);
            shiftPanel.appendLineSupervisor(datagrids, "dynamicgrid" + i.toString(), row, mini, dbs);
        });
    }
    function fnerror(data) {
        alert(data.message);
    }
    function fnhttperror(jqXHR, textStatus, errorThrown) { alert(jqXHR.responseText); }
};
