var edit_mode = false;

$(function() {
    Parse.initialize("Yeeo5YDal9Qmbzh4aCvvMLzUd3ralQW8qqOcx6Rn", "1QPi0d7rQLPM59c4FaP8VxwfMWJupQ8aNCcWNxNQ");
    
    $('#sidebar ul li:last').addClass('last');
    
    $('#sidebar ul li a').click(function() {
        $('#sidebar ul li a').removeClass('selected'); 
        $(this).addClass('selected'); 
    });
   
   $('#edit').click(function() {
     edit();
   });
                       
    $(window).resize(function(){
        $('#content').css('width', $(window).width() - 315);
        $('.mce-tinymce').css('width', $(window).width() - 315);
    });

    $(window).resize();
});

function edit() {
    if (edit_mode) {
        edit_mode = false;    
        $('#edit span').html('Edit');
        $('#edit').removeClass('btn-primary');
        tinyMCE.execCommand('mceFocus', false, 'editor');                    
        tinyMCE.execCommand('mceRemoveControl', false, 'editor');
    } else {
        edit_mode = true;
        $('#edit span').html('Save');
        $('#edit').addClass('btn-primary');
        
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
        
    }
}