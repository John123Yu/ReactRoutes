var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var axios = require('axios');

var Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    hashHistory = ReactRouter.hashHistory,
    IndexRoute = ReactRouter.IndexRoute,
    Link = ReactRouter.Link

var data = require('./data.json')

var NinjaList = React.createClass({
  render: function(){
    var ninjas = this.props.turtles.map(function(turtle, idx){
      return (
        <li key={idx}>
          <Link to={'ninjas/' + turtle.id}>{turtle.name}</Link>
        </li>
      )
    })
    return (
      <ul>
        {ninjas}
      </ul>
    )
  }
});

var NinjaComponent = React.createClass({
    render: function (){
        return (
          <div>
            <h1>Greetings Ninja!</h1>
            <h2>Click on a ninja for more information</h2>
            <NinjaList turtles={this.props.route.data}/>
            {this.props.children}
          </div>
        )
    }
});

function NinjaDescription(props){
  var routeID = props.params.id
  var ninja = props.route.fetchTurtle(parseInt(routeID))
  return(
    <div>
      <h1>{ninja.name}</h1>
      <p>{ninja.description}</p>
      <Link to='/ninjas'>Back</Link>
    </div>
  )
}

var App = React.createClass({
  fetchTurtle: function(id) {
    return this.props.data.filter(function(ninja){
      return (ninja.id === id)
    })[0]
  },
  render: function(){
    return (
      	<Router history={hashHistory}>
		  <Route path='/ninjas' >
		    <IndexRoute component={NinjaComponent} data={this.props.data}/>
		    <Route path=':id' component={NinjaDescription} fetchTurtle={this.fetchTurtle}/>
		  </Route>
		</Router>   )
  }
})
ReactDOM.render(<App data={data}/>, document.getElementById('app'))
