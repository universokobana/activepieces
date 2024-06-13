import { Property } from '@activepieces/pieces-framework';
import {
  HttpRequest,
  HttpMethod,
  httpClient,
} from '@activepieces/pieces-common';

export interface KobanaWebhook {
  webhookId: string;
}

export interface Bundle {
  targetUrl: string,
  personalToken: string,
}

export const kobanaCommon = {
  baseUrl: 'https://api-sandbox.kobana.com.br/v1/',

  subscribeHook: async (bundle: Bundle, event_code: string) => {
    const data = {
      url: bundle.targetUrl,
      events: [event_code],
      concurrency_limit: 10
    };
    

    const request: HttpRequest = {
      method: HttpMethod.POST,
      url: `${kobanaCommon.baseUrl}/webhooks`,
      headers: {
        Authorization: kobanaCommon.authorizationHeader(bundle.personalToken),
      },
      body: data
    };
    const response = await httpClient.sendRequest(request);
    return response.body;
  },

  unsubscribeHook: async(bundle: Bundle, webhookId: string) => {
    const request: HttpRequest = {
      method: HttpMethod.DELETE,
      url: `${kobanaCommon.baseUrl}webhooks/${webhookId}`,
      headers: {
        Authorization: kobanaCommon.authorizationHeader(bundle.personalToken),
      }
    };
    await httpClient.sendRequest(request);
  },

  bundleFromContext: (context: any) => {
    return {
      targetUrl: context.webhookUrl,
      personalToken: context.auth.access_token
    } as Bundle
  },

  parseHook: (response: any) => {
    let data = response.json;
    let final: any = [];
    for (var i in data) {
      let item = data[i];
      delete item.data.webhook;
      delete item.data.notification_url;
      final[i] = item.data;
      final[i].id = item.id;
      final[i].event_code = item.code;
    }
    return final;
  },

  authorizationHeader: (personalToken: string) => {return `Bearer ${personalToken}`},
}