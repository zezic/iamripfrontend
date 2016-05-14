var Registration = React.createClass({
  GetInitialState: function () {
    return {
      Username: '',
      Email: '',
      Password: ''
    };
  },
  handleNameChange: function(e) {
    this.setState({Username: e.target.value});
  },
  handleEmailChange: function(e) {
    this.setState({Email: e.target.value});
  },
  handlePasswordChange: function(e) {
    this.setState({Password: e.target.value});
  },
  RegistrationDataSubmit: function() {
    dataForServer = JSON.stringify({username:'dfdf', email:'dfdf', password:'dfdfd'});
    this.setState({data:dataForServer});
    $.ajax({
      url: '/api/register',
      dataType: 'json',
      type: 'POST',
      data:dataForServer,
      contentType:'application/json',
      success: function(data) {
        this.setState({data: data});
        GetInitialState();
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data:dataForServer});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <form 
        className="form" 
        onSubmit={this.RegistrationDataSubmit}
      >
      <img className="emblem" src="images/emblem.svg"/>
      <div className="inputblock">
        <input 
          className="username"
          type="text" 
          placeholder="Username"
          onChange={this.handleNameChange}
        />
      </div>
      <div className="inputblock">
        <input 
          className="email" 
          type="text" 
          placeholder="E-mail"
          onChange={this.handleEmailChange}
        />
      </div>
      <div className="inputblock">
        <input 
          className="password" 
          type="password" 
          placeholder="Password"
          onChange={this.handlePasswordChange}
        />
      </div>
      <div className="inputblock">
        <input 
          className="passwordrepeat" 
          type="password" 
          placeholder="Password"
          onChange={this.handlePasswordChange}
        />
      </div>
      <button type="submit" className="button" onSubmit={this.RegistrationDataSubmit}>Register</button>
    </form>
    );
  }
});

setInterval(function() {
  ReactDOM.render(
    <Registration/>,
    document.getElementById('registration')
  );
}, 500);