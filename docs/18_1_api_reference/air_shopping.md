---
title: AirShopping
sidebar_position: 3
---
## Air Shopping

AirShopping provides a flexible and personalised experience for your customers – with price offers that can include ancillary services and all applicable fare rules and media content fully integrated. See below sample of XML response and request messages.

### AirShopping Request

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Header/>
    <soapenv:Body>
        <AirShoppingRQ xmlns="http://www.iata.org/IATA/2015/00/2018.1/AirShoppingRQ">
    <PayloadAttributes>
        <Version>18.1</Version>
    </PayloadAttributes>
    <PointOfSale>
        <Country>
            <CountryCode>EI</CountryCode>
        </Country>
    </PointOfSale>
    <Party>
        <Participant>
            <Aggregator>
                <AggregatorID>2060</AggregatorID>
            </Aggregator>
        </Participant>
        <Recipient>
            <EnabledSystem>
                <SystemID>EI-API-NDC</SystemID>
            </EnabledSystem>
        </Recipient>
        <Sender>
            <TravelAgency>
                <AgencyID>2060</AgencyID>
                <TravelAgent>
                    <TravelAgentID>342561</TravelAgentID>
                </TravelAgent>
            </TravelAgency>
        </Sender>
    </Party>
    <Request>
        <FlightRequest>
            <OriginDestRequest>
                <DestArrivalRequest>
                    <IATA_LocationCode>ORD</IATA_LocationCode>
                </DestArrivalRequest>
                <OriginDepRequest>
                    <IATA_LocationCode>DUB</IATA_LocationCode>
                    <Date>2025-07-25</Date>
                </OriginDepRequest>
            </OriginDestRequest>
        </FlightRequest>
        <Paxs>
            <Pax>
                <PaxID>PAX-0</PaxID>
                <PTC>ADT</PTC>
            </Pax>
        </Paxs>
        <ResponseParameters>
            <LangUsage>
                <LangCode>en</LangCode>
            </LangUsage>
        </ResponseParameters>
    </Request>
</AirShoppingRQ>

    </soapenv:Body>
</soapenv:Envelope>
```

### AirShopping Response
