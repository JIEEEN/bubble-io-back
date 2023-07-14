import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    @Get('/get-db-from-config')
    db(): string{
        return process.env.DB_HOST;
    }
}
