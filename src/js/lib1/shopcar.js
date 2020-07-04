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
                                <div class="p-del" aaa='${elm.id}'>
                                    <a href="javascript:;">删除</a>
                                </div>
                            </li>`;

                        });
                        $('.xr').append(tempstr);
                        function qqq(){
                            let n=0;
                           
                            
                            for(let i=0;i<$('.p-price-sum').length;i++){
                                let numadd=$($('.p-price')[i]).text()*$($('.input')[i]).val()
                                if($($(':checkbox')[i]).prop('checked')){
                                    $($('.p-price-sum')[i]).text(numadd.toFixed(2));
                                    n+=parseInt($($('.p-price-sum')[i]).text());
                                }
                                
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
                            let rem=$(this).attr('aaa');//获取属性值(cookie里存的id)
                            let coo=[];//创建数组用于存没有被删除的元素
                            shop.forEach(elm=>{//循环遍历判断删除指定的数据
                                if(elm.id!==rem){
                                    coo.push(elm);
                                }
                            })
                            cookie.set('shop', JSON.stringify(coo), 1);//提交cookie数据
                            window.location.reload();//刷新页面
                        })
                        

                        // console.log($(':checkbox').prop('checked'));
                        $('.allselector').on('click',function(){
                            let chcked=$(this).prop('checked');
                            if(chcked){
                                for (let i = 0; i < $(':checkbox').length-1; i++) {
                                    $($(':checkbox')[i]).prop('checked',true);
                                }
                            }else{
                                for (let i = 0; i < $(':checkbox').length-1; i++) {
                                    $($(':checkbox')[i]).prop('checked',false);
                                }
                            }
                        })
                        if($('.allselector').prop('checked')){
                            for (let i = 0; i < $(':checkbox').length-1; i++) {
                                $($(':checkbox')[i]).prop('checked',true);
                            }
                            qqq();
                        }
                        $(':checkbox').on('click',function(){
                            let num=0;
                            for (let i = 0; i < $(':checkbox').length-1; i++) {
                                $($(':checkbox')[i]).prop('checked');
                                num+= $($(':checkbox')[i]).prop('checked');
                            }
                            if(num==$(':checkbox').length-1){
                                $('.allselector').prop('checked',true);
                            }else{
                                $('.allselector').prop('checked',false);
                            }
                            qqq();
                        })
                    }
                });
            }

            
        }
    }
});