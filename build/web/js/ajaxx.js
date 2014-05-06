/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function ObjetoAjax(){onblur="window.close();"
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
    //    if(e.which==46 || e.keyCode==46) {
    //        tecla = 44;
    //    }
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

function validarcontra2(id){
    con=document.getElementById('txtcontranue').value;
    con1=document.getElementById('txtcontranue1').value;
    if(con!=con1){
        alert("Las Contrase\u00f1a no Coinciden. Verifique");
        document.getElementById('txtcontranue1').value="";
        document.getElementById('txtcontranue1').value();
    }
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

function number_format2(a, b, c, d)
{
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


function guardar_usuario(){

    val='1';
    dest=document.getElementById("dest").value;
    acc=document.getElementById("accion").value;
    var txtide=document.getElementById('txtid').value;
    var txtnom=document.getElementById('txtnombres').value;
    var txtsex=document.getElementById('selectsexo').value;
    var txttel=document.getElementById('txttel').value;
    var txtdir=document.getElementById('txtdir').value;
    var txtmail=document.getElementById('txtemail').value;
    var txtlog=document.getElementById('txtlogin').value;
    var txtcon=document.getElementById('txtcontra').value;
    var txtcon1=document.getElementById('txtcontra1').value;

    var txtperf=document.getElementById('selecperfil').value;
    var txtcom='0';
    var txtmaes='';
    if (txtide=='' || txtnom=='' || txtlog=='' || txtcon=='******' || txtcon1=='******') {
        alert("Faltan campos por llenar.");
        val='0';
        if(txtnom == '')
            document.getElementById('txtid').focus();
        else if(txtape == '')
            document.getElementById('txtnombres').focus();
        else if(txtlog == '')
            document.getElementById('txtlogin').focus();
        else if(txtcon == '******')
            document.getElementById('txtcontra').focus();
        else if(txtcon1 == '******')
            document.getElementById('txtcontra1').focus();
    } else {
        var vcon = validarcontra(txtcon,txtcon1);
        if (vcon == 'mal'){
            alert('Las contrase\xf1as no coninciden.');
            val='0';
            document.getElementById('txtcontra').focus();
            return;
        }
    }

    if(val=='1'){
        var variables = "txtide=" + txtide + "&txtnom=" + txtnom + "&txtsex=" + txtsex
        + "&txtdir=" + txtdir + "&txttel=" + txttel + "&txtmail=" + txtmail
        + "&txtlog=" + txtlog + "&txtcon=" + txtcon+ "&txtperf=" + txtperf + "&acc=" + acc;
//    alert(dest)
        guardar('../guardar_usuario',variables,dest);
    }
}

function guardar_perfiles(aplica){
    acc=document.getElementById("accion").value;
    id=document.getElementById("txtid").value;
    nom=document.getElementById("txtnombres").value;
    obs=document.getElementById("orsevaciones").value;

    per=document.getElementById("permis").value;

    if(id == ''){
        alert("Falta el id del perfil por digitar. Verifique");
        document.getElementById("txtid").focus();
    }else if(nom == ''){
        alert("Falta el nom del perfil por digitar. Verifique");
        document.getElementById("txtnombres").focus();
    }else{

        var variables="id=" + id + "&nom=" + nom + "&obs=" + obs
        + "&per=" + per+ "&aplica=" + aplica + "&acc=" + acc;


        guardar('../guardar_perfiles',variables,aplica);
    }

}

function guardar(servlet,variables,proc,codp,vent){
    ajax = ObjetoAjax();
    ajax.open("POST", servlet, true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send(variables);
    ajax.onreadystatechange=function() {
//        alert(servlet+"-"+proc);
        if (ajax.readyState==4) {

           varia=ajax.responseText.split("-");

            if(trimAll(varia[0]) == "bien"){

               if(proc=="admin"){
                    alert("Operaci\u00f3n Realizada Exitosamente");
                    document.location = "../ges_usuario?dest=admin";
                }else if(proc=="urge"){
                    alert("Operaci\u00f3n Realizada Exitosamente");
                    document.location = "../ges_usuario?dest="+proc;
                }else if(proc=="Administrador"){
                    alert("Operaci\u00f3n Realizada Exitosamente");
                    document.location = "../ges_perfiles";
                }else if(proc=="admi"){
                    alert("Operaci\u00f3n Realizada Exitosamente");
                    document.location = "../ges_administradora";
                }else if(proc=="area"){
                      alert("Operaci\u00f3n Realizada Exitosamente");
                    document.location = "../ges_areas_serv";
                }else if(proc=="salario"){
                      alert("Operaci\u00f3n Realizada Exitosamente");
                    document.location = "../ges_salarios";
                }else if(proc=="grupSOAT"){
                      alert("Operaci\u00f3n Realizada Exitosamente");
                    document.location = "../ges_Grup_quirurgicoSOAT";
                }else if(proc=="porceQx"){
                      alert("Operaci\u00f3n Realizada Exitosamente");
                    document.location = "../ges_porcentajeQX";
                }else if(proc=="salManISS"){
                      alert("Operaci\u00f3n Realizada Exitosamente");
                    document.location = "../ges_salManISS";
                }else if(proc=="MatManISS"){
                      alert("Operaci\u00f3n Realizada Exitosamente");
                    document.location = "../ges_MatManISS";
                }else if(proc=="proc"){
                      alert("Operaci\u00f3n Realizada Exitosamente");
                    document.location = "../ges_procedimientos";
                }else if(proc=="planAdmi"){
                      alert("Operaci\u00f3n Realizada Exitosamente");
                    document.location = "../ges_planAdmi";
                }else if(proc=="prestadores"){
                    alert("Operaci\u00f3n Realizada Exitosamente");
                    document.location = "../ges_prestadores";
                }else if(proc=="especialidad"){
                    alert("Operaci\u00f3n Realizada Exitosamente");
                    document.location = "../ges_especialidades";
                }else if(proc=="prestadoresExter"){
                    alert("Operaci\u00f3n Realizada Exitosamente");
                    document.location = "../ges_prestadoresExternos";
                }else if(proc=="medicamentos"){
                    alert("Operaci\u00f3n Realizada Exitosamente");
                    document.location = "../ges_medicamentos";
                }else if(proc=="listPrecios"){
                    alert("Operaci\u00f3n Realizada Exitosamente");
                    document.location = "../ges_listaPrecios";
                }else if(proc=="precMedic"){
                    alert("Operaci\u00f3n Realizada Exitosamente");
//                    document.location = "../ges_listaPrecios";
                }else if(proc=="ModuPlan"){
                    alert("Operaci\u00f3n Realizada Exitosamente");
//                    document.location = "../ges_listaPrecios";
                }else if(proc=="provServ"){
                    alert("Operaci\u00f3n Realizada Exitosamente");
                    document.location = "../ges_provServ";
                }else if(proc=="ProvArea"){
                    alert("Operaci\u00f3n Realizada Exitosamente");
                   // document.location = "../ges_provServ";
                }else if(proc=="profesion"){
                    alert("Operaci\u00f3n Realizada Exitosamente");
                  document.location = "../ges_profesiones";
                }else if(proc=="codDiagnostico"){
                    alert("Operaci\u00f3n Realizada Exitosamente");
                  document.location = "../ges_codDiagnostico";
                }else if(proc=="Diagnostico"){
                    alert("Operaci\u00f3n Realizada Exitosamente");
                  document.location = "../ges_Diagnostico";
                }else if(proc=="centroAtenc"){
                    alert("Operaci\u00f3n Realizada Exitosamente");
                  document.location = "../ges_centroAtenc";
                }else if(proc=="pac_urge" || proc=="pac_admin"){
                  alert("Operaci\u00f3n Realizada Exitosamente");
                    document.location = "../ges_pacientes?dest="+proc;
                }else if(proc=="departamentos"){
                    alert("Operaci\u00f3n Realizada Exitosamente");
                  document.location = "../ges_departamentos";
                }else if(proc=="municipios"){
                    alert("Operaci\u00f3n Realizada Exitosamente");
                  document.location = "../ges_municipios";
                }else if(proc=="estancias"){
                    alert("Operaci\u00f3n Realizada Exitosamente");
                  document.location = "../ges_estancias";
                }else if(proc=="Urgencias"){
                    alert("Operaci\u00f3n Realizada Exitosamente");
                  document.location = "../ges_perfilesUrg";
                }else if(proc=="unidFunci"){
                    alert("Operaci\u00f3n Realizada Exitosamente");
                  document.location = "../ges_unidFuncional";
                }else if(proc=="confEmpre"){
                    alert("Operaci\u00f3n Realizada Exitosamente");
                  document.location = "../confEmpresa";
                }else if(proc=="regconsulta"){
                 alert("Operaci\u00f3n Realizada Exitosamente");
                    actserv();
                     if(document.getElementById("modu")!=null){
                         if(document.getElementById("modu").value=="3"){
                          window.open("../rips_urgencia?copac="+codp+"&ori=fact","rips_urgencia_fact","width=1000, height=750, scrollbars=yes, menubar=no, location=no, resizable=no");
                         }
                     }else{
                         window.open("../rips_urgencia?copac="+codp+"&ori=urg","rips_urgencia","width=1000, height=750, scrollbars=yes, menubar=no, location=no, resizable=no");
                     }


            }else if(proc=="regconsultaHospi"){
                 alert("Operaci\u00f3n Realizada Exitosamente");
                    actserv();
//                    window.open("../rips_urgencia?copac="+codp,"rips_urgencia","width=1000, height=750, scrollbars=yes, menubar=no, location=no, resizable=no");
                }else if(proc=="ripsconsulta"){
                    alert("Operaci\u00f3n Realizada Exitosamente");
                    document.getElementById('btn_guardar').setAttribute("style", "display:none;width: 60px;");
                    document.getElementById('btn_nuevo').setAttribute("style", "display:block;width: 60px;");
                    document.getElementById('btn_cancelar').setAttribute("style", "display:none;width: 60px;");
                }else if(proc=="regprocedpyp"){
                    alert("Operaci\u00f3n Realizada Exitosamente");
                    actserv();
                }else if(proc=="regconsultapyp"){
                    alert("Operaci\u00f3n Realizada Exitosamente");
                    actserv();
                 }else if(proc=="regprocedipyp"){
                    alert("Operaci\u00f3n Realizada Exitosamente");
                    actserv();
                }else if(proc=="recaudo"){
                    alert("Operaci\u00f3n Realizada Exitosamente");
                    window.open("../imprimRecibo?conserec="+varia[1]+"&tip_rec="+varia[2],"impri_recibo","width=1000, height=750, scrollbars=yes, menubar=no, location=no, resizable=no");
                }else if(proc=="pacientes"){
                    alert("Operaci\u00f3n Realizada Exitosamente");
                   dest=document.getElementById("de").value;

                   if(vent=="si"){
                         document.location = "../ventana_pacientes?dest="+dest;
                     }else{
                      document.location = "../ges_pacientes?dest="+dest;
                     }
                 }else if(proc=="guardar_factura"){
                      alert("Operaci\u00f3n Realizada Exitosamente")
                      document.getElementById("txtnfac").value=varia[1];
                      document.getElementById("txtest").value="ACT";
                      document.getElementById("txtasi").value="0";
                      desab_campos();
                      window.open("../imprimFactInd?consefac="+varia[1],"impri_fact_ind","width=1000, height=750, scrollbars=yes, menubar=no, location=no, resizable=no");

            }else if(proc=="guardar_facturaHosp"){
                      alert("Operaci\u00f3n Realizada Exitosamente");
                      window.open("../imprimFactInd?consefac="+varia[1]+"&ori=hosp","impri_fact_ind","width=1000, height=750, scrollbars=yes, menubar=no, location=no, resizable=no");
            }else if(proc=="guardar_facturapyp"){
                   alert("Operaci\u00f3n Realizada Exitosamente");
                   window.open("../imprimFactInd?consefac="+varia[1]+"&ori=hosp","impri_fact_ind","width=1000, height=750, scrollbars=yes, menubar=no, location=no, resizable=no");
            }else if(proc=="guardar_facturaAmbu"){
                      alert("Operaci\u00f3n Realizada Exitosamente");
                       document.location = "../facturacion_ambu?datos=no&origen=normal";
                      window.open("../imprimFactInd?consefac="+varia[1]+"&ori=hosp","impri_fact_ind","width=1000, height=750, scrollbars=yes, menubar=no, location=no, resizable=no");
            }else if(proc=="ripsconsulta"){
                      alert("Operaci\u00f3n Realizada Exitosamente");
                      document.getElementById('btn_guardar').setAttribute("style", "display:none;width: 60px;");
                      document.getElementById('btn_cancelar').setAttribute("style", "display:none;width: 60px;");
                      document.getElementById('btn_nuevo').setAttribute("style", "display:block;width: 60px;");

                 }else if(proc=="ripsprocedimiento"){
                      alert("Operaci\u00f3n Realizada Exitosamente");

                      document.getElementById('btn_guardar').setAttribute("style", "display:none;width: 60px;");
                      document.getElementById('btn_nuevo').setAttribute("style", "display:block;width: 60px;");
                      document.getElementById('btn_cancelar').setAttribute("style", "display:none;width: 60px;");

                      if(codp=="pyp"){
                        document.getElementById('btn_nacidos').setAttribute("style", "display:block;width: 60px;");
                      }

                 }else if(proc=="regprocedi"){
                   alert("Operaci\u00f3n Realizada Exitosamente");
                 }else if(proc=="guardar_medicamentos"){
                      alert("Operaci\u00f3n Realizada Exitosamente");
                      document.getElementById('btn_guardar').setAttribute("style", "display:none;width: 60px;");
                      document.getElementById('btn_nuevo').setAttribute("style", "display:block;width: 60px;");
                      cancel_medic();
                 }else if(proc=="guardar_OrdenInt"){
                      alert("Operaci\u00f3n Realizada Exitosamente");
                       document.getElementById("txtnfac").value=varia[1];
                      document.getElementById("txtest").value="ACT";
                      document.getElementById("txtasi").value="0";
                      desab_campos();
                      window.open("../imprimirOrdenInt?conseOrdi="+varia[1]+"&ori=urge","impri_Ord_int","width=1000, height=750, scrollbars=yes, menubar=no, location=no, resizable=no");
                 }else if(proc=="guardar_OrdenIntHosp"){
                      alert("Operaci\u00f3n Realizada Exitosamente");
                      document.location = "../orden_internafact?datos=no&origen=normal";
                      window.open("../imprimirOrdenInt?conseOrdi="+varia[1]+"&ori=hosp","impri_Ord_int_fact","width=1000, height=750, scrollbars=yes, menubar=no, location=no, resizable=no");
                 }else if(proc=="guardar_OrdenIntpyp"){
                      alert("Operaci\u00f3n Realizada Exitosamente");
                      document.location = "../orden_internafact?datos=no&origen=normal";
                      window.open("../imprimirOrdenInt?conseOrdi="+varia[1]+"&ori=hosp","impri_Ord_int_fact","width=1000, height=750, scrollbars=yes, menubar=no, location=no, resizable=no");
                 }else if(proc=="guar_ordenIntAmbu"){
                      alert("Operaci\u00f3n Realizada Exitosamente");
                      document.location = "../orden_internaAmbu?datos=no&origen=normal";
                      window.open("../imprimirOrdenInt?conseOrdi="+varia[1]+"&ori=hosp","impri_Ord_int_Ambu","width=1000, height=750, scrollbars=yes, menubar=no, location=no, resizable=no");

                 }else if(proc=="guardar_areasModu"){
                      alert("Operaci\u00f3n Realizada Exitosamente");
                 }else if(proc=="piso"){
                      alert("Operaci\u00f3n Realizada Exitosamente");
                       document.location = "../ges_pisos";
                 }else if(proc=="pabe"){
                      alert("Operaci\u00f3n Realizada Exitosamente");
                       document.location = "../ges_pabellones";
                 }else if(proc=="thabita"){
                      alert("Operaci\u00f3n Realizada Exitosamente");
                       document.location = "../ges_TiHabitacion";
                 }else if(proc=="tcama"){
                      alert("Operaci\u00f3n Realizada Exitosamente");
                       document.location = "../ges_TipCama";
                 }else if(proc=="habita"){
                      alert("Operaci\u00f3n Realizada Exitosamente");
                       document.location = "../ges_habitaciones";

                 }else if(proc=="cama"){
                      alert("Operaci\u00f3n Realizada Exitosamente");
                       document.location = "../ges_camas";

                 }else if(proc=="datoshospi"){
                      alert("Operaci\u00f3n Realizada Exitosamente");
                       document.location = "../mod_hospitalizacion/datosHospitalizacion.jsp";
                 }else if(proc=="guardar_facturAgrup"){
                      alert("Operaci\u00f3n Realizada Exitosamente");
                      document.location = "../factAgrup?datos=no&origen=normal";
                      window.open("../imprimFactAgrup?consefac="+varia[1],"impri_fact_Agrup","width=1000, height=750, scrollbars=yes, menubar=no, location=no, resizable=no");
                 }else if(proc=="programa"){
                      alert("Operaci\u00f3n Realizada Exitosamente");
                      document.location = "../ges_progPromyPrev";
                 }else if(proc=="nacidos"){
                      alert("Operaci\u00f3n Realizada Exitosamente");
                          document.getElementById('btn_guardar').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_nuevo').setAttribute("style", "display:block;width: 60px;");
    document.getElementById('btn_calcel').setAttribute("style", "display:block;width: 60px;");

                 }else if(proc=="edit_consulta"){
                  alert("Operaci\u00f3n Realizada Exitosamente");
                  ejecConsEdit('edit');
                 window.close();
                 }else if(proc=="guardar_facturaCapitacion"){
                     alert("Operaci\u00f3n Realizada Exitosamente");
                     disabledCapitacion(varia[1]);

                 }
             }else if(trimAll(ajax.responseText) == "Regresar"){
                alert('Su sesion ha terminado. Inicie sesion nuevamente');
                location.href='../index.jsp'

            }
        }
    }
}


function disabledCapitacion(fact){

    document.getElementById("planAdm").disabled=true;
    document.getElementById("fini").disabled=true;
    document.getElementById("ffin").disabled=true;
    document.getElementById("fela").disabled=true;
    document.getElementById("fvenc").disabled=true;
    document.getElementById("unfunc").disabled=true;
    document.getElementById("descrip").disabled=true;
    document.getElementById("txtnfac").value=fact;
    document.getElementById("asient").value="0";

    document.getElementById('btn_cancel').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_guardar').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_nuevo').setAttribute("style", "display:block;width: 60px;");
    document.getElementById('btn_todos').setAttribute("style", "display:block;width: 60px;");

}

function nuevo_usuario(){

    document.getElementById('accion').value="1";
    document.getElementById('txtid').value="";
    document.getElementById('txtnombres').value="";
    document.getElementById('selectsexo').selectedIndex=0;
    document.getElementById('txttel').value="";
    document.getElementById('txtdir').value="";
    document.getElementById('txtemail').value="";
    document.getElementById('txtlogin').value="";
    document.getElementById('selecperfil').selectedIndex=0;

    document.getElementById('txtid').disabled=false;
    document.getElementById('txtnombres').disabled=false;
    document.getElementById('selectsexo').disabled=false;
    document.getElementById('txttel').disabled=false;
    document.getElementById('txtdir').disabled=false;
    document.getElementById('txtemail').disabled=false;
    document.getElementById('txtlogin').disabled=false;
    document.getElementById('selecperfil').disabled=false;
    document.getElementById('txtcontra').disabled=false;
    document.getElementById('txtcontra1').disabled=false;

    document.getElementById('btn_nuevo').setAttribute("style", "display:none");
    document.getElementById('btn_editar').setAttribute("style", "display:none");
    document.getElementById('btn_buscar').setAttribute("style", "display:none");
    document.getElementById('btn_guardar').setAttribute("style", "display:block");

    document.getElementById('txtid').focus();

}

function aditar_usuario(){
    document.getElementById("accion").value="2";
    document.getElementById('txtnombres').disabled=false;
    document.getElementById('selectsexo').disabled=false;
    document.getElementById('txttel').disabled=false;
    document.getElementById('txtdir').disabled=false;
    document.getElementById('txtemail').disabled=false;
    document.getElementById('selecperfil').disabled=false;
//    document.getElementById('txtcontra').disabled=false;
//    document.getElementById('txtcontra1').disabled=false;

    document.getElementById('btn_nuevo').setAttribute("style", "display:none");
    document.getElementById('btn_editar').setAttribute("style", "display:none");
    document.getElementById('btn_buscar').setAttribute("style", "display:none");

    document.getElementById('btn_guardar').setAttribute("style", "display:block");

}

function nuevo_perfil(){
    document.getElementById("accion").value="1";
    document.getElementById('permisos').disabled=false;
    document.getElementById('txtnombres').disabled=false;
    document.getElementById('txtid').disabled=false;
    document.getElementById('orsevaciones').disabled=false;
    document.getElementById('txtnombres').value="";
    document.getElementById('txtid').value="";
    document.getElementById('orsevaciones').value="";
    document.getElementById('permis').value="0";

    document.getElementById('permisos').setAttribute("style", "color:black;");
    document.getElementById('btn_guardar').setAttribute("style", "display:block");
    document.getElementById('btn_nuevo').setAttribute("style", "display:none");
    document.getElementById('btn_editar').setAttribute("style", "display:none");

}

function Asig_permisos(ori){

    if(ori=="admi"){
        window.open("../mod_administracion/permisos.jsp","ventana_permisos","width=900, height=800, scrollbars=no, menubar=no, location=no, resizable=no");
    }else if(ori=="urg"){
        window.open("../mod_urgencia/permisos.jsp","ventana_permisos","width=900, height=800, scrollbars=no, menubar=no, location=no, resizable=no");
    }

}

function selcont(){
    contador = document.getElementsByName('cont').length;
    for (var i=1;i<=contador;i++){
        if(document.getElementById("conta").checked == true){
            document.getElementById("cont"+i).checked = true;
        }else{
            document.getElementById("cont"+i).checked = false;
        }
    }
}

function selpresta(){
    contador = document.getElementsByName('prest').length;

    for (var i=1;i<=contador;i++){
        if(document.getElementById("presta").checked == true){
            document.getElementById("prest"+i).checked = true;
        }else{
            document.getElementById("prest"+i).checked = false;
        }
    }
}

function selquirurg(){
    contador = document.getElementsByName('quirur').length;

    for (var i=1;i<=contador;i++){
        if(document.getElementById("quirurg").checked == true){
            document.getElementById("quirur"+i).checked = true;
        }else{
            document.getElementById("quirur"+i).checked = false;
        }
    }
}

function selconfigu(){
    contador = document.getElementsByName('config').length;

    for (var i=1;i<=contador;i++){
        if(document.getElementById("configu").checked == true){
            document.getElementById("config"+i).checked = true;
        }else{
            document.getElementById("config"+i).checked = false;
        }
    }
}

function selareas(){
    contador = document.getElementsByName('area').length;

    for (var i=1;i<=contador;i++){
        if(document.getElementById("areas").checked == true){
            document.getElementById("area"+i).checked = true;
        }else{
            document.getElementById("area"+i).checked = false;
        }
    }
}

function selpyp(){
    contador = document.getElementsByName('pyp').length;

    for (var i=1;i<=contador;i++){
        if(document.getElementById("pypg").checked == true){
            document.getElementById("pyp"+i).checked = true;
        }else{
            document.getElementById("pyp"+i).checked = false;
        }
    }
}

function selestadisti(){
    contador = document.getElementsByName('estadist').length;

    for (var i=1;i<=contador;i++){
        if(document.getElementById("estadisti").checked == true){
            document.getElementById("estadist"+i).checked = true;
        }else{
            document.getElementById("estadist"+i).checked = false;
        }
    }
}

function selreport(){
    contador = document.getElementsByName('report').length;

    for (var i=1;i<=contador;i++){
        if(document.getElementById("reporte").checked == true){
            document.getElementById("report"+i).checked = true;
        }else{
            document.getElementById("report"+i).checked = false;
        }
    }
}

function selherram(){
    contador = document.getElementsByName('herram').length;

    for (var i=1;i<=contador;i++){
        if(document.getElementById("herrami").checked == true){
            document.getElementById("herram"+i).checked = true;
        }else{
            document.getElementById("herram"+i).checked = false;
        }
    }
}

function selseguri(){
    contador = document.getElementsByName('segur').length;

    for (var i=1;i<=contador;i++){
        if(document.getElementById("seguri").checked == true){
            document.getElementById("segur"+i).checked = true;
        }else{
            document.getElementById("segur"+i).checked = false;
        }
    }
}

function env_permi(){

    var per="";
    contador = document.getElementsByName('cont').length;
    for (i=1;i<=contador;i++){
        if(document.getElementById("cont"+i).checked == true){
            per=per+"s"+",";
        }else{
            per=per+"n"+",";
        }
    }


    //////////////////////////////////////
    contador = document.getElementsByName('prest').length;

    for (i=1;i<=contador;i++){
        if(document.getElementById("prest"+i).checked == true){
            per=per+"s"+",";
        }else{
            per=per+"n"+",";
        }
    }

    ////////////////////////////////////////

    contador = document.getElementsByName('quirur').length;

    for (i=1;i<=contador;i++){
        if(document.getElementById("quirur"+i).checked == true){
            per=per+"s"+",";
        }else{
            per=per+"n"+",";
        }
    }

    //////////////////////////////////////

    contador = document.getElementsByName('config').length;

    for (i=1;i<=contador;i++){
        if(document.getElementById("config"+i).checked == true){
            per=per+"s"+",";
        }else{
            per=per+"n"+",";
        }
    }

    ////////////////////////////////////////////

    contador = document.getElementsByName('area').length;

    for (i=1;i<=contador;i++){
        if(document.getElementById("area"+i).checked == true){
            per=per+"s"+",";
        }else{
            per=per+"n"+",";
        }
    }

    ////////////////////////////////////////////

    contador = document.getElementsByName('pyp').length;

    for (i=1;i<=contador;i++){
        if(document.getElementById("pyp"+i).checked == true){
            per=per+"s"+",";
        }else{
            per=per+"n"+",";
        }
    }

    /////////////////////////////////////////

    contador = document.getElementsByName('estadist').length;

    for (i=1;i<=contador;i++){
        if(document.getElementById("estadist"+i).checked == true){
            per=per+"s"+",";
        }else{
            per=per+"n"+",";
        }
    }

    ///////////////////////////////////////////

    contador = document.getElementsByName('report').length;

    for (i=1;i<=contador;i++){
        if( document.getElementById("report"+i).checked == true){
            per=per+"s"+",";
        }else{
            per=per+"n"+",";
        }
    }

    /////////////////////////////////////////////

    contador = document.getElementsByName('herram').length;

    for (i=1;i<=contador;i++){
        if(document.getElementById("herram"+i).checked  == true){
            per=per+"s"+",";
        }else{
            per=per+"n"+",";
        }
    }

    //////////////////////////////////////////////

    contador = document.getElementsByName('segur').length;

    for (i=1;i<=contador;i++){
        if(document.getElementById("segur"+i).checked == true){
            per=per+"s"+",";
        }else{
            per=per+"n"+",";
        }
    }

    opener.document.getElementById("permis").value=per;
    window.close();
}

function env_permi_urg(){

     var per="";
    contador = document.getElementsByName('urge').length;
    for (i=1;i<=contador;i++){
        if(document.getElementById("urge"+i).checked == true){
            per=per+"s"+",";
        }else{
            per=per+"n"+",";
        }
    }
    //////////////////////////////////////
    contador = document.getElementsByName('herra').length;

    for (i=1;i<=contador;i++){
        if(document.getElementById("herra"+i).checked == true){
            per=per+"s"+",";
        }else{
            per=per+"n"+",";
        }
    }

      opener.document.getElementById("permis").value=per;
    window.close();
}

function ver_id_per(){

    var txtide=document.getElementById('txtid').value;
    ajax=ObjetoAjax();
    ajax.open("POST", "../verif_perfil", true);
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("txtide="+txtide);
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            if(trimAll(ajax.responseText) ==1){
                alert("ID Registrado, Verifique");
                document.getElementById('txtid').value="";
                document.getElementById('txtid').focus();

            }
        }
    }
}

function ver_ced(tab){

    var txtide=document.getElementById('txtid').value;
    ajax=ObjetoAjax();
    ajax.open("POST", "../verif_ced", true);
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("txtide="+txtide+"&tab="+tab);
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            if(trimAll(ajax.responseText) ==1){
                alert("ID Registrado, Verifique");
                document.getElementById('txtid').value="";
                document.getElementById('txtid').focus();

            }
        }
    }
}

function ver_user(txtlog,id){

//    var txtlog=document.getElementById('txtlogin').value;
    ajax=ObjetoAjax();
    ajax.open("POST", "../verif_user", true);
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("txtlog="+txtlog);
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            if(trimAll(ajax.responseText) ==1){
                alert("Usuario no Disponible, Verifique");
                document.getElementById(id).value="";
                document.getElementById(id).focus();

            }
        }
    }
}

function editar_perfil(){
    document.getElementById("accion").value="2";
    document.getElementById('permisos').disabled=false;
    document.getElementById('txtnombres').disabled=false;

    document.getElementById('orsevaciones').disabled=false;
    document.getElementById('permisos').setAttribute("style", "color:black;");
    document.getElementById('btn_guardar').setAttribute("style", "display:block");
    document.getElementById('btn_nuevo').setAttribute("style", "display:none");
    document.getElementById('btn_editar').setAttribute("style", "display:none");

}

function asi_permiso(){
    permi=opener.document.getElementById("permis").value;
    par1=permi.substr(0,11);


    a=0;
    for (i=0;i<6;i++){
        vari=par1.split(",");
        a++;
        if(vari[i]=="s"){
            document.getElementById("cont"+a).checked = true;
        }else{
            document.getElementById("cont"+a).checked = false;
        }
    }
    ///////////////
    par2=permi.substr(12,6);

    a=0;
    for (i=0;i<3;i++){
        vari=par2.split(",");
        a++;
        if(vari[i]=="s"){
            document.getElementById("prest"+a).checked = true;
        }else{

            document.getElementById("prest"+a).checked = false;
        }
    }
    //////////////
    par3=permi.substr(18,10);

    a=0;
    for (i=0;i<5;i++){
        vari=par3.split(",");
        a++;
        if(vari[i]=="s"){
            document.getElementById("quirur"+a).checked = true;
        }else{

            document.getElementById("quirur"+a).checked = false;
        }
    }

    //////////////
    par4=permi.substr(28,31);
//    alert(permi.substr(28,31));
    a=0;
    for (i=0;i<16;i++){
        vari=par4.split(",");
        a++;
        if(vari[i]=="s"){
            document.getElementById("config"+a).checked = true;
        }else{

            document.getElementById("config"+a).checked = false;
        }

    }

    //////////////
    par5=permi.substr(60,5);

    a=0;
    for (i=0;i<3;i++){
        vari=par5.split(",");
        a++;
        if(vari[i]=="s"){
            document.getElementById("area"+a).checked = true;
        }else{

            document.getElementById("area"+a).checked = false;
        }
    }

    //////////////
    par6=permi.substr(66,3);

    a=0;
    for (i=0;i<2;i++){
        vari=par6.split(",");
        a++;
        if(vari[i]=="s"){
            document.getElementById("pyp"+a).checked = true;
        }else{

            document.getElementById("pyp"+a).checked = false;
        }
    }
//

    //////////////
    par7=permi.substr(70,11);

    a=0;
    for (i=0;i<6;i++){
        vari=par7.split(",");
        a++;
        if(vari[i]=="s"){
            document.getElementById("estadist"+a).checked = true;
        }else{

            document.getElementById("estadist"+a).checked = false;
        }
    }


    //////////////
    par8=permi.substr(82,15);

    a=0;
    for (i=0;i<8;i++){
        vari=par8.split(",");
        a++;
        if(vari[i]=="s"){
            document.getElementById("report"+a).checked = true;
        }else{

            document.getElementById("report"+a).checked = false;
        }
    }

    //////////////
    par9=permi.substr(98,5);

    a=0;
    for (i=0;i<3;i++){
        vari=par9.split(",");
        a++;
        if(vari[i]=="s"){
            document.getElementById("herram"+a).checked = true;
        }else{

            document.getElementById("herram"+a).checked = false;
        }
    }

    //////////////
    par10=permi.substr(104,9);

    a=0;
    for (i=0;i<5;i++){
        vari=par10.split(",");
        a++;
        if(vari[i]=="s"){
            document.getElementById("segur"+a).checked = true;
        }else{

            document.getElementById("segur"+a).checked = false;
        }
    }

}

function entrar(aplica){

  var oldWin="";
  if(aplica=="Adminitracion"){
        oldWin = window.open("login.jsp?prog="+aplica,"oldName");
        oldWin.focus();
  }else if(aplica=="servAmbulatorio"){
        oldWin = window.open("login.jsp?prog="+aplica,"seramb");
        oldWin.focus();
    }else if(aplica=="urgencias"){
        oldWin = window.open("login.jsp?prog="+aplica,"urgencia");
        oldWin.focus();
    }else if(aplica=="hospitalizacion"){
        oldWin = window.open("login.jsp?prog="+aplica,"hospita");
        oldWin.focus();
    }else if(aplica=="facturacion"){
        oldWin = window.open("login.jsp?prog="+aplica,"factura");
        oldWin.focus();
    }else if(aplica=="promyprev"){
        oldWin = window.open("login.jsp?prog="+aplica,"promyprev");
        oldWin.focus();
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
    var program=document.getElementById('program').value;


    if(txtus=='' || txtco==''){
        if(txtus==''){
            alert('Digite un nombre de Usuario.');
            document.getElementById('txtus').focus();
        }else if(txtco==''){
            alert('Digite una contrase\xf1a.');
            document.getElementById('txtco').focus();
        }
    }
    else{
        ajax=ObjetoAjax();
        if(program=="Adminitracion"){
          ajax.open("POST", "consultar", true);
        }else if(program=="servAmbulatorio"){
            ajax.open("POST", "consultarambu", true);
        }else if(program=="urgencias"){
            ajax.open("POST", "consultarurge", true);
        }else if(program=="hospitalizacion"){
            ajax.open("POST", "consultarHospita", true);
        }else if(program=="facturacion"){
            ajax.open("POST", "consultarFactu", true);
        }else if(program=="promyprev"){
            ajax.open("POST", "consultarpyp", true);
        }

        ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        ajax.send("txtus="+txtus+"&txtco="+txtco);
        ajax.onreadystatechange=function(){
            if (ajax.readyState==4){
                var res=trimAll(ajax.responseText);
            if(res=="bien"){
                 if(program=="Adminitracion"){
                    document.location.href = 'mod_administracion/ges_contratos.jsp';
                  }else if(program=="servAmbulatorio"){
                  document.location.href = 'mod_ServAmbulatorio/principal.jsp';
                  }else if(program=="urgencias"){
                  document.location.href = 'mod_urgencia/principal.jsp';
                  }else if(program=="hospitalizacion"){
                  document.location.href = 'mod_hospitalizacion/principal.jsp';
                  }else if(program=="facturacion"){
                  document.location.href = 'mod_facturacion/principal.jsp';
                  }else if(program=="promyprev"){
                  document.location.href = 'mod_pyp/principal.jsp';
                  }
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

///DIGITO DE VERIFICACION
function calcularDV(i_rut) {

    if(i_rut=='') {
        document.getElementById('fdig').value = '';
    }


    if(i_rut!=''){
        var pesos = new Array(71,67,59,53,47,43,41,37,29,23,19,17,13,7,3);
        rut_fmt = zero_fill(i_rut, 15);
        suma = 0;

        for ( i=0; i<=14; i++ )
            suma += rut_fmt.substring(i, i+1) * pesos[i];
        resto = suma % 11;

        if ( resto == 0 || resto == 1 )
            digitov = resto;
        else
            digitov = 11 - resto;
        document.getElementById('fdig').value = digitov;

    }
}

function zero_fill(i_valor, num_ceros) {
    relleno = ""
    i = 1
    salir = 0
    while ( ! salir ) {
        total_caracteres = i_valor.length + i
        if ( i > num_ceros || total_caracteres > num_ceros )
            salir = 1
        else
            relleno = relleno + "0"
        i++
    }

    i_valor = relleno + i_valor
    return i_valor
}
///////////////////////////////////////////////////////////////////////
function MostPlanPac(ori){
    cargarPlanPac(ori);
    document.getElementById('conte').style.visibility = 'hidden';
    document.getElementById('buscaPlanAdmin').style.visibility = 'visible';
    location.href="#buscaPlanAdmin";
}

function Busqueda_PlanAdmin1(prog){

    tip_bus=document.getElementById("t_busplan").value;
    busq=  document.getElementById("busquedaplan").value;

    ajax = ObjetoAjax();
    ajax.open("POST", "../most_PlanAdmin", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&programa="+prog+"&control=2&ori=norm");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_PlanAdmin').innerHTML = ajax.responseText
        }
    }
}

function cargarPlanPac(prog){
    ajax = ObjetoAjax();
    ajax.open("POST", "../most_PlanAdmin", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("programa="+prog+"&ori=norm");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_PlanAdmin').innerHTML = ajax.responseText
        }
    }
}

function abrir_domicilios(ori){

//       cargardomicilios(ori);
document.getElementById('conte').style.visibility = 'hidden';
    document.getElementById('buscadomicilio').style.visibility = 'visible';
    
    
}


function cargardomicilios(prog){
//    prog=  document.getElementById("prog").value;

    ajax = ObjetoAjax();
    ajax.open("POST", "../domiciolios", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("programa="+prog+"&ori=norm");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_domicilios').innerHTML = ajax.responseText
        }
    }
}

function sel_domi(ori){
    var num_elementos = document.getElementsByName("seleccion").length;

    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }



    var divvalor=valor.split("-");
    var nom=divvalor[1];
    var cod=divvalor[0];
    var dep=divvalor[2];
    if (ori=="admin"){
        document.getElementById("txtcod_dom").value=cod;
        document.getElementById("txtnom_dom").value=nom;
    }else if(ori=="confEmp"){
         document.getElementById("txtcodci").value=cod;
         document.getElementById("txtciu").value=nom;
         document.getElementById("txtdepart").value=dep;

    }else{
        document.getElementById("txtcod_dom").value=cod;
        document.getElementById("txtnom_dom").value=nom;
    }

    Cerrarpopu('buscadomicilio');
}

function Busqueda_Mun(prog){
    tip_bus=document.getElementById("t_busd").value;
    busq=  document.getElementById("busquedad").value;

    ajax = ObjetoAjax();
    ajax.open("POST", "../domiciolios", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&programa="+prog+"&control=2&ori=norm");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_domicilios').innerHTML = ajax.responseText
        }
    }
}



function verificart(id,ori){

    var verif=document.getElementById(id).value;
    ajax=ObjetoAjax();
    ajax.open("POST", "../verificar", true);
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("verif="+verif+"&ori="+ori);
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            if(trimAll(ajax.responseText) ==1){
               if(ori=="salario"){
                  alert("A\u00f1o Registrado, Verifique");
               }else if(ori=="prestadores"){
                   alert("Esta identificaci\u00f3n ya esta Registrada, Verifique");
               }else if(ori=="prestadoresExt"){
                   alert("Esta identificaci\u00f3n ya esta Registrada, Verifique");
               }else if(ori=="pacientes"){
                    alert("Esta identificaci\u00f3n ya esta Registrada, Verifique");
               }else{
                    alert("C\u00f3digo Registrado, Verifique");
               }

                document.getElementById(id).value="";
                document.getElementById(id).focus();
            }else if(trimAll(ajax.responseText)=="Regresar"){
                 alert('Su sesion ha terminado. Inicie sesion nuevamente');
                location.href='../index.jsp'
            }
        }
    }
}

function guardar_admi(){

   acc=document.getElementById("accion").value;
    txtcodunic=document.getElementById("txtcodunic").value;
    cod_admi=document.getElementById("txtcod").value;
    nit_admi=document.getElementById("txtnit").value;
    div_admi=document.getElementById("fdig").value;
    nom_admi=document.getElementById("txtnom").value;
    dir_admi=document.getElementById("txtdir").value;
    tel_admi=document.getElementById("txttel").value;
    rep_admi=document.getElementById("txtrep").value;
    dom_admi=document.getElementById("txtcod_dom").value;
    var citas="";
    var ppart="";
    var srips="";
    if(document.getElementById("citas").checked==true){
        citas="s";
    }else{
        citas="n";
    }
    ///
    if(document.getElementById("p_par").checked==true){
        ppart="s";
    }else{
        ppart="n";
    }
    //
    if(document.getElementById("srips").checked==true){
        srips="s";
    }else{
        srips="n";
    }

    pfact=document.getElementById("pie_factura").value;
    obser=document.getElementById("observa").value;


    if(cod_admi==""){
        alert("Digite el codigo de la administradora");
        document.getElementById("txtcod").focus();
    }else if(nit_admi==""){
        alert("Digite el NIT de la administradora");
        document.getElementById("txtnit").focus();
    }else if(nom_admi==""){
        alert("Digite el nombre de la administradora");
        document.getElementById("txtnom").focus();
    }else{

        var variables = "cod_admi=" + cod_admi + "&nit_admi=" + nit_admi + "&div_admi=" + div_admi
        + "&nom_admi=" + nom_admi + "&dir_admi=" + dir_admi + "&tel_admi=" + tel_admi
        + "&rep_admi=" + rep_admi + "&dom_admi=" + dom_admi+ "&citas=" + citas + "&ppart=" + ppart
        + "&srips=" + srips + "&pfact=" + pfact+ "&obser=" + obser + "&acc=" + acc +"&txtcodunic="+txtcodunic;

        guardar('../guardar_adminis',variables,'admi');

    }


}

function nueva_admi(){

    document.getElementById('accion').value="1";
    document.getElementById('txtcod').value="";
    document.getElementById('txtcodunic').value="";
    document.getElementById('txtnit').value="";
    document.getElementById('fdig').value="";
    document.getElementById('fdig').value="";
    document.getElementById('txtnom').value="";
    document.getElementById('txttel').value="";
    document.getElementById('txtdir').value="";
    document.getElementById('txtrep').value="";
    document.getElementById('txtcod_dom').value="";
    document.getElementById('txtnom_dom').value="";
    document.getElementById('citas').checked=true;
    document.getElementById('p_par').checked=true;
    document.getElementById('srips').checked=true;
    document.getElementById('pie_factura').value="";
    document.getElementById('observa').value="";

    document.getElementById('txtcodunic').disabled=false;
    document.getElementById('txtcod').disabled=false;
    document.getElementById('txtnit').disabled=false;
    document.getElementById('fdig').disabled=false;
    document.getElementById('fdig').disabled=false;
    document.getElementById('txtnom').disabled=false;
    document.getElementById('txttel').disabled=false;
    document.getElementById('txtdir').disabled=false;
    document.getElementById('citas').disabled=false;
    document.getElementById('citas').clecked=false;
    document.getElementById('p_par').disabled=false;
    document.getElementById('p_par').clecked=false;
    document.getElementById('srips').disabled=false;
    document.getElementById('srips').clecked=false;
    document.getElementById('txtrep').disabled=false;
    document.getElementById('pie_factura').disabled=false;
    document.getElementById('observa').disabled=false;

    document.getElementById('plan_admin').innerHTML = ""
    document.getElementById('btn_domi').setAttribute("href", "javascript:abrir_domicilios('admin')");

    document.getElementById('btn_nuevo').setAttribute("style", "display:none");
    document.getElementById('btn_delete').setAttribute("style", "display:none");
    document.getElementById('btn_editar').setAttribute("style", "display:none");
    document.getElementById('btn_buscar').setAttribute("style", "display:none");
    document.getElementById('btn_guardar').setAttribute("style", "display:block");
    document.getElementById('btn_guardar').setAttribute("style", "display:block");


    document.getElementById('adm_id').focus();

}

function delete_admi(){

    if (confirm("\xbfEsta seguro de realizar la operaci\xf3n?")){
    var txtcod=document.getElementById("txtcod").value;
    ajax=ObjetoAjax();
    ajax.open("POST", "../guardar_adminis", true);
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("txtcod="+txtcod+"&acc=3");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            if(trimAll(ajax.responseText) =="bien"){
                 alert("Operaci\u00f3n Realizada Exitosamente");
                 document.location = "../ges_administradora";
            }else{
                 alert("No se Puede Realizar la Operaci\u00f3n... Verifique.");
            }
        }
    }
  }
}

function aditar_admi(){

    document.getElementById('accion').value="2";
    document.getElementById('txtnit').disabled=false;
    document.getElementById('fdig').disabled=false;
    document.getElementById('fdig').disabled=false;
    document.getElementById('txtnom').disabled=false;
    document.getElementById('txttel').disabled=false;
    document.getElementById('txtdir').disabled=false;
    document.getElementById('citas').disabled=false;
    document.getElementById('p_par').disabled=false;
    document.getElementById('srips').disabled=false;
    document.getElementById('txtrep').disabled=false;
    document.getElementById('pie_factura').disabled=false;
    document.getElementById('observa').disabled=false;
    document.getElementById('btn_domi').setAttribute("href", "javascript:abrir_domicilios('admin')");

    document.getElementById('btn_nuevo').setAttribute("style", "display:none");
    document.getElementById('btn_delete').setAttribute("style", "display:none");
    document.getElementById('btn_editar').setAttribute("style", "display:none");
    document.getElementById('btn_buscar').setAttribute("style", "display:none");
    document.getElementById('btn_guardar').setAttribute("style", "display:block");

    document.getElementById('adm_cod').focus();
}

function nueva_area(){

    document.getElementById('accion').value="1";
    document.getElementById('txtcod').value="";
    document.getElementById('txtdesc').value="";
    document.getElementById('observa').value="";
    document.getElementById('cmode').checked=true;

    document.getElementById('txtcod').disabled=false;
    document.getElementById('txtdesc').disabled=false;
    document.getElementById('observa').disabled=false;
    document.getElementById('cmode').disabled=false;
    document.getElementById('btn_rest').disabled=false;
    document.getElementById('btn_rest').setAttribute("style", "color:black;padding:3px 30px 3px 30px; font-size:12px  margin: 0px 4px 4px 0px;");

    document.getElementById('btn_nuevo').setAttribute("style", "display:none");
    document.getElementById('btn_delete').setAttribute("style", "display:none");
    document.getElementById('btn_editar').setAttribute("style", "display:none");
    document.getElementById('btn_buscar').setAttribute("style", "display:none");
    document.getElementById('btn_guardar').setAttribute("style", "display:block");

    document.getElementById('txtcod').focus();

}

function nuevo_programa(){

    document.getElementById('accion').value="1";
    document.getElementById('txtcod').value="";
    document.getElementById('txtdesc').value="";
    document.getElementById('observa').value="";

    document.getElementById('txtcod').disabled=false;
    document.getElementById('txtdesc').disabled=false;
    document.getElementById('observa').disabled=false;


    document.getElementById('btn_verproc').disabled=true;
    document.getElementById('btn_asiproc').disabled=true;
    document.getElementById('btn_verproc').setAttribute("style", "color:gray;padding:3px 30px 3px 30px; font-size:12px  margin: 0px 4px 4px 0px;");
    document.getElementById('btn_asiproc').setAttribute("style", "color:gray;padding:3px 30px 3px 30px; font-size:12px  margin: 0px 4px 4px 0px;");

    document.getElementById('btn_nuevo').setAttribute("style", "display:none");
    document.getElementById('btn_delete').setAttribute("style", "display:none");
    document.getElementById('btn_editar').setAttribute("style", "display:none");
    document.getElementById('btn_buscar').setAttribute("style", "display:none");
    document.getElementById('btn_guardar').setAttribute("style", "display:block");

    document.getElementById('txtcod').focus();

}

function editar_area(){
    document.getElementById('accion').value="2";

    document.getElementById('txtcod').disabled=false;
    document.getElementById('txtdesc').disabled=false;
    document.getElementById('observa').disabled=false;
    document.getElementById('cmode').disabled=false;
    document.getElementById('btn_rest').disabled=false;
    document.getElementById('btn_rest').setAttribute("style", "color:black;padding:3px 30px 3px 30px; font-size:12px  margin: 0px 4px 4px 0px;");

    document.getElementById('btn_nuevo').setAttribute("style", "display:none");
    document.getElementById('btn_delete').setAttribute("style", "display:none");
    document.getElementById('btn_editar').setAttribute("style", "display:none");
    document.getElementById('btn_buscar').setAttribute("style", "display:none");
    document.getElementById('btn_guardar').setAttribute("style", "display:block");

    document.getElementById('txtcod').focus();
}

function editar_programa(){
    document.getElementById('accion').value="2";

//    document.getElementById('txtcod').disabled=false;
    document.getElementById('txtdesc').disabled=false;
    document.getElementById('observa').disabled=false;

    document.getElementById('btn_verproc').disabled=true;
    document.getElementById('btn_asiproc').disabled=true;
    document.getElementById('btn_verproc').setAttribute("style", "color:gray;padding:3px 30px 3px 30px; font-size:12px  margin: 0px 4px 4px 0px;");
    document.getElementById('btn_asiproc').setAttribute("style", "color:gray;padding:3px 30px 3px 30px; font-size:12px  margin: 0px 4px 4px 0px;");

    document.getElementById('btn_nuevo').setAttribute("style", "display:none");
    document.getElementById('btn_delete').setAttribute("style", "display:none");
    document.getElementById('btn_editar').setAttribute("style", "display:none");
    document.getElementById('btn_buscar').setAttribute("style", "display:none");
    document.getElementById('btn_guardar').setAttribute("style", "display:block");

//    document.getElementById('txtcod').focus();
}

function nuev_piso(){
    document.getElementById('accion').value="1";
    document.getElementById('txtcod').value="";
    document.getElementById('txtdesc').value="";
    document.getElementById('observa').value="";


    document.getElementById('txtcod').disabled=false;
    document.getElementById('txtdesc').disabled=false;
    document.getElementById('observa').disabled=false;

    document.getElementById('btn_nuevo').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_delete').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_editar').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_buscar').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_guardar').setAttribute("style", "display:block;width: 60px;");

    document.getElementById('txtcod').focus()
}

function nuev_pabellon(){
    document.getElementById('accion').value="1";
    document.getElementById('txtcod').value="";
    document.getElementById('txtdesc').value="";
    document.getElementById('observa').value="";
    document.getElementById('sel_piso').value="";


    document.getElementById('txtcod').disabled=false;
    document.getElementById('txtdesc').disabled=false;
    document.getElementById('observa').disabled=false;
    document.getElementById('sel_piso').disabled=false;

    document.getElementById('btn_nuevo').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_delete').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_editar').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_buscar').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_guardar').setAttribute("style", "display:block;width: 60px;");

    document.getElementById('txtcod').focus()

}

function nueva_habita(){

    document.getElementById('accion').value="1";
    document.getElementById('txtcod').value="";
    document.getElementById('txtdesc').value="";
    document.getElementById('ncamas').value="";
    document.getElementById('sel_piso').selectedIndex=0;
    document.getElementById('t_habita').selectedIndex=0;
    document.getElementById('und_funcional').selectedIndex=0;
    document.getElementById('n_comple').selectedIndex=0;
    document.getElementById('estancia').selectedIndex=0;
    document.getElementById('observa').value="";
//    document.getElementById('ed_in').value="";
//    document.getElementById('edi_t').selectedIndex=0;
//    document.getElementById('ed_fi').value="";
//    document.getElementById('edf_t').selectedIndex=0;
//    document.getElementById('t_sex').selectedIndex=0;
//    document.getElementById('emba').checked=false;

    document.getElementById('txtcod').disabled=false;
    document.getElementById('txtdesc').disabled=false;
    document.getElementById('ncamas').disabled=false;
    document.getElementById('sel_piso').disabled=false;
    document.getElementById('t_habita').disabled=false;
    document.getElementById('und_funcional').disabled=false;
    document.getElementById('n_comple').disabled=false;
    document.getElementById('estancia').disabled=false;
    document.getElementById('observa').disabled=false;
//    document.getElementById('ed_in').disabled=false;
//    document.getElementById('edi_t').disabled=false;
//    document.getElementById('ed_fi').disabled=false;
//    document.getElementById('edf_t').disabled=false;
//    document.getElementById('t_sex').disabled=false;
//    document.getElementById('emba').disabled=false;


    document.getElementById('btn_nuevo').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_delete').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_editar').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_buscar').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_guardar').setAttribute("style", "display:block;width: 60px;");

    document.getElementById('txtcod').focus()

}

function nueva_cama(){

    document.getElementById('accion').value="1";
    document.getElementById('txtcod').value="";
    document.getElementById('txtdesc').value="";
    document.getElementById('t_cama').selectedIndex=0;
    document.getElementById('habita').selectedIndex=0;
    document.getElementById('observa').value="";

    document.getElementById('ed_in').value="";
    document.getElementById('edi_t').selectedIndex=0;
    document.getElementById('ed_fi').value="";
    document.getElementById('edf_t').selectedIndex=0;
    document.getElementById('t_sex').selectedIndex=0;
    document.getElementById('emba').checked=false;

    document.getElementById('txtcod').disabled=false;
    document.getElementById('txtdesc').disabled=false;
    document.getElementById('t_cama').disabled=false;
    document.getElementById('habita').disabled=false;
    document.getElementById('observa').disabled=false;

//    document.getElementById('ed_in').disabled=false;
//    document.getElementById('edi_t').disabled=false;
//    document.getElementById('ed_fi').disabled=false;
//    document.getElementById('edf_t').disabled=false;
//    document.getElementById('t_sex').disabled=false;
//    document.getElementById('emba').disabled=false;


    document.getElementById('btn_nuevo').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_delete').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_editar').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_buscar').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_guardar').setAttribute("style", "display:block;width: 60px;");

    document.getElementById('txtcod').focus()

}

function editar_cama(){

    document.getElementById('accion').value="2";
    document.getElementById('txtdesc').disabled=false;
    document.getElementById('t_cama').disabled=false;
    document.getElementById('habita').disabled=false;
    document.getElementById('observa').disabled=false;
    document.getElementById('rest').disabled=false;

    if(document.getElementById('rest').checked==true){
        document.getElementById('ed_in').disabled=false;
        document.getElementById('edi_t').disabled=false;
        document.getElementById('ed_fi').disabled=false;
        document.getElementById('edf_t').disabled=false;
        document.getElementById('t_sex').disabled=false;
        document.getElementById('emba').disabled=false;
    }else{
        document.getElementById('ed_in').disabled=true;
        document.getElementById('edi_t').disabled=true;
        document.getElementById('ed_fi').disabled=true;
        document.getElementById('edf_t').disabled=true;
        document.getElementById('t_sex').disabled=true;
        document.getElementById('emba').disabled=true;
    }




    document.getElementById('btn_nuevo').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_delete').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_editar').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_buscar').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_guardar').setAttribute("style", "display:block;width: 60px;");

    document.getElementById('txtcod').focus()

}

function act_emba(){
    t_ser=document.getElementById('t_sex').value;
    if(t_ser=="3"){
        document.getElementById('emba').disabled=false;
    }else{
         document.getElementById('emba').disabled=true;
    }
}

function guardar_cama(){

    acc=document.getElementById("accion").value;
    txtcod=document.getElementById('txtcod').value;
    txtdesc=document.getElementById('txtdesc').value;
    t_cama=document.getElementById('t_cama').value;
    habita=document.getElementById('habita').value;
    observa=document.getElementById('observa').value;

    ed_in=document.getElementById('ed_in').value;
    edi_t=document.getElementById('edi_t').value;
    ed_fi=document.getElementById('ed_fi').value;
    edf_t=document.getElementById('edf_t').value;
    t_sex=document.getElementById('t_sex').value;

    var chabi="";
    if(document.getElementById('chabi').checked==true){
        chabi="s";
    }else{
        chabi="n";
    }

    var emba="";
    if(document.getElementById('emba').checked==true){
       emba="s";
    }else{
        emba="n";
    }

    var rest="";
    if(document.getElementById('rest').checked==true){
        rest="s";
    }else{
        rest="n";
    }

     if(txtcod==""){
      alert("Digite el Codigo de la Habitacion");
      document.getElementById("txtcod").focus();
   }else if(txtdesc==""){
       alert("Digite la Descripci\u00f3n");
      document.getElementById("txtdesc").focus();
   }else if(ncamas==""){
       alert("Digite el Numero de Camas");
      document.getElementById("ncamas").focus();
   }else{
       var variables="txtcod=" + txtcod + "&txtdesc=" + txtdesc + "&t_cama=" + t_cama + "&habita=" + habita + "&observa=" + observa
           + "&acc=" + acc +"&chabi="+ chabi +"&rest="+rest+"&ed_in=" + ed_in +"&edi_t="+ edi_t +"&ed_fi="+ed_fi+"&edf_t="+ edf_t +"&t_sex="+t_sex+"&emba="+emba;;
       guardar('../guar_cama',variables,'cama');

   }

}

function guardar_habita(){
    acc=document.getElementById("accion").value;
    accion=document.getElementById('accion').value;
    txtcod=document.getElementById('txtcod').value;
    txtdesc=document.getElementById('txtdesc').value;
    ncamas=document.getElementById('ncamas').value;
    sel_piso=document.getElementById('sel_piso').value;
    t_habita=document.getElementById('t_habita').value;
    und_funcional=document.getElementById('und_funcional').value;
    n_comple=document.getElementById('n_comple').value;
    estancia=document.getElementById('estancia').value;
    observa=document.getElementById('observa').value;
//    ed_in=document.getElementById('ed_in').value;
//    edi_t=document.getElementById('edi_t').value;
//    ed_fi=document.getElementById('ed_fi').value;
//    edf_t=document.getElementById('edf_t').value;
//    t_sex=document.getElementById('t_sex').value;
//    var emba="";
//    if(document.getElementById('emba').checked==true){
//       emba="s";
//    }else{
//        emba="n";
//    }

     if(txtcod==""){
      alert("Digite el Codigo de la Habitacion");
      document.getElementById("txtcod").focus();
   }else if(txtdesc==""){
       alert("Digite la Descripci\u00f3n");
      document.getElementById("txtdesc").focus();
   }else if(ncamas==""){
       alert("Digite el Numero de Camas");
      document.getElementById("ncamas").focus();
   }else{
       var variables="txtcod=" + txtcod + "&txtdesc=" + txtdesc + "&ncamas=" + ncamas + "&sel_piso=" + sel_piso + "&t_habita=" + t_habita + "&und_funcional=" + und_funcional
           + "&n_comple=" + n_comple+ "&estancia=" + estancia+ "&observa=" + observa+ "&acc=" + acc;
       guardar('../guar_habita',variables,'habita');

   }

}

function restri_cama(){
    if(document.getElementById('rest').checked==true){
    document.getElementById('ed_in').disabled=false;
    document.getElementById('edi_t').disabled=false;
    document.getElementById('ed_fi').disabled=false;
    document.getElementById('edf_t').disabled=false;
    document.getElementById('t_sex').disabled=false;
    document.getElementById('emba').disabled=true;

    }else{
    document.getElementById('ed_in').disabled=true;
    document.getElementById('edi_t').disabled=true;
    document.getElementById('ed_fi').disabled=true;
    document.getElementById('edf_t').disabled=true;
    document.getElementById('t_sex').disabled=true;

    }

}

function editar_habita(){
     document.getElementById('accion').value="2";
    document.getElementById('txtcod').disabled=false;
    document.getElementById('txtdesc').disabled=false;
    document.getElementById('ncamas').disabled=false;
    document.getElementById('sel_piso').disabled=false;
    document.getElementById('t_habita').disabled=false;
    document.getElementById('und_funcional').disabled=false;
    document.getElementById('n_comple').disabled=false;
    document.getElementById('estancia').disabled=false;
    document.getElementById('observa').disabled=false;


    document.getElementById('btn_nuevo').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_delete').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_editar').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_buscar').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_guardar').setAttribute("style", "display:block;width: 60px;");

    document.getElementById('txtcod').focus()
}

function guardar_piso(){
   acc=document.getElementById("accion").value;
   txtcod=document.getElementById('txtcod').value;
   txtdes= document.getElementById('txtdesc').value;
   txtobser= document.getElementById('observa').value;

   if(txtcod==""){
      alert("Digite el Codigo del Piso");
      document.getElementById("txtcod").focus();
   }else if(txtdes==""){
       alert("Digite la Descripci\u00f3n");
      document.getElementById("txtdesc").focus();
   }else{
       var variables="txtcod=" + txtcod + "&txtdes=" + txtdes + "&txtobser=" + txtobser + "&acc=" + acc;
       guardar('../guar_piso',variables,'piso');

   }
}

function guardar_pabellon(){
   acc=document.getElementById("accion").value;
   txtcod=document.getElementById('txtcod').value;
   txtdes= document.getElementById('txtdesc').value;
   txtobser= document.getElementById('observa').value;
   sel_piso= document.getElementById('sel_piso').value;

   if(txtcod==""){
      alert("Digite el Codigo del Pabell\u00f3n");
      document.getElementById("txtcod").focus();
   }else if(txtdes==""){
       alert("Digite la Descripci\u00f3n");
      document.getElementById("txtdesc").focus();
   }else{
       var variables="txtcod=" + txtcod + "&txtdes=" + txtdes + "&txtobser=" + txtobser + "&acc=" + acc +"&sel_piso="+sel_piso;
       guardar('../guar_pabe',variables,'pabe');

   }
}

function guardar_thabi(){
   acc=document.getElementById("accion").value;
   txtcod=document.getElementById('txtcod').value;
   txtdes= document.getElementById('txtdesc').value;
   txtobser= document.getElementById('observa').value;


   if(txtcod==""){
      alert("Digite el Codigo del Tipo de Habitaci\u00f3n");
      document.getElementById("txtcod").focus();
   }else if(txtdes==""){
       alert("Digite la Descripci\u00f3n");
      document.getElementById("txtdesc").focus();
   }else{
       var variables="txtcod=" + txtcod + "&txtdes=" + txtdes + "&txtobser=" + txtobser + "&acc=" + acc ;
       guardar('../guar_thabitacion',variables,'thabita');

   }
}

function guardar_tcama(){
   acc=document.getElementById("accion").value;
   txtcod=document.getElementById('txtcod').value;
   txtdes= document.getElementById('txtdesc').value;
   txtobser= document.getElementById('observa').value;


   if(txtcod==""){
      alert("Digite el Codigo del Tipo de Habitaci\u00f3n");
      document.getElementById("txtcod").focus();
   }else if(txtdes==""){
       alert("Digite la Descripci\u00f3n");
      document.getElementById("txtdesc").focus();
   }else{
       var variables="txtcod=" + txtcod + "&txtdes=" + txtdes + "&txtobser=" + txtobser + "&acc=" + acc ;
       guardar('../guar_tcama',variables,'tcama');

   }
}

function guardar_programa(){

   acc=document.getElementById("accion").value;
   txtcod=document.getElementById('txtcod').value;
   txtdes= document.getElementById('txtdesc').value;
   txtobser= document.getElementById('observa').value;


   if(txtcod==""){
      alert("Digite el Codigo del Programa");
      document.getElementById("txtcod").focus();
   }else if(txtdes==""){
       alert("Digite la Descripci\u00f3n");
      document.getElementById("txtdesc").focus();
   }else{
       var variables="txtcod=" + txtcod + "&txtdes=" + txtdes + "&txtobser=" + txtobser
        + "&acc=" + acc;
       guardar('../guardar_programa',variables,'programa');

   }

}

function guardar_area(){

   acc=document.getElementById("accion").value;
   txtcod=document.getElementById('txtcod').value;
   txtdes= document.getElementById('txtdesc').value;
   txtobser= document.getElementById('observa').value;
   id_modu= document.getElementById('modu').value;


   proc= document.getElementById('proc').value;
   medica= document.getElementById('medica').value;
   prest= document.getElementById('prest').value;


   var ctmod="";
   if(document.getElementById("cmode").checked==true){
        ctmod="s";
    }else{
        ctmod="n";
    }

   if(txtcod==""){
      alert("Digite el Codigo del Area");
      document.getElementById("txtcod").focus();
   }else if(txtdes==""){
       alert("Digite la Descripci\u00f3n");
      document.getElementById("txtdesc").focus();
   }else{
       var variables="txtcod=" + txtcod + "&txtdes=" + txtdes + "&txtobser=" + txtobser
        + "&ctmod=" + ctmod + "&acc=" + acc +"&proc="+proc +"&medica="+medica +"&prest="+prest+"&id_modu="+id_modu;
       guardar('../guardar_areas',variables,'area');

   }

}

function editar_piso(){

    txtcod=document.getElementById('txtcod').value;
    if(txtcod==""){
        alert("No existe Ningun Registro Para Editar");
    }else{
        document.getElementById('accion').value="2";
        document.getElementById('txtdesc').disabled=false;
        document.getElementById('observa').disabled=false;


        document.getElementById('btn_nuevo').setAttribute("style", "display:none;width: 60px;");
        document.getElementById('btn_delete').setAttribute("style", "display:none;width: 60px;");
        document.getElementById('btn_editar').setAttribute("style", "display:none;width: 60px;");
        document.getElementById('btn_buscar').setAttribute("style", "display:none;width: 60px;");
        document.getElementById('btn_guardar').setAttribute("style", "display:block;width: 60px;");

        document.getElementById('txtdesc').focus();
    }

}

function editar_piso(){

    txtcod=document.getElementById('txtcod').value;
    if(txtcod==""){
        alert("No existe Ningun Registro Para Editar");
    }else{
        document.getElementById('accion').value="2";
        document.getElementById('txtdesc').disabled=false;
        document.getElementById('observa').disabled=false;


        document.getElementById('btn_nuevo').setAttribute("style", "display:none;width: 60px;");
        document.getElementById('btn_delete').setAttribute("style", "display:none;width: 60px;");
        document.getElementById('btn_editar').setAttribute("style", "display:none;width: 60px;");
        document.getElementById('btn_buscar').setAttribute("style", "display:none;width: 60px;");
        document.getElementById('btn_guardar').setAttribute("style", "display:block;width: 60px;");

        document.getElementById('txtdesc').focus();
    }

}

function editar_pabellon(){

    txtcod=document.getElementById('txtcod').value;
    if(txtcod==""){
        alert("No existe Ningun Registro Para Editar");
    }else{
        document.getElementById('accion').value="2";
        document.getElementById('txtdesc').disabled=false;
        document.getElementById('observa').disabled=false;
        document.getElementById('sel_piso').disabled=false;

        document.getElementById('btn_nuevo').setAttribute("style", "display:none");
        document.getElementById('btn_delete').setAttribute("style", "display:none");
        document.getElementById('btn_editar').setAttribute("style", "display:none");
        document.getElementById('btn_buscar').setAttribute("style", "display:none");
        document.getElementById('btn_guardar').setAttribute("style", "display:block");

        document.getElementById('txtdesc').focus();

    }

}

function delete_area(){

    if (confirm("\xbfEsta seguro de realizar la operaci\xf3n?")){
    var txtcod=document.getElementById("txtcod").value;
    ajax=ObjetoAjax();
    ajax.open("POST", "../guardar_areas", true);
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("txtcod="+txtcod+"&acc=3");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            if(trimAll(ajax.responseText) =="bien"){
                 alert("Operaci\u00f3n Realizada Exitosamente");
                 document.location = "../ges_areas_serv";
            }
        }
    }
  }
}

function delete_programa(){

    if (confirm("\xbfEsta seguro de realizar la operaci\xf3n?")){
    var txtcod=document.getElementById("txtcod").value;
    ajax=ObjetoAjax();
    ajax.open("POST", "../guardar_programa", true);
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("txtcod="+txtcod+"&acc=3");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            if(trimAll(ajax.responseText) =="bien"){
                 alert("Operaci\u00f3n Realizada Exitosamente");
                 document.location = "../ges_progPromyPrev";
            }
        }
    }
  }
}

function buscar_areas(){
        window.open("../most_areas","ventana_areas","width=1100, height=580, scrollbars=no, menubar=no, location=no, resizable=no");
}

//function A(c,i){
//    document.getElementById(i).style.backgroundColor=c;
//}

function cambiacolor_over(id){
//    celda.style.backgroundColor="#E2F0FD"


    document.getElementById(id).style.backgroundColor="#E2F0FD";

}

function cambiacolor_out(id){
id2=id.substring(1);
if(document.getElementById("check"+id2).checked!=true){
 document.getElementById(id).style.backgroundColor="#ffffff";
}

}
function cambiacolor_out2(id){
id2=id.substring(1);
if(document.getElementById("check2"+id2).checked!=true){
 document.getElementById(id).style.backgroundColor="#ffffff";
}

}

function cambiacolor_out3(id){
id2=id.substring(1);
if(document.getElementById("check3"+id2).checked!=true){
 document.getElementById(id).style.backgroundColor="#ffffff";
}

}


function cambiacolor_out2(id){
id2=id.substring(1);
if(document.getElementById("check2"+id2).checked!=true){
 document.getElementById(id).style.backgroundColor="#ffffff";
}
}


function cambiacolor_out3(id){
id2=id.substring(1);
if(document.getElementById("check3"+id2).checked!=true){
 document.getElementById(id).style.backgroundColor="#ffffff";
}

}


function sel_area(){

    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    window.opener.document.location="../ges_areas_serv?busq=B&pri=T&cod="+valor;
    self.close();


}

function sel_fila2(id){
    id2=id.substring(2);

    if( document.getElementById("check2"+id2).checked==true){
        document.getElementById("check2"+id2).checked=false;
    }else{

         document.getElementById("check2"+id2).checked=true;
    }


    var num_elementos = document.getElementsByName("seleccion2").length;

    for( var contador=1; contador <= num_elementos; contador++ ){			//

        if(document.getElementById("check2"+contador).checked == true){	//> se obtiene el value del check seleccionado

            document.getElementById("f2"+contador).style.backgroundColor="#E2F0FD";
        }else{
            document.getElementById("f2"+contador).style.backgroundColor="#ffffff";
        }
    }
}


function sel_fila(id){
    id2=id.substring(1);

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



function sel_filaS(id){
    id2=id.substring(1);

    document.getElementById("check"+id2).checked=true;

//    var num_elementos = document.getElementsByName("seleccion").length;
//
//    for( var contador=1; contador <= num_elementos; contador++ ){			//
//        if(document.getElementById("check"+contador).checked == true){	//> se obtiene el value del check seleccionado
//            document.getElementById("f"+contador).style.backgroundColor="#ffffff";
//        }
//    }
}



function sel_fila3(id){
    id2=id.substring(2);

    document.getElementById("check3"+id2).checked=true;

    var num_elementos = document.getElementsByName("seleccion3").length;

    for( var contador=1; contador <= num_elementos; contador++ ){			//
        if(document.getElementById("check3"+contador).checked == true){	//> se obtiene el value del check seleccionado
            document.getElementById("f3"+contador).style.backgroundColor="#E2F0FD";
        }else{
            document.getElementById("f3"+contador).style.backgroundColor="#ffffff";
        }
    }
}

function Busqueda_area(or){
    tip_bus=document.getElementById("t_bus_areas").value;
    busq=  document.getElementById("busqueda_areas").value;
    ajax = ObjetoAjax();
    ajax.open("POST", "../most_areas", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&control=2");
    ajax.onreadystatechange=function() {
          if (ajax.readyState==4) {
               if(or=="rest"){
                    document.getElementById('td_tabla1').innerHTML = ajax.responseText
               }else{
                   document.getElementById('td_tabla').innerHTML = ajax.responseText
               }

            }
        }
}


function abrir_cuenta(proc){

    if(document.getElementById('accion').value!="0"){
        if(proc=="planAdmi0"){
            if(document.getElementById('retFact').checked==true){
                window.open("../sel_cuenta?proc="+proc,"ventana_cuentas","width=550, height=580, scrollbars=no, menubar=no, location=no, resizable=no");
            }
        }else{
            window.open("../sel_cuenta?proc="+proc,"ventana_cuentas","width=550, height=580, scrollbars=no, menubar=no, location=no, resizable=no");
        }
    }
}


function sel_cuenta_admin(ori){

   var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }
    var pvalor=valor.split("//");
    if(ori=="dproc"){
      document.getElementById("txtctacontable").value=pvalor[0];
      document.getElementById("desctacontable").value=pvalor[1];
      document.getElementById("buscacuentas").style.visibility = 'hidden';
    }else{
      document.getElementById("txtctacontable").value=pvalor[0];
      document.getElementById("buscacuentas").style.visibility = 'hidden';
    }

}
function sel_cuenta(){
   proc=document.getElementById("proc").value;
   var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }
    var pvalor=valor.split("//");


    if(proc=="proc1"){
       opener.document.getElementById("txtctacontable").value=pvalor[0];
    }else if(proc=="planAdmi1"){
         opener.document.getElementById("ctaxcobra").value=pvalor[0];
    }else if(proc=="planAdmi2"){
         opener.document.getElementById("ctaporc").value=pvalor[0];
    }else if(proc=="planAdmi3"){
         opener.document.getElementById("ctadesc").value=pvalor[0];
    }else if(proc=="planAdmi4"){
         opener.document.getElementById("ctacop").value=pvalor[0];
    }else if(proc=="planAdmi5"){
         opener.document.getElementById("ctacuot").value=pvalor[0];
    }else if(proc=="planAdmi6"){
         opener.document.getElementById("ctacapit").value=pvalor[0];
    }else if(proc=="planAdmi0"){
         opener.document.getElementById("ctaretenc").value=pvalor[0];
    }else if(proc=="ctains1"){
         opener.document.getElementById("insctaing").value=pvalor[0];
         opener.document.getElementById("insctaingdes").value=pvalor[1];
    }else if(proc=="ctains2"){
         opener.document.getElementById("insctacot").value=pvalor[0];
         opener.document.getElementById("insctacotdes").value=pvalor[1];
    }else if(proc=="ctains3"){
         opener.document.getElementById("insctagast").value=pvalor[0];
         opener.document.getElementById("insctagastdes").value=pvalor[1];
    }else if(proc=="ctamed1"){
         opener.document.getElementById("medctaing").value=pvalor[0];
         opener.document.getElementById("medctaingdes").value=pvalor[1];
    }else if(proc=="ctamed2"){
         opener.document.getElementById("medctacot").value=pvalor[0];
         opener.document.getElementById("medctacotdes").value=pvalor[1];
    }else if(proc=="ctamed3"){
         opener.document.getElementById("medctagat").value=pvalor[0];
         opener.document.getElementById("medctagatdes").value=pvalor[1];
    }else if(proc=="parconta1"){
         opener.document.getElementById("ctaanest").value=pvalor[0];
    }else if(proc=="parconta2"){
         opener.document.getElementById("ctasalp").value=pvalor[0];
    }else if(proc=="parconta3"){
         opener.document.getElementById("ctaobstet").value=pvalor[0];
    }else if(proc=="parconta4"){
         opener.document.getElementById("ctadsal").value=pvalor[0];
    }else if(proc=="parconta5"){
         opener.document.getElementById("ctacir").value=pvalor[0];
    }else if(proc=="parconta6"){
         opener.document.getElementById("ctamate").value=pvalor[0];
    }else if(proc=="parconta7"){
         opener.document.getElementById("ctacaja").value=pvalor[0];
    }

    window.close();
}


function Busqueda_cuenta(){
    tip_bus=document.getElementById("t_bus_cuent").value;
    busq=  document.getElementById("busquedacuent").value;
    ajax = ObjetoAjax();
    ajax.open("POST", "../sel_cuenta", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&control=2");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_tabla').innerHTML = ajax.responseText
        }
    }
}

function arriba(opc){
    acc=document.getElementById("accion").value;

   if(acc!="0"){
    if(opc=="ar1"){
      val1=document.getElementById("txtuini").value;
      val1=parseInt(val1)+1;
      if(val1<=1000){
      document.getElementById("txtuini").value=val1;
      }
   }

 if(opc=="ar2"){
      val1=document.getElementById("txtufin").value;
      val1=parseInt(val1)+1;
      if(val1<=1000){
      document.getElementById("txtufin").value=val1;
      }
   }
 }
}

function abajo(opc){
    acc=document.getElementById("accion").value;

    if(acc!="0"){
        if(opc=="ab1"){
            val1=document.getElementById("txtuini").value;
            val1=parseInt(val1)-1;
            if(val1>-1){
                document.getElementById("txtuini").value=val1;
            }
        }

        if(opc=="ab2"){
            val1=document.getElementById("txtufin").value;
            val1=parseInt(val1)-1;
            if(val1>-1){
                document.getElementById("txtufin").value=val1;
            }
        }
    }
}

function nuevo_salarios(){

    document.getElementById('accion').value="1";
    document.getElementById('txtanio').value="";
    document.getElementById('txtvalsal').value="";
    document.getElementById('txtvaluvr').value="";

    document.getElementById('txtanio').disabled=false;
    document.getElementById('txtvalsal').disabled=false;
    document.getElementById('txtvaluvr').disabled=false;


    document.getElementById('btn_nuevo').setAttribute("style", "display:none");
//    document.getElementById('btn_delete').setAttribute("style", "display:none");
    document.getElementById('btn_editar').setAttribute("style", "display:none");
//    document.getElementById('btn_buscar').setAttribute("style", "display:none");
    document.getElementById('btn_guardar').setAttribute("style", "display:block");

    document.getElementById('txtanio').focus();

}

function guardar_salarios(){

    acc=document.getElementById("accion").value;
    txtanio=document.getElementById('txtanio').value;
    txtvalsal= document.getElementById('txtvalsal').value.replace(".","").replace(".","").replace(",",".");
    txtvaluvr= document.getElementById('txtvaluvr').value.replace(".","").replace(".","").replace(",",".");

    if(txtanio==""){
        alert("Digite el A\u00f1o del Salario");
        document.getElementById("txtanio").focus();

    }else if(txtvalsal==""){
        alert("Digite el Valor del Salario");
        document.getElementById("txtvalsal").focus();
    }else{
        var variables="txtanio=" + txtanio + "&txtvalsal=" + txtvalsal + "&txtvaluvr=" + txtvaluvr
        + "&acc=" + acc;

        guardar('../guardar_salarios',variables,'salario');

    }
}

function aditar_salarios(){

    document.getElementById('accion').value="2";

    document.getElementById('txtanio').disabled=false;
    document.getElementById('txtvalsal').disabled=false;
    document.getElementById('txtvaluvr').disabled=false;

    document.getElementById('btn_nuevo').setAttribute("style", "display:none");
//    document.getElementById('btn_delete').setAttribute("style", "display:none");
    document.getElementById('btn_editar').setAttribute("style", "display:none");
//    document.getElementById('btn_buscar').setAttribute("style", "display:none");
    document.getElementById('btn_guardar').setAttribute("style", "display:block");

    document.getElementById('txtanio').focus();

}


function delete_salarios(){

    if (confirm("\xbfEsta seguro de realizar la operaci\xf3n?")){
    var txtcod=document.getElementById("txtanio").value;
    ajax=ObjetoAjax();
    ajax.open("POST", "../guardar_salarios", true);
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("txtcod="+txtcod+"&acc=3");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            if(trimAll(ajax.responseText) =="bien"){
                 alert("Operaci\u00f3n Realizada Exitosamente");
                 document.location = "../ges_salarios";
            }
        }
    }
  }
}

function buscar_salarios(){
    window.open("../most_salarios","ventana_salarios","width=500, height=580, scrollbars=no, menubar=no, location=no, resizable=no");

}


function sel_salario(){

    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    window.opener.document.location="../ges_salarios?busq=B&pri=T&cod="+valor;
    self.close();

}


function Busqueda_salario(){

    tip_bus=document.getElementById("t_bus").value;
    busq=  document.getElementById("busqueda").value;
    ajax = ObjetoAjax();
    ajax.open("POST", "../most_salarios", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&control=2");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_tabla').innerHTML = ajax.responseText
        }
    }

}


function nuevo_grupSOAT(){

    document.getElementById('accion').value="1";

    document.getElementById('txtcodgrup').value="";

    document.getElementById('txtvciru').value="";
    document.getElementById('txtcodcir').value="";
    document.getElementById('txtvalcir').value="0,00";

    document.getElementById('txtvanes').value="";
    document.getElementById('txtcodanes').value="";
    document.getElementById('txtvalanes').value="0,00";

    document.getElementById('txtvayud').value="";
    document.getElementById('txtcodayud').value="";
    document.getElementById('txtvalayud').value="0,00";

    document.getElementById('txtvsal').value="";
    document.getElementById('txtcodsal').value="";
    document.getElementById('txtvalsal').value="0,00";

    document.getElementById('txtvmate').value="";
    document.getElementById('txtcodmate').value="";
    document.getElementById('txtvalmate').value="0,00";

    document.getElementById('observa').value="";


    document.getElementById('txtcodgrup').disabled=false;

    document.getElementById('txtvciru').disabled=false;
    document.getElementById('txtcodcir').disabled=false;

    document.getElementById('txtvanes').disabled=false;
    document.getElementById('txtcodanes').disabled=false;

    document.getElementById('txtvayud').disabled=false;
    document.getElementById('txtcodayud').disabled=false;

    document.getElementById('txtvsal').disabled=false;
    document.getElementById('txtcodsal').disabled=false;


    document.getElementById('txtvmate').disabled=false;
    document.getElementById('txtcodmate').disabled=false;

    document.getElementById('observa').disabled=false;


    document.getElementById('btn_nuevo').setAttribute("style", "display:none");
    document.getElementById('btn_delete').setAttribute("style", "display:none");
    document.getElementById('btn_editar').setAttribute("style", "display:none");
    document.getElementById('btn_buscar').setAttribute("style", "display:none");
    document.getElementById('btn_guardar').setAttribute("style", "display:block");

    document.getElementById('txtcodgrup').focus();

}

function guardar_grupSOAT(){

    accion=document.getElementById('accion').value;

    txtcodgrup=document.getElementById('txtcodgrup').value;

    txtvciru=document.getElementById('txtvciru').value.replace(",",".");
    txtcodcir=document.getElementById('txtcodcir').value;
    txtvalcir=document.getElementById('txtvalcir').value;

    txtvanes=document.getElementById('txtvanes').value.replace(",",".");
    txtcodanes=document.getElementById('txtcodanes').value;
    txtvalanes=document.getElementById('txtvalanes').value;

    txtvayud=document.getElementById('txtvayud').value.replace(",",".");
    txtcodayud=document.getElementById('txtcodayud').value;
    txtvalayud=document.getElementById('txtvalayud').value;

    txtvsal=document.getElementById('txtvsal').value.replace(",",".");
    txtcodsal=document.getElementById('txtcodsal').value;
    txtvalsal=document.getElementById('txtvalsal').value;

    txtvmate=document.getElementById('txtvmate').value.replace(",",".");
    txtcodmate=document.getElementById('txtcodmate').value;
    txtvalmate=document.getElementById('txtvalmate').value;

    observa=document.getElementById('observa').value;

    if(txtcodgrup==""){
        alert("Digite el C\u00f3digo del Grupo");
        document.getElementById("txtcodgrup").focus();
    }else if(txtvciru==""){
        alert("Digite Puntos Cirugia");
        document.getElementById("txtvciru").focus();
    }else if(txtcodcir==""){
        alert("Digite el C\u00f3digo de la Cirugia");
        document.getElementById("txtcodcir").focus();
    }else if(txtvanes==""){
        alert("Digite Puntos Anestesia");
        document.getElementById("txtvanes").focus();
    }else if(txtcodanes==""){
        alert("Digite el C\u00f3digo de la Anestesia");
        document.getElementById("txtvanes").focus();
    }else if(txtvayud==""){
        alert("Digite Puntos Ayudant\u00eda");
        document.getElementById("txtvayud").focus();
    }else if(txtcodayud==""){
        alert("Digite el C\u00f3digo de la Ayudant\u00eda");
        document.getElementById("txtcodayud").focus();
    }else if(txtvsal==""){
        alert("Digite Puntos Sala");
        document.getElementById("txtvsal").focus();
    }else if(txtcodsal==""){
        alert("Digite el C\u00f3digo de Sala");
        document.getElementById("txtcodsal").focus();
    }else if(txtvmate==""){
        alert("Digite Puntos Materiales");
        document.getElementById("txtvmate").focus();
    }else if(txtcodmate==""){
        alert("Digite el C\u00f3digo de Materiales");
        document.getElementById("txtcodmate").focus();
    }else{
        var variables="txtcodgrup=" + txtcodgrup + "&txtvciru=" + txtvciru + "&txtcodcir=" + txtcodcir
        + "&txtvanes=" + txtvanes + "&txtcodanes=" + txtcodanes + "&txtvayud=" + txtvayud
        + "&txtcodayud=" + txtcodayud + "&txtvsal=" + txtvsal + "&txtcodsal=" + txtcodsal
        + "&txtvmate=" + txtvmate + "&txtcodmate=" + txtcodmate + "&observa=" + observa + "&acc=" + accion;

        guardar('../guardar_grupSOAT',variables,'grupSOAT');

    }

}

function redondeoDecimales(numero)
{
    var fact = Math.pow(10, 2); // 10 elevado a ndec
    return Math.round(numero * fact) / fact;
}

function calvalor(id){

    valsalario= parseFloat(document.getElementById('txtvalsalario').value.replace(".","").replace(".","").replace(",","."));
    vcal=parseFloat(document.getElementById(id).value.replace(",","."));

    vtot=valsalario*vcal;
    rta=eval(vtot.toFixed(2));

    res=rta.toString().split('.');
    if(res[1]== undefined) {
        res[1]='00';
    }
    if(res[1].length<2) {
        res[1]=res[1]+'0';
    }

    if(id=="txtvciru"){
        document.getElementById("txtvalcir").value= moneda(res[0])+","+res[1];
    }else if(id=="txtvanes"){
        document.getElementById("txtvalanes").value= moneda(res[0])+","+res[1];
    }else if(id=="txtvayud"){
        document.getElementById("txtvalayud").value= moneda(res[0])+","+res[1];
    }else if(id=="txtvsal"){
        document.getElementById("txtvalsal").value= moneda(res[0])+","+res[1];
    }else if(id=="txtvmate"){
        document.getElementById("txtvalmate").value= moneda(res[0])+","+res[1];
    }
}

function moneda(num) {
    num = num.toString().replace(/\$|\,/g,'');

    if (isNaN(num))
        num = '0';

    var signo = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    centavos = num % 100;
    num = Math.floor(num / 100).toString();

    if (centavos < 10){
        centavos = '0' + centavos;
    }

    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++){
        num = num.substring(0, num.length - (4 * i + 3)) + '.' + num.substring(num.length - (4 * i + 3));
    }
    return (((signo) ? '' : '-') + num );
}

function aditar_grupSOAT(){

    txtcodgrup=document.getElementById('txtcodgrup').value;
    if(txtcodgrup==""){
        alert("No existe Ningun Registro Para Editar");
    }else{
     document.getElementById('accion').value="2";
    document.getElementById('txtvciru').disabled=false;
    document.getElementById('txtcodcir').disabled=false;

    document.getElementById('txtvanes').disabled=false;
    document.getElementById('txtcodanes').disabled=false;

    document.getElementById('txtvayud').disabled=false;
    document.getElementById('txtcodayud').disabled=false;

    document.getElementById('txtvsal').disabled=false;
    document.getElementById('txtcodsal').disabled=false;

    document.getElementById('txtvmate').disabled=false;
    document.getElementById('txtcodmate').disabled=false;

    document.getElementById('observa').disabled=false;

    document.getElementById('btn_nuevo').setAttribute("style", "display:none");
    document.getElementById('btn_delete').setAttribute("style", "display:none");
    document.getElementById('btn_editar').setAttribute("style", "display:none");
    document.getElementById('btn_buscar').setAttribute("style", "display:none");
    document.getElementById('btn_guardar').setAttribute("style", "display:block");

    document.getElementById('txtcodcir').focus();
    }
 }

function delete_grupSOAT(){

    if (confirm("\xbfEsta seguro de realizar la operaci\xf3n?")){
    var txtcod=document.getElementById("txtcodgrup").value;
    ajax=ObjetoAjax();
    ajax.open("POST", "../guardar_grupSOAT", true);
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("txtcod="+txtcod+"&acc=3");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            if(trimAll(ajax.responseText) =="bien"){
                 alert("Operaci\u00f3n Realizada Exitosamente");
                 document.location = "../ges_Grup_quirurgicoSOAT";
            }
        }
    }
  }
}


function sel_grupSOAT(){

    window.open("../most_grupSOAT","ventana_GrupSOAT","width=1100, height=580, scrollbars=no, menubar=no, location=no, resizable=no");
}

function sel_grupSOAT(){

    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    window.opener.document.location="../ges_Grup_quirurgicoSOAT?busq=B&pri=T&cod="+valor;
    self.close();
}


function Busqueda_grupSOAT(){

    tip_bus=document.getElementById("t_bus").value;
    busq=  document.getElementById("busqueda").value;
    ajax = ObjetoAjax();
    ajax.open("POST", "../most_grupSOAT", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&control=2");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_tabla').innerHTML = ajax.responseText
        }
    }

}

function nuevo_porcQx(){

    document.getElementById('accion').value="1";

    document.getElementById('txtcod').value="";
    document.getElementById('txtdesc').value="";

    document.getElementById('txtvciruSOAT').value="0,00";
    document.getElementById('txtanesSOAT').value="0,00";
    document.getElementById('txtayuSOAT').value="0,00";
    document.getElementById('txtsalaSOAT').value="0,00";
    document.getElementById('txtanesSOAT').value="0,00";
    document.getElementById('txtmaterSOAT').value="0,00";

    document.getElementById('txtvciruISS').value="0,00";
    document.getElementById('txtanesISS').value="0,00";
    document.getElementById('txtayuISS').value="0,00";
    document.getElementById('txtsalaISS').value="0,00";
    document.getElementById('txtmaterISS').value="0,00";

    document.getElementById('observa').value="";


    document.getElementById('txtcod').disabled=false;
    document.getElementById('txtdesc').disabled=false;

    document.getElementById('txtvciruSOAT').disabled=false;
    document.getElementById('txtanesSOAT').disabled=false;
    document.getElementById('txtayuSOAT').disabled=false;
    document.getElementById('txtsalaSOAT').disabled=false;
    document.getElementById('txtmaterSOAT').disabled=false;

    document.getElementById('txtvciruISS').disabled=false;
    document.getElementById('txtanesISS').disabled=false;
    document.getElementById('txtayuISS').disabled=false;
    document.getElementById('txtsalaISS').disabled=false;
    document.getElementById('txtmaterISS').disabled=false;

    document.getElementById('observa').disabled=false;


    document.getElementById('btn_nuevo').setAttribute("style", "display:none");
    document.getElementById('btn_delete').setAttribute("style", "display:none");
    document.getElementById('btn_editar').setAttribute("style", "display:none");
    document.getElementById('btn_buscar').setAttribute("style", "display:none");
    document.getElementById('btn_guardar').setAttribute("style", "display:block");

    document.getElementById('txtcod').focus();

}

function guardar_porcQx(){

   accion=document.getElementById('accion').value;
   txtcod=document.getElementById('txtcod').value;
   txtdesc=document.getElementById('txtdesc').value;

   txtvciruSOAT=document.getElementById('txtvciruSOAT').value.replace(",",".");
   txtanesSOAT=document.getElementById('txtanesSOAT').value.replace(",",".");
   txtayuSOAT=document.getElementById('txtayuSOAT').value.replace(",",".");
   txtsalaSOAT=document.getElementById('txtsalaSOAT').value.replace(",",".");
   txtmaterSOAT=document.getElementById('txtmaterSOAT').value.replace(",",".");

   txtvciruISS=document.getElementById('txtvciruISS').value.replace(",",".");
   txtanesISS=document.getElementById('txtanesISS').value.replace(",",".");
   txtayuISS=document.getElementById('txtayuISS').value.replace(",",".");
   txtsalaISS=document.getElementById('txtsalaISS').value.replace(",",".");
   txtmaterISS=document.getElementById('txtmaterISS').value.replace(",",".");

   observa=document.getElementById('observa').value;

   if(txtcod==""){
        alert("Digite el C\u00f3digo");
        document.getElementById("txtcod").focus();
   }else if(txtdesc==""){
         alert("Digite La Descripci\u00f3n");
        document.getElementById("txtdesc").focus();
   }else{
     var variables="txtcod=" + txtcod + "&txtdesc=" + txtdesc + "&txtvciruSOAT=" + txtvciruSOAT
        + "&txtanesSOAT=" + txtanesSOAT + "&txtayuSOAT=" + txtayuSOAT + "&txtsalaSOAT=" + txtsalaSOAT
        + "&txtmaterSOAT=" + txtmaterSOAT + "&txtvciruISS=" + txtvciruISS + "&txtanesISS=" + txtanesISS
        + "&txtayuISS=" + txtayuISS + "&txtsalaISS=" + txtsalaISS + "&txtmaterISS=" + txtmaterISS + "&observa=" + observa+ "&acc=" + accion;

        guardar('../guardar_porceQx',variables,'porceQx');
   }

}

function editar_porcQx(){
    txtcod=document.getElementById('txtcod').value;
    if(txtcod==""){
        alert("No existe Ningun Registro Para Editar");
    }else{
        document.getElementById('accion').value="2";

        document.getElementById('txtdesc').disabled=false;

        document.getElementById('txtvciruSOAT').disabled=false;
        document.getElementById('txtanesSOAT').disabled=false;
        document.getElementById('txtayuSOAT').disabled=false;
        document.getElementById('txtsalaSOAT').disabled=false;
        document.getElementById('txtmaterSOAT').disabled=false;

        document.getElementById('txtvciruISS').disabled=false;
        document.getElementById('txtanesISS').disabled=false;
        document.getElementById('txtayuISS').disabled=false;
        document.getElementById('txtsalaISS').disabled=false;
        document.getElementById('txtmaterISS').disabled=false;

        document.getElementById('observa').disabled=false;

        document.getElementById('btn_nuevo').setAttribute("style", "display:none");
        document.getElementById('btn_delete').setAttribute("style", "display:none");
        document.getElementById('btn_editar').setAttribute("style", "display:none");
        document.getElementById('btn_buscar').setAttribute("style", "display:none");
        document.getElementById('btn_guardar').setAttribute("style", "display:block");

        document.getElementById('txtdesc').focus();
    }

}

function delete_porcQx(){

    if (confirm("\xbfEsta seguro de realizar la operaci\xf3n?")){
    var txtcod=document.getElementById("txtcod").value;
    ajax=ObjetoAjax();
    ajax.open("POST", "../guardar_porceQx", true);
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("txtcod="+txtcod+"&acc=3");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            if(trimAll(ajax.responseText) =="bien"){
                 alert("Operaci\u00f3n Realizada Exitosamente");
                 document.location = "../ges_porcentajeQX";
            }
        }
    }
 }
}

function buscar_porcQx(){

    window.open("../most_porcQx","ventana_porceQx","width=1100, height=580, scrollbars=no, menubar=no, location=no, resizable=no");

}

function sel_grupSOAT(){

    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    window.opener.document.location="../ges_porcentajeQX?busq=B&pri=T&cod="+valor;
    self.close();
}

function Busqueda_porcQx(){

    tip_bus=document.getElementById("t_bus").value;
    busq=  document.getElementById("busqueda").value;
    ajax = ObjetoAjax();
    ajax.open("POST", "../most_porcQx", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&control=2");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_tabla').innerHTML = ajax.responseText
        }
    }

}

function nueva_salManISS(){

    document.getElementById('accion').value="1";

    document.getElementById('txtcod').value="";
    document.getElementById('txtdesc').value="";
    document.getElementById('uvrinf').value="";
    document.getElementById('uvrsup').value="";
    document.getElementById('tsala').selectedIndex=0;
    document.getElementById('txtvalor').value="";
    document.getElementById('aniot').value="";
    document.getElementById('orsevaciones').value="";

    document.getElementById('txtcod').disabled=false;
    document.getElementById('txtdesc').disabled=false;
    document.getElementById('uvrinf').disabled=false;
    document.getElementById('uvrsup').disabled=false;
    document.getElementById('tsala').disabled=false;
    document.getElementById('txtvalor').disabled=false;
    document.getElementById('aniot').disabled=false;
    document.getElementById('orsevaciones').disabled=false;

    document.getElementById('btn_nuevo').setAttribute("style", "display:none");
    document.getElementById('btn_delete').setAttribute("style", "display:none");
    document.getElementById('btn_editar').setAttribute("style", "display:none");
    document.getElementById('btn_buscar').setAttribute("style", "display:none");
    document.getElementById('btn_guardar').setAttribute("style", "display:block");

    document.getElementById('txtcod').focus();
}

function guardar_salManISS(){
    accion=document.getElementById('accion').value;

    txtcod=document.getElementById('txtcod').value;
    txtdesc=document.getElementById('txtdesc').value;
    uvrinf=document.getElementById('uvrinf').value;
    uvrsup=document.getElementById('uvrsup').value;
    tsala=document.getElementById('tsala').value;
    txtvalor=document.getElementById('txtvalor').value.replace(".","").replace(".","").replace(",",".");
    aniot=document.getElementById('aniot').value;
    obseva=document.getElementById('orsevaciones').value;

    if(txtcod==""){
       alert("Digite el C\u00f3digo");
       document.getElementById("txtcod").focus();
    }else if(txtdesc==""){
        alert("Digite La Descripci\u00f3n");
        document.getElementById("txtdesc").focus();
    }else{

     var variables="txtcod=" + txtcod + "&txtdesc=" + txtdesc + "&uvrinf=" + uvrinf
        + "&uvrsup=" + uvrsup + "&tsala=" + tsala + "&txtvalor=" + txtvalor
        + "&aniot=" + aniot + "&obseva=" + obseva + "&acc=" + accion;

        guardar('../guardar_salManISS',variables,'salManISS');

    }

}


function aditar_salManISS(){

    txtcod=document.getElementById('txtcod').value;

    if(txtcod==""){
        alert("No existe Ningun Registro Para Editar");
    }else{
    document.getElementById('accion').value="2";
    document.getElementById('txtdesc').disabled=false;
    document.getElementById('uvrinf').disabled=false;
    document.getElementById('uvrsup').disabled=false;
    document.getElementById('tsala').disabled=false;
    document.getElementById('txtvalor').disabled=false;
    document.getElementById('aniot').disabled=false;
    document.getElementById('orsevaciones').disabled=false;

    document.getElementById('btn_nuevo').setAttribute("style", "display:none");
    document.getElementById('btn_delete').setAttribute("style", "display:none");
    document.getElementById('btn_editar').setAttribute("style", "display:none");
    document.getElementById('btn_buscar').setAttribute("style", "display:none");
    document.getElementById('btn_guardar').setAttribute("style", "display:block");

    document.getElementById('txtdesc').focus();
    }


}

function delete_salManISS(){

    if (confirm("\xbfEsta seguro de realizar la operaci\xf3n?")){
        var txtcod=document.getElementById("txtcod").value;
        ajax=ObjetoAjax();
        ajax.open("POST", "../guardar_salManISS", true);
        ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        ajax.send("txtcod="+txtcod+"&acc=3");
        ajax.onreadystatechange=function() {
            if (ajax.readyState==4) {
                if(trimAll(ajax.responseText) =="bien"){
                    alert("Operaci\u00f3n Realizada Exitosamente");
                    document.location = "../ges_salManISS";
                }
            }
        }
    }
}


function buscar_salManISS(){
 window.open("../most_salManISS","ventana_salManISS","width=900, height=580, scrollbars=no, menubar=no, location=no, resizable=no");

}

function Busqueda_salManISS(){

    tip_bus=document.getElementById("t_bus").value;
    busq=  document.getElementById("busqueda").value;
    ajax = ObjetoAjax();
    ajax.open("POST", "../most_salManISS", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&control=2");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_tabla').innerHTML = ajax.responseText
        }
    }

}

function sel_salManISS(){

    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    window.opener.document.location="../ges_salManISS?busq=B&pri=T&cod="+valor;
    self.close();
}

function nueva_MatManISS(){

    document.getElementById('accion').value="1";

    document.getElementById('txtcod').value="";
    document.getElementById('txtdesc').value="";
    document.getElementById('uvrinf').value="";
    document.getElementById('uvrsup').value="";
    document.getElementById('txtvalor').value="";
    document.getElementById('aniot').value="";
    document.getElementById('orsevaciones').value="";

    document.getElementById('txtcod').disabled=false;
    document.getElementById('txtdesc').disabled=false;
    document.getElementById('uvrinf').disabled=false;
    document.getElementById('uvrsup').disabled=false;
    document.getElementById('txtvalor').disabled=false;
    document.getElementById('aniot').disabled=false;
    document.getElementById('orsevaciones').disabled=false;

    document.getElementById('btn_nuevo').setAttribute("style", "display:none");
    document.getElementById('btn_delete').setAttribute("style", "display:none");
    document.getElementById('btn_editar').setAttribute("style", "display:none");
    document.getElementById('btn_buscar').setAttribute("style", "display:none");
    document.getElementById('btn_guardar').setAttribute("style", "display:block");

    document.getElementById('txtcod').focus();

}

function guardar_MatManISS(){

    accion=document.getElementById('accion').value;

    txtcod=document.getElementById('txtcod').value;
    txtdesc=document.getElementById('txtdesc').value;
    uvrinf=document.getElementById('uvrinf').value;
    uvrsup=document.getElementById('uvrsup').value;
    txtvalor=document.getElementById('txtvalor').value.replace(".","").replace(".","").replace(",",".");
    aniot=document.getElementById('aniot').value;
    obseva=document.getElementById('orsevaciones').value;

    if(txtcod==""){
       alert("Digite el C\u00f3digo");
       document.getElementById("txtcod").focus();
    }else if(txtdesc==""){
        alert("Digite La Descripci\u00f3n");
        document.getElementById("txtdesc").focus();
    }else{

     var variables="txtcod=" + txtcod + "&txtdesc=" + txtdesc + "&uvrinf=" + uvrinf
        + "&uvrsup=" + uvrsup + "&txtvalor=" + txtvalor
        + "&aniot=" + aniot + "&obseva=" + obseva + "&acc=" + accion;

        guardar('../guardar_MatManISS',variables,'MatManISS');

    }

}


function editar_MatManISS(){


   txtcod=document.getElementById('txtcod').value;

   if(txtcod==""){
     alert("No existe Ningun Registro Para Editar");
   }else{
   document.getElementById('accion').value="2";

   document.getElementById('txtdesc').disabled=false;
   document.getElementById('uvrinf').disabled=false;
   document.getElementById('uvrsup').disabled=false;
   document.getElementById('txtvalor').disabled=false;
   document.getElementById('aniot').disabled=false;
   document.getElementById('orsevaciones').disabled=false;

   document.getElementById('btn_nuevo').setAttribute("style", "display:none");
   document.getElementById('btn_delete').setAttribute("style", "display:none");
   document.getElementById('btn_editar').setAttribute("style", "display:none");
   document.getElementById('btn_buscar').setAttribute("style", "display:none");
   document.getElementById('btn_guardar').setAttribute("style", "display:block");
   document.getElementById('txtdesc').focus();


   }

}

function delete_MatManISS(){

   if (confirm("\xbfEsta seguro de realizar la operaci\xf3n?")){
        var txtcod=document.getElementById("txtcod").value;
        ajax=ObjetoAjax();
        ajax.open("POST", "../guardar_MatManISS", true);
        ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        ajax.send("txtcod="+txtcod+"&acc=3");
        ajax.onreadystatechange=function() {
            if (ajax.readyState==4) {
                if(trimAll(ajax.responseText) =="bien"){
                    alert("Operaci\u00f3n Realizada Exitosamente");
                    document.location = "../ges_MatManISS";
                }
            }
        }
    }

}


function buscar_MatManISS(){
 window.open("../most_MatManISS","ventana_salManISS","width=900, height=580, scrollbars=no, menubar=no, location=no, resizable=no");

}

function sel_MatManISS(){

    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    window.opener.document.location="../ges_MatManISS?busq=B&pri=T&cod="+valor;

    self.close();

}

function Busqueda_MatManISS(){

    tip_bus=document.getElementById("t_bus").value;
    busq=  document.getElementById("busqueda").value;
    ajax = ObjetoAjax();
    ajax.open("POST", "../most_MatManISS", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&control=2");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_tabla').innerHTML = ajax.responseText
        }
    }
 }

 function nuevo_proc(){

    document.getElementById('accion').value="1";

    document.getElementById('txtcodCUPS').value="";
    document.getElementById('txtcodSOAT').value="";
    document.getElementById('txtcodISS').value="";
    document.getElementById('descups').value="";
    document.getElementById('dessoat').value="";
    document.getElementById('txtvalSOAT').value="0,00";
    document.getElementById('txtvalISS').value="0,00";
    document.getElementById('txtvalISS2').value="0,00";
    document.getElementById('txtvalpart').value="0,00";
    document.getElementById('txtgruSOAT').value="";
    document.getElementById('txtuvriss').value="";
    document.getElementById('txtuvrissn').value="";
    document.getElementById('txtunmax').value="";
    document.getElementById('clasif').selectedIndex=0;
    document.getElementById('area').selectedIndex=0;
    document.getElementById('txtctacontable').value="";
    document.getElementById('sexo').selectedIndex=0;
    document.getElementById('ncomp').selectedIndex=0;
    document.getElementById('uniedadi').selectedIndex=0;
    document.getElementById('txtuini').value="0";
    document.getElementById('uniedadf').selectedIndex=0;
    document.getElementById('txtufin').value="0";
    document.getElementById('otserAT').selectedIndex=0;
    document.getElementById('quirurg').checked=true;
    document.getElementById('consult').checked=true;
    document.getElementById('instit').checked=true;
    document.getElementById('acti').checked=true;
    document.getElementById('pos').checked=false;
    document.getElementById('possub').checked=false;
    document.getElementById('revi').checked=false;
    document.getElementById('patie').selectedIndex=0;
    document.getElementById('tserv').selectedIndex=0;
    document.getElementById('fcons').selectedIndex=0;
    document.getElementById('ripsrn').checked=true;

    document.getElementById('txtcodCUPS').disabled=false;
    document.getElementById('txtcodSOAT').disabled=false;
    document.getElementById('txtcodISS').disabled=false;
    document.getElementById('descups').disabled=false;
    document.getElementById('dessoat').disabled=false;
    document.getElementById('txtvalSOAT').disabled=false;
    document.getElementById('txtvalISS').disabled=false;
    document.getElementById('txtvalISS2').disabled=false;
    document.getElementById('txtvalpart').disabled=false;
    document.getElementById('txtgruSOAT').disabled=false;
    document.getElementById('txtuvriss').disabled=false;
    document.getElementById('txtuvrissn').disabled=false;
    document.getElementById('txtunmax').disabled=false;
    document.getElementById('clasif').disabled=false;
    document.getElementById('txtctacontable').disabled=false;
    document.getElementById('area').disabled=false;
    document.getElementById('sexo').disabled=false;
    document.getElementById('ncomp').disabled=false;
    document.getElementById('uniedadi').disabled=false;
    document.getElementById('txtuini').disabled=false;
    document.getElementById('uniedadf').disabled=false;
    document.getElementById('txtufin').disabled=false;
    document.getElementById('otserAT').disabled=false;
    document.getElementById('quirurg').disabled=false;
    document.getElementById('consult').disabled=false;
    document.getElementById('instit').disabled=false;
    document.getElementById('acti').disabled=false;
    document.getElementById('pos').disabled=false;
    document.getElementById('possub').disabled=false;
    document.getElementById('revi').disabled=false;
    document.getElementById('patie').disabled=false;
    document.getElementById('tserv').disabled=false;
    document.getElementById('fcons').disabled=false;
    document.getElementById('ripsrn').disabled=false;
    document.getElementById('btn_rest').disabled=false;
    document.getElementById('btn_rest').setAttribute("style", "color:black;padding:3px 10px 3px 10px; font-size:12px  margin: 0px 4px 4px 0px;");


    document.getElementById('btn_nuevo').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_delete').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_editar').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_buscar').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_guardar').setAttribute("style", "display:block;width: 60px;");

    document.getElementById('txtcodCUPS').focus();

 }

 function guardar_proc(){

    accion=document.getElementById('accion').value;


    txtcodCUPS=document.getElementById('txtcodCUPS').value;
    txtcodSOAT=document.getElementById('txtcodSOAT').value;
    txtcodISS=document.getElementById('txtcodISS').value;
    descups=document.getElementById('descups').value;
    dessoat=document.getElementById('dessoat').value;
    txtvalSOAT=document.getElementById('txtvalSOAT').value.replace(".","").replace(".","").replace(",",".");
    txtvalISS=document.getElementById('txtvalISS').value.replace(".","").replace(".","").replace(",",".");
    txtvalISS2=document.getElementById('txtvalISS2').value.replace(".","").replace(".","").replace(",",".");
    txtvalpart=document.getElementById('txtvalpart').value.replace(".","").replace(".","").replace(",",".");
    txtgruSOAT=document.getElementById('txtgruSOAT').value;
    txtuvriss=document.getElementById('txtuvriss').value;
    txtuvrissn=document.getElementById('txtuvrissn').value;
    txtunmax=document.getElementById('txtunmax').value;
    clasif=document.getElementById('clasif').value;
    area=document.getElementById('area').value;
    txtctacontable=document.getElementById('txtctacontable').value;
    sexo=document.getElementById('sexo').value;
    ncomp=document.getElementById('ncomp').value;
    uniedadi=document.getElementById('uniedadi').value;
    if(uniedadi=="0"){
      txtuini="0";
    }else{
      txtuini=uniedadi+document.getElementById('txtuini').value;
    }

    areasServ=document.getElementById('areasServ').value;
    prest=document.getElementById('prest').value;

    uniedadf=document.getElementById('uniedadf').value;
       if(uniedadf=="0"){
       txtufin="0";
    }else{
         txtufin=uniedadf+document.getElementById('txtufin').value;
    }

    otserAT=document.getElementById('otserAT').value;


    var quirurg="";
    if(document.getElementById("quirurg").checked==true){
        quirurg="1";
    }else{
        quirurg="0";
    }

     var consult="";
    if(document.getElementById("consult").checked==true){
        consult="1";
    }else{
        consult="0";
    }

    var instit="";
    if(document.getElementById("instit").checked==true){
        instit="1";
    }else{
        instit="0";
    }

    var acti="";
    if(document.getElementById("acti").checked==true){
        acti="1";
    }else{
        acti="0";
    }

    var pos="";
    if(document.getElementById("pos").checked==true){
        pos="1";
    }else{
        pos="0";
    }

    var possub="";
    if(document.getElementById("possub").checked==true){
        possub="1";
    }else{
        possub="0";
    }

    var revi="";
    if(document.getElementById("revi").checked==true){
        revi="1";
    }else{
        revi="0";
    }

    patie=document.getElementById('patie').value;
    tserv=document.getElementById('tserv').value;
    fcons=document.getElementById('fcons').value;

    var ripsrn="";
    if(document.getElementById("ripsrn").checked==true){
        ripsrn="1";
    }else{
        ripsrn="0";
    }

   if(txtcodCUPS==""){
        alert("Digite el C\u00f3digo CUPS");
        document.getElementById("txtcodCUPS").focus();
    }else if(descups==""){
        alert("Digite La Descripci\u00f3n CUPS");
        document.getElementById("descups").focus();
    }else{

     var variables="txtcodCUPS=" + txtcodCUPS + "&txtcodSOAT=" + txtcodSOAT
        + "&txtcodISS=" + txtcodISS + "&descups=" + descups
        + "&dessoat=" + dessoat + "&txtvalSOAT=" + txtvalSOAT + "&txtvalISS=" + txtvalISS
        + "&txtvalISS2=" + txtvalISS2 + "&txtvalpart=" + txtvalpart + "&txtgruSOAT=" + txtgruSOAT
        + "&txtuvriss=" + txtuvriss + "&txtuvrissn=" + txtuvrissn + "&txtunmax=" + txtunmax
        + "&clasif=" + clasif + "&area=" + area + "&txtctacontable=" + txtctacontable
        + "&sexo=" + sexo + "&ncomp=" + ncomp + "&uniedadi=" + uniedadi
        + "&txtuini=" + txtuini + "&uniedadf=" + uniedadf + "&txtufin=" + txtufin
        + "&otserAT=" + otserAT + "&quirurg=" + quirurg + "&consult=" + consult
        + "&instit=" + instit + "&acti=" + acti + "&pos=" + pos
        + "&possub=" + possub + "&revi=" + revi + "&patie=" + patie
        + "&tserv=" + tserv + "&fcons=" + fcons + "&ripsrn=" + ripsrn
        + "&acc=" + accion + "&areasServ="+areasServ + "&prest="+prest;

        guardar('../guardar_proc',variables,'proc');

    }

 }


 function editar_proc(){

     document.getElementById('accion').value="2";
    document.getElementById('txtcodCUPS').disabled=false;
    document.getElementById('txtcodSOAT').disabled=false;
    document.getElementById('txtcodISS').disabled=false;
    document.getElementById('descups').disabled=false;
    document.getElementById('dessoat').disabled=false;
    document.getElementById('txtvalSOAT').disabled=false;
    document.getElementById('txtvalISS').disabled=false;
    document.getElementById('txtvalISS2').disabled=false;
    document.getElementById('txtvalpart').disabled=false;
    document.getElementById('txtgruSOAT').disabled=false;
    document.getElementById('txtuvriss').disabled=false;
    document.getElementById('txtuvrissn').disabled=false;
    document.getElementById('txtunmax').disabled=false;
    document.getElementById('clasif').disabled=false;
    document.getElementById('txtctacontable').disabled=false;
    document.getElementById('area').disabled=false;
    document.getElementById('sexo').disabled=false;
    document.getElementById('ncomp').disabled=false;
    document.getElementById('uniedadi').disabled=false;
    document.getElementById('txtuini').disabled=false;
    document.getElementById('uniedadf').disabled=false;
    document.getElementById('txtufin').disabled=false;
    document.getElementById('otserAT').disabled=false;
    document.getElementById('quirurg').disabled=false;
    document.getElementById('consult').disabled=false;
    document.getElementById('instit').disabled=false;
    document.getElementById('acti').disabled=false;
    document.getElementById('pos').disabled=false;
    document.getElementById('possub').disabled=false;
    document.getElementById('revi').disabled=false;
    document.getElementById('patie').disabled=false;
    document.getElementById('tserv').disabled=false;
    document.getElementById('fcons').disabled=false;
    document.getElementById('ripsrn').disabled=false;
    document.getElementById('btn_rest').disabled=false;
    document.getElementById('btn_rest').setAttribute("style", "color:black;padding:3px 10px 3px 10px; font-size:12px  margin: 0px 4px 4px 0px;");


    document.getElementById('btn_nuevo').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_delete').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_editar').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_buscar').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_guardar').setAttribute("style", "display:block;width: 60px;");
    document.getElementById('txtcodCUPS').focus();
 }

function mantarifario(){

  if(document.getElementById("tip_mane").checked==true){
     document.getElementById('opc_man').disabled=true;
     document.getElementById('accion1').value="0";
     document.getElementById('btn_ver').disabled=false;
     document.getElementById('btn_modi').disabled=false;
     document.getElementById('btn_ver').setAttribute("style", "color:black;padding:3px 30px 3px 30px;  margin: 0px 4px 4px 0px;");
     document.getElementById('btn_modi').setAttribute("style", "color:black;padding:3px 30px 3px 30px;  margin: 0px 4px 4px 0px;");

  }else{
     document.getElementById('opc_man').disabled=false;
     document.getElementById('btn_ver').setAttribute("style", "color:gray;padding:3px 30px 3px 30px;  margin: 0px 4px 4px 0px;");
     document.getElementById('btn_modi').setAttribute("style", "color:gray;padding:3px 30px 3px 30px;  margin: 0px 4px 4px 0px;");
     document.getElementById('accion1').value="1";
}
}

function habfec(op){
    if (op=="ini"){
        if(document.getElementById("chefinicial").checked==true){
            document.getElementById('finicial').disabled=false;
        }else{
              document.getElementById('finicial').disabled=true;
              document.getElementById('finicial').value="";
        }

    }

    if (op=="fin"){
        if(document.getElementById("cheffinal").checked==true){
            document.getElementById('ffinal').disabled=false;
        }else{
              document.getElementById('ffinal').disabled=true;
              document.getElementById('ffinal').value="";
        }

    }
}

function mod_mat(){
    window.open("../asig_ProcPlan?ori=nor","asig_ProcPlan","width=1100, height=750, scrollbars=no, menubar=no, location=no, resizable=no");
}

function mod_matP(ori){
    window.open("../asig_ProcPlan?ori="+ori,"asig_ProcPlan","width=900, height=750, scrollbars=no, menubar=no, location=no, resizable=no");
}


function proc_asig(cod_p,desc,cod_eq,val){
    var cont = document.getElementById("cont");
    var filas = document.getElementById("filas");
    cont.setAttribute("value", parseInt(cont.value,0)+1);
    var tabla = document.getElementById("contenido").tBodies[0];
    var fila = document.createElement("TR");
    fila.setAttribute("align","center");

    var celda2 = document.createElement("TD");
    var cod = document.createElement("INPUT");
    cod.setAttribute("type","text");
    cod.setAttribute("size","17");
    cod.setAttribute('style','font-size:7pt;' )
    cod.setAttribute("title","Doble Click para seleccionar producto");
    cod.setAttribute("maxlength","18");
    cod.setAttribute("disabled","disabled");
    cod.setAttribute("value", cod_p);
    cod.setAttribute("name","cod");
    cod.setAttribute("id","cod" + cont.value);
    celda2.appendChild(cod);

    var celda3 = document.createElement("TD");
    var proc = document.createElement("INPUT");
    proc.setAttribute("type","text");
    proc.setAttribute("size","101");
    proc.setAttribute("maxlength","80");
    proc.setAttribute("disabled","disabled");
    proc.setAttribute('style','font-size:7pt;' )
    proc.setAttribute("value", desc);
    proc.setAttribute("name","des_prod");
    proc.setAttribute("id","des_prod" + cont.value);
    celda3.appendChild(proc);

    var celda4 = document.createElement("TD");
    var cod_equi = document.createElement("INPUT");
    cod_equi.setAttribute("type","text");
    cod_equi.setAttribute("size","20");
    cod_equi.setAttribute('style','font-size:7pt;' )
    cod_equi.setAttribute("value",cod_eq);
    cod_equi.setAttribute("maxlength","11");
    cod_equi.setAttribute("id","cod_equi" + cont.value);
    cod_equi.setAttribute("name","cod_equi");
    cod_equi.setAttribute("onfocus","this.select()");
    cod_equi.setAttribute("onclick","this.select()");
    celda4.appendChild(cod_equi);

    var celda5 = document.createElement("TD");
    var valor = document.createElement("INPUT");
    valor.setAttribute("type","text");
    valor.setAttribute("size","18");
    valor.setAttribute("value", val);
    valor.setAttribute("style", "text-align:right;font-size:7pt;");
    valor.setAttribute("id","valor" + cont.value);
    valor.setAttribute("name","valor");
    valor.setAttribute("onfocus","this.select()");
    valor.setAttribute("onclick","this.select()");
    valor.setAttribute("onkeyup","validartcoma(event, this.id);");
    valor.onchange=function(){
        textm(this.value,this.id);
    }
    celda5.appendChild(valor);

    var celda11 = document.createElement('TD');
    var boton = document.createElement('INPUT');
    boton.setAttribute('type','button');
    boton.setAttribute('value','X');
    boton.setAttribute('id','boton1' + cont.value);
    boton.setAttribute('name','boton1');
    boton.setAttribute('title','Quitar de la lista');
    boton.setAttribute('style','font-size:7pt; padding:2px 2px 2px 2px; margin; margin: 0px 4px 4px 0px;' )
    boton.onclick=function(){
        borrarFila(this, this.id);
    }
    celda11.appendChild(boton);

    //fila.appendChild(celda1);
    fila.appendChild(celda2);
    fila.appendChild(celda3);
    fila.appendChild(celda4);
    fila.appendChild(celda5);
    fila.appendChild(celda11);
    tabla.appendChild(fila);
}

function proc_asigProg(id,cod_cups,descrip){
    var cont = document.getElementById("cont");
    var filas = document.getElementById("filas");
    cont.setAttribute("value", parseInt(cont.value,0)+1);
    var tabla = document.getElementById("contenido").tBodies[0];
    var fila = document.createElement("TR");
    fila.setAttribute("align","center");

    var celda2 = document.createElement("TD");
    var cod = document.createElement("INPUT");
    cod.setAttribute("type","text");
    cod.setAttribute("size","10");
    cod.setAttribute('style','font-size:7pt;' )
    cod.setAttribute("title","Doble Click para seleccionar producto");
    cod.setAttribute("maxlength","18");
    cod.setAttribute("disabled","disabled");
    cod.setAttribute("value", id);
    cod.setAttribute("name","cod");
    cod.setAttribute("id","cod" + cont.value);
    celda2.appendChild(cod);

    var celda3 = document.createElement("TD");
    var proc = document.createElement("INPUT");
    proc.setAttribute("type","text");
    proc.setAttribute("size","10");
    proc.setAttribute("maxlength","80");
    proc.setAttribute("disabled","disabled");
    proc.setAttribute('style','font-size:7pt;' )
    proc.setAttribute("value", cod_cups);
    proc.setAttribute("name","des_prod");
    proc.setAttribute("id","des_prod" + cont.value);
    celda3.appendChild(proc);

    var celda4 = document.createElement("TD");
    var cod_equi = document.createElement("INPUT");
    cod_equi.setAttribute("type","text");
    cod_equi.setAttribute("size","109");
    cod_equi.setAttribute('style','font-size:7pt;' )
    cod_equi.setAttribute("value",descrip);
    cod_equi.setAttribute("maxlength","11");
    cod_equi.setAttribute("id","cod_equi" + cont.value);
    cod_equi.setAttribute("name","cod_equi");
    cod_equi.setAttribute("onfocus","this.select()");
    cod_equi.setAttribute("onclick","this.select()");
    celda4.appendChild(cod_equi);


    var celda11 = document.createElement('TD');
    var boton = document.createElement('INPUT');
    boton.setAttribute('type','button');
    boton.setAttribute('value','X');
    boton.setAttribute('id','boton1' + cont.value);
    boton.setAttribute('name','boton1');
    boton.setAttribute('title','Quitar de la lista');
    boton.setAttribute('style','font-size:7pt; padding:2px 2px 2px 2px; margin; margin: 0px 4px 4px 0px;' )
    boton.onclick=function(){
        borrarFila(this, this.id);
    }
    celda11.appendChild(boton);

    //fila.appendChild(celda1);
    fila.appendChild(celda2);
    fila.appendChild(celda3);
    fila.appendChild(celda4);

    fila.appendChild(celda11);
    tabla.appendChild(fila);
}

function proc_asigAreas(cod_p,desc){
    var cont = document.getElementById("cont");
    var filas = document.getElementById("filas");
    cont.setAttribute("value", parseInt(cont.value,0)+1);
    var tabla = document.getElementById("contenido").tBodies[0];
    var fila = document.createElement("TR");
    fila.setAttribute("align","center");

    var celda2 = document.createElement("TD");
    var cod = document.createElement("INPUT");
    cod.setAttribute("type","text");
    cod.setAttribute("size","18");
    cod.setAttribute('style','font-size:7pt;' )
    cod.setAttribute("title","Doble Click para seleccionar producto");
    cod.setAttribute("maxlength","18");
    cod.setAttribute("disabled","disabled");
    cod.setAttribute("value", cod_p);
    cod.setAttribute("name","cod");
    cod.setAttribute("id","cod" + cont.value);
    celda2.appendChild(cod);

    var celda3 = document.createElement("TD");
    var proc = document.createElement("INPUT");
    proc.setAttribute("type","text");
    proc.setAttribute("size","140");
    proc.setAttribute("maxlength","80");
    proc.setAttribute("disabled","disabled");
    proc.setAttribute('style','font-size:7pt;' )
    proc.setAttribute("value", desc);
    proc.setAttribute("name","des_prod");
    proc.setAttribute("id","des_prod" + cont.value);
    celda3.appendChild(proc);


    var celda11 = document.createElement('TD');
    var boton = document.createElement('INPUT');
    boton.setAttribute('type','button');
    boton.setAttribute('value','X');
    boton.setAttribute('id','boton1' + cont.value);
    boton.setAttribute('name','boton1');
    boton.setAttribute('title','Quitar de la lista');
    boton.setAttribute('style','font-size:7pt; padding:2px 2px 2px 2px; margin; margin: 0px 4px 4px 0px;' )
    boton.onclick=function(){
        borrarFila(this, this.id);
    }
    celda11.appendChild(boton);

    //fila.appendChild(celda1);
    fila.appendChild(celda2);
    fila.appendChild(celda3);
    fila.appendChild(celda11);
    tabla.appendChild(fila);
}

function proc_asigP(cod_p,desc,val){
    var cont = document.getElementById("cont");
    var filas = document.getElementById("filas");
    cont.setAttribute("value", parseInt(cont.value,0)+1);
    var tabla = document.getElementById("contenido").tBodies[0];
    var fila = document.createElement("TR");
    fila.setAttribute("align","center");

    var celda2 = document.createElement("TD");
    var cod = document.createElement("INPUT");
    cod.setAttribute("type","text");
    cod.setAttribute("size","18");
    cod.setAttribute('style','font-size:7pt;' )
    cod.setAttribute("title","Doble Click para seleccionar producto");
    cod.setAttribute("maxlength","18");
    cod.setAttribute("disabled","disabled");
    cod.setAttribute("value", cod_p);
    cod.setAttribute("name","cod");
    cod.setAttribute("id","cod" + cont.value);
    celda2.appendChild(cod);

    var celda3 = document.createElement("TD");
    var proc = document.createElement("INPUT");
    proc.setAttribute("type","text");
    proc.setAttribute("size","90");
    proc.setAttribute("maxlength","80");
    proc.setAttribute("disabled","disabled");
    proc.setAttribute('style','font-size:7pt;' )
    proc.setAttribute("value", desc);
    proc.setAttribute("name","des_prod");
    proc.setAttribute("id","des_prod" + cont.value);
    celda3.appendChild(proc);


    var celda5 = document.createElement("TD");
    var valor = document.createElement("INPUT");
    valor.setAttribute("type","text");
    valor.setAttribute("size","20");
    valor.setAttribute("value", val);
    valor.setAttribute("style", "text-align:right;font-size:7pt;");
    valor.setAttribute("id","valor" + cont.value);
    valor.setAttribute("name","valor");
    valor.setAttribute("onfocus","this.select()");
    valor.setAttribute("onclick","this.select()");
    valor.setAttribute("onkeyup","validartcoma(event, this.id);");
    valor.onchange=function(){
        textm(this.value,this.id);
    }
    celda5.appendChild(valor);

    var celda11 = document.createElement('TD');
    var boton = document.createElement('INPUT');
    boton.setAttribute('type','button');
    boton.setAttribute('value','X');
    boton.setAttribute('id','boton1' + cont.value);
    boton.setAttribute('name','boton1');
    boton.setAttribute('title','Quitar de la lista');
    boton.setAttribute('style','font-size:7pt; padding:2px 2px 2px 2px; margin; margin: 0px 4px 4px 0px;' )
    boton.onclick=function(){
        borrarFila(this, this.id);
    }
    celda11.appendChild(boton);

    //fila.appendChild(celda1);
    fila.appendChild(celda2);
    fila.appendChild(celda3);
    fila.appendChild(celda5);
    fila.appendChild(celda11);
    tabla.appendChild(fila);
}

function proc_asigmedicaAreas(cod_p,desc){
    var cont = document.getElementById("cont2");
    var filas = document.getElementById("filas2");
    cont.setAttribute("value", parseInt(cont.value,0)+1);
    var tabla = document.getElementById("contenido2").tBodies[0];
    var fila = document.createElement("TR");
    fila.setAttribute("align","center");

    var celda2 = document.createElement("TD");
    var cod = document.createElement("INPUT");
    cod.setAttribute("type","text");
    cod.setAttribute("size","18");
    cod.setAttribute('style','font-size:7pt;' )
    cod.setAttribute("title","Doble Click para seleccionar producto");
    cod.setAttribute("maxlength","18");
    cod.setAttribute("disabled","disabled");
    cod.setAttribute("value", cod_p);
    cod.setAttribute("name","cod2");
    cod.setAttribute("id","cod2" + cont.value);
    celda2.appendChild(cod);

    var celda3 = document.createElement("TD");
    var proc = document.createElement("INPUT");
    proc.setAttribute("type","text");
    proc.setAttribute("size","140");
    proc.setAttribute("maxlength","80");
    proc.setAttribute("disabled","disabled");
    proc.setAttribute('style','font-size:7pt;' )
    proc.setAttribute("value", desc);
    proc.setAttribute("name","des_prod2");
    proc.setAttribute("id","des_prod2" + cont.value);
    celda3.appendChild(proc);


    var celda11 = document.createElement('TD');
    var boton = document.createElement('INPUT');
    boton.setAttribute('type','button');
    boton.setAttribute('value','X');
    boton.setAttribute('id','boton2' + cont.value);
    boton.setAttribute('name','boton2');
    boton.setAttribute('title','Quitar de la lista');
    boton.setAttribute('style','font-size:7pt; padding:2px 2px 2px 2px; margin; margin: 0px 4px 4px 0px;' )
    boton.onclick=function(){
        borrarFila2(this, this.id);
    }
    celda11.appendChild(boton);

    //fila.appendChild(celda1);
    fila.appendChild(celda2);
    fila.appendChild(celda3);
    fila.appendChild(celda11);
    tabla.appendChild(fila);
}

function proc_asigprestProc(cod_p,desc){
    var cont = document.getElementById("cont2");
    var filas = document.getElementById("filas2");
    cont.setAttribute("value", parseInt(cont.value,0)+1);
    var tabla = document.getElementById("contenido2").tBodies[0];
    var fila = document.createElement("TR");
    fila.setAttribute("align","center");

    var celda2 = document.createElement("TD");
    var cod = document.createElement("INPUT");
    cod.setAttribute("type","text");
    cod.setAttribute("size","18");
    cod.setAttribute('style','font-size:7pt;' )
    cod.setAttribute("title","Doble Click para seleccionar producto");
    cod.setAttribute("maxlength","18");
    cod.setAttribute("disabled","disabled");
    cod.setAttribute("value", cod_p);
    cod.setAttribute("name","cod2");
    cod.setAttribute("id","cod2" + cont.value);
    celda2.appendChild(cod);

    var celda3 = document.createElement("TD");
    var proc = document.createElement("INPUT");
    proc.setAttribute("type","text");
    proc.setAttribute("size","140");
    proc.setAttribute("maxlength","80");
    proc.setAttribute("disabled","disabled");
    proc.setAttribute('style','font-size:7pt;' )
    proc.setAttribute("value", desc);
    proc.setAttribute("name","des_prod2");
    proc.setAttribute("id","des_prod2" + cont.value);
    celda3.appendChild(proc);


    var celda11 = document.createElement('TD');
    var boton = document.createElement('INPUT');
    boton.setAttribute('type','button');
    boton.setAttribute('value','X');
    boton.setAttribute('id','boton2' + cont.value);
    boton.setAttribute('name','boton2');
    boton.setAttribute('title','Quitar de la lista');
    boton.setAttribute('style','font-size:7pt; padding:2px 2px 2px 2px; margin; margin: 0px 4px 4px 0px;')
    boton.onclick=function(){
        borrarFila2(this, this.id);
    }
    celda11.appendChild(boton);

    //fila.appendChild(celda1);
    fila.appendChild(celda2);
    fila.appendChild(celda3);
    fila.appendChild(celda11);
    tabla.appendChild(fila);
}

function proc_asigprestAreas(cod_p,desc){
    var cont = document.getElementById("cont3");
    var filas = document.getElementById("filas3");
    cont.setAttribute("value", parseInt(cont.value,0)+1);
    var tabla = document.getElementById("contenido3").tBodies[0];
    var fila = document.createElement("TR");
    fila.setAttribute("align","center");

    var celda2 = document.createElement("TD");
    var cod = document.createElement("INPUT");
    cod.setAttribute("type","text");
    cod.setAttribute("size","18");
    cod.setAttribute('style','font-size:7pt;' )
    cod.setAttribute("title","Doble Click para seleccionar producto");
    cod.setAttribute("maxlength","18");
    cod.setAttribute("disabled","disabled");
    cod.setAttribute("value", cod_p);
    cod.setAttribute("name","cod3");
    cod.setAttribute("id","cod3" + cont.value);
    celda2.appendChild(cod);

    var celda3 = document.createElement("TD");
    var proc = document.createElement("INPUT");
    proc.setAttribute("type","text");
    proc.setAttribute("size","140");
    proc.setAttribute("maxlength","80");
    proc.setAttribute("disabled","disabled");
    proc.setAttribute('style','font-size:7pt;' )
    proc.setAttribute("value", desc);
    proc.setAttribute("name","des_prod3");
    proc.setAttribute("id","des_prod3" + cont.value);
    celda3.appendChild(proc);


    var celda11 = document.createElement('TD');
    var boton = document.createElement('INPUT');
    boton.setAttribute('type','button');
    boton.setAttribute('value','X');
    boton.setAttribute('id','boton3' + cont.value);
    boton.setAttribute('name','boton3');
    boton.setAttribute('title','Quitar de la lista');
    boton.setAttribute('style','font-size:7pt; padding:2px 2px 2px 2px; margin; margin: 0px 4px 4px 0px;')
    boton.onclick=function(){
        borrarFila3(this, this.id);
    }
    celda11.appendChild(boton);

    //fila.appendChild(celda1);
    fila.appendChild(celda2);
    fila.appendChild(celda3);
    fila.appendChild(celda11);
    tabla.appendChild(fila);
}


function proc_asigAreasModulos(cod_p,desc,id){
    var cont = document.getElementById("cont"+id);
    var filas = document.getElementById("filas"+id);
    cont.setAttribute("value", parseInt(cont.value,0)+1);
    var tabla = document.getElementById("contenido"+id).tBodies[0];
    var fila = document.createElement("TR");
    fila.setAttribute("align","center");

    var celda2 = document.createElement("TD");
    var cod = document.createElement("INPUT");
    cod.setAttribute("type","text");
    cod.setAttribute("size","18");
    cod.setAttribute('style','font-size:7pt;' )
    cod.setAttribute("title","Doble Click para seleccionar producto");
    cod.setAttribute("maxlength","18");
    cod.setAttribute("disabled","disabled");
    cod.setAttribute("value", cod_p);
    cod.setAttribute("name","cod"+id);
    cod.setAttribute("id","cod"+id+ cont.value);
    celda2.appendChild(cod);

    var celda3 = document.createElement("TD");
    var proc = document.createElement("INPUT");
    proc.setAttribute("type","text");
    proc.setAttribute("size","170");
    proc.setAttribute("maxlength","80");
    proc.setAttribute("disabled","disabled");
    proc.setAttribute('style','font-size:7pt;' )
    proc.setAttribute("value", desc);
    proc.setAttribute("name","des_prod"+id);
    proc.setAttribute("id","des_prod"+id + cont.value);
    celda3.appendChild(proc);


    var celda11 = document.createElement('TD');
    var boton = document.createElement('INPUT');
    boton.setAttribute('type','button');
    boton.setAttribute('value','X');
    boton.setAttribute('id',"boton"+id + cont.value);
    boton.setAttribute('name',"boton"+id);
    boton.setAttribute('title','Quitar de la lista');
    boton.setAttribute('style','font-size:7pt; padding:2px 2px 2px 2px; margin; margin: 0px 4px 4px 0px;')
    boton.onclick=function(){
        borrarFilamodu(this, this.id,id);
    }
    celda11.appendChild(boton);

    //fila.appendChild(celda1);
    fila.appendChild(celda2);
    fila.appendChild(celda3);
    fila.appendChild(celda11);
    tabla.appendChild(fila);
}

function borrarFila(button,id){

    var fila = button.parentNode.parentNode;
    var tabla = document.getElementById('contenido').getElementsByTagName('tbody')[0];
    var num_elementos = document.getElementsByName("boton1").length;
    var nid = id.substring(6);
    var flag = "no";

    //alert(nid+"-"+num_elementos);
    control = document.getElementById('cont').value;

    if(nid<control){

        flag="si";
    }
//    if((num_elementos>1)&&(flag=="si")) {
        tabla.removeChild(fila);

//    }
}



function borrarFila2(button,id){

    var fila = button.parentNode.parentNode;
    var tabla = document.getElementById('contenido2').getElementsByTagName('tbody')[0];
    var num_elementos = document.getElementsByName("boton1").length;
    var nid = id.substring(6);
    var flag = "no";

    //alert(nid+"-"+num_elementos);
    control = document.getElementById('cont2').value;

    if(nid<control){

        flag="si";
    }
//    if((num_elementos>1)&&(flag=="si")) {
        tabla.removeChild(fila);

//    }
}

function borrarFila3(button,id){

    var fila = button.parentNode.parentNode;
    var tabla = document.getElementById('contenido3').getElementsByTagName('tbody')[0];
    var num_elementos = document.getElementsByName("boton1").length;
    var nid = id.substring(6);
    var flag = "no";

    //alert(nid+"-"+num_elementos);
    control = document.getElementById('cont3').value;

    if(nid<control){

        flag="si";
    }
//    if((num_elementos>1)&&(flag=="si")) {
        tabla.removeChild(fila);

//    }
}

function borrarFilamodu(button,id,i){

    var fila = button.parentNode.parentNode;
    var tabla = document.getElementById("contenido"+i).getElementsByTagName('tbody')[0];
    var num_elementos = document.getElementsByName("boton"+i).length;
    var nid = id.substring(6);
    var flag = "no";

    //alert(nid+"-"+num_elementos);
    control = document.getElementById("cont"+i).value;

    if(nid<control){

        flag="si";
    }
//    if((num_elementos>1)&&(flag=="si")) {
        tabla.removeChild(fila);

//    }
}

function Busqueda_procAsig(){
   tip_bus=document.getElementById("t_bus").value;
    busq=  document.getElementById("busqueda").value;
    ajax = ObjetoAjax();
    ajax.open("POST", "../asig_ProcPlan", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&control=2");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_tabla').innerHTML = ajax.responseText
        }
    }

}

function Busqueda_procAsigProg(){
   tip_bus=document.getElementById("t_busProcProg").value;
    busq=  document.getElementById("busquedaProcProg").value;
    ajax = ObjetoAjax();
    ajax.open("POST", "../procasig", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&control=2&op=2");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_asigproc').innerHTML = ajax.responseText
        }
    }

}

function Add_proced(){
    var control="1"
    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    var par_prc=valor.split(";;");

    var num_elementos2 = document.getElementsByName("boton1").length;
    if(num_elementos2>0){
        for( var contador2=0; contador2 < num_elementos2; contador2++ ){			//
           cod =document.getElementsByName("cod")[contador2].value;
            if(cod==par_prc[0]){
                control="0";
            }
        }
    }
    if(control=="1"){
        proc_asig(par_prc[0],par_prc[1],'','0,00');
    }else{
        alert("Este Proceso ya ha Sido Agregado.");
    }

}
function Add_procedProg(){
    var control="1"
    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    var par_prc=valor.split(";;");

    var num_elementos2 = document.getElementsByName("boton1").length;
    if(num_elementos2>0){
        for( var contador2=0; contador2 < num_elementos2; contador2++ ){			//
           cod =document.getElementsByName("cod")[contador2].value;
            if(cod==par_prc[0]){
                control="0";
            }
        }
    }
    if(control=="1"){
        proc_asigProg(par_prc[0],par_prc[1],par_prc[2]);
    }else{
        alert("Este Proceso ya ha Sido Agregado.");
    }

}

function Add_procedP(){
    var control="1"
    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    var par_prc=valor.split(";;");

    var num_elementos2 = document.getElementsByName("boton1").length;
    if(num_elementos2>0){
        for( var contador2=0; contador2 < num_elementos2; contador2++ ){			//
           cod =document.getElementsByName("cod")[contador2].value;
            if(cod==par_prc[0]){
                control="0";
            }
        }
    }
    if(control=="1"){
        proc_asigP(par_prc[0],par_prc[1],'0,00');
    }else{
        alert("Este Proceso ya ha Sido Agregado.");
    }

}

function Add_procedAreas(){
    var control="1"
    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    var par_prc=valor.split(";;");

    var num_elementos2 = document.getElementsByName("boton1").length;
    if(num_elementos2>0){
        for( var contador2=0; contador2 < num_elementos2; contador2++ ){			//
           cod =document.getElementsByName("cod")[contador2].value;
            if(cod==par_prc[0]){
                control="0";
            }
        }
    }
    if(control=="1"){
      proc_asigAreas(par_prc[0],par_prc[1]);
    }else{
        alert("Este Proceso ya ha Sido Agregado.");
    }

}

function Add_medicaAreas(){
    var control="1"
    var num_elementos = document.getElementsByName("seleccion2").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion2")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion2")[contador].value;	//
    }

    var par_prc=valor.split(";;");

    var num_elementos2 = document.getElementsByName("boton2").length;
    if(num_elementos2>0){
        for( var contador2=0; contador2 < num_elementos2; contador2++ ){			//
           cod =document.getElementsByName("cod2")[contador2].value;
            if(cod==par_prc[0]){
                control="0";
            }
        }
    }
    if(control=="1"){
        proc_asigmedicaAreas(par_prc[0],par_prc[1]);
    }else{
        alert("Este Medicamento ya ha Sido Agregado.");
    }

}

function Add_prestAreas(){
    var control="1"
    var num_elementos = document.getElementsByName("seleccion3").length;
     alert(num_elementos);
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion3")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion3")[contador].value;	//
    }

    var par_prc=valor.split(";;");

    var num_elementos2 = document.getElementsByName("boton3").length;
    if(num_elementos2>0){
        for( var contador2=0; contador2 < num_elementos2; contador2++ ){			//
           cod =document.getElementsByName("cod3")[contador2].value;
            if(cod==par_prc[0]){
                control="0";
            }
        }
    }
    if(control=="1"){
        proc_asigprestAreas(par_prc[0],par_prc[1]);
    }else{
        alert("Esta Area ya fue asignada a este Modulo.");
    }

}

function Add_prestProc(){
    var control="1"
    var num_elementos = document.getElementsByName("seleccion3").length;

    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion3")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion3")[contador].value;	//
    }

    var par_prc=valor.split(";;");

    var num_elementos2 = document.getElementsByName("boton3").length;
    if(num_elementos2>0){
        for( var contador2=0; contador2 < num_elementos2; contador2++ ){			//
           cod =document.getElementsByName("cod3")[contador2].value;
            if(cod==par_prc[0]){
                control="0";
            }
        }
    }
    if(control=="1"){
        proc_asigprestProc(par_prc[0],par_prc[1]);
    }else{
        alert("Esta Area ya fue asignada a este Modulo.");
    }

}


function Add_AreasModulos(){

    var control="1"
    id_mod=document.getElementById("modu").value;
    var num_elementos = document.getElementsByName("seleccion").length;

    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    var par_prc=valor.split(";;");

    var num_elementos2 = document.getElementsByName("boton"+id_mod).length;
    if(num_elementos2>0){
        for( var contador2=0; contador2 < num_elementos2; contador2++ ){			//
           cod =document.getElementsByName("cod"+id_mod)[contador2].value;
            if(cod==par_prc[0]){
                control="0";
            }
        }
    }
    if(control=="1"){
        proc_asigAreasModulos(par_prc[0],par_prc[1],id_mod);
    }else{
        alert("Esta Area ya fue asignada a este Modulo.");
    }

}


function guar_procAsig(){

    var val="";
    var codeq="";
    var cod="";
    var control="1";
    var proc="";
    var desp="";


    var num_elementos = document.getElementsByName("boton1").length;
    if(num_elementos!=0){
    for(contador=0; contador < num_elementos; contador++ ){			//
        codeq =document.getElementsByName("cod_equi")[contador].value;
        val =document.getElementsByName("valor")[contador].value;
        if(codeq=="" || val==""){
            control="0";
        }
    }

    if(control=="0"){
        alert("Faltan datos por llenar... Verifique.");
    }else{
        for( contador=0; contador < num_elementos; contador++ ){
        cod =document.getElementsByName("cod")[contador].value;
        desp =document.getElementsByName("des_prod")[contador].value;
        codeq =document.getElementsByName("cod_equi")[contador].value;
        val =document.getElementsByName("valor")[contador].value;
        proc += cod  +"#" + desp + "#" + codeq + "#" + val +"//";
        }
          opener.document.getElementById("proc").value = proc;
          self.close()

    }
    }else{
        opener.document.getElementById("proc").value = "0";
        self.close()
    }

}

function guar_procAsigP(){

    var val="";
    var codeq="";
    var cod="";
    var control="1";
    var proc="";
    var desp="";

    var num_elementos = document.getElementsByName("boton1").length;
    if(num_elementos!=0){
    for(contador=0; contador < num_elementos; contador++ ){			//
        val =document.getElementsByName("valor")[contador].value;
        if( val==""){
            control="0";
        }
    }

    if(control=="0"){
        alert("Faltan datos por llenar... Verifique.");
    }else{
        for( contador=0; contador < num_elementos; contador++ ){
        cod =document.getElementsByName("cod")[contador].value;
        desp =document.getElementsByName("des_prod")[contador].value;
        val =document.getElementsByName("valor")[contador].value;
        proc += cod  +"#" + desp + "#" + val +";";
        }

          opener.document.getElementById("proc").value = proc;
          self.close()

    }
    }

}

function ver_mat1(){
    var proc=document.getElementById("proc").value;
    if(proc=="0"){
        alert("No se ha Asignado Ningun Procedimiento");
    }else{
        window.open("../mod_administracion/ProcPlan_asig.jsp","asig_ProcPlan","width=800, height=500, scrollbars=no, menubar=no, location=no, resizable=no");
    }
}

function ver_mat(){

    var proc=opener.document.getElementById("proc").value;
    //    var admi=document.getElementById("selecadmin").value;
    //    var plan=document.getElementById("txtnombres").value;

    ajax = ObjetoAjax();
    ajax.open("POST", "../ProcPlan_asig", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("proc="+proc);
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
          document.getElementById('td_tabla').innerHTML = ajax.responseText;
        }
    }
}

function OpenRestCampo(){
   window.open("../mod_administracion/OpenRestCampo.jsp","asig_ProcPlan","width=600, height=450, scrollbars=no, menubar=no, location=no, resizable=no");
}

function sel_restr(){


    if(document.getElementById("vserv").checked==true){
      restr="vserv-";
    }else{
      restr=",-";
    }

   //////
    if(document.getElementById("porc").checked==true){
      restr=restr+"porc-";
    }else{
      restr=restr+",-";
    }

   //////
    if(document.getElementById("cmode").checked==true){
      restr=restr+"cmode-";
    }else{
      restr=restr+",-";
    }

    //////
    if(document.getElementById("copa").checked==true){
      restr=restr+"copa-";
    }else{
      restr=restr+",-";
    }

    //////
    if(document.getElementById("copaQX").checked==true){
      restr=restr+"copaQX-";
    }else{
      restr=restr+",-";
    }

    //////
    if(document.getElementById("porQX").checked==true){
      restr=restr+"porQX-";
    }else{
      restr=restr+",-";
    }

    //////
    if(document.getElementById("valpochosp").checked==true){
      restr=restr+"valpochosp-";
    }else{
      restr=restr+",-";
    }

    //////
    if(document.getElementById("porhosp").checked==true){
      restr=restr+"porhosp-";
    }else{
      restr=restr+",-";
    }

    //////
    if(document.getElementById("vservapli").checked==true){
      restr=restr+"vservapli-";
    }else{
      restr=restr+",-";
    }

    //////
    if(document.getElementById("porcapli").checked==true){
      restr=restr+"porcapli-";
    }else{
      restr=restr+",-";
    }


    //////
    if(document.getElementById("cmodeapli").checked==true){
      restr=restr+"cmodeapli-";
    }else{
      restr=restr+",-";
    }

    //////
    if(document.getElementById("copaapli").checked==true){
      restr=restr+"copaapli-";
    }else{
      restr=restr+",-";
    }


    opener.document.getElementById("rcamp").value = restr;
    self.close()
}

function asig_restr(){
      restr=opener.document.getElementById("rcamp").value;

   if(restr!="0"){

      var prest=restr.split("-");

      if(prest[0]=="vserv"){
          document.getElementById('vserv').checked=true;
      }else{
          document.getElementById('vserv').checked=false;
      }

     ///////
     if(prest[1]=="porc"){
          document.getElementById('porc').checked=true;
      }else{
          document.getElementById('porc').checked=false;
      }

     ///////
     if(prest[2]=="cmode"){
          document.getElementById('cmode').checked=true;
      }else{
          document.getElementById('cmode').checked=false;
      }

      ///////
     if(prest[3]=="copa"){
          document.getElementById('copa').checked=true;
      }else{
          document.getElementById('copa').checked=false;
      }

      ///////
     if(prest[4]=="copaQX"){
          document.getElementById('copaQX').checked=true;
      }else{
          document.getElementById('copaQX').checked=false;
      }

      ///////
     if(prest[5]=="porQX"){
          document.getElementById('porQX').checked=true;
      }else{
          document.getElementById('porQX').checked=false;
      }

      ///////
     if(prest[6]=="valpochosp"){
          document.getElementById('valpochosp').checked=true;
      }else{
          document.getElementById('valpochosp').checked=false;
      }

     ///////
     if(prest[7]=="porhosp"){
          document.getElementById('porhosp').checked=true;
      }else{
          document.getElementById('porhosp').checked=false;
      }

     ///////
     if(prest[8]=="vservapli"){
          document.getElementById('vservapli').checked=true;
      }else{
          document.getElementById('vservapli').checked=false;
      }

      ///////
     if(prest[9]=="porcapli"){
          document.getElementById('porcapli').checked=true;
      }else{
          document.getElementById('porcapli').checked=false;
      }

      ///////
     if(prest[10]=="cmodeapli"){
          document.getElementById('cmodeapli').checked=true;
      }else{
          document.getElementById('cmodeapli').checked=false;
      }

      ///////
     if(prest[11]=="copaapli"){
          document.getElementById('copaapli').checked=true;
      }else{
          document.getElementById('copaapli').checked=false;
      }
   }

}

function cuoPago(){
     window.open("../mod_administracion/cuoYcop.jsp","cuoYcop","width=600, height=700, scrollbars=no, menubar=no, location=no, resizable=no");
}

function Add_niveles(){

   var control="1"
    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }



    var num_elementos2 = document.getElementsByName("boton1").length;
    if(num_elementos2>0){
        for( var contador2=0; contador2 < num_elementos2; contador2++ ){			//
           cod =document.getElementsByName("cod")[contador2].value;
            if(cod==valor){
                control="0";
            }
        }
    }
    if(control=="1"){
        niv_valores(valor,'0,00','');
    }else{
        alert("Este Nivel ya ha Sido Agregado.");
    }

}

function niv_valores(niv,cmod1,pcop1){
    var cont = document.getElementById("cont");
    var filas = document.getElementById("filas");
    cont.setAttribute("value", parseInt(cont.value,0)+1);
    var tabla = document.getElementById("contenido").tBodies[0];
    var fila = document.createElement("TR");
    fila.setAttribute("align","center");

    var celda2 = document.createElement("TD");
    var cod = document.createElement("INPUT");
    cod.setAttribute("type","text");
    cod.setAttribute("size","25");
    cod.setAttribute('style','font-size:7pt;' )
    cod.setAttribute("title","Doble Click para seleccionar producto");
    cod.setAttribute("maxlength","18");
    cod.setAttribute("disabled","disabled");
    cod.setAttribute("value", niv);
    cod.setAttribute("name","cod");
    cod.setAttribute("id","cod" + cont.value);
    celda2.appendChild(cod);

    var celda3 = document.createElement("TD");
    var cmod = document.createElement("INPUT");
    cmod.setAttribute("type","text");
    cmod.setAttribute("size","25");
    cmod.setAttribute("maxlength","80");
    cmod.setAttribute('style','font-size:7pt; text-align:right;' )
    cmod.setAttribute("value", cmod1);
    cmod.setAttribute("name","cmod");
    cmod.setAttribute("onfocus","this.select()");
    cmod.setAttribute("onclick","this.select()");
    cmod.setAttribute("id","cmod" + cont.value);
    cmod.setAttribute("onkeyup","validartcoma(event, this.id);");
    cmod.onchange=function(){
        textm(this.value,this.id);
    }
    celda3.appendChild(cmod);

    var celda5 = document.createElement("TD");
    var pcop = document.createElement("INPUT");
    pcop.setAttribute("type","text");
    pcop.setAttribute("size","25");
    pcop.setAttribute("value", pcop1);
    pcop.setAttribute("style", "text-align:right;font-size:7pt;");
    pcop.setAttribute("id","pcop" + cont.value);
    pcop.setAttribute("name","pcop");
    pcop.setAttribute("onfocus","this.select()");
    pcop.setAttribute("onclick","this.select()");
    pcop.setAttribute("onkeyup","validartcoma(event, this.id);");
    pcop.onchange=function(){
        textm(this.value,this.id);
    }
    celda5.appendChild(pcop);

    var celda11 = document.createElement('TD');
    var boton = document.createElement('INPUT');
    boton.setAttribute('type','button');
    boton.setAttribute('value','X');
    boton.setAttribute('id','boton1' + cont.value);
    boton.setAttribute('name','boton1');
    boton.setAttribute('title','Quitar de la lista');
    boton.setAttribute('style','font-size:7pt; padding:2px 2px 2px 2px; margin; margin: 0px 4px 4px 0px;' )
    boton.onclick=function(){
        borrarFila(this, this.id);
    }
    celda11.appendChild(boton);

    //fila.appendChild(celda1);
    fila.appendChild(celda2);
    fila.appendChild(celda3);
    fila.appendChild(celda5);
    fila.appendChild(celda11);
    tabla.appendChild(fila);
}

function guar_nival(){

    var vnivel="";
    var pcop="";
    var cmod="";
    var niv="";
    var control="1";



    var num_elementos = document.getElementsByName("boton1").length;
    if(num_elementos!=0){
        for(contador=0; contador < num_elementos; contador++ ){			//
            cmod =document.getElementsByName("cmod")[contador].value;
            pcop =document.getElementsByName("pcop")[contador].value;
            if(cmod=="" || pcop==""){
                control="0";
            }
        }

        if(control=="0"){
            alert("Debe Asociar un Valor a la Cuota Moderadora y al Copago para cada nivel que Asigne");
        }else{
            for( contador=0; contador < num_elementos; contador++ ){
                niv =document.getElementsByName("cod")[contador].value;
                cmod =document.getElementsByName("cmod")[contador].value;
                pcop =document.getElementsByName("pcop")[contador].value;
                vnivel += niv  +"#" + cmod + "#" + pcop+";";
            }
            opener.document.getElementById("nival").value = vnivel;
            self.close()

        }
    }

}

function asigvalniv(){

    vnivel=opener.document.getElementById("nival").value;

    if(vnivel!="0"){
        var par_vnivel=vnivel.split(";");
        tam=par_vnivel.length;
        for(var r = 0; r < tam-1; r++) {
            prc = par_vnivel[r].split("#");
            niv_valores(prc[0],prc[1],prc[2]);
        }
    }
}

function asig_planArea(ori){
    if(ori=="proServ"){
        cod=document.getElementById("txtcod").value;
        window.open("../areas?ori="+ori+"&cod="+cod,"areas","width=625, height=750, scrollbars=yes, menubar=no, location=no, resizable=no");
    }else{
        window.open("../areas?ori="+ori,"areas","width=850, height=750, scrollbars=yes, menubar=no, location=no, resizable=no");
    }

 }

function asig_planAreaP(ori){
    window.open("../areas?ori="+ori,"areas","width=600, height=750, scrollbars=no, menubar=no, location=no, resizable=no");
 }


function Add_areas(){

    var control="1"
    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    var par_prc=valor.split(";;");

    var num_elementos2 = document.getElementsByName("boton1").length;
    if(num_elementos2>0){
        for( var contador2=0; contador2 < num_elementos2; contador2++ ){			//
           cod =document.getElementsByName("cod")[contador2].value;
            if(cod==par_prc[0]){
                control="0";
            }
        }
    }
    if(control=="1"){
        area_asig(par_prc[0],par_prc[1],'','0,00');
    }else{
        alert("El Area ya se Encuentra Asignada.");
    }

}

function Add_areasP(){

    var control="1"
    var num_elementos = document.getElementsByName("seleccion").length;

    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    var par_prc=valor.split(";;");

    var num_elementos2 = document.getElementsByName("boton1").length;
    if(num_elementos2>0){
        for( var contador2=0; contador2 < num_elementos2; contador2++ ){			//
           cod =document.getElementsByName("cod")[contador2].value;
            if(cod==par_prc[0]){
                control="0";
            }
        }
    }
    if(control=="1"){
        area_asigP(par_prc[0],par_prc[1],'');
    }else{
        alert("El Area ya se Encuentra Asignada.");
    }

}


function area_asig(cod_a,desc,porcentaje,recargo){

    var cont = document.getElementById("cont");
    var filas = document.getElementById("filas");
    cont.setAttribute("value", parseInt(cont.value,0)+1);
    var tabla = document.getElementById("contenido").tBodies[0];
    var fila = document.createElement("TR");
    fila.setAttribute("align","center");

    var celda2 = document.createElement("TD");
    var cod = document.createElement("INPUT");
    cod.setAttribute("type","text");
    cod.setAttribute("size","17");
    cod.setAttribute('style','font-size:7pt;' )
    cod.setAttribute("title","Doble Click para seleccionar producto");
    cod.setAttribute("maxlength","18");
    cod.setAttribute("disabled","disabled");
    cod.setAttribute("value", cod_a);
    cod.setAttribute("name","cod");
    cod.setAttribute("id","cod" + cont.value);
    celda2.appendChild(cod);

    var celda3 = document.createElement("TD");
    var area = document.createElement("INPUT");
    area.setAttribute("type","text");
    area.setAttribute("size","58");
    area.setAttribute("maxlength","80");
    area.setAttribute("disabled","disabled");
    area.setAttribute('style','font-size:7pt;' )
    area.setAttribute("value", desc);
    area.setAttribute("name","des_are");
    area.setAttribute("id","des_are" + cont.value);
    celda3.appendChild(area);

    var celda4 = document.createElement("TD");
    var porce = document.createElement("INPUT");
    porce.setAttribute("type","text");
    porce.setAttribute("size","20");
    porce.setAttribute('style','font-size:7pt;text-align:right;' )
    porce.setAttribute("value",porcentaje);
    porce.setAttribute("maxlength","11");
    porce.setAttribute("id","porce" + cont.value);
    porce.setAttribute("name","porce");
    porce.setAttribute("onfocus","this.select()");
    porce.setAttribute("onclick","this.select()");
    porce.onchange=function(){
        textm(this.value,this.id);
    }
    celda4.appendChild(porce);

    var celda5 = document.createElement("TD");
    var valor = document.createElement("INPUT");
    valor.setAttribute("type","text");
    valor.setAttribute("size","18");
    valor.setAttribute("value", recargo);
    valor.setAttribute("style", "text-align:right;font-size:7pt;");
    valor.setAttribute("id","valor" + cont.value);
    valor.setAttribute("name","valor");
    valor.setAttribute("onfocus","this.select()");
    valor.setAttribute("onclick","this.select()");
    valor.setAttribute("onkeyup","validartcoma(event, this.id);");
    valor.onchange=function(){
        textm(this.value,this.id);
    }
    celda5.appendChild(valor);

    var celda11 = document.createElement('TD');
    var boton = document.createElement('INPUT');
    boton.setAttribute('type','button');
    boton.setAttribute('value','X');
    boton.setAttribute('id','boton1' + cont.value);
    boton.setAttribute('name','boton1');
    boton.setAttribute('title','Quitar de la lista');
    boton.setAttribute('style','font-size:7pt; padding:2px 2px 2px 2px; margin; margin: 0px 4px 4px 0px;' )
    boton.onclick=function(){
        borrarFila(this, this.id);
    }
    celda11.appendChild(boton);

    //fila.appendChild(celda1);
    fila.appendChild(celda2);
    fila.appendChild(celda3);
    fila.appendChild(celda4);
    fila.appendChild(celda5);
    fila.appendChild(celda11);
    tabla.appendChild(fila);

}

function area_asigP(cod_a,desc,porcentaje){

    var cont = document.getElementById("cont");
    var filas = document.getElementById("filas");
    cont.setAttribute("value", parseInt(cont.value,0)+1);
    var tabla = document.getElementById("contenido").tBodies[0];
    var fila = document.createElement("TR");
    fila.setAttribute("align","center");

    var celda2 = document.createElement("TD");
    var cod = document.createElement("INPUT");
    cod.setAttribute("type","text");
    cod.setAttribute("size","16");
    cod.setAttribute('style','font-size:7pt;' )
    cod.setAttribute("title","Doble Click para seleccionar producto");
    cod.setAttribute("maxlength","18");
    cod.setAttribute("disabled","disabled");
    cod.setAttribute("value", cod_a);
    cod.setAttribute("name","cod");
    cod.setAttribute("id","cod" + cont.value);
    celda2.appendChild(cod);

    var celda3 = document.createElement("TD");
    var area = document.createElement("INPUT");
    area.setAttribute("type","text");
    area.setAttribute("size","64");
    area.setAttribute("maxlength","80");
    area.setAttribute("disabled","disabled");
    area.setAttribute('style','font-size:7pt;' )
    area.setAttribute("value", desc);
    area.setAttribute("name","des_are");
    area.setAttribute("id","des_are" + cont.value);
    celda3.appendChild(area);

    var celda4 = document.createElement("TD");
    var porce = document.createElement("INPUT");
    porce.setAttribute("type","text");
    porce.setAttribute("size","20");
    porce.setAttribute('style','font-size:7pt;text-align:right;' )
    porce.setAttribute("value",porcentaje);
    porce.setAttribute("maxlength","11");
    porce.setAttribute("id","porce" + cont.value);
    porce.setAttribute("name","porce");
    porce.setAttribute("onfocus","this.select()");
    porce.setAttribute("onclick","this.select()");
    porce.onchange=function(){
        textm(this.value,this.id);
    }
    celda4.appendChild(porce);



    var celda11 = document.createElement('TD');
    var boton = document.createElement('INPUT');
    boton.setAttribute('type','button');
    boton.setAttribute('value','X');
    boton.setAttribute('id','boton1' + cont.value);
    boton.setAttribute('name','boton1');
    boton.setAttribute('title','Quitar de la lista');
    boton.setAttribute('style','font-size:7pt; padding:2px 2px 2px 2px; margin; margin: 0px 4px 4px 0px;' )
    boton.onclick=function(){
        borrarFila(this, this.id);
    }
    celda11.appendChild(boton);

    //fila.appendChild(celda1);
    fila.appendChild(celda2);
    fila.appendChild(celda3);
    fila.appendChild(celda4);
    fila.appendChild(celda11);
    tabla.appendChild(fila);

}

function guar_AreaAsig(){

    var porc="";
    var rec="";
    var cod="";
    var desc="";
    var control="1";
    var proc="";

    var num_elementos = document.getElementsByName("boton1").length;
    if(num_elementos!=0){
        for(contador=0; contador < num_elementos; contador++ ){			//
            porc =document.getElementsByName("porce")[contador].value;
            rec =document.getElementsByName("valor")[contador].value;
            if(porc=="" || rec==""){
                control="0";
            }
        }

        if(control=="0"){
            alert("Faltan datos por llenar... Verifique.");
        }else{
            for( contador=0; contador < num_elementos; contador++ ){
                cod =document.getElementsByName("cod")[contador].value;
                desc =document.getElementsByName("des_are")[contador].value;
                porc =document.getElementsByName("porce")[contador].value;
                rec =document.getElementsByName("valor")[contador].value;
                proc += cod + "#" + desc + "#" + porc + "#" + rec +";";
            }
            opener.document.getElementById("area").value = proc;

            self.close()

        }
    }
}

function guar_AreaAsigP(){

    var porc="";
    var rec="";
    var cod="";
    var desc="";
    var control="1";
    var proc="";

    var num_elementos = document.getElementsByName("boton1").length;
    if(num_elementos!=0){
        for(contador=0; contador < num_elementos; contador++ ){			//
            porc =document.getElementsByName("porce")[contador].value;
            if(porc==""){
                control="0";
            }
        }

        if(control=="0"){
            alert("Faltan datos por llenar... Verifique.");
        }else{
            for( contador=0; contador < num_elementos; contador++ ){
                cod =document.getElementsByName("cod")[contador].value;
                desc =document.getElementsByName("des_are")[contador].value;
                porc =document.getElementsByName("porce")[contador].value;
                proc += cod + "#" + desc + "#" + porc + ";";
            }
            opener.document.getElementById("area").value = proc;

            self.close()

        }
    }
}

function guar_AreasModu(){

    var cod="";
    var desc="";
    var proc="";

    id_mod=document.getElementById("modu").value;
    bod_medi=document.getElementById("bod_med"+id_mod).value;
    und_func=document.getElementById("und_func"+id_mod).value;

    var num_elementos = document.getElementsByName("boton"+id_mod).length;

    if(num_elementos==0){
            alert("No se ha Agregado Ninguna Area a Este Modulo");
        }else{
            for( contador=0; contador < num_elementos; contador++ ){
                cod =document.getElementsByName("cod"+id_mod)[contador].value;
                desc =document.getElementsByName("des_prod"+id_mod)[contador].value;
                proc += cod + "#" + desc + ";";
            }
    var variables = "id_mod="+id_mod+"&bod_medi="+bod_medi+"&und_func="+und_func+"&proc="+proc;

    guardar('../guardar_areasModu',variables,'guardar_areasModu');

     }
}

function asigarea(){

    area=opener.document.getElementById("area").value;

    if(area!="0"){
        var par_vnivel=area.split(";");
        tam=par_vnivel.length;
        for(var r = 0; r < tam-1; r++) {
            prc = par_vnivel[r].split("#");
            area_asig(prc[0],prc[1],prc[2],prc[3]);
        }
    }
}

function asigareaP(){

    area=opener.document.getElementById("area").value;

    if(area!="0"){
        var par_vnivel=area.split(";");
        tam=par_vnivel.length;
        for(var r = 0; r < tam-1; r++) {
            prc = par_vnivel[r].split("#");
            area_asigP(prc[0],prc[1],prc[2]);
        }
    }
}

function Busqueda_areaAsig(){

    tip_bus=document.getElementById("t_bus").value;
    busq=  document.getElementById("busqueda").value;
    ajax = ObjetoAjax();
    ajax.open("POST", "../areas", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&control=2&ori=bus");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_tabla').innerHTML = ajax.responseText
        }
    }

}

function Busqueda_areaAsig2(){

    tip_bus=document.getElementById("t_bus").value;
    busq=  document.getElementById("busqueda").value;
    ajax = ObjetoAjax();
    ajax.open("POST", "../asig_areaModulos", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&control=2");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_tabla').innerHTML = ajax.responseText
        }
    }

}

function asigprcoc(){

    proc=opener.document.getElementById("proc").value;

    if(proc!="0"){
        var par_vnivel=proc.split("//");
        tam=par_vnivel.length;
        for(var r = 0; r < tam-1; r++) {
            prc = par_vnivel[r].split("#");
            proc_asig(prc[0],prc[1],prc[2],prc[3]);
        }
    }
}

function asigprocProg(){
 
    proc=document.getElementById("proc").value;

    if(proc!="0"){
        var par_vnivel=proc.split("//");
        tam=par_vnivel.length;
        for(var r = 0; r < tam-1; r++) {
            prc = par_vnivel[r].split("#");
            proc_asigProg(prc[0],prc[1],prc[2]);
        }
    }
}

function asigprcocP(){

    proc=opener.document.getElementById("proc").value;

    if(proc!="0"){
        var par_vnivel=proc.split(";");
        tam=par_vnivel.length;
        for(var r = 0; r < tam-1; r++) {
            prc = par_vnivel[r].split("#");
            proc_asigP(prc[0],prc[1],prc[2]);
        }
    }
}

function buscar_planAdmi(ori){
cargarPlanAdmin(ori);
  document.getElementById('conte').style.visibility = 'hidden';
 document.getElementById('buscaPlanAdmin').style.visibility = 'visible';
 location.href="#buscaPlanAdmin";
}

function buscar_planes(ori){
cargarPlanAdmin(ori);
document.getElementById('buscaPlanAdmin').style.visibility = 'visible';
location.href="#buscaPlanAdmin";
}

function Busqueda_PlanAdmin(){

     tip_bus=document.getElementById("t_bus").value;
    busq=  document.getElementById("busqueda").value;
    ajax = ObjetoAjax();
    ajax.open("POST", "../most_PlanAdmin", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&control=2");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_adminPlan').innerHTML = ajax.responseText
        }
    }
}

function sel_plan_edit(){
     var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    pvalor=valor.split("//");
    document.getElementById('txtplan').value=pvalor[0];
    dadmin=pvalor[2].split("-");
    document.getElementById('txtnompla').value=pvalor[1]+" - "+dadmin[1];
    document.getElementById('td_adminPlan').innerHTML="";
    Cerrarpopu('buscaPlanAdmin');
}

function sel_AsigPlanAdmin(){
//   var num_elementos = document.getElementsByName("seleccion").length;
//    for( var contador=0; contador < num_elementos; contador++ ){			//
//        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
//            var valor = document.getElementsByName("seleccion")[contador].value;	//
//    }
//   pvalor=valor.split("//");
//   document.getElementById("cod1").value=pvalor[0];
//   document.getElementById("des_adm1").value=pvalor[1];
//   document.getElementById("des_plan1").value=pvalor[2];

guar_planPac()
   Cerrarpopu('buscaPlanAdmin');


}

function sel_planAdmin(){
    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    pvalor=valor.split("//");
    document.location="../ges_planAdmi?busq=B&pri=T&cod="+pvalor[0];
    Cerrarpopu('buscaPlanAdmin');
}

function cargarPlanAdmin(ori){
    ajax = ObjetoAjax();
    ajax.open("POST", "../most_PlanAdmin", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("programa="+ori);
    ajax.onreadystatechange=function() {
          if (ajax.readyState==4) {
                document.getElementById('td_adminPlan').innerHTML = ajax.responseText
            }
        }
}

function nuevo_planAdmi(){


    document.getElementById('accion').value="1";

    document.getElementById('selecadmin').selectedIndex=0;
    document.getElementById('txtcodPlan').value="";
    document.getElementById('txtnombres').value="";
    document.getElementById('numcont').value="";
    document.getElementById('valcont').value="0,00";
    document.getElementById('valejec').value="0,00";
    document.getElementById('poravi').value="0";
    document.getElementById('codfi').selectedIndex=0;
    document.getElementById('tip_man').checked=true;
    document.getElementById('opc_man').selectedIndex=0;
    document.getElementById('opc_anio').selectedIndex=0;
    document.getElementById('tip_mane').checked=false;
    document.getElementById('chefinicial').checked=false;
    document.getElementById('finicial').value="";
    document.getElementById('cheffinal').checked=false;
    document.getElementById('ffinal').value="";
    document.getElementById('montfijo').checked=true;
    document.getElementById('opc_regi').selectedIndex=0;
    document.getElementById('planbene').value="";
    document.getElementById('montfijo').selectedIndex=0;
    document.getElementById('pie_fact').value="";
    document.getElementById('opc_fpago').selectedIndex=0;
    document.getElementById('activo').checked=true;
    document.getElementById('txtestanc').value="0";
    document.getElementById('mateQx').checked=false;
    document.getElementById('txtmatQx').value="0";
    document.getElementById('cuomoder').checked=false;
    document.getElementById('txtdocRef').value="";
    document.getElementById('retFact').checked=false;
    document.getElementById("plcontra").checked=true;
    document.getElementById('ctaretenc').value="";
    document.getElementById('ctaxcobra').value="";
    document.getElementById('ctaporc').value="";
    document.getElementById('ctadesc').value="";
    document.getElementById('ctacop').value="";
    document.getElementById('ctacuot').value="";
    document.getElementById('ctacapit').value="";
    document.getElementById('orsevaciones').value="";
    document.getElementById('proc').value="0";
    document.getElementById('rcamp').value="0";
    document.getElementById('nival').value="0";
    document.getElementById('area').value="0";

    document.getElementById('selecadmin').disabled=false;
    document.getElementById('txtcodPlan').disabled=false;
    document.getElementById('txtnombres').disabled=false;
    document.getElementById('numcont').disabled=false;
    document.getElementById('valcont').disabled=false;
    document.getElementById('valejec').disabled=false;
    document.getElementById('poravi').disabled=false;
    document.getElementById('codfi').disabled=false;
    document.getElementById('tip_man').disabled=false;
    document.getElementById('opc_man').disabled=false;
    document.getElementById('opc_anio').disabled=false;
    document.getElementById('tip_mane').disabled=false;
    document.getElementById('chefinicial').disabled=false;
//    document.getElementById('finicial').disabled=false;
    document.getElementById('cheffinal').disabled=false;
//    document.getElementById('ffinal').disabled=false;
    document.getElementById('montfijo').disabled=false;
    document.getElementById('opc_regi').disabled=false;
    document.getElementById('planbene').disabled=false;
    document.getElementById('montfijo').disabled=false;
    document.getElementById('pie_fact').disabled=false;
    document.getElementById('opc_fpago').disabled=false;
    document.getElementById('activo').disabled=false;
    document.getElementById('txtestanc').disabled=false;
    document.getElementById('mateQx').disabled=false;
    document.getElementById('txtmatQx').disabled=false;
    document.getElementById('cuomoder').disabled=false;
    document.getElementById('txtdocRef').disabled=false;
    document.getElementById('retFact').disabled=false;
    document.getElementById('ctaretenc').disabled=false;
    document.getElementById('ctaxcobra').disabled=false;
    document.getElementById('ctaporc').disabled=false;
    document.getElementById('ctadesc').disabled=false;
    document.getElementById('ctacop').disabled=false;
    document.getElementById('ctacuot').disabled=false;
    document.getElementById('ctacapit').disabled=false;
    document.getElementById('orsevaciones').disabled=false;
    document.getElementById("plcontra").disabled=false;

    document.getElementById('btn_ver').disabled=true;
    document.getElementById('btn_modi').disabled=true;
    document.getElementById('btn_areas').disabled=false;
    document.getElementById('btn_rcamp').disabled=false;
    document.getElementById('btn_cyc').disabled=false;

    document.getElementById('btn_rcamp').setAttribute("style", "color:black;padding:3px 30px 3px 30px;  margin: 0px 4px 4px 0px;");
     document.getElementById('btn_cyc').setAttribute("style", "color:black;padding:3px 30px 3px 30px;  margin: 0px 4px 4px 0px;");
     document.getElementById('btn_areas').setAttribute("style", "color:black;padding:3px 30px 3px 30px;  margin: 0px 4px 4px 0px;");



    document.getElementById('btn_nuevo').setAttribute("style", "display:none");
    document.getElementById('btn_delete').setAttribute("style", "display:none");
    document.getElementById('btn_editar').setAttribute("style", "display:none");
    document.getElementById('btn_buscar').setAttribute("style", "display:none");
    document.getElementById('btn_guardar').setAttribute("style", "display:block");

    document.getElementById('txtcodPlan').focus();
}

function guardar_planAdmi(){

    accion=document.getElementById('accion').value;

    selecadmin=document.getElementById('selecadmin').value;
    txtcodPlan=document.getElementById('txtcodPlan').value;
    txtnombres=document.getElementById('txtnombres').value;
    numcont=document.getElementById('numcont').value;
    valcont=document.getElementById('valcont').value.replace(".","").replace(".","").replace(",",".");
    valejec=document.getElementById('valejec').value.replace(".","").replace(".","").replace(",",".");
    poravi=document.getElementById('poravi').value.replace(",",".");
    codfi=document.getElementById('codfi').value;

//    var tip_mane="";
//    if(document.getElementById('tip_mane').checked==true){
//        tip_mane="s";
//    }else{
//        tip_mane="n";
//    }

    opc_man=document.getElementById('opc_man').value;
    opc_anio=document.getElementById('opc_anio').value;

    var tip_mane="";
    if(document.getElementById('tip_mane').checked==true){
       tip_mane="s";
    }else{
       tip_mane="n";
    }


    if(document.getElementById('tip_mane').checked==true){
       tip_mane="s";
    }else{
       tip_mane="n";
    }


    var finicial="";
    if(document.getElementById('chefinicial').checked==true){
        finicial=document.getElementById('finicial').value;
    }else{
        finicial="";
    }

     var ffinal="";
    if(document.getElementById('cheffinal').checked==true){
        ffinal=document.getElementById('ffinal').value;
    }else{
        ffinal="";
    }

    var plcontr="";
    if(document.getElementById('plcontra').checked==true){
        plcontr= "s";
    }else{
        plcontr="n";
    }

    var montfijo="";
    if(document.getElementById('montfijo').checked==true){
        montfijo="s";
    }else{
        montfijo="n";
    }

    opc_regi=document.getElementById('opc_regi').value;
    planbene=document.getElementById('planbene').value;
//  montfijo=document.getElementById('montfijo').value;
    pie_fact=document.getElementById('pie_fact').value;
    opc_fpago=document.getElementById('opc_fpago').value;
    var activo=""
    if(document.getElementById('activo').checked==true){
        activo="s";
    }else{
        activo="n"
    }

    txtestanc=document.getElementById('txtestanc').value.replace(",",".");
    var mateQx="";
    if(document.getElementById('mateQx').checked==true){
        mateQx="s";
    }else{
        mateQx="n";
    }

    txtmatQx=document.getElementById('txtmatQx').value.replace(",",".");

    var cuomoder="";
    if(document.getElementById('cuomoder').checked==true){
        cuomoder="s";
    }else{
        cuomoder="n";
    }

    txtdocRef=document.getElementById('txtdocRef').value;
    var retFact="";
    if(document.getElementById('retFact').checked==true){
        retFact="s";
    }else{
        retFact="n";
    }

    ctaretenc=document.getElementById('ctaretenc').value;
    ctaxcobra=document.getElementById('ctaxcobra').value;
    ctaporc=document.getElementById('ctaporc').value;
    ctadesc=document.getElementById('ctadesc').value;
    ctacop=document.getElementById('ctacop').value;
    ctacuot=document.getElementById('ctacuot').value;
    ctacapit=document.getElementById('ctacapit').value;
    orsevaciones=document.getElementById('orsevaciones').value;
    proc=document.getElementById('proc').value;
    rcamp=document.getElementById('rcamp').value;
    nival=document.getElementById('nival').value;
    area=document.getElementById('area').value;
    control="1";

    if(selecadmin=="0"){
      alert("Seleccione la Administradora");
      document.getElementById("selecadmin").focus();
      control="0";
    }else if(txtcodPlan==""){
      alert("Digite el C\u00f3digo del plan");
      document.getElementById("selecadmin").focus();
      control="0";
    }else if(txtnombres==""){
      alert("Digite el nombre del plan");
      document.getElementById("txtnombres").focus();
      control="0";
    }else if(codfi==""){
      alert("Seleccione el tipo de Codificaci\u00f3n");
      document.getElementById("codfi").focus();
      control="0";
    }else if(tip_mane=="s"){
      if(document.getElementById("proc").value=="0"){
         alert("No se ha asignado ningun procedimiento al manual especifico verifique");
         control="0";
      }
    }


    if(control=="1"){
        var variables="selecadmin=" + selecadmin + "&txtcodPlan=" + txtcodPlan + "&txtnombres=" + txtnombres
        + "&numcont=" + numcont+ "&valcont=" + valcont + "&valejec=" + valejec + "&poravi=" + poravi
        + "&codfi=" + codfi+ "&tip_man=" + tip_man + "&opc_man=" + opc_man + "&opc_anio=" + opc_anio
        + "&tip_mane=" + tip_mane+ "&finicial=" + finicial + "&ffinal=" + ffinal + "&montfijo=" + montfijo
        + "&opc_regi=" + opc_regi+ "&planbene=" + planbene + "&pie_fact=" + pie_fact
        + "&opc_fpago=" + opc_fpago+ "&activo=" + activo + "&txtestanc=" + txtestanc + "&mateQx=" + mateQx
        + "&txtmatQx=" + txtmatQx+ "&cuomoder=" + cuomoder + "&txtdocRef=" + txtdocRef + "&retFact=" + retFact
        + "&ctaretenc=" + ctaretenc+ "&ctaxcobra=" + ctaxcobra + "&ctaporc=" + ctaporc + "&ctadesc=" + ctadesc
        + "&ctacop=" + ctacop+ "&ctacuot=" + ctacuot + "&ctacapit=" + ctacapit + "&orsevaciones=" + orsevaciones
        + "&proc=" + proc+ "&rcamp=" + rcamp + "&nival=" + nival + "&area=" + area+ "&acc=" + accion+"&plcontr="+plcontr;

        guardar('../guardar_PlanAdmin',variables,'planAdmi');

    }

}

function editar_planAdmi(){


    document.getElementById('accion').value="2";

    document.getElementById('selecadmin').disabled=false;
//    document.getElementById('txtcodPlan').disabled=false;
    document.getElementById('txtnombres').disabled=false;
    document.getElementById('numcont').disabled=false;
    document.getElementById('valcont').disabled=false;
    document.getElementById('valejec').disabled=false;
    document.getElementById('poravi').disabled=false;
    document.getElementById('codfi').disabled=false;
    document.getElementById('tip_man').disabled=false;
    document.getElementById('opc_man').disabled=false;
    document.getElementById('opc_anio').disabled=false;
    document.getElementById('tip_mane').disabled=false;
    document.getElementById('chefinicial').disabled=false;
    document.getElementById('finicial').disabled=false;
    document.getElementById('cheffinal').disabled=false;
    document.getElementById('ffinal').disabled=false;
    document.getElementById('montfijo').disabled=false;
    document.getElementById('opc_regi').disabled=false;
    document.getElementById('planbene').disabled=false;
    document.getElementById('montfijo').disabled=false;
    document.getElementById('pie_fact').disabled=false;
    document.getElementById('opc_fpago').disabled=false;
    document.getElementById('activo').disabled=false;
    document.getElementById('txtestanc').disabled=false;
    document.getElementById('mateQx').disabled=false;
    document.getElementById('txtmatQx').disabled=false;
    document.getElementById('cuomoder').disabled=false;
    document.getElementById('txtdocRef').disabled=false;
    document.getElementById('retFact').disabled=false;
    document.getElementById('ctaretenc').disabled=false;
    document.getElementById('ctaxcobra').disabled=false;
    document.getElementById('ctaporc').disabled=false;
    document.getElementById('ctadesc').disabled=false;
    document.getElementById('ctacop').disabled=false;
    document.getElementById('ctacuot').disabled=false;
    document.getElementById('ctacapit').disabled=false;
    document.getElementById('orsevaciones').disabled=false;
    document.getElementById("plcontra").disabled=false;


//    document.getElementById('btn_ver').disabled=true;
//    document.getElementById('btn_modi').disabled=true;
    document.getElementById('btn_areas').disabled=false;
    document.getElementById('btn_rcamp').disabled=false;
    document.getElementById('btn_cyc').disabled=false;

    if(document.getElementById('tip_mane').checked==false){
        document.getElementById('btn_ver').disabled=true;
        document.getElementById('btn_modi').disabled=true;
    }else{
        document.getElementById('btn_ver').disabled=false;
        document.getElementById('btn_modi').disabled=false;
        document.getElementById('btn_rcamp').setAttribute("style", "color:black;padding:3px 30px 3px 30px;  margin: 0px 4px 4px 0px;");
        document.getElementById('btn_cyc').setAttribute("style", "color:black;padding:3px 30px 3px 30px;  margin: 0px 4px 4px 0px;");
    }

    document.getElementById('btn_rcamp').setAttribute("style", "color:black;padding:3px 30px 3px 30px;  margin: 0px 4px 4px 0px;");
    document.getElementById('btn_cyc').setAttribute("style", "color:black;padding:3px 30px 3px 30px;  margin: 0px 4px 4px 0px;");
    document.getElementById('btn_areas').setAttribute("style", "color:black;padding:3px 30px 3px 30px;  margin: 0px 4px 4px 0px;");


    document.getElementById('btn_nuevo').setAttribute("style", "display:none");
    document.getElementById('btn_delete').setAttribute("style", "display:none");
    document.getElementById('btn_editar').setAttribute("style", "display:none");
    document.getElementById('btn_buscar').setAttribute("style", "display:none");
    document.getElementById('btn_guardar').setAttribute("style", "display:block");

    document.getElementById('selecadmin').focus();

}

function nuevo_prest(){

    document.getElementById('accion').value="1";

    document.getElementById('txtident').value="";
    document.getElementById('txtnom').value="";
    document.getElementById('txtdir').value="";
    document.getElementById('txtmail').value="";
    document.getElementById('txttel').value="";
    document.getElementById('txtcel').value="";
    document.getElementById('txtreg').value="";
//    document.getElementById('txtusu').value="";
    document.getElementById('txtcodesp').value="";
    document.getElementById('txtespdes').value="";
    document.getElementById('txttserv').value="";
    document.getElementById('txtinstr').value="";
    document.getElementById('area').value="0";
    document.getElementById('proc').value="0";
    document.getElementById('txtlogin').value="";
    document.getElementById('txtcontranue').value="";
    document.getElementById('txtcontranue1').value="";
     document.getElementById('selecperfil').selectedIndex=0;

    document.getElementById('activo').checked=true;
    document.getElementById('cit').checked=true;
    document.getElementById('acami').checked=true;

    document.getElementById('txtident').disabled=false;
    document.getElementById('txtnom').disabled=false;
    document.getElementById('txtdir').disabled=false;
    document.getElementById('txtmail').disabled=false;
    document.getElementById('txttel').disabled=false;
    document.getElementById('txtcel').disabled=false;
    document.getElementById('txtreg').disabled=false;
    document.getElementById('txtcodesp').disabled=false;

    document.getElementById('txttserv').disabled=false;
    document.getElementById('txtinstr').disabled=false;
    document.getElementById('activo').checked=true;
    document.getElementById('cit').checked=true;
    document.getElementById('acami').checked=true;
    document.getElementById('gusu').checked=false;
    document.getElementById('acami').disabled=false;

    document.getElementById('gusu').disabled=false;

    document.getElementById('btn_area').disabled=false;
    document.getElementById('btn_proc').disabled=false;
    document.getElementById('btn_area').setAttribute("style", "color:black;padding:3px 30px 3px 30px;  margin: 0px 4px 4px 0px;");
    document.getElementById('btn_proc').setAttribute("style", "color:black;padding:3px 30px 3px 30px;  margin: 0px 4px 4px 0px;");
    document.getElementById('btn_rest').disabled=false;
    document.getElementById('btn_rest').setAttribute("style", "color:black;padding:3px 30px 3px 30px; font-size:12px  margin: 0px 4px 4px 0px;");

    document.getElementById('btn_especia').setAttribute("href", "javascript:javascript:most_especia();");

    document.getElementById('btn_nuevo').setAttribute("style", "display:none");
    document.getElementById('btn_delete').setAttribute("style", "display:none");
    document.getElementById('btn_editar').setAttribute("style", "display:none");
    document.getElementById('btn_buscar').setAttribute("style", "display:none");
    document.getElementById('btn_guardar').setAttribute("style", "display:block");

    document.getElementById('txtident').focus();

}

function guardar_prest(){

    acc=document.getElementById('accion').value;
    txtident=document.getElementById('txtident').value;
    txtnom=document.getElementById('txtnom').value;
    txtdir=document.getElementById('txtdir').value;
    txtmail=document.getElementById('txtmail').value;
    txttel=document.getElementById('txttel').value;
    txtcel=document.getElementById('txtcel').value;
    txtreg=document.getElementById('txtreg').value;
//    txtusu=document.getElementById('txtusu').value;
    txtesp=document.getElementById('txtcodesp').value;
    txttserv=document.getElementById('txttserv').value;
    txtinstr=document.getElementById('txtinstr').value;

    procPres= document.getElementById('procPres').value;
    medicaPres= document.getElementById('medicaPres').value;
    areaServ= document.getElementById('areaServ').value;

     txtcontra=document.getElementById('txtcontranue').value;
     txtcontra1=document.getElementById('txtcontranue1').value;
     selecperfil=document.getElementById('selecperfil').value;
     txtlogin=document.getElementById('txtlogin').value;
     var gusu="";
     if(document.getElementById('gusu').checked==true){
     gusu="s";
     }else{
      gusu="n";
     }

    proc=document.getElementById('proc').value;
    area=document.getElementById('area').value;
    if(txtinstr==""){
    txtinstr="0";
    }
    var activo="";
    if(document.getElementById('activo').checked==true){
        activo="s";
    }else{
        activo="n";
    }

    var cit="";

    if(document.getElementById('cit').checked==true){
        cit="s";
    }else{
        cit="n";
    }

    var acami=""

    if(document.getElementById('acami').checked==true){
        acami="s";
    }else{
        acami="n";
    }

    if(txtident==""){
       alert("Digite la Cedula");
       document.getElementById("txtident").focus();
    }else if(txtnom==""){
       alert("Digite el nombre");
       document.getElementById("txtnom").focus();
    }else if(txtreg==""){
       alert("Digite el Registro");
       document.getElementById("txtreg").focus();
    }else if(gusu=="s" && txtlogin==""){
        alert("Si Selecciono Gestionar Usuario Debe Digitar el Login... Verifique");
        document.getElementById('txtlogin').focus();
    }else{
        var variables="txtident=" + txtident + "&txtnom=" + txtnom + "&txtdir=" + txtdir
        + "&txtmail=" + txtmail + "&txttel=" + txttel
        + "&txtcel=" + txtcel + "&txtreg=" + txtreg
        + "&txtesp=" + txtesp + "&txttserv=" + txttserv + "&txtinstr=" + txtinstr
        + "&activo=" + activo + "&cit=" + cit + "&acami=" + acami + "&acc=" + acc+ "&proc=" + proc
        + "&area=" + area + "&gusu=" + gusu + "&txtcontra=" + txtcontra
        +  "&selecperfil=" + selecperfil + "&txtlogin=" + txtlogin+ "&procPres=" + procPres+ "&medicaPres=" + medicaPres+ "&areaServ=" + areaServ;

alert(variables);
        guardar('../guardar_prestadores',variables,'prestadores');
    }

}

function abrir_usuarios(){
    if(document.getElementById('accion').value!="0"){
   window.open("../usuarios","ventana_usuarios","width=550, height=580, scrollbars=no, menubar=no, location=no, resizable=no");
    }
}

function Busqueda_Usu(){
    tip_bus=document.getElementById("t_bus").value;
    busq=  document.getElementById("busqueda").value;
    ajax = ObjetoAjax();
    ajax.open("POST", "../usuarios", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&control=2");
    ajax.onreadystatechange=function() {
          if (ajax.readyState==4) {
                document.getElementById('td_tabla').innerHTML = ajax.responseText
            }
        }
}

function sel_usu(){
    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }
     opener.document.getElementById("txtusu").value=valor;
     window.close();
}

function nueva_especia(){

    document.getElementById('accion').value="1";
    document.getElementById('txtcod').value="";
    document.getElementById('txtdesc').value="";
    document.getElementById('observa').value="";

    document.getElementById('txtcod').disabled=false;
    document.getElementById('txtdesc').disabled=false;
    document.getElementById('observa').disabled=false;

    document.getElementById('btn_nuevo').setAttribute("style", "display:none");
    document.getElementById('btn_delete').setAttribute("style", "display:none");
    document.getElementById('btn_editar').setAttribute("style", "display:none");
    document.getElementById('btn_buscar').setAttribute("style", "display:none");
    document.getElementById('btn_guardar').setAttribute("style", "display:block");

    document.getElementById('txtcod').focus();


}

function guardar_especia(){

   acc=document.getElementById("accion").value;
   txtcod=document.getElementById('txtcod').value;
   txtdes= document.getElementById('txtdesc').value;
   txtobser= document.getElementById('observa').value;

   if(txtcod==""){
      alert("Digite el Codigo del la Especialidad");
      document.getElementById("txtcod").focus();
   }else if(txtdes==""){
       alert("Digite la Descriocion");
      document.getElementById("txtdesc").focus();
   }else{
       var variables="txtcod=" + txtcod + "&txtdes=" + txtdes + "&txtobser=" + txtobser
        + "&acc=" + acc;

        guardar('../guardar_especialidad',variables,'especialidad');

   }

}

function editar_especia(){

    if(document.getElementById('txtdesc').value==""){
        alert("No existe Ningun Registro Para Editar");
    }else{
        document.getElementById('accion').value="2";
        document.getElementById('txtdesc').disabled=false;
        document.getElementById('observa').disabled=false;

        document.getElementById('btn_nuevo').setAttribute("style", "display:none");
        document.getElementById('btn_delete').setAttribute("style", "display:none");
        document.getElementById('btn_editar').setAttribute("style", "display:none");
        document.getElementById('btn_buscar').setAttribute("style", "display:none");
        document.getElementById('btn_guardar').setAttribute("style", "display:block");

        document.getElementById('txtdesc').focus();
    }

}


function delete_especia(){

    if (confirm("\xbfEsta seguro de realizar la operaci\xf3n?")){
    var txtcod=document.getElementById("txtcod").value;
    ajax=ObjetoAjax();
    ajax.open("POST", "../guardar_especialidad", true);
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("txtcod="+txtcod+"&acc=3");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            if(trimAll(ajax.responseText) =="bien"){
                 alert("Operaci\u00f3n Realizada Exitosamente");
                 document.location = "../ges_especialidades";
            }else if((ajax.responseText) =="existe"){
                alert("Este Registro Tiene Movimiento en Otros Procesos, No se Puede Eliminar");
            }
        }
    }
  }
}

function buscar_especia(){
        window.open("../most_espe","ventana_especialidades","width=900, height=580, scrollbars=no, menubar=no, location=no, resizable=no");
}

function sel_especia(ori){

    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    pvalor=valor.split("//");


    if(ori=="pres"){
        document.getElementById("txtcodesp").value=pvalor[0];
        document.getElementById("txtespdes").value=pvalor[1];
    }else{
        document.location="../ges_especialidades?busq=B&pri=T&cod="+pvalor[0];
    }

    Cerrarpopu('buscaespecia');

}

function Busqueda_espe(){
    tip_bus=document.getElementById("t_bus").value;
    busq=  document.getElementById("busqueda").value;
    ajax = ObjetoAjax();
    ajax.open("POST", "../busca_especialidad", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_tabla').innerHTML = ajax.responseText
        }
    }
    ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&control=2");

}


function abrir_Especia(ori){

  cargarespcialidades();
  document.getElementById('buscarecaudo').style.visibility = 'visible';
  location.href="#buscarecaudo";

}


function cargarespcialidades(){
    ajax = ObjetoAjax();
    ajax.open("POST", "../most_especialidad", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("op=1");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_recaudos').innerHTML = ajax.responseText
        }
    }
}


function sel_Esp(){
    ori=document.getElementById("ori").value;
    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }
    if(ori=="admin"){
        var divvalor=valor.split("-");
    var nom=divvalor[1];
    var cod=divvalor[0];
     opener.document.getElementById("txtcodesp").value=cod;
     opener.document.getElementById("txtespdes").value=nom;
    }else{

         window.opener.document.location="../ges_especialidades?busq=B&pri=T&cod="+valor;
    }

     window.close();

}

function editar_prest(){

    document.getElementById('accion').value="2";

    document.getElementById('txtnom').disabled=false;
    document.getElementById('txtdir').disabled=false;
    document.getElementById('txtmail').disabled=false;
    document.getElementById('txttel').disabled=false;
    document.getElementById('txtcel').disabled=false;
    document.getElementById('txtreg').disabled=false;
    document.getElementById('txtcodesp').disabled=false;

    document.getElementById('txttserv').disabled=false;
    document.getElementById('txtinstr').disabled=false;
    document.getElementById('activo').checked=true;
    document.getElementById('cit').checked=true;
    document.getElementById('acami').checked=true;

    if(document.getElementById('gusu').checked==true){
    document.getElementById('txtcontranue').disabled=false;
    document.getElementById('txtcontranue1').disabled=false;
    document.getElementById('selecperfil').disabled=false;
     document.getElementById('txtlogin').disabled=false;
    }


    document.getElementById('gusu').disabled=false;

document.getElementById('btn_especia').setAttribute("href", "javascript:javascript:most_especia();");

    document.getElementById('btn_area').disabled=false;
    document.getElementById('btn_proc').disabled=false;
    document.getElementById('btn_area').setAttribute("style", "color:black;padding:3px 30px 3px 30px;  margin: 0px 4px 4px 0px;");
    document.getElementById('btn_proc').setAttribute("style", "color:black;padding:3px 30px 3px 30px;  margin: 0px 4px 4px 0px;");
      document.getElementById('btn_rest').disabled=false;
    document.getElementById('btn_rest').setAttribute("style", "color:black;padding:3px 30px 3px 30px; font-size:12px  margin: 0px 4px 4px 0px;");


    document.getElementById('btn_nuevo').setAttribute("style", "display:none");
    document.getElementById('btn_delete').setAttribute("style", "display:none");
    document.getElementById('btn_editar').setAttribute("style", "display:none");
    document.getElementById('btn_buscar').setAttribute("style", "display:none");
    document.getElementById('btn_guardar').setAttribute("style", "display:block");

    document.getElementById('txtnom').focus();

}

function buscar_prest(){

    window.open("../most_prest?programa=admin&ori=admin","ventana_prestadores","width=900, height=580, scrollbars=no, menubar=no, location=no, resizable=no");

}

function Busqueda_prest2(){

    tip_bus=document.getElementById("t_bus_prest").value;
    busq=  document.getElementById("busqueda_prest").value;
    ajax = ObjetoAjax();
    ajax.open("POST", "../mostrar_prestadores", true);

    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&control=2&programa=admin");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
         document.getElementById('td_tabla2').innerHTML = ajax.responseText
       }
    }
}

function Busqueda_prest(or){
      if(or=="rest"){
    tip_bus=document.getElementById("t_bus_prest").value;
    busq=  document.getElementById("busqueda_prest").value;
           ori=  "";
      }else{
    tip_bus=document.getElementById("t_bus").value;
    busq=  document.getElementById("busqueda").value;
    ori=  document.getElementById("ori").value;

      }
    ajax = ObjetoAjax();
    if(ori=="urge1"){
       ajax.open("POST", "../sel_presturge", true);
    }else{
        ajax.open("POST", "../most_prest", true);
    }

    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&control=2&programa=admin");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            if(or=="rest"){
                document.getElementById('td_tabla2').innerHTML = ajax.responseText
            }else{
                document.getElementById('td_tabla').innerHTML = ajax.responseText
            }

        }
    }
}

function sel_prest(){

 ori=document.getElementById("ori").value;
   var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    pvalor=valor.split("--");

if(ori=="urge1"){
    opener.document.getElementById("txtpres").value=pvalor[1];
    opener.document.getElementById("txtusuario").value=pvalor[0];
}else{
   window.opener.document.location="../ges_prestadores?busq=B&pri=T&cod="+pvalor[0];
}
     self.close();


}

function nuevo_presExt(){

  document.getElementById('accion').value="1";
  document.getElementById('txtident').value="";
  document.getElementById('txtcod').value="";
  document.getElementById('txtnom').value="";
  document.getElementById('txtdir').value="";
  document.getElementById('txttel').value="";
  document.getElementById('txtemp').value="";
  document.getElementById('txtciud').value="";
  document.getElementById('observa').value="";

  document.getElementById('txtcod').disabled=false;
  document.getElementById('txtident').disabled=false;
  document.getElementById('txtcod').disabled=false
  document.getElementById('txtnom').disabled=false
  document.getElementById('txtdir').disabled=false
  document.getElementById('txttel').disabled=false
  document.getElementById('txtciud').disabled=false
  document.getElementById('observa').disabled=false

  document.getElementById('btn_nuevo').setAttribute("style", "display:none");
  document.getElementById('btn_delete').setAttribute("style", "display:none");
  document.getElementById('btn_editar').setAttribute("style", "display:none");
  document.getElementById('btn_buscar').setAttribute("style", "display:none");
  document.getElementById('btn_guardar').setAttribute("style", "display:block");

  document.getElementById('txtident').focus();

}

function abrir_empresas(){

cargaradministradoras();
document.getElementById('buscaempresa').style.visibility = 'visible';
}


function cargaradministradoras(dest){

  ajax = ObjetoAjax();
  ajax.open("POST", "../administradoras", true);
  ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  ajax.send("dest="+dest);
  ajax.onreadystatechange=function() {
  if (ajax.readyState==4) {
      document.getElementById('td_admin').innerHTML = ajax.responseText
   }
  }
}

function sel_administradora(){

    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }

   document.getElementById("txtemp").value=valor;
    Cerrarpopu('buscaempresa');

}

function Busqueda_Adm(){

    tip_bus=document.getElementById("t_bus").value;
    busq=  document.getElementById("busqueda").value;
    ajax = ObjetoAjax();
    ajax.open("POST", "../administradoras", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&control=2");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_tabla').innerHTML = ajax.responseText
        }
    }
}

function Busqueda_prestext(){

    tip_bus=document.getElementById("t_busprest").value;
    busq=  document.getElementById("busquedaprest").value;
    ajax = ObjetoAjax();
    ajax.open("POST", "../most_prestExter", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&control=2");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_tabla').innerHTML = ajax.responseText
        }
    }
}



function guardar_presExt(){

  txtident=document.getElementById('txtident').value;
  txtcod=document.getElementById('txtcod').value;
  txtnom=document.getElementById('txtnom').value;
  txtdir=document.getElementById('txtdir').value;
  txttel=document.getElementById('txttel').value;
  txtemp=document.getElementById('txtemp').value;
  txtciud=document.getElementById('txtciud').value;
  observa=document.getElementById('observa').value;

  acc=document.getElementById("accion").value;

   if(txtident==""){
      alert("Digite una Identificacion");
      document.getElementById("txtident").focus();
   }else if(txtnom==""){
       alert("Digite El nombre");
      document.getElementById("txtnom").focus();
   }else{
       var variables="txtident=" + txtident + "&txtcod=" + txtcod + "&txtnom=" + txtnom
        + "&txtdir=" + txtdir + "&txttel=" + txttel + "&txtemp=" + txtemp + "&txtciud="
        + txtciud + "&observa=" + observa + "&acc=" + acc;

        guardar('../guardar_prestExter',variables,'prestadoresExter');

   }

}

function editar_presExt(){
  txtcod=document.getElementById('txtcod').value;

  if(txtcod!=""){

  document.getElementById('accion').value="2";
  document.getElementById('txtcod').disabled=false;
//  document.getElementById('txtident').disabled=false;
  document.getElementById('txtcod').disabled=false
  document.getElementById('txtnom').disabled=false
  document.getElementById('txtdir').disabled=false
  document.getElementById('txttel').disabled=false
  document.getElementById('txtciud').disabled=false
  document.getElementById('observa').disabled=false

  document.getElementById('btn_nuevo').setAttribute("style", "display:none");
  document.getElementById('btn_delete').setAttribute("style", "display:none");
  document.getElementById('btn_editar').setAttribute("style", "display:none");
  document.getElementById('btn_buscar').setAttribute("style", "display:none");
  document.getElementById('btn_guardar').setAttribute("style", "display:block");

  document.getElementById('txtident').focus();
    }else{

       alert("No Existe Registro para Editar");
    }
}

function buscar_presExt(){
cargarprestexter();
document.getElementById('buscaprestadores').style.visibility = 'visible';

}

function cargarprestexter(){

  ajax = ObjetoAjax();
  ajax.open("POST", "../most_prestExter", true);
  ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  ajax.send("dest=1");
  ajax.onreadystatechange=function() {
  if (ajax.readyState==4) {
      document.getElementById('td_tabla').innerHTML = ajax.responseText
   }
  }
}

function sel_prestExterno(){

    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }

   document.location="../ges_prestadoresExternos?busq=B&pri=T&cod="+valor;
     Cerrarpopu('buscaprestadores');

}

function fact_planes(codigo,desc,fact,contra,lit){

    var cont = document.getElementById("cont");
    var filas = document.getElementById("filas");
    cont.setAttribute("value", parseInt(cont.value,0)+1);
    var tabla = document.getElementById("contenido").tBodies[0];
    var fila = document.createElement("TR");
    fila.setAttribute("align","center");

    var celda2 = document.createElement("TD");
    var cod = document.createElement("INPUT");
    cod.setAttribute("type","text");
    cod.setAttribute("size","23");
    cod.setAttribute('style','font-size:7pt;' )
    cod.setAttribute("title","Doble Click para seleccionar producto");
    cod.setAttribute("maxlength","18");
    cod.setAttribute("disabled","disabled");
    cod.setAttribute("value", codigo);
    cod.setAttribute("name","cod");
    cod.setAttribute("id","cod" + cont.value);
    celda2.appendChild(cod);

    var celda3 = document.createElement("TD");
    var desp = document.createElement("INPUT");
    desp.setAttribute("type","text");
    desp.setAttribute("size","100");
    desp.setAttribute("maxlength","100");
    desp.setAttribute("disabled","disabled");
    desp.setAttribute('style','font-size:7pt;' )
    desp.setAttribute("value", desc);
    desp.setAttribute("name","desp");
    desp.setAttribute("id","desp" + cont.value);
    celda3.appendChild(desp);

    var celda4 = document.createElement("TD");
    var sel_fact = document.createElement("SELECT");
    sel_fact.setAttribute("onchange","selfact('"+cont.value+"')");
    sel_fact.setAttribute("name","sel_fact");
//    sel_fact.setAttribute("onfocus","seltipo(this.id)");
    sel_fact.setAttribute('style','font-size:7pt;');
    sel_fact.setAttribute("width","50px");
    sel_fact.setAttribute("id","sel_fact" + cont.value);

    if(fact=="A"){
        sel_fact.innerHTML="<option value=''></option><option selected value='A'>Agrupada</option><option value='I'>Individual</option>";
    }else if(fact=="I"){
         sel_fact.innerHTML="<option value=''></option><option value='A'>Agrupada</option><option selected value='I'>Individual</option>";
    }else{
        sel_fact.innerHTML="<option value=''></option><option value='A'>Agrupada</option><option value='I'>Individual</option>";
    }


    celda4.appendChild(sel_fact);

    var celda5 = document.createElement("TD");
    var sel_cont = document.createElement("SELECT");
    sel_cont.setAttribute("onchange","selfact('"+cont.value+"')");
    sel_cont.setAttribute("name","sel_cont");
    sel_cont.setAttribute("width","50px");
//    sel_cont.setAttribute("onfocus","seltipo(this.id)");
    sel_cont.setAttribute('style','font-size:7pt;' )
    sel_cont.setAttribute("id","sel_cont" + cont.value);
    if(contra=="C"){
        sel_cont.innerHTML="<option value=''></option><option selected value='C'>Capacitacion</option><option value='E'>Evento</option>";
    }else if(contra=="E"){
       sel_cont.innerHTML="<option value=''></option><option value='C'>Capacitacion</option><option selected value='E'>Evento</option>";
    }else{
        sel_cont.innerHTML="<option value=''></option><option value='C'>Capacitacion</option><option  value='E'>Evento</option>";
    }

    celda5.appendChild(sel_cont);


    var celda6 = document.createElement("TD");
    var l_prec = document.createElement("INPUT");
    l_prec.setAttribute("type","text");
    l_prec.setAttribute("size","23");

    l_prec.setAttribute('style','font-size:7pt;' )
    l_prec.setAttribute("value", lit);
    l_prec.setAttribute("name","l_prec");
    l_prec.setAttribute("id","l_prec" + cont.value);
    l_prec.onfocus=function(){
        busc_listPrec(this.id);
    }
    celda6.appendChild(l_prec);

    var celda11 = document.createElement('TD');
    var boton = document.createElement('INPUT');
    boton.setAttribute('type','button');
    boton.setAttribute('value','X');
    boton.setAttribute('id','boton1' + cont.value);
    boton.setAttribute('name','boton1');
    boton.setAttribute('title','Quitar de la lista');
    boton.setAttribute('style','font-size:7pt; padding:2px 2px 2px 2px; margin; margin: 0px 4px 4px 0px;');
    boton.onclick=function(){
        borrarFila(this, this.id);
    }
    celda11.appendChild(boton);

    //fila.appendChild(celda1);
    fila.appendChild(celda2);
    fila.appendChild(celda3);
    fila.appendChild(celda4);
    fila.appendChild(celda5);
    fila.appendChild(celda6);
    fila.appendChild(celda11);
    tabla.appendChild(fila);

}

function busc_listPrec(id){

    if(document.getElementById(id).value==""){
        window.open("../most_listPrecio?id="+id,"ventana_listPrecio2","width=700, height=580, scrollbars=no, menubar=no, location=no, resizable=no");
    }

}

function Add_factPlan(){

   var control="1"
    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    var par_med=valor.split(";;");

    var num_elementos2 = document.getElementsByName("boton1").length;
    if(num_elementos2>0){
        for( var contador2=0; contador2 < num_elementos2; contador2++ ){			//
           cod =document.getElementsByName("cod")[contador2].value;
            if(cod==par_med[0]){
                control="0";
            }
        }
    }

    if(control=="1"){
       fact_planes(par_med[0],par_med[1],'','','')
    }else{
        alert("Este Plan ya ha Sido Agregado.");
    }

}

function selfact(cont){

    sel_fact=document.getElementById("sel_fact"+cont).value;
    sel_cont=document.getElementById("sel_cont"+cont).value;

    if(sel_fact!="A"){
        if(sel_cont=="C"){
            alert("El Modo de Contrataci\u00f3n para Facturaci\u00f3n Individual es por Evento");
            document.getElementById('sel_cont'+cont).selectedIndex=0;
        }
    }
}

function nuevo_medicam(){

  document.getElementById('accion').value="1";
  document.getElementById('txtcod').value="";
  document.getElementById('txtdesc').value="";
  document.getElementById('txtdescCom').value="";
  document.getElementById('concentr').value="";
  document.getElementById('txtform').value="";
  document.getElementById('txtumedi').value="";
  document.getElementById('pos').checked=false;
  document.getElementById('insumo').checked=false;

  document.getElementById('txtcod').disabled=false;
  document.getElementById('txtdesc').disabled=false;
  document.getElementById('txtdescCom').disabled=false;
  document.getElementById('concentr').disabled=false;
  document.getElementById('txtform').disabled=false;
  document.getElementById('txtumedi').disabled=false;
  document.getElementById('pos').disabled=false;
  document.getElementById('insumo').disabled=false;

  document.getElementById('btn_nuevo').setAttribute("style", "display:none");
  document.getElementById('btn_delete').setAttribute("style", "display:none");
  document.getElementById('btn_editar').setAttribute("style", "display:none");
  document.getElementById('btn_buscar').setAttribute("style", "display:none");
  document.getElementById('btn_guardar').setAttribute("style", "display:block");

  document.getElementById('txtident').focus();

}

function guardar_medicam(){

  acc= document.getElementById('accion').value;
  txtcod=document.getElementById('txtcod').value;
  txtdesc=document.getElementById('txtdesc').value.replace("%","ooo");
  txtdescCom=document.getElementById('txtdescCom').value.replace("%","ooo");
  concentr=document.getElementById('concentr').value;
  txtform=document.getElementById('txtform').value.replace("%","ooo");
  txtumedi=document.getElementById('txtumedi').value;

  var pos="";
  if(document.getElementById('pos').checked==true){
      pos="s";
  }else{
      pos="n";
  }

  var insumo="";
  if(document.getElementById('insumo').checked==true){
      insumo="s";
  }else{
      insumo="n";
  }

  if(txtcod==""){
      alert("Digite el C\u00f3digo del Medicamento");
      document.getElementById("txtcod").focus();
  }else if(txtdesc==""){
      alert("Digite la Descripci\u00f3n del Medicamento");
      document.getElementById("txtdesc").focus();
  }else{
      var variables="txtcod=" + txtcod + "&txtdesc=" + txtdesc + "&txtdescCom=" + txtdescCom
        + "&concentr=" + concentr + "&txtform=" + txtform + "&txtumedi=" + txtumedi + "&pos="
        + pos + "&insumo=" + insumo + "&acc=" + acc;
//    alert(variables);
        guardar('../guardar_medicamentos',variables,'medicamentos');

  }

}


function editar_medicam(){
//
txtcod=document.getElementById('txtcod').value;

if(txtcod==""){
       alert("No existe Ningun Registro Para Editar");
}else{
    document.getElementById('accion').value="2";
  document.getElementById('txtdesc').disabled=false;
  document.getElementById('txtdescCom').disabled=false;
  document.getElementById('concentr').disabled=false;
  document.getElementById('txtform').disabled=false;
  document.getElementById('txtumedi').disabled=false;
  document.getElementById('pos').disabled=false;
  document.getElementById('insumo').disabled=false;

    document.getElementById('btn_nuevo').setAttribute("style", "display:none");
  document.getElementById('btn_delete').setAttribute("style", "display:none");
  document.getElementById('btn_editar').setAttribute("style", "display:none");
  document.getElementById('btn_buscar').setAttribute("style", "display:none");
  document.getElementById('btn_guardar').setAttribute("style", "display:block");

  document.getElementById('txtdesc').focus();
}


}

function delete_medicam(){

    if (confirm("\xbfEsta seguro de realizar la operaci\xf3n?")){
    var txtcod=document.getElementById("txtcod").value;
    ajax=ObjetoAjax();
    ajax.open("POST", "../guardar_medicamentos", true);
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("txtcod="+txtcod+"&acc=3");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            if(trimAll(ajax.responseText) =="bien"){
                 alert("Operaci\u00f3n Realizada Exitosamente");
                 document.location = "../ges_medicamentos";
            }
        }
    }
  }
}

function buscar_medicam(){

 window.open("../most_medicamentos","ventana_medicamentos","width=900, height=580, scrollbars=no, menubar=no, location=no, resizable=no");

}

function sel_medicamento(){

    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    window.opener.document.location="../ges_medicamentos?busq=B&pri=T&cod="+valor;
    self.close();

}

function Busqueda_medicamento(){

    tip_bus=document.getElementById("t_bus").value;
    busq=  document.getElementById("busqueda").value;
    ajax = ObjetoAjax();
    ajax.open("POST", "../most_medicamentos", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&control=2");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_Medicamentos').innerHTML = ajax.responseText

        }
    }

}

function nueva_listPrec(){

  document.getElementById('accion').value="1";
  document.getElementById('txtcod').value="";
  document.getElementById('txtnom').value="";
  document.getElementById('observa').value="";
  document.getElementById('fvigencia').value="";
  document.getElementById('checkfvigencia').checked=false;

  document.getElementById('txtcod').disabled=false;
  document.getElementById('txtnom').disabled=false;
  document.getElementById('observa').disabled=false;
  document.getElementById('fvigencia').disabled=true;
  document.getElementById('checkfvigencia').disabled=false;
  document.getElementById('btn_ver').disabled=false;
  document.getElementById('btn_asig').disabled=false;


  document.getElementById('btn_ver').setAttribute("style", "color:black;padding:3px 20px 3px 20px;  margin: 0px 4px 4px 0px;");
  document.getElementById('btn_asig').setAttribute("style", "color:black;padding:3px 20px 3px 20px;  margin: 0px 4px 4px 0px;");

  document.getElementById('btn_nuevo').setAttribute("style", "display:none");
  document.getElementById('btn_delete').setAttribute("style", "display:none");
  document.getElementById('btn_editar').setAttribute("style", "display:none");
  document.getElementById('btn_buscar').setAttribute("style", "display:none");
  document.getElementById('btn_guardar').setAttribute("style", "display:block");

  document.getElementById('txtcod').focus();

}


function guardar_listPrec(){

  acc=document.getElementById('accion').value;
  txtcod=document.getElementById('txtcod').value;
  txtnom=document.getElementById('txtnom').value;
  observa=document.getElementById('observa').value;
  fvigencia=document.getElementById('fvigencia').value;
  fvigenc=document.getElementById('fvigencia').value;

  if(txtcod==""){
      alert("Digite el C\u00f3digo de la Lista de Precio");
      document.getElementById("txtcod").focus();
    }else if(txtnom==""){
      alert("Digite el Nombre de la Lista de Precio");
      document.getElementById("txtnom").focus();
    }else{
        var variables="txtcod=" + txtcod + "&txtnom=" + txtnom + "&observa=" + observa
        + "&fvigenc=" + fvigenc + "&acc=" + acc;

        guardar('../guardar_listPrecios',variables,'listPrecios');

    }
}

function editar_listPrec(){

   document.getElementById('accion').value="2";
  document.getElementById('txtcod').disabled=false;
  document.getElementById('txtnom').disabled=false;
  document.getElementById('observa').disabled=false;
  document.getElementById('fvigencia').disabled=false;
  document.getElementById('checkfvigencia').disabled=false;
  document.getElementById('btn_ver').disabled=false;
  document.getElementById('btn_asig').disabled=false;
    document.getElementById('btn_ver').setAttribute("style", "color:black;padding:3px 20px 3px 20px;  margin: 0px 4px 4px 0px;");
  document.getElementById('btn_asig').setAttribute("style", "color:black;padding:3px 20px 3px 20px;  margin: 0px 4px 4px 0px;");

   document.getElementById('btn_nuevo').setAttribute("style", "display:none");
  document.getElementById('btn_delete').setAttribute("style", "display:none");
  document.getElementById('btn_editar').setAttribute("style", "display:none");
  document.getElementById('btn_buscar').setAttribute("style", "display:none");
  document.getElementById('btn_guardar').setAttribute("style", "display:block");

  document.getElementById('txtnom').focus();

}

function habfecvig(){

    if(document.getElementById('checkfvigencia').checked==true){
        document.getElementById('fvigencia').disabled=false;
    }else{
        document.getElementById('fvigencia').disabled=true;
        document.getElementById('fvigencia').value="";
    }

}

function delete_listPrec(){

 if (confirm("\xbfEsta seguro de realizar la operaci\xf3n?")){
    var txtcod=document.getElementById("txtcod").value;
    ajax=ObjetoAjax();
    ajax.open("POST", "../guardar_listPrecios", true);
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("txtcod="+txtcod+"&acc=3");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            if(trimAll(ajax.responseText) =="bien"){
                 alert("Operaci\u00f3n Realizada Exitosamente");
                 document.location = "../ges_listaPrecios";
            }
        }
    }
  }

}


function buscar_listPrec(){
 window.open("../most_listPrecio","ventana_listPrecio","width=700, height=580, scrollbars=no, menubar=no, location=no, resizable=no");
}

function Busqueda_listPrec(){

    tip_bus=document.getElementById("t_busMed").value;
    busq=  document.getElementById("busquedaMed").value;

    ajax = ObjetoAjax();
    ajax.open("POST", "../most_listPrecios", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&control=2");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_Medicamentos').innerHTML = ajax.responseText
        }
    }

}

function sel_listPrec(){

    id=document.getElementById("ide").value;
    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    if(id==""){
      window.opener.document.location="../ges_listaPrecios?busq=B&pri=T&cod="+valor;
    }else{

    opener.document.getElementById(id).value=valor
    }
    self.close();

}

function asig_prod(){

   tit = document.getElementById('txtcod').value +" // "+document.getElementById('txtnom').value;
   if(document.getElementById('txtcod').value==""){
       alert("Debe Digitar un C\u00f3digo");
   }else{
     window.open("../asig_medListPrec?tit="+tit,"asig_medListPrec","width=900, height=750, scrollbars=yes, menubar=no, location=no, resizable=no");
   }

}


function precMedicamento(cod_m,desc,valor){

    var cont = document.getElementById("cont");
    var filas = document.getElementById("filas");
    cont.setAttribute("value", parseInt(cont.value,0)+1);
    var tabla = document.getElementById("contenido").tBodies[0];
    var fila = document.createElement("TR");
    fila.setAttribute("align","center");

    var celda2 = document.createElement("TD");
    var cod = document.createElement("INPUT");
    cod.setAttribute("type","text");
    cod.setAttribute("size","16");
    cod.setAttribute('style','font-size:7pt;' )
    cod.setAttribute("title","Doble Click para seleccionar producto");
    cod.setAttribute("maxlength","18");
    cod.setAttribute("disabled","disabled");
    cod.setAttribute("value", cod_m);
    cod.setAttribute("name","cod");
    cod.setAttribute("id","cod" + cont.value);
    celda2.appendChild(cod);

    var celda3 = document.createElement("TD");
    var des = document.createElement("INPUT");
    des.setAttribute("type","text");
    des.setAttribute("size","87");
    des.setAttribute("maxlength","80");
    des.setAttribute("disabled","disabled");
    des.setAttribute('style','font-size:7pt;' )
    des.setAttribute("value", desc);
    des.setAttribute("name","des_are");
    des.setAttribute("id","des_are" + cont.value);
    celda3.appendChild(des);

    var celda4 = document.createElement("TD");
    var val = document.createElement("INPUT");
    val.setAttribute("type","text");
    val.setAttribute("size","20");
    val.setAttribute('style','font-size:7pt;text-align:right;' )
    val.setAttribute("value",valor);
    val.setAttribute("maxlength","11");
    val.setAttribute("id","val" + cont.value);
    val.setAttribute("name","val");
    val.setAttribute("onfocus","this.select()");
    val.setAttribute("onclick","this.select()");
    val.setAttribute("onkeyup","validartcoma(event, this.id)");
//    onkeyup='validartcoma(event, this.id);'

    val.onchange=function(){
        textm(this.value,this.id);
    }
    celda4.appendChild(val);



    var celda11 = document.createElement('TD');
    var boton = document.createElement('INPUT');
    boton.setAttribute('type','button');
    boton.setAttribute('value','X');
    boton.setAttribute('id','boton1' + cont.value);
    boton.setAttribute('name','boton1');
    boton.setAttribute('title','Quitar de la lista');
    boton.setAttribute('style','font-size:7pt; padding:2px 2px 2px 2px; margin; margin: 0px 4px 4px 0px;' )
    boton.onclick=function(){
        borrarFila(this, this.id);
    }
    celda11.appendChild(boton);

    //fila.appendChild(celda1);
    fila.appendChild(celda2);
    fila.appendChild(celda3);
    fila.appendChild(celda4);
    fila.appendChild(celda11);
    tabla.appendChild(fila);

}


function Add_Med(){

    var control="1"
    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    var par_med=valor.split(";;");

    var num_elementos2 = document.getElementsByName("boton1").length;
    if(num_elementos2>0){
        for( var contador2=0; contador2 < num_elementos2; contador2++ ){			//
           cod =document.getElementsByName("cod")[contador2].value;
            if(cod==par_med[0]){
                control="0";
            }
        }
    }

    if(control=="1"){
       precMedicamento(par_med[0],par_med[1],'0,00')
    }else{
        alert("Este Medicamento ya ha Sido Agregado.");
    }

}

function Add_todosMed(){

   var num_elementos = document.getElementsByName("seleccion").length;
   for( var contador=0; contador < num_elementos; contador++ ){			//
        var valor = document.getElementsByName("seleccion")[contador].value;
        var par_med=valor.split(";;");
         var control="1"
        //
        var num_elementos2 = document.getElementsByName("boton1").length;
        if(num_elementos2>0){
            for( var contador2=0; contador2 < num_elementos2; contador2++ ){			//
                cod =document.getElementsByName("cod")[contador2].value;
                if(cod==par_med[0]){
                    control="0";
                }
            }
        }
        //
        if(control=="1"){
            precMedicamento(par_med[0],par_med[1],'0,00')
        }
    }
}

function Busqueda_MedAsig(){

    tip_bus=document.getElementById("t_bus").value;
    busq=  document.getElementById("busqueda").value;
    ajax = ObjetoAjax();
    ajax.open("POST", "../asig_medListPrec", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&control=2");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_tabla').innerHTML = ajax.responseText
        }
    }

}

function Dell_Med(){
  document.getElementById('contenido').innerHTML = "<tr align='center'>"
                                         +"<td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 10px; ' > C&Oacute;DIGO</span> </td>"
                                         +"<td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 10px; '> NOMBRE</span> </td>"
                                         +"<td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 10px; '> VALOR</span> </td>"
                                         +"<td>&nbsp;</td>"
                                     +"</tr>";
  }

  function Ajustar(){

      ajus=eval(document.getElementById("txtvalaju").value.replace(".","").replace(".","").replace(",", "."));

    if(ajus==""){
        alert("Digite el Ajuste");
    }else if(document.getElementById("val1")==null){
        alert("Agregue los Medicamentos para Ajustar");
    }else{

       var num_elementos2 = document.getElementsByName("boton1").length;
        for(var contador2=0; contador2 < num_elementos2; contador2++ ){			//
            valor =eval(document.getElementsByName("val")[contador2].value.replace(".","").replace(".","").replace(",", "."));
           if(document.getElementById("porcent").checked==true){
              total=valor*(1+(ajus/100));
              total=redondeoDecimales(total);

              rta=eval(total.toFixed(2));

                res=rta.toString().split('.');
                if(res[1]== undefined) {
                    res[1]='00';
                }
                if(res[1].length<2) {
                    res[1]=res[1]+'0';
                }

                document.getElementsByName("val")[contador2].value = moneda(res[0])+","+res[1];

           }else{
                total=valor+ajus;
                total=redondeoDecimales(total);
                rta=eval(total.toFixed(2));

                res=rta.toString().split('.');
                if(res[1]== undefined) {
                    res[1]='00';
                }
                if(res[1].length<2) {
                    res[1]=res[1]+'0';
                }

                document.getElementsByName("val")[contador2].value = moneda(res[0])+","+res[1];
            }

       }
    }

  }

function guar_ListMed(){
    var control="1";
    cod_lis=opener.document.getElementById("txtcod").value
     acc=opener.document.getElementById('accion').value;
    if(document.getElementById("val1")==null){
        alert("No Existen Planes Agregados a la Lista... Verifique");
    }else{
        var num_elementos2 = document.getElementsByName("boton1").length;
        var pmedi="";
        for(var contador2=0; contador2 < num_elementos2; contador2++ ){
            cod=document.getElementsByName("cod")[contador2].value;
            val=document.getElementsByName("val")[contador2].value.replace(".","").replace(".","").replace(",", ".");
            if(val==""){
                control="0";
            }else{
                pmedi += cod + "#" + val + ";";
            }
        }

         var variables="cod_lis=" + cod_lis + "&pmedi=" + pmedi + "&acc=" + acc;

        guardar('../guardar_precMedic',variables,'precMedic');

    }
}

function asigPreMed(){
    preMedi=document.getElementById("pmedi").value

    if(preMedi!=""){
        var pmedica=preMedi.split(";");
        tam=pmedica.length;
        for(var r = 0; r < tam-1; r++) {
            pmed = pmedica[r].split("#");
            precMedicamento(pmed[0],pmed[1],pmed[2]);
        }
    }
}

function ver_prod1(){
    if(document.getElementById('txtcod').value!=""){
        tit = document.getElementById('txtcod').value +"//"+document.getElementById('txtnom').value;
        window.open("../ver_PrecMedic?tit="+tit,"PrecMedic","width=800, height=550, scrollbars=yes, menubar=no, location=no, resizable=no");
    }
}

function Busqueda_precMedi(){
    tip_bus=document.getElementById("t_bus").value;
    busq=  document.getElementById("busqueda").value;
    tit = opener.document.getElementById('txtcod').value +"//"+opener.document.getElementById('txtnom').value;
    ajax = ObjetoAjax();
    ajax.open("POST", "../ver_PrecMedic", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&control=2"+"&tit="+tit);
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_tabla').innerHTML = ajax.responseText
        }
    }

}

function guar_sitemaFact(){

    var control="1";

    if(document.getElementById("cod1")==null){
        alert("No Existen Medicamentos Agrgados a la Lista... Verifique");
    }else{
        var num_elementos2 = document.getElementsByName("boton1").length;
        var planmodu="";
        for(var contador2=0; contador2 < num_elementos2; contador2++ ){
            cod=document.getElementsByName("cod")[contador2].value;
            sel_fact=document.getElementsByName("sel_fact")[contador2].value;
            sel_cont=document.getElementsByName("sel_cont")[contador2].value;
            l_prec=document.getElementsByName("l_prec")[contador2].value;

            if(sel_fact==""){
                alert("Debe asociarse a un sistema de Facturaci\u00f3n! - (Individual o Agrupada)");
                control="0";
            }else if(sel_cont==""){
                alert("Debe asociarse a un modo de Contrato! - (Capacitaci\u00f3n o Evento)");
                control="0";
            }else if(l_prec==""){
                alert("Selecciones una lista de precios");
                control="0";
             }else{
                planmodu += cod + "#" + sel_fact + "#" + sel_cont + "#" + l_prec + ";";
            }
        }

        mod=document.getElementById('modulos').value;

       var variables="mod=" + mod + "&planmodu=" + planmodu;
       if(control=="1"){
        guardar('../guardar_ModuPlan',variables,'ModuPlan');
       }


    }

}

function asig_sitemaFact(){

    modPlan=document.getElementById("modPlan").value

    if(modPlan!=""){
        var pmodPlan=modPlan.split(";");

        tam=pmodPlan.length;
        for(var r = 0; r < tam-1; r++) {
            mdpln = pmodPlan[r].split("#");
            fact_planes(mdpln[0],mdpln[1],mdpln[2],mdpln[3],mdpln[4]);
        }
    }

}

function Busqueda_planModu(opc){

    tip_bus=document.getElementById("t_bus").value;
    busq=  document.getElementById("busqueda").value;
    prog=  document.getElementById("prog").value;
    ajax = ObjetoAjax();
    if(opc=="2"){
    ajax.open("POST", "../asigPlanPaci", true);
    }else{
    ajax.open("POST", "../fact_planes", true);
    }

    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&prog="+prog+"&control=2");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_tabla').innerHTML = ajax.responseText
        }
    }

}

function nuevo_ProvServ(){

    document.getElementById('accion').value="1";

    document.getElementById('txtcod').value="";
    document.getElementById('txtnom').value="";
    document.getElementById('txtnit').value="";
    document.getElementById('txtdir').value="";
    document.getElementById('txttel').value="";
    document.getElementById('txtrep').value="";
    document.getElementById('tmtarif').selectedIndex=0;
    document.getElementById('txtanio').value="";
    document.getElementById('activo').checked=true;
    document.getElementById('orsevaciones').value="";

    document.getElementById('txtcod').disabled=false;
    document.getElementById('txtnom').disabled=false;
    document.getElementById('txtnit').disabled=false;
    document.getElementById('txtdir').disabled=false;
    document.getElementById('txttel').disabled=false;
    document.getElementById('txtrep').disabled=false;
    document.getElementById('tmtarif').disabled=false;
    document.getElementById('txtanio').disabled=false;
    document.getElementById('activo').disabled=false;
    document.getElementById('orsevaciones').disabled=false;

    document.getElementById('btn_pare').disabled=false;
    document.getElementById('btn_pare').setAttribute("style", "color:black;padding:3px 30px 3px 30px;  margin: 0px 4px 4px 0px;");

    document.getElementById('btn_nuevo').setAttribute("style", "display:none");
    document.getElementById('btn_delete').setAttribute("style", "display:none");
    document.getElementById('btn_editar').setAttribute("style", "display:none");
    document.getElementById('btn_buscar').setAttribute("style", "display:none");
    document.getElementById('btn_guardar').setAttribute("style", "display:block");

    document.getElementById('txtcod').focus();

}

function guardar_ProvServ(){

    acc=document.getElementById('accion').value;
    txtcod=document.getElementById('txtcod').value;
    txtnom=document.getElementById('txtnom').value;
    txtnit=document.getElementById('txtnit').value;
    txtdir=document.getElementById('txtdir').value;
    txttel=document.getElementById('txttel').value;
    txtrep=document.getElementById('txtrep').value;
    tmtarif=document.getElementById('tmtarif').value;
    txtanio=document.getElementById('txtanio').value;
    var activo="";
    if(document.getElementById('activo').checked==true){
    activo="s";
    }else{
    activo="n";
    }
    observ=document.getElementById('orsevaciones').value;

    if(txtcod==""){
      alert("Digite el C\u00f3digo del Proveedor");
      document.getElementById("txtcod").focus();
    }else if(txtnom==""){
        alert("Digite el Nombre del Proveedor");
      document.getElementById("txtnom").focus();
    }else{

       var variables="txtcod=" + txtcod + "&txtnom=" + txtnom + "&txtnit=" + txtnit
           + "&txtdir=" + txtdir  + "&txttel=" + txttel + "&txtrep=" + txtrep
           + "&tmtarif=" + tmtarif + "&txtanio=" + txtanio + "&activo=" + activo + "&observ=" + observ + "&acc=" + acc;
       guardar('../guardar_provServ',variables,'provServ');

    }

}

function editar_ProvServ(){

    document.getElementById('accion').value="2";
//    document.getElementById('txtcod').disabled=false;
    document.getElementById('txtnom').disabled=false;
    document.getElementById('txtnit').disabled=false;
    document.getElementById('txtdir').disabled=false;
    document.getElementById('txttel').disabled=false;
    document.getElementById('txtrep').disabled=false;
    document.getElementById('tmtarif').disabled=false;
    document.getElementById('txtanio').disabled=false;
    document.getElementById('activo').disabled=false;
    document.getElementById('orsevaciones').disabled=false;

    document.getElementById('btn_pare').disabled=false;
    document.getElementById('btn_pare').setAttribute("style", "color:black;padding:3px 30px 3px 30px;  margin: 0px 4px 4px 0px;");

    document.getElementById('btn_nuevo').setAttribute("style", "display:none");
    document.getElementById('btn_delete').setAttribute("style", "display:none");
    document.getElementById('btn_editar').setAttribute("style", "display:none");
    document.getElementById('btn_buscar').setAttribute("style", "display:none");
    document.getElementById('btn_guardar').setAttribute("style", "display:block");

    document.getElementById('txtnom').focus();

}

function delete_ProvServ(){

  if (confirm("\xbfEsta seguro de realizar la operaci\xf3n?")){
    var txtcod=document.getElementById("txtcod").value;
    ajax=ObjetoAjax();
    ajax.open("POST", "../guardar_provServ", true);
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("txtcod="+txtcod+"&acc=3");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            if(trimAll(ajax.responseText) =="bien"){
                 alert("Operaci\u00f3n Realizada Exitosamente");
                 document.location = "../ges_provServ";
            }
        }
    }
  }
}

function buscar_ProvServ(){
window.open("../most_ProvServ","ventana_listPrecio","width=700, height=580, scrollbars=yes, menubar=no, location=no, resizable=no");

}

function sel_provServ(ori){

    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }
    pvalor=valor.split("//");
    if(ori=="ordeserv"){
        document.getElementById("txtprov").value=pvalor[1];
    }else{
        document.location="../ges_provServ?busq=B&pri=T&cod="+pvalor[0];
    }

    Cerrarpopu('buscaprove');
}

function Busqueda_provServ(){

  tip_bus=document.getElementById("t_bus_prov").value;
  busq=  document.getElementById("busqueda_prov").value;
  ajax = ObjetoAjax();
  ajax.open("POST", "../most_ProvServ", true);
  ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&control=2");
  ajax.onreadystatechange=function() {
  if (ajax.readyState==4) {
      document.getElementById('td_tabla2').innerHTML = ajax.responseText
   }
  }
}

function guar_AreaProvServ(){

   var porc="";
    var cod="";
    var control="1";
    var ProvA="";

    var num_elementos = document.getElementsByName("boton1").length;
    if(num_elementos!=0){
        for(contador=0; contador < num_elementos; contador++ ){			//
            porc =document.getElementsByName("porce")[contador].value;
            if(porc==""){
                control="0";
            }
        }

        if(control=="0"){
            alert("Faltan datos por llenar... Verifique.");
        }else{
            for( contador=0; contador < num_elementos; contador++ ){
                cod =document.getElementsByName("cod")[contador].value;
                porc =document.getElementsByName("porce")[contador].value.replace(".","").replace(".","").replace(",", ".");
                ProvA += cod + "#" + porc + ";";
            }

            codProv=opener.document.getElementById('txtcod').value;
            var variables="codProv=" + codProv + "&ProvA=" + ProvA;
            if(control=="1"){
                guardar('../guardar_ProvArea',variables,'ProvArea');
            }

        }
    }

}

function asigprovServ(){

    area=document.getElementById("ProvArea").value;

    if(area!="0"){
        var par_vnivel=area.split(";");
        tam=par_vnivel.length;
        for(var r = 0; r < tam-1; r++) {
            prc = par_vnivel[r].split("#");
            area_asigP(prc[0],prc[1],prc[2]);
        }
    }
}

function nueva_profesion(){

    document.getElementById('accion').value="1";

    document.getElementById('txtcod').value="";
    document.getElementById('txtdesc').value="";
    document.getElementById('observa').value="";

    document.getElementById('txtcod').disabled=false;
    document.getElementById('txtdesc').disabled=false;
    document.getElementById('observa').disabled=false;

    document.getElementById('btn_nuevo').setAttribute("style", "display:none");
    document.getElementById('btn_delete').setAttribute("style", "display:none");
    document.getElementById('btn_editar').setAttribute("style", "display:none");
    document.getElementById('btn_buscar').setAttribute("style", "display:none");
    document.getElementById('btn_guardar').setAttribute("style", "display:block");

    document.getElementById('txtcod').focus();

}

function guardar_profesion(){
    acc=document.getElementById('accion').value;
    txtcod=document.getElementById('txtcod').value;
    txtdesc=document.getElementById('txtdesc').value;
    observa=document.getElementById('observa').value;

    if(txtcod==""){
       alert("Digite el C\u00f3digo de la Profesion");
      document.getElementById("txtcod").focus();
    }else if(txtdesc==""){
          alert("Digite el Nombre de la Profesion");
      document.getElementById("txtcod").focus();
    }else{
        var variables="txtcod=" + txtcod + "&txtdesc=" + txtdesc + "&observa=" + observa + "&acc=" + acc;

        guardar('../guardar_profesiones',variables,'profesion');
    }

}

function editar_profesion(){

 document.getElementById('accion').value="2";
 document.getElementById('txtdesc').disabled=false;
 document.getElementById('observa').disabled=false;

 document.getElementById('btn_nuevo').setAttribute("style", "display:none");
 document.getElementById('btn_delete').setAttribute("style", "display:none");
 document.getElementById('btn_editar').setAttribute("style", "display:none");
 document.getElementById('btn_buscar').setAttribute("style", "display:none");
 document.getElementById('btn_guardar').setAttribute("style", "display:block");

 document.getElementById('txtdesc').focus();


}

function delete_profesion(){

  if (confirm("\xbfEsta seguro de realizar la operaci\xf3n?")){
    var txtcod=document.getElementById("txtcod").value;
    ajax=ObjetoAjax();
    ajax.open("POST", "../guardar_profesiones", true);
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("txtcod="+txtcod+"&acc=3");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            if(trimAll(ajax.responseText) =="bien"){
                 alert("Operaci\u00f3n Realizada Exitosamente");
                 document.location = "../ges_profesiones";
            }
        }
    }
  }
}

function buscar_profesion(){
window.open("../most_profesiones","ventana_profesiones","width=700, height=580, scrollbars=yes, menubar=no, location=no, resizable=no");
}

function Busqueda_profes(dest){
  tip_bus=document.getElementById("t_bus").value;
  busq=  document.getElementById("busqueda").value;
  ajax = ObjetoAjax();
  ajax.open("POST", "../profesiones", true);
  ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&control=2&dest="+dest);
  ajax.onreadystatechange=function() {
  if (ajax.readyState==4) {
      document.getElementById('td_profesiones').innerHTML = ajax.responseText
   }
  }


}

function sel_profes(){

    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }

       window.opener.document.location="../ges_profesiones?busq=B&pri=T&cod="+valor;


}

function nuevo_codDiagnostico(){

    document.getElementById('accion').value="1";

    document.getElementById('txtcod').value="";
    document.getElementById('txtdesc').value="";
    document.getElementById('observa').value="";

    document.getElementById('txtcod').disabled=false;
    document.getElementById('txtdesc').disabled=false;
    document.getElementById('observa').disabled=false;

    document.getElementById('btn_nuevo').setAttribute("style", "display:none");
    document.getElementById('btn_delete').setAttribute("style", "display:none");
    document.getElementById('btn_editar').setAttribute("style", "display:none");
    document.getElementById('btn_buscar').setAttribute("style", "display:none");
    document.getElementById('btn_guardar').setAttribute("style", "display:block");

    document.getElementById('txtcod').focus();

}

function guardar_codDiagnostico(){

    acc=document.getElementById('accion').value;
    txtcod=document.getElementById('txtcod').value;
    txtdesc=document.getElementById('txtdesc').value;
    observa=document.getElementById('observa').value;

    if(txtcod==""){
        alert("Digite el C\u00f3digo de la Clasificacion");
        document.getElementById("txtcod").focus();
    }else if(txtdesc==""){
        alert("Digite el Nombre de la Clasificacion");
        document.getElementById("txtcod").focus();
    }else{
        var variables="txtcod=" + txtcod + "&txtdesc=" + txtdesc + "&observa=" + observa + "&acc=" + acc;

        guardar('../guardar_codDiagnostico',variables,'codDiagnostico');
    }

}

function editar_codDiagnostico(){

 document.getElementById('accion').value="2";
 document.getElementById('txtdesc').disabled=false;
 document.getElementById('observa').disabled=false;

 document.getElementById('btn_nuevo').setAttribute("style", "display:none");
 document.getElementById('btn_delete').setAttribute("style", "display:none");
 document.getElementById('btn_editar').setAttribute("style", "display:none");
 document.getElementById('btn_buscar').setAttribute("style", "display:none");
 document.getElementById('btn_guardar').setAttribute("style", "display:block");

 document.getElementById('txtdesc').focus();

}

function delete_codDiagnostico(){

  if (confirm("\xbfEsta seguro de realizar la operaci\xf3n?")){

    var txtcod=document.getElementById("txtcod").value;
    ajax=ObjetoAjax();
    ajax.open("POST", "../guardar_codDiagnostico", true);
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("txtcod="+txtcod+"&acc=3");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            if(trimAll(ajax.responseText) =="bien"){
                 alert("Operaci\u00f3n Realizada Exitosamente");
                 document.location = "../ges_codDiagnostico";
            }
        }
    }
 }
}

function buscar_codDiagnosticon(){
window.open("../most_codDiagnosticon","ventana_codDiagnosticon","width=700, height=580, scrollbars=yes, menubar=no, location=no, resizable=no");
}

function Busqueda_clasDiag(){
  tip_bus=document.getElementById("t_bus").value;
  busq=  document.getElementById("busqueda").value;
  ajax = ObjetoAjax();
  ajax.open("POST", "../most_codDiagnosticon", true);
  ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&control=2");
  ajax.onreadystatechange=function() {
  if (ajax.readyState==4) {
      document.getElementById('td_tabla').innerHTML = ajax.responseText
   }
  }

}

function sel_clasDiag(){

    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    window.opener.document.location="../ges_codDiagnostico?busq=B&pri=T&cod="+valor;
    self.close();

}


function nuevo_Diagnostico(){

    document.getElementById('accion').value="1";

    document.getElementById('txtcod').value="";
    document.getElementById('txtsimb').value="";
    document.getElementById('txtnafec').value="";
    document.getElementById('desc').value="";
    document.getElementById('sexo').selectedIndex=0;
    document.getElementById('txtedinf').value="";
    document.getElementById('txtedsup').value="";
    document.getElementById('observa').value="";
    document.getElementById('clasif').selectedIndex=0;

    document.getElementById('txtcod').disabled=false;
    document.getElementById('txtsimb').disabled=false;
    document.getElementById('txtnafec').disabled=false;
    document.getElementById('desc').disabled=false;
    document.getElementById('sexo').disabled=false;
    document.getElementById('txtedinf').disabled=false;
    document.getElementById('txtedsup').disabled=false;
    document.getElementById('observa').disabled=false;
    document.getElementById('clasif').disabled=false;

    document.getElementById('btn_aso').disabled=false;
    document.getElementById('btn_aso').setAttribute("style", "color:black;padding:3px 30px 3px 30px;  margin: 0px 4px 4px 0px;");

    document.getElementById('btn_nuevo').setAttribute("style", "display:none");
    document.getElementById('btn_delete').setAttribute("style", "display:none");
    document.getElementById('btn_editar').setAttribute("style", "display:none");
    document.getElementById('btn_buscar').setAttribute("style", "display:none");
    document.getElementById('btn_guardar').setAttribute("style", "display:block");

    document.getElementById('txtcod').focus();
}

function guardar_Diagnostico(){
    var variables="";
    acc=document.getElementById('accion').value;

    txtcod=document.getElementById('txtcod').value;
    txtsimb=document.getElementById('txtsimb').value;
    txtnafec=document.getElementById('txtnafec').value;
    desc=document.getElementById('desc').value;
    sexo=document.getElementById('sexo').value;
    txtedinf=document.getElementById('txtedinf').value;
    txtedsup=document.getElementById('txtedsup').value;
    observa=document.getElementById('observa').value;
    clasif=document.getElementById('clasif').value;
    proc=document.getElementById('proc').value;

    if(txtcod==""){
        alert("Digite el C\u00f3digo del Diagnostico");
        document.getElementById("txtcod").focus();
    }else if(desc==""){
        alert("Digite la Descripci\u00f3n del Diagnostico");
        document.getElementById("desc").focus();
    }else if(clasif==""){
          alert("Seleccione la Clasificaci\u00f3n del Diagnostico");
        document.getElementById("clasif").focus();
    }else{
        if(proc=="0"){
             if (confirm("Este Diagnostico no se ha Asociado a ningun procedimiento, Esta seguro de realizar la operaci\xf3n?")){
              variables="txtcod=" + txtcod + "&txtsimb=" + txtsimb + "&txtnafec=" + txtnafec
            + "&desc=" + desc + "&sexo=" + sexo  + "&txtedinf=" + txtedinf
            + "&txtedsup=" + txtedsup + "&observa=" + observa + "&clasif=" + clasif + "&acc=" + acc + "&proc=" + proc;

        guardar('../guardar_Diagnostico',variables,'Diagnostico');
             }else{
                 variables="txtcod=" + txtcod + "&txtsimb=" + txtsimb + "&txtnafec=" + txtnafec
            + "&desc=" + desc + "&sexo=" + sexo  + "&txtedinf=" + txtedinf
            + "&txtedsup=" + txtedsup + "&observa=" + observa + "&clasif=" + clasif + "&acc=" + acc + "&proc=" + proc;
           guardar('../guardar_Diagnostico',variables,'Diagnostico');
             }
         }else{
            variables="txtcod=" + txtcod + "&txtsimb=" + txtsimb + "&txtnafec=" + txtnafec
            + "&desc=" + desc + "&sexo=" + sexo  + "&txtedinf=" + txtedinf
            + "&txtedsup=" + txtedsup + "&observa=" + observa + "&clasif=" + clasif + "&acc=" + acc + "&proc=" + proc;
           guardar('../guardar_Diagnostico',variables,'Diagnostico');
         }

    }

}

function editar_Diagnostico(){

    document.getElementById('accion').value="2";

    document.getElementById('txtcod').disabled=false;
    document.getElementById('txtsimb').disabled=false;
    document.getElementById('txtnafec').disabled=false;
    document.getElementById('desc').disabled=false;
    document.getElementById('sexo').disabled=false;
    document.getElementById('txtedinf').disabled=false;
    document.getElementById('txtedsup').disabled=false;
    document.getElementById('observa').disabled=false;
    document.getElementById('clasif').disabled=false;

    document.getElementById('btn_nuevo').setAttribute("style", "display:none");
    document.getElementById('btn_delete').setAttribute("style", "display:none");
    document.getElementById('btn_editar').setAttribute("style", "display:none");
    document.getElementById('btn_buscar').setAttribute("style", "display:none");
    document.getElementById('btn_guardar').setAttribute("style", "display:block");

    document.getElementById('btn_aso').disabled=false;
    document.getElementById('btn_aso').setAttribute("style", "color:black;padding:3px 30px 3px 30px;  margin: 0px 4px 4px 0px;");


    document.getElementById('txtsimb').focus();

}

function delete_Diagnostico(){

  if (confirm("\xbfEsta seguro de realizar la operaci\xf3n?")){
    var txtcod=document.getElementById("txtcod").value;
    ajax=ObjetoAjax();
    ajax.open("POST", "../guardar_Diagnostico", true);
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("txtcod="+txtcod+"&acc=3");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            if(trimAll(ajax.responseText) =="bien"){
                 alert("Operaci\u00f3n Realizada Exitosamente");
                 document.location = "../ges_Diagnostico";
            }
        }
    }
 }

}

function buscar_Diagnosticon(ori,id){

 window.open("../most_Diagnostico?ori="+ori+"&id="+id,"ventana_Diagnosticon","width=900, height=580, scrollbars=yes, menubar=no, location=no, resizable=no");
}

function Busqueda_Diag(){

    tip_bus=document.getElementById("t_bus").value;
    busq=  document.getElementById("busqueda").value;
    prog=  document.getElementById("progra").value;
    ori=  document.getElementById("ori").value;

    ajax = ObjetoAjax();
    ajax.open("POST", "../most_Diagnostico", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&programa="+prog+"&tcon=3&ori="+ori);
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_tabla').innerHTML = ajax.responseText
        }
    }


}

function sel_Diag(){
    prog=  document.getElementById("progra").value;
    id=  document.getElementById("id").value;
    ori=  document.getElementById("ori").value;

    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    fvalor=valor.split("//");

    if(prog=="admin"){
        if(ori=="admin"){
            if(id=="diagpac"){
                opener.document.getElementById('txtdiag').value=fvalor[0];
                opener.document.getElementById('txtdesdiag').value=fvalor[1];
            }else if(id=="gesdiag"){
                 window.opener.document.location="../ges_Diagnostico?busq=B&pri=T&cod="+fvalor[0];
            }
        }
    }else if(prog=="urge"){
        if(ori=="urge"){
            if(id=="diagpac"){
               opener.document.getElementById('txtdiag').value=fvalor[0];
                opener.document.getElementById('txtdesdiag').value=fvalor[1];
            }else if(id=="1"){
                opener.document.getElementById('txtdiagprinc').value=fvalor[0];
                opener.document.getElementById('txtdesdiagprinc').value=fvalor[1];
            }else if(id=="2"){
                opener.document.getElementById('codDiag1').value=fvalor[0];
                opener.document.getElementById('desccodDiag1').value=fvalor[1];
            }else if(id=="3"){
                opener.document.getElementById('codDiag2').value=fvalor[0];
                opener.document.getElementById('descodDiag2').value=fvalor[1];
            }else if(id=="4"){
                opener.document.getElementById('codDiag3').value=fvalor[0];
                opener.document.getElementById('descodDiag3').value=fvalor[1];
            }else if(id=="5"){
                opener.document.getElementById('digSalid').value=fvalor[0];
                opener.document.getElementById('desdigSalid').value=fvalor[1];
            }else if(id=="6"){
                opener.document.getElementById('digSalid1').value=fvalor[0];
                opener.document.getElementById('desdigSalid1').value=fvalor[1];
            }else if(id=="7"){
                opener.document.getElementById('digSalid2').value=fvalor[0];
                opener.document.getElementById('desdigSalid2').value=fvalor[1];
            }else if(id=="8"){
                opener.document.getElementById('digSalid3').value=fvalor[0];
                opener.document.getElementById('desdigSalid3').value=fvalor[1];
            }else if(id=="9"){
                opener.document.getElementById('cauMuerte').value=fvalor[0];
                opener.document.getElementById('descauMuerte').value=fvalor[1];
            }else if(id=="10"){
                opener.document.getElementById('diagPpal').value=fvalor[0];
                opener.document.getElementById('desdiagPpal').value=fvalor[1];
            }else if(id=="11"){
                opener.document.getElementById('DiagRela').value=fvalor[0];
                opener.document.getElementById('desDiagRela').value=fvalor[1];
            }else if(id=="12"){
                opener.document.getElementById('complica').value=fvalor[0];
                opener.document.getElementById('descomplica').value=fvalor[1];
            }
        }
    }



    self.close();

}

function nuevo_centroAtenc(){

   document.getElementById('accion').value="1";

    document.getElementById('txtcod').value="";
    document.getElementById('txtdesc').value="";
    document.getElementById('observa').value="";

    document.getElementById('txtcod').disabled=false;
    document.getElementById('txtdesc').disabled=false;
    document.getElementById('observa').disabled=false;

    document.getElementById('btn_nuevo').setAttribute("style", "display:none");
    document.getElementById('btn_delete').setAttribute("style", "display:none");
    document.getElementById('btn_editar').setAttribute("style", "display:none");
    document.getElementById('btn_buscar').setAttribute("style", "display:none");
    document.getElementById('btn_guardar').setAttribute("style", "display:block");

    document.getElementById('txtcod').focus();


}


function guardar_centroAtenc(){

acc=document.getElementById('accion').value;
    txtcod=document.getElementById('txtcod').value;
    txtdesc=document.getElementById('txtdesc').value;
    observa=document.getElementById('observa').value;

    if(txtcod==""){
        alert("Digite el C\u00f3digo de la Clasificacion");
        document.getElementById("txtcod").focus();
    }else if(txtdesc==""){
        alert("Digite el Nombre de la Clasificacion");
        document.getElementById("txtcod").focus();
    }else{
        var variables="txtcod=" + txtcod + "&txtdesc=" + txtdesc + "&observa=" + observa + "&acc=" + acc;

        guardar('../guardar_centroAtenc',variables,'centroAtenc');
    }
 }

 function editar_centroAtenc(){

 document.getElementById('accion').value="2";
 document.getElementById('txtdesc').disabled=false;
 document.getElementById('observa').disabled=false;

 document.getElementById('btn_nuevo').setAttribute("style", "display:none");
 document.getElementById('btn_delete').setAttribute("style", "display:none");
 document.getElementById('btn_editar').setAttribute("style", "display:none");
 document.getElementById('btn_buscar').setAttribute("style", "display:none");
 document.getElementById('btn_guardar').setAttribute("style", "display:block");

 document.getElementById('txtdesc').focus();

 }

 function delete_centroAtenc(){

    if (confirm("\xbfEsta seguro de realizar la operaci\xf3n?")){
    var txtcod=document.getElementById("txtcod").value;
    ajax=ObjetoAjax();
    ajax.open("POST", "../guardar_centroAtenc", true);
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("txtcod="+txtcod+"&acc=3");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            if(trimAll(ajax.responseText) =="bien"){
                 alert("Operaci\u00f3n Realizada Exitosamente");
                 document.location = "../ges_centroAtenc";
            }
        }
    }
 }
 }

 function buscar_centroAtenc(){
  window.open("../most_centroAtenc","ventana_centroAtenc","width=900, height=580, scrollbars=yes, menubar=no, location=no, resizable=no");
}

function sel_cenAtenc(){

    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    window.opener.document.location="../ges_centroAtenc?busq=B&pri=T&cod="+valor;
    self.close();

}

function Busqueda_centAtenc(){

  tip_bus=document.getElementById("t_bus").value;
  busq=  document.getElementById("busqueda").value;
  ajax = ObjetoAjax();
  ajax.open("POST", "../most_centroAtenc", true);
  ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&control=2");
  ajax.onreadystatechange=function() {
  if (ajax.readyState==4) {
      document.getElementById('td_tabla').innerHTML = ajax.responseText
   }
  }

}

function abrir_profesion(prog){


if(document.getElementById('accion').value!="0"){

  cargarprofesiones(prog);
  document.getElementById('profesiones').style.visibility = 'visible';
  document.getElementById("conte").style.visibility = 'hidden';
//  window.open("../profesiones?programa="+prog,"ventana_profesiones","width=550, height=580, scrollbars=no, menubar=no, location=no, resizable=no");
  }

}

function cargarprofesiones(dest){

  ajax = ObjetoAjax();
  ajax.open("POST", "../profesiones", true);
  ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  ajax.send("dest="+dest);
  ajax.onreadystatechange=function() {
  if (ajax.readyState==4) {
      document.getElementById('td_profesiones').innerHTML = ajax.responseText
   }
  }
}

function Busqueda_prof(dest){

  tip_bus=document.getElementById("t_bus").value;
  busq=  document.getElementById("busqueda").value;

  ajax = ObjetoAjax();
  ajax.open("POST", "../profesiones", true);
  ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&dest="+dest+"&control=2");
  ajax.onreadystatechange=function() {
  if (ajax.readyState==4) {
      document.getElementById('td_profesiones').innerHTML = ajax.responseText
   }
  }

}

function sel_prof(){

   var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    var divvalor=valor.split("-");
    var nom=divvalor[1];
    var cod=divvalor[0];
     document.getElementById("txtprof").value=cod;
     document.getElementById("txtdprof").value=nom;
     Cerrarpopu('profesiones');

}

function abrir_diagnostico(prog,id){
if(document.getElementById('accion').value!="0"){
 window.open("../diagnosticos?prog="+prog+"&id="+id,"ventana_diagnosticos","width=600, height=580, scrollbars=no, menubar=no, location=no, resizable=no");
}
}

function Busqueda_diag(){

    tip_bus=document.getElementById("t_bus").value;
    busq=  document.getElementById("busqueda").value;
    ajax = ObjetoAjax();
    ajax.open("POST", "../diagnosticos", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&control=2");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_tabla').innerHTML = ajax.responseText
        }
    }

}

function sel_diag(){
    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    var divvalor=valor.split("-");
    var nom=divvalor[1];
    var cod=divvalor[0];
     opener.document.getElementById("txtdiag").value=cod;
     opener.document.getElementById("txtdesdiag").value=nom;
     window.close();
}

function AsigPlanPac(prog){
    tit=document.getElementById("t_id").value+" "+document.getElementById("txtide").value+" - "+document.getElementById("txtnom").value+" "+document.getElementById("txtapell").value;
    window.open("../asigPlanPaci?tit="+tit+"&prog="+prog,"ventana_asigPlanPaci","width=950, height=580, scrollbars=yes, menubar=no, location=no, resizable=no");
}

function planPacien(cod_a,desc_a,desc_p,tab){

    var cont="";
    var filas ="";
    var tabla ="";
     var fila="";
    if(tab=="1"){
    cont = document.getElementById("cont2");
     filas = document.getElementById("filas");
    cont.setAttribute("value", parseInt(cont.value,0)+1);
    tabla = document.getElementById("contenido2").tBodies[0];
     fila = document.createElement("TR");
    fila.setAttribute("align","center");
    }else if(tab=="2"){
     cont = document.getElementById("cont2");
     filas = document.getElementById("filas");
     cont.setAttribute("value", parseInt(cont.value,0)+1);
     tabla = document.getElementById("contenido2").tBodies[0];
     fila = document.createElement("TR");
    fila.setAttribute("align","center");
   }else{
     cont = document.getElementById("cont2");
     filas = document.getElementById("filas");
    cont.setAttribute("value", parseInt(cont.value,0)+1);
    tabla = document.getElementById("contenido2").tBodies[0];
     fila = document.createElement("TR");
    fila.setAttribute("align","center");
   }


    var celda2="";
    var cod ="";
    if(tab=="1"){
    celda2 = document.createElement("TD");
    cod = document.createElement("INPUT");
    }else if(tab=="2"){
    celda2 = document.createElement("TD");
    cod = document.createElement("INPUT");

    }else{
    celda2 = document.createElement("TD");
    cod = document.createElement("INPUT");

    }
    cod.setAttribute("type","text");
    cod.setAttribute("size","16");
    cod.setAttribute('style','font-size:7pt;' )
    cod.setAttribute("title","Doble Click para seleccionar producto");
    cod.setAttribute("maxlength","18");
    cod.setAttribute("disabled","disabled");
    cod.setAttribute("value",cod_a);
    cod.setAttribute("name","cod");
    cod.setAttribute("id","cod" + cont.value);
    celda2.appendChild(cod);

    var celda3="";
    var des="";
    if(tab=="1"){
     celda3 = document.createElement("TD");
     des = document.createElement("INPUT");
   }else if(tab=="2"){
     celda3 = document.createElement("TD");
     des = document.createElement("INPUT");

    }else{
       celda3 = document.createElement("TD");
     des = document.createElement("INPUT");
    }
    des.setAttribute("type","text");
    if(tab=="1"){
        des.setAttribute("size","47");
     }else if(tab=="2"){
        des.setAttribute("size","60");
    }else{
       des.setAttribute("size","60");
    }

    des.setAttribute("maxlength","80");
    des.setAttribute("disabled","disabled");
    des.setAttribute('style','font-size:7pt;' )
    des.setAttribute("value",desc_a);
    des.setAttribute("name","des_adm");
    des.setAttribute("id","des_adm" + cont.value);
    celda3.appendChild(des);

    var celda4="";
    var des_plan="";
    if(tab=="1"){
     celda4 = document.createElement("TD");
     des_plan = document.createElement("INPUT");
      }else if(tab=="2"){
     celda4 = document.createElement("TD");
     des_plan = document.createElement("INPUT");
    }else{
       celda4 = document.createElement("TD");
     des_plan = document.createElement("INPUT");

    }
    des_plan.setAttribute("type","text");
    if(tab=="1"){
        des_plan.setAttribute("size","70");
    }else if(tab=="2"){
        des_plan.setAttribute("size","90");
    }else{
        des_plan.setAttribute("size","90");
    }

    des_plan.setAttribute("maxlength","80");
    des_plan.setAttribute("disabled","disabled");
    des_plan.setAttribute('style','font-size:7pt;' )
    des_plan.setAttribute("value",desc_p);
    des_plan.setAttribute("name","des_plan");
    des_plan.setAttribute("id","des_plan" + cont.value);
    celda4.appendChild(des_plan);


    var celda11 = document.createElement('TD');
    var boton = document.createElement('INPUT');
    boton.setAttribute('type','button');
    boton.setAttribute('value','X');
    boton.setAttribute('id','boton1' + cont.value);
    boton.setAttribute('name','boton1');
    boton.setAttribute('title','Quitar de la lista');
    boton.setAttribute('style','font-size:7pt; padding:2px 2px 2px 2px; margin; margin: 0px 4px 4px 0px;' )
    boton.onclick=function(){
        borrarFila2(this, this.id);
    }
    celda11.appendChild(boton);




    //fila.appendChild(celda1);
    fila.appendChild(celda2);
    fila.appendChild(celda3);
    fila.appendChild(celda4);

    fila.appendChild(celda11);


    tabla.appendChild(fila);

}

function Add_PlanPaci(){

   var control="1"
    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }


    var par_med=valor.split(";;");

    var num_elementos2 = document.getElementsByName("boton1").length;
    if(num_elementos2>0){
        for( var contador2=0; contador2 < num_elementos2; contador2++ ){			//
           cod =document.getElementsByName("des_plan")[contador2].value;

           p_cod=cod.split("--");
           ppar_med=par_med[2].split("--");


//            alert(trimAll(p_cod[0])+"/"+trimAll(ppar_med[0]));
            if(trimAll(p_cod[0])==trimAll(ppar_med[0])){
                control="0";
            }
        }
    }

    if(control=="1"){
       planPacien(par_med[0],trimAll(par_med[1]) ,trimAll(par_med[2]),'1')
    }else{
        alert("Este Plan ya ha Sido Agregado.");
    }

}

function guar_planPac(){
   var control="1";
   var num_elementos = document.getElementsByName("seleccion").length;
   if(num_elementos=="0"){
      alert("Debe seleccionar un plan de la lista, Verifique...");
   }else{
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }


    pvalor=valor.split("//");
    padmin=pvalor[2].split("-");
           cod =padmin[0];
           adm =padmin[1];
           pla =pvalor[0]+"--"+pvalor[1];
//
    var num_elementos2 = document.getElementsByName("boton1").length;
    if(num_elementos2>0){
        for( var contador2=0; contador2 < num_elementos2; contador2++ ){			//
           cod1 =document.getElementsByName("des_plan")[contador2].value;
           pcod1=cod1.split("--");
            if(pcod1[0]==pvalor[0]){
                control="0";
            }
        }
    }
   if(control=="0"){
       alert("Este Plan ya ha sido asiganado al Paciente, verifique...");
   }else{
     planPacien(cod,adm,pla,'2')
    Cerrarpopu('buscaPlanAdmin');
   }

   }
}

function nuevo_paciente(){

    document.getElementById('accion').value="1";
    var conse="";

    ajax = ObjetoAjax();
    ajax.open("POST", "../conse_pac", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("tip_bus=pac");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
//            alert(ajax.responseText);
             document.getElementById('txtcod').value = ajax.responseText
        }
    }

    document.getElementById('txtide').setAttribute("onblur", "verificart(this.id,'pacientes');");
    document.getElementById('txtide').value="";
    document.getElementById('t_id').selectedIndex=0;
    document.getElementById('lexpe').value="";
    document.getElementById('txtnom').value="";
    document.getElementById('txtsegnom').value="";
    document.getElementById('txtapell').value="";
    document.getElementById('txtsegapell').value="";
    document.getElementById('sex').selectedIndex=0;
    document.getElementById('fnac').value="";
    document.getElementById('umed').selectedIndex=0;
    document.getElementById('edad').value="";
    document.getElementById('opc_regi').selectedIndex=0;
    document.getElementById('zona').selectedIndex=0;
    document.getElementById('txtprof').value="";
    document.getElementById('txtdprof').value="";
    document.getElementById('txthist').value="";
    document.getElementById('txtdir').value="";
    document.getElementById('txttel').value="";
    document.getElementById('txttelres').value="";
    document.getElementById('txtcod_dom').value="";
    document.getElementById('txtnom_dom').value="";
    document.getElementById('est_civil').selectedIndex=0;
    document.getElementById('nivel').selectedIndex=0;
    document.getElementById('tip_usuario').selectedIndex=0;
    document.getElementById('cenAtenc').selectedIndex=0;
    document.getElementById('carnet').value="";
    document.getElementById('activo').checked=true;
    document.getElementById('multado').checked=false;
    document.getElementById('escol').selectedIndex=0;
    document.getElementById('etnia').selectedIndex=0;
    document.getElementById('tsangre').selectedIndex=0;
    document.getElementById('txtdiag').value="";
    document.getElementById('txtdesdiag').value="";
    document.getElementById('txtacomp').value="";
    document.getElementById('txtrespon').value="";
    document.getElementById('txtelresp').value="";
    document.getElementById('txtdepCat').value="";
    document.getElementById('txtmunCat').value="";
    document.getElementById('fcatast').value="";
    document.getElementById('txtdircat').value="";
    document.getElementById('zonacat').selectedIndex=0;
    document.getElementById('txtgrad').value="";
    document.getElementById('txtparent').value="";
    document.getElementById('pension').selectedIndex=0;
    document.getElementById('fecAfili').value="";
    document.getElementById('fetrata').value="";


    document.getElementById('txtide').disabled=false;
    document.getElementById('t_id').disabled=false;
    document.getElementById('lexpe').disabled=false;
    document.getElementById('txtnom').disabled=false;
    document.getElementById('txtsegnom').disabled=false;
    document.getElementById('txtapell').disabled=false;
    document.getElementById('txtsegapell').disabled=false;
    document.getElementById('sex').disabled=false;
    document.getElementById('fnac').disabled=false;
    document.getElementById('umed').disabled=false;
    document.getElementById('opc_regi').disabled=false;
    document.getElementById('zona').disabled=false;
    document.getElementById('txtprof').disabled=false;
    document.getElementById('txtdprof').disabled=false;
    document.getElementById('txthist').disabled=false;
    document.getElementById('txtdir').disabled=false;
    document.getElementById('txttel').disabled=false;
    document.getElementById('txttelres').disabled=false;
    document.getElementById('txtcod_dom').disabled=false;
    document.getElementById('est_civil').disabled=false;
    document.getElementById('nivel').disabled=false;
    document.getElementById('tip_usuario').disabled=false;
    document.getElementById('cenAtenc').disabled=false;
    document.getElementById('carnet').disabled=false;
    document.getElementById('activo').disabled=false;
    document.getElementById('multado').disabled=false;
    document.getElementById('escol').disabled=false;
    document.getElementById('etnia').disabled=false;
    document.getElementById('tsangre').disabled=false;
    document.getElementById('txtdiag').disabled=false;
    document.getElementById('txtdesdiag').disabled=false;
    document.getElementById('txtacomp').disabled=false;
    document.getElementById('txtrespon').disabled=false;
    document.getElementById('txtelresp').disabled=false;
    document.getElementById('txtdepCat').disabled=false;
    document.getElementById('txtmunCat').disabled=false;
    document.getElementById('fcatast').disabled=false;
    document.getElementById('txtdircat').disabled=false;
    document.getElementById('zonacat').disabled=false;
    document.getElementById('txtgrad').disabled=false;
    document.getElementById('txtparent').disabled=false;
    document.getElementById('pension').disabled=false;
    document.getElementById('fecAfili').disabled=false;
    document.getElementById('fetrata').disabled=false;

    document.getElementById('btn_planPac').disabled=false;
    document.getElementById('btn_planPac').setAttribute("style", "color:black;padding:3px 30px 3px 30px;  margin: 0px 4px 4px 0px;");

    document.getElementById('btn_nuevo').setAttribute("style", "display:none");
    document.getElementById('btn_delete').setAttribute("style", "display:none");
    document.getElementById('btn_editar').setAttribute("style", "display:none");
    document.getElementById('btn_buscar').setAttribute("style", "display:none");
    document.getElementById('btn_guardar').setAttribute("style", "display:block");

    document.getElementById('contenido2').innerHTML = " <tr align='center'>"
                         +"                                            <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 10px; '> C&Oacute;DIGO ADM.</span> </td>"
                         +"                                            <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 10px; '> NOMBRE PLAN</span> </td>"
                         +"                                            <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 10px; '> ADMINISTRADORA</span> </td>"
                         +"                                            <td>&nbsp;</td>"
                         +"                                        </tr>";

    document.getElementById('txtcod').focus();

}

function guardar_paciente(prog,vent){

    acc=document.getElementById('accion').value;

    txtcod=document.getElementById('txtcod').value;
    txtide=document.getElementById('txtide').value;
    t_id=document.getElementById('t_id').value;
    lexpe=document.getElementById('lexpe').value;
    txtnom=document.getElementById('txtnom').value;
    txtsegnom=document.getElementById('txtsegnom').value;
    txtapell=document.getElementById('txtapell').value;
    txtsegapell=document.getElementById('txtsegapell').value;
    sex=document.getElementById('sex').value;
    nac=document.getElementById('fnac').value.split("/");
    fnac=nac[2]+"-"+nac[1]+"-"+nac[0];
    umed=document.getElementById('umed').value;
    edad=document.getElementById('edad').value;
    opc_regi=document.getElementById('opc_regi').value;
    zona=document.getElementById('zona').value;
    txtprof=document.getElementById('txtprof').value;
    txtdprof=document.getElementById('txtdprof').value;
    txthist=document.getElementById('txthist').value;
    txtdir=document.getElementById('txtdir').value;
    txttel=document.getElementById('txttel').value;
    txttelres=document.getElementById('txttelres').value;
    txtcod_dom=document.getElementById('txtcod_dom').value;
    est_civil=document.getElementById('est_civil').value;
    nivel=document.getElementById('nivel').value;
    tip_usuario=document.getElementById('tip_usuario').value;
    cenAtenc=document.getElementById('cenAtenc').value;
    carnet=document.getElementById('carnet').value;
    var activo="";
    if(document.getElementById('activo').checked==true){
        activo="s";
    }else{
        activo="n";
    }
    var mult="";
    if(document.getElementById('multado').checked==false){
        mult="s";
    }else{
        mult="n";
    }

    escol=document.getElementById('escol').value;
    etnia=document.getElementById('etnia').value;
    tsangre=document.getElementById('tsangre').value;
    txtdiag=document.getElementById('txtdiag').value;
    txtdesdiag=document.getElementById('txtdesdiag').value;
    txtacomp=document.getElementById('txtacomp').value;
    txtrespon=document.getElementById('txtrespon').value;
    txtelresp=document.getElementById('txtelresp').value;
    txtdepCat=document.getElementById('txtdepCat').value;
    txtmunCat=document.getElementById('txtmunCat').value;
//    catast=document.getElementById('fcatast').value.split("/");
    fcatast=document.getElementById('fcatast').value;
    txtdircat=document.getElementById('txtdircat').value;
    zonacat=document.getElementById('zonacat').value;
    txtgrad=document.getElementById('txtgrad').value;
    txtparent=document.getElementById('txtparent').value;
    pension=document.getElementById('pension').value;
//    Afili=document.getElementById('fecAfili').value.split("/");
    fecAfili=document.getElementById('fecAfili').value;
//    trata=document.getElementById('fetrata').value.split("/");
    fetrata=document.getElementById('fetrata').value;
    dest=document.getElementById('dest').value;


    var admin="";
    var num_elementos = document.getElementsByName("cod").length;
//    alert(num_elementos);
    for( contador=0; contador < num_elementos; contador++ ){
        cod =document.getElementsByName("cod")[contador].value;
        plan =document.getElementsByName("des_plan")[contador].value;
        p_plam=plan.split("-");

        admin += cod + "#" + p_plam[0] + ";";
    }
//    alert(admin);

    if(txtide==""){
        alert("Digite la Identificaci\u00f3n");
        document.getElementById("txtide").focus();
    }else if(t_id==""){
        alert("Seleccione el Tipo de Identificaci\u00f3n");
        document.getElementById("t_id").focus();
    }else if(txtnom==""){
        alert("Digite un Nombre al Paciente");
        document.getElementById("txtnom").focus();
    }else if(txtapell==""){
        alert("Digite un Apellido al Paciente");
        document.getElementById("txtapell").focus();
    }else if(umed==""){
        alert("Seleccione la Medida de Edad");
        document.getElementById("umed").focus();
    }else if(sex==""){
        alert("Seleccione el Tipo de Sexo");
        document.getElementById("sex").focus();
    }else if(opc_regi==""){
        alert("Seleccione el Regimen al que Pertenece");
        document.getElementById("opc_regi").focus();
    }else if(zona==""){
        alert("Seleccione la Zona");
        document.getElementById("opc_regi").focus();
    }else if(nivel==""){
        alert("Seleccione el Nivel al que Pertenece");
        document.getElementById("nivel").focus();
    }else if(tip_usuario==""){
        alert("Seleccione el Tipo de Usuario");
        document.getElementById("tip_usuario").focus();
    }else if(txtcod_dom==""){
        alert("Digite el Municipio");
        document.getElementById("txtcod_dom").focus();
    }else if(lexpe==""){
        alert("Digite el Lugar de Expedicion de la Cedula");
        document.getElementById("lexpe").focus();
//    }
//    else if(document.getElementById("cod").value=="0"){
//        alert("Debe Asignar Planes al Paciente");
//        tit=document.getElementById("t_id").value+" "+document.getElementById("txtide").value+" - "+document.getElementById("txtdesc").value;
//        window.open("../asigPlanPaci?tit="+tit,"ventana_asigPlanPaci","width=950, height=580, scrollbars=yes, menubar=no, location=no, resizable=no");
    }else{
         var variables="txtide=" + txtide + "&t_id=" + t_id + "&lexpe=" + lexpe + "&txtnom=" + txtnom + "&sex=" + sex + "&fnac=" + fnac
            + "&umed=" + umed + "&edad=" + edad  + "&opc_regi=" + opc_regi + "&zona=" + zona  + "&txtprof=" + txtprof + "&txthist=" + txthist
            + "&txtdir=" + txtdir + "&txttel=" + txttel + "&txttelres=" + txttelres + "&txtcod_dom=" + txtcod_dom + "&est_civil=" + est_civil
            + "&nivel=" + nivel + "&tip_usuario=" + tip_usuario + "&cenAtenc=" + cenAtenc + "&carnet=" + carnet + "&activo=" + activo
            + "&mult=" + mult + "&escol=" + escol + "&etnia=" + etnia + "&tsangre=" + tsangre + "&txtdiag=" + txtdiag + "&txtacomp=" + txtacomp
            + "&txtrespon=" + txtrespon + "&txtelresp=" + txtelresp + "&txtdepCat=" + txtdepCat + "&txtmunCat=" + txtmunCat + "&fcatast=" + fcatast
            + "&txtdircat=" + txtdircat + "&zonacat=" + zonacat + "&txtgrad=" + txtgrad + "&txtparent=" + txtparent + "&pension=" + pension
            + "&fecAfili=" + fecAfili + "&fetrata=" + fetrata + "&acc=" + acc + "&admin="+admin+"&txtsegnom="+txtsegnom+"&txtapell="+txtapell+"&txtsegapell="+txtsegapell+"&prog="+prog+"&txtcod="+txtcod;

        guardar('../guardar_paciente',variables,'pacientes',dest,vent);
    }


}

function editar_paciente(){

//    document.getElementById('txtide').disabled=false;
    document.getElementById('accion').value="2";
    document.getElementById('txtide').disabled=false;
    document.getElementById('t_id').disabled=false;
    document.getElementById('lexpe').disabled=false;
    document.getElementById('txtnom').disabled=false;
    document.getElementById('txtsegnom').disabled=false;
    document.getElementById('txtapell').disabled=false;
    document.getElementById('txtsegapell').disabled=false;
    document.getElementById('sex').disabled=false;
    document.getElementById('fnac').disabled=false;
    document.getElementById('umed').disabled=false;
    document.getElementById('opc_regi').disabled=false;
    document.getElementById('zona').disabled=false;
    document.getElementById('txtprof').disabled=false;
    document.getElementById('txtdprof').disabled=false;
    document.getElementById('txthist').disabled=false;
    document.getElementById('txtdir').disabled=false;
    document.getElementById('txttel').disabled=false;
    document.getElementById('txttelres').disabled=false;
    document.getElementById('txtcod_dom').disabled=false;
    document.getElementById('est_civil').disabled=false;
    document.getElementById('nivel').disabled=false;
    document.getElementById('tip_usuario').disabled=false;
    document.getElementById('cenAtenc').disabled=false;
    document.getElementById('carnet').disabled=false;
    document.getElementById('activo').disabled=false;
    document.getElementById('multado').disabled=false;
    document.getElementById('escol').disabled=false;
    document.getElementById('etnia').disabled=false;
    document.getElementById('tsangre').disabled=false;
    document.getElementById('txtdiag').disabled=false;
    document.getElementById('txtdesdiag').disabled=false;
    document.getElementById('txtacomp').disabled=false;
    document.getElementById('txtrespon').disabled=false;
    document.getElementById('txtelresp').disabled=false;
    document.getElementById('txtdepCat').disabled=false;
    document.getElementById('txtmunCat').disabled=false;
    document.getElementById('fcatast').disabled=false;
    document.getElementById('txtdircat').disabled=false;
    document.getElementById('zonacat').disabled=false;
    document.getElementById('txtgrad').disabled=false;
    document.getElementById('txtparent').disabled=false;
    document.getElementById('pension').disabled=false;
    document.getElementById('fecAfili').disabled=false;
    document.getElementById('fetrata').disabled=false;


    document.getElementById('btn_planPac').disabled=false;
    document.getElementById('btn_planPac').setAttribute("style", "color:black;padding:3px 30px 3px 30px;  margin: 0px 4px 4px 0px;");

    var num_elementos = document.getElementsByName("boton1").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        document.getElementsByName("boton1")[contador].disabled = false;	//> se obtiene el value del check seleccionado

    }

    document.getElementById('btn_nuevo').setAttribute("style", "display:none");
    document.getElementById('btn_delete').setAttribute("style", "display:none");
    document.getElementById('btn_editar').setAttribute("style", "display:none");
    document.getElementById('btn_buscar').setAttribute("style", "display:none");
    document.getElementById('btn_guardar').setAttribute("style", "display:block");

    document.getElementById('txtide').focus();
     document.getElementById('txtide').setAttribute("onblur", "");
}

function caledad(value){
    fnaci=document.getElementById("fnac").value;
    pfnaci=fnaci.split("/");

    var mydate=new Date();
    var year=mydate.getYear();
    if (year < 1000)
        year+=1900;
    var day=mydate.getDay();
    var month=mydate.getMonth()+1;
    if (month<10)
        month="0"+month;
    var daym=mydate.getDate();
    if (daym<10)
        daym="0"+daym;


    if(value=="3"){


    }

    if(value=="1"){
      anios=  parseInt(year) - parseInt(pfnaci[2]);
      alert(anios);
    }else if(value=="2"){
        meses=  parseInt(month) - parseInt(pfnaci[1]);
         alert(meses);
    }

//    alert(anios);
//    document.write("<small><font color='000000' face='Arial'><b>"+daym+"/"+month+"/"+year+"</b></font></small>")
}


function nuevo_depart(){

    document.getElementById('accion').value="1";

    document.getElementById('txtcod').value="";
    document.getElementById('txtdesc').value="";
    document.getElementById('observa').value="";

    document.getElementById('txtcod').disabled=false;
    document.getElementById('txtdesc').disabled=false;
    document.getElementById('observa').disabled=false;

    document.getElementById('btn_nuevo').setAttribute("style", "display:none");
    document.getElementById('btn_delete').setAttribute("style", "display:none");
    document.getElementById('btn_editar').setAttribute("style", "display:none");
    document.getElementById('btn_buscar').setAttribute("style", "display:none");
    document.getElementById('btn_guardar').setAttribute("style", "display:block");

    document.getElementById('txtcod').focus();

}

function guardar_depart(){
    acc=document.getElementById('accion').value;
    txtcod=document.getElementById('txtcod').value;
    txtdesc=document.getElementById('txtdesc').value;
    observa=document.getElementById('observa').value;

    if(txtcod==""){
       alert("Digite el C\u00f3digo del Departamento");
      document.getElementById("txtcod").focus();
    }else if(txtdesc==""){
          alert("Digite el Nombre del Departamento");
      document.getElementById("txtcod").focus();
    }else{
        var variables="txtcod=" + txtcod + "&txtdesc=" + txtdesc + "&observa=" + observa + "&acc=" + acc;

        guardar('../guardar_departamentos',variables,'departamentos');
    }

}

function editar_depart(){

 document.getElementById('accion').value="2";
 document.getElementById('txtdesc').disabled=false;
 document.getElementById('observa').disabled=false;

 document.getElementById('btn_nuevo').setAttribute("style", "display:none");
 document.getElementById('btn_delete').setAttribute("style", "display:none");
 document.getElementById('btn_editar').setAttribute("style", "display:none");
 document.getElementById('btn_buscar').setAttribute("style", "display:none");
 document.getElementById('btn_guardar').setAttribute("style", "display:block");

 document.getElementById('txtdesc').focus();


}

function delete_depart(){

  if (confirm("\xbfEsta seguro de realizar la operaci\xf3n?")){
    var txtcod=document.getElementById("txtcod").value;
    ajax=ObjetoAjax();
    ajax.open("POST", "../guardar_departamentos", true);
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("txtcod="+txtcod+"&acc=3");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            if(trimAll(ajax.responseText) =="bien"){
                 alert("Operaci\u00f3n Realizada Exitosamente");
                 document.location = "../ges_departamentos";
            }else{
                alert("No se Puede Realizar la Operaci\u00f3n. A este Deparmento ya se le han Asignado Municipios... Verifique.");
            }
        }
    }
  }
}

function buscar_depart(){
window.open("../most_departamentos","ventana_departamentos","width=700, height=580, scrollbars=yes, menubar=no, location=no, resizable=no");
}

function Busqueda_depart(){
  tip_bus=document.getElementById("t_bus").value;
  busq=  document.getElementById("busqueda").value;
  ajax = ObjetoAjax();
  ajax.open("POST", "../most_departamentos", true);
  ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&control=2");
  ajax.onreadystatechange=function() {
  if (ajax.readyState==4) {
      document.getElementById('td_tabla').innerHTML = ajax.responseText
   }
  }
}

function sel_depart(){

    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    window.opener.document.location="../ges_departamentos?busq=B&pri=T&cod="+valor;
    self.close();
}


/////////////////

function nuevo_mun(){

    document.getElementById('accion').value="1";

    document.getElementById('txtcod').value="";
    document.getElementById('txtdesc').value="";
    document.getElementById('dep').value="";
    document.getElementById('observa').value="";

    document.getElementById('txtcod').disabled=false;
    document.getElementById('txtdesc').disabled=false;
    document.getElementById('observa').disabled=false;
    document.getElementById('dep').disabled=false;

    document.getElementById('btn_nuevo').setAttribute("style", "display:none");
    document.getElementById('btn_delete').setAttribute("style", "display:none");
    document.getElementById('btn_editar').setAttribute("style", "display:none");
    document.getElementById('btn_buscar').setAttribute("style", "display:none");
    document.getElementById('btn_guardar').setAttribute("style", "display:block");

    document.getElementById('txtcod').focus();

}

function guardar_mun(){
    acc=document.getElementById('accion').value;
    txtcod=document.getElementById('txtcod').value;
    txtdesc=document.getElementById('txtdesc').value;
    dep=document.getElementById('dep').value;
    observa=document.getElementById('observa').value;

    if(txtcod==""){
       alert("Digite el C\u00f3digo del Departamento");
      document.getElementById("txtcod").focus();
    }else if(txtdesc==""){
          alert("Digite el Nombre del Departamento");
      document.getElementById("txtcod").focus();
    }else if(dep==""){
          alert("Seleccione el Departamento al que Pertenece");
      document.getElementById("dep").focus();
    }else{
        var variables="txtcod=" + txtcod + "&txtdesc=" + txtdesc + "&dep=" + dep + "&observa=" + observa + "&acc=" + acc;

        guardar('../guardar_municipios',variables,'municipios');
    }

}

function editar_mun(){

 document.getElementById('accion').value="2";
 document.getElementById('txtdesc').disabled=false;
 document.getElementById('dep').disabled=false;
 document.getElementById('observa').disabled=false;

 document.getElementById('btn_nuevo').setAttribute("style", "display:none");
 document.getElementById('btn_delete').setAttribute("style", "display:none");
 document.getElementById('btn_editar').setAttribute("style", "display:none");
 document.getElementById('btn_buscar').setAttribute("style", "display:none");
 document.getElementById('btn_guardar').setAttribute("style", "display:block");

 document.getElementById('txtdesc').focus();


}

function delete_mun(){

  if (confirm("\xbfEsta seguro de realizar la operaci\xf3n?")){
    var txtcod=document.getElementById("txtcod").value;
    ajax=ObjetoAjax();
    ajax.open("POST", "../guardar_municipios", true);
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("txtcod="+txtcod+"&acc=3");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            if(trimAll(ajax.responseText) =="bien"){
                 alert("Operaci\u00f3n Realizada Exitosamente");
                 document.location = "../ges_municipios";
            }
        }
    }
  }
}

function buscar_mun(){
window.open("../most_municipios","ventana_municipios","width=700, height=580, scrollbars=yes, menubar=no, location=no, resizable=no");
}

function Busqueda_mun(){
  tip_bus=document.getElementById("t_bus").value;
  busq=  document.getElementById("busqueda").value;
  ajax = ObjetoAjax();
  ajax.open("POST", "../most_municipios", true);
  ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&control=2");
  ajax.onreadystatechange=function() {
  if (ajax.readyState==4) {
      document.getElementById('td_tabla').innerHTML = ajax.responseText
   }
  }
}

function sel_mun(){

    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    window.opener.document.location="../ges_municipios?busq=B&pri=T&cod="+valor;
    self.close();
}

function nueva_estancia(){

    document.getElementById('accion').value="1";

    document.getElementById('txtcodCUPS').value="";
    document.getElementById('txtcodSOAT').value="";
    document.getElementById('txtcodISS').value="";
    document.getElementById('des').value="";
    document.getElementById('txtgruSOAT').value="";
    document.getElementById('txtvalpart').value="";
    document.getElementById('txtvaliss20').value="";
    document.getElementById('txtvaliss21').value="";
    document.getElementById('txtuvriss24').value="";

    document.getElementById('txtcodCUPS').disabled=false;
    document.getElementById('txtcodSOAT').disabled=false;
    document.getElementById('txtcodISS').disabled=false;
    document.getElementById('des').disabled=false;
    document.getElementById('txtgruSOAT').disabled=false;
    document.getElementById('txtvalpart').disabled=false;
    document.getElementById('txtvaliss20').disabled=false;
    document.getElementById('txtvaliss21').disabled=false;
    document.getElementById('txtuvriss24').disabled=false;

    document.getElementById('btn_nuevo').setAttribute("style", "display:none");
    document.getElementById('btn_delete').setAttribute("style", "display:none");
    document.getElementById('btn_editar').setAttribute("style", "display:none");
    document.getElementById('btn_buscar').setAttribute("style", "display:none");
    document.getElementById('btn_guardar').setAttribute("style", "display:block");

    document.getElementById('txtcodCUPS').focus();

}

function guardar_estancia(){

    acc=document.getElementById('accion').value;

    txtcodCUPS=document.getElementById('txtcodCUPS').value;
    txtcodSOAT=document.getElementById('txtcodSOAT').value;
    txtcodISS=document.getElementById('txtcodISS').value;
    des=document.getElementById('des').value;
    txtgruSOAT=document.getElementById('txtgruSOAT').value;
    txtvalpart=document.getElementById('txtvalpart').value.replace(".","").replace(".","").replace(",",".");
    txtvaliss20=document.getElementById('txtvaliss20').value.replace(".","").replace(".","").replace(",",".");
    txtvaliss21=document.getElementById('txtvaliss21').value.replace(".","").replace(".","").replace(",",".");
    txtuvriss24=document.getElementById('txtuvriss24').value;
    txtctacontable=document.getElementById('txtctacontable').value;

    if(txtcodCUPS==""){
       alert("Digite el C\u00f3digo CUPS");
      document.getElementById("txtcodCUPS").focus();
    }else if(des==""){
     alert("Digite una Descripci\u00f3n ");
      document.getElementById("des").focus();
    }else{
       var variables="txtcodCUPS=" + txtcodCUPS + "&txtcodSOAT=" + txtcodSOAT + "&txtcodISS=" + txtcodISS + "&des=" + des
           + "&txtgruSOAT=" + txtgruSOAT + "&txtvalpart=" + txtvalpart + "&txtvaliss20=" + txtvaliss20
           + "&txtvaliss21=" + txtvaliss21 + "&txtuvriss24=" + txtuvriss24  + "&txtctacontable=" + txtctacontable + "&acc=" + acc;
       guardar('../guardar_estancias',variables,'estancias');
    }

}

function editar_estancia(){
     txtcodCUPS=document.getElementById('txtcodCUPS').value;
     if(txtcodCUPS==""){
          alert("No existe Ningun Registro Para Editar");
     }else{
        document.getElementById('accion').value="2";

    document.getElementById('txtcodSOAT').disabled=false;
    document.getElementById('txtcodISS').disabled=false;
    document.getElementById('des').disabled=false;
    document.getElementById('txtgruSOAT').disabled=false;
    document.getElementById('txtvalpart').disabled=false;
    document.getElementById('txtvaliss20').disabled=false;
    document.getElementById('txtvaliss21').disabled=false;
    document.getElementById('txtuvriss24').disabled=false;

    document.getElementById('btn_nuevo').setAttribute("style", "display:none");
    document.getElementById('btn_delete').setAttribute("style", "display:none");
    document.getElementById('btn_editar').setAttribute("style", "display:none");
    document.getElementById('btn_buscar').setAttribute("style", "display:none");
    document.getElementById('btn_guardar').setAttribute("style", "display:block");

    document.getElementById('txtcodSOAT').focus();
     }


}


function delete_mun(){

  if (confirm("\xbfEsta seguro de realizar la operaci\xf3n?")){
    var txtcod=document.getElementById("txtcod").value;
    ajax=ObjetoAjax();
    ajax.open("POST", "../guardar_estancias", true);
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("txtcod="+txtcod+"&acc=3");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            if(trimAll(ajax.responseText) =="bien"){
                 alert("Operaci\u00f3n Realizada Exitosamente");
                 document.location = "../ges_estancias";
            }
        }
    }
  }
}

function buscar_estancia(){
window.open("../most_estancias","ventana_estancias","width=700, height=580, scrollbars=yes, menubar=no, location=no, resizable=no");
}

function Busqueda_estancias(){
  tip_bus=document.getElementById("t_bus_estancia").value;
  busq=  document.getElementById("busqueda_estancia").value;
  ajax = ObjetoAjax();
  ajax.open("POST", "../most_estancias", true);
  ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&control=2&prog=hosp");
  ajax.onreadystatechange=function() {
  if (ajax.readyState==4) {
      document.getElementById('tabla_estancia').innerHTML = ajax.responseText
   }
  }
}


function sel_estancia(ori){

    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    p_valor=valor.split("//");

    if(ori=="dhospi"){
        document.getElementById("cod_est").value=p_valor[0];
        document.getElementById("des_est").value=p_valor[1];
        document.getElementById("txtval").value=p_valor[2];
//        document.getElementById("txttest").value=p_valor[2];
        document.getElementById("desta").value=p_valor[3]+"-"+p_valor[4];
        fec_estan();

        document.getElementById("buscaestancia").style.visibility = 'hidden';
        document.getElementById('conte').style.visibility = 'visible';
        document.getElementById('tabla_estancia').innerHTML="";

        ajax = ObjetoAjax();
        ajax.open("POST", "../verificar", true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send("ori=bus_habi&estan="+p_valor[3]+"&control=2&prog=hosp");
        ajax.onreadystatechange=function() {
            if (ajax.readyState==4) {
                document.getElementById('habit').innerHTML = ajax.responseText
            }
        }


    }else{
        document.location="../ges_estancias?busq=B&pri=T&cod="+p_valor[0];
        document.getElementById("buscaestancia").style.visibility = 'hidden';
        document.getElementById('tabla_estancia').innerHTML="";
    }
}

function des_pabellon(){
        cod_habit=document.getElementById("habit").value;
        if(cod_habit!=""){
        ajax = ObjetoAjax();
        ajax.open("POST", "../verificar", true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send("ori=bus_deshabi&cod_hab="+cod_habit+"&control=2&prog=hosp");
        ajax.onreadystatechange=function() {
            if (ajax.readyState==4) {
                document.getElementById('txtpab').value = ajax.responseText;
            }
        }
        }else{
        document.getElementById('txtpab').value = "TODOS LOS PABELLONES";
        }

}

function redir_paciente(dest){
    document.location = "../ges_pacientes?dest="+dest;
}

function asi_permisourg(){

    permi=opener.document.getElementById("permis").value;
    par1=permi.substr(0,30);

    a=0;
    for (i=0;i<14;i++){
        vari=par1.split(",");
        a++;
        if(vari[i]=="s"){
            document.getElementById("urge"+a).checked = true;
        }else{
            document.getElementById("urge"+a).checked = false;
        }
    }


    ///////////////
    par2=permi.substr(30,8);

    a=0;
    for (i=0;i<4;i++){
        vari=par2.split(",");
        a++;
        if(vari[i]=="s"){
            document.getElementById("herra"+a).checked = true;
        }else{
            document.getElementById("herra"+a).checked = false;
        }
    }

}

function ver_modu(){
   window.open("../mod_administracion/ver_modulos.jsp","ventana_modulos","width=500, height=500, scrollbars=yes, menubar=no, location=no, resizable=no");
}


function nueva_uniFunc(){

    document.getElementById('accion').value="1";

    document.getElementById('txtcod').value="";
    document.getElementById('txtnomb').value="";
    document.getElementById('observa').value="";
    document.getElementById('observa').value="";
    document.getElementById('modulos').value="0";
    document.getElementById('confConta').value="0";

    document.getElementById('txtcod').disabled=false;
    document.getElementById('txtnomb').disabled=false;
    document.getElementById('observa').disabled=false;
    document.getElementById('excama').disabled=false;

    document.getElementById('btn_vmod').disabled=false;
    document.getElementById('btn_vmod').setAttribute("style", "color:black;padding:3px 15px 3px 15px;  margin: 0px 4px 4px 0px;");

//    document.getElementById('btn_vbod').disabled=false;
//    document.getElementById('btn_vbod').setAttribute("style", "color:black;padding:3px 15px 3px 15px;  margin: 0px 4px 4px 0px;");
//
//    document.getElementById('btn_adbode').disabled=false;
//    document.getElementById('btn_adbode').setAttribute("style", "color:black;padding:3px 15px 3px 15px;  margin: 0px 4px 4px 0px;");
//
//    document.getElementById('btn_dbode').disabled=false;
//    document.getElementById('btn_dbode').setAttribute("style", "color:black;padding:3px 15px 3px 15px;  margin: 0px 4px 4px 0px;");
//
//    document.getElementById('btn_concont').disabled=false;
//    document.getElementById('btn_concont').setAttribute("style", "color:black;padding:3px 15px 3px 15px;  margin: 0px 4px 4px 0px;");
//


    document.getElementById('btn_nuevo').setAttribute("style", "display:none");
    document.getElementById('btn_delete').setAttribute("style", "display:none");
    document.getElementById('btn_editar').setAttribute("style", "display:none");
    document.getElementById('btn_buscar').setAttribute("style", "display:none");
    document.getElementById('btn_guardar').setAttribute("style", "display:block");

    document.getElementById('txtcod').focus();

}

function sel_modulos(){
  var mod="";
var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){
        if(document.getElementsByName("seleccion")[contador].checked == true){
            mod=mod+"s-";
        }else{
            mod=mod+"n-";
        }
    }
    opener.document.getElementById('modulos').value=mod;
    self.close();
 }

function asig_modulos(){
    if(opener.document.getElementById('modulos').value!="0"){
        mod=opener.document.getElementById('modulos').value;
        pmodu=mod.split("-");

      if(pmodu[0]=="s"){
          document.getElementById('check1').checked=true;
      }else{
          document.getElementById('check1').checked=false;
      }

       if(pmodu[1]=="s"){
          document.getElementById('check2').checked=true;
      }else{
          document.getElementById('check2').checked=false;
      }

       if(pmodu[2]=="s"){
          document.getElementById('check3').checked=true;
      }else{
          document.getElementById('check3').checked=false;
      }

       if(pmodu[3]=="s"){
          document.getElementById('check4').checked=true;
      }else{
          document.getElementById('check4').checked=false;
      }

    }

}

function confcontable(){
   cod=document.getElementById('txtcod').value;
   nom=document.getElementById('txtnomb').value
   if(cod =="" && nom==""){
    alert("Debe Digitar un C\u00f3digo y una Descripci\u00f3n");
   }else{
        window.open("../mod_administracion/conf_contables.jsp?tit="+cod+" - "+nom,"ventana_contable","width=700, height=550, scrollbars=yes, menubar=no, location=no, resizable=no");
   }


}

function sel_confCont(){

cc=document.getElementById('txtcc').value;
dcc=document.getElementById('txtdcc').value;

insctaing=document.getElementById('insctaing').value;
if(insctaing==""){
    insctaing=" ";
}
insctaingdes=document.getElementById('insctaingdes').value;

insctacot=document.getElementById('insctacot').value;
if(insctacot==""){
    insctacot=" ";
}
insctacotdes=document.getElementById('insctacotdes').value;

insctagast=document.getElementById('insctagast').value;
if(insctagast==""){
    insctagast=" ";
}
insctagastdes=document.getElementById('insctagastdes').value;

ctasins=insctaing+"-"+insctaingdes+"-"+insctacot+"-"+insctacotdes+"-"+insctagast+"-"+insctagastdes;
alert(ctasins);

medctaing=document.getElementById('medctaing').value;
if(medctaing==""){
    medctaing=" ";
}
medctaingdes=document.getElementById('medctaingdes').value;

medctacot=document.getElementById('medctacot').value;
if(medctacot==""){
    medctacot=" ";
}
medctacotdes=document.getElementById('medctacotdes').value;

medctagat=document.getElementById('medctagat').value;
if(medctagat==""){
    medctagat=" ";
}
medctagatdes=document.getElementById('medctagatdes').value;

ctasmed=medctaing+"-"+medctaingdes+"-"+medctacot+"-"+medctacotdes+"-"+medctagat+"-"+medctagatdes;

param=cc+"/"+dcc+"/"+ctasins+"/"+ctasmed;

opener.document.getElementById('confConta').value=param;
self.close();

}

function asig_confCont(){

 param=opener.document.getElementById('confConta').value;

 if(param!="0"){

 pparam1=param.split("/");

 document.getElementById('txtcc').value=pparam1[0];
 document.getElementById('txtdcc').value=pparam1[1];

 pparam12=pparam1[2].split("-");

document.getElementById('insctaing').value=pparam12[0];
document.getElementById('insctaingdes').value=pparam12[1];

document.getElementById('insctacot').value=pparam12[2];
document.getElementById('insctacotdes').value=pparam12[3];

document.getElementById('insctagast').value=pparam12[4];
document.getElementById('insctagastdes').value=pparam12[5];

 pparam13=pparam1[3].split("-");

document.getElementById('medctaing').value=pparam13[0];
document.getElementById('medctaingdes').value=pparam13[1];

document.getElementById('medctacot').value=pparam13[2];
document.getElementById('medctacotdes').value=pparam13[3];

document.getElementById('medctagat').value=pparam13[4];
document.getElementById('medctagatdes').value=pparam13[5];
 }
}

function guardar_uniFunc(){

    acc=document.getElementById('accion').value;

    txtcod=document.getElementById('txtcod').value;
    txtnomb=document.getElementById('txtnomb').value;
    observa=document.getElementById('observa').value;
    var cam="";
    if(document.getElementById('excama').checked == true){
       cam="s";
    }else{
       cam="n";
    }
    mod=document.getElementById('modulos').value;
    confcont=document.getElementById('confConta').value;

    if(txtcod==""){
      alert("Digite el C\u00f3digo");
      document.getElementById("txtcod").focus();
    }else if(txtnomb==""){
      alert("Digite el Nombre de la Unidad Funcional");
      document.getElementById("txtnomb").focus();
    }else{
       var variables="txtcod=" + txtcod + "&txtnomb=" + txtnomb + "&observa=" + observa + "&cam=" + cam
           + "&mod=" + mod + "&confcont=" + confcont + "&acc=" + acc;
       guardar('../guardar_unidFunci',variables,'unidFunci');
    }
}


function editar_uniFunc(){

     document.getElementById('accion').value="2";
    document.getElementById('txtnomb').disabled=false;
    document.getElementById('observa').disabled=false;
    document.getElementById('excama').disabled=false;

    document.getElementById('btn_vmod').disabled=false;
    document.getElementById('btn_vmod').setAttribute("style", "color:black;padding:3px 15px 3px 15px;  margin: 0px 4px 4px 0px;");

//    document.getElementById('btn_vbod').disabled=false;
//    document.getElementById('btn_vbod').setAttribute("style", "color:black;padding:3px 15px 3px 15px;  margin: 0px 4px 4px 0px;");
//
//    document.getElementById('btn_adbode').disabled=false;
//    document.getElementById('btn_adbode').setAttribute("style", "color:black;padding:3px 15px 3px 15px;  margin: 0px 4px 4px 0px;");
//
//    document.getElementById('btn_dbode').disabled=false;
//    document.getElementById('btn_dbode').setAttribute("style", "color:black;padding:3px 15px 3px 15px;  margin: 0px 4px 4px 0px;");
//
//    document.getElementById('btn_concont').disabled=false;
//    document.getElementById('btn_concont').setAttribute("style", "color:black;padding:3px 15px 3px 15px;  margin: 0px 4px 4px 0px;");
//
    document.getElementById('btn_nuevo').setAttribute("style", "display:none");
    document.getElementById('btn_delete').setAttribute("style", "display:none");
    document.getElementById('btn_editar').setAttribute("style", "display:none");
    document.getElementById('btn_buscar').setAttribute("style", "display:none");
    document.getElementById('btn_guardar').setAttribute("style", "display:block");

    document.getElementById('txtnomb').focus();
}


function buscar_uniFunc(){
  window.open("../most_uniFuncional","ventana_uniFuncional","width=700, height=500, scrollbars=yes, menubar=no, location=no, resizable=no");
}

function Busqueda_unidFunc(){

 tip_bus=document.getElementById("t_bus").value;
 busq=  document.getElementById("busqueda").value;
 ajax = ObjetoAjax();
 ajax.open("POST", "../most_uniFuncional", true);
 ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
 ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&control=2");

 ajax.onreadystatechange=function() {
          if (ajax.readyState==4) {
                document.getElementById('td_tabla').innerHTML = ajax.responseText
            }
        }
}

function sel_unidFunc(){

 var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    window.opener.document.location="../ges_unidFuncional?busq=B&pri=T&cod="+valor;
    self.close();

}


function abrir_domicilios2(){
     window.open("../domiciolios?ori=confEmp&programa=gene","ventana_domicilios","width=550, height=580, scrollbars=no, menubar=no, location=no, resizable=no");
}

function guardar_confEmpr(){

    acc=document.getElementById('accion').value;
    txtnit=document.getElementById('txtnit').value;
    tpid=document.getElementById('tpid').value;
    txtnom=document.getElementById('txtnom').value;
    txtdir=document.getElementById('txtdir').value;
    txttel=document.getElementById('txttel').value;
    txtfax=document.getElementById('txtfax').value;
    txtcel=document.getElementById('txtcel').value;
    txtemail=document.getElementById('txtemail').value;
    txtcodsg=document.getElementById('txtcodsg').value;
    txtcodci=document.getElementById('txtcodci').value;
    txtciu=document.getElementById('txtciu').value;
    txtdepart=document.getElementById('txtdepart').value;
    txtvalsal=document.getElementById('txtvalsal').value.replace(".","").replace(".","").replace(",",".");
    codDiag=document.getElementById('codDiag').value;
    txtreg=document.getElementById('txtreg').value;
    txtconsr=document.getElementById('txtconsr').value;
    txtpcir=document.getElementById('txtpcir').value.replace(",",".");
    txtpanes=document.getElementById('txtpanes').value.replace(",",".");
    txtpayu=document.getElementById('txtpayu').value.replace(",",".");
    txtpsal=document.getElementById('txtpsal').value.replace(",",".");
    txtconsrexp=document.getElementById('txtconsrexp').value;
    txtbloq=document.getElementById('finicial').value;
    txtelab=document.getElementById('ffinal').value;
    ctaanest=document.getElementById('ctaanest').value;
    ctasalp=document.getElementById('ctasalp').value;
    ctaobstet=document.getElementById('ctaobstet').value;
    ctadsal=document.getElementById('ctadsal').value;
    ctacir=document.getElementById('ctacir').value;
    ctamate=document.getElementById('ctamate').value;
    ctacaja=document.getElementById('ctacaja').value;
    var cel="";

    if(document.getElementById('cel').value==true){
        cel="s";
    }else{
         cel="n";
    }

    if(txtnit==""){
        alert("Digite una Identificaci\u00f3n");
        document.getElementById("txtnit").focus();
    }else if(txtnom==""){
        alert("Digite el Nombre  de la Empresa");
        document.getElementById("txtnom").focus();
    }else{
        var variables="txtnit=" + txtnit + "&tpid=" + tpid + "&txtnom=" + txtnom + "&txtdir=" + txtdir + "&txttel=" + txttel
        + "&txtfax=" + txtfax + "&txtcodsg=" + txtcodsg  + "&txtcodci=" + txtcodci  + "&txtciu=" + txtciu + "&txtdepart=" + txtdepart + "&txtvalsal=" + txtvalsal
        + "&codDiag=" + codDiag + "&txtreg=" + txtreg  + "&txtconsr=" + txtconsr  + "&txtpcir=" + txtpcir + "&txtpanes=" + txtpanes + "&txtpayu=" + txtpayu
        + "&txtpsal=" + txtpsal + "&txtconsrexp=" + txtconsrexp  + "&txtbloq=" + txtbloq  + "&txtelab=" + txtelab + "&ctaanest=" + ctaanest + "&ctasalp=" + ctasalp
        + "&ctaobstet=" + ctaobstet + "&ctadsal=" + ctadsal  + "&ctacir=" + ctacir  + "&ctamate=" + ctamate + "&ctacaja=" + ctacaja + "&cel=" + cel + "&txtcel="+txtcel
        + "&acc="+acc + "&txtemail="+txtemail;
        guardar('../guardar_confEmpre',variables,'confEmpre');
    }
}

function editar_confEmpr(){
    document.getElementById('accion').value="2";
    document.getElementById('btn_editar').setAttribute("style", "display:none");
    document.getElementById('btn_guardar').setAttribute("style", "display:block");

  }

  function buscar_admi(ori){

 cargarAdministradoras(ori);
 document.getElementById('buscaAdmin').style.visibility = 'visible';
 location.href="#buscaAdmin";
//      window.open("../most_admin","ventana_admin","width=900, height=580, scrollbars=YES, menubar=no, location=no, resizable=no");

  }

  function cargarAdministradoras(ori){

    ajax = ObjetoAjax();
    ajax.open("POST", "../most_admin", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("ori="+ori);
    ajax.onreadystatechange=function() {
          if (ajax.readyState==4) {
                document.getElementById('td_administradoras').innerHTML = ajax.responseText
            }
        }
  }

  function Busqueda_admi(ori){

    tip_bus=document.getElementById("t_bus").value;
    busq=  document.getElementById("busqueda").value;
    ajax = ObjetoAjax();
    ajax.open("POST", "../most_admin", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&control=2&ori="+ori);
    ajax.onreadystatechange=function() {
          if (ajax.readyState==4) {
                document.getElementById('td_administradoras').innerHTML = ajax.responseText
            }
        }
  }

  function sel_admin(){
  var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    document.location="../ges_administradora?busq=B&pri=T&cod="+valor;
    Cerrarpopu('buscaAdmin')


  }


  function buscar_usuario(prog,ori){
    window.open("../most_usuarios?ori="+ori+"&programa="+prog,"ventana_admin","width=900, height=580, scrollbars=YES, menubar=no, location=no, resizable=no");
  }

  function buscar_prestador(ori){
    window.open("../sel_presturge?ori="+ori,"ventana_prestadores","width=900, height=580, scrollbars=YES, menubar=no, location=no, resizable=no");
  }

  function Busqueda_usu(){

    tip_bus=document.getElementById("t_bus").value;
    busq=  document.getElementById("busqueda").value;
    ori=  document.getElementById("ori").value;
    programa=  document.getElementById("prog").value;
    ajax = ObjetoAjax();
    ajax.open("POST", "../most_usuarios", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&control=2&ori="+ori+"&programa="+programa);
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_tabla').innerHTML = ajax.responseText
        }
    }

  }

  function sel_usuario(){

    ori=document.getElementById("ori").value;

       var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    fvalor=valor.split("//");
    if(ori=="infserv"){
      opener.document.getElementById("txtpres").value=fvalor[1];
      opener.document.getElementById("txtusuario").value=fvalor[0];
    }else if(ori=="ripsC"){
        opener.document.getElementById("txtpres").value=fvalor[1];
      opener.document.getElementById("txtusuario").value=fvalor[0];
    }else{
    window.opener.document.location="../ges_usuario?busq=B&pri=T&cod="+fvalor[0];
    }
    self.close();

  }

  function cambio_contra(){

     window.open("../mod_administracion/cambio_contra.jsp","ventana_cambioContra","width=520, height=440, scrollbars=YES, menubar=no, location=no, resizable=no");

  }

  function verf_contr(){

    usu=  document.getElementById("usuario").value;
    txtcontAct=  document.getElementById("txtcontAct").value;
    ajax = ObjetoAjax();
    ajax.open("POST", "../verificar", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("usu="+usu+"&txtcontAct="+txtcontAct+"&ori=contra");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            res = ajax.responseText
            if(res==0){
                alert("Verifique su Contrase\u00f1a Actual");
                document.getElementById("txtcontAct").value="";
                document.getElementById("txtcontAct").focus();

            }
        }
    }
  }

  function guar_cambCont(){

    usu = document.getElementById("usuario").value;
    txtcontranue=  document.getElementById("txtcontranue").value;
    ajax = ObjetoAjax();
    ajax.open("POST", "../guar_contra", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("usu="+usu+"&txtcontranue="+txtcontranue);
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            res = trimAll(ajax.responseText);
            if(res=="bien"){
                alert("Operaci\u00f3n Realizada Exitosamente");
                self.close();
            }else{
                alert("Error al Realizar la Operaci\u00f3n");
            }
        }
    }
  }

function act_usu(){
    if(document.getElementById('gusu').checked==true){
        document.getElementById('txtcontranue').disabled=false;
        document.getElementById('txtcontranue1').disabled=false;
        document.getElementById('selecperfil').disabled=false;
        document.getElementById('txtlogin').disabled=false;
    }else{
        document.getElementById('txtcontranue').disabled=true;
        document.getElementById('txtcontranue1').disabled=true;
        document.getElementById('selecperfil').disabled=true;
        document.getElementById('txtlogin').disabled=true;

        document.getElementById('txtcontranue').value="*****";
        document.getElementById('txtcontranue1').value="*****";
        document.getElementById('selecperfil').selectedIndex=0;
        document.getElementById('txtlogin').value="";
    }

}

function abrir_pacientes(ori){

  prog=  document.getElementById('prog').value;
  window.open("../select_paciente?prog="+prog+"&ori_pac="+ori,"ventana_pacientes","width=900, height=580, scrollbars=YES, menubar=no, location=no, resizable=no");
}

function abrir_plan_admin(){
   window.open("../plan_admin","ventana_planes_admin","width=600, height=500, scrollbars=YES, menubar=no, location=no, resizable=no");
}

function sel_plan_admin(){
   var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    pplan=valor.split("//");

    opener.document.getElementById('txtplan').value=pplan[0];
    opener.document.getElementById('txtnompla').value=pplan[1];
    self.close();
}


function buspacient(ori){
    var id_pac="";
    var txtide=document.getElementById('id_pac').value;
    ajax=ObjetoAjax();
    ajax.open("POST", "../buscidpac", true);
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("txtide="+txtide);
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            id_pac=trimAll(ajax.responseText);
            if(id_pac!=""){
                buscdescgen(id_pac,ori);
            }else{
                alert("El Paciente ("+txtide+") no se Encuentra Registrado, Verifique...");
                document.getElementById('id_pac').value="";
                document.getElementById('id_pac').focus();
            }
        }
    }
}

function buscdescgen(id,ori){
    ajax = ObjetoAjax();
    ajax.open("POST", "../cons_pacient", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("ident="+id);
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            res = ajax.responseText;

            if(trimAll(res)=="no"){
                alert("El Paciente no se encuentra activo, Verifique...");
            }else{
                par_pac=res.split("//");

                if(ori=="fact_ind"){
                    document.getElementById('id_pac').value=par_pac[0];
                    document.getElementById('txtcod').value=par_pac[1];
                    document.getElementById('txtnom').value=par_pac[2];
                    document.getElementById('txttusu').value=par_pac[3];

                    /////////////planes paciente

                    if(trimAll(par_pac[5])=="0"){
                        alert("El Papciente no Tiene Administradoras Asociadas, Desea Asociarselas ahora?");
                    }else if(trimAll(par_pac[5])=="1"){
                        p_res=par_pac[6].split("#/");
                        ffin=p_res[6].split("-");
                        fini=p_res[5].split("-");

                        if(parseInt(p_res[2])<0){
                            alert("El Contrato no ha Iniciado, La Fecha de Inicio del Contrato es "+fini[2]+"/"+fini[1]+"/"+fini[0]+", Verifique el Contrato");
                            document.getElementById("unfunc").focus();

                        }else if(parseInt(p_res[3])<0){
                            alert("El Contrato se Encuentra Vencido, La Fecha de Finalizacion del Contrato es "+ffin[2]+"/"+ffin[1]+"/"+ffin[0]+", Verifique el Contrato");
                            document.getElementById("unfunc").focus();
                        }
                        else{

                            document.getElementById("txtnomadm").value=p_res[1];
                            document.getElementById("txtnomplan").value=p_res[0];
                            document.getElementById("txtregadmin").value=p_res[4];
                            document.getElementById("unfunc").focus();
                        }
                    }else{
                       document.getElementById('td_planes').innerHTML =par_pac[5];
//                       document.getElementById("conte").style.visibility = 'hidden';
                       document.getElementById('selPlanes').style.visibility = 'visible';
                    }
                }else if(ori=="asig_med"){
                     document.getElementById('id_pac').value=par_pac[0];
                    document.getElementById('txtcod').value=par_pac[1];
                    document.getElementById('txtnom').value=par_pac[2];
                    document.getElementById('txttusu').value=par_pac[3];
                    document.getElementById('txtniv').value=par_pac[4];
                    document.getElementById('txtreg').value=par_pac[14];

                    /////////////planes paciente

                    if(trimAll(par_pac[5])=="0"){
                        alert("El Papciente no Tiene Administradoras Asociadas, Desea Asociarselas ahora?");
                    }else if(trimAll(par_pac[5])=="1"){
                        p_res=par_pac[6].split("#/");
                        ffin=p_res[6].split("-");
                        fini=p_res[5].split("-");

                        if(parseInt(p_res[2])<0){
                            alert("El Contrato no ha Iniciado, La Fecha de Inicio del Contrato es "+fini[2]+"/"+fini[1]+"/"+fini[0]+", Verifique el Contrato");
                            document.getElementById("unfunc").focus();

                        }else if(parseInt(p_res[3])<0){
                            alert("El Contrato se Encuentra Vencido, La Fecha de Finalizacion del Contrato es "+ffin[2]+"/"+ffin[1]+"/"+ffin[0]+", Verifique el Contrato");
                            document.getElementById("unfunc").focus();
                        }
                        else{

                            document.getElementById("txtnomadm").value=p_res[1];
                            document.getElementById("txtnomplan").value=p_res[0];
                            document.getElementById("txtregadmin").value=p_res[4];
                            document.getElementById("unfunc").focus();
                        }
                    }else{
                       document.getElementById('td_planes').innerHTML =par_pac[5];
//                       document.getElementById("conte").style.visibility = 'hidden';
                       document.getElementById('selPlanes').style.visibility = 'visible';
                    }
                }else if(ori=="rips_consul"){
                    document.getElementById('id_pac').value=par_pac[0];
                    document.getElementById('txtcod').value=par_pac[1];
                    document.getElementById('txtnom').value=par_pac[2];
                    document.getElementById('sex').value=par_pac[10];
                    document.getElementById('edad').value=par_pac[9];
                  if(par_pac[11]==0){
                  alert("El Paciente no tiene RIPS de Consultas Pendientes");
                  }else{
                      document.getElementById('consul').innerHTML=par_pac[11];
                  }

             }else if(ori=="rips_proce"){
                    document.getElementById('id_pac').value=par_pac[0];
                    document.getElementById('txtcod').value=par_pac[1];
                    document.getElementById('txtnom').value=par_pac[2];
                    document.getElementById('sex').value=par_pac[10];
                    document.getElementById('edad').value=par_pac[9];
                  if(par_pac[12]==0){
                  alert("El Paciente no tiene RIPS de Procedimientos Pendientes");
                  }else{
                      document.getElementById('proce').innerHTML=par_pac[11];
                  }
             }else if(ori=="rips_urge"){
                  document.getElementById('id_pac').value=par_pac[0];
                  document.getElementById('txtcod').value=par_pac[1];
                  document.getElementById('txtnom').value=par_pac[2];
                 if(par_pac[11]==0){
                  alert("El Paciente no tiene RIPS de Urgencia Pendientes");
                  }else{
                      document.getElementById('consul').innerHTML=par_pac[11];
                  }

             }else if(ori=="dat_hospi"){
                    document.getElementById('id_pac').value=par_pac[0];
                    document.getElementById('txtcod').value=par_pac[1];
                    document.getElementById('txtnom').value=par_pac[2];
                    document.getElementById('txttusu').value=par_pac[3];
                    document.getElementById('txtniv').value=par_pac[4];
                    document.getElementById('txtreg').value=par_pac[14];

                        /////////////planes paciente

                    if(trimAll(par_pac[5])=="0"){
                        alert("El Papciente no Tiene Administradoras Asociadas, Desea Asociarselas ahora?");
                    }else if(trimAll(par_pac[5])=="1"){
                        p_res=par_pac[6].split("#/");

                        ffin=p_res[6].split("-");
                        fini=p_res[5].split("-");

                        if(parseInt(p_res[2])<0){
                            alert("El Contrato no ha Iniciado, La Fecha de Inicio del Contrato es "+fini[2]+"/"+fini[1]+"/"+fini[0]+", Verifique el Contrato");
                            document.getElementById("unfunc").focus();
                        }else if(parseInt(p_res[3])<0){
                            alert("El Contrato se Encuentra Vencido, La Fecha de Finalizacion del Contrato es "+ffin[2]+"/"+ffin[1]+"/"+ffin[0]+", Verifique el Contrato");
                            document.getElementById("unfunc").focus();
                        }else{
                            document.getElementById("txtnomadm").value=p_res[1];
                            document.getElementById("txtnomplan").value=p_res[0];
                            document.getElementById("txtregad").value=p_res[4];
                            document.getElementById("buscapacientes").style.visibility = 'hidden';
                            document.getElementById('conte').style.visibility = 'visible';
                            document.getElementById("busqueda").value="";
                            document.getElementById('td_tabla').innerHTML="";
                            document.getElementById('btn_nuevo').setAttribute("style", "display:block;");
                        }
                    }else{
//                       alert(par_pac[5]);
                       document.getElementById('td_planes').innerHTML =par_pac[5];
//                       document.getElementById("conte").style.visibility = 'hidden';
                       document.getElementById('selPlanes').style.visibility = 'visible';
                    }

             }else{
                    document.getElementById('id_pac').value=par_pac[0];
                    document.getElementById('txtcod').value=par_pac[1];
                    document.getElementById('txtnom').value=par_pac[2];
                    document.getElementById('txttusu').value=par_pac[3];
                    document.getElementById('txtniv').value=par_pac[4];

                    /////////////planes paciente

                    if(trimAll(par_pac[5])=="0"){
                        alert("El Papciente no Tiene Administradoras Asociadas, Desea Asociarselas ahora?");
                    }else if(trimAll(par_pac[5])=="1"){
                        p_res=par_pac[6].split("#/");
                        ffin=p_res[6].split("-");
                        fini=p_res[5].split("-");

                        if(parseInt(p_res[2])<0){
                            alert("El Contrato no ha Iniciado, La Fecha de Inicio del Contrato es "+fini[2]+"/"+fini[1]+"/"+fini[0]+", Verifique el Contrato");
                            document.getElementById("unfunc").focus();
                        }else if(parseInt(p_res[3])<0){
                            alert("El Contrato se Encuentra Vencido, La Fecha de Finalizacion del Contrato es "+ffin[2]+"/"+ffin[1]+"/"+ffin[0]+", Verifique el Contrato");
                            document.getElementById("unfunc").focus();
                        }else{
                            document.getElementById("txtnomadm").value=p_res[1];
                            document.getElementById("txtnomplan").value=p_res[0];
                            document.getElementById("txtreg").value=p_res[4];
                            document.getElementById('contenido').innerHTML =p_res[7];
                            document.getElementById("unfunc").focus();
                            document.getElementById('btn_nuevo').setAttribute("style", "display:block;width: 60px;");
                            document.getElementById('btn_cancelar').setAttribute("style", "display:block;width: 60px;");
                            if(p_res[8]=="s"){
                            opener.document.getElementById('btn_facturar').setAttribute("style", "display:none;width: 60px;");
                            opener.document.getElementById('btn_orden').setAttribute("style", "display:block;width: 60px;");
                            }else{
                            opener.document.getElementById('btn_facturar').setAttribute("style", "display:block;width: 60px;");
                            opener.document.getElementById('btn_orden').setAttribute("style", "display:none;width: 60px;");
                            }
                        }
                    }else{
                       document.getElementById('td_planes').innerHTML =par_pac[5];
                       document.getElementById("conte").style.visibility = 'hidden';
                       document.getElementById('selPlanes').style.visibility = 'visible';
                   }
                }
            }
        }
    }
}


function sel_pacie(){

    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    ppaci=valor.split("//");

    if(document.getElementById('ori_pac').value=="ges_pac"){
        dest=document.getElementById('dest').value
        window.opener.document.location="../ges_pacientes?busq=B&pri=T&cod="+ppaci[1]+"&dest="+dest;

    }else if(document.getElementById('ori_pac').value=="edir_reg"){
        opener.document.getElementById('id_pac').value=ppaci[0];
        opener.document.getElementById('txtnom').value=ppaci[1]+" - "+ppaci[2];
        self.close();
    }else if(document.getElementById('ori_pac').value=="fac_urg_ind"){
        ajax = ObjetoAjax();
        ajax.open("POST", "../cons_pacient", true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send("ident="+ppaci[1]);
        ajax.onreadystatechange=function() {
            if (ajax.readyState==4) {
                res = ajax.responseText;
                if(trimAll(res)=="no"){
                    alert("El Paciente no se encuentra activo, Verifique...");
                    self.close();
                }else{
                  par_pac=res.split("//");
                  opener.document.getElementById('id_pac').value=par_pac[0];
                  opener.document.getElementById('txtcod').value=par_pac[1];
                  opener.document.getElementById('txtnom').value=par_pac[2];
                  opener.document.getElementById('txttusu').value=par_pac[3];
                  opener.document.getElementById('plan').innerHTML =par_pac[8];
                  self.close();
                }
            }
        }

    }else if(document.getElementById('ori_pac').value=="recaudo"){
        opener.document.getElementById('id_pac').value=ppaci[0];
        opener.document.getElementById('txtcod').value=ppaci[1];
        opener.document.getElementById('txtnom').value=ppaci[2];
        self.close();
    }else if(document.getElementById('ori_pac').value=="rips_cons"){

          ajax = ObjetoAjax();
        ajax.open("POST", "../cons_pacient", true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send("ident="+ppaci[1]);
        ajax.onreadystatechange=function() {
            if (ajax.readyState==4) {
                res = ajax.responseText;
                if(trimAll(res)=="no"){
                    alert("El Paciente no se encuentra activo, Verifique...");
                    self.close();
                }else{
                  par_pac=res.split("//");
                  opener.document.getElementById('id_pac').value=par_pac[0];
                  opener.document.getElementById('txtcod').value=par_pac[1];
                  opener.document.getElementById('txtnom').value=par_pac[2];
                  opener.document.getElementById('sex').value=par_pac[10];
                  opener.document.getElementById('edad').value=par_pac[9];
                  if(par_pac[11]==0){
                  alert("El Paciente no tiene RIPS de Consultas Pendientes");
                  }else{
                      opener.document.getElementById('consul').innerHTML=par_pac[11];
                  }

                  self.close();
                }
            }
        }
    }else if(document.getElementById('ori_pac').value=="rips_urg"){

          ajax = ObjetoAjax();
        ajax.open("POST", "../cons_pacient", true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send("ident="+ppaci[1]);
        ajax.onreadystatechange=function() {
            if (ajax.readyState==4) {
                res = ajax.responseText;
                if(trimAll(res)=="no"){
                    alert("El Paciente no se encuentra activo, Verifique...");
                    self.close();
                }else{
                  par_pac=res.split("//");
                  opener.document.getElementById('id_pac').value=par_pac[0];
                  opener.document.getElementById('txtcod').value=par_pac[1];
                  opener.document.getElementById('txtnom').value=par_pac[2];

                  if(par_pac[11]==0){
                  alert("El Paciente no tiene RIPS de Urgencia Pendientes");
                  }else{
                      opener.document.getElementById('consul').innerHTML=par_pac[11];
                  }
                 self.close();
                }
            }
        }
    }else if(document.getElementById('ori_pac').value=="rips_proce"){


         ajax = ObjetoAjax();
        ajax.open("POST", "../cons_pacient", true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send("ident="+ppaci[1]);
        ajax.onreadystatechange=function() {
            if (ajax.readyState==4) {
                res = ajax.responseText;
                if(trimAll(res)=="no"){
                    alert("El Paciente no se encuentra activo, Verifique...");
                    self.close();
                }else{
                  par_pac=res.split("//");
                  opener.document.getElementById('id_pac').value=par_pac[0];
                  opener.document.getElementById('txtcod').value=par_pac[1];
                  opener.document.getElementById('txtnom').value=par_pac[2];
                  opener.document.getElementById('sex').value=par_pac[10];
                  opener.document.getElementById('edad').value=par_pac[9];
                  if(par_pac[12]==0){
                  alert("El Paciente no tiene RIPS de Procedimientos Pendientes");
                  }else{
                      opener.document.getElementById('proce').innerHTML=par_pac[12];
                  }

                  self.close();
                }
            }
        }
    }else{
        ajax = ObjetoAjax();
        ajax.open("POST", "../cons_pacient", true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send("ident="+ppaci[1]);
        ajax.onreadystatechange=function() {
            if (ajax.readyState==4) {
                res = ajax.responseText;

                if(trimAll(res)=="no"){
                    alert("El Paciente no se encuentra activo, Verifique...");
                    self.close();
                }else{
                    par_pac=res.split("//");

                    opener.document.getElementById('id_pac').value=par_pac[0];
                    opener.document.getElementById('txtcod').value=par_pac[1];
                    opener.document.getElementById('txtnom').value=par_pac[2];
                    opener.document.getElementById('txttusu').value=par_pac[3];
                    opener.document.getElementById('txtniv').value=par_pac[4];


                    if(trimAll(par_pac[5])=="0"){
                        alert("El Papciente no Tiene Administradoras Asociadas, Desea Asociarselas ahora?");
                    }else if(trimAll(par_pac[5])=="1"){
                        p_res=par_pac[6].split("#/");
                        ffin=p_res[6].split("-");
                        fini=p_res[5].split("-");

                        if(parseInt(p_res[2])<0){
                            alert("El Contrato no ha Iniciado, La Fecha de Inicio del Contrato es "+fini[2]+"/"+fini[1]+"/"+fini[0]+", Verifique el Contrato");
                            opener.document.getElementById("unfunc").focus();
                            self.close();
                        }else if(parseInt(p_res[3])<0){
                            alert("El Contrato se Encuentra Vencido, La Fecha de Finalizacion del Contrato es "+ffin[2]+"/"+ffin[1]+"/"+ffin[0]+", Verifique el Contrato");
                            opener.document.getElementById("unfunc").focus();

                            self.close();
                        }else{
                            opener.document.getElementById("txtnomadm").value=p_res[1];
                            opener.document.getElementById("txtnomplan").value=p_res[0];
                            opener.document.getElementById("txtreg").value=p_res[4];
                            opener.document.getElementById('contenido').innerHTML =p_res[7];
                            opener.document.getElementById("unfunc").focus();
                            opener.document.getElementById('btn_nuevo').setAttribute("style", "display:block;width: 60px;");
                            opener.document.getElementById('btn_cancelar').setAttribute("style", "display:block;width: 60px;");
                            if(p_res[13]=="s"){
                            opener.document.getElementById('btn_facturar').setAttribute("style", "display:block;width: 60px;");
                            opener.document.getElementById('btn_orden').setAttribute("style", "display:none;width: 60px;");
                            }else{
                            opener.document.getElementById('btn_facturar').setAttribute("style", "display:none;width: 60px;");
                            opener.document.getElementById('btn_orden').setAttribute("style", "display:block;width: 60px;");
                            }
                            self.close();
                        }
                    }else{

                        document.getElementById('td_tabla').innerHTML = "" ;
                        document.getElementById('td_tabla2').innerHTML = par_pac[5];
                        document.getElementById('content').setAttribute("style", "display:none");
                        document.getElementById('content2').setAttribute("style", "display:block");
                        document.getElementById('btn_guardar1').setAttribute("style", "display:none;");
                        document.getElementById('btn_guardar2').setAttribute("style", "display:block;");
                    }
                }
            }
        }
    }
}

function asig_planes(){
  planes=document.getElementById("planes").value;

   if(planes!="0"){
        var par_planes=planes.split(";");
        tam=par_planes.length;
        for(var r = 0; r < tam-1; r++) {
            pla = par_planes[r].split("#");
            planPacien(pla[0],pla[1],pla[2],'3')
        }
    }

}

function asig_planpaci2(){
    var num_elementos = opener.document.getElementsByName("cod").length;

    if(num_elementos!="0"){

        for( contador=0; contador < num_elementos; contador++ ){
            cod =opener.document.getElementsByName("cod")[contador].value;
            des_adm =opener.document.getElementsByName("des_adm")[contador].value;
            desc_plan =opener.document.getElementsByName("des_plan")[contador].value;

            planPacien(cod,des_adm,desc_plan,'1')
        }
    }
}

function abrirPlanPaci(ident){

    ajax = ObjetoAjax();
    ajax.open("POST", "../cons_Planespac", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("ident="+ident);
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            res = ajax.responseText;
            if(trimAll(res)=="0"){
               alert("El Paciente no Tiene Administradoras Asociadas, Desea Asociarselas ahora?");
            }else{
                p_res=res.split("#");
                ffin=p_res[6].split("-");
                fini=p_res[5].split("-");

                if(parseInt(p_res[2])<0){
                    alert("El Contrato no ha Iniciado, La Fecha de Inicio del Contrato es "+fini[2]+"/"+fini[1]+"/"+fini[0]+", Verifique el Contrato");
                    document.getElementById("unfunc").focus();
                }else if(parseInt(p_res[3])<0){
                    alert("El Contrato se Encuentra Vencido, La Fecha de Finalizacion del Contrato es "+ffin[2]+"/"+ffin[1]+"/"+ffin[0]+", Verifique el Contrato");
                    document.getElementById("unfunc").focus();
                }else{
                    document.getElementById("txtnomadm").value=p_res[1];
                    document.getElementById("txtnomplan").value=p_res[0];
                    document.getElementById("txtreg").value=p_res[4];
                    document.getElementById("unfunc").focus();
                    document.getElementById('btn_nuevo').setAttribute("style", "display:block");
                    document.getElementById('btn_cancelar').setAttribute("style", "display:block");

                }
            }
        }
    }


}

function isNum(arg)
{
	var args = arg;

	if (args == "" || args == null || args.length == 0)
	{
		return false;
	}

	args = args.toString();

	for (var i = 0;  i<args.length;  i++)
	{
		if ((args.substring(i,i+1) < "0" || args.substring(i, i+1) > "9") && args.substring(i, i+1) != ".")
		{
		return false;
		}
	}
	return true;
}

function checkday(aa)
{
	var val = aa.value;
	var valc = val.substring(0,1);

	if(val.length>0 && val.length<3)
	{
		if(!isNum(val) || val == 0)
		{
			aa.value="";
		}
		else if( val < 1 || val > 31)
		{
			aa.value=valc;
		}
	}
	else if(val.length>2)
	{
		val = val.substring(0, 2);
		aa.value=val;
	}

}

function checkmon(aa)
{
	var val = aa.value;
	var valc = val.substring(0,1);

	if(val.length>0 && val.length<3)
	{
		if(!isNum(val) || val == 0)
		{
			aa.value="";
		}
		else if(val < 1 || val > 12)
		{
			aa.value=valc;
		}
	}
	else if(val.length>2)
	{
		val = val.substring(0, 2);
		aa.value=val;
	}
}

function checkyear(aa)
{
	var val = aa.value;
	var valc = val.substring(0,(val.length-1));

	if(val.length>0 && val.length<7)
	{
		if(!isNum(val) || val == 0)
		{
			aa.value=valc;
		}
		else if(val < 1 || val>275759)
		{
			aa.value="";
		}
	}
	else if(val.length>4)
	{
		aa.value=valc;
	}
}

function checkleapyear(datea)
{
	if(datea.getYear()%4 == 0)
	{
		if(datea.getYear()% 10 != 0)
		{
			return true;
		}
		else
		{
			if(datea.getYear()% 400 == 0)
				return true;
			else
				return false;
		}
	}
return false;
}

function DaysInMonth(Y, M) {
    with (new Date(Y, M, 1, 12)) {
      setDate(-2);
      return getDate();
    }
}

function datediff(date1, date2)
{
    var y1 = date1.getFullYear(), m1 = date1.getMonth(), d1 = date1.getDate(),
        y2 = date2.getFullYear(), m2 = date2.getMonth(), d2 = date2.getDate();
    if (d1 < d2)
    {
        m1--;
        d1 += DaysInMonth(y2, m2);
    }
    if (m1 < m2)
    {
        y1--;
        m1 += 12;
    }
    return [y1 - y2, m1 - m2, d1 - d2];
}

function calcular_edad(value)
{
    //     ahora_anio = fecha_hoy.getYear();
    //    ahora_mes = fecha_hoy.getMonth();
    //    ahora_dia = fecha_hoy.getDate();
    //

    var fla="1";
    fecha=document.getElementById("fnac").value;

    ffecha=fecha.split("/");
    var hoy = new Date();
    var curday = hoy.getDate();
    var curmon = hoy.getMonth()+1;
    var curyear = hoy.getFullYear();
    //        alert(hoy);

    var calday = ffecha[0];
    var calmon = ffecha[1];
    var calyear = ffecha[2];
    //        alert(calyear);

    if(curyear==calyear){

        if(calmon>curmon){
            //               alert(parseInt(calmon)+">"+curmon);
            fla="0";
        }
    }
    if(fla=="1"){

        if(curday == "" || curmon=="" || curyear=="" || calday=="" || calmon=="" || calyear=="")
        {
            alert("Seleccione la Fecha de Nacimiento");
            document.getElementById("umed").selectedIndex=0;
        }
        else
        {
            var curd = new Date(curyear,curmon-1,curday);
            var cald = new Date(calyear,calmon-1,calday);

            var diff =  Date.UTC(curyear,curmon-1,curday,0,0,0)
            - Date.UTC(calyear,calmon-1,calday,0,0,0);

            var dife = datediff(curd,cald);
            if(checkleapyear(cald)==true)
            {
                if(value=="1"){
                    if(dife[0]>0){
                        document.getElementById("edad").value=dife[0];
                    }
                }

            //                        alert(dife[0]+" years, "+dife[1]+" months, and "+dife[2]+" days");

            }else{
                if(value=="1"){
                    if(dife[0]>0){
                        document.getElementById("edad").value=dife[0];
                    }else{
                        alert("Cambie la Unidad de Medida por Meses");
                        document.getElementById("edad").value="";
                        document.getElementById("umed").selectedIndex=0;
                    }
                //			alert(dife[0]+" years, "+dife[1]+" months, and "+dife[2]+" days");
                }else if(value=="2"){
                    if(dife[0]>0){
                        alert("La edad en meses no Puede ser Mayor de 12 meses, Cambie la Unidad de Medida por A\u00f1os");
                        document.getElementById("edad").value="";
                        document.getElementById("umed").selectedIndex=0;
                    }else if(dife[1]==0){
                        alert("La edad en meses no Puede ser Menor de 30 dias, Cambie la Unidad de Medida por D\u00edas");
                        document.getElementById("edad").value="";
                        document.getElementById("umed").selectedIndex=0;
                    }else{
                        document.getElementById("edad").value=dife[1];
                    }
                }else if(value=="3"){
                    if(dife[1]>1){
                        alert("La edad en meses no Puede ser Mayor de 30 dias, Cambie la Unidad de Medida por Meses");
                        document.getElementById("edad").value="";
                        document.getElementById("umed").selectedIndex=0;
                    }else{
                        document.getElementById("edad").value=dife[2];
                    }
                }

                valedadxid(document.getElementById("edad").value);

                var secleft = diff/1000/60;
                //document.cir.val3.value=secleft+" minutes since your birth";

                var hrsleft = secleft/60;
                //document.cir.val2.value=hrsleft+" hours since your birth";

                var daysleft = hrsleft/24;
                document.cir.val1.value=daysleft+" days gap";

                //alert(""+parseInt(calyear)+"--"+dife[0]+"--"+1);
                var as = parseInt(calyear)+dife[0]+1;
            }
        }
    }else{
        alert("Verifique que la Fecha de Nacimiento no sea Mayor que a la Fecha Actual");
    }
}

function uedadfun(opc){
    if(opc=="0"){
        document.getElementById("txtuini").value="0"
    }else if(opc=="0"){
        document.getElementById("txtufin").value="0"
    }
}

function buscar_proc(prog,ori){
   window.open("../most_procedimientos?programa="+prog+"&ori="+ori,"ventana_procedimientos","width=900, height=580, scrollbars=YES, menubar=no, location=no, resizable=no");
}

function Busqueda_ProcHosp(){
    tip_bus=document.getElementById("t_bus_proc").value;
    busq=  document.getElementById("busqueda_proc").value;
    programa=  document.getElementById("infserv").value;
    plan=  document.getElementById("txtnomplan").value;
    ajax = ObjetoAjax();
    ajax.open("POST", "../most_procHosp", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&prog="+programa+"&plan="+plan+"&tcon=3&ori=norm");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_procedimientos').innerHTML = ajax.responseText
        }
    }
}

function Busqueda_Proc(){
    tip_bus=document.getElementById("t_busProc").value;
    busq=  document.getElementById("busquedaProc").value;
    
    ajax = ObjetoAjax();
    ajax.open("POST", "../most_procedimientos", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&tcon=3&ori=norm");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_procedimientos').innerHTML = ajax.responseText
        }
    }

}

function sel_procHosp(){


    infserv= document.getElementById("infserv").value;

    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    pproc=valor.split("//");


    if(infserv=="infservhospcons"){
        document.getElementById("servsel").value=valor;
        document.getElementById("txtcodcons").value=pproc[0];
        document.getElementById("txtcons").value=pproc[1];
        document.getElementById("txtval").value=pproc[2];
        document.getElementById("txtcmod").value=pproc[3];
        document.getElementById("txttot").value=pproc[5];
        if(document.getElementById("procpyp")!=null){
           document.getElementById("id_proc").value=pproc[6];
           verfprog(pproc[6],'1');
        }
        if(document.getElementById("tplan").value=="1"){
          habtfact("s");  
        }else{
          habtfact("n");
        }        
    }else if(infserv=="infservhospproc"){
        document.getElementById("servselproc").value=valor;
        document.getElementById("txtcodconsproc").value=pproc[0];
        document.getElementById("txtconsproc").value=pproc[1];
        document.getElementById("txtvalproc").value=pproc[2];
        document.getElementById("txtcmodproc").value=pproc[3];
        document.getElementById("txtcopproc").value=pproc[4];
        document.getElementById("txttotproc").value=pproc[5];
        if(document.getElementById("procpyp")!=null){
            document.getElementById("id_proc").value=pproc[6];
            verfprog(pproc[6],'2');
        }
        if(document.getElementById("tplan").value=="1"){
          habtfact("s");  
        }else{
          habtfact("n");
        } 
    }else if(infserv=="MostProcEdit"){
       
        document.getElementById("servsel").value=valor;
        document.getElementById("txtcodconsproc").value=pproc[0];
        document.getElementById("txtconsproc").value=pproc[1];
        document.getElementById("txtval").value=pproc[2];
        document.getElementById("txtcmod").value=pproc[3];
        document.getElementById("txttot").value=pproc[5];

    }else{
        window.opener.document.location="../ges_procedimientos?busq=B&pri=T&cod="+pproc[0];
    }
    Cerrarpopu('buscaprocedimientos');
}

function buscProgramas(){
  id_proc=document.getElementById("id_proc").value;
  tiprips=document.getElementById("tiprips").value;
  verfprog(id_proc,tiprips);
}

function verfprog(cod_proc,OP){

  ajax = ObjetoAjax();
  ajax.open("POST", "../verificar", true);
  ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  ajax.send("ori=verprogra&cod_proc="+cod_proc);
  ajax.onreadystatechange=function() {
  if (ajax.readyState==4) {
      res= ajax.responseText
      
      if(res==0){
         if(OP=="1"){
             document.getElementById("prog_relcosn").value="15-NO APLICA";
         }else{
             document.getElementById("txttotproc").value="15-NO APLICA";
         }
      }else{
          document.getElementById("conte").style.visibility = 'hidden';
          document.getElementById('selprog').style.visibility = 'visible';
          location.href="#selprog";
          document.getElementById('td_programa').innerHTML = ajax.responseText
      }
   }
  }

}

function sel_proc(){

    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }
       document.location="../ges_procedimientos?busq=B&pri=T&cod="+valor;

Cerrarpopu('buscaprocedimientos');

}


function nueSerUrg(opc){

// if(document.getElementById("txtpres").value==""){
//     buscar_prestador('urge','infserv');
// }
        document.getElementById('tit').innerHTML = "SERVICIOS ASIGNADOS";
        document.getElementById('contenido').innerHTML = "<tr align='center'>"
                          +"  <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 10px; ' > C&Oacute;DIGO</span> </td>"
                          +"  <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 10px; '> DESCRIPCI&Oacute;N</span> </td>"
                          +"  <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 10px; '> AUTOR. </span> </td>"
                          +"  <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 10px; '> VALOR </span> </td>"
                          +"  <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 10px; '> UNID. </span> </td>"
                          +"  <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 10px; '> PACIENT. </span> </td>"
                          +"  <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 10px; '> PORCENTAJE </span> </td>"
                          +"  <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 10px; '> TOTAL </span> </td>"
                          +"  <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 10px; '> TIPO </span> </td>"
                          +"  <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 10px; '> TIPO SERV. </span> </td>"
                          +"  <td>&nbsp;</td>"
                          +"  </tr>";


  document.getElementById('acc').value="1";
  document.getElementById('tfacind').disabled=false;
  document.getElementById('tfacagr').disabled=false;
  document.getElementById('tfaccap').disabled=false;

  document.getElementById('indproc').disabled=false;
  document.getElementById('tagrproc').disabled=false;
  document.getElementById('tcapaproc').disabled=false;

  document.getElementById('auto').disabled=false;
  document.getElementById('txtcodcons').disabled=false;
  document.getElementById('btn_prest').disabled=false;
  document.getElementById('txtcons').disabled=false;
//  document.getElementById('txtval').disabled=false;
  document.getElementById('txtporc').disabled=false;
  document.getElementById('txtporc').disabled=false;

  document.getElementById('auto').value="";
  document.getElementById('txtcodcons').value="";
  document.getElementById('txtcons').value="";
  document.getElementById('txtval').value="0,00";
  document.getElementById('txtcmod').value="0,00";
  document.getElementById('txtporc').value="0,00";
  document.getElementById('txttot').value="0,00";

  document.getElementById('txtcons').disabled=false;
  document.getElementById('txtval').disabled=false;
  document.getElementById('txtporc').disabled=false;
  document.getElementById('txtporc').disabled=false;
  //PROCEDIMIENTO
  document.getElementById('indproc').disabled=false;
  document.getElementById('agrproc').disabled=false;
  document.getElementById('autoproc').disabled=false;
  document.getElementById('txtcodconsproc').disabled=false;
//  document.getElementById('btn_prestproc').disabled=false;
  document.getElementById('txtvalproc').disabled=false;
  document.getElementById('txtunidproc').disabled=false;

  document.getElementById('txtporcproc').disabled=false;

  if(opc=="hosp"){
      document.getElementById('btn_codcon').setAttribute("href", "javascript:mostrar_proce('infservhospcons')");
      document.getElementById('btn_codpro').setAttribute("href", "javascript:mostrar_proce('infservhospproc')");

  }else if(opc=="urge"){
      document.getElementById('btn_codcon').setAttribute("href", "javascript:mostrar_proce('infservhospcons')");
      document.getElementById('btn_codpro').setAttribute("href", "javascript:mostrar_proce('infservhospproc')");
  }


  document.getElementById('btn_nuevo').setAttribute("style", "display:none;width: 60px;");
  document.getElementById('btn_guardar').setAttribute("style", "display:block;width: 60px;");

}

function nueSerpyp(){

// if(document.getElementById("txtpres").value==""){
//     buscar_prestador('urge','infserv');
// }
        document.getElementById('tit').innerHTML = "SERVICIOS ASIGNADOS";
        document.getElementById('contenido').innerHTML = "<tr align='center'>"
                          +"  <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 10px; ' > C&Oacute;DIGO</span> </td>"
                          +"  <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 10px; '> DESCRIPCI&Oacute;N</span> </td>"
                          +"  <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 10px; '> AUTOR. </span> </td>"
                          +"  <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 10px; '> VALOR </span> </td>"
                          +"  <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 10px; '> UNID. </span> </td>"
                          +"  <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 10px; '> PACIENT. </span> </td>"
                          +"  <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 10px; '> PORCENTAJE </span> </td>"
                          +"  <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 10px; '> TOTAL </span> </td>"
                          +"  <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 10px; '> TIPO </span> </td>"
                          +"  <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 10px; '> TIPO SERV. </span> </td>"
                          +"  <td>&nbsp;</td>"
                          +"  </tr>";


  document.getElementById('acc').value="1";
  document.getElementById('tfacind').disabled=false;
  document.getElementById('tfacagr').disabled=false;
  document.getElementById('auto').disabled=false;
  document.getElementById('txtcodcons').disabled=false;
  document.getElementById('btn_prest').disabled=false;
  document.getElementById('txtcons').disabled=false;
  document.getElementById('txtval').disabled=false;
  document.getElementById('txtporc').disabled=false;
  document.getElementById('txtporc').disabled=false;

  document.getElementById('auto').value="";
  document.getElementById('txtcodcons').value="";
  document.getElementById('txtcons').value="";
  document.getElementById('txtval').value="0,00";
  document.getElementById('txtcmod').value="0,00";
  document.getElementById('txtporc').value="0,00";
  document.getElementById('txttot').value="0,00";
  document.getElementById('prog_relcosn').value="";
  document.getElementById('txttotproc').value="";
  document.getElementById('prog_relcosn').value="";
  document.getElementById('prog_relproc').value="";

  document.getElementById('txtcons').disabled=false;
  document.getElementById('txtval').disabled=false;
  document.getElementById('txtporc').disabled=false;
  document.getElementById('txtporc').disabled=false;
  //PROCEDIMIENTO
  document.getElementById('indproc').disabled=false;
  document.getElementById('agrproc').disabled=false;
  document.getElementById('autoproc').disabled=false;
  document.getElementById('txtcodconsproc').disabled=false;
//  document.getElementById('btn_prestproc').disabled=false;
  document.getElementById('txtvalproc').disabled=false;
  document.getElementById('txtunidproc').disabled=false;

  document.getElementById('txtporcproc').disabled=false;

//  if(opc=="hosp"){
      document.getElementById('btn_codcon').setAttribute("href", "javascript:mostrar_proce('infservhospcons')");
      document.getElementById('btn_codpro').setAttribute("href", "javascript:mostrar_proce('infservhospproc')");
      document.getElementById('btn_busprogcons').setAttribute("href", "javascript:buscProgramas();");
      document.getElementById('btn_busprogproc').setAttribute("href", "javascript:buscProgramas();");
//
//  }else if(opc=="urge"){
//      document.getElementById('btn_codcon').setAttribute("href", "javascript:mostrar_proce('infservhospcons')");
//      document.getElementById('btn_codpro').setAttribute("href", "javascript:mostrar_proce('infservhospproc')");
//  }

  document.getElementById('btn_nuevo').setAttribute("style", "display:none;width: 60px;");
  document.getElementById('btn_guardar').setAttribute("style", "display:block;width: 60px;");

}

function abrir_proce(){
    cargarprocedimiento();
    document.getElementById("tabproc").style.visibility = 'hidden';
    document.getElementById('buscaprocedimientos2').style.visibility = 'visible';
}

  function cargarprocedimiento(){
    ajax = ObjetoAjax();
    ajax.open("POST", "../most_procedimientos", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("ori=1&programa=1");
    ajax.onreadystatechange=function() {
    if (ajax.readyState==4) {
         document.getElementById('td_procedimientos').innerHTML = ajax.responseText
        }
    }
}

function porcval(){

    porc=parseFloat(document.getElementById("txtporc").value.replace(".","").replace(".","").replace(",","."));
    txtval= parseFloat(document.getElementById('txtval').value.replace(".","").replace(".","").replace(",","."));
    cumod= parseFloat(document.getElementById('txtcmod').value.replace(".","").replace(".","").replace(",","."));

    tota=txtval+cumod;
    gtotal=tota-porc;

    rta=eval(gtotal.toFixed(2));

    res=rta.toString().split('.');
    if(res[1]== undefined) {
        res[1]='00';
    }
    if(res[1].length<2) {
        res[1]=res[1]+'0';
    }
    document.getElementById("txttot").value= moneda(res[0])+","+res[1];
}

function porcval2(){
    porc=parseFloat(document.getElementById("txtporc").value.replace(".","").replace(".","").replace(",","."));
    txtval= parseFloat(document.getElementById('txtval').value.replace(".","").replace(".","").replace(",","."));
    cumod= parseFloat(document.getElementById('txtcmod').value.replace(".","").replace(".","").replace(",","."));

    tota=txtval+cumod;
    gtotal=tota-porc;

    rta=eval(gtotal.toFixed(2));

    res=rta.toString().split('.');
    if(res[1]== undefined) {
        res[1]='00';
    }
    if(res[1].length<2) {
        res[1]=res[1]+'0';
    }
    document.getElementById("txttot").value= moneda(res[0])+","+res[1];
}

function cancel_infUrg(opc){

document.getElementById('acc').value="0";

document.getElementById("tfacind").checked=true;
document.getElementById("tfacagr").checked=false;
document.getElementById("auto").value="";
document.getElementById("txtcodcons").value="";
document.getElementById("txtcons").value="";
document.getElementById("txtval").value="0,00";
document.getElementById("txtcmod").value="0,00";
document.getElementById("txtporc").value="0,00";
document.getElementById("txttot").value="0,00";

document.getElementById("indproc").checked=true;
document.getElementById("agrproc").checked=false;
document.getElementById("autoproc").value="";
document.getElementById("txtcodconsproc").value="";
document.getElementById("txtconsproc").value="";
document.getElementById("txtvalproc").value="0,00";
document.getElementById("txtunidproc").value="1";
document.getElementById("txtcmodproc").value="0,00";
document.getElementById("txtcopproc").value="0,00";
document.getElementById("txtporcproc").value="0,00";
document.getElementById("txttotproc").value="0,00";

if(opc=="pyp"){
 document.getElementById("prog_relcosn").value="";
 document.getElementById("prog_relproc").value="";
document.getElementById('btn_busprogproc').setAttribute("href", "#");
document.getElementById('btn_busprogcons').setAttribute("href", "#");
}

///////////////////////////////////////

document.getElementById("tfacind").disabled=true;
document.getElementById("tfacagr").disabled=true;
document.getElementById("auto").disabled=true;
document.getElementById("txtcodcons").disabled=true;
document.getElementById("txtcons").disabled=true;
document.getElementById("txtval").disabled=true;
document.getElementById("txtcmod").disabled=true;
document.getElementById("txtporc").disabled=true;
document.getElementById("txttot").disabled=true;

document.getElementById("indproc").disabled=true;
document.getElementById("agrproc").disabled=true;
document.getElementById("autoproc").disabled=true;
document.getElementById("txtcodconsproc").disabled=true;
document.getElementById("txtconsproc").disabled=true;
document.getElementById("txtvalproc").disabled=true;
document.getElementById("txtunidproc").disabled=true;
document.getElementById("txtcmodproc").disabled=true;
document.getElementById("txtcopproc").disabled=true;
document.getElementById("txtporcproc").disabled=true;
document.getElementById("txttotproc").disabled=true;

document.getElementById('btn_nuevo').setAttribute("style", "display:block;width: 60px;");
document.getElementById('btn_guardar').setAttribute("style", "display:none;width: 60px;");


      document.getElementById('btn_codcon').setAttribute("href", "#");
      document.getElementById('btn_codpro').setAttribute("href", "#");

}


function guardar_infUrg(){

var num_elementos = document.getElementsByName("boton1").length;
if(document.getElementById("unfunc").value==""){
    alert("Debe Seleccionar la Unidad Funcional");
}else if(num_elementos <=0 && document.getElementById("txtcodcons").value==""){
     alert("No se ha Ingresado Ningun Dato para Guardar");
 }else{
    plan=document.getElementById("txtnomplan").value.split("-");
    codPlan=plan[0];
    admin=document.getElementById("txtnomadm").value.split("-");
    codadmin=admin[0];
    if(document.getElementById("modu")==null){
        modulo="3";
    }else{
        modulo=document.getElementById("modu").value;
    }

    prog=document.getElementById("prog").value;

    id_pac=document.getElementById("id_pac").value;
    codPacient=document.getElementById("txtcod").value;
    txtcod=document.getElementById("txtcod").value;
    txtnom=document.getElementById("txtnom").value;

    auto=document.getElementById("auto").value;
    var tfac="";
    var facind="";
  if(document.getElementById("tfacind").checked==true){
    tfac="Individual"
       facind="s";
    }else if(document.getElementById("tfacagr").checked==true){
       tfac="Agrupada"
       facind="n";
    }else{
       tfac="Capitacion"
       facind="c";
    }

    prest=document.getElementById("txtusuario").value;
    detserv=document.getElementById("servsel").value.split("//");
    codConsul=detserv[6];
    desConsul=detserv[1];
    codTarif=detserv[7];
    valCons=document.getElementById("txtval").value.replace(".","").replace(".","").replace(",",".");
    txtcmod=document.getElementById("txtcmod").value.replace(".","").replace(".","").replace(",",".");
    txtporc=document.getElementById("txtporc").value.replace(".","").replace(".","").replace(",",".");
    txttot=document.getElementById("txttot").value.replace(".","").replace(".","").replace(",",".");
    codpresExt=document.getElementById("presext").value;
    unidFunc=document.getElementById("unfunc").value;
    npc=document.getElementById("npc").value;

    var variables="";
    if(num_elementos<=0){
      agregar_serv(codConsul,desConsul,auto,document.getElementById("txtval").value,facind,'0',document.getElementById("txtporc").value,document.getElementById("txttot").value,tfac,'C')
            variables="codPlan="+codPlan+"&codPacient="+codPacient+"&auto="+auto+"&facind="+facind
            +"&prest="+prest+"&codConsul="+codConsul+"&codTarif="+codTarif
            +"&valCons="+valCons+"&txtcmod="+txtcmod+"&txtporc="+txtporc+"&txttot="+txttot
            +"&codpresExt="+codpresExt+"&unidFunc="+unidFunc+"&npc="+npc+"&codadmin="+codadmin+"&modulo="+modulo+"&prog="+prog;

            pac=id_pac+"//"+txtcod+"//"+txtnom;
            guardar('../guardar_consulta',variables,'regconsulta',pac);
    }else if(num_elementos>0 && document.getElementById("txtcodcons").value==""){
     var proced1="";
     for(contador=0; contador < num_elementos; contador++ ){
        idproc =document.getElementsByName("idproc")[contador].value;
        cod =document.getElementsByName("cod")[contador].value;
        cod_tar =document.getElementsByName("cod_tar")[contador].value;
        tfat =document.getElementsByName("f_ind1")[contador].value;
        val_proc =document.getElementsByName("valor")[contador].value.replace(".","").replace(".","").replace(",",".");
        und_proc =document.getElementsByName("unid")[contador].value.replace(".","").replace(".","").replace(",",".");
        cop_proc =document.getElementsByName("cop")[contador].value.replace(".","").replace(".","").replace(",",".");
        por_proc =document.getElementsByName("porc")[contador].value.replace(".","").replace(".","").replace(",",".");
        tot_proc =document.getElementsByName("tot")[contador].value.replace(".","").replace(".","").replace(",",".");
        cmod_proc =document.getElementsByName("c_mod")[contador].value.replace(".","").replace(".","").replace(",",".");
        proced1 += idproc + "#" + cod + "#" + cod_tar+ "#" + val_proc + "#" + und_proc + "#" + cop_proc + "#" + por_proc + "#" + tot_proc + "#" + cmod_proc +"#"+tfat+";";
    }

 if(document.getElementById("tfacind").checked==true){
    tfac="Individual"
       facind="s";
    }else if(document.getElementById("tfacagr").checked==true){
       tfac="Agrupada"
       facind="n";
    }else{
       tfac="Capitacion"
       facind="c";
    }

    auto=document.getElementById("autoproc").value;

    variables="codPlan="+codPlan+"&codPacient="+codPacient+"&auto="+auto+"&facind="+facind
            +"&prest="+prest+"&codpresExt="+codpresExt+"&unidFunc="+unidFunc+"&npc="+npc+"&codadmin="+codadmin+"&proced="+proced1+"&modulo="+modulo+"&prog="+prog;
          pac=id_pac+"//"+txtcod+"//"+txtnom;
    guardar('../guardar_datosProced',variables,'regproced',pac);

    actserv('ok');

    }else{

     /////////////GUARDAR CONSULTA
     variables="codPlan="+codPlan+"&codPacient="+codPacient+"&auto="+auto+"&facind="+facind
            +"&prest="+prest+"&codConsul="+codConsul+"&codTarif="+codTarif
            +"&valCons="+valCons+"&txtcmod="+txtcmod+"&txtporc="+txtporc+"&txttot="+txttot
            +"&codpresExt="+codpresExt+"&unidFunc="+unidFunc+"&npc="+npc+"&codadmin="+codadmin+"&modulo="+modulo+"&prog="+prog;


    guardar('../guardar_consulta',variables,'regconsulta1','');

     /////////////////////////////
     ///////////////GUARDAR PROCEDIMIENTO
     var proced="";
     for( contador=0; contador < num_elementos; contador++ ){
        idproc =document.getElementsByName("idproc")[contador].value;
        cod =document.getElementsByName("cod")[contador].value;
        cod_tar =document.getElementsByName("cod_tar")[contador].value;
        val_proc =document.getElementsByName("valor")[contador].value.replace(".","").replace(".","").replace(",",".");
        und_proc =document.getElementsByName("unid")[contador].value;
        cop_proc =document.getElementsByName("cop")[contador].value.replace(".","").replace(".","").replace(",",".");
        por_proc =document.getElementsByName("porc")[contador].value.replace(".","").replace(".","").replace(",",".");
        tot_proc =document.getElementsByName("tot")[contador].value.replace(".","").replace(".","").replace(",",".");
        cmod_proc =document.getElementsByName("c_mod")[contador].value.replace(".","").replace(".","").replace(",",".");
        proced += idproc + "#" + cod + "#" + cod_tar+ "#" + val_proc + "#" + und_proc + "#" + cop_proc + "#" + por_proc + "#" + tot_proc + "#" + cmod_proc +";";
    }

if(document.getElementById("tfacind").checked==true){
    tfac="Individual"
       facind="s";
    }else if(document.getElementById("tfacagr").checked==true){
       tfac="Agrupada"
       facind="n";
    }else{
       tfac="Capitacion"
       facind="c";
    }

    variables="codPlan="+codPlan+"&codPacient="+codPacient+"&auto="+auto+"&facind="+facind
            +"&prest="+prest+"&codpresExt="+codpresExt+"&unidFunc="+unidFunc+"&npc="+npc+"&codadmin="+codadmin+"&proced="+proced+"&modulo="+modulo;
          pac=id_pac+"//"+txtcod+"//"+txtnom;
    guardar('../guardar_datosProced',variables,'regprocedi',pac);

   /////////////////////////////////////
    }

}
}

function guardar_infHosp(){

    var num_elementos = document.getElementsByName("boton1").length;
    if(document.getElementById("unfunc").value==""){
        alert("Debe Seleccionar la Unidad Funcional");
    }else if(num_elementos <=0 && document.getElementById("txtcodcons").value==""){
        alert("No se ha Ingresado Ningun Dato para Guardar");
    }else{
        plan=document.getElementById("txtnomplan").value.split("-");
        codPlan=plan[0];
        admin=document.getElementById("txtnomadm").value.split("-");
        codadmin=admin[0];
        modulo="1";

        codPacient=document.getElementById("txtcod").value;
        txtcod=document.getElementById("txtcod").value;
        txtnom=document.getElementById("txtnom").value;

        auto=document.getElementById("auto").value;
        var tfac="";
        var facind="";
     if(document.getElementById("tfacind").checked==true){
    tfac="Individual"
       facind="s";
    }else if(document.getElementById("tfacagr").checked==true){
       tfac="Agrupada"
       facind="n";
    }else{
       tfac="Capitacion"
       facind="c";
    }

        prest=document.getElementById("txtusuario").value;
        detserv=document.getElementById("servsel").value.split("//");
        codConsul=detserv[6];
        desConsul=detserv[1];
        codTarif=detserv[7];
        valCons=document.getElementById("txtval").value.replace(".","").replace(".","").replace(",",".");
        txtcmod=document.getElementById("txtcmod").value.replace(".","").replace(".","").replace(",",".");
        txtporc=document.getElementById("txtporc").value.replace(".","").replace(".","").replace(",",".");
        txttot=document.getElementById("txttot").value.replace(".","").replace(".","").replace(",",".");
        codpresExt=document.getElementById("presext").value;
        unidFunc=document.getElementById("unfunc").value;
        npc=document.getElementById("npc").value;

        var variables="";
        if(num_elementos<=0){
            agregar_serv(codConsul,desConsul,auto,document.getElementById("txtval").value,'1','0',document.getElementById("txtporc").value,document.getElementById("txttot").value,tfac,'C')
            variables="codPlan="+codPlan+"&codPacient="+codPacient+"&auto="+auto+"&facind="+facind
            +"&prest="+prest+"&codConsul="+codConsul+"&codTarif="+codTarif
            +"&valCons="+valCons+"&txtcmod="+txtcmod+"&txtporc="+txtporc+"&txttot="+txttot
            +"&codpresExt="+codpresExt+"&unidFunc="+unidFunc+"&npc="+npc+"&codadmin="+codadmin+"&modulo="+modulo+"&prog=hosp";

            pac=id_pac+"//"+txtcod+"//"+txtnom;

            guardar('../guardar_consulta',variables,'regconsultaHospi',pac);

        }else if(num_elementos>0 && document.getElementById("txtcodcons").value==""){
            var proced1="";
            for( contador=0; contador < num_elementos; contador++ ){
                idproc =document.getElementsByName("idproc")[contador].value;
                cod =document.getElementsByName("cod")[contador].value;
                cod_tar =document.getElementsByName("cod_tar")[contador].value;
                val_proc =document.getElementsByName("valor")[contador].value.replace(".","").replace(".","").replace(",",".");
                und_proc =document.getElementsByName("unid")[contador].value.replace(".","").replace(".","").replace(",",".");
                cop_proc =document.getElementsByName("cop")[contador].value.replace(".","").replace(".","").replace(",",".");
                por_proc =document.getElementsByName("porc")[contador].value.replace(".","").replace(".","").replace(",",".");
                tot_proc =document.getElementsByName("tot")[contador].value.replace(".","").replace(".","").replace(",",".");
                cmod_proc =document.getElementsByName("c_mod")[contador].value.replace(".","").replace(".","").replace(",",".");
                proced1 += idproc + "#" + cod + "#" + cod_tar+ "#" + val_proc + "#" + und_proc + "#" + cop_proc + "#" + por_proc + "#" + tot_proc + "#" + cmod_proc +";";
            }

         if(document.getElementById("tfacind").checked==true){
    tfac="Individual"
       facind="s";
    }else if(document.getElementById("tfacagr").checked==true){
       tfac="Agrupada"
       facind="n";
    }else{
       tfac="Capitacion"
       facind="c";
    }

            auto=document.getElementById("autoproc").value;

            variables="codPlan="+codPlan+"&codPacient="+codPacient+"&auto="+auto+"&facind="+facind
            +"&prest="+prest+"&codpresExt="+codpresExt+"&unidFunc="+unidFunc+"&npc="+npc+"&codadmin="+codadmin+"&proced="+proced1+"&modulo="+modulo+"&prog=hosp";
            pac=id_pac+"//"+txtcod+"//"+txtnom;
            guardar('../guardar_datosProced',variables,'regproced',pac);

            actserv('ok');

        }else{

            /////////////GUARDAR CONSULTA
            variables="codPlan="+codPlan+"&codPacient="+codPacient+"&auto="+auto+"&facind="+facind
            +"&prest="+prest+"&codConsul="+codConsul+"&codTarif="+codTarif
            +"&valCons="+valCons+"&txtcmod="+txtcmod+"&txtporc="+txtporc+"&txttot="+txttot
            +"&codpresExt="+codpresExt+"&unidFunc="+unidFunc+"&npc="+npc+"&codadmin="+codadmin+"&modulo="+modulo;


            guardar('../guardar_consulta',variables,'regconsulta1','');

            /////////////////////////////
            ///////////////GUARDAR PROCEDIMIENTO
            var proced="";
            for( contador=0; contador < num_elementos; contador++ ){
                idproc =document.getElementsByName("idproc")[contador].value;
                cod =document.getElementsByName("cod")[contador].value;
                cod_tar =document.getElementsByName("cod_tar")[contador].value;
                val_proc =document.getElementsByName("valor")[contador].value.replace(".","").replace(".","").replace(",",".");
                und_proc =document.getElementsByName("unid")[contador].value;
                cop_proc =document.getElementsByName("cop")[contador].value.replace(".","").replace(".","").replace(",",".");
                por_proc =document.getElementsByName("porc")[contador].value.replace(".","").replace(".","").replace(",",".");
                tot_proc =document.getElementsByName("tot")[contador].value.replace(".","").replace(".","").replace(",",".");
                cmod_proc =document.getElementsByName("c_mod")[contador].value.replace(".","").replace(".","").replace(",",".");
                proced += idproc + "#" + cod + "#" + cod_tar+ "#" + val_proc + "#" + und_proc + "#" + cop_proc + "#" + por_proc + "#" + tot_proc + "#" + cmod_proc +";";
            }

       if(document.getElementById("tfacind").checked==true){
    tfac="Individual"
       facind="s";
    }else if(document.getElementById("tfacagr").checked==true){
       tfac="Agrupada"
       facind="n";
    }else{
       tfac="Capitacion"
       facind="c";
    }

            variables="codPlan="+codPlan+"&codPacient="+codPacient+"&auto="+auto+"&facind="+facind
            +"&prest="+prest+"&codpresExt="+codpresExt+"&unidFunc="+unidFunc+"&npc="+npc+"&codadmin="+codadmin+"&proced="+proced+"&modulo="+modulo;
            pac=id_pac+"//"+txtcod+"//"+txtnom;
            guardar('../guardar_datosProced',variables,'regprocedi',pac);

        /////////////////////////////////////
        }

    }
}

function guardar_infAmbu(){

    var num_elementos = document.getElementsByName("boton1").length;
    if(document.getElementById("unfunc").value==""){
        alert("Debe Seleccionar la Unidad Funcional");
    }else if(num_elementos <=0 && document.getElementById("txtcodcons").value==""){
        alert("No se ha Ingresado Ningun Dato para Guardar");
    }else{
        plan=document.getElementById("txtnomplan").value.split("-");
        codPlan=plan[0];
        admin=document.getElementById("txtnomadm").value.split("-");
        codadmin=admin[0];
        modulo="2";

        codPacient=document.getElementById("txtcod").value;
        txtcod=document.getElementById("txtcod").value;
        txtnom=document.getElementById("txtnom").value;

        auto=document.getElementById("auto").value;
        var tfac="";
        var facind="";
       if(document.getElementById("tfacind").checked==true){
    tfac="Individual"
       facind="s";
    }else if(document.getElementById("tfacagr").checked==true){
       tfac="Agrupada"
       facind="n";
    }else{
       tfac="Capitacion"
       facind="c";
    }

        prest=document.getElementById("txtusuario").value;
        detserv=document.getElementById("servsel").value.split("//");
        codConsul=detserv[6];
        desConsul=detserv[1];
        codTarif=detserv[7];
        valCons=document.getElementById("txtval").value.replace(".","").replace(".","").replace(",",".");
        txtcmod=document.getElementById("txtcmod").value.replace(".","").replace(".","").replace(",",".");
        txtporc=document.getElementById("txtporc").value.replace(".","").replace(".","").replace(",",".");
        txttot=document.getElementById("txttot").value.replace(".","").replace(".","").replace(",",".");
        codpresExt=document.getElementById("presext").value;
        unidFunc=document.getElementById("unfunc").value;
        npc=document.getElementById("npc").value;

        var variables="";
        if(num_elementos<=0){
            agregar_serv(codConsul,desConsul,auto,document.getElementById("txtval").value,'1','0',document.getElementById("txtporc").value,document.getElementById("txttot").value,tfac,'C')
            variables="codPlan="+codPlan+"&codPacient="+codPacient+"&auto="+auto+"&facind="+facind
            +"&prest="+prest+"&codConsul="+codConsul+"&codTarif="+codTarif
            +"&valCons="+valCons+"&txtcmod="+txtcmod+"&txtporc="+txtporc+"&txttot="+txttot
            +"&codpresExt="+codpresExt+"&unidFunc="+unidFunc+"&npc="+npc+"&codadmin="+codadmin+"&modulo="+modulo+"&prog=ambu";

            pac=id_pac+"//"+txtcod+"//"+txtnom;

            guardar('../guardar_consulta',variables,'regconsultaHospi',pac);

        }else if(num_elementos>0 && document.getElementById("txtcodcons").value==""){
            var proced1="";
            for( contador=0; contador < num_elementos; contador++ ){
                idproc =document.getElementsByName("idproc")[contador].value;
                cod =document.getElementsByName("cod")[contador].value;
                cod_tar =document.getElementsByName("cod_tar")[contador].value;
                val_proc =document.getElementsByName("valor")[contador].value.replace(".","").replace(".","").replace(",",".");
                und_proc =document.getElementsByName("unid")[contador].value.replace(".","").replace(".","").replace(",",".");
                cop_proc =document.getElementsByName("cop")[contador].value.replace(".","").replace(".","").replace(",",".");
                por_proc =document.getElementsByName("porc")[contador].value.replace(".","").replace(".","").replace(",",".");
                tot_proc =document.getElementsByName("tot")[contador].value.replace(".","").replace(".","").replace(",",".");
                cmod_proc =document.getElementsByName("c_mod")[contador].value.replace(".","").replace(".","").replace(",",".");
                proced1 += idproc + "#" + cod + "#" + cod_tar+ "#" + val_proc + "#" + und_proc + "#" + cop_proc + "#" + por_proc + "#" + tot_proc + "#" + cmod_proc +";";
            }

          if(document.getElementById("tfacind").checked==true){
    tfac="Individual"
       facind="s";
    }else if(document.getElementById("tfacagr").checked==true){
       tfac="Agrupada"
       facind="n";
    }else{
       tfac="Capitacion"
       facind="c";
    }

            auto=document.getElementById("autoproc").value;

            variables="codPlan="+codPlan+"&codPacient="+codPacient+"&auto="+auto+"&facind="+facind
            +"&prest="+prest+"&codpresExt="+codpresExt+"&unidFunc="+unidFunc+"&npc="+npc+"&codadmin="+codadmin+"&proced="+proced1+"&modulo="+modulo+"&prog=hosp";
            pac=id_pac+"//"+txtcod+"//"+txtnom;
            guardar('../guardar_datosProced',variables,'regproced',pac);

            actserv('ok');

        }else{

            /////////////GUARDAR CONSULTA
            variables="codPlan="+codPlan+"&codPacient="+codPacient+"&auto="+auto+"&facind="+facind
            +"&prest="+prest+"&codConsul="+codConsul+"&codTarif="+codTarif
            +"&valCons="+valCons+"&txtcmod="+txtcmod+"&txtporc="+txtporc+"&txttot="+txttot
            +"&codpresExt="+codpresExt+"&unidFunc="+unidFunc+"&npc="+npc+"&codadmin="+codadmin+"&modulo="+modulo;


            guardar('../guardar_consulta',variables,'regconsulta1','');

            /////////////////////////////
            ///////////////GUARDAR PROCEDIMIENTO
            var proced="";
            for( contador=0; contador < num_elementos; contador++ ){
                idproc =document.getElementsByName("idproc")[contador].value;
                cod =document.getElementsByName("cod")[contador].value;
                cod_tar =document.getElementsByName("cod_tar")[contador].value;
                val_proc =document.getElementsByName("valor")[contador].value.replace(".","").replace(".","").replace(",",".");
                und_proc =document.getElementsByName("unid")[contador].value;
                cop_proc =document.getElementsByName("cop")[contador].value.replace(".","").replace(".","").replace(",",".");
                por_proc =document.getElementsByName("porc")[contador].value.replace(".","").replace(".","").replace(",",".");
                tot_proc =document.getElementsByName("tot")[contador].value.replace(".","").replace(".","").replace(",",".");
                cmod_proc =document.getElementsByName("c_mod")[contador].value.replace(".","").replace(".","").replace(",",".");
                proced += idproc + "#" + cod + "#" + cod_tar+ "#" + val_proc + "#" + und_proc + "#" + cop_proc + "#" + por_proc + "#" + tot_proc + "#" + cmod_proc +";";
            }

            if(document.getElementById("tfacind").checked==true){
    tfac="Individual"
       facind="s";
    }else if(document.getElementById("tfacagr").checked==true){
       tfac="Agrupada"
       facind="n";
    }else{
       tfac="Capitacion"
       facind="c";
    }

            variables="codPlan="+codPlan+"&codPacient="+codPacient+"&auto="+auto+"&facind="+facind
            +"&prest="+prest+"&codpresExt="+codpresExt+"&unidFunc="+unidFunc+"&npc="+npc+"&codadmin="+codadmin+"&proced="+proced+"&modulo="+modulo;
            pac=id_pac+"//"+txtcod+"//"+txtnom;
            guardar('../guardar_datosProced',variables,'regprocedi',pac);

        /////////////////////////////////////
        }

    }
}

function guardar_infPyP(){

    var num_elementos = document.getElementsByName("boton1").length;
    if(document.getElementById("unfunc").value==""){
        alert("Debe Seleccionar la Unidad Funcional");
    }else if(num_elementos <=0 && document.getElementById("txtcodcons").value==""){
        alert("No se ha Ingresado Ningun Dato para Guardar");
    }else{
        plan=document.getElementById("txtnomplan").value.split("-");
        codPlan=plan[0];
        admin=document.getElementById("txtnomadm").value.split("-");
        codadmin=admin[0];
        modulo="4";

        codPacient=document.getElementById("txtcod").value;
        txtcod=document.getElementById("txtcod").value;
        txtnom=document.getElementById("txtnom").value;

        auto=document.getElementById("auto").value;
        var tfac="";
        var facind="";
       if(document.getElementById("tfacind").checked==true){
    tfac="Individual"
       facind="s";
    }else if(document.getElementById("tfacagr").checked==true){
       tfac="Agrupada"
       facind="n";
    }else{
       tfac="Capitacion"
       facind="c";
    }

        prest=document.getElementById("txtusuario").value;
        detserv=document.getElementById("servsel").value.split("//");
        codConsul=detserv[6];
        desConsul=detserv[1];
        codTarif=detserv[7];
        valCons=document.getElementById("txtval").value.replace(".","").replace(".","").replace(",",".");
        txtcmod=document.getElementById("txtcmod").value.replace(".","").replace(".","").replace(",",".")
        txtporc=document.getElementById("txtporc").value.replace(".","").replace(".","").replace(",",".");
        txttot=document.getElementById("txttot").value.replace(".","").replace(".","").replace(",",".");
        codpresExt=document.getElementById("presext").value;
        unidFunc=document.getElementById("unfunc").value;
        npc=document.getElementById("npc").value;

        var variables="";
        if(num_elementos<=0){
            agregar_serv(codConsul,desConsul,auto,document.getElementById("txtval").value,'1','0',document.getElementById("txtporc").value,document.getElementById("txttot").value,tfac,'C')
            variables="codPlan="+codPlan+"&codPacient="+codPacient+"&auto="+auto+"&facind="+facind
            +"&prest="+prest+"&codConsul="+codConsul+"&codTarif="+codTarif
            +"&valCons="+valCons+"&txtcmod="+txtcmod+"&txtporc="+txtporc+"&txttot="+txttot
            +"&codpresExt="+codpresExt+"&unidFunc="+unidFunc+"&npc="+npc+"&codadmin="+codadmin+"&modulo="+modulo+"&prog=pyp";

            pac=id_pac+"//"+txtcod+"//"+txtnom;

            guardar('../guardar_consulta',variables,'regconsultapyp',pac);

        }else if(num_elementos>0 && document.getElementById("prog_relcosn").value==""){
            var proced1="";

            for( contador=0; contador < num_elementos; contador++ ){
                idproc =document.getElementsByName("idproc")[contador].value;
                cod =document.getElementsByName("cod")[contador].value;
                cod_tar =document.getElementsByName("cod_tar")[contador].value;
                val_proc =document.getElementsByName("valor")[contador].value.replace(".","").replace(".","").replace(",",".");
                und_proc =document.getElementsByName("unid")[contador].value.replace(".","").replace(".","").replace(",",".");
                cop_proc =document.getElementsByName("cop")[contador].value.replace(".","").replace(".","").replace(",",".");
                por_proc =document.getElementsByName("porc")[contador].value.replace(".","").replace(".","").replace(",",".");
                tot_proc =document.getElementsByName("tot")[contador].value.replace(".","").replace(".","").replace(",",".");
                cmod_proc =document.getElementsByName("c_mod")[contador].value.replace(".","").replace(".","").replace(",",".");
                proced1 += idproc + "#" + cod + "#" + cod_tar+ "#" + val_proc + "#" + und_proc + "#" + cop_proc + "#" + por_proc + "#" + tot_proc + "#" + cmod_proc +";";
            }

            if(document.getElementById("tfacind").checked==true){
    tfac="Individual"
       facind="s";
    }else if(document.getElementById("tfacagr").checked==true){
       tfac="Agrupada"
       facind="n";
    }else{
       tfac="Capitacion"
       facind="c";
    }

            auto=document.getElementById("autoproc").value;
              txttotproc=document.getElementById("prog_relproc").value.split("-");

            variables="codPlan="+codPlan+"&codPacient="+codPacient+"&auto="+auto+"&facind="+facind
            +"&prest="+prest+"&codpresExt="+codpresExt+"&unidFunc="+unidFunc+"&npc="+npc+"&codadmin="+codadmin+"&proced="+proced1+"&modulo="+modulo+"&prog=pyp&txttotproc="+txttotproc[0];
            pac=id_pac+"//"+txtcod+"//"+txtnom;
            guardar('../guardar_datosProced',variables,'regprocedpyp',pac);

            actserv('ok');

        }else{

             prog_relcosn=document.getElementById("prog_relcosn").value.split("-");

            /////////////GUARDAR CONSULTA
            variables="codPlan="+codPlan+"&codPacient="+codPacient+"&auto="+auto+"&facind="+facind
            +"&prest="+prest+"&codConsul="+codConsul+"&codTarif="+codTarif
            +"&valCons="+valCons+"&txtcmod="+txtcmod+"&txtporc="+txtporc+"&txttot="+txttot
            +"&codpresExt="+codpresExt+"&unidFunc="+unidFunc+"&npc="+npc+"&codadmin="+codadmin+"&modulo="+modulo+"&prog_relcosn="+prog_relcosn[0];


            guardar('../guardar_consulta',variables,'regconsulta1','');

            /////////////////////////////
            ///////////////GUARDAR PROCEDIMIENTO
            var proced="";
            for( contador=0; contador < num_elementos; contador++ ){
                idproc =document.getElementsByName("idproc")[contador].value;
                cod =document.getElementsByName("cod")[contador].value;
                cod_tar =document.getElementsByName("cod_tar")[contador].value;
                val_proc =document.getElementsByName("valor")[contador].value.replace(".","").replace(".","").replace(",",".");
                und_proc =document.getElementsByName("unid")[contador].value;
                cop_proc =document.getElementsByName("cop")[contador].value.replace(".","").replace(".","").replace(",",".");
                por_proc =document.getElementsByName("porc")[contador].value.replace(".","").replace(".","").replace(",",".");
                tot_proc =document.getElementsByName("tot")[contador].value.replace(".","").replace(".","").replace(",",".");
                cmod_proc =document.getElementsByName("c_mod")[contador].value.replace(".","").replace(".","").replace(",",".");
                proced += idproc + "#" + cod + "#" + cod_tar+ "#" + val_proc + "#" + und_proc + "#" + cop_proc + "#" + por_proc + "#" + tot_proc + "#" + cmod_proc +";";
            }

           if(document.getElementById("tfacind").checked==true){
    tfac="Individual"
       facind="s";
    }else if(document.getElementById("tfacagr").checked==true){
       tfac="Agrupada"
       facind="n";
    }else{
       tfac="Capitacion"
       facind="c";
    }
            txttotproc=document.getElementById("txttotproc").value.split("-");
            variables="codPlan="+codPlan+"&codPacient="+codPacient+"&auto="+auto+"&facind="+facind
            +"&prest="+prest+"&codpresExt="+codpresExt+"&unidFunc="+unidFunc+"&npc="+npc+"&codadmin="+codadmin+"&proced="+proced+"&modulo="+modulo+"&prog=pyp&txttotproc="+txttotproc[0];
            pac=id_pac+"//"+txtcod+"//"+txtnom;
            guardar('../guardar_datosProced',variables,'regprocedipyp',pac);

        /////////////////////////////////////
        }

    }
}

function agregar_serv(codConsul,desConsul,autoriza,valCons,uni,pac,por,total,tipo,tserv){

    var cont = document.getElementById("cont");
    var filas = document.getElementById("filas");
    cont.setAttribute("value", parseInt(cont.value,0)+1);
    var tabla = document.getElementById("contenido").tBodies[0];
    var fila = document.createElement("TR");
    fila.setAttribute("align","center");

    var celda2 = document.createElement("TD");
    var cod = document.createElement("INPUT");
    cod.setAttribute("type","text");
    cod.setAttribute("size","10");
    cod.setAttribute('style','font-size:7pt;' )
    cod.setAttribute("maxlength","18");
    cod.setAttribute("disabled","disabled");
    cod.setAttribute("value", codConsul);
    cod.setAttribute("name","cod");
    cod.setAttribute("id","cod" + cont.value);
    celda2.appendChild(cod);

    var celda3 = document.createElement("TD");
    var desp = document.createElement("INPUT");
    desp.setAttribute("type","text");
    desp.setAttribute("size","50");
    desp.setAttribute("maxlength","100");
    desp.setAttribute("disabled","disabled");
    desp.setAttribute('style','font-size:7pt;' )
    desp.setAttribute("value", desConsul);
    desp.setAttribute("name","desp");
    desp.setAttribute("id","desp" + cont.value);
    celda3.appendChild(desp);

    var celda6 = document.createElement("TD");
    var auto = document.createElement("INPUT");
    auto.setAttribute("type","text");
    auto.setAttribute("size","10");
    auto.setAttribute("disabled","disabled");
    auto.setAttribute('style','font-size:7pt;' )
    auto.setAttribute("value", autoriza);
    auto.setAttribute("name","auto");
    auto.setAttribute("id","auto" + cont.value);
    celda6.appendChild(auto);


     var celda7 = document.createElement("TD");
    var valor = document.createElement("INPUT");
    valor.setAttribute("type","text");
    valor.setAttribute("size","12");
    valor.setAttribute('style','font-size:7pt;text-align: right')
    valor.setAttribute("disabled","disabled");
    valor.setAttribute("value", valCons);
    valor.setAttribute("name","valor");
    valor.setAttribute("id","valor" + cont.value);
    celda7.appendChild(valor);

    var celda8 = document.createElement("TD");
    var unid = document.createElement("INPUT");
    unid.setAttribute("type","text");
    unid.setAttribute("size","5");
    unid.setAttribute('style','font-size:7pt;')
    unid.setAttribute("disabled","disabled");
    unid.setAttribute("value", uni);
    unid.setAttribute("name","unid");
    unid.setAttribute("id","unid" + cont.value);
    celda8.appendChild(unid);

    var celda9 = document.createElement("TD");
    var paci = document.createElement("INPUT");
    paci.setAttribute("type","text");
    paci.setAttribute("size","5");
    paci.setAttribute('style','font-size:7pt;')
    paci.setAttribute("disabled","disabled");
    paci.setAttribute("value", pac);
    paci.setAttribute("name","paci");
    paci.setAttribute("id","paci" + cont.value);
    celda9.appendChild(paci);


    var celda10 = document.createElement("TD");
    var porc = document.createElement("INPUT");
    porc.setAttribute("type","text");
    porc.setAttribute("size","8");
    porc.setAttribute('style','font-size:7pt;text-align: right')
    porc.setAttribute("disabled","disabled");
    porc.setAttribute("value", por);
    porc.setAttribute("name","porc");
    porc.setAttribute("id","porc" + cont.value);
    celda10.appendChild(porc);


     var celda12 = document.createElement("TD");
    var tot = document.createElement("INPUT");
    tot.setAttribute("type","text");
    tot.setAttribute("size","12");
    tot.setAttribute('style','font-size:7pt;text-align: right')
    tot.setAttribute("disabled","disabled");
    tot.setAttribute("value", total);
    tot.setAttribute("name","tot");
    tot.setAttribute("id","tot" + cont.value);
    celda12.appendChild(tot);

    var celda13 = document.createElement("TD");
    var tip = document.createElement("INPUT");
    tip.setAttribute("type","text");
    tip.setAttribute("size","10");
    tip.setAttribute('style','font-size:7pt;')
    tip.setAttribute("disabled","disabled");
    tip.setAttribute("value", tipo);
    tip.setAttribute("name","tip");
    tip.setAttribute("id","tip" + cont.value);
    celda13.appendChild(tip);

    var celda14 = document.createElement("TD");
    var tipServ = document.createElement("INPUT");
    tipServ.setAttribute("type","text");
    tipServ.setAttribute("size","6");
    tipServ.setAttribute('style','font-size:7pt;')
    tipServ.setAttribute("disabled","disabled");
    tipServ.setAttribute("value", tserv);
    tipServ.setAttribute("name","tipServ");
    tipServ.setAttribute("id","tipServ" + cont.value);
    celda14.appendChild(tipServ);

    var celda11 = document.createElement('TD');
    var boton = document.createElement('INPUT');
    boton.setAttribute('type','button');
    boton.setAttribute('value','X');
    boton.setAttribute('id','boton1' + cont.value);
    boton.setAttribute('name','boton1');
    boton.setAttribute('title','Quitar de la lista');
    boton.setAttribute('style','font-size:7pt; padding:2px 2px 2px 2px; margin; margin: 0px 4px 4px 0px;');
    boton.onclick=function(){
        borrarFila(this, this.id);
    }
    celda11.appendChild(boton);

    //fila.appendChild(celda1);
    fila.appendChild(celda2);
    fila.appendChild(celda3);
    fila.appendChild(celda6);
    fila.appendChild(celda7);
    fila.appendChild(celda8);
    fila.appendChild(celda9);
    fila.appendChild(celda10);
    fila.appendChild(celda12);
    fila.appendChild(celda13);
    fila.appendChild(celda14);
//    fila.appendChild(celda11);
    tabla.appendChild(fila);
}

function sel_horai(opc) {

   if(opc=="har"){
        val1=document.getElementById("txthing").value;
        val1=parseInt(val1)+1;
        if(val1<=12){
            document.getElementById("txthing").value=val1;
        }
    }else if(opc=="hab"){
        val1=document.getElementById("txthing").value;
        val1=parseInt(val1)-1;
        if(parseFloat(val1)>0){
            document.getElementById("txthing").value=val1;
        }
    }else if(opc=="mar"){
        val1=document.getElementById("txtming").value;
        val1=parseInt(val1)+1;
        if(val1<=60){
            if(parseFloat(val1)<10){
                val1="0"+val1;
            }
            document.getElementById("txtming").value=val1;
         }
    }else if(opc=="mab"){
        val1=document.getElementById("txtming").value;
        val1=parseInt(val1)-1;
        if(parseFloat(val1)>=0){
            if(parseFloat(val1)<10){
                val1="0"+val1;
            }
            document.getElementById("txtming").value=val1;
        }
    }

}

function sel_horae(opc) {

   if(opc=="har"){
        val1=document.getElementById("txthegr").value;
        val1=parseInt(val1)+1;
        if(val1<=12){
            document.getElementById("txthegr").value=val1;
        }
    }else if(opc=="hab"){
        val1=document.getElementById("txthegr").value;
        val1=parseInt(val1)-1;
        if(parseFloat(val1)>0){
            document.getElementById("txthegr").value=val1;
        }
    }else if(opc=="mar"){
        val1=document.getElementById("txtmegr").value;
//        alert(val1);
        val1=parseInt(val1)+1;
        if(val1<=60){

            if(parseFloat(val1)<10){
                val1="0"+val1;
            }

            document.getElementById("txtmegr").value=val1;
         }
    }else if(opc=="mab"){
        val1=document.getElementById("txtmegr").value;
        val1=parseInt(val1)-1;
        if(parseFloat(val1)>=0){
            if(parseFloat(val1)<10){
                val1="0"+val1;
            }
            document.getElementById("txtmegr").value=val1;
        }
    }

}

function buc_fecCons(cod,ori){

    if(cod!=""){
        ajax = ObjetoAjax();
        ajax.open("POST", "../verificar", true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send("codcons="+cod+"&ori="+ori+"&prog=urgencia");
        ajax.onreadystatechange=function() {
            if (ajax.readyState==4) {
                 res = ajax.responseText;
                 par=res.split("//");
                if(ori=="fecCons"){
                res = par[0].substring(0,10);
                fres=res.split("-");
                document.getElementById("fecserv").value=fres[2]+"/"+fres[1]+"/"+fres[0];
                document.getElementById("admin").value=par[1];
                }else if(ori=="rip_cons"){
                par=res.split("//");
                fres=par[0].split("-");
                document.getElementById("fecserv").value=fres[2]+"/"+fres[1]+"/"+fres[0];
                document.getElementById("admin").value=par[1];
                }else if(ori=="rip_proce"){

                par=res.split("//");
                fres=par[0].split("-");
                document.getElementById("fecserv").value=fres[2]+"/"+fres[1]+"/"+fres[0];
                document.getElementById("admin").value=par[1];
                }


            }
        }
    }else{
         document.getElementById("fecserv").value="";
    }
 }



function guar_ripsUrg(){

    if(document.getElementById("consul").value==""){
        alert("Seleccione el Servicio de Consulta");
    }else if(document.getElementById("txtusuario").value==""){
        alert("Seleccione el Prestador");
    }else if(document.getElementById("diagPrinc").value==""){
        alert("Seleccione el Tipo de Diagn\u00f3stico");
    }else if(document.getElementById("finCons").value==""){
        alert("Seleccione la Finalidad de la Consulta");
    }else if(document.getElementById("cExter").value==""){
        alert("Seleccione la Causa Externa");
    }else if(document.getElementById("txtdiagprinc").value==""){
         alert("Seleccione el Diagn\u00f3stico Principal de la Consulta");
    }else if(document.getElementById("digSalid").value==""){
         alert("Seleccione el Diagn\u00f3stico Principal de Salida de la Consulta");
    }else if(document.getElementById("desusu").value==""){
         alert("Seleccione el Destino a la Salida");
    }else if(document.getElementById("estSal").value==""){
         alert("Seleccione el Estado a la Salida");
    }else if(document.getElementById("estSal").value==""){
         alert("Seleccione el Estado a la Salida");
    }else if(document.getElementById("estSal").value=="2"){
         if(document.getElementById("cauMuerte").value==""){
               alert("Digite la Causa de Muerte");
         }
    }else{
        ori=document.getElementById("ori").value;
        iden=document.getElementById("id_pac").value;
        idcon=document.getElementById("consul").value;
        finCons=document.getElementById("finCons").value;//Finalidad de consulta
        diagPrinc=document.getElementById("diagPrinc").value;//Tipo Diagnostico Principal
        cExter=document.getElementById("cExter").value;//causa
        txtdiagprinc=document.getElementById("txtdiagprinc").value;//Diagnostico Principal
        codDiag1=document.getElementById("codDiag1").value;//Codigo diag 1
        codDiag2=document.getElementById("codDiag2").value;//Codigo diag 2
        codDiag3=document.getElementById("codDiag3").value;//Codigo diag 3
        ////
        digSalid=document.getElementById("digSalid").value;//Codigo diag Salida
        digSalid1=document.getElementById("digSalid1").value;//Codigo diag salida1
        digSalid2=document.getElementById("digSalid2").value;//Codigo diag salida2
        digSalid3=document.getElementById("digSalid3").value;//Codigo diag salida3
        cauMuerte=document.getElementById("cauMuerte").value;//Codigo diag salida3

        codprest=document.getElementById("txtusuario").value;//codigo prestador
        fingre=document.getElementById("fingre").value;//fecha de ingreso
        txthing=document.getElementById("txthing").value+":"+document.getElementById("txtming").value;//hora de ingreso
        fegre=document.getElementById("fegre").value;//fecha de salida
        txthegr=document.getElementById("txthegr").value+":"+document.getElementById("txtmegr").value;//hora de salida
        estSal=document.getElementById("estSal").value;//estado de salida
        cExter=document.getElementById("cExter").value;//causa externa
        digSalid=document.getElementById("digSalid").value;//diagnostico de salida
        digSalid1=document.getElementById("digSalid1").value;//diagnostico de salida1
        digSalid2=document.getElementById("digSalid2").value;//diagnostico de salida2
        digSalid3=document.getElementById("digSalid3").value;//diagnostico de salida3
        cauMuerte=document.getElementById("cauMuerte").value;//causa de muerte
        desusu=document.getElementById("desusu").value;//causa de muerte
        auto=document.getElementById("auto").value;//autorizacion


        variables="iden="+iden+"&idcon="+idcon+"&finCons="+finCons+"&txtdiagprinc="+txtdiagprinc+"&codDiag1="+codDiag1+"&codDiag2="+codDiag2+"&codDiag3="+codDiag3+"&digSalid="+digSalid
        +"&digSalid1="+digSalid1+"&digSalid2="+digSalid2+"&digSalid3="+digSalid3+"&cauMuerte="+cauMuerte+"&cExter="+cExter+"&diagPrinc="+diagPrinc
        +"&codprest="+codprest+"&fingre="+fingre+"&txthing="+txthing+"&fegre="+fegre+"&txthegr="+txthegr+"&estSal="+estSal+"&cExter="+cExter
        +"&digSalid="+digSalid+"&digSalid="+digSalid+"&digSalid1="+digSalid1+"&digSalid2="+digSalid2+"&digSalid3="+digSalid3+"&cauMuerte="+cauMuerte+"&desusu="+desusu+"&auto="+auto+"&ori="+ori+"&tiprips=rips_urgencia";

        guardar('../guardar_ripsconsulta',variables,'ripsconsulta');

    }

}

function addProce(){

    if(document.getElementById("servselproc").value==""){
       alert("No hay Ningun Procedimiento para Agregar, Verifique...");
    }else if(document.getElementById("txtusuario").value==""){
      most_prestador();
    }else{

    var num_elementos = document.getElementsByName("boton1").length;
    if(num_elementos<=0){
      document.getElementById('contenido').innerHTML = "<tr align='center'>"
        +"                                              <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 10px; ' > C&Oacute;DIGO</span> </td>"
        +"                                              <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 10px; '> DESCRIPCI&Oacute;N</span> </td>"
        +"                                              <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 10px; '> T. FACT. </span> </td>"
        +"                                              <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 10px; '> VALOR </span> </td>"
        +"                                              <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 10px; '> UNID. </span> </td>"
        +"                                              <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 10px; '> C. MOD </span> </td>"
        +"                                              <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 10px; '> COPAGO </span> </td>"
        +"                                              <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 10px; '> PORCEN </span> </td>"
        +"                                              <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 10px; '> TOTAL </span> </td>"
        +"                                              <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 10px; '> COD. TARIF. </span> </td>"
        +"                                              <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 10px; '> PRESTADOR. </span> </td>"
        +"                                              <td>&nbsp;</td>"
        +"                                              </tr>";

   }

    detserv=document.getElementById("servselproc").value.split("//");
    codProc=detserv[0];
    idProc=detserv[6];
    desProc=detserv[1];
    codTarif=detserv[7];

    valCons=document.getElementById("txtvalproc").value.replace(".","").replace(".","").replace(",",".");
    txtunidproc=document.getElementById("txtunidproc").value;
    txtcopproc=document.getElementById("txtcopproc").value.replace(".","").replace(".","").replace(",",".");
    txtcmod=document.getElementById("txtcmodproc").value.replace(".","").replace(".","").replace(",",".");
    txtporc=document.getElementById("txtporcproc").value.replace(".","").replace(".","").replace(",",".");
    txttot=document.getElementById("txttotproc").value.replace(".","").replace(".","").replace(",",".");
    codpres=document.getElementById("txtusuario").value;
    unidFunc=document.getElementById("unfunc").value;
    npc=document.getElementById("npc").value;
    
    
    if(document.getElementById("tfacind").checked==true){
    tfac="Individual"
  }else if(document.getElementById("tfacagr").checked==true){
       tfac="Agrupada"
    }else{
       tfac="Capitacion"
    }
    

    agregar_proc(codProc,desProc,tfac,document.getElementById("txtvalproc").value,txtunidproc,document.getElementById("txtcmodproc").value,document.getElementById("txtcopproc").value,document.getElementById("txtporcproc").value,document.getElementById("txttotproc").value,codTarif,codpres,idProc);

    document.getElementById("txtcodconsproc").value="";
    document.getElementById("txtconsproc").value="";
    document.getElementById("autoproc").value="";
    document.getElementById("txtvalproc").value="0,00";
    document.getElementById("txtunidproc").value="1";
    document.getElementById("txtcmodproc").value="0,00";
    document.getElementById("txtcopproc").value="0,00";
    document.getElementById("txtporcproc").value="0,00";
    document.getElementById("txtporcproc").value="0,00";
    document.getElementById("txttotproc").value="0,00";
    document.getElementById("servselproc").value="";
  }
}

function agregar_proc(codConsul,desConsul,fac_ind,valCons,uni,cuo_mode,copago,por,total,cod_tarifa,prestador,idp){

   var cont = document.getElementById("cont");
   var filas = document.getElementById("filas");
   cont.setAttribute("value", parseInt(cont.value,0)+1);
   var tabla = document.getElementById("contenido").tBodies[0];
   var fila = document.createElement("TR");
   fila.setAttribute("align","center");

   var celda2 = document.createElement("TD");
   var cod = document.createElement("INPUT");
   cod.setAttribute("type","text");
   cod.setAttribute("size","10");
   cod.setAttribute('style','font-size:7pt;' )
   cod.setAttribute("maxlength","18");
   cod.setAttribute("disabled","disabled");
   cod.setAttribute("value", codConsul);
   cod.setAttribute("name","cod");
   cod.setAttribute("id","cod" + cont.value);
   celda2.appendChild(cod);

   var celda3 = document.createElement("TD");
   var desp = document.createElement("INPUT");
   desp.setAttribute("type","text");
   desp.setAttribute("size","45");
   desp.setAttribute("maxlength","100");
   desp.setAttribute("disabled","disabled");
   desp.setAttribute('style','font-size:7pt;' )
   desp.setAttribute("value", desConsul);
   desp.setAttribute("name","desp");
   desp.setAttribute("id","desp" + cont.value);
   celda3.appendChild(desp);

   var celda6 = document.createElement("TD");
   var f_ind = document.createElement("INPUT");
   f_ind.setAttribute("type","text");
   f_ind.setAttribute("size","9");
   f_ind.setAttribute("disabled","disabled");
   f_ind.setAttribute('style','font-size:7pt;' )
   f_ind.setAttribute("value", fac_ind);
   f_ind.setAttribute("name","f_ind");
   f_ind.setAttribute("id","f_ind" + cont.value);
   celda6.appendChild(f_ind);

   var celda7 = document.createElement("TD");
   var valor = document.createElement("INPUT");
   valor.setAttribute("type","text");
   valor.setAttribute("size","12");
   valor.setAttribute('style','font-size:7pt;text-align: right')
   valor.setAttribute("disabled","disabled");
   valor.setAttribute("value", valCons);
   valor.setAttribute("name","valor");
   valor.setAttribute("id","valor" + cont.value);
   celda7.appendChild(valor);

   var celda8 = document.createElement("TD");
   var unid = document.createElement("INPUT");
   unid.setAttribute("type","text");
   unid.setAttribute("size","5");
   unid.setAttribute('style','font-size:7pt;text-align: right')
   unid.setAttribute("disabled","disabled");
   unid.setAttribute("value", uni);
   unid.setAttribute("name","unid");
   unid.setAttribute("id","unid" + cont.value);
   celda8.appendChild(unid);

   var celda9 = document.createElement("TD");
   var c_mod = document.createElement("INPUT");
   c_mod.setAttribute("type","text");
   c_mod.setAttribute("size","5");
   c_mod.setAttribute('style','font-size:7pt;text-align: right')
   c_mod.setAttribute("disabled","disabled");
   c_mod.setAttribute("value", cuo_mode);
   c_mod.setAttribute("name","c_mod");
   c_mod.setAttribute("id","c_mod" + cont.value);
   celda9.appendChild(c_mod);

   var celda15 = document.createElement("TD");
   var cop = document.createElement("INPUT");
   cop.setAttribute("type","text");
   cop.setAttribute("size","5");
   cop.setAttribute('style','font-size:7pt;text-align: right')
   cop.setAttribute("disabled","disabled");
   cop.setAttribute("value", copago);
   cop.setAttribute("name","cop");
   cop.setAttribute("id","cop" + cont.value);
   celda15.appendChild(cop);

   var celda10 = document.createElement("TD");
   var porc = document.createElement("INPUT");
   porc.setAttribute("type","text");
   porc.setAttribute("size","8");
   porc.setAttribute('style','font-size:7pt;text-align: right')
   porc.setAttribute("disabled","disabled");
   porc.setAttribute("value", por);
   porc.setAttribute("name","porc");
   porc.setAttribute("id","porc" + cont.value);
   celda10.appendChild(porc);


   var celda12 = document.createElement("TD");
   var tot = document.createElement("INPUT");
   tot.setAttribute("type","text");
   tot.setAttribute("size","12");
   tot.setAttribute('style','font-size:7pt;text-align: right')
   tot.setAttribute("disabled","disabled");
   tot.setAttribute("value", total);
   tot.setAttribute("name","tot");
   tot.setAttribute("id","tot" + cont.value);
   celda12.appendChild(tot);

   var celda13 = document.createElement("TD");
   var cod_tar = document.createElement("INPUT");
   cod_tar.setAttribute("type","text");
   cod_tar.setAttribute("size","8");
   cod_tar.setAttribute('style','font-size:7pt;')
   cod_tar.setAttribute("disabled","disabled");
   cod_tar.setAttribute("value", cod_tarifa);
   cod_tar.setAttribute("name","cod_tar");
   cod_tar.setAttribute("id","cod_tar" + cont.value);
   celda13.appendChild(cod_tar);

   var celda14 = document.createElement("TD");
   var prest = document.createElement("INPUT");
   prest.setAttribute("type","text");
   prest.setAttribute("size","8");
   prest.setAttribute('style','font-size:7pt;')
   prest.setAttribute("disabled","disabled");
   prest.setAttribute("value", prestador);
   prest.setAttribute("name","tipServ");
   prest.setAttribute("id","tipServ" + cont.value);
   celda14.appendChild(prest);

   var celda16 = document.createElement("TD");
   var idproc = document.createElement("INPUT");
   idproc.setAttribute("type","text");
   idproc.setAttribute("size","8");
   idproc.setAttribute('style','font-size:7pt;display:none;')
   idproc.setAttribute("disabled","disabled");
   idproc.setAttribute("value", idp);
   idproc.setAttribute("name","idproc");
   idproc.setAttribute("id","idproc" + cont.value);
   celda16.appendChild(idproc);

   var celda11 = document.createElement('TD');
   var boton = document.createElement('INPUT');
   boton.setAttribute('type','button');
   boton.setAttribute('value','X');
   boton.setAttribute('id','boton1' + cont.value);
   boton.setAttribute('name','boton1');
   boton.setAttribute('title','Quitar de la lista');
   boton.setAttribute('style','font-size:7pt; padding:2px 2px 2px 2px; margin; margin: 0px 4px 4px 0px;');
   boton.onclick=function(){
       borrarFila(this, this.id);
   }
   celda11.appendChild(boton);

    //fila.appendChild(celda1);
    fila.appendChild(celda2);
    fila.appendChild(celda3);
    fila.appendChild(celda6);
    fila.appendChild(celda7);
    fila.appendChild(celda8);
    fila.appendChild(celda9);
    fila.appendChild(celda15);
    fila.appendChild(celda10);
    fila.appendChild(celda12);
    fila.appendChild(celda13);
    fila.appendChild(celda14);
    fila.appendChild(celda11);
    fila.appendChild(celda16);
    tabla.appendChild(fila);

}

function nuev_ripsUrg(){

  id_pac=document.getElementById("txtcod").value;

 if(id_pac==""){
    alert("Seleccione el Paciente");
 }else{
  ajax = ObjetoAjax();
  ajax.open("POST", "../conripsguar", true);
  ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  ajax.send("id_pac="+id_pac+"&ori=cons");
  ajax.onreadystatechange=function() {
  if (ajax.readyState==4) {
     document.getElementById('sel_cons').innerHTML = ajax.responseText
  }
 }

 document.getElementById("sel_cons").selectedIndex=0;
 document.getElementById("fecserv").value="";
 document.getElementById("txtusuario").value="";
 document.getElementById("txtpres").value="";
 document.getElementById("fingre").value=document.getElementById("focul").value;
 document.getElementById("txthing").value="12";
 document.getElementById("txtming").value="00";
 document.getElementById("fhor").value="AM";
 document.getElementById("auto").value="";
 document.getElementById("diagPrinc").selectedIndex=0;
 document.getElementById("finCons").selectedIndex=0;
 document.getElementById("cExter").selectedIndex=0;
 document.getElementById("txtdiagprinc").value="";
 document.getElementById("txtdesdiagprinc").value="";
 document.getElementById("codDiag1").value="";
 document.getElementById("desccodDiag1").value="";
 document.getElementById("codDiag2").value="";
 document.getElementById("descodDiag2").value="";
 document.getElementById("codDiag3").value="";
 document.getElementById("descodDiag3").value="";
 document.getElementById("digSalid").value="";
 document.getElementById("desdigSalid").value="";
 document.getElementById("digSalid1").value="";
 document.getElementById("desdigSalid1").value="";
 document.getElementById("digSalid2").value="";
 document.getElementById("desdigSalid2").value="";
 document.getElementById("digSalid3").value="";
 document.getElementById("desdigSalid3").value="";
 document.getElementById("cauMuerte").value="";
 document.getElementById("descauMuerte").value="";
 document.getElementById("desusu").selectedIndex=0;
 document.getElementById("estSal").selectedIndex=0;
 document.getElementById("fegre").value=document.getElementById("focul").value;
 document.getElementById("txthegr").value="12";
 document.getElementById("txtmegr").value="00";
 document.getElementById("fhore").value="AM";

  document.getElementById("sel_cons").disabled=false;
 document.getElementById("txtusuario").disabled=false;
 document.getElementById("fingre").value.disabled=false;
 document.getElementById("txthing").disabled=false;
 document.getElementById("txtming").disabled=false;
 document.getElementById("fhor").disabled=false;
 document.getElementById("auto").disabled=false;
 document.getElementById("diagPrinc").disabled=false;
 document.getElementById("finCons").disabled=false;
 document.getElementById("cExter").disabled=false;
 document.getElementById("txtdiagprinc").disabled=false;
 document.getElementById("codDiag1").disabled=false;
 document.getElementById("codDiag2").disabled=false;
 document.getElementById("codDiag3").disabled=false;
 document.getElementById("digSalid").disabled=false;
 document.getElementById("digSalid1").disabled=false;
 document.getElementById("digSalid2").disabled=false;
 document.getElementById("digSalid3").disabled=false;
 document.getElementById("cauMuerte").disabled=false;
 document.getElementById("desusu").disabled=false;
 document.getElementById("estSal").disabled=false;
 document.getElementById("fegre").disabled=false;
 document.getElementById("txthegr").disabled=false;
 document.getElementById("txtmegr").disabled=false;
 document.getElementById("fhore").disabled=false;

 document.getElementById('btn_cancelar').setAttribute("style", "display:block;width: 60px;");
 document.getElementById('btn_guardar').setAttribute("style", "display:block;width: 60px;");
 document.getElementById('btn_nuevo').setAttribute("style", "display:none;width: 60px;");

 document.getElementById('btn_prest').setAttribute("href", "javascript:most_prestador()");
 document.getElementById('btn_dx_ingresourg').setAttribute("href", "javascript:buscar_dx('dx_ingresourg')");
 document.getElementById('btn_dx_diag1').setAttribute("href", "javascript:buscar_dx('dx_diag1')");
 document.getElementById('btn_dx_diag2').setAttribute("href", "javascript:buscar_dx('dx_diag2')");
 document.getElementById('btn_dx_diag3').setAttribute("href", "javascript:buscar_dx('dx_diag3')");

 document.getElementById('btn_dia_1').setAttribute("href", "javascript:buscar_dx('dia_1')");
 document.getElementById('btn_dia_2').setAttribute("href", "javascript:buscar_dx('dia_2')");
 document.getElementById('btn_dia_3').setAttribute("href", "javascript:buscar_dx('dia_3')");
 document.getElementById('btn_dia_4').setAttribute("href", "javascript:buscar_dx('dia_4')");
 document.getElementById('btn_forMuerte').setAttribute("href", "javascript:buscar_dx('forMuerte')");
 }

}

function canc_ripsUrg(){

 document.getElementById("sel_cons").selectedIndex=0;
 document.getElementById("fecserv").value="";
 document.getElementById("txtusuario").value="";
 document.getElementById("txtpres").value="";
 document.getElementById("fingre").value=document.getElementById("focul").value;
 document.getElementById("txthing").value="12";
 document.getElementById("txtming").value="00";
 document.getElementById("fhor").value="AM";
 document.getElementById("auto").value="";
 document.getElementById("diagPrinc").selectedIndex=0;
 document.getElementById("finCons").selectedIndex=0;
 document.getElementById("cExter").selectedIndex=0;
 document.getElementById("txtdiagprinc").value="";
 document.getElementById("txtdesdiagprinc").value="";
 document.getElementById("codDiag1").value="";
 document.getElementById("desccodDiag1").value="";
 document.getElementById("codDiag2").value="";
 document.getElementById("descodDiag2").value="";
 document.getElementById("codDiag3").value="";
 document.getElementById("descodDiag3").value="";
 document.getElementById("digSalid").value="";
 document.getElementById("desdigSalid").value="";
 document.getElementById("digSalid1").value="";
 document.getElementById("desdigSalid1").value="";
 document.getElementById("digSalid2").value="";
 document.getElementById("desdigSalid2").value="";
 document.getElementById("digSalid3").value="";
 document.getElementById("desdigSalid3").value="";
 document.getElementById("cauMuerte").value="";
 document.getElementById("descauMuerte").value="";
 document.getElementById("desusu").selectedIndex=0;
 document.getElementById("estSal").selectedIndex=0;
 document.getElementById("fegre").value=document.getElementById("focul").value;
 document.getElementById("txthegr").value="12";
 document.getElementById("txtmegr").value="00";
 document.getElementById("fhore").value="AM";

  document.getElementById("sel_cons").disabled=true;
 document.getElementById("txtusuario").disabled=true;
 document.getElementById("fingre").value.disabled=true;
 document.getElementById("txthing").disabled=true;
 document.getElementById("txtming").disabled=true;
 document.getElementById("fhor").disabled=true;
 document.getElementById("auto").disabled=true;
 document.getElementById("diagPrinc").disabled=true;
 document.getElementById("finCons").disabled=true;
 document.getElementById("cExter").disabled=true;
 document.getElementById("txtdiagprinc").disabled=true;
 document.getElementById("codDiag1").disabled=true;
 document.getElementById("codDiag2").disabled=true;
 document.getElementById("codDiag3").disabled=true;
 document.getElementById("digSalid").disabled=true;
 document.getElementById("digSalid1").disabled=true;
 document.getElementById("digSalid2").disabled=true;
 document.getElementById("digSalid3").disabled=true;
 document.getElementById("cauMuerte").disabled=true;
 document.getElementById("desusu").disabled=true;
 document.getElementById("estSal").disabled=true;
 document.getElementById("fegre").disabled=true;
 document.getElementById("txthegr").disabled=true;
 document.getElementById("txtmegr").disabled=true;
 document.getElementById("fhore").disabled=true;

 document.getElementById('btn_cancelar').setAttribute("style", "display:none;width: 60px;");
 document.getElementById('btn_guardar').setAttribute("style", "display:none;width: 60px;");
 document.getElementById('btn_nuevo').setAttribute("style", "display:block;width: 60px;");

 document.getElementById('btn_prest').setAttribute("href", "#");
 document.getElementById('btn_dx_ingresourg').setAttribute("href", "#");
 document.getElementById('btn_dx_diag1').setAttribute("href", "#");
 document.getElementById('btn_dx_diag2').setAttribute("href", "#");
 document.getElementById('btn_dx_diag3').setAttribute("href", "#");

 document.getElementById('btn_dia_1').setAttribute("href", "#");
 document.getElementById('btn_dia_2').setAttribute("href", "#");
 document.getElementById('btn_dia_3').setAttribute("href", "#");
 document.getElementById('btn_dia_4').setAttribute("href", "#");
 document.getElementById('btn_forMuerte').setAttribute("href", "#");


}

function actserv(op){
if(op=="ok"){
     alert("Operaci\u00f3n Realizada Exitosamente");
}
 id_pac=document.getElementById("txtcod").value;
 ajax = ObjetoAjax();
 ajax.open("POST", "../actserv", true);
 ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
 ajax.send("id_pac="+id_pac);
 ajax.onreadystatechange=function() {
 if (ajax.readyState==4) {
     document.getElementById('contenido').innerHTML = ajax.responseText
  }
 }

 document.getElementById('btn_guardar').setAttribute("style", "display:none;width: 60px;");
 document.getElementById('btn_nuevo').setAttribute("style", "display:block;width: 60px;");
}

function recaudo(prog){
  if(document.getElementById("id_pac").value==""){
      alert("No se a Cargado el Paciente, Verifique...");
      document.getElementById("id_pac").focus();
  }else{
    datos = document.getElementById("txtcod").value+"//"+document.getElementById("id_pac").value+"//"+document.getElementById("txtnom").value+"//"+document.getElementById("ffinal").value;
    window.open("../reg_recaudo?datos="+datos+"&ori="+prog,"ventana_recaudo_urge","width=900, height=580, scrollbars=YES, menubar=no, location=no, resizable=no");
  }
}

function cambiacolor_over_check(id){
    document.getElementById(id).style.backgroundColor="#E2F0FD";
}

function cambiacolor_out_check(id){
id2=id.substring(1);
if(document.getElementById("check"+id2).checked!=true){
 document.getElementById(id).style.backgroundColor="#ffffff";
}
}

function cambiacolor_out_check2(id){
id2=id.substring(2);
if(document.getElementById("check2"+id2).checked!=true){
 document.getElementById(id).style.backgroundColor="#ffffff";
}
}

function cambiacolor_out_check3(id){
id2=id.substring(2);
if(document.getElementById("check3"+id2).checked!=true){
 document.getElementById(id).style.backgroundColor="#ffffff";
}
}


function sel_fila_check(id){
    id2=id.substring(1);
    if(document.getElementById("f"+id2).checked==false){
        document.getElementById("f"+id2).checked=true;
        document.getElementById("f"+id2).style.backgroundColor="#E2F0FD";
    }else{
        document.getElementById("f"+id2).checked=false;
        document.getElementById("f"+id2).style.backgroundColor="#ffffff";
    }
}

function sel_fila_check2(id){
    id2=id.substring(2);
    if(document.getElementById("f2"+id2).checked==false){
        document.getElementById("f2"+id2).checked=true;
        document.getElementById("f2"+id2).style.backgroundColor="#E2F0FD";
    }else{
        document.getElementById("f2"+id2).checked=false;
        document.getElementById("f2"+id2).style.backgroundColor="#ffffff";
    }
}
function sel_fila_check3(id){
    id2=id.substring(2);
    if(document.getElementById("f3"+id2).checked==false){
        document.getElementById("f3"+id2).checked=true;
        document.getElementById("f3"+id2).style.backgroundColor="#E2F0FD";
    }else{
        document.getElementById("f3"+id2).checked=false;
        document.getElementById("f3"+id2).style.backgroundColor="#ffffff";
    }
}


function guar_recaudo(ori){
    var servicios="";
    var detpago="";
    control="1";
     dif=document.getElementById("dife").value;
    if(dif!="0,00"){
        alert("La Diferencia debe ser igual a Cero(0), Verifique...");
        control="0";
    }

    fecha=document.getElementById("fech").value;
    valorSer=document.getElementById("txttotalser").value.replace(".","").replace(".","").replace(",",".");
    cod_pac=document.getElementById("txtcod").value;
    observ=document.getElementById("observ").value;
    tipo_serv=document.getElementById("tip_serv").value;


    for(var i=1; i<=3; i++){
         codi=document.getElementById("codigo"+i).value;
         aut=document.getElementById("auto"+i).value.replace(".","").replace(".","").replace(",",".");
         val=document.getElementById("val"+i).value.replace(".","").replace(".","").replace(",",".");
         if(val!="0.00"){
             detpago+=codi+"//"+aut+"//"+val+";";
         }
    }

      var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){
        if(document.getElementsByName("seleccion")[contador].checked == true)
          var valor = document.getElementsByName("seleccion")[contador].value;
          servicios=servicios+valor+";";
    }


  variables="fecha="+fecha+"&valor="+valorSer+"&cod_pac="+cod_pac+"&obser="+observ+"&servicios="+servicios+"&detpago="+detpago+"&tipo_serv="+tipo_serv+"&ori="+ori;
  if(document.getElementById("val3").value!="0,00"){
   if(document.getElementById("auto3").value==""){
       alert("Digite la autorizacion para el descuento.");
       control="0";
   }
  }

  if(control=="1"){
      guardar('../guardar_recaudo',variables,'recaudo');
      document.getElementById('btn_nuevo').setAttribute("style", "display:block;width: 60px;");
      document.getElementById('btn_guardar').setAttribute("style", "display:none;width: 60px;");
      document.getElementById('btn_cancelar').setAttribute("style", "display:none;width: 60px;");
      document.getElementById('btn_imprimir').setAttribute("style", "display:block;width: 60px;");
      document.getElementById('btn_todos').setAttribute("style", "display:block;width: 60px;");
  }

}

function abil_aut(val){
    if(val!="0,00"){
        document.getElementById("auto3").disabled=false;
    }else{
        document.getElementById("auto3").disabled=true;
    }
}

function recaltotal(tip){

  des1=parseFloat(document.getElementById("val2").value.replace(".","").replace(".","").replace(",","."));
  //des2=parseFloat(document.getElementById("val3").value.replace(".","").replace(".","").replace(",","."));PENDIENTE
  vserv=parseFloat(document.getElementById("val1").value.replace(".","").replace(".","").replace(",","."));
  tserv=parseFloat(document.getElementById("txttotalser").value.replace(".","").replace(".","").replace(",","."));

//  total1=vserv-des1;
//  total2=tserv-total1;
 
  total1=tserv-vserv;
 

  rta=eval(tserv.toFixed(2));
  res=rta.toString().split('.');
  if(res[1]== undefined) {
     res[1]='00';
   }
  if(res[1].length<2) {
     res[1]=res[1]+'0';
   }

//  document.getElementById("oformpag").value= moneda(res[0])+","+res[1];
  /////

   rta=eval(total1.toFixed(2));
  res=rta.toString().split('.');
  if(res[1]== undefined) {
     res[1]='00';
   }
  if(res[1].length<2) {
     res[1]=res[1]+'0';
   }
   
   document.getElementById("val2").value= moneda(res[0])+","+res[1];

//  if(total2>=0){
//     document.getElementById("dife").style.color="black";
//     document.getElementById("dife").value= moneda(res[0])+","+res[1];
//  }else{
//     document.getElementById("dife").style.color="red";
//     document.getElementById("dife").value= moneda(res[0])+","+res[1];
//  }

}

function selservreca(id){

   if(document.getElementById(id).checked==false){
        para=document.getElementById(id).value.split("//");

        val=parseFloat(para[5]);
        totserv=parseFloat(document.getElementById("txttotalser").value.replace(".","").replace(".","").replace(",","."));

        ntotal=totserv-val;
        rta=eval(ntotal.toFixed(2));

        res=rta.toString().split('.');
        if(res[1]== undefined) {
            res[1]='00';
        }
        if(res[1].length<2) {
            res[1]=res[1]+'0';
        }

        document.getElementById("txttotalser").value= moneda(res[0])+","+res[1];
        document.getElementById("servmark").value= moneda(res[0])+","+res[1];

        document.getElementById("val1").value= moneda(res[0])+","+res[1];
        des1=parseFloat(document.getElementById("val2").value.replace(".","").replace(".","").replace(",","."));
        des2=parseFloat(document.getElementById("val3").value.replace(".","").replace(".","").replace(",","."));
        totserv=parseFloat(document.getElementById("val1").value.replace(".","").replace(".","").replace(",","."));
        ntoatal=totserv-des1;
        ntoatal=ntoatal-des2;
        otforpa=ntoatal+des1+des2;

        rta=eval(ntoatal.toFixed(2));

        res=rta.toString().split('.');
        if(res[1]== undefined) {
            res[1]='00';
        }
        if(res[1].length<2) {
            res[1]=res[1]+'0';
        }
        document.getElementById("val1").value= moneda(res[0])+","+res[1];

        ////

        rta=eval(otforpa.toFixed(2));

        res=rta.toString().split('.');
        if(res[1]== undefined) {
            res[1]='00';
        }
        if(res[1].length<2) {
            res[1]=res[1]+'0';
        }
        document.getElementById("oformpag").value= moneda(res[0])+","+res[1];

    }else{
        para=document.getElementById(id).value.split("//");
        val=parseFloat(para[5]);
        totserv=parseFloat(document.getElementById("txttotalser").value.replace(".","").replace(".","").replace(",","."));

        ntotal=totserv+val;
        rta=eval(ntotal.toFixed(2));

        res=rta.toString().split('.');
        if(res[1]== undefined) {
            res[1]='00';
        }
        if(res[1].length<2) {
            res[1]=res[1]+'0';
        }

        document.getElementById("txttotalser").value= moneda(res[0])+","+res[1];
        document.getElementById("servmark").value= moneda(res[0])+","+res[1];
        document.getElementById("oformpag").value= moneda(res[0])+","+res[1];

        document.getElementById("val1").value= moneda(res[0])+","+res[1];
        des1=parseFloat(document.getElementById("val2").value.replace(".","").replace(".","").replace(",","."));
        des2=parseFloat(document.getElementById("val3").value.replace(".","").replace(".","").replace(",","."));
        totserv=parseFloat(document.getElementById("val1").value.replace(".","").replace(".","").replace(",","."));
        ntoatal= totserv-des1;
        ntoatal=ntoatal-des2;

         rta=eval(ntoatal.toFixed(2));

        res=rta.toString().split('.');
        if(res[1]== undefined) {
            res[1]='00';
        }
        if(res[1].length<2) {
            res[1]=res[1]+'0';
        }
        document.getElementById("val1").value= moneda(res[0])+","+res[1];
    }
}

function sel_plan(ori){
    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    pvalor=valor.split("&&");
    ajax = ObjetoAjax();
    ajax.open("POST", "../cons_pacient", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("ident="+pvalor[1]+"&id_plan="+pvalor[0]);
    ajax.onreadystatechange=function() {
     if (ajax.readyState==4) {
            res = ajax.responseText;
            par_pac=res.split("//");

           if(ori=="factvent"){
           document.getElementById('id_pac').value=par_pac[0];
            document.getElementById('txtcod').value=par_pac[1];
            document.getElementById('txtnom').value=par_pac[2];
            document.getElementById('txttusu').value=par_pac[3];
           }else if(ori=="dhosp"){
            document.getElementById('id_pac').value=par_pac[0];
            document.getElementById('txtcod').value=par_pac[1];
            document.getElementById('txtnom').value=par_pac[2];
            document.getElementById('txttusu').value=par_pac[3];
            document.getElementById('btn_nuevo').setAttribute("style", "display:block;width: 60px;");
            document.getElementById('btn_cancelar').setAttribute("style", "display:block;width: 60px;");
            document.getElementById('btn_guardar').setAttribute("style", "display:none;width: 60px;");
            }else{
             document.getElementById('id_pac').value=par_pac[0];
            document.getElementById('txtcod').value=par_pac[1];
            document.getElementById('txtnom').value=par_pac[2];
            document.getElementById('txttusu').value=par_pac[3];
            document.getElementById('txtniv').value=par_pac[4];
            }


            /////////////planes paciente

            if(trimAll(par_pac[5])=="0"){
               alert("El Paciente no Tiene Administradoras Asociadas, Desea Asociarselas ahora?");
            }else if(trimAll(par_pac[5])=="1"){
                p_res=par_pac[6].split("#/");
                ffin=p_res[6].split("-");
                fini=p_res[5].split("-");

                if(parseInt(p_res[2])<0){
                    alert("El Contrato no ha Iniciado, La Fecha de Inicio del Contrato es "+fini[2]+"/"+fini[1]+"/"+fini[0]+", Verifique el Contrato");
                    document.getElementById("unfunc").focus();
                }else if(parseInt(p_res[3])<0){
                    alert("El Contrato se Encuentra Vencido, La Fecha de Finalizacion del Contrato es "+ffin[2]+"/"+ffin[1]+"/"+ffin[0]+", Verifique el Contrato");
                    document.getElementById("unfunc").focus();
                }else{

                   if(ori=="infserv"){
                    document.getElementById("txtnomadm").value=p_res[1];
                    document.getElementById("txtnomplan").value=p_res[0];
                    document.getElementById("txtreg").value=p_res[4];
                    document.getElementById('contenido').innerHTML =p_res[7];
                    document.getElementById("unfunc").focus();
                    document.getElementById('btn_nuevo').setAttribute("style", "display:block;width: 60px;");
                    document.getElementById('btn_cancelar').setAttribute("style", "display:block;width: 60px;");
                   if(p_res[8]=="s"){
                            document.getElementById('btn_facturar').setAttribute("style", "display:none;width: 60px;");
                            document.getElementById('btn_orden').setAttribute("style", "display:block;width: 60px;");
                            habtfact("s");
                        }else{
                            document.getElementById('btn_facturar').setAttribute("style", "display:block;width: 60px;");
                            document.getElementById('btn_orden').setAttribute("style", "display:none;width: 60px;");
                              habtfact("n");

                        }
                   }else if(ori=="asigmedi"){
                    document.getElementById("txtnomadm").value=p_res[1];
                    document.getElementById("txtnomplan").value=p_res[0];
                    document.getElementById("txtregadmin").value=p_res[4];
//                    document.getElementById('contenido').innerHTML =p_res[7];
//                    document.getElementById("unfunc").focus();
//                    document.getElementById('btn_nuevo').setAttribute("style", "display:block;width: 60px;");
//                    document.getElementById('btn_cancelar').setAttribute("style", "display:block;width: 60px;");
                  }else if(ori=="factvent"){
                    document.getElementById("txtnomadm").value=p_res[1];
                    document.getElementById("txtnomplan").value=p_res[0];
                    document.getElementById("txtregadmin").value=p_res[4];
                    document.getElementById('btn_guardar').setAttribute("style", "display:block;width: 60px;");
                    document.getElementById("buscapacientes").style.visibility = 'hidden';
                    habil_campos();

                   }
                    document.getElementById('td_planes').innerHTML="";
                    Cerrarpopu('selPlanes');
                }
            }

         }

    }
}

function habtfact(tplan){
    if(tplan=="s"){
        document.getElementById('tplan').value="1";
        document.getElementById('agr').setAttribute("style", "display:none;");
        document.getElementById('cap').setAttribute("style", "display:block");
        document.getElementById('tfaccap').checked=true;
        //
        document.getElementById('agrproc').setAttribute("style", "display:none;");
        document.getElementById('capproc').setAttribute("style", "display:block;");
        document.getElementById('tcapaproc').checked=true;
    }else{

        document.getElementById('agr').setAttribute("style", "display:block;");
        document.getElementById('cap').setAttribute("style", "display:none;");

        ///

        document.getElementById('agrproc').setAttribute("style", "display:true;");
        document.getElementById('capproc').setAttribute("style", "display:none;");
        document.getElementById('tcapaproc').checked=true;
    }

}

function fact_urge(){

    if(document.getElementById("id_pac").value==""){
      alert("No se a Cargado el Paciente, Verifique...");
      document.getElementById("id_pac").focus();
  }else{
    datos = document.getElementById("txtcod").value+"//"+document.getElementById("id_pac").value+"//"+document.getElementById("txtnom").value+"//"+document.getElementById("txttusu").value+"//"+document.getElementById("txtnomadm").value+"//"+document.getElementById("txtnomplan").value+"//"+document.getElementById("txtreg").value;
    window.open("../facturar_urge?datos="+datos+"&origen=fact_serv","ventana_factura_urge","width=1200, height=580, scrollbars=YES, menubar=no, location=no, resizable=no");

  }
}

function fact_fact(){

    if(document.getElementById("id_pac").value==""){
      alert("No se a Cargado el Paciente, Verifique...");
      document.getElementById("id_pac").focus();
  }else{
    datos = document.getElementById("txtcod").value+"//"+document.getElementById("id_pac").value+"//"+document.getElementById("txtnom").value+"//"+document.getElementById("txttusu").value+"//"+document.getElementById("txtnomadm").value+"//"+document.getElementById("txtnomplan").value+"//"+document.getElementById("txtregadmin").value;
    window.open("../facturar_fact?datos="+datos+"&origen=fact_serv","ventana_factura_fact","width=1200, height=580, scrollbars=YES, menubar=no, location=no, resizable=no");

  }
}

function ordeInt_hospi(){

    if(document.getElementById("id_pac").value==""){
      alert("No se a Cargado el Paciente, Verifique...");
      document.getElementById("id_pac").focus();
  }else{
    datos = document.getElementById("txtcod").value+"//"+document.getElementById("id_pac").value+"//"+document.getElementById("txtnom").value+"//"+document.getElementById("txttusu").value+"//"+document.getElementById("txtnomadm").value+"//"+document.getElementById("txtnomplan").value+"//"+document.getElementById("txtregadmin").value;
    window.open("../orden_internaHospi?datos="+datos+"&origen=ordeInt_serv","ventana_factura_hosp","width=1200, height=580, scrollbars=YES, menubar=no, location=no, resizable=no");

  }
}

function ordeInt_Ambu(){

    if(document.getElementById("id_pac").value==""){
      alert("No se a Cargado el Paciente, Verifique...");
      document.getElementById("id_pac").focus();
  }else{
    datos = document.getElementById("txtcod").value+"//"+document.getElementById("id_pac").value+"//"+document.getElementById("txtnom").value+"//"+document.getElementById("txttusu").value+"//"+document.getElementById("txtnomadm").value+"//"+document.getElementById("txtnomplan").value+"//"+document.getElementById("txtreg").value;
    window.open("../orden_internaAmbu?datos="+datos+"&origen=ordeInt_serv","ventana_factura_hosp","width=1200, height=580, scrollbars=YES, menubar=no, location=no, resizable=no");

  }
}

function ordeInt_fact(){

    if(document.getElementById("id_pac").value==""){
      alert("No se a Cargado el Paciente, Verifique...");
      document.getElementById("id_pac").focus();
  }else{
    datos = document.getElementById("txtcod").value+"//"+document.getElementById("id_pac").value+"//"+document.getElementById("txtnom").value+"//"+document.getElementById("txttusu").value+"//"+document.getElementById("txtnomadm").value+"//"+document.getElementById("txtnomplan").value+"//"+document.getElementById("txtregadmin").value;
    window.open("../orden_internafact?datos="+datos+"&origen=ordeInt_serv","ventana_factura_fact","width=1200, height=580, scrollbars=YES, menubar=no, location=no, resizable=no");

  }
}

function ordeInt_urge(){

    if(document.getElementById("id_pac").value==""){
      alert("No se a Cargado el Paciente, Verifique...");
      document.getElementById("id_pac").focus();
  }else{
    datos = document.getElementById("txtcod").value+"//"+document.getElementById("id_pac").value+"//"+document.getElementById("txtnom").value+"//"+document.getElementById("txttusu").value+"//"+document.getElementById("txtnomadm").value+"//"+document.getElementById("txtnomplan").value+"//"+document.getElementById("txtreg").value;
    window.open("../orden_interna?datos="+datos+"&origen=ordeInt_serv","ventana_OrdenInterna","width=1200, height=580, scrollbars=YES, menubar=no, location=no, resizable=no");

  }
}

function liqFact(ori){

    id_pac=document.getElementById("txtcod").value;
    feci=document.getElementById("fini").value;
    fecf=document.getElementById("ffin").value;
//    planAdmin=document.getElementById("plan").value;
    if(id_pac==""){
        alert("Debe Digitar la Identificacion del Paciente, Verifique...");
        document.getElementById("id_pac").focus();
    }else{
//        planAdmin=document.getElementById("plan").value.split("-");
        plan=document.getElementById("txtnomplan").value;
        admi=document.getElementById("txtnomadm").value;

        ajax = ObjetoAjax();
        if(ori=="hosp"){
           ajax.open("POST", "../consFacIndHosp", true);
        }else if(ori=="fact"){
            ajax.open("POST", "../consFacIndFact", true);
        }else{
           ajax.open("POST", "../conFacInd", true);
        }
        
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send("id_pac="+id_pac+"&feci="+feci+"&fecf="+fecf+"&plan="+plan+"&admi="+admi);
        ajax.onreadystatechange=function() {
            if (ajax.readyState==4) {
                par=ajax.responseText.split("--");

                document.getElementById('contenido').innerHTML = par[0];
                document.getElementById('subtotal').value = par[1];
                document.getElementById('copag').value = par[2];
                document.getElementById('cutM').value = par[3];
                document.getElementById('porc').value = par[4];
                document.getElementById('deducc').value = par[5];
                document.getElementById('totalG').value = par[6];
            }
        }
    }

}

function liqFactAgrup(){

    prog=document.getElementById("factx").value;
    planAdm=document.getElementById("planAdm").value;
    feci=document.getElementById("fini").value;
    fecf=document.getElementById("ffin").value;
    if(planAdm==""){
       if(prog=="admin"){
           alert("Seleccione la Administradora a Facturar, Verifique ");
       }else{
           alert("Seleccione el plan a Facturar, Verifique ");
       }

    }else{
        ajax = ObjetoAjax();
        ajax.open("POST", "../consFacAgrup", true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send("prog="+prog+"&feci="+feci+"&fecf="+fecf+"&planAdm="+planAdm);
        ajax.onreadystatechange=function() {
            if (ajax.readyState==4) {
                par=ajax.responseText.split("--");

                document.getElementById('contenido').innerHTML = par[0];
                document.getElementById('subtotal').value = par[1];
                document.getElementById('copag').value = par[2];
                document.getElementById('cutM').value = par[3];
                document.getElementById('porc').value = par[4];
//                document.getElementById('deducc').value = par[5];
                document.getElementById('totalG').value = par[6];
            }
        }
    }
}

function caldesFactAgrup(){
    copag=parseFloat(document.getElementById("copag").value.replace(".","").replace(".","").replace(",","."));
    cutM=parseFloat(document.getElementById("cutM").value.replace(".","").replace(".","").replace(",","."));
    porc=parseFloat(document.getElementById("porc").value.replace(".","").replace(".","").replace(",","."));
    desc=parseFloat(document.getElementById("desc").value.replace(".","").replace(".","").replace(",","."));
    totded=copag+cutM+porc+desc;

    rta=eval(totded.toFixed(2));

    res=rta.toString().split('.');
    if(res[1]== undefined) {
        res[1]='00';
    }
    if(res[1].length<2) {
        res[1]=res[1]+'0';
    }
//    document.getElementById("retenc").value= moneda(res[0])+","+res[1];
    subtotal=parseFloat(document.getElementById("subtotal").value.replace(".","").replace(".","").replace(",","."));

    gtotal=subtotal-totded;
    rta=eval(gtotal.toFixed(2));

    res=rta.toString().split('.');
    if(res[1]== undefined) {
        res[1]='00';
    }
    if(res[1].length<2) {
        res[1]=res[1]+'0';
    }
    document.getElementById("totalG").value= moneda(res[0])+","+res[1];

}


function caldedTot(){
    copag=parseFloat(document.getElementById("copag").value.replace(".","").replace(".","").replace(",","."));
    cutM=parseFloat(document.getElementById("cutM").value.replace(".","").replace(".","").replace(",","."));
    porc=parseFloat(document.getElementById("porc").value.replace(".","").replace(".","").replace(",","."));
    desc=parseFloat(document.getElementById("desc").value.replace(".","").replace(".","").replace(",","."));
    totded=copag+cutM+porc+desc;

    rta=eval(totded.toFixed(2));

    res=rta.toString().split('.');
    if(res[1]== undefined) {
        res[1]='00';
    }
    if(res[1].length<2) {
        res[1]=res[1]+'0';
    }
    document.getElementById("deducc").value= moneda(res[0])+","+res[1];
    subtotal=parseFloat(document.getElementById("subtotal").value.replace(".","").replace(".","").replace(",","."));

    gtotal=subtotal-totded;
    rta=eval(gtotal.toFixed(2));

    res=rta.toString().split('.');
    if(res[1]== undefined) {
        res[1]='00';
    }
    if(res[1].length<2) {
        res[1]=res[1]+'0';
    }
    document.getElementById("totalG").value= moneda(res[0])+","+res[1];

}

function cancel_fact(){

    document.getElementById('contenido').innerHTML =" <div id='contenido'><fieldset class='redondo'   style=' width:99%; padding: 5px 0 5px 0; margin-bottom: 5px; border-color: #CCCCCC'>"
    +"                       <legend style='font-weight: bold;' ><div id='tit'>DETALLE DE FACTURA</div>"
    +"                       </legend>"
    +"                       <div class='content'  style='width:96%; border: 1px solid #aaaaaa; overflow:scroll;'>"
    +"                               <table width='100%' cellpadding='0' cellspacing='0' class='data' id='box-table-a' >"
    +"                                   <thead style='font-size: 12px'>"
    +"                                      <tr>"
    +"                                          <th  style='font-size: 11px;'  scope='col' >FECHA</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>C&Oacute;DIGO</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>CONCEPTO</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>CANT.</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>VALOR UNT</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>VALOR TOTAL</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>COP</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>CM</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>POR</th>"
    +"                                          <th  style='font-size: 11px;' scope='col'>M&Oacute;DULO</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>UF</th>"
    +"                                          <th  style='font-size: 11px;' scope='col'>CUENTA</th>"
    +"                                          <th  style='font-size: 11px;' scope='col'>CC</th>"
    +"                                          <th  style='font-size: 11px;' scope='col'>GRUPO</th>"
    +"                                          <th  style='font-size: 11px;' scope='col'>CLASE</th>"
    +"                                      </tr>"
    +"                                 </thead>"
    +"                             </table>"
    +"                         <div style='width: 100%;height: 100px; overflow: auto;'>"
    +"                             <table width='100%' cellpadding='0' cellspacing='0' class='data' id='box-table-a'>"
    +"                             <tbody id='tabemp' style='font-size: 14px;'>"
    +"                              </tbody>"
    +"                              </table>"
    +"                          </div>"
    +"                          </div>"
    +"                  </fieldset></div>";
    document.getElementById('subtotal').value = "0,00";
    document.getElementById('copag').value = "0,00";
    document.getElementById('cutM').value = "0,00";
    document.getElementById('porc').value = "0,00";
    document.getElementById('deducc').value = "0,00";
    document.getElementById('retenc').value = "0,00";
    document.getElementById('desc').value = "0,00";
    document.getElementById('totalG').value = "0,00";
    document.getElementById('id_pac').value = "";
    document.getElementById('txtcod').value = "";
    document.getElementById('txtnom').value = "";
    document.getElementById('txttusu').value = "";
    document.getElementById('txtest').value = "";
    document.getElementById('txtnomadm').value = "";
    document.getElementById('txtnomplan').value = "";

    document.getElementById('txtregadmin').value = "";
    document.getElementById('unfunc').selectedIndex=0;
    document.getElementById('txtnfac').value = "";
    document.getElementById('fini').value = document.getElementById('factual').value;
    document.getElementById('ffin').value = document.getElementById('factual').value;
    document.getElementById('fela').value = document.getElementById('factual').value;
    document.getElementById('fvenc').value = document.getElementById('factual').value;
    document.getElementById('txtpoliza').value = "";


    document.getElementById('copag').disabled=false;
    document.getElementById('cutM').disabled=false;
    document.getElementById('porc').disabled=false;
    document.getElementById('deducc').disabled=false;
    document.getElementById('id_pac').disabled=false;
    document.getElementById('unfunc').disabled=false;
    document.getElementById('unfunc').innerHTML="<option value=''>--SELECCIONAR--</option>";
    document.getElementById('txtpoliza').disabled=false;
    document.getElementById('btn_guardar').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_todos').setAttribute("style", "display:block;width: 60px;");
    document.getElementById('btn_cancel').setAttribute("style", "display:none;width: 60px;");

    desab_campos();

}


function cancel_OrdIntHosp(){
  document.getElementById('contenido').innerHTML =" <div id='contenido'><fieldset class='redondo'   style=' width:99%; padding: 5px 0 5px 0; margin-bottom: 5px; border-color: #CCCCCC'>"
    +"                       <legend style='font-weight: bold;' ><div id='tit'>DETALLE DE FACTURA</div>"
    +"                       </legend>"
    +"                       <div class='content'  style='width:96%; border: 1px solid #aaaaaa; overflow:scroll;'>"
    +"                               <table width='100%' cellpadding='0' cellspacing='0' class='data' id='box-table-a' >"
    +"                                   <thead style='font-size: 12px'>"
    +"                                      <tr>"
    +"                                          <th  style='font-size: 11px;'  scope='col' >FECHA</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>C&Oacute;DIGO</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>CONCEPTO</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>CANT.</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>VALOR UNT</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>VALOR TOTAL</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>COP</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>CM</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>POR</th>"
    +"                                          <th  style='font-size: 11px;' scope='col'>M&Oacute;DULO</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>UF</th>"
    +"                                          <th  style='font-size: 11px;' scope='col'>CUENTA</th>"
    +"                                          <th  style='font-size: 11px;' scope='col'>CC</th>"
    +"                                          <th  style='font-size: 11px;' scope='col'>GRUPO</th>"
    +"                                          <th  style='font-size: 11px;' scope='col'>CLASE</th>"
    +"                                      </tr>"
    +"                                 </thead>"
    +"                             </table>"
    +"                         <div style='width: 100%;height: 100px; overflow: auto;'>"
    +"                             <table width='100%' cellpadding='0' cellspacing='0' class='data' id='box-table-a'>"
    +"                             <tbody id='tabemp' style='font-size: 14px;'>"
    +"                              </tbody>"
    +"                              </table>"
    +"                          </div>"
    +"                          </div>"
    +"                  </fieldset></div>";

    document.getElementById('subtotal').value = "0,00";
    document.getElementById('copag').value = "0,00";
    document.getElementById('cutM').value = "0,00";
    document.getElementById('porc').value = "0,00";
    document.getElementById('deducc').value = "0,00";
    document.getElementById('desc').value = "0,00";
    document.getElementById('totalG').value = "0,00";
    document.getElementById('id_pac').value = "";
    document.getElementById('txtcod').value = "";
    document.getElementById('txtnom').value = "";
    document.getElementById('txttusu').value = "";
    document.getElementById('txtest').value = "";
    document.getElementById('txtregadmin').value = "";
    document.getElementById('txtnomadm').value = "";
    document.getElementById('txtnomplan').value = "";
    document.getElementById('unfunc').selectedIndex=0;
    document.getElementById('txtnfac').value = "";
    document.getElementById('fini').value = document.getElementById('factual').value;
    document.getElementById('ffin').value = document.getElementById('factual').value;
    document.getElementById('fela').value = document.getElementById('factual').value;
    document.getElementById('fvenc').value = document.getElementById('factual').value;
    document.getElementById('txtpoliza').value = "";


    document.getElementById('copag').disabled=false;
    document.getElementById('cutM').disabled=false;
    document.getElementById('porc').disabled=false;
    document.getElementById('deducc').disabled=false;
    document.getElementById('id_pac').disabled=false;
    document.getElementById('unfunc').disabled=false;
    document.getElementById('unfunc').innerHTML="<option value=''>--SELECCIONAR--</option>";
    document.getElementById('txtpoliza').disabled=false;
    document.getElementById('btn_guardar').setAttribute("style", "display:none;width: 60px;");
//    document.getElementById('btn_nuevo').setAttribute("style", "display:block;width: 60px;");
    document.getElementById('btn_todos').setAttribute("style", "display:block;width: 60px;");
    document.getElementById('btn_cancel').setAttribute("style", "display:none;width: 60px;");
    desab_campos();
}

function nuevo_OrdInt(){
   document.getElementById('contenido').innerHTML =" <div id='contenido'><fieldset class='redondo'   style=' width:99%; padding: 5px 0 5px 0; margin-bottom: 5px; border-color: #CCCCCC'>"
    +"                       <legend style='font-weight: bold;' ><div id='tit'>DETALLE DE FACTURA</div>"
    +"                       </legend>"
    +"                       <div class='content'  style='width:96%; border: 1px solid #aaaaaa; overflow:scroll;'>"
    +"                               <table width='100%' cellpadding='0' cellspacing='0' class='data' id='box-table-a' >"
    +"                                   <thead style='font-size: 12px'>"
    +"                                      <tr>"
    +"                                          <th  style='font-size: 11px;'  scope='col' >FECHA</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>C&Oacute;DIGO</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>CONCEPTO</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>CANT.</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>VALOR UNT</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>VALOR TOTAL</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>COP</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>CM</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>POR</th>"
    +"                                          <th  style='font-size: 11px;' scope='col'>M&Oacute;DULO</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>UF</th>"
    +"                                          <th  style='font-size: 11px;' scope='col'>CUENTA</th>"
    +"                                          <th  style='font-size: 11px;' scope='col'>CC</th>"
    +"                                          <th  style='font-size: 11px;' scope='col'>GRUPO</th>"
    +"                                          <th  style='font-size: 11px;' scope='col'>CLASE</th>"
    +"                                      </tr>"
    +"                                 </thead>"
    +"                             </table>"
    +"                         <div style='width: 100%;height: 100px; overflow: auto;'>"
    +"                             <table width='100%' cellpadding='0' cellspacing='0' class='data' id='box-table-a'>"
    +"                             <tbody id='tabemp' style='font-size: 14px;'>"
    +"                              </tbody>"
    +"                              </table>"
    +"                          </div>"
    +"                          </div>"
    +"                  </fieldset></div>";

    document.getElementById('subtotal').value = "0,00";
    document.getElementById('copag').value = "0,00";
    document.getElementById('cutM').value = "0,00";
    document.getElementById('porc').value = "0,00";
    document.getElementById('deducc').value = "0,00";
    document.getElementById('desc').value = "0,00";
    document.getElementById('totalG').value = "0,00";
    document.getElementById('id_pac').value = "";
    document.getElementById('txtcod').value = "";
    document.getElementById('txtnom').value = "";
    document.getElementById('txttusu').value = "";
    document.getElementById('txtest').value = "";
    document.getElementById('txtreg').value = "";
    document.getElementById('txtnomadm').value = "";
    document.getElementById('txtnomplan').value = "";
    document.getElementById('unfunc').selectedIndex=0;
    document.getElementById('txtnfac').value = "";
    document.getElementById('fini').value = document.getElementById('factual').value;
    document.getElementById('ffin').value = document.getElementById('factual').value;
    document.getElementById('fela').value = document.getElementById('factual').value;
    document.getElementById('fvenc').value = document.getElementById('factual').value;
    document.getElementById('txtpoliza').value = "";


    document.getElementById('copag').disabled=false;
    document.getElementById('cutM').disabled=false;
    document.getElementById('porc').disabled=false;
    document.getElementById('deducc').disabled=false;
    document.getElementById('id_pac').disabled=false;
    document.getElementById('unfunc').disabled=false;
    document.getElementById('unfunc').innerHTML="<option value=''>--SELECCIONAR--</option>";
    document.getElementById('txtpoliza').disabled=false;
    document.getElementById('btn_guardar').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_nuevo').setAttribute("style", "display:none;width: 60px;");

}

function cancel_factAgrup(){
  location.href="../factAgrup?datos=no&origen=normal"
}

function guar_factAgrup(){
   var flag="ok";
   unFunc=document.getElementById("unfunc").value;
    factx=document.getElementById("factx").value;
    planAdm=document.getElementById('planAdm').value;
//    admin=document.getElementById('txtnomadm').value;

    if(factx==""){
        alert("Debe Seleccionar que desea Facturar, Verifique...");
        document.getElementById("planAdm").focus();
        flag="no";
         return;
     }else if(factx!=""){
       if(planAdm==""){
       if(factx=="admin"){
           alert("Seleccione la Administradora a Facturar, Verifique ");
           flag="no"
           return;
       }else{
           alert("Seleccione el plan a Facturar, Verifique ");
           flag="no"
           return;

       }}
        }else if(unFunc==""){
        alert("Debe Seleccionar la Unidad Funcional, Verifique...");
        document.getElementById("unfunc").focus();
        flag="no"
        return;
    }



     if(flag=="ok"){

    var valor="";
    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            valor =valor+document.getElementsByName("seleccion")[contador].value+"-";	//
    }

            fela=document.getElementById('fela').value;
            subtotal=parseFloat(document.getElementById('subtotal').value.replace(".","").replace(".","").replace(",","."));
            totalG=parseFloat(document.getElementById('totalG').value.replace(".","").replace(".","").replace(",","."));
            porc=parseFloat(document.getElementById('porc').value.replace(".","").replace(".","").replace(",","."));
            cutM=parseFloat(document.getElementById('cutM').value.replace(".","").replace(".","").replace(",","."));
            copag=parseFloat(document.getElementById('copag').value.replace(".","").replace(".","").replace(",","."));
            desc=parseFloat(document.getElementById('desc').value.replace(".","").replace(".","").replace(",","."));
            fini=document.getElementById('fini').value;
            ffin=document.getElementById('ffin').value;
            fvenc=document.getElementById('fvenc').value;
            unfunc=document.getElementById('unfunc').value;
            retenc=parseFloat(document.getElementById('retenc').value.replace(".","").replace(".","").replace(",","."));
//            deducc=parseFloat(document.getElementById('deducc').value.replace(".","").replace(".","").replace(",","."));

//            document.getElementById('txttusu').value = "";
//            document.getElementById('txtest').value = "";
//            document.getElementById('txtreg').value = "";
//            document.getElementById('txtnfac').value = "";


         variables="fela="+fela+"&factx="+factx+"&planAdm="+planAdm+"&subtotal="+subtotal+"&totalG="+totalG+"&porc="+porc+"&cutM="+cutM+"&copag="+copag
        +"&desc="+desc+"&fini="+fini+"&ffin="+ffin+"&fvenc="+fvenc+"&unfunc="+unfunc+"&retenc="+retenc
        +"&valor="+valor;

        guardar('../guardar_factAgrup',variables,'guardar_facturAgrup');

    }
}

function guar_factFact(){

    unFunc=document.getElementById("unfunc").value;
    id_pac=document.getElementById("id_pac").value;
    plan=document.getElementById('txtnomplan').value;
    admin=document.getElementById('txtnomadm').value;

    if(id_pac==""){
        alert("Debe Seleccionar la identificación de Paciente, Verifique...");
        document.getElementById("id_pac").focus();
    }else if(plan==""){
        alert("Debe Seleccionar el Plan al que Pertenece el Paciente, Verifique...");
        document.getElementById("plan").focus();
    }else if(unFunc==""){
        alert("Debe Seleccionar la Unidad Funcional, Verifique...");
        document.getElementById("unfunc").focus();
    }else{

    var valor="";
    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            valor =valor+document.getElementsByName("seleccion")[contador].value+"-";	//
    }

    id_pac=document.getElementById('txtcod').value;


//    ajax = ObjetoAjax();
//    ajax.open("POST", "../valregcomp", true);
//    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
//    ajax.send("id_pac="+id_pac+"&valor="+valor);
//    ajax.onreadystatechange=function() {
//        if (ajax.readyState==4) {
//            if(trimAll(ajax.responseText)=="1"){
//               alert("Hay RIPS incompletos en la Consulta, Verifique...");
//            }else{
            id_pac=document.getElementById('txtcod').value;
            fela=document.getElementById('fela').value;
             subtotal=parseFloat(document.getElementById('subtotal').value.replace(".","").replace(".","").replace(",","."));
            totalG=parseFloat(document.getElementById('totalG').value.replace(".","").replace(".","").replace(",","."));
            porc=parseFloat(document.getElementById('porc').value.replace(".","").replace(".","").replace(",","."));
            cutM=parseFloat(document.getElementById('cutM').value.replace(".","").replace(".","").replace(",","."));
            copag=parseFloat(document.getElementById('copag').value.replace(".","").replace(".","").replace(",","."));
            desc=parseFloat(document.getElementById('desc').value.replace(".","").replace(".","").replace(",","."));
            fini=document.getElementById('fini').value;
            ffin=document.getElementById('ffin').value;
            fvenc=document.getElementById('fvenc').value;
            unfunc=document.getElementById('unfunc').value;
            retenc=parseFloat(document.getElementById('retenc').value.replace(".","").replace(".","").replace(",","."));
            deducc=parseFloat(document.getElementById('deducc').value.replace(".","").replace(".","").replace(",","."));
            txtpoliza=document.getElementById('txtpoliza').value = "";

            /////////////
            document.getElementById('id_pac').value = "";
            document.getElementById('txtnom').value = "";
            document.getElementById('txttusu').value = "";
            document.getElementById('txtest').value = "";
            document.getElementById('txtreg').value = "";
            document.getElementById('txtnfac').value = "";


         variables="id_pac="+id_pac+"&fela="+fela+"&plan="+plan+"&admin="+admin+"&subtotal="+subtotal+"&totalG="+totalG+"&porc="+porc+"&cutM="+cutM+"&copag="+copag
        +"&desc="+desc+"&fini="+fini+"&ffin="+ffin+"&fvenc="+fvenc+"&unfunc="+unfunc+"&retenc="+retenc
        +"&txtpoliza="+txtpoliza+"&valor="+valor;

       guardar('../guardar_facturaFact',variables,'guardar_facturaHosp');
//            }
//        }
//    }
    }

}

function guar_factAmbu(){

    unFunc=document.getElementById("unfunc").value;
    id_pac=document.getElementById("id_pac").value;
    plan=document.getElementById('txtnomplan').value;
    admin=document.getElementById('txtnomadm').value;

    if(id_pac==""){
        alert("Debe Seleccionar la identificación de Paciente, Verifique...");
        document.getElementById("id_pac").focus();
    }else if(plan==""){
        alert("Debe Seleccionar el Plan al que Pertenece el Paciente, Verifique...");
        document.getElementById("plan").focus();
    }else if(unFunc==""){
        alert("Debe Seleccionar la Unidad Funcional, Verifique...");
        document.getElementById("unfunc").focus();
    }else{

        var valor="";
        var num_elementos = document.getElementsByName("seleccion").length;
        for( var contador=0; contador < num_elementos; contador++ ){			//
            if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
                valor =valor+document.getElementsByName("seleccion")[contador].value+"-";	//
        }

        id_pac=document.getElementById('txtcod').value;

        id_pac=document.getElementById('txtcod').value;
        fela=document.getElementById('fela').value;
        subtotal=parseFloat(document.getElementById('subtotal').value.replace(".","").replace(".","").replace(",","."));
        totalG=parseFloat(document.getElementById('totalG').value.replace(".","").replace(".","").replace(",","."));
        porc=parseFloat(document.getElementById('porc').value.replace(".","").replace(".","").replace(",","."));
        cutM=parseFloat(document.getElementById('cutM').value.replace(".","").replace(".","").replace(",","."));
        copag=parseFloat(document.getElementById('copag').value.replace(".","").replace(".","").replace(",","."));
        desc=parseFloat(document.getElementById('desc').value.replace(".","").replace(".","").replace(",","."));
        fini=document.getElementById('fini').value;
        ffin=document.getElementById('ffin').value;
        fvenc=document.getElementById('fvenc').value;
        unfunc=document.getElementById('unfunc').value;
        retenc=parseFloat(document.getElementById('retenc').value.replace(".","").replace(".","").replace(",","."));
        deducc=parseFloat(document.getElementById('deducc').value.replace(".","").replace(".","").replace(",","."));
        txtpoliza=document.getElementById('txtpoliza').value = "";

        /////////////
//        document.getElementById('id_pac').value = "";
//        document.getElementById('txtnom').value = "";
//        document.getElementById('txttusu').value = "";
//        document.getElementById('txtest').value = "";
//        document.getElementById('txtreg').value = "";
//        document.getElementById('txtnfac').value = "";

        variables="id_pac="+id_pac+"&fela="+fela+"&plan="+plan+"&admin="+admin+"&subtotal="+subtotal+"&totalG="+totalG+"&porc="+porc+"&cutM="+cutM+"&copag="+copag
        +"&desc="+desc+"&fini="+fini+"&ffin="+ffin+"&fvenc="+fvenc+"&unfunc="+unfunc+"&retenc="+retenc
        +"&txtpoliza="+txtpoliza+"&valor="+valor;

        guardar('../guardar_facturaAmbu',variables,'guardar_facturaAmbu');

    }

}

function guar_factpyp(){

    unFunc=document.getElementById("unfunc").value;
    id_pac=document.getElementById("id_pac").value;
    plan=document.getElementById('txtnomplan').value;
    admin=document.getElementById('txtnomadm').value;

    if(id_pac==""){
        alert("Debe Seleccionar la identificación de Paciente, Verifique...");
        document.getElementById("id_pac").focus();
    }else if(plan==""){
        alert("Debe Seleccionar el Plan al que Pertenece el Paciente, Verifique...");
        document.getElementById("plan").focus();
    }else if(unFunc==""){
        alert("Debe Seleccionar la Unidad Funcional, Verifique...");
        document.getElementById("unfunc").focus();
    }else{

        var valor="";
        var num_elementos = document.getElementsByName("seleccion").length;
        for( var contador=0; contador < num_elementos; contador++ ){			//
            if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
                valor =valor+document.getElementsByName("seleccion")[contador].value+"-";	//
        }

        id_pac=document.getElementById('txtcod').value;

        id_pac=document.getElementById('txtcod').value;
        fela=document.getElementById('fela').value;
        subtotal=parseFloat(document.getElementById('subtotal').value.replace(".","").replace(".","").replace(",","."));
        totalG=parseFloat(document.getElementById('totalG').value.replace(".","").replace(".","").replace(",","."));
        porc=parseFloat(document.getElementById('porc').value.replace(".","").replace(".","").replace(",","."));
        cutM=parseFloat(document.getElementById('cutM').value.replace(".","").replace(".","").replace(",","."));
        copag=parseFloat(document.getElementById('copag').value.replace(".","").replace(".","").replace(",","."));
        desc=parseFloat(document.getElementById('desc').value.replace(".","").replace(".","").replace(",","."));
        fini=document.getElementById('fini').value;
        ffin=document.getElementById('ffin').value;
        fvenc=document.getElementById('fvenc').value;
        unfunc=document.getElementById('unfunc').value;
        retenc=parseFloat(document.getElementById('retenc').value.replace(".","").replace(".","").replace(",","."));
        deducc=parseFloat(document.getElementById('deducc').value.replace(".","").replace(".","").replace(",","."));
        txtpoliza=document.getElementById('txtpoliza').value = "";

        /////////////
//        document.getElementById('id_pac').value = "";
//        document.getElementById('txtnom').value = "";
//        document.getElementById('txttusu').value = "";
//        document.getElementById('txtest').value = "";
//        document.getElementById('txtreg').value = "";
//        document.getElementById('txtnfac').value = "";

        variables="id_pac="+id_pac+"&fela="+fela+"&plan="+plan+"&admin="+admin+"&subtotal="+subtotal+"&totalG="+totalG+"&porc="+porc+"&cutM="+cutM+"&copag="+copag
        +"&desc="+desc+"&fini="+fini+"&ffin="+ffin+"&fvenc="+fvenc+"&unfunc="+unfunc+"&retenc="+retenc
        +"&txtpoliza="+txtpoliza+"&valor="+valor;

        guardar('../guardar_facturapyp',variables,'guardar_facturapyp');

    }

}

function guar_factHospi(){

    unFunc=document.getElementById("unfunc").value;
    id_pac=document.getElementById("id_pac").value;
    plan=document.getElementById('txtnomplan').value;
    admin=document.getElementById('txtnomadm').value;

    if(id_pac==""){
        alert("Debe Seleccionar la identificación de Paciente, Verifique...");
        document.getElementById("id_pac").focus();
    }else if(plan==""){
        alert("Debe Seleccionar el Plan al que Pertenece el Paciente, Verifique...");
        document.getElementById("plan").focus();
    }else if(unFunc==""){
        alert("Debe Seleccionar la Unidad Funcional, Verifique...");
        document.getElementById("unfunc").focus();
    }else{

    var valor="";
    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            valor =valor+document.getElementsByName("seleccion")[contador].value+"-";	//
    }

    id_pac=document.getElementById('txtcod').value;


//    ajax = ObjetoAjax();
//    ajax.open("POST", "../valregcomp", true);
//    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
//    ajax.send("id_pac="+id_pac+"&valor="+valor);
//    ajax.onreadystatechange=function() {
//        if (ajax.readyState==4) {
//            if(trimAll(ajax.responseText)=="1"){
//               alert("Hay RIPS incompletos en la Consulta, Verifique...");
//            }else{
            id_pac=document.getElementById('txtcod').value;
            fela=document.getElementById('fela').value;
             subtotal=parseFloat(document.getElementById('subtotal').value.replace(".","").replace(".","").replace(",","."));
            totalG=parseFloat(document.getElementById('totalG').value.replace(".","").replace(".","").replace(",","."));
            porc=parseFloat(document.getElementById('porc').value.replace(".","").replace(".","").replace(",","."));
            cutM=parseFloat(document.getElementById('cutM').value.replace(".","").replace(".","").replace(",","."));
            copag=parseFloat(document.getElementById('copag').value.replace(".","").replace(".","").replace(",","."));
            desc=parseFloat(document.getElementById('desc').value.replace(".","").replace(".","").replace(",","."));
            fini=document.getElementById('fini').value;
            ffin=document.getElementById('ffin').value;
            fvenc=document.getElementById('fvenc').value;
            unfunc=document.getElementById('unfunc').value;
            retenc=parseFloat(document.getElementById('retenc').value.replace(".","").replace(".","").replace(",","."));
            deducc=parseFloat(document.getElementById('deducc').value.replace(".","").replace(".","").replace(",","."));
            txtpoliza=document.getElementById('txtpoliza').value = "";

            /////////////
//            document.getElementById('id_pac').value = "";
//            document.getElementById('txtnom').value = "";
//            document.getElementById('txttusu').value = "";
//            document.getElementById('txtest').value = "";
//            document.getElementById('txtregadmin').value = "";
//            document.getElementById('txtnfac').value = "";


         variables="id_pac="+id_pac+"&fela="+fela+"&plan="+plan+"&admin="+admin+"&subtotal="+subtotal+"&totalG="+totalG+"&porc="+porc+"&cutM="+cutM+"&copag="+copag
        +"&desc="+desc+"&fini="+fini+"&ffin="+ffin+"&fvenc="+fvenc+"&unfunc="+unfunc+"&retenc="+retenc
        +"&txtpoliza="+txtpoliza+"&valor="+valor;

       guardar('../guardar_facturaHosp',variables,'guardar_facturaHosp');
//            }
//        }
//    }
    }
}

function guar_factCapit(){
    unFunc=document.getElementById("unfunc").value;
    plan=document.getElementById('planAdm').value.split("-");
    fini=document.getElementById("fini").value;
    ffin=document.getElementById("ffin").value;
    fela=document.getElementById("fela").value;
    fvenc=document.getElementById("fvenc").value;
    descrip=document.getElementById("descrip").value;
    ncontrato=document.getElementById("ncontrato").value;

    var variables="unFunc="+unFunc+"&plan="+plan[0]+"&fini="+fini+"&ffin="+ffin+"&fela="+fela+"&fvenc="+fvenc+"&descrip="+descrip+"&ncontrato="+ncontrato;

    guardar('../guardar_factCapitacion',variables,'guardar_facturaCapitacion');

}

function guar_fact(){
    unFunc=document.getElementById("unfunc").value;
    id_pac=document.getElementById("id_pac").value;
    plan=document.getElementById('txtnomplan').value;
    admin=document.getElementById('txtnomadm').value;
      var num_elementos = document.getElementsByName("seleccion").length;
    if(id_pac==""){
        alert("Debe Seleccionar la identificación de Paciente, Verifique...");
        document.getElementById("id_pac").focus();
    }else if(plan==""){
        alert("Debe Seleccionar el Plan al que Pertenece el Paciente, Verifique...");
        document.getElementById("plan").focus();
    }else if(unFunc==""){
        alert("Debe Seleccionar la Unidad Funcional, Verifique...");
        document.getElementById("unfunc").focus();
    }else if(num_elementos<0){
        alert("No exite ningun servicio a Facturar, Verifique...");
    }else{

    var valor="";

    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            valor =valor+document.getElementsByName("seleccion")[contador].value+"-";	//
    }

    id_pac=document.getElementById('txtcod').value;


    ajax = ObjetoAjax();
    ajax.open("POST", "../valregcomp", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("id_pac="+id_pac+"&valor="+valor);
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            if(trimAll(ajax.responseText)=="1"){
               alert("Hay RIPS incompletos en la Consulta, Verifique...");
            }else{
            id_pac=document.getElementById('txtcod').value;
            fela=document.getElementById('fela').value;

            subtotal=parseFloat(document.getElementById('subtotal').value.replace(".","").replace(".","").replace(",","."));
            totalG=parseFloat(document.getElementById('totalG').value.replace(".","").replace(".","").replace(",","."));
            porc=parseFloat(document.getElementById('porc').value.replace(".","").replace(".","").replace(",","."));
            cutM=parseFloat(document.getElementById('cutM').value.replace(".","").replace(".","").replace(",","."));
            copag=parseFloat(document.getElementById('copag').value.replace(".","").replace(".","").replace(",","."));
            desc=parseFloat(document.getElementById('desc').value.replace(".","").replace(".","").replace(",","."));
            fini=document.getElementById('fini').value;
            ffin=document.getElementById('ffin').value;
            fvenc=document.getElementById('fvenc').value;
            unfunc=document.getElementById('unfunc').value;
            retenc=parseFloat(document.getElementById('retenc').value.replace(".","").replace(".","").replace(",","."));
            deducc=parseFloat(document.getElementById('deducc').value.replace(".","").replace(".","").replace(",","."));
            txtpoliza=document.getElementById('txtpoliza').value;

         variables="id_pac="+id_pac+"&fela="+fela+"&plan="+plan+"&admin="+admin+"&subtotal="+subtotal+"&totalG="+totalG+"&porc="+porc+"&cutM="+cutM+"&copag="+copag
        +"&desc="+desc+"&fini="+fini+"&ffin="+ffin+"&fvenc="+fvenc+"&unfunc="+unfunc+"&retenc="+retenc
        +"&txtpoliza="+txtpoliza+"&valor="+valor;

       guardar('../guardar_factura',variables,'guardar_factura');
            }
        }
    }
    }
}

function abrir_fact(){
      window.open("../facturar_urge?datos=no&origen=normal","ventana_factura_urge","width=1200, height=580, scrollbars=YES, menubar=no, location=no, resizable=no");
 }

 function abrir_medica(){
      window.open("../asig_medicamento?datos=no&origen=no&dest=med_urg","ventana_factura_medic","width=1050, height=580, scrollbars=YES, menubar=no, location=no, resizable=no");
 }

  function abrir_medicaHosp(){
      window.open("../asig_medicamento?datos=no&origen=no&dest=med_hosp","ventana_factura_medic_hosp","width=1050, height=580, scrollbars=YES, menubar=no, location=no, resizable=no");
 }

  function abrir_medicaAmbu(){
      window.open("../asig_medicamento?datos=no&origen=no&dest=med_ambu","ventana_factura_medic_hosp","width=1050, height=580, scrollbars=YES, menubar=no, location=no, resizable=no");
 }

 function abrir_factHospi(){
      window.open("../facturacion_hospi?datos=no&origen=normal","ventana_factura_hosp","width=1200, height=580, scrollbars=YES, menubar=no, location=no, resizable=no");
 }


 function abrir_factAmbu(){
      window.open("../facturacion_ambu?datos=no&origen=normal","ventana_factura_ambu","width=1200, height=580, scrollbars=YES, menubar=no, location=no, resizable=no");
 }

 function abrir_factPyP(){
      window.open("../facturacion_pyp?datos=no&origen=normal","ventana_factura_pyp","width=1200, height=580, scrollbars=YES, menubar=no, location=no, resizable=no");
 }

function abrir_ordenInt(){
      window.open("../orden_interna?datos=no&origen=normal","ventana_OrdenInter_urge","width=1200, height=580, scrollbars=YES, menubar=no, location=no, resizable=no");
 }

function abrir_ordenIntHosp(){
      window.open("../orden_internaHospi?datos=no&origen=normal","ventana_OrdenInter_urge","width=1200, height=580, scrollbars=YES, menubar=no, location=no, resizable=no");
 }

function abrir_ordenIntAmbu(){
      window.open("../orden_internaAmbu?datos=no&origen=normal","ventana_OrdenInter_Ambu","width=1200, height=580, scrollbars=YES, menubar=no, location=no, resizable=no");
 }

function abrir_ordenIntpyp(){
      window.open("../orden_internapyp?datos=no&origen=normal","ventana_OrdenInter_pyp","width=1200, height=580, scrollbars=YES, menubar=no, location=no, resizable=no");
 }


function abrir_registros(){
      window.open("../mod_urgencia/editar_registros.jsp","ventana_ver_resgistros","width=1100, height=500, scrollbars=YES, menubar=no, location=no, resizable=no");

}

function abrir_factAmbu(){
      window.open("../facturacion_ambu?datos=no&origen=normal","ventana_factura_hosp","width=1200, height=580, scrollbars=YES, menubar=no, location=no, resizable=no");
 }

function recalproc(){
    valproc=parseFloat(document.getElementById("txtvalproc").value.replace(".","").replace(".","").replace(",","."));
    unid=parseFloat(document.getElementById("txtunidproc").value.replace(".","").replace(".","").replace(",","."));
    cmod=parseFloat(document.getElementById("txtcmodproc").value.replace(".","").replace(".","").replace(",","."));
    copag=parseFloat(document.getElementById("txtcopproc").value.replace(".","").replace(".","").replace(",","."));
    porc=parseFloat(document.getElementById("txtporcproc").value.replace(".","").replace(".","").replace(",","."));

    tot=valproc*unid;
    tot=tot-cmod-copag-porc;

    rta=eval(tot.toFixed(2));

    res=rta.toString().split('.');
    if(res[1]== undefined) {
        res[1]='00';
    }
    if(res[1].length<2) {
        res[1]=res[1]+'0';
    }
    document.getElementById("txttotproc").value= moneda(res[0])+","+res[1];

}

function busc_plan(val){

    ajax = ObjetoAjax();
    ajax.open("POST", "../bucdesplan", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("val="+val);
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById("txtreg").value=ajax.responseText;

        }
    }

}


function verflogId(){
    ident=document.getElementById("txtide").value;
    tip=document.getElementById("t_id").value;
    document.getElementById("umed").selectedIndex=0;
    document.getElementById("fnac").value="";
    document.getElementById("edad").value="";
    if(tip=="CC"){
        if(ident.length<3 || ident.length>11){
            alert("La Longitud del número de identificación no pertenece al tipo de identificación");
            document.getElementById("txtide").value="";
            document.getElementById("txtide").focus();
        }
    }else  if(tip=="CE"){
        if(ident.length<3 || ident.length>6){
            alert("La Longitud del número de identificación no pertenece al tipo de identificación");
            document.getElementById("txtide").value="";
            document.getElementById("txtide").focus();
        }
    }else  if(tip=="PA"){
         if(ident.length<6 || ident.length>16){
            alert("La Longitud del número de identificación no pertenece al tipo de identificación");
            document.getElementById("txtide").value="";
            document.getElementById("txtide").focus();
         }
     }else  if(tip=="RC"){
     if(ident.length<10 || ident.length>11){
            alert("La Longitud del número de identificación no pertenece al tipo de identificación");
            document.getElementById("txtide").value="";
            document.getElementById("txtide").focus();
         }
     }else  if(tip=="TI"){
     if(ident.length<10 || ident.length>11){
            alert("La Longitud del número de identificación no pertenece al tipo de identificación");
            document.getElementById("txtide").value="";
            document.getElementById("txtide").focus();
         }
     }else  if(tip=="AS"){
     if(ident.length==10){
            alert("La Longitud del número de identificación no pertenece al tipo de identificación");
            document.getElementById("txtide").value="";
            document.getElementById("txtide").focus();
         }
     }else  if(tip=="NV"){
     if(ident.length<6 || ident.length>7){
            alert("La Longitud del número de identificación no pertenece al tipo de identificación");
            document.getElementById("txtide").value="";
            document.getElementById("txtide").focus();
         }
    }
}

function valtipid(){
    ident=document.getElementById("txtide").value;
    tip=document.getElementById("t_id").value;
    ume=document.getElementById("umed").value;
    if(ume=="3"){
        if(tip!="RC" || tip!="MS"){
            alert("Si la unidad de medida de edad es días el tipo de identificación debe ser RC o MS, Verifique...");
             document.getElementById("umed").selectedIndex=0;
        }
    }else if(ume=="2" || ume=="3"){
        if(tip=="CC" || tip=="TI" || tip=="AS"){
            alert("Si la unidad de medida de edad es Meses o Años el tipo de identificación debe ser CC, TI, AS, Verifique...");
            document.getElementById("umed").selectedIndex=0;
        }
    }else if(ume=="3"){
        if(tip!="RC"){
            alert("Si la unidad de medida de edad es Días el tipo de identificación debe ser RC, Verifique...");
            document.getElementById("umed").selectedIndex=0;
        }
    }


}

function valfecha(){
    ume=document.getElementById("umed").selectedIndex=0;
    ume=document.getElementById("edad").value="";
}

function valedadxid(edad){
tip=document.getElementById("t_id").value;
if(edad>17){
    if(tip=="RC" ||tip=="TI" ||tip=="MS"){
        alert("La fecha de nacimiento no corresponde al tipo de identificación ("+tip+ "), Verifique...");
        document.getElementById("umed").selectedIndex=0;
        document.getElementById("fnac").value="";
        document.getElementById("edad").value="";
    }
}else if(edad<1 && edad>30){
    if(tip=="MS" ){
        alert("Si el tipo de identificación es MS la edad debe estar entre 1 a 30 Días, Verifique...");
    }
}else if(edad<18){
    if(tip=="AS" ){
        alert("Si el tipo de identificación es AS la edad debe ser mayor a 17 años, Verifique...");
    }
}

}

function abrirVentPac(dest){
   window.open("../ventana_pacientes?dest="+dest,"ventana_pacientes","width=1200, height=580, scrollbars=YES, menubar=no, location=no, resizable=no");
}

function changTipRec(){

 }

function rec_recaudo(ori){
    tip_serv=document.getElementById("tip_serv").value;
    id_pac=document.getElementById("id_pac").value;
    txtnom=document.getElementById("txtnom").value;
    txtcod=document.getElementById("txtcod").value;
    fech=document.getElementById("fech").value;

    if(txtcod==""){
        alert("Debe seleccionar el Paciente, Verifique...");
    }else{

        ajax = ObjetoAjax();
        ajax.open("POST","../reg_recaudo", true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send("tip_serv="+tip_serv+"&id_pac="+id_pac+"&txtcod="+txtcod+"&fech="+fech+"&txtnom="+txtnom+"&rec_serv=chan&ori="+ori);
        ajax.onreadystatechange=function() {
            if (ajax.readyState==4) {
                if(trimAll(ajax.responseText)=="0"){
                    alert('El Paciente no tiene Servicios para Recaudar');
                    window.close();
                }else{
                    document.getElementById("div_co").innerHTML=ajax.responseText;
                }
            }
        }
    }
}

function nuev_recaudo(){

    document.getElementById("id_pac").value="";
    document.getElementById("id_pac").disabled=false;
    document.getElementById("fech").disabled=false;

    document.getElementById("tip_serv").selectedIndex=0;
    document.getElementById("tip_serv").disabled=false;

    document.getElementById("btn_ver").disabled=false;

    document.getElementById("val1").value="0,00";
    document.getElementById("auto1").value="";
    document.getElementById("val1").disabled=false;

    document.getElementById("val2").value="0,00";
    document.getElementById("auto2").value="";
    document.getElementById("val2").disabled=false;

    document.getElementById("val3").value="0,00";
    document.getElementById("auto3").value="";
    document.getElementById("val3").disabled=false;

    document.getElementById('btn_paci').setAttribute("href", "javascript:most_pacientes('reca')");
    document.getElementById('btn_guardar').setAttribute("style", "display:block;width: 60px;");
    document.getElementById('btn_nuevo').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_cancelar').setAttribute("style", "display:block;width: 60px;");


}

function abrir_recaudo(ori){
    window.open("../reg_recaudo?tip_serv=nuev&ori="+ori,"ventana_recaudo_urge","width=900, height=580, scrollbars=YES, menubar=no, location=no, resizable=no");
}


function busca_recaudo(){
    window.open("../most_recaudos","ventana_busca_recaudo_urge","width=900, height=580, scrollbars=YES, menubar=no, location=no, resizable=no");
}

function sel_recaudo(ori){

    var num_elementos = document.getElementsByName("seleccion2").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion2")[contador].checked == true)	//> se obtiene el value del check seleccionado
            valor = document.getElementsByName("seleccion2")[contador].value;	//
    }

    Cerrarpopu('buscarecaudo')
    document.location="../reg_recaudo?tip_serv=bus_rec&cod_pac="+valor+"&ori="+ori;

}



function imprim_recaudo(conse,tip_ser){
    if(tip_ser!=null){
        window.open("../imprimRecibo?conserec="+conse+"&tip_rec="+tip_ser,"impri_recibo","width=1000, height=750, scrollbars=yes, menubar=no, location=no, resizable=no");
    }else{
       alert("No se ha Cargado Ningun Registro, Verifique...");
    }

}

function cancelar_recau(ori){

   window.open("../reg_recaudo?tip_serv=nuev&ori="+ori,"ventana_recaudo_urge","width=900, height=580, scrollbars=YES, menubar=no, location=no, resizable=no");
}

function rips_consulta(ori){

  window.open("../rips_consulta?ori="+ori,"rips_consulta","width=1200, height=750, scrollbars=yes, menubar=no, location=no, resizable=no");

}


function rips_nacidos(){
  window.open("../mod_hospitalizacion/rips_nacidos.jsp","rips_nacidos","width=1000, height=750, scrollbars=yes, menubar=no, location=no, resizable=no");
//  window.open("../rips_consulta?ori="+ori,"rips_consulta","width=1000, height=750, scrollbars=yes, menubar=no, location=no, resizable=no");

}

function rips_consultaForm(ori){
    txtcod=document.getElementById("txtcod").value;
    if(txtcod==""){
        alert("Debe seleccionar el Paciente, Verifique...");
    }else{
        tiprips=document.getElementById("tiprips").value;
        if(tiprips=="1"){
            window.open("../rips_consulta?ori="+ori+"&copac="+txtcod,"rips_consulta","width=1000, height=750, scrollbars=yes, menubar=no, location=no, resizable=no");
        }else{
            window.open("../rips_procedimientos?ori="+ori+"&copac="+txtcod,"rips_procedimientos","width=1000, height=750, scrollbars=yes, menubar=no, location=no, resizable=no");
        }
    }
}

function rips_urge(){
   id_pac=document.getElementById("id_pac").value;
   txtcod=document.getElementById("txtcod").value;
   txtnom=document.getElementById("txtnom").value;

   d_pac=id_pac+"//"+txtcod+"//"+txtnom;


   if(txtcod==""){
      alert("No se ha Cargado ningun Paciente, Verifique...");
    }else{
    if (confirm("\xbfEs un RIPS de Urgencia?")){
        window.open("../rips_urgencia?ori=urge&copac="+d_pac,"rips_urgencia","width=1200, height=750, scrollbars=yes, menubar=no, location=no, resizable=no");
    }else{
       window.open("../rips_consulta?ori=urge&copac="+txtcod,"rips_consulta","width=1200, height=750, scrollbars=yes, menubar=no, location=no, resizable=no");
    }
   }
}


function guar_ripsConsu(){
    if(document.getElementById("id_pac").value==""){
        alert("Seleccione el Paciente");
    }else if(document.getElementById("consul").value==""){
        alert("Seleccione el Servicio de Consulta");
    }else if(document.getElementById("txtusuario").value==""){
        alert("Seleccione el Prestador");
    }else if(document.getElementById("diagPrinc").value==""){
        alert("Seleccione el Tipo de Diagn\u00f3stico");
    }else if(document.getElementById("finCons").value==""){
        alert("Seleccione la Finalidad de la Consulta");
    }else if(document.getElementById("cExter").value==""){
        alert("Seleccione la Causa Externa");
    }else if(document.getElementById("txtdiagprinc").value==""){
         alert("Seleccione el Diagn\u00f3stico Principal de la Consulta");tip
    }else{
        iden=document.getElementById("txtcod").value;
        idcon=document.getElementById("consul").value;
        finCons=document.getElementById("finCons").value;//Finalidad de consulta
        diagPrinc=document.getElementById("diagPrinc").value;//Tipo Diagnostico Principal
        cExter=document.getElementById("cExter").value;//causa externa
        tipcons=document.getElementById("tipcons").value;//tipo de consulta
        txtdiagprinc=document.getElementById("txtdiagprinc").value;//Diagnostico Principal
        codDiag1=document.getElementById("codDiag1").value;//Codigo diag 1
        codDiag2=document.getElementById("codDiag2").value;//Codigo diag 2
        codDiag3=document.getElementById("codDiag3").value;//Codigo diag 3
        codprest=document.getElementById("txtusuario").value;//codigo prestador
        ori=document.getElementById("ori").value;

        variables="iden="+iden+"&idcon="+idcon+"&finCons="+finCons+"&txtdiagprinc="+txtdiagprinc+"&codDiag1="+codDiag1
            +"&codDiag2="+codDiag2+"&codDiag3="+codDiag3+"&diagPrinc="+diagPrinc+"&cExter="+cExter+"&tipcons="+tipcons+"&codprest="+codprest+"&ori="+ori+"&tiprips=rips_consulta";


        guardar('../guardar_ripsconsulta',variables,'ripsconsulta');

    }


}

function nuevo_ripsConsult(){

 txtcod=document.getElementById("txtcod").value;

  if(txtcod==""){
     alert("Seleccione el Paciente");
  }else{
  ajax = ObjetoAjax();
  ajax.open("POST", "../conripsguar", true);
  ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  ajax.send("id_pac="+txtcod+"&ori=cons");
  ajax.onreadystatechange=function() {
  if (ajax.readyState==4) {
     document.getElementById('sel_cons').innerHTML = ajax.responseText
  }
  }

    document.getElementById("txtpres").value="";
    document.getElementById("admin").value="";
    document.getElementById("fecserv").value="";
    document.getElementById("consul").innerHTML="";
    document.getElementById("finCons").selectedIndex=0;//Finalidad de consulta
    document.getElementById("diagPrinc").selectedIndex=0;//Tipo Diagnostico Principal
    document.getElementById("cExter").selectedIndex=0;//causa externa
    document.getElementById("tipcons").selectedIndex=0;//tipo de consulta
    document.getElementById("txtdiagprinc").value="";//Diagnostico Principal
    document.getElementById("codDiag1").value="";//Codigo diag 1
    document.getElementById("codDiag2").value="";//Codigo diag 2
    document.getElementById("codDiag3").value="";//Codigo diag 3
    document.getElementById("txtusuario").value="";//codigo prestador
    document.getElementById("txtdesdiagprinc").value="";//codigo prestador
    document.getElementById("desccodDiag1").value="";
    document.getElementById("descodDiag2").value="";
    document.getElementById("descodDiag3").value="";

    document.getElementById("consul").disabled=false;
    document.getElementById("finCons").disabled=false;//Finalidad de consulta
    document.getElementById("diagPrinc").disabled=false;//Tipo Diagnostico Principal
    document.getElementById("cExter").disabled=false;//causa externa
    document.getElementById("tipcons").disabled=false;//tipo de consulta
    document.getElementById("txtdiagprinc").disabled=false;//Diagnostico Principal
    document.getElementById("codDiag1").disabled=false;//Codigo diag 1buscar_dx
    document.getElementById("codDiag2").disabled=false;//Codigo diag 2
    document.getElementById("codDiag3").disabled=false;//Codigo diag 3
    document.getElementById("txtusuario").disabled=false;//codigo prestador

    document.getElementById('btn_guardar').setAttribute("style", "display:block;width: 60px;");
    document.getElementById('btn_nuevo').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_cancelar').setAttribute("style", "display:block;width: 60px;");

    document.getElementById('btn_prest').setAttribute("href", "javascript:most_prestador()");
    document.getElementById('btn_dx_ingresourg').setAttribute("href", "javascript:buscar_dx('dx_ingresourg')");
    document.getElementById('btn_dx_diag1').setAttribute("href", "javascript:buscar_dx('dx_diag1')");
    document.getElementById('btn_dx_diag2').setAttribute("href", "javascript:buscar_dx('dx_diag2')");
    document.getElementById('btn_dx_diag3').setAttribute("href", "javascript:buscar_dx('dx_diag3')");


  }
}

function canc_ripsconsulta(){

//    document.getElementById("txtcod").value="";
//    document.getElementById("id_pac").value="";
//    document.getElementById("txtnom").value="";
//    document.getElementById("sex").value="";
//    document.getElementById("edad").value="";
    document.getElementById("txtpres").value="";
    document.getElementById("admin").value="";
    document.getElementById("fecserv").value="";
    document.getElementById("consul").innerHTML="";
    document.getElementById("finCons").selectedIndex=0;//Finalidad de consulta
    document.getElementById("diagPrinc").selectedIndex=0;//Tipo Diagnostico Principal
    document.getElementById("cExter").selectedIndex=0;//causa externa
    document.getElementById("tipcons").selectedIndex=0;//tipo de consulta
    document.getElementById("txtdiagprinc").value="";//Diagnostico Principal
    document.getElementById("codDiag1").value="";//Codigo diag 1
    document.getElementById("codDiag2").value="";//Codigo diag 2
    document.getElementById("codDiag3").value="";//Codigo diag 3
    document.getElementById("txtusuario").value="";//codigo prestador
    document.getElementById("txtdesdiagprinc").value="";//codigo prestador
    document.getElementById("desccodDiag1").value="";
    document.getElementById("descodDiag2").value="";
    document.getElementById("descodDiag3").value="";

    document.getElementById("consul").disabled=true;
    document.getElementById("finCons").disabled=true;//Finalidad de consulta
    document.getElementById("diagPrinc").disabled=true;//Tipo Diagnostico Principal
    document.getElementById("cExter").disabled=true;//causa externa
    document.getElementById("tipcons").disabled=true;//tipo de consulta
    document.getElementById("txtdiagprinc").disabled=true;//Diagnostico Principal
    document.getElementById("codDiag1").disabled=true;//Codigo diag 1
    document.getElementById("codDiag2").disabled=true;//Codigo diag 2
    document.getElementById("codDiag3").disabled=true;//Codigo diag 3
    document.getElementById("txtusuario").disabled=true;//codigo prestador

    document.getElementById('btn_guardar').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_nuevo').setAttribute("style", "display:block;width: 60px;");
    document.getElementById('btn_cancelar').setAttribute("style", "display:none;width: 60px;");

    document.getElementById('btn_prest').setAttribute("href", "#");
    document.getElementById('btn_dx_ingresourg').setAttribute("href", "#");
    document.getElementById('btn_dx_diag1').setAttribute("href", "#");
    document.getElementById('btn_dx_diag2').setAttribute("href", "#");
    document.getElementById('btn_dx_diag3').setAttribute("href", "#");

}

function rips_procedimientos(ori){
     
     window.open("../rips_procedimientos?ori="+ori,"rips_procedimientos","width=1000, height=750, scrollbars=yes, menubar=no, location=no, resizable=no");
}

function guar_ripsProce(opc){


    if(document.getElementById("proce").value==""){
        alert("Seleccione el Servicio de Procedimiento");
    }else if(document.getElementById("txtusuario").value==""){
        alert("Seleccione el Prestador");
    }else if(document.getElementById("ambito").value==""){
        alert("Seleccione el Ambito Realización");
    }else if(document.getElementById("finProc").value==""){
        alert("Seleccione la Finalidad del Procedimiento");
    }else if(document.getElementById("persAtin").value==""){
        alert("Seleccione el Personal que Atiende");
    }else if(document.getElementById("formreali").value==""){
         alert("Seleccione la Forma de Realización");
    }else if(document.getElementById("diagPpal").value==""){
           alert("Seleccione el Diagnostico Principal");
    }else{
        iden=document.getElementById("txtcod").value;
        idcon=document.getElementById("proce").value;
        ambito=document.getElementById("ambito").value;
        finProc=document.getElementById("finProc").value;
        persAtin=document.getElementById("persAtin").value;
        formreali=document.getElementById("formreali").value;
        diagPpal=document.getElementById("diagPpal").value;
        DiagRela=document.getElementById("DiagRela").value;
        complica=document.getElementById("complica").value;
        codprest=document.getElementById("txtusuario").value;

        variables="iden="+iden+"&idcon="+idcon+"&ambito="+ambito+"&finProc="+finProc+"&persAtin="+persAtin
        +"&formreali="+formreali+"&diagPpal="+diagPpal+"&DiagRela="+DiagRela+"&complica="+complica+"&codprest="+codprest+"&ori="+opc;

        guardar('../guardar_ripsprocedi',variables,'ripsprocedimiento',opc);
    }

}

function nuevo_ripsProcepyp(){

    txtcod=document.getElementById("txtcod").value;

  if(txtcod==""){
     alert("Seleccione el Paciente");
  }else{

  ajax = ObjetoAjax();
  ajax.open("POST", "../conripsguar", true);
  ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  ajax.send("id_pac="+txtcod+"&ori=proc");
  ajax.onreadystatechange=function() {
  if (ajax.readyState==4) {
     document.getElementById('proce').innerHTML = ajax.responseText
  }
  }

    document.getElementById("fecserv").value="";
    document.getElementById("admin").value="";
    document.getElementById("txtusuario").value="";
    document.getElementById("txtpres").value="";

    document.getElementById("ambito").selectedIndex=0;
    document.getElementById("finProc").selectedIndex=0;
    document.getElementById("persAtin").selectedIndex=0;
    document.getElementById("formreali").selectedIndex=0;

    document.getElementById("diagPpal").value="";
    document.getElementById("desdiagPpal").value="";
    document.getElementById("DiagRela").value="";
    document.getElementById("desDiagRela").value="";
    document.getElementById("complica").value="";
    document.getElementById("descomplica").value="";


    document.getElementById("proce").disabled=false;
    document.getElementById("admin").value="";
    document.getElementById("txtusuario").disabled=false;
    document.getElementById("txtpres").value="";

    document.getElementById("ambito").disabled=false;
    document.getElementById("finProc").disabled=false;
    document.getElementById("persAtin").disabled=false;
    document.getElementById("formreali").disabled=false;

    document.getElementById("diagPpal").disabled=false;
    document.getElementById("desdiagPpal").value="";
    document.getElementById("DiagRela").disabled=false;
    document.getElementById("desDiagRela").value="";
    document.getElementById("complica").disabled=false;
    document.getElementById("descomplica").value="";

    document.getElementById('btn_guardar').setAttribute("style", "display:block;width: 60px;");
    document.getElementById('btn_nuevo').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_cancelar').setAttribute("style", "display:block;width: 60px;");
//
    document.getElementById('btn_prest').setAttribute("href", "javascript:most_prestador()");
    document.getElementById('btn_dx_ingreprinc').setAttribute("href", "javascript:buscar_dx('dx_ingreprinc')");
    document.getElementById('btn_dx_diarel').setAttribute("href", "javascript:buscar_dx('dx_diarel')");
    document.getElementById('btn_dx_diacomp').setAttribute("href", "javascript:buscar_dx('dx_diacomp')");
  }
}

function nuevo_ripsProce(){

    txtcod=document.getElementById("txtcod").value;

  if(txtcod==""){
     alert("Seleccione el Paciente");
  }else{

  ajax = ObjetoAjax();
  ajax.open("POST", "../conripsguar", true);
  ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  ajax.send("id_pac="+txtcod+"&ori=proc");
  ajax.onreadystatechange=function() {
  if (ajax.readyState==4) {
     document.getElementById('proce').innerHTML = ajax.responseText
  }
  }

    document.getElementById("fecserv").value="";
    document.getElementById("admin").value="";
    document.getElementById("txtusuario").value="";
    document.getElementById("txtpres").value="";

    document.getElementById("ambito").selectedIndex=0;
    document.getElementById("finProc").selectedIndex=0;
    document.getElementById("persAtin").selectedIndex=0;
    document.getElementById("formreali").selectedIndex=0;

    document.getElementById("diagPpal").value="";
    document.getElementById("desdiagPpal").value="";
    document.getElementById("DiagRela").value="";
    document.getElementById("desDiagRela").value="";
    document.getElementById("complica").value="";
    document.getElementById("descomplica").value="";


    document.getElementById("proce").disabled=false;
    document.getElementById("admin").value="";
    document.getElementById("txtusuario").disabled=false;
    document.getElementById("txtpres").value="";

    document.getElementById("ambito").disabled=false;
    document.getElementById("finProc").disabled=false;
    document.getElementById("persAtin").disabled=false;
    document.getElementById("formreali").disabled=false;

    document.getElementById("diagPpal").disabled=false;
    document.getElementById("desdiagPpal").value="";
    document.getElementById("DiagRela").disabled=false;
    document.getElementById("desDiagRela").value="";
    document.getElementById("complica").disabled=false;
    document.getElementById("descomplica").value="";

    document.getElementById('btn_guardar').setAttribute("style", "display:block;width: 60px;");
    document.getElementById('btn_nuevo').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_cancelar').setAttribute("style", "display:block;width: 60px;");
//
    document.getElementById('btn_prest').setAttribute("href", "javascript:most_prestador()");
    document.getElementById('btn_dx_ingreprinc').setAttribute("href", "javascript:buscar_dx('dx_ingreprinc')");
    document.getElementById('btn_dx_diarel').setAttribute("href", "javascript:buscar_dx('dx_diarel')");
    document.getElementById('btn_dx_diacomp').setAttribute("href", "javascript:buscar_dx('dx_diacomp')");
  }
}

function cancelripsproc(opc){

    document.getElementById("fecserv").value="";
    document.getElementById("admin").value="";
    document.getElementById("txtusuario").value="";
    document.getElementById("txtpres").value="";

    document.getElementById("ambito").selectedIndex=0;
    document.getElementById("finProc").selectedIndex=0;
    document.getElementById("persAtin").selectedIndex=0;
    document.getElementById("formreali").selectedIndex=0;
     document.getElementById("proce").selectedIndex=0;

    document.getElementById("diagPpal").value="";
    document.getElementById("desdiagPpal").value="";
    document.getElementById("DiagRela").value="";
    document.getElementById("desDiagRela").value="";
    document.getElementById("complica").value="";
    document.getElementById("descomplica").value="";


    document.getElementById("proce").disabled=true;
    document.getElementById("fecserv").disabled=true;
    document.getElementById("admin").value="";
    document.getElementById("txtusuario").disabled=true;
    document.getElementById("txtpres").value="";

    document.getElementById("ambito").disabled=true;
    document.getElementById("finProc").disabled=true;
    document.getElementById("persAtin").disabled=true;
    document.getElementById("formreali").disabled=true;

    document.getElementById("diagPpal").disabled=true;
    document.getElementById("desdiagPpal").value="";
    document.getElementById("DiagRela").disabled=true;
    document.getElementById("desDiagRela").value="";
    document.getElementById("complica").disabled=true;
    document.getElementById("descomplica").value="";


    document.getElementById('btn_guardar').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_nuevo').setAttribute("style", "display:block;width: 60px;");
    document.getElementById('btn_cancelar').setAttribute("style", "display:none;width: 60px;");

    document.getElementById('btn_prest').setAttribute("href", "#");
    document.getElementById('btn_dx_ingreprinc').setAttribute("href", "#");
    document.getElementById('btn_dx_diarel').setAttribute("href", "#");
    document.getElementById('btn_dx_diacomp').setAttribute("href", "#");
}

function busc_ordIntHosp(){

    carga_OrdenInterna('hosp');
    document.getElementById('buscaOrdInterna').style.visibility = 'visible';
    location.href="#buscaOrdInterna";
}

function busc_ordIntAnul(){

    carga_OrdenInterna('anul');
    document.getElementById('buscaOrdInterna').style.visibility = 'visible';
    location.href="#buscaOrdInterna";
}

function busc_ordIntFact(){

    document.getElementById('contenido').innerHTML =" <div id='contenido'><fieldset class='redondo'   style=' width:99%; padding: 5px 0 5px 0; margin-bottom: 5px; border-color: #CCCCCC'>"
    +"                       <legend style='font-weight: bold;' ><div id='tit'>DETALLE DE FACTURA</div>"
    +"                       </legend>"
    +"                       <div class='content'  style='width:96%; border: 1px solid #aaaaaa; overflow:scroll;'>"
    +"                               <table width='100%' cellpadding='0' cellspacing='0' class='data' id='box-table-a' >"
    +"                                   <thead style='font-size: 12px'>"
    +"                                      <tr>"
    +"                                          <th  style='font-size: 11px;'  scope='col' >FECHA</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>C&Oacute;DIGO</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>CONCEPTO</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>CANT.</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>VALOR UNT</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>VALOR TOTAL</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>COP</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>CM</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>POR</th>"
    +"                                          <th  style='font-size: 11px;' scope='col'>M&Oacute;DULO</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>UF</th>"
    +"                                          <th  style='font-size: 11px;' scope='col'>CUENTA</th>"
    +"                                          <th  style='font-size: 11px;' scope='col'>CC</th>"
    +"                                          <th  style='font-size: 11px;' scope='col'>GRUPO</th>"
    +"                                          <th  style='font-size: 11px;' scope='col'>CLASE</th>"
    +"                                      </tr>"
    +"                                 </thead>"
    +"                             </table>"
    +"                         <div style='width: 100%;height: 100px; overflow: auto;'>"
    +"                             <table width='100%' cellpadding='0' cellspacing='0' class='data' id='box-table-a'>"
    +"                             <tbody id='tabemp' style='font-size: 14px;'>"
    +"                              </tbody>"
    +"                              </table>"
    +"                          </div>"
    +"                          </div>"
    +"                  </fieldset></div>";


    carga_OrdenInterna('fact');
    document.getElementById('buscaOrdInterna').style.visibility = 'visible';
    location.href="#buscaOrdInterna";
}

function busc_ordInt(){

    document.getElementById('contenido').innerHTML =" <div id='contenido'><fieldset class='redondo'   style=' width:99%; padding: 5px 0 5px 0; margin-bottom: 5px; border-color: #CCCCCC'>"
    +"                       <legend style='font-weight: bold;' ><div id='tit'>DETALLE DE FACTURA</div>"
    +"                       </legend>"
    +"                       <div class='content'  style='width:96%; border: 1px solid #aaaaaa; overflow:scroll;'>"
    +"                               <table width='100%' cellpadding='0' cellspacing='0' class='data' id='box-table-a' >"
    +"                                   <thead style='font-size: 12px'>"
    +"                                      <tr>"
    +"                                          <th  style='font-size: 11px;'  scope='col' >FECHA</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>C&Oacute;DIGO</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>CONCEPTO</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>CANT.</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>VALOR UNT</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>VALOR TOTAL</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>COP</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>CM</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>POR</th>"
    +"                                          <th  style='font-size: 11px;' scope='col'>M&Oacute;DULO</th>"
    +"                                          <th  style='font-size: 11px;'  scope='col'>UF</th>"
    +"                                          <th  style='font-size: 11px;' scope='col'>CUENTA</th>"
    +"                                          <th  style='font-size: 11px;' scope='col'>CC</th>"
    +"                                          <th  style='font-size: 11px;' scope='col'>GRUPO</th>"
    +"                                          <th  style='font-size: 11px;' scope='col'>CLASE</th>"
    +"                                      </tr>"
    +"                                 </thead>"
    +"                             </table>"
    +"                         <div style='width: 100%;height: 100px; overflow: auto;'>"
    +"                             <table width='100%' cellpadding='0' cellspacing='0' class='data' id='box-table-a'>"
    +"                             <tbody id='tabemp' style='font-size: 14px;'>"
    +"                              </tbody>"
    +"                              </table>"
    +"                          </div>"
    +"                          </div>"
    +"                  </fieldset></div>";

    carga_OrdenInterna('urge');
    document.getElementById('buscaOrdInterna').style.visibility = 'visible';
    location.href="#buscaOrdInterna";
}


function busc_factHosp(){
    carga_FactuHosp('hosp');
    document.getElementById('buscaOrdInterna').style.visibility = 'visible';
    location.href="#buscaOrdInterna";
}

function busc_factAgrup(){
     carga_FactAgrup();
    document.getElementById('buscaFact').style.visibility = 'visible';
    location.href="#buscaFact";
}

function busc_fact(){
    carga_FactuHosp('hosp');
    document.getElementById('buscaFact').style.visibility = 'visible';
    location.href="#buscaFact";
}

function busc_factAnul(){
    carga_FactuAnul('factanul');
    document.getElementById('buscaFact').style.visibility = 'visible';
    location.href="#buscaFact";
}

function busc_factAnulAgrup(){
    carga_FactuAnul('factanulAgrup');
    document.getElementById('buscaFact').style.visibility = 'visible';
    location.href="#buscaFact";
}

function Busqueda_OrdInterna(ori){

   tip_bus=document.getElementById("t_bus").value;
   busq=  document.getElementById("busqueda").value;

    ajax = ObjetoAjax();
    ajax.open("POST", "../most_ordIntHospital", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&ori="+ori);
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_ordInterna').innerHTML = ajax.responseText
        }
    }
}

function carga_OrdenInterna(ori){

    ajax = ObjetoAjax();
    if(ori=="anul"){
        ajax.open("POST", "../most_ordIntAnul", true);

    }else{
        ajax.open("POST", "../most_ordIntHospital", true);
    }

    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("ori="+ori);
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_ordInterna').innerHTML = ajax.responseText
        }
    }
}

function carga_FactAgrup(){

    ajax = ObjetoAjax();
    ajax.open("POST", "../most_facturasAgrup", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("ori=n");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_fact').innerHTML = ajax.responseText
        }
    }

}

function carga_FactuHosp(ori){

    ajax = ObjetoAjax();
    ajax.open("POST", "../most_facturas", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("ori="+ori);
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_ordInterna').innerHTML = ajax.responseText
        }
    }
}
function carga_FactuAnul(ori){

    ajax = ObjetoAjax();
   if(ori=="factanulAgrup"){
        ajax.open("POST", "../most_facturasAgrup", true);
   }else{
    ajax.open("POST", "../most_facturas", true);
   }

    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("ori="+ori);
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_fact').innerHTML = ajax.responseText
        }
    }
}

function rips_urgencia(ori){
    window.open("../rips_urgencia?copac=inde&ori="+ori,"rips_urgencia","width=1000, height=750, scrollbars=yes, menubar=no, location=no, resizable=no");
}


function busc_fact1(){
    window.open("../most_facturas","ventana_busca_facturas_urge","width=1000, height=580, scrollbars=YES, menubar=no, location=no, resizable=no");
}

function sel_factura(){

    var num_elementos = document.getElementsByName("seleccion1").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion1")[contador].checked == true)	//> se obtiene el value del check seleccionado
            valor = document.getElementsByName("seleccion1")[contador].value;	//
    }

     document.location="../facturar_urge?origen=imp_fact&fact="+valor;
     document.getElementById("buscaOrdInterna").style.visibility = 'hidden';
     document.getElementById('td_ordInterna').innerHTML="";
}

function sel_facturaHosp(){

    var num_elementos = document.getElementsByName("seleccion1").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion1")[contador].checked == true)	//> se obtiene el value del check seleccionado
            valor = document.getElementsByName("seleccion1")[contador].value;	//
    }

      document.location="../facturacion_hospi?origen=imp_fact&fact="+valor;
      document.getElementById("buscaOrdInterna").style.visibility = 'hidden';
       document.getElementById('td_ordInterna').innerHTML="";

}

function sel_facturaAmbu(){

    var num_elementos = document.getElementsByName("seleccion1").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion1")[contador].checked == true)	//> se obtiene el value del check seleccionado
            valor = document.getElementsByName("seleccion1")[contador].value;	//
    }

      document.location="../facturacion_ambu?origen=imp_fact&fact="+valor;
      document.getElementById("buscaOrdInterna").style.visibility = 'hidden';
       document.getElementById('td_ordInterna').innerHTML="";

}

function sel_facturaAnul(){

    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            valor = document.getElementsByName("seleccion")[contador].value;	//
    }
    pvalor=valor.split("//");
    var est="";
    if(pvalor[2]=="NO"){
    est="ASIGNADA";
    }else{
     est="ANULADO"
    }

    document.getElementById('num_fac').value=pvalor[0];
    document.getElementById('fec_fac').value=pvalor[1];
    document.getElementById('est_fact').value=est;
    document.getElementById('nom_pac').value=pvalor[3];
    document.getElementById('nom_emp').value=pvalor[4];
    document.getElementById('val').value=pvalor[5];
    document.getElementById('tip_fac').value="INDIVIDUAL";
    document.getElementById('tit_an').innerHTML="<span>Anula Registro de Factura N° "+pvalor[0]+" </span>";

    document.getElementById("buscaFact").style.visibility = 'hidden';
    document.getElementById('td_fact').innerHTML="";


}

function sel_ordIntAnul(){

    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            valor = document.getElementsByName("seleccion")[contador].value;	//
    }
    pvalor=valor.split("//");
    var est="";
    if(pvalor[2]=="NO"){
    est="ASIGNADA";
    }else{
     est="ANULADO"
    }

    document.getElementById('num_fac').value=pvalor[0];
    document.getElementById('fec_fac').value=pvalor[1];
    document.getElementById('est_fact').value=est;
    document.getElementById('nom_pac').value=pvalor[3];
    document.getElementById('nom_emp').value=pvalor[4];
    document.getElementById('val').value=pvalor[5];
    document.getElementById('tip_fac').value="INDIVIDUAL";
    document.getElementById('tit_an').innerHTML="<span>Anula Registro de Orden Interna N° "+pvalor[0]+" </span>";

    document.getElementById("buscaOrdInterna").style.visibility = 'hidden';
    document.getElementById('td_ordInterna').innerHTML="";


}


function sel_facturaAnulAgrup(){

    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            valor = document.getElementsByName("seleccion")[contador].value;	//
    }
    pvalor=valor.split("//");
    var est="";
    if(pvalor[4]=="NO"){
    est="ASIGNADA";
    document.getElementById('button_anul').setAttribute("style", "display:block;");
    }else{
    est="ANULADA"
       document.getElementById('button_anul').setAttribute("style", "display:none;");
    }

    document.getElementById('num_fac').value=pvalor[0];
    document.getElementById('fec_fac').value=pvalor[1];
    document.getElementById('est_fact').value=est;
    document.getElementById('nom_emp').value=pvalor[2];
    document.getElementById('val').value=pvalor[3];
    document.getElementById('tip_fac').value="AGRUPADA";
    document.getElementById('tit_an').innerHTML="<span>Anula Registro de Factura N° "+pvalor[0]+" </span>";

    document.getElementById("buscaFact").style.visibility = 'hidden';
    document.getElementById('td_fact').innerHTML="";



}

function AnulfactInd(){
    num_fact=document.getElementById("num_fac").value;
    ajax = ObjetoAjax();
    ajax.open("POST", "../anularFact", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("num_fact="+num_fact+"&tipFac=indi");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            if(ajax.responseText=="bien"){
        alert("La Factura No. "+num_fact+" fue Anulada Correctamente.");
        Cerrarpopu('razonAnul');
        document.getElementById("est_fact").valu="ANULADA";
        }
        }
    }

}

function AnulOrdInterna(){
    num_fact=document.getElementById("num_fac").value;
    ajax = ObjetoAjax();
    ajax.open("POST", "../anularOrdInt", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("num_fact="+num_fact+"&tipFac=indi");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
           if(ajax.responseText=="bien"){
        alert("La Orden Interna No. "+num_fact+" fue Anulada Correctamente.");
        Cerrarpopu('razonAnul');
        document.getElementById("est_fact").valu="ANULADA";

        }
        }
    }

}

function anulFactAgrupada(){
    num_fact=document.getElementById("num_fac").value;
    ajax = ObjetoAjax();
    ajax.open("POST", "../anularFact", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("num_fact="+num_fact+"&tipFac=agrup");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
        if(ajax.responseText=="bien"){
        alert("La Factura No. "+num_fact+" Fue Anulada Correctamente.");
        Cerrarpopu('razonAnul');
        document.getElementById("est_fact").valu="ANULADA";
        }
    }
   }
}

function anul_fact_indi(){
    document.getElementById('razonAnul').style.visibility = 'visible';
    location.href="#razonAnul";
}


function anul_fact_Agrup(){
    document.getElementById('razonAnul').style.visibility = 'visible';
    location.href="#razonAnul";
}
function anul_orden(){
    document.getElementById('razonAnul').style.visibility = 'visible';
    location.href="#razonAnul";
}


function sel_facturaFact(){

    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            valor = document.getElementsByName("seleccion")[contador].value;	//
    }

      document.location="../facturar_fact?origen=imp_fact&fact="+valor;
      document.getElementById("buscaOrdInterna").style.visibility = 'hidden';
       document.getElementById('td_ordInterna').innerHTML="";

}

function sel_factAgrup(){
     var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            valor = document.getElementsByName("seleccion")[contador].value;	//
    }

      document.location="../factAgrup?origen=imp_fact&fact="+valor;
      document.getElementById("buscaOrdInterna").style.visibility = 'hidden';
       document.getElementById('td_ordInterna').innerHTML="";

}

//function sel_factura(){
//
//    var num_elementos = document.getElementsByName("seleccion").length;
//    for( var contador=0; contador < num_elementos; contador++ ){			//
//        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
//            valor = document.getElementsByName("seleccion")[contador].value;	//
//    }
//
//      window.opener.document.location="../facturar_urge?origen=imp_fact&fact="+valor;
//
//      window.close();
//}

function sel_ordInt(){

    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            valor = document.getElementsByName("seleccion")[contador].value;	//
    }

      document.location="../orden_interna?origen=imp_orden&orden="+valor;
       document.getElementById("buscaOrdInterna").style.visibility = 'hidden';
       document.getElementById('td_ordInterna').innerHTML="";
}

function sel_ordIntHosp(){

    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            valor = document.getElementsByName("seleccion")[contador].value;	//
    }

       document.location="../orden_internaHospi?origen=imp_orden&orden="+valor;
       document.getElementById("buscaOrdInterna").style.visibility = 'hidden';
       document.getElementById('td_ordInterna').innerHTML="";

}

function sel_ordIntFact(){
    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            valor = document.getElementsByName("seleccion")[contador].value;	//
    }

       document.location="../orden_internafact?origen=imp_orden&orden="+valor;
       document.getElementById("buscaOrdInterna").style.visibility = 'hidden';
       document.getElementById('td_ordInterna').innerHTML="";

}

function sel_ordIntFact2(){
    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            valor = document.getElementsByName("seleccion")[contador].value;	//
    }

       document.location="../ordenInterFact?origen=imp_orden&orden="+valor;
       document.getElementById("buscaOrdInterna").style.visibility = 'hidden';
       document.getElementById('td_ordInterna').innerHTML="";

}

function impri_fact(){
 nfact=document.getElementById("txtnfac").value;
 window.open("../imprimFactInd?consefac="+nfact,"impri_fact_ind","width=1000, height=750, scrollbars=yes, menubar=no, location=no, resizable=no");
 }

 function impri_factHosp(){
 nfact=document.getElementById("txtnfac").value;
 window.open("../imprimFactInd?consefac="+nfact+"&ori=hosp","impri_fact_ind","width=1000, height=750, scrollbars=yes, menubar=no, location=no, resizable=no");
 }

 function impri_ordInt(){
 nfact=document.getElementById("txtnfac").value;
 window.open("../imprimirOrdenInt?conseOrdi="+nfact+"&ori=urge","impri_orden_int","width=1000, height=750, scrollbars=yes, menubar=no, location=no, resizable=no");
 }

  function impri_ordIntHosp(){
 nfact=document.getElementById("txtnfac").value;
 window.open("../imprimirOrdenInt?conseOrdi="+nfact+"&ori=hosp","impri_orden_int_hosp","width=1000, height=750, scrollbars=yes, menubar=no, location=no, resizable=no");
 }

   function impri_FactAgrup(){
 nfact=document.getElementById("txtnfac").value;
 window.open("../imprimFactAgrup?consefac="+nfact+"&ori=hosp","impri_orden_int_hosp","width=1000, height=750, scrollbars=yes, menubar=no, location=no, resizable=no");
 }

 function Busqueda_facturas(){

    tip_bus=document.getElementById("t_bus").value;
    busq=  document.getElementById("busqueda").value;
    fecha1=  document.getElementById("fecha1").value;
    fecha2=  document.getElementById("fecha2").value;

    ajax = ObjetoAjax();
    ajax.open("POST", "../most_facturas", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&control=2&ori=norm&fecha1="+fecha1+"&fecha2="+fecha2);
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_tabla').innerHTML = ajax.responseText
        }
    }


 }

 function chancontra(){

     if(document.getElementById("plcontra").checked==false){
         document.getElementById("numcont").value="0";
         document.getElementById("valcont").value="0,00";
         document.getElementById("valejec").value="0,00";
         document.getElementById("poravi").value="0,00";
         document.getElementById("numcont").disabled=true;
         document.getElementById("valcont").disabled=true;
         document.getElementById("valejec").disabled=true;
         document.getElementById("poravi").disabled=true;
     }else{
         document.getElementById("numcont").disabled=false;
         document.getElementById("valcont").disabled=false;
         document.getElementById("valejec").disabled=false;
         document.getElementById("poravi").disabled=false;
     }

 }

 function guar_ordenIntHosp(){

    unFunc=document.getElementById("unfunc").value;
    id_pac=document.getElementById("id_pac").value;


    if(id_pac==""){
        alert("Debe Seleccionar la identificación de Paciente, Verifique...");
        document.getElementById("id_pac").focus();
    }else if(unFunc==""){
        alert("Debe Seleccionar la Unidad Funcional, Verifique...");
        document.getElementById("unfunc").focus();
    }else{

    var valor="";
    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            valor =valor+document.getElementsByName("seleccion")[contador].value+"-";	//
    }

    id_pac=document.getElementById('txtcod').value;

            id_pac=document.getElementById('txtcod').value;
            fela=document.getElementById('fela').value;
            plan=document.getElementById('txtnomplan').value;
            admin=document.getElementById('txtnomadm').value;
            subtotal=parseFloat(document.getElementById('subtotal').value.replace(".","").replace(".","").replace(",","."));
            totalG=parseFloat(document.getElementById('totalG').value.replace(".","").replace(".","").replace(",","."));
            porc=parseFloat(document.getElementById('porc').value.replace(".","").replace(".","").replace(",","."));
            cutM=parseFloat(document.getElementById('cutM').value.replace(".","").replace(".","").replace(",","."));
            copag=parseFloat(document.getElementById('copag').value.replace(".","").replace(".","").replace(",","."));
            desc=parseFloat(document.getElementById('desc').value.replace(".","").replace(".","").replace(",","."));
            fini=document.getElementById('fini').value;
            ffin=document.getElementById('ffin').value;
            fvenc=document.getElementById('fvenc').value;
            unfunc=document.getElementById('unfunc').value;
            deducc=parseFloat(document.getElementById('deducc').value.replace(".","").replace(".","").replace(",","."));
            txtpoliza=document.getElementById('txtpoliza').value = "";

            /////////////
//            document.getElementById('id_pac').value = "";
//            document.getElementById('txtnom').value = "";
//            document.getElementById('txttusu').value = "";
//            document.getElementById('txtest').value = "";
////            document.getElementById('txtreg').value = "";
//            document.getElementById('txtnfac').value = "";


         variables="id_pac="+id_pac+"&fela="+fela+"&plan="+plan+"&admin="+admin+"&subtotal="+subtotal+"&totalG="+totalG+"&porc="+porc+"&cutM="+cutM+"&copag="+copag
        +"&desc="+desc+"&fini="+fini+"&ffin="+ffin+"&fvenc="+fvenc+"&unfunc="+unfunc
        +"&txtpoliza="+txtpoliza+"&valor="+valor;

       guardar('../guardar_ordenIntHosp',variables,'guardar_OrdenIntHosp');
     }

 }

  function guar_ordenIntpyp(){

    unFunc=document.getElementById("unfunc").value;
    id_pac=document.getElementById("id_pac").value;

    if(id_pac==""){
        alert("Debe Seleccionar la identificación de Paciente, Verifique...");
        document.getElementById("id_pac").focus();
    }else if(unFunc==""){
        alert("Debe Seleccionar la Unidad Funcional, Verifique...");
        document.getElementById("unfunc").focus();
    }else{

    var valor="";
    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            valor =valor+document.getElementsByName("seleccion")[contador].value+"-";	//
    }

    id_pac=document.getElementById('txtcod').value;

            id_pac=document.getElementById('txtcod').value;
            fela=document.getElementById('fela').value;
            plan=document.getElementById('txtnomplan').value;
            admin=document.getElementById('txtnomadm').value;
            subtotal=parseFloat(document.getElementById('subtotal').value.replace(".","").replace(".","").replace(",","."));
            totalG=parseFloat(document.getElementById('totalG').value.replace(".","").replace(".","").replace(",","."));
            porc=parseFloat(document.getElementById('porc').value.replace(".","").replace(".","").replace(",","."));
            cutM=parseFloat(document.getElementById('cutM').value.replace(".","").replace(".","").replace(",","."));
            copag=parseFloat(document.getElementById('copag').value.replace(".","").replace(".","").replace(",","."));
            desc=parseFloat(document.getElementById('desc').value.replace(".","").replace(".","").replace(",","."));
            fini=document.getElementById('fini').value;
            ffin=document.getElementById('ffin').value;
            fvenc=document.getElementById('fvenc').value;
            unfunc=document.getElementById('unfunc').value;
            deducc=parseFloat(document.getElementById('deducc').value.replace(".","").replace(".","").replace(",","."));
            txtpoliza=document.getElementById('txtpoliza').value = "";

            /////////////
//            document.getElementById('id_pac').value = "";
//            document.getElementById('txtnom').value = "";
//            document.getElementById('txttusu').value = "";
//            document.getElementById('txtest').value = "";
////            document.getElementById('txtreg').value = "";
//            document.getElementById('txtnfac').value = "";


         variables="id_pac="+id_pac+"&fela="+fela+"&plan="+plan+"&admin="+admin+"&subtotal="+subtotal+"&totalG="+totalG+"&porc="+porc+"&cutM="+cutM+"&copag="+copag
        +"&desc="+desc+"&fini="+fini+"&ffin="+ffin+"&fvenc="+fvenc+"&unfunc="+unfunc
        +"&txtpoliza="+txtpoliza+"&valor="+valor;

       guardar('../guardar_ordenIntpyp',variables,'guardar_OrdenIntpyp');
     }

 }

  function guar_ordenIntAmbu(){

    unFunc=document.getElementById("unfunc").value;
    id_pac=document.getElementById("id_pac").value;

    if(id_pac==""){
        alert("Debe Seleccionar la identificación de Paciente, Verifique...");
        document.getElementById("id_pac").focus();
    }else if(unFunc==""){
        alert("Debe Seleccionar la Unidad Funcional, Verifique...");
        document.getElementById("unfunc").focus();
    }else{

    var valor="";
    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            valor =valor+document.getElementsByName("seleccion")[contador].value+"-";	//
    }

    id_pac=document.getElementById('txtcod').value;

            id_pac=document.getElementById('txtcod').value;
            fela=document.getElementById('fela').value;
            plan=document.getElementById('txtnomplan').value;
            admin=document.getElementById('txtnomadm').value;
            subtotal=parseFloat(document.getElementById('subtotal').value.replace(".","").replace(".","").replace(",","."));
            totalG=parseFloat(document.getElementById('totalG').value.replace(".","").replace(".","").replace(",","."));
            porc=parseFloat(document.getElementById('porc').value.replace(".","").replace(".","").replace(",","."));
            cutM=parseFloat(document.getElementById('cutM').value.replace(".","").replace(".","").replace(",","."));
            copag=parseFloat(document.getElementById('copag').value.replace(".","").replace(".","").replace(",","."));
            desc=parseFloat(document.getElementById('desc').value.replace(".","").replace(".","").replace(",","."));
            fini=document.getElementById('fini').value;
            ffin=document.getElementById('ffin').value;
            fvenc=document.getElementById('fvenc').value;
            unfunc=document.getElementById('unfunc').value;
            deducc=parseFloat(document.getElementById('deducc').value.replace(".","").replace(".","").replace(",","."));
            txtpoliza=document.getElementById('txtpoliza').value = "";

            /////////////
//            document.getElementById('id_pac').value = "";
//            document.getElementById('txtnom').value = "";
//            document.getElementById('txttusu').value = "";
//            document.getElementById('txtest').value = "";
////            document.getElementById('txtreg').value = "";
//            document.getElementById('txtnfac').value = "";


         variables="id_pac="+id_pac+"&fela="+fela+"&plan="+plan+"&admin="+admin+"&subtotal="+subtotal+"&totalG="+totalG+"&porc="+porc+"&cutM="+cutM+"&copag="+copag
        +"&desc="+desc+"&fini="+fini+"&ffin="+ffin+"&fvenc="+fvenc+"&unfunc="+unfunc
        +"&txtpoliza="+txtpoliza+"&valor="+valor;

       guardar('../guardar_ordenIntAmbu',variables,'guardar_OrdenIntAmbu');
     }

 }

  function guar_ordenIntFact(){

    unFunc=document.getElementById("unfunc").value;
    id_pac=document.getElementById("id_pac").value;


    if(id_pac==""){
        alert("Debe Seleccionar la identificación de Paciente, Verifique...");
        document.getElementById("id_pac").focus();
    }else if(unFunc==""){
        alert("Debe Seleccionar la Unidad Funcional, Verifique...");
        document.getElementById("unfunc").focus();
    }else{

    var valor="";
    var num_elementos = document.getElementsByName("seleccion").length;

    if(num_elementos<=0){
    alert("No hay servicios para generar la Orden Interna, Verifique...");
    }else{
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            valor =valor+document.getElementsByName("seleccion")[contador].value+"-";	//
    }


           id_pac=document.getElementById('txtcod').value;
           id_pac=document.getElementById('txtcod').value;
            fela=document.getElementById('fela').value;
            plan=document.getElementById('txtnomplan').value;
            admin=document.getElementById('txtnomadm').value;
            subtotal=parseFloat(document.getElementById('subtotal').value.replace(".","").replace(".","").replace(",","."));
            totalG=parseFloat(document.getElementById('totalG').value.replace(".","").replace(".","").replace(",","."));
            porc=parseFloat(document.getElementById('porc').value.replace(".","").replace(".","").replace(",","."));
            cutM=parseFloat(document.getElementById('cutM').value.replace(".","").replace(".","").replace(",","."));
            copag=parseFloat(document.getElementById('copag').value.replace(".","").replace(".","").replace(",","."));
            desc=parseFloat(document.getElementById('desc').value.replace(".","").replace(".","").replace(",","."));
            fini=document.getElementById('fini').value;
            ffin=document.getElementById('ffin').value;
            fvenc=document.getElementById('fvenc').value;
            unfunc=document.getElementById('unfunc').value;
            deducc=parseFloat(document.getElementById('deducc').value.replace(".","").replace(".","").replace(",","."));
            txtpoliza=document.getElementById('txtpoliza').value = "";

            /////////////
            document.getElementById('id_pac').value = "";
            document.getElementById('txtnom').value = "";
            document.getElementById('txttusu').value = "";
            document.getElementById('txtest').value = "";
//            document.getElementById('txtreg').value = "";
            document.getElementById('txtnfac').value = "";


         variables="id_pac="+id_pac+"&fela="+fela+"&plan="+plan+"&admin="+admin+"&subtotal="+subtotal+"&totalG="+totalG+"&porc="+porc+"&cutM="+cutM+"&copag="+copag
        +"&desc="+desc+"&fini="+fini+"&ffin="+ffin+"&fvenc="+fvenc+"&unfunc="+unfunc
        +"&txtpoliza="+txtpoliza+"&valor="+valor;

       guardar('../guardar_ordenIntFact',variables,'guardar_OrdenIntHosp');


    }
            }

 }

 function guar_ordenInt(){

    unFunc=document.getElementById("unfunc").value;
    id_pac=document.getElementById("id_pac").value;
    plan=document.getElementById('txtnomplan').value;
    admin=document.getElementById('txtnomadm').value;
     var num_elementos = document.getElementsByName("seleccion").length;
    if(id_pac==""){
        alert("Debe Seleccionar la identificación de Paciente, Verifique...");
        document.getElementById("id_pac").focus();
    }else if(unFunc==""){
        alert("Debe Seleccionar la Unidad Funcional, Verifique...");
        document.getElementById("unfunc").focus();
    }else if(num_elementos<0){
        alert("No existen servicios para generar la Orden Interna, Verifique...");
    }else{

    var valor="";

    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            valor =valor+document.getElementsByName("seleccion")[contador].value+"-";	//
    }

    id_pac=document.getElementById('txtcod').value;

    ajax = ObjetoAjax();
    ajax.open("POST", "../valregcomp", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("id_pac="+id_pac+"&valor="+valor);
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            if(trimAll(ajax.responseText)=="1"){
               alert("Hay RIPS incompletos en la Consulta, Verifique...");
            }else{
            id_pac=document.getElementById('txtcod').value;
            fela=document.getElementById('fela').value;
            subtotal=parseFloat(document.getElementById('subtotal').value.replace(".","").replace(".","").replace(",","."));
            totalG=parseFloat(document.getElementById('totalG').value.replace(".","").replace(".","").replace(",","."));
            porc=parseFloat(document.getElementById('porc').value.replace(".","").replace(".","").replace(",","."));
            cutM=parseFloat(document.getElementById('cutM').value.replace(".","").replace(".","").replace(",","."));
            copag=parseFloat(document.getElementById('copag').value.replace(".","").replace(".","").replace(",","."));
            desc=parseFloat(document.getElementById('desc').value.replace(".","").replace(".","").replace(",","."));
            fini=document.getElementById('fini').value;
            ffin=document.getElementById('ffin').value;
            fvenc=document.getElementById('fvenc').value;
            unfunc=document.getElementById('unfunc').value;
            deducc=parseFloat(document.getElementById('deducc').value.replace(".","").replace(".","").replace(",","."));
            txtpoliza=document.getElementById('txtpoliza').value = "";

            /////////////
//            document.getElementById('id_pac').value = "";
//            document.getElementById('txtnom').value = "";
//            document.getElementById('txttusu').value = "";
//            document.getElementById('txtest').value = "";
//            document.getElementById('txtreg').value = "";
//            document.getElementById('txtnfac').value = "";


         variables="id_pac="+id_pac+"&fela="+fela+"&plan="+plan+"&subtotal="+subtotal+"&totalG="+totalG+"&porc="+porc+"&cutM="+cutM+"&copag="+copag
        +"&desc="+desc+"&fini="+fini+"&ffin="+ffin+"&fvenc="+fvenc+"&unfunc="+unfunc
        +"&txtpoliza="+txtpoliza+"&valor="+valor+"&admin="+admin;

       guardar('../guardar_ordenInt',variables,'guardar_OrdenInt');
            }
        }
    }
    }
 }

 function asig_medic(dest){

  if(document.getElementById("id_pac").value==""){
      alert("No se a Cargado el Paciente, Verifique...");
      document.getElementById("id_pac").focus();
   }else{
    datos = document.getElementById("txtcod").value+"//"+document.getElementById("id_pac").value+"//"+document.getElementById("txtnom").value+"//"+document.getElementById("txttusu").value+"//"+document.getElementById("txtnomadm").value+"//"+document.getElementById("txtnomplan").value+"//"+document.getElementById("txtreg").value+"//"+document.getElementById("txtniv").value;
    window.open("../asig_medicamento?datos="+datos+"&dest="+dest+"&origen=serv","ventana_Medicamentos","width=1020, height=580, scrollbars=YES, menubar=no, location=no, resizable=no");

  }

 }

 function most_listMed(){
      window.open("../most_listPrecios","lista_precios","width=800, height=550, scrollbars=yes, menubar=no, location=no, resizable=no");
 }

 function sel_medi(){

     var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }
    par_valor=valor.split("//");

    document.getElementById("txtcodmed").value=par_valor[0];
    document.getElementById("txtdesmed").value=par_valor[1];
    document.getElementById("txtval").value=par_valor[2];
    document.getElementById("txtunid").focus();
    Cerrarpopu('buscaMedicamentos');
 }

 function calvmed(){

     txtunid=parseFloat(document.getElementById("txtunid").value.replace(".","").replace(".","").replace(",","."));
    txtval=parseFloat(document.getElementById("txtval").value.replace(".","").replace(".","").replace(",","."));
    txtcmod=parseFloat(document.getElementById("txtcmod").value.replace(".","").replace(".","").replace(",","."));
    txtcop=parseFloat(document.getElementById("txtcop").value.replace(".","").replace(".","").replace(",","."));
    txtpcomp=parseFloat(document.getElementById("txtpcomp").value.replace(".","").replace(".","").replace(",","."));

    tot=txtval*txtunid;
    tot=tot-txtcmod-txtcop-txtpcomp;

    rta=eval(tot.toFixed(2));

    res=rta.toString().split('.');
    if(res[1]== undefined) {
        res[1]='00';
    }
    if(res[1].length<2) {
        res[1]=res[1]+'0';
    }
    document.getElementById("txttot").value= moneda(res[0])+","+res[1];

 }

 function Busqueda_precMedi2(){
    tip_bus=document.getElementById("t_bus").value;
    busq=  document.getElementById("busqueda").value;
    ajax = ObjetoAjax();
    ajax.open("POST", "../most_listPrecios", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&control=2");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_tabla').innerHTML = ajax.responseText

        }
    }

}


function addmedic(){

    if(document.getElementById("unfunc").value==""){
       alert("Debe Seleccionar la Unidad Funcional Asociada al Suministro, Verifique...");
    }else if(document.getElementById("txtcodmed").value==""){
       alert("Debe Seleccionar un Medicamento, Verifique...");
    }else if(document.getElementById("txtunid").value=="0,00"){
       alert("Debe Ingresar la Cantidad de Suministros, Verifique...");
    }else if(document.getElementById("txtusuario").value==""){
       alert("Debe Seleccionar un Prestador Para la Aplicacion del Medicamento, Verifique...");
    }else{


   if(document.getElementById("tfacind").checked==true){
        factind="Individual";
    }else{
        factind="Agrupada";
    }

    txtcodmed=document.getElementById("txtcodmed").value;
    txtdesmed=document.getElementById("txtdesmed").value;
    txtunid=document.getElementById("txtunid").value;
    txtval=document.getElementById("txtval").value;
    txtcmod=document.getElementById("txtcmod").value;
    txtcop=document.getElementById("txtcop").value;
    txtpcomp=document.getElementById("txtpcomp").value;
    txttot=document.getElementById("txttot").value;
    codpres=document.getElementById("txtusuario").value;
    poso=document.getElementById("poso").value;
    auto=document.getElementById("auto").value;
    unidFunc=document.getElementById("unfunc").value;
    idProc=document.getElementById("txtcodconsproc").value;

    agregar_medica(txtcodmed,txtdesmed,txtunid,txtval,txtcmod,txtcop,txtpcomp,txttot,codpres,poso,unidFunc,factind,idProc,auto);

    document.getElementById("txtcodmed").value="";
    document.getElementById("txtdesmed").value="";
    document.getElementById("txtunid").value="0,00";
    document.getElementById("txtval").value="0,00";
    document.getElementById("txtcmod").value="0,00";
    document.getElementById("txtcop").value="0,00";
    document.getElementById("txtpcomp").value="0,00";
    document.getElementById("txttot").value="0,00";
    document.getElementById("poso").value="";
    document.getElementById("auto").value="";


  }
}

function agregar_medica(txtcodmed,txtdesmed,txtunid,txtval,txtcmod,txtcop,txtpcomp,txttot,codpres,poso,unidFunc,factind,idProc,auto){

   var cont = document.getElementById("cont");
   var filas = document.getElementById("filas");
   cont.setAttribute("value", parseInt(cont.value,0)+1);
   var tabla = document.getElementById("contenido").tBodies[0];
   var fila = document.createElement("TR");
   fila.setAttribute("align","center");

   var celda2 = document.createElement("TD");
   var cod = document.createElement("INPUT");
   cod.setAttribute("type","text");
   cod.setAttribute("size","10");
   cod.setAttribute('style','font-size:7pt;' )
   cod.setAttribute("maxlength","18");
   cod.setAttribute("disabled","disabled");
   cod.setAttribute("value", txtcodmed);
   cod.setAttribute("name","codmed");
   cod.setAttribute("id","codmed" + cont.value);
   celda2.appendChild(cod);

   var celda3 = document.createElement("TD");
   var desp = document.createElement("INPUT");
   desp.setAttribute("type","text");
   desp.setAttribute("size","45");
   desp.setAttribute("maxlength","100");
   desp.setAttribute("disabled","disabled");
   desp.setAttribute('style','font-size:7pt;' )
   desp.setAttribute("value", txtdesmed);
   desp.setAttribute("name","desm");
   desp.setAttribute("id","desm" + cont.value);
   celda3.appendChild(desp);

   var celda6 = document.createElement("TD");
   var unidades = document.createElement("INPUT");
   unidades.setAttribute("type","text");
   unidades.setAttribute("size","3");
   unidades.setAttribute("disabled","disabled");
   unidades.setAttribute('style','font-size:7pt;' )
   unidades.setAttribute("value", txtunid);
   unidades.setAttribute("name","unidades");
   unidades.setAttribute("id","unidades" + cont.value);
   celda6.appendChild(unidades);

   var celda7 = document.createElement("TD");
   var valor = document.createElement("INPUT");
   valor.setAttribute("type","text");
   valor.setAttribute("size","12");
   valor.setAttribute('style','font-size:7pt;text-align: right')
   valor.setAttribute("disabled","disabled");
   valor.setAttribute("value", txtval);
   valor.setAttribute("name","valor");
   valor.setAttribute("id","valor" + cont.value);
   celda7.appendChild(valor);



   var celda9 = document.createElement("TD");
   var c_mod = document.createElement("INPUT");
   c_mod.setAttribute("type","text");
   c_mod.setAttribute("size","5");
   c_mod.setAttribute('style','font-size:7pt;text-align: right')
   c_mod.setAttribute("disabled","disabled");
   c_mod.setAttribute("value", txtcmod);
   c_mod.setAttribute("name","c_mod");
   c_mod.setAttribute("id","c_mod" + cont.value);
   celda9.appendChild(c_mod);



   var celda15 = document.createElement("TD");
   var cop = document.createElement("INPUT");
   cop.setAttribute("type","text");
   cop.setAttribute("size","5");
   cop.setAttribute('style','font-size:7pt;text-align: right')
   cop.setAttribute("disabled","disabled");
   cop.setAttribute("value", txtcop);
   cop.setAttribute("name","cop");
   cop.setAttribute("id","cop" + cont.value);
   celda15.appendChild(cop);



   var celda10 = document.createElement("TD");
   var porc = document.createElement("INPUT");
   porc.setAttribute("type","text");
   porc.setAttribute("size","8");
   porc.setAttribute('style','font-size:7pt;text-align: right')
   porc.setAttribute("disabled","disabled");
   porc.setAttribute("value", txtpcomp);
   porc.setAttribute("name","porc");
   porc.setAttribute("id","porc" + cont.value);
   celda10.appendChild(porc);


   var celda12 = document.createElement("TD");
   var tot = document.createElement("INPUT");
   tot.setAttribute("type","text");
   tot.setAttribute("size","12");
   tot.setAttribute('style','font-size:7pt;text-align: right')
   tot.setAttribute("disabled","disabled");
   tot.setAttribute("value", txttot);
   tot.setAttribute("name","tot");
   tot.setAttribute("id","tot" + cont.value);
   celda12.appendChild(tot);



   var celda14 = document.createElement("TD");
   var prest = document.createElement("INPUT");
   prest.setAttribute("type","text");
   prest.setAttribute("size","8");
   prest.setAttribute('style','font-size:7pt;')
   prest.setAttribute("disabled","disabled");
   prest.setAttribute("value", codpres);
   prest.setAttribute("name","prest");
   prest.setAttribute("id","prest" + cont.value);
   celda14.appendChild(prest);

      var celda13 = document.createElement("TD");
   var posol = document.createElement("INPUT");
   posol.setAttribute("type","text");
   posol.setAttribute("size","8");
   posol.setAttribute('style','font-size:7pt;')
   posol.setAttribute("disabled","disabled");
   posol.setAttribute("value", poso);
   posol.setAttribute("name","posol");
   posol.setAttribute("id","posol" + cont.value);
   celda13.appendChild(posol);



    var celda19 = document.createElement("TD");
   var autori = document.createElement("INPUT");
   autori.setAttribute("type","text");
   autori.setAttribute("size","8");
   autori.setAttribute('style','font-size:7pt;')
   autori.setAttribute("disabled","disabled");
   autori.setAttribute("value", auto);
   autori.setAttribute("name","autori");
   autori.setAttribute("id","autori" + cont.value);
   celda19.appendChild(autori);

    var celda17 = document.createElement("TD");
   var unidFun = document.createElement("INPUT");
   unidFun.setAttribute("type","text");
   unidFun.setAttribute("size","8");
   unidFun.setAttribute('style','font-size:7pt;')
   unidFun.setAttribute("disabled","disabled");
   unidFun.setAttribute("value", unidFunc);
   unidFun.setAttribute("name","unidFun");
   unidFun.setAttribute("id","unidFun" + cont.value);
   celda17.appendChild(unidFun);

   var celda18 = document.createElement("TD");
   var factin = document.createElement("INPUT");
   factin.setAttribute("type","text");
   factin.setAttribute("size","8");
   factin.setAttribute('style','font-size:7pt;')
   factin.setAttribute("disabled","disabled");
   factin.setAttribute("value", factind);
   factin.setAttribute("name","factin");
   factin.setAttribute("id","factin" + cont.value);
   celda18.appendChild(factin);

   var celda16 = document.createElement("TD");
   var idproc = document.createElement("INPUT");
   idproc.setAttribute("type","text");
   idproc.setAttribute("size","8");
   idproc.setAttribute('style','font-size:7pt')
   idproc.setAttribute("disabled","disabled");
   idproc.setAttribute("value", idProc);
   idproc.setAttribute("name","idproc");
   idproc.setAttribute("id","idproc" + cont.value);
   celda16.appendChild(idproc);

   var celda11 = document.createElement('TD');
   var boton = document.createElement('INPUT');
   boton.setAttribute('type','button');
   boton.setAttribute('value','X');
   boton.setAttribute('id','boton1' + cont.value);
   boton.setAttribute('name','boton1');
   boton.setAttribute('title','Quitar de la lista');
   boton.setAttribute('style','font-size:7pt; padding:2px 2px 2px 2px; margin; margin: 0px 4px 4px 0px;');
   boton.onclick=function(){
       borrarFila(this, this.id);
   }
   celda11.appendChild(boton);

    //fila.appendChild(celda1);
    fila.appendChild(celda2);
    fila.appendChild(celda3);
    fila.appendChild(celda6);
    fila.appendChild(celda7);
    fila.appendChild(celda9);
    fila.appendChild(celda15);
    fila.appendChild(celda10);
    fila.appendChild(celda12);
    fila.appendChild(celda14);
    fila.appendChild(celda13);
    fila.appendChild(celda19);
    fila.appendChild(celda17);
    fila.appendChild(celda18);
    fila.appendChild(celda16);
    fila.appendChild(celda11);
    tabla.appendChild(fila);

}

function guar_medic(){
       var num_elementos = document.getElementsByName("boton1").length;

      if(num_elementos=="0"){
         alert("No se Existe Ningun Medicamento a Grabar, Verifique...");
      }else{

       codpac= document.getElementById("txtcod").value;
       proc= document.getElementById("txtcodconsproc").value;
       dest= document.getElementById("dest").value;
       modu= document.getElementById("modu").value;
       plan= document.getElementById("txtnomplan").value.split("-");
       admin= document.getElementById("txtnomadm").value.split("-");
       codplan=plan[0];
       codadm=admin[0];
       fechaf= document.getElementById("fecha").value.split("/");
       fecha=fechaf[2]+"-"+fechaf[1]+"-"+fechaf[0];
       hora= document.getElementById("txthing").value+":"+document.getElementById("txtming").value+" "+document.getElementById("fhor").value;

     var medic="";
     for( contador=0; contador < num_elementos; contador++ ){
        codmed = document.getElementsByName("codmed")[contador].value;
        unidades = document.getElementsByName("unidades")[contador].value.replace(".","").replace(".","").replace(",",".");
        val = document.getElementsByName("valor")[contador].value.replace(".","").replace(".","").replace(",",".");
        cmod = document.getElementsByName("c_mod")[contador].value.replace(".","").replace(".","").replace(",",".");
        cop = document.getElementsByName("cop")[contador].value.replace(".","").replace(".","").replace(",",".");
        porc = document.getElementsByName("porc")[contador].value.replace(".","").replace(".","").replace(",",".");
        tot = document.getElementsByName("tot")[contador].value.replace(".","").replace(".","").replace(",",".");
        prest = document.getElementsByName("prest")[contador].value;
        posol = document.getElementsByName("posol")[contador].value;
        autori = document.getElementsByName("autori")[contador].value;
        unidFun = trimAll(document.getElementsByName("unidFun")[contador].value).split("-");
        factin = document.getElementsByName("factin")[contador].value;
        idproc = document.getElementsByName("idproc")[contador].value;

        medic += codmed + "//" + unidades + "//" + val+ "//" + cmod + "//" + cop + "//" + porc + "//" + tot + "//" + prest + "//" + posol + "//" + autori + "//" + unidFun[0] + "//" + factin + "//" + idproc +";";
      }

      variables="txtcod="+codpac+"&codplan="+codplan+"&codadm="+codadm+"&fecha="+fecha+"&medic="+medic+"&hora="+hora+"&proc="+proc+"&dest="+dest+"&modu="+modu;

      guardar('../guardarDatosMedica',variables,'guardar_medicamentos');

      }
}

function nuev_medic(){

  if( document.getElementById("txtcod").value==""){
        alert("Seleccione el Paciente al que se le Cargaran los Medicamentos");
    }else{
        document.getElementById('btn_guardar').setAttribute("style", "display:block;width: 60px;");
        document.getElementById('btn_nuevo').setAttribute("style", "display:none;width: 60px;");
        document.getElementById('btn_cancel').setAttribute("style", "display:block;width: 60px;");
        document.getElementById("txtcodconsproc").value="";
        document.getElementById("txtconsproc").value="";
        document.getElementById("unfunc").selectedIndex=0;
        document.getElementById("txtpres").value="";
        document.getElementById("txtusuario").value="";
        document.getElementById("txtcodmed").value="";
        document.getElementById("txtdesmed").value="";
        document.getElementById("txtunid").value="0,00";
        document.getElementById("txtval").value="0,00";
        document.getElementById("txtcmod").value="0,00";
        document.getElementById("txtcop").value="0,00";
        document.getElementById("txtpcomp").value="0,00";
        document.getElementById("txttot").value="0,00";
        document.getElementById("poso").value="";
        document.getElementById("auto").value="";

         document.getElementById("unfunc").disabled=false;
         document.getElementById("txtunid").disabled=false;
         document.getElementById("txtval").disabled=false;
         document.getElementById("txtcmod").disabled=false;
         document.getElementById("txtcop").disabled=false;
         document.getElementById("txtpcomp").disabled=false;
         document.getElementById("poso").disabled=false;
         document.getElementById("auto").disabled=false;
         document.getElementById("tfacind").disabled=false;
         document.getElementById("tfacagr").disabled=false;
         document.getElementById("fecha").disabled=false;
         document.getElementById("add_med").disabled=false;

         document.getElementById('btn_prest').setAttribute("href", "javascript:most_prestador()");
         document.getElementById('btn_medica').setAttribute("href", "javascript:most_PreciosMedicamentos();");

        document.getElementById("contenido").innerHTML="<tr align='center'>"
                          +"                                                                           <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 9px; ' > C&Oacute;DIGO</span> </td>"
                          +"                                                                           <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 9px; '> DESCRIPCI&Oacute;N</span> </td>"
                          +"                                                                            <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 9px; '> CANT. </span> </td>"
                          +"                                                                            <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 9px; '> VALOR UNT </span> </td>"
                          +"                                                                            <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 9px; '> C. MODER </span> </td>"
                          +"                                                                            <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 9px; '> COPAGO </span> </td>"
                          +"                                                                            <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 9px; '> PORCE. </span> </td>"
                          +"                                                                            <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 9px; '> VALOR TOTAL </span> </td>"
                          +"                                                                            <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 9px; '> PRESTADOR </span> </td>"
                          +"                                                                            <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 9px; '> POSOLOG&Iacute;A </span> </td>"
                          +"                                                                            <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 9px; '> No AUTO</span> </td>"
                          +"                                                                            <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 9px; '> U. FUNCIONAL</span> </td>"
                          +"                                                                            <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 9px; '> TIPO FACT.</span> </td>"
                          +"                                                                            <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 9px; '> ID. PROC</span> </td>"
                          +"                                                                            <td>&nbsp;</td>"
                          +"                                                                        </tr>";
    }

}


function cancel_medic(){
      document.getElementById('btn_guardar').setAttribute("style", "display:none;width: 60px;");
        document.getElementById('btn_nuevo').setAttribute("style", "display:block;width: 60px;");
        document.getElementById('btn_cancel').setAttribute("style", "display:none;width: 60px;");
        document.getElementById("txtcodconsproc").value="";
        document.getElementById("txtconsproc").value="";
        document.getElementById("unfunc").selectedIndex=0;
        document.getElementById("txtpres").value="";
        document.getElementById("txtusuario").value="";
        document.getElementById("txtcodmed").value="";
        document.getElementById("txtdesmed").value="";
        document.getElementById("txtunid").value="0,00";
        document.getElementById("txtval").value="0,00";
        document.getElementById("txtcmod").value="0,00";
        document.getElementById("txtcop").value="0,00";
        document.getElementById("txtpcomp").value="0,00";
        document.getElementById("txttot").value="0,00";
        document.getElementById("poso").value="";
        document.getElementById("auto").value="";
         document.getElementById("contenido").innerHTML="<tr align='center'>"
                          +"                                                                           <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 9px; ' > C&Oacute;DIGO</span> </td>"
                          +"                                                                           <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 9px; '> DESCRIPCI&Oacute;N</span> </td>"
                          +"                                                                            <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 9px; '> CANT. </span> </td>"
                          +"                                                                            <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 9px; '> VALOR UNT </span> </td>"
                          +"                                                                            <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 9px; '> C. MODER </span> </td>"
                          +"                                                                            <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 9px; '> COPAGO </span> </td>"
                          +"                                                                            <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 9px; '> PORCE. </span> </td>"
                          +"                                                                            <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 9px; '> VALOR TOTAL </span> </td>"
                          +"                                                                            <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 9px; '> PRESTADOR </span> </td>"
                          +"                                                                            <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 9px; '> POSOLOG&Iacute;A </span> </td>"
                          +"                                                                            <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 9px; '> No AUTO</span> </td>"
                          +"                                                                            <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 9px; '> U. FUNCIONAL</span> </td>"
                          +"                                                                            <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 9px; '> TIPO FACT.</span> </td>"
                          +"                                                                            <td style=' font: bold;  background:#b9d1ea;'> <span style=' text-shadow:none; font-size: 9px; '> ID. PROC</span> </td>"
                          +"                                                                            <td>&nbsp;</td>"
                          +"                                                                        </tr>";
}

function busProcConsUrg(value,ori){

    plan=  document.getElementById("txtnomplan").value;
    id_pac=  document.getElementById("txtcod").value;

    ajax = ObjetoAjax();
    ajax.open("POST", "../consProcedimientos", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("busq="+value+"&ori="+ori+"&plan="+plan+"&id_pac="+id_pac);
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {

            if(trimAll(ajax.responseText)=="noexite"){
                alert("El Procedimiento con el código ("+value+") no existe, Verifique...");
            }else{
            pproc=ajax.responseText.split("//");
            if(ori=="infserv"){
                document.getElementById("servsel").value=ori;
                document.getElementById("txtcodcons").value=pproc[0];
                document.getElementById("txtcons").value=pproc[1];
                document.getElementById("txtval").value=pproc[2];
                document.getElementById("txtcmod").value=pproc[3];
                document.getElementById("txttot").value=pproc[5];
            }else if(ori=="infservProc"){
                document.getElementById("servselproc").value=ori;
                document.getElementById("txtcodconsproc").value=pproc[0];
                document.getElementById("txtconsproc").value=pproc[1];
                document.getElementById("txtvalproc").value=pproc[2];
                document.getElementById("txtcmodproc").value=pproc[3];
                document.getElementById("txtcopproc").value=pproc[4];
                document.getElementById("txttotproc").value=pproc[5];
            }
          }
        }
    }
}

function modProcxDiag(){
    window.open("../relProcxDiag?ori=nor","modProcxDiag","width=800, height=750, scrollbars=YES, menubar=no, location=no, resizable=no");
}
function Add_proced2(){
    var control="1"
    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    var par_prc=valor.split(";;");

    var num_elementos2 = document.getElementsByName("boton1").length;
    if(num_elementos2>0){
        for( var contador2=0; contador2 < num_elementos2; contador2++ ){			//
           cod =document.getElementsByName("cod")[contador2].value;
            if(cod==par_prc[0]){
                control="0";
            }
        }
    }
    if(control=="1"){
        proc_asig2(par_prc[0],par_prc[1]);
    }else{
        alert("Este Procedimiento ya ha Sido Agregado, Verifique...");
    }
}


function proc_asig2(cod_p,desc){
    var cont = document.getElementById("cont");
    var filas = document.getElementById("filas");
    cont.setAttribute("value", parseInt(cont.value,0)+1);
    var tabla = document.getElementById("contenido").tBodies[0];
    var fila = document.createElement("TR");
    fila.setAttribute("align","center");

    var celda2 = document.createElement("TD");
    var cod = document.createElement("INPUT");
    cod.setAttribute("type","text");
    cod.setAttribute("size","18");
    cod.setAttribute('style','font-size:7pt;' )
    cod.setAttribute("title","Doble Click para seleccionar producto");
    cod.setAttribute("maxlength","18");
    cod.setAttribute("disabled","disabled");
    cod.setAttribute("value", cod_p);
    cod.setAttribute("name","cod");
    cod.setAttribute("id","cod" + cont.value);
    celda2.appendChild(cod);

    var celda3 = document.createElement("TD");
    var proc = document.createElement("INPUT");
    proc.setAttribute("type","text");
    proc.setAttribute("size","95");
    proc.setAttribute("maxlength","80");
    proc.setAttribute("disabled","disabled");
    proc.setAttribute('style','font-size:7pt;' )
    proc.setAttribute("value", desc);
    proc.setAttribute("name","des_prod");
    proc.setAttribute("id","des_prod" + cont.value);
    celda3.appendChild(proc);

    var celda11 = document.createElement('TD');
    var boton = document.createElement('INPUT');
    boton.setAttribute('type','button');
    boton.setAttribute('value','X');
    boton.setAttribute('id','boton1' + cont.value);
    boton.setAttribute('name','boton1');
    boton.setAttribute('title','Quitar de la lista');
    boton.setAttribute('style','font-size:7pt; padding:2px 2px 2px 2px; margin; margin: 0px 4px 4px 0px;' )
    boton.onclick=function(){
        borrarFila(this, this.id);
    }
    celda11.appendChild(boton);

    fila.appendChild(celda2);
    fila.appendChild(celda3);
    fila.appendChild(celda11);
    tabla.appendChild(fila);
}

function guar_ProcxDiag(){

    var val="";
    var codeq="";
    var cod="";
    var control="1";
    var proc="";
    var desp="";

    var num_elementos = document.getElementsByName("boton1").length;
    if(num_elementos!=0){
    for(contador=0; contador < num_elementos; contador++ ){			//
        val =document.getElementsByName("valor")[contador].value;
        if( val==""){
            control="0";
        }
    }

    if(control=="0"){
        alert("Faltan datos por llenar... Verifique.");
    }else{
        for( contador=0; contador < num_elementos; contador++ ){
        cod =document.getElementsByName("cod")[contador].value;
        desp =document.getElementsByName("des_prod")[contador].value;

        proc += cod  +"#" + desp +";";

        }
          opener.document.getElementById("proc").value = proc;
          self.close()

    }
    }
}

function guar_ProcxDiag(){

    var val="";
    var codeq="";
    var cod="";
    var control="1";
    var proc="";
    var desp="";

    var num_elementos = document.getElementsByName("boton1").length;
    if(num_elementos!=0){

        for( contador=0; contador < num_elementos; contador++ ){
        cod =document.getElementsByName("cod")[contador].value;
        desp =document.getElementsByName("des_prod")[contador].value;
        proc += cod  +"#" + desp +";";
       }
       opener.document.getElementById("proc").value = proc;
       self.close()
 }
}

function asigprcoc2(){

    proc=opener.document.getElementById("proc").value;

    if(proc!="0"){
        var par_vnivel=proc.split(";");
        tam=par_vnivel.length;
        for(var r = 0; r < tam-1; r++) {
            prc = par_vnivel[r].split("#");
            proc_asig2(prc[0],prc[1]);
        }
    }
}

function busDesDiag(id,ori){

    busq=  document.getElementById(id).value;
    ajax = ObjetoAjax();
    ajax.open("POST", "../verificar", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("value="+busq+"&ori=verf_diag&prog=urgencia");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            res = ajax.responseText
            if(res==0){
                alert("El Diagnostico ("+busq+") no se encuentra registrado, Verifique...");
                document.getElementById(id).value="";
                document.getElementById(id).focus();
            }else{
                if(ori=="urg_01"){
                    document.getElementById("txtdesdiagprinc").value=res;
                }else if(ori=="urg_02"){
                    document.getElementById("desccodDiag1").value=res;
                }else if(ori=="urg_03"){
                    document.getElementById("descodDiag2").value=res;
                }else if(ori=="urg_04"){
                    document.getElementById("descodDiag3").value=res;
                }else if(ori=="urg_05"){
                    document.getElementById("desdiagPpal").value=res;
                }else if(ori=="urg_06"){
                    document.getElementById("desDiagRela").value=res;
                }else if(ori=="urg_07"){
                    document.getElementById("descomplica").value=res;
                }else if(ori=="urg_08"){
                    document.getElementById("desdigSalid").value=res;
                }else if(ori=="urg_09"){
                    document.getElementById("desdigSalid1").value=res;
                }else if(ori=="urg_10"){
                    document.getElementById("desdigSalid2").value=res;
                }else if(ori=="urg_11"){
                    document.getElementById("desdigSalid3").value=res;
                }
            }
        }
    }

}

function busDesMuer(id){
    busq=  document.getElementById(id).value;
    ajax = ObjetoAjax();
    ajax.open("POST", "../verificar", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("value="+busq+"&ori=form_muert&prog=urgencia");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            res = ajax.responseText
            if(res==0){
                alert("La forma de muerte ("+busq+") no se encuentra registrada, Verifique...");
                document.getElementById(id).value="";
                document.getElementById(id).focus();
            }else{
                 document.getElementById("descauMuerte").value=res;

            }
        }
    }
}

function buscDesPrest(id){
  busq=  document.getElementById(id).value;
    ajax = ObjetoAjax();
    ajax.open("POST", "../verificar", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("value="+busq+"&ori=des_prest&prog=urgencia");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            res = ajax.responseText
            if(res==0){
                alert("El prestador con esta identificación ("+busq+") no se encuentra registrado, Verifique...");
                document.getElementById(id).value="";
                document.getElementById(id).focus();
            }else{
                 document.getElementById("txtpres").value=res;

            }
        }
    }
}


function busDesEsp(id){
  busq=  document.getElementById(id).value;
    ajax = ObjetoAjax();
    ajax.open("POST", "../verificar", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("value="+busq+"&ori=des_espet&prog=prog");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            res = ajax.responseText
            if(res==0){
                alert("Este código de especialidad no esta Registrado, Verifique...");
                document.getElementById(id).value="";
                document.getElementById(id).focus();
            }else{
                 document.getElementById("txtespdes").value=res;

            }
        }
    }
}

function AbrirRestArea(){
    window.open("../restrAreas?ori=nor","asig_ProcPlan","width=1100, height=750, scrollbars=YES, menubar=no, location=no, resizable=no");
}

function ActAddProc(id){
    if(document.getElementById(id).checked==false){
        document.getElementById('add_proc').disabled=true;
    }else{
        document.getElementById('add_proc').disabled=false;
    }
}

function ActAddmedica(id){
    if(document.getElementById(id).checked==false){
        document.getElementById('add_medi').disabled=true;
    }else{
        document.getElementById('add_medi').disabled=false;
    }
}


function ActAddprest(id){
    if(document.getElementById(id).checked==false){
        document.getElementById('add_prest').disabled=true;
    }else{
        document.getElementById('add_prest').disabled=false;
    }
}

function guar_restAreas(){

    var cod="";
    var proc="";
    var medi="";
    var pres="";
    var desp="";
    var rtpro="n";
    var rtmed="n";
    var rtpre="n";

    if(document.getElementById("restproc").checked==true){
        rtpro="s";
    }

    if(document.getElementById("restmedica").checked==true){
        rtmed="s";
    }

    if(document.getElementById("restprest").checked==true){
        rtpre="s";
    }

   num_elementos = document.getElementsByName("boton1").length;
   if(num_elementos!=0){
        for( contador=0; contador < num_elementos; contador++ ){
        cod =document.getElementsByName("cod")[contador].value;
        desp =document.getElementsByName("des_prod")[contador].value;

        proc += cod  +"#" + desp +"//";
        }
      opener.document.getElementById("proc").value = rtpro+"--"+proc;
    }

    num_elementos = document.getElementsByName("boton2").length;
    if(num_elementos!=0){
        for( contador=0; contador < num_elementos; contador++ ){
        cod =document.getElementsByName("cod2")[contador].value;
        desp =document.getElementsByName("des_prod2")[contador].value;

        medi += cod  +"#" + desp +"//";
        }
      opener.document.getElementById("medica").value = rtmed+"--"+medi;
    }

    num_elementos = document.getElementsByName("boton3").length;
    if(num_elementos!=0){
        for( contador=0; contador < num_elementos; contador++ ){
        cod =document.getElementsByName("cod3")[contador].value;
        desp =document.getElementsByName("des_prod3")[contador].value;

        pres += cod  +"#" + desp +"//";
        }
      opener.document.getElementById("prest").value = rtpre+"--"+pres;
    }
}



 function asigRestAreas(){

       proc=opener.document.getElementById("proc").value;
    if(proc!="0"){
    par_proc=proc.split("--")
    if(par_proc[0]=="s"){
        document.getElementById('restproc').checked=true;
        var p_proc=par_proc[1].split("//");
        tam=p_proc.length;
        for(var r = 0; r < tam-1; r++) {
            prc = p_proc[r].split("#");
            proc_asigAreas(prc[0],prc[1]);
        }
         document.getElementById('add_proc').disabled=false;
    }


}

    medica=opener.document.getElementById("medica").value;

       if(medica!="0"){
    par_medica=medica.split("--")
    if(par_medica[0]=="s"){
        document.getElementById('restmedica').checked=true;
        var p_medica=par_medica[1].split("//");
        tam=p_medica.length;
        for(var r = 0; r < tam-1; r++) {
            prc = p_medica[r].split("#");
            proc_asigmedicaAreas(prc[0],prc[1]);
        }
        document.getElementById('add_medi').disabled=false;
    }
}


   prest=opener.document.getElementById("prest").value;
     if(prest!="0"){
    par_prest=prest.split("--")
    if(par_prest[0]=="s"){
        document.getElementById('restprest').checked=true;
        var p_prest=par_prest[1].split("//");
        tam=p_prest.length;
        for(var r = 0; r < tam-1; r++) {
            prc = p_prest[r].split("#");
            proc_asigprestAreas(prc[0],prc[1]);
        }
        document.getElementById('add_prest').disabled=false;
    }
}

}


function AbrirRestrPrest(){
    window.open("../restrPrest?ori=nor","restrPrest","width=1100, height=750, scrollbars=YES, menubar=no, location=no, resizable=no");
}

function guar_restPrest(){

    var cod="";
    var proc="";
    var medi="";
    var pres="";
    var rtarea="";

        var rtpro="n";
    var rtmed="n";
    var rtpre="n";

    if(document.getElementById("restproc").checked==true){
        rtpro="s";
    }

    if(document.getElementById("restmedica").checked==true){
        rtmed="s";
    }

    if(document.getElementById("restprest").checked==true){
        rtarea="s";
    }

   num_elementos = document.getElementsByName("boton1").length;
   if(num_elementos!=0){
        for( contador=0; contador < num_elementos; contador++ ){
        cod =document.getElementsByName("cod")[contador].value;
        desp =document.getElementsByName("des_prod")[contador].value;

        proc += cod  +"#" + desp +"//";
        }
      opener.document.getElementById("procPres").value =rtpro+"--"+proc;
    }

    num_elementos = document.getElementsByName("boton2").length;
    if(num_elementos!=0){
        for( contador=0; contador < num_elementos; contador++ ){
        cod =document.getElementsByName("cod2")[contador].value;
        desp =document.getElementsByName("des_prod2")[contador].value;

        medi += cod  +"#" + desp +"//";
        }
      opener.document.getElementById("medicaPres").value =rtmed+"--"+medi;
    }

    num_elementos = document.getElementsByName("boton3").length;
    if(num_elementos!=0){
        for( contador=0; contador < num_elementos; contador++ ){
        cod =document.getElementsByName("cod3")[contador].value;
        desp =document.getElementsByName("des_prod3")[contador].value;

        pres += cod  +"#" + desp +"//";
        }
      opener.document.getElementById("areaServ").value = rtarea+"--"+pres;
    }

}

 function asigRestPrest(){

    proc=opener.document.getElementById("procPres").value;
    if(proc!="0"){
        par_proc=proc.split("--")
        if(par_proc[0]=="s"){
            document.getElementById('restproc').checked=true;
            var p_proc=par_proc[1].split("//");
            tam=p_proc.length;
            for(var r = 0; r < tam-1; r++) {
                prc = p_proc[r].split("#");
                proc_asigAreas(prc[0],prc[1]);
            }
            document.getElementById('add_proc').disabled=false;
        }


    }

     medica=opener.document.getElementById("medicaPres").value;

       if(medica!="0"){
    par_medica=medica.split("--")
    if(par_medica[0]=="s"){
        document.getElementById('restmedica').checked=true;
        var p_medica=par_medica[1].split("//");
        tam=p_medica.length;
        for(var r = 0; r < tam-1; r++) {
            prc = p_medica[r].split("#");
            proc_asigmedicaAreas(prc[0],prc[1]);
        }
        document.getElementById('add_medi').disabled=false;
    }
}


   prest=opener.document.getElementById("areaServ").value;
     if(prest!="0"){
    par_prest=prest.split("--")
    if(par_prest[0]=="s"){
        document.getElementById('restprest').checked=true;
        var p_prest=par_prest[1].split("//");
        tam=p_prest.length;
        for(var r = 0; r < tam-1; r++) {
            prc = p_prest[r].split("#");
            proc_asigprestAreas(prc[0],prc[1]);
        }
        document.getElementById('add_prest').disabled=false;
    }
}


}

function most_especia(){
  cargarespec();
  document.getElementById('buscaespecia').style.visibility = 'visible';

}

function most_prestador(){
     cargPrestProc();
     document.getElementById('buscaprestadores').style.visibility = 'visible';
     if(document.getElementById("conte")!=null){
         document.getElementById("conte").style.visibility = 'hidden';
     }

     if(document.getElementById("add_med")!=null){
         document.getElementById("add_med").style.visibility = 'hidden';
     }

}


function most_camas(){
     cargCamas();
     document.getElementById('buscacamas').style.visibility = 'visible';
     document.getElementById("conte").style.visibility = 'hidden';

}
function most_proveedores(ori){
     cargProve();
     if(ori=="ordserv"){
         document.getElementById("conte").style.visibility = 'hidden';
     }else{

     }
     document.getElementById('buscaprove').style.visibility = 'visible';


}


function most_cuentas(){
    document.getElementById('buscacuentas').style.visibility = 'visible';
    cargarCuentas();
}

function selmodulos(ori){

    document.getElementById('selmodulos').style.visibility = 'visible';
    document.getElementById("conte").style.visibility = 'hidden';

    document.getElementById("ori").value = ori;

    cargarmodulos();
}

function most_PreciosMedicamentos(dest){
    document.getElementById('buscaMedicamentos').style.visibility = 'visible';
    document.getElementById("add_med").style.visibility = 'hidden';

    cargarPreciosMedicamentos();
}

function most_pacientes(or){
    carga_pacientes(or);
    document.getElementById('buscapacientes').style.visibility = 'visible';
    if(or=="oihos"){
       document.getElementById("conte").style.visibility = 'hidden';
    }

    if(or=="hosp"){
       document.getElementById("conte").style.visibility = 'hidden';
    }
    if(or=="urge"){
       document.getElementById("conte").style.visibility = 'hidden';
    }
if(or=="asigmed"){
       document.getElementById("add_med").style.visibility = 'hidden';
    }
    location.href="#buscapacientes";
}
////////////es
function Cerrarpopu(id){
    
    document.getElementById(id).style.visibility = 'hidden';
    document.getElementById('conte').style.visibility = 'visible';
}

function sel_modulo(){

    var num_elementos = document.getElementsByName("seleccion").length;

    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    pvalor=valor.split("//");
    ori=document.getElementById('ori').value;

    if(ori=="facind"){
        window.open("../facturacion?datos=no&origen=normal&modu="+pvalor[0]+"&tmodu="+pvalor[1],"ventana_factura_hosp","width=1200, height=580, scrollbars=YES, menubar=no, location=no, resizable=no");
    }else if(ori=="asigmed"){
      window.open("../asig_medicamento?datos=no&origen=no&modu="+pvalor[0]+"&tmodu="+pvalor[1]+"&dest=med_fact","ventana_asigmedica_fact","width=1050, height=580, scrollbars=YES, menubar=no, location=no, resizable=no");
    }else if(ori=="infServ"){
        document.location="../ges_infServFact?modu="+pvalor[0]+"&tmodu="+pvalor[1];
    }else if(ori=="OrdInt"){
        window.open("../ordenInterFact?datos=no&origen=normal&modu="+pvalor[0]+"&tmodu="+pvalor[1],"ventana_factura_fact","width=1200, height=580, scrollbars=YES, menubar=no, location=no, resizable=no");
    }

    Cerrarpopu('selmodulos');
    }

function car_AdmPlan(val){

   ajax = ObjetoAjax();
    ajax.open("POST", "../verificar", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("ori=carg_admPla&val="+val);
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('planAdm').innerHTML = ajax.responseText
        }
    }
}

function factAgrup(){
    window.open("../factAgrup?datos=no&origen=normal","ventana_factura_hosp","width=1025, height=580, scrollbars=YES, menubar=no, location=no, resizable=no");
}

function factCapa(){
    window.open("../factCapacitacion?datos=no&origen=normal","ventana_factura_capac","width=1025, height=580, scrollbars=YES, menubar=no, location=no, resizable=no");
}

function cargarAreas(){

    ajax = ObjetoAjax();
    ajax.open("POST", "../asig_areaModulos", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("nada=nada");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_tabla').innerHTML = ajax.responseText
        }
    }
}

function cargarespec(){
    ajax = ObjetoAjax();
    ajax.open("POST", "../busca_especialidad", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("");
    ajax.onreadystatechange=function() {
    if (ajax.readyState==4) {
         document.getElementById('td_tabla').innerHTML = ajax.responseText
        }
    }
}

function changemodulo(id){
    for(var i=1; i<=5; i++){
        document.getElementById("modulo"+i).style.display = 'none';
    }
    document.getElementById("modulo"+id).style.display = 'block';
}

function asiareaModulo(){

    mod1=document.getElementById("mod1").value;
    if(mod1!="0"){
        var par_mod1=mod1.split(";");
        tam=par_mod1.length;
        for(var r = 0; r < tam-1; r++) {
            pam = par_mod1[r].split("#");
           proc_asigAreasModulos(pam[0],pam[1],'1');
        }
    }


    mod2=document.getElementById("mod2").value;
    if(mod2!="0"){
        var par_mod2=mod2.split(";");
        tam=par_mod2.length;
        for(var r = 0; r < tam-1; r++) {
            pam = par_mod2[r].split("#");
           proc_asigAreasModulos(pam[0],pam[1],'2');
        }
    }

    mod3=document.getElementById("mod3").value;
    if(mod3!="0"){
        var par_mod3=mod3.split(";");
        tam=par_mod3.length;
        for(var r = 0; r < tam-1; r++) {
            pam = par_mod3[r].split("#");
           proc_asigAreasModulos(pam[0],pam[1],'3');
        }
    }

    mod4=document.getElementById("mod4").value;
    if(mod4!="0"){
        var par_mod4=mod4.split(";");
        tam=par_mod4.length;
        for(var r = 0; r < tam-1; r++) {
            pam = par_mod4[r].split("#");
           proc_asigAreasModulos(pam[0],pam[1],'4');
        }
    }


   mod5=document.getElementById("mod5").value;
    if(mod5!="0"){
        var par_mod5=mod5.split(";");
        tam=par_mod5.length;
        for(var r = 0; r < tam-1; r++) {
            pam = par_mod5[r].split("#");
           proc_asigAreasModulos(pam[0],pam[1],'5');
        }
    }

}

function cargarCuentas(){

    ajax = ObjetoAjax();
    ajax.open("POST", "../sel_cuenta", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("control=2");
    ajax.onreadystatechange=function() {
    if (ajax.readyState==4) {
         document.getElementById('td_tabla').innerHTML = ajax.responseText
        }
    }

}

function cargarmodulos(){

    ajax = ObjetoAjax();
    ajax.open("POST", "../sel_modulos", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("control=2");
    ajax.onreadystatechange=function() {
    if (ajax.readyState==4) {
         document.getElementById('td_modulos').innerHTML = ajax.responseText
        }
    }

}

function cargarPreciosMedicamentos(){
    ajax = ObjetoAjax();
    ajax.open("POST", "../most_listPrecios", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("");
    ajax.onreadystatechange=function() {
    if (ajax.readyState==4) {
         document.getElementById('td_Medicamentos').innerHTML = ajax.responseText
        }
    }
}

function AbrirRestrProc(){
   document.getElementById('restricciones').style.visibility = 'visible';
   document.getElementById('tabproc').style.visibility = 'hidden';
   activarest('1');
   cargPrestProc();
}

function cargAreaProc(){
    ajax = ObjetoAjax();
    ajax.open("POST", "../asig_areaModulos", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("nada=nada");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_tabla1').innerHTML = ajax.responseText
        }
    }

}

function cargPrestProc(){
    ajax = ObjetoAjax();
    ajax.open("POST", "../mostrar_prestadores", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("programa=hosp&control=rest");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_tabla2').innerHTML = ajax.responseText
        }
    }

}


function cargCamas(){
    cod_habit=document.getElementById("habit").value;
    ajax = ObjetoAjax();
    ajax.open("POST", "../most_camas", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("prog=hosp&cod_habit="+cod_habit);
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('tabla_camas').innerHTML = ajax.responseText
        }
    }

}


function cargProve(){

    ajax = ObjetoAjax();
    ajax.open("POST", "../most_ProvServ", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("prog=ambu");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_tabla2').innerHTML = ajax.responseText
        }
    }

}

function guarResProc(){

    var cod="";
    var proc="";
    var medi="";
    var pres="";
    var desp="";
    var rtpro="n";
    var rtmed="n";
    var rtpre="n";

    if(document.getElementById("restproc").checked==true){
        rtpro="s";
    }

    if(document.getElementById("restmedica").checked==true){
        rtmed="s";
    }


   num_elementos = document.getElementsByName("boton1").length;
   if(num_elementos!=0){
        for( contador=0; contador < num_elementos; contador++ ){
        cod =document.getElementsByName("cod")[contador].value;
        desp =document.getElementsByName("des_prod")[contador].value;
        proc += cod  +"#" + desp +"//";
        }
      document.getElementById("areasServ").value = rtpro+"--"+proc;
    }



    num_elementos = document.getElementsByName("boton2").length;
    if(num_elementos!=0){
        for( contador=0; contador < num_elementos; contador++ ){
        cod =document.getElementsByName("cod2")[contador].value;
        desp =document.getElementsByName("des_prod2")[contador].value;
        medi += cod  +"#" + desp +"//";
        }
      document.getElementById("prest").value = rtmed+"--"+medi;
    }
    alert("Restricciones asignadas correctamente.");

}

function asigRestProc(){

    proc=document.getElementById("areasServ").value;

   if(proc!="0"){
    par_proc=proc.split("--")
    if(par_proc[0]=="s"){
        document.getElementById('restproc').checked=true;
        var p_proc=par_proc[1].split("//");
        tam=p_proc.length;
        for(var r = 0; r < tam-1; r++) {
            prc = p_proc[r].split("#");
            proc_asigAreas(prc[0],prc[1]);
        }
         document.getElementById('add_proc').disabled=false;
    }
}

    medica=document.getElementById("prest").value;

       if(medica!="0"){
    par_medica=medica.split("--")
    if(par_medica[0]=="s"){
        document.getElementById('restmedica').checked=true;
        var p_medica=par_medica[1].split("//");
        tam=p_medica.length;
        for(var r = 0; r < tam-1; r++) {
            prc = p_medica[r].split("#");
            proc_asigmedicaAreas(prc[0],prc[1]);
        }
        document.getElementById('add_medi').disabled=false;
    }
}
}


function carga_pacientes(or){

    ajax = ObjetoAjax();
    ajax.open("POST", "../sel_paci_hospit", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("prog="+or);
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_tabla').innerHTML = ajax.responseText
        }
    }

}

function Busqueda_paci(){
    tip_bus=document.getElementById("t_bus").value;
    busq=  document.getElementById("busqueda").value;
//    prog=  document.getElementById("programa").value;
    ajax = ObjetoAjax();
    ajax.open("POST", "../sel_paci_hospit", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&prog="+prog+"&tcon=2&ori=norm");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_tabla').innerHTML = ajax.responseText
        }
    }
}

function sel_pacien_hospi(ori){

    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            valor = document.getElementsByName("seleccion")[contador].value;	//
    }


   ppaci=valor.split("//");

    if(ori=="dhospit"){
        ajax = ObjetoAjax();
        ajax.open("POST", "../cons_pacient", true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send("ident="+ppaci[1]);
        ajax.onreadystatechange=function() {
            if (ajax.readyState==4) {
                res = ajax.responseText;
                if(trimAll(res)=="no"){
                    alert("El Paciente no se encuentra activo, Verifique...");
                }else{
                    par_pac=res.split("//");
                    document.getElementById('id_pac').value=par_pac[0];
                    document.getElementById('txtcod').value=par_pac[1];
                    document.getElementById('txtnom').value=par_pac[2];
                    document.getElementById('txttusu').value=par_pac[3];
                    document.getElementById('txtniv').value=par_pac[4];
                    document.getElementById('txtreg').value=par_pac[14];

                       /////////////planes paciente

                    if(trimAll(par_pac[5])=="0"){
                        alert("El Papciente no Tiene Administradoras Asociadas, Desea Asociarselas ahora?");
                    }else if(trimAll(par_pac[5])=="1"){
                        p_res=par_pac[6].split("#/");
                        ffin=p_res[6].split("-");
                        fini=p_res[5].split("-");

                        if(parseInt(p_res[2])<0){
                            alert("El Contrato no ha Iniciado, La Fecha de Inicio del Contrato es "+fini[2]+"/"+fini[1]+"/"+fini[0]+", Verifique el Contrato");
                            document.getElementById("unfunc").focus();
                        }else if(parseInt(p_res[3])<0){
                            alert("El Contrato se Encuentra Vencido, La Fecha de Finalizacion del Contrato es "+ffin[2]+"/"+ffin[1]+"/"+ffin[0]+", Verifique el Contrato");
                            document.getElementById("unfunc").focus();
                        }else{
                            document.getElementById("txtnomadm").value=p_res[1];
                            document.getElementById("txtnomplan").value=p_res[0];
                            document.getElementById("txtregadmin").value=p_res[4];
                            document.getElementById("buscapacientes").style.visibility = 'hidden';
                            document.getElementById('conte').style.visibility = 'visible';
                            document.getElementById("busqueda").value="";
                            document.getElementById('td_tabla').innerHTML="";
                            document.getElementById('btn_nuevo').setAttribute("style", "display:block;width: 60px;");

                            document.getElementById('btn_guardar').setAttribute("style", "display:none;width: 60px;");
                        }
                    }else{
                       document.getElementById('td_planes').innerHTML =par_pac[5];
                       document.getElementById('conte').style.visibility = 'hidden';
                       document.getElementById('selPlanes').style.visibility = 'visible';
                    }

                }
            }
        }
    }else if(ori=="infservhosp"){
        ajax = ObjetoAjax();
        ajax.open("POST", "../cons_pacient", true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send("ident="+ppaci[1]);
        ajax.onreadystatechange=function() {
            if (ajax.readyState==4) {
                res = ajax.responseText;
                if(trimAll(res)=="no"){
                    alert("El Paciente no se encuentra activo, Verifique...");
                     Cerrarpopu('buscapacientes');
                }else{
                    par_pac=res.split("//");

                    document.getElementById('id_pac').value=par_pac[0];
                    document.getElementById('txtcod').value=par_pac[1];
                    document.getElementById('txtnom').value=par_pac[2];
                    document.getElementById('txttusu').value=par_pac[3];
                    document.getElementById('txtniv').value=par_pac[4];


                    if(trimAll(par_pac[5])=="0"){
                        alert("El Papciente no Tiene un Plan Asociado");
                    }else if(trimAll(par_pac[5])=="1"){
                        p_res=par_pac[6].split("#/");
                        ffin=p_res[6].split("-");
                        fini=p_res[5].split("-");

                        if(parseInt(p_res[2])<0){
                            alert("El Contrato no ha Iniciado, La Fecha de Inicio del Contrato es "+fini[2]+"/"+fini[1]+"/"+fini[0]+", Verifique el Contrato");
                            document.getElementById("unfunc").focus();
                            document.getElementById("buscapacientes").style.visibility = 'hidden';
                            Cerrarpopu('buscapacientes');

                        }else if(parseInt(p_res[3])<0){
                            alert("El Contrato se Encuentra Vencido, La Fecha de Finalizacion del Contrato es "+ffin[2]+"/"+ffin[1]+"/"+ffin[0]+", Verifique el Contrato");
                            document.getElementById("unfunc").focus();
                            document.getElementById("buscapacientes").style.visibility = 'hidden';
                            Cerrarpopu('buscapacientes');
                        }else{
                            document.getElementById("txtnomadm").value=p_res[1];
                            document.getElementById("txtnomplan").value=p_res[0];
                            document.getElementById("txtreg").value=p_res[4];
                            document.getElementById('contenido').innerHTML =p_res[7];
                            document.getElementById("unfunc").focus();
                            document.getElementById('btn_nuevo').setAttribute("style", "display:block;width: 60px;");
                            document.getElementById('btn_cancelar').setAttribute("style", "display:block;width: 60px;");
                            document.getElementById('btn_guardar').setAttribute("style", "display:none;");

                            if(p_res[8]=="s"){
                            document.getElementById('btn_facturar').setAttribute("style", "display:none;width: 60px;");
                            document.getElementById('btn_orden').setAttribute("style", "display:block;width: 60px;");
                             habtfact("s");
                            }else{
                            document.getElementById('btn_facturar').setAttribute("style", "display:block;width: 60px;");
                            document.getElementById('btn_orden').setAttribute("style", "display:none;width: 60px;");
                            habtfact("n");
                            }
                            document.getElementById("buscapacientes").style.visibility = 'hidden';
                            document.getElementById('conte').style.visibility = 'visible';
                            actserv();
                        }
                    }else{
                       document.getElementById('td_planes').innerHTML =par_pac[5];
                       document.getElementById("conte").style.visibility = 'hidden';
                       document.getElementById('selPlanes').style.visibility = 'visible';
                    }

                }
            }
        }
    }else if(ori=="pac"){
        var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            valor = document.getElementsByName("seleccion")[contador].value;	//
    }


   ppaci=valor.split("//");
   dest=document.getElementById('de').value
   document.location="../ges_pacientes?busq=B&pri=T&cod="+ppaci[1]+"&dest="+dest;


    }else if(ori=="asigMedic"){

        ajax = ObjetoAjax();
        ajax.open("POST", "../cons_pacient", true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send("ident="+ppaci[1]);
        ajax.onreadystatechange=function() {
            if (ajax.readyState==4) {
                res = ajax.responseText;
                if(trimAll(res)=="no"){
                    alert("El Paciente no se encuentra activo, Verifique...");
                }else{
                    par_pac=res.split("//");
                    document.getElementById('id_pac').value=par_pac[0];
                    document.getElementById('txtcod').value=par_pac[1];
                    document.getElementById('txtnom').value=par_pac[2];
                    document.getElementById('txttusu').value=par_pac[3];
                    document.getElementById('txtniv').value=par_pac[4];
                    document.getElementById('txtreg').value=par_pac[14];

                       /////////////planes paciente

                    if(trimAll(par_pac[5])=="0"){
                        alert("El Papciente no Tiene Administradoras Asociadas, Desea Asociarselas ahora?");
                    }else if(trimAll(par_pac[5])=="1"){
                        p_res=par_pac[6].split("#/");
                        ffin=p_res[6].split("-");
                        fini=p_res[5].split("-");

                        if(parseInt(p_res[2])<0){
                            alert("El Contrato no ha Iniciado, La Fecha de Inicio del Contrato es "+fini[2]+"/"+fini[1]+"/"+fini[0]+", Verifique el Contrato");
                            document.getElementById("unfunc").focus();
                        }else if(parseInt(p_res[3])<0){
                            alert("El Contrato se Encuentra Vencido, La Fecha de Finalizacion del Contrato es "+ffin[2]+"/"+ffin[1]+"/"+ffin[0]+", Verifique el Contrato");
                            document.getElementById("unfunc").focus();
                        }else{
                            document.getElementById("txtnomadm").value=p_res[1];
                            document.getElementById("txtnomplan").value=p_res[0];
                            document.getElementById("txtregadmin").value=p_res[4];
                            document.getElementById("buscapacientes").style.visibility = 'hidden';rips_consulta()
                            if(document.getElementById('conte')==true){
                                document.getElementById('conte').style.visibility = 'visible';
                            }

                            if(document.getElementById('add_med')==true){
                                document.getElementById('add_med').style.visibility = 'visible';
                            }

                            document.getElementById("busqueda").value="";
                            document.getElementById('td_tabla').innerHTML="";
                            document.getElementById('btn_nuevo').setAttribute("style", "display:block;width: 60px;");
                        }
                    }else{
                       document.getElementById('td_planes').innerHTML =par_pac[5];
                       document.getElementById('selPlanes').style.visibility = 'visible';
                    }

                }
            }
        }
    }else if(ori=="ordenInterHosp"){
        ajax = ObjetoAjax();
        ajax.open("POST", "../cons_pacient", true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send("ident="+ppaci[1]);
        ajax.onreadystatechange=function() {
            if (ajax.readyState==4) {
                res = ajax.responseText;
                if(trimAll(res)=="no"){
                    alert("El Paciente no se encuentra activo, Verifique...");
                    Cerrarpopu('buscapacientes');
                }else{
                    par_pac=res.split("//");

                    document.getElementById('id_pac').value=par_pac[0];
                    document.getElementById('txtcod').value=par_pac[1];
                    document.getElementById('txtnom').value=par_pac[2];
                    document.getElementById('txttusu').value=par_pac[3];
//                    document.getElementById('txtniv').value=par_pac[4];


                    if(trimAll(par_pac[5])=="0"){
                        alert("El Papciente no Tiene una Administradoras Asociada");
                    }else if(trimAll(par_pac[5])=="1"){
                        p_res=par_pac[6].split("#/");
                        ffin=p_res[6].split("-");
                        fini=p_res[5].split("-");

                        if(parseInt(p_res[2])<0){
                            alert("El Contrato no ha Iniciado, La Fecha de Inicio del Contrato es "+fini[2]+"/"+fini[1]+"/"+fini[0]+", Verifique el Contrato");
                            document.getElementById("unfunc").focus();
                            document.getElementById("buscapacientes").style.visibility = 'hidden';
                            Cerrarpopu('buscapacientes');

                        }else if(parseInt(p_res[3])<0){
                            alert("El Contrato se Encuentra Vencido, La Fecha de Finalizacion del Contrato es "+ffin[2]+"/"+ffin[1]+"/"+ffin[0]+", Verifique el Contrato");
                            document.getElementById("unfunc").focus();
                            document.getElementById("buscapacientes").style.visibility = 'hidden';
                            Cerrarpopu('buscapacientes');
                        }else{
                            document.getElementById("txtnomadm").value=p_res[1];
                            document.getElementById("txtnomplan").value=p_res[0];
                            document.getElementById("txtregadmin").value=p_res[4];
                            document.getElementById("unfunc").focus();
                            document.getElementById('btn_guardar').setAttribute("style", "display:block;width: 60px;");
                            document.getElementById("buscapacientes").style.visibility = 'hidden';
                            habil_campos();

                         }
                    }else{
                       document.getElementById('td_planes').innerHTML =par_pac[5];
                       document.getElementById('selPlanes').style.visibility = 'visible';
                    }
                }
            }
        }
    }else if(ori=="rips_cons"){

          ajax = ObjetoAjax();
        ajax.open("POST", "../cons_pacient", true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send("ident="+ppaci[1]);
        ajax.onreadystatechange=function() {
            if (ajax.readyState==4) {
                res = ajax.responseText;
                if(trimAll(res)=="no"){
                    alert("El Paciente no se encuentra activo, Verifique...");
                    Cerrarpopu('buscapacientes');
                }else{
                  par_pac=res.split("//");
                  document.getElementById('id_pac').value=par_pac[0];
                  document.getElementById('txtcod').value=par_pac[1];
                  document.getElementById('txtnom').value=par_pac[2];
                  document.getElementById('sex').value=par_pac[10];
                  document.getElementById('edad').value=par_pac[9];
                  if(par_pac[11]==0){
                  alert("El Paciente no tiene RIPS de Consultas Pendientes");
                  }else{
                      document.getElementById('consul').innerHTML=par_pac[11];
                  }

                  Cerrarpopu('buscapacientes');
                }
            }
        }
    }else if(ori=="rips_urg"){

        ajax = ObjetoAjax();
        ajax.open("POST", "../cons_pacient", true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send("ident="+ppaci[1]);
        ajax.onreadystatechange=function() {
            if (ajax.readyState==4) {
                res = ajax.responseText;
                if(trimAll(res)=="no"){
                    alert("El Paciente no se encuentra activo, Verifique...");
                    Cerrarpopu('buscapacientes');
                }else{

                  par_pac=res.split("//");
                  document.getElementById('id_pac').value=par_pac[0];
                  document.getElementById('txtcod').value=par_pac[1];
                  document.getElementById('txtnom').value=par_pac[2];
                  document.getElementById('sex').value=par_pac[10];
                  document.getElementById('edad').value=par_pac[9];

                  if(par_pac[11]==0){
                  alert("El Paciente no tiene RIPS de Urgencia Pendientes");
                  }else{

                  document.getElementById('consul').innerHTML=par_pac[11];
                  }
                   Cerrarpopu('buscapacientes');
                }
            }
        }
    }else if(ori=="rips_proce"){


         ajax = ObjetoAjax();
        ajax.open("POST", "../cons_pacient", true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send("ident="+ppaci[1]);
        ajax.onreadystatechange=function() {
            if (ajax.readyState==4) {
                res = ajax.responseText;
                if(trimAll(res)=="no"){
                    alert("El Paciente no se encuentra activo, Verifique...");
                    Cerrarpopu('buscapacientes');
                }else{
                  par_pac=res.split("//");
                  document.getElementById('id_pac').value=par_pac[0];
                  document.getElementById('txtcod').value=par_pac[1];
                  document.getElementById('txtnom').value=par_pac[2];
                  document.getElementById('sex').value=par_pac[10];
                  document.getElementById('edad').value=par_pac[9];
                  if(par_pac[12]==0){
                  alert("El Paciente no tiene RIPS de Procedimientos Pendientes");
                  }else{
                      document.getElementById('proce').innerHTML=par_pac[12];
                  }

                   Cerrarpopu('buscapacientes');
                }
            }
        }
    }else if(ori=="recaudo"){
     document.getElementById('id_pac').value=ppaci[0];
     document.getElementById('txtcod').value=ppaci[1];
     document.getElementById('txtnom').value=ppaci[2];
    }else if(ori=="edit_reg"){
     document.getElementById('id_pac').value=ppaci[0];
     document.getElementById('txtcod').value=ppaci[1];
     document.getElementById('txtnom').value=ppaci[2];
     document.getElementById('td_tabla').innerHTML="";
    }
  Cerrarpopu('buscapacientes');
}

function habil_campos(){

   document.getElementById("unfunc").disabled=false;
   document.getElementById("factual").disabled=false;
   document.getElementById("ffin").disabled=false;
   document.getElementById("fela").disabled=false;
   document.getElementById("fvenc").disabled=false;
   document.getElementById("txtpoliza").disabled=false;
   document.getElementById("btn_planPac").disabled=false;
   document.getElementById("cutM").disabled=false;
   document.getElementById("copag").disabled=false;
   document.getElementById("porc").disabled=false;
   document.getElementById("desc").disabled=false;

   if(document.getElementById("retenc")!=null){
       document.getElementById("retenc").disabled=false;
   }

   document.getElementById('btn_guardar').setAttribute("style", "display:block;width: 60px;");
   document.getElementById('btn_nuevo').setAttribute("style", "display:none;width: 60px;");
   document.getElementById('btn_cancel').setAttribute("style", "display:block;width: 60px;");
   document.getElementById('btn_imprimir').setAttribute("style", "display:none;width: 60px;");
   document.getElementById('btn_todos').setAttribute("style", "display:none;width: 60px;");


}

function desab_campos(){

   document.getElementById("unfunc").disabled=true;
   document.getElementById("factual").disabled=true;
   document.getElementById("ffin").disabled=true;
   document.getElementById("fela").disabled=true;
   document.getElementById("fvenc").disabled=true;
   document.getElementById("txtpoliza").disabled=true;
   document.getElementById("btn_planPac").disabled=true;
   document.getElementById("cutM").disabled=true;
   document.getElementById("copag").disabled=true;
   document.getElementById("porc").disabled=true;
   document.getElementById("desc").disabled=true;

   if(document.getElementById("retenc")!=null){
       document.getElementById("retenc").disabled=true;
   }

   document.getElementById('btn_guardar').setAttribute("style", "display:none;width: 60px;");
   document.getElementById('btn_nuevo').setAttribute("style", "display:none;width: 60px;");
   document.getElementById('btn_cancel').setAttribute("style", "display:none;width: 60px;");
   document.getElementById('btn_imprimir').setAttribute("style", "display:none;width: 60px;");
   document.getElementById('btn_todos').setAttribute("style", "display:block;width: 60px;");


}

function sel_cama(ori){

    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    p_valor=valor.split("//");

    if(ori=="dhospi"){
    document.getElementById("cod_cama").value=p_valor[0];
    document.getElementById("des_cama").value=p_valor[1];
    document.getElementById("buscacamas").style.visibility = 'hidden';
    document.getElementById('conte').style.visibility = 'visible';

    document.getElementById('tabla_camas').innerHTML="";
    }

}

function sel_prest_hospi(ori){

    var num_elementos = document.getElementsByName("seleccion3").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion3")[contador].checked == true)	//> se obtiene el value del check seleccionado
            valor = document.getElementsByName("seleccion3")[contador].value;	//
    }

    p_valor=valor.split(";;");

    if(ori=="dhospit"){
        document.getElementById("txtusuario").value=p_valor[0];
        document.getElementById("txtpres").value=p_valor[1];
        document.getElementById("buscaprestadores").style.visibility = 'hidden';
        if(document.getElementById('conte')!=null){
            document.getElementById('conte').style.visibility = 'visible';
        }
        document.getElementById('td_tabla2').innerHTML="";
    }else if(ori=="infservHosp"){
        document.getElementById("txtusuario").value=p_valor[0];
        document.getElementById("txtpres").value=p_valor[0]+"-"+p_valor[1];
        document.getElementById("buscaprestadores").style.visibility = 'hidden';
        if(document.getElementById('conte')!=null){
            document.getElementById('conte').style.visibility = 'visible';
        }

        if(document.getElementById('add_med')!=null){
            document.getElementById('add_med').style.visibility = 'visible';
        }

        document.getElementById('td_tabla2').innerHTML="";
    }else if(ori=="prest"){
       document.location="../ges_prestadores?busq=B&pri=T&cod="+p_valor[0];
    }

   Cerrarpopu('buscaprestadores');

}


function sel_diag_edit(){
    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    p_valor=valor.split("//");
    document.getElementById("txtdiag").value=p_valor[0];
    document.getElementById("txtdesdiag").value=p_valor[1];
    document.getElementById("buscadiagnostico").style.visibility = 'hidden';
    document.getElementById('tabla_diag').innerHTML="";
      Cerrarpopu('buscadiagnostico');
}


function sel_dx_ingre(){

    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    p_valor=valor.split("//");
    ori=document.getElementById("or_diag").value;

    if(ori=="dx_ingreso"){
    document.getElementById("dx_ingr").value=p_valor[0];
    document.getElementById("des_dx").value=p_valor[1];
    }else if(ori=="dia_1"){
        document.getElementById("digSalid").value=p_valor[0];
    document.getElementById("desdigSalid").value=p_valor[1];
    }else if(ori=="dia_2"){
        document.getElementById("digSalid1").value=p_valor[0];
    document.getElementById("desdigSalid1").value=p_valor[1];
    }else if(ori=="dia_3"){
        document.getElementById("digSalid2").value=p_valor[0];
    document.getElementById("desdigSalid2").value=p_valor[1];
    }else if(ori=="dia_4"){
        document.getElementById("digSalid3").value=p_valor[0];
    document.getElementById("desdigSalid3").value=p_valor[1];
    }else if(ori=="dia_pac"){
        document.getElementById("txtdiag").value=p_valor[0];
    document.getElementById("txtdesdiag").value=p_valor[1];
    }else if(ori=="dx_ingresourg"){
         document.getElementById("txtdiagprinc").value=p_valor[0];
    document.getElementById("txtdesdiagprinc").value=p_valor[1];
    }else if(ori=="dx_diag1"){
         document.getElementById("codDiag1").value=p_valor[0];
    document.getElementById("desccodDiag1").value=p_valor[1];
    }else if(ori=="dx_diag2"){
         document.getElementById("codDiag2").value=p_valor[0];
    document.getElementById("descodDiag2").value=p_valor[1];
    }else if(ori=="dx_diag3"){
         document.getElementById("codDiag3").value=p_valor[0];
    document.getElementById("descodDiag3").value=p_valor[1];
    }else if(ori=="forMuerte"){
    document.getElementById("cauMuerte").value=p_valor[0];
    document.getElementById("descauMuerte").value=p_valor[1];
    }else if(ori=="dx_ingreprinc"){
    document.getElementById("diagPpal").value=p_valor[0];
    document.getElementById("desdiagPpal").value=p_valor[1];
    }else if(ori=="dx_diarel"){
    document.getElementById("DiagRela").value=p_valor[0];
    document.getElementById("desDiagRela").value=p_valor[1];
    }else if(ori=="dx_diacomp"){
    document.getElementById("complica").value=p_valor[0];
    document.getElementById("descomplica").value=p_valor[1];
    }else if(ori=="muerte"){
    document.getElementById("caumuerte").value=p_valor[0];
    document.getElementById("dcaumuerte").value=p_valor[1];
    }else if(ori=="DiagRela"){
        document.getElementById("DiagRela").value=p_valor[0];
    document.getElementById("desDiagRela").value=p_valor[1];
    }

    document.getElementById("buscadiagnostico").style.visibility = 'hidden';
    document.getElementById('conte').style.visibility = 'visible';
    document.getElementById('tabla_diag').innerHTML="";


}

function carga_diagnosticos(ori){

    ajax = ObjetoAjax();
    ajax.open("POST", "../carga_diagnosticos", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("prog="+ori);
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('tabla_diag').innerHTML = ajax.responseText
        }
    }

}

function carg_estancia(ori){
    var plan="";
    var idPa="";
    if(ori=="dhosp"){
    plan=document.getElementById("txtnomplan").value;
    idPa=document.getElementById("txtcod").value;
    }
    ajax = ObjetoAjax();
    ajax.open("POST", "../most_estancias", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("prog="+ori+"&plan="+plan+"&id_pac="+idPa);
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('tabla_estancia').innerHTML = ajax.responseText
        }
    }

    document.getElementById('buscaestancia').style.visibility = 'visible';
    document.getElementById("conte").style.visibility = 'hidden';
}

function causa_ext(){

    ajax = ObjetoAjax();
    ajax.open("POST", "../verificar", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("ori=causa_ext&prog=hosp");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('cau_ext').innerHTML = ajax.responseText
        }
    }

}

function buscar_dx(ori){
  if(ori=="dia_pac"){
      document.getElementById("or_diag").value=ori;
  carga_diagnosticos("hosp");
  document.getElementById('buscadiagnostico').style.visibility = 'visible';
  document.getElementById('conte').style.visibility = 'hidden';
  }else if(ori=="edit_reg"){
   carga_diagnosticos(ori);
  document.getElementById('buscadiagnostico').style.visibility = 'visible';
  document.getElementById('conte').style.visibility = 'hidden';
  }else{
  if(document.getElementById('accion').value!="0"){
   document.getElementById("or_diag").value=ori;
  carga_diagnosticos(ori);
  document.getElementById('buscadiagnostico').style.visibility = 'visible';
  document.getElementById('conte').style.visibility = 'hidden';
  }
  }


}

function Busqueda_Diag2(){
     tip_bus=document.getElementById("t_bus_diag").value;
    busq=  document.getElementById("busqueda_diag").value;
    ajax = ObjetoAjax();
    ajax.open("POST", "../carga_diagnosticos", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&control=2&prog=hosp");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('tabla_diag').innerHTML = ajax.responseText
        }
    }
}

function nuev_datHospi(){
     document.getElementById('btn_guardar').setAttribute("style", "display:block;width: 60px;");
     document.getElementById('btn_nuevo').setAttribute("style", "display:none;width: 60px;");
     document.getElementById('btn_cancelar').setAttribute("style", "display:block;width: 60px;");
     document.getElementById('btn_prest').setAttribute("href", "javascript:most_prestador()");
     document.getElementById('btn_dx').setAttribute("href", "javascript:buscar_dx('dx_ingreso')");
     document.getElementById('btn_est').setAttribute("href", "javascript:carg_estancia('dhosp')");
     document.getElementById('btn_cama').setAttribute("href", "javascript:most_camas()");
     document.getElementById('diag_egre').setAttribute("href", "javascript:buscar_dx('dia_1')");
     document.getElementById('btn_digSalid1').setAttribute("href", "javascript:buscar_dx('dia_2')");
     document.getElementById('btn_digSalid2').setAttribute("href", "javascript:buscar_dx('dia_3')");
     document.getElementById('btn_digSalid3').setAttribute("href", "javascript:buscar_dx('dia_4')");
     document.getElementById('btn_muerte').setAttribute("href", "javascript:buscar_Diagnosticon('urge','9')");
     document.getElementById('ingreso').disabled=false;
     document.getElementById('fingre').disabled=false;
     document.getElementById('txthing').disabled=false;
     document.getElementById('txtming').disabled=false;
     document.getElementById('fhor').disabled=false;
     document.getElementById('aut').disabled=false;
     document.getElementById('cau_ext').disabled=false;
     document.getElementById('unfunc').disabled=false;
     document.getElementById('txtval').disabled=false;
     document.getElementById('txtporc').disabled=false;
     document.getElementById('txthegr').disabled=false;
     document.getElementById('txtmegr').disabled=false;
     document.getElementById('txtaut').disabled=false;
     document.getElementById('habit').disabled=false;
     document.getElementById('estSal').disabled=false;
     document.getElementById('fegre').disabled=false;
     document.getElementById('fhore').disabled=false;
     unidad_funcional();

}

function cancel_datHospi(){
     document.getElementById('btn_cancelar').setAttribute("style", "display:none;width: 60px;");
     document.getElementById('btn_guardar').setAttribute("style", "display:none;width: 60px;;");
     document.getElementById('btn_nuevo').setAttribute("style", "display:block;width: 60px;");
     document.getElementById('btn_prest').setAttribute("href", "#");
     document.getElementById('btn_dx').setAttribute("href", "#");
     document.getElementById('btn_est').setAttribute("href", "#");
     document.getElementById('btn_cama').setAttribute("href", "#");
     document.getElementById('diag_egre').setAttribute("href", "#");
     document.getElementById('btn_digSalid1').setAttribute("href", "#");
     document.getElementById('btn_digSalid2').setAttribute("href", "#");
     document.getElementById('btn_digSalid3').setAttribute("href", "#");
     document.getElementById('btn_muerte').setAttribute("href", "#");
     document.getElementById('ingreso').disabled=true;
     document.getElementById('fingre').disabled=true;
     document.getElementById('txthing').disabled=true;
     document.getElementById('txtming').disabled=true;
     document.getElementById('fhor').disabled=true;
     document.getElementById('aut').disabled=true;
     document.getElementById('cau_ext').disabled=true;
     document.getElementById('txthegr').disabled=true;
     document.getElementById('txtmegr').disabled=true;
     document.getElementById('unfunc').disabled=true;
     document.getElementById('txtval').disabled=true;
     document.getElementById('txtporc').disabled=true;
     document.getElementById('txtaut').disabled=true;
     document.getElementById('habit').disabled=true;
     document.getElementById('estSal').disabled=true;
     document.getElementById('fegre').disabled=true;
     document.getElementById('fhore').disabled=true;
}

function prest_infhosp(){
     act=document.getElementById('pres_ext').value;
   if(act=="0"){
    ajax = ObjetoAjax();
    ajax.open("POST", "../verificar", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("ori=prest_est&prog=hosp");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('presext').innerHTML = ajax.responseText;
        }
    }
   }
    document.getElementById('pres_ext').value="1";
}

function unidad_funcionalhosp(){
     act=document.getElementById('unfact').value;

   if(act=="0"){
    ajax = ObjetoAjax();
    ajax.open("POST", "../verificar", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("ori=unid_fun&prog=hosp");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('unfunc').innerHTML = ajax.responseText;
        }
    }
   }

    document.getElementById('unfact').value="1";
}

function unidad_funcional(){

    ajax = ObjetoAjax();
    ajax.open("POST", "../verificar", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("ori=unid_fun&prog=hosp");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('unfunc').innerHTML = ajax.responseText;
        }
    }
 }



 function guar_datHospi(){
     txtcod=document.getElementById('txtcod').value;
     txtnomadm=document.getElementById('txtnomadm').value.split("-");
     txtnomplan=document.getElementById('txtnomplan').value.split("-");
     codprest=document.getElementById('txtusuario').value;
     ingreso=document.getElementById('ingreso').value;
     ffingre=document.getElementById('fingre').value.split("/");
     fingre=ffingre[2]+"-"+ffingre[1]+"/"+ffingre[0]
     horingr=document.getElementById('txthing').value+":"+document.getElementById('txtming').value+" "+document.getElementById('fhor').value;
     aut=document.getElementById('aut').value;
     cau_ext=document.getElementById('cau_ext').value;
     dx_ingr=document.getElementById('dx_ingr').value;
     uniFunci=document.getElementById('unfunc').value;
     desta=document.getElementById('desta').value.split("-");
     id_est=desta[0]
     cod_tar=desta[1]
     txtval=document.getElementById('txtval').value.replace(".","").replace(".","").replace(",",".");
     txtporc=document.getElementById('txtporc').value.replace(".","").replace(".","").replace(",",".");
     txttest=document.getElementById('txttest').value.replace(".","").replace(".","").replace(",",".");
     txtdias=document.getElementById('txtdias').value;
     txtaut=document.getElementById('txtaut').value;
     habit=document.getElementById('habit').value;
     cod_cama=document.getElementById('cod_cama').value;
     digSalid=document.getElementById('digSalid').value;
     digSalid1=document.getElementById('digSalid1').value;
     digSalid2=document.getElementById('digSalid2').value;
     digSalid3=document.getElementById('digSalid3').value;
     cauMuerte=document.getElementById('cauMuerte').value;
     estSal=document.getElementById('estSal').value;
     ffegre=document.getElementById('fegre').value.split("/");
     fegre=ffegre[2]+"-"+ffegre[1]+"/"+ffegre[0]
     horegre=document.getElementById('txthegr').value+":"+document.getElementById('txtmegr').value+" "+document.getElementById('fhore').value;

     if(codprest==""){
         alert("Seleccione el Prestador");
     }else if(ingreso==""){
         alert("Seleccione el tipo de ingreso");
     }else if(document.getElementById('fingre').value==""){
         alert("Seleccione la fecha de ingreso");
     }else if(document.getElementById('fegre').value==""){
         alert("Seleccione la fecha de Egreso");
     }else if(cod_est==""){
         alert("Seleccione la estancia");
     }else{
         var variables = "txtcod=" + txtcod + "&txtnomadm=" + txtnomadm[0] + "&txtnomplan=" + txtnomplan[0]
        + "&codprest=" + codprest + "&ingreso=" + ingreso + "&fingre=" + fingre + "&horingr=" + horingr
        + "&aut=" + aut + "&cau_ext=" + cau_ext+ "&dx_ingr=" + dx_ingr + "&uniFunci=" + uniFunci
        + "&id_est=" + id_est + "&cod_tar=" + cod_tar + "&txtval=" + txtval+ "&txtporc=" + txtporc + "&txttest=" + txttest
        + "&txtaut=" + txtaut + "&habit=" + habit+ "&cod_cama=" + cod_cama + "&digSalid=" + digSalid
        + "&digSalid1=" + digSalid1 + "&digSalid2=" + digSalid2+ "&digSalid3=" + digSalid3 + "&cauMuerte=" + cauMuerte
        + "&estSal=" + estSal + "&fegre=" + fegre+ "&horegre=" + horegre+"&txtdias="+txtdias;

        guardar('../guardar_datoshospi',variables,'datoshospi');

     }

 }

function fec_estan(){

  if(document.getElementById('fegre').value!=""){


    f1=document.getElementById('fingre').value.split("/");
    f2=document.getElementById('fegre').value.split("/");

    fingre=new Date(f1[2]+"-"+f1[1]+"-"+f1[0].replace("-",",").replace("-",","));
    fegre=new Date(f2[2]+"-"+f2[1]+"-"+f2[0].replace("-",",").replace("-",","));
    var diasDif = fegre.getTime() - fingre.getTime();
    var dias = Math.round(diasDif/(1000 * 60 * 60 * 24));

    txtval=parseFloat(document.getElementById('txtval').value.replace(".","").replace(".","").replace(",","."));
    txtporc=parseFloat(document.getElementById('txtporc').value.replace(".","").replace(".","").replace(",","."));

    tota=txtval*dias;
    gtotal=tota-txtporc;

    rta=eval(gtotal.toFixed(2));

    res=rta.toString().split('.');
    if(res[1]== undefined) {
        res[1]='00';
    }
    if(res[1].length<2) {
        res[1]=res[1]+'0';
    }
    document.getElementById("txttest").value= moneda(res[0])+","+res[1];
    document.getElementById("txtdias").value= dias;
     }
}

function mostrar_proce(ori){

    var plan="";
    var idPa="";
    document.getElementById("infserv").value=ori;
    if(ori=="infservhospcons" || ori=="infservhospproc"){
    plan=document.getElementById("txtnomplan").value;
    idPa=document.getElementById("txtcod").value;
    }

    if(ori=="MostProcEdit"){
    plan=document.getElementById("txtnomplan").value;
    idPa=document.getElementById("txtcod").value;
    }
    ajax = ObjetoAjax();
    ajax.open("POST", "../most_procHosp", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("prog="+ori+"&plan="+plan+"&id_pac="+idPa);
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_procedimientos').innerHTML = ajax.responseText
        }
    }

    document.getElementById('buscaprocedimientos').style.visibility = 'visible';
    document.getElementById("conte").style.visibility = 'hidden';
}

 function formateafecha(fecha)
{
var longi = fecha.length;
var dia;
var mes;
var ano;
if ((longi>=2) && (primerslap==false)) {dia=fecha.substr(0,2);
if ((IsNumeric(dia)==true) && (dia<=31) && (dia!="00")) {fecha=fecha.substr(0,2)+"/"+fecha.substr(3,7);primerslap=true;}
else {fecha="";primerslap=false;}
}
else
{dia=fecha.substr(0,1);
if (IsNumeric(dia)==false)
{fecha="";}
if ((longi<=2) && (primerslap=true)) {fecha=fecha.substr(0,1);primerslap=false;}
}
if ((longi>=5) && (segundoslap==false))
{mes=fecha.substr(3,2);
if ((IsNumeric(mes)==true) &&(mes<=12) && (mes!="00")) {fecha=fecha.substr(0,5)+"/"+fecha.substr(6,4);segundoslap=true;}
else {fecha=fecha.substr(0,3);;segundoslap=false;}
}
else {if ((longi<=5) && (segundoslap=true)) {fecha=fecha.substr(0,4);segundoslap=false;}}
if (longi>=7)
{ano=fecha.substr(6,4);
if (IsNumeric(ano)==false) {fecha=fecha.substr(0,6);}
else {if (longi==10){if ((ano==0) || (ano<1900) || (ano>2100)) {fecha=fecha.substr(0,6);}}}
}
if (longi>=10)
{
fecha=fecha.substr(0,10);
dia=fecha.substr(0,2);
mes=fecha.substr(3,2);
ano=fecha.substr(6,4);
// Año no viciesto y es febrero y el dia es mayor a 28
if ( (ano%4 != 0) && (mes ==02) && (dia > 28) ) {fecha=fecha.substr(0,2)+"/";}
}
return (fecha);
}

function IsNumeric(valor)
{
var log=valor.length;var sw="S";
for (x=0; x<log; x++)
{v1=valor.substr(x,1);
v2 = parseInt(v1);
//Compruebo si es un valor numérico
if (isNaN(v2)) {sw= "N";}
}
if (sw=="S") {return true;} else {return false;}
}
var primerslap=false;
var segundoslap=false;

function fact_indHosp(){

    if(document.getElementById("id_pac").value==""){
        alert("No se a Cargado el Paciente, Verifique...");
        document.getElementById("id_pac").focus();

    }else{
        datos = document.getElementById("txtcod").value+"//"+document.getElementById("id_pac").value+"//"+document.getElementById("txtnom").value+"//"+document.getElementById("txttusu").value+"//"+document.getElementById("txtnomadm").value+"//"+document.getElementById("txtnomplan").value+"//"+document.getElementById("txtreg").value;
        window.open("../facturacion_hospi?datos="+datos+"&origen=ordeInt_serv","ventana_factura_urge","width=1200, height=580, scrollbars=YES, menubar=no, location=no, resizable=no");

    }
}

function fact_indAmbu(){

    if(document.getElementById("id_pac").value==""){
        alert("No se a Cargado el Paciente, Verifique...");
        document.getElementById("id_pac").focus();

    }else{
        datos = document.getElementById("txtcod").value+"//"+document.getElementById("id_pac").value+"//"+document.getElementById("txtnom").value+"//"+document.getElementById("txttusu").value+"//"+document.getElementById("txtnomadm").value+"//"+document.getElementById("txtnomplan").value+"//"+document.getElementById("txtreg").value;
        window.open("../facturacion_ambu?datos="+datos+"&origen=ordeInt_serv","ventana_factura_Ambu","width=1200, height=580, scrollbars=YES, menubar=no, location=no, resizable=no");

    }
}

function anulFactInd(){
    window.open("../mod_facturacion/anularFactInd.jsp","ventana_anularFact_indi","width=800, height=520, scrollbars=no, menubar=no, location=no, resizable=no");

}

function anulFactAgrup(){
    window.open("../mod_facturacion/anularFactAgrup.jsp","ventana_anularFact_agrup","width=800, height=520, scrollbars=no, menubar=no, location=no, resizable=no");

}

function anulOrdInt(){
    window.open("../mod_facturacion/anularordInt.jsp","ventana_anularOrdInt","width=800, height=520, scrollbars=no, menubar=no, location=no, resizable=no");
}


function asigproc(){
    cargarAsigProc("2");
    asigprocProg();
   des_prog=document.getElementById("txtdesc").value;
   document.getElementById('tit_prog').innerHTML="  <h1 style='font-size: 15px;'>ASIGNAR PROCEDIMIENTOS A  "+des_prog+"</h1>";
   document.getElementById('asigProce').style.visibility = 'visible';
    location.href="#asigProce";
}

function verproc(){
    cargarProceAsig("1");
    des_prog=document.getElementById("txtdesc").value;
   document.getElementById('tit_prog2').innerHTML="  <h1 style='font-size: 15px;'>PROCEDIMIENTOS ASIGNADOS A  "+des_prog+"</h1>";
   document.getElementById('verProce').style.visibility = 'visible';
    location.href="#verProce";
}

function cargarProceAsig(op){
    id_prog=document.getElementById("txtcod").value;
    ajax = ObjetoAjax();
    ajax.open("POST", "../procasig", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("op="+op+"&id_prog="+id_prog);
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_procasig').innerHTML = ajax.responseText
        }
    }
}

function cargarAsigProc(op){

    ajax = ObjetoAjax();
    ajax.open("POST", "../procasig", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("op="+op);
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_asigproc').innerHTML = ajax.responseText
        }
    }
}

function guar_procAsigProg(){

    var val="";
    var codprog=document.getElementById("txtcod").value;
    var cod="";
    var control="1";
    var proc="";
    var desp="";


    var num_elementos = document.getElementsByName("boton1").length;
    if(num_elementos!=0){
    for( contador=0; contador < num_elementos; contador++ ){
        cod =document.getElementsByName("cod")[contador].value;
         proc += codprog  +"#" + cod +"//";
        }
          document.getElementById("proc").value = proc;

        ajax = ObjetoAjax();
        ajax.open("POST", "../guar_todo", true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send("ori=guarProcProg&proc="+proc+"&codprog="+codprog);
        ajax.onreadystatechange=function() {
            if (ajax.readyState==4) {
                if(trimAll(ajax.responseText)=="bien"){
                   alert("Operacion Realizada Exitosamente.");
                }

            }
        }
   }else{
       document.getElementById("proc").value = "0";
    }
}

function buscar_programa(){
  cargarProgramas();
   document.getElementById('buscarprograma').style.visibility = 'visible';
  location.href="#buscarprograma";
}

function cargarProgramas(){

    ajax = ObjetoAjax();
    ajax.open("POST", "../most_programas", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("op=1");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_programa').innerHTML = ajax.responseText
        }
    }

}

function Busqueda_programa(){
    tip_bus=document.getElementById("t_bus_programa").value;
    busq=  document.getElementById("busqueda_programa").value;
    ajax = ObjetoAjax();
    ajax.open("POST", "../most_programas", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("tip_bus="+tip_bus+"&busq="+busq+"&control=2");
    ajax.onreadystatechange=function() {
          if (ajax.readyState==4) {
             document.getElementById('td_programa').innerHTML = ajax.responseText
            }
        }
}

function sel_programa(){
     var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
            var valor = document.getElementsByName("seleccion")[contador].value;	//
    }

    document.location="../ges_progPromyPrev?busq=B&pri=T&cod="+valor;
    Cerrarpopu('buscarprograma');

}

function sel_prog(){

    var num_elementos = document.getElementsByName("seleccion").length;
    for( var contador=0; contador < num_elementos; contador++ ){			//
        if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
          var valor = document.getElementsByName("seleccion")[contador].value;	//
    }
    infserv= document.getElementById("infserv").value;
    if(infserv=="infservhospcons"){
        document.getElementById("prog_relcosn").value=valor;
    }else{
        document.getElementById("prog_relproc").value=valor;
    }
    Cerrarpopu('selprog');
}

function rips_procedimiento(opc){
//    alert("entra");
   if(opc=="pyp"){
      cod_paci=document.getElementById("txtcod").value;
      if(cod_paci==""){
         alert("No se ha Cargado ningun paciente para Generar el RIPS, Verifique...");
      }else{
           tiprips=document.getElementById("tiprips").value;
//            alert(tiprips);
           if(tiprips=="1"){
                              window.open("../rips_consulta?copac="+cod_paci+"&ori=pyp","rips_consulta_pyp","width=1200, height=750, scrollbars=yes, menubar=no, location=no, resizable=no");
           }else{
               window.open("../rips_procepyp?copac="+cod_paci,"rips_procedimientos_pyp","width=1200, height=750, scrollbars=yes, menubar=no, location=no, resizable=no");
           }
      }
   }
}

function tiprips(opc){
  document.getElementById("tiprips").value=opc;
//  alert(document.getElementById("tiprips").value);
}

function ripsnacidos(){

    ajax = ObjetoAjax();
    ajax.open("POST", "../verificar", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("id_proc="+document.getElementById("proce").value+"&ori=nacidos");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            result = ajax.responseText;
        }
    }
  datos=document.getElementById("id_pac").value+"//"+document.getElementById("txtcod").value+"//"+document.getElementById("txtnom").value+"//"+document.getElementById("txtusuario").value+"//"+document.getElementById("txtpres").value+"//"+document.getElementById("proce").value+"//"+result;
  window.close();
  window.open("../mod_pyp/ripsnacidos.jsp?datos="+datos,"rips_nacidos","width=1000, height=750, scrollbars=yes, menubar=no, location=no, resizable=no");
}

function nuevo_ripsnacidos(){

if( document.getElementById("txtcod").value==""){
     alert("No se ha Cargado ningun paciente para Generar el RIPS, Verifique...");
}else{

    document.getElementById("t_parto").selectedIndex=0;
    document.getElementById("t_embara").selectedIndex=0;
    document.getElementById("sexo").selectedIndex=0;
    document.getElementById("c_pren").selectedIndex=0;

    document.getElementById("gest").value="";
    document.getElementById("peso").value="";
    document.getElementById("talla").value="";

    document.getElementById("fecha").disabled=false;
    document.getElementById("txtusuario").disabled=false;

    document.getElementById("t_parto").disabled=false;
    document.getElementById("t_embara").disabled=false;
    document.getElementById("sexo").disabled=false;
    document.getElementById("c_pren").disabled=false;

    document.getElementById("gest").disabled=false;
    document.getElementById("peso").disabled=false;
    document.getElementById("talla").disabled=false;

//    document.getElementById("diagPpal").disabled=false;
//    document.getElementById("diagPpal").value="";
//    document.getElementById("desdiagPpal").value="";
    document.getElementById("DiagRela").disabled=false;
    document.getElementById("DiagRela").value="";
    document.getElementById("desDiagRela").value="";
    document.getElementById("cauMuerte").disabled=true;
    document.getElementById("cauMuerte").value="";
    document.getElementById("descauMuerte").value="";

    document.getElementById("muerte").checked=false;
    document.getElementById("muerte").disabled=false;

    document.getElementById('btn_guardar').setAttribute("style", "display:block;width: 60px;");
    document.getElementById('btn_nuevo').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_calcel').setAttribute("style", "display:block;width: 60px;");
//
    document.getElementById('btn_prest').setAttribute("href", "javascript:most_prestador()");
//    document.getElementById('btn_diagPpal').setAttribute("href", "javascript:buscar_dx('dx_ingreprinc')");
    document.getElementById('btn_DiagRela').setAttribute("href", "javascript:buscar_dx('DiagRela')");

}
}

function habilit_muerte(){
    if(document.getElementById("muerte").checked==true){
         document.getElementById("fechamuer").disabled=false;
         document.getElementById("txthegr").disabled=false;
         document.getElementById("txtmegr").disabled=false;
         document.getElementById("fhormuer").disabled=false;
         document.getElementById("cauMuerte").disabled=false;
         document.getElementById('btn_forMuerte').setAttribute("href", "javascript:buscar_dx('forMuerte')");

    }else{
//         document.getElementById("fechamuer").value="";
         document.getElementById("txthegr").value="12";
         document.getElementById("txtmegr").value="00";
         document.getElementById("fhormuer").selectedIndex=0;
         document.getElementById("cauMuerte").value="";
         document.getElementById('btn_forMuerte').setAttribute("href", "#");

    }

}

function cancel_ripsnacidos(){

    document.getElementById("txtusuario").value="";
    document.getElementById("txtpres").value="";

    document.getElementById("t_parto").selectedIndex=0;
    document.getElementById("t_embara").selectedIndex=0;
    document.getElementById("sexo").selectedIndex=0;
    document.getElementById("c_pren").selectedIndex=0;

    document.getElementById("gest").value="";
    document.getElementById("peso").value="";
    document.getElementById("talla").value="";

    document.getElementById("fecha").disabled=true;
    document.getElementById("txtusuario").disabled=true;

    document.getElementById("t_parto").disabled=true;
    document.getElementById("t_embara").disabled=true;
    document.getElementById("sexo").disabled=true;
    document.getElementById("c_pren").disabled=true;

    document.getElementById("diagPpal").disabled=true;
    document.getElementById("diagPpal").value="";
    document.getElementById("desdiagPpal").value="";
    document.getElementById("DiagRela").disabled=true;
    document.getElementById("desDiagRela").value="";
    document.getElementById("caumuerte").disabled=true;
    document.getElementById("caumuerte").value="";
    document.getElementById("dcaumuerte").value="";

    document.getElementById("muerte").checked=false;

    document.getElementById('btn_guardar').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_nuevo').setAttribute("style", "display:block;width: 60px;");
    document.getElementById('btn_calcel').setAttribute("style", "display:none;width: 60px;");
//
    document.getElementById('btn_prest').setAttribute("href", "#");
    document.getElementById('btn_diagPpal').setAttribute("href", "#");
    document.getElementById('btn_DiagRela').setAttribute("href", "#");

}


function guar_ripsnacidos(ori){

    id_pacie=document.getElementById("txtcod").value;
    id_prest=document.getElementById("txtusuario").value;

    fecha=document.getElementById("fecha").value;
    hora=document.getElementById("txthing").value+":"+document.getElementById("txtming").value+" "+document.getElementById("fhor").value;
    t_parto=document.getElementById("t_parto").value;
    t_embara=document.getElementById("t_embara").value;
    sexo=document.getElementById("sexo").value;
    c_pren=document.getElementById("c_pren").value;

    gest=document.getElementById("gest").value;
    peso=document.getElementById("peso").value;
    talla=document.getElementById("talla").value;
    fechamuer=document.getElementById("fechamuer").value;
    var horamuert="";
    if(document.getElementById("muerte").checked==true){
        horamuert=document.getElementById("txthing").value+":"+document.getElementById("txtming").value+" "+document.getElementById("fhor").value;
    }

    proce=document.getElementById("diagPpal").value;
    DiagRela=document.getElementById("DiagRela").value;
    caumuerte=document.getElementById("cauMuerte").value;
    id_proc=document.getElementById("cod_proc").value;

    if(id_pacie==""){
        alert("Seleccione el Prestador");
        return;
    }else if(t_parto==""){
        alert("Seleccione el Tipo de Parto");
        return;
    }else if(t_embara==""){
        alert("Seleccione el Tipo de Embarazo");
        return;
    }else if(t_embara==""){
        alert("Seleccione el Sexo");
        return;
    }else if(t_embara==""){
        alert("Seleccione si estuvo en Control Prenatal");
        return;
    }else if(gest==""){
        alert("Digite la Gestacion");
        return;
    }else if(peso==""){
        alert("Digite el peso");
        return;
    }else if(talla==""){
        alert("Digite la Talla");
        return;
    }else if(DiagRela==""){
        alert("Seleccione el Diagnostico");
        return;
    }else{
        var variables = "id_pacie=" + id_pacie + "&id_prest=" + id_prest + "&fecha=" + fecha
        + "&hora=" + hora + "&t_parto=" + t_parto + "&t_embara=" + t_embara
        + "&sexo=" + sexo + "&c_pren=" + c_pren + "&gest=" + gest
        + "&peso=" + peso + "&talla=" + talla+ "&horamuert=" + horamuert + "&proce=" + proce+"&DiagRela="+DiagRela+"&caumuerte="+caumuerte+"&fechamuer="+fechamuer+"&ori="+ori+"&id_proc="+id_proc;

        guardar('../guardar_datosnacidos',variables,'nacidos');
    }
}

function rips_proced(){
     window.open("../rips_procepyp","rips_procedimientos_pyp","width=1000, height=750, scrollbars=yes, menubar=no, location=no, resizable=no");
}

function cancel_ripsconsulta(){

    document.getElementById("consul").disabled=true;
    document.getElementById("finCons").disabled=true;//Finalidad de consulta
    document.getElementById("diagPrinc").disabled=true;//Tipo Diagnostico Principal
    document.getElementById("cExter").disabled=true;//causa externa
    document.getElementById("tipcons").disabled=true;//tipo de consulta
    document.getElementById("txtdiagprinc").disabled=true;//Diagnostico Principal
    document.getElementById("codDiag1").disabled=true;//Codigo diag 1
    document.getElementById("codDiag2").disabled=true;//Codigo diag 2
    document.getElementById("codDiag3").disabled=true;//Codigo diag 3
    document.getElementById("txtusuario").disabled=true;//codigo prestador

     document.getElementById('btn_prest').setAttribute("href", "#");
    document.getElementById('btn_dx_ingresourg').setAttribute("href", "#");
    document.getElementById('btn_dx_diag1').setAttribute("href", "#");
    document.getElementById('btn_dx_diag2').setAttribute("href", "#");
    document.getElementById('btn_dx_diag3').setAttribute("href", "#");

    document.getElementById('btn_guardar').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_nuevo').setAttribute("style", "display:block;width: 60px;");
    document.getElementById('btn_cancelar').setAttribute("style", "display:none;width: 60px;");

}


function buscar_recaudos(){
  cargarRecaudos();
   document.getElementById('buscarecaudo').style.visibility = 'visible';
  location.href="#buscarecaudo";
}

function cargarRecaudos(){
    ajax = ObjetoAjax();
    ajax.open("POST", "../most_recaudos", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("op=1");
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
            document.getElementById('td_recaudos').innerHTML = ajax.responseText
        }
    }
}

function cambio_contra(){
     window.open("../mod_urgencia/cambio_contra.jsp","cambio_contraseña","width=400, height=430, scrollbars=yes, menubar=no, location=no, resizable=no");
}

function guardar_contra(){
   c_actual=document.getElementById("txtcactu").value;
   c_nueva=document.getElementById("txtcnuev").value;
   c_cnueva=document.getElementById("txtccnuev").value;
   usuario=document.getElementById("usuario").value;

    if(c_nueva!=c_cnueva){
     alert("Las contraseña no coinciden, Verifique...");
    }else{

    ajax = ObjetoAjax();
    ajax.open("POST", "../cambio_contra", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("c_actual="+c_actual+"&c_nueva="+c_nueva+"&usuario="+usuario);
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
           res= ajax.responseText

           if(res==1){
                alert("Operacion Realizada Exitosamente.");
           }else{
                alert("La contraseña actual no es correcta, Verifique...");
           }
        }
    }
    }
}

function del_opcRego(){

  document.getElementById("texfilDocu").value="";
  document.getElementById("txtdiag").value="";
  document.getElementById("txtdesdiag").value="";
  document.getElementById("txtnompla").value="";
  document.getElementById("txtplan").value="";
  document.getElementById("txtnom").value="";
  document.getElementById("prog").value="";

}

function ejecConsEdit(op){

    if (op=="edit"){
    f_ini= opener.document.getElementById("fini").value;
    f_fin= opener.document.getElementById("ffin").value;
    rips= opener.document.getElementById("rips").value;
    id_p= opener.document.getElementById("txtcod").value;
    id_Plan= opener.document.getElementById("txtplan").value;
    id_Diag= opener.document.getElementById("txtdiag").value;
    filpor= opener.document.getElementById("filpor").value;
    filNumDocu= opener.document.getElementById("texfilDocu").value;

    //  ---

    consul = opener.document.getElementById("consul").checked;
    proce = opener.document.getElementById("proce").checked;
    medi = opener.document.getElementById("medi").checked;
    hospi = opener.document.getElementById("hospi").checked;
    recien = opener.document.getElementById("recien").checked;
    urge = opener.document.getElementById("urge").checked;


    }else{
    f_ini= document.getElementById("fini").value;
    f_fin= document.getElementById("ffin").value;
    rips= document.getElementById("rips").value;
    id_p= document.getElementById("txtcod").value;
    id_Plan= document.getElementById("txtplan").value;
    id_Diag= document.getElementById("txtdiag").value;
    filpor= document.getElementById("filpor").value;
    filNumDocu= document.getElementById("texfilDocu").value;

    //  ---

    consul = document.getElementById("consul").checked;
    proce = document.getElementById("proce").checked;
    medi = document.getElementById("medi").checked;
    hospi = document.getElementById("hospi").checked;
    recien = document.getElementById("recien").checked;
    urge = document.getElementById("urge").checked;
    }

    ajax = ObjetoAjax();
    ajax.open("POST", "../consul_serv", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("f_ini="+f_ini+"&f_fin="+f_fin+"&rips="+rips+"&id_p="+id_p+"&id_Plan="+id_Plan+"&id_Diag="+id_Diag+"&filpor="+filpor
        +"&filNumDocu="+filNumDocu+"&consul="+consul+"&proce="+proce+"&medi="+medi+"&hospi="+hospi+"&recien="+recien+"&urge="+urge);
    ajax.onreadystatechange=function() {
        if (ajax.readyState==4) {
              if (op=="edit"){
                  opener.document.getElementById('resultado').innerHTML = ajax.responseText
              }else{
                  document.getElementById('resultado').innerHTML = ajax.responseText
              }

        }
    }
     if (op=="edit"){
        opener.document.getElementById('content').style.display = 'none';
        opener.document.getElementById('content2').style.display= 'block';
    }else{
        document.getElementById('content').style.display = 'none';
        document.getElementById('content2').style.display= 'block';

    }


}

function most_parametros(){

    document.getElementById('content').style.display = 'block';
    document.getElementById('content2').style.display= 'none';
    document.getElementById('resultado').innerHTML = "";
}

function eliminar_registro(){
   document.getElementById('razonAnul').style.visibility = 'visible';
   location.href="#razonAnul";
}


function aceptar_elimiarReg(){
    if (confirm("\xbfEsta seguro de realizar la operaci\xf3n?")){

        var num_elementos = document.getElementsByName("seleccion").length;
        for( var contador=0; contador < num_elementos; contador++ ){			//
            if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
                var valor = document.getElementsByName("seleccion")[contador].value;	//
        }

        pvalor=valor.split("//");

        ajax = ObjetoAjax();
        ajax.open("POST", "../eliminar_serv", true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send("id_serv="+pvalor[0]+"&tipo="+pvalor[1]);
        ajax.onreadystatechange=function() {
            if (ajax.readyState==4) {
                res = ajax.responseText;
                if(res==1){
                    alert("El Servicion N° "+pvalor[0]+" Fue Eliminado exitosamente");
                    Cerrarpopu('razonAnul');
                    ejecConsEdit('delete');
                }else{
                    alert("El Servicio N° "+pvalor[0]+" no se puede eliminar, ya ha sido Facturado");
                    Cerrarpopu('razonAnul');

                }
            }
        }
    }
}

function borra_para(op){
    if(op=="pac"){
         document.getElementById("txtcod").value="";
         document.getElementById("id_pac").value="";
         document.getElementById("txtnom").value="";

    }else if(op=="adm"){
        document.getElementById("txtplan").value="";
        document.getElementById("txtnompla").value="";

    }else{
      document.getElementById("txtdiag").value="";
      document.getElementById("txtdesdiag").value="";
    }
}

function editar_registro(){

      var num_elementos = document.getElementsByName("seleccion").length;
        for( var contador=0; contador < num_elementos; contador++ ){			//
            if(document.getElementsByName("seleccion")[contador].checked == true)	//> se obtiene el value del check seleccionado
                var valor = document.getElementsByName("seleccion")[contador].value;	//
        }

        pvalor=valor.split("//");

        if(pvalor[1]=="C"){
          window.open("../editar_consulta?id_serv="+pvalor[0],"Editar RIPS consulta","width=1000, height=750, scrollbars=yes, menubar=no, location=no, resizable=no");
        }else if(pvalor[1]=="P"){

        }else if(pvalor[1]=="M"){

        }else if(pvalor[1]=="E"){

        }else if(pvalor[1]=="R"){

        }else if(pvalor[1]=="U"){

        }
}

function edit_consulta(){

    document.getElementById("finCons").disabled=false;
    document.getElementById("cExter").disabled=false;
    document.getElementById("diagPrinc").disabled=false;
    document.getElementById("txtdiagprinc").disabled=false;
    document.getElementById("codDiag1").disabled=false;
    document.getElementById("codDiag2").disabled=false;
    document.getElementById("codDiag3").disabled=false;
    document.getElementById("modulo").disabled=false;

    if(document.getElementById("facaso").value==""){
        document.getElementById("txtcodconsproc").disabled=false;
        document.getElementById("cExter").disabled=false;
        document.getElementById("diagPrinc").disabled=false;
        document.getElementById('btn_codpro').setAttribute("href", "javascript:mostrar_proce('MostProcEdit')");

        document.getElementById("fecha").disabled=false;
        document.getElementById("auto").disabled=false;
        document.getElementById("txtval").disabled=false;
        document.getElementById("txtporcproc").disabled=false;
        document.getElementById("txtcmod").disabled=false;
        document.getElementById("indproc").disabled=false;
        document.getElementById("agrproc").disabled=false;

    }

    document.getElementById('btn_dx_ingresourg').setAttribute("href", "javascript:buscar_dx('dx_ingresourg')");
    document.getElementById('btn_dx_diag1').setAttribute("href", "javascript:buscar_dx('dx_diag1')");
    document.getElementById('btn_dx_diag2').setAttribute("href", "javascript:buscar_dx('dx_diag2')");
    document.getElementById('btn_dx_diag3').setAttribute("href", "javascript:buscar_dx('dx_diag3')");

    document.getElementById('btn_cancelar').setAttribute("style", "display:block;width: 60px;");
    document.getElementById('btn_guardar').setAttribute("style", "display:block;width: 60px;");
    document.getElementById('btn_nuevo').setAttribute("style", "display:none;width: 60px;");
}

function cancelar_ediConsult(){

    document.getElementById("finCons").disabled=true;
    document.getElementById("cExter").disabled=true;
    document.getElementById("diagPrinc").disabled=true;
    document.getElementById("txtdiagprinc").disabled=true;
    document.getElementById("codDiag1").disabled=true;
    document.getElementById("codDiag2").disabled=true;
    document.getElementById("codDiag3").disabled=true;
    document.getElementById("modulo").disabled=true;
    document.getElementById("txtcodconsproc").disabled=true;
    document.getElementById('btn_codpro').setAttribute("href", "#");

   document.getElementById("indproc").disabled=true;
        document.getElementById("agrproc").disabled=true;
    document.getElementById("fecha").disabled=true;
    document.getElementById("auto").disabled=true;
    document.getElementById("txtval").disabled=true;
    document.getElementById("txtporcproc").disabled=true;
    document.getElementById("txtcmod").disabled=true;

    document.getElementById('btn_dx_ingresourg').setAttribute("href", "#");
    document.getElementById('btn_dx_diag1').setAttribute("href", "#");
    document.getElementById('btn_dx_diag2').setAttribute("href", "#");
    document.getElementById('btn_dx_diag3').setAttribute("href", "#");

    document.getElementById('btn_cancelar').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_guardar').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_nuevo').setAttribute("style", "display:block;width: 60px;");

}

function guar_editConsul(){

var fecha=""
var auto=""
var txtval=""
var txtporcproc=""
var txtcmod=""
var txttot=""
var facind=""

  if(document.getElementById("facaso").value==""){
        fecha=document.getElementById("fecha").value;
        auto=document.getElementById("auto").value;
        txtval=document.getElementById("txtval").value.replace(".","").replace(".","").replace(",",".");
        txtporcproc=document.getElementById("txtporcproc").value.replace(".","").replace(".","").replace(",",".");
        txtcmod=document.getElementById("txtcmod").value.replace(".","").replace(".","").replace(",",".");
        txttot=document.getElementById("txttot").value.replace(".","").replace(".","").replace(",",".");
           if(document.getElementById("indproc").checked==true){
                facind="s";
            }else{
                facind="n";
            }


    }

    finCons=document.getElementById("finCons").value;
    cExter=document.getElementById("cExter").value;
    diagPrinc=document.getElementById("diagPrinc").value;
    txtdiagprinc=document.getElementById("txtdiagprinc").value;
    codDiag1=document.getElementById("codDiag1").value;
    codDiag2=document.getElementById("codDiag2").value;
    codDiag3=document.getElementById("codDiag3").value;
    modulo=document.getElementById("modulo").value;
    servsel=document.getElementById("servsel").value;
    id_serv=document.getElementById("id_serv").value;


  var variables = "fecha=" + fecha + "&auto=" + auto + "&txtval=" + txtval
        + "&txtporcproc=" + txtporcproc + "&txtcmod=" + txtcmod + "&txttot=" + txttot
        + "&finCons=" + finCons + "&cExter=" + cExter + "&diagPrinc=" + diagPrinc
        + "&txtdiagprinc=" + txtdiagprinc + "&codDiag1=" + codDiag1
        + "&codDiag2=" + codDiag2 + "&codDiag3=" + codDiag3+"&modulo="+modulo
        + "&servsel="+servsel+"&id_serv="+id_serv+"&facind="+facind;

        guardar('../edit_consulta',variables,'edit_consulta');
}

function busdesContra(val){

        pval=val.split("-");
        ajax = ObjetoAjax();
        ajax.open("POST", "../verificar", true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send("ori=bus_desadmin&cod_plan="+pval[0]);
        ajax.onreadystatechange=function() {
            if (ajax.readyState==4) {
                res = ajax.responseText.split("//");
                document.getElementById("nempresa").value=res[0];
                document.getElementById("ncontrato").value=res[1];
                document.getElementById("valcontra").value=res[2];
                document.getElementById("descrip").value=res[3];
            }
        }

}

function nuev_factCapitada(){
    document.getElementById("planAdm").disabled=false;
    document.getElementById("fini").disabled=false;
    document.getElementById("ffin").disabled=false;
    document.getElementById("fela").disabled=false;
    document.getElementById("fvenc").disabled=false;
    document.getElementById("unfunc").disabled=false;
    document.getElementById("descrip").disabled=false;

    document.getElementById('btn_cancel').setAttribute("style", "display:block;width: 60px;");
    document.getElementById('btn_guardar').setAttribute("style", "display:block;width: 60px;");
    document.getElementById('btn_nuevo').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_todos').setAttribute("style", "display:none;width: 60px;");

}

function calcel_factCapitada(){

    document.getElementById("planAdm").disabled=true;
    document.getElementById("fini").disabled=true;
    document.getElementById("ffin").disabled=true;
    document.getElementById("fela").disabled=true;
    document.getElementById("fvenc").disabled=true;
    document.getElementById("unfunc").disabled=true;
    document.getElementById("descrip").disabled=true;

    document.getElementById('btn_cancel').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_guardar').setAttribute("style", "display:none;width: 60px;");
    document.getElementById('btn_nuevo').setAttribute("style", "display:block;width: 60px;");
    document.getElementById('btn_todos').setAttribute("style", "display:block;width: 60px;");

}