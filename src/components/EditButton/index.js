import React, {Component} from 'react';
import {Button, Form, Input, message, Modal} from "antd"
import {update} from "../../api"

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 12},
};

// 修改 弹出窗
const editContent = (record, address) => {

    const onFinish = values => {

        let apiAddresss = `${address}/${values._id}`
        update(apiAddresss, values)
            .then(res => {
                message.success('修改数据成功！');
            })
            .catch(error => {
                message.error("恭喜你~需要联系John~")
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


            {
                Object.keys(record).map(item => {
                    if (item !== "operation") {
                        return (
                            <Form.Item label={item} name={item} initialValue={record[item]}
                                       rules={[{required: true, message: '请勿留空!'}]}>
                                <Input disabled={(item === "__v" || item === "_id")}/>
                            </Form.Item>
                        )
                    }

                })
            }

            <Button type="primary" htmlType="submit" style={{width: "100%", marginTop: "10px"}}>
                提交
            </Button>
        </Form>
    )
}

class EditButton extends Component {
    constructor(props) {
        super(props);
    }

    // 点击 修改按钮 触发此函数
    editHandler = (record, address) => {
        Modal.info({
            title: "Update更新",
            content: editContent(record, address),
            width: 800,
            okText: "取消",
            okType: "dashed",
            onOk: () => {
                console.log("用户取消操作", record._id)
            }
        })

    }

    render() {
        return (
            <Button size={"small"} type={"primary"}
                    onClick={this.editHandler.bind(this, this.props.record, this.props.address)}
            >
                修改
            </Button>
        );
    }
}

export default EditButton;