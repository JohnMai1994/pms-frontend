import React, {Component} from 'react';
import {Button, Modal} from "antd"

class DeleteButton extends Component {

    constructor(props) {
        super(props);
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


    render() {
        return (
            <Button size={"small"} type={"danger"}
                    onClick={this.delHandler.bind(this, this.props.record)}
            >
                删除
            </Button>
        );
    }
}

export default DeleteButton;