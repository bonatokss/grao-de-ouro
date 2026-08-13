// ==============================
// CADASTRO
// ==============================

const formCadastro = document.getElementById("formCadastro");

if (formCadastro) {

    formCadastro.addEventListener("submit", function(event) {

        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefone = document.getElementById("telefone").value.trim();
        const cidade = document.getElementById("cidade").value.trim();
        const propriedade = document.getElementById("propriedade").value.trim();
        const tipo = document.getElementById("tipo").value;
        const area = document.getElementById("area").value.trim();

        const senha = document.getElementById("senha").value;
        const confirmarSenha = document.getElementById("confirmarSenha").value;


        // Verifica se as senhas são iguais

        if (senha !== confirmarSenha) {

            alert("As senhas não são iguais.");

            return;
        }


        // Verifica se já existe um cadastro

        const cadastroExistente =
            localStorage.getItem("graoDouradoUsuario");

        if (cadastroExistente) {

            const confirmar =
                confirm(
                    "Já existe um cadastro neste navegador.\n\n" +
                    "Deseja substituir o cadastro atual?"
                );

            if (!confirmar) {
                return;
            }
        }


        // Cria o objeto do usuário

        const usuario = {

            nome: nome,
            email: email,
            telefone: telefone,
            cidade: cidade,
            propriedade: propriedade,
            tipo: tipo,
            area: area,
            senha: senha,

            dataCadastro:
                new Date().toLocaleString("pt-BR")

        };


        // Salva o usuário no navegador

        localStorage.setItem(
            "graoDouradoUsuario",
            JSON.stringify(usuario)
        );


        // Cria sessão

        localStorage.setItem(
            "graoDouradoLogado",
            "true"
        );


        alert(
            "Cadastro realizado com sucesso, " +
            nome +
            "!"
        );


        // Vai para o painel

        window.location.href = "painel.html";

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

        let valor =
            this.value.replace(/\D/g, "");


        if (valor.length > 11) {

            valor =
                valor.substring(0, 11);

        }


        if (valor.length <= 10) {

            valor =
                valor.replace(
                    /^(\d{2})(\d{4})(\d{0,4})/,
                    "($1) $2-$3"
                );

        } else {

            valor =
                valor.replace(
                    /^(\d{2})(\d{5})(\d{0,4})/,
                    "($1) $2-$3"
                );

        }


        this.value = valor;

    });

}

// ==============================
// PAINEL DO USUÁRIO
// ==============================

const paginaPainel =
    window.location.pathname.split("/").pop();

if (paginaPainel === "painel.html") {

    const usuarioSalvo =
        localStorage.getItem("graoDouradoUsuario");

    const usuarioLogado =
        localStorage.getItem("graoDouradoLogado");


    // Se não houver usuário, volta para cadastro

    if (!usuarioSalvo || usuarioLogado !== "true") {

        alert(
            "Você precisa criar uma conta primeiro."
        );

        window.location.href =
            "cadastro.html";

    } else {

        const usuario =
            JSON.parse(usuarioSalvo);


        // Nome no topo

        const nomeUsuario =
            document.getElementById("nomeUsuario");

        if (nomeUsuario) {

            nomeUsuario.textContent =
                usuario.nome.split(" ")[0];

        }


        // Informações do perfil

        document.getElementById("perfilNome")
            .textContent = usuario.nome;

        document.getElementById("perfilEmail")
            .textContent = usuario.email;

        document.getElementById("perfilTelefone")
            .textContent = usuario.telefone;

        document.getElementById("perfilCidade")
            .textContent = usuario.cidade;

        document.getElementById("perfilTipo")
            .textContent = usuario.tipo;


        // Informações da propriedade

        document.getElementById("perfilPropriedade")
            .textContent =
            usuario.propriedade ||
            "Não informada";

        document.getElementById("perfilArea")
            .textContent =
            usuario.area ||
            "Não informada";


        // Cidade no clima

        const cidadeClima =
            document.getElementById("cidadeClima");

        if (cidadeClima) {

            cidadeClima.textContent =
                usuario.cidade;

        }


        // Data do cadastro

        const dataCadastro =
            document.getElementById("dataCadastro");

        if (dataCadastro) {

            dataCadastro.textContent =
                usuario.dataCadastro;

        }

    }


    // ==============================
    // BOTÃO SAIR
    // ==============================

    const btnSair =
        document.getElementById("btnSair");

    if (btnSair) {

        btnSair.addEventListener(
            "click",
            function() {

                const confirmar =
                    confirm(
                        "Deseja realmente sair da sua conta?"
                    );

                if (!confirmar) {
                    return;
                }


                localStorage.removeItem(
                    "graoDouradoLogado"
                );


                window.location.href =
                    "index.html";

            }
        );

    }

}

// ==============================
// CLIMA REAL - RIBEIRÃO CLARO
// ==============================

async function carregarClima() {

    // Coordenadas de Ribeirão Claro - PR
    const latitude = -23.1936;
    const longitude = -49.7597;

    const url =
        `https://api.open-meteo.com/v1/forecast?` +
        `latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
        `&timezone=America%2FSao_Paulo` +
        `&forecast_days=4`;

    try {

        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar clima");
        }

        const dados = await resposta.json();


        // ==============================
        // CLIMA ATUAL
        // ==============================

        const temperatura =
            document.getElementById("temperatura");

        const condicao =
            document.getElementById("condicao");

        const icone =
            document.getElementById("climaIcone");


        if (temperatura) {

            temperatura.textContent =
                Math.round(
                    dados.current.temperature_2m
                ) + "°C";

        }


        if (condicao) {

            condicao.textContent =
                traduzirClima(
                    dados.current.weather_code
                );

        }


        if (icone) {

            icone.textContent =
                iconeClima(
                    dados.current.weather_code
                );

        }


        // ==============================
        // PREVISÃO
        // ==============================

        const dias = [
            "hoje",
            "amanha",
            "depois",
            "dia3"
        ];


        dias.forEach(function(id, index) {

            const elemento =
                document.getElementById(id);

            if (!elemento) return;


            const maxima =
                Math.round(
                    dados.daily.temperature_2m_max[index]
                );

            const minima =
                Math.round(
                    dados.daily.temperature_2m_min[index]
                );

            const chuva =
                dados.daily.precipitation_probability_max[index];


            elemento.textContent =
                `${minima}° / ${maxima}° 🌧️ ${chuva}%`;

        });


    } catch (erro) {

        console.error(
            "Erro ao carregar clima:",
            erro
        );


        const condicao =
            document.getElementById("condicao");

        if (condicao) {

            condicao.textContent =
                "Não foi possível carregar o clima.";

        }

    }

}


// ==============================
// TRADUZIR CÓDIGO DO CLIMA
// ==============================

function traduzirClima(codigo) {

    if (codigo === 0) {
        return "Céu limpo";
    }

    if (codigo === 1 ||
        codigo === 2 ||
        codigo === 3) {

        return "Parcialmente nublado";

    }

    if (codigo === 45 ||
        codigo === 48) {

        return "Neblina";

    }

    if (
        codigo >= 51 &&
        codigo <= 57
    ) {

        return "Chuvisco";

    }

    if (
        codigo >= 61 &&
        codigo <= 67
    ) {

        return "Chuva";

    }

    if (
        codigo >= 71 &&
        codigo <= 77
    ) {

        return "Neve";

    }

    if (
        codigo >= 80 &&
        codigo <= 82
    ) {

        return "Pancadas de chuva";

    }

    if (
        codigo >= 95 &&
        codigo <= 99
    ) {

        return "Trovoada";

    }

    return "Condição desconhecida";

}


// ==============================
// ÍCONE DO CLIMA
// ==============================

function iconeClima(codigo) {

    if (codigo === 0) {
        return "☀️";
    }

    if (
        codigo >= 1 &&
        codigo <= 3
    ) {

        return "🌤️";

    }

    if (
        codigo === 45 ||
        codigo === 48
    ) {

        return "🌫️";

    }

    if (
        codigo >= 51 &&
        codigo <= 67
    ) {

        return "🌧️";

    }

    if (
        codigo >= 80 &&
        codigo <= 82
    ) {

        return "🌦️";

    }

    if (
        codigo >= 95
    ) {

        return "⛈️";

    }

    return "🌦️";

}


// ==============================
// INICIAR CLIMA
// ==============================

if (
    document.getElementById("temperatura")
) {

    carregarClima();

}