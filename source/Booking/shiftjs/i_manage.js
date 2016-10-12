var KingofAttendances = KingofAttendances || {};
KingofAttendances.i_manage = new function () {
    this.setData = function (data, adbs, aappConfig) {
        var me = this;
        var list;
        var o = data;
        this.big = function (id, i) {
            $(id).removeClass("oImg").addClass('oImg1');
            $(id).parent().removeClass("oh");
        };
        this.small = function (id, i) {
            $(id).removeClass("oImg1").addClass('oImg');
            $(id).parent().addClass("oh");
        };
        this.jState = function (o, i) {
            if (o[i].C3_527946742678 == "未提交") {
                $("#tds_" + i).addClass('wtj');
            }
            else if (o[i].C3_527946742678 == "已提交") {
                $("#tds_" + i).addClass('ytj');
            }
            else if (o[i].C3_527946742678 == "待确认出票") {
                $("#a_" + i).text("确认").attr('onclick', '');
                $("#tds_" + i).addClass('dqr');
            }
            else if (o[i].C3_527946742678 == "待行政确认出票") {
                $("#a_" + i).text("确认出票").attr('onclick', 'KingofAttendances.i_manage.conClick(' + o[i].REC_ID + ')');
                $("#tds_" + i).addClass('dsh');
            }
            else if (o[i].C3_527946742678 == "订单完成") {
                $("#td_" + i).remove();
                $("#tds_" + i).addClass('none');
            }
        };
        this.bill = function (o, i) {
            list = "<tr height=\"30px\">\n                      <td class=\"head\" width=\"10%\" colspan=\"2\">\u51FA\u5DEE\u5355\u636E\u53F7</td>\n                      <td colspan=\"4\">" + o[i].C3_526655624603 + "</td>\n                      <td class=\"head1\" align=\"center\" width=\"10%\">\u5355\u636E\u72B6\u6001</td>\n                      <td align=\"center\" width=\"15%\" id=\"tds_" + i + "\">" + o[i].C3_527946742678 + "</td>\n                      <td rowspan=\"6\" width=\"5%\" align=\"center\" id=\"td_" + i + "\">\n                          <a class=\"mini-button m_btn\" id=\"a_" + i + "\" onclick=\"KingofAttendances.i_manage.i_meditClick(" + o[i].REC_ID + ")\">\u822A\u73ED\u4FE1\u606F</a>\n                          <a class=\"mini-button m_btn\" iconCls=\"icon-upgrade\" onclick=\"KingofAttendances.i_manage.rebutClick(" + o[i].REC_ID + ")\">\u9A73\u56DE</a>\n                          <a class=\"mini-button m_btn\" iconCls=\"icon-remove\" onclick=\"KingofAttendances.i_manage.revokeClick(" + o[i].REC_ID + ")\">\u64A4\u9500</a>\n                      </td>\n                  </tr>\n                  <tr height=\"40px\" align=\"center\">\n                      <td class=\"title1\">\u59D3\u540D</td>\n                      <td>" + o[i].C3_526655177113 + "</td>\n                      <td class=\"title1\">\u62A4\u7167\u53F7</td>\n                      <td>" + o[i].C3_526655213359 + "</td>\n                      <td class=\"title1\">\u62A4\u7167\u6709\u6548\u671F</td>\n                      <td>" + o[i].C3_527948550902 + "</td>\n                      <td class=\"title1\">\u8EAB\u4EFD\u8BC1\u53F7</td>\n                      <td>" + o[i].C3_526655197108 + "</td>\n                  </tr>\n                  <tr class=\"tc\">\n                      <td width=\"10%\" class=\"title\" rowspan=\"2\">\u51FA\u53D1\u65E5\u671F</td>\n                      <td width=\"10%\" rowspan=\"2\">" + o[i].C3_527948208338 + "</td>\n                      <td width=\"10%\" class=\"title\" rowspan=\"2\">\u51FA\u53D1\u5730</td>\n                      <td width=\"10%\" rowspan=\"2\">" + o[i].C3_526655262089 + "</td>\n                      <td rowspan=\"3\" class=\"ImgBox oh\">\n                          <img src=\"" + o[i].C3_527873192635 + "\" class=\"oImg\" onmouseover=\"KingofAttendances.i_manage.big(i1_" + i + "," + i + ")\" onmouseout=\"KingofAttendances.i_manage.small(i1_" + i + "," + i + ")\" id=\"i1_" + i + "\"/>\n                      </td>\n                      <td rowspan=\"3\" class=\"ImgBox oh\">\n                          <img src=\"" + o[i].C3_526655353950 + "\" class=\"oImg\" onmouseover=\"KingofAttendances.i_manage.big(i2_" + i + "," + i + ")\" onmouseout=\"KingofAttendances.i_manage.small(i2_" + i + "," + i + ")\" id=\"i2_" + i + "\"/>\n                      </td>\n                      <td align=\"center\">\u5F80\u7A0B\u822A\u73ED\u53F7</td>\n                      <td>" + o[i].C3_526655793514 + "</td>\n                  </tr>\n                  <tr class=\"tc\">\n                      <td>\u822A\u73ED\u65F6\u95F4</td>\n                      <td>" + o[i].C3_528400651698 + "</td>\n                      </tr>\n                      <tr class=\"tc\">\n                      <td class=\"title\" rowspan=\"2\">\u8FD4\u56DE\u65E5\u671F</td>\n                      <td rowspan=\"2\">" + o[i].C3_527948869929 + "</td>\n                      <td class=\"title\" rowspan=\"2\">\u8FD4\u56DE\u5730</td>\n                      <td rowspan=\"2\">" + o[i].C3_526655271756 + "</td>\n                      <td align=\"center\"\">\u8FD4\u7A0B\u822A\u73ED\u53F7</td>\n                      <td>" + o[i].C3_528311923010 + "</td>\n                  </tr>\n                  <tr class=\"tc\">\n                      <td>\u62A4\u7167\u626B\u63CF\u4EF6</td>\n                      <td>\u7B7E\u8BC1\u626B\u63CF\u4EF6</td>\n                      <td>\u822A\u73ED\u65F6\u95F4</td>\n                      <td>" + o[i].C3_528400600428 + "</td>\n                  </tr>";
        };
        this.i_meditClick = function (REC_ID) {
            var win = mini.open({
                url: 'http://wux-hr03:8009//dist/component/i_medit.html',
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
                console.log(REC_ID);
                o.C3_526655932836 = "Y";
                var json = mini.encode([o]);
                adbs.dbSavedata(aappConfig.internationalmanage.guojiResid, 0, json, dataSaved, fnerror, fnhttperror);
                function dataSaved(text) {
                    alert("申请成功");
                }
                function fnerror(text) {
                    alert("申请失败");
                    console.log(text);
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
                console.log(REC_ID);
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
