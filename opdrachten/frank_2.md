
<!-- Custom styling for details/summary -->
<link rel="stylesheet" href="/assets/css/details.css">
<script src="/assets/css/details.js"></script>

## Bouwen van een Frank integratie flow om landen te vertalen naar landcode

Begin in de bestaande Frank 

Maak een: 
- configuratie_landen.xml file aan in de personen folder
     - personen
           landen
             xml
             xsl
             xsd 
		configuration_landen.xml
		configuration_personen.xml
		configuration.xml

- Integratie flow
     - API listener
     - xmljsonvalidator
     - xslt pipe

 
Bouw de adapter en gebruik deze test berichten


Test berichten

JSON
```json
{"landcode":"NL"}
```
XML
 ```xml
<landcode>NL</landcode>
```


XSD tbv landcode te gebruiken in de validator 
```xsd
<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
    <xs:element name="landcode" type="xs:string" />
</xs:schema>
```

<details>
<summary>OPEN ANTWOORD</summary>
---


### Het resultaat

```xml
<Module
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:noNamespaceSchemaLocation="../FrankConfig.xsd"
	>
	<Adapter name="landcode naar landnaam en netnummer">
		<Receiver name="api-landen">
			<ApiListener uriPattern="landen"></ApiListener>
		</Receiver>
		<Pipeline firstPipe="transform XML">
			<Json2XmlInputValidator schema="landen/xsd/landcode.xsd" root="landcode" produceNamespacelessXml="true" name="toxml">				
				<Forward name="failure" path="EXIT" />
			</Json2XmlInputValidator>
			<Exits>
				<Exit name="EXIT" state="SUCCESS" />
			</Exits>
			<XsltPipe name="transform XML" styleSheetName="landen/xsl/landcode2land.xsl">
			
			
				<Forward name="success" path="EXIT"/>
			</XsltPipe>
			

			
		</Pipeline>
	</Adapter>
	
</Module>
```
---
</details>

## extra 
Als we willen dat de landcode ook als url param of als andere session keyy kan worden meegegeven dan kunnen we een param toevoegen aan de Json2XmlInputValidator

```xml

	<Json2XmlInputValidator schema="landen/xsd/landcode.xsd" root="landcode" produceNamespacelessXml="true" name="toxml">				
				<Param name="landcode" sessionKey="landcode"></Param>
				<Forward name="failure" path="EXIT" />
			</Json2XmlInputValidator>

```

