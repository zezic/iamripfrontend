var Registration = React.createClass({
  render: function() {
    return (
      <div class="form"><img class="emblem" src="images/emblem.svg">
      <div class="inputblock">
        <input class="username" type="text" />
      </div>
      <div class="inputblock">
        <input class="email" type="text" />
      </div>
      <div class="inputblock">
        <input class="password" type="password" />
      </div>
      <div class="inputblock">
        <input class="passwordrepeat" type="password" />
      </div>
      <button class="button">Register</button>
    </div>
    );
  }
});

setInterval(function() {
  ReactDOM.render(
    <Registration/>,
    document.getElementById('registration')
  );
}, 500);