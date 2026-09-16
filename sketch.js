const printerConnection = 'ws://10.21.3.49:8080' // WebSocket-Adresse des Druckers
const printerWidth = 512  // Breite/Höhe des Druckbereichs (quadratisches Canvas)
let socket;                // WebSocket-Objekt
let printerState = 'not ok' // Statusanzeige der Verbindung
let img                     // Reserviert für Bilddaten (derzeit ungenutzt)
let txt = "ZHDK"            // Text, der auf dem Canvas angezeigt wird
let count = 0               // Zähler für Buchstabenanzeige

// Asynchrone Funktion zum Senden eines Frames an den Drucker
async function sendFrame(cut) {
  cut = cut || false       // Standard: kein Schnitt nach dem Drucken

  // Promise, das auf die Antwort vom Server wartet
  return new Promise((resolve, reject) => {

    // Event-Listener für einmalige Server-Antwort
    const handler = (event) => {
      socket.removeEventListener('message', handler) // Listener wieder entfernen

      if (event.data == 'ok') {
        if (cut) socket.send('cut') // Optional: Schneidbefehl senden
        resolve(event.data)         // Server bestätigt erfolgreich
      } else {
        reject(event.data)          // Server meldet Fehler
      }
    }

    socket.addEventListener('message', handler) // Listener registrieren

    // Canvas in PNG konvertieren und als Binärdaten senden
    canvas.toBlob(blob => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        try {
          socket.send(blob) // Frame als Binary senden
        } catch (e) {
          reject('socket error') // Fehler beim Senden
        }
      }
    }, "image/png");  
  })
}

// Setup-Funktion: wird einmalig beim Start ausgeführt
function setup() {
  createCanvas(printerWidth, printerWidth) // Quadratisches Canvas erstellen
  noSmooth()                               // Kantenglättung deaktivieren
  pixelDensity(1)                          // Pixeldichte auf 1 setzen
  textSize(printerWidth)                    // Textgröße auf Canvas-Breite setzen

  // WebSocket-Verbindung zum Drucker erstellen
  socket = new WebSocket(printerConnection)

  // Event-Handler: Verbindung erfolgreich
  socket.onopen = () => {
    displayState = 'Connected to printer'
  }

  // Event-Handler: Fehler
  socket.onerror = () => {
    displayState = `WebSocket Error`
  }

  // Event-Handler: Verbindung geschlossen
  socket.onclose = () => {
    console.log("Connection closed")
  }
}

// Draw-Funktion: wird kontinuierlich ausgeführt
function draw() {
  background(255) // Hintergrund weiß

  // Rechteckrahmen und diagonale Linien
  noFill()
  strokeWeight(4)
  rect(2,2,width-4, height-4) // Rahmen
  line(0,0,width,height)      // Diagonale von oben links nach unten rechts
  line(0,height,width,0)      // Diagonale von unten links nach oben rechts

  // Mehrere konzentrische Kreise
  circle(width * .5, height * .5, width * .25)
  circle(width * .5, height * .5, width * .5)
  circle(width * .5, height * .5, width * .75)
  circle(width * .5, height * .5, width)

  // Text in der unteren linken Ecke
  fill(0,0,0) // Schwarz
  text(txt[count % 4], width * .14, height * .87)
}

// Event: Mausklick
function mousePressed() {
  count++ // Zähler erhöhen
  setTimeout(async () => {
    await sendFrame(true) // Frame an Drucker senden und optional schneiden
  }, 100)
}