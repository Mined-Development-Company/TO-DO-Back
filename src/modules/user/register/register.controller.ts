import { BadRequest, Created, IHttpRequest, IHttpResponse, ServerError } from '../../http/helper'
import { RegisterUseCase } from './register.usecase'

export class RegisterController {
	constructor(private UseCase: RegisterUseCase) {}

	async handle({ body }: IHttpRequest): Promise<IHttpResponse> {
		try {
			const data = await this.UseCase.execute(body)
			return Created(data)
		} catch (err: any) {
			if (err instanceof Error) return BadRequest(err)
			return ServerError(err)
		}
	}
}
