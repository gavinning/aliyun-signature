/**
 * 
 * @desc 发起阿里云api请求
 * @date 2018-06-01
 * @author gavinning gavinning@qq.com
 *
 * @history
 *    created at 2018-06-01 by gavinning
 *
 */

const Sign = require('./Sign')
const SignType = require('../type/SignType')
const axios = require('axios')

class Request {
    /**
     * 点击文件可查看参数类型
     * @param {SignType} options 
     */
    constructor(options) {
        this.sign = new Sign(options)
    }

    /**
     * 支持GET请求的阿里云api
     * @param {String} url 请求的url
     * @param {Object} params GET请求参数结构体
     */
    get(url, params) {
        return axios.get([url, this.sign.stringify('GET', params)].join('?'))
    }
}

module.exports = Request