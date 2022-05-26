import { EntityRepository, Repository } from "typeorm";
import { User } } from "../entity/User";

interface IUserJoin {
  email: string;
  password: string;
  username: string;
  profileUrl?: string;
  selfIntroduction?: string;
}

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getAllUsers() {
    return this.createQueryBuilder("user").getMany();
  }

  async createUser(joinData: IUserJoin) {
    const user = this.create(joinData);
    await this.save(user);
  }
}
