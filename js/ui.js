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

$(document).ready(function(){
  $('.logout').on('click', function(){ logout(); });
  $('.closebutton, .closelayer').on('click', function(){
    $('.overlay').fadeOut();
  });
});

