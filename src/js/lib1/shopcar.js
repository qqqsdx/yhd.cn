let baseUrl = "localhost/yhd.com"; // 基础路径 必须是绝对路径

define(['jquery', 'cookie'], function($, cookie) {
    return {
        render: function() {
            let shop = cookie.get('shop'); //   获取cookie数据
            
            if (shop) {
                shop = JSON.parse(shop);
                let idlist = shop.map(elm => elm.id).join();
                $.ajax({
                    type: "get",
                    url: `../../interface/shop.php`,
                    data: {
                        idlist: idlist
                    },
                    dataType: "json",
                    success: function(res) {
                        let tempstr = '';

                        res.forEach(elm => {
                            let pic = JSON.parse(elm.pic);
                            
                            // cookie中获取 于当前从数据库中遍历出的相同元素
                            let arr = shop.filter(val => val.id == elm.id);
                            tempstr += `
                            <li class="item">
                                <div class="c-box">
                                    <input type="checkbox" id="p1">
                                </div>
                                <div class="p-pic">
                                    <img src="../${pic.src}" alt="../${pic.title}">
                                </div>
                                <div class="p-title">
                                    ${elm.title}

                                </div>
                                <div class="p-price">
                                   ${elm.price}
                                </div>
                                <div class="num_act clearfix"> 
                                <a href="javascript:;" class="minus unable"  >−</a> <input type="text" class="input" value="${arr[0].num}" > <a href="javascript:;" class="add">+</a> 
                                </div>
                                <div class="p-price-sum">
                                    ${(arr[0].num*elm.price).toFixed(2)}
                                </div>
                                <div class="p-del">
                                    <a href="javascript:;">删除</a>
                                </div>
                            </li>`;

                        });
                        
                        $('.xr').append(tempstr);
                        function qqq(){
                            let n=0;
                            
                            
                            for(let i=0;i<$('.p-price-sum').length;i++){
                                n+=parseInt($($('.p-price-sum')[i]).text());
                            }
                            $('.money b').html(n);
                        }
                        qqq();
                        $('.minus').on('click',function(){
                            
                            let num=$(this ).next().val();
                            if(num>1){
                                num--;
                            }else{
                                num=1;
                            }
                            $(this ).next().val(num);
                            qqq();
                            
                        })
                        $('.add').on('click',function(){
                            let num=$(this ).prev().val();
                            if(num<66){
                                num++;
                            }else{
                                num=66;
                            }
                            $(this ).prev().val(num);
                            qqq();
                        })
                        $('.p-del').on('click',function(){
                            console.log($(this).parent());
                            
                        })
                    }
                });
            }

            
        }
    }
});