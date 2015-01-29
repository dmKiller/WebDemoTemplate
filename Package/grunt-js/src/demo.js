/*
 * CmccTime Obj
 */

function CmccTime(arr) {
    this.timeArr = arr;
}

CmccTime.prototype.render = function () {
    this._initData();
};

CmccTime.prototype._initData = function () {

    $(".cal-time-item").remove();
    $(".cal-time").append("<div class='cal-time-item'></div>");
    var arr = this.timeArr;
    //页面加载数据元素
    var temStr = "";
    for (var i=0;i<arr.length; i++) {
        temStr += "<div>"+arr[i]+"</div>";
    }
    $(".cal-time-item").html(temStr);

    initTimeData({
        length: arr.length,
        timeClassName: 'cal-time-item',
        arrowLeftClassName: 'cal-time-arrow-left',
        arrowRighClasstName: 'cal-time-arrow-right',
        autoPlay: true     //暂未开发
    });


    /*
     * json 数据
     * @param length：数据长度
     * @param timeClassName：轮播控件Class名称
     * @param arrowLeftClassName：左侧箭头Class名称
     * @param arrowRighClasstName：右侧箭头Class名称
     * return 显示页面中呈现的数据长度
     */
    function initTimeData(json) {

        this.timeClassName = json.timeClassName;
        this.arrowLeftClassName = json.arrowLeftClassName;
        this.arrowRighClasstName = json.arrowRighClasstName;
        this.autoPlay = json.autoPlay;

        var $time = $("."+ this.timeClassName);
        var $arrowLeft = $("."+ this.arrowLeftClassName);
        var $arrowRigh = $("."+ this.arrowRighClasstName);
        var length = json.length;       //数据长度
        var showLength = 1;     //呈现数据个数        1：index  3：index＋1  5：index＋2

        if(length == 0) {
            console.log("空数据");
            return;
        }else if(length >= 1 && length < 4) {
            showLength = 1;
        }else{
            showLength = 3;
        }


        $time.slick({
            slidesToShow: showLength,
            arrows: false,
            focusOnSelect: true,
            draggable: false
        });


        $arrowLeft.on("click", function () {
            var index = getIndex("prev");
            console.log(getIndexStr(index));
            showServiceData(index);
        });

        $arrowRigh.on("click", function () {
            var index = getIndex("next");
            console.log("---");
            console.log(index);
            console.log(getIndexStr(index));
            showServiceData(index);
        });


        function getIndex(Direction){
            itemTurn();
            if(Direction == "prev"){
                $time.slickPrev();
            }else{
                $time.slickNext();
            }
            switch (showLength){
                case 1:
                    return $time.slickCurrentSlide();
                case 3:
                    return $time.slickCurrentSlide()+1;
            }
        }

        function itemTurn(){
            $('.cal-select-flag').addClass("cal-select-turn");
            setTimeout(function () {
                $('.cal-select-flag').removeClass("cal-select-turn");
            },300);
        }

        //初始化
        switch (showLength){
            case 1:
                showServiceData(0);
                break;
            case 3:
                showServiceData(1);
                break;
        }

        return showLength;
    }
};

CmccTime.prototype.getData = function () {
    return this.timeArr;
};


/*
 * 每一次切换时间后执行函数
 * @param index 原始时间数组中第索引 0开始
 */
function initBasicData(){
    var showDay = arguments[0];
    var cuttingTimes = arguments[1];
    var serviceDataJson = arguments[2];

    $("#timeDay").html(showDay);     //初始化呈现日期
    $("#timeArr").val(cuttingTimes);        //初始化timeArr
    $("#timeModalArr").val(cuttingTimes);       //初始化timeModalArr
    $("#serviceDataJson").val(JSON.stringify(serviceDataJson));       //初始化数据源

    initDateChoose();       //加载时间插件 和 时分选择配置

    var timeArray = new CmccTime( timeStrToArrBySort($("#timeArr").val()) );
    timeArray.render();     //初始化时间展示*/

    initDetailModal();      //加载细节表格数据
}


/*
 * 查看详单modal
 */
function initDetailModal(){
    $("#startTime").datetimepicker({
        language:'zh-CN',
        format: 'yyyy-mm-dd hh:ii',
        autoclose: 1
    });
    $("#endTime").datetimepicker({
        language:'zh-CN',
        format: 'yyyy-mm-dd hh:ii',
        autoclose: 1
    });
    $(document).on("click",".item-count",function(){
        $('#detailModal').modal('show')
    });
}



/*
 * 每一次切换时间后执行函数
 * @param index 原始时间数组中第索引 0开始
 */
function showServiceData(idx){
    var serviceData = JSON.parse($("#serviceDataJson").val());      //获取json字符串
    if( idx == serviceData.length) idx = 0;
    if(serviceData[idx] !== null || typeof (serviceData[idx]) != "undefined"){
        var json = serviceData[idx];
        var fontClass;
        for( var i in json.data){
            fontClass = "";
            if(json.data[i] < 60){
                fontClass = "font-red";
            }else if(json.data[i] <=80 && json.data[i]>=60){
                fontClass = "font-orange";
            }else{
                fontClass = "font-green"
            }
            $("[service-name = "+i+"]").removeClass();
            $("[service-name = "+i+"]").addClass(fontClass);
            $("[service-name = "+i+"]").html(json.data[i]+"<em> %</em>");
        }
    }else{
        console.log("error");
    }
    $("#header-time-select").val(idx);

    //console.log(idx);
    //console.log($(".slick-slide[index="+idx+"]").html());
}


/*
 * 获取当前选中时间字符
 * @param index 原始时间数组中第索引 0开始
 */
function getIndexStr(idx){
    var serviceData = JSON.parse($("#serviceDataJson").val());
    if( idx == serviceData.length) idx = 0;
    return serviceData[idx].time;
}

function changeTime(){
    var serviceData = JSON.parse($("#serviceDataJson").val());      //获取json字符串
    if(serviceData.length <= 3){
        $(".cal-time-item").slickGoTo($("#header-time-select").val());
    }else{
        var idx = 0;
        if( parseInt($("#header-time-select").val())-1 < 0){
            idx = serviceData.length - 1;
        }else{
            idx = parseInt($("#header-time-select").val())-1;
        }
        $(".cal-time-item").slickGoTo(idx);
    }

    showServiceData($("#header-time-select").val())
}


/*
 * Event
 * 打开modal
 */
function openTimeModal(){
    $("#hourPoint").val("00");
    $("#minPoint").val("00");
    $("#dayPoint").val($("#timeDay").html());
    $("#timeModalArr").val($("#timeArr").val());
    refreshTimePoint();     //刷新时间切割界面
    $('#cmccModal').modal('show')
}

/*
 * Event
 * 关闭modal
 */
function closeTimeModal(){
    $("#timeModalArr").val($("#timeArr").val());
}

/*
 * 时间初始化选择
 */
function initDateChoose(){


    //初始化select
    var serviceData = JSON.parse($("#serviceDataJson").val());
    var tmpStr = "";
    for( var i=0;i< serviceData.length; i++){
        tmpStr += "<option value="+serviceData[i].idx+">"+serviceData[i].time+"</option>";

    }
    $("#header-time-select").html(tmpStr);

    $("#dayPoint").val(new Date().Format("YYYY-MM-DD"));
    $("#dayPoint").datetimepicker({
        language:'zh-CN',
        format: "yyyy-mm-dd",
        todayBtn:true,
        endDate: new Date(),
        minView: 2,
        autoclose: 1
    });
    var hourStr = "";
    for(var i=0; i<24; i++ ){
        i = i<10? "0"+i : i;
        hourStr += "<option value='"+i+"'>"+i+"</option>";
    }
    $("#hourPoint").html(hourStr);

    var minStr = "";
    for(var i=0; i<59; i++ ){
        if(i%5 == 0){
            i = i<10? "0"+i : i;
            minStr += "<option value='"+i+"'>"+i+"</option>";
        }
    }
    $("#minPoint").html(minStr);



    //删除时间点
    $(document).on("click",".btn-delete-time",function(){
        var a =$(this).siblings("span").html().split("-");
        var tmpArr = $("#timeModalArr").val().split(",");
        for(var i=0; i<tmpArr.length; i++){
            if(tmpArr[i] == "00:00" || tmpArr[i] == "23:59") {
                continue;
            }
            if(tmpArr[i] == a[0] && tmpArr[i] || tmpArr[i] == a[1] && tmpArr[i]) {
                tmpArr.del(i);
            }
        }
        $("#timeModalArr").val(arrToStr(tmpArr));
        refreshTimePoint();     //刷新时间切割界面*/
    });
}


/*
 * 添加时间点
 */
function addTimePoint(){
    var hour = $("#hourPoint").val();
    var min = $("#minPoint").val();
    var pointStr = hour + ":" + min;

    //判断是否重复并重置数据
    if(!isRepeat(pointStr,$("#timeModalArr").val())){
        $("#timeModalArr").val($("#timeModalArr").val()+","+pointStr);  //保存临时数据
        refreshTimePoint();     //刷新时间切割界面
    }else {
        alert("请不要重复添加时间切割点");
    }

    //func
    function isRepeat(srcObj,desObj){
        var arr = desObj.split(",");
        for(var i=0;i<arr.length; i++){
            if(srcObj == arr[i]){
                return true;
            }
        }
        return false;
    }

}


/*
 * 刷新时间点
 * @param str 00:00
 */
function refreshTimePoint(){
    var tmpArr = timeStrToArrBySort( $("#timeModalArr").val() );
    $(".st-list-content").empty();
    for(var i=0;i<tmpArr.length;i++){
        $(".st-list-content").append("<li><span>"+tmpArr[i]+"</span>" +
        "<button type='button' class='btn btn-link btn-xs btn-delete-time'>&times;</button></li>");
    }
}

/*
 * 保存数据
 */
function saveTimeConfig(){

    $("#timeArr").val($("#timeModalArr").val());        //设置时间切割点
    $("#timeDay").html(new Date().getStDate($("#dayPoint").val()).Format("YYYY-MM-dd"));     //设置时间点

    var timeArray = new CmccTime(
        timeStrToArrBySort( $("#timeArr").val() )
    );
    timeArray.render();     //初始化时间展示
    $('#cmccModal').modal('hide');
}















