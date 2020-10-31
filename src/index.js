import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// 1. 配置antd的中文环境，如果不想使用中文，可以改英文
import {ConfigProvider} from 'antd'
import zhCN from 'antd/es/locale/zh_CN';
import enGB from 'antd/es/locale/en_GB';

// 2. 开启路由操作
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import {commentRoutes} from "./routers"

import "./css/index.less"

ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <Router >
            {/*
            Route 路由的映射表：
                1. 公共的
                2. 私有的
            */}
            <Switch>
                {/*1. 私有的操作，必须是在登陆后才可以访问*/}
                <Route path="/admin" render={(rootProps) => {
                    // 到时候做授权的检测
                    return <App {...rootProps} />
                }}/>
                {/*2. 公共的*/}
                {
                    commentRoutes.map((item, index) => {
                        return (
                            <Route key={item.pathname} path={item.pathname} component={item.component}/>
                        )
                    })
                }
                {/*3. 配置Not Found*/}
                <Redirect from="/" to="/admin" exact/>
                <Redirect to="/404" exact/>

            </Switch>
        </Router>
    </ConfigProvider>
    ,
    document.getElementById('root')
);

