import { createPiece, PieceAuth } from "@activepieces/pieces-framework";
import { visualizarBoleto } from "./lib/actions/visualizar-boleto";
import { bank_billet_created } from "./lib/triggers/bank_billet_created";

export const kobanaAuth = PieceAuth.OAuth2({
  description: '',
  authUrl: 'https://api-sandbox.kobana.com.br/oauth/authorize',
  tokenUrl: 'https://api-sandbox.kobana.com.br/oauth/token',
  required: true,
  scope: [
    'login',
    'write'
  ],
});


export const kobana = createPiece({
  displayName: "Kobana",
  auth: kobanaAuth,
  minimumSupportedRelease: '0.20.0',
  logoUrl: "https://cdn.activepieces.com/pieces/kobana.png",
  authors: [],
  actions: [visualizarBoleto],
  triggers: [bank_billet_created],
});