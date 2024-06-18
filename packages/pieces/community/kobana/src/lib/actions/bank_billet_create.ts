import {
  HttpRequest,
  HttpMethod,
  AuthenticationType,
  httpClient,
} from '@activepieces/pieces-common';
import { createAction, Property } from '@activepieces/pieces-framework';

const kobanaUrl = '';
export const bank_billet_create = createAction({
  // auth: check https://www.activepieces.com/docs/developers/piece-reference/authentication,
  name: 'bank_billet_create',
  displayName: 'bank_billet_create',
  description:
    'Cria um novo boleto (e registra caso a conta esteja configurada para isso)',
  props: {
    bank_billet_account_id: Property.Number({
      displayName: 'Carteira de Cobranca',
      required: false,
    }),
    bank_billet_layout_id: Property.Number({
      displayName: 'ID do modelo de boleto',
      required: false,
    }),
    amount: Property.ShortText({
      displayName: 'Quantia - R$ (Formato: 999,99)',
      required: true,
    }),
    expire_at: Property.DateTime({
      displayName: 'Data de Vencimento',
      required: true,
    }),
    customer_person_name: Property.ShortText({
      displayName: 'Nome do cliente',
      required: false,
    }),
    customer_cnpj_cpf: Property.ShortText({
      displayName:
        'CPF/CNPJ do cliente. Obrigatório se o Cliente nao for passado.',
      required: false,
    }),
    customer_state: Property.ShortText({
      displayName:
        'Estado do endereco do cliente. Obrigatorio se o cliente nao for passado.',
      required: false,
    }),
    customer_city_name: Property.ShortText({
      displayName: 'Cidade do endereco do cliente',
      required: false,
    }),
    customer_zipcode: Property.ShortText({
      displayName:
        'CEP do endereco do cliente. Formato 99999-999. Obrigatorio se o Cliente nao for passado.',
      required: false,
    }),
    customer_address: Property.ShortText({
      displayName:
        'Endereco do cliente. Obriatorio se o Cliente nao for passado.',
      required: false,
    }),
    customer_address_complement: Property.ShortText({
      displayName: 'Complemento do endereco',
      required: false,
    }),
    customer_address_number: Property.ShortText({
      displayName: 'Numero do endereco',
      required: false,
    }),
    customer_email: Property.ShortText({
      displayName: 'Email do cliente',
      required: false,
    }),
    customer_email_cc: Property.ShortText({
      displayName: 'Email opcional',
      required: false,
    }),
    customer_neighborhood: Property.ShortText({
      displayName: 'Bairro do endereco do cliente',
      required: false,
    }),
    customer_phone_number: Property.ShortText({
      displayName: 'Telefone do cliente com DDD. Digite apenas numeros.',
      required: false,
    }),
    customer_ignore_email: Property.Checkbox({
      displayName: 'Ignorar email',
      required: false,
    }),
    customer_ignore_sms: Property.Checkbox({
      displayName: 'Ignorar email',
      required: false,
    }),
    customer_mobile_local_code: Property.ShortText({
      displayName: 'DDD do telefone do cliente',
      required: false,
    }),
    customer_mobile_number: Property.ShortText({
      displayName: 'Celular',
      required: false,
    }),
    customer_nickname: Property.ShortText({
      displayName: 'Apelido ou Nome Fantasia do Pagador',
      required: false,
    }),
    customer_notes: Property.ShortText({
      displayName: 'Anotacoes do Pagador',
      required: false,
    }),
    customer_contact_person: Property.ShortText({
      displayName: 'Contato',
      required: false,
    }),
    interest_type: Property.Number({
      displayName:
        'Tipo de juros: Escolhas: Inexistente (0), Porcentagem Diaria (1), Valor diario (2)',
      required: false,
    }),
    days_for_interest: Property.Number({
      displayName:
        'Quantidade de dias apos o vencimento que a mora comecara a incidir.',
      required: false,
    }),
    interest_percentage: Property.Number({
      displayName: 'Porcentagem diaria de juros.',
      required: false,
    }),
    interest_value: Property.Number({
      displayName:
        'Valor diario de juros (R$). Obrigatoria se interest_type for igual a 2.',
      required: false,
    }),
    interest_days_type: Property.Number({
      displayName: 'Tipo de Dias para juros:\n*`0` Corridos\n*`1` Úteis',
      required: false,
    }),
    fine_type: Property.Number({
      displayName:
        'Tipo de multa:\n* `0` Inexistente (Padrão)\n* `1` Para percentual do valor do boleto\n *`2` Para valor fixo',
      required: false,
    }),
    days_for_fine: Property.Number({
      displayName:
        'Quantidade de dias após o vencimento que a multa começará a incidir.',
      required: false,
    }),
    fine_percentage: Property.Number({
      displayName: 'Porcentagem de Multa por Atraso',
      required: false,
    }),
    fine_value: Property.Number({
      displayName: 'Valor da multa (R$).',
      required: false,
    }),
    discount_type: Property.Number({
      displayName:
        'Tipo de desconto. 0: Inexistente, 1: Valor fixo, 2: Percentual do boleto',
      required: false,
    }),

    days_for_discount: Property.Number({
      displayName:
        'Dias para desconto. Obrigatório se discount_type é diferente de 0 (zero).',
      required: false,
    }),

    discount_percentage: Property.Number({
      displayName:
        'Percentual do valor do boleto equivalente ao desconto. Obrigatório se discount_type é igual a 2',
      required: false,
    }),

    discount_value: Property.Number({
      displayName:
        'Valor do desconto (R$). Obrigatório se discount_type é igual a 1.',
      required: false,
    }),

    days_for_second_discount: Property.Number({
      displayName: 'Dias para segundo desconto.',
      required: false,
    }),

    second_discount_percentage: Property.Number({
      displayName:
        'Percentual do valor do boleto equivalente ao segundo desconto.',
      required: false,
    }),

    second_discount_value: Property.Number({
      displayName: 'Valor do segundo desconto (R$).',
      required: false,
    }),

    days_for_third_discount: Property.Number({
      displayName: 'Dias para terceiro desconto.',
      required: false,
    }),

    third_discount_percentage: Property.Number({
      displayName:
        'Percentual do valor do boleto equivalente ao terceiro desconto.',
      required: false,
    }),

    third_discount_value: Property.Number({
      displayName: 'Valor do terceiro desconto (R$).',
      required: false,
    }),

    tags: Property.Array({
      displayName: 'Etiquetas (Tags)',
      required: false,
    }),

    tag_list: Property.Array({
      displayName: 'Tags associadas ao boleto',
      required: false,
    }),

    charge_type: Property.Number({
      displayName:
        'Tipo de cobrança. 1: Simples, 2: Vinculada, 3: Descontada, 4: Vendor',
      required: false,
    }),

    dispatch_type: Property.Number({
      displayName:
        'Tipo de cobrança: Quando o boleto precisa ser enviado pelo correio. É preciso contratar o serviço junto ao banco e pagará tarifa.\n1: Cliente\n2: Banco',
      required: false,
    }),

    guarantor_name: Property.ShortText({
      displayName: 'Sacador/Avalista',
      required: false,
    }),

    guarantor_cnpj_cpf: Property.ShortText({
      displayName: 'CNPJ/CPF do Sacador/Avalista',
      required: false,
    }),
    guarantor_address_number: Property.ShortText({
      displayName: 'Número do Beneficiário final (Sacador/Avalista)',
      required: false,
    }),
    guarantor_neighborhood: Property.ShortText({
      displayName: 'Bairro do Beneficiário final (Sacador/Avalista)',
      required: false,
    }),

    guarantor_phone_number: Property.ShortText({
      displayName:
        'Telefone (com DDD) do Beneficiário final (Sacador/Avalista)',
      required: false,
    }),

    guarantor_city_name: Property.ShortText({
      displayName:
        'Cidade (nome deve estar correto e completo) do Beneficiário final (Sacador/Avalista)',
      required: false,
    }),

    guarantor_state: Property.ShortText({
      displayName: 'Estado do Beneficiário final (Sacador/Avalista)',
      required: false,
    }),

    guarantor_zipcode: Property.ShortText({
      displayName:
        'CEP (formato 99999999) do Beneficiário final (Sacador/Avalista)',
      required: false,
    }),

    guarantor_address: Property.ShortText({
      displayName: 'Endereço do Beneficiário final (Sacador/Avalista)',
      required: false,
    }),

    guarantor_address_complement: Property.ShortText({
      displayName: 'Complemento do Beneficiário final (Sacador/Avalista)',
      required: false,
    }),

    description: Property.LongText({
      displayName: 'Demonstrativo',
      required: true,
    }),

    instructions: Property.LongText({
      displayName: 'Instruções para o Caixa',
      required: false,
    }),

    document_date: Property.DateTime({
      displayName: 'Data do Doc.',
      required: false,
    }),

    document_type: Property.LongText({
      displayName: 'Tipo do Doc.',
      required: false,
    }),

    document_type_label: Property.ShortText({
      displayName: 'Tipo de Documento (Sigla)',
      required: false,
    }),

    document_number: Property.Number({
      displayName: 'Número do Doc.',
      required: false,
    }),

    acceptance: Property.ShortText({
      displayName: 'Acceptance (Aceite)',
      required: false,
    }),

    paid_amount: Property.Number({
      displayName: 'Valor pago',
      required: false,
    }),

    paid_at: Property.DateTime({
      displayName: 'Data do pagamento',
      required: false,
    }),

    days_for_revoke: Property.Number({
      displayName: 'Dias corridos para Baixa/Devolução',
      required: false,
    }),

    days_for_negativation: Property.Number({
      displayName: 'Dias corridos para Negativação',
      required: false,
    }),

    days_for_sue: Property.Number({
      displayName: 'Dias corridos para Protesto',
      required: false,
    }),

    sue_code: Property.ShortText({
      displayName: 'Código de Protesto (CNAB 240)',
      required: false,
    }),

    revoke_code: Property.ShortText({
      displayName: 'Código de Baixa (CNAB 240)',
      required: false,
    }),

    first_instruction: Property.ShortText({
      displayName: 'Primeira Instrução (CNAB 400)',
      required: false,
    }),

    second_instruction: Property.ShortText({
      displayName: 'Segunda Instrução (CNAB 400)',
      required: false,
    }),

    payment_place: Property.ShortText({
      displayName: 'Local de Pagamento',
      required: false,
    }),

    watermark: Property.Checkbox({
      displayName: 'Marca de agua',
      required: false,
    }),

    payment_count: Property.Number({
      displayName: 'Quantidade de pagamentos parciais aceitos para este boleto',
      required: false,
    }),

    divergent_payment_type: Property.Number({
      displayName: 'Tipo de pagamento divergente',
      required: false,
    }),

    divergent_payment_value_type: Property.Number({
      displayName: 'Tipo de valor a considerar para os limites de pagamentos',
      required: false,
    }),

    divergent_payment_maximum_value: Property.Number({
      displayName: 'Valor máximo para a faixa de pagamentos divergentes',
      required: false,
    }),

    divergent_payment_minimum_value: Property.Number({
      displayName: 'Valor mínimo para a faixa de pagamentos divergentes',
      required: false,
    }),

    divergent_payment_maximum_percentage: Property.Number({
      displayName: 'Percentual máximo para a faixa de pagamentos divergentes',
      required: false,
    }),

    divergent_payment_minimum_percentage: Property.Number({
      displayName: 'Percentual mínimo para a faixa de pagamentos divergentes',
      required: false,
    }),

    divergent_payment_limit: Property.Number({
      displayName: 'Quantidade de pagamentos permitida',
      required: false,
    }),

    prevent_registration: Property.Checkbox({
      displayName: 'Evitar Registro no Banco',
      required: false,
    }),

    control_number: Property.ShortText({
      displayName: 'Número e controle',
      required: false,
    }),

    ignore_email: Property.Checkbox({
      displayName: 'Não enviar este boleto por e-mail',
      required: false,
    }),

    ignore_sms: Property.Checkbox({
      displayName: 'Não enviar este boleto por SMS',
      required: false,
    }),

    ignore_whatsapp: Property.Checkbox({
      displayName: 'Não enviar este boleto por WhatsApp',
      required: false,
    }),

    meta: Property.ShortText({
      displayName: 'Meta',
      required: false,
    }),

    notes: Property.ShortText({
      displayName: 'Observações',
      required: false,
    }),

    custom_attachment_name: Property.ShortText({
      displayName: 'Nome do arquivo em anexo',
      required: false,
    }),

    split_payment: Property.Checkbox({
      displayName: 'Split de Pagamento',
      required: false,
    }),
  },

  async run(context) {
    const request: HttpRequest = {
      method: HttpMethod.POST,
      url: `https://${kobanaUrl}/v1/bank_billets`,
      authentication: {
        type: AuthenticationType.BEARER_TOKEN,
        token: context.auth.access_token,
      },
      body: {
        properties: context.properties,
      },
    };
    const response = await httpClient.sendRequest(request);
    return response.body;
  },
});
