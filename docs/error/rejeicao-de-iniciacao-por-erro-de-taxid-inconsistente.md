---
sidebar_position: 4
---

# Erro BE01 - Rejeição de iniciação por inconsistência entre CPF/CNPJ e conta transacional especificada

Transação interrompida por erro de inconsistência entre conta transacional e identificador CPF/CNPJ

## Regras

- **Mensagem utilizada:** PACS.002;
- **Código do Erro:** BE01;
- **Quem gera o erro:** Recebedor
- **Enviada para:** SPI
- **Processada por:** 

### PACS.002

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
        <!-- RJCT - Instrução de pagamento/devolução rejeitada pelo SPI / participante do usuário recebedor por erro de negócio  -->
        <TxSts>RJCT</TxSts>
        <StsRsnInf>	
          <Rsn>
            <!-- Razão do erro -->
            <Cd>BE01</Cd>
          </Rsn>
          <AddtlInf>"mensagem de erro"</AddtlInf>
        </StsRsnInf>	
      </TxInfAndSts>
    </FIToFIPmtStsRpt>
  </Document>
</Envelope>
```