export class WsResponse<T>{
    constructor(
        public type: 'error' | 'message' | 'room',
        public data?: T,
        public message?: string
    ) { }
};