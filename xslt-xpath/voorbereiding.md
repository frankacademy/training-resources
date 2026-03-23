## voorbereiding voor de test van de xslt tooling

Als voorbereiding hebben we in ons project een aantal bestanden nodig:
- persoon.xml
- persoon2brieven.xsl

<img width="321" height="213" alt="image" src="https://github.com/user-attachments/assets/475d88e0-9c99-4e35-abf9-dc5cde8acf3c" />

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

```xsl
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
    <brieven>
      <brief>
        <aanhef><xsl:value-of select="concat(persoon/voornaam,' ',persoon/achternaam)"/></aanhef>
        <adres>
          <straat><xsl:value-of select="persoon/adressen/adres/straat"/></straat>
          <huisnummer><xsl:value-of select="persoon/adressen/adres/huisnummer"/></huisnummer>
          <postcode><xsl:value-of select="persoon/adressen/adres/postcode"/></postcode>
          <plaats><xsl:value-of select="persoon/adressen/adres/plaats"/></plaats>
        </adres>
      </brief>
    </brieven>
  </xsl:template>  
</xsl:stylesheet>
```
