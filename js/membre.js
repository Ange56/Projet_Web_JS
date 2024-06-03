//membre


/*---------------------IMAGE A GRATTER---------------------*/

function grattage(){//fonction qui permet de gratter le photo de M.Karine
    let contact = document.getElementsByName("karine")[0];//on récupère l'endroit où est la photo
    let canva = document.createElement("canvas");//crée un canva pour mettre la photo à gratter au dessus
    canva.classList.add("gratter");//on applique le style gratter
    contact.appendChild(canva);//on ajoute le canva dans le dom
    let photo = canva.getContext("2d");//pour récupérer le canva et pour le modifier
    contact = contact.getElementsByTagName("img")[0];//récupère l'image de M.Karine
    canva.width = contact.offsetHeight;//met le canva à la même taille que la photo en dessous
    canva.height = canva.width;//largeur = hauteur car cercle

    let imageDessus = new Image();//on crée l'image au dessus
    imageDessus.src = "../images/contact.jpg";//on importe la photo contact


    imageDessus.onload = () => {//au chargement de la page, on affiche le canva dessus
        photo.drawImage(imageDessus,0,0,canva.width,canva.height);
        photo.globalCompositeOperation = 'destination-out';//permet de faire le grattage
    };


    let gratte = false;//si la souris ne gratte pas
    let x;
    let y;

    let cadre = canva.getBoundingClientRect();//permet de récupérer les positions du canva

    canva.addEventListener('mousedown', (souris) => {//quand la souris appuie dans le canva
        gratte = true;//alors on sait qu'elle gratte
    });
    document.addEventListener('mouseup', (souris) => {//si le bouton est relevé
        gratte = false;//elle ne gratte plus
    });

    canva.addEventListener('mousemove', (souris) => {//si la souris bouge
        if(gratte){//si la souris est appuyée
            x = souris.clientX - cadre.left;//permet de situer la souris dans le canva
            y = souris.clientY - cadre.top;

            //Dessine le cercle de grattage
            photo.beginPath();//commence à dessiner
            photo.arc(x, y, 13, 0, 180);//dessine en position(x,y) un cercle de taille 13
            photo.fill();//dessine sur la photo
        }
    });
}





/*----------------------MODE EDITION-------------------------*/
function edition(){//fonction qui passe du mode éditer au mode normale et inversement
    let bouton_edition = document.getElementById("bouton-edition");//récupère le bouton edition
    if(bouton_edition.style.backgroundColor == "black"){//si il est noir alors il a déjà été activé
        quitterEdition();//donc quand on clique dessus on quitte le mode édition
    }
    else{
        boutonEdition();//sinon on active le mode édition
    }
}


function iconeEdition(card){//crée une icone de crayon pour éditer les cartes
    let icon = document.createElement("span");//crée un élément span pour mettre l'icone
    icon.className = "material-icons";//classe correspondante pour avoir l'icone de google
    icon.innerHTML = "edit";//il faut mettre ça pour avoir l'icone de crayon google
    let cardBody = card.querySelector(".card-body");// récupère le body de la card
    cardBody.appendChild(icon);//ajoute l'icone en bas
    icon.style.fontSize ="25px";//modifie la taille de l'icone
    icon.addEventListener("click", ()=>{//si on clique sur l'icone
        cardBody.setAttribute("contenteditable", "true");//on peut modifier le body
    });
    icon.addEventListener("mouseover", () => {//si la souris survole
        icon.style.color = "red";//change la couleur en rouge
        icon.style.cursor = "pointer"; //change la souris en pointeur
    });
    icon.addEventListener("mouseout", () => {//quand la souris ne survole plus
        icon.style.color = "";//met les couleurs par défaut
    });
}

//fonction qui crée la poubelle pour supprimer une card
//prend en paramètre la card et son emplacement
function iconDelete(card, rowStart, rowEnd, columnStart, columEnd, idcard, eltApres){
    let icon = document.createElement("span");//crée le span pour mettre l'icone dedans
    icon.className = "material-icons";//classe de l'icone
    icon.innerHTML = "delete";//nom de l'icone google
    let cardBody = card.querySelector(".card-body");//sélectionne le body de la card
    cardBody.appendChild(icon);//ajoute l'icone à la fin de la card
    icon.style.fontSize ="25px";//modifie la taille de l'icone
    icon.addEventListener("click", ()=>{//quand on clique sur l'icone
        card.remove();//ça supprime la card
        nouvelle_carte(rowStart, rowEnd, columnStart, columEnd, idcard, eltApres);//et ça remet le bouton d'avant
    });
    icon.addEventListener("mouseover", () => {//si on survole avec la souris
        icon.style.color = "red";//la couleur change
        icon.style.cursor = "pointer"; //la souris devient un pointeur
    });
    icon.addEventListener("mouseout", () => {//quand on ne survole plus
        icon.style.color = "";//la couleur redevient par défaut
    });
}

function quitterEdition(){//fonction qui permet de revenir au mode normal
    let bouton_edition = document.getElementById("bouton-edition");//on récupère le bouton d'édition
    let quitter = window.confirm("Vous allez quitter le mode édition. Validez votre choix.");//demande à l'utilisateur de confirmer son choix
    let cards = document.getElementsByClassName("card");//récupère les cards
    if(quitter){//si il y a confirmation
        bouton_edition.style.backgroundColor = "#CA0000"; //le bouton retrouve sa couleur originale
        bouton_edition.style.borderColor = "black"; //et sa couleur de bordure d'avant 
        for(let card of cards){//pour chaque card
            let cardBody = card.querySelector(".card-body");//on récupère le body
            cardBody.setAttribute("contenteditable", "false");//on enlève le mode édition
            let icon = document.getElementsByClassName("material-icons");//on récupère les icones
            for(let elt of icon){//on supprimer chaque icone (edition et poubelle)
                elt.remove();
            }
        }
        supprimerPlus();//on supprime le bouton qui permet d'ajouter des cards
    }
}

function boutonEdition(){//fonction qui permet d'activer le mode édition
    let bouton_edition = document.getElementById("bouton-edition");//récupère le bouton édition
    let mode_edition = window.prompt("Entrez le nom du profil administrateur","nom");//demande d'entrer le nom d'utilisateur
    let cards = document.getElementsByClassName("card");//récupère les cards
    if(mode_edition == "admin"){//si l'utilisateur a rentré le bon identifiant on demande le mot de passe
        let new_window = window.prompt("Entrez le mot de passe du profil administrateur", "mot de passe");
        if(new_window =="admin_pwd"){//si le mot de passe est correct
            bouton_edition.style.backgroundColor = "black"; //change la couleur du bouton
            bouton_edition.style.borderColor = "red";
            for(let card of cards){//pour toutes les cards
                iconeEdition(card);//on ajoute l'icone d'édition
            }
            card1eLigne();//appelle les fonctions pour ajouter des cards en 1e, 2e, 3e, 4e, 5e lignes
            card2eLigne();
            card3eLigne();
            card4eLigne();
            card5eLigne();
        }
    }
}


//fonction qui permet de créer une nouvelle card avec son emplacement et l'élément qui le suit et l'id à lui donner
function nouvelle_carte(rowStart, rowEnd, columnStart, columnEnd, idcard, eltApres){
    let page = document.getElementById("page");//récupère le contenu de la page
    let plus = document.createElement("div");//crée le bouton pour ajouter des membres
    let new_card = document.createElement("div");//crée la card qui s'ajoute

    /*paramètre le style du bouton*/
    plus.style.backgroundColor = "#CA0000";
    plus.style.color= "white";
    plus.style.fontFamily = "'Audiowide', sans-serif";
    plus.style.fontSize = "15px";
    plus.style.borderRadius = "15px";
    plus.style.borderColor = "black";
    plus.style.paddingLeft = "5px";
    plus.style.paddingRight=  "5px";
    plus.style.paddingTop = "8px";
    plus.style.paddingBottom = "8px";
    plus.style.borderStyle = "solid";
    plus.style.borderWidth ="1px";
    plus.style.boxShadow ="0 5px #999";
    plus.style.cursor = "pointer";
    plus.innerHTML= "Ajouter un membre";//contenu du bouton
    plus.classList.add("plus");//on ajoute la classe plus pour ces boutons
    
    page.style.gridTemplateColumns = "1fr 5fr 1fr 5fr 1fr 5fr 1fr";//pour créer les colonnes en fonction de la taille de l'écran
    plus.style.gridRowStart = rowStart;/*commence à cette ligne*/
    plus.style.gridRowEnd= rowEnd;/*finit à cette ligne*/
    plus.style.gridColumnStart= columnStart;/*commence à cette colonne*/
    plus.style.gridColumnEnd= columnEnd;/*finit à cette colonne*/

    //sert à centrer le bouton dans sa colonne
    plus.style.display = "block";
    plus.style.margin = "auto";

    
    plus.addEventListener("click", () =>{//si on clique sur le bouton
        plus.style.display = "none";//on l'efface
        new_card.classList.add("card");//on crée la nouvelle card de la même façon que les autres
        new_card.id= idcard;//on lui met son id
        new_card.style.gridRowStart = rowStart;//commence à cette ligne- à la place du bouton
        new_card.style.gridRowEnd = rowEnd;//sert à placer la card
        new_card.style.gridColumnStart = columnStart;
        new_card.style.gridColumnEnd= columnEnd;
        new_card.classList.add("newCard");//ajoute la classe newCard aux nouvelles cards créées
        
        
        let imageBox = document.createElement("div");//endroit pour la photo
        imageBox.classList.add("image-box");//on ajoute la classe d'image-box comme les autres cards
        let profil = document.createElement("img");//crée l'image dedans
        profil.src = "../images/contact.jpg";//insère l'image par défaut
        profil.style.height = "150px";//modifie la taille de la photo pour la card
        imageBox.appendChild(profil);//on l'ajoute dans son container

        let body = document.createElement("div");//crée le body de la card
        body.classList.add("card-body");//ajoute la classe correspondante
        body.setAttribute("contenteditable", "false");//on ne peut pas éditer le body au début
        let personne = document.createElement("h3");//nom de la personne
        personne.innerHTML = "Prénom Nom";//à changer par l'utilisateur
        let descriptif = document.createElement("p");//insère un paragraphe
        descriptif.innerHTML = "Métier exercé, lieu, mail";//indications
        descriptif.classList.add("card-text");//ajoute la classe correspondante

        let icones = document.createElement("div");//crée une div pour toutes les icones
        icones.classList.add("icones-card");//ajoute la classe des icones
        let icon1 = document.createElement("i");//ajoute l'endroit pour la première icone
        icon1.classList.add("fa-solid");//ajoute les classes pour la première icone
        icon1.classList.add("fa-globe");
        //on fait les 4 icones
        let icon2 = document.createElement("i");
        icon2.classList.add("fa-brands");
        icon2.classList.add("fa-linkedin");
        let icon3 = document.createElement("i");
        icon3.classList.add("fa-solid");
        icon3.classList.add("fa-graduation-cap");
        let icon4 = document.createElement("i");
        icon4.classList.add("fa-brands");
        icon4.classList.add("fa-researchgate");
        let espace = document.createElement("span");
        espace.innerHTML =" ";//on ajoute l'espace entre chaque
        icones.appendChild(icon1);//ajoute la première icone dans le body - espace icones
        icones.appendChild(espace);//puis l'espace
        icones.appendChild(icon2);//puis la 2e icone
        icones.appendChild(espace.cloneNode(true));//permet de cloner l'espace car on ne peut pas avoir 2 noeuds identiques
        icones.appendChild(icon3);
        icones.appendChild(espace.cloneNode(true));
        icones.appendChild(icon4);


        let mots = document.createElement("div");//après on crée l'endroit pour les mots clés
        mots.classList.add("mots-clés");//on ajoute le style correspondant
        let premierMot = document.createElement("p");//crée un premier mot clé
        premierMot.innerHTML = "premier mot-clé";//exemple
        mots.appendChild(premierMot);//ajoute ce mot clé
        
        
        //on ajoute tout ce qu'on créé au body de la card
        body.appendChild(personne);
        body.appendChild(descriptif);
        body.appendChild(document.createElement("hr"));//trait de séparation
        body.appendChild(icones);
        body.appendChild(mots);




        new_card.appendChild(imageBox);//ajoute à la card la photo
        new_card.appendChild(body);//ajoute le body de la card
        iconeEdition(new_card);//ajoute l'icone d'édition pour cette nouvelle card pour la modifier
        iconDelete(new_card,rowStart, rowEnd, columnStart, columnEnd, idcard, eltApres);//ajoute aussi l'icone de supression
        if(columnStart == "4"){//si il reste de la place dans la ligne pour une autre card
            nouvelle_carte(rowStart, rowEnd, "6", "7", idcard, eltApres);//on recommence pour ajouter le bouton pour la card suivante de la ligne
        }
    });
    if(!occupe(rowStart, rowEnd, columnStart, columnEnd)){//si l'espace est vide et qu'il n'y a ni card ni bouton
        page.insertBefore(plus, eltApres);//on peut mettre le bouton sur la page, avant l'élément qui doit suivre
    }
    else{ //sinon il y a déjà quelquechose
        if(columnStart == "4"){//si il reste de la place dans la ligne pour une autre card
            nouvelle_carte(rowStart, rowEnd, "6", "7", idcard, eltApres);//on ajoute un bouton à l'emplacement suivant
        }
    }
    page.insertBefore(new_card, eltApres);//ajoute la card là où on veut la placer si on a cliqué sur le bouton
}


function occupe(rowStart, rowEnd, columnStart, columnEnd){//fonction qui permet de savoir si un emplacement est occupé
    let cards = document.querySelectorAll(".newCard");//sélectionne toutes les nouvelles cards
    for(let card of cards){//pour chaque card
        //récupère son emplacement
        let cardRowStart = card.style.gridRowStart;
        let cardRowEnd = card.style.gridRowEnd;
        let cardColumnStart = card.style.gridColumnStart;
        let cardColumnEnd = card.style.gridColumnEnd;
        
        //vérifie si les positions sont les mêmes
        if(rowStart === cardRowStart && rowEnd === cardRowEnd && columnStart === cardColumnStart && columnEnd === cardColumnEnd) {
            return true; //l'emplacement est occupé
        }
    }
    return false; //l'emplacement est libre
}


function supprimerPlus(){//supprime le bouton pour ajouter des cards
    let plus = document.querySelectorAll(".plus");//récupère les boutons sous forme de tableau
    plus.forEach((elt) => {//pour chaque bouton
        elt.remove();//on le supprime
    });
}   



function card1eLigne(){//crée une carte sur la première ligne
    let eltApres = document.getElementById("d");//récupère l'élément suivant
    let new_card = nouvelle_carte("3", "4", "6", "7", "id1", eltApres);//crée le bouton puis la carte
}
function card2eLigne(){//crée une carte sur la 2e ligne
    let eltApres = document.getElementById("f");
    let new_card = nouvelle_carte("5", "6", "4", "5", "id2", eltApres);
}
function card3eLigne(){//crée une carte sur la 3e ligne
    let eltApres = document.getElementById("h");
    let new_card = nouvelle_carte("7", "8", "4", "5", "id3", eltApres);
}
function card4eLigne(){//crée une carte sur la 4e ligne
    let eltApres = document.getElementById("j");
    let new_card = nouvelle_carte("9", "10", "4", "5", "id4", eltApres);
}
function card5eLigne(){ //crée une carte sur la 5e ligne
    let eltApres = document.getElementById("");//par défaut ajoute l'élément en dernier élément
    let new_card = nouvelle_carte("11", "12", "4", "5", "id5", eltApres);
}

