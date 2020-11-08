import React, {Component} from 'react';
import {Layout, Menu} from 'antd';
import {CaretDownOutlined, CaretRightOutlined  } from '@ant-design/icons';
import {withRouter} from "react-router-dom"


import {privateRoutes} from "../../routers";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


// 左侧的菜单，只显示isShow:true
var Menus = privateRoutes.filter(item => {
    return item.isShow === true;
})


class FrameOut extends Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };


    menuHandler = ({key}) => {
        this.props.history.push(key)

    }

    render() {
        return (


            <Layout style={{minHeight: '100%'}}>
                <Header className="header">
                    <h2 style={{color : '#fff'}}>公司资源管理系统</h2>
                </Header>
                <Layout>
                    <Sider width={310} className="site-layout-background" trigger={null} collapsible collapsed={this.state.collapsed}>


                        <Menu
                            onClick={this.menuHandler}
                            mode="inline"
                            selectedKeys={[this.props.location.pathname]}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >


                            {
                                Menus.map(item => {
                                    return (
                                        <SubMenu key={item.pathname} icon={<CaretDownOutlined />} title={item.title}>
                                            {
                                                item.children.map(item => {
                                                    return (
                                                        <Menu.Item
                                                            key={item.pathname}
                                                            icon={<CaretRightOutlined />}
                                                        >
                                                            { item.title}
                                                        </Menu.Item>
                                                    )
                                                })
                                            }
                                        </SubMenu>
                                    )
                                })
                            }

                        </Menu>
                    </Sider>

                    <Layout >

                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(FrameOut);