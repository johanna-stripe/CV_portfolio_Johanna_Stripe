//DECLARATIONS
const nav = document.querySelector('nav')
const menuBurger = document.querySelector('.menu-burger')
const menuList = document.querySelector('.menu-list')

//PORTFOLIO
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
function closeMenu() {
    menuList.classList.remove('menu-open')
    menuBurger.classList.remove('burger-open')
    menuBurger.setAttribute('aria-expanded', 'false')
    menuBurger.setAttribute('aria-label', 'Ouvrir le menu')
}

let scrollPositionBeforeOpen = 0

function openPortfolio(portfolio, aside, btnEnSavoirPlus, ...otherPortfolios) {
    // on sauvegarde la position sur la page AVANT tout changement de layout
    scrollPositionBeforeOpen = window.scrollY
    aside.classList.add('open')
    aside.scrollTop = 0
    const closeBtn = aside.querySelector('button[class^="aside-close"]')
    if (closeBtn) closeBtn.focus({preventScroll: true})
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
    portfolio.focus({preventScroll: true})
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
    const isOpen = menuList.classList.toggle('menu-open')
    menuBurger.classList.toggle('burger-open', isOpen)
    menuBurger.setAttribute('aria-expanded', isOpen)
    menuBurger.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu')
})

// repasse en menu horizontal : on referme le menu burger
window.matchMedia('(min-width: 993px)').addEventListener('change', (e) => {
    if (e.matches) closeMenu()
})

// Les liens d'ancre font défiler la page (CSS : scroll-behavior) ; on referme juste le menu
document.querySelectorAll('.menu-list a, .logo-and-name').forEach((link) => {
    link.addEventListener('click', closeMenu)
})
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuList.classList.contains('menu-open')) {
        closeMenu()
        menuBurger.focus()
    }
})

//******************NAV BACKGROUND AU SCROLL********************
window.addEventListener('scroll', () => {
    nav.classList.toggle('nav-scrolled', window.scrollY > 0)
}, {passive: true})


//******************PORTFOLIO (cartes -> détail)***************************
const cards = [portfolio1, portfolio2, portfolio3, portfolio4, portfolio5, portfolio6]
const detailParts = cards.map((card, i) => ({
    card,
    aside: document.querySelector('.aside-' + (i + 1)),
    close: document.querySelector('.aside-close-' + (i + 1)),
    more: document.querySelector('.en-savoir-plus-' + (i + 1)),
    others: cards.filter((c) => c !== card)
}))

detailParts.forEach(({card, aside, close, more, others}) => {
    // la carte est utilisable au clavier
    card.setAttribute('role', 'button')
    card.setAttribute('tabindex', '0')

    card.addEventListener('click', () => {
        if (!aside.classList.contains('open')) openPortfolio(card, aside, more, ...others)
    })
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            card.click()
        }
    })
    close.addEventListener('click', () => closePortfolio(card, aside, more, ...others))
    document.addEventListener('click', (e) => closeExternalClick(card, aside, more, e, ...others))
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && aside.classList.contains('open')) closePortfolio(card, aside, more, ...others)
    })
})
