"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const dotenv = require("dotenv");
async function bootstrap() {
    dotenv.config();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    app.enableCors({
        origin: (origin, callback) => {
            const allowedOrigins = ['http://localhost:5173', 'http://localhost:8081'];
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            }
            else {
                callback(new Error('Origem não permitida pelo CORS'));
            }
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        credentials: true,
    });
    const port = process.env.PORT || 3000;
    console.log(`Servidor rodando na porta ${port}`);
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map