var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var baseObjectM2 = (function () {
    function baseObjectM2() {
    }
    return baseObjectM2;
}());
var Manage2 = (function (_super) {
    __extends(Manage2, _super);
    function Manage2() {
        _super.apply(this, arguments);
    }
    return Manage2;
}(baseObjectM2));
var domesticfilght = (function (_super) {
    __extends(domesticfilght, _super);
    function domesticfilght(element) {
        _super.call(this, element);
    }
    domesticfilght.prototype.appendManage = function (parentelement, data, subdata, mini, dbs) {
        var aManage = new Manage2();
        var panelid = "manager";
        var className = "mini-panel mini-panel-primary";
        aManage = data[0];
        var title = "国内机票预定信息";
        _super.prototype.appendPanel.call(this, parentelement, panelid, mini, className, title, appConfig.domesticfilght.mainHtml, function (iFrame) {
            iFrame.contentWindow.KingofAttendances.domestic.setData(data, dbs, appConfig);
        }, true, "");
    };
    return domesticfilght;
}(miniPanel));
function main2() {
    $.getJSON("./dist/app.config.json", function (data, textStatus, hr) {
        appConfig = data;
        appConfig.appfunction = appfunctions;
        submain2();
    });
}
function submain2() {
    baseUrl = appConfig.app.baseUrl;
    getMethod = appConfig.app.getMethod;
    saveMethod = appConfig.app.saveMethod;
    var ucode = getQueryString('ucode');
    var user = getQueryString('user');
    var dbs = new dbHelper(baseUrl, user, ucode);
    var el = document.getElementById('content');
    var datagrids = document.getElementById('datagrids');
    var shiftPanel = new domesticfilght(el);
    var resid = appConfig.domesticfilght.guoneiResid;
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
