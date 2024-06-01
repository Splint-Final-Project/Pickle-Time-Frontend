import { tmpHandlers } from '@/mocks/handler/tmpHandlers';
import { authHandlers } from '@/mocks/handler/authHandlers';
import { pickleHandlers } from '@/mocks/handler/pickleHandlers';
import { messagesHandlers } from '@/mocks/handler/messagesHandlers';

// 이곳에서 전체 핸들러를 한 곳으로 모읍니다.
export const handlers = [...tmpHandlers, ...authHandlers, ...pickleHandlers, ...messagesHandlers];
