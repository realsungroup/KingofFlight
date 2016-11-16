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
    var resid = appConfig.domesticmanage.guoneiResid;
    var cmswhere = "";
    mini.parse();
    dbs.dbGetdata(resid, "", cmswhere, dataGot, fnerror, fnhttperror);
    function dataGot(data, subdata) {
        KingofAttendances.d_manage.setData(data, dbs, appConfig);
    }
    function fnerror(data) {
        alert(data);
    }
    function fnhttperror(jqXHR, textStatus, errorThrown) {
    }
}
;
var KingofAttendances = KingofAttendances || {};
KingofAttendances.d_manage = new function () {
    this.setData = function (data, adbs, aappConfig) {
        var me = this;
        var list;
        var o = data;
        this.jState = function (o, i) {
            if (o[i].C3_528049541154 == "未提交") {
                $("#tds_" + i).addClass('wtj');
            }
            else if (o[i].C3_528049541154 == "已提交") {
                $("#tds_" + i).addClass('ytj');
            }
            else if (o[i].C3_528049541154 == "待确认出票") {
                $("#a_" + i).text("确认").attr('onclick', '');
                $("#b_" + i).remove();
                $("#c_" + i).remove();
                $("#tds_" + i).addClass('dqr');
            }
            else if (o[i].C3_528049541154 == "待行政确认出票") {
                $("#a_" + i).text("确认出票").attr('onclick', 'KingofAttendances.d_manage.conClick(' + o[i].REC_ID + ')');
                $("#b_" + i).remove();
                $("#c_" + i).remove();
                $("#tds_" + i).addClass('dsh');
            }
            else if (o[i].C3_528049541154 == "订单完成") {
                $("#td_" + i).remove();
                $("#tds_" + i).addClass('none');
            }
            mini.parse();
        };
        this.bill = function (o, i) {
            list = "<tr height=\"30px\" class=\"tc\">\n                      <td class=\"head\" colspan=\"2\">\u51FA\u5DEE\u5355\u636E\u53F7</td>\n                      <td colspan=\"2\">" + o[i].C3_526656513019 + "</td>\n                      <td class=\"head1\" width=\"15%\">\u5355\u636E\u72B6\u6001</td>\n                      <td id=\"tds_" + i + "\" width=\"25%\">" + o[i].C3_528049541154 + "</td>\n                      <td rowspan=\"7\" width=\"10%\" id=\"td_" + i + "\">\n                          <a class=\"mini-button m_btn\" id=\"a_" + i + "\" onclick=\"KingofAttendances.d_manage.d_meditClick(" + o[i].REC_ID + ")\">\u822A\u73ED\u4FE1\u606F</a>\n                          <a class=\"mini-button m_btn\" id=\"b_" + i + "\" iconCls=\"icon-upgrade\" onclick=\"KingofAttendances.d_manage.rebutClick(" + o[i].REC_ID + ")\">\u9A73\u56DE</a>\n                          <a class=\"mini-button m_btn\" id=\"c_" + i + "\" iconCls=\"icon-remove\" onclick=\"KingofAttendances.d_manage.revokeClick(" + o[i].REC_ID + ")\">\u64A4\u9500</a>\n                      </td>\n                  </tr>\n                  <tr height=\"30px\" class=\"tc\">\n                      <td width=\"10%\" class=\"title1\">\u59D3\u540D</td>\n                      <td width=\"10%\">" + o[i].C3_526656510920 + "</td>\n                      <td width=\"10%\" class=\"title1\">\u8EAB\u4EFD\u8BC1\u53F7</td>\n                      <td width=\"15%\" colspan=\"2\">" + o[i].C3_526656510713 + "</td>\n                      <td>" + o[i].C3_526656512808 + "</td>\n                  </tr>\n                  <tr class=\"tc\">\n                      <td class=\"title1\" rowspan=\"2\">\u51FA\u53D1\u5730</td>\n                      <td rowspan=\"2\">" + o[i].C3_526656511963 + "</td>\n                      <td rowspan=\"2\" class=\"title1\">\u51FA\u53D1\u65E5\u671F</td>\n                      <td rowspan=\"2\">" + o[i].C3_528048113321 + "</td>\n                      <td>\u53BB\u7A0B\u822A\u73ED\u53F7</td>\n                      <td>" + o[i].C3_526656513426 + "</td>\n                  </tr>\n                  <tr class=\"tc\">\n                      <td>\u822A\u73ED\u65F6\u95F4</td>\n                      <td>" + o[i].C3_529016446872 + "</td>\n                  </tr>\n                  <tr class=\"tc\">\n                      <td rowspan=\"2\" class=\"title1\">\u76EE\u7684\u5730</td>\n                      <td rowspan=\"2\">" + o[i].C3_526656512229 + "</td>\n                      <td rowspan=\"2\" class=\"title1\">\u8FD4\u56DE\u65E5\u671F</td>\n                      <td rowspan=\"2\">" + o[i].C3_530114959734 + "</td>\n                      <td>\u8FD4\u7A0B\u822A\u73ED\u53F7</td>\n                      <td>" + o[i].C3_530118289053 + "</td>\n                  </tr>\n                  <tr class=\"tc\">\n                      <td>\u822A\u73ED\u65F6\u95F4</td>\n                      <td>" + o[i].C3_530118810885 + "</td>\n                  </tr>\n                  <tr class=\"tc\">\n                      <td class=\"title1\" colspan=\"2\">\u4EF7\u683C\u8BF4\u660E</td>\n                      <td colspan=\"5\">" + o[i].C3_531586511730 + "</td>\n                  </tr>";
        };
        this.d_meditClick = function (REC_ID) {
            var win = mini.open({
                url: 'http://wux-hr03:8009/dist/component/d_medit.html',
                showModal: true,
                width: 600,
                height: 500,
                onload: function () {
                    var iframe = this.getIFrameEl();
                    iframe.contentWindow.Setdbs(adbs, aappConfig, REC_ID);
                },
                ondestroy: function (action) {
                    window.location.reload();
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
                o.C3_526656514479 = "Y";
                var json = mini.encode([o]);
                adbs.dbSavedata(aappConfig.domesticmanage.guoneiResid, 0, json, dataSaved, fnerror, fnhttperror);
                function dataSaved(text) {
                    alert("操作成功");
                }
                function fnerror(text) {
                    alert("操作失败");
                }
                function fnhttperror(jqXHR, textStatus, errorThrown) {
                    alert("error");
                }
                window.location.reload();
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
                adbs.dbSavedata(aappConfig.domesticmanage.guojiResid, 0, json, dataSaved, fnerror, fnhttperror);
                function dataSaved(text) {
                    alert("操作成功");
                }
                function fnerror(text) {
                    alert("操作失败");
                }
                function fnhttperror(jqXHR, textStatus, errorThrown) {
                    alert("error");
                }
                window.location.reload();
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
                adbs.dbSavedata(aappConfig.domesticmanage.guojiResid, 0, json, dataSaved, fnerror, fnhttperror);
                function dataSaved(text) {
                    alert("操作成功");
                }
                function fnerror(text) {
                    alert("操作失败");
                }
                function fnhttperror(jqXHR, textStatus, errorThrown) {
                    alert("error");
                }
                window.location.reload();
            }
            else {
                return;
            }
        };
        this.navClick = function (state) {
            $("#tbManage tbody").empty();
            for (var i = 0; i < o.length; i++) {
                if (o[i].C3_528049541154 == state) {
                    me.bill(o, i);
                    $("#tbManage tbody").append(list);
                    me.jState(o, i);
                }
            }
            ;
        };
        for (var i = 0; i < o.length; i++) {
            if (o[i].C3_528049541154 == "已提交") {
                this.bill(o, i);
                $("#tbManage tbody").append(list);
                this.jState(o, i);
                $("#tds_" + i).addClass('ytj');
            }
        }
        ;
    };
};
