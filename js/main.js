var edit_mode = false;

$(function() {
    $('#add, #refresh').tooltip({ placement: 'bottom' });
    
    $('#sidebar ul li:last').addClass('last');
    
    $('#sidebar ul li a').click(function() {
        // todo: load page
        $('#sidebar ul li a').removeClass('selected'); 
        $(this).addClass('selected'); 
    });
   
   $('#edit').click(function() {
     // todo: switch to edit mode
     // todo: save page
     // todo: refresh list
   });
                       
    $(window).resize(function(){
        $('#content').css('width', $(window).width() - 315);
        $('.mce-tinymce').css('width', $(window).width() - 315);
    });

    $(window).resize();
    
    fillList();
});

var fillList = function() {
    $('.loader').show();

    var t = '<li id="{{id}}">';
    t = t + '<a href="#">';
    t = t + '<div class="title">{{title}}</div>';
    t = t + '<div class="last_update">{{updatedAt}}</div>';
    t = t + '</a>';
    t = t + '</li>';
    
    GetPages(function(collection) {
        if (collection) {
            collection.forEach(function(page) {
                var object = { 
                    id: page.id, 
                    title: page.get('title'), 
                    content: page.get('content'),
                    updatedAt : formatDate(page.updatedAt)
                };
                    
                $('#sidebar ul').append(renderTemplate(t, object));
            });

            $('.loader').hide();
        }
    });
};

var formatDate = function(d) {
  function pad(n){return n<10 ? '0'+n : n}
  
  return d.getUTCFullYear()+'-'
      + pad(d.getUTCMonth()+1)+'-'
      + pad(d.getUTCDate())+' '
      + pad(d.getUTCHours())+':'
      + pad(d.getUTCMinutes())+':'
      + pad(d.getUTCSeconds())
};

var renderTemplate = function(html, context) {
    var template = Handlebars.compile(html);
    var compiledTemplate = template(context);
    
    return compiledTemplate;
};

var editPage = function() {
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
};