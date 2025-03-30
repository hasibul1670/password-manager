import { Connection } from 'mongoose';
import { Provider } from '@nestjs/common';

export function createModelProvider(
  modelName: string,
  schema: any,
  connectionToken: string,
): Provider {
  return {
    provide: `${modelName.toUpperCase()}_MODEL`,
    useFactory: async (tenantConnection: Connection) => {
      return tenantConnection.model(modelName, schema);
    },
    inject: [connectionToken],
  };
}
