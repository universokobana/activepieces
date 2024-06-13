import { createTrigger, TriggerStrategy } from '@activepieces/pieces-framework';
import { kobanaAuth } from '../../';
import { kobanaCommon, Bundle, KobanaWebhook } from '../common';

export const bank_billet_created = createTrigger({
    auth: kobanaAuth,
    name: 'bank_billet_created',
    displayName: 'Bank Billet Created',
    description: 'When a bank billet is created',
    props: {},
    sampleData: {},
    type: TriggerStrategy.WEBHOOK,

    async onEnable(context) {
        const event_code = "bank_billet.created";
        const bundle: Bundle = {
            targetUrl: context.webhookUrl,
            personalToken: context.auth.access_token
        };
        const body = await kobanaCommon.subscribeHook(bundle, event_code);
        await context.store?.put<KobanaWebhook>('bank_billet_created', {
            webhookId: body.id,
        });
    },
    async onDisable(context){
        const response = await context.store?.get<KobanaWebhook>('bank_billet_created');
        if (response === null || response === undefined) {
            throw Error("Context store was null");
        }

        const bundle: Bundle = kobanaCommon.bundleFromContext(context);
    
        await kobanaCommon.unsubscribeHook(bundle, response.webhookId);
    },
    async run(context){
        return [context.payload.body]
    }
})