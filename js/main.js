var edit_mode = false;

$(function() {
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
    
    var fillList = function() {
        var t = '<ul>';
        t = t + '{{#each pages}}';
        t = t + '<li>';
        t = t + '<a href="#">';
        t = t + '<div class="title">{{title}}</div>';
        t = t + '<div class="last_update">{{lastUpdate}}</div>';
        t = t + '</a>';
        t = t + '</li>';
        t = t + '{{/each}}';
        t = t + '</ul>';
        
        GetPages(function(collection) {
            if (collection) {
                $('#sidebar').html(renderTemplate(t, collection));
            }
        });
    };

    fillList();
});

var renderTemplate = function(html, context) {
    var template = Handlebars.compile(html);
    var compiledTemplate = template(context);
    
    return compiledTemplate;
};

function edit() {
    if (edit_mode) {
        edit_mode = false;    
        $('#edit span').html('Edit');
        $('#edit').removeClass('btn-primary');
        $('#edit i').removeClass('icon-white');
        tinymce.remove(tinymce.activeEditor);
        $('.mce-tinymce').remove();
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
                "insertdatetime media table contextmenu paste"
            ],
            toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image"
        });   
        
    }
}