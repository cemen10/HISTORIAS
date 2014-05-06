$(document).ready(function() {  
    //////////////////VARIABLES GLOBALES///////////////////////////////////////////////////
    var id_paciente;
    var ident_paciente;
    var hi_ID_EPICRISIS;
    ////////////////////////////////////////////////////////////////////////////////////
    //////////////////////INICIALIZAR OBJETOS//////////////////////////////////////////////////////////////////////////
    $('#form_epicrisis').find('input, textarea, button, select').attr('disabled','disabled'); 
    $('#abrir_venpaci').attr('id','otro-id1');
    $("#txtprocequi").autoResize();
    $("#txtprocequi").css("height","20px");
    $("#txtdiagdefi").autoResize();
    $("#txtdiagdefi").css("height","20px");    
    $("#txttrata").autoResize();
    $("#txttrata").css("height","20px");  
    $("#txtordena").autoResize();
    $("#txtordena").css("height","20px");       
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////OPCIONES DE LAS PESTAÑAS///////////////////////////////////////////////////////////////////////
    //Default Action
    $(".tab_content").hide(); //Hide all content
    $("ul.tabs li:first").addClass("active").show(); //Activate first tab
    $(".tab_content:first").show(); //Show first tab content
    //On Click Event
    $("ul.tabs li").click(function() {
        $("ul.tabs li").removeClass("active"); //Remove any "active" class
        $(this).addClass("active"); //Add "active" class to selected tab
        $(".tab_content").hide(); //Hide all tab content
        var activeTab = $(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
        $(activeTab).fadeIn(); //Fade in the active content
        return false;
    });             
    $(".calen").kalendar({
        show_week_number: false,
        hover_full_week: false,
        week_start_on_monday: false,
        format: "%Y-%m-%d",
        show_year_control: true,
        start_year: 1980,
        stop_year: 2050,
        months_name: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        months_name: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
        days_name: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        short_days_name: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"]
    });    
    ////////////////boton abrir ventana pacientes///////////////////////
    $('#abrir_venpaci').live('click', function(){
        $("body").css("overflow", "hidden");
        $('#conte').css("display",'none');
        $('#busqueda_pacientes').fadeIn(500);
        $('#oscuro').css('visibility','visible');
        $('#txtbuspac').val("");
        $('#txtbuspac').focus();
        $('#zona_pacientes').html("");        
        var datos={
            auxiliar: "1"
        }
        $.ajax({
           type: 'POST',
           url: '../cargar_pacientes',
           data: datos,
           success: function(data){
               $('#zona_pacientes').show(1000).html(data);
           },
           error: function(error_messages){
            alert('HA OCURRIDO UN ERROR');
           }
        });        
    }); 
    //////////////////////////////////////////////////////////
    ///////////////////busqueda de pacientes//////////////////    
    $('#txtbuspac').live('keyup', function(e){
        e.preventDefault(e);        
        var combo=$('#combuspac').find(':selected').val();
        //var combuspac="";
        var tipo="";
        if(combo=="1"){
            combo="IDENTIFICACION";
        }
        if(combo=="2"){
            combo="NOMBRE";
        }
        if(combo=="3"){
            combo="HISTORIA";
        }        
        if($('#txtbuspac').val()==""){
            tipo="VACIA";
        }else{
            tipo="LLENA";
        }        
        
        var datos={
            auxiliar: "2",
            combuspac: combo,
            txtbuspac: $('#txtbuspac').val(),
            tipo: tipo
        }
        $.ajax({
            type: "POST",
            url: "../cargar_pacientes",
            data: datos,
            success: function(data){
                $('#zona_pacientes').show(100).html(data);
            },
            error: function(error_messages){
                alert('HA OCURRIDO UN ERROR');
            }
        });
    });     
    //////////////////////////////////////////////////////////
    //////////////SELECCIONAR PACIENTES/////////////////////
    $('#seleccionar_pacientes').live('click', function(){        
        var cad=$("input[name='seleccion']:checked").val();     
        if(cad){
            var cadena=cad.split(";");
            var opcion;
            var opcion2;
            $('#txtnumhis').val(cadena[0]);
            $('#txtdoc').val(cadena[1]);
            $('#txtnompac').val(cadena[2]);
            $('#txtedad').val(cadena[12]);        
            if(cadena[4]=='F'){
                opcion='1';
            } else{
                opcion='2';
            }
            $("#combosex option[value=" + opcion + "]").attr("selected",true); 
            $('#txttel').val(cadena[5]);
            $('#txtdir').val(cadena[6]);
            $('#txtmun').val(cadena[11]);
            if(cadena[7]=='1'){
                opcion2='1';
            }
            if(cadena[7]=='2'){
                opcion2='2';
            }
            if(cadena[7]=='3'){
                opcion2='3';
            }
            if(cadena[7]=='4'){
                opcion2='4';
            }
            if(cadena[7]=='5'){
                opcion2='5';
            }
            if(cadena[7]=='6'){
                opcion2='6';
            }
            $("#comgrupoetn option[value=" + opcion2 + "]").attr("selected",true); 
            $('#txtnomres').val(cadena[9]);
            $('#txttipodoc').val(cadena[13]);       
            /////////////GUARDAR VALORES EN LAS VARIABLES GLOBALES///////////////////
            id_paciente=cadena[14];
            ident_paciente=cadena[1];
            ////////////////////////////////////////////////////////////////////
            $('#conte').css("display",'block');
            $('#busqueda_pacientes').fadeOut(500);                
            $('#oscuro').css('visibility','hidden');
            $("body").css("overflow", "auto"); 
            $('#zona_pacientes').html("");           
        }
    });
    //////////////////////////////////////////////////////////
    ////////////////boton abrir ventana pacientes///////////////////////
    $('#cer_venpac').live('click', function(){
        $('#conte').css("display",'block');
        $('#busqueda_pacientes').fadeOut(500);
        $('#zona_pacientes').html("");
        $('#oscuro').css('visibility','hidden');
        $("body").css("overflow", "auto"); 
        $('#zona_pacientes').html("");
    });    
    //////////////////////////////////////////////////////////
    /////////////////////////OCULTA CUANDO SE DA CLICK FUERA DEL DIV/////////////////////////////////
    $('#busqueda_pacientes').live('mouseout',function(){ 
        $('#oscuro').live("click",function(){ 
            $('#oscuro').css('visibility','hidden');
            $('#busqueda_pacientes').fadeOut('slow'); 
            $('#conte').css("display",'block');
            $("body").css("overflow", "auto"); 
            $('#zona_pacientes').html("");
        });
        return false; // Para evitar el efecto de burbujeo                
    });        
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////BOTONES////////////////////////////////////////////////////////
    ////////////////////BTN_NUEVO//////////////////////////////////    
    $('#btn_nue').live('click', function(){
        $('#btn_mod').css('display','none');
        $('#btn_eli').css('display','none');
        $('#btn_bus').css('display','none');
        $('#btn_gua').css('display','block');
        $('#btn_nue').css('display','none');
        $('#form_epicrisis').find('input, textarea, button, select').attr('disabled',false); 
        $('#otro-id1').attr('id','abrir_venpaci');
        $('#txtdoc').focus();
        //$("#txttipodoc, #txtdoc, #txtnompac,#txtedad,#combosex,#txttel,#txtdir,#txtmun,#comgrupoetn,#txtnomres,#txtparent,#txtdirresp,#txtnumhis").attr('disabled', true);                   
        
    });
    //////////////////////////////////////////////////////////////
    ////////////////////BTN_CANCELAR//////////////////////////////////
    $('#btn_can').live('click', function(){
        setTimeout(function(){
            window.location.href = "../ges_epicrisis";								 							
	}, 300);        
    });    
    ///////////////////////////////////////////////////////////////////////////
    ////////////////////BTN_GUARDAR//////////////////////////////////
    $('#btn_gua').live('click', function(){
       setTimeout(function(){
           if($('#txtdoc').val() == ""){
               alert('Por Favor Seleccione El Paciente..');
               $('#txtdoc').focus();
               return;				
           }   
           if($('#combosering').val() == "0"){
               alert('Por Favor Seleccione El Servicio de Ingreso..');
               $('#combosering').focus();
               return;				
           } 
           if($('#txtfecha_ing').val() == ""){
               alert('Por Favor Seleccione La Fecha de Ingreso..');
               $('#txtfecha_ing').focus();
               return;				
           }   
           var datos={
                opcion: "guardar",                              
                hi_FECHA_INI_ATENC_EPICRISIS : $('#txtfecha_ing').val(),
                hi_SERV_INI_ATENC_EPICRISIS : $('#combosering').val(),
                hi_FECHA_FIN_ATENC_EPICRISIS : $('#txtfecha_egre').val(),
                hi_SERV_FIN_ATENC_EPICRISIS : $('#comboseregre').val(),
                hi_DIAG_DEF_EPICRISIS : $('#txtdiagdefi').val().toUpperCase(),
                hi_PROC_QUIR_EPICRISIS : $('#txtprocequi').val().toUpperCase(),
                hi_TRATAMIENTOS_EPICRISIS : $('#txttrata').val().toUpperCase(),
                hi_DETALLE_EPICRISIS : $('#txtordena').val().toUpperCase(),
                hi_ESTADO_EPICRISIS :  "ACTIVO",                
                id_paciente: id_paciente, 
                ident_paciente: ident_paciente    
           }
            $.ajax({
                type: "POST",
                url: "../gestionar_epicrisis",
                data: datos,
                success: function(data){
                    if(data==1){
                        alert('DATOS GUARDADOS DE MANERA EXITOSA...');
                        setTimeout(function(){
                            window.location.href = "../ges_epicrisis";		
                        },1000);                          
                    }                    
                },
                error: function(error_messages){
                    alert('HA OCURRIDO UN ERROR');
                }
            });                        
           
       }, 500);    
    });   
    ////////////////////BTN_BUSCAR//////////////////////////////////
    $('#btn_bus').live('click', function(){
        $('#conte').css("display",'none');
        $('#busqueda_epicrisis').fadeIn(500);
        $('#oscuro').css('visibility','visible');
        $('#txtbus').val("");       
        $("body").css("overflow", "hidden");
        $('#txtbus').focus(); 
        $('#zona_epicrisis').html("");
        $('#zona_epicrisis2').html("");
        $('#busqueda_epicrisis').css('height','360px');
    });      
    $('#cer_venepi').live('click', function(){
        $('#conte').css("display",'block');
        $('#busqueda_epicrisis').fadeOut(500);
        $('#oscuro').css('visibility','hidden');
        $("body").css("overflow", "auto");        
        $('#zona_epicrisis').html("");
        $('#zona_epicrisis2').html("");
        $('#area_fecha').css('display','none');
        $('#tablafecha').css('display','none');
        $('#tfec').val("");      
        $(":text").each(function(){	
            $($(this)).val('');
	});        
    });  
    $('#busqueda_epicrisis').live('mouseout',function(){ 
        $('#oscuro').live("click",function(){ 
            $('#conte').css("display",'block');
            $('#busqueda_epicrisis').fadeOut(500);
            $('#oscuro').css('visibility','hidden');
            $("body").css("overflow", "auto");        
            $('#zona_epicrisis').html("");
            $('#zona_epicrisis2').html("");
            $('#area_fecha').css('display','none');
            $('#tablafecha').css('display','none');
            $('#tfec').val("");      
            $(":text").each(function(){	
                $($(this)).val('');
            });  
        });
        return false; // Para evitar el efecto de burbujeo                
    });       
    $('#txtbus').live('keyup', function(e){
        e.preventDefault(e);     
        $('#zona_epicrisis2').html("");
        $('#busqueda_epicrisis').css('height','360px');
        
        var combo=$('#combus').find(':selected').val();
        $('#tfec').val("");
        $('#area_fecha').slideUp(200);
        $('#tablafecha').slideUp(200);
        if(combo=="1"){
            combo="IDENTIFICACION";
        }
        if(combo=="2"){
            combo="NOMBRE";
        }
        if(combo=="3"){
            combo="HISTORIA";
        }  
        var datos={
            combus: combo,
            txtbus: $('#txtbus').val(),
            auxiliar: "PACIENTES"
        }
        $.ajax({
            type: "POST",
            url: "../car_pac",
            data: datos,
            success: function(data){
                $('#zona_epicrisis').show(100).html(data);
            },
            error: function(error_messages){
                alert('HA OCURRIDO UN ERROR');
            }
        });
        
    });    
    $('.marcado').live('click', function(){  
        var ident = $(this).attr('ident'); 
        $('#tid').val(ident);
        $('#area_fecha').css('display','none');
        $('#tablafecha').css('display','none');
        $('#tfec').val("");
        $('#busqueda_epicrisis').css('height','600px');
        //////////////////////VARIABLES PARA LOS DATOS PERSONALES////////////////////
        var id_paci = $(this).attr('id_paciente');
        var ident_paci = $(this).attr('ident_paciente');
        var histor_paciente = $(this).attr('histor_paciente');
        var fnac_paciente = $(this).attr('fnac_paciente');
        var sexo_paciente = $(this).attr('sexo_paciente');
        var telres_paciente = $(this).attr('telres_paciente');
        var dirafi_paciente = $(this).attr('dirafi_paciente');
        var etnia_paciente = $(this).attr('etnia_paciente');
        var mun_paciente = $(this).attr('mun_paciente');
        var resp_paciente = $(this).attr('resp_paciente');
        var carnet_paciente = $(this).attr('carnet_paciente');
        var edad_actual = $(this).attr('edad_actual');
        var nomcompleto = $(this).attr('nomcompleto');
        var tipid_paciente = $(this).attr('tipid_paciente');    
                
        id_paciente=id_paci;
        ident_paciente=ident_paci;
        ///////////////////////DATOS DEL PACIENTE/////////////////////////////        
        $('#txtnumhis').val(histor_paciente);
        $('#txtdoc').val(ident_paci);
        $('#txtnompac').val(nomcompleto);
        $('#txtedad').val(edad_actual);           
        
        if(sexo_paciente=='F'){
            opcion='1';
        } else{
            opcion='2';
        }
        $("#combosex option[value=" + opcion + "]").attr("selected",true); 
        $('#txttel').val(telres_paciente);
        $('#txtdir').val(dirafi_paciente);
        $('#txtmun').val(mun_paciente);

        opcion2='0';
        if(etnia_paciente=='1'){
            opcion2='1';
        }
        if(etnia_paciente=='2'){
            opcion2='2';
        }
        if(etnia_paciente=='3'){
            opcion2='3';
        }
        if(etnia_paciente=='4'){
            opcion2='4';
        }
        if(etnia_paciente=='5'){
            opcion2='5';
        }
        if(etnia_paciente=='6'){
            opcion2='6';
        }

        $("#comgrupoetn option[value=" + opcion2 + "]").attr("selected",true); 
        $('#txtnomres').val(resp_paciente);
        $('#txttipodoc').val(tipid_paciente);       
        
        var datos={
            ident: ident,
            fecha: $('#tfec').val(),
            auxiliar: "EPICRISIS"
        }
        $.ajax({
            type: "POST",
            url: "../mostrar_epicrisis",
            data: datos,
            success: function(data){
                $('#zona_epicrisis2').show(100).html(data);
                $('#area_fecha').slideDown(500);
                $('#tablafecha').slideDown(500);               
            },
            error: function(error_messages){
                alert('HA OCURRIDO UN ERROR');
            }
        });            
    });      
    $('.marcado2').live('click', function(){     
        
        hi_ID_EPICRISIS=$(this).attr('hi_ID_EPICRISIS');
        
        var hi_FECHA_INI_ATENC_EPICRISIS = $(this).attr('hi_FECHA_INI_ATENC_EPICRISIS');
        if(hi_FECHA_INI_ATENC_EPICRISIS=="0001-01-01"){
            hi_FECHA_INI_ATENC_EPICRISIS="";
        }            
        $('#txtfecha_ing').val(hi_FECHA_INI_ATENC_EPICRISIS);
        
        var hi_SERV_INI_ATENC_EPICRISIS = $(this).attr('hi_SERV_INI_ATENC_EPICRISIS');
        $("#combosering option[value=" + hi_SERV_INI_ATENC_EPICRISIS + "]").attr("selected",true); 
        
        var hi_FECHA_FIN_ATENC_EPICRISIS = $(this).attr('hi_FECHA_FIN_ATENC_EPICRISIS');
        if(hi_FECHA_FIN_ATENC_EPICRISIS=="0001-01-01"){
            hi_FECHA_FIN_ATENC_EPICRISIS="";
        }           
        $('#txtfecha_egre').val(hi_FECHA_FIN_ATENC_EPICRISIS);
        
        var hi_SERV_FIN_ATENC_EPICRISIS = $(this).attr('hi_SERV_FIN_ATENC_EPICRISIS');
        $("#comboseregre option[value=" + hi_SERV_FIN_ATENC_EPICRISIS + "]").attr("selected",true); 

        $('#txtdiagdefi').val($(this).attr('hi_DIAG_DEF_EPICRISIS'));
        $('#txtprocequi').val($(this).attr('hi_PROC_QUIR_EPICRISIS'));
        $('#txttrata').val($(this).attr('hi_TRATAMIENTOS_EPICRISIS'));
        $('#txtordena').val($(this).attr('hi_DETALLE_EPICRISIS'));

                 
        $('#btn_mod').css('display','block');
        $('#btn_eli').css('display','block');
        $('#btn_bus').css('display','none');
        $('#btn_gua').css('display','none');
        $('#btn_nue').css('display','none');
        $('#form_epicrisis').find('input, textarea, button, select').attr('disabled',false); 
        //$('#otro-id1').attr('id','abrir_venpaci');
        $('#abrir_venpaci').attr('id','otro-id1');
        $("#txttipodoc, #txtdoc, #txtnompac,#txtedad,#combosex,#txttel,#txtdir,#txtmun,#comgrupoetn,#txtnomres,#txtparent,#txtdirresp,#txtnumhis").attr('disabled', true);                           
        
        $('#conte').css("display",'block');
        $('#busqueda_epicrisis').fadeOut(500);
        $('#oscuro').css('visibility','hidden');
        $("body").css("overflow", "auto");        
        $('#zona_epicrisis').html("");
        $('#zona_epicrisis2').html("");
        $('#area_fecha').css('display','none');
        $('#tablafecha').css('display','none');
        $('#tfec').val("");                      
    });  
    $('#buscafecha').live('click', function(){  
        $('#tid').val();
        var datos={
            ident: $('#tid').val(),
            fecha: $('#tfec').val(),
            auxiliar: "EPICRISIS"
        }
        $.ajax({
            type: "POST",
            url: "../mostrar_epicrisis",
            data: datos,
            success: function(data){
                $('#zona_epicrisis2').show(100).html(data);
                $('#area_fecha').slideDown(500);
                $('#tablafecha').slideDown(500);               
            },
            error: function(error_messages){
                alert('HA OCURRIDO UN ERROR');
            }
        });                    
    });    
    $('#btn_mod').live('click', function(){
       setTimeout(function(){
           if($('#txtdoc').val() == ""){
               alert('Por Favor Seleccione El Paciente..');
               $('#txtdoc').focus();
               return;				
           }   
           if($('#combosering').val() == "0"){
               alert('Por Favor Seleccione El Servicio de Ingreso..');
               $('#combosering').focus();
               return;				
           } 
           if($('#txtfecha_ing').val() == ""){
               alert('Por Favor Seleccione La Fecha de Ingreso..');
               $('#txtfecha_ing').focus();
               return;				
           }   
           var datos={
                opcion: "modificar",                                              
                hi_ID_EPICRISIS:hi_ID_EPICRISIS,
                hi_FECHA_INI_ATENC_EPICRISIS : $('#txtfecha_ing').val(),
                hi_SERV_INI_ATENC_EPICRISIS : $('#combosering').val(),
                hi_FECHA_FIN_ATENC_EPICRISIS : $('#txtfecha_egre').val(),
                hi_SERV_FIN_ATENC_EPICRISIS : $('#comboseregre').val(),
                hi_DIAG_DEF_EPICRISIS : $('#txtdiagdefi').val().toUpperCase(),
                hi_PROC_QUIR_EPICRISIS : $('#txtprocequi').val().toUpperCase(),
                hi_TRATAMIENTOS_EPICRISIS : $('#txttrata').val().toUpperCase(),
                hi_DETALLE_EPICRISIS : $('#txtordena').val().toUpperCase(),
                hi_ESTADO_EPICRISIS :  "ACTIVO",                
                id_paciente: id_paciente, 
                ident_paciente: ident_paciente    
           }
            $.ajax({
                type: "POST",
                url: "../gestionar_epicrisis",
                data: datos,
                success: function(data){
                    if(data==1){
                        alert('DATOS MODIFICADOS DE MANERA EXITOSA...');
                        setTimeout(function(){
                            window.location.href = "../ges_epicrisis";		
                        },1000);                          
                    }                    
                },
                error: function(error_messages){
                    alert('HA OCURRIDO UN ERROR');
                }
            });                        
           
       }, 500);    
    }); 
    $('#btn_eli').live('click', function(){
       setTimeout(function(){
           if($('#txtdoc').val() == ""){
               alert('Por Favor Seleccione El Paciente..');
               $('#txtdoc').focus();
               return;				
           }   
           if($('#combosering').val() == "0"){
               alert('Por Favor Seleccione El Servicio de Ingreso..');
               $('#combosering').focus();
               return;				
           } 
           if($('#txtfecha_ing').val() == ""){
               alert('Por Favor Seleccione La Fecha de Ingreso..');
               $('#txtfecha_ing').focus();
               return;				
           }   
           var datos={
                opcion: "eliminar",                                              
                hi_ID_EPICRISIS:hi_ID_EPICRISIS,
                hi_FECHA_INI_ATENC_EPICRISIS : $('#txtfecha_ing').val(),
                hi_SERV_INI_ATENC_EPICRISIS : $('#combosering').val(),
                hi_FECHA_FIN_ATENC_EPICRISIS : $('#txtfecha_egre').val(),
                hi_SERV_FIN_ATENC_EPICRISIS : $('#comboseregre').val(),
                hi_DIAG_DEF_EPICRISIS : $('#txtdiagdefi').val().toUpperCase(),
                hi_PROC_QUIR_EPICRISIS : $('#txtprocequi').val().toUpperCase(),
                hi_TRATAMIENTOS_EPICRISIS : $('#txttrata').val().toUpperCase(),
                hi_DETALLE_EPICRISIS : $('#txtordena').val().toUpperCase(),
                hi_ESTADO_EPICRISIS :  "INACTIVO",                
                id_paciente: id_paciente, 
                ident_paciente: ident_paciente    
           }
            $.ajax({
                type: "POST",
                url: "../gestionar_epicrisis",
                data: datos,
                success: function(data){
                    if(data==1){
                        alert('DATOS ELIMINADOS DE MANERA EXITOSA...');
                        setTimeout(function(){
                            window.location.href = "../ges_epicrisis";		
                        },1000);                          
                    }                    
                },
                error: function(error_messages){
                    alert('HA OCURRIDO UN ERROR');
                }
            });                        
           
       }, 500);    
    });     
});
function cambiacolor_over(id){
    document.getElementById(id).style.backgroundColor="#E2F0FD";    
}
function cambiacolor_out(id){
    id2=id.substring(1);
    if(document.getElementById("check"+id2).checked!=true){
        document.getElementById(id).style.backgroundColor="#ffffff";
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
function cambiacolor_out1(id){
    id2=id.substring(2);

    if(document.getElementById("ch"+id2).checked!=true){
        document.getElementById(id).style.backgroundColor="#ffffff";
    }
         
}
function sel_fila1(id){
    id2=id.substring(2);
    document.getElementById("ch"+id2).checked=true;
    var num_elementos = document.getElementsByName("sele").length;
    for( var contador=1; contador <= num_elementos; contador++ ){			//
        if(document.getElementById("ch"+contador).checked == true){	//> se obtiene el value del check seleccionado
            document.getElementById("ff"+contador).style.backgroundColor="#E2F0FD";           
        }else{
            document.getElementById("ff"+contador).style.backgroundColor="#ffffff";
        }
    }
}
function cambiacolor_over1(id){
    document.getElementById(id).style.backgroundColor="#E2F0FD";    
}