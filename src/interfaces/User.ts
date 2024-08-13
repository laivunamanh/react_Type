export interface User {
	id?: number | string;
	email: string;
	password: string;
	confirmPass?: string;
	avatar?: string;
	address?: string;
	phoneNumber?: string;
}
