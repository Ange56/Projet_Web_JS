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