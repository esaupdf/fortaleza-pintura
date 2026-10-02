
/* =========================================
   FORTALEZA PINTURAS
   FUNCIONALIDADES DO SITE
========================================= */


/* =========================================
   MENU MOBILE
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");


menuToggle.addEventListener("click", () => {

    const menuAberto = navLinks.classList.toggle("open");

    menuToggle.classList.toggle("active", menuAberto);

    menuToggle.setAttribute(
        "aria-expanded",
        String(menuAberto)
    );

    menuToggle.setAttribute(
        "aria-label",
        menuAberto ? "Fechar menu" : "Abrir menu"
    );

});


// FECHAR MENU AO CLICAR EM UM LINK

navLinks.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute("aria-label", "Abrir menu");

    });

});


// FECHAR MENU SE A TELA VOLTAR PARA DESKTOP

window.addEventListener("resize", () => {

    if (window.innerWidth > 720) {

        navLinks.classList.remove("open");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

    }

});



/* =========================================
   FILTROS DOS PROJETOS
========================================= */

const filterButtons = document.querySelectorAll(".filter-btn");

const projectCards = document.querySelectorAll(".project-card");


filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const filtro = button.dataset.filter;


        // ATUALIZAR BOTÃO ATIVO

        filterButtons.forEach((btn) => {

            btn.classList.remove("active");

        });

        button.classList.add("active");


        // MOSTRAR PROJETOS DA CATEGORIA

        projectCards.forEach((card) => {

            const categoria = card.dataset.category;

            const mostrar =
                filtro === "todos" || categoria === filtro;


            if (mostrar) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

    });

});



/* =========================================
   AMPLIAR IMAGENS DOS PROJETOS
========================================= */

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const lightboxCaption = document.getElementById("lightboxCaption");

const lightboxClose = document.getElementById("lightboxClose");

let imagemAnterior = null;


// ABRIR IMAGEM

document.querySelectorAll(".project-image").forEach((button) => {

    button.addEventListener("click", () => {

        const imagem = button.querySelector("img");

        if (!imagem) return;


        imagemAnterior = button;


        // CARREGAR IMAGEM AMPLIADA

        lightboxImage.src = imagem.src;

        lightboxImage.alt = imagem.alt;


        // UTILIZAR O TÍTULO DO PROJETO

        const titulo = button
            .closest(".project-card")
            .querySelector(".project-info h3");

        lightboxCaption.textContent = titulo
            ? titulo.textContent
            : imagem.alt;


        // MOSTRAR LIGHTBOX

        lightbox.classList.add("open");

        lightbox.setAttribute("aria-hidden", "false");

        document.body.classList.add("no-scroll");


        // FOCO NO BOTÃO DE FECHAR

        lightboxClose.focus();

    });

});


// FECHAR LIGHTBOX

function fecharLightbox() {

    if (!lightbox.classList.contains("open")) return;


    lightbox.classList.remove("open");

    lightbox.setAttribute("aria-hidden", "true");

    document.body.classList.remove("no-scroll");


    // LIMPAR IMAGEM

    lightboxImage.src = "";


    // DEVOLVER FOCO AO PROJETO

    if (imagemAnterior) {

        imagemAnterior.focus();

    }

}


// BOTÃO FECHAR

lightboxClose.addEventListener("click", fecharLightbox);


// FECHAR AO CLICAR FORA DA IMAGEM

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {

        fecharLightbox();

    }

});


// FECHAR COM ESC

document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        lightbox.classList.contains("open")
    ) {

        fecharLightbox();

    }

});



/* =========================================
   FORMULÁRIO DE ORÇAMENTO
========================================= */

const quoteForm = document.getElementById("quoteForm");

const formFeedback = document.getElementById("formFeedback");


quoteForm.addEventListener("submit", (event) => {

    // IMPEDIR RECARREGAMENTO

    event.preventDefault();


    // VALIDAR CAMPOS

    if (!quoteForm.reportValidity()) {

        return;

    }


    // CAPTURAR INFORMAÇÕES

    const nome = document
        .getElementById("nome")
        .value
        .trim();


    const telefone = document
        .getElementById("telefone")
        .value
        .trim();


    const servico = document
        .getElementById("servico")
        .value;


    const imovel = document
        .getElementById("imovel")
        .value
        .trim();



    // VALIDAR TELEFONE

    const numeroDigitado = telefone.replace(/\D/g, "");


    if (numeroDigitado.length < 10) {

        formFeedback.textContent =
            "Digite um número de telefone válido.";

        return;

    }



    // MONTAR MENSAGEM

    const mensagem =

        "Olá, Fortaleza Pinturas! Gostaria de solicitar um orçamento.\n\n" +

        "Nome: " + nome + "\n" +

        "Telefone: " + telefone + "\n" +

        "Serviço desejado: " + servico + "\n" +

        "Informações sobre o imóvel: " +

        (imovel || "Não informado");



    // WHATSAPP DA EMPRESA

    const numeroWhatsApp = "5511949664768";



    // CRIAR LINK

    const linkWhatsApp =

        "https://wa.me/" +

        numeroWhatsApp +

        "?text=" +

        encodeURIComponent(mensagem);



    // AVISAR CLIENTE

    formFeedback.textContent =
        "Abrindo o WhatsApp...";



    // ABRIR WHATSAPP

    const novaAba = window.open(
        linkWhatsApp,
        "_blank",
        "noopener,noreferrer"
    );


    // TRATAR BLOQUEIO DE POP-UP

    if (!novaAba) {

        formFeedback.textContent =
            "O navegador bloqueou a abertura. Permita pop-ups e tente novamente.";

    }

});



/* =========================================
   MÁSCARA DE TELEFONE
========================================= */

const telefoneInput = document.getElementById("telefone");


telefoneInput.addEventListener("input", () => {

    let numero = telefoneInput.value.replace(/\D/g, "");

    numero = numero.substring(0, 11);


    if (numero.length > 10) {

        numero = numero.replace(
            /^(\d{2})(\d{5})(\d{0,4})$/,
            "($1) $2-$3"
        );

    } else if (numero.length > 6) {

        numero = numero.replace(
            /^(\d{2})(\d{4})(\d{0,4})$/,
            "($1) $2-$3"
        );

    } else if (numero.length > 2) {

        numero = numero.replace(
            /^(\d{2})(\d+)/,
            "($1) $2"
        );

    } else if (numero.length > 0) {

        numero = numero.replace(
            /^(\d+)/,
            "($1"
        );

    }


    telefoneInput.value = numero;

});



/* =========================================
   ANO AUTOMÁTICO NO RODAPÉ
========================================= */

const yearElement = document.getElementById("year");

yearElement.textContent = new Date().getFullYear();



/* =========================================
   DESTAQUE DOS LINKS DE NAVEGAÇÃO
========================================= */

const secoes = document.querySelectorAll(
    "main section[id]"
);


if ("IntersectionObserver" in window) {

    const observador = new IntersectionObserver(
        (entradas) => {

            entradas.forEach((entrada) => {

                if (entrada.isIntersecting) {

                    const id = entrada.target.id;

                    navLinks.querySelectorAll(
                        "a:not(.nav-button)"
                    ).forEach((link) => {

                        if (link.getAttribute("href") === "#" + id) {

                            link.setAttribute(
                                "aria-current",
                                "location"
                            );

                        } else {

                            link.removeAttribute("aria-current");

                        }

                    });

                }

            });

        },
        {
            rootMargin: "-25% 0px -65% 0px"
        }
    );


    secoes.forEach((secao) => {

        observador.observe(secao);

    });

}