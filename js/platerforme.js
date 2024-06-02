
document.addEventListener('DOMContentLoaded', function() {

    var btn1 = document.getElementById('titre1');
    var btn2 = document.getElementById('titre2');
    
    // Ajoutez un événement click à chaque bouton
    btn1.addEventListener('click', function() {
        // Affichez la fenêtre modale correspondante
        /*createModal('dialog1', 'Chambre connectée : Living Lab', 'Le living Lab est le fruit de collaboration avec l’entreprise de mutuelle santé Malakoff Médéric. Initialement, ce Living Lab avait pour but de détecter la chute des personnes âgées sans utiliser de capteurs portés (bracelet, médaillon...). Une solution a été proposée en utilisant un capteur de type Kinect permettant de garantir le respect de la vie privée et de connaitre à chaque instant la position de la personne dans le studio. Afin détendre les possibilités du studio, un ensemble de capteurs ont été ajoutés : prises connectées, capteurs denvironnements, température, lumière, humidité, gaz...), capteurs de consommation (électricité, eau), Caméras, micro et haut parleurs. Plusieurs scénarios ont été mis en place pour utiliser les données des différents capteurs et envoyer une alarme (sms, mail) en cas de chute ou si la personne reste trop longtemps allongée sur le sol, en cas de détection danomalie (pas suffisamment de consommation deau en fonction dune température trop élevée...). Ce démonstrateur permet également de visualiser les données des différents capteurs en temps réel et à distance, en se connectant sur un site web. Les travaux futurs en lien avec cette plateforme à développer de scénarios en conditions "réelles" dans des EPHAD par exemple pour contribuer dans la prise en charge des risques liés aux personnes en situation de dépendance (déshydratation, comportement, chutes...).', '../images/livinglab.png' );*/
        displayModalFromElement('txt1', 'img1', 'texte1');
    });
    
    btn2.addEventListener('click', function() {
        // Affichez la fenêtre modale correspondante
        /*createModal('dialog2', 'Environnement hybrides connectés', 'Cette plateforme est en cours de développement et vise à offrir des services à la personne dans des environnements indoor...', '../images/plateforme.jpeg');*/
        displayModalFromElement('txt2', 'img2', 'texte2');
    });
});



function displayModalFromElement(textId, imgId, contentId) {
    // Récupère l'élément de texte, le titre, l'URL de l'image et le contenu
    var textElement = document.getElementById(textId);
    var title = textElement.querySelector('h2').innerText;
    var imageUrl = document.getElementById(imgId).querySelector('img').src;
    var contentElement = document.getElementById(contentId);
    var content = contentElement.innerHTML;
    
    // Appelle la fonction createModal avec les données récupérées
    createModal(textId + '_modal', title, imageUrl, content);
}


function createModal(id, title, imageUrl, content) {
    // Définit la longueur maximale du contenu du modal
    var maxLength = 150;
    var ellipsis = '...';


    function truncateText(text, maxLength, ellipsis) {
        var lengthWithEllipsis = maxLength - ellipsis.length;    // Calcul de la longueur maximale du texte tronqué en tenant compte de la longueur de l'ellipse
        var truncated = text.substring(0, lengthWithEllipsis);    // Extraction d'une sous-chaîne de caractères du texte original, en commençant par l'index 0 jusqu'à la longueur maximale avec l'ellipse
        var finalText = truncated + ellipsis;    // Concaténation de la sous-chaîne tronquée avec l'ellipse pour former le texte final tronqué
        return finalText;    // Retourne le texte final tronqué
    }

    // Supprime les espaces vides au début et à la fin du contenu
    var trimmedContent = content.trim();
    // Tronque le contenu si sa longueur dépasse la longueur maximale
    var truncatedContent = trimmedContent.length > maxLength ? truncateText(trimmedContent, maxLength, ellipsis) : trimmedContent;

    // Affiche les informations sur le contenu dans la console pour le débogage
    console.log("Original content length: " + content.length);
    console.log("Trimmed content length: " + trimmedContent.length);
    console.log("Truncated content length: " + truncatedContent.length);
    console.log("Truncated content: " + truncatedContent);

     // Vérifie si un modal avec l'ID donné existe déjà
    var existingModal = document.getElementById(id);
    if (existingModal) {
         // Met à jour le contenu du modal existant
        existingModal.querySelector('.modal-title').innerText = title;
        existingModal.querySelector('.modal-image').src = imageUrl;
        existingModal.querySelector('.modal-content').innerText = truncatedContent;

        // Affiche le modal et désactive le défilement du corps de la page
        existingModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('no-scroll'); 
        return;
    }

    // Crée un nouvel élément de modal et définit ses attributs et contenu
    var modal = document.createElement('div');
    modal.id = id;
    modal.className = 'c-dialog';
    modal.setAttribute('aria-hidden', 'false');
    
    var modalBox = document.createElement('div');
    modalBox.className = 'c-dialog__box';
    
    var closeButton = document.createElement('button');
    closeButton.className = 'close';
    closeButton.dataset.modal = id;
    closeButton.innerHTML = '&times;';
    closeButton.style.cursor = 'pointer';
    closeButton.style.float = 'right';
    closeButton.onclick = function() {
        // Gère la fermeture du modal lors du clic sur le bouton de fermeture
        var modal = document.getElementById(id);
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('no-scroll');  // Réactive le défilement du corps de la page

    };
    
    var modalTitle = document.createElement('h2');
    modalTitle.className = 'modal-title';
    modalTitle.innerHTML = title;
    modalTitle.style.textAlign = 'center';


    var modalImage = document.createElement('img');
    modalImage.className = 'modal-image';
    modalImage.src = imageUrl;
    modalImage.alt = title;
    modalImage.style.width = '100%';

    var modalContent = document.createElement('p');
    modalContent.className = 'modal-content';
    modalContent.innerHTML = truncatedContent;
    
     // Ajoute les éléments de contenu au modal
    modalBox.appendChild(closeButton);
    modalBox.appendChild(modalTitle);
    modalBox.appendChild(modalImage);
    modalBox.appendChild(modalContent);
    modal.appendChild(modalBox);
    
    // Ajoute le modal au corps de la page
    document.body.appendChild(modal);
    document.body.classList.add('no-scroll');// Désactive le défilement du corps de la page
}

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