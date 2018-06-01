/**
 * 
 * @desc 创建阿里云api签名结构体
 * @date 2018-06-01
 * @author gavinning gavinning@qq.com
 *
 * @history
 *    created at 2018-06-01 by gavinning
 *
 */

const uuid = require('uuid')
const crypto = require('crypto')
const SignType = require('../type/SignType')

class Sign {
    /**
     * @param {SignType} options 
     */
    constructor(options) {
        this.options = options
    }

    /// 阿里云要求的签名的算法
    HmacSHA1(str, key) {
        let hmac = crypto.createHmac('sha1', key)
        hmac.update(str)
        return hmac.digest('base64')
    }
    
    /**
     * {} => string
     * @param {Object} params 需要格式化成字符串的对象
     * @param {Boolean} isEncode 是否需要encode 默认false
     * @return {String}
     */
    paramsParser(params, isEncode = false) {
        let result = []
        for (let key in params) {
            isEncode ?
                result.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key])):
                result.push(key + '=' + params[key])
        }
        return result.join('&')
    }

    /**
     * 创建阿里云要求的结构体
     * @param {String} method GET or POST
     * @param {Object} query GET请求url参数
     * @param {Object} body POST请求数据结构体
     * @return {Object}
     */
    create(method = 'GET', query = {}, body = {}) {
        let date = new Date()
        let publicParams = {
            Format: 'json',
            RegionId: 'cn-hangzhou',
            Version: '2014-05-15',
            AccessKeyId: this.options.AccessKeyId,
            SignatureMethod: 'HMAC-SHA1',
            SignatureNonce: uuid.v4(),
            SignatureVersion: '1.0',
            Timestamp: date.toISOString().replace(/\.\d{3}/, '')
        }
        // 合并公共参数
        let tmp = Object.assign(publicParams, query, body)
        let params = {}

        // 按照阿里云要求对Key排序
        Object.keys(tmp).sort().forEach(key => {
            params[key] = tmp[key]
        })

        // 签名所需字符串
        let signString = [method, encodeURIComponent('/'), encodeURIComponent(this.paramsParser(params, true))].join('&')
        // 创建阿里云要求的签名
        let signature = this.HmacSHA1(signString, this.options.AccessKeySecret + '&')
        params.Signature = encodeURIComponent(signature)
        return params
    }

    /**
     * 创建阿里云要求的结构体 返回GET请求需要的字符串
     * @param {String} method GET or POST
     * @param {Object} query GET请求url参数
     * @param {Object} body POST请求数据结构体
     * @return {String}
     */
    stringify(method, query, body) {
        return this.paramsParser(this.create(method, query, body))
    }
}

module.exports = Sign