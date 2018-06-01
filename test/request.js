const assert = require('assert')
const Request = require('../app').Request
const auth = {
    AccessKeyId: 'your AccessKeyId',
    AccessKeySecret: 'your AccessKeySecret'
}
const request = new Request(auth)
const url = 'http://slb.aliyuncs.com/'

let params = {
    Action: 'DescribeLoadBalancerAttribute',
    LoadBalancerId: 'your LoadBalancerId',
    RegionId: 'cn-hangzhou'
}

assert.notEqual(auth.AccessKeyId, 'your AccessKeyId', '请输入阿里云AccessKeyId')
assert.notEqual(auth.AccessKeySecret, 'your AccessKeySecret', '请输入阿里云AccessKeySecret')

describe('Request', () => {

    it('request', async() => {
        let res = await request.get(url, params)
        assert.equal(res.status, 200)
    })
})