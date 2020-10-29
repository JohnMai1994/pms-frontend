import React, {Component} from 'react';
import {Layout, Menu, Breadcrumb, Button} from 'antd';
import {CaretDownOutlined, CaretRightOutlined, MenuUnfoldOutlined ,MenuFoldOutlined  } from '@ant-design/icons';
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




                            {/*<SubMenu key="email" icon={<MailOutlined />} title="邮件Email">*/}
                            {/*    <Menu.Item key="1" icon={<MailFilled/>}>cconestep邮箱地址</Menu.Item>*/}
                            {/*    <Menu.Item key="2">kaiyao邮箱地址</Menu.Item>*/}
                            {/*    <Menu.Item key="3">case文案部门邮箱</Menu.Item>*/}
                            {/*    <Menu.Item key="4">other其他邮箱</Menu.Item>*/}
                            {/*</SubMenu>*/}
                            {/*<SubMenu key="phone" icon={<PhoneOutlined />} title="电话Phone">*/}
                            {/*    <Menu.Item key="5">option5</Menu.Item>*/}
                            {/*    <Menu.Item key="6">option6</Menu.Item>*/}
                            {/*    <Menu.Item key="7">option7</Menu.Item>*/}
                            {/*    <Menu.Item key="8">option8</Menu.Item>*/}
                            {/*</SubMenu>*/}
                            {/*<SubMenu key="equipment" icon={<LaptopOutlined />} title="设备Equipment">*/}
                            {/*    <Menu.Item key="9">option9</Menu.Item>*/}
                            {/*    <Menu.Item key="10">option10</Menu.Item>*/}
                            {/*    <Menu.Item key="11">option11</Menu.Item>*/}
                            {/*    <Menu.Item key="12">option12</Menu.Item>*/}
                            {/*</SubMenu>*/}
                            {/*<SubMenu key="other" icon={<HddOutlined />} title="其他账号Other">*/}
                            {/*    <Menu.Item key="13">option13</Menu.Item>*/}
                            {/*    <Menu.Item key="14">option14</Menu.Item>*/}
                            {/*    <Menu.Item key="15">option15</Menu.Item>*/}
                            {/*    <Menu.Item key="16">option16</Menu.Item>*/}
                            {/*</SubMenu>*/}



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