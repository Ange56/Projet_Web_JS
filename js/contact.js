function afficherJeu() {
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.style.display = 'flex';
}




// Écouteur d'événement pour détecter lorsque le DOM (Document Object Model) est entièrement chargé
document.addEventListener('DOMContentLoaded', function () {
    // Sélectionne le formulaire par son ID
    const form = document.querySelector('form[action="contact.html"]');
    // Sélectionne les champs de saisie par leur ID
    const prenomInput = document.getElementById('prenom');
    const emailInput = document.getElementById('email');
    const remarqueInput = document.getElementById('remarque');
    // Sélectionne le bouton de soumission par son ID
    const fin = document.getElementById('fin');

    /*---------------------------*/
    const gameContainer = document.getElementById("gameContainer");
    /*
    const playerForm = document.getElementById("playerForm");
    const playerNameInput = document.getElementById("playerName");
    */
    const gameBoard = document.getElementById("gameBoard");
    const cells = Array.from(document.getElementsByClassName("cell"));
    //const resetButton = document.getElementById("resetButton");

    /*----------------------------*/



    // Sélectionne les éléments d'erreur par leur ID
    const prenomError = document.getElementById('prenomError');
    const emailError = document.getElementById('emailError');
    const remarqueError = document.getElementById('remarqueError');

    // Initialise des variables pour suivre si les champs ont été touchés ou non
    let prenomTouched = false;
    let emailTouched = false;
    let remarqueTouched = false;

    // Fonction générique pour valider un champ de formulaire
    function validateField(input, errorElement, validator, touched) {
        if (!touched) {
            // Si le champ n'a pas été touché, masque le message d'erreur
            errorElement.style.display = 'none';
            return true; // Le champ est valide (car non-touche)
        }
        // Si le champ a été touché, utilise le validateur personnalisé pour vérifier sa valeur
        if (validator(input.value.trim())) {
            errorElement.style.display = 'none'; // Masque le message d'erreur si le champ est valide
            return true; // Retourne true si le champ est valide
        } 
        else {
            errorElement.style.display = 'block'; // Affiche le message d'erreur si le champ est invalide
            return false; // Retourne false si le champ est invalide
        }
    }

    // Fonction de validation spécifique pour le champ "Nom"
    function validatePrenom() {
        return validateField(prenomInput, prenomError, function (value) {
            // Valide si le champ n'est pas vide et s'il contient un espace (pour prénom et nom)
            if (value === '' || !value.includes(' ')) {
                prenomError.textContent = 'Veuillez entrer un prénom et un nom séparés par un espace.';
                return false; // Retourne false si la validation échoue
            }
            return true; // Retourne true si la validation réussit
        }, prenomTouched); // Passe la variable de touche spécifique à ce champ
    }

    // Fonction de validation spécifique pour le champ "Email"
    function validateEmail() {
        return validateField(emailInput, emailError, function (value) {
            // Valide si le champ n'est pas vide et s'il contient un "@" et un "."
            if (value === '' || !value.includes('@') || !value.includes('.')) {
                emailError.textContent = 'Veuillez entrer une adresse email valide.';
                return false; // Retourne false si la validation échoue
            }
            return true; // Retourne true si la validation réussit
        }, emailTouched); // Passe la variable de touche spécifique à ce champ
    }

    // Fonction de validation spécifique pour le champ "Message"
    function validateRemarque() {
        return validateField(remarqueInput, remarqueError, function (value) {
            // Valide si la longueur du message est entre 20 et 1000 caractères
            if (value.length < 20 || value.length > 1000) {
                remarqueError.textContent = 'Le message doit contenir entre 20 et 1000 caractères.';
                return false; // Retourne false si la validation échoue
            }
            return true; // Retourne true si la validation réussit
        }, remarqueTouched); // Passe la variable de touche spécifique à ce champ
    }

    // Fonction pour valider l'ensemble du formulaire
    
	function validateForm() {
        // Valide chaque champ individuellement et stocke le résultat dans des variables booléennes
        const isPrenomValid = validatePrenom();
        const isEmailValid = validateEmail();
        const isRemarqueValid = validateRemarque();
        // Active le bouton de soumission uniquement si tous les champs sont valides
        fin.disabled = !(isPrenomValid && isEmailValid && isRemarqueValid);
    }

    // Écouteurs d'événements pour les champs de saisie
    prenomInput.addEventListener('input', function() {
        prenomTouched = true; // Marque le champ comme touché
        validateForm(); // Valide le formulaire à chaque saisie
    });

    emailInput.addEventListener('input', function() {
        emailTouched = true; // Marque le champ comme touché
        validateForm(); // Valide le formulaire à chaque saisie
    });

    remarqueInput.addEventListener('input', function() {
        remarqueTouched = true; // Marque le champ comme touché
        validateForm(); // Valide le formulaire à chaque saisie
    });

    // Validation initiale pour désactiver le bouton de soumission lors du chargement de la page
    validateForm();
    // Désactive le bouton de soumission au chargement de la page
    fin.disabled = true;


/*-----------------------------------jeu-------------------------------*/

    function initTicTacToe(){
        currentPlayer = "X";
        gameState = Array(9).fill(null);
        let draggedImage = null;
        //masque formulaire et affiche tic tac toe
        form.style.display = "none";
        gameContainer.style.display = "block";

        // Autres initialisations nécessaires (réinitialisation de la grille, etc.)
        resetGame();

        // Démarrage du jeu
        //performComputerMove(); // L'ordinateur effectue le premier coup
    }

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Empêche la soumission automatique du formulaire
        // Valide chaque champ individuellement lors de la soumission du formulaire
        if (validatePrenom() && validateEmail() && validateRemarque()) {
            //alert("Let's play"); // Alerte l'utilisateur que le formulaire est valide
            initTicTacToe();
        }
    });
    
	function allowDrop(event) {
        event.preventDefault();
    }

    function drag(event) {
        draggedImage = event.target;
    }

    function drop(event) {
        event.preventDefault();
        const cell = event.target;
        const cellIndex = parseInt(cell.getAttribute("data-index"));
    
        if (gameState[cellIndex] !== null || checkWinner() || currentPlayer !== "X") {
            return;
        }
    
        if (draggedImage && draggedImage.id === "cross") {
            cell.appendChild(draggedImage.cloneNode());
            gameState[cellIndex] = "X";
            handleEndOfTurn();
        }
    }
   
    function performComputerMove() {
        let bestMove = findBestMove();
        if (bestMove !== -1) {
            gameState[bestMove] = "O";
            cells[bestMove].textContent = "O";
            handleEndOfTurn();
        }
    }


    /*-----------------------------------coups ordinateur-----------------------------------*/
    function findBestMove() {
        let bestScore = -Infinity;
        let bestMove = -1;

        // Parcourt toutes les cellules vides pour évaluer les coups possibles
        for (let i = 0; i < gameState.length; i++) {
            if (gameState[i] === null) {
                // Simule le coup
                gameState[i] = "O";
                // Évalue le score du coup
                let score = evaluateMove(i, "O");
                // Annule le coup
                gameState[i] = null;
                // Met à jour le meilleur coup
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }

        return bestMove;
    }

    function evaluateMove(move, player) {
        // Évalue la qualité du coup en fonction de quelques critères simples
        // Par exemple, le fait de compléter une ligne, de bloquer l'adversaire, etc.
        let score = 0;

            // Simule le coup
        gameState[move] = player;

        // Vérifie s'il y a une victoire
        if (checkWinner() === player) {
            score = 10; // Victoire immédiate
        } 
        else {
            // Vérifie s'il y a une possibilité de victoire au prochain coup
            gameState[move] = player === "X" ? "O" : "X";
            if (checkWinner() === player) {
                score = 8; // Bloquer l'adversaire
            } 
            else {
                // Réinitialise l'état du jeu
                gameState[move] = null;
                // Évalue  critères
                if (isCreatingOpportunity(move, player)) {
                    score = 6; // Créer une opportunité de gagner
                } 
                else if (isThreateningOpponent(move, player)) {
                    score = 4; // Menace de l'adversaire
                } 
                else if (isInCenter(move)) {
                    score = 3; // Occupation du centre
                } 
                else if (isInCorner(move)) {
                    score = 2; // Occupation des coins
                } 
                else {
                    score = 1; // Occupation des côtés
                }
            }
        }

        // Annule le coup
        gameState[move] = null;

        return score;
    }


    function isCreatingOpportunity(move, player) {
        // Simule le coup
        gameState[move] = player;
    
        // Vérifie si le joueur a une possibilité de gagner au prochain coup
        const hasOpportunity = checkWinner() === player;
    
        // Annule le coup
        gameState[move] = null;
    
        return hasOpportunity;
    }
    
    function isThreateningOpponent(move, player) {
        // Simule le coup
        gameState[move] = player === "X" ? "O" : "X";
    
        // Vérifie si l'adversaire a une possibilité de gagner au prochain coup
        const isThreat = checkWinner() === player;
    
        // Annule le coup
        gameState[move] = null;
    
        return isThreat;
    }
    
    function isInCenter(move) {
        // Vérifie si le coup est placé au centre (indice 4 dans un tableau de 9 cases)
        return move === 4;
    }
    
    function isInCorner(move) {
        // Liste des indices des coins dans un tableau de 9 cases
        const corners = [0, 2, 6, 8];
        // Vérifie si le coup est placé dans l'un des coins
        return corners.includes(move);
    }


    /*---------------------------------------------------------------------------------------------*/



    function handleEndOfTurn() {
        if (checkWinner()) { //verifi s'il y a un gagant 
            setTimeout(() => { //affiche le message approprié et agit en conséquence
                if (currentPlayer === "X") {
                    alert("Vous avez gagné, votre formulaire va être envoyé.");
                    form.submit(); //envoie le form
                } 
                else {
                    alert("Vous avez perdu ! Votre formulaire ve être réinitialisé.");
                    resetForm(); //reinitialise le form
                }
            }, 100);
        } 
        else if (!gameState.includes(null)) { //si match null
            setTimeout(() => {
                alert("Match nul ! Votre formulaire va être réinitialisé.");
                resetForm(); //réinitialise le form
            }, 100);
        } 
        else {
            currentPlayer = currentPlayer === "X" ? "O" : "X"; //si le jeu continu change le joueur actuel
            if (currentPlayer === "O") { //si c'est le tour de l'ordinateur, effectu mvmt
                setTimeout(() => {
                    performComputerMove();
                }, 100);
            }
        }
    }



    function checkWinner() { //parcours les conditions gagnantes pour vérifier s'il y a un gagnant 
        for (const condition of winningConditions) {
            const [a, b, c] = condition;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return true;// S'il y a un gagnant, retourne true
            }
        }
        return false;// S'il n'y a pas de gagnant, retourne false
    }

    function resetGame() {
        // Réinitialise l'état du jeu et remplit toutes les cellules avec du texte vide

        gameState = Array(9).fill(null);
        cells.forEach(cell => cell.textContent = "");
        currentPlayer = "X"; // Réinitialise le joueur actuel à X
    }

    function resetForm() {
        // Réinitialisation du formulaire et l'affiche et masque le jeu 
        prenomInput.value = "";
        emailInput.value = "";
        remarqueInput.value = "";
        form.style.display = "block";
        gameContainer.style.display = "none";
        resetGame(); // Réinitialise le jeu
    }

	// Ajoute des écouteurs d'événements pour les actions de glisser-déposer
    cells.forEach(cell => cell.addEventListener("drop", drop));
    cells.forEach(cell => cell.addEventListener("dragover", allowDrop));

    // Ajoute des écouteurs d'événements pour les actions de glisser
	document.addEventListener("dragstart", drag);
    document.addEventListener("dragend", () => draggedImage = null);
	
});

/*--------------------------------------------*/


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