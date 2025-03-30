/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { TenantsService } from '../modules/tenant/tenant.service';

@Injectable()
export class TenantsMiddleware implements NestMiddleware {
  constructor(private tenantsService: TenantsService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const tenantIdHeader = req.headers['x-tenant-id']?.toString();
    let tenantId = tenantIdHeader;

    if (!tenantIdHeader) {
      const authorizationHeader = req.headers['authorization'];
      const [bearer, token] = authorizationHeader.split(' ');
      if (!token) {
        throw new BadRequestException('Authorization Token provided');
      }
      try {
        const decodedToken: any = jwt.decode(token);
        tenantId = decodedToken?.tenantId?.tenantId;
      } catch (error) {
        throw new UnauthorizedException('Invalid token');
      }

      if (!tenantId) {
        throw new BadRequestException(
          'X-TENANT-ID not provided and tenantId not found in token',
        );
      }
    }

    const tenantExists = await this.tenantsService.getTenantById(tenantId);
    if (!tenantExists) {
      throw new NotFoundException('Tenant does not exist');
    }

    req['tenantId'] = tenantId;
    next();
  }
}
