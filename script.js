// ==============================
// CADASTRO
// ==============================

const formCadastro = document.getElementById("formCadastro");

if (formCadastro) {

    formCadastro.addEventListener("submit", function(event) {

        event.preventDefault();

        const nome = document.getElementById("nome").value;

        alert(
            "Cadastro realizado com sucesso, " +
            nome +
            "!"
        );

        this.reset();
    });
}


// ==============================
// CONTATO
// ==============================

const formContato = document.getElementById("formContato");

if (formContato) {

    formContato.addEventListener("submit", function(event) {

        event.preventDefault();

        alert(
            "Mensagem enviada com sucesso!\n\n" +
            "Nossa equipe agradece o contato e " +
            "entrará em contato em breve."
        );

        this.reset();
    });
}


// ==============================
// MENU ATIVO
// ==============================

const paginaAtual =
    window.location.pathname.split("/").pop();

const linksMenu =
    document.querySelectorAll("nav a");

linksMenu.forEach(function(link) {

    const paginaLink =
        link.getAttribute("href");

    if (
        paginaLink === paginaAtual ||
        (paginaAtual === "" && paginaLink === "index.html")
    ) {
        link.classList.add("active");
    }
});


// ==============================
// MÁSCARA DE TELEFONE
// ==============================

const telefone =
    document.getElementById("telefone");

if (telefone) {

    telefone.addEventListener("input", function() {

        let valor = this.value.replace(/\D/g, "");

        if (valor.length > 11) {
            valor = valor.substring(0, 11);
        }

        if (valor.length <= 10) {

            valor = valor.replace(
                /^(\d{2})(\d{4})(\d{0,4})/,
                "($1) $2-$3"
            );

        } else {

            valor = valor.replace(
                /^(\d{2})(\d{5})(\d{0,4})/,
                "($1) $2-$3"
            );
        }

        this.value = valor;
    });
}
