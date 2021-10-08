---
sidebar_position: 8
---

# Iniciação QR Code Dinâmico com Troco

O Pix Troco está disponível apenas para QR Codes dinâmicos.

O campo opcional **valor.retirada.troco** indica que é um Pix Troco.

Ao ler o QR Code o objeto **valor** vem com algumas propriedades importantes para a criação da mensagem PACS.008. Abaixo está o mapeamento:

**valor.retirada.troco.modalidadeAgente**: `<Strd><RfrdDocInf><Tp><CdOrPrtry><Prtry>`
**valor.retirada.troco.prestadorDoServicoDeSaque**: `<Strd><RfrdDocInf><Tp><Issr>`

## Etapas

- **Usuário Pagador->>Participante Pagador:** Envia EMV (Via leitura de QR Code ou Pix Copia e Cola)
- **Participante Pagador->>DICT:** Decodifica EMV, Busca dados da conta
- **DICT-->>Participante Pagador:** Retorna dados da chave para análise e criação da mensagem
- **Participante Pagador->>SPI:** Verifica prioridade, Bloqueia saldos e envia PACS.008
- **SPI->>Participante Recebedor:** Bloqueia saldos e envia PACS.008
- **Participante Recebedor-->>SPI:** Valida conta, anota crédito e envia PACS.002(ACSP)
- **Paralelo - SPI-->>Participante Recebedor:** Ajusta saldo e envia PACS.002(ACCC) 
- **Paralelo - SPI-->>Participante Pagador:** Ajusta saldo e envia PACS.002(ACSC)
- **Participante Pagador-->>Usuário Pagador:** Envia confirmação de sucesso
- **Participante Recebedor->>Usuário Recebedor:** Envia confirmação de sucesso

## Diagrama

```mermaid
sequenceDiagram
  autonumber
  Usuário Pagador->>Participante Pagador: Envia EMV (Via leitura de QR Code ou Pix Copia e Cola)
  Participante Pagador->>DICT: Decodifica EMV, Busca dados da conta
  DICT -->>Participante Pagador: Retorna dados da chave para análise e criação da mensagem
  Participante Pagador->>SPI: Verifica prioridade, Bloqueia saldos e envia PACS.008
  SPI->>Participante Recebedor: Bloqueia saldos e envia PACS.008
  Participante Recebedor-->>SPI: Valida conta, anota crédito e envia PACS.002(ACSP)
  par Paralelo
    SPI-->>Participante Recebedor: Ajusta saldo e envia PACS.002(ACCC)
  and
    SPI-->>Participante Pagador: Ajusta saldo e envia PACS.002(ACSC)
  end
  Participante Pagador-->>Usuário Pagador: Envia confirmação de sucesso
  Participante Recebedor-->>Usuário Recebedor: Envia confirmação de sucesso
```

## Mensagens trocadas

Mensagens com comentários de cada elemento do xml


### PACS.008 - QRES

```xml
<?xml version="1.0" standalone="no"?>
<Envelope xmlns="https://www.bcb.gov.br/pi/pacs.008/1.7">
  <AppHdr>
    <!-- Sempre o "from" vai ser a sua instituição -->
    <Fr>
      <FIId>
        <FinInstnId>
          <Othr>
            <Id>00000000</Id>
          </Othr>
        </FinInstnId>
      </FIId>
    </Fr>
    <!-- Sempre o "to" vai ser para o BACEN -->
    <To>
      <FIId>
        <FinInstnId>
          <Othr>
            <Id>00038166</Id>
          </Othr>
        </FinInstnId>
      </FIId>
    </To>
    <!-- ID da mensagem -->
    <BizMsgIdr>M0000000000000000000000000000000</BizMsgIdr>
    <MsgDefIdr>pacs.008.spi.1.7</MsgDefIdr>
    <!-- Data de criação da mensagem -->
    <CreDt>2021-08-05T14:04:17.719Z</CreDt>
  </AppHdr>
  <Document>
    <FIToFICstmrCdtTrf>
      <GrpHdr>
        <!-- ID da mensagem -->
        <MsgId>M0000000000000000000000000000000</MsgId>
        <!-- Data de criação da mensagem -->
        <CreDtTm>2019-07-26T16:00:00.510Z</CreDtTm>
        <!-- Quantidade de transações na mensagem podem ir de 1 a 10 -->
        <NbOfTxs>1</NbOfTxs>
        <SttlmInf>
          <!-- Sempre vai ser esse código que significa ClearingSystem -->
          <SttlmMtd>CLRG</SttlmMtd>
        </SttlmInf>
        <PmtTpInf>
          <!-- Prioridade da mensagem pode ser HIGH (envio normal do Pix) ou 
            NORM (Pix Agendado ou Suspeita de Fraude)  -->
          <InstrPrty>HIGH</InstrPrty>
          <SvcLvl>
            <!-- Tipo de pagamento PAGPRI(pagamento prioritário), 
            PAGFRD (pagamento com suspeita de fraude, condiciona a prop InstrPrty a NORM) 
            PAGAGD (pagamento agendado, condiciona a prop InstrPrty a NORM)  -->
            <Prtry>PAGPRI</Prtry>
          </SvcLvl>
        </PmtTpInf>
      </GrpHdr>
      <CdtTrfTxInf>
        <PmtId>
          <!-- ID end to end regras estão descritas no documento "Comunicação SPI"
             esse id será utilizado para fazer o match entre diferentes mensagens -->
          <EndToEndId>E00000000000000000000000000</EndToEndId>
          <!-- idConciliacaoRecebedor -->
          <TxId>0000000000000000000000000</TxId>
        </PmtId>
        <!-- Valor da transação atributo BRL obrigatório é o valor total da transação -->
        <IntrBkSttlmAmt Ccy="BRL">500</IntrBkSttlmAmt>
        <!-- Data de criação da transação -->
        <AccptncDtTm>2019-07-26T15:59:57.800Z</AccptncDtTm>
        <!-- Sempre vai ser esse código que significa FollowingServiceLevel -->
        <ChrgBr>SLEV</ChrgBr>
        <MndtRltdInf>
          <Tp>
            <LclInstrm>
              <!-- Somente Dinâmicos 
              QRES (usando QR Code estático, condiciona a prop Proxy a obrigatoriedade) -->
              <Prtry>QRES</Prtry>
            </LclInstrm>
          </Tp>
        </MndtRltdInf>
        <!-- Informações do usuário pagador -->
        <Dbtr>
          <!-- Nome -->
          <Nm>Fulano da Silva</Nm>
          <Id>
            <PrvtId>
              <Othr>
                <!-- CPF ou CNPJ -->
                <Id>00000000000</Id>
              </Othr>
            </PrvtId>
          </Id>
        </Dbtr>
        <DbtrAcct>
          <Id>
            <Othr>
              <!-- Conta, se houver valor alfanumérico, este deve ser convertido para 0 -->
              <Id>000000000</Id>
              <!-- Agencia, não obrigatório -->
              <Issr>0000</Issr>
            </Othr>
          </Id>
          <Tp>
            <!-- Tipo de conta podendo ser: CACC(corrente), SLRY(salário, ainda não é utilizado), 
            SVGS(poupança) e TRAN (conta pagamento) -->
            <Cd>CACC</Cd>
          </Tp>
        </DbtrAcct>
        <DbtrAgt>
          <FinInstnId>
            <ClrSysMmbId>
              <!-- ISPB do participante pagador -->
              <MmbId>00000000</MmbId>
            </ClrSysMmbId>
          </FinInstnId>
        </DbtrAgt>
        <!-- Informações do usuário recebedor -->
        <CdtrAgt>
          <FinInstnId>
            <ClrSysMmbId>
              <!-- ISPB do participante recebedor -->
              <MmbId>00000000</MmbId>
            </ClrSysMmbId>
          </FinInstnId>
        </CdtrAgt>
        <Cdtr>
          <Id>
            <PrvtId>
              <Othr>
                <!-- CPF ou CNPJ -->
                <Id>00000000000</Id>
              </Othr>
            </PrvtId>
          </Id>
        </Cdtr>
        <CdtrAcct>
          <Id>
            <Othr>
              <!-- Conta, se houver valor alfanumérico, este deve ser convertido para 0 -->
              <Id>000000000000</Id>
              <!-- Agencia, não obrigatório -->
              <Issr>0000</Issr>
            </Othr>
          </Id>
          <Tp>
            <!-- Tipo de conta podendo ser: CACC(corrente), SLRY(salário, ainda não é utilizado), 
            SVGS(poupança) e TRAN (conta pagamento) -->
            <Cd>CACC</Cd>
          </Tp>
          <Prxy>
            <Id>4004901d-bd85-4769-8e52-cb4c42c506dx</Id>
          </Prxy>
        </CdtrAcct>
        <Purp>
          <!-- IPAY (pagamento instantâneos), GSCB (pix troco), OTHR(pix saque) -->
          <Cd>GSCB</Cd>
        </Purp>
        <RmtInf>
          <!-- Campo onde o usuário pagador escreve uma mensagem para o recebedor 140char -->
          <Ustrd>mensagem opcional</Ustrd>
          <Strd>
            <RfrdDocInf>
              <Tp>
                <CdOrPrtry>
                  <!-- AGPSS - Agente Prestador de Serviço de Saque. Pix Saque ou Pix Troco com tarifa de intercâmbio (TIR) de participante prestador de serviço de saque (PSS) que presta diretamente o serviço de saque.
		
                AGTEC	- Agente Estabelecimento Comercial. Pix Saque ou Pix Troco com tarifa de intercâmbio (TIR) de agente de saque que é um estabelecimento comercial.
                    
                AGTOT	- Agente Outra Espécie de Pessoa Jurídica. Pix Saque ou Pix Troco com tarifa de intercâmbio (TIR) de agente de saque que é outra espécie de pessoa jurídica.
		            -->
                  <Prtry>AGTEC</Prtry>
                </CdOrPrtry>
                <!-- ISPB do prestador de serviço de pagamento "pss" nos QR Codes -->
                <Issr>55555555</Issr>
              </Tp>
            </RfrdDocInf>
            <RfrdDocAmt>
            <!-- Somatória do VLCP e VLDN devem ser o valor total da transação (IntrBkSttlmAmt) -->
              <AdjstmntAmtAndRsn>
                <!-- Valor da compra -->
                <Amt Ccy="BRL">400</Amt>
                <Rsn>VLCP</Rsn>
              </AdjstmntAmtAndRsn>
              <AdjstmntAmtAndRsn>
                <Amt Ccy="BRL">100</Amt>
                <!-- Recurso em espécie disponibilizado para o usuário pagador (valor disponibilizado) -->
                <Rsn>VLDN</Rsn>
              </AdjstmntAmtAndRsn>
            </RfrdDocAmt>
          </Strd>
        </RmtInf>
      </CdtTrfTxInf>
    </FIToFICstmrCdtTrf>
  </Document>
</Envelope>
```

### PACS.002 - Confirmação do PARTICIPANTE RECEBEDOR para SPI

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<Envelope xmlns="https://www.bcb.gov.br/pi/pacs.002/1.8">
  <AppHdr>
    <!-- Sempre o "from" vai ser a sua instituição -->
    <Fr>
      <FIId>
        <FinInstnId>
          <Othr>
            <Id>00000000</Id>
          </Othr>
        </FinInstnId>
      </FIId>
    </Fr>
    <!-- Sempre o to vai ser para o BACEN -->
    <To>
      <FIId>
        <FinInstnId>
          <Othr>
            <Id>00038166</Id>
          </Othr>
        </FinInstnId>
      </FIId>
    </To>
    <!-- ID da mensagem -->
    <BizMsgIdr>M0000000000000000000000000000000</BizMsgIdr>
    <MsgDefIdr>pacs.002.spi.1.8</MsgDefIdr>
    <!-- Data de criação da mensagem -->
    <CreDt>2020-01-01T08:30:12.000Z</CreDt>
    <Sgntr/>
  </AppHdr>
  <Document>
    <FIToFIPmtStsRpt>
      <GrpHdr>
        <!-- ID da mensagem -->
        <MsgId>M0000000000000000000000000000000</MsgId>
        <!-- Data de criação da mensagem -->
        <CreDtTm>2020-01-01T08:30:12.000Z</CreDtTm>
      </GrpHdr>
      <TxInfAndSts>
        <!-- O EndToEndId se for uma resposta para PACS.008 (liquidação) ou
        ReturnIdentification se for uma resposta para PACS.004 (devolução)  -->
        <OrgnlInstrId>E0000000000000000000000000000000</OrgnlInstrId>
        <!-- O EndToEndIdentification da PACS.008 (liquidação) -->
        <OrgnlEndToEndId>E0000000000000000000000000000000</OrgnlEndToEndId>
        <!-- ACSP - AcceptedSettlementInProcess - Prosseguimento de instrução de pagamento após as validação realizadas pelo participante do usuário recebedor. -->
        <TxSts>ACSP</TxSts>
      </TxInfAndSts>
    </FIToFIPmtStsRpt>
  </Document>
</Envelope>
```

### PACS.002 - Confirmação do SPI para PARTICIPANTE RECEBEDOR

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<Envelope xmlns="https://www.bcb.gov.br/pi/pacs.002/1.8">
  <AppHdr>
    <!-- Sempre o "from" vai ser a sua instituição -->
    <Fr>
      <FIId>
        <FinInstnId>
          <Othr>
            <Id>00000000</Id>
          </Othr>
        </FinInstnId>
      </FIId>
    </Fr>
    <!-- Sempre o to vai ser para o BACEN -->
    <To>
      <FIId>
        <FinInstnId>
          <Othr>
            <Id>00038166</Id>
          </Othr>
        </FinInstnId>
      </FIId>
    </To>
    <!-- ID da mensagem -->
    <BizMsgIdr>M0000000000000000000000000000000</BizMsgIdr>
    <MsgDefIdr>pacs.002.spi.1.8</MsgDefIdr>
    <!-- Data de criação da mensagem -->
    <CreDt>2020-01-01T08:30:12.000Z</CreDt>
    <Sgntr/>
  </AppHdr>
  <Document>
    <FIToFIPmtStsRpt>
      <GrpHdr>
        <!-- ID da mensagem -->
        <MsgId>M0000000000000000000000000000000</MsgId>
        <!-- Data de criação da mensagem -->
        <CreDtTm>2020-01-01T08:30:12.000Z</CreDtTm>
      </GrpHdr>
      <TxInfAndSts>
        <!-- O EndToEndId se for uma resposta para PACS.008 (liquidação) ou
        ReturnIdentification se for uma resposta para PACS.004 (devolução)  -->
        <OrgnlInstrId>E0000000000000000000000000000000</OrgnlInstrId>
        <!-- O EndToEndIdentification da PACS.008 (liquidação) -->
        <OrgnlEndToEndId>E0000000000000000000000000000000</OrgnlEndToEndId>
        <!-- ACCC - AcceptedSettlementCompleted - Notificação do SPI da conclusão da transação ao participante do usuário recebedor. -->
        <TxSts>ACCC</TxSts>
        <FctvIntrBkSttlmDt>
          <DtTm>2020-01-01T08:30:12.000Z</DtTm>
        </FctvIntrBkSttlmDt>
        <OrgnlTxRef>
          <IntrBkSttlmDt>2020-01-01</IntrBkSttlmDt>
        </OrgnlTxRef>
      </TxInfAndSts>
    </FIToFIPmtStsRpt>
  </Document>
</Envelope>
```

### PACS.002 - Confirmação do SPI para PARTICIPANTE PAGADOR

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<Envelope xmlns="https://www.bcb.gov.br/pi/pacs.002/1.8">
  <AppHdr>
    <!-- Sempre o "from" vai ser a sua instituição -->
    <Fr>
      <FIId>
        <FinInstnId>
          <Othr>
            <Id>00000000</Id>
          </Othr>
        </FinInstnId>
      </FIId>
    </Fr>
    <!-- Sempre o to vai ser para o BACEN -->
    <To>
      <FIId>
        <FinInstnId>
          <Othr>
            <Id>00038166</Id>
          </Othr>
        </FinInstnId>
      </FIId>
    </To>
    <!-- ID da mensagem -->
    <BizMsgIdr>M0000000000000000000000000000000</BizMsgIdr>
    <MsgDefIdr>pacs.002.spi.1.8</MsgDefIdr>
    <!-- Data de criação da mensagem -->
    <CreDt>2020-01-01T08:30:12.000Z</CreDt>
    <Sgntr/>
  </AppHdr>
  <Document>
    <FIToFIPmtStsRpt>
      <GrpHdr>
        <!-- ID da mensagem -->
        <MsgId>M0000000000000000000000000000000</MsgId>
        <!-- Data de criação da mensagem -->
        <CreDtTm>2020-01-01T08:30:12.000Z</CreDtTm>
      </GrpHdr>
      <TxInfAndSts>
        <!-- O EndToEndId se for uma resposta para PACS.008 (liquidação) ou
        ReturnIdentification se for uma resposta para PACS.004 (devolução)  -->
        <OrgnlInstrId>E0000000000000000000000000000000</OrgnlInstrId>
        <!-- O EndToEndIdentification da PACS.008 (liquidação) -->
        <OrgnlEndToEndId>E0000000000000000000000000000000</OrgnlEndToEndId>
        <!-- ACSC - AcceptedSettlementCompletedDebitorAccount - Notificação do SPI da conclusão da transação ao participante do usuário pagador.  -->
        <TxSts>ACSC</TxSts>
        <FctvIntrBkSttlmDt>
          <DtTm>2020-01-01T08:30:12.000Z</DtTm>
        </FctvIntrBkSttlmDt>
        <OrgnlTxRef>
          <IntrBkSttlmDt>2020-01-01</IntrBkSttlmDt>
        </OrgnlTxRef>
      </TxInfAndSts>
    </FIToFIPmtStsRpt>
  </Document>
</Envelope>
```