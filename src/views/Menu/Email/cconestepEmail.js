import React, {Component} from 'react';
import {Space, Form, Card, Button, Table, Modal, Input} from 'antd';
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons"
import ButtonGroup from "antd/es/button/button-group";
import {getTopics} from "../../../api"
import XLSX from 'xlsx';


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

// 修改 弹出框
const editContent = (record) => {

    const emailList = [];
    record.childrenEmail.map((data) => {
        emailList.push(data.childEmail)
    })

    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            xs: {span: 24, offset: 0},
            sm: {span: 20, offset: 8},
        },
    };

    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };


    const submitHandle = (e) => {
        console.log(e)

    }

    return (
        <Form
            {...layout}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{childrenEmail: emailList}}
            onSubmitCapture={submitHandle}
        >

            {/* 编号*/}
            <Form.Item
                label="key"
                name="key"
                initialValue={record.key}
            >
                <Input disabled={true}/>
            </Form.Item>

            {/* 姓名 */}
            <Form.Item
                label="name"
                name="name"
                rules={[{required: true, message: '请填入您的姓名!'}]}
                initialValue={record.name}
            >
                <Input/>
            </Form.Item>

            {/* 主邮箱 */}
            <Form.Item
                label="parentEmail"
                name={"parentEmail"}
                rules={[{required: true, message: '请填入您的主邮箱!'}]}
                initialValue={record.parentEmail}
            >
                <Input/>
            </Form.Item>

            {/* 主邮箱密码 */}
            <Form.Item
                label="password"
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
                                label={index === 0 ? 'Children Email' : ''}
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
                Submit
            </Button>


        </Form>
    )

}

// 新增 弹出框
const createContent = () => {

    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            xs: {span: 24, offset: 0},
            sm: {span: 20, offset: 8},
        },
    };

    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };


    const submitHandle = (e) => {
        console.log(e)

    }

    return (
        <Form
            {...layout}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onSubmitCapture={submitHandle}
        >

            {/* 姓名 */}
            <Form.Item
                label="name"
                name="name"
                rules={[{required: true, message: '请填入您的姓名!'}]}
            >
                <Input/>
            </Form.Item>

            {/* 主邮箱 */}
            <Form.Item
                label="parentEmail"
                name={"parentEmail"}
                rules={[{required: true, message: '请填入您的主邮箱!'}]}
            >
                <Input/>
            </Form.Item>

            {/* 主邮箱密码 */}
            <Form.Item
                label="password"
                name={"password"}
                rules={[{required: true, message: '请填入您的主邮箱密码!'}]}
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
                                label={index === 0 ? 'Children Email' : ''}
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
                Submit
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
                                <Button size={"small"} type="danger"
                                        onClick={this.delHandler.bind(this, record)}>删除</Button>
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

    // 点击 导出Excel文件
    handleExportAll = (e) => {
        const entozh = {
            "key": "编号",
            "name": "姓名",
            "parentEmail": "主邮箱",
            "childrenEmail": "次邮箱"
        }

        const nowdata = this.state.dataSource;


        const json = nowdata.map((item) => {
            return Object.keys(item).reduce((newData, key) => {
                if (key !== "password" && key !== "childrenEmail") {
                    const newKey = entozh[key] || key
                    newData[newKey] = item[key]
                }

                if (key === "childrenEmail") {
                    let childEmail = "";
                    item[key].map((email) => {
                        childEmail = `${email.childEmail}, ${childEmail}`
                    })
                    const newKey = entozh[key]||key
                    newData[newKey] = childEmail
                }


                return newData
            }, {})
        });

        const sheet = XLSX.utils.json_to_sheet(json);

        this.openDownloadDialog(this.sheet2blob(sheet, undefined), `CCONESTEP邮件.xlsx`);

    }
    openDownloadDialog = (url, saveName) => {
        if (typeof url == 'object' && url instanceof Blob) {
            url = URL.createObjectURL(url); // 创建blob地址
        }
        var aLink = document.createElement('a');
        aLink.href = url;
        aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
        var event;
        if (window.MouseEvent) event = new MouseEvent('click');
        else {
            event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        }
        aLink.dispatchEvent(event);
    }
    sheet2blob = (sheet, sheetName) => {
        sheetName = sheetName || 'sheet1';
        var workbook = {
            SheetNames: [sheetName],
            Sheets: {}
        };
        workbook.Sheets[sheetName] = sheet; // 生成excel的配置项

        var wopts = {
            bookType: 'xlsx', // 要生成的文件类型
            bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
            type: 'binary'
        };
        var wbout = XLSX.write(workbook, wopts);
        var blob = new Blob([s2ab(wbout)], {
            type: "application/octet-stream"
        }); // 字符串转ArrayBuffer
        function s2ab(s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }

        return blob;
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
    // 点击 删除按钮 触发此函数
    delHandler = (record) => {
        Modal.confirm({
            title: "Delete删除",
            content: "是否要删除当前数据？此操作不可逆！",
            onCancel: () => {
                console.log("用户取消操作")
            },
            onOk: () => {
                console.log("用户确认操作", record.key)
                // 发送异步请求，通过接口把当前的这条记录删除调用
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
        getTopics("/cconestepEmail").then(response => {
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
                    <Button size={"small"} type="dashed" danger onClick={this.handleExportAll}>导出Excel</Button>
                </ButtonGroup>
            }>
                {/*将this.state传递数据*/}
                <Table
                    className="components-table-demo-nested"
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