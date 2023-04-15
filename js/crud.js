var Fila = null
function onSubmit() {
    let DataForm = Leer();
    if (Fila == null) {
        InsertarDatos(DataForm);
        guardarDatos([DataForm.abo, DataForm.cli, DataForm.nov, DataForm.fei, DataForm.fet]);
    } else {
        Actualizar(DataForm);
        Vaciar();
    }
}
function Leer() {
    let DataForm = {}
    DataForm["abo"] = document.getElementById("abo").value
    DataForm["cli"] = document.getElementById("cli").value
    DataForm["nov"] = document.getElementById("nov").value
    DataForm["fei"] = document.getElementById("fei").value
    DataForm["fet"] = document.getElementById("fet").value
    return DataForm
}
function InsertarDatos(data) {
    let table = document.getElementById("tabla").getElementsByTagName('tbody')[0]
    let Fila = table.insertRow(table.length)
    columna1 = Fila.insertCell(0).innerHTML = data.abo
    columna2 = Fila.insertCell(1).innerHTML = data.cli
    columna3 = Fila.insertCell(2).innerHTML = data.nov
    columna4 = Fila.insertCell(3).innerHTML = data.fei
    columna5 = Fila.insertCell(4).innerHTML = data.fet
    columna6 = Fila.insertCell(5).innerHTML = `<input class="submit" type="button" onClick="Editarr(this)" value="Editar" >
                                            <input class="submit" type="button" onClick="Borrarr(this)" value="Borrar" >`
    document.getElementById("abo").focus()
    Vaciar()
}
function Vaciar() {
    document.getElementById("abo").value = ""
    document.getElementById("cli").value = ""
    document.getElementById("nov").value = ""
    document.getElementById("fei").value = ""
    document.getElementById("fet").value = ""
    Fila = null
}
function Editarr(td) {
    console.log('Editarr: inicio');
    Fila = td.parentElement.parentElement;
    document.getElementById("abo").value = Fila.cells[0].innerHTML;
    document.getElementById("cli").value = Fila.cells[1].innerHTML;
    document.getElementById("nov").value = Fila.cells[2].innerHTML;
    document.getElementById("fei").value = Fila.cells[3].innerHTML;
    document.getElementById("fet").value = Fila.cells[4].innerHTML;
    let index = Fila.rowIndex - 1;
    let newData = {
        abo: Fila.cells[0].innerHTML,
        cli: Fila.cells[1].innerHTML,
        nov: Fila.cells[2].innerHTML,
        fei: Fila.cells[3].innerHTML,
        fet: Fila.cells[4].innerHTML
    };
    console.log('Editarr: index=' + index);
    console.log('Editarr: newData=' + JSON.stringify(newData));
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'editar.php');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('data=' + JSON.stringify({index: index, newData: newData}));
    console.log('Editarr: fin');
}
function Actualizar(DataForm) {
    Fila.cells[0].innerHTML = DataForm.abo
    Fila.cells[1].innerHTML = DataForm.cli
    Fila.cells[2].innerHTML = DataForm.nov
    Fila.cells[3].innerHTML = DataForm.fei
    Fila.cells[4].innerHTML = DataForm.fet
    document.getElementById("abo").focus()
}

function onSubmit() {
    let DataForm = Leer();
    if (Fila == null) {
        InsertarDatos(DataForm);
        guardarDatos([DataForm.abo, DataForm.cli, DataForm.nov, DataForm.fei, DataForm.fet]);
    } else {
        Actualizar(DataForm);
        let index = Fila.rowIndex - 1;
        let newData = {
            abo: Fila.cells[0].innerHTML,
            cli: Fila.cells[1].innerHTML,
            nov: Fila.cells[2].innerHTML,
            fei: Fila.cells[3].innerHTML,
            fet: Fila.cells[4].innerHTML
        };
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'editar.php');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send('data=' + JSON.stringify({index: index, newData: newData}));
        Vaciar();
    }
}

function Borrarr(td) {
    if (confirm('驴Seguro de borrar este registro?')) {
        row = td.parentElement.parentElement;
        let index = row.rowIndex - 1;
        document.getElementById("tabla").deleteRow(row.rowIndex);
        Vaciar();
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'borrar.php');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send('index=' + index);
    }
}

function guardarDatos(data) {
    console.log(data)
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "guardar.php");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("data=" + JSON.stringify(data));
}

function leerDatos() {
    let xhr = new XMLHttpRequest();
    let url = 'leer.php?t=' + new Date().getTime();
    xhr.open('GET', url);
    xhr.onload = function() {
        if (xhr.status === 200) {
            let data = JSON.parse(xhr.responseText);
            for (let i = 0; i < data.length; i++) {
                let row = data[i];
                let rowData = {
                    abo: row[0],
                    cli: row[1],
                    nov: row[2],
                    fei: row[3],
                    fet: row[4]
                };
                InsertarDatos(rowData);
            }
        }
    };
    xhr.send();
}

window.onload = function() {
    leerDatos();
};

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
    // Cambiar la clase del bot贸n para aplicar estilos de pantalla completa
    document.querySelector('.button').classList.toggle('fullscreen');
}

function recargarPagina() {
  let url = new URL(location.href);
  let params = new URLSearchParams(url.search);
  params.set('upd', new Date().getTime());
  url.search = params.toString();
  window.location = url.toString();
}
