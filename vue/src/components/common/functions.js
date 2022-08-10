import store from "@/store";
var Buffer = require('buffer').Buffer;

export function params(param){
    var _param=JSON.parse(JSON.stringify(param));
    _param.token=store.getters.user_info.user_token;
    return _param;
}

export function formdata_params(formData){
    formData.append("token", new Blob([new TextEncoder().encode(store.getters.user_info.user_token)], {type:"application/json;charset=utf-8"}));
    return formData;
}

export function get_today_str(offset) {
    var x = new Date();
    x.setDate(x.getDate() - offset);
    var y = x.getFullYear().toString();
    var m = (x.getMonth() + 1).toString();
    var d = x.getDate().toString();
    d.length == 1 && (d = "0" + d);
    m.length == 1 && (m = "0" + m);
    return y + "-" + m + "-" + d;
}

export function blobToBase64(blob) {
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
}

export function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

export function create_short_UUID(){
    var short_uuid=create_UUID();
    var bytes = []; 
    for (var i = 0; i < short_uuid.length; ++i) {
        var code = short_uuid.charCodeAt(i);
        bytes = bytes.concat([code]);
    }
    var j=1;
    bytes.forEach((b)=>{
        j = j * (parseInt(b) + 1);
    });

    var x = new Date();
    x.setDate(x.getDate());
    var y = x.getFullYear().toString();
    var m = (x.getMonth() + 1).toString();
    var d = x.getDate().toString();
    var h = x.getHours().toString();
    var min=x.getMinutes().toString();
    d.length == 1 && (d = "0" + d);
    m.length == 1 && (m = "0" + m);
    h.length == 1 && (h = "0" + h);
    min.length == 1 && (min = "0" + min);
    var yyyymmdd = y + "" + m + "" + d;
    return yyyymmdd+"-"+h+j.toString(16).toUpperCase().substring(0,10) 
}


export function datediff(start, end) {
    return Math.round((end-start)/(1000*60*60*24));
}

export function isMobile() {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true;
    } else {
        return false;
    }
}

export function b64toBlob(b64Data, contentType='', replaceString='', sliceSize=512){
    
    var byteCharacters = new Buffer(b64Data.replace(replaceString, "")).toString('base64')
    var byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
  
    return new Blob(byteArrays, {type: contentType});
}