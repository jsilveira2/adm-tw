export class ErrorHelper extends Error {
    constructor(
      public readonly className: string,
      public readonly method: string,
      message: string,
      public readonly statusCode: number,
    ) {
      super(message);
      this.className = className;
      this.method = method;
      this.statusCode = statusCode;
    }
}
