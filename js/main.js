
$(function() {
    Parse.initialize("Yeeo5YDal9Qmbzh4aCvvMLzUd3ralQW8qqOcx6Rn", "1QPi0d7rQLPM59c4FaP8VxwfMWJupQ8aNCcWNxNQ");
    
    $('#sidebar ul li:last').addClass('last');
    
    $('#sidebar ul li a').click(function() {
        $('#sidebar ul li a').removeClass('selected'); 
        $(this).addClass('selected'); 
    });
   
   $('#edit').click(function() {
        tinymce.init({
            selector: "#editor",
            width: $(window).width() - 315,
            height: 500,
            plugins: [
                 "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
                 "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
                 "save table contextmenu directionality emoticons template paste textcolor"
            ]
        });        
   });
                       
    $(window).resize(function(){
        $('#content').css('width', $(window).width() - 315);
        $('.mce-tinymce').css('width', $(window).width() - 315);
    });

    $(window).resize();
});