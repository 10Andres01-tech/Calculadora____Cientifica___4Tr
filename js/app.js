let p = {
    teclas: document.querySelectorAll("#calculadora ul li"),
    accion: null,
    digito: null,
    operaciones: document.querySelector("#operaciones"),
    borrar: document.querySelector("#borrar"),
    cantisigno: 0,
    cantdecimal: false,
    resultado: false
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

            case "igual":

                p.operaciones.innerHTML = eval(p.operaciones.innerHTML);

                p.resultado = true;

            break;
        }

    },

    borrarcalculadora: function () {

        p.operaciones.innerHTML = 0;

    }

};

m.inicio();