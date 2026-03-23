## “BASIS XML” in vscode

Om de xslt pugin goed te kunnen testen/gebruiken gaan we zelf een test opzetten. 

1. Maak een XML bericht
1. Maak een bijpassende XSD
1. Maak een simpele XSLT mapping
1. Test de mapping

We openen VSCODE met het alle geinstalleerde plugins 

We gaan met de hand een xml bericht aanmaken.

Maak een: 
- nieuw XML bestand
- root persoon
- maak een element voor voornaam en achternaam
- een herhalende groep adressen
- voeg een woon en een werk adres toe


Het resultaat zou er ongeveer zo uit moeten zien
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

Een xsd genereren
<img width="685" height="472" alt="image" src="https://github.com/user-attachments/assets/eb92e2f5-7001-4e1f-81a9-f242e3c821b1" />



