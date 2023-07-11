export class WsResponse<T extends object = any>{
    constructor(
        public type: 'error' | 'message',
        public data?: T,
        public message?: string
    ) { }
}