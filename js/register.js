var Registration = React.createClass({
  getInitialState: function() {
    return {username:'', email:'', password:'', passwordRep:''};
  },
  handleChangeName: function (e) {
    this.setState({username: e.target.value});
  },
  handleChangeEmail: function (e) {
    this.setState({email: e.target.value});
  },
  handleChangePassword: function (e) {
    this.setState({password: e.target.value});
  },
  handleChangePasswordRep: function (e) {
    this.setState({passwordRep: e.target.value});
  },
  RegistrationDataSubmit: function(e) {
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
        location.href="/profile";
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data:dataForServer});
        console.error(this.props.url, status, err.toString());
        ReactDOM.render(
          <Registration/>,
          document.getElementById('registration')
        );
      }.bind(this)
    });
    //getInitialState();
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
          onChange={this.handleChangeName}
        />
      </div>
      <div className="inputblock">
        <input 
          className="email" 
          type="text" 
          placeholder="E-mail"
        //  value={this.state.email} 
          onChange={this.handleChangeEmail}
        />
      </div>
      <div className="inputblock">
        <input 
          className="password" 
          type="password" 
          placeholder="Password"
        //  value={this.state.password} 
          onChange={this.handleChangePassword}
        />
      </div>
      <div className="inputblock">
        <input 
          className="passwordrepeat" 
          type="password" 
          placeholder="Repeat Password"
          onChange={this.handleChangePasswordRep}
        />
      </div>
      <button onClick={this.RegistrationDataSubmit} className="button">Register</button>
    </div>
    );
  }
});
var RegistrationOpen = React.createClass({
  getInitialState: function() {
    return {register:'#registration',login:'#login'};
  },
  OnClickFormVisible : function(e) {
    for (var key_up in this.state) {
      $(this.state[key_up]).addClass('hidden');
     }
     $('.overlay').removeClass('hidden').css('display','none').fadeIn('fast');
     var key_form = e.target.className.replace('lightbutton ','');
     $(this.state[key_form]).removeClass('hidden');
  },  
  render: function() {
    return (
    <div>
      <button className="lightbutton login" onClick={this.OnClickFormVisible}>Login</button>
      <div className="separator"></div>
      <button className="lightbutton register" onClick={this.OnClickFormVisible}>Register</button>
    </div>
    );
  }
});

ReactDOM.render(
  <Registration/>,
  document.getElementById('registration')
);
ReactDOM.render(
  <RegistrationOpen/>,
  document.getElementById('loginregister')
);
