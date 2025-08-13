/**
 * Classe para criar respostas padronizadas da API
 */
class ApiResponse {
  /**
   * Cria uma resposta de sucesso
   * @param {object} res - Objeto de resposta do Express
   * @param {string} message - Mensagem de sucesso
   * @param {any} data - Dados a serem retornados
   * @param {number} statusCode - Código de status HTTP (default: 200)
   */
  static success(res, message, data = null, statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  }

  /**
   * Cria uma resposta de erro
   * @param {object} res - Objeto de resposta do Express
   * @param {string} message - Mensagem de erro
   * @param {number} statusCode - Código de status HTTP (default: 500)
   * @param {any} errors - Detalhes do erro (opcional)
   */
  static error(res, message, statusCode = 500, errors = null) {
    const response = {
      success: false,
      message
    };

    if (errors) {
      response.errors = errors;
    }

    return res.status(statusCode).json(response);
  }

  /**
   * Cria uma resposta para erro de validação (400 Bad Request)
   * @param {object} res - Objeto de resposta do Express
   * @param {string} message - Mensagem de erro
   * @param {object} errors - Detalhes dos erros de validação
   */
  static validationError(res, message = 'Erro de validação', errors) {
    return this.error(res, message, 400, errors);
  }

  /**
   * Cria uma resposta para erro de não autorizado (401 Unauthorized)
   * @param {object} res - Objeto de resposta do Express
   * @param {string} message - Mensagem de erro
   */
  static unauthorized(res, message = 'Não autorizado') {
    return this.error(res, message, 401);
  }

  /**
   * Cria uma resposta para erro de proibido (403 Forbidden)
   * @param {object} res - Objeto de resposta do Express
   * @param {string} message - Mensagem de erro
   */
  static forbidden(res, message = 'Acesso proibido') {
    return this.error(res, message, 403);
  }

  /**
   * Cria uma resposta para erro de não encontrado (404 Not Found)
   * @param {object} res - Objeto de resposta do Express
   * @param {string} message - Mensagem de erro
   */
  static notFound(res, message = 'Recurso não encontrado') {
    return this.error(res, message, 404);
  }
}

module.exports = ApiResponse;