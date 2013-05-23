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
        $('#edit i').removeClass('icon-white');
        // tinymce.activeEditor.destroy();

    } else {
        edit_mode = true;
        $('#edit span').html('Save');
        $('#edit').addClass('btn-primary');
        $('#edit i').addClass('icon-white');
        
        tinymce.init({
            selector: "#editor",
            width: $(window).width() - 315,
            height: 525,
            plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table contextmenu paste moxiemanager"
            ],
            toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image"
        });   
        
    }
}