import { AuthModel } from './auth.model';


export class UserModel extends AuthModel {
    id: number;
    userame: string;
    password: string;
    fullname: string;
    email: string;
    avatar: string;
    madonvi:string;
    madonvichuquan:string;
    tendonvi:string;
    tendonvichuquan:string;
    sadmin:string
    roles: string[];
   

    setUser(user: any) {
        this.id = user.id;
        this.username = user.username || '';
        this.password = user.password || '';
        this.fullname = user.fullname || '';
        this.email = user.email || '';
        this.avatar = user.avatar || './assets/media/users/default.jpg';
        this.roles = user.roles || [];
        this.madonvi = user.madonvi || '';
        this.madonvichuquan = user.madonvichuquan || '';
        this.tendonvi = user.tendonvi || '';
        this.sadmin = user.sadmin || '';
        this.tendonvichuquan = user.tendonvichuquan;       
    }
}
