import React, {Component} from 'react';
import {Space, Form, Card, Button, Table, Modal, Input, message} from 'antd';
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons"
import ButtonGroup from "antd/es/button/button-group";
import {create, getTopics, update} from "../../../api"
import ExcelComplexExportButton from "../../../components/ExcelExportButton/complexExcel"
import DeleteButton from "../../../components/DeleteButton";


// 这layout, formItemLayout, formItemLayoutWithOutLabel三个样式是调节Form.List的
const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 12},
};

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 20},
    },
};

const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: {span: 24, offset: 0},
        sm: {span: 20, offset: 8},
    },
};

// 修改 弹出框
const editContent = (record) => {

    const emailList = [];
    record.childrenEmail.map((data) => {
        emailList.push(data.childEmail)
    })

    const onFinish = values => {
        let apiAddress = `/cconestep-email/${values.key}`;
        let parentEmail = {}
        // 自己挖的坑自己填~自己配置关键词

        let childrenEmailList = []

        values.childrenEmail.forEach((value, index) => {
            const childrenEmail = {
                key : index + 1,
                childEmail: value,
                platform: "GoDaddy"
            }
            childrenEmailList.push(childrenEmail);
        })

        parentEmail["name"] = values.name;
        parentEmail["parentEmail"] = values.parentEmail;
        parentEmail["password"] = values.password;
        parentEmail["childrenEmail"] = childrenEmailList ;

        update(apiAddress, parentEmail)
            .then(res => {
                message.success('修改数据成功！');
            })
            .catch(error => {
                message.error("需要联系John~")
            })
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            {...layout}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{childrenEmail: emailList}}
        >

            {/* 编号*/}
            <Form.Item
                label="Key编号"
                name="key"
                initialValue={record._id}
            >
                <Input disabled={true}/>
            </Form.Item>

            {/* 姓名 */}
            <Form.Item
                label="Name姓名"
                name="name"
                rules={[{required: true, message: '请填入您的姓名!'}]}
                initialValue={record.name}
            >
                <Input/>
            </Form.Item>

            {/* 主邮箱 */}
            <Form.Item
                label="Parent Email主邮箱"
                name={"parentEmail"}
                rules={[{required: true, message: '请填入您的主邮箱!'}]}
                initialValue={record.parentEmail}
            >
                <Input/>
            </Form.Item>

            {/* 主邮箱密码 */}
            <Form.Item
                label="Password密码"
                name={"password"}
                rules={[{required: true, message: '请填入您的主邮箱密码!'}]}
                initialValue={record.password}
            >
                <Input/>
            </Form.Item>

            {/* 次邮箱 */}
            <Form.List name="childrenEmail">

                {(fields, {add, remove}, {errors}) => (
                    <>

                        {fields.map((field, index) => (
                            <Form.Item
                                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                label={index === 0 ? 'Children Email子邮箱' : ''}
                                required={false}
                                key={field.key}
                            >
                                <Form.Item
                                    {...field}
                                    validateTrigger={['onChange', 'onBlur']}
                                    rules={[
                                        {
                                            required: true,
                                            whitespace: true,
                                            message: "Please input passenger's name or delete this field.",
                                        },
                                    ]}
                                    noStyle
                                >
                                    <Input placeholder="Email" style={{width: '75%'}}/>
                                </Form.Item>
                                {fields.length > 1 ? (
                                    <MinusCircleOutlined
                                        style={{marginLeft: "30px"}}
                                        className="dynamic-delete-button"
                                        onClick={() => remove(field.name)}
                                    />
                                ) : null}
                            </Form.Item>
                        ))}


                        <Button
                            type="dashed"
                            onClick={() => {
                                add("", 0);
                            }}
                            style={{width: '100%'}}
                            icon={<PlusOutlined/>}
                        >
                            Add New Child Email
                        </Button>
                    </>
                )}
            </Form.List>

            <Button type="primary" htmlType="submit" style={{width: "100%", marginTop: "10px"}}>
                提交
            </Button>


        </Form>
    )

}

// 新增 弹出框
const createContent = () => {

    const onFinish = values => {

        let apiAddress = `/cconestep-email`;
        let parentEmail = {}
        // 自己挖的坑自己填~自己配置关键词

        let childrenEmailList = []

        values.childrenEmail.forEach((value, index) => {
            const childrenEmail = {
                key : index + 1,
                childEmail: value,
                platform: "GoDaddy"
            }
            childrenEmailList.push(childrenEmail);
        })

        parentEmail["name"] = values.name;
        parentEmail["parentEmail"] = values.parentEmail;
        parentEmail["password"] = values.password;
        parentEmail["childrenEmail"] = childrenEmailList ;


        create(apiAddress, parentEmail)
            .then(res => {
                message.success('新增数据成功！');
            })
            .catch(error => {
                message.error("需要联系John~")
            })
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };


    return (
        <Form
            {...layout}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >

            {/* 姓名 */}
            <Form.Item
                label="Name姓名"
                name="name"
                rules={[{required: true, message: '请填入您的姓名!'}]}
            >
                <Input/>
            </Form.Item>

            {/* 主邮箱 */}
            <Form.Item
                label="Parent Email主邮件"
                name={"parentEmail"}
                rules={[{required: true, message: '请填入您的主邮箱!'}]}
            >
                <Input/>
            </Form.Item>

            {/* 主邮箱密码 */}
            <Form.Item
                label="Password密码"
                name={"password"}
                rules={[{required: true, message: '请填入您的主邮箱密码!'}]}
            >
                <Input/>
            </Form.Item>

            {/* 次邮箱 */}
            <Form.List name="childrenEmail">

                {(fields, {add, remove}) => (
                    <>

                        {fields.map((field, index) => (
                            <Form.Item
                                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                label={index === 0 ? 'Children Email子邮箱' : ''}
                                required={false}
                                key={field.key}
                            >
                                <Form.Item
                                    {...field}
                                    validateTrigger={['onChange', 'onBlur']}
                                    rules={[
                                        {
                                            required: true,
                                            whitespace: true,
                                            message: "Please input passenger's name or delete this field.",
                                        },
                                    ]}
                                    noStyle
                                >
                                    <Input placeholder="Email" style={{width: '75%'}}/>
                                </Form.Item>
                                {fields.length > 1 ? (
                                    <MinusCircleOutlined
                                        style={{marginLeft: "30px"}}
                                        className="dynamic-delete-button"
                                        onClick={() => remove(field.name)}
                                    />
                                ) : null}
                            </Form.Item>
                        ))}


                        <Button
                            type="dashed"
                            onClick={() => {
                                add("", 0);
                            }}
                            style={{width: '100%'}}
                            icon={<PlusOutlined/>}
                        >
                            Add New Child Email
                        </Button>
                    </>
                )}
            </Form.List>

            <Button type="primary" htmlType="submit" style={{width: "100%", marginTop: "10px"}}>
                提交
            </Button>


        </Form>
    )
}


// CCONESTEP 主控件
class CconestepEmail extends Component {
    // 设置this.state
    constructor(props) {
        super(props);
        this.state = {
            // Excel 导出 中英对比
            entozh: {
                "key": "编号",
                "name": "姓名",
                "parentEmail": "主邮箱",
                "childrenEmail": "次邮箱"
            },
            // 主表结构
            parentColumns: [
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
                                <Button size={"small"} type="primary"
                                        onClick={this.editHandler.bind(this, record)}>修改</Button>
                                <DeleteButton record={record} address={"/cconestep-email"}/>
                            </ButtonGroup>
                        )
                    }

                },
            ],
            // 次表结构
            childColumns: [
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
            ],
            // 获取到的数据
            dataSource: [],
            total: 100,
            isLoading: false,
        }
    }

    // 点击 新增按钮 会触发此函数
    createHandler = () => {
        Modal.info({
            title: "Create新增",
            content: createContent(),
            width: 800,
            okText: "取消",
            okType: "dashed",
            onOk: () => {
                console.log("用户取消操作")
            }
        })
    }
    // 点击 修改按钮 触发此函数
    editHandler = (record) => {
        Modal.info({
            title: "Update更新",
            content: editContent(record),
            width: 800,
            okText: "取消",
            okType: "dashed",
            onOk: () => {
                console.log("用户取消操作", record.key)
            }
        })

    }

    // 次表
    expandedRowRender = (data) => {
        return <Table columns={this.state.childColumns} dataSource={data.childrenEmail} pagination={false}/>;
    };

    // 渲染前， 获取数据
    componentDidMount() {
        this.setState({isLoading: true})
        // 通过 "/cconestepEmail" 来获取对应页面的数据
        getTopics("/cconestep-email").then(response => {
            this.setState(
                {
                    dataSource: response.result.list
                }
            )
        }).catch(error => {
            throw error
        }).finally(() => {
            this.setState({isLoading: false})
        })
    }

    render() {
        return (
            <Card title="CCONESTEP加合移民公司" extra={
                <ButtonGroup>
                    <Button size={"small"} type="text" danger onClick={this.createHandler}>新增</Button>
                    <ExcelComplexExportButton dataSource={this.state.dataSource} entozh={this.state.entozh}/>
                </ButtonGroup>
            }>
                {/*将this.state传递数据*/}
                <Table
                    loading={this.state.isLoading}
                    //使用主表
                    columns={this.state.parentColumns}
                    dataSource={this.state.dataSource}
                    //使用次表
                    expandable={{
                        expandedRowRender: this.expandedRowRender,
                        defaultExpandAllRows: true
                    }}
                />

            </Card>
        );
    }
}

export default CconestepEmail;