## Bouwen van een Frank integratie flow om landen te vertalen naar landcode

Begin in de bestaande Frank 

Maak een: 
- Extra configuratie "landen"
     - mappen structuur

           landen
             xml
             xsl
             xsd 

     - configuratie.xml + configuratie_landen.xml
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
<summary>Antwoord (resultaat)</summary>


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
			<Json2XmlInputValidator schema="xsd/landcode.xsd" root="landcode" produceNamespacelessXml="true" name="toxml">				
				<Forward name="failure" path="EXIT" />
			</Json2XmlInputValidator>
			<Exits>
				<Exit name="READY" state="SUCCESS" />
			</Exits>
			<XsltPipe name="transform XML" styleSheetName="xsl/landcode2land.xsl">
			
			
				<Forward name="success" path="READY"/>
			</XsltPipe>
			

			
		</Pipeline>
	</Adapter>
	
</Module>
```

</details>



