class Konyv {
    constructor(id, cim, dij, kep, kivett) {

        //kötelező
        this.id = id;
        this.cim = cim;
        this.dij = dij;

        //magam adtam hozzá
        //csak egy szamot kell megadni (5,6) fedőképnek mert úgy van elnevezve a kép
        this.kep = kep;
        this.kivett = kivett;
    }
}

// tömb tárolja a könyveket, index = id
const konyvtarolo = [];

function addBook() {
    //bekéri az adatokat
    const cim = prompt("Cím:");
    const dij = prompt("Dij (Forint):");
    const kep = prompt("Fedő kép: ");

    //id-t ad neki, mivel 0 hosszuságu akkor 0 az elso id, utana 1 és tovább
    const id = konyvtarolo.length;

    //példányositás
    const konyv = new Konyv(id, cim, dij, kep, false);

    konyvtarolo.push(konyv)

    //kilistázza a kártyákat
    MutatKartya();

}

function MutatKartya() {

    //containerek ahova irni kell
    const admincont = document.getElementById("admincont");
    const konyvtar = document.getElementById("konyvtar");
    const kolcson = document.getElementById("kolcsonzottkonyvek");


    //elöző tartalmat kitörli
    admincont.innerHTML = "";
    konyvtar.innerHTML = "";
    kolcson.innerHTML = "";

    //mindengyik könyvön haladjön végig és adja hozzá a megfelelő containerhez
    konyvtarolo.forEach(e => {
        var admindiv = document.createElement("div");

        admindiv.className = "col-md-6 col-lg-3 d-flex justify-content-center";
        admindiv.id = e.id;
        admindiv.innerHTML =
            `
                <div class="card my-3" style="width: 14rem;">
                    <img src="./img/${e.kep}.png" class="card-img-top" alt="konyv">
                    <div class="card-body">
                        <h5 class="card-title">${e.cim}</h5>
                        <button onclick="Torol(${e.id})" class="btn btn-danger">Törlés</button>
                    </div>
                </div>
            `
        //ha nincs kivéve a könyv adja hozzá a választékhoz
        if (!e.kivett) {

            var konyvdiv = document.createElement("div");
            konyvdiv.className = "col-md-6 col-lg-3 d-flex justify-content-center";
            konyvdiv.id = e.id + "konyv";
            konyvdiv.innerHTML =
                `
                <div class="card my-3" style="width: 14rem;">
                    <img src="./img/${e.kep}.png" class="card-img-top" alt="konyv">
                    <div class="card-body">
                        <h5 class="card-title">${e.cim}</h5>
                        <button onclick="Kolcson(${"\'" + e.id + "konyv" + "\'"})" class="btn btn-danger">Kiveszem</button>
                    </div>
                </div>
            `
            //DOM-ba beszurja a kártyát a könyvnek a tulajdonságaival
            konyvtar.appendChild(konyvdiv);
        }

        //ha ki van véve adja hozzá a ki kölcsonzötthöz
        if (e.kivett) {
            var kolcsondiv = document.createElement("div");

            kolcsondiv.className = "col-md-6 col-lg-3 d-flex justify-content-center";
            kolcsondiv.id = e.id + "konyv";
            kolcsondiv.innerHTML =
                `
                <div class="card my-3" style="width: 14rem;">
                    <img src="./img/${e.kep}.png" class="card-img-top" alt="konyv">
                    <div class="card-body">
                        <h5 class="card-title">${e.cim}</h5>
                        <button onclick="Kolcson(${"\'" + e.id + "konyv" + "\'"})" class="btn btn-danger">Visszaadom</button>
                    </div>
                </div>
            `

            kolcson.appendChild(kolcsondiv)

        }
        Dij();

        admincont.appendChild(admindiv);

    });

}

//DOM-ba beszurja a kártyát a kölcsönzött könyvek díját
function Dij() {
    //összesitett díj (kotelezo)
    var osszdij = 0;
    var van = false;
    konyvtarolo.forEach(e => {
        if (e.kivett) {
            osszdij += parseInt(e.dij);
            van = true;
        }
    });

    if (van) {
        document.getElementById("kdij").innerHTML = "A kölcsönzött könyvek díja:" + " " + osszdij + " Ft";
    } else {
        document.getElementById("kdij").innerHTML = "";
    }
}

function Torol(id) {

    //kitörli az adott könyvet
    document.getElementById(id).remove();
    document.getElementById(id + "konyv").remove();

    konyvtarolo.splice(id, 1);

    //splice felülirja az indexet de a könyv példánynak nem, ott is átkell írni
    for (let i = 0; i < konyvtarolo.length; i++) {
        konyvtarolo[i].id = i;
    }
    MutatKartya();
}

function Kolcson(id) {

    //törli a választékból
    const torolni = document.getElementById(id);
    torolni.remove();

    //beállitja azt hogy ki van véve/vissza lett adva és frissiti a könyveket 
    const numericId = parseInt(id);
    const e = konyvtarolo[numericId];
    e.kivett = !e.kivett;
    MutatKartya();
}