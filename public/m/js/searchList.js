$(function () {
    /*区域滚动*/
    mui('.mui-scroll-wrapper').scroll({
        indicators:false
    });
     // 1.获取地址栏关键字
     var urlParam=getKey();
   
     var $input=$('input').val(urlParam.key || '');
     // 2.通过关键字去后台获取和关键字相关的商品数据
      $('.ct_search a').on('tap',function(){
        var key=$.trim($input.val());
        if(!key){
            mui.toast('请输入关键字');
            return false;
        } 
        var params={
            proName:key,
            page:1,
            pageSize:4

         };
          
         getKeyData( params,function(data){
            console.log(data);
            $('.ct_product').html(template('searchPro',data));
        });
      })
     $('.ct_order a').on('tap',function(){
       
        var key=$.trim($input.val());
        if(!key){
            mui.toast('请输入关键字');
            return false;
        }
         if($(this).hasClass('now')){
           if($(this).find('span').hasClass('fa-angle-down')){
               $(this).find('span').removeClass('fa-angle-down').addClass('fa-angle-up');
           } else{
            $(this).find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
         };
         }else{
            $(this).addClass('now').siblings().removeClass('now');
         };
        
         var order=$(this).attr('data-order');
         var oderVal=$(this).find('span').hasClass('fa-angle-up')?1:2;
         var params={
            proName:key,
            page:1,
            pageSize:4

         };
         params[order]=oderVal;
         getKeyData( params,function(data){
           
            $('.ct_product').html(template('searchPro',data));
        });

     });
    
			mui.init({
				pullRefresh: {
					container: '.mui-scroll-wrapper',
					down: {
                        auto: true,
						callback:
                            function(){  setTimeout(function() {
                                
                                var key = $.trim($input.val());
                                if (!key) {
                                    mui.toast('请输入关键字');
                                    return false;
                                }
                                $('.ct_order a').removeClass('now').find('span').removeClass('fa-angle-up');
                            getKeyData({
                                proName:key,
                                page:1,
                                pageSize:4
                            },function(data){
                               
                               
                              
                             $('.ct_product').html(template('searchPro',data));    
                            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh(true); //refresh completed 
                         }) }, 1500);
                        }
                            
                         
					},
					up: {  contentrefresh : "正在加载...",  
                        callback:
                        function(){     
                        window.page++;
                            var key = $.trim($input.val());
                            if (!key) {
                                mui.toast('请输入关键字');
                                return false;
                            };
                            var order = $('.ct_order a.now').attr('data-order');
                            var orderVal = $('.ct_order a.now').find('span').hasClass('fa-angle-up') ? 1 : 2;
                            /*获取数据*/
                            var params = {
                                proName: key,
                                page: window.page,
                                pageSize: 4
                                /*排序的方式*/
                            };
                            params[order] = orderVal;
                            getKeyData(params ,function(data){ setTimeout(function() {
                             
                            if(data.data.length){
                                console.log(data);
                                $('.ct_product').append(template('searchPro',data)); 
                                mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
                            }else{  
                                
                                return false ;
                            }
                         //refresh completed 
                     }) }, 1500);
                    }

                        }
					}
				 
			});
			/**
			 * 下拉刷新具体业务实现
			 */
		 
		 
			 
 
		
    /*  mui.init({
        pullRefresh : {
            container:"#refreshContainer",
          down : {
            auto: true,  
            contentrefresh : "正在刷新...",          
            callback :function(){ 
                 
            setTimeout(function(){
                console.log('12')
             $('.ct_order a').removeClass('now').find('span').removeClass('fa-angle-up');
             getKeyData({
                proName:urlParam.key,
                page:currentPage,
                pageSize:4
            },function(data){
                
                $('.ct_product').html(template('searchPro',data));
            });
             
            mui('#refreshContainer').pullRefresh().endPulldownToRefresh(); //refresh
            },1000);
           
            }
          },
          up : {
            auto: true,            
            callback :function(){
                currentPage++;
                getKeyData({
                    proName:urlParam.key,
                    page:currentPage+1,
                    pageSize:4
                },function(data){
                    setTimeout(function(){
                        
                        $('.ct_product').html(template('searchPro',data));
                       
                         
                    },1000)
                   
                });  
            }
          }
        }
      }); */
});

 

 

     var getKeyData=function(param,callback){
        $.ajax({
            url:"/product/queryProduct",
            type:'get',
            data:param,
            dataType:'json',
            success:function(data){
                window.page=data.page; 
                callback && callback(data);
            }
        })
    };