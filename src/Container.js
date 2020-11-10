import React, {Component} from 'react';
// 2. 开启路由操作
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import App from "./App";
import {Login} from "./views";


class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            login: false
        }
    }

    handleLogin = (username) => {
        this.setState({
            login: true,
            username: username
        })
    }


    render() {
        return (
            <div>
                {
                    this.state.login ?
                        <div style={{height: 800}}>
                            <Router>
                                <Switch>
                                    {/*1. 私有的操作，必须是在登陆后才可以访问*/}
                                    <Route path="/admin" render={(rootProps) => {
                                        // 到时候做授权的检测
                                        return <App {...rootProps} />
                                    }}/>

                                    {/*3. 配置Not Found*/}
                                    <Redirect from="/" to="/admin" exact/>
                                    <Redirect to="/404" exact/>

                                </Switch>
                            </Router>
                        </div>
                        :
                        <Login handleLogin={username => this.handleLogin(username)}/>


                }
            </div>


        );
    }
}

export default Container;