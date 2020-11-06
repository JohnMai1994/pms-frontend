import React, {Component} from 'react';
import {Button, Card, Image, Table} from "antd";
import ButtonGroup from "antd/es/button/button-group";
import {getTopics} from "../../../api";
import CreateButton from "../../../components/CreateButton";
import ExcelSimpleExportButton from "../../../components/ExcelExportButton/simpleExcel";
import EditButton from "../../../components/EditButton";
import DeleteButton from "../../../components/DeleteButton";
import office from "../../../picture/office.jpg";


class OtherEquipment extends Component {
    // 设置this.state
    constructor(props) {
        super(props);
        this.state = {
            entozh: {
                "name": "姓名",
                "position": "使用区域",
                "brand": "品牌",
                "condition": "状况",
                "usageYear": "使用年限",
                "comment": "备注",
            },
            dataSource: [],
            columns: [
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
                                <EditButton record={record} address={"/other-equipment"} entozh={this.state.entozh}/>
                                <DeleteButton record={record} address={"/other-equipment"}/>
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
        // 通过 "/otherEquipment" 来获取对应页面的数据
        getTopics("/other-equipment").then(response => {
            this.setState(
                {
                    dataSource: response.result.list,
                    total: response.result.total
                }
            )
        }).catch(error => {
            throw error
        })
    }

    render() {
        return (
            <Card title="Other Equipment其他设备信息" extra={
                <ButtonGroup>
                    <CreateButton columns={this.state.columns} address={"/other-equipment"}/>
                    <ExcelSimpleExportButton dataSource={this.state.dataSource} entozh={this.state.entozh}/>
                </ButtonGroup>
            }>

                <Table dataSource={this.state.dataSource} columns={this.state.columns}/>
                <Image width={600} src={office}></Image>
            </Card>
        );
    }
}

export default OtherEquipment;