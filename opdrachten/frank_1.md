## Bouwen van een Frank integratie flow om de mapping uit te voeren

- (optioneel) maak een Frank aan (create a Frank - Simple Frank)




- pas de configuratie.xml aan zodat deze een referentie heeft naar configuratie_personen heeft. (include tag)
- maak de configuratie_personen.xml aan met daarin een adapter(integratie Flow)
- Gebruik een javalistener
- gebruik een validator om m.b.v. een xsd het binnenkomende personen bericht te valideren
- gebruik een xslt pipe om de output te mappen (gebruik hiervoor de eerder gemaakte xml, xsd en xsl file)


<details>
<summary>OPEN ANTWOORD</summary>
---
### Het resultaat

```xml
<Module
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:noNamespaceSchemaLocation="../FrankConfig.xsd"
	>
	<Adapter name="Persoon naar brief">
		<Receiver name="local-persoon">
			<JavaListener name="local-persoon-listener"/>
		</Receiver>
		<Pipeline firstPipe="transform XML">

			<XmlInputValidator name="validatePersoon" schema="xsd/persoon.xsd" root="persoon">
				<Forward name="exception" path="error" />
				<Forward name="parserError" path="error" />
				<Forward name="failure" path="error" />
				<Forward name="warnings" path="error" />
				<Forward name="outputParserError" path="error" />
				<Forward name="outputFailure" path="error" />
				<Forward name="outputWarnings" path="error" />
				<Forward name="success" path="READY"/>
			</XmlInputValidator>
			<XsltPipe name="transform XML" styleSheetName="xsl/persoon2brief.xsl"/>
			<EchoPipe name="okay">
				<Forward name="success" path="READY"/>
			</EchoPipe>
			<EchoPipe name="error" getInputFromFixedValue="error">
				<Forward name="success" path="READY"/>
			</EchoPipe>
			<Exits>
				<Exit name="READY" state="SUCCESS" />
			</Exits>
		</Pipeline>
	</Adapter>
	
</Module>
```
---
</details>


Om te testen:
- starten we de frank met ff.version=9.4.1-20260204.012729 (in de frank-runner.properties)
- openen we een browser op localhost
- kijk of alles netjes opgestart is
- ga naar testen / test-a-pipeline
- Stuur een goed en een fout bericht in

Goed bericht
```xml
<persoon>
    <voornaam>Jeroen</voornaam>
    <achternaam>Jansen van Rosendaal</achternaam>
    <adressen>
        <adres type="woon">
            <straat>Molenstraat</straat>
            <huisnummer>1</huisnummer>
            <postcode>1234 AA</postcode>
            <plaats>Moerdijk</plaats>
        </adres>
        <adres type="werk">
            <straat>Westersingel</straat>
            <huisnummer>42</huisnummer>
            <postcode>3014 GT</postcode>
            <plaats>Rotterdam</plaats>
        </adres>
    </adressen>
</persoon>
```

Fout bericht
```xml
<persoon>
    <naam>Jeroen</naam>
    <achternaam>Jansen van Rosendaal</achternaam>
    <adressen>
        <adres type="woon">
            <straat>Molenstraat</straat>
            <huisnummer>1</huisnummer>
            <postcode>1234 AA</postcode>
            <plaats>Moerdijk</plaats>
        </adres>
        <adres type="werk">
            <straat>Westersingel</straat>
            <huisnummer>42</huisnummer>
            <postcode>3014 GT</postcode>
            <plaats>Rotterdam</plaats>
        </adres>
    </adressen>
</persoon>
```



