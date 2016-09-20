var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var Shiftrptofsuper = (function (_super) {
    __extends(Shiftrptofsuper, _super);
    function Shiftrptofsuper(element) {
        _super.call(this, element);
    }
    Shiftrptofsuper.prototype.appendLineleader = function (parentelement, panelid, data, mini, dbs) {
        var aLineleader = new Lineleader();
        var className = "";
        var dates = "";
        var title;
        aLineleader = data[0];
        if (data[0].C3_526410163545 == "Y") {
            className = "mini-panel mini-panel-danger";
        }
        else {
            className = "mini-panel mini-panel-success";
        }
        title = data[0].C3_525642615889 + data[0].C3_525715020942 + "排班" + data[0].C3_525715678864 + "人，" + "排班" + data[0].C3_526578100819 + "小时";
        data[0].C3_525718264194 = (data[0].C3_525718264194 * 100);
        data[0].C3_525718264474 = (data[0].C3_525718264474 * 100);
        data[0].C3_525718264693 = (data[0].C3_525718264693 * 100);
        data[0].C3_525718264911 = (data[0].C3_525718264911 * 100);
        _super.prototype.appendPanel.call(this, parentelement, panelid, mini, className, title, appConfig.shifrpttofsuper.subHtml, function (iFrame) {
            iFrame.contentWindow.KingofAttendances.ShiftSupervisor.setData2(data, dbs, appConfig);
        }, false, "icon-user");
    };
    Shiftrptofsuper.prototype.appendSupervisor = function (parentelement, data, subdata, mini, dbs) {
        var aSupervisor = new Supervisor();
        var panelid = "supervisor";
        var className = "";
        var dates = "";
        var title;
        dates = (data[0].C3_525698252634);
        title = dates + "日产线排班整体情况";
        if (data[0].C3_526393560160 == "Y") {
            className = "mini-panel mini-panel-danger";
        }
        else {
            className = "mini-panel mini-panel-success";
        }
        data[0].C3_525718184010 = (data[0].C3_525718184010 * 100);
        data[0].C3_525718184259 = (data[0].C3_525718184259 * 100);
        data[0].C3_525718184478 = (data[0].C3_525718184478 * 100);
        data[0].C3_525718184727 = (data[0].C3_525718184727 * 100);
        _super.prototype.appendPanel.call(this, parentelement, panelid, mini, className, title, appConfig.shifrpttofsuper.mainHtml, function (iFrame) {
            iFrame.contentWindow.KingofAttendances.ShiftSupervisor.setData(data, dbs, appConfig);
        }, true, "");
    };
    return Shiftrptofsuper;
}(miniPanel));
function main() {
    baseUrl = appConfig.app.baseUrl;
    getMethod = appConfig.app.getMethod;
    saveMethod = appConfig.app.saveMethod;
    var ucode = getQueryString('ucode');
    var user = getQueryString('user');
    var dbs = new dbHelper(baseUrl, user, ucode);
    var resid = appConfig.shifrpttofsuper.resid;
    var subresid = appConfig.shifrpttofsuper.subresid;
    var cmswhere = "";
    if (appConfig.app.debug) {
        cmswhere = "C3_525697777216=1959";
    }
    var el = document.getElementById('content');
    var datagrids = document.getElementById('datagrids');
    var shiftPanel = new Shiftrptofsuper(el);
    shiftPanel.start();
    var url;
    mini.parse();
    dbs.dbGetdata(resid, subresid, cmswhere, dataGot, fnerror, fnhttperror);
    function dataGot(data, subdata) {
        if (data.length > 0) {
            shiftPanel.appendSupervisor(datagrids, data, subdata, mini, dbs);
            if (subdata.length > 0) {
                $.each(subdata, function (i, item) {
                    var row = [];
                    row.push(item);
                    shiftPanel.appendLineleader(datagrids, "dynamicgrid" + i.toString(), row, mini, dbs);
                });
            }
        }
    }
    function fnerror(data) {
        alert(data.message);
    }
    function fnhttperror(jqXHR, textStatus, errorThrown) { alert(jqXHR.responseText); }
}
