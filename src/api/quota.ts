import { clientApi } from './apis';
import { request } from './baseWithAuthorization';

export const initCookies = async () : Promise<string> => {
  let quote = sessionStorage.getItem('quote');

  if (quote) {
    return quote;
  }

  quote = await request(`${clientApi}/api/Quota/id`);
  sessionStorage.setItem('quote', quote || '');

  return quote || '';
};

export const sendFileForTranslating = async (file: File, quoteId: string) : Promise<void> => {
  const body = new FormData();

  body.append('file', file);
  body.append('quotaId', quoteId);

  return request(`${clientApi}/api/Quota/source-file`, {
    method: 'POST',
    body,
  });
};
