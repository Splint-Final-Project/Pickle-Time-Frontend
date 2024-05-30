import { setupWorker } from 'msw/browser';
import { handlers } from '@/mocks/handler/index';

export const worker = setupWorker(...handlers);
