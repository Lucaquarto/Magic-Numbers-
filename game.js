// Funzione per generare un numero intero casuale tra min e max
function generateRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min; // Calcola un numero casuale tra min e max
}

// Funzione per sanitizzare l'input dell'utente (rimuove gli spazi e converte in numero)
function sanitizeInput(input) {
    return parseInt(input.trim()); // Rimuove spazi e converte l'input in un numero intero
}

// Classe principale del gioco
class GuessGame {
    constructor() {
        // Imposta il numero da indovinare (casuale tra 1 e 100)
        this.targetNumber = generateRandomInteger(1, 100);
        this.attempts = 5; // Numero massimo di tentativi
        this.gameOver = false; // Stato del gioco, se è finito o meno
        console.log("Numero da indovinare:", this.targetNumber); // Per il debug, mostriamo il numero da indovinare (da rimuovere in produzione)
        
        // Seleziona gli elementi del DOM che verranno usati per interagire con l'utente
        this.guessInput = document.querySelector('#userGuess'); // Campo di input dove l'utente inserisce il suo numero
        this.submitButton = document.querySelector('#submitGuess'); // Bottone per inviare il tentativo
        this.messageDiv = document.querySelector('#message'); // Div dove vengono mostrati i messaggi (vinto, troppo alto/basso, etc.)
        this.attemptsDiv = document.querySelector('#attempts-message'); // Div per mostrare quanti tentativi restano

        // Aggiungi l'evento per il click sul bottone per inviare il tentativo
        this.submitButton.addEventListener('click', () => {
            this.makeGuess(); // Esegui il metodo makeGuess quando l'utente clicca sul bottone
        });

        // Aggiungi l'evento per premere "Enter" sulla tastiera per inviare il tentativo
        this.guessInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.makeGuess(); // Se viene premuto "Enter", esegui makeGuess
            }
        });
    }

    // Metodo per gestire il tentativo dell'utente
    makeGuess() {
        // Se il gioco è finito (gameOver è true), non fare nulla
        if (this.gameOver) return;

        // Sanitizza l'input dell'utente per ottenere un numero valido
        const userGuess = sanitizeInput(this.guessInput.value);
        
        // Controlla se l'input non è un numero o è fuori dal range (1-100)
        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            this.showMessage('Per favore inserisci un numero valido tra 1 e 100'); // Mostra un messaggio d'errore
            return; // Esce dalla funzione se il numero non è valido
        }

        // Riduci il numero di tentativi disponibili
        this.attempts--;

        // Controlla se l'utente ha indovinato il numero
        if (userGuess === this.targetNumber) {
            this.showMessage('Hai vinto!'); // Mostra il messaggio di vittoria
            this.endGame(); // Termina il gioco
        } else if (this.attempts === 0) {
            this.showMessage(`Game Over! Il numero era ${this.targetNumber}`); // Mostra il messaggio di fine gioco
            this.endGame(); // Termina il gioco
        } else {
            // Se il numero è troppo alto o troppo basso, mostra il messaggio corrispondente
            if (userGuess > this.targetNumber) {
                this.showMessage('Troppo alto, prova un numero più basso!');
            } else {
                this.showMessage('Troppo basso, prova un numero più alto!');
            }

            // Mostra il numero di tentativi rimasti
            this.attemptsDiv.textContent = `Hai ancora ${this.attempts} tentativi`;
        }

        // Pulisce il campo di input e gli dà il focus per il prossimo tentativo
        this.guessInput.value = '';
        this.guessInput.focus();
    }

    // Metodo per mostrare un messaggio all'utente
    showMessage(text) {
        this.messageDiv.textContent = text; // Imposta il contenuto del div con il messaggio
    }

    // Metodo per terminare il gioco (disabilita il bottone e aggiorna lo stato del gioco)
    endGame() {
        this.gameOver = true; // Imposta lo stato del gioco su "finito"
        this.submitButton.disabled = true; // Disabilita il bottone per evitare ulteriori tentativi
    }
}

// Aspetta che il DOM sia completamente caricato prima di avviare il gioco
document.addEventListener('DOMContentLoaded', () => {
    new GuessGame(); // Crea una nuova istanza del gioco e lo avvia
});
