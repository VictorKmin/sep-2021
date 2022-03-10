import { EntityRepository, getManager, Repository } from 'typeorm';
import { IToken, Token } from '../../entity/token';
import { ITokenRepository } from './tokenRepository.interface';
import { ITokenDataToSave } from '../../interfaces/token.interface';

@EntityRepository(Token)
class TokenRepository extends Repository<Token> implements ITokenRepository {
    public async createToken(token: ITokenDataToSave): Promise<IToken> {
        return getManager().getRepository(Token).save(token);
    }

    public async findTokenByUserId(userId: number): Promise<IToken | undefined> {
        return getManager().getRepository(Token).findOne({ userId });
    }
}

export const tokenRepository = new TokenRepository();
