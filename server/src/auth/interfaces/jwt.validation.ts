import { User } from '../../user/entities';

export interface JwtValidation {
  user?: User;
  error?: string;
}
