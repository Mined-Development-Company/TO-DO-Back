export interface IHttpRequest {
	body?: any
	params?: any
	query?: any
}

export interface IHttpResponse {
	status: number
	data?: any
	error?: any
}

export const Ok = (data: any) => ({
	status: 200,
	data
})

export const BadRequest = (error: Error) => ({
	status: 400,
	error: {
		name: error.name,
		message: error.message
	}
})

export const Created = (data: any) => ({
	status: 201,
	data
})

export const ServerError = (error: Error) => ({
	status: 500,
	error
})
