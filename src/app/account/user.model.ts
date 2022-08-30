export class User {
    constructor(
        public email: string,
        public password: string,
        private _token?: string
    ) {}
    
    public get token(): string {
        return this._token;
    }
}