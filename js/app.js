let p = {
    teclas: document.querySelectorAll("#calculadora ul li"),
    accion: null,
    digito: null,
    operaciones: document.querySelector("#operaciones"),
    borrar: document.querySelector("#borrar"),
    cantisigno: 0,
    cantdecimal: false,
    resultado: false,
    potencia: false,
    basePotencia: 0
};

let m = {

    inicio: function () {

        for (let i = 0; i < p.teclas.length; i++) {

            p.teclas[i].addEventListener("click", m.oprimirtecla);

        }

        p.borrar.addEventListener("click", m.borrarcalculadora);

        
        document.addEventListener("keydown", m.teclado);

    },

    oprimirtecla: function (tecla) {

        p.accion = tecla.target.getAttribute("class");
        p.digito = tecla.target.innerHTML;

        m.calculadora(p.accion);

    },

    
    teclado: function (evento) {

        let tecla = evento.key;

        
        if (!isNaN(tecla)) {

            p.digito = tecla;
            m.calculadora("numero");

        }

        
        else if (tecla == "+" || tecla == "-" || tecla == "*" || tecla == "/") {

            p.digito = tecla;
            m.calculadora("simbolo");

        }

        
        else if (tecla == ".") {

            p.digito = tecla;
            m.calculadora("decimal");

        }

        
        else if (tecla == "Enter") {

            m.calculadora("igual");

        }

        
        else if (tecla == "Backspace") {

            m.borrarcalculadora();

        }

    },

    calculadora: function (accion) {

        switch (accion) {

            case "numero":

                p.cantisigno = 0;

                if (p.resultado) {

                    p.resultado = false;
                    p.operaciones.innerHTML = p.digito;

                } else {

                    if (p.operaciones.innerHTML == 0) {

                        p.operaciones.innerHTML = p.digito;

                    } else {

                        p.operaciones.innerHTML += p.digito;

                    }

                }

            break;

            case "simbolo":

                p.cantisigno++;

                if (p.cantisigno == 1) {

                    if (p.operaciones.innerHTML != 0) {

                        p.operaciones.innerHTML += p.digito;

                        p.cantdecimal = false;

                    }

                }

            break;

            case "decimal":

                if (!p.cantdecimal) {

                    p.operaciones.innerHTML += p.digito;

                    p.cantdecimal = true;

                }

            break;

            case "cientifico":

                let numero = parseFloat(p.operaciones.innerHTML);

                
                if (p.digito == "√") {

                    if (numero >= 0) {

                        p.operaciones.innerHTML = Math.sqrt(numero);

                    } else {

                        p.operaciones.innerHTML = "Error";

                    }

                    p.resultado = true;

                }

                
                else if (p.digito == "sin") {

                    let radianes = numero * (Math.PI / 180);

                    p.operaciones.innerHTML = Math.sin(radianes).toFixed(8);

                    p.resultado = true;

                }

                
                else if (p.digito == "cos") {

                    let radianes = numero * (Math.PI / 180);

                    p.operaciones.innerHTML = Math.cos(radianes).toFixed(8);

                    p.resultado = true;

                }

                else if (p.digito == "^") {

                    p.basePotencia = parseFloat(p.operaciones.innerHTML);

                    p.operaciones.innerHTML += "^";

                    p.potencia = true;

                }

            break;

            case "igual":

                
                if (p.potencia) {

                    let partes = p.operaciones.innerHTML.split("^");

                    let exponente = parseInt(partes[1]);

                    let resultado = 1;

                    for (let i = 0; i < exponente; i++) {

                        resultado = resultado * p.basePotencia;

                    }

                    p.operaciones.innerHTML = resultado;

                    p.potencia = false;

                } else {

                    let resultado = eval(p.operaciones.innerHTML);

                    
                    if (resultado == Infinity || resultado == -Infinity) {

                        p.operaciones.innerHTML = "Error";

                    } else {

                        p.operaciones.innerHTML = resultado;

                    }

                }

                p.resultado = true;

            break;
        }

    },

    borrarcalculadora: function () {

        p.operaciones.innerHTML = 0;

    }

};

m.inicio();