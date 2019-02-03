$(function () {
    $.ajax({
        url: '/category/queryTopCategory',
        type: 'GET',
        data: '',
        datatype: 'json',
        success: function (data) {
            var cataHtml = template('firstTemplate', data);
            console.log(data);
            $('.cate_left ul').html(cataHtml);
            if (data.rows.length) {
                var id = data.rows[0].id;
                secondCata(id);
            }
            $('.cate_left ul').find('a').on('click', function () {

                var id = $(this).attr('data-id');
                secondCata(id)
                $('.cate_left ul li').removeClass('now');
                $(this).parent().addClass('now')
            })
        }

    });




})

function secondCata(id) {
    $.ajax({
        url: '/category/querySecondCategory',
        type: 'GET',
        data: {
            id: id
        },
        datatype: 'json',
        success: function (data) {
console.log(data);
            var catalistHtml = template('secondTemplate', data);
            console.log(data);
            $('.cate_right ul').html(catalistHtml);
        }
    });
}