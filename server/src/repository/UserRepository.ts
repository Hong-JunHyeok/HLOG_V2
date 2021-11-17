import { EntityRepository, Repository } from "typeorm";
import { User } from "../entity/User";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  getAllUsers() {
    return this.createQueryBuilder("user").getMany();
  }
}
