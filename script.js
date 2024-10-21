const bannerSwiper = new Swiper('.banner-swiper-container', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
        el: '.banner-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.banner-button-next',
        prevEl: '.banner-button-prev',
    },
});

function getSlidesPerView() {
    if (window.innerWidth < 768) {
        return 1; 
    } else if (window.innerWidth < 1024) {
        return 2; 
    } else {
        return 3; 
    }
}

const servicesSwiper = new Swiper('.services-swiper-container', {
    loop: true,
    slidesPerView: getSlidesPerView(),
    spaceBetween: 30,
    pagination: {
        el: '.services-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.services-button-next',
        prevEl: '.services-button-prev',
    },
});

window.addEventListener('resize', function() {
    servicesSwiper.params.slidesPerView = getSlidesPerView();
    servicesSwiper.update();
});

AOS.init();

function loadTestimonials() {
    console.log('Carregando depoimentos...');
    fetch('https://randomuser.me/api/?nat=BR&results=7') 
        .then(response => response.json())
        .then(data => {
            const testimonialsContainer = document.querySelector('.testimonials-container');
            testimonialsContainer.innerHTML = ''; 

            const testimonials = [
                "Ótimo atendimento, recomendo!",
                "Fiquei muito satisfeito com o serviço.",
                "A experiência foi incrível, voltarei com certeza!",
                "Serviço rápido e eficiente, adorei!",
                "Atendimento excepcional, superou minhas expectativas!",
                "Produto de qualidade, muito feliz com a compra!",
                "A equipe foi muito atenciosa e prestativa!"
            ];

            const shuffledTestimonials = testimonials.sort(() => 0.5 - Math.random());
            const numberOfTestimonials = Math.min(data.results.length, shuffledTestimonials.length);

            data.results.forEach((user, index) => {
                if (index < numberOfTestimonials) {
                    const testimonialCard = `
                        <div class="testimonial" data-aos="fade-up">
                            <img src="${user.picture.large}" alt="${user.name.first}">
                            <h4>${user.name.first} ${user.name.last}</h4>
                            <p>"${shuffledTestimonials[index]}"</p>
                        </div>
                    `;
                    testimonialsContainer.innerHTML += testimonialCard; 
                }
            });
        })
        .catch(error => {
            console.log('Erro ao carregar os depoimentos:', error);
            const testimonialsContainer = document.querySelector('.testimonials-container');
            testimonialsContainer.innerHTML = '<p>Erro ao carregar os depoimentos. Tente novamente mais tarde.</p>';
        });
}

document.addEventListener('DOMContentLoaded', function () {
    loadTestimonials(); 
});

document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        emailjs.send('service_eph0tx8', 'template_zna094c', {
            name: name,
            email: email,
            message: message
        }).then(() => {
            alert('Mensagem enviada com sucesso!');
            document.getElementById('contact-form').reset();
        }).catch((error) => {
            alert('Erro ao enviar mensagem: ' + error);
        });
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('nav ul');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
