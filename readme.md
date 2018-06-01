阿里云签名
---
[阿里云开放开发API](https://developer.aliyun.com/api)  
[阿里云公共参数参考文档](https://help.aliyun.com/document_detail/25490.html?spm=a2c4g.11186623.6.832.Ahb31k)  
[阿里云签名机制参考文档](https://help.aliyun.com/document_detail/25492.html?spm=a2c4g.11186623.2.9.NFgXjh)  


### Install
```sh
npm i aliyun-sign --save
```

### Usage
创建签名结构体，使用[Axios](https://www.npmjs.com/package/axios)发起请求
```js
const axiso = require('axios')
const Sign = require('aliyun-sign').Sign
const sign = new Sign({
    AccessKeyId: 'your AccessKeyId',
    AccessKeySecret: 'your AccessKeySecret'
})
/// 阿里云API必须参数示例
/// 公共参数也是在这里定义
const params = {
    Action: 'DescribeLoadBalancerAttribute',
    LoadBalancerId: 'your LoadBalancerId',
    RegionId: 'cn-hangzhou'
}
/// 邀请求的 api url
const url = 'http://slb.aliyuncs.com/'

/// 创建阿里云要求的签名结构体
const aliyunSign = sign.create('GET', params)

/// 直接创建请求参数字符串
const aliyunSignString = sign.stringify('GET', params)

/// 签名结构体转化为字符串
/// aliyunSignString === aliyunSignString2 => true
const aliyunSignString2 = sign.paramsParser(aliyunSign)

axios
    .get([url, aliyunSignString].join('?'))
    .then(res => console.log(res.data))
    .catch(err => console.log(err.response.data))
```
  
使用内建``Request``发起请求 自动创建签名
```js
/// Request是基于axios和Sign的封装
/// 可用于直接创建请求体
const Request = require('aliyun-sign').Request
const request = new Request({
    AccessKeyId: 'your AccessKeyId',
    AccessKeySecret: 'your AccessKeySecret'
})
const params = {
    Action: 'DescribeLoadBalancerAttribute',
    LoadBalancerId: 'your LoadBalancerId',
    RegionId: 'cn-hangzhou'
}
/// 邀请求的 api url
const url = 'http://slb.aliyuncs.com/'

request
    .get(url, params)
    .then(res => console.log(res.data))
    .catch(err => console.log(err.response.data))
```


### Test
```sh
npm test
```