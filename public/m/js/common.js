var getKey=function(){

    var arr=window.location.search.replace('?','').split('&');
    var obj={};
    for(var i=0;i<arr.length;i++){
        var arrtemp= arr[i].split('=');
        obj[arrtemp[0]]=arrtemp[1];
    }
   
  return obj;

}