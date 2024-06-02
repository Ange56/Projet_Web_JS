/*------------------------------MENU------------------------------*/


/*Loader*/
function loader(){/*fonction qui efface le loader et remet la page*/
    removeBootstrapLinks();//enlève les liens bootstrap qui gène notre css
    chronometer();//commencer le chrono
    let load = document.getElementById("reload");//récupère le loader
    load.style.display = 'none';//le cache
    let nomPage = document.title;//récupère le nom de la page
    let page = document.getElementById("page");//récupère le contenu de la page
    if(nomPage == "Membres"){ //car la page membres utilise grid et non flex
        page.style.display = 'grid';
        verifySize();//vérifie la taille pour ajuster le responsive
        setTimeout(grattage, 100);//toutes les 100 milisecondes on vérifie si on gratte la photo de Karine (dans l'autre fichier)
    }
    else{//sinon par défaut on met la page en flex
        page.style.display = 'flex';
    }
    let menu = document.getElementById("menu");//on récupère le menu
    menu.style.display = 'flex';//on l'affiche en flex
    let footer = document.getElementsByTagName("footer")[0];//récupère le footer
    let table = document.getElementsByTagName("footer")[0].getElementsByTagName("table");//récupère le tableau du footer
    table[0].style.display = 'flex';//affiche les tableaux du footer
    table[1].style.display = 'flex';
    footer.style.backgroundColor = 'black';/*couleur de fond du footer*/
}

function removeBootstrapLinks(){//enlève les liens bootstrap qui peuvent correspondre à d'autres classe déjà mises
    let bootstrapElements = document.querySelectorAll('.bootstrap');//récupère tout ce qui contient bootstrap
    bootstrapElements.forEach(element => element.remove());//supprime chaque élément du tableau d'au dessus
}

function load(){//au bout de 2 secondes appelle la fonction qui efface le loader
    setTimeout(loader,2000);
}
function size(){//vérifie la taille de la page
    let page = document.getElementById("page");//récupère la page
    if(window.matchMedia("(max-width: 880px)").matches){//si l'écran est plus petit que 880 px
        // Modifier les propriétés CSS en JavaScript
        page.style.display = "block";//la page s'affiche en colonne
        page.style.textAlign = "center";
        page.style.alignItems = "center";
    }
    else{//sinon elle s'affiche par défaut
        page.style.display = "grid";
        page.style.textAlign = "";
        page.style.alignItems = "";
    }
}
function verifySize(){//vérifie si la taille de l'écran change toutes les 500 milisecondes
    setInterval(size, 500);
}


/*------------------Horloge------------------------------*/
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



/*--------------------Chronomètre du temps passé sur la page-------------------------*/
function newChrono(debut) {
    let chrono = document.getElementById('time');//récupère l'emplacement
    let temps = (Date.now() - debut) / 1000;//met le temps en secondes
    temps = parseInt(temps);//transforme la chaine de caractères en entiers en ne prenant que le nombre avant virgule
    
    
    let minutes = parseInt(temps / 60); //arrondi au chiffre avant la virgule pour convertir en minutes
    let secondes = temps % 60;
    secondes = secondes < 10 ? '0' + secondes : secondes; //ajoute un zéro si il n'y a qu'un chiffre

    let tempsFinal = minutes + ':' + secondes;//affiche minutes et secondes
    chrono.textContent = tempsFinal;//affiche le temps passé
}

function chronometer(){//démarre le chronomètre
    let debut = Date.now();//prend le temps de début
    setInterval(function() {
        newChrono(debut);//appelle la fonction qui affiche le chrono
    }, 1000);//toutes les secondes
}



/*Logo qui renvoie vers la page accueil*/
function clicLogo(){
    window.location.replace("accueil.html");//au clic sur le logo ça renvoie vers la page accueil
}



/*Alerte quand on clique sur le bouton membres*/
function alerte(){
    let navigation = confirm("Voulez-vous être redirigé vers la page membres ?");//message de confirmation
    if(navigation){//si l'utilisateur clique sur oui
        window.location.replace("membres.html");//on est redirigé
    }
}



/*Couleurs affichées dans la console*/
function couleurs(){
    let menu = document.getElementById("menu");//on récupère le menu
    let bouton = menu.getElementsByClassName("bouton");//tableau contenant tous les boutons du menu
    let sousBouton = menu.getElementsByClassName("sous-bouton");//recupère les sous-boutons
    let boutonTab = [];//tableau des boutons
    for(let btn of bouton){//ajoute tous les boutons normaux au tableau
        boutonTab.push(btn);
    } 
    for(let sousBtn of sousBouton){//ajoute tous les sous-boutons au tableau
        boutonTab.push(sousBtn);
    }
    let couleurAvant;
    let couleurApres;
    let nomBouton;
    for(let element of boutonTab){//pour chaque bouton
        element.addEventListener("mouseover", ()=>{//si la souris passe dessus
            couleurAvant = getComputedStyle(element).backgroundColor;//récupère la couleur
            nomBouton = element.name;//récupère le nom du bouton
            console.log("La couleur du bouton ", nomBouton, " est : ", couleurAvant);//affiche la couleur
        });
        element.addEventListener("mouseout", ()=>{//quand la souris n'est plus dessus
            couleurApres = getComputedStyle(element).backgroundColor;//la nouvelle couleur est récupérée
            nomBouton = element.name;
            console.log("La couleur du bouton ", nomBouton, " est : ", couleurApres);//on affiche la nouvelle couleur
        });
    }
}


/*--------------anti plagiat--------------*/
document.addEventListener("copy", ()=>{//quand on détecte l'action de copie, il y a un message dans la console
    console.log("Attention ! Le plagiat est interdit par la loi !!!");
});




/*MAIN*/
function main(){//appelle toutes les fonctions
    load();//efface le loader
    init();//initialise les chiffres en sombre
    updateHour();//affiche l'heure une première fois
    points();//affiche les points une première fois

    //met à jour l'heure toutes les secondes, en appelant la fonction qui affiche et met à jour les chiffres
    setInterval(updateHour,1000);
    //appelle la fonction qui allume ou éteint les points, toutes les secondes
    setInterval(points,1000);

    couleurs();//récupère les couleurs des boutons
}
main();









