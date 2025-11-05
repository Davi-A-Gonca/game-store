// AppError.js
export class AppError extends Error {
  constructor(message, statusCode, name = '') {
    super(message);

    // 1. Define o nome do erro
    if(name == '') this.name = this.constructor.name; else this.name = name;
    
    // 2. Propriedades personalizadas para manipulação HTTP/API
    this.statusCode = statusCode;
    // 'fail' para erros 4xx (do cliente) e 'error' para 5xx (do servidor)
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        
    // 3. Captura a stack trace corretamente (Recomendado para Node.js/V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
