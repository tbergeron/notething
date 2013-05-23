var edit_mode = false;

$(function() {
    $('#add, #refresh').tooltip({ placement: 'bottom' });
    
    $('#edit').click(function() {
        if (!$(this).hasClass('disabled'))
            editPage();
            // todo: save page
    });
                       
    $(window).resize(function(){
        $('#content').css('width', $(window).width() - 315);
        $('.mce-tinymce').css('width', $(window).width() - 315);
    });

    $(window).resize();
    
    $('#refresh').click(function() {
        fillList(); 
    });
    
    fillList();
});

var fillList = function() {
    $('#sidebar ul li a').unbind('click');
    $('#sidebar ul').html('');
    
    $('.loader').show();

    var t = '<li id="{{id}}">';
    t = t + '<a href="#">';
    t = t + '<div class="title">{{{title}}}</div>';
    t = t + '<div class="last_update">{{updatedAt}}</div>';
    t = t + '</a>';
    t = t + '</li>';
    
    GetPages(function(collection) {
        if (collection) {
            collection.forEach(function(page) {
                var object = { 
                    id: page.id, 
                    title: parseHashtags(page.get('title')), 
                    content: page.get('content'),
                    updatedAt : formatDate(page.updatedAt)
                };
                    
                $('#sidebar ul').append(renderTemplate(t, object));

                // this shouldn't be here
                $('#sidebar ul li a').click(function() {
                    $('#sidebar ul li a').removeClass('selected'); 
                    $(this).addClass('selected');

                    var id = $(this).parent().attr('id');
                    loadPage(id);
                });
            });

            $('#sidebar ul li:last').addClass('last');
            $('.loader').hide();
        }
    });

    $('#search').keyup(function(e) {
        clearTimeout($.data(this, 'timer'));
        if (e.keyCode == 13)
          search(true);
        else
          $(this).data('timer', setTimeout(search, 500));

        if ($(this).val() === '') {
            search(true);
        }
    });

    function search(force) {
        var existingString = $("#search").val();
        if (!force && existingString.length < 3) return; //wasn't enter, not > 2 char

        $('#sidebar ul li').each(function() {
            var content = $(this).find('a').html().toLowerCase();
            if (content.indexOf(existingString.toLowerCase()) != -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }
};

var parseHashtags = function(content) {
    return content.replace(/(#\w+)/g, '<span class="hashtag">$1</span>');    
}

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

var loadPage = function(id) {
    tinymce.remove('#editor');
    edit_mode = false;
    $('#edit span').html('Edit');
    $('#edit').removeClass('btn-primary');
    $('#edit i').removeClass('icon-white');
    
    $('.loader').show();
    
    GetPage(id, function(page) {
        $('#content .btn').removeClass('disabled');
        $('#content h1').html(page.get('title'));
        $('#content #editor').html(page.get('content'));
        
        $('.loader').hide();
    });
};

var editPage = function() {
    // Save
    if (edit_mode) {
        edit_mode = false;
        $('#edit span').html('Edit');
        $('#edit').removeClass('btn-primary');
        $('#edit i').removeClass('icon-white');
        tinymce.remove('#editor');

    // Load Editor
    } else {
        edit_mode = true;
        $('#edit span').html('Save');
        $('#edit').addClass('btn-primary');
        $('#edit i').addClass('icon-white');
        
        tinymce.init({
            selector: "#editor",
            width: $(window).width() - 315,
            height: 500,
            plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table contextmenu paste"
            ],
            toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image"
        });
    }
    
    return false;
}