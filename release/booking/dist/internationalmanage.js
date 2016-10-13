var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var baseObjectM3 = (function () {
    function baseObjectM3() {
    }
    return baseObjectM3;
}());
var Manage3 = (function (_super) {
    __extends(Manage3, _super);
    function Manage3() {
        _super.apply(this, arguments);
    }
    return Manage3;
}(baseObjectM3));
var internationalmanage = (function (_super) {
    __extends(internationalmanage, _super);
    function internationalmanage(element) {
        _super.call(this, element);
    }
    internationalmanage.prototype.appendManage = function (parentelement, data, subdata, mini, dbs) {
        var aManage = new Manage3();
        var panelid = "manager";
        var className = "mini-panel mini-panel-primary";
        aManage = data[0];
        var title = "国际机票预定情况";
        _super.prototype.appendPanel.call(this, parentelement, panelid, mini, className, title, appConfig.internationalmanage.mainHtml, function (iFrame) {
            iFrame.contentWindow.KingofAttendances.i_manage.setData(data, dbs, appConfig);
        }, true, "");
    };
    return internationalmanage;
}(miniPanel));
function main3() {
    $.getJSON("./dist/app.config.json", function (data, textStatus, hr) {
        appConfig = data;
        appConfig.appfunction = appfunctions;
        submain3();
    });
}
function submain3() {
    baseUrl = appConfig.app.baseUrl;
    getMethod = appConfig.app.getMethod;
    saveMethod = appConfig.app.saveMethod;
    var ucode = getQueryString('ucode');
    var user = getQueryString('user');
    var dbs = new dbHelper(baseUrl, user, ucode);
    var el = document.getElementById('content');
    var datagrids = document.getElementById('datagrids');
    var shiftPanel = new internationalmanage(el);
    var resid = appConfig.internationalmanage.guojiResid;
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
    }
}
;
