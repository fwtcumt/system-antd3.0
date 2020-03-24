 * 文件上传组件属性说明：

| 属性名称 | 意义 | 类型 | 可用值 | 默认值 | 举例 | 举例说明 | 注意事项 |
| -----| ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| className | 给组件最外层元素增加chass类 | string | 略 | undefined | 略 | 略 | 略 |
| style | 给组件最外层元素增加内联样式 | object | 略 | undefined | 略 | 略 | 略 |
| layout | 文件展示的样式 | string | rectangle/square | rectangle | 略 | 略 | 略 |
| fileType | 指定上传文件的类型 | string | file/image/video/audio | file | 略 | 略 | 略 |
| addBtnType | 上传按钮样式 | string | button/dragger | button | 略 | 略 | 略 |
| accept | 可以选择的文件类型 | string | 略 | "*" | "image/*,.jpg,.jpeg,.png,.gif" | 略 | 略 |
| limit | 文件上传限制对象 | object | 略 | undefind | { size: 100, ratio: 2, width: 300, height: 200 } | size：文件大小，单位K。ratio：图片宽高比。只适用于fileType为image。支持两位小数。width：图片宽度，单位px。只fileType为image且同时有height时有效。height：图片高度，单位px。只fileType为image且同时有width时有效。 | 略 |
| maxLength | 文件列表最大长度 | number | 略 | undefined | 略 | 略 | 略 |
| multiple | 是否可多选文件 | bool | 略 | false | 略 | 略 | 多文件上传是同时发起多个单文件上传请求。对于图片上传，设置成true后allowCrop将会无效。 |
| allowCrop | 是否需要裁剪图片 | bool | 略 | false | 略 | 略 | 只适用于fileType为image。如设置为true，multiple必须为false，且limit同时具有width和height才会有效。 |
| allowEdit | 是否允许重新裁剪图片 | bool | 略 | false | 略 | 略 | 只适用于fileType为image。limit必须有width和height，必须有originUrl。虽然编辑用裁剪功能但是和allowCrop无关。 |
| value | 文件列表 | array | 略 | undefined | [ { fileName: '', fileUrl: '', downloadUrl: '', originUrl: '', mark: '', file: null, errMsg: '' } ] | fileName：文件名称(必须)。fileUrl：文件绝对地址(必须)。downloadUrl：文件下载地址。originUrl：源文件地址，用于图片编辑。mark：文件唯一性标识(必须)。file：用于标记新选择的文件对象(组件内部专用)。errMsg：用于标记选择的不合法文件(组件内部专用)。 | 略 |
| onChange | value改变时触发，回传新value | function | 略 | undefined | value => {} | 略 | 略 |


* accept举例，完整示例请访问[这里](https://blog.csdn.net/ssgo66/article/details/83621798)
 ```bash
xx.txt   text/plain
xx.doc   application/msword
xx.docx  application/vnd.openxmlformats-officedocument.wordprocessingml.document
xx.xls   application/vnd.ms-excel
xx.xlsx  application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
xx.pdf   application/pdf
xx.ppt   application/vnd.ms-powerpoint
xx.pptx  application/vnd.openxmlformats-officedocument.presentationml.presentation
xx.zip   aplication/zip
xx.jpg   image/jpeg
xx.mp3   audio/mpeg
xx.mp4   video/mp4
```


 * 全部属性使用示例如下：
 ```jsx
  <UploadFile
    className="your-upload"
    style={{ width: 470 }}
    layout="square" // rectangle square
    fileType="image" // file image video audio
    addBtnType="button" // button dragger
    accept="image/*,.jpg,.jpeg,.png,.gif"
    limit={{ width: 500, height: 200 }}
    maxLength={10}
    multiple
    allowCrop
    allowEdit
    value={this.state.value}
    onChange={v => this.setState({ value: v })}
  />
```