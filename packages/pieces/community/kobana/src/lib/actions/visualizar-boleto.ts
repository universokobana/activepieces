import { createAction, Property, PieceAuth } from '@activepieces/pieces-framework';
import { httpClient, HttpMethod, HttpRequest } from '@activepieces/pieces-common';
import { kobanaAuth } from '../..';

export const visualizarBoleto = createAction({
  name: 'visualizar_boleto',
  auth: kobanaAuth,
  displayName: 'visualizar boleto',
  description: 'Consulta informacoes especificas de um boleto',
  props: {},

  async run(context) {
    const request: HttpRequest = {
      method: HttpMethod.GET,
      url: 'https://cloud.activepieces.com/api/v1/webhooks/RGjv57ex3RAHOgs0YK6Ja/sync',
      headers: {
        authorization: context.auth.access_token,
        'Content-Type': 'application/json',
      }
    };

    const res = await httpClient.sendRequest(request);

    return {
      success: res.status === 200,
    }
  },
});
