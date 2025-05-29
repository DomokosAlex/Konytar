class Konyv {
    constructor(id, cim, dij, kep, kivett, mennyiseg, osszmennyiseg) {

        //kötelező
        this.id = id;
        this.cim = cim;
        this.dij = parseInt(dij);

        //magam adtam hozzá
        //csak egy szamot kell megadni (5,6) fedőképnek mert úgy van elnevezve a kép
        this.kep = kep;
        this.kivett = parseInt(kivett);
        this.mennyiseg = parseInt(mennyiseg);
        this.osszmennyiseg = parseInt(osszmennyiseg);

    }
}

// tömb tárolja a könyveket, index = id
const konyvtarolo = [];
function addBook() {
    const cim = prompt("Cím:");
    const dij = prompt("Dij (Forint):");
    const kep = prompt("Fedő kép: ");
    const kivett = 0; 
    const osszmennyiseg = prompt("Összes példány: ");
    const mennyiseg = osszmennyiseg;

    const id = konyvtarolo.length;

    let van = false;
    let upindex = 0;

    for (let i = 0; i < konyvtarolo.length; i++) {
        if (konyvtarolo[i].cim === cim) {
            van = true;
            upindex = i;
            break;
        }
    }

    if (van) {
        konyvtarolo[upindex].osszmennyiseg += parseInt(osszmennyiseg);
    } else {
        const konyv = new Konyv(id, cim, dij, kep, kivett, mennyiseg, osszmennyiseg);
        konyvtarolo.push(konyv);
    }

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
                        <h4 class="card-title">${e.cim}</h4>
                        <h5 class="card-title">Dij: ${e.dij}</h5>
                        <h5 class="card-title">Kivett példádnyok: ${e.kivett}</h5>
                        <h5 class="card-title">Összes példány: ${e.osszmennyiseg}</h5>

                        <button onclick="Torol(${e.id})" class="btn btn-danger"><span><i class="bi bi-trash3"></i></span> Törlés</button>
                    </div>
                </div>
            `
        //ha nincs kivéve a könyv adja hozzá a választékhoz
       
            var konyvdiv = document.createElement("div");
            konyvdiv.className = "col-md-6 col-lg-3 d-flex justify-content-center";
            konyvdiv.id = e.id + "konyv";
            konyvdiv.innerHTML =
                `
                <div class="card my-3" style="width: 14rem;">
                    <img src="./img/${e.kep}.png" class="card-img-top" alt="konyv">
                    <div class="card-body">
                        <h4 class="card-title">${e.cim}</h4>
                        <h5 class="card-title">Dij: ${e.dij}</h5>
                        <h5 class="card-title">Példádnyok: ${e.mennyiseg}</h5>
                        <button onclick="Kolcson(${"\'" + e.id + "konyv" + "\'"})" class="btn btn-danger"><span><i class="bi bi-box-arrow-up"></i></span> Kiveszem</button>
                    </div>
                </div>
            `
            //DOM-ba beszurja a kártyát a könyvnek a tulajdonságaival
            konyvtar.appendChild(konyvdiv);
        

        //ha ki van véve adja hozzá a ki kölcsonzötthöz
        if (e.kivett > 0) {
            var kolcsondiv = document.createElement("div");

            kolcsondiv.className = "col-md-6 col-lg-3 d-flex justify-content-center";
            kolcsondiv.id = e.id + "konyv";
            kolcsondiv.innerHTML =
                `
                <div class="card my-3" style="width: 14rem;">
                    <img src="./img/${e.kep}.png" class="card-img-top" alt="konyv">
                    <div class="card-body">
                        <h4 class="card-title">${e.cim}</h4>
                        <h5 class="card-title">Díj: ${e.dij}</h5>
                        <h5 class="card-title">Példádnyok: ${e.kivett}</h5>

                        <button onclick="Visszaadom(${"\'" + e.id + "konyv" + "\'"})" class="btn btn-danger"><span><i class="bi bi-box-arrow-down"></i></span> Visszaadom</button>
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
        if (e.kivett > 0) {
            osszdij += parseInt(e.dij) * e.kivett;
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


    document.getElementById("kdij").innerHTML = "";
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

    //beállitja azt hogy ki van véve/vissza lett adva és frissiti a könyveket 
    const numericId = parseInt(id);
    const e = konyvtarolo[numericId];

    if (e.mennyiseg > 0) {
        e.mennyiseg--;
        e.kivett++;
    } else {
        alert("Nincs több elérhető példány.");
    }

    MutatKartya();
}




function Visszaadom(id) {

    //törli a választékból

    //beállitja azt hogy ki van véve/vissza lett adva és frissiti a könyveket 
    const numericId = parseInt(id);
    const e = konyvtarolo[numericId];

    if (e.kivett > 0) {
        e.mennyiseg++;
        e.kivett--;
    } else {
        id.remove();
    }

    MutatKartya();
}