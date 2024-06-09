import { createAction, Property, PieceAuth } from '@activepieces/pieces-framework';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';
import { kobanaAuth } from '../..';

export const visualizarBoleto = createAction({
  // auth: check https://www.activepieces.com/docs/developers/piece-reference/authentication,
  name: 'visualizarBoleto',
  auth: kobanaAuth,
  displayName: 'visualizar boleto',
  description: 'Consulta informacoes especificas de um boleto',
  props: {},
  async run(context) {
    const res = await httpClient.sendRequest<string[]>({
      method: HttpMethod.GET,
      url: 'https://cloud.activepieces.com/api/v1/webhooks/RGjv57ex3RAHOgs0YK6Ja/sync',
      headers: {
        Authorization: context.auth,
      },
    });
    return res.body;
  },
});
