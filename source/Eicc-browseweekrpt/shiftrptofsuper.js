var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
baseUrl = "http://www.realsun.me:8003/rispweb/risphost/data/AjaxService.aspx?uiver=200&dynlogin=1";
getMethod = "ShowHostTableDatas_Ajax";
saveMethod = "SaveData_Ajax";
var baseObject = (function () {
    function baseObject() {
    }
    return baseObject;
}());
var Lineleader = (function (_super) {
    __extends(Lineleader, _super);
    function Lineleader() {
        _super.apply(this, arguments);
    }
    return Lineleader;
}(baseObject));
var Supervisor = (function (_super) {
    __extends(Supervisor, _super);
    function Supervisor() {
        _super.apply(this, arguments);
    }
    return Supervisor;
}(baseObject));
var Shiftrptofsuper = (function () {
    function Shiftrptofsuper(element) {
        this.element = element;
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toLocaleTimeString();
    }
    Shiftrptofsuper.prototype.start = function () {
        var _this = this;
        var jsonString = '{"messge": "ok","error":"-1"}';
        this.timerToken = setInterval(function () { return _this.span.innerHTML = new Date().toLocaleTimeString(); }, 500);
    };
    Shiftrptofsuper.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    Shiftrptofsuper.prototype.appendLineleader = function (parentelement, panelid, data, mini, dbs) {
        var aLineleader = new Lineleader();
        aLineleader = data[0];
        this.mini_control = document.createElement('div');
        this.mini_control.id = panelid;
        if (data[0].C3_526410163545 == "Y") {
            this.mini_control.className = "mini-panel mini-panel-danger";
        }
        else {
            this.mini_control.className = "mini-panel mini-panel-success";
        }
        this.mini_control.title = data[0].C3_525642615889 + data[0].C3_525715020942 + "排班" + data[0].C3_525715678864 + "人，" + "排班" + data[0].C3_526578100819 + "小时";
        parentelement.appendChild(this.mini_control);
        mini.parse();
        var aPanel = mini.get(panelid);
        aPanel.set({ "width": "auto", "iconCls": "icon-date", "buttons": "collapse ", "expanded": false, "onbuttonclick": "onbuttonclick" });
        aPanel.load("./dist/component/shiftrptofsuper-weekform.html", function () {
            var iFrame = aPanel.getIFrameEl();
            var ucode = getQueryString('ucode');
            var user = getQueryString('user');
            var url;
            url = baseUrl + "&method=" + saveMethod + "&user=" + user + "&ucode=" + ucode;
            iFrame.contentWindow.SetData(data, dbs);
        }, null);
    };
    Shiftrptofsuper.prototype.appendSupervisor = function (parentelement, data, subdata, mini, dbs) {
        var aSupervisor = new Supervisor();
        aSupervisor = data[0];
        this.mini_control = document.createElement('div');
        this.mini_control.id = "supervisor";
        if (data[0].C3_526393560160 == "Y") {
            this.mini_control.className = "mini-panel mini-panel-danger";
        }
        else {
            this.mini_control.className = "mini-panel mini-panel-success";
        }
        var yearmonth = aSupervisor.C3_525698252852;
        var dates = (aSupervisor.C3_525698252634);
        var startDate = new Date(dates.substr(0, 4) + '-' + dates.substr(4, 2) + '-' + dates.substr(6, 2));
        var title = dates + "日产线排班整体情况";
        this.mini_control.title = title;
        parentelement.appendChild(this.mini_control);
        mini.parse();
        var aSupervisorPanel = mini.get("supervisor");
        aSupervisorPanel.set({ "width": "auto", "showCollapseButton": "true" });
        aSupervisorPanel.set({ "height": "450px" });
        aSupervisorPanel.load("./dist/component/shiftsupervisor.html", function () {
            var iFrame = aSupervisorPanel.getIFrameEl();
            var ucode = getQueryString('ucode');
            var user = getQueryString('user');
            var url;
            url = baseUrl + "&method=" + saveMethod + "&user=" + user + "&ucode=" + ucode;
            iFrame.contentWindow.SetData(data, dbs);
        }, null);
    };
    return Shiftrptofsuper;
}());
window.onload = function () {
    var el = document.getElementById('content');
    var datagrids = document.getElementById('datagrids');
    var shiftPanel = new Shiftrptofsuper(el);
    var ucode = getQueryString('ucode');
    var user = getQueryString('user');
    var dbs = new dbHelper(baseUrl, user, ucode);
    var resid = 526415710928;
    var subresid = 525642459751;
    var cmswhere = "C3_525697777216=1959";
    shiftPanel.start();
    var url;
    mini.parse();
    dbs.dbGetdata(resid, subresid, cmswhere, dataGot, fnerror, fnhttperror);
    function dataGot(data, subdata) {
        shiftPanel.appendSupervisor(datagrids, data, subdata, mini, dbs);
        $.each(subdata, function (i, item) {
            var row = [];
            row.push(item);
            shiftPanel.appendLineleader(datagrids, "dynamicgrid" + i.toString(), row, mini, dbs);
        });
    }
    function fnerror(data) {
        alert(data.message);
    }
    function fnhttperror(jqXHR, textStatus, errorThrown) { alert(jqXHR.responseText); }
};
