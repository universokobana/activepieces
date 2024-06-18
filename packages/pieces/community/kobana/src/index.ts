import { createPiece, PieceAuth } from '@activepieces/pieces-framework';
import { bank_billet_blocked } from './lib/triggers/bank_billet_blocked';
import { bank_billet_canceled } from './lib/triggers/bank_billet_canceled';
import { bank_billet_created } from './lib/triggers/bank_billet_created';
import { bank_billet_generated } from './lib/triggers/bank_billet_generated';
import { bank_billet_overdue } from './lib/triggers/bank_billet_overdue';
import { bank_billet_paid } from './lib/triggers/bank_billet_paid';
import { bank_billet_registered } from './lib/triggers/bank_billet_registered';
import { bank_billet_rejected } from './lib/triggers/bank_billet_rejected';
import { bank_billet_updated } from './lib/triggers/bank_billet_updated';

export const kobanaHost =
  process.env['KOBANA_APP_HOST'] || 'http://localhost:5000';

export const kobanaAuth = PieceAuth.OAuth2({
  description: '',
  authUrl: `${kobanaHost}/oauth/authorize`,
  tokenUrl: `${kobanaHost}/oauth/token`,
  required: true,
  scope: ['login', 'write'],
});

export const kobana = createPiece({
  displayName: 'Kobana',
  auth: kobanaAuth,
  minimumSupportedRelease: '0.20.0',
  logoUrl: 'https://cdn.activepieces.com/pieces/kobana.png',
  authors: [],
  actions: [],
  triggers: [
    bank_billet_blocked,
    bank_billet_canceled,
    bank_billet_created,
    bank_billet_generated,
    bank_billet_overdue,
    bank_billet_paid,
    bank_billet_registered,
    bank_billet_rejected,
    bank_billet_updated,
  ],
});
