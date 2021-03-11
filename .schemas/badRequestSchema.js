const schema = {
	message: '$context.error.validationErrorString',
	stage: '$context.stage',
	type: '$context.error.responseType',
	resourcePath: '$context.resourcePath',
	// 'stageVariables.a': '$stageVariables.a',
	statusCode: 400
}
module.exports = JSON.stringify(schema);
