# java installatie op windows


ga naar de command prompt en typ:
```cmd
Java -- version
```

==> "openjdk version "17.0.17" 2025-10-21" 


Commando om er achter te komen waar de JAVA installatie staat
```cmd
for %i in (java.exe) do @echo.   %~$PATH:i
```
==> "C:\Program Files\Eclipse Adoptium\jdk-17.0.17.10-hotspot\bin\java.exe"
