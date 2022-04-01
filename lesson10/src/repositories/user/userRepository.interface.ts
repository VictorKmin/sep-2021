import { IUser } from '../../entity/user';
// import { IPaginationResponse } from '../../interfaces';

export interface IUserRepository {
    createUser(user: IUser): Promise<IUser>;
    getUserByEmail(email: string): Promise<IUser | undefined>;
    getNewUsers(): Promise<IUser[]>
    // getUserPagination(): Promise<IPaginationResponse<IUser>>
}
