
        let angleY = 0;
        let angleX = 0;
        let angleZ = 0;
        let orbitAngle = 0;
        let baseRadius = 200;
        let rotationSpeed = 0.01;

        function setup() {
            let canvas = createCanvas(1200, 1200, WEBGL);
            canvas.parent('canvas-container');
            noStroke();
        }

        function draw() {
            background(26, 26, 26);


            ambientLight(60, 60, 60);
            directionalLight(255, 255, 255, -1, -1, -1.5);
            pointLight(255, 255, 255, 300, 0, 300);


            let dx = mouseX - pmouseX;
            let dy = mouseY - pmouseY;
            let sensitivity = 0.005;

            angleY += dx * sensitivity;
            angleX += dy * sensitivity;
            angleZ += (dx + dy) * sensitivity;


            let orbitRadius = baseRadius + 100 * sin(frameCount * 0.02);
            orbitAngle += rotationSpeed;

            let boxX = cos(orbitAngle) * orbitRadius;
            let boxY = sin(orbitAngle) * orbitRadius;
            let boxZ = cos(orbitAngle) * orbitRadius;

            let torusX = cos(orbitAngle + TWO_PI / 3) * orbitRadius;
            let torusY = sin(orbitAngle + TWO_PI / 3) * orbitRadius;
            let torusZ = cos(orbitAngle + TWO_PI / 3) * orbitRadius;

            let coneX = cos(orbitAngle + TWO_PI * 2 / 3) * orbitRadius;
            let coneY = sin(orbitAngle + TWO_PI * 2 / 3) * orbitRadius;
            let coneZ = cos(orbitAngle + TWO_PI * 2 / 3) * orbitRadius;


            push();
            translate(boxX, boxY, boxZ);
            rotateY(angleY);
            rotateX(angleX);
            fill(0, 197, 219);
            box(100);
            pop();

            push();
            translate(torusX, torusY, torusZ);
            rotateY(angleY);
            rotateX(angleX);
            rotateZ(angleZ);
            fill(220, 1, 121);
            torus(60, 25);
            pop();

            push();
            translate(coneX, coneY, coneZ);
            rotateX(PI);
            rotateX(angleX);
            rotateZ(angleZ);
            rotateY(angleY);
            fill(219, 192, 0);
            cone(50, 100, 40, 40);
            pop();
        }

        function windowResized() {
            if (window.innerWidth <= 480) {
                resizeCanvas(300, 250);
            } else if (window.innerWidth <= 768) {
                resizeCanvas(400, 300);
            } else {
                resizeCanvas(600, 400);
            }
        }


        function animateOnScroll() {
            const elements = document.querySelectorAll('.scroll-animate');
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('visible');
                }
            });
        }


        document.addEventListener('DOMContentLoaded', function() {

            window.addEventListener('scroll', animateOnScroll);
            animateOnScroll();
            

            window.addEventListener('scroll', function() {
                const header = document.querySelector('header');
                if (window.scrollY > 100) {
                    header.style.background = 'rgba(0, 0, 0, 0.95)';
                    header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
                } else {
                    header.style.background = 'rgba(0, 0, 0, 0.9)';
                    header.style.boxShadow = 'none';
                }
            });


            const navLinks = document.querySelectorAll('nav a[href^="#"]');
            
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        const headerHeight = document.querySelector('header').offsetHeight;
                        const targetPosition = targetSection.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        });