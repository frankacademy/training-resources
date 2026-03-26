
<!-- Custom styling for details/summary -->
<link rel="stylesheet" href="/assets/css/details.css">
<script src="/assets/css/details.js"></script>

## “JSON in XSLT” 

1. json2xml() 
1. parsexml()

### Condities
Maak een xslt om dit uit te proberen:

voor het gemak stoppen we de json in de input.xml

Voorbeeld json input.xml
```xml
<json>
{
  "voornaam": "Jeroen",
  "achternaam": "Jansen van rosendaal",
  "huisnummer":24 ,
  "roles": ["architect", "trainer"]
}
</json>
```

Gewenste output xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<output>
   <voornaam>Jeroen</voornaam>
   <huisnummer>24</huisnummer>
   <rollen>
      <rol>architect</rol>
      <rol>trainer</rol>
   </rollen>
</output>
```



Gebruik de json2xml function en maak een xslt

letop! voeg de xmlns:fn="http://www.w3.org/2005/xpath-functions" namespace toe

hier wat bouwblokjes 

``` xml

<!-- de json-to-xml output -->
<map xmlns="http://www.w3.org/2005/xpath-functions">
   <string key="voornaam">Jeroen</string>
   <string key="achternaam">Jansen van rosendaal</string>
   <number key="huisnummer">24</number>
   <array key="roles">
      <string>architect</string>
      <string>trainer</string>
   </array>
</map>

<!-- Parse JSON inside XML -->
<xsl:variable name="data" select="json-to-xml(/json)" />

<!-- select  -->
<xsl:value-of select="$data/fn:map/fn:string[@key='voornaam']"/>

```


<details>
<summary>Antwoord (json2xml)</summary>


```xslt
<xsl:stylesheet
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:fn="http://www.w3.org/2005/xpath-functions"
    version="3.0">

    <xsl:output method="xml" indent="yes"/>

    <xsl:template match="/">
        <!-- Parse JSON inside XML -->
        <xsl:variable name="data" select="json-to-xml(/json)" />

        <output>
            <voornaam>
                <xsl:value-of select="$data/fn:map/fn:string[@key='voornaam']"/>
            </voornaam>
            <huisnummer>
                <xsl:value-of select="$data/fn:map/fn:number[@key='huisnummer']"/>
            </huisnummer>

            <rollen>
                
                <xsl:for-each select="$data/fn:map/fn:array[@key='roles']/fn:string">
                    <role><xsl:value-of select="."/></role>
                </xsl:for-each>
            </rollen>
        </output>

    </xsl:template>

</xsl:stylesheet>
```
</details>



Gebruik de parse-json() function en maak een xslt

Hier wat bouwblokjes 

```xml
<!-- Parse JSON inside XML -->
<xsl:variable name="data" select="parse-json(/json)" />
<!-- select  -->
<xsl:value-of select="$data?voornaam"/>
```



<details>
<summary>Antwoord (parse-json())</summary>

## 

```xslt
<xsl:stylesheet
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="3.0">

    <xsl:output method="xml" indent="yes"/>

    <xsl:template match="/">
        <!-- Parse JSON inside XML -->
        <xsl:variable name="data" select="parse-json(/json)" />

        <output>
            <voornaam>
                <xsl:value-of select="$data?voornaam"/>
            </voornaam>
            <huisnummer>
                <xsl:value-of select="$data?huisnummer"/>
            </huisnummer>

            <rollen>
                <xsl:for-each select="$data?roles?*">
                    <rol><xsl:value-of select="."/></rol>
                </xsl:for-each>
            </Items>
        </Order>

    </xsl:template>

</xsl:stylesheet>
```

</details>

Output xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<output>
   <voornaam>Jeroen</voornaam>
   <huisnummer>24</huisnummer>
   <rollen>
      <rol>architect</rol>
      <rol>trainer</rol>
   </rollen>
</output>
```
