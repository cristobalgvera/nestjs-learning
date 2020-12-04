import { User } from '../../user/entities/user.entity';

export interface JwtValidation {
  user?: User;
  error?: string;
}
