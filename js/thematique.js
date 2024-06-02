/*------------------------------MENU------------------------------*/


/*Loader*/
function loader(){
    removeBootstrapLinks();
    chronometer();//commencer le chrono
    let load = document.getElementById("reload");
    load.style.display = 'none';
    let page = document.getElementById("page");
    page.style.display = 'flex';
    let menu = document.getElementById("menu");
    menu.style.display = 'flex';
    let footer = document.getElementsByTagName("footer")[0];
    let table = document.getElementsByTagName("footer")[0].getElementsByTagName("table");
    table[0].style.display = 'flex';
    table[1].style.display = 'flex';
    footer.style.backgroundColor = 'black';/*couleur de fond du footer*/
}

function removeBootstrapLinks(){//enlève les liens bootstrap qui peuvent correspondre à d'autres classe déjà mises
    let bootstrapElements = document.querySelectorAll('.bootstrap');
    bootstrapElements.forEach(element => element.remove());
}

function load(){
    setTimeout(loader,2000);
}



/*Horloge*/
function addSegments(digitId){//ajoute les segments de l'horloge numérique
    let chiffre = document.getElementById(digitId);//récupère l'endroit où est le chiffre
    let segment;
    for(let i=0; i<7; i++){//on fait les 7 segments
        segment = document.createElement("div");//on crée une div pour mettre le segment
        segment.classList.add("off");//on ajoute la classe off
        segment.classList.add("segment");//on lui ajoute la classe segment
        segment.classList.add(`segment${i}`);//on lui ajoute la classe segmenti avec i le numéro du segment
        chiffre.appendChild(segment);//ajoute un segment à notre chiffre
    }
}

function updateDigit(digitId, value){//met à jour les chiffres en changeant les couleurs
    let segmentStates = [
        [1, 1, 1, 0, 1, 1, 1],//0
        [0, 0, 1, 0, 0, 1, 0],//1
        [1, 0, 1, 1, 1, 0, 1],//2
        [1, 0, 1, 1, 0, 1, 1],//3
        [0, 1, 1, 1, 0, 1, 0],//4
        [1, 1, 0, 1, 0, 1, 1],//5
        [1, 1, 0, 1, 1, 1, 1],//6
        [1, 0, 1, 0, 0, 1, 0],//7
        [1, 1, 1, 1, 1, 1, 1],//8
        [1, 1, 1, 1, 0, 1, 1]//9
    ];
    //récupère le chiffre du document qui est concerné et récupère tous ses segments
    let segments = document.getElementById(digitId).querySelectorAll(".segment");

    for(let i=0; i<7; i++){//on parcourt tous les segments
        if(segmentStates[value][i] == 1){
            //si dans le tableau au dessus c'est marqué 1 à la place du segment alors on change la couleur
            segments[i].classList.remove("off");
        } 
        else{//sinon on remet en sombre
            segments[i].classList.add("off");
        }
    }
}

function setTime(){//met l'heure à jour
    const event = new Date();//crée un évènement date
    let time = event.toLocaleTimeString('fr-FR');//récupère l'heure locale
    let realTime = [];//crée un tableau pour mettre les chiffres de l'heure
    if (time[1]!=":"){//si il y a bien 2 chiffres pour l'heure
        //on utilise push pour mettre les chiffres dans le tableau et parseInt
        //pour avoir l'heure en entiers et non en caractères
        realTime.push(parseInt(time[0]));//on ajoute la dizaine de l'heure
        realTime.push(parseInt(time[1]));//on ajoute l'unité de l'heure
        realTime.push(parseInt(time[3]));//on ajoute la dizaine des minutes
        realTime.push(parseInt(time[4]));//on ajoute l'unité des minutes
    }
    else{//sinon, s'il n'y a qu'un seul chiffre pour l'heure
        realTime.push(0);//on met un zéro pour la dizaine de l'heure
        //sinon on fait la même chose que si il y avait une dizaine pour l'heure 
        //mais on décale tous les indices, le ':' est à l'indice 1
        realTime.push(parseInt(time[0]));
        realTime.push(parseInt(time[2]));
        realTime.push(parseInt(time[3]));
    }
    return realTime;//renvoie le tableau avec les chiffres dans l'ordre heures et minutes
}

function init(){//affiche les segments de l'horloge numérique
    //affiche les chiffres pour l'heure et les secondes en 'off'
    addSegments("hours-tens");
    addSegments("hours-units");
    addSegments("minutes-tens");
    addSegments("minutes-units");
}

function points(){//fait clignoter les 2 points entre les chiffres de l'heure et des unités
    let pts = document.getElementById("colon");//on récupère les points qui ont bien l'id 'colon'
    //on récupère les classes des points et on les met dans une chaine de caractère
    let classes = pts.className.toString();
    //on transforme la chaine de caractères en tableau
    let classesTab = classes.split(" ");
    let indice =-1;
    for(let i=0; i < classesTab.length; i++){//on parcourt tout le tableau
        if(classesTab[i]=="off"){//si les points ont la classe "off" (si ils sont éteints)
            indice = i;//on récupère l'indice - juste pour savoir si ils étaient éteints ou non
        }
    }
    if(indice != -1){//si l'indice a pas bougé - les points étaient étaients éteints
        pts.classList.remove("off");// on enlève la classe "off" pour les allumer
    }
    else{//sinon ils étaient allumés
        pts.classList.add("off");//donc on leur met la classe "off" - on les éteints
    }
}

function updateHour(){//affiche l'heure
    let time = setTime();//appelle la fonction qui met à jour l'heure
    //affiche les chiffres correspondants aux heures et minutes sur notre horloge
    updateDigit("hours-tens", time[0]);
    updateDigit("hours-units",time[1]);
    updateDigit("minutes-tens",time[2]);
    updateDigit("minutes-units",time[3]);
}



/*Chronomètre du temps passé sur la page*/
function newChrono(debut) {
    let chrono = document.getElementById('time');
    let temps = (Date.now() - debut) / 1000;
    temps = parseInt(temps);//transforme la chaine de caractères en entiers en ne prenant que le nombre avant virgule
    
    
    let minutes = parseInt(temps / 60); //arrondi au chiffre avant la virgule
    let secondes = temps % 60;
    secondes = secondes < 10 ? '0' + secondes : secondes;

    let tempsFinal = minutes + ':' + secondes;
    chrono.textContent = tempsFinal;
}

function chronometer(){
    let debut = Date.now();
    setInterval(function() {
        newChrono(debut);
    }, 1000);
}



/*Logo qui renvoie vers la page accueil*/
function clicLogo(){
    window.location.replace("accueil.html");//au clic sur le logo ça renvoie vers la page accueil
}



/*Alerte quand on clique sur le bouton membres*/
function alerte(){
    let navigation = confirm("Voulez-vous être redirigé vers la page membres ?");
    if(navigation){
        window.location.replace("membres.html");
    }
}



/*Couleurs affichées dans la console*/
function couleurs(){
    let menu = document.getElementById("menu");//on récupère le menu
    let bouton = menu.getElementsByClassName("bouton");//tableau contenant tous les boutons du menu
    let sousBouton = menu.getElementsByClassName("sous-bouton");
    let boutonTab = [];
    for(let btn of bouton){
        boutonTab.push(btn);
    } 
    for(let sousBtn of sousBouton){
        boutonTab.push(sousBtn);
    }
    let couleurAvant;
    let couleurApres;
    let nomBouton;
    for(let element of boutonTab){
        element.addEventListener("mouseover", ()=>{
            couleurAvant = getComputedStyle(element).backgroundColor;
            nomBouton = element.name;
            console.log("La couleur du bouton ", nomBouton, " est : ", couleurAvant);
        });
        element.addEventListener("mouseout", ()=>{
            couleurApres = getComputedStyle(element).backgroundColor;
            nomBouton = element.name;
            console.log("La couleur du bouton ", nomBouton, " est : ", couleurApres);
        });
    }
}


/*MAIN*/
function main(){//appelle toutes les fonctions
    load();
    init();//initialise les chiffres en sombre
    updateHour();//affiche l'heure une première fois
    points();//affiche les points une première fois

    //met à jour l'heure toutes les secondes, en appelant la fonction qui affiche et met à jour les chiffres
    setInterval(updateHour,1000);
    //appelle la fonction qui allume ou éteint les points, toutes les secondes
    setInterval(points,1000);

    couleurs();
}
main();










/*------------------------------telephne --------------------------------------------*/

function jouerSonnerie() {
    //fonction pour jouer la sonnerie
    var audio = new Audio('../son/sonnerie2.mp3');
    audio.play();
}

document.addEventListener('copy', function(e) { //ecouteur d'événements pour la copie de texte
    var parentElement = window.getSelection().anchorNode.parentNode; //obtient l'élément parent du texte selectionné 

        // Vérifier si l'élément parent est un élément de numéro de téléphone
        if (parentElement.classList.contains('telephone')) {
            var numeroCopie = parentElement.innerText.trim(); //obtient de téléphone sélectionné    .tim() permzt de supprmer es espaces blancs au débu et fin chaine caract
            console.log('Numéro copié :', numeroCopie);

            var numeroEntree = prompt('Si vous voulez appeler ce numéro : ' + numeroCopie + ', entrez-le de nouveau dans le champ ci-dessous puis validez');// affiche une message avec une zone de texte pour entrer a nouveau le numéro 
            if (numeroEntree !== null && numeroEntree === numeroCopie) { // si le numéro entré correspond au numéro copié
                jouerSonnerie(); //joue la sonnerie
                afficherMessage('Vous appelez ce numéro : ' + numeroCopie);
            }

        }
});

function afficherMessage(message) {
    //fonction qui affiche un message dans la fenetre modale
    
    var modal = document.getElementById("myModal"); //obtient l'élément de la fenêtre modale et le message a afficher
    
    
    var modalContent = document.querySelector(".modal-content"); // sélection l'élément du html qui à la classe css ".model-content"
    var messageElement = document.getElementById("message");  // sélection l'élément du html qui à l'id message'

    /*---------------------- CSS ------------------------*/
    messageElement.textContent = message;
    modal.style.display = "block";
    modalContent.style.width = "30%"; // Réduire la largeur à 40%
    modalContent.style.left = "30%"; // Ajuster la position gauche pour centrer horizontalement
    modalContent.style.display = "flex";
    modalContent.style.flexDirection = "column";
    modalContent.style.justifyContent = "center";
    modalContent.style.alignItems = "center";
    modalContent.style.border = "2px solid #000";
/*---------------------------------------------------------*/

    var btnClose = document.getElementById("btnClose"); //selevtion de l'element du html qui a l'id btnclose
    btnClose.onclick = function() { //lorsque l'utilisateur clique sur le bouton fermé change la propriété du css pour cacher la fenetre modele
        modal.style.display = "none";
    }

    // Fermez la fenêtre modale après quelques secondes
    setTimeout(function() {
        modal.style.display = "none";
    }, 5000); // 5 secondes
}
/*------------------------------------------------*/