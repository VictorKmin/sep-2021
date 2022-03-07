import bcrypt from 'bcrypt';
import { IUser } from '../entity/user';
import { userRepository } from '../repositories/user/userRepository';

class UserService {
    public async createUser(user: IUser): Promise<IUser> {
        const { password } = user;

        const hashedPassword = await this._hashPassword(password);
        const dataToSave = { ...user, password: hashedPassword };

        const createdUser = await userRepository.createUser(dataToSave);
        return createdUser;
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return userRepository.getUserByEmail(email);
    }

    private async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}

export const userService = new UserService();
