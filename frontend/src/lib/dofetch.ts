/* eslint-disable @typescript-eslint/no-explicit-any */

const proApiUrl = "https://api.52jiaoshi.com";
const devApiUrl = "http://localhost:3030/api";

// 基础 URL 请求地址（尾部不要有斜杠）
const baseUrl = process.env.NODE_ENV === 'production' ? proApiUrl : devApiUrl;

// 执行请求的参数
interface fetchParams {
	api: string; // 请求的地址
	method?: string; // 请求方法
	body?: any; // 请求体
	files?: FileList; // 上传文件
	requireLogin?: boolean; // 是否需要登录
}

// 请求返回的数据
export interface fetchResponse {
	code: number; // 状态码 2000 表示成功
	data: any; // 返回的数据
	msg: string; // 返回信息
	rid: string; // 请求唯一标识
}

// doFetch 执行请求
export async function doFetch({api, method, body, files, requireLogin}: fetchParams): Promise<fetchResponse> {
	// 验证 baseUrl 是否有效: 以 http 或 https 开头且最后一个字符不是 /，如无效则报错
	if (!baseUrl.startsWith('http') && !baseUrl.startsWith('https')) {
		throw new Error(`invalid baseUrl 尾部不能有斜杠: ${baseUrl}`);
	}
	// 验证 api 是否有效：必须以 / 开头，如无效则报错
	if (!api.startsWith('/')) {
		throw new Error(`invalid api 必须以斜杠开头: ${api}`);
	}

	// 开始构建请求
	const myHeaders = new Headers(); // 请求头
	// 如果需要登录，则在请求头设置 token
	if (requireLogin) {
		myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
	}

	let requestOptions: any = {}; // 请求参数

	// 如果是上传文件
	if (files) {
		const formdata = new FormData(); // 请求体
		formdata.append('file', files[0], files[0].name);
		requestOptions = {
			method: method || 'POST', // 请求方法，默认为 POST
			body: formdata // 请求体
		};
	} else {
		// 添加请求头参数
		myHeaders.append('Content-Type', 'application/json');
		// 将数据转换为 JSON
		const raw = JSON.stringify(body); // 请求体
		// 构建请求参数
		requestOptions = {
			method: method || 'GET', // 请求方法，默认为 GET
			body: raw // 请求体
		};
	}
	requestOptions['headers'] = myHeaders; // 请求头
	requestOptions['redirect'] = 'follow'; // 重定向，follow 表示为同步请求

	// 非生产环境设置请求模式开启跨域
	if (process.env.NODE_ENV !== 'production') {
		requestOptions.mode = 'cors'; // 请求模式，cors 表示开启跨域
		requestOptions.credentials = 'include'; // 请求带上 cookie
	}

	// 发送请求
	const response = await fetch(`${baseUrl}${api}`, requestOptions);
	// 解析 json 响应
	const jsonStr = await response.json();
	// 如果不是生产环境，则打印返回的数据
	if (process.env.NODE_ENV !== 'production') {
		console.log('API：', api);
		console.log('BODY：', requestOptions);
		console.log('RES：', jsonStr);
		console.log('----- ----- -----');
	}
	// 返回数据
	return jsonStr;
}
