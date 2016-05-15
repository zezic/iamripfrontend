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
    var dataForServer = {username:this.state.username, email:this.state.email, password:this.state.password};
    this.setState({data:dataForServer});
    var that = this;
    Api({
      url: 'register',
      method: 'POST',
      data: dataForServer,
      fail: function(){
        that.setState({data:dataForServer});
        ReactDOM.render(
          <Registration/>,
          document.getElementById('registration')
        );
      },
      ok: function(){
        that.setState({data: data});
        location.href="/profile/";
      }
    });
    // $.ajax({
    //  url: '/api/register',
    //  dataType: 'json',
    //  type: 'POST',
    //  data:dataForServer,
    //  contentType:'application/json',
    //  success: function(data) {
    //    this.setState({data: data});
    //    location.href="/profile";
    //  }.bind(this),
    //  error: function(xhr, status, err) {
    //    this.setState({data:dataForServer});
    //    console.error(this.props.url, status, err.toString());
    //    ReactDOM.render(
    //      <Registration/>,
    //      document.getElementById('registration')
    //    );
    //  }.bind(this)
    //}); 
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
var Login = React.createClass({
  getInitialState: function() {
    return {username:'', password:''};
  },
  handleChangeLogin: function (e) {
    this.setState({username: e.target.value});
  },
  handleChangePassword: function (e) {
    this.setState({password: e.target.value});
  },
  LoginDataSubmit: function(e) {
    var dataForServer = {username:this.state.username, password:this.state.password};
    this.setState({data:dataForServer});
    var that = this;
    Api({
      url: 'login',
      method: 'POST',
      data: dataForServer,
      fail: function(){
        that.setState({data:dataForServer});
        ReactDOM.render(
          <Login/>,
          document.getElementById('login')
        );
      },
      ok: function(){
        that.setState({data: data});
        location.href="/profile/";
      }
    });
    // $.ajax({
    //  url: '/api/login',
    //  dataType: 'json',
    //  type: 'POST',
    //  data:dataForServer,
    //  contentType:'application/json',
    //  success: function(data) {
    //    this.setState({data: data});
    //    location.href="/profile/";
    //  }.bind(this),
    //  error: function(xhr, status, err) {
    //    this.setState({data:dataForServer});
    //    console.error(this.props.url, status, err.toString());
    //    ReactDOM.render(
    //      <Login/>,
    //      document.getElementById('login')
    //    );
    //  }.bind(this)
    //});
  },
  render: function() { 
    return(
      <div className="form"><img className="emblem" src="images/emblem.svg"/>
        <div className="inputblock">
          <input 
            className="username" 
            placeholder="Username"
            type="text"
            onChange={this.handleChangeLogin}
          />
        </div>
        <div className="inputblock">
          <input 
            className="password" 
            placeholder="Password"
            type="password"
            onChange={this.handleChangePassword}
          />
        </div>
        <button onClick={this.LoginDataSubmit} className="button">Login</button>
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
if ($('#registration').length>0) {
  ReactDOM.render(
    <Registration/>,
    document.getElementById('registration')
  );
}
if ($('#login').length>0) {
  ReactDOM.render(
    <Login/>,
    document.getElementById('login')
  );
}
if ($('#loginregister').length>0) {
  ReactDOM.render(
    <RegistrationOpen/>,
    document.getElementById('loginregister')
  );
}