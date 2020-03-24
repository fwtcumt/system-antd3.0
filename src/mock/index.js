/**
 * mock说明
 * 1. 我们的 mock 显然是入侵式的，但这样可以更灵活控制。毕竟需要 mock 的接口应该不会太多。
 * 2. 切记在上线前去掉以下所有 mock 引用。
 * 3. 用 mock-x 的原因是 mock 更改了原生 xhr 对象，导致上传监听事件无法设置
 * 4. 即便如此，mock-x 还是会影响一些上传行为，测试上传时记得去掉 mock 引用
*/

import './permiMock';
import './menuMock';
import './statMock';
import './asiaListMock';
import './asiaEditMock';
import './asiaRemarkMock';
