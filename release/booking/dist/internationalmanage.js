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
    var url;
    mini.parse();
    dbs.dbGetdata(resid, "", cmswhere, dataGot, fnerror, fnhttperror);
    function dataGot(data, subdata) {
        KingofAttendances.i_manage.setData(data, dbs, appConfig);
    }
    function fnerror(data) {
        alert(data);
    }
    function fnhttperror(jqXHR, textStatus, errorThrown) {
    }
}
;
var KingofAttendances = KingofAttendances || {};
KingofAttendances.i_manage = new function () {
    this.setData = function (data, adbs, aappConfig) {
        var me = this;
        var list;
        var o = data;
        this.jState = function (o, i) {
            if (o[i].C3_527946742678 == "未提交") {
                $("#tds_" + i).addClass('wtj');
            }
            else if (o[i].C3_527946742678 == "已提交") {
                $("#tds_" + i).addClass('ytj');
            }
            else if (o[i].C3_527946742678 == "待确认出票") {
                $("#a_" + i).text("确认").attr('onclick', '');
                $("#b_" + i).remove();
                $("#c_" + i).remove();
                $("#tds_" + i).addClass('dqr');
            }
            else if (o[i].C3_527946742678 == "待行政确认出票") {
                $("#a_" + i).text("确认出票").attr('onclick', 'KingofAttendances.i_manage.conClick(' + o[i].REC_ID + ')');
                $("#b_" + i).remove();
                $("#c_" + i).remove();
                $("#tds_" + i).addClass('dsh');
            }
            else if (o[i].C3_527946742678 == "订单完成") {
                $("#td_" + i).remove();
                $("#tds_" + i).addClass('none');
            }
        };
        this.bill = function (o, i) {
            list = "<tr height=\"30px\">\n                      <td class=\"head\" width=\"10%\" colspan=\"2\">\u51FA\u5DEE\u5355\u636E\u53F7</td>\n                      <td colspan=\"3\">" + o[i].C3_526655624603 + "</td>\n                      <td class=\"head1\" align=\"center\" width=\"10%\">\u5355\u636E\u72B6\u6001</td>\n                      <td align=\"center\" width=\"15%\" id=\"tds_" + i + "\">" + o[i].C3_527946742678 + "</td>\n                      <td rowspan=\"5\" width=\"5%\" align=\"center\" id=\"tdb_" + i + "\">\n                          <a class=\"mini-button m_btn\" id=\"a_" + i + "\" iconCls=\"icon-upload\" onclick=\"KingofAttendances.international.submitClick(" + o[i].REC_ID + ")\">\u63D0\u4EA4</a>\n                          <a class=\"mini-button m_btn\" id=\"b_" + i + "\" iconCls=\"icon-edit\" onclick=\"KingofAttendances.international.editClick(" + o[i].REC_ID + ")\">\u7F16\u8F91</a>\n                          <a class=\"mini-button m_btn\" id=\"c_" + i + "\" iconCls=\"icon-remove\" onclick=\"KingofAttendances.international.revokeClick(" + o[i].REC_ID + ")\">\u64A4\u9500</a>\n                      </td>\n                  </tr>\n                  <tr class=\"tc\">\n                      <td width=\"10%\" class=\"title\" rowspan=\"2\">\u51FA\u53D1\u65E5\u671F</td>\n                      <td width=\"10%\" rowspan=\"2\">" + o[i].C3_527948208338 + "</td>\n                      <td width=\"10%\" class=\"title\" rowspan=\"2\">\u51FA\u53D1\u5730</td>\n                      <td width=\"10%\" rowspan=\"2\">" + o[i].C3_526655262089 + "</td>\n                      <td rowspan=\"2\" width=\"15%\">\n                          \u7B7E\u8BC1\u626B\u63CF\u4EF6\n                          <img src=\"../../scripts/miniui/themes/icons/search.gif\" width=\"15px\" style=\"cursor:pointer\" onclick=\"KingofAttendances.international.enlClick('" + o[i].C3_526655353950 + "')\"/>\n                      </td>\n                      <td  class=\"title1\">\u5F80\u7A0B\u822A\u73ED\u53F7</td>\n                      <td>" + o[i].C3_526655793514 + "</td>\n                  </tr>\n                  <tr class=\"tc\">\n                      <td class=\"title1\">\u822A\u73ED\u65F6\u95F4</td>\n                      <td>" + o[i].C3_528400651698 + "</td>\n                  </tr>\n                  <tr class=\"tc\">\n                      <td class=\"title\" rowspan=\"2\">\u8FD4\u56DE\u65E5\u671F</td>\n                      <td rowspan=\"2\">" + o[i].C3_527948869929 + "</td>\n                      <td class=\"title\" rowspan=\"2\">\u8FD4\u56DE\u5730</td>\n                      <td rowspan=\"2\">" + o[i].C3_526655271756 + "</td>\n                      <td rowspan=\"2\">\n                          \u62A4\u7167\u626B\u63CF\u4EF6\n                          <img src=\"../../scripts/miniui/themes/icons/search.gif\" width=\"15px\" style=\"cursor:pointer\" onclick=\"KingofAttendances.international.enlClick('" + o[i].C3_527873192635 + "')\"/>\n                      </td>\n                      <td class=\"title1\">\u8FD4\u7A0B\u822A\u73ED\u53F7</td>\n                      <td>" + o[i].C3_528311923010 + "</td>\n                  </tr>\n                  <tr class=\"tc\">\n                      <td class=\"title1\">\u822A\u73ED\u65F6\u95F4</td>\n                      <td>" + o[i].C3_528400600428 + "</td>\n                  </tr>";
        };
        this.i_meditClick = function (REC_ID) {
            var win = mini.open({
                url: 'http://wux-hr03:8009/dist/component/i_medit.html',
                showModal: false,
                width: 600,
                height: 470,
                onload: function () {
                    var iframe = this.getIFrameEl();
                    iframe.contentWindow.Setdbs(adbs, aappConfig, REC_ID);
                },
                ondestroy: function (action) {
                    parent.location.reload();
                }
            });
        };
        this.conClick = function (REC_ID) {
            if (confirm('您是否要确认么？')) {
                mini.parse();
                var form = new mini.Form("form1");
                var o = new mini.Form("form1").getData();
                form.validate();
                if (form.isValid() == false)
                    return;
                o._id = 1;
                o._state = "modified";
                o.REC_ID = REC_ID;
                o.C3_526655932836 = "Y";
                var json = mini.encode([o]);
                adbs.dbSavedata(aappConfig.internationalmanage.guojiResid, 0, json, dataSaved, fnerror, fnhttperror);
                function dataSaved(text) {
                    alert("申请成功");
                }
                function fnerror(text) {
                    alert("申请失败");
                }
                function fnhttperror(jqXHR, textStatus, errorThrown) {
                    alert("error");
                }
                parent.location.reload();
            }
            else {
                return;
            }
        };
        this.revokeClick = function (REC_ID) {
            if (confirm('您确定要撤销么？')) {
                mini.parse();
                var form = new mini.Form("form1");
                var o = new mini.Form("form1").getData();
                form.validate();
                if (form.isValid() == false)
                    return;
                o._id = 1;
                o._state = "modified";
                o.REC_ID = REC_ID;
                o.C3_527965048090 = "Y";
                var json = mini.encode([o]);
                adbs.dbSavedata(aappConfig.internationalmanage.guojiResid, 0, json, dataSaved, fnerror, fnhttperror);
                function dataSaved(text) {
                    alert("申请成功");
                }
                function fnerror(text) {
                    alert("申请失败");
                }
                function fnhttperror(jqXHR, textStatus, errorThrown) {
                    alert("error");
                }
                parent.location.reload();
            }
            else {
                return;
            }
        };
        this.rebutClick = function (REC_ID) {
            if (confirm('您确定要驳回么？')) {
                mini.parse();
                var form = new mini.Form("form1");
                var o = new mini.Form("form1").getData();
                form.validate();
                if (form.isValid() == false)
                    return;
                o._id = 1;
                o._state = "modified";
                o.REC_ID = REC_ID;
                o.C3_526655608924 = "";
                var json = mini.encode([o]);
                adbs.dbSavedata(aappConfig.internationalmanage.guojiResid, 0, json, dataSaved, fnerror, fnhttperror);
                function dataSaved(text) {
                    alert("申请成功");
                }
                function fnerror(text) {
                    alert("申请失败");
                }
                function fnhttperror(jqXHR, textStatus, errorThrown) {
                    alert("error");
                }
                parent.location.reload();
            }
            else {
                return;
            }
        };
        this.navClick = function (state) {
            $("#tbManage tbody").empty();
            for (var i = 0; i < o.length; i++) {
                if (o[i].C3_527946742678 == state) {
                    me.bill(o, i);
                    $("#tbManage tbody").append(list);
                    me.jState(o, i);
                }
            }
            ;
            mini.parse();
        };
        for (var i = 0; i < o.length; i++) {
            if (o[i].C3_527946742678 == "已提交") {
                this.bill(o, i);
                $("#tbManage tbody").append(list);
                this.jState(o, i);
                $("#tds_" + i).addClass('ytj');
            }
        }
        ;
    };
};
