/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function ObjetoAjax(){
    var xmlhttp=false;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch (E) {
            xmlhttp = false;
        }
    }

    if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}

function trimAll(cadena){
    if(cadena != ""){
        var sinesp = cadena;
        var re = /\s/g;
        if(cadena.search(re) != -1){
            sinesp = cadena.replace(re,"");
        }
        return sinesp;
    }
}

function validartxt(e) {
    tecla = e.which || e.keyCode;
    patron =/[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\s]+$/;
    te = String.fromCharCode(tecla);
    return (patron.test(te) || tecla == 9 || tecla == 8 || tecla == 37 || tecla == 39 || tecla == 46);
}

function validartxtnum(e) {
    tecla = e.which || e.keyCode;
    patron =/[0-9]+$/;
    te = String.fromCharCode(tecla);
    return (patron.test(te) || tecla == 9 || tecla == 8 || tecla == 37 || tecla == 39 || tecla == 44);
}

function validartxtval(e) {
    tecla = e.which || e.keyCode;
    patron =/[0-9\u002C]+$/;
    te = String.fromCharCode(tecla);
    return (patron.test(te) || tecla==9 || tecla==8 || tecla==37 || tecla==39 || tecla==46);
}

function validarEmail(valor) {
    re=/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/
    if (valor!=""){
        if(!re.exec(valor)){
            alert("Correo Inv\xe1lido.");
            document.getElementById("txtemail").value="";
            document.getElementById("txtemail").focus();
        }
    } 
}

function valilogin(e) {
    tecla = e.which || e.keyCode;
    patron =/[a-zA-Z\u0030\u0031\u0032\u0033\u0034\u0035\u0036\u0037\u0038\u0039]+$/;
    te = String.fromCharCode(tecla);
    return (patron.test(te) || tecla == 9 || tecla == 8 || tecla == 37 || tecla == 39 || tecla == 46);
}

function validarcontra(con,con1){
    if(con==con1)
        return 'bien';
    else
        return 'mal';
}


function validartcoma(e, id) {
    tecla = e.which || e.keyCode;
    patron =/[0-9]+$/;
    te = String.fromCharCode(tecla);
    //alert(e.keyCode);
    if(id!=null) {
        if(e.which==110 || e.keyCode==105) {
            val = document.getElementById(id).value.replace(".", ",");
            document.getElementById(id).value = val;
        }
    }
}

//FORMATEAR TEXTO A MONEDA
function textm(txt,id){

    if (document.getElementById(id).value==''){
        document.getElementById(id).value='0,00'
    }else{
        document.getElementById(id).value=number_format2(txt, 2, ',', '.');
    }
}

///FORMATO MONEDA NUMERO

function number_format2(a, b, c, d) {
    //a = Math.round(a * Math.pow(10, b)) / Math.pow(10, b);
    e = a + '';
    f = e.split(',');
    frase=f[0];
    frase=frase.replace('.','');
    frase=frase.replace('.','');
    frase=frase.replace('.','');
    frase=frase.replace('.','');
    frase=frase.replace('.','');
    frase=frase.replace('.','');
    frase=frase.replace('.','');
    frase=frase.replace('.','');
    frase=frase.replace('.','');
    f[0]=frase;
    if (!f[0]) {
        f[0] = '0';
    }
    if (!f[1]) {
        f[1] = '';
    }
    if (f[1].length < b) {
        g = f[1];
        for (i=f[1].length + 1; i <= b; i++) {
            g += '0';
        }
        f[1] = g;
    }
    if(d != '' && f[0].length > 3) {
        h = f[0];
        f[0] = '';
        for(j = 3; j < h.length; j+=3) {
            i = h.slice(h.length - j, h.length - j + 3);
            f[0] = d + i + f[0] + '';
        }
        j = h.substr(0, (h.length % 3 == 0) ? 3 : (h.length % 3));
        f[0] = j + f[0];

    }
    c = (b <= 0) ? '' : c;
    if(f[1]>99){
        var numero = "0."+f[1];
        numero = String(Math.round(numero*100)/100);
        v = numero.split('.');
        return f[0] + c + v[1];
    }else{
        return f[0] + c + f[1];
    }


}

function cambiacolor_over(id){ 
    document.getElementById(id).style.backgroundColor="#E2F0FD";
}

function cambiacolor_out(id) { 
    id2=id.substring(1);
    if(document.getElementById("check"+id2)!=null){
        if(document.getElementById("check"+id2).checked!=true){
            document.getElementById(id).style.backgroundColor="#ffffff";
        }
    } else {
        document.getElementById(id).style.backgroundColor="#ffffff";
    }
}
    
function sel_fila(id){
    id2=id.substring(1);
    if(document.getElementById("check"+id2)!=null) {
        document.getElementById("check"+id2).checked=true;

        var num_elementos = document.getElementsByName("seleccion").length;

        for( var contador=1; contador <= num_elementos; contador++ ){			//
            if(document.getElementById("check"+contador).checked == true){	//> se obtiene el value del check seleccionado
                document.getElementById("f"+contador).style.backgroundColor="#E2F0FD"; 
            }else{
                document.getElementById("f"+contador).style.backgroundColor="#ffffff";  
            }
        }
    }
}

function enter(e) {
    tecla = e.which || e.keyCode;
    if (tecla == 13)
        verificar();
}

function verificar(){
    var txtus=document.getElementById('txtus').value;
    var txtco=document.getElementById('txtco').value;
  
    if(txtus=='' || txtco==''){
        if(txtus==''){
            alert('Digite un nombre de Usuario.');
            document.getElementById('txtus').focus();
        }else if(txtco==''){
            alert('Digite una contrase\xf1a.');
            document.getElementById('txtco').focus();
        }
    } else{
        ajax=ObjetoAjax();
        ajax.open("POST", "consultar", true);
        ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        ajax.send("txtus="+txtus+"&txtco="+txtco);
        ajax.onreadystatechange=function(){
            if (ajax.readyState==4){
                var res=trimAll(ajax.responseText);
                if(res=="bien"){
                    document.location.href = 'Administracion.jsp';
                }else if(res=="error1"){
                     alert("Usuario invalido, Verifique"); 
                     document.getElementById('txtus').value="";
                     document.getElementById('txtus').focus();
                }else if(res=="error2"){
                     alert("Contrase\xf1a invalida, Verifique");
                     document.getElementById('txtco').value="";
                     document.getElementById('txtco').focus();
                }
            }
        }
    }
}

/////////////////////////FIN FUNCIONES BASICAS///////////////////////////////


////////////////////funciones de Andrea////////////
function GuardarGral(servlet, variables, proc){
    ajax = ObjetoAjax();
    ajax.open("POST", servlet, true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send(variables);
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            if(trimAll(ajax.responseText) == "ok"){
                alert("Operacion Realizada Exitosamente");
                document.location = proc;
            } else if(trimAll(ajax.responseText) == "error"){
                alert('No se ha podido realizar la operacion');
                //document.location = proc;
            } else if(trimAll(ajax.responseText) == "Regresar"){
                alert('Su sesion ha terminado. Inicie sesion nuevamente');
                location.href='index.jsp'
            }  
        }
    }
}

function GuardarUser() {
    var nom=document.getElementById("txtnom").value;
    var ali=document.getElementById("txtali").value;
    var pas=document.getElementById("txtpas").value;
    var cla=document.getElementById("txtcla").value;
    var est=document.getElementById("selest").value;
    var ocu=document.getElementById("ocuali").value;
    var flag = 0;
    var ide = "";
    
    if(nom=="") {
        alert("Digite el nombre del usuario!");
        document.getElementById("txtnom").focus();
        flag = 1;
        return;
    } else if(ali=="") {
        alert("Digite el alias del usuario!");
        document.getElementById("txtali").focus();
        flag = 1;
        return;
    } else if(ocu=="no") {
        alert("El alias de usuario no est\xe1 disponible!");
        document.getElementById("txtali").focus();
        flag = 1;
        return;
    } else if(pas=="") {
        alert("Digite la contrase\xf1a del usuario!");
        document.getElementById("txtpas").focus();
        flag = 1;
        return;
    } else if(cla=="") {
        alert("Confirme la contrase\xf1a del usuario!");
        document.getElementById("txtcla").focus();
        flag = 1;
        return;
    } else if(pas!=cla) {
        alert("La confirmaci\xf3n de la contrase\xf1a del usuario no coincide!");
        document.getElementById("txtpas").focus();
        flag = 1;
        return;
    } else if(document.getElementById("txtpav")!=null) {
        ide = document.getElementById("ideuse").value;
        if(document.getElementById("txtpav").value=="") {
            alert("Digite la contrase\xf1a anterior del usuario!");
            document.getElementById("txtpav").focus();
            flag = 1;
            return;    
        } else {
            ajax = ObjetoAjax();
            ajax.open("POST", "VerificarClave", true);
            ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            ajax.send("cla="+document.getElementById("txtpav").value+"&ali="+ali);
            ajax.onreadystatechange=function() {
                if (ajax.readyState==4) {
                    if(trimAll(ajax.responseText) == "ok"){
                        flag = 0;
                    } else if(trimAll(ajax.responseText) == "error"){
                        alert("La contrase\xf1a anterior no es correcta!");
                        document.getElementById("txtpav").focus();
                        flag = 1;
                        return;
                    } else if(trimAll(ajax.responseText) == "Regresar"){
                        alert('Su sesion ha terminado. Inicie sesion nuevamente');
                        location.href='index.jsp'
                    }  
                }
            }             
        }
    } 
    
    if(flag == 0){
        var variables = "nom=" + nom + "&ali=" + ali + "&pas=" + pas + "&est=" + est + "&ide=" + ide;
        GuardarGral('GuardarUsuario', variables ,'Usuarios');  
    }
}

function SeleccionarGral(pag) {
    opciones = document.getElementsByName("seleccion");
    seleccionado = false;
    for( var i=0; i < opciones.length; i++) {	
        if(opciones[i].checked) {
           seleccionado = true;
           val=opciones[i].value;
           break;
        }
    }
    if(!seleccionado) {
        alert("Seleccione algun campo!");
    } else {
        location.href = pag+"?id=" + val;
    }
}

function CamDpto(){
    dpto = document.getElementById("seldpt").value;
    ajax = ObjetoAjax();
    ajax.open("POST", "BuscarCiudad", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("dpt=" + dpto);
    ajax.onreadystatechange=function() {
      if (ajax.readyState==4) {
            document.getElementById('ciu').innerHTML = ajax.responseText
        }
    } 
}

function GuardarTercero() {
    var ide = document.getElementById("txtide").value;
    var tid = document.getElementById("seltid").value;
    var nom = document.getElementById("txtnom").value;
    var ape = document.getElementById("txtape").value;
    var dir = document.getElementById("txtdir").value;
    var cel = document.getElementById("txtcel").value;
    var tel = document.getElementById("txttel").value;
    var cor = document.getElementById("txtcor").value;
    var pai = document.getElementById("selpas").value;
    var dpt = document.getElementById("seldpt").value;
    var mun = document.getElementById("selmun").value;
    var tip = document.getElementById("seltip").value;
    var flag = 0;
    
    if(ide=="") {
        alert("Digite el n\xfamero de identificaci\xf3n del tercero!");
        document.getElementById("txtide").focus();
        flag=1;
        return;
    } else if(nom=="") {
        alert("Digite el(los) nombre(s) del tercero!");
        document.getElementById("txtnom").focus();
        flag=1;
        return;
    } else if(ape=="") {
        alert("Digite los apellido del tercero!");
        document.getElementById("txtape").focus();
        flag=1;
        return;
    } else if(ape=="") {
        alert("Digite los apellido del tercero!");
        document.getElementById("txtape").focus();
        flag=1;
        return;
    } else if(tip=="") {
        alert("Seleccione el tipo de tercero!");
        document.getElementById("seltip").focus();
        flag=1;
        return;
    } else {
        if(cor!="") {
            re=/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/
            if (cor!=""){
                if(!re.exec(cor)){
                    alert("Correo Inv\xe1lido.");
                    document.getElementById("txtcor").value="";
                    document.getElementById("txtcor").focus();
                    flag=1;
                    return;
                }
            }
        }
        if(flag==0) {
            var variables = "ide=" + ide + "&tid=" + tid + "&nom=" + nom 
                + "&ape=" + ape + "&dir=" + dir + "&tel=" + tel + "&cel=" + cel
                + "&cor=" + cor + "&pai=" + pai + "&dpt=" + dpt + "&mun=" + mun 
                + "&tip=" + tip;
            GuardarGral('GuardarTercero', variables ,'Abogados');  
        }        
    }
}

function BuscaAlias() {
    ali = document.getElementById("txtali").value;
    if(ali!="") {
        ajax = ObjetoAjax();
        ajax.open("POST", "BuscarAlias", true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send("ali=" + ali);
        ajax.onreadystatechange=function() {
          if (ajax.readyState==4) {
                document.getElementById('rta').innerHTML = ajax.responseText;
                if(trimAll(ajax.responseText)=="<fontstyle='color:red'>Aliasnodisponible</font>") {
                    document.getElementById("ocuali").value="no";
                } else {
                    document.getElementById("ocuali").value="si";
                }
            }
        }
    }
}

function GuardarDatos() {
    var nit = document.getElementById("txtnit").value;
    var ent = document.getElementById("txtent").value;
    var dir = document.getElementById("txtdir").value;
    var tel = document.getElementById("txttel").value;
    var pai = document.getElementById("selpas").value;
    var dpt = document.getElementById("seldpt").value;
    var mun = document.getElementById("selmun").value;
    
    if(nit=="") {
        alert("Digite el nit de la entidad!");
        document.getElementById("txtnit").focus();
        return;
    } else if(ent=="") {
        alert("Digite el nombre de la entidad!");
        document.getElementById("txtent").focus();
        return;
    } else if(dir=="") {
        alert("Digite la direccion de la entidad!");
        document.getElementById("txtdir").focus();
        return;
    } else if(tel=="") {
        alert("Digite el telefono de la entidad!");
        document.getElementById("txttel").focus();
        return;
    }
    
    var variables = "nit=" + nit + "&ent=" + ent + "&dir=" + dir 
                + "&tel=" + tel + "&pai=" + pai + "&dpt=" + dpt + "&mun=" + mun;
            GuardarGral('GuardarDatos', variables ,'DatosBasicos');  
}

function EliminarGral(pag, reg) {
    opciones = document.getElementsByName("seleccion");
    seleccionado = false;
    for( var i=0; i < opciones.length; i++) {	
        if(opciones[i].checked) {
           seleccionado = true;
           val=opciones[i].value;
           break;
        }
    }
    if(!seleccionado) {
        alert("Seleccione algun campo!");
    } else {
        if(confirm("\xbfEst\xe1 completamente seguro de eliminar este registro?")) {
            ajax = ObjetoAjax();
            ajax.open("POST", pag, true);
            ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            ajax.send("id=" + val);
            ajax.onreadystatechange=function() {
              if (ajax.readyState==4) {
                    if(trimAll(ajax.responseText)=="ok") {
                        alert("Datos eliminados!");
                        location.href=reg;                        
                    } else {
                        alert("No se pudo completar la operaci\xf3n!");
                    }
                }
            }
        }
    }
}

function Chequealo(id, opc) {
    if(opc==1) {
        if(document.getElementById(id).checked) {
            id2 = id.substring(0,7)+"l";
            if(!document.getElementById(id2).checked) {
                document.getElementById(id2).checked="checked";
            }
        }
    } else if(opc==2) {
        if(!document.getElementById(id).checked) {
            id2 = id.substring(0,7)+"e";
            if(document.getElementById(id2).checked) {
                document.getElementById(id).checked="checked";
                alert("Al seleccionar escritura debe seleccionar lectura");
            }
        }
    }
}

function GuardarPerfiles() {
    ali = document.getElementById("ali_perf").value;
    bas = "";
    abo = "";
    def = "";
    con = "";
    use = "";
    cla = "";
    
    if(document.getElementById("chkbas_e").checked) {
        bas = "E";
    } else if(document.getElementById("chkbas_l").checked){
        bas = "L";
    } else {
        bas = "N";
    }
    
    if(document.getElementById("chkabo_e").checked) {
        abo = "E";
    } else if(document.getElementById("chkabo_l").checked){
        abo = "L";
    } else {
        abo = "N";
    }
    
    if(document.getElementById("chkdef_e").checked) {
        def = "E";
    } else if(document.getElementById("chkdef_l").checked){
        def = "L";
    } else {
        def = "N";
    }
    
    if(document.getElementById("chkcon_e").checked) {
        con = "E";
    } else if(document.getElementById("chkcon_l").checked){
        con = "L";
    } else {
        con = "N";
    }
    
    if(document.getElementById("chkuse_e").checked) {
        use = "E";
    } else if(document.getElementById("chkuse_l").checked){
        use = "L";
    } else {
        use = "N";
    }
    
    if(document.getElementById("chkcla_e").checked) {
        cla = "E";
    } else if(document.getElementById("chkcla_l").checked){
        cla = "L";
    } else {
        cla = "N";
    }
    
    var variables = "ali=" + ali + "&bas=" + bas + "&abo=" + abo + "&def=" + def 
                + "&con=" + con + "&use=" + use + "&cla=" + cla;
    GuardarGral('GuardarPerfiles', variables ,'Usuarios');  
}

function GuardarJuzgado() {
    nom = document.getElementById("txtnom").value;
    ide = document.getElementById("txtide").value;
    est = document.getElementById("selest").value;
    
    if(nom=="") {
        alert("Digite el nombre del juzgado!");
        document.getElementById("txtnom").focus();
        return;
    }
    
    var variables = "ide=" + ide + "&nom=" + nom + "&est=" + est;
    GuardarGral('GuardarJuzgado', variables ,'Juzgados');  
}

function GuardarTProceso() {
    nom = document.getElementById("txtnom").value;
    ide = document.getElementById("txtide").value;
    est = document.getElementById("selest").value;
    
    if(nom=="") {
        alert("Digite el nombre del tipo de proceso!");
        document.getElementById("txtnom").focus();
        return;
    }
    
    var variables = "ide=" + ide + "&nom=" + nom + "&est=" + est;
    GuardarGral('GuardarTProceso', variables ,'TiposProcesos');  
}