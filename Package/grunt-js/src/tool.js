/*
 * Array 数组删除某下标节点
 */
Array.prototype.del=function(dx)
{
    if(isNaN(dx)||dx>this.length){return false;}
    for(var i=0,n=0;i<this.length;i++)
    {
        if(this[i]!=this[dx])
        {
            this[n++]=this[i]
        }
    }
    this.length-=1
};


/*
 * 公共函数  [0,1,2]  --->  0,1,2
 * 添加时间点
 */
function arrToStr(arr){
    var tmpStr = "";
    for(var i=0;i<arr.length;i++){
        tmpStr += arr[i]+",";
    }
    return tmpStr.substring(0,tmpStr.length-1).split(",");
}

/*
 * 排序时间点
 * @param1 timeStr 例：00:00,02:00,04:00
 * @param2 pointStr 例：00:00
 * return 时间数组  例：[00:00-02:00,02:00-04:00]
 */
function timeStrToArrBySort(){
    if(arguments.length == 1){
        var tmpArr = arguments[0].split(",");
        tmpArr.sort();
        return timeStrToArr(tmpArr);
    }

    else if(arguments.length == 2){
        var tmpArr = arguments[0].split(",");
        for(var i in tmpArr){
            if(arguments[1]!==tmpArr[i]){
                alert("请不要重复添加时间切割点.");
                tmpArr.sort();
                return strToArr(tmpArr);
            }
        }
        tmpArr.push(arguments[1]);
        tmpArr.sort();
        return timeStrToArr(tmpArr);
    }
    return tmpArr;
}


/*
 * 不排序时间点
 * @param1 arr 例：00:00,02:00,04:00
 * return 时间数组  例：[00:00-02:00,02:00-04:00]
 */
function timeStrToArr(arr){
    var tmpStr = "";
    for(var i =0 ; i<arr.length;i++){
        if( arr[i+1] != null || typeof(arr[i+1]) != "undefined"){
            tmpStr += ""+arr[i]+"-"+arr[i+1]+",";
        }
    }
    var arr = tmpStr.substring(0,tmpStr.length-1).split(",");

    return arr;
}