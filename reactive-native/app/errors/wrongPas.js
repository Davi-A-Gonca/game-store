import { AppError } from './baseError';

class wrongPassword extends AppError{
    constructor(message = 'Senhas não coincidem'){
        super(message, 400);
    }
}