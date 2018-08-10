import { User } from './user.model';
import { Err } from './err.model';
export interface Auth {
    // after get user back, using user 
    user ?: User;
    // when store into database using userId
    userId?: string;
    token?: string;
    err?: Err;
}