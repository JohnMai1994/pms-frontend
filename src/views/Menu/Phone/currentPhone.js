import React, {Component} from 'react';
import {Card, Table} from "antd";
import ButtonGroup from "antd/es/button/button-group";
import {getTopics} from "../../../api";
import CreateButton from "../../../components/CreateButton";
import ExcelSimpleExportButton from "../../../components/ExcelExportButton/simpleExcel";
import EditButton from "../../../components/EditButton";
import DeleteButton from "../../../components/DeleteButton";

class CurrentPhone extends Component {
    // 设置this.state
    constructor(props) {
        super(props);
        this.state = {
            entozh: {
                "key": "编号",
                "name": "姓名",
                "phone": "电话",
                "comment": "备注",
            },
            dataSource: [],
            columns: [
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
                                <EditButton record={record} address={"currentPhone"}/>
                                <DeleteButton record={record} address={"currentPhone"}/>
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
                    <CreateButton columns={this.state.columns} address={"currentPhone"}/>
                    <ExcelSimpleExportButton dataSource={this.state.dataSource} entozh={this.state.entozh}/>
                </ButtonGroup>
            }>

                <Table dataSource={this.state.dataSource} columns={this.state.columns}/>
            </Card>
        );
    }
}

export default CurrentPhone;