// Particle Configuration and Initialization
function initParticles() {
    if (typeof tsParticles !== 'undefined') {
        // Particle configuration - modify these settings to customize
        const config = {
            particles: {
                number: {
                    value: 350  // Number of particles (try 30-100)
                },
                color: {
                    value: "#ffffff"  // Particle color (try "#ff0000" for red, "#00ff00" for green)
                },
                shape: {
                    type: "circle"  // Shape: "circle", "square", "triangle", "polygon"
                },
                opacity: {
                    value: 0.8  // Opacity: 0.1 (faint) to 1.0 (solid)
                },
                size: {
                    value: 3  // Size in pixels (try 1-10)
                },
                move: {
                    enable: true,
                    speed: 3,  // Movement speed (try 0.5-5)
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                },
                links: {
                    enable: true,  // Set to true to always show connections
                    distance: 120,  // Distance for particle-to-particle connections
                    opacity: 0.5,   // Opacity for particle-to-particle connections
                    color: "#ffffff",
                    triangles: {
                        enable: false
                    }
                }
            },
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: ["connect"]  // Multiple modes: connect and attract
                    },
                    onClick: {
                        enable: true,
                        mode: "push"  // Click to push particles away
                    }
                },
                modes: {
                    connect: {
                        distance: 15000,  // Mouse connection distance (different from particle links)
                        links: {
                            opacity: 0.9,  // Mouse connection line opacity (brighter than particle links)
                            color: "#ffffff",
                            width: 2,      // Thicker lines for mouse connections
                            blink: false   // Don't blink, show solid lines
                        }
                    },
                    attract: {
                        distance: 200,  // Attraction distance
                        duration: 0.5,  // Attraction duration
                        speed: 1,       // Attraction speed
                        factor: 1       // Attraction factor
                    },
                    push: {
                        particles_nb: 4  // Number of particles to push
                    }
                }
            }
        };
        
        tsParticles.load("tsparticles", config);
    }
}

// Initialize particles when page loads
document.addEventListener('DOMContentLoaded', initParticles);
