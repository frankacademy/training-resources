
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
    <brieven>
      <brief>
        <aanhef><xsl:value-of select="concat(persoon/voornaam,' ',persoon/achternaam)"/></aanhef>
        <adres>
          <straat><xsl:value-of select="persoon/adressen/adres[1]/straat"/></straat>
          <huisnummer><xsl:value-of select="persoon/adressen/adres[1]/huisnummer"/></huisnummer>
          <postcode><xsl:value-of select="persoon/adressen/adres[1]/postcode"/></postcode>
          <plaats><xsl:value-of select="persoon/adressen/adres[1]/plaats"/></plaats>
        </adres>
      </brief>
    </brieven>
  </xsl:template>
</xsl:stylesheet>
```


resultaat

```xml
<?xml version="1.0" encoding="UTF-8"?>
<brieven>
   <brief>
      <aanhef>Jeroen Jansen van Rosendaal</aanhef>
      <adres>
         <straat>Molenstraat</straat>
         <huisnummer>1</huisnummer>
         <postcode>1234 AA</postcode>
         <plaats>Moerdijk</plaats>
      </adres>
   </brief>
</brieven>
```
