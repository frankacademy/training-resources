# XSLT/XPath van DeltaXML

Deze biedt:
- Syntax highlighting
- IntelliSense voor XSLT + XPath
- Debugger (XSLT 2.0/3.0)
- xsltlint
- Integratie met Saxon (HE/PE/EE)


## 1 Installatie van de XSLT‑Extensie
- Open VS Code.
- Ga naar Extensions (Ctrl+Shift+X).
- Zoek naar "XSLT/XPath" (deltaxml.xslt-xpath).
- Klik op Install.

## 2 Installatie van Saxon (parser/transformer)
- Installeer een JDK (17 of hoger). [check je java versie](Java.md)
- Gebruik de Saxon versie uit deze repo of Download de neiuwste Saxon-HE JAR van saxonica.com. https://www.saxonica.com/download/java.xml
- Plaats het JAR-bestand in een tools-map of link hem direct in deze repo.

## 3 VS Code configuratie voor XSLT + Saxon
- Ctrl+Shift+P → Preferences: Open Settings (JSON)
```json
{
  "xslt.configuration.java.home": "/path/to/jdk", 
  "xslt.configuration.saxonJar": "/path/to/saxon-he-12.9.jar",
  "xslt.configuration.showPrintOutput": true,
  "xslt.configuration.enableLinting": true,
  "xslt.configuration.enableFormatting": true
}
```

**Windows voorbeeld van de paden** 
```json
{
  "xslt.configuration.java.home": "C:\\Program Files\\Eclipse Adoptium\\jdk-17.0.17.10-hotspot\\bin\\java.exe", 
  "xslt.configuration.saxonJar": "C:\\git\\training-resources\\xslt-xpath\\Saxon-he-12.9.jar;C:\\git\\training-resources\\xslt-xpath\\xmlresolver-5.3.3.jar"
}
```


## 4 Linting en syntaxcontrole
- Open een .xsl/.xslt bestand om automatisch linting te activeren.

Zodra je een .xslt of .xsl bestand opent heb je:

1. syntax checks
1. herkende fouten in XPath expressies
1. verwijzingen naar onbestaande templates
1. verkeerde match-patterns

De extension gebruikt zijn eigen parser én Saxon waar nodig.


## 5 XSLT uitvoeren via VS Code Tasks
- Maak een tasks.json aan.
- Configureer een task om Saxon via Java aan te roepen.

Maak een VS Code task aan:

Ctrl+Shift+P → Tasks: Configure Task
Kies Create tasks.json
```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "type": "xslt",
      "label": "xslt: Saxon Transform",
      "saxonJar": "${config:XSLT.tasks.saxonJar}",
      "xsltFile": "${command:xslt-xpath.pickXsltFile}",
      "xmlSource": "${command:xslt-xpath.pickXmlSourceFile}",
      "resultPath": "${workspaceFolder}/xsl-out/result1.xml",
      "allowSyntaxExtensions40": "off",
      "messageEscaping": "adaptive",
      "group": {
        "kind": "build"
      },
      "problemMatcher": [
        "$saxon-xslt"
      ]
    }
  ]
}
```

## 6 Auto-formatting
- Gebruik xslt.configuration-instellingen voor juiste formatting.

De formatter van DeltaXML ondersteunt:

- indenting
- attributes op nieuwe regels
- preserve whitespace

## 7 XPath evaluatie
- Gebruik Ctrl+Shift+P → Evaluate XPath.


## Meer details 

https://deltaxml.github.io/vscode-xslt-xpath/

## (expirimenteel) Debugging configureren (andere plugin)

Debugging is geen onderdeel van de DeltaXML plugin, DanielJonathan.xsltdebugger kan dit wel

Hoe het zou moeten werken:

- installeer de xslt debug plugin van Daniel Jonathan
- Maak een launch.json
1. Open Run and Debug (Ctrl+Shift+D)
1. Klik create launch.json
1. Voeg toe:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "xslt",
      "request": "launch",
      "name": "Debug XSLT",
      "engine": "saxonnet",
      "stylesheet": "${workspaceFolder}\\configurations\\personen\\xsl\\persoon2brieven.xsl",
      "xml": "${workspaceFolder}\\configurations\\personen\\xml\\persoon.xml",
      "stopOnEntry": true,
      "debug": true,
      "logLevel": "trace"
    }
  ]
}
```
Daarna kun je:

- breakpoints zetten
- variables inspecteren
- call stack bekijken






