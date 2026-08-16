const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const navbar = document.querySelector(".navbar");
const typingElement = document.querySelector(".typing");
const yearElement = document.querySelector("#year");
const cursor = document.querySelector(".cursor");
const cursorRing = document.querySelector(".cursor-ring");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    document.body.classList.toggle("menu-open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        document.body.classList.remove("menu-open");
    });
});

window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 30);

    const sections = document.querySelectorAll("section[id]");
    const scrollPosition = window.scrollY + 180;

    sections.forEach(section => {
        const link = document.querySelector(`.nav-links a[href="#${section.id}"]`);

        if (
            scrollPosition >= section.offsetTop &&
            scrollPosition < section.offsetTop + section.offsetHeight
        ) {
            document.querySelectorAll(".nav-links a").forEach(item => {
                item.classList.remove("active");
            });

            if (link) {
                link.classList.add("active");
            }
        }
    });
});

const words = [
    "Backend Developer",
    "Problem Solver",
    "DSA Learner",
    "ML/AI Enthusiast"
];

let wordIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeWord() {
    const currentWord = words[wordIndex];

    if (!deleting) {
        typingElement.textContent = currentWord.substring(0, characterIndex + 1);
        characterIndex++;

        if (characterIndex === currentWord.length) {
            deleting = true;
            setTimeout(typeWord, 1500);
            return;
        }

        setTimeout(typeWord, 80);
    } else {
        typingElement.textContent = currentWord.substring(0, characterIndex - 1);
        characterIndex--;

        if (characterIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        setTimeout(typeWord, 45);
    }
}

typeWord();

const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

document.querySelectorAll(".reveal").forEach(element => {
    revealObserver.observe(element);
});

const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project-card");

filters.forEach(filter => {
    filter.addEventListener("click", () => {
        filters.forEach(item => item.classList.remove("active"));
        filter.classList.add("active");

        const selected = filter.dataset.filter;

        projects.forEach(project => {
            const categories = project.dataset.category.split(" ");

            if (selected === "all" || categories.includes(selected)) {
                project.classList.remove("hidden");
            } else {
                project.classList.add("hidden");
            }
        });
    });
});

document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("mousemove", event => {
        if (window.innerWidth <= 700) return;

        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const rotateX = ((y / rect.height) - 0.5) * -3;
        const rotateY = ((x / rect.width) - 0.5) * 3;

        card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "";
    });
});

document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click", event => {
        const target = document.querySelector(link.getAttribute("href"));

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("mousemove", event => {
        cursor.style.left = `${event.clientX}px`;
        cursor.style.top = `${event.clientY}px`;

        cursorRing.style.left = `${event.clientX}px`;
        cursorRing.style.top = `${event.clientY}px`;
    });

    document.querySelectorAll("a, button, .project-card").forEach(element => {
        element.addEventListener("mouseenter", () => {
            cursorRing.style.width = "45px";
            cursorRing.style.height = "45px";
        });

        element.addEventListener("mouseleave", () => {
            cursorRing.style.width = "30px";
            cursorRing.style.height = "30px";
        });
    });
}