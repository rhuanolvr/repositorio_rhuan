
let ordem = 0;
let matriz = Array(ordem);
for (let i=0; i<matriz.length; i++) {
    matriz[i] = Array(ordem);
}
let somaNumeros = ((1 + (ordem ** 2)) * ordem) / 2 ;

document.addEventListener('DOMContentLoaded', () => {
    perguntaTam();
    ;
});

function insereTabela() {
    const tabela = document.createElement('table');
    tabela.id = 'quadradomagico';
    document.body.append(tabela);
    for (let i=0; i<ordem; i++) {
        const linha = document.createElement('tr');
        tabela.append(linha);
        for (let j=0; j<ordem; j++) {
            const celula = document.createElement('td');
            linha.append(celula);
            celula.id = `lin${i}col${j}`;
            insereInput(celula);
        }
    }
}

function perguntaTam() {
    const div = document.createElement("div");
    div.innerHTML = `
    <input class= "pergunta">  Qual proporção você deseja no seu quadrado? (3, 4 ou 5) </input> `;
    document.body.append(div);
    const input = document.querySelector('input')
    input.addEventListener('change', ()=> {
        ordem =  parseInt(input.value)
        matriz = Array(ordem)
        for (let i=0; i<matriz.length; i++) {
            matriz[i] = Array(ordem);
        }
        somaNumeros = ((1 + (ordem ** 2)) * ordem) / 2 
        insereTabela()
        div.remove()
    })
    
    
    
}

function getLinhaColuna(celula) {
    const [linha,coluna] = celula.id.split('col');
    return [linha.split('lin')[1], coluna];
}

function insereInput(celula) {
    const input = document.createElement('input');
    celula.append(input);
    input.addEventListener('change', () => {
        const valor = parseInt(input.value);
        const [linha,coluna] = getLinhaColuna(celula);
        matriz[linha][coluna] = valor;
        const quadradoCompleto = verificaMatriz();
        if (quadradoCompleto) {
            document.querySelector('#quadradomagico').classList.add('vitoria');
            document.querySelectorAll('input').forEach(input => {
                input.readOnly = true;
            });
            inserirbotoesemsg()
            
        } else {
            document.querySelector('#quadradomagico').classList.remove('vitoria');
        }
    });
}

function verificaMatriz() {
    const numerosRepetidos = verificaNumerosRepetidos();
    const numerosForaDosLimites = verificaNumerosForaDosLimites();
    const todasSomaOK = verificaSomas();
    return !numerosRepetidos && !numerosForaDosLimites && todasSomaOK;
}

function verificaSomas() {
    const diagonalPrincpalOK = verificaSomaDiagonalPrincipal();
    const diagonalSegundariaOK = verificaSomaDiagonalSecundaria();
    const todasLinhasOK = verificaSomaLinhas();
    const todasColunasOK = verificaSomaColunas();
    return diagonalPrincpalOK && diagonalSegundariaOK && todasLinhasOK && todasColunasOK;
}

function inserirbotoesemsg() {
    div = document.createElement("div");
    div.innerHTML = `
    <button onclick =  location.reload() > RESTART </button> 
    <h2> PARABÉNS! VOCÊ CONSEGUIU! <br> APERTE "RESTART" PARA JOGAR NOVAMENTE </h2>`;
    document.body.append(div);
    
}



function verificaSomaColunas() {
    let todasColunasOK = true;
    for (let j=0; j<ordem; j++) {
        todasColunasOK &= verificaSomaColuna(j);
    }
    return todasColunasOK;
}

function verificaSomaColuna(j) {
    let soma = 0;
    for (let i=0; i<ordem; i++) {
        if (matriz[i][j] == null) return false;
        soma += matriz[i][j];
    }
    if (soma != somaNumeros) {
        for (let i=0; i<ordem; i++) { 
            atribuiClasseCelula("somaerradacoluna", i, j);
        }
        return false;
    } else {
        for (let i=0; i<ordem; i++) { 
            removeClasseCelula("somaerradacoluna", i, j);
        }
    }
    return true;
}

function verificaSomaLinhas() {
    let todasLinhasOK = true;
    for (let i=0; i<ordem; i++) {
        todasLinhasOK &= verificaSomaLinha(i);
    }
    return todasLinhasOK;
}

function verificaSomaLinha(i) {
    let soma = 0;
    for (let j=0; j<ordem; j++) {
        if (matriz[i][j] == null) return false;
        soma += matriz[i][j];
    }
    if (soma != somaNumeros) {
        for (let j=0; j<ordem; j++) { 
            atribuiClasseCelula("somaerradalinha", i, j);
        }
        return false;
    } else {
        for (let j=0; j<ordem; j++) { 
            removeClasseCelula("somaerradalinha", i, j);
        }
    }
    return true;
}

function verificaSomaDiagonalSecundaria() {
    let soma = 0;
    for (let i=0; i<ordem; i++) {
        if (matriz[i][ordem-i-1] == null) return false;
        soma += matriz[i][ordem-i-1];
    }
    if (soma != somaNumeros) {
        for (let i=0; i<ordem; i++) { 
            atribuiClasseCelula("somaerradadiagonalsecundaria", i, ordem-i-1);
        }
        return false;
    } else {
        for (let i=0; i<ordem; i++) { 
            removeClasseCelula("somaerradadiagonalsecundaria", i, ordem-i-1);
        }
    }
    return true;
}

function verificaSomaDiagonalPrincipal() {
    let soma = 0;
    for (let i=0; i<ordem; i++) {
        if (matriz[i][i] == null) return false;
        soma += matriz[i][i];
    }
    if (soma != somaNumeros) {
        for (let i=0; i<ordem; i++) { 
            atribuiClasseCelula("somaerradadiagonalprincipal", i, i);
        }
        return false;
    } else {
        for (let i=0; i<ordem; i++) { 
            removeClasseCelula("somaerradadiagonalprincipal", i, i);
        }
    }
    return true;
}

function verificaNumerosForaDosLimites() {
    const minimo = 1;
    const maximo = ordem**2;
    let numerosForaDosLimites = false;
    for (let i=0; i<ordem; i++) {
        for (let j=0; j<ordem; j++) {
            if (matriz[i][j] < minimo || matriz[i][j] > maximo) {
                numerosForaDosLimites = true;
                atribuiClasseCelula('foradoslimites', i, j);
            } else {
                removeClasseCelula('foradoslimites', i, j);
            }
        }
    }
    return numerosForaDosLimites;
}

function verificaNumerosRepetidos() {
    const numeros = Array(ordem**2).fill(0);
    let numerosRepetidos = false;
    for (let i=0; i<ordem; i++) {
        for (let j=0; j<ordem; j++) {
            const valor = matriz[i][j];
            if (!isNaN(valor)) {
                numeros[valor-1]++;
            }
        }
    }
    for (let i=0; i<ordem; i++) {
        for (let j=0; j<ordem; j++) {
            const valor = matriz[i][j];
            if (!isNaN(valor) && numeros[valor-1] > 1) {
                numerosRepetidos = true;
                atribuiClasseCelula('numerosrepetidos', i, j);
            } else {
                removeClasseCelula('numerosrepetidos', i, j);
            }
        }
    }
    return numerosRepetidos;
}

function atribuiClasseCelula(classe, i, j) {
    const celula = document.querySelector(`#lin${i}col${j}`);
    celula.classList.add(classe);
}

function removeClasseCelula(classe, i, j) {
    const celula = document.querySelector(`#lin${i}col${j}`);
    celula.classList.remove(classe);
}


