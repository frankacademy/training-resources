## “Complexere XSLT” 


1. Gebruik een lookup tabel
1. Maak een simpele XSLT mapping
1. Test de mapping


Maak een: 
- nieuw xsl bestand aanmaken
- voeg een xml bestand toe



### Het resultaat zou er ongeveer zo uit kunnen zien (niet copieren plakken maar proberen zelf te maken) 
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

### Een xsd genereren
- Kies voor de tweede optie

<img width="685" height="472" alt="image" src="https://github.com/user-attachments/assets/eb92e2f5-7001-4e1f-81a9-f242e3c821b1" />




```xml
<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
    <xs:element name="persoon">
        <xs:complexType>
            <xs:sequence>
                <xs:element name="voornaam" type="xs:string" />
                <xs:element name="achternaam" type="xs:string" />
                <xs:element name="adressen">
                    <xs:complexType>
                        <xs:sequence>
                            <xs:element name="adres" maxOccurs="unbounded">
                                <xs:complexType>
                                    <xs:sequence>
                                        <xs:element name="straat" type="xs:string" />
                                        <xs:element name="huisnummer" type="xs:string" />
                                        <xs:element name="postcode" type="xs:string" />
                                        <xs:element name="plaats" type="xs:string" />
                                    </xs:sequence>
                                    <xs:attribute name="type" use="required" />
                                </xs:complexType>
                            </xs:element>
                        </xs:sequence>
                    </xs:complexType>
                </xs:element>
            </xs:sequence>
        </xs:complexType>
    </xs:element>
</xs:schema>
```

### Een XSLT maken
We willen een XSLT maken die een brief adressering naar het werk adres opzet

mapping
```
brief
  adresregel_1 ==> voornaam + '' + achternaam
  adresregel_2 ==> straat + '' + huisnummer
  adresregel_3 ==> postcode +' '+ woonplaats
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:xs="http://www.w3.org/2001/XMLSchema"
                xmlns:array="http://www.w3.org/2005/xpath-functions/array"
                xmlns:map="http://www.w3.org/2005/xpath-functions/map"
                xmlns:math="http://www.w3.org/2005/xpath-functions/math"
                exclude-result-prefixes="#all"
                expand-text="yes"
                version="3.0">
  
  <xsl:output method="xml" indent="yes"/>
 
  <xsl:template match="/">
      <brief>
 .......
       </brief>
  </xsl:template>
</xsl:stylesheet>
```

3 manieren om spatie tussen waardes te krijgen
```xml
<adresregel_1><xsl:value-of select="concat(persoon/voornaam,' ',persoon/achternaam)"/></adresregel_1>
<adresregel_2><xsl:value-of select="persoon/adressen/adres[@type='werk']/straat"/><xsl:text> </xsl:text><xsl:value-of select="persoon/adressen/adres[@type='werk']/huisnummer"/></adresregel_2>
<adresregel_3><xsl:value-of select="persoon/adressen/adres[@type='werk']/(postcode,plaats)"/></adresregel_3> 
```