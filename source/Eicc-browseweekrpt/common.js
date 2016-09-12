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
            data: { data: json, resid: 526415710928 },
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
