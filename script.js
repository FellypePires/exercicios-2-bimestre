const moeda = valor => valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const numeroPt = valor => valor.toLocaleString("pt-BR", { maximumFractionDigits: 2 });

function valor(formulario, nome) {
    return Number(new FormData(formulario).get(nome));
}

const calculos = {
    1: formulario => `Área do terreno: ${numeroPt(valor(formulario, "comprimento") * valor(formulario, "largura"))} m²`,
    2: formulario => `Serão necessárias ${valor(formulario, "cavalos") * 4} ferraduras.`,
    3: formulario => {
        const total = valor(formulario, "paes") * 0.12 + valor(formulario, "broas") * 1.5;
        return `Total arrecadado: ${moeda(total)}\nGuardar na poupança: ${moeda(total * 0.1)}`;
    },
    4: formulario => `${new FormData(formulario).get("nome").trim().toLocaleUpperCase("pt-BR")}, você já viveu ${valor(formulario, "idade") * 365} dias.`,
    5: formulario => {
        const preco = valor(formulario, "preco");
        const litros = valor(formulario, "valor") / preco;
        return `Você conseguiu colocar ${numeroPt(litros)} litros no tanque.`;
    },
    6: formulario => `Valor a pagar: ${moeda(valor(formulario, "peso") * 12)}`,
    7: formulario => `Passaram-se ${(valor(formulario, "mes") - 1) * 30 + valor(formulario, "dia")} dias desde o início do ano.`,
    8: formulario => {
        const total = valor(formulario, "pequena") * 10 + valor(formulario, "media") * 12 + valor(formulario, "grande") * 15;
        return `Valor arrecadado: ${moeda(total)}`;
    },
    9: formulario => {
        const dx = valor(formulario, "x2") - valor(formulario, "x1");
        const dy = valor(formulario, "y2") - valor(formulario, "y1");
        return `Distância entre os pontos: ${numeroPt(Math.sqrt(dx * dx + dy * dy))}`;
    },
    10: formulario => {
        const total = valor(formulario, "dias");
        const anos = Math.floor(total / 360);
        const meses = Math.floor((total % 360) / 30);
        const dias = total % 30;
        return `Tempo sem acidentes: ${anos} ano(s), ${meses} mês(es) e ${dias} dia(s).`;
    },
    11: formulario => {
        const inicial = valor(formulario, "salario");
        const comAumento = inicial * 1.15;
        const final = comAumento * 0.92;
        return `Salário inicial: ${moeda(inicial)}\nCom aumento: ${moeda(comAumento)}\nSalário final: ${moeda(final)}`;
    },
    12: formulario => {
        const numero = valor(formulario, "numero");
        const centena = Math.floor(numero / 100);
        const dezena = Math.floor((numero % 100) / 10);
        const unidade = numero % 10;
        return `CENTENA = ${centena}\nDEZENA = ${dezena}\nUNIDADE = ${unidade}`;
    },
    13: formulario => `Área da pizza: ${numeroPt(3.14 * valor(formulario, "raio") ** 2)} cm²`,
    14: formulario => {
        const centavos = Math.round(valor(formulario, "conta") * 100);
        const cota = Math.floor(centavos / 300) * 100;
        const felipe = centavos - cota * 2;
        return `Carlos paga: ${moeda(cota / 100)}\nAndré paga: ${moeda(cota / 100)}\nFelipe paga: ${moeda(felipe / 100)}`;
    }
};

document.querySelectorAll("form[data-exercicio]").forEach(formulario => {
    formulario.addEventListener("submit", evento => {
        evento.preventDefault();
        const resultado = formulario.parentElement.querySelector(".resultado");
        resultado.textContent = calculos[formulario.dataset.exercicio](formulario);
        resultado.hidden = false;
    });
});
