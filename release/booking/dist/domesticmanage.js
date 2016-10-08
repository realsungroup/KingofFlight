var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var baseObjectM4 = (function () {
    function baseObjectM4() {
    }
    return baseObjectM4;
}());
var Manage4 = (function (_super) {
    __extends(Manage4, _super);
    function Manage4() {
        _super.apply(this, arguments);
    }
    return Manage4;
}(baseObjectM4));
var domesticmanage = (function (_super) {
    __extends(domesticmanage, _super);
    function domesticmanage(element) {
        _super.call(this, element);
    }
    domesticmanage.prototype.appendManage = function (parentelement, data, subdata, mini, dbs) {
        var aManage = new Manage4();
        var panelid = "manager";
        var className = "mini-panel mini-panel-primary";
        aManage = data[0];
        var title = "国内机票预定情况";
        _super.prototype.appendPanel.call(this, parentelement, panelid, mini, className, title, appConfig.domesticmanage.mainHtml, function (iFrame) {
            iFrame.contentWindow.KingofAttendances.d_manage.setData(data, dbs, appConfig);
        }, true, "");
    };
    return domesticmanage;
}(miniPanel));
function main4() {
    $.getJSON("./dist/app.config.json", function (data, textStatus, hr) {
        appConfig = data;
        appConfig.appfunction = appfunctions;
        submain4();
    });
}
function submain4() {
    baseUrl = appConfig.app.baseUrl;
    getMethod = appConfig.app.getMethod;
    saveMethod = appConfig.app.saveMethod;
    var ucode = getQueryString('ucode');
    var user = getQueryString('user');
    var dbs = new dbHelper(baseUrl, user, ucode);
    var el = document.getElementById('content');
    var datagrids = document.getElementById('datagrids');
    var shiftPanel = new domesticmanage(el);
    var resid = appConfig.domesticmanage.guoneiResid;
    var cmswhere = "";
    if (appConfig.app.debug)
        shiftPanel.start();
    var url;
    mini.parse();
    dbs.dbGetdata(resid, "", cmswhere, dataGot, fnerror, fnhttperror);
    function dataGot(data, subdata) {
        shiftPanel.appendManage(datagrids, data, subdata, mini, dbs);
    }
    function fnerror(data) {
        alert(data);
    }
    function fnhttperror(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
    }
}
;
