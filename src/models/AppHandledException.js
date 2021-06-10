class AppHandledException {
  constructor(message, error = null, code = null) {
    this.message = message;
    this.error = error;
    this.code = code;
  }
}

export default AppHandledException;
