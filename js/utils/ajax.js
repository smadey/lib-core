import fetch from './fetch';

// 服务器地址
const serverUrl = '';

const encode = encodeURIComponent;

// 全局请求头
const headers = {
};

// 全局请求参数
const ajaxData = {
};

/**
 * 获取请求的 headers
 * @param  {Object} _headers 合并之前的请求头
 * @return {Object} 合并“全局请求头”之后的请求头
 */
function getHeaders(_headers = {}) {
    return Object.assign(_headers, headers);
}

/**
 * 获取请求的数据
 * @param  {Object} _ajaxData 合并之前的请求数据
 * @return {Object} 合并“全局data”之后的data
 */
function getAjaxData(_ajaxData = {}) {
    return Object.assign(_ajaxData, ajaxData);
}

/**
 * 将请求对象换成字符串
 * @param  {Object} obj 请求对象
 * @return {String} 请求字符串
 */
function getQueryString(obj) {
    if (!obj) {
        return '';
    }

    const params = [];

    Object.keys(obj).forEach((key) => {
        let value = obj[key];

        if (value === null || value === undefined) {
            value = '';
        }

        params.push(`${encode(key)}=${encode(value)}`);
    });

    return params.join('&').replace(/%20/g, '+');
}

/**
 * 检查请求的返回状态码
 * @param  {Object} response 服务器响应结果
 * @return {Object} 正常的响应结果
 */
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

/**
 * 将服务器相应结果转换为json
 * @param  {Object} response 服务器响应结果
 * @return {[type]} JSON数据
 */
function parseJSON(response) {
    return response.json();
}

/**
 * 请求成功回调函数
 * @param  {Object} result 服务器返回结果
 * @return {Object} 正常的数据 或者 失败的Promise
 */
function successCallback(result) {
    if (result.code === 0) {
        return result;
    }

    return Promise.reject(result.msg);
}
/**
 * 请求失败回调函数
 * @param  {Object} ex 失败信息
 * @return {Object} 失败的Promise
 */
function errorCallback(ex) {
    console.error(`请求失败："${ex}"`); // eslint-disable-line no-console
    return Promise.reject(ex);
}

/**
 * 添加请求头
 * @param  {String} name  请求头名称
 * @param  {String} value 请求头内容
 */
export function appendHeaders(name, value) {
    if (name) {
        headers[name] = value;
    }
}

/**
 * 移除请求头
 * @param  {String} name 请求头名称
 */
export function removeHeaders(name) {
    delete headers[name];
}
/**
 * 添加请求数据
 * @param  {String} name  请求数据名称
 * @param  {String} value 请求数据内容
 */
export function appendAjaxData(name, value) {
    if (name) {
        ajaxData[name] = value;
    }
}

/**
 * 移除请求数据
 * @param  {String} name 请求数据名称
 */
export function removeAjaxData(name) {
    delete ajaxData[name];
}

/**
 * Get请求
 * @param  {String} url    路径
 * @param  {Object} params 参数
 * @return {Promise} 请求Promise
 */
export function get(url, params) {
    const options = {
        headers: getHeaders(),
    };

    let queryString = getQueryString(getAjaxData(params));

    if (queryString) {
        if (url.indexOf('?') === -1) {
            queryString = `?${queryString}`;
        } else {
            queryString = `&${queryString}`;
        }
    }

    return fetch(`${serverUrl}${url}${queryString}`, options)
        .then(checkStatus)
        .then(parseJSON)
        .catch(errorCallback);
}

/**
 * Get请求（返回JSON）
 * @param  {String} url    路径
 * @param  {Object} params 参数
 * @return {Promise} 请求Promise
 */
export function getJSON(url, params) {
    const options = {
        headers: getHeaders(),
        // mode: 'no-cors',
    };

    let queryString = getQueryString(getAjaxData(params));

    if (queryString) {
        if (url.indexOf('?') === -1) {
            queryString = `?${queryString}`;
        } else {
            queryString = `&${queryString}`;
        }
    }

    return fetch(`${serverUrl}${url}${queryString}`, options)
        .then(checkStatus)
        .then(parseJSON)
        .then(successCallback)
        .catch(errorCallback);
}

/**
 * Post请求
 * @param  {String} url  路径
 * @param  {Object} data 参数
 * @return {Promise} 请求Promise
 */
export function post(url, data) {
    const options = {
        method: 'post',
        headers: getHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        }),
        body: getQueryString(getAjaxData(data)),
    };

    return fetch(`${serverUrl}${url}`, options)
        .then(checkStatus)
        .then(parseJSON)
        .then(successCallback)
        .catch(errorCallback);
}

/**
 * Post请求（发送formdata）
 * @param  {String} url        路径
 * @param  {FormData} formdata 参数
 * @return {Promise} 请求Promise
 */
export function postForm(url, formdata) {
    const options = {
        method: 'post',
        headers: getHeaders(),
        body: formdata,
    };

    let queryString = getQueryString(getAjaxData({}));

    if (queryString) {
        if (url.indexOf('?') === -1) {
            queryString = `?${queryString}`;
        } else {
            queryString = `&${queryString}`;
        }
    }

    return fetch(`${serverUrl}${url}${queryString}`, options)
        .then(checkStatus)
        .then(parseJSON)
        .then(successCallback)
        .catch(errorCallback);
}

/**
 * Post请求（发送json）
 * @param  {String} url  路径
 * @param  {Object} json 参数
 * @return {Promise} 请求Promise
 */
export function postJSON(url, json) {
    const options = {
        method: 'POST',
        headers: getHeaders({
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(getAjaxData(json)),
    };

    return fetch(`${serverUrl}${url}`, options)
        .then(checkStatus)
        .then(parseJSON)
        .then(successCallback)
        .catch(errorCallback);
}
