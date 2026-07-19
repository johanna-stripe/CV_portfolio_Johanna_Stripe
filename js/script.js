//DECLARATIONS
const body = document.querySelector('body')
const nav = document.querySelector('nav')
const logoAndName = document.querySelector('.logo-and-name')
const menuBurger = document.querySelector('.menu-burger')
const menuList = document.querySelector('.menu-list')
const about = document.querySelector('.about')
const sectionAbout = document.querySelector('.section-about')
const competences = document.querySelector('.competences')
const sectionCompetences = document.querySelector('.section-competences')
const cv = document.querySelector('.cv')
const contact = document.querySelector('.contact')
const sectionContact = document.querySelector('.section-contact')
const buttonContact = document.querySelector('.button-me-contacter')
const stage = document.querySelector('.stage')

//PORTFOLIO
const portfolio = document.querySelector('.portfolio')
const sectionPortfolio = document.querySelector('.section-portfolio')
const portfolioMother = document.querySelector('.div-portfolio-mother')
const divPortfolio = document.querySelectorAll('.div-portfolio')
const portfolioTitle = document.querySelector('.portfolio-title')

const portfolio1 = document.querySelector('.portfolio-1')
const portfolio2 = document.querySelector('.portfolio-2')
const portfolio3 = document.querySelector('.portfolio-3')
const portfolio4 = document.querySelector('.portfolio-4')
const portfolio5 = document.querySelector('.portfolio-5')
const portfolio6 = document.querySelector('.portfolio-6')

const btnEnSavoirPlus1 = document.querySelector('.en-savoir-plus-1')
const btnEnSavoirPlus2 = document.querySelector('.en-savoir-plus-2')
const btnEnSavoirPlus3 = document.querySelector('.en-savoir-plus-3')
const btnEnSavoirPlus4 = document.querySelector('.en-savoir-plus-4')
const btnEnSavoirPlus5 = document.querySelector('.en-savoir-plus-5')
const btnEnSavoirPlus6 = document.querySelector('.en-savoir-plus-6')

const aside1 = document.querySelector('.aside-1')
const aside2 = document.querySelector('.aside-2')
const aside3 = document.querySelector('.aside-3')
const aside4 = document.querySelector('.aside-4')
const aside5 = document.querySelector('.aside-5')
const aside6 = document.querySelector('.aside-6')

const buttonAsideClose1 = document.querySelector('.aside-close-1')
const buttonAsideClose2 = document.querySelector('.aside-close-2')
const buttonAsideClose3 = document.querySelector('.aside-close-3')
const buttonAsideClose4 = document.querySelector('.aside-close-4')
const buttonAsideClose5 = document.querySelector('.aside-close-5')
const buttonAsideClose6 = document.querySelector('.aside-close-6')

//RESPONSIVE
const desktop = window.matchMedia('(min-width: 1200px)');
const desktop_reduced = window.matchMedia('(min-width: 993px) and (max-width: 1199px)');
const tablette = window.matchMedia('(min-width: 769px) and (max-width: 992px)');
const mobile = window.matchMedia('(max-width: 768px)');


//=============================================================================
//========================FUNCTIONS DECLARATIONS===============================
//=============================================================================
function scrollToPoint(title, location) {
    title.addEventListener('click', () => {
        menuList.classList.remove('menu-open')
        menuBurger.classList.remove('burger-open')
        location.scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    })
}

let scrollPositionBeforeOpen = 0

function openPortfolio(portfolio, aside, btnEnSavoirPlus, ...otherPortfolios) {
    // on sauvegarde la position sur la page AVANT tout changement de layout
    scrollPositionBeforeOpen = window.scrollY
    aside.classList.add('open')
    aside.scrollTop = 0
    deleteAllPortfolio(...otherPortfolios)

    const offsetTop = portfolio.offsetTop
    aside.style.top = offsetTop + 'px'

    const asideHeight = aside.getBoundingClientRect().height
    portfolioMother.style.height = asideHeight + 'px'

    portfolioTitle.scrollIntoView({
        behavior: "smooth",
        block: "start"
    })

    if (desktop.matches) {
        portfolio.classList.add('div-portfolio-clicked')
        btnEnSavoirPlus.classList.add('en-savoir-plus-clicked')

    } else {
        portfolio.classList.add('visibility-hidden')
    }
}

function closePortfolio(portfolio, aside, btnEnSavoirPlus, ...otherPortfolios) {
    aside.classList.remove('open')
    restoreAllPortfolio(...otherPortfolios)
    aside.style.top = ''
    portfolioMother.style.height = ''
    // on revient à la position d'avant, pas au début de portfolio
    window.scrollTo({
        top: scrollPositionBeforeOpen,
        behavior: "smooth"
    })
    if (desktop.matches) {
        portfolio.classList.remove('div-portfolio-clicked')
        btnEnSavoirPlus.classList.remove('en-savoir-plus-clicked')

    } else {
        portfolio.classList.remove('visibility-hidden')
    }
}

function closeExternalClick(portfolio, aside, btnEnSavoirPlus, event, ...otherPortfolios) {
    // Si l'aside est ouvert ET que le clic n'est PAS dans l'aside
    // ET que le clic n'est PAS sur le bouton qui sert à l'ouvrir...
    if (aside.classList.contains('open') &&
        !aside.contains(event.target) &&
        !portfolio.contains(event.target))
        //event.target : Représente l'élément exact sur lequel tu viens de cliquer
        // aside1.contains(event.target) : Renvoie true si le clic a eu lieu à l'intérieur de l'aside. En mettant un !, on cible donc tout ce qui est à l'extérieur.

    {
        // ...alors on ferme l'aside !
        closePortfolio(portfolio, aside, btnEnSavoirPlus, ...otherPortfolios)
    }
}

function deleteAllPortfolio(...portfolios) {
    portfolios.forEach(portfolio => {
        portfolio.classList.remove('flex')
        portfolio.classList.add('display-none')
    })
    portfolioMother.classList.remove('flex')
}

function restoreAllPortfolio(...portfolios) {
    portfolios.forEach(portfolio => {
        portfolio.classList.add('flex')
        portfolio.classList.remove('display-none')
    })
    portfolioMother.classList.add('flex')
}


//=============================================================================
//=================================SCRIPT======================================
//=============================================================================

//******************NAV & MENU BURGER********************
menuBurger.addEventListener('click', () => {
    menuList.classList.toggle('menu-open')
    menuBurger.classList.toggle('burger-open')
})

cv.addEventListener('click', () => {
    window.open('doc/CV_Johanna_Stripe.pdf')
})

scrollToPoint(logoAndName, body);
scrollToPoint(about, stage);
scrollToPoint(competences, sectionCompetences);
scrollToPoint(portfolio, sectionPortfolio);
scrollToPoint(contact, sectionContact);
scrollToPoint(buttonContact, sectionContact);

//******************NAV BACKGROUND AU SCROLL********************
window.addEventListener('scroll', () => {
    if (desktop.matches || desktop_reduced.matches) {
        if (window.scrollY > 0) {
            nav.classList.add('nav-scrolled')
        } else {
            nav.classList.remove('nav-scrolled')
        }
    } else {
        if (window.scrollY > 0) {
            nav.classList.add('nav-scrolled')
        } else {
            nav.classList.remove('nav-scrolled')
        }
    }
})


//******************PORTFOLIO 1***************************
portfolio1.addEventListener('click', () => {
    openPortfolio(portfolio1, aside1, btnEnSavoirPlus1, portfolio2, portfolio3, portfolio4, portfolio5, portfolio6)
})

buttonAsideClose1.addEventListener('click', () => {
    closePortfolio(portfolio1, aside1, btnEnSavoirPlus1, portfolio2, portfolio3, portfolio4, portfolio5, portfolio6)
})

document.addEventListener('click', function (event) {
    closeExternalClick(portfolio1, aside1, btnEnSavoirPlus1, event, portfolio2, portfolio3, portfolio4, portfolio5, portfolio6)
})


//******************PORTFOLIO 2***************************
portfolio2.addEventListener('click', () => {
    openPortfolio(portfolio2, aside2, btnEnSavoirPlus2, portfolio1, portfolio3, portfolio4, portfolio5, portfolio6)
})

buttonAsideClose2.addEventListener('click', () => {
    closePortfolio(portfolio2, aside2, btnEnSavoirPlus2, portfolio1, portfolio3, portfolio4, portfolio5, portfolio6)
})

document.addEventListener('click', function (event) {
    closeExternalClick(portfolio2, aside2, btnEnSavoirPlus2, event, portfolio1, portfolio3, portfolio4, portfolio5, portfolio6)
})


//******************PORTFOLIO 3***************************
portfolio3.addEventListener('click', () => {
    openPortfolio(portfolio3, aside3, btnEnSavoirPlus3, portfolio1, portfolio2, portfolio4, portfolio5, portfolio6)
})

buttonAsideClose3.addEventListener('click', () => {
    closePortfolio(portfolio3, aside3, btnEnSavoirPlus3, portfolio1, portfolio2, portfolio4, portfolio5, portfolio6)
})

document.addEventListener('click', function (event) {
    closeExternalClick(portfolio3, aside3, btnEnSavoirPlus3, event, portfolio1, portfolio2, portfolio4, portfolio5, portfolio6)
})


//******************PORTFOLIO 4***************************
portfolio4.addEventListener('click', () => {
    openPortfolio(portfolio4, aside4, btnEnSavoirPlus4, portfolio1, portfolio2, portfolio3, portfolio5, portfolio6)
})

buttonAsideClose4.addEventListener('click', () => {
    closePortfolio(portfolio4, aside4, btnEnSavoirPlus4, portfolio1, portfolio2, portfolio3, portfolio5, portfolio6)
})

document.addEventListener('click', function (event) {
    closeExternalClick(portfolio4, aside4, btnEnSavoirPlus4, event, portfolio1, portfolio2, portfolio3, portfolio5, portfolio6)
})


//******************PORTFOLIO 5***************************
portfolio5.addEventListener('click', () => {
    openPortfolio(portfolio5, aside5, btnEnSavoirPlus5, portfolio1, portfolio2, portfolio3, portfolio4, portfolio6)
})

buttonAsideClose5.addEventListener('click', () => {
    closePortfolio(portfolio5, aside5, btnEnSavoirPlus5, portfolio1, portfolio2, portfolio3, portfolio4, portfolio6)
})

document.addEventListener('click', function (event) {
    closeExternalClick(portfolio5, aside5, btnEnSavoirPlus5, event, portfolio1, portfolio2, portfolio3, portfolio4, portfolio6)
})


