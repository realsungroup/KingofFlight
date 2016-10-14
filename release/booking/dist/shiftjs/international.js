var KingofAttendances = KingofAttendances || {};
KingofAttendances.international = new function () {
    this.setData = function (data, adbs, aappConfig) {
        var me = this;
        var list;
        var o = data;
        this.jState = function (o, i) {
            if (o[i].C3_527946742678 == "未提交") {
                $("#tds_" + i).addClass('wtj');
            }
            else if (o[i].C3_527946742678 == "已提交") {
                $("#a_" + i).text("已提交").attr('onclick', '');
                $("#b_" + i).remove();
                $("#c_" + i).remove();
                $("#tds_" + i).addClass('ytj');
            }
            else if (o[i].C3_527946742678 == "待确认出票") {
                $("#a_" + i).text("确认").attr('onclick', 'KingofAttendances.international.conClick(' + o[i].REC_ID + ')');
                $("#b_" + i).remove();
                $("#c_" + i).remove();
                $("#tds_" + i).addClass('dqr');
            }
            else if (o[i].C3_527946742678 == "待行政确认出票") {
                $("#a_" + i).text("已确认").attr('onclick', '');
                $("#b_" + i).remove();
                $("#c_" + i).remove();
                $("#tds_" + i).addClass('dsh');
            }
            else if (o[i].C3_527946742678 == "订单完成") {
                $("#tdb_" + i).remove();
                $("#tds_" + i).addClass('none');
            }
        };
        this.bill = function (o, i) {
            list = "<tr height=\"30px\">\n                      <td class=\"head\" width=\"10%\" colspan=\"2\">\u51FA\u5DEE\u5355\u636E\u53F7</td>\n                      <td colspan=\"4\">" + o[i].C3_526655624603 + "</td>\n                      <td class=\"head1\" align=\"center\" width=\"10%\">\u5355\u636E\u72B6\u6001</td>\n                      <td align=\"center\" width=\"15%\" id=\"tds_" + i + "\">" + o[i].C3_527946742678 + "</td>\n                      <td rowspan=\"5\" width=\"5%\" align=\"center\" id=\"tdb_" + i + "\">\n                          <a class=\"mini-button m_btn\" id=\"a_" + i + "\" iconCls=\"icon-upload\" onclick=\"KingofAttendances.international.submitClick(" + o[i].REC_ID + ")\">\u63D0\u4EA4</a>\n                          <a class=\"mini-button m_btn\" id=\"b_" + i + "\" iconCls=\"icon-edit\" onclick=\"KingofAttendances.international.editClick(" + o[i].REC_ID + ")\">\u7F16\u8F91</a>\n                          <a class=\"mini-button m_btn\" id=\"c_" + i + "\" iconCls=\"icon-remove\" onclick=\"KingofAttendances.international.revokeClick(" + o[i].REC_ID + ")\">\u64A4\u9500</a>\n                      </td>\n                  </tr>\n                  <tr class=\"tc\">\n                      <td width=\"10%\" class=\"title\" rowspan=\"2\">\u51FA\u53D1\u65E5\u671F</td>\n                      <td width=\"10%\" rowspan=\"2\">" + o[i].C3_527948208338 + "</td>\n                      <td width=\"10%\" class=\"title\" rowspan=\"2\">\u51FA\u53D1\u5730</td>\n                      <td width=\"10%\" rowspan=\"2\">" + o[i].C3_526655262089 + "</td>\n                      <td rowspan=\"3\" width=\"15%\">\n                          <img src=\"" + o[i].C3_527873192635 + "\" width=\"100px\"/>\n                      </td>\n                      <td rowspan=\"3\" width=\"15%\">\n                          <img src=\"" + o[i].C3_526655353950 + "\" width=\"100px\"/>\n                      </td>\n                      <td  class=\"title1\">\u5F80\u7A0B\u822A\u73ED\u53F7</td>\n                      <td>" + o[i].C3_526655793514 + "</td>\n                  </tr>\n                  <tr class=\"tc\">\n                      <td class=\"title1\">\u822A\u73ED\u65F6\u95F4</td>\n                      <td>" + o[i].C3_528400651698 + "</td>\n                  </tr>\n                  <tr class=\"tc\">\n                      <td class=\"title\" rowspan=\"2\">\u8FD4\u56DE\u65E5\u671F</td>\n                      <td rowspan=\"2\">" + o[i].C3_527948869929 + "</td>\n                      <td class=\"title\" rowspan=\"2\">\u8FD4\u56DE\u5730</td>\n                      <td rowspan=\"2\">" + o[i].C3_526655271756 + "</td>\n                      <td class=\"title1\">\u8FD4\u7A0B\u822A\u73ED\u53F7</td>\n                      <td>" + o[i].C3_528311923010 + "</td>\n                  </tr>\n                  <tr class=\"tc\">\n                      <td>\n                          \u62A4\u7167\u626B\u63CF\u4EF6\n                          <img src=\"../../scripts/miniui/themes/icons/search.gif\" width=\"15px\" style=\"cursor:pointer\" onclick=\"KingofAttendances.international.enlClick('" + o[i].C3_527873192635 + "')\"/>\n                      </td>\n                      <td>\n                          \u7B7E\u8BC1\u626B\u63CF\u4EF6\n                          <img src=\"../../scripts/miniui/themes/icons/search.gif\" width=\"15px\" style=\"cursor:pointer\" onclick=\"KingofAttendances.international.enlClick('" + o[i].C3_526655353950 + "')\"/>\n                      </td>\n                      <td class=\"title1\">\u822A\u73ED\u65F6\u95F4</td>\n                      <td>" + o[i].C3_528400600428 + "</td>\n                  </tr>";
        };
        this.addClick = function () {
            var win = mini.open({
                url: 'http://wux-hr03:8009/dist/component/setdata.html',
                showModal: false,
                width: 550,
                height: 550,
                onload: function () {
                    var iframe = this.getIFrameEl();
                    iframe.contentWindow.Setdbs(adbs, aappConfig);
                },
                ondestroy: function (action) {
                    parent.location.reload();
                }
            });
        };
        this.enlClick = function (imgUrl) {
            var win = mini.open({
                url: 'http://wux-hr03:8009/dist/component/imgenl.html',
                showModal: false,
                width: 600,
                height: 600,
                onload: function () {
                    var iframe = this.getIFrameEl();
                    iframe.contentWindow.Setdbs(imgUrl);
                }
            });
        };
        this.editClick = function (REC_ID) {
            var win = mini.open({
                url: 'http://wux-hr03:8009/dist/component/editdata.html',
                showModal: false,
                width: 600,
                height: 550,
                onload: function () {
                    var iframe = this.getIFrameEl();
                    iframe.contentWindow.Setdbs(adbs, aappConfig, REC_ID);
                },
                ondestroy: function (action) {
                    parent.location.reload();
                }
            });
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
                adbs.dbSavedata(aappConfig.internationalfilght.guojiResid, 0, json, dataSaved, fnerror, fnhttperror);
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
        this.submitClick = function (REC_ID) {
            if (confirm('您确定要提交么？')) {
                mini.parse();
                var form = new mini.Form("form1");
                var o = new mini.Form("form1").getData();
                form.validate();
                if (form.isValid() == false)
                    return;
                o._id = 1;
                o._state = "modified";
                o.REC_ID = REC_ID;
                o.C3_526655608924 = "Y";
                var json = mini.encode([o]);
                adbs.dbSavedata(aappConfig.internationalfilght.guojiResid, 0, json, dataSaved, fnerror, fnhttperror);
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
                o.C3_526655868769 = "Y";
                var json = mini.encode([o]);
                adbs.dbSavedata(aappConfig.internationalfilght.guojiResid, 0, json, dataSaved, fnerror, fnhttperror);
                function dataSaved(text) {
                    alert("申请成功");
                }
                function fnerror(text) {
                    alert("申请失败");
                    alert(text);
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
                    mini.parse();
                }
            }
            ;
        };
        var si = "<tr height=\"40px\" align=\"center\">\n                  <td width=\"15%\" class=\"title1\">\u5458\u5DE5\u53F7</td>\n                  <td width=\"15%\">" + o[0].C3_526655169418 + "</td>\n                  <td width=\"15%\" class=\"title1\">\u59D3\u540D</td>\n                  <td width=\"15%\">" + o[0].C3_526655177113 + "</td>\n                  <td width=\"15%\" class=\"title1\">\u8EAB\u4EFD\u8BC1\u53F7</td><td width=\"25%\">" + o[0].C3_526655197108 + "</td>\n                </tr>\n                <tr height=\"40px\" align=\"center\">\n                  <td class=\"title1\">\u62A4\u7167\u53F7</td>\n                  <td>" + o[0].C3_526655213359 + "</td>\n                  <td class=\"title1\">\u62A4\u7167\u6709\u6548\u671F</td>\n                  <td>" + o[0].C3_527948550902 + "</td>\n                  <td colspan=\"2\"></td>\n                </tr>";
        $("#si").html(si);
        for (var i = 0; i < o.length; i++) {
            this.bill(o, i);
            $("#tbManage tbody").append(list);
            this.jState(o, i);
        }
        ;
    };
};
