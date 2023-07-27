import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    @Get('/')
    check(): string{
        return 'Hello NestJS';
    }

    @Get('/get-db-from-config')
    db(): string{
        return process.env.DB_HOST;
    }
}
