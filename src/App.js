import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import $ from 'jquery';
import Profile from './Components/github/Profile';
import Search from "./Components/github/Search";

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: 'Han',
            userData: [],
            userRepos: [],
            perPage: 5
        }
    }

    // Get user data from github
    getUserData(){
        $.ajax({
            url: 'https://api.github.com/users/'+this.state.username+'?client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret,
            dataType: 'json',
            cache: false,
            success: function(data){
                this.setState({userData: data});
                //console.log(data);
            }.bind(this),
            error: function(xhr, status, err){
                this.setState({username: null});
                alert(err);
            }.bind(this)
        });
    }

    // Get user repos from github
    getUserRepos(){
        $.ajax({
            url: 'https://api.github.com/users/'+this.state.username+'/repos?per_page='+this.state.perPage+'&client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret+'&sort=created',
            dataType: 'json',
            cache: false,
            success: function(data){
                this.setState({userRepos: data});
                //console.log(data);
            }.bind(this),
            error: function(xhr, status, err){
                this.setState({username: null});
                alert(err);
            }.bind(this)
        });
    }

    componentDidMount(){
        this.getUserData();
        this.getUserRepos();
    }
    handleFormSubmit(username){
        this.setState({username: username}, function(){
            this.getUserData();
            this.getUserRepos();
        });
        //console.log(username);
    }
    render(){
        return(
            <div>
                <Search onFormSubmit={this.handleFormSubmit.bind(this)}/>
                <Profile {...this.state}/>
            </div>
        )
    }
}

App.propTypes={
    clientId: PropTypes.string,
    clientSecret: PropTypes.string
};

App.defaultProps ={
    //clientId: 'aa5d4acff1f7e803e232',
    //clientSecret: 'f71e7464794bb3434032cdd2a24a1284fea8eb9c'
    clientId: 'f28e050943f9263a3a25',
    clientSecret: '5d038cbd5948645c6b0b97f64faa7af32b2ab2fc'
};
export default App;
