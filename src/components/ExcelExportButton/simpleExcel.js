import {Button} from "antd"
import React, {Component} from 'react';
import XLSX from "xlsx";

class ExcelSimpleExportButton extends Component {
    constructor(props) {
        super(props);
    }

    // 点击 导出Excel文件
    xmlSimpleHandler = () => {

        let entozh = this.props.entozh;
        let nowdata = this.props.dataSource;

        const json = nowdata.map((item) => {
            return Object.keys(item).reduce((newData, key) => {
                if (key !== "password" && key !== "voicemail" && key !== "icloudPassword") {
                    const newKey = entozh[key] || key
                    newData[newKey] = item[key]
                }

                return newData
            }, {})
        });

        const sheet = XLSX.utils.json_to_sheet(json);

        this.openDownloadDialog(this.sheet2blob(sheet, undefined), `excel表.xlsx`);

    }

    openDownloadDialog = (url, saveName) => {
        if (typeof url == 'object' && url instanceof Blob) {
            url = URL.createObjectURL(url); // 创建blob地址
        }
        let aLink = document.createElement('a');
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



    render() {
        return (
            <Button size={"small"} type="dashed" danger
                onClick={this.xmlSimpleHandler}
            >
                导出Excel
            </Button>
        );
    }
}

export default ExcelSimpleExportButton;