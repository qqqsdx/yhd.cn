let baseUrl = "localhost/yhd.cn/src"; // 基础路径 必须是绝对路径

define(['jquery'],function(){
    class Banner {
        constructor() {
            this.pic = $('.ban_pic li');
            this.tab = $('.ban_tab li');
            this.index = 0;
            this.timer = null;
        }
        init() {
            let _this = this;
            this.tab.eq(0).addClass('active').siblings('li').removeClass('active');
            this.pic.eq(0).css({
                'opacity': 1,
                'z-index': 1
            }).siblings('li').css({
                'opacity': 0,
                'z-index': 0
            })
            this.tab.on('mouseover', function () {
                _this.index = $(this).index();
                $(this).addClass('active').siblings('li').removeClass('active');
                $('.ban_pic li').eq($(this).index()).css({
                    'opacity': 1,
                    'z-index': 1
                }).siblings('li').css({
                    'opacity': 0,
                    'z-index': 0
                })
                clearInterval(_this.timer);
            })
            this.tab.on('mouseout', function () {
                _this.autoplay($(this).index());
            })
            this.pic.on('mouseover',function(){
                clearInterval(_this.timer);
            })
            this.pic.on('mouseout',function(){
                _this.autoplay($(this).index());
            })
            this.autoplay($(this).index());
        }
        autoplay(index) {
            this.timer = setInterval(() => {
                index++;
                if (index > 1) {
                    index = 0;
                }
                $('.ban_tab li').eq(index).addClass('active').siblings('li').removeClass('active');
                $('.ban_pic li').eq(index).css({
                    'opacity': 1,
                    'z-index': 1
                }).siblings('li').css({
                    'opacity': 0,
                    'z-index': 0
                })
            }, 3000);
        }
    }
    return{
        b:new Banner,
        render: function() {
            $.ajax({
                type: "get",
                url: '../../interface/getall.php',
                dataType: "json",
                success: function(res) {
                    let temp = '';
                    res.forEach(elm => {
                        
                        let pic = JSON.parse(elm.pic);
                        temp += `<li class="goods">
                        <a href="./details.html?id=${elm.id}">
                        <div class="wrap">

                            <img src="../${pic.src}" alt="">
                            <div class="box clearfix">
                                <div class="title">${elm.title}</div>
                                <div class="price">¥
                                    <span>${elm.price}</span>
                                </div>
                        </div>
                        </a>
                            <div class="hover">
                                <div class="hover_btn hover_left">
                                    <a href="#">
                                        <i class="icon"></i>
                                    </a>
                                </div>
                                <div class="hover_btn hover_right">
                                    <a href="#">找相似</a>
                                </div>
                            </div>
                        </div>
                    </li>`;
                    });
        
                    $('.render_ul').html(temp);
        
                }
            });
        },
        countDown:function(){
            var intDiff = parseInt(21600);//倒计时总秒数量
            function timer(intDiff){
                window.setInterval(function(){
                var day=0,
                    hour=0,
                    minute=0,
                    second=0;//时间默认值		

                if(intDiff > 0){
                    day = Math.floor(intDiff / (60 * 60 * 24));
                    hour = Math.floor(intDiff / (60 * 60));
                    minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
                    second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);

                }
                if (hour <= 9) hour ='0'+ hour;
                if (minute <= 9) minute ='0'+ minute;
                if (second <= 9) second = '0' + second;
                $('.time_hours').html(hour);
                $('.time_minit').html(minute);
                $('.time_second').html(second);
                intDiff--;
                }, 1000);
            } 

            $(function(){

                timer(intDiff);
            
            });	

        }
    }
})

