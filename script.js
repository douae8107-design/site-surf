// ============================================
// SITE ÉCOLE DE SURF - SCRIPT PRINCIPAL
// ============================================

// 1. Tableau pour stocker les réservations
var reservations = [];

// 2. Fonction pour calculer le prix
function calculPrix(nbPersonnes, typeCours) {
    var prixUnitaire = 0;
    
    switch(typeCours) {
        case "débutant": 
            prixUnitaire = 1000; 
            break;
        case "intermédiaire": 
            prixUnitaire = 1500; 
            break;
        case "prive": 
            prixUnitaire = 3000; 
            break;
        default: 
            prixUnitaire = 0;
    }
    
    // CORRECTION : multiplier par le nombre de personnes
    return prixUnitaire * nbPersonnes;
}

// 3. Fonction pour enregistrer une réservation
function enregistrerReservation(nom, email, cours, date, personnes) {
    var nouvelleReservation = {
        nom: nom,
        email: email,
        cours: cours,
        date: date,
        personnes: personnes,
        prix: calculPrix(personnes, cours),
        timestamp: new Date().toLocaleString()
    };
    
    // Ajouter au tableau
    reservations.push(nouvelleReservation);
    
    console.log("✅ Nouvelle réservation ajoutée !");
    console.log("Total réservations : " + reservations.length);
    
    return nouvelleReservation;
}

// 4. Fonction pour valider la réservation
function validerReservation() {
    // Récupérer les valeurs du formulaire
    var nom = document.getElementById('nom').value;
    var email = document.getElementById('email').value;
    var cours = document.getElementById('cours').value;
    var date = document.getElementById('date').value;
    var personnes = parseInt(document.getElementById('personnes').value);
    
    // Vérifier que tout est rempli
    if (!nom || !email || !cours || !date) {
        alert("❌ Veuillez remplir tous les champs !");
        return;
    }
    
    // Enregistrer la réservation
    var reservation = enregistrerReservation(nom, email, cours, date, personnes);
    
    // Afficher le message de confirmation
    var messageDiv = document.getElementById('messageConfirmation');
    var detailsDiv = document.getElementById('detailsReservation');
    var prixDiv = document.getElementById('prixTotal');
    
    detailsDiv.innerHTML = `
        <strong>${reservation.nom}</strong> - ${reservation.email}<br>
        Cours : ${reservation.cours}<br>
        Date : ${reservation.date}<br>
        Personnes : ${reservation.personnes}
    `;
    
    prixDiv.innerHTML = `<strong>Prix total : ${reservation.prix}€</strong>`;
    
    // Afficher le message
    messageDiv.style.display = 'block';
    
    // Mettre à jour la liste des réservations
    afficherDerniereReservation();
    
    // Réinitialiser le formulaire (optionnel)
    document.getElementById('formReservation').reset();
}

// 5. Fonction pour fermer le message
function fermerMessage() {
    document.getElementById('messageConfirmation').style.display = 'none';
}

// 6. Afficher la dernière réservation
function afficherDerniereReservation() {
    if (reservations.length === 0) return;
    
    var derniere = reservations[reservations.length - 1];
    var listeDiv = document.getElementById('listeReservations');
    
    listeDiv.innerHTML = `
        <div class="reservation-item">
            <h4>📌 Dernière réservation</h4>
            <p><strong>Nom :</strong> ${derniere.nom}</p>
            <p><strong>Cours :</strong> ${derniere.cours}</p>
            <p><strong>Date :</strong> ${derniere.date}</p>
            <p><strong>Prix :</strong> ${derniere.prix}€</p>
            <hr>
        </div>
    `;
}

// 7. Afficher toutes les réservations
function afficherToutesReservations() {
    var listeDiv = document.getElementById('listeReservations');
    
    if (reservations.length === 0) {
        listeDiv.innerHTML = "<p>Aucune réservation pour le moment.</p>";
        return;
    }
    
    var html = "<h3>📋 Toutes les réservations (" + reservations.length + ")</h3>";
    
    for (var i = 0; i < reservations.length; i++) {
        var r = reservations[i];
        html += `
            <div class="reservation-item" style="background: #f8f9fa; padding: 10px; margin: 10px 0; border-radius: 5px;">
                <p><strong>#${i+1}</strong> - ${r.nom} (${r.email})</p>
                <p>Cours : ${r.cours} - Date : ${r.date}</p>
                <p>Personnes : ${r.personnes} - Prix : ${r.prix}€</p>
                <p><small>Réservé le : ${r.timestamp}</small></p>
            </div>
        `;
    }
    
    listeDiv.innerHTML = html;
}

// 8. Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    console.log("🏄 Site de surf chargé avec succès !");
    
    // Définir la date minimale à aujourd'hui
    var aujourdhui = new Date().toISOString().split('T')[0];
    document.getElementById('date').min = aujourdhui;
    
    // Message de bienvenue
    console.log("Bienvenue à l'École de Surf 'La Vague' !");
});
