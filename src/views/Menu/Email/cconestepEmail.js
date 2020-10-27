import React, {Component} from 'react';
import {Card, Button, Table} from 'antd';
import ButtonGroup from "antd/es/button/button-group";
import {getTopics} from "../../../api"

// 这是需要展示出来的Columns结构
const parentColumns = [
    {
        title: 'Name姓名',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'ParentEmail主邮箱',
        dataIndex: 'parentEmail',
        key: 'parentEmail'
    },
    {
        title: 'Password密码',
        dataIndex: 'password',
        key: 'password'
    },
    {
        title: 'Action操作',
        key: 'operation',
        render: (record) => {
            return (
                <ButtonGroup>
                    <Button type="primary">修改</Button>
                    <Button type="danger">删除</Button>
                </ButtonGroup>
            )
        }

    },
];

const childColumns = [
    {
        title: 'Id编号',
        dataIndex: 'key',
        key: 'key'
    },
    {
        title: 'ChildEmail子邮箱',
        dataIndex: 'childEmail',
        key: 'childEmail'
    },
    {
        title: 'Platform所属平台',
        dataIndex: 'platform',
        key: 'platform'
    },
];


function CconestepTable(stateData) {

    const expandedRowRender = (data) => {
        return <Table columns={childColumns} dataSource={data.childrenEmail} pagination={false}/>;
    };

    return (
        <Table
            className="components-table-demo-nested"
            columns={parentColumns}
            expandable={{
                expandedRowRender,
                defaultExpandAllRows: true
            }}
            pagination={{
                current: 1,
                total: stateData.stateData.total,
                pageSize: 100
            }}
            dataSource={stateData.stateData.dataSource}
        />
    );
}


class CconestepEmail extends Component {
    // 设置dataSource
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
        getTopics("/cconestepEmail").then(response => {
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
            <Card title="CCONESTEP加合移民公司" extra={
                <ButtonGroup>
                    <Button type="text" danger>新增</Button>
                    <Button type="dashed" danger>导出Excel</Button>
                </ButtonGroup>
            }>
                {/*将this.state传递数据*/}
                <CconestepTable stateData={this.state}/>
            </Card>
        );
    }
}

export default CconestepEmail;