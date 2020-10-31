import React, {Component} from 'react';
import ButtonGroup from "antd/es/button/button-group";
import {Button, Card, Table} from "antd";
import {getTopics} from "../../../api";
import CreateButton from "../../../components/CreateButton";
import ExcelSimpleExportButton from "../../../components/ExcelExportButton/simpleExcel";
import EditButton from "../../../components/EditButton";
import DeleteButton from "../../../components/DeleteButton";




class PasswordPhone extends Component {
    // 设置this.state
    constructor(props) {
        super(props);
        this.state = {
            entozh: {
                "user": "使用者",
                "phone": "手机号码",
                "type": "手机型号",
                "wechat": "微信号",
                "password": "手机密码",
                "voicemail": "语音留言密码",
                "icloudEmail": "iCloud邮箱",
                "icloudPassword": "iCloud邮箱密码",
                "previousUsers": "前使用者",
            },
            dataSource: [],
            columns: [
                {
                    title: 'User使用者',
                    dataIndex: 'user',
                    key: 'user'
                },
                {
                    title: 'Phone电话',
                    dataIndex: 'phone',
                    key: 'phone',
                },
                {
                    title: "Type型号",
                    dataIndex: 'type',
                    key: "type"
                },
                {
                    title: "Wechat微信",
                    dataIndex: 'wechat',
                    key: "wechat"
                },
                {
                    title: "Password密码",
                    dataIndex: 'password',
                    key: "password"
                },
                {
                    title: "Voicemail语音留言",
                    dataIndex: 'voicemail',
                    key: "voicemail"
                },
                {
                    title: "icloud账号",
                    dataIndex: 'icloudEmail',
                    key: "icloudEmail"
                },
                {
                    title: "icloud密码",
                    dataIndex: 'icloudPassword',
                    key: "icloudPassword"
                },
                {
                    title: "Previous Users前使用者",
                    dataIndex: 'previousUsers',
                    key: "previousUsers"
                },
                {
                    title: 'Action操作',
                    key: 'operation',
                    render: (text, record) => {
                        console.log(record)
                        return (
                            <ButtonGroup>
                                <EditButton record={record} address={"passwordPhone"}/>
                                <DeleteButton record={record} address={"passwordPhone"}/>
                            </ButtonGroup>
                        )
                    }

                }
            ],
            total: 100

        }
    }

    // 渲染前， 获取数据
    componentDidMount() {
        // 通过 "/cconestepEmail" 来获取对应页面的数据
        getTopics("/passwordPhone").then(response => {
            this.setState(
                {
                    dataSource: response.result.list
                }
            )
        }).catch(error => {
            throw error
        })
    }

    render() {
        return (
            <Card title="Phone Information手机详细信息" extra={
                <ButtonGroup>
                    <CreateButton columns={this.state.columns} address={"passwordPhone"}/>
                    <ExcelSimpleExportButton dataSource={this.state.dataSource} entozh={this.state.entozh}/>
                </ButtonGroup>
            }>

                <Table dataSource={this.state.dataSource} columns={this.state.columns}/>
            </Card>
        );
    }
}

export default PasswordPhone;