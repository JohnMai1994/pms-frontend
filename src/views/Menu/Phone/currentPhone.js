import React, {Component} from 'react';
import {Button, Card, Table} from "antd";
import ButtonGroup from "antd/es/button/button-group";
import {currentPhoneResponse} from "../sampleResponse"


const response = currentPhoneResponse

const columns = [
    {
        title: 'Name姓名',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Phone电话',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: "Comment备注",
        dataIndex: 'comment',
        key: "comment"
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



class CurrentPhone extends Component {
    render() {
        return (
            <Card title="Latest Contact最新电话号码" extra={
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

export default CurrentPhone;