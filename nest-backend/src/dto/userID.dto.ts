export class UserIdDTO{
    public readonly id:number;
    public readonly name:string;
    public readonly email:string;
    public readonly password:string;

    public constructor (opts?: Partial<UserIdDTO>){
        Object.assign(this, opts);
    }
}