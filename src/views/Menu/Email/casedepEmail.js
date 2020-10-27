import React, {Component} from 'react';
import {Button, Card, Table} from "antd";
import ButtonGroup from "antd/es/button/button-group";
import {getTopics} from "../../../api";




const columns = [
    {
        title: 'Name姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email邮箱',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Password密码',
        dataIndex: 'password',
        key: 'password',
    },
    {
        title: 'Action操作',
        key: 'operation',
        render: (text, record) => {
            console.log(record)
            return (
                <ButtonGroup>
                    <Button  type={"primary"}>修改</Button>
                    <Button  type={"danger"}>删除</Button>
                </ButtonGroup>
            )
        }

    }
];

class CasedepEmail extends Component {
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
        // 通过 "/cconestepEmail" 来获取对应页面的数据
        getTopics("/restEmail").then(response => {
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
            <Card title="CASES文案部邮箱" extra={
                <ButtonGroup>
                    <Button type="text" danger>新增</Button>
                    <Button type="dashed" danger>导出Excel</Button>
                </ButtonGroup>
            }>
                <Table
                    dataSource={this.state.dataSource}
                    columns={columns}
                    pagination={{total: 500}}
                />
            </Card>
        );
    }
}

export default CasedepEmail;