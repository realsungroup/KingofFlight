var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var baseObjectM1 = (function () {
    function baseObjectM1() {
    }
    return baseObjectM1;
}());
var Manage1 = (function (_super) {
    __extends(Manage1, _super);
    function Manage1() {
        _super.apply(this, arguments);
    }
    return Manage1;
}(baseObjectM1));
var internationalfilght = (function (_super) {
    __extends(internationalfilght, _super);
    function internationalfilght(element) {
        _super.call(this, element);
    }
    internationalfilght.prototype.appendManage = function (parentelement, data, subdata, mini, dbs) {
        var aManage = new Manage1();
        var panelid = "manager";
        var className = "mini-panel mini-panel-primary";
        aManage = data[0];
        var title = "国际机票预定信息";
        _super.prototype.appendPanel.call(this, parentelement, panelid, mini, className, title, appConfig.internationalfilght.mainHtml, function (iFrame) {
            iFrame.contentWindow.KingofAttendances.international.setData(data, dbs, appConfig);
        }, true, "");
    };
    return internationalfilght;
}(miniPanel));
function main() {
    $.getJSON("./dist/app.config.json", function (data, textStatus, hr) {
        appConfig = data;
        appConfig.appfunction = appfunctions;
        submain();
    });
}
function submain() {
    baseUrl = appConfig.app.baseUrl;
    getMethod = appConfig.app.getMethod;
    saveMethod = appConfig.app.saveMethod;
    var ucode = getQueryString('ucode');
    var user = getQueryString('user');
    var dbs = new dbHelper(baseUrl, user, ucode);
    var el = document.getElementById('content');
    var datagrids = document.getElementById('datagrids');
    var shiftPanel = new internationalfilght(el);
    var resid = appConfig.internationalfilght.guojiResid;
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
