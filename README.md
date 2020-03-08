## 后台管理系统模板
<a target="_blank" href="https://fwtcumt.github.io/system-antd3.0/">链接地址</a>

```bash
  # 本地开发启动
  yarn
  yarn start # 在 http://localhost:3000/ 访问
```
```bash
  # 测试环境构建
  yarn
  yarn build:test
```
```bash
  # 生产环境构建
  yarn
  yarn build
```

### 关键项说明
```js
  // 系统配置中可以配置哪些信息

  1. "domain.js 中配置全局接口域名 和 全局跳转域名"
  2. "system.js 中配置系统本身相关信息"
```
```js
  // 我的全局性静态资源放哪

  "放 src/assets 中"
```
```js
  // 我的全局性React组件放哪

  "放 src/components 中"
```
```js
  // 我的全局性工具函数放哪
  
  "放 src/utils 中，我们推荐按照处理的对象分成不同的文件"
```
```js
  // 我如何添加一个路由页面呢
  
  1. "新建一个名为 route.js 的文件，放在 src/pages 下。"
  2. "route.js 的配置请参考已有的示例。"
  3. "我们推荐和一个路由相关的资源都放在一个文件夹下。"
  4. "路由中的两个特殊字段："
     "fatherPath：父路由通过这个值找到其子路由"
     "permission：路由权限"
```
```js
  // 我如何存取全局数据呢
  
  1. "src/utils/handleStore 会暴露出 { setStore, getStore }。"
  2. "setStore 用于存数据，推荐格式：setStore('data', [data, setData])。"
      "setData 是设置 data 的钩子函数。"
  3. "getStore 用于取数据，推荐格式：const [data, setData] = getStore('data')。"
      "具体取数据的方式会因所存的数据格式而变。"
```
```js
  // 我如何使用mock数据呢
  
  1. "在 src/mock 中建立一个 mock 规则文件。"
  2. "我们推荐使用一个文件 mock 一个接口。"
  3. "参照已提供的 mock 示例写 mock 规则。"
  4. "在 src/mock/index.js 中引入 mock 规则文件即可拦截相应请求。"
  5. "在使用完后请去除 mock 文件引用。"
```
