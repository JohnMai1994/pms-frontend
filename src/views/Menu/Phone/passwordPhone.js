import React, {Component} from 'react';
import ButtonGroup from "antd/es/button/button-group";
import {Button, Card, Table} from "antd";
import {passwordPhoneResponse} from "../sampleResponse"

const response = passwordPhoneResponse;

const columns = [
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
        title: "Previous Users前用户",
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
                    <Button type={"primary"}>修改</Button>
                    <Button type={"danger"}>删除</Button>
                </ButtonGroup>
            )
        }

    }
];


class PasswordPhone extends Component {
    render() {
        return (
            <Card title="Phone Information手机详细信息" extra={
                <ButtonGroup>
                    <Button type="text" danger>新增</Button>
                    <Button type="dashed" danger>导出Excel</Button>
                </ButtonGroup>
            }>

                <Table dataSource={response.result.list} columns={columns}/>
            </Card>
        );
    }
}

export default PasswordPhone;