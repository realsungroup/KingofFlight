var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var Shiftrptofmanage = (function (_super) {
    __extends(Shiftrptofmanage, _super);
    function Shiftrptofmanage(element) {
        _super.call(this, element);
    }
    Shiftrptofmanage.prototype.appendLineSupervisor = function (parentelement, panelid, data, mini, dbs) {
        var aLineSupervisor = new LineSupervisor();
        var className = "";
        var title = "";
        aLineSupervisor = data[0];
        if (data[0].C3_526393560160 == "Y") {
            className = "mini-panel mini-panel-danger";
        }
        else {
            className = "mini-panel mini-panel-success";
        }
        title = data[0].C3_525697777450 + "排班" + data[0].C3_525716459309 + "人，" + "排班" + data[0].C3_526577949788 + "小时";
        data[0].C3_525718184010 = (data[0].C3_525718184010 * 100);
        data[0].C3_525718184259 = (data[0].C3_525718184259 * 100);
        data[0].C3_525718184478 = (data[0].C3_525718184478 * 100);
        data[0].C3_525718184727 = (data[0].C3_525718184727 * 100);
        _super.prototype.appendPanel.call(this, parentelement, panelid, mini, className, title, appConfig.shifrpttofmanager.subHtml, function (iFrame) {
            iFrame.contentWindow.KingofAttendances.ShiftManage.setData2(data, dbs, appConfig);
        }, false, "icon-user");
    };
    Shiftrptofmanage.prototype.appendManage = function (parentelement, data, subdata, mini, dbs) {
        var aManage = new Manage();
        var panelid = "manager";
        var className = "";
        aManage = data[0];
        if (data[0].C3_526393969049 == "Y") {
            className = "mini-panel mini-panel-danger";
        }
        else {
            className = "mini-panel mini-panel-success";
        }
        var yearmonth = data[0].C3_525699725531;
        var dates = (data[0].C3_525699725313);
        var startDate = new Date(dates.substr(0, 4) + '-' + dates.substr(4, 2) + '-' + dates.substr(6, 2));
        var title = dates + "日产线排班整体情况";
        data[0].C3_525717403432 = (data[0].C3_525717403432 * 100).toString();
        data[0].C3_525717403651 = (data[0].C3_525717403651 * 100).toString();
        data[0].C3_525717403838 = (data[0].C3_525717403838 * 100).toString();
        data[0].C3_525717404025 = (data[0].C3_525717404025 * 100).toString();
        _super.prototype.appendPanel.call(this, parentelement, panelid, mini, className, title, appConfig.shifrpttofmanager.mainHtml, function (iFrame) {
            iFrame.contentWindow.KingofAttendances.ShiftManage.setData(data, dbs, appConfig);
        }, true, "");
    };
    return Shiftrptofmanage;
}(miniPanel));
function main() {
    baseUrl = appConfig.app.baseUrl;
    getMethod = appConfig.app.getMethod;
    saveMethod = appConfig.app.saveMethod;
    var ucode = getQueryString('ucode');
    var user = getQueryString('user');
    var dbs = new dbHelper(baseUrl, user, ucode);
    var el = document.getElementById('content');
    var datagrids = document.getElementById('datagrids');
    var shiftPanel = new Shiftrptofmanage(el);
    var resid = appConfig.shifrpttofmanager.resid;
    var subresid = appConfig.shifrpttofmanager.subresid;
    var cmswhere;
    if (appConfig.app.debug) {
        cmswhere = "C3_525699724860=392";
    }
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
}
;
