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
Fontawesome er et bibliotek af ikoner, som kan tilføjes til elementer via classes. Jeg bruger ikonerne på alle appens sider. De bruges som symboler, ikoner og knapper. Link: https://fontawesome.com/
#### GOOGLE FONTS
En kæmpe samling af skrifttyper. Jeg henter to forskellige fonttyper i dette projekt. Link: https://fonts.google.com/ 
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

Jeg har forsøgt at dele alt kode op i mindre moduler. Koden bliver nemmere at vedligeholde og overskue, men det giver også mulighed for nemt at genbruge den.
Ud fra den mentalitet har jeg har oprettet en hel del scss variabler og mixins for hurtigt at kunne inkludere kode blokke, men også for at bevare samme system/mønstre på tværs af alle sider. Det gør det også meget lettere at lave store globale ændringer i appen. Såsom at ændre farver, skrifttyper og afstande. 

Når det kommer til større funktioner, har jeg forsøgt at dele arbejdsopgaverne op i mindre funktioner. Hver ny funktion giver jeg et navn, som svarer til dens arbejdsopgave. Derfor bliver den samlede arbejdsopave beskrevet mere detaljeret, da den består af flere mindre funktioner. Der er dog nogen steder, hvor jeg har overgjort det, men det vil jeg forbedre i vores næste projekt.

Det samme gælder, når det kommer til funktions variabler. For at gøre koden mere læsbart og lettere at ændre, har jeg lavet en del af dem. Jeg har f.eks. omskrevet swiperen en del så alle udregninger kommer ind i variabler der forklarer, hvad udregningen bliver brugt til i funktionen. Link til swiper koden: https://github.com/rts-cmk-wu05/newsbox-RoWaBo/blob/master/src/js/swiper.js 

Jeg har tænkt over brugervenlighed i forhold til onboarding. Jeg har tilføjet ikoner og animationer for at synliggøre events og opfordre brugeren til at interagere med eksemplerne. 

---
### Vurdering af egen indsats & gennemførelse af opgaveforløbet (Arbejdsgangen)

#### Det gik godt: 
- Fået lavet et par gode korte og præcise funktioner, som var generelle nok til at blive brugt mange forskellige steder i appen.
- Har været motiveret og haft det sjovt med opgaven
- Været rimelig konsekvent i kode opstilling og formatering
- Har fået alt til at virke udemærket og udført alle ekstraopgaver på nær en.
- Planlægning gik rimelig smooth. Jeg begyndte med at konstruere al html og scss. Først derefter begyndte jeg på js, og fokuserede først på de systemer som skulle generere html dynamisk. Der var god tid til at løse opgaven, så jeg var ikke tvunget til at prioritere features til eller fra.
- Fik tilføjet mine egne features/funktioner til appen: såsom popup-box, når artikel gemmes eller slettes, notifikations tæller og omskrivning af swiperen.
 
#### Det jeg gerne vil blive bedre til:
- Gøre funktioner og navne mere generelle så de også giver mening hvis de genbruges i et andet projekt.
- Bruge eventlisteners og fjerne dem efter de ikke er relevante længere
- Håndtere asynkrone funktioner med .then og .catch. Havde gang i noget lidt rodet kode i onboarding.js med mange setTimeout funktioner.
- Lære smartere måder at tilføje html via js (jeg venter spændt på React)
- Bruge conditions som er mere alsidige og sikre. Specielt i forhold til potentielle ændringer af koden senere i udviklingen.
- Forudset problemer med systemer og bedre planlægning: Jeg kunne have undgået nogle problemer, hivs jeg havde tænkt mig bedre om, før jeg begyndte at kode.
- Når jeg skal lave onboarding en anden gang, vil jeg klart vælge et andet design som er mere gennemskueligt. Jeg testede onboarding sektionen på flere i min familie, og mange syntes det var lidt forvirrende. I fremtiden vil jeg gøre onboarding endnu mere enkelt... og kortere!
- Jeg mixer SCSS og CSS variabler, hvilke ikke er ideelt. I forbindelse med theme styring skulle jeg bruge css vars. Desværre havde jeg allerede sat hele projektet op med SCSS vars og ville ikke omskrive alt. I fremtiden vil jeg KUN bruge CSS variabler.  

---
## En beskrivelse af særlige punkter til bedømmelse

### **Swiper button icon animation and deadzone variable**
Jeg har omskrevet swiperen og tilføjet ekstra funktioner: bl.a. har jeg lavet en funktion som scalerer ikonet større eller mindre når der swipes. Bemærk også at jeg har angivet en deadzoneX, som gør swiping på en mobil mere stabil. Swiping begynder først at bevæge sig, når den overstiger deadzoneX værdien.   
```js
// SWIPER VARIABLES
swipeElmnt = e.target
viewportWidth = e.srcElement.clientWidth
startX = e.touches[0].clientX
swipeElmntX = Math.round(pixelStringToNumber())
swipeLockX = Math.round(viewportWidth * 0.3)
deadZoneX = viewportWidth * 0.06

function touchMove(e) {
    swipeElmntX = pixelStringToNumber()
    currentX = e.touches[0].clientX
    movedX = startX - currentX

	// SCALE ICONS BASED ON SWIPE
    saveIcon = e.target.previousElementSibling.children[0]
    saveIcon.style.transform = `scale(${0.4 + (swipeElmntX / 200)})`
    if (swipeElmnt.classList.contains('animate')) swipeElmnt.classList.remove('animate')
	// DEADZONE CONDITION
    if (movedX > deadZoneX) swipeElmnt.style.right = movedX + "px"
    if (swipeElmntX != 0 && movedX >= 0) swipeElmnt.style.right = movedX + "px"
}
```
### **Fetch news category**
Dynamisk funktion som kan fetche en NYT kategori. Kategorinavnet passeres som et argument.
```js
// distElmnt is the card section
function getNYTArticles(category, distElmnt, btnMode) {
    category = category.toLowerCase()
    fetchNews(`https://rss.nytimes.com/services/xml/rss/nyt/${category}.xml`)
        .then(response => addArticlesToHTML(response, distElmnt))
        .then(() => {
            if (btnMode === 'save') createSaveBtn(distElmnt)
            if (btnMode === 'delete') createDeleteBtn(distElmnt)
            // Takes one argument: The elements class name that you want to make swipable
            addSwipability('card-content__link')
        })
}
```
### **Sync with localstorage**
Meget enkel funktion, men praktisk, når man gemmer mange ting i localstorage.
```js
// Takes 2 arguments: the localstorage key name and a default value if the key doesn't exist
function syncWithLS(KeyNameLS, defaultValue) {
    const valueLS = JSON.parse(localStorage.getItem(KeyNameLS))
    const valueFinal = valueLS ? valueLS : defaultValue
    return valueFinal
}
```

### **The function that controls onboarding**
Hele funktionen tager udgangspunkt i et tal som representerer hvilke onboarding step man er på, og derefter kalder de relevante funktioner.
```js
if (!onboardingComplete) runOnboarding()
function runOnboarding() {
    const onboardingStepNum = syncWithLS("onboardingStepNum", 0)
    localStorage.setItem("onboardingStepNum", onboardingStepNum)

    if (!document.querySelector('.overlay')) createOnboardingBox()
    switch (onboardingStepNum) {
        case 0: onboardingWelcome();
            break;
        case 1: onboardingDisplayArticles();
            break;
        case 2: setTimeout(onboardingSaveArticle, 200);
            break;
        case 3: onboardingArchive();
            break;
        case 4: onboardingDisplaySavedArticles();
            break;
        case 5: onboardingDeleteArticle();
            break;
        case 6: onboardingGoToSettings();
            break;
        case 7: onboardingTurnOffCategory();
            break;
        case 8: onboardingMoveCategory();
            break;
        case 9: onboardingTheme();
            break;
        case 10: onboardingEnd();
            break;
    }
    updateBtnStatus(onboardingStepNum)
    updateDotStatus(onboardingStepNum)
} 
```
### **SCSS mixins**
I mit forsøg på at skabe moduler, benytter jeg mixin til at definere nogle generelle regler som nemt kan bruges mange forskellige steder i appen.
```css
/* Knap tekst styling */
@mixin btnLabel {
    font-family: $fSecond;
    font-weight: $fWeightLight;
    font-size: 17px;
    color: $cFontDark;
    text-transform: uppercase;
    letter-spacing: 0.15em;    
}
/* cardDefault er min mest brugte box template i projektet */
@mixin cardDefault {
    width: 100%;
    padding: 1.2rem $spaceS;
    background-color: $cBackground;
    @include borderBottom;   
}
@mixin borderBottom {
    border-bottom: solid 2px $cBorder;
}
```
### **Hand pointer animations**
Jeg bruger CSS pseudo elementer til at lave hånd animationerne i onboarding. Jeg kan nemt tilføje eller fjerne hånden med en class. 
```css
/* Selve hånden laves */
@mixin hand-pointer {
    content: "\f0a6";
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    color: $cFontDark;
    pointer-events: none;
    position: absolute;
    z-index: 20;
    transform: rotate(-20deg);    
}
/* Hånden bliver inkluderet i et pseudo element og får en animation*/
.hand-pointer-animation::after {
    @include hand-pointer;
    font-size: 2.5rem;
    left: 50%;
    top: 10%;
    animation: bounceScale 1s ease-out alternate infinite;
}
/* Animation keyframes */
@keyframes bounceScale {
    100% { transform: scale(1.3) rotate(-20deg) }
}
```
