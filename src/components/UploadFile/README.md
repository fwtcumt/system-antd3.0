 * 文件上传组件属性说明
 * 
 * props.className
 * 意义：给组件最外层元素增加chass类
 * 类型：string
 * 默认值：''
 * 
 * props.style
 * 意义：给组件最外层元素增加内联样式
 * 类型：object
 * 默认值：undefined
 * 
 * props.layout
 * 意义：文件展示的样式
 * 类型：string
 * 可用值：rectangle[default]/square
 * 
 * props.fileType
 * 意义：上传文件类型
 * 类型：string
 * 可用值：file[default]/image/video/audio
 * 
 * props.addBtnType
 * 意义：上传按钮样式
 * 类型：string
 * 可用值：button[default]/dragger
 * 
 * props.accept
 * 意义：可以选择的文件类型
 * 类型：string
 * 默认值："*"
 * 举例："image/*,.jpg,.jpeg,.png,.gif"
 * 
 * props.limit
 * 意义：文件上传限制对象
 * 类型：object
 * 默认值：undefind
 * 举例：{ size: 100, ratio: 2, width: 300, height: 200 }
 * size 文件大小，单位K
 * ratio 图片宽高比。只fileType为image时有效。支持两位小数
 * width 图片宽度，单位px。只fileType为image且同时有height时有效
 * height 图片高度，单位px。只fileType为image且同时有width时有效
 * 
 * props.maxLength
 * 意义：文件列表最大长度
 * 类型：number
 * 
 * props.multiple
 * 意义：是否可多选文件
 * 类型：bool
 * 默认值：false
 * 注意：设置成 true 后，多文件上传是同时发起多个单文件上传请求，allowCrop将会无效
 * 
 * props.allowCrop
 * 意义：是否需要裁剪图片
 * 类型：bool
 * 默认值：false
 * 注意：如设置为true，fileType必须为image，multiple必须为false，且limit同时具有width和height才会有效
 * 
 * props.allowEdit
 * 意义：是否允许重新裁剪图片
 * 类型：bool
 * 默认值：false
 * 注意：只有图片才支持，fileType必须为image，limit的width和height必须有值，对应的图片必须有originUrl，和allowCrop无关
 * 
 * props.value
 * 意义：文件列表
 * 类型：array
 * 举例：[ { fileName: '', fileUrl: '', downloadUrl: '', originUrl: '', mark: '', file: null, errMsg: '' } ]
 * fileName 文件名称(必须)
 * fileUrl 文件绝对地址(必须)
 * downloadUrl 文件下载地址
 * originUrl 源文件地址，用于图片编辑
 * mark 文件唯一性标识(必须)
 * file 用于标记新选择的文件对象(组件内部专用)
 * errMsg 用于标记选择的不合法文件(组件内专用)
 * 
 * props.onChange
 * 意义：value改变时触发的函数
 * 类型：function
 * 举例：value => {}


 * accept举例:
 * xx.txt   text/plain
 * xx.doc   application/msword
 * xx.docx  application/vnd.openxmlformats-officedocument.wordprocessingml.document
 * xx.xls   application/vnd.ms-excel
 * xx.xlsx  application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
 * xx.pdf   application/pdf
 * xx.ppt   application/vnd.ms-powerpoint
 * xx.pptx  application/vnd.openxmlformats-officedocument.presentationml.presentation
 * xx.zip   aplication/zip
 * xx.jpg   image/jpeg
 * xx.mp3   audio/mpeg
 * xx.mp4   video/mp4
 * 完整的看这个地址：https://blog.csdn.net/ssgo66/article/details/83621798


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