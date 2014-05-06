$(document).ready(function() {   
    //////////////////VARIABLES GLOBALES///////////////////////////////////////////////////
    var id_paciente;
    var ident_paciente;
    var hi_ID_EPI_ATEN;
    var numdiag=1;
    ////////////////////////////////////////////////////////////////////////////////////
    //////////////////////INICIALIZAR OBJETOS//////////////////////////////////////////////////////////////////////////
  
    $('#form_epicrisis_aten').find('input, textarea, button, select').attr('disabled','disabled'); 
    $('#abrir_venpaci').attr('id','otro-id1');
    $("#txtmotcon").autoResize();
    $("#txtestgen").autoResize();
    $("#txtenfact").autoResize();
    $("#txtante").autoResize();
    $("#txtdesexfis").autoResize();
//    $("#txtdiagno").autoResize();
    $("#txtcondu").autoResize();
    $("#txtplande").autoResize();
    $("#txtrevsis").autoResize();
    $("#txtevolu").autoResize();
    $("#txtresulpa").autoResize();
    $("#txtjusti").autoResize();
    $("#txtdxpre").autoResize();
    $("#txtcongenegre").autoResize();
    $("#txtplanambu").autoResize();   
    $("#txtevolu").css("height","20px");
    $("#txtresulpa").css("height","20px");
    $("#txtjusti").css("height","20px");
    $("#txtdxpre").css("height","20px");
    $("#txtcongenegre").css("height","20px");
    $("#txtplanambu").css("height","20px");
    
    $('#abrir_vendiagnostico').attr('id','otro-id3');
    
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
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    ///////////////INICIALIZAR EL CALENDARIO/////////////////////////////
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
    ///////////////////////////////////////////////////////////
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
        $('#form_epicrisis_aten').find('input, textarea, button, select').attr('disabled',false); 
        $('#otro-id1').attr('id','abrir_venpaci');        
        $('#txtdoc').focus();
        $('#btn_add').css('display','inline-block');  
        $('#otro-id3').attr('id','abrir_vendiagnostico'); 
        //$("#txttipodoc, #txtdoc, #txtnompac,#txtedad,#combosex,#txttel,#txtdir,#txtmun,#comgrupoetn,#txtnomres,#txtparent,#txtdirresp,#txtnumhis").attr('disabled', true);                   
        
    });
    //////////////////////////////////////////////////////////////
    ////////////////////BTN_CANCELAR//////////////////////////////////
    $('#btn_can').live('click', function(){
        setTimeout(function(){
            window.location.href = "../ges_epicrisis_aten";								 							
	}, 700);        
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
           if($('#comhora_ing').val() == "0"){
               alert('Por Favor Seleccione La Hora de Ingreso..');
               $('#comhora_ing').focus();
               return;				
           }        
           if($('#commin_ing').val() == "0"){
               alert('Por Favor Seleccione Los Minutos de Ingreso..');
               $('#commin_ing').focus();
               return;				
           }         
           var hora1=$('#comhora_ing').val() + ":" + $('#commin_ing').val() + " " + $('#comtipohora_ing').val();
           var hora2=$('#comhora_egre').val() + ":" + $('#commin_egre').val() + " " + $('#comtipohora_egre').val();
           var datos={
                opcion: "guardar",                              
                
                hi_SERVICIO_INGRESO_EPI_ATEN : $('#combosering').val(),
                hi_SERVICIO_EGRESO_EPI_ATEN : $('#comboseregre').val(),
                hi_FECHA_INGRESO_EPI_ATEN : $('#txtfecha_ing').val(),
                hi_HORA_INGRESO_EPI_ATEN : hora1,
                hi_FECHA_EGRESO_EPI_ATEN : $('#txtfecha_egre').val(),
                hi_HORA_EGRESO_EPI_ATEN :hora2,
                hi_MOTIVO_CONSULTA_EPI_ATEN : $('#txtmotcon').val().toUpperCase(),
                hi_ESTADO_GENERAL_EPI_ATEN : $('#txtestgen').val().toUpperCase(),
                hi_ENFERMEDAD_ACTUAL_EPI_ATEN : $('#txtenfact').val().toUpperCase(),
                hi_ANTECEDENTES_EPI_ATEN : $('#txtante').val().toUpperCase(),
                hi_REVISION_SISTEMAS_EPI_ATEN : $('#txtrevsis').val().toUpperCase(),
                hi_TA_EPI_ATEN : $('#txtexta').val(),
                hi_FC_EPI_ATEN : $('#txtexfc').val(),
                hi_FR_EPI_ATEN : $('#txtexfr').val(),
                hi_TEMP_EPI_ATEN : $('#txtextemp').val(),
                hi_TALLA_EPI_ATEN : $('#txtextalla').val(),
                hi_SAT02_EPI_ATEN : $('#txtexsat').val(),
                hi_DESCRIPCION_EXAMEN_FISICO_EPI_ATEN : $('#txtdesexfis').val().toUpperCase(),
//                hi_DIAGNOSTICO_EPI_ATEN : $('#txtdiagno').val().toUpperCase(),
                hi_CONDUCTA_EPI_ATEN : $('#txtcondu').val().toUpperCase(),
                hi_PLAN_MANEJO_EPI_ATEN : $('#txtplande').val().toUpperCase(),
                hi_EVOLUCION_EPI_ATEN : $('#txtevolu').val().toUpperCase(),
                hi_RESUL_PARA_EPI_ATEN : $('#txtresulpa').val().toUpperCase(),
                hi_JUSTIFICACION_EPI_ATEN : $('#txtjusti').val().toUpperCase(),
                hi_DX_PRESUNTIVOS_EPI_ATEN : $('#txtdxpre').val().toUpperCase(),
                hi_CONDICIONES_GENERAL_EPI_ATEN : $('#txtcongenegre').val().toUpperCase(),
                hi_PLAN_AMBULATORIO_EPI_ATEN : $('#txtplanambu').val().toUpperCase(),      
                hi_NUMERO_REGISTRO_EPI_ATEN : $('#txtnumreg').val(),      
                
                hi_entidad_EPI_ATEN: $('#txtentidad').val().toUpperCase(),
                hi_ESTADO_EPI_ATEN: "ACTIVO",
                id_paciente: id_paciente, 
                ident_paciente: ident_paciente,
                
                hi_CODDIAGPPAL_EPI_ATEN:  $('#txtcoddx1').val().toUpperCase(),
                hi_DIAGPPAL_EPI_ATEN:  $('#txtdesdx1').val().toUpperCase(),
                hi_CODDIAG2_EPI_ATEN:  $('#txtcoddx2').val().toUpperCase(),
                hi_DIAG2_EPI_ATEN:  $('#txtdesdx2').val().toUpperCase(),
                hi_CODDIAG3_EPI_ATEN:  $('#txtcoddx3').val().toUpperCase(),
                hi_DIAG3_EPI_ATEN:  $('#txtdesdx3').val().toUpperCase(),
                hi_CODDIAG4_EPI_ATEN:  $('#txtcoddx4').val().toUpperCase(),
                hi_DIAG4_EPI_ATEN:  $('#txtdesdx4').val().toUpperCase()                
           }
           if(confirm("¿DESEA GUARDAR LOS DATOS?")){
                $.ajax({
                    type: "POST",
                    url: "../gestionar_epicrisis_aten",
                    data: datos,
                    success: function(data){
                        if(data==1){
                            alert('DATOS GUARDADOS DE MANERA EXITOSA...');
                            setTimeout(function(){
                                window.location.href = "../ges_epicrisis_aten";		
                            },1000);                          
                        }                    
                    },
                    error: function(error_messages){
                        alert('HA OCURRIDO UN ERROR');
                    }
                }); 
           }     
           
       }, 500);    
    });   
    ////////////////////BTN_BUSCAR//////////////////////////////////
    $('#btn_bus').live('click', function(){
        $('#conte').css("display",'none');
        $('#busqueda_epicrisis_aten').fadeIn(500);
        $('#oscuro').css('visibility','visible');
        $('#txtbusepiaten').val("");       
        $("body").css("overflow", "hidden");
        $('#txtbus').focus(); 
        $('#zona_epicrisis_aten').html("");
        $('#zona_epicrisis_aten2').html("");
        $('#busqueda_epicrisis_aten').css('height','360px');
    });      
    $('#cer_venepiaten').live('click', function(){
        $('#conte').css("display",'block');
        $('#busqueda_epicrisis_aten').fadeOut(500);
        $('#oscuro').css('visibility','hidden');
        $("body").css("overflow", "auto");        
        $('#zona_epicrisis_aten').html("");
        $('#zona_epicrisis_aten2').html("");
        $('#area_fecha').css('display','none');
        $('#tablafecha').css('display','none');
        $('#tfec').val("");      
        $(":text").each(function(){	
            $($(this)).val('');
	});        
    });  
    $('#busqueda_epicrisis_aten').live('mouseout',function(){ 
        $('#oscuro').live("click",function(){ 
            $('#conte').css("display",'block');
            $('#busqueda_epicrisis_aten').fadeOut(500);
            $('#oscuro').css('visibility','hidden');
            $("body").css("overflow", "auto");        
            $('#zona_epicrisis_aten').html("");
            $('#zona_epicrisis_aten2').html("");
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
        $('#zona_epicrisis_aten2').html("");
        $('#busqueda_epicrisis_aten').css('height','360px');
        
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
                $('#zona_epicrisis_aten').show(100).html(data);
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
        $('#busqueda_epicrisis_aten').css('height','600px');
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
            auxiliar: "EPICRISISAT"
        }
        $.ajax({
            type: "POST",
            url: "../mostrar_epicrisis_Aten",
            data: datos,
            success: function(data){
                $('#zona_epicrisis_aten2').show(100).html(data);
                $('#area_fecha').slideDown(500);
                $('#tablafecha').slideDown(500);               
            },
            error: function(error_messages){
                alert('HA OCURRIDO UN ERROR');
            }
        });            
    });    
    $('.marcado2').live('click', function(){     
        
        hi_ID_EPI_ATEN=$(this).attr('hi_ID_EPI_ATEN');
        var hi_SERVICIO_INGRESO_EPI_ATEN = $(this).attr('hi_SERVICIO_INGRESO_EPI_ATEN');
        $("#combosering option[value=" + hi_SERVICIO_INGRESO_EPI_ATEN + "]").attr("selected",true); 
        var hi_SERVICIO_EGRESO_EPI_ATEN = $(this).attr('hi_SERVICIO_EGRESO_EPI_ATEN');
        $("#comboseregre option[value=" + hi_SERVICIO_EGRESO_EPI_ATEN + "]").attr("selected",true);    
        
        var hi_FECHA_INGRESO_EPI_ATEN = $(this).attr('hi_FECHA_INGRESO_EPI_ATEN');
        if(hi_FECHA_INGRESO_EPI_ATEN=="0001-01-01"){
            hi_FECHA_INGRESO_EPI_ATEN="";
        }        
        $('#txtfecha_ing').val(hi_FECHA_INGRESO_EPI_ATEN);
        
        var hi_HORA_INGRESO_EPI_ATEN = $(this).attr('hi_HORA_INGRESO_EPI_ATEN');
        cad2=hi_HORA_INGRESO_EPI_ATEN.split(":"); 
        cad3=cad2[1].split(" ");                 
        $("#comhora_ing option[value=" + cad2[0] + "]").attr("selected",true); 
        $("#commin_ing option[value=" + cad3[0] + "]").attr("selected",true); 
        $("#comtipohora_ing option[value=" + cad3[1] + "]").attr("selected",true); 
        
        var hi_FECHA_EGRESO_EPI_ATEN = $(this).attr('hi_FECHA_EGRESO_EPI_ATEN');
        if(hi_FECHA_EGRESO_EPI_ATEN=="0001-01-01"){
            hi_FECHA_EGRESO_EPI_ATEN="";
        }        
        $('#txtfecha_egre').val(hi_FECHA_EGRESO_EPI_ATEN);

        var hi_HORA_EGRESO_EPI_ATEN = $(this).attr('hi_HORA_EGRESO_EPI_ATEN');
        cad2=hi_HORA_EGRESO_EPI_ATEN.split(":"); 
        cad3=cad2[1].split(" ");                 
        $("#comhora_egre option[value=" + cad2[0] + "]").attr("selected",true); 
        $("#commin_egre option[value=" + cad3[0] + "]").attr("selected",true); 
        $("#comtipohora_egre option[value=" + cad3[1] + "]").attr("selected",true); 
        
        
        $('#txtmotcon').val($(this).attr('hi_MOTIVO_CONSULTA_EPI_ATEN'));
        $('#txtestgen').val($(this).attr('hi_ESTADO_GENERAL_EPI_ATEN'));
        $('#txtenfact').val($(this).attr('hi_ENFERMEDAD_ACTUAL_EPI_ATEN'));
        $('#txtante').val($(this).attr('hi_ANTECEDENTES_EPI_ATEN'));
        $('#txtrevsis').val($(this).attr('hi_REVISION_SISTEMAS_EPI_ATEN'));
        $('#txtexta').val($(this).attr('hi_TA_EPI_ATEN'));
        $('#txtexfc').val($(this).attr('hi_FC_EPI_ATEN'));
        $('#txtexfr').val($(this).attr('hi_FR_EPI_ATEN'));
        $('#txtextemp').val($(this).attr('hi_TEMP_EPI_ATEN'));
        $('#txtextalla').val($(this).attr('hi_TALLA_EPI_ATEN'));
        $('#txtexsat').val($(this).attr('hi_SAT02_EPI_ATEN'));
        $('#txtdesexfis').val($(this).attr('hi_DESCRIPCION_EXAMEN_FISICO_EPI_ATEN'));
//        $('#txtdiagno').val($(this).attr('hi_DIAGNOSTICO_EPI_ATEN'));
        $('#txtcondu').val($(this).attr('hi_CONDUCTA_EPI_ATEN'));
        $('#txtplande').val($(this).attr('hi_PLAN_MANEJO_EPI_ATEN'));
        $('#txtevolu').val($(this).attr('hi_EVOLUCION_EPI_ATEN'));
        $('#txtresulpa').val($(this).attr('hi_RESUL_PARA_EPI_ATEN'));
        $('#txtjusti').val($(this).attr('hi_JUSTIFICACION_EPI_ATEN'));
        $('#txtdxpre').val($(this).attr('hi_DX_PRESUNTIVOS_EPI_ATEN'));
        $('#txtcongenegre').val($(this).attr('hi_CONDICIONES_GENERAL_EPI_ATEN'));
        $('#txtplanambu').val($(this).attr('hi_PLAN_AMBULATORIO_EPI_ATEN'));
        $('#txtnumreg').val($(this).attr('hi_NUMERO_REGISTRO_EPI_ATEN'));
        $('#txtentidad').val($(this).attr('hi_entidad_EPI_ATEN'));
        
        
        var hi_CODDIAGPPAL_EPI_ATEN=$(this).attr('hi_CODDIAGPPAL_EPI_ATEN');
        var hi_DIAGPPAL_EPI_ATEN=$(this).attr('hi_DIAGPPAL_EPI_ATEN');
        var hi_CODDIAG2_EPI_ATEN=$(this).attr('hi_CODDIAG2_EPI_ATEN');
        var hi_DIAG2_EPI_ATEN=$(this).attr('hi_DIAG2_EPI_ATEN');
        var hi_CODDIAG3_EPI_ATEN=$(this).attr('hi_CODDIAG3_EPI_ATEN');
        var hi_DIAG3_EPI_ATEN=$(this).attr('hi_DIAG3_EPI_ATEN');
        var hi_CODDIAG4_EPI_ATEN=$(this).attr('hi_CODDIAG4_EPI_ATEN');
        var hi_DIAG4_EPI_ATEN=$(this).attr('hi_DIAG4_EPI_ATEN');
        $('#txtcoddx1').val(hi_CODDIAGPPAL_EPI_ATEN);
        $('#txtdesdx1').val(hi_DIAGPPAL_EPI_ATEN);      

        if(hi_CODDIAG2_EPI_ATEN!=""){
            $('#txtcoddx2').val(hi_CODDIAG2_EPI_ATEN);
            $('#txtdesdx2').val(hi_DIAG2_EPI_ATEN);
            $('#di2').css('display','inline-block');
            numdiag=numdiag+1;
        }
        if(hi_CODDIAG3_EPI_ATEN!=""){
            $('#txtcoddx3').val(hi_CODDIAG3_EPI_ATEN);
            $('#txtdesdx3').val(hi_DIAG3_EPI_ATEN);     
            $('#di3').css('display','inline-block');
            numdiag=numdiag+1;
        }
        if(hi_CODDIAG4_EPI_ATEN!=""){
            $('#txtcoddx4').val(hi_CODDIAG4_EPI_ATEN);
            $('#txtdesdx4').val(hi_DIAG4_EPI_ATEN);     
            $('#di4').css('display','inline-block');
            numdiag=numdiag+1;
        }        
        
        $('#otro-id3').attr('id','abrir_vendiagnostico');
        $('#btn_add').css('display','inline-block');         
                                
        $('#btn_mod').css('display','block');
        $('#btn_eli').css('display','block');
        $('#btn_bus').css('display','none');
        $('#btn_gua').css('display','none');
        $('#btn_nue').css('display','none');
        $('#form_epicrisis_aten').find('input, textarea, button, select').attr('disabled',false); 
        //$('#otro-id1').attr('id','abrir_venpaci');
        $('#abrir_venpaci').attr('id','otro-id1');
        $("#txttipodoc, #txtdoc, #txtnompac,#txtedad,#combosex,#txttel,#txtdir,#txtmun,#comgrupoetn,#txtnomres,#txtparent,#txtdirresp,#txtnumhis").attr('disabled', true);                           
        
        $('#conte').css("display",'block');
        $('#busqueda_epicrisis_aten').fadeOut(500);
        $('#oscuro').css('visibility','hidden');
        $("body").css("overflow", "auto");        
        $('#zona_epicrisis_aten').html("");
        $('#zona_epicrisis_aten2').html("");
        $('#area_fecha').css('display','none');
        $('#tablafecha').css('display','none');
        $('#tfec').val("");      
        
        
        
    });     
    $('#buscafecha').live('click', function(){  
        $('#tid').val();
        var datos={
            ident: $('#tid').val(),
            fecha: $('#tfec').val(),
            auxiliar: "EPICRISISAT"
        }
        $.ajax({
            type: "POST",
            url: "../mostrar_epicrisis_Aten",
            data: datos,
            success: function(data){
                $('#zona_epicrisis_aten2').show(100).html(data);
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
           if($('#comhora_ing').val() == "0"){
               alert('Por Favor Seleccione La Hora de Ingreso..');
               $('#comhora_ing').focus();
               return;				
           }        
           if($('#commin_ing').val() == "0"){
               alert('Por Favor Seleccione Los Minutos de Ingreso..');
               $('#commin_ing').focus();
               return;				
           }         
           var hora1=$('#comhora_ing').val() + ":" + $('#commin_ing').val() + " " + $('#comtipohora_ing').val();
           var hora2=$('#comhora_egre').val() + ":" + $('#commin_egre').val() + " " + $('#comtipohora_egre').val();
           var datos={
                opcion: "modificar",                              
                
                hi_ID_EPI_ATEN:hi_ID_EPI_ATEN,
                hi_SERVICIO_INGRESO_EPI_ATEN : $('#combosering').val(),
                hi_SERVICIO_EGRESO_EPI_ATEN : $('#comboseregre').val(),
                hi_FECHA_INGRESO_EPI_ATEN : $('#txtfecha_ing').val(),
                hi_HORA_INGRESO_EPI_ATEN : hora1,
                hi_FECHA_EGRESO_EPI_ATEN : $('#txtfecha_egre').val(),
                hi_HORA_EGRESO_EPI_ATEN :hora2,
                hi_MOTIVO_CONSULTA_EPI_ATEN : $('#txtmotcon').val().toUpperCase(),
                hi_ESTADO_GENERAL_EPI_ATEN : $('#txtestgen').val().toUpperCase(),
                hi_ENFERMEDAD_ACTUAL_EPI_ATEN : $('#txtenfact').val().toUpperCase(),
                hi_ANTECEDENTES_EPI_ATEN : $('#txtante').val().toUpperCase(),
                hi_REVISION_SISTEMAS_EPI_ATEN : $('#txtrevsis').val().toUpperCase(),
                hi_TA_EPI_ATEN : $('#txtexta').val(),
                hi_FC_EPI_ATEN : $('#txtexfc').val(),
                hi_FR_EPI_ATEN : $('#txtexfr').val(),
                hi_TEMP_EPI_ATEN : $('#txtextemp').val(),
                hi_TALLA_EPI_ATEN : $('#txtextalla').val(),
                hi_SAT02_EPI_ATEN : $('#txtexsat').val(),
                hi_DESCRIPCION_EXAMEN_FISICO_EPI_ATEN : $('#txtdesexfis').val().toUpperCase(),
//                hi_DIAGNOSTICO_EPI_ATEN : $('#txtdiagno').val().toUpperCase(),
                hi_CONDUCTA_EPI_ATEN : $('#txtcondu').val().toUpperCase(),
                hi_PLAN_MANEJO_EPI_ATEN : $('#txtplande').val().toUpperCase(),
                hi_EVOLUCION_EPI_ATEN : $('#txtevolu').val().toUpperCase(),
                hi_RESUL_PARA_EPI_ATEN : $('#txtresulpa').val().toUpperCase(),
                hi_JUSTIFICACION_EPI_ATEN : $('#txtjusti').val().toUpperCase(),
                hi_DX_PRESUNTIVOS_EPI_ATEN : $('#txtdxpre').val().toUpperCase(),
                hi_CONDICIONES_GENERAL_EPI_ATEN : $('#txtcongenegre').val().toUpperCase(),
                hi_PLAN_AMBULATORIO_EPI_ATEN : $('#txtplanambu').val().toUpperCase(),      
                hi_NUMERO_REGISTRO_EPI_ATEN : $('#txtnumreg').val(),      
                hi_entidad_EPI_ATEN: $('#txtentidad').val().toUpperCase(),
                
                hi_ESTADO_EPI_ATEN: "ACTIVO",
                id_paciente: id_paciente, 
                ident_paciente: ident_paciente,
                
                hi_CODDIAGPPAL_EPI_ATEN:  $('#txtcoddx1').val().toUpperCase(),
                hi_DIAGPPAL_EPI_ATEN:  $('#txtdesdx1').val().toUpperCase(),
                hi_CODDIAG2_EPI_ATEN:  $('#txtcoddx2').val().toUpperCase(),
                hi_DIAG2_EPI_ATEN:  $('#txtdesdx2').val().toUpperCase(),
                hi_CODDIAG3_EPI_ATEN:  $('#txtcoddx3').val().toUpperCase(),
                hi_DIAG3_EPI_ATEN:  $('#txtdesdx3').val().toUpperCase(),
                hi_CODDIAG4_EPI_ATEN:  $('#txtcoddx4').val().toUpperCase(),
                hi_DIAG4_EPI_ATEN:  $('#txtdesdx4').val().toUpperCase()                   
           }
           if(confirm("¿DESEA MODIFICAR LOS DATOS?")){
                $.ajax({
                    type: "POST",
                    url: "../gestionar_epicrisis_aten",
                    data: datos,
                    success: function(data){
                        if(data==1){
                            alert('DATOS MODIFICADOS DE MANERA EXITOSA...');
                            setTimeout(function(){
                                window.location.href = "../ges_epicrisis_aten";		
                            },1000);                          
                        }                    
                    },
                    error: function(error_messages){
                        alert('HA OCURRIDO UN ERROR');
                    }
                });                        
           } 
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
           if($('#comhora_ing').val() == "0"){
               alert('Por Favor Seleccione La Hora de Ingreso..');
               $('#comhora_ing').focus();
               return;				
           }        
           if($('#commin_ing').val() == "0"){
               alert('Por Favor Seleccione Los Minutos de Ingreso..');
               $('#commin_ing').focus();
               return;				
           }         
           var hora1=$('#comhora_ing').val() + ":" + $('#commin_ing').val() + " " + $('#comtipohora_ing').val();
           var hora2=$('#comhora_egre').val() + ":" + $('#commin_egre').val() + " " + $('#comtipohora_egre').val();
           var datos={
                opcion: "eliminar",                              
                
                hi_ID_EPI_ATEN:hi_ID_EPI_ATEN,
                hi_SERVICIO_INGRESO_EPI_ATEN : $('#combosering').val(),
                hi_SERVICIO_EGRESO_EPI_ATEN : $('#comboseregre').val(),
                hi_FECHA_INGRESO_EPI_ATEN : $('#txtfecha_ing').val(),
                hi_HORA_INGRESO_EPI_ATEN : hora1,
                hi_FECHA_EGRESO_EPI_ATEN : $('#txtfecha_egre').val(),
                hi_HORA_EGRESO_EPI_ATEN :hora2,
                hi_MOTIVO_CONSULTA_EPI_ATEN : $('#txtmotcon').val().toUpperCase(),
                hi_ESTADO_GENERAL_EPI_ATEN : $('#txtestgen').val().toUpperCase(),
                hi_ENFERMEDAD_ACTUAL_EPI_ATEN : $('#txtenfact').val().toUpperCase(),
                hi_ANTECEDENTES_EPI_ATEN : $('#txtante').val().toUpperCase(),
                hi_REVISION_SISTEMAS_EPI_ATEN : $('#txtrevsis').val().toUpperCase(),
                hi_TA_EPI_ATEN : $('#txtexta').val(),
                hi_FC_EPI_ATEN : $('#txtexfc').val(),
                hi_FR_EPI_ATEN : $('#txtexfr').val(),
                hi_TEMP_EPI_ATEN : $('#txtextemp').val(),
                hi_TALLA_EPI_ATEN : $('#txtextalla').val(),
                hi_SAT02_EPI_ATEN : $('#txtexsat').val(),
                hi_DESCRIPCION_EXAMEN_FISICO_EPI_ATEN : $('#txtdesexfis').val().toUpperCase(),
//                hi_DIAGNOSTICO_EPI_ATEN : $('#txtdiagno').val().toUpperCase(),
                hi_CONDUCTA_EPI_ATEN : $('#txtcondu').val().toUpperCase(),
                hi_PLAN_MANEJO_EPI_ATEN : $('#txtplande').val().toUpperCase(),
                hi_EVOLUCION_EPI_ATEN : $('#txtevolu').val().toUpperCase(),
                hi_RESUL_PARA_EPI_ATEN : $('#txtresulpa').val().toUpperCase(),
                hi_JUSTIFICACION_EPI_ATEN : $('#txtjusti').val().toUpperCase(),
                hi_DX_PRESUNTIVOS_EPI_ATEN : $('#txtdxpre').val().toUpperCase(),
                hi_CONDICIONES_GENERAL_EPI_ATEN : $('#txtcongenegre').val().toUpperCase(),
                hi_PLAN_AMBULATORIO_EPI_ATEN : $('#txtplanambu').val().toUpperCase(),      
                hi_NUMERO_REGISTRO_EPI_ATEN : $('#txtnumreg').val(),      
                hi_entidad_EPI_ATEN: $('#txtentidad').val().toUpperCase(),
                
                hi_ESTADO_EPI_ATEN: "INACTIVO",
                id_paciente: id_paciente, 
                ident_paciente: ident_paciente,
                
                hi_CODDIAGPPAL_EPI_ATEN:  $('#txtcoddx1').val().toUpperCase(),
                hi_DIAGPPAL_EPI_ATEN:  $('#txtdesdx1').val().toUpperCase(),
                hi_CODDIAG2_EPI_ATEN:  $('#txtcoddx2').val().toUpperCase(),
                hi_DIAG2_EPI_ATEN:  $('#txtdesdx2').val().toUpperCase(),
                hi_CODDIAG3_EPI_ATEN:  $('#txtcoddx3').val().toUpperCase(),
                hi_DIAG3_EPI_ATEN:  $('#txtdesdx3').val().toUpperCase(),
                hi_CODDIAG4_EPI_ATEN:  $('#txtcoddx4').val().toUpperCase(),
                hi_DIAG4_EPI_ATEN:  $('#txtdesdx4').val().toUpperCase()                   
           }
           if(confirm("¿DESEA ELIMINAR LOS DATOS?")){
                $.ajax({
                    type: "POST",
                    url: "../gestionar_epicrisis_aten",
                    data: datos,
                    success: function(data){
                        if(data==1){
                            alert('DATOS ELIMINADOS DE MANERA EXITOSA...');
                            setTimeout(function(){
                                window.location.href = "../ges_epicrisis_aten";		
                            },1000);                          
                        }                    
                    },
                    error: function(error_messages){
                        alert('HA OCURRIDO UN ERROR');
                    }
                });                        
           }
       }, 500);    
    });    
    //*******************DIAGNOSTICOS*****************//
    var opc=0;
    $('#abrir_vendiagnostico').live('click', function(){
        opc = $(this).attr('opc'); 
        $("body").css("overflow", "hidden");
        $('#conte').css("display",'none');
        $('#busqueda_diagnos').fadeIn(500);
        $('#oscuro').css('visibility','visible');
        $('#txtbusdiag').val("");
        $('#txtbusdiag').focus();
        $('#zona_diagnostico').html("");        
        var datos={
            auxiliar: "1"
        }
        $.ajax({
           type: 'POST',
           url: '../cargar_diagnosticos',
           data: datos,
           success: function(data){
               $('#zona_diagnostico').show(1000).html(data);
           },
           error: function(error_messages){
            alert('HA OCURRIDO UN ERROR');
           }
        });        
    });     
    $('#cer_vendiagnos').live('click', function(){
        $('#conte').css("display",'block');
        $('#busqueda_diagnos').fadeOut(500);
        $('#zona_diagnostico').html("");
        $('#oscuro').css('visibility','hidden');
        $("body").css("overflow", "auto"); 
        $('#zona_diagnostico').html("");
    });      
    $('#txtbusdiag').live('keyup', function(e){
        e.preventDefault(e);        
        var combo=$('#combusdiag').find(':selected').val();
        //var combuspac="";
        var tipo="";
        if(combo=="1"){
            combo="CODIGO";
        }
        if(combo=="2"){
            combo="NOMBRE";
        }     
        if($('#txtbusdiag').val()==""){
            tipo="VACIA";
        }else{
            tipo="LLENA";
        }        
        
        var datos={
            auxiliar: "2",
            combusdiag: combo,
            txtbusdiag: $('#txtbusdiag').val(),
            tipo: tipo
        }
        $.ajax({
            type: "POST",
            url: "../cargar_diagnosticos",
            data: datos,
            success: function(data){
                $('#zona_diagnostico').show(100).html(data);
            },
            error: function(error_messages){
                alert('HA OCURRIDO UN ERROR');
            }
        });
    });  
    $('#seleccionar_diagnosticos').live('click', function(){        
        var cad=$("input[name='seleccion']:checked").val();             
        if(cad){
            var cadena=cad.split(";");
            if(opc==1){
                $('#txtcoddx1').val(cadena[0]);
                $('#txtdesdx1').val(cadena[1]);   
            }
            if(opc==2){
                $('#txtcoddx2').val(cadena[0]);
                $('#txtdesdx2').val(cadena[1]);   
            }     
            if(opc==3){
                $('#txtcoddx3').val(cadena[0]);
                $('#txtdesdx3').val(cadena[1]);   
            }     
            if(opc==4){
                $('#txtcoddx4').val(cadena[0]);
                $('#txtdesdx4').val(cadena[1]);   
            }            
            ////////////////////////////////////////////////////////////////////
            $('#conte').css("display",'block');
            $('#busqueda_diagnos').fadeOut(500);                
            $('#oscuro').css('visibility','hidden');
            $("body").css("overflow", "auto"); 
            $('#zona_diagnostico').html("");           
        }
    });    
    $('#busqueda_diagnos').live('mouseout',function(){ 
        $('#oscuro').live("click",function(){ 
            $('#oscuro').css('visibility','hidden');
            $('#busqueda_diagnos').fadeOut('slow'); 
            $('#conte').css("display",'block');
            $("body").css("overflow", "auto"); 
            $('#zona_diagnostico').html("");
        });
        return false; // Para evitar el efecto de burbujeo                
    }); 
    
    $('#btn_add').live('click', function(){
        if(numdiag<=4){
            numdiag=numdiag+1;
            $('#di'+numdiag).css('display','inline-block');
        }        
    });
    //**************************************************//        
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


