export class UserDTO{
    public readonly name:string;
    public readonly email:string;
    public readonly password:string;

    public constructor (opts?: Partial<UserDTO>){
        Object.assign(this, opts);
    }
}