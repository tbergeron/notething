var edit_mode = false;

var ckeditor_options = { 
    height: 542,
    contentsCss : 'css/editor_style.css',
    
    toolbar: [
        ['Source', '-', 'Preview', '-'],
        ['Paste', 'PasteText', 'PasteFromWord'],
        ['Find', 'Replace'],
        ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-'],
        ['Uploadcare', 'youtube', 'Table', 'Smiley', 'SpecialChar', 'PageBreak'],
        ['Link', 'Unlink', 'Anchor', '-' ],
        ['Maximumize', 'ShowBlocks'],
        '/',
        ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat'],
        ['Styles', 'Format', 'Font', 'FontSize'],
        ['TextColor', 'BGColor'],
        ['Scayt']
    ]
};

$(function() {
    $('#add, #refresh').tooltip({ placement: 'bottom' });
    
    $('#add').click(function() {
        clear();
        $('#edit').removeClass('disabled');
        editPage();
        $('#editor_title').focus();
    });
    
    $('#print').click(function() {
        if (!$(this).hasClass('disabled'))
            window.print(); return false;
    })
    
    $('#edit').click(function() {
        if (!$(this).hasClass('disabled'))
            editPage(); return false;
    });
    
    $('#delete').click(function() {
        if (!$(this).hasClass('disabled')) {
            if (confirm('Are you really sure?')) {
               deletePage();
            }             
        }
    });
    
    $(window).resize(function(){
        $('#content, textarea#ckeditor').css('width', $(window).width() - 300);
    });

    $(window).resize();
    
    $('#refresh').click(function() {
        fillList(); 
    });
    
    if (window.location.hash) {
        $('#current_page_id').html(window.location.hash.replace(/#/g, ''));
        loadPage($('#current_page_id').html());
    } else {
        $('#add').click();
    }

    fillList($('#current_page_id').html());
});

var fillList = function(select_object_id) {
    $('#sidebar ul li a').unbind('click');
    $('#sidebar ul').html('');
    
    $('.loader').show();

    var t = '<li id="{{id}}">';
    t = t + '<a href="#{{id}}">';
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
                    
                var li = $(renderTemplate(t, object));
                $('#sidebar ul').append(li);

		// this shouldn't be here
                $(li).find('a').click(function() {
                    $('#sidebar ul li a').removeClass('selected'); 
                    $(this).addClass('selected');

                    var id = $(this).parent().attr('id');
                    loadPage(id);
                    
                    return false;
                });
            });

            $('#sidebar ul li:last').addClass('last');
            $('.loader').hide();
            
            if (select_object_id)
                $('#' + select_object_id + ' a').addClass('selected');
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
    edit_mode = false;
    $('.loader').show();
    
    GetPage(id, function(page) {
        clear();

        $('#current_page_id').html(id);
        
        $('#content .btn').removeClass('disabled');
        $('#content h1#page_title').html(parseHashtags(page.get('title')));
        $('#editor_title').val(page.get('title'));
        $('#content #editor').html(page.get('content'));

        window.location = '#' + id;

	resetJump();

        $('.loader').hide();
    });
};

var editor = null;

var editPage = function() {
    // Save
    if (edit_mode) {
        $('.loader').show();
        var object = {
            id: $('#current_page_id').html(),
            title: $('#editor_title').val(),
            content: editor.getData()
        };
        
        SavePage(object, function(success) {
            if (success) {
                message('success', 'Page has been succesfully saved!');
                edit_mode = false;
                fillList(success.id);
                loadPage(success.id);
                $('.loader').hide();
                window.location = '#' + success.id;
                
                resetJump();
            } else {
                alert('Error when saving!');
            }            
        });
        
    // Load Editor
    } else {
        edit_mode = true;
        $('#edit span').html('Save');
        $('#edit').addClass('btn-primary');
        $('#edit i').addClass('icon-white');
        $('#editor_title').show();
        $('#content h1#page_title').hide();

        $('#editor').hide();
        $('<textarea id="ckeditor"></textarea>').insertAfter('#current_page_id');
        $('textarea#ckeditor').val($('#editor').html());
		editor = CKEDITOR.replace('ckeditor', ckeditor_options);
    }
    
    return false;
}

var deletePage = function() {
    var id = $('#current_page_id').html();
    
    DeletePage(id, function(success) {
        message('error', 'Page has been succesfully deleted!');
        fillList();
        clear();
    });
}

var clear = function() {
    $('#editor').show();
    $('textarea#ckeditor').remove();
    
    if (editor)
        editor.destroy(); editor = null;
    
    $('#current_page_id').html('');
    $('#content .btn').addClass('disabled');
    $('#editor_title').val('').hide();
    $('#editor').html('');
    $('#content h1#page_title').html('Welcome').show();
    $('#edit span').html('Edit');
    $('#edit').removeClass('btn-primary');
    $('#edit i').removeClass('icon-white');
}

var message = function(type, message) {
    $('.bottom-right').notify({
        type: type,
        message: { text: message }
    }).show();
}

var resetJump = function() {
	setTimeout(function() {
	  if (window.location.hash) {
	    window.scrollTo(0, 0);
	  }
	}, 1);
}
