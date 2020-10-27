import React, {Component} from 'react';
import {Button, Card, Table} from "antd";
import ButtonGroup from "antd/es/button/button-group";
import {otherEquipmentResponse} from  "../sampleResponse"

const response = otherEquipmentResponse;
const columns = [
    {
        title: 'Id编号',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: "Name设备名称",
        dataIndex: 'name',
        key: "name"
    },
    {
        title: "Brand设备牌子",
        dataIndex: 'brand',
        key: "brand"
    },
    {
        title: 'Position放置位置',
        dataIndex: 'position',
        key: 'position',
    },
    {
        title: "Condition电脑状态",
        dataIndex: 'condition',
        key: "condition"
    },
    {
        title: "Usage Year使用年限",
        dataIndex: 'usageYear',
        key: "usageYear"
    },
    {
        title: "Comment评论",
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


class OtherEquipment extends Component {
    render() {
        return (
            <Card title="Other Equipment其他设备信息" extra={
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

export default OtherEquipment;