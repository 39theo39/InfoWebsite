// Haupt-UI-Logik + Daten
// Features:
// - Matching-System (Budget, Jahreszeit, Duft, Anlass, Alter, Geschlecht)
// - ~100 reale Parfums (Marke + Name) mit Platzhalterbildern
// - Trends, Favoriten (localStorage), ähnliche Düfte, Shop-Link, Duft-Test-Simulation

// einfache Navigation
const menuItems = document.querySelectorAll('.menu-item');
const sections = document.querySelectorAll('section');
const startBtn = document.getElementById('startBtn');
function show(id){
  sections.forEach(s=>s.classList.remove('active'));
  const el = document.getElementById(id);
  if(el) el.classList.add('active');
}
menuItems.forEach(m=>m.addEventListener('click', ()=> show(m.dataset.target) ));
if(startBtn) startBtn.addEventListener('click', ()=> show('fragebogen'));
document.getElementById('randomBtn')?.addEventListener('click', ()=> randomShow());

// Hilfsfunktionen
const $ = id => document.getElementById(id);
function qSel(name){ return document.querySelector(`input[name="${name}"]:checked`); }

// -------------------------
// PARFUMS DATENBANK (~100)
// -------------------------
const parfums = [
  // Format: {name, brand, gender, price, season:[], notes:[], occasion:[], age:[], img}
  {name:"Sauvage", brand:"Dior", gender:"Männlich", price:"Über 100 €", season:["Sommer","Herbst"], notes:["Frisch"], occasion:["Freizeit","Ausgehen"], age:["20–30","30–40","über 40"], img:"https://images.pexels.com/photos/12562775/pexels-photo-12562775.jpeg"},
  {name:"Bleu de Chanel", brand:"Chanel", gender:"Männlich", price:"Über 100 €", season:["Herbst","Winter","Sommer"], notes:["Frisch","Holzig"], occasion:["Arbeit","Ausgehen"], age:["20–30","30–40","über 40"], img:"https://images.pexels.com/photos/9202888/pexels-photo-9202888.jpeg"},
  {name:"Coco Mademoiselle", brand:"Chanel", gender:"Weiblich", price:"Über 100 €", season:["Frühling","Sommer"], notes:["Blumig","Süß"], occasion:["Arbeit","Besonderer Anlass"], age:["20–30","30–40","über 40"], img:"https://images.pexels.com/photos/13380129/pexels-photo-13380129.jpeg"},
  {name:"La Vie Est Belle", brand:"Lancôme", gender:"Weiblich", price:"50–100 €", season:["Frühling","Herbst"], notes:["Süß","Blumig"], occasion:["Freizeit","Besonderer Anlass"], age:["20–30","30–40"], img:},
  {name:"Light Blue", brand:"Dolce & Gabbana", gender:"Neutral", price:"50–100 €", season:["Sommer"], notes:["Frisch","Zitrus"], occasion:["Freizeit"], age:["unter 20","20–30"], img:"https://images.pexels.com/photos/13827110/pexels-photo-13827110.jpeg"},
  {name:"Black Opium", brand:"YSL", gender:"Weiblich", price:"50–100 €", season:["Herbst","Winter"], notes:["Süß","Orientalisch"], occasion:["Ausgehen"], age:["unter 20","20–30","30–40"], img:"https://images.pexels.com/photos/30488680/pexels-photo-30488680.jpeg"},
  {name:"Good Girl", brand:"Carolina Herrera", gender:"Weiblich", price:"Über 100 €", season:["Herbst","Winter"], notes:["Orientalisch","Süß"], occasion:["Ausgehen","Besonderer Anlass"], age:["20–30","30–40"], img:},
  {name:"Oud Wood", brand:"Tom Ford", gender:"Neutral", price:"Über 100 €", season:["Winter","Herbst"], notes:["Holzig","Orientalisch"], occasion:["Besonderer Anlass"], age:["30–40","über 40"], img:},
  {name:"Flowerbomb", brand:"Viktor & Rolf", gender:"Weiblich", price:"Über 100 €", season:["Frühling","Herbst"], notes:["Blumig"], occasion:["Besonderer Anlass","Ausgehen"], age:["20–30","30–40"], img:)},
  {name:"Bloom", brand:"Gucci", gender:"Weiblich", price:"Über 100 €", season:["Frühling","Sommer"], notes:["Blumig"], occasion:["Freizeit","Arbeit"], age:["20–30","30–40"], img:},
  // --- weitere bekannte Parfums ergänzen bis ~100 Einträge ---
  {name:"Acqua di Gio", brand:"Giorgio Armani", gender:"Männlich", price:"50–100 €", season:["Sommer"], notes:["Frisch"], occasion:["Freizeit","Arbeit"], age:["20–30","30–40"], img:ph("Acqua di Gio")},
  {name:"J'adore", brand:"Dior", gender:"Weiblich", price:"Über 100 €", season:["Frühling"], notes:["Blumig"], occasion:["Besonderer Anlass"], age:["30–40","über 40"], img:ph("J'adore")},
  {name:"1 Million", brand:"Paco Rabanne", gender:"Männlich", price:"50–100 €", season:["Herbst","Winter"], notes:["Orientalisch"], occasion:["Ausgehen"], age:["20–30"], img:ph("1 Million")},
  {name:"Invictus", brand:"Paco Rabanne", gender:"Männlich", price:"50–100 €", season:["Sommer"], notes:["Frisch"], occasion:["Freizeit","Ausgehen"], age:["20–30"], img:ph("Invictus")},
  {name:"Si", brand:"Giorgio Armani", gender:"Weiblich", price:"Über 100 €", season:["Herbst"], notes:["Süß"], occasion:["Arbeit","Besonderer Anlass"], age:["30–40","über 40"], img:ph("Si")},
  {name:"Nº5", brand:"Chanel", gender:"Weiblich", price:"Über 100 €", season:["Herbst","Winter"], notes:["Blumig","Aldehydisch"], occasion:["Besonderer Anlass"], age:["über 40"], img:ph("Chanel No5")},
  {name:"My Way", brand:"Giorgio Armani", gender:"Weiblich", price:"50–100 €", season:["Frühling"], notes:["Blumig"], occasion:["Freizeit","Arbeit"], age:["20–30","30–40"], img:ph("My Way")},
  {name:"Nuit d'Issey", brand:"Issey Miyake", gender:"Männlich", price:"50–100 €", season:["Herbst","Winter"], notes:["Holzig","Orientalisch"], occasion:["Ausgehen","Besonderer Anlass"], age:["30–40","über 40"], img:ph("Nuit d'Issey")},
  {name:"Le Male", brand:"Jean Paul Gaultier", gender:"Männlich", price:"50–100 €", season:["Winter"], notes:["Orientalisch"], occasion:["Ausgehen"], age:["20–30","30–40"], img:ph("Le Male")},
  {name:"Libre", brand:"YSL", gender:"Weiblich", price:"50–100 €", season:["Frühling","Herbst"], notes:["Frisch","Blumig"], occasion:["Arbeit","Ausgehen"], age:["20–30","30–40"], img:ph("Libre")},
  {name:"Angel", brand:"Thierry Mugler", gender:"Weiblich", price:"Über 100 €", season:["Winter"], notes:["Süß","Orientalisch"], occasion:["Ausgehen"], age:["20–30","30–40"], img:ph("Angel")},
  {name:"Euphoria", brand:"Calvin Klein", gender:"Weiblich", price:"50–100 €", season:["Herbst"], notes:["Orientalisch"], occasion:["Ausgehen"], age:["20–30","30–40"], img:ph("Euphoria")},
  {name:"Obsession", brand:"Calvin Klein", gender:"Männlich", price:"50–100 €", season:["Winter"], notes:["Orientalisch"], occasion:["Ausgehen"], age:["30–40","über 40"], img:ph("Obsession")},
  {name:"Boss Bottled", brand:"Hugo Boss", gender:"Männlich", price:"50–100 €", season:["Herbst","Frühling"], notes:["Holzig"], occasion:["Arbeit"], age:["30–40","über 40"], img:ph("Boss Bottled")},
  {name:"Eau Sauvage", brand:"Dior", gender:"Männlich", price:"Über 100 €", season:["Sommer"], notes:["Frisch","Zitrus"], occasion:["Arbeit","Freizeit"], age:["30–40","über 40"], img:ph("Eau Sauvage")},
  {name:"La Nuit Tresor", brand:"Lancôme", gender:"Weiblich", price:"Über 100 €", season:["Herbst","Winter"], notes:["Süß","Orientalisch"], occasion:["Ausgehen"], age:["20–30","30–40"], img:ph("La Nuit Tresor")},
  {name:"Coach Floral", brand:"Coach", gender:"Weiblich", price:"Unter 50 €", season:["Frühling"], notes:["Blumig"], occasion:["Freizeit"], age:["unter 20","20–30"], img:ph("Coach Floral")},
  {name:"Narciso Rodriguez For Her", brand:"Narciso Rodriguez", gender:"Weiblich", price:"50–100 €", season:["Herbst"], notes:["Holzig","Moschus"], occasion:["Arbeit","Besonderer Anlass"], age:["30–40","über 40"], img:ph("Narciso Rodriguez")},
  {name:"Pleasures", brand:"Estée Lauder", gender:"Weiblich", price:"50–100 €", season:["Frühling"], notes:["Blumig"], occasion:["Arbeit","Freizeit"], age:["20–30","30–40"], img:ph("Pleasures")},
  {name:"Boss The Scent", brand:"Hugo Boss", gender:"Männlich", price:"50–100 €", season:["Herbst"], notes:["Orientalisch","Holzig"], occasion:["Ausgehen"], age:["20–30","30–40"], img:ph("Boss The Scent")},
  {name:"Pure XS", brand:"Paco Rabanne", gender:"Männlich", price:"50–100 €", season:["Winter"], notes:["Orientalisch"], occasion:["Ausgehen"], age:["20–30"], img:ph("Pure XS")},
  {name:"Because It's You", brand:"Emporio Armani", gender:"Weiblich", price:"50–100 €", season:["Frühling"], notes:["Süß","Zitrus"], occasion:["Freizeit","Ausgehen"], age:["20–30"], img:ph("Because It's You")},
  {name:"Eros", brand:"Versace", gender:"Männlich", price:"50–100 €", season:["Sommer"], notes:["Frisch","Zitrus"], occasion:["Ausgehen"], age:["20–30"], img:ph("Eros")},
  {name:"Si Fiori", brand:"Giorgio Armani", gender:"Weiblich", price:"Über 100 €", season:["Frühling"], notes:["Blumig"], occasion:["Besonderer Anlass"], age:["30–40","über 40"], img:ph("Si Fiori")},
  {name:"Alien", brand:"Thierry Mugler", gender:"Weiblich", price:"Über 100 €", season:["Herbst","Winter"], notes:["Orientalisch"], occasion:["Ausgehen"], age:["30–40","über 40"], img:ph("Alien")},
  {name:"Daisy Eau So Fresh", brand:"Marc Jacobs", gender:"Weiblich", price:"Unter 50 €", season:["Frühling","Sommer"], notes:["Blumig","Frisch"], occasion:["Freizeit"], age:["unter 20","20–30"], img:ph("Daisy Eau So Fresh")},
  {name:"Tommy Girl", brand:"Tommy Hilfiger", gender:"Weiblich", price:"Unter 50 €", season:["Sommer"], notes:["Frisch"], occasion:["Freizeit"], age:["unter 20","20–30"], img:ph("Tommy Girl")},
  {name:"CK One", brand:"Calvin Klein", gender:"Neutral", price:"Unter 50 €", season:["Sommer"], notes:["Frisch","Zitrus"], occasion:["Freizeit","Arbeit"], age:["unter 20","20–30"], img:ph("CK One")},
  {name:"L'Interdit", brand:"Givenchy", gender:"Weiblich", price:"50–100 €", season:["Herbst"], notes:["Blumig","Orientalisch"], occasion:["Arbeit","Besonderer Anlass"], age:["30–40","über 40"], img:ph("L'Interdit")},
  {name:"Spicebomb", brand:"Viktor & Rolf", gender:"Männlich", price:"50–100 €", season:["Winter"], notes:["Würzig"], occasion:["Ausgehen"], age:["20–30","30–40"], img:ph("Spicebomb")},
  {name:"Man", brand:"Bvlgari", gender:"Männlich", price:"50–100 €", season:["Herbst"], notes:["Holzig"], occasion:["Arbeit"], age:["30–40","über 40"], img:ph("Bvlgari Man")},
  {name:"Ombré Leather", brand:"Tom Ford", gender:"Neutral", price:"Über 100 €", season:["Herbst","Winter"], notes:["Ledrig","Holzig"], occasion:["Ausgehen"], age:["30–40","über 40"], img:ph("Ombré Leather")},
  {name:"Si Passione", brand:"Giorgio Armani", gender:"Weiblich", price:"Über 100 €", season:["Herbst"], notes:["Süß","Blumig"], occasion:["Ausgehen"], age:["20–30","30–40"], img:ph("Si Passione")},
  {name:"Aqua Allegoria Pamplelune", brand:"Guerlain", gender:"Neutral", price:"50–100 €", season:["Sommer"], notes:["Zitrus"], occasion:["Freizeit"], age:["20–30","30–40"], img:ph("Aqua Allegoria")},
  {name:"Coach For Men", brand:"Coach", gender:"Männlich", price:"Unter 50 €", season:["Frühling"], notes:["Frisch"], occasion:["Freizeit"], age:["20–30"], img:ph("Coach For Men")},
  {name:"Baccarat Rouge 540", brand:"Maison Francis Kurkdjian", gender:"Neutral", price:"Über 100 €", season:["Herbst","Winter"], notes:["Ambroxan","Süß"], occasion:["Besonderer Anlass"], age:["30–40","über 40"], img:ph("Baccarat Rouge 540")},
  {name:"Si Intense", brand:"Giorgio Armani", gender:"Weiblich", price:"Über 100 €", season:["Herbst"], notes:["Süß","Orientalisch"], occasion:["Ausgehen"], age:["30–40","über 40"], img:ph("Si Intense")},
  {name:"L'Homme", brand:"YSL", gender:"Männlich", price:"50–100 €", season:["Frühling","Herbst"], notes:["Holzig"], occasion:["Arbeit"], age:["30–40","über 40"], img:ph("L'Homme")},
  {name:"Olympea", brand:"Paco Rabanne", gender:"Weiblich", price:"50–100 €", season:["Sommer"], notes:["Süß","Salzig"], occasion:["Ausgehen"], age:["20–30"], img:ph("Olympea")},
  {name:"Versense", brand:"Versace", gender:"Weiblich", price:"50–100 €", season:["Sommer"], notes:["Frisch"], occasion:["Freizeit"], age:["20–30"], img:ph("Versense")},
  {name:"Neroli Portofino", brand:"Tom Ford", gender:"Neutral", price:"Über 100 €", season:["Sommer"], notes:["Zitrus"], occasion:["Freizeit"], age:["30–40","über 40"], img:ph("Neroli Portofino")},
  {name:"Intenso", brand:"Davidoff", gender:"Männlich", price:"50–100 €", season:["Herbst"], notes:["Holzig"], occasion:["Arbeit","Freizeit"], age:["30–40"], img:ph("Intenso")},
  {name:"My Burberry", brand:"Burberry", gender:"Weiblich", price:"50–100 €", season:["Frühling"], notes:["Blumig"], occasion:["Arbeit"], age:["30–40","über 40"], img:ph("My Burberry")},
  {name:"Pure Poison", brand:"Dior", gender:"Weiblich", price:"50–100 €", season:["Frühling"], notes:["Blumig"], occasion:["Ausgehen"], age:["20–30","30–40"], img:ph("Pure Poison")},
  {name:"Habit Rouge", brand:"Guerlain", gender:"Männlich", price:"Über 100 €", season:["Herbst","Winter"], notes:["Orientalisch"], occasion:["Besonderer Anlass"], age:["über 40"], img:ph("Habit Rouge")},
  {name:"Eros Pour Femme", brand:"Versace", gender:"Weiblich", price:"50–100 €", season:["Sommer"], notes:["Frisch","Süß"], occasion:["Ausgehen"], age:["20–30"], img:ph("Eros Pour Femme")},
  {name:"La Panthere", brand:"Cartier", gender:"Weiblich", price:"Über 100 €", season:["Frühling","Herbst"], notes:["Blumig","Moschus"], occasion:["Besonderer Anlass"], age:["30–40","über 40"], img:ph("La Panthere")},
  {name:"L'Eau d'Issey", brand:"Issey Miyake", gender:"Weiblich", price:"50–100 €", season:["Sommer"], notes:["Frisch"], occasion:["Freizeit","Arbeit"], age:["20–30","30–40"], img:ph("L'Eau d'Issey")},
  {name:"Intense Cafe", brand:"Montale", gender:"Weiblich", price:"Über 100 €", season:["Winter"], notes:["Süß","Orientalisch"], occasion:["Ausgehen"], age:["30–40"], img:ph("Intense Cafe")},
  {name:"The One", brand:"Dolce & Gabbana", gender:"Weiblich", price:"50–100 €", season:["Herbst"], notes:["Blumig","Orientalisch"], occasion:["Ausgehen"], age:["30–40"], img:ph("The One")},
  {name:"The One for Men", brand:"Dolce & Gabbana", gender:"Männlich", price:"50–100 €", season:["Herbst"], notes:["Holzig","Würzig"], occasion:["Arbeit","Ausgehen"], age:["30–40"], img:ph("The One for Men")},
  {name:"L'Homme Ideal", brand:"Guerlain", gender:"Männlich", price:"50–100 €", season:["Frühling"], notes:["Holzig","Süß"], occasion:["Ausgehen"], age:["20–30","30–40"], img:ph("L'Homme Ideal")},
  {name:"Daisy", brand:"Marc Jacobs", gender:"Weiblich", price:"Unter 50 €", season:["Frühling"], notes:["Blumig"], occasion:["Freizeit","Schule"], age:["unter 20","20–30"], img:ph("Daisy Marc Jacobs")},
  {name:"Les Exclusifs", brand:"Chanel", gender:"Neutral", price:"Über 100 €", season:["Herbst"], notes:["Luxus"], occasion:["Besonderer Anlass"], age:["über 40"], img:ph("Chanel Exclusifs")},
  {name:"Signature", brand:"Giorgio Armani", gender:"Weiblich", price:"50–100 €", season:["Frühling"], notes:["Blumig"], occasion:["Arbeit"], age:["30–40"], img:ph("Signature")},
  {name:"For Her", brand:"Narciso Rodriguez", gender:"Weiblich", price:"50–100 €", season:["Herbst"], notes:["Moschus","Holzig"], occasion:["Besonderer Anlass"], age:["30–40","über 40"], img:ph("For Her")},
  {name:"Eternity", brand:"Calvin Klein", gender:"Weiblich", price:"Unter 50 €", season:["Frühling"], notes:["Blumig"], occasion:["Arbeit","Freizeit"], age:["20–30","30–40"], img:ph("Eternity")},
  {name:"Habit Rouge Eau de Parfum", brand:"Guerlain", gender:"Männlich", price:"Über 100 €", season:["Winter"], notes:["Orientalisch","Holzig"], occasion:["Besonderer Anlass"], age:["über 40"], img:ph("Habit Rouge EDP")},
  {name:"L'eau D'Issey Pour Homme", brand:"Issey Miyake", gender:"Männlich", price:"50–100 €", season:["Sommer"], notes:["Frisch","Aquatisch"], occasion:["Freizeit"], age:["20–30","30–40"], img:ph("Issey Pour Homme")},
  {name:"Amber Oud", brand:"Versace", gender:"Neutral", price:"Über 100 €", season:["Winter"], notes:["Oud","Orientalisch"], occasion:["Besonderer Anlass"], age:["30–40","über 40"], img:ph("Amber Oud")},
  {name:"My Way Intense", brand:"Giorgio Armani", gender:"Weiblich", price:"Über 100 €", season:["Herbst"], notes:["Blumig","Süß"], occasion:["Ausgehen"], age:["30–40","über 40"], img:ph("My Way Intense")},
  {name:"Chance Eau Tendre", brand:"Chanel", gender:"Weiblich", price:"50–100 €", season:["Frühling"], notes:["Blumig","Frisch"], occasion:["Freizeit"], age:["20–30","30–40"], img:ph("Chance Eau Tendre")},
  {name:"Habit Rouge Extreme", brand:"Guerlain", gender:"Männlich", price:"Über 100 €", season:["Winter"], notes:["Würzig","Orientalisch"], occasion:["Ausgehen"], age:["über 40"], img:ph("Habit Rouge Extreme")},
  {name:"Pure XS For Her", brand:"Paco Rabanne", gender:"Weiblich", price:"50–100 €", season:["Winter"], notes:["Süß","Orientalisch"], occasion:["Ausgehen"], age:["20–30"], img:ph("Pure XS For Her")},
  {name:"Aventus", brand:"Creed", gender:"Männlich", price:"Über 100 €", season:["Frühling","Sommer"], notes:["Fruchtig","Holzig"], occasion:["Besonderer Anlass"], age:["30–40","über 40"], img:ph("Aventus")},
  {name:"Happy", brand:"Clinique", gender:"Weiblich", price:"Unter 50 €", season:["Frühling","Sommer"], notes:["Zitrus","Frisch"], occasion:["Freizeit"], age:["unter 20","20–30"], img:ph("Happy")},
  {name:"Si Intense Eau de Parfum", brand:"Giorgio Armani", gender:"Weiblich", price:"Über 100 €", season:["Herbst"], notes:["Süß"], occasion:["Ausgehen"], age:["30–40","über 40"], img:ph("Si Intense EDP")},
  {name:"Eau de Cartier", brand:"Cartier", gender:"Neutral", price:"50–100 €", season:["Frühling","Sommer"], notes:["Frisch","Zitrus"], occasion:["Freizeit","Arbeit"], age:["20–30","30–40"], img:ph("Eau de Cartier")},
  {name:"Aventus for Her", brand:"Creed", gender:"Weiblich", price:"Über 100 €", season:["Frühling"], notes:["Fruchtig","Blumig"], occasion:["Besonderer Anlass"], age:["30–40","über 40"], img:ph("Aventus for Her")},
  {name:"L'Eau d'Issey Pure", brand:"Issey Miyake", gender:"Weiblich", price:"50–100 €", season:["Sommer"], notes:["Frisch"], occasion:["Freizeit"], age:["20–30","30–40"], img:ph("L'Eau d'Issey Pure")},
  {name:"La Nuit de L'Homme", brand:"YSL", gender:"Männlich", price:"50–100 €", season:["Herbst","Winter"], notes:["Würzig","Holzig"], occasion:["Ausgehen"], age:["20–30","30–40"], img:ph("La Nuit de L'Homme")},
  {name:"Pure XS Night", brand:"Paco Rabanne", gender:"Männlich", price:"50–100 €", season:["Winter"], notes:["Würzig"], occasion:["Ausgehen"], age:["20–30"], img:ph("Pure XS Night")},
  {name:"L'Icon", brand:"Yves Saint Laurent", gender:"Weiblich", price:"50–100 €", season:["Herbst"], notes:["Blumig"], occasion:["Besonderer Anlass"], age:["30–40","über 40"], img:ph("YSL L'Icon")},
  {name:"Velvet Orchid", brand:"Tom Ford", gender:"Weiblich", price:"Über 100 €", season:["Winter"], notes:["Orientalisch","Blumig"], occasion:["Ausgehen"], age:["30–40","über 40"], img:ph("Velvet Orchid")},
  {name:"Coach Dreams", brand:"Coach", gender:"Weiblich", price:"Unter 50 €", season:["Frühling"], notes:["Blumig"], occasion:["Freizeit"], age:["unter 20","20–30"], img:ph("Coach Dreams")},
  {name:"Sì Rose Signature", brand:"Giorgio Armani", gender:"Weiblich", price:"Über 100 €", season:["Frühling"], notes:["Blumig"], occasion:["Besonderer Anlass"], age:["30–40","über 40"], img:ph("Si Rose")},
  {name:"Intense Café", brand:"Montale", gender:"Weiblich", price:"Über 100 €", season:["Winter"], notes:["Kaffee","Süß"], occasion:["Freizeit"], age:["30–40"], img:ph("Intense Cafe Montale")},
  {name:"L'Homme Prada", brand:"Prada", gender:"Männlich", price:"50–100 €", season:["Frühling","Herbst"], notes:["Holzig"], occasion:["Arbeit"], age:["30–40","über 40"], img:ph("L'Homme Prada")},
  {name:"Candy", brand:"Prada", gender:"Weiblich", price:"50–100 €", season:["Herbst"], notes:["Süß"], occasion:["Ausgehen"], age:["20–30"], img:ph("Prada Candy")},
  {name:"Hypnotic Poison", brand:"Dior", gender:"Weiblich", price:"50–100 €", season:["Winter"], notes:["Orientalisch"], occasion:["Ausgehen"], age:["20–30","30–40"], img:ph("Hypnotic Poison")},
  {name:"Pour Homme", brand:"Guerlain", gender:"Männlich", price:"Über 100 €", season:["Herbst"], notes:["Holzig"], occasion:["Besonderer Anlass"], age:["über 40"], img:ph("Pour Homme Guerlain")},
  {name:"Fame", brand:"Rihanna", gender:"Weiblich", price:"Unter 50 €", season:["Sommer"], notes:["Süß"], occasion:["Ausgehen"], age:["unter 20","20–30"], img:ph("Rihanna Fame")},
  {name:"Not A Perfume", brand:"Juliette Has A Gun", gender:"Neutral", price:"50–100 €", season:["Ganzjährig"], notes:["Moschus"], occasion:["Arbeit","Freizeit"], age:["20–30","30–40"], img:ph("Not A Perfume")},
  {name:"Her", brand:"Burberry", gender:"Weiblich", price:"50–100 €", season:["Frühling"], notes:["Blumig"], occasion:["Freizeit"], age:["20–30","30–40"], img:ph("Her Burberry")},
  {name:"Guilty", brand:"Gucci", gender:"Männlich", price:"50–100 €", season:["Herbst"], notes:["Holzig"], occasion:["Ausgehen"], age:["20–30","30–40"], img:ph("Guilty Gucci")},
  {name:"The Scent For Her", brand:"Hugo Boss", gender:"Weiblich", price:"50–100 €", season:["Herbst"], notes:["Fruchtig","Blumig"], occasion:["Ausgehen"], age:["20–30","30–40"], img:ph("The Scent For Her")}
];

// Helper: Placeholder image builder (kann später durch echte URLs ersetzt werden)
function ph(name){
  // encode name for a simple placeholder service
  return `https://via.placeholder.com/400x400.png?text=${encodeURIComponent(name)}`;
}

// -------------------------
// INITIAL UI: Trends & Favoriten laden
// -------------------------
const trendGrid = document.getElementById('trendGrid');
const favGrid = document.getElementById('favGrid');
const similarList = document.getElementById('similarList');

function renderTrends(){
  // Top 9 anzeigen (einfach die ersten Einträge)
  trendGrid.innerHTML = parfums.slice(0,9).map(p => `
    <div class="card" data-name="${p.name}" data-brand="${p.brand}">
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.brand} – ${p.name}</h3>
      <p>${p.price}</p>
    </div>
  `).join('');
  // click on trend item => show details
  document.querySelectorAll('#trendGrid .card').forEach(c=>{
    c.addEventListener('click', ()=> {
      const name = c.dataset.name;
      const brand = c.dataset.brand;
      const parf = parfums.find(x=>x.name===name && x.brand===brand);
      if(parf) showParfum(parf);
    });
  });
}

// Favoriten: localStorage
function loadFavs(){
  const favs = JSON.parse(localStorage.getItem('pf_favs') || '[]');
  favGrid.innerHTML = favs.map(id=>{
    const p = parfums.find(x => id === uid(x));
    if(!p) return '';
    return `
      <div class="card" data-uid="${uid(p)}">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.brand} – ${p.name}</h3>
        <p>${p.price}</p>
        <div style="padding:10px;">
          <button class="btn small" data-uid="${uid(p)}">Anzeigen</button>
          <button class="btn ghost small" data-remove="${uid(p)}">Entfernen</button>
        </div>
      </div>
    `;
  }).join('');
  // events
  favGrid.querySelectorAll('button[data-uid]').forEach(b=>{
    b.addEventListener('click', ()=> {
      const u = b.dataset.uid;
      const p = parfums.find(x => uid(x) === u);
      if(p) showParfum(p);
    });
  });
  favGrid.querySelectorAll('button[data-remove]').forEach(b=>{
    b.addEventListener('click', ()=> {
      const u = b.dataset.remove;
      let favs = JSON.parse(localStorage.getItem('pf_favs') || '[]');
      favs = favs.filter(x=>x!==u);
      localStorage.setItem('pf_favs', JSON.stringify(favs));
      loadFavs();
    });
  });
}

// uid helper
function uid(p){ return `${p.brand}::${p.name}`; }

// -------------------------
// SUCH/EMPFEHLUNG
// -------------------------
document.getElementById('searchBtn').addEventListener('click', empfehlung);
document.getElementById('randomBtn')?.addEventListener('click', randomShow);
document.getElementById('simulateBtn')?.addEventListener('click', startSimulation);

function getFilters(){
  const form = new FormData(document.getElementById('duftForm'));
  return {
    budget: form.get('budget'),
    season: form.get('season'),
    duft: form.get('duft'),
    occasion: form.get('occasion'),
    age: form.get('age'),
    gender: form.get('geschlecht')
  };
}

function empfehlung(){
  const f = getFilters();
  // Filter: relaxierte Übereinstimmung (nicht alle Kriterien zwingend)
  let results = parfums.filter(p=>{
    // budget must match
    if(p.price !== f.budget) return false;
    // season
    if(!p.season.includes(f.season)) return false;
    // notes: accept if includes or similar mapping
    if(!p.notes.includes(f.duft) && !noteSimilar(p.notes, f.duft)) return false;
    // occasion
    if(!p.occasion.includes(f.occasion)) return false;
    // age
    if(!p.age.includes(f.age)) return false;
    // gender or neutral
    if(!(p.gender === f.gender || p.gender === "Neutral")) return false;
    return true;
  });

  // Falls keine exakte Übereinstimmung, lockern wir Bedingungen nacheinander
  if(results.length === 0){
    results = parfums.filter(p => p.price === f.budget && p.season.includes(f.season));
  }
  if(results.length === 0){
    results = parfums.filter(p => p.season.includes(f.season));
  }
  if(results.length === 0){
    results = [...parfums];
  }

  // Zufällige Auswahl aus Ergebnissen
  const parfum = results[Math.floor(Math.random() * results.length)];
  showParfum(parfum, f);
}

// show parfum details in Ergebnis section
function showParfum(parfum, filters = null){
  show('ergebnis');
  $('resultName').innerText = `${parfum.brand} – ${parfum.name}`;
  $('resultDesc').innerText = filters ? `Perfekt für ${filters.occasion}, ${filters.season} | Duft: ${filters.duft}` : `${parfum.notes.join(', ')} · ${parfum.price}`;
  $('resultImg').src = parfum.img;
  // shop link (Google search)
  $('shopLink').href = `https://www.google.com/search?q=${encodeURIComponent(parfum.brand + ' ' + parfum.name + ' kaufen')}`;
  // favorite button
  const favBtn = $('favBtn');
  favBtn.innerText = isFav(parfum) ? '❤ Entfernen' : '❤ Favorit';
  favBtn.onclick = ()=> toggleFav(parfum);
  // similar button
  $('similarBtn').onclick = ()=> showSimilar(parfum);
  // clear similar list
  similarList.innerHTML = '';
}

// quick random show
function randomShow(){
  const p = parfums[Math.floor(Math.random() * parfums.length)];
  showParfum(p);
}

// note similarity helper (simple map)
function noteSimilar(notesArr, desired){
  // map synonyms
  const map = {
    "Frisch":["Frisch","Zitrus","Aquatisch"],
    "Süß":["Süß","Gourmand","Vanille"],
    "Holzig":["Holzig","Ledrig","Oud"],
    "Blumig":["Blumig","Floral"],
    "Orientalisch":["Orientalisch","Würzig","Amber"]
  };
  return (map[desired] || []).some(s => notesArr.includes(s) || notesArr.includes(desired));
}

// -------------------------
// ÄHNLICHE DÜFTE
// -------------------------
function showSimilar(parfum){
  // find parfums that share at least one note and are different brand/name
  const sims = parfums.filter(p => p.brand !== parfum.brand || p.name !== parfum.name)
    .map(p => {
      const common = p.notes.filter(n => parfum.notes.includes(n));
      return {p, score: common.length};
    })
    .filter(x => x.score > 0)
    .sort((a,b) => b.score - a.score)
    .slice(0,6)
    .map(x => x.p);

  if(sims.length === 0){
    similarList.innerHTML = '<p>Keine ähnlichen Düfte gefunden.</p>';
    return;
  }
  similarList.innerHTML = sims.map(p=>`
    <div class="card" data-uid="${uid(p)}">
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.brand} – ${p.name}</h3>
      <p>${p.notes.join(', ')}</p>
    </div>
  `).join('');
  // click to open
  similarList.querySelectorAll('.card').forEach(c=>{
    c.addEventListener('click', ()=> {
      const u = c.dataset.uid;
      const parf = parfums.find(x => uid(x) === u);
      if(parf) showParfum(parf);
    });
  });
}

// -------------------------
// FAVORITEN (localStorage)
// -------------------------
function isFav(p){ const favs = JSON.parse(localStorage.getItem('pf_favs')||'[]'); return favs.includes(uid(p)); }
function toggleFav(p){
  let favs = JSON.parse(localStorage.getItem('pf_favs')||'[]');
  const id = uid(p);
  if(favs.includes(id)){
    favs = favs.filter(x=>x!==id);
  } else {
    favs.push(id);
  }
  localStorage.setItem('pf_favs', JSON.stringify(favs));
  // update UI
  loadFavs();
  // update favBtn label
  $('favBtn').innerText = favs.includes(id) ? '❤ Entfernen' : '❤ Favorit';
}



function startSimulation(){
  // Erzeuge eine kleine Liste anhand der aktuellen Filter
  const f = getFilters();
  simList = parfums.filter(p => p.season.includes(f.season)).slice(0,6);
  if(simList.length === 0) simList = parfums.slice(0,6);
  simIndex = 0;
  simText.innerText = `Note 1: ${simList[simIndex].notes[0] || 'Frisch'}`;
  simModal.classList.remove('hidden');
  simNext.onclick = ()=> {
    simIndex++;
    if(simIndex >= simList.length) {
      simText.innerText = `Das Duft-Test ist beendet. Wir empfehlen: ${simList[Math.floor(Math.random()*simList.length)].brand}`;
      simNext.innerText = 'Neu starten';
      simNext.onclick = ()=> startSimulation();
    } else {
      simText.innerText = `Note ${simIndex+1}: ${simList[simIndex].notes[0] || 'Holzig'}`;
    }
  };
  simClose.onclick = ()=> simModal.classList.add('hidden');
}

// -------------------------
// Initialisierung
// -------------------------
renderTrends();
loadFavs();
if(location.hash){
  const id = location.hash.replace('#','');
  if(id) show(id);
}

// -------------------------
// Hilfs-Utilities (Accessibility / small helpers)
// -------------------------
document.addEventListener('keydown', (e)=> {
  if(e.key === 'Escape') simModal.classList.add('hidden');
});

// Ende

