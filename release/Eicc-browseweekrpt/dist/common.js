var appConfig;
$.getJSON("./dist/app.config.json", function (data, textStatus, hr) { appConfig = data; });
var dbHelper = (function () {
    function dbHelper(baseurl, user, ucode) {
        this.saveMethod = "SaveData_Ajax";
        this.getMethod = "ShowHostTableDatas_Ajax";
        this.baseUrl = baseurl;
        this.user = user;
        this.ucode = ucode;
    }
    dbHelper.prototype.dbGetdata = function (resid, subresid, cmswhere, fnSuccess, fnError, fnSyserror) {
        var url;
        url = this.baseUrl + "&method=" + this.getMethod + "&user=" + this.user + "&ucode=" + this.ucode + "&resid=" + resid + "&subresid=" + subresid + "&cmswhere=" + cmswhere;
        $.ajax({
            url: url,
            dataType: "jsonp",
            jsonp: "jsoncallback",
            success: function (text) {
                if (text !== "") {
                    var data = mini.decode(text);
                    if (data.error == -1) {
                        if (fnError != null) {
                            fnError(data);
                        }
                    }
                    var adata = [];
                    var subdata = [];
                    adata = data.data;
                    if (data.subdata != null) {
                        subdata = data.subdata.data;
                    }
                    if (fnSuccess != null) {
                        fnSuccess(adata, subdata);
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (fnSyserror != null) {
                    fnSyserror(jqXHR, textStatus, errorThrown);
                }
            } });
    };
    dbHelper.prototype.dbSavedata = function (resid, subresid, json, fnSuccess, fnError, fnSyserror) {
        var url;
        url = this.baseUrl + "&method=" + this.saveMethod + "&user=" + this.user + "&ucode=" + this.ucode;
        $.ajax({
            url: url,
            async: false,
            dataType: "jsonp",
            jsonp: "jsoncallback",
            type: 'post',
            data: { data: json, resid: resid },
            cache: false,
            success: function (text) {
                if (text.error == "0") {
                    if (fnSuccess != null) {
                        fnSuccess(text);
                    }
                }
                else {
                    if (fnError != null) {
                        fnError(text);
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (fnSyserror != null) {
                    fnSyserror(jqXHR, textStatus, errorThrown);
                }
            }
        });
    };
    return dbHelper;
}());
var miniPanel = (function () {
    function miniPanel(element) {
        this.element = element;
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toLocaleTimeString();
    }
    miniPanel.prototype.start = function () {
        var _this = this;
        var jsonString = '{"messge": "ok","error":"-1"}';
        this.timerToken = setInterval(function () { return _this.span.innerHTML = new Date().toLocaleTimeString(); }, 500);
    };
    miniPanel.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    miniPanel.prototype.appendPanel = function (parentelement, panelid, mini, classname, title, url, fnload, expanded, iconCls) {
        this.mini_control = document.createElement('div');
        this.mini_control.id = panelid;
        this.mini_control.className = classname;
        this.mini_control.title = title;
        parentelement.appendChild(this.mini_control);
        mini.parse();
        var aPanel = mini.get(panelid);
        aPanel.set({ "width": "auto", "height": "400px", "iconCls": iconCls, "buttons": "collapse ", "expanded": expanded, "onbuttonclick": "onbuttonclick" });
        aPanel.load(url, function () {
            var iFrame = aPanel.getIFrameEl();
            fnload(iFrame);
        }, null);
    };
    return miniPanel;
}());
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}
function onbuttonclick(e) {
    if (e.name = "collapse") {
        setTimeout(function () {
            if (e.sender.expanded == true) {
                e.sender.set({ "height": "400px" });
            }
        }, 500);
    }
}
