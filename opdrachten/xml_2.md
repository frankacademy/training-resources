
<!-- Custom styling for details/summary -->
<link rel="stylesheet" href="/assets/css/details.css">
<script src="/assets/css/details.js"></script>

## “Complexere XSLT” 

1. Condities 
1. Templates / herhalingen
1. Lookup tabel



### Condities
in een xslt kunnen condities op meerdere manieren worden toegepast:
- xsl:if
- xsl:choose
- XPATH

Maak een xslt om dit uit te proberen:

```xml
<xsl:if test="@age &gt; 18">
    <volwassen>true</volwassen>
</xsl:if>
```

```xml
<xsl:choose>
    <xsl:when test="@age &lt; 18">
        <status>minderjarig</status>
    </xsl:when>
    <xsl:when test="@age &lt; 65">
        <status>volwassen</status>
    </xsl:when>
    <xsl:otherwise>
        <status>senior</status>
    </xsl:otherwise>
</xsl:choose>
```

```xpath
<xsl:value-of select="if (@age &lt; 18) then 'minderjarig' else 'volwassen'"/>
```



### Templates / herhalingen

Input xml
```xml
<orders>
    <order id="A100">
        <item>
            <name>Laptop Sleeve</name>
            <price>25</price>
        </item>
    </order>

    <order id="B200">
        <item>
            <name>Monitor</name>
            <price>150</price>
        </item>
    </order>

    <order id="C300">
        <item>
            <name>USB Cable</name>
            <price>10</price>
        </item>
        <item>
            <name>External SSD</name>
            <price>120</price>
        </item>
    </order>

    <order id="D400">
        <item>
            <name>Mouse</name>
            <price>40</price>
        </item>
    </order>
</orders>
```

De xslt functie 
```xml
<xsl:for-each select="order[item/price &gt; 100]">
    <expensive-order>
        <xsl:value-of select="@id"/>
    </expensive-order>
</xsl:for-each>
```


Input xml
```xml
<people>
    <person name="Jan" age="17"/>
    <person name="Sarah" age="25"/>
    <person name="Tom" age="18"/>
    <person name="Lotte" age="12"/>
</people>
```

de xslt functie
```xml
<xsl:template match="person[@age &gt;= 18]">
    <adult>
        <xsl:value-of select="@name"/>
    </adult>
</xsl:template>
```



### lookup tabel

voorbeeld lookup tabel
```xml
<?xml version="1.0" encoding="UTF-8"?>
<domains xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="LookupTable.xsd">
    <domain name="Landen">
        <value from="NL" to="Nederland"/>
        <value from="BE" to="België"/>
        <value from="DE" to="Duitsland"/>
        <value from="FR" to="Frankrijk"/>
        <value from="ES" to="Spanje"/>
        <value from="IT" to="Italië"/>
        <value from="LU" to="Luxemburg"/>
        <value from="UK" to="Verenigd Koninkrijk"/>
        <value from="IE" to="Ierland"/>
        <value from="DK" to="Denemarken"/>
        <value from="NO" to="Noorwegen"/>
        <value from="SE" to="Zweden"/>
        <value from="FI" to="Finland"/>
        <value from="AT" to="Oostenrijk"/>
        <value from="CH" to="Zwitserland"/>
        <value from="PT" to="Portugal"/>
        <value from="PL" to="Polen"/>
        <value from="CZ" to="Tsjechië"/>
        <value from="SK" to="Slowakije"/>
        <value from="HU" to="Hongarije"/>
        <value from="GR" to="Griekenland"/>
        <value from="RO" to="Roemenië"/>
        <value from="BG" to="Bulgarije"/>
        <value from="HR" to="Kroatië"/>
        <value from="SI" to="Slovenië"/>
        <value from="EE" to="Estland"/>
        <value from="LV" to="Letland"/>
        <value from="LT" to="Litouwen"/>
    </domain>
    <domain name="LandNummers">
        <value from="NL" to="+31"/>
        <value from="BE" to="+32"/>
        <value from="DE" to="+49"/>
        <value from="FR" to="+33"/>
        <value from="ES" to="+34"/>
        <value from="IT" to="+39"/>
        <value from="LU" to="+352"/>
        <value from="UK" to="+44"/>
        <value from="IE" to="+353"/>
        <value from="DK" to="+45"/>
        <value from="NO" to="+47"/>
        <value from="SE" to="+46"/>
        <value from="FI" to="+358"/>
        <value from="AT" to="+43"/>
        <value from="CH" to="+41"/>
        <value from="PT" to="+351"/>
        <value from="PL" to="+48"/>
        <value from="CZ" to="+420"/>
        <value from="SK" to="+421"/>
        <value from="HU" to="+36"/>
        <value from="GR" to="+30"/>
        <value from="RO" to="+40"/>
        <value from="BG" to="+359"/>
        <value from="HR" to="+385"/>
        <value from="SI" to="+386"/>
        <value from="EE" to="+372"/>
        <value from="LV" to="+371"/>
        <value from="LT" to="+370"/>
        <value from="US" to="+1"/>
        <value from="CA" to="+1"/>
        <value from="AU" to="+61"/>
        <value from="NZ" to="+64"/>
        <value from="CN" to="+86"/>
        <value from="JP" to="+81"/>
        <value from="IN" to="+91"/>
        <value from="BR" to="+55"/>
    </domain>
</domains>
```



een standaard template om de lookup mee te gebruiken
```xml
 <xsl:template name="lookup">
    <xsl:param name="lookupValue"/>
    <xsl:param name="lookupName"/>
    <xsl:choose>
      <xsl:when test="$domainLookup/domains/domain[@name=$lookupName]/value[@from=$lookupValue]/@to">
        <xsl:value-of select="$domainLookup/domains/domain[@name=$lookupName]/value[@from=$lookupValue]/@to"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$domainLookup/domains/domain[@name=$lookupName]/default/@to"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
```


de aanroep van de template
```xml
<xsl:call-template name="lookup">
    <xsl:with-param name="lookupValue" select="landcode"/>
    <xsl:with-param name="lookupName" select="'LandNummers'"/>
</xsl:call-template>
```

input xml
```xml
<landcode>NL</landcode>
```

<details>
<summary>Antwoord (resultaat)</summary>

### Het resultaat
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
  <xsl:variable name="domainLookup" select="document('../xml/lookup_landen.xml')" />
  <xsl:template match="/">
    <output>
      <xsl:element name="landnaam">
        <xsl:call-template name="lookup">
          <xsl:with-param name="lookupValue" select="landcode"/>
          <xsl:with-param name="lookupName" select="'Landen'"/>
        </xsl:call-template>
      </xsl:element>    
      <xsl:element name="landnummerprefix">
        <xsl:call-template name="lookup">
          <xsl:with-param name="lookupValue" select="landcode"/>
          <xsl:with-param name="lookupName" select="'LandNummers'"/>
        </xsl:call-template>
      </xsl:element>
    </output>   
  </xsl:template>
  
  
  <xsl:template name="lookup">
    <xsl:param name="lookupValue"/>
    <xsl:param name="lookupName"/>
    <xsl:choose>
      <xsl:when test="$domainLookup/domains/domain[@name=$lookupName]/value[@from=$lookupValue]/@to">
        <xsl:value-of select="$domainLookup/domains/domain[@name=$lookupName]/value[@from=$lookupValue]/@to"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$domainLookup/domains/domain[@name=$lookupName]/default/@to"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  
</xsl:stylesheet>
```

</details>

- test dit geheel in VSCODE