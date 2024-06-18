import { createTrigger, TriggerStrategy } from '@activepieces/pieces-framework';
import { kobanaAuth } from '../../';
import { kobanaCommon, Bundle, KobanaWebhook } from '../common';
import { bankBilletFactory } from '../common/factories/bank_billet_factory';

const event_code = 'bank_billet.generated';

export const bank_billet_generated = createTrigger({
  auth: kobanaAuth,
  name: 'bank_billet_generated',
  displayName: `PDF de boleto gerado (${event_code})`,
  description: 'Toda vez que o PDF de um boleto é gerado.',
  props: {},
  sampleData: {
    bankBilletFactory,
  },
  type: TriggerStrategy.WEBHOOK,

  async onEnable(context) {
    const bundle: Bundle = {
      targetUrl: context.webhookUrl,
      personalToken: context.auth.access_token,
    };

    const body = await kobanaCommon.subscribeHook(bundle, event_code);
    await context.store?.put<KobanaWebhook>(event_code, {
      webhookId: body.id,
    });
  },
  async onDisable(context) {
    const response = await context.store?.get<KobanaWebhook>(event_code);
    if (response === null || response === undefined) {
      throw Error('Context store was null');
    }

    const bundle: Bundle = kobanaCommon.bundleFromContext(context);

    await kobanaCommon.unsubscribeHook(bundle, response.webhookId);
  },

  async run(context) {
    return [context.payload.body];
  },
});
