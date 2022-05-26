import type { UserType } from "./User";

export interface ChatType {
	id: number;
	message: string;
	user: UserType;
	createdAt: string;
	updatedAt: string;
}
