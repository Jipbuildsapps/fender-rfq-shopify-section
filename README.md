# Fender RFQ Shopify Section

Shopify Dawn section voor een Fender RFQ configurator met live technische tekening, downloads en Nederlands/Engelse interface.

## Live demo

[Open de interactieve browserpreview](https://jipbuildsapps.github.io/fender-rfq-shopify-section/)

De preview gebruikt voorbeeldvarianten. Het formulier verstuurt daar geen echte offerte; in Shopify gebruikt de section de standaard `/contact`-route.

## Bestand

- `sections/fender-tekening-maker.liquid`

## Installatie in Shopify Dawn

1. Kopieer `sections/fender-tekening-maker.liquid` naar de `sections` map van je Dawn theme.
2. Open de Shopify theme editor.
3. Voeg de section `Fender tekening maker` toe aan een product template.
4. Kies de standaardtaal in de section settings.

## In deze section

- Live technische tekening
- SVG en PNG download
- Tonen/verbergen van maatlijnen
- Automatisch DS-vooraanzicht met D-profiel, HB- en B-maatvoering
- Hover highlights voor gerelateerde lijnen en labels
- Zigzag labels wanneer gatlabels dicht bij elkaar staan
- Nederlands / English taalkeuze
- RFQ/contact via Shopify `/contact`
- Configuratielink die ingevulde data herstelt

## Preview bijwerken

Na wijzigingen aan de Liquid-section genereert `scripts/build-demo.mjs` opnieuw de zelfstandige `index.html` voor GitHub Pages.
