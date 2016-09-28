var KingofAttendances = KingofAttendances || {};
KingofAttendances.domestic = new function () {
    this.setData = function (data, adbs, aappConfig) {
        var o = data;
        var si = "<tr height=\"40px\" align=\"center\">\n                    <td width=\"15%\" class=\"title\">\u5458\u5DE5\u53F7</td>\n                    <td width=\"15%\">" + o[0].C3_526656511106 + "</td>\n                    <td width=\"15%\" class=\"title\">\u59D3\u540D</td>\n                    <td width=\"15%\">" + o[0].C3_526656510920 + "</td>\n                    <td width=\"15%\" class=\"title\">\u8EAB\u4EFD\u8BC1\u53F7</td><td width=\"25%\">" + o[0].C3_526656510713 + "</td>\n                </tr>";
        $("#si").html(si);
        for (var i = 0; i < o.length; i++) {
            var list = "<tr height=\"30px\">\n                          <td colspan=\"2\" class=\"head\" width=\"15%\">\u51FA\u5DEE\u5355\u636E\u53F7</td>\n                          <td colspan=\"4\">" + o[i].C3_526656513019 + "</td>\n                          <td class=\"title\">\u5355\u636E\u72B6\u6001</td>\n                          <td align=\"center\">" + o[i].C3_528049541154 + "</td>\n                          <td rowspan=\"2\" width=\"5\" align=\"center\">\n                            <a class=\"mini-button\" id=\"a_" + i + "\" style=\"width:80px;height:30px;\" iconCls=\"icon-upload\" onclick=\"KingofAttendances.domestic.submitClick(" + o[i].REC_ID + ")\">\u63D0\u4EA4</a>\n                            <a class=\"mini-button\" style=\"width:80px;height:30px;\" iconCls=\"icon-edit\" onclick=\"KingofAttendances.domestic.editClick(" + o[i].REC_ID + ")\">\u7F16\u8F91</a>\n                            <a class=\"mini-button\" style=\"width:80px;height:30px;\" iconCls=\"icon-remove\" onclick=\"KingofAttendances.domestic.revokeClick(" + o[i].REC_ID + ")\">\u64A4\u9500</a>\n                          </td>\n                      </tr>\n                      <tr align=\"center\">\n                          <td width=\"10%\" class=\"title\">\u51FA\u53D1\u5730</td>\n                          <td width=\"10%\">" + o[i].C3_526656511963 + "</td>\n                          <td width=\"10%\" class=\"title\">\u76EE\u7684\u5730</td>\n                          <td width=\"10%\">" + o[i].C3_526656512229 + "</td>\n                          <td width=\"10%\" class=\"title\">\u884C\u7A0B\u7C7B\u522B</td>\n                          <td width=\"10%\">" + o[i].C3_526656512808 + "</td>\n                          <td width=\"15%\" class=\"title\">\u51FA\u53D1\u65E5\u671F</td>\n                          <td width=\"20%\">" + o[i].C3_528048113321 + "</td>\n                      </tr>";
            $("#tbManage tbody").append(list);
            if (o[i].C3_528049541154 == "已提交") {
                $("#a_" + i).text("已提交").attr('onclick', '');
            }
        }
        this.addClick = function () {
            var win = mini.open({
                url: '../dist/component/dsetdata.html',
                showModal: false,
                width: 400,
                height: 450,
                onload: function () {
                    var iframe = this.getIFrameEl();
                    iframe.contentWindow.Setdbs(adbs, aappConfig);
                },
                ondestroy: function (action) {
                    parent.location.reload();
                }
            });
        };
        this.editClick = function (REC_ID) {
            var win = mini.open({
                url: '../dist/component/deditdata.html',
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
                o.C3_526656513243 = "Y";
                var json = mini.encode([o]);
                adbs.dbSavedata(aappConfig.domesticfilght.guoneiResid, 0, json, dataSaved, fnerror, fnhttperror);
                function dataSaved(text) {
                    alert("设置成功");
                }
                function fnerror(text) {
                    alert("设置失败");
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
                o.C3_528049577044 = "Y";
                var json = mini.encode([o]);
                adbs.dbSavedata(aappConfig.domesticfilght.guoneiResid, 0, json, dataSaved, fnerror, fnhttperror);
                function dataSaved(text) {
                    alert("设置成功");
                }
                function fnerror(text) {
                    alert("设置失败");
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
    };
};
