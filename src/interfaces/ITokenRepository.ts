export interface ITokenRepository {
	sign(data: any): Promise<string>
}
