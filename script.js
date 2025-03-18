// Data di riferimento: 16 agosto 2023, ore 20:47
const startDate = new Date(2023, 7, 16, 20, 47, 0);

// Elementi DOM
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const millisecondsElement = document.getElementById('milliseconds');

// Valori precedenti per tenere traccia dei cambiamenti
let prevDays = 0;
let prevHours = 0;
let prevMinutes = 0;
let prevSeconds = 0;

// Aggiungi classe di animazione quando cambia un valore
function animateChange(element, prevValue, newValue) {
    if (prevValue !== newValue) {
        element.classList.add('change');
        
        // Rimuovi la classe dopo l'animazione
        setTimeout(() => {
            element.classList.remove('change');
        }, 400);
        
        // Crea scintille quando cambia un valore
        createSparkles(element);
        
        return true;
    }
    return false;
}

// Genera effetto scintilla
function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Crea diverse scintille in posizioni casuali intorno all'elemento
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            
            // Posiziona la scintilla in un punto casuale intorno all'elemento
            const angle = Math.random() * Math.PI * 2;
            const distance = 30 + Math.random() * 40;
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            
            sparkle.style.left = `${x}px`;
            sparkle.style.top = `${y}px`;
            
            document.body.appendChild(sparkle);
            
            // Animazione di comparsa e scomparsa
            requestAnimationFrame(() => {
                sparkle.style.opacity = '0.8';
                sparkle.style.transform = `scale(${0.5 + Math.random()})`;
                
                // Aggiungi animazione di movimento
                sparkle.style.transition = `all ${0.3 + Math.random() * 0.3}s ease-out`;
                
                setTimeout(() => {
                    const moveX = (Math.random() - 0.5) * 40;
                    const moveY = (Math.random() - 0.5) * 40;
                    sparkle.style.transform = `translate(${moveX}px, ${moveY}px) scale(0)`;
                    sparkle.style.opacity = '0';
                    
                    // Rimuovi l'elemento dopo l'animazione
                    setTimeout(() => {
                        document.body.removeChild(sparkle);
                    }, 800);
                }, 50);
            });
        }, i * 30);
    }
}

// Effetto sweep per millisecondi quando si aggiorna il secondo
function animateMillisecondsSweep(changed) {
    if (changed) {
        const millisContainer = document.querySelector('.milliseconds');
        millisContainer.classList.add('updating');
        
        setTimeout(() => {
            millisContainer.classList.remove('updating');
        }, 300);
    }
}

function updateTimer() {
    const now = new Date();
    const diff = now - startDate;

    // Calcolo delle unità di tempo
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    const milliseconds = Math.floor(diff % 1000);

    // Aggiorna i valori
    daysElement.textContent = days;
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
    millisecondsElement.textContent = milliseconds.toString().padStart(3, '0');

    // Aggiungi animazioni quando i valori cambiano
    const secondChanged = animateChange(secondsElement, prevSeconds, seconds);
    const minuteChanged = animateChange(minutesElement, prevMinutes, minutes);
    const hourChanged = animateChange(hoursElement, prevHours, hours);
    const dayChanged = animateChange(daysElement, prevDays, days);
    
    // Effetto sweep per i millisecondi quando cambia il secondo
    animateMillisecondsSweep(secondChanged);
    
    // Aggiorna i valori precedenti
    prevDays = days;
    prevHours = hours;
    prevMinutes = minutes;
    prevSeconds = seconds;

    // Aggiorna il titolo della pagina
    document.title = `${days}d ${hours}h ${minutes}m ${seconds}s - O&M`;
}

// Aggiorna il timer con maggiore frequenza per i millisecondi
function startTimer() {
    updateTimer(); // Aggiornamento iniziale
    setInterval(updateTimer, 50); // Buon compromesso per fluidità e performance
}

// Configura l'effetto particelle
function setupParticles() {
    if (window.particlesJS) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 50,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": ["#4f46e5", "#ec4899"]
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 0.8,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "size_min": 0.5,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#4f46e5",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 0.8,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": true,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.4
                        }
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    }
}

// Avvia il timer quando il documento è pronto
document.addEventListener('DOMContentLoaded', () => {
    startTimer();
    setupParticles();
}); 