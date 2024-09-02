function changeAboutMeText()
{
    const aboutMeTexts = ["Full Stack Web Developer", "Software Engineer", "Tech Enthusiast" ]; //texts that you want to animate.
    const typingSpeed = 100; //milisecond per character.
    const eraseSpeed = 50; //milisecond per character during erasing.
    const pauseTime = 1500; //milisecond to pause between each text change.
    const aboutMeElement = document.querySelector('.about-me');

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type()
    {
        const currentText = aboutMeTexts[textIndex];
        //Typing.
        if(!isDeleting && charIndex < currentText.length)
        {
            
            aboutMeElement.textContent += currentText[charIndex];
            charIndex++;
            setTimeout(type, typingSpeed);
            
        }

        //Erasing.
        else if (isDeleting && charIndex > 0)
        {
            aboutMeElement.textContent = currentText.substring(0, charIndex - 1);
            setTimeout(type, eraseSpeed);
            charIndex--;
            

        }    
        //Switching the deleting or typing process.
        else
        {
            isDeleting = !isDeleting;
            if(!isDeleting)
            {
                textIndex =(textIndex + 1) % aboutMeTexts.length;
            }

            setTimeout(type, pauseTime)

        }    
    }

    type();

}

// Call function to add stunning modification
changeAboutMeText(); 





//JavaScript code for page dark/light mode
document.addEventListener('DOMContentLoaded', function () {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const currentMode = body.classList.contains('dark-mode') ? 'Dark' : 'Light';
        darkModeToggle.querySelector('i').classList.toggle('fa-sun'); // Change icon
        darkModeToggle.querySelector('i').classList.toggle('fa-moon'); // Change icon
        darkModeToggle.querySelector('i').classList.toggle('light-mode'); // Change icon color
    });
});





//for progress bar animation of programming skill 
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress-bar');
                const progress = progressBar.dataset.progress;
                
                progressBar.style.setProperty('--progress',`${progress}%`); // Set custom property for progress
                progressBar.classList.add('animated'); // Add a class to trigger animation
                observer.unobserve(entry.target); // Stop observing once animation is triggered
            }
        });
    });

    const programmingLanguages = document.querySelectorAll('#programming-languages .skill');
    programmingLanguages.forEach(skill => {
        observer.observe(skill);
    });
});


//---------------------------form--------------------------------
            document.getElementById('contactForm').addEventListener('submit', function(event) {
                event.preventDefault();
        
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const message = document.getElementById('message').value;
        
                fetch('http://localhost:3000/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, email, message }),
                })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        alert('Message sent successfully!');
                    } else {
                        alert('Failed to send message. Please try again later.');
                    }
                })
                .catch(error => console.error('Error:', error));
            });
        