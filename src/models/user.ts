export class User {
    id!: number;
    first_name!: string;
    last_name!: string;
    email!: string;
}

export const newUser: User = {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
} 