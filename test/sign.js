const axios = require('axios')
const assert = require('assert')
const Sign = require('../app').Sign
const auth = {
    AccessKeyId: 'your AccessKeyId',
    AccessKeySecret: 'your AccessKeySecret'
}
const sign = new Sign(auth)
const url = 'http://slb.aliyuncs.com/'

let params = {
    Action: 'DescribeLoadBalancerAttribute',
    LoadBalancerId: 'your LoadBalancerId',
    RegionId: 'cn-hangzhou'
}

assert.notEqual(auth.AccessKeyId, 'your AccessKeyId', '请输入阿里云AccessKeyId')
assert.notEqual(auth.AccessKeySecret, 'your AccessKeySecret', '请输入阿里云AccessKeySecret')

describe('Sign', () => {

    it('sign.create', () => {
        let aliyunSign = sign.create('GET', params)
        assert.equal(typeof aliyunSign.Signature, 'string')
    })

    it('sign.stringify', () => {
        let aliyunSignString = sign.stringify('GET', params)
        assert.equal(typeof aliyunSignString, 'string')
    })

    it('request', async() => {
        let aliyunSignString = sign.stringify('GET', params)
        let res = await axios.get([url, aliyunSignString].join('?'))
        assert.equal(res.status, 200)
    })
})
