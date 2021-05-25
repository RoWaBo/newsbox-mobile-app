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
* Uglify: Komprimerer koden ved at fjerne alle linjeskift og omskriver variabler. Bruges kun i build processen, når appen går live.
* SASS: Kompilerer scss filer, så de kan læses af browseren som en almindelig css fil. Jeg bruger SASS til at neste regler, lave variabler og mixins        

---

### Argumentation for de valg du selvstændigt har truffet under løsningen af opgaven

#### Moduler og vedligeholdelse
Jeg har forsøgt at dele alt kode op i mindre moduler. Koden bliver nemmere at vedligeholde og overskue, men det giver også mulighed for nemt at genbruge den.
Ud fra den mentalitet har jeg har oprettet en hel del scss variabler og mixins for hurtigt at kunne inkludere kode blokke, men også for at bevare samme system/mønstre på tværs af alle sider. Det gør det også meget lettere at lave store globale ændringer i appen. Såsom at ændre farver, skrifttyper og afstande. 

Når det kommer til større funktioner, har jeg forsøgt at dele arbejdsopgaverne op i mindre funktioner. Hver ny funktion giver jeg et navn, som svarer til dens arbejdsopgave. Derfor bliver den samlede arbejdsopave beskrevet mere detaljeret, da den består af flere mindre funktioner. Der er dog nogen steder, hvor jeg har overgjort det, men det vil jeg forbedre i vores næste projekt.

Det samme gælder, når det kommer til funktions variabler. For at gøre koden mere læsbart og lettere at ændre, har jeg lavet en del af dem. Jeg har f.eks. omskrevet swiperen en del så alle udregninger kommer ind i variabler der forklarer, hvad udregningen bliver brugt til i funktionen. Link til swiper koden: https://github.com/rts-cmk-wu05/newsbox-RoWaBo/blob/master/src/js/swiper.js 


(Hvilke overvejelser har du gjort dig, fx. i forbindelse med dit valg af animationer)

---
### Vurdering af egen indsats & gennemførelse af opgaveforløbet (Arbejdsgangen)

#### Det gik godt: 
- Fået lavet et par gode korte og præcise funktioner, som var generelle nok til at blive brugt mange forskellige steder i appen.
- Har været motiveret og haft det sjovt med opgaven
- Været rimelig konsekvent i kode opstilling og formatering
- Har fået alt til at virke udemærket og nået næsten alle  ekstraopgaver.
- Jeg havde rigeligt med tid til at løse opgaven, så var ikke tvunget til at prioritere features til eller fra.
- Fik tilføjet mine egne features/funktioner til appen: såsom popup-box, når artikel gemmes eller slettes og notifikations tæller.
 
#### Det jeg gerne vil blive bedre til:
- Gøre funktioner og navne mere generelle så de også giver mening hvis de genbruges i et andet projekt.
- Bruge eventlisteners og fjerne dem efter de ikke er relevante længere
- Håndtere asynkrone funktioner med .then og .catch. Havde gang i noget lidt rodet kode i onboarding.js med mange setTimeout funktioner.
- Lære smartere måder at tilføje html via js (jeg venter spændt på React)
- Bruge conditions som er mere alsidige og sikre. Specielt i forhold til potentielle ændringer af koden senere i udviklingen.
- Forudset problemer med systemer og bedre planlægning: Jeg kunne have undgået nogle problemer, hivs jeg havde tænkt mig bedre om, før jeg begyndte at kode.

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

