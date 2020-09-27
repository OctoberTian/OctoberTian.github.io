$(function () {
    $('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});

jQuery(document).ready(function ($) {
    // 显示日期
    showDate();
    // 加载日记短摘
    $.getJSON("./json/diary.json", function (data){
        let diaryContent = "";
        let pictureContent = "";
        data.forEach((item) => {
            if (item.image == null || item.image == '') {
                diaryContent += "               <div class=\"cd-timeline-block\">\n" +
                    "                            <div class=\"cd-timeline-img cd-picture\">\n" +
                    "                                <img src=\"images/" + (Math.floor(Math.random()*3)+1) +".png\" alt=\"Picture\">\n" +
                    "                            </div>\n" +
                    "                            <div class=\"cd-timeline-content service-box-content\">\n" +
                    "                                <h2>【"+item.date + "】"+ item.title +"</h2>\n" +
                    "                                <p>" + item.content +"</p>\n" +
                    "                            </div>\n" +
                    "                        </div>";
            } else {
                pictureContent +=
                    "<div class=\"cd-timeline-block\">\n" +
                    "  <div class=\"cd-timeline-img cd-picture\">\n" +
                    "    <img src=\"images/camera-icon.png\" alt=\"Picture\">\n" +
                    "  </div>\n" +
                    "  <div class=\"cd-timeline-content projects\">\n" +
                    "    <img src=\"" + item.image + "\" alt=\"\">\n" +
                    "    <div class=\"project-content\">\n" +
                    "      <h2>【"+item.date + "】"+ item.title +"</h2>\n" +
                    "      <span>" + item.content + "</span>\n" +
                    "    </div>\n" +
                    "  </div>\n" +
                    "</div>";
            }
        });
        document.getElementById('cd-timeline').innerHTML = diaryContent;
        document.getElementById('cd-timeline-2').innerHTML = pictureContent;
    });
    //hide timeline blocks which are outside the viewport
    var $timeline_block = $('.cd-timeline-block');
    $timeline_block.each(function () {
        if ($(this).offset().top > $(window).scrollTop() + $(window).height() * 0.75) {
            $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
        }
    });
    //on scolling, show/animate timeline blocks when enter the viewport
    $(window).on('scroll', function () {
        $timeline_block.each(function () {
            if ($(this).offset().top <= $(window).scrollTop() + $(window).height() * 0.75 && $(this).find('.cd-timeline-img').hasClass('is-hidden')) {
                $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
            }
        });
    });
});

function submitForm() {
    var date = getInputValue('date');
    var title = getInputValue('title');
    var content = getInputValue('content');
    var image = getInputValue('image');
    document.getElementById("about").style = "display: none;";
    document.getElementById("createJson").style = "display: block;";
    document.getElementById("createJson").innerHTML = "<div style='width: 400px;'>" +
        "{<br>" +
        "   \"date\":" + "&nbsp;\"" + date + "\",<br>" +
        "   \"title\": " + "&nbsp;\"" + title + "\",<br>" +
        "   \"content\":" + "&nbsp;\""+ content + "\",<br>" +
        "   \"image\":" + "&nbsp;\""+ image + "\"<br>" +
        "}" +
        "</div>";
}

function getInputValue(id) {
    return document.getElementById(id).value;
}

function showDate() {
    var today = new Date();//定义日期对象
    var yyyy = today.getFullYear();//通过日期对象的getFullYear()方法返回年
    var MM = today.getMonth() + 1;//通过日期对象的getMonth()方法返回年
    var dd = today.getDate();//通过日期对象的getDate()方法返回年
    var hh = today.getHours();//通过日期对象的getHours方法返回小时
    var mm = today.getMinutes();//通过日期对象的getMinutes方法返回分钟
    var ss = today.getSeconds();//通过日期对象的getSeconds方法返回秒
    // 如果分钟或小时的值小于10，则在其值前加0，比如如果时间是下午3点20分9秒的话，则显示15：20：09
    document.getElementById('nowDateTimeSpan').innerHTML = yyyy + "." + MM + "." + dd;
    document.getElementById('nowDateTimeSpan2').innerHTML = yyyy + "." + MM + "." + dd;
    document.getElementById('date').value = yyyy + "." + MM + "." + dd;
    document.getElementById('title').value = "无题";
}

$(".navbar-collapse").css({ maxHeight: $(window).height() - $(".navbar-header").height() + "px" });

