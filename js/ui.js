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
});


