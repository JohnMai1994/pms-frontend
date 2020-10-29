import React, {Component} from 'react';
import {Button, Card, Table} from "antd";
import ButtonGroup from "antd/es/button/button-group";
import {getTopics} from "../../../api";



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
    // 设置this.state
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            total: 100

        }
    }

    // 渲染前， 获取数据
    componentDidMount() {
        // 通过 "/currentPhone" 来获取对应页面的数据
        getTopics("/currentPhone").then(response => {
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
            <Card title="Latest Contact最新电话号码" extra={
                <ButtonGroup>
                    <Button type="text" danger>新增</Button>
                    <Button type="dashed" danger>导出Excel</Button>
                </ButtonGroup>
            }>

                <Table dataSource={this.state.dataSource} columns={columns}/>
            </Card>
        );
    }
}

export default CurrentPhone;