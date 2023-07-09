
export interface MessageModel {
  readonly message: string;
  readonly userId: number;
  readonly conversationId: number;
  readonly time: Date;
}
