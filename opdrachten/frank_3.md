## SOAP bericht

Begin wederom in de bestaande Frank 

Maak een: 
- Extra configuratie "zaken"
     - mappen structuur

           zaken
             xml
             xsl
             xsd 

     - configuratie.xml + configuratie_zaak.xml


- Integratie flow (adapter)
     - webservice listener
     - soapvalidator

Maak een nieuwe configuratie folder "zaken"



```xml
<Receiver name="local-zaak">
	<WebServiceListener name="local-zaak-listener" soapAction="creerzaak" />
</Receiver>
```

 
