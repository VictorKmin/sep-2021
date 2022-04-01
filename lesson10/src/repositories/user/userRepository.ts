import { EntityRepository, getManager, Repository } from 'typeorm';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IUser, User } from '../../entity/user';
import { IUserRepository } from './userRepository.interface';
import { IPaginationResponse } from '../../interfaces';

dayjs.extend(utc);

@EntityRepository(User)
class UserRepository extends Repository<User> implements IUserRepository {
    public async createUser(user: IUser): Promise<IUser> {
        return getManager().getRepository(User).save(user);
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return getManager().getRepository(User)
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .andWhere('user.deletedAt IS NULL')
            .getOne();
    }

    public getNewUsers(): Promise<IUser[]> {
        return getManager().getRepository(User)
          .createQueryBuilder('user')
          .where('user.createdAt >= :date', {date: dayjs().utc().startOf('day').format()})
          .getMany()
    }

    public async getUserPagination(
      searchObject: Partial<IUser> = {},
      limit: number,
      page: number = 1
    )
      :Promise<IPaginationResponse<IUser>> {
        const skip = limit * (page - 1);

        console.log('_____________________________________');
        console.log('_____________________________________');
        console.log(searchObject);
        console.log('_____________________________________');
        console.log('_____________________________________');

        const [users, itemCount] = await getManager().getRepository(User)
          .findAndCount({ where: searchObject, skip, take: limit });

        return {
            page,
            perPage: limit,
            itemCount,
            data: users
        }
    }
}

export const userRepository = new UserRepository();
