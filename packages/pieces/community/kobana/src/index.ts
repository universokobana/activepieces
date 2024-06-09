
import { createPiece, PieceAuth } from "@activepieces/pieces-framework";
import { visualizarBoleto } from "./lib/actions/visualizar-boleto";

export const kobanaAuth = PieceAuth.SecretText({
  displayName: "API Key",
  required: true,
  description: "Please use **test-key** as value for API key"
});

export const kobana = createPiece({
  displayName: "Kobana",
  auth: kobanaAuth,
  minimumSupportedRelease: '0.20.0',
  logoUrl: "https://cdn.activepieces.com/pieces/kobana.png",
  authors: [],
  actions: [visualizarBoleto],
  triggers: [],
});
    