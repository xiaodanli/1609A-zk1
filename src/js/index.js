$(function(){
    

    $.ajax({
        url:'/api/swiper',
        dataType:'json',
        success:function(res){
            console.log(res);
            if(res.code === 1){
                //渲染swiper
                renderSwiper(res.data);
            }
        }
    })

    function renderSwiper(data){
        var str = '';
        data.forEach(function(item){
            str += `
                <div class="swiper-slide">`
            str += renderDl(item.list);        
            str += `</div>`;
        });

        $('.swiper-wrapper').html(str);

        new Swiper('.swiper-container');
    }

    function renderDl(list){
        return list.map(function(item){
            return `
                <dl>
                    <dt>
                        <img src="${item.url}" alt="">
                    </dt>
                    <dd>${item.title}</dd>
                </dl>
                `
        }).join('')
    }
})