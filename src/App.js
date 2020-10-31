import React from 'react';
import './App.less';
// 二级路由，导入私有路由路径
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import {privateRoutes} from "./routers"
import FrameOut from "./components/FrameOut";

class App extends React.Component {
    render() {
        // 显示 私有的 路由 /admin/dashboard 二级路由
        return (
            <FrameOut>
                <Switch>
                    <Route path={privateRoutes[0].children[0].pathname} component={privateRoutes[0].children[0].component}  />
                    <Route path={privateRoutes[0].children[1].pathname} component={privateRoutes[0].children[1].component}  />
                    <Route path={privateRoutes[0].children[2].pathname} component={privateRoutes[0].children[2].component}  />
                    <Route path={privateRoutes[0].children[3].pathname} component={privateRoutes[0].children[3].component}  />
                    <Route path={privateRoutes[1].children[0].pathname} component={privateRoutes[1].children[0].component}  />
                    <Route path={privateRoutes[1].children[1].pathname} component={privateRoutes[1].children[1].component}  />
                    <Route path={privateRoutes[1].children[2].pathname} component={privateRoutes[1].children[2].component}  />
                    <Route path={privateRoutes[2].children[0].pathname} component={privateRoutes[2].children[0].component}  />
                    <Route path={privateRoutes[2].children[1].pathname} component={privateRoutes[2].children[1].component}  />
                    <Route path={privateRoutes[3].children[0].pathname} component={privateRoutes[3].children[0].component}  />

                    {/*不知道为啥不行TvT*/}
                    {/*{*/}
                    {/*    privateRoutes.map(lists => {*/}
                    {/*        lists.children.map(item =>  {*/}
                    {/*            return (*/}
                    {/*                <Route path={item.pathname}*/}
                    {/*                       component={item.component}*/}
                    {/*                />*/}
                    {/*            )*/}

                    {/*        })*/}
                    {/*    })*/}
                    {/*}*/}

                    {/*1. 配置默认的 /admin 2. not found*/}
                    <Redirect from="/admin" to={privateRoutes[0].children[0].pathname} exact></Redirect>
                    <Redirect to="/404"></Redirect>
                </Switch>

            </FrameOut>




        )
    }
}


export default withRouter(App);
