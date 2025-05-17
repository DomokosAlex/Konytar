class Konyv {
    constructor(id, cim, dij, kep, kivett) {

        this.id = id;
        this.cim = cim;
        this.dij = dij;

        this.kep = kep;
        this.kivett = kivett;

    }
}


const konyvtarolo = [];

function addBook() {
    const cim = prompt("Cím:");
    const dij = prompt("Dij:");
    const kep = prompt("png: ");

    const id = konyvtarolo.length;

    const konyv = new Konyv(id, cim, dij, kep, false);

    konyvtarolo.push(konyv)

    MutatKartya();



}


function MutatKartya() {

    const admincont = document.getElementById("admincont");
    const konyvtar = document.getElementById("konyvtar");
    const kolcson = document.getElementById("kolcsonzottkonyvek");

    admincont.innerHTML = "";
    konyvtar.innerHTML = "";
    kolcson.innerHTML = "";

    konyvtarolo.forEach(e => {
        var admindiv = document.createElement("div");
        var konyvdiv = document.createElement("div");


        admindiv.className = "col-md-6 col-lg-3 d-flex justify-content-center";
        admindiv.id = e.id;
        admindiv.innerHTML =
            `
                <div class="card my-3" style="width: 14rem;">
                    <img src="../img/${e.kep}.png" class="card-img-top" alt="konyv">
                    <div class="card-body">
                        <h5 class="card-title">${e.cim}</h5>
                        <button onclick="Torol(${e.id})" class="btn btn-danger">Delete</button>
                    </div>
                </div>
            `

        if (!e.kivett) {
            konyvdiv.className = "col-md-6 col-lg-3 d-flex justify-content-center";
            konyvdiv.id = e.id + "konyv";
            konyvdiv.innerHTML =
                `
                <div class="card my-3" style="width: 14rem;">
                    <img src="../img/${e.kep}.png" class="card-img-top" alt="konyv">
                    <div class="card-body">
                        <h5 class="card-title">${e.cim}</h5>
                        <button onclick="Kiveszem(${"\'" + e.id + "konyv" + "\'"})" class="btn btn-danger">Kiveszem</button>
                    </div>
                </div>
            `


        }

        if (e.kivett) {


            var kolcsondiv = document.createElement("div");


            kolcsondiv.className = "col-md-6 col-lg-3 d-flex justify-content-center";
            kolcsondiv.id = e.id + "konyv";
            kolcsondiv.innerHTML =
                `
                <div class="card my-3" style="width: 14rem;">
                    <img src="../img/${e.kep}.png" class="card-img-top" alt="konyv">
                    <div class="card-body">
                        <h5 class="card-title">${e.cim}</h5>
                        <button onclick="Kiveszem(${"\'" + e.id + "konyv" + "\'"})" class="btn btn-danger">Visszaadom</button>
                    </div>
                </div>
            `

            kolcson.appendChild(kolcsondiv)


        }


        admincont.appendChild(admindiv);
        konyvtar.appendChild(konyvdiv);

    });

}



function Torol(id) {
    document.getElementById(id).remove();
    document.getElementById(id + "konyv").remove();

    konyvtarolo.splice(id, 1);

    for (let i = 0; i < konyvtarolo.length; i++) {
        konyvtarolo[i].id = i;
    }
    MutatKartya();
}

function Kiveszem(id) {
    document.getElementById(id).remove();

    const numericId = parseInt(id); // e.g. from "12konyv" -> 12
    const e = konyvtarolo[numericId];
    e.kivett = true;

    MutatKartya();
}

