import { BadRequest, IHttpRequest, IHttpResponse, Ok, ServerError } from '../../http/helper'
import { AuthUseCase } from './auth.usecase'

export class AuthController {
	constructor(private UseCase: AuthUseCase) {}

	async handle({ body }: IHttpRequest): Promise<IHttpResponse> {
		try {
			const result = await this.UseCase.execute(body)
			return Ok(result)
		} catch (err: any) {
			if (err instanceof Error) return BadRequest(err)
			return ServerError(err)
		}
	}
}
