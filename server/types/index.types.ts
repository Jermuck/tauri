export class WsResponse<T>{
    constructor(
        public type: 'error' | 'message',
        public data?: T,
        public message?: string
    ) { }
};