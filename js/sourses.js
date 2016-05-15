$.ajax({
  url: 'http://iamrip.com/api/sources',
  method: 'GET',
  dataType: 'json',
  data: data,
  error: function(){ShowMessage('Нет данных');},
  success: callback;
});
console.log(callback);
/*var Sources = React.createClass({
	getInitialState: function() {
    	return {};
  	},
  	render:function(){
  		return (

  		);
  	}
});
ReactDOM.render(
    <Sources/>,
    document.getElementById('')
  );*/


// Api({
//     url: 'sources',
//     method: 'GET',
//     data: data,
//     fail: function(){ShowMessage('Нет данных');},
//     ok: callback;
// });

