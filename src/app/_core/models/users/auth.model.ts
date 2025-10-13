import { JwtPayload } from 'jwt-decode';

export interface AppJwtPayload extends JwtPayload {
  id: number;
  roles: { authority: string }[];
}
