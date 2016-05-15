function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
function logout() {
  deleteAllCookies();
  location.href = "/";
}

function Api(params) {
  ok = params.ok
  fail = params.fail
  $.ajax({
    url: '/api/'+params.url,
    dataType: 'json',
    type: params.method,
    data: JSON.stringify(params.data),
    contentType:'application/json',
    success: function(data) {
      ok(data);
    },
    error: function(xhr, status, err) {
      fail();
      console.error(status, err.toString());
    }
  });
}
function ShowMessage(text) {
  $("#message .text").text(text);
  $(".overlay2").fadeIn();
  $(".overlay2").css("display", "flex");
  setTimeout(function(){
    $(".overlay2").fadeOut();
  }, 4000);
}
  //Api({
    //url: 'login',
    //method: 'POST',
    //data: { username: "zezic", password: "12345" },
    //fail: function(){},
    //ok: function(){}
  //});
$(document).ready(function(){
  $('.logout').on('click', function(){ logout(); });
  $('.closebutton, .closelayer').on('click', function(){
    $('.overlay').fadeOut();
  });
  $('.savesettings').on('click', function(){
    var data = {}
    props = ["firstname", "lastname", "password"]
    for (var prop in props) {
      var key = props[prop]
      var target = 'input.'+key;
      if ($(target).val().length > 0) {
        if (key == "password") {
          if ($(target).val() != $(target+"repeat").val()) {
            ShowMessage('Passwords mismatch!');
            return;
          }
        }
        data[key] = $(target).val();
      }
    }
    if (Object.keys(data).length > 0) {
      Api({
        url: 'me',
        method: 'PATCH',
        data: data,
        fail: function(){ ShowMessage('Server returned error :( sorry'); },
        ok: function(){ ShowMessage('Profile updated.'); }
      });
    } else {
      ShowMessage('Nothing to save.');
    }
  });

  // Messages stuff

  $('.row.message .icon').on('click', function() {
    $(this).toggleClass('private').toggleClass('public');
  });

  // Add to subscribers

  $('.add-subscriber').on('click', function() {
    var message_uuid = $(this).parents('.row.message').data('uuid');
    var email_field = $(this).siblings('.inputblock').find('input');
    var subs_block = $(this).parents('.row.email').siblings('.subscribers');
    Api({
      url: 'destination',
      method: 'POST',
      data: {
        message_uuid: message_uuid,
        address: email_field.val()
      },
      fail: function(){ ShowMessage('Server returned error :( sorry'); },
      ok: function(){
        subs_block.text(email_field.val()+', '+subs_block.text());
        ShowMessage(email_field.val()+' was added to subscribers.');
        email_field.val('');
      }
    });
  });

  // Delete message

  $('.row.message .delete').on('click', function() {
    var message_id = $(this).parents('.row.message').data('id');
    var message_block = $(this).parents('.row.message');
    Api({
      url: 'message/'+message_id,
      method: 'DELETE',
      data: {},
      fail: function(){ ShowMessage('Server returned error :( sorry'); },
      ok: function(){
        message_block.slideUp(function(){
          message_block.remove();
        });
      }
    });
  }); 

  // Apply all messages

  $('.applymessages').on('click', function() {
    $('.row.message').each(function(index){
      var message_block = $(this);
      var message_id = $(this).data('id');
      var message_text = $(this).find('textarea').val();
      var hours = $(this).find('input.hours').val();
      var minutes = $(this).find('input.mins').val();
      var duration = hours*60 + minutes;
      if ($(this).find('.icon').hasClass('private')) {
        var is_private = true;
      } else {
        var is_private = false;
      }
      Api({
        url: 'message/'+message_id,
        method: 'PATCH',
        data: {
          text: message_text,
          is_private: is_private,
          duration: duration
        },
        fail: function(){ ShowMessage('Server returned error :( sorry'); },
        ok: function(data){
          message_block.addClass('green');
          setTimeout(function(){
            message_block.removeClass('green');
          }, 200);
        }
      });
    });
  });

  // Show Create Message

  $('.add-message').on('click', function() {
    $('.overlay #addmessage').removeClass('hidden');
    $('.overlay').removeClass('hidden').css('display', 'none').fadeIn();
    $('.overlay').css('display', 'table');
  });
  // Create Message

  $('#addmessage .icon').on('click', function() {
    $(this).toggleClass('private').toggleClass('public');
  });

  $('#addmessage button').on('click', function() {
    var message_text = $('#addmessage textarea').val();
    var hours = $('#addmessage').find('input.hours').val();
    var minutes = $('#addmessage').find('input.mins').val();
    var duration = parseInt(hours)*60 + parseInt(minutes);
    if ($('#addmessage').find('.icon').hasClass('private')) {
      var is_private = true;
    } else {
      var is_private = false;
    }
    Api({
      url: 'message',
      method: 'POST',
      data: {
        text: message_text,
        is_private: is_private,
        duration: duration
      },
      fail: function(){ ShowMessage('Server returned error :( sorry'); },
      ok: function(data){
        ShowMessage('Your private message created');
        var new_uuid = data["uuid"];
        setTimeout(function(){
          //location.href = "/message/"+new_uuid;
        }, 2000);
      }
    });
  });
});


