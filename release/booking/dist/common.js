var appfunctions = appfunctions || {};
var appConfig;
appfunctions.uploadFile = new function () {
    var uploadFile = this;
    this.swfFileUpload = function (aappConfig, fileupload) {
        fileupload.setUploadUrl(aappConfig.app.uploadFileUrl + "?savepath=d:\\web\\rispweb\\upfiles&httppath=" + aappConfig.app.httppath);
        fileupload.startUpload();
    };
    this.ajaxFileUpload = function (aappConfig, inputFile) {
        mini.parse();
        scriptLoaded();
        function scriptLoaded() {
            $.ajaxFileUpload({
                url: aappConfig.app.uploadFileUrl,
                fileElementId: inputFile,
                data: { savepath: "d:\\web\\rispweb\\upfiles" },
                dataType: 'json',
                success: function (data, status) {
                    if (data) {
                        alert("上传成功: " + data);
                    }
                    else {
                        alert("上传成功,无返回信息 ");
                    }
                },
                error: function (data, status, e) {
                },
                complete: function () {
                    var jq = $("#file1 > input:file");
                    jq.before(inputFile);
                    jq.remove();
                }
            });
        }
    };
};
var dbHelper = (function () {
    function dbHelper(baseurl, user, ucode) {
        this.saveMethod = appConfig.app.saveMethod;
        this.getMethod = appConfig.app.getMethod;
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
    function miniPanel() {
    }
    miniPanel.prototype.stop = function () {
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
