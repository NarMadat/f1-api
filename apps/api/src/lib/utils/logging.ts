import pino from 'pino';
import pretty from 'pino-pretty';

import Env from '@/env';
import { NodeEnv } from '@/types';

export const logger = pino(
  {
    level: Env.FORMULA_ONE_API_LOG_LEVEL,
  },
  Env.FORMULA_ONE_API_NODE_ENV === NodeEnv.Development ? pretty() : undefined,
);
