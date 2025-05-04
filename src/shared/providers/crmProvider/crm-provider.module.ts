import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CrmProvider } from '@src/shared/providers/crmProvider/crm.provider';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get('CRM_API'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [CrmProvider],
  exports: [CrmProvider],
})
export class CrmModule {}
