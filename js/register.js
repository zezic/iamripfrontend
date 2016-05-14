var Registration = React.createClass({
  getInitialState: function () {
    return {
      username: '',
      email: '',
      password: ''
    };
  },
  //propTypes: {
  //  Username: React.PropTypes.string,
   // Email: React.PropTypes.string,
   // Password: React.PropTypes.string
  //},
  handleChange: function (e) {
    var tar = e.target.className;
    this.setState({tar: e.target.value});
  },
  RegistrationDataSubmit: function(e) {
    //e.preventDefault();
    //console.log(this.state.username);
    //console.log(this.state.email);
    //console.log(this.state.password);
    var dataForServer = JSON.stringify({username:this.state.username, email:this.state.email, password:this.state.password});
    this.setState({data:dataForServer});
    $.ajax({
      url: '/api/register',
      dataType: 'json',
      type: 'POST',
      data:dataForServer,
      contentType:'application/json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data:dataForServer});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    GetInitialState()
  },
  render: function() {
    return (
      <div 
        className="form" 
      >
      <img className="emblem" src="images/emblem.svg"/>
      <div className="inputblock">
        <input 
          className="username"
          type="text" 
          placeholder="Username"
          //value={this.state.username} 
          onChange={this.handleChange}
        />
      </div>
      <div className="inputblock">
        <input 
          className="email" 
          type="text" 
          placeholder="E-mail"
        //  value={this.state.email} 
          onChange={this.handleChange}
        />
      </div>
      <div className="inputblock">
        <input 
          className="password" 
          type="password" 
          placeholder="Password"
        //  value={this.state.password} 
          onChange={this.handleChange}
        />
      </div>
      <div className="inputblock">
        <input 
          className="passwordrepeat" 
          type="password" 
          placeholder="Repeat Password"
          onChange={this.handleChange}
        />
      </div>
      <button onClick={this.RegistrationDataSubmit} className="button">Register</button>
    </div>
    );
  }
});

ReactDOM.render(
    <Registration/>,
    document.getElementById('registration')
  );