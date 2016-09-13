var KingofAttendances = KingofAttendances || {};
KingofAttendances.ShiftSupervisor = new function () {
    var shiftSupervisor = this;
    var dbs;
    var appConfig;
    shiftSupervisor.setData = function (data, adbs, aappConfig) {
        var o = data[0];
        dbs = adbs;
        appConfig = aappConfig;
        $("#spCount").html(data[0].C3_525716459309);
        $("#spHour").html(data[0].C3_526577949788);
        $("#spDate").html(data[0].C3_525698252634 + "~" + data[0].C3_526580236305);
        $("#spPervisor").html(data[0].C3_525697777450);
        $("#spMonth").html(data[0].C3_525698252852);
        $("#spManage").html(data[0].C3_525697777887);
        if (data[0].C3_526393560160 == "Y") {
            $("#isIllegal").html("超标");
            var list = "<tr>" +
                "<td class='title'>超标原因类型</td>" +
                "<td colspan=2><input class='mini-combobox' style='width:100%;'   name='C3_526393593762' textField='C3_526765634258' valueField='C3_526765634258' id='cbReasons' showNullItem='true' allowInput='true'/></td>" +
                "<td><span lang='EN-US' style='color:#0070C0' </span>" +
                "</td></tr><tr>" +
                "<td class='title'>超标原因描述" + "</td><td  colspan=2>" +
                "<input style='width:100%'  name='C3_526416460460' class='mini-textarea'  />" +
                "</td><td  >" +
                "<a class='mini-button' id='asave' onclick='KingofAttendances.ShiftSupervisor.saveData' >超标申请</a></td></tr>";
            $("#tbsupervisor tbody").append(list);
            var resid = appConfig.app.dic1Resid;
            var subresid = "";
            var cmswhere = "";
            dbs.dbGetdata(resid, 0, cmswhere, fnSuccess, null, null);
            function fnSuccess(data, subdata) { mini.parse(); mini.get("cbReasons").set({ "data": data }); }
        }
        else {
            $("#isIllegal").html("正常");
        }
        if (data[0].C3_526393734192 == "Y") {
            mini.parse();
            mini.get("asave").set({ "text": "已申请" });
            mini.get("asave").enabled = false;
        }
        mini.parse();
        new mini.Form("form1").setData(o);
    };
    shiftSupervisor.saveData = function () {
        var o = new mini.Form("form1").getData();
        o.C3_526393734192 = "Y";
        o._id = 1;
        o._state = "modified";
        var json = mini.encode([o]);
        dbs.dbSavedata(appConfig.shifrpttofsuper.resid, 0, json, dataSaved, fnerror, fnhttperror);
        function dataSaved(text) {
            alert("申请成功");
            mini.get("asave").set({ "text": "已申请" });
            mini.get("asave").enabled = false;
        }
        function fnerror(text) {
            alert("申请失败");
        }
        function fnhttperror(jqXHR, textStatus, errorThrown) {
            alert("error");
        }
    };
    shiftSupervisor.setData2 = function (data, bdbs, aappConfig) {
        dbs = bdbs;
        appConfig = aappConfig;
        $("#proLine").html(data[0].C3_525642615889);
        $("#spHour").html(data[0].C3_526578100819);
        $("#spCount").html(data[0].C3_525715678864);
        $("#spDate").html(data[0].C3_525698130095 + "~" + data[0].C3_526580176792);
        $("#spMonth").html(data[0].C3_525698192994);
        $("#spMaster").html(data[0].C3_525715020942);
        var o = data[0];
        if (data[0].C3_526410163545 == "Y") {
            $("#isIllegal").html("超标");
            var list = "<tr ><td class='title' colspan='4'  >" +
                "<a class='mini-button' id='asp' onclick='KingofAttendances.ShiftSupervisor.saveData2' >超标审批</a></td></tr>";
            var a = list;
            $("#tbLineleader tbody").append(list);
            if (data[0].C3_526410202841 == "Y") {
                mini.parse();
                mini.get("asp").set({ "text": "已审批" });
                mini.get("asp").enabled = false;
            }
        }
        else {
            $("#isIllegal").html("正常");
        }
        mini.parse();
        new mini.Form("form1").setData(o);
        return;
    };
    shiftSupervisor.saveData2 = function () {
        var url = $("#hfurl").val();
        var o = new mini.Form("form1").getData();
        o._id = 1;
        o._state = "modified";
        o.C3_526410202841 = "Y";
        var json = mini.encode([o]);
        dbs.dbSavedata(appConfig.shifrpttofsuper.subresid, 0, json, dataSaved, fnerror, fnhttperror);
        function dataSaved(text) {
            alert("审批成功");
            mini.get("asp").set({ "text": "已审批" });
            mini.get("asp").enabled = false;
        }
        function fnerror(text) {
            alert("审批失败");
        }
        function fnhttperror(jqXHR, textStatus, errorThrown) {
            alert("error");
        }
    };
};
