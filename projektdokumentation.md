# Projektdokumentation

#### Navn: Robert Watt Boolsen

##### Hold: 1146521c105 / WU05

##### Uddannelse: Webudvikler

##### Uddannelsessted: Roskilde Tekniske Skole

[Link til (min applikaton)](http://nogether.netlify.com/)


## Teknologier

-   HTML
-   CSS
-   JavaScript
-   Gulp
-   ...

---

### Redegørelse for oprindelsen af evt. tredjeparts kode anvendt i opgaveløsningen (Teknisk dokumentation)
#### SLIP.JS
Slip.js er et drag n' drop bibliotek. Biblioteket er hentet fra github og bruger ingen node-pakker.
Jeg bruger koden til at ændre rækkefølgen af kategorier på settings siden. Når brugeren holder fingeren over et bestemt ikon, løfter kategorien sig og kan flyttes rundt. Link: https://kornel.ski/slip/
#### ANIMATE.STYLE
Animate.style er en samling af færdiglavede css keyframe animationer, som giver mulighed for hurtigt og nemt at tilføje animationer til elementer via classes. Jeg bruger animationerne på side skift, visning af artikler og ikke mindst til at fade elementer ind og ud i onboarding. link: https://animate.style/
#### FONTAWESOME
Fontawesome er et bibliotek af ikoner, som kan tilføjes til elementer via classes. Jeg bruger ikonerne på alle appens sider. De bruges som symboler, ikoner og knapper.
#### GULP PAKKER
* Connect: Udgiver appen på localhost:3000, så den kan vises i en browser, når der udvikles.
* Rename: Bruges til at omdøbe html filer og mapper, så vores app får pretty url's! 
* Imagemin: Komprimerer billeder til at fylde meget lidt. Her bruger jeg det til at komprimere et placeholder billede.
* Concat: Tager alle js filer og skriver dem sammen til en fil, som får navnet app.js. 
* Sourcemaps: Da alle js filer bliver skrevet sammen, bruges sourcemap til at tracke filnavnet, som js koden oprindeligt kommer fra. Er brugbart når man får fejlbeskeder i konsollen.
* Babel: omskriver js kode til at være funktionelt i alle browsere, også i outdatede browser versioner. Gør appen tilgængelig for en bredere brugergruppe.       

---

### Argumentation for de valg du selvstændigt har truffet under løsningen af opgaven


(Hvilke overvejelser har du gjort dig, fx. i forbindelse med dit valg af animationer)

---
### Vurdering af egen indsats & gennemførelse af opgaveforløbet (Arbejdsgangen)

(Hvad gik godt. Hvor prioriterede du forkert. Klagesange fra de varme lande om halvfærdigt produkt, på grund af manglende nattesøvn, fordi din kæle-skildpadde havde tandpine er IKKE interessante.)

---
### En beskrivelse af særlige punkter til bedømmelse

(er der en særlig detalje som du synes din underviser bør lægge mærke til når dit projekt evalueres)

Du kan vise kode i markdown på følgende måder: 
```js
function myFunction() {
	
}
```

```css
.my__CSSrule {
	property: value;
}
```

