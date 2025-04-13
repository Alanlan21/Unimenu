"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedirectController = void 0;
const common_1 = require("@nestjs/common");
let RedirectController = class RedirectController {
    async handleSuccess(orderId, res) {
        const cleanOrderId = orderId ? orderId.split('?')[0] : 'N/A';
        res.send(`
      <html>
        <head>
          <title>Pagamento Concluído</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
          <style>
            body {
              margin: 0;
              font-family: 'Poppins', sans-serif;
              background: linear-gradient(135deg, #FF6B00 0%, #FFF5E6 100%);
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              color: #333;
              overflow: hidden;
            }
            .container {
              background: white;
              border-radius: 20px;
              box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
              padding: 40px;
              text-align: center;
              max-width: 450px;
              width: 90%;
              animation: fadeIn 1s ease-in-out;
              display: none;
            }
            @keyframes fadeIn {
              0% { opacity: 0; transform: translateY(20px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            .success-icon {
              font-size: 60px;
              color: #FF6B00;
              margin-bottom: 20px;
              animation: bounce 0.5s ease;
            }
            @keyframes bounce {
              0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
              40% { transform: translateY(-20px); }
              60% { transform: translateY(-10px); }
            }
            h1 {
              font-size: 32px;
              color: #FF6B00;
              margin-bottom: 10px;
              font-weight: 600;
            }
            p {
              font-size: 16px;
              color: #666;
              margin-bottom: 30px;
              line-height: 1.5;
            }
            .order-details {
              background: #FFF5E6;
              border-radius: 10px;
              padding: 15px;
              margin-bottom: 20px;
              font-size: 14px;
              color: #333;
              word-wrap: break-word;
              max-width: 100%;
            }
            #loader {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: #FFF5E6;
              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 9999;
            }
            .loader-icon {
              font-size: 40px;
              color: #FF6B00;
            }
            .instructions {
              font-size: 16px;
              color: #FF6B00;
              margin-top: 20px;
              font-weight: 500;
              line-height: 1.5;
            }
          </style>
        </head>
        <body>
          <div id="loader">
            <i class="fas fa-spinner fa-spin loader-icon"></i>
          </div>
          <div class="container">
            <i class="fas fa-check-circle success-icon"></i>
            <h1>Pagamento Concluído!</h1>
            <div class="order-details">
              <p>Seu pedido <strong>#${cleanOrderId}</strong> foi realizado com sucesso.</p>
              <p>Data: ${new Date().toLocaleDateString()}</p>
            </div>
            <p class="instructions">Por favor, retorne ao app e clique em "Voltar ao dashboard" para continuar.</p>
          </div>
          <script>
            setTimeout(() => {
              document.getElementById('loader').style.display = 'none';
              document.querySelector('.container').style.display = 'block';
            }, 1000);
          </script>
        </body>
      </html>
    `);
    }
    async handleCancel(orderId, res) {
        const cleanOrderId = orderId ? orderId.split('?')[0] : 'N/A';
        res.send(`
      <html>
        <head>
          <title>Pagamento Cancelado</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
          <style>
            body {
              margin: 0;
              font-family: 'Poppins', sans-serif;
              background: linear-gradient(135deg, #FF3B30 0%, #FFF5E6 100%);
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              color: #333;
              overflow: hidden;
            }
            .container {
              background: white;
              border-radius: 20px;
              box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
              padding: 40px;
              text-align: center;
              max-width: 450px;
              width: 90%;
              animation: fadeIn 1s ease-in-out;
              display: none;
            }
            @keyframes fadeIn {
              0% { opacity: 0; transform: translateY(20px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            .cancel-icon {
              font-size: 60px;
              color: #FF3B30;
              margin-bottom: 20px;
              animation: bounce 0.5s ease;
            }
            @keyframes bounce {
              0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
              40% { transform: translateY(-20px); }
              60% { transform: translateY(-10px); }
            }
            h1 {
              font-size: 32px;
              color: #FF3B30;
              margin-bottom: 10px;
              font-weight: 600;
            }
            p {
              font-size: 16px;
              color: #666;
              margin-bottom: 30px;
              line-height: 1.5;
            }
            .order-details {
              background: #FFF5E6;
              border-radius: 10px;
              padding: 15px;
              margin-bottom: 20px;
              font-size: 14px;
              color: #333;
              word-wrap: break-word;
              max-width: 100%;
            }
            #loader {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: #FFF5E6;
              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 9999;
            }
            .loader-icon {
              font-size: 40px;
              color: #FF6B00;
            }
            .instructions {
              font-size: 16px;
              color: #FF6B00;
              margin-top: 20px;
              font-weight: 500;
              line-height: 1.5;
            }
          </style>
        </head>
        <body>
          <div id="loader">
            <i class="fas fa-spinner fa-spin loader-icon"></i>
          </div>
          <div class="container">
            <i class="fas fa-times-circle cancel-icon"></i>
            <h1>Pagamento Cancelado</h1>
            <div class="order-details">
              <p>O pagamento do pedido <strong>#${cleanOrderId}</strong> foi cancelado.</p>
              <p>Data: ${new Date().toLocaleDateString()}</p>
            </div>
            <p class="instructions">Por favor, retorne ao app para tentar novamente.</p>
          </div>
          <script>
            setTimeout(() => {
              document.getElementById('loader').style.display = 'none';
              document.querySelector('.container').style.display = 'block';
            }, 1000);
          </script>
        </body>
      </html>
    `);
    }
};
exports.RedirectController = RedirectController;
__decorate([
    (0, common_1.Get)('success'),
    __param(0, (0, common_1.Query)('order_id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RedirectController.prototype, "handleSuccess", null);
__decorate([
    (0, common_1.Get)('cancel'),
    __param(0, (0, common_1.Query)('order_id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RedirectController.prototype, "handleCancel", null);
exports.RedirectController = RedirectController = __decorate([
    (0, common_1.Controller)('redirect')
], RedirectController);
//# sourceMappingURL=redirect.controller.js.map