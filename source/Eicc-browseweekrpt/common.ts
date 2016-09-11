
 class dbHelper {
    baseUrl:string;
    saveMethod:string="SaveData_Ajax";
    getMethod:string="ShowHostTableDatas_Ajax";
   constructor(baseurl:string)
   {
       this.baseUrl=baseurl;
   }
   dbGetdata(user:string ,ucode:string,resid:number,subresid:number,cmswhere:string,fnSuccess:any,fnError:any,fnSyserror:any) {
   var url : string;
   url=this.baseUrl+"&method="+this.getMethod+"&user="+user+"&ucode="+ucode+"&resid="+resid+"&subresid="+subresid+"&cmswhere="+cmswhere;
 
    $.ajax({
            url: url,
            dataType:"jsonp",
            jsonp: "jsoncallback",
            success: function (text) {
                if (text !== "") {    
                    var data = mini.decode(text);
                     
                    if (data.error == -1) {
                     if (fnError!=null)
                     {fnError(data);}
                       
                    }
                    var adata = [];
                    var subdata=[];
                    adata = data.data;
                    if (data.subdata!=null){subdata=data.subdata.data;}
                    
                     if (fnSuccess!=null)
                     {fnSuccess(adata,subdata);}

                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                 
                 if (fnSyserror!=null)
                     { fnSyserror(jqXHR, textStatus, errorThrown);}
            });
  
 }
}