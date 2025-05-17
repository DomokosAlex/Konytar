




function Admin() {
    const kivett = document.getElementById("kivett");
    const elerheto = document.getElementById("elerheto");

    const admin = document.getElementById("admin");


    kivett.style.display = "none";
    elerheto.style.display = "none";

    admin.style.display = "block"

}


function Kivett() {
    const admin = document.getElementById("admin");
    const elerheto = document.getElementById("elerheto");

    const kivett = document.getElementById("kivett");

    admin.style.display = "none";
    elerheto.style.display = "none";

    kivett.style.display = "block"

}


function Elerheto() {
    const kivett = document.getElementById("kivett");
    const admin = document.getElementById("admin");

    const elerheto = document.getElementById("elerheto");

    kivett.style.display = "none";
    admin.style.display = "none";

    elerheto.style.display = "block";

}