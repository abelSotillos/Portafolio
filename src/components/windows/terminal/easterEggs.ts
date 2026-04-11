// easterEggs.ts — Easter eggs and sudo handling

const fortunes = [
  "Un buen desarrollador copia. Un gran desarrollador pega.",
  "Hay 10 tipos de personas: las que entienden binario y las que no.",
  "La mejor documentación es el código que no necesita documentación.",
  "git commit -m 'arreglado' — Narrador: no estaba arreglado.",
  "El café es solo una excusa para hacer debug con los ojos abiertos.",
  "En producción funciona. No preguntes cómo.",
  "Si funciona, no lo toques. Si no funciona, tampoco.",
  "Siempre programa como si el tipo que va a mantener tu código fuera un psicópata que sabe dónde vives.",
  "Las 3 virtudes de un programador: pereza, impaciencia y orgullo.",
  "99 bugs en el código, arregla uno... 127 bugs en el código.",
  "No es un bug, es una feature no documentada.",
  "Hay dos cosas difíciles en informática: invalidar cachés, nombrar cosas y los off-by-one errors.",
  "Un QA entra en un bar. Pide 1 cerveza. Pide 999 cervezas. Pide -1 cervezas. Pide NULL cervezas. Pide 'DROP TABLE cervezas;'.",
];

export const easterEggs: Record<string, () => string> = {
  "sudo rm -rf /": () => "__RM_RF__",
  "rm -rf /": () => "__RM_RF__",
  "exit": () =>
    '<span class="term-cmd">¿Irte? Pero si acabas de llegar... Quédate un rato más.</span>',
  "vim": () =>
    '<span class="term-dim">Has abierto vim. Buena suerte saliendo.\n' +
    '(pista: :q! ... o cierra la pestaña, no juzgo)</span>',
  "emacs": () =>
    '<span class="term-dim">Emacs no es un editor, es un sistema operativo.\nPero aquí usamos vim. O nano. Como gente normal.</span>',
  "nano": () =>
    '<span class="term-accent">Nano: para cuando quieres editar un archivo y también salir de él.</span>',
  "cowsay": () =>
    '<span class="term-accent"> _______________\n' +
    '< Moo! Contrata a Abel >\n' +
    ' ---------------\n' +
    '        \\   ^__^\n' +
    '         \\  (oo)\\_______\n' +
    '            (__)\\       )\\/\\\n' +
    '                ||----w |\n' +
    '                ||     ||</span>',
  "sl": () =>
    '<span class="term-dim">      ====        ________                ___________\n' +
    '  _D _|  |_______/        \\__I_I_____===__|_________|__\n' +
    '   |(_)---  |   H\\________/ |   |        =|___ ___|  \n' +
    '   /     |  |   H  |  |     |   |         ||_| |_||  \n' +
    '  |      |  |   H  |__--------------------| [___] |  \n' +
    '  | ________|___H__/__|_____/[][]~\\_______|       |  \n' +
    '  |/ |   |-----------I_____I [][] []  D   |=======|__\n' +
    '🚂 Quisiste escribir \'ls\', ¿verdad?</span>',
  "hack": () =>
    '<span class="term-accent">ACCEDIENDO AL MAINFRAME...\n' +
    '████████████████████ 100%\n' +
    'DESENCRIPTANDO ARCHIVOS...\n' +
    '████████████████████ 100%\n' +
    '...\n' +
    'Acceso concedido: eres un hacker de película de los 90. Enhorabuena.</span>',
  "make me a sandwich": () =>
    '<span class="term-dim">¿Qué? Hazlo tú.</span>',
  "sudo make me a sandwich": () =>
    '<span class="term-accent">Okay. 🥪</span>',
  "fortune": () =>
    `<span class="term-cmd">${fortunes[Math.floor(Math.random() * fortunes.length)]}</span>`,
  "neofetch": () =>
    '<span class="term-accent">       ___       </span>  <span class="term-label">OS:</span> AbelOS v1.0\n' +
    '<span class="term-accent">      /   \\      </span>  <span class="term-label">Host:</span> abelsotillos.com\n' +
    '<span class="term-accent">     | ^_^ |     </span>  <span class="term-label">Uptime:</span> +25 años\n' +
    '<span class="term-accent">      \\___/      </span>  <span class="term-label">Stack:</span> Angular · Spring Boot · Astro\n' +
    '<span class="term-accent">     /|   |\\     </span>  <span class="term-label">IDE:</span> VS Code\n' +
    '<span class="term-accent">    / |   | \\    </span>  <span class="term-label">Shell:</span> portfolio-sh\n' +
    '<span class="term-accent">   •  •   •  •   </span>  <span class="term-label">Contacto:</span> abelsotillos@gmail.com',
  "python": () =>
    '<span class="term-dim">Python 3.12.0\n>>> print("Hola")\nHola\n>>> exit()\n(Esto no es Python de verdad, pero bonito intento)</span>',
  "node": () =>
    '<span class="term-dim">Welcome to Node.js v22.\n> console.log("Hola")\nHola\n> .exit\n(Aquí no hay Node, pero el gesto se aprecia)</span>',
  "docker ps": () =>
    '<span class="term-accent">CONTAINER ID   IMAGE     STATUS         NAMES\n' +
    'a1b2c3d4e5f6   astro     Up 99 years    portfolio-web\n' +
    'f6e5d4c3b2a1   nginx     Up 99 years    reverse-proxy</span>',
  "docker run": () =>
    '<span class="term-dim">No puedes ejecutar Docker dentro de una terminal simulada.\n...¿o sí? No, no puedes.</span>',
  "whoami && echo ' is awesome'": () =>
    'abel is awesome',
  "42": () =>
    '<span class="term-cmd">La respuesta a la vida, el universo y todo lo demás.</span>',
  "matrix": () =>
    '<span class="term-accent">Wake up, Neo...\nThe Matrix has you...\nFollow the white rabbit.\n\n' +
    '01001000 01101111 01101100 01100001</span>',
  "hello": () =>
    '<span class="term-accent">¡Hola! 👋 Bienvenido a mi terminal. Escribe <span class="term-cmd">help</span> para empezar.</span>',
  "hola": () =>
    '<span class="term-accent">¡Hola! 👋 Bienvenido a mi terminal. Escribe <span class="term-cmd">help</span> para empezar.</span>',
};

// ── Sudo handler with escalating messages ──

let sudoCount = 0;

export function sudoHandler(trimmed: string): string | null {
  if (!trimmed.startsWith("sudo ")) return null;

  // Allow known sudo easter eggs to pass through
  const known = ["sudo rm -rf /", "sudo make me a sandwich"];
  if (known.some(k => trimmed.toLowerCase() === k.toLowerCase())) return null;

  sudoCount++;
  const msgs = [
    "abel no está en el archivo sudoers. Se reportará este incidente.",
    "Otra vez intentando sudo... No aprenderás, ¿eh?",
    "¿Sudo? En esta terminal mando yo.",
    `Van ${sudoCount} intentos de sudo. ¿Quieres que te banee?`,
    "Última advertencia. La próxima activo el firewall.",
    `${sudoCount} intentos. Impresionante persistencia. La respuesta sigue siendo no.`,
  ];
  const msg = sudoCount <= 5 ? msgs[sudoCount - 1] : msgs[5];
  return `<span class="term-error">${msg}</span>`;
}
