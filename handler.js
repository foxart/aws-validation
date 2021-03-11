'use strict';
module.exports.test1 = async(event) => {
	const {headers, multiValueHeaders, requestContext, body} = event;
	const res = typeof body === 'object' ? JSON.stringify(body) : body;
	return {
		statusCode: 200,
		headers: {
			'Content-Type': 'application/json',
		},
		body: res,
	};
};
module.exports.test2 = async(event) => {
	const {headers, multiValueHeaders, requestContext, body} = event;
	const res = typeof body === 'object' ? JSON.stringify(body) : body;
	return {
		statusCode: 200,
		headers: {
			'Content-Type': 'application/json',
		},
		body: res,
	};
};
