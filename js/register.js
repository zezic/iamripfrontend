var Registration = React.createClass({
  render: function() {
    return (
      <div className="form"><img className="emblem" src="images/emblem.svg"/>
      <div className="inputblock">
        <input className="username" type="text" />
      </div>
      <div className="inputblock">
        <input className="email" type="text" />
      </div>
      <div className="inputblock">
        <input className="password" type="password" />
      </div>
      <div className="inputblock">
        <input className="passwordrepeat" type="password" />
      </div>
      <button className="button">Register</button>
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