const canvas = document.getElementById("canvas"); // Obtiene un elemento HTML con id "canvas" 
const ctx = canvas.getContext('2d'); // Crea un contexto de dibujo en 2D en el elemento canvas

canvas.width = window.innerWidth; // Establece el ancho del canvas en la anchura de la ventana del navegador
canvas.height = window.innerHeight; // Establece la altura del canvas en la altura de la ventana del navegador

const arrayCaracteres = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
    "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s",
    "t", "u", "v", "w", "x", "y", "z", "£", "¥", "§",
    "¤","€","$","±","µ","Ø","×","≥","Æ","☠"
]; // Matriz de caracteres que serán utilizados en la animación

const codigoArray = []; // Matriz vacía para almacenar objetos 
const conteoCodigo = 100; // Constante que representa la cantidad de objetos "Matrix" que se crearán
const fontSize = 18; // Tamaño de la fuente para lo caracteres
const numeroColumna = canvas.width / fontSize; // Constante que representa el número de columnas que caben en el canvas basándose en el tamaño de la fuente
let frame = 0; // Variable para contar el número de frames en la animación

// Clase que representa un objeto "Matrix", con un constructor que recibe la posición x e y, y un método para dibujar el objeto en el canvas
class Matrix {
    constructor(x, y) {
        this.y = y
        this.x = x
    }

    dibujar(ctx) {

        this.valor = arrayCaracteres[Math.floor(Math.random() * (arrayCaracteres.length - 1))].toUpperCase() // Asigna un valor aleatorio de un carácter de "arrayCaracteres" en mayúscula
        this.velocidad = Math.random() * fontSize * 3 / 4 + fontSize * 3 / 4 // Asigna un valor aleatorio que será usado para mover la posición vertical del texto.

        ctx.fillStyle = "rgba(0,255,0)" // Establece el color de relleno de la fuente en verde
        ctx.font = fontSize + "px comic-sans" // Establece el tamaño y tipo de fuente como "comic-sans" con tamaño 18px
        ctx.fillText(this.valor, this.x, this.y) // Dibuja el texto con las propiedades previamente establecidas en las coordenadas (x, y)

        this.y += this.velocidad // aumenta la posición vertical del texto según la velocidad previamente establecida

        // Si this.y es mayor a la altura de canvas, se re-calculan las coordenadas x e y y la velocidad se vuelve a asignar.
        if (this.y > canvas.height) {
            this.x = Math.floor((Math.random() * numeroColumna) * fontSize)
            this.y = 0
            this.velocidad = (-Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4

        }
    }
}

// Se define una función "actualizar" que se ejecuta en un bucle para actualizar la animación
let actualizar = () => {
    if (codigoArray.length < conteoCodigo) { // Se comprueba si la cantidad de objetos "Matrix" es menor que la cantidad definida en "conteoCodigo"
        let matrix = new Matrix(Math.floor(Math.random() * numeroColumna) * fontSize, 0) // Se crea un nuevo objeto "Matrix" con posición x e y aleatorias
        codigoArray.push(matrix) //  Se agrega el nuevo objeto "Matrix" a la matriz "codigoArray"
    }
    ctx.fillStyle = "rgba(0,0,0,0.05)" // Se establece el color y la transparencia para rellenar el canvas
    ctx.fillRect(0, 0, canvas.width, canvas.height) // Se dibuja un rectángulo en el canvas para cubrirlo y crear un efecto de fundido

    // solo se dibujara cada segundo caracter
    for (let i = 0; i < codigoArray.length && frame % 2 == 0; i++) {
        codigoArray[i].dibujar(ctx) // Invoca el método dibujar de cada elemento del arreglo codigoArray, que se encarga de mostrar en pantalla cada caracter en el canvas
    }

    requestAnimationFrame(actualizar) // Llama a la función actualizar en cada frame, para mantener la animación continua
    frame++ // Aumenta en uno el valor de la variable frame en cada iteración del bucle
}

actualizar(); // Una llamada a la función actualizar. Esta función se encarga de iniciar la animación y mantenerla actualizada