var numExp = /^[0-9]+$/;


$(document).ready(function() {
    ////////////////VARIABLES GLOBALES///////////////////////////////////////////////////
    var id_paciente;
    var ident_paciente;
    var hi_ID_ATEN_URGEN;
    var numdiag=1;
    var numdiag1=5;
    ////////////////////////////////////////////////////////////////////////////////////

    //////////////////////INICIALIZAR OBJETOS//////////////////////////////////////////////////////////////////////////
    $("#txttelacomp_llegpac").numeric({decimal: false, negative: false}, function() {this.value = "";this.focus();});
    $('#form_atencion').find('input, textarea, button, select').attr('disabled','disabled'); 
    $('#abrir_venpaci').attr('id','otro-id1');
    $('#abrir_ventana').attr('id','otro-id2');
    $("#txtcausa_concu").autoResize();$("#txtcausa_concu").css("height","40px");   
    $("#hi_MOTIVO_CONSULTA_ATEN_URGEN").autoResize();$("#hi_MOTIVO_CONSULTA_ATEN_URGEN").css("height","40px");  
    $("#hi_ESTADO_GENERAL_ATEN_URGEN").autoResize();$("#hi_ESTADO_GENERAL_ATEN_URGEN").css("height","40px");       
    $("#hi_ENFERMEDAD_ACTUAL_ATEN_URGEN").autoResize();$("#hi_ENFERMEDAD_ACTUAL_ATEN_URGEN").css("height","40px");  
    $("#hi_ANTECEDENTES_ATEN_URGEN").autoResize();$("#hi_ANTECEDENTES_ATEN_URGEN").css("height","40px");  
    $("#hi_REVISION_SISTEMAS_ATEN_URGEN").autoResize();$("#hi_REVISION_SISTEMAS_ATEN_URGEN").css("height","40px");  
    $("#hi_DESCRIPCION_EXAMEN_FISICO_ATEN_URGEN").autoResize();$("#hi_DESCRIPCION_EXAMEN_FISICO_ATEN_URGEN").css("height","40px");  
    $("#hi_DIAGNOSTICO_ATEN_URGEN").autoResize();$("#hi_DIAGNOSTICO_ATEN_URGEN").css("height","40px");  
    $("#hi_CONDUCTA_ATEN_URGEN").autoResize();$("#hi_CONDUCTA_ATEN_URGEN").css("height","40px");  
    $("#hi_PLAN_MANEJO_ATEN_URGEN").autoResize();$("#hi_PLAN_MANEJO_ATEN_URGEN").css("height","40px");  
    $("#hi_DX_PRESUNTIVOS_ATEN_URGEN").autoResize();$("#hi_DX_PRESUNTIVOS_ATEN_URGEN").css("height","40px");  
    $("#hi_CONDICIONES_GENERAL_ATEN_URGEN").autoResize();$("#hi_CONDICIONES_GENERAL_ATEN_URGEN").css("height","40px");  
    $("#hi_PLAN_AMBULATORIO_ATEN_URGEN").autoResize();$("#hi_PLAN_AMBULATORIO_ATEN_URGEN").css("height","40px");      
    
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

    ////////////////boton abrir ventana///////////////////////
    $('#abrir_ventana').live('click', function(){
        $("body").css("overflow", "hidden");
        $('#conte').css("display",'none');
        $('#busqueda_municipios').fadeIn(500);
        $('#txtbusmunicipio').val("");
        $('#txtbusmunicipio').focus();
        $('#oscuro').css('visibility','visible');
        $('#zona_municipios').html("");
        var datos={
            auxiliar: "1"
        }
        $.ajax({
           type: 'POST',
           url: '../cargar_municipios',
           data: datos,
           success: function(data){
               $('#zona_municipios').show(1000).html(data);
           },
           error: function(error_messages){
            alert('HA OCURRIDO UN ERROR');
           }
        });        
    }); 
    ////////////////////////////////////////////////////////////
    
    ///////////////////busqueda de municipios//////////////////
    
    $('#txtbusmunicipio').live('keyup', function(e){
        e.preventDefault(e);        
        var combo=$('#combomunicipio').find(':selected').val();
        //var combomunicipio="";
        var tipo="";
        if(combo=="1"){
            combo="CODIGO";
        }else{
            combo="NOMBRE";
        }
        if($('#txtbusmunicipio').val()==""){
            tipo="VACIA";
        }else{
            tipo="LLENA";
        }        
        var datos={
            auxiliar: "2",
            combomunicipio: combo,
            txtbusmunicipio: $('#txtbusmunicipio').val(),
            tipo: tipo
        }
        $.ajax({
            type: "POST",
            url: "../cargar_municipios",
            data: datos,
            success: function(data){
                $('#zona_municipios').show(100).html(data);
            },
            error: function(error_messages){
                alert('HA OCURRIDO UN ERROR');
            }
        });
    }); 
    
    //////////////////////////////////////////////////////////
    //////////////SELECCIONAR MUNICIPIOS/////////////////////

    $('#seleccionar_municipio').live('click', function(){        
        var cad=$("input[name='seleccion']:checked").val();
        if(cad){
            var cadena=cad.split("-");
            $('#txtdepacomp_llegpac').val(cadena[2]);
            $('#txtmunacomp_llegpac').val(cadena[1]);
            $('#conte').css("display",'block');
            $('#busqueda_municipios').fadeOut(500);                
            $('#oscuro').css('visibility','hidden');
            $("body").css("overflow", "auto"); 
            $('#zona_municipios').html("");            
        }
    });
    //////////////////////////////////////////////////////////

    $('#cerrar_ventana').live('click', function(){
        $('#conte').css("display",'block');
        $('#busqueda_municipios').fadeOut(500);
        $('#oscuro').css('visibility','hidden');
        $("body").css("overflow", "auto"); 
        $('#zona_municipios').html("");
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
    
    $('#busqueda_municipios').live('mouseout',function(){ 
        $('#oscuro').live("click",function(){ 
            $('#oscuro').css('visibility','hidden');
            $('#busqueda_municipios').fadeOut('slow'); 
            $('#conte').css("display",'block');
            $("body").css("overflow", "auto"); 
            $('#zona_municipios').html("");
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
        $('#form_atencion').find('input, textarea, button, select').attr('disabled',false); 
        $('#otro-id1').attr('id','abrir_venpaci');
        $('#otro-id2').attr('id','abrir_ventana');   
        
        $("#txttipodoc, #txtdoc, #txtnompac,#txtedad,#combosex,#txttel,#txtdir,#txtmun,#comgrupoetn,#txtnomres,#txtparent,#txtdirresp,#txtnumhis").attr('disabled', true);           
        $('#btn_add').css('display','inline-block');  
        $('#btn_add1').css('display','inline-block');  
        $('#otro-id3').attr('id','abrir_vendiagnostico'); 
    });
    //////////////////////////////////////////////////////////////
    ////////////////////BTN_CANCELAR//////////////////////////////////
    $('#btn_can').live('click', function(){
//        $(":text").each(function(){	
//            $($(this)).val('');
//	});
        setTimeout(function(){
            window.location.href = "../ges_ateurg";								 							
	}, 700);        
    });    
    ///////////////////////////////////////////////////////////////////////////

    ////////////////////BTN_BUSCAR//////////////////////////////////
    $('#btn_bus').live('click', function(){
        $('#conte').css("display",'none');
        $('#busqueda_atencion_urgencia').fadeIn(500);
        $('#oscuro').css('visibility','visible');
        $('#txtbusaten').val("");       
        $("body").css("overflow", "hidden");
        $('#txtbusaten').focus(); 
        $('#zona_atencion').html("");
        $('#zona_atencion2').html("");
        $('#busqueda_atencion_urgencia').css('height','360px');
    });    
    
    $('#cer_venaten').live('click', function(){
        $('#conte').css("display",'block');
        $('#busqueda_atencion_urgencia').fadeOut(500);
        $('#oscuro').css('visibility','hidden');
        $("body").css("overflow", "auto");        
        $('#zona_atencion').html("");
        $('#zona_atencion2').html("");
        $('#area_fecha').css('display','none');
        $('#tablafecha').css('display','none');
        $('#tfec').val("");   
        $(":text").each(function(){	
            $($(this)).val('');
	});         
    }); 
      
    $('#txtbusaten').live('keyup', function(e){
        e.preventDefault(e);     
        //if($('#txtbusaten').val()!=""){
        $('#zona_atencion2').html("");
        $('#busqueda_atencion_urgencia').css('height','360px');
            var combo=$('#combusaten').find(':selected').val();
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
                combusaten: combo,
                txtbusaten: $('#txtbusaten').val(),
                auxiliar: "PACIENTES"
            }
            $.ajax({
                type: "POST",
                url: "../cargar_atencion_urgencia",
                data: datos,
                success: function(data){
                    $('#zona_atencion').show(100).html(data);
                },
                error: function(error_messages){
                    alert('HA OCURRIDO UN ERROR');
                }
            });
            
        //}
    }); 

    $('#busqueda_atencion_urgencia').live('mouseout',function(){ 
        $('#oscuro').live("click",function(){ 
            $('#oscuro').css('visibility','hidden');
            $('#busqueda_atencion_urgencia').fadeOut('slow'); 
            $('#conte').css("display",'block');
            $("body").css("overflow", "auto"); 
            $('#zona_atencion').html("");
            $('#zona_atencion2').html("");
            $('#area_fecha').css('display','none');
            $('#tablafecha').css('display','none');
            $('#tfec').val("");
            $(":text").each(function(){	
                $($(this)).val('');
            });             
        });
        return false; // Para evitar el efecto de burbujeo                
    });  
    
    $('.marcado').live('click', function(){  
        $('#area_fecha').css('display','none');
        $('#tablafecha').css('display','none');
        $('#tfec').val("");
        $('#busqueda_atencion_urgencia').css('height','600px');        
        //////////////////////VARIABLES PARA LOS DATOS PERSONALES////////////////////
        var ident = $(this).attr('ident'); 
        $('#tid').val(ident);
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
            auxiliar: "ATENCION"
        }
        $.ajax({
            type: "POST",
            url: "../mostrar_atencion_urgencia",
            data: datos,
            success: function(data){
                $('#zona_atencion2').show(100).html(data);
                $('#area_fecha').slideDown(500);
                $('#tablafecha').slideDown(500);
            },
            error: function(error_messages){
                alert('HA OCURRIDO UN ERROR');
            }
        });            
    }); 
    
    $('#buscafecha').live('click', function(){  
        $('#tid').val();
        var datos={
            ident: $('#tid').val(),
            fecha: $('#tfec').val(),
            auxiliar: "ATENCION"
        }
        $.ajax({
            type: "POST",
            url: "../mostrar_atencion_urgencia",
            data: datos,
            success: function(data){
                $('#zona_atencion2').show(100).html(data);
                $('#area_fecha').slideDown(300);
                $('#tablafecha').slideDown(300);
            },
            error: function(error_messages){
                alert('HA OCURRIDO UN ERROR');
            }
        });                    
    }); 
    $('.marcado2').live('click', function(){  
        var opcion;
        var opcion2;
        var cad2,cad3;
        var id;
        
        
        hi_ID_ATEN_URGEN = $(this).attr('hi_ID_ATEN_URGEN');        
        var hi_FECHA_ATEN_URGEN = $(this).attr('hi_FECHA_ATEN_URGEN');
        $('#txtfecha_llegpac').val(hi_FECHA_ATEN_URGEN);
        var hi_MEDIOS_PROPIOS_ATEN_URGEN = $(this).attr('hi_MEDIOS_PROPIOS_ATEN_URGEN');
        $('#compromed_llegpac').val(hi_MEDIOS_PROPIOS_ATEN_URGEN);
        id = $("#compromed_llegpac").find(':selected').val();
        if(id=="NO"){
            $('#lab1').css('display','');
            $('#txtcual_llegpac').css('display','');
        }else{
            $('#lab1').css('display','none');
            $('#txtcual_llegpac').css('display','none');            
        }
             
             
        var hi_CUAL_ATEN_URGEN = $(this).attr('hi_CUAL_ATEN_URGEN');
        $('#txtcual_llegpac').val(hi_CUAL_ATEN_URGEN);
        var hi_ESTADO_PACIENTE_ATEN_URGEN = $(this).attr('hi_ESTADO_PACIENTE_ATEN_URGEN');
        $("#comest_llegpac option[value=" + hi_ESTADO_PACIENTE_ATEN_URGEN + "]").attr("selected",true); 
        var hi_NOMBRE_ACOMP_ACTUAL_ATEN_URGEN = $(this).attr('hi_NOMBRE_ACOMP_ACTUAL_ATEN_URGEN');       
        $('#txtnomacomp_llegpac').val(hi_NOMBRE_ACOMP_ACTUAL_ATEN_URGEN);
        var hi_DIRECCION_ACOMP_ACTUAL_ATEN_URGEN = $(this).attr('hi_DIRECCION_ACOMP_ACTUAL_ATEN_URGEN');
        $('#txtdiracomp_llegpac').val(hi_DIRECCION_ACOMP_ACTUAL_ATEN_URGEN);
        var hi_MUNICIPIO_ACOMP_ACTUAL_ATEN_URGEN = $(this).attr('hi_MUNICIPIO_ACOMP_ACTUAL_ATEN_URGEN');
        $('#txtmunacomp_llegpac').val(hi_MUNICIPIO_ACOMP_ACTUAL_ATEN_URGEN);
        var hi_DEPARTAMENTO_ACOMP_ACTUAL_ATEN_URGEN = $(this).attr('hi_DEPARTAMENTO_ACOMP_ACTUAL_ATEN_URGEN');
        $('#txtdepacomp_llegpac').val(hi_DEPARTAMENTO_ACOMP_ACTUAL_ATEN_URGEN);
        var hi_TELEFONO_ACOMP_ACTUAL_ATEN_URGEN = $(this).attr('hi_TELEFONO_ACOMP_ACTUAL_ATEN_URGEN');
        $('#txttelacomp_llegpac').val(hi_TELEFONO_ACOMP_ACTUAL_ATEN_URGEN);
        var hi_FECHA_EN_CASO_ATEN_URGEN = $(this).attr('hi_FECHA_EN_CASO_ATEN_URGEN');
        if(hi_FECHA_EN_CASO_ATEN_URGEN=="0001-01-01"){
            hi_FECHA_EN_CASO_ATEN_URGEN="";
        }
        $('#txtfecha_concu').val(hi_FECHA_EN_CASO_ATEN_URGEN);
        
        
        var hi_HORA_EN_CASO_ATEN_URGEN = $(this).attr('hi_HORA_EN_CASO_ATEN_URGEN');
        cad2=hi_HORA_EN_CASO_ATEN_URGEN.split(":"); 
        cad3=cad2[1].split(" "); 
        $("#comhora_concu option[value=" + cad2[0] + "]").attr("selected",true); 
        $("#commin_concu option[value=" + cad3[0] + "]").attr("selected",true); 
        $("#comtipohora_concu option[value=" + cad3[1] + "]").attr("selected",true); 
     
        var hi_SITIO_EN_CASO_ATEN_URGEN = $(this).attr('hi_SITIO_EN_CASO_ATEN_URGEN');
        $('#txtsitio_concu').val(hi_SITIO_EN_CASO_ATEN_URGEN);
        var hi_CAUSA_EN_CASO_ATEN_URGEN = $(this).attr('hi_CAUSA_EN_CASO_ATEN_URGEN');
        $('#txtcausa_concu').val(hi_CAUSA_EN_CASO_ATEN_URGEN);
        
        var hi_NOT_POL_ATEN_URGEN = $(this).attr('hi_NOT_POL_ATEN_URGEN');
        $("#comnotipoli option[value=" + hi_NOT_POL_ATEN_URGEN + "]").attr("selected",true); 
        id = $("#comnotipoli").find(':selected').val();
        if(id=="SI"){
            $('#lab2,#lab3,#lab4,#lab5').css('display','');
            $('#txtfecha_notpol,#comhora_notpol,#commin_notpol,#comtipohora_notpol').css('display','');
        }else{
            $('#lab2,#lab3,#lab4,#lab5').css('display','none');
            $('#txtfecha_notpol,#comhora_notpol,#commin_notpol,#comtipohora_notpol').css('display','none');            
        }
                                
        var hi_FECHA_NOT_POL_ATEN_URGEN = $(this).attr('hi_FECHA_NOT_POL_ATEN_URGEN');
        if(hi_FECHA_NOT_POL_ATEN_URGEN=="0001-01-01"){
            hi_FECHA_NOT_POL_ATEN_URGEN="";
        }        
        $('#txtfecha_notpol').val(hi_FECHA_NOT_POL_ATEN_URGEN);
        
        var hi_HORA_NOT_POL_ATEN_URGEN = $(this).attr('hi_HORA_NOT_POL_ATEN_URGEN');
        cad2=hi_HORA_NOT_POL_ATEN_URGEN.split(":"); 
        cad3=cad2[1].split(" "); 
        $("#comhora_notpol option[value=" + cad2[0] + "]").attr("selected",true); 
        $("#commin_notpol option[value=" + cad3[0] + "]").attr("selected",true); 
        $("#comtipohora_notpol option[value=" + cad3[1] + "]").attr("selected",true); 

        var hi_NOT_FAM_ATEN_URGEN = $(this).attr('hi_NOT_FAM_ATEN_URGEN');
        $("#comnotifami option[value=" + hi_NOT_FAM_ATEN_URGEN + "]").attr("selected",true); 
        id = $("#comnotifami").find(':selected').val();
        if(id=="SI"){
            $('#lab6,#lab7,#lab8,#lab9').css('display','');
            $('#txtfecha_notifami,#comhora_notifami,#commin_notifami,#comtipohora_notifami').css('display','');
        }else{
            $('#lab6,#lab7,#lab8,#lab9').css('display','none');
            $('#txtfecha_notifami,#comhora_notifami,#commin_notifami,#comtipohora_notifami').css('display','none');            
        }
                                        
        var hi_FECHA_NOT_FAM_ATEN_URGEN = $(this).attr('hi_FECHA_NOT_FAM_ATEN_URGEN');
        if(hi_FECHA_NOT_FAM_ATEN_URGEN=="0001-01-01"){
            hi_FECHA_NOT_FAM_ATEN_URGEN="";
        }          
        $('#txtfecha_notifami').val(hi_FECHA_NOT_FAM_ATEN_URGEN);
        var hi_HORA_NOT_FAM_ATEN_URGEN = $(this).attr('hi_HORA_NOT_FAM_ATEN_URGEN');
        cad2=hi_HORA_NOT_FAM_ATEN_URGEN.split(":"); 
        cad3=cad2[1].split(" "); 
        $("#comhora_notifami option[value=" + cad2[0] + "]").attr("selected",true); 
        $("#commin_notifami option[value=" + cad3[0] + "]").attr("selected",true); 
        $("#comtipohora_notifami option[value=" + cad3[1] + "]").attr("selected",true); 
        
        var hi_NOT_SER_ATEN_URGEN = $(this).attr('hi_NOT_SER_ATEN_URGEN');
        $("#comnotisersal option[value=" + hi_NOT_SER_ATEN_URGEN + "]").attr("selected",true); 
        id = $("#comnotisersal").find(':selected').val();
        if(id=="SI"){
            $('#lab10,#lab11,#lab12,#lab13').css('display','');
            $('#txtfecha_notisersal,#comhora_notisersal,#commin_notisersal,#comtipohora_notisersal').css('display','');
        }else{
            $('#lab10,#lab11,#lab12,#lab13').css('display','none');
            $('#txtfecha_notisersal,#comhora_notisersal,#commin_notisersal,#comtipohora_notisersal').css('display','none');            
        }        
        
        var hi_FECHA_NOT_SER_ATEN_URGEN = $(this).attr('hi_FECHA_NOT_SER_ATEN_URGEN');
        if(hi_FECHA_NOT_SER_ATEN_URGEN=="0001-01-01"){
            hi_FECHA_NOT_SER_ATEN_URGEN="";
        }                  
        $('#txtfecha_notisersal').val(hi_FECHA_NOT_SER_ATEN_URGEN);
        var hi_HORA_NOT_SER_ATEN_URGEN = $(this).attr('hi_HORA_NOT_SER_ATEN_URGEN');
        cad2=hi_HORA_NOT_SER_ATEN_URGEN.split(":"); 
        cad3=cad2[1].split(" "); 
        $("#comhora_notisersal option[value=" + cad2[0] + "]").attr("selected",true); 
        $("#commin_notisersal option[value=" + cad3[0] + "]").attr("selected",true); 
        $("#comtipohora_notisersal option[value=" + cad3[1] + "]").attr("selected",true); 

        var hi_DIAG_INGRESO_ATEN_URGEN = $(this).attr('hi_DIAG_INGRESO_ATEN_URGEN');
        $('#txtdiag_ingreso').val(hi_DIAG_INGRESO_ATEN_URGEN);
        var hi_DIAG_EGRESO_ATEN_URGEN = $(this).attr('hi_DIAG_EGRESO_ATEN_URGEN');
        $('#txtdiag_egreso').val(hi_DIAG_EGRESO_ATEN_URGEN);
        
        var hi_FECHA_SALIDA_ATEN_URGEN = $(this).attr('hi_FECHA_SALIDA_ATEN_URGEN');
        if(hi_FECHA_SALIDA_ATEN_URGEN=="0001-01-01"){
            hi_FECHA_SALIDA_ATEN_URGEN="";
        }                          
        
        $('#txtfecha_salida').val(hi_FECHA_SALIDA_ATEN_URGEN);
        var hi_HORA_SALIDA_ATEN_URGEN = $(this).attr('hi_HORA_SALIDA_ATEN_URGEN');
        cad2=hi_HORA_SALIDA_ATEN_URGEN.split(":"); 
        cad3=cad2[1].split(" "); 
        $("#comhora_salida option[value=" + cad2[0] + "]").attr("selected",true); 
        $("#commin_salida option[value=" + cad3[0] + "]").attr("selected",true); 
        $("#comtipohora_salida option[value=" + cad3[1] + "]").attr("selected",true);         

        var hi_CONDICION_SALIDA_ATEN_URGEN = $(this).attr('hi_CONDICION_SALIDA_ATEN_URGEN');
        $("#comsalpaci option[value=" + hi_CONDICION_SALIDA_ATEN_URGEN + "]").attr("selected",true);    
        id = $("#comsalpaci").find(':selected').val();
        if(id=="VIVO"){
            $('#lab14').css('display','');
            $('#comrema').css('display','');
            $("#comrema option[value=" + 0 + "]").attr("selected",true); 
        }else{
            $('#lab14').css('display','none');
            $('#comrema').css('display','none');            
            $('#lab15,#lab16,#lab17,#lab18').css('display','none');
            $('#txtremser,#txtremnom,#txtremciu,#txtcual').css('display','none');              
        }        
        
        var hi_CONDICION_REMI_SALIDA_ATEN_URGEN = $(this).attr('hi_CONDICION_REMI_SALIDA_ATEN_URGEN');
        $("#comrema option[value=" + hi_CONDICION_REMI_SALIDA_ATEN_URGEN + "]").attr("selected",true);
        id = $("#comrema").find(':selected').val();
        if(id=="4"){
            $('#lab16,#lab17,#lab18').css('display','');
            $('#txtremser,#txtremnom,#txtremciu').css('display','');
            $('#lab15').css('display','none');
            $('#txtcual').css('display','none');            
        }else{
            if(id=="5"){
                $('#lab15').css('display','');
                $('#txtcual').css('display','');
                $('#lab16,#lab17,#lab18').css('display','none');
                $('#txtremser,#txtremnom,#txtremciu').css('display','none');                  
            }else{
                $('#lab15,#lab16,#lab17,#lab18').css('display','none');
                $('#txtremser,#txtremnom,#txtremciu,#txtcual').css('display','none');            
            }            
        }
        
        
        var hi_OTRO_SALIDA_ATEN_URGEN = $(this).attr('hi_OTRO_SALIDA_ATEN_URGEN');
        $('#txtcual').val(hi_OTRO_SALIDA_ATEN_URGEN);
        var hi_SERVICIO_SALIDA_ATEN_URGEN = $(this).attr('hi_SERVICIO_SALIDA_ATEN_URGEN');
        $('#txtremser').val(hi_SERVICIO_SALIDA_ATEN_URGEN);
        var hi_NOMBRE_SALIDA = $(this).attr('hi_NOMBRE_SALIDA');
        $('#txtremnom').val(hi_NOMBRE_SALIDA);
        var hi_CIUDAD_SALIDA = $(this).attr('hi_CIUDAD_SALIDA');
        $('#txtremciu').val(hi_CIUDAD_SALIDA);
        
        var hi_HORA_ATEN_URGEN = $(this).attr('hi_HORA_ATEN_URGEN');        
        cad2=hi_HORA_ATEN_URGEN.split(":"); 
        cad3=cad2[1].split(" "); 
        $("#comhora_llegpac option[value=" + cad2[0] + "]").attr("selected",true); 
        $("#commin_llegpac option[value=" + cad3[0] + "]").attr("selected",true); 
        $("#comtipohora_llegpac option[value=" + cad3[1] + "]").attr("selected",true); 

        var hi_entidad_ATEN_URGEN = $(this).attr('hi_entidad_ATEN_URGEN');
        $('#txtentidad').val(hi_entidad_ATEN_URGEN);
        
        $('#hi_MOTIVO_CONSULTA_ATEN_URGEN').val($(this).attr('hi_MOTIVO_CONSULTA_ATEN_URGEN'));
        $('#hi_ESTADO_GENERAL_ATEN_URGEN').val($(this).attr('hi_ESTADO_GENERAL_ATEN_URGEN')) ;
        $('#hi_ENFERMEDAD_ACTUAL_ATEN_URGEN').val($(this).attr('hi_ENFERMEDAD_ACTUAL_ATEN_URGEN'));
        $('#hi_ANTECEDENTES_ATEN_URGEN').val($(this).attr('hi_ANTECEDENTES_ATEN_URGEN'));
        $('#hi_REVISION_SISTEMAS_ATEN_URGEN').val($(this).attr('hi_REVISION_SISTEMAS_ATEN_URGEN'));
        $('#hi_TA_ATEN_URGEN').val($(this).attr('hi_TA_ATEN_URGEN'));
        $('#hi_FC_ATEN_URGEN').val($(this).attr('hi_FC_ATEN_URGEN'));
        $('#hi_FR_ATEN_URGEN').val($(this).attr('hi_FR_ATEN_URGEN'));
        $('#hi_TEMP_ATEN_URGEN').val($(this).attr('hi_TEMP_ATEN_URGEN'));
        $('#hi_TALLA_ATEN_URGEN').val($(this).attr('hi_TALLA_ATEN_URGEN'));
        $('#hi_SAT02_ATEN_URGEN').val($(this).attr('hi_SAT02_ATEN_URGEN'));
        $('#hi_DESCRIPCION_EXAMEN_FISICO_ATEN_URGEN').val($(this).attr('hi_DESCRIPCION_EXAMEN_FISICO_ATEN_URGEN'));
//        $('#hi_DIAGNOSTICO_ATEN_URGEN').val($(this).attr('hi_DIAGNOSTICO_ATEN_URGEN'));
        $('#hi_CONDUCTA_ATEN_URGEN').val($(this).attr('hi_CONDUCTA_ATEN_URGEN'));
        $('#hi_PLAN_MANEJO_ATEN_URGEN').val($(this).attr('hi_PLAN_MANEJO_ATEN_URGEN'));
//        $('#hi_DX_PRESUNTIVOS_ATEN_URGEN').val($(this).attr('hi_DX_PRESUNTIVOS_ATEN_URGEN'));
        $('#hi_CONDICIONES_GENERAL_ATEN_URGEN').val($(this).attr('hi_CONDICIONES_GENERAL_ATEN_URGEN'));
        $('#hi_PLAN_AMBULATORIO_ATEN_URGEN').val($(this).attr('hi_PLAN_AMBULATORIO_ATEN_URGEN'));
        
        
        var hi_CODDIAGPPAL_ATEN_URGEN=$(this).attr('hi_CODDIAGPPAL_ATEN_URGEN');
        var hi_DIAGPPAL_ATEN_URGEN=$(this).attr('hi_DIAGPPAL_ATEN_URGEN');
        var hi_CODDIAG2_ATEN_URGEN=$(this).attr('hi_CODDIAG2_ATEN_URGEN');
        var hi_DIAG2_ATEN_URGEN=$(this).attr('hi_DIAG2_ATEN_URGEN');
        var hi_CODDIAG3_ATEN_URGEN=$(this).attr('hi_CODDIAG3_ATEN_URGEN');
        var hi_DIAG3_ATEN_URGEN=$(this).attr('hi_DIAG3_ATEN_URGEN');
        var hi_CODDIAG4_ATEN_URGEN=$(this).attr('hi_CODDIAG4_ATEN_URGEN');
        var hi_DIAG4_ATEN_URGEN=$(this).attr('hi_DIAG4_ATEN_URGEN');
        
        $('#txtcoddx1').val(hi_CODDIAGPPAL_ATEN_URGEN);
        $('#txtdesdx1').val(hi_DIAGPPAL_ATEN_URGEN);      

        if(hi_CODDIAG2_ATEN_URGEN!=""){
            $('#txtcoddx2').val(hi_CODDIAG2_ATEN_URGEN);
            $('#txtdesdx2').val(hi_DIAG2_ATEN_URGEN);
            $('#di2').css('display','inline-block');
            numdiag=numdiag+1;
        }
        if(hi_CODDIAG3_ATEN_URGEN!=""){
            $('#txtcoddx3').val(hi_CODDIAG3_ATEN_URGEN);
            $('#txtdesdx3').val(hi_DIAG3_ATEN_URGEN);     
            $('#di3').css('display','inline-block');
            numdiag=numdiag+1;
        }
        if(hi_CODDIAG4_ATEN_URGEN!=""){
            $('#txtcoddx4').val(hi_CODDIAG4_ATEN_URGEN);
            $('#txtdesdx4').val(hi_DIAG4_ATEN_URGEN);     
            $('#di4').css('display','inline-block');
            numdiag=numdiag+1;
        }
  

        var hi_CODDIAGPPAL5_ATEN_URGEN=$(this).attr('hi_CODDIAGPPAL5_ATEN_URGEN');
        var hi_DIAGPPAL5_ATEN_URGEN=$(this).attr('hi_DIAGPPAL5_ATEN_URGEN');
        var hi_CODDIAG6_ATEN_URGEN=$(this).attr('hi_CODDIAG6_ATEN_URGEN');
        var hi_DIAG6_ATEN_URGEN=$(this).attr('hi_DIAG6_ATEN_URGEN');
        var hi_CODDIAG7_ATEN_URGEN=$(this).attr('hi_CODDIAG7_ATEN_URGEN');
        var hi_DIAG7_ATEN_URGEN=$(this).attr('hi_DIAG7_ATEN_URGEN');
        var hi_CODDIAG8_ATEN_URGEN=$(this).attr('hi_CODDIAG8_ATEN_URGEN');
        var hi_DIAG8_ATEN_URGEN=$(this).attr('hi_DIAG8_ATEN_URGEN');        

        $('#txtcoddx5').val(hi_CODDIAGPPAL5_ATEN_URGEN);
        $('#txtdesdx5').val(hi_DIAGPPAL5_ATEN_URGEN);      

        if(hi_CODDIAG6_ATEN_URGEN!=""){
            $('#txtcoddx6').val(hi_CODDIAG6_ATEN_URGEN);
            $('#txtdesdx6').val(hi_DIAG6_ATEN_URGEN);
            $('#di6').css('display','inline-block');
            numdiag1=numdiag1+1;
        }
        if(hi_CODDIAG7_ATEN_URGEN!=""){
            $('#txtcoddx7').val(hi_CODDIAG7_ATEN_URGEN);
            $('#txtdesdx7').val(hi_DIAG7_ATEN_URGEN);     
            $('#di7').css('display','inline-block');
            numdiag1=numdiag1+1;
        }
        if(hi_CODDIAG8_ATEN_URGEN!=""){
            $('#txtcoddx8').val(hi_CODDIAG8_ATEN_URGEN);
            $('#txtdesdx8').val(hi_DIAG8_ATEN_URGEN);     
            $('#di8').css('display','inline-block');
            numdiag1=numdiag1+1;
        }
          
        
        
        /////////////////////////CERRAR EL POPUP////////////////////////
        $('#oscuro').css('visibility','hidden');
        $('#busqueda_atencion_urgencia').fadeOut('slow'); 
        $('#conte').css("display",'block');
        $("body").css("overflow", "auto"); 
        $('#zona_atencion').html("");
        $('#zona_atencion2').html("");
        $('#area_fecha').css('display','none');
        $('#tablafecha').css('display','none');
        $('#tfec').val("");

        $('#btn_mod').css('display','block');
        $('#btn_eli').css('display','block');
        $('#btn_imp').css('display','block');
        $('#btn_bus').css('display','none');
        $('#btn_gua').css('display','none');
        $('#btn_nue').css('display','none');
        $('#form_atencion').find('input, textarea, button, select').attr('disabled',false); 
        //$('#otro-id1').attr('id','abrir_venpaci');
        $('#abrir_venpaci').attr('id','otro-id1');
        $('#otro-id2').attr('id','abrir_ventana');    
        $("#txttipodoc, #txtdoc, #txtnompac,#txtedad,#combosex,#txttel,#txtdir,#txtmun,#comgrupoetn,#txtnomres,#txtparent,#txtdirresp,#txtnumhis").attr('disabled', true);           
        
        $('#otro-id3').attr('id','abrir_vendiagnostico');
        $('#btn_add').css('display','inline-block'); 
        $('#btn_add1').css('display','inline-block'); 
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////VALIDAR OPCIONES//////////////////////////////////////
    $("#compromed_llegpac").change(function(event){
        var id = $("#compromed_llegpac").find(':selected').val();
        if(id=="NO"){
            $('#lab1').css('display','');
            $('#txtcual_llegpac').css('display','');
        }else{
            $('#lab1').css('display','none');
            $('#txtcual_llegpac').css('display','none');            
        }
    });
    
    $("#comnotipoli").change(function(event){
        var id = $("#comnotipoli").find(':selected').val();
        if(id=="SI"){
            $('#lab2,#lab3,#lab4,#lab5').css('display','');
            $('#txtfecha_notpol,#comhora_notpol,#commin_notpol,#comtipohora_notpol').css('display','');
        }else{
            $('#lab2,#lab3,#lab4,#lab5').css('display','none');
            $('#txtfecha_notpol,#comhora_notpol,#commin_notpol,#comtipohora_notpol').css('display','none');            
        }
    });    
    
    $("#comnotifami").change(function(event){
        var id = $("#comnotifami").find(':selected').val();
        if(id=="SI"){
            $('#lab6,#lab7,#lab8,#lab9').css('display','');
            $('#txtfecha_notifami,#comhora_notifami,#commin_notifami,#comtipohora_notifami').css('display','');
        }else{
            $('#lab6,#lab7,#lab8,#lab9').css('display','none');
            $('#txtfecha_notifami,#comhora_notifami,#commin_notifami,#comtipohora_notifami').css('display','none');            
        }
    });     
    
    $("#comnotisersal").change(function(event){
        var id = $("#comnotisersal").find(':selected').val();
        if(id=="SI"){
            $('#lab10,#lab11,#lab12,#lab13').css('display','');
            $('#txtfecha_notisersal,#comhora_notisersal,#commin_notisersal,#comtipohora_notisersal').css('display','');
        }else{
            $('#lab10,#lab11,#lab12,#lab13').css('display','none');
            $('#txtfecha_notisersal,#comhora_notisersal,#commin_notisersal,#comtipohora_notisersal').css('display','none');            
        }
    });      
    
    $("#comsalpaci").change(function(event){
        var id = $("#comsalpaci").find(':selected').val();
        if(id=="VIVO"){
            $('#lab14').css('display','');
            $('#comrema').css('display','');
            $("#comrema option[value=" + 0 + "]").attr("selected",true); 
            $('#txtremser').val("");$('#txtremnom').val("");$('#txtremciu').val("");
        }else{
            $('#lab14').css('display','none');
            $('#comrema').css('display','none');            
            $('#lab15,#lab16,#lab17,#lab18').css('display','none');
            $('#txtremser,#txtremnom,#txtremciu,#txtcual').css('display','none');              
        }
    });         
    
    $("#comrema").change(function(event){
        var id = $("#comrema").find(':selected').val();
        if(id=="4"){
            $('#lab16,#lab17,#lab18').css('display','');
            $('#txtremser,#txtremnom,#txtremciu').css('display','');
            $('#lab15').css('display','none');
            $('#txtcual').css('display','none');            
        }else{
            if(id=="5"){
                $('#lab15').css('display','');
                $('#txtcual').css('display','');
                $('#lab16,#lab17,#lab18').css('display','none');
                $('#txtremser,#txtremnom,#txtremciu').css('display','none');                  
            }else{
                $('#lab15,#lab16,#lab17,#lab18').css('display','none');
                $('#txtremser,#txtremnom,#txtremciu,#txtcual').css('display','none');            
            }            
        }
    });     
    //////////////////////////////////////////////////////////////////

    ////////////////////BTN_GUARDAR//////////////////////////////////
    $('#btn_gua').live('click', function(){
        setTimeout(function(){
            if($('#txtdoc').val() == ""){
                alert('Por Favor Seleccione El Paciente..');
                $('#txtdoc').focus();
                return;				
            }
            if($('#txtfecha_llegpac').val() == ""){
                alert('Por Favor Seleccione La Fecha De Llegada Del Paciente..');
                $('#txtfecha_llegpac').focus();
                return;				
            }      
            if($('#comhora_llegpac').val() == "0"){
                alert('Por Favor Seleccione La Hora De Llegada Del Paciente..');
                $('#comhora_llegpac').focus();
                return;				
            }              
            if($('#commin_llegpac').val() == "0"){
                alert('Por Favor Seleccione Los Minutos De Llegada Del Paciente..');
                $('#commin_llegpac').focus();
                return;				
            }               
            if($('#comest_llegpac').val() == "0"){
                alert('Por Favor Seleccione El Estado En Que Llego El Paciente..');
                $('#comest_llegpac').focus();
                return;				
            }  
            
            var id1 = $("#comnotipoli").find(':selected').val();
            if(id1=='SI'){
                if($('#txtfecha_notpol').val() == ""){
                    alert('Por Favor Seleccione La Fecha De Notificacion A La Policia..');
                    $('#txtfecha_notpol').focus();
                    return;				
                }   
                if($('#comhora_notpol').val() == "0"){
                    alert('Por Favor Seleccione La Hora De Notificacion A La Policia..');
                    $('#comhora_notpol').focus();
                    return;				
                }  
                if($('#commin_notpol').val() == "0"){
                    alert('Por Favor Seleccione Los Minutos De Notificacion A La Policia..');
                    $('#commin_notpol').focus();
                    return;				
                }                                                
            }
            
            var id2 = $("#comnotifami").find(':selected').val();            
            if(id2=='SI'){
                if($('#txtfecha_notifami').val() == ""){
                    alert('Por Favor Seleccione La Fecha De Notificacion A Los Familiares..');
                    $('#txtfecha_notifami').focus();
                    return;				
                }   
                if($('#comhora_notifami').val() == "0"){
                    alert('Por Favor Seleccione La Hora De Notificacion A Los Familiares..');
                    $('#comhora_notifami').focus();
                    return;				
                }  
                if($('#commin_notifami').val() == "0"){
                    alert('Por Favor Seleccione Los Minutos De Notificacion A Los Familiares..');
                    $('#commin_notifami').focus();
                    return;				
                }                                                
            }            

            var id3 = $("#comnotisersal").find(':selected').val();            
            if(id3=='SI'){
                if($('#txtfecha_notisersal').val() == ""){
                    alert('Por Favor Seleccione La Fecha De Notificacion Al Servicio De Salud..');
                    $('#txtfecha_notisersal').focus();
                    return;				
                }   
                if($('#comhora_notisersal').val() == "0"){
                    alert('Por Favor Seleccione La Hora De Notificacion Al Servicio De Salud..');
                    $('#comhora_notisersal').focus();
                    return;				
                }  
                if($('#commin_notisersal').val() == "0"){
                    alert('Por Favor Seleccione Los Minutos De Notificacion Al Servicio De Salud..');
                    $('#commin_notisersal').focus();
                    return;				
                }                                                
            }            

            var datos={
                opcion: "guardar",
                hi_FECHA_ATEN_URGEN: $('#txtfecha_llegpac').val(),
                hi_MEDIOS_PROPIOS_ATEN_URGEN: $('#compromed_llegpac').val(),
                hi_CUAL_ATEN_URGEN: $('#txtcual_llegpac').val().toUpperCase(),
                hi_ESTADO_PACIENTE_ATEN_URGEN: $('#comest_llegpac').val(),
                hi_NOMBRE_ACOMP_ACTUAL_ATEN_URGEN: $('#txtnomacomp_llegpac').val().toUpperCase(),            
                hi_DIRECCION_ACOMP_ACTUAL_ATEN_URGEN: $('#txtdiracomp_llegpac').val().toUpperCase(),
                hi_MUNICIPIO_ACOMP_ACTUAL_ATEN_URGEN: $('#txtmunacomp_llegpac').val().toUpperCase(),
                hi_DEPARTAMENTO_ACOMP_ACTUAL_ATEN_URGEN: $('#txtdepacomp_llegpac').val().toUpperCase(),
                hi_TELEFONO_ACOMP_ACTUAL_ATEN_URGEN: $('#txttelacomp_llegpac').val().toUpperCase(),
                hi_FECHA_EN_CASO_ATEN_URGEN: $('#txtfecha_concu').val().toUpperCase(),
                hi_HORA_EN_CASO_ATEN_URGEN: $('#comhora_concu').val() +":"+ $('#commin_concu').val() + " " +$('#comtipohora_concu').val(),
                hi_SITIO_EN_CASO_ATEN_URGEN: $('#txtsitio_concu').val().toUpperCase(),
                hi_CAUSA_EN_CASO_ATEN_URGEN: $('#txtcausa_concu').val().toUpperCase(),
                hi_NOT_POL_ATEN_URGEN: $('#comnotipoli').val(),
                hi_FECHA_NOT_POL_ATEN_URGEN: $('#txtfecha_notpol').val(),
                hi_HORA_NOT_POL_ATEN_URGEN: $('#comhora_notpol').val()+":"+$('#commin_notpol').val()+" "+$('#comtipohora_notpol').val(),
                hi_NOT_FAM_ATEN_URGEN: $('#comnotifami').val(),
                hi_FECHA_NOT_FAM_ATEN_URGEN: $('#txtfecha_notifami').val(),
                hi_HORA_NOT_FAM_ATEN_URGEN: $('#comhora_notifami').val()+":"+$('#commin_notifami').val()+" "+$('#comtipohora_notifami').val(),
                hi_NOT_SER_ATEN_URGEN: $('#comnotisersal').val(),
                hi_FECHA_NOT_SER_ATEN_URGEN: $('#txtfecha_notisersal').val(),
                hi_HORA_NOT_SER_ATEN_URGEN: $('#comhora_notisersal').val()+":"+$('#commin_notisersal').val()+" "+$('#comtipohora_notisersal').val(),
                hi_FECHA_SALIDA_ATEN_URGEN: $('#txtfecha_salida').val(),
                hi_HORA_SALIDA_ATEN_URGEN: $('#comhora_salida').val()+":"+$('#commin_salida').val()+" "+$('#comtipohora_salida').val(),
                hi_CONDICION_SALIDA_ATEN_URGEN: $('#comsalpaci').val().toUpperCase(),
                hi_CONDICION_REMI_SALIDA_ATEN_URGEN: $('#comrema').val(),
                hi_OTRO_SALIDA_ATEN_URGEN: $('#txtcual').val().toUpperCase(),
                hi_SERVICIO_SALIDA_ATEN_URGEN: $('#txtremser').val().toUpperCase(),
                hi_NOMBRE_SALIDA: $('#txtremnom').val().toUpperCase(),
                hi_CIUDAD_SALIDA: $('#txtremciu').val().toUpperCase(),
                hi_N_HISTORIA:$('#txtnumhis').val(),
                hi_ESTADO: "ACTIVO",
                id_paciente: id_paciente, 
                ident_paciente: ident_paciente,
                hi_HORA_ATEN_URGEN: $('#comhora_llegpac').val()+":"+$('#commin_llegpac').val()+" "+$('#comtipohora_llegpac').val(),
                hi_entidad_ATEN_URGEN:  $('#txtentidad').val().toUpperCase(),
                
                hi_MOTIVO_CONSULTA_ATEN_URGEN:  $('#hi_MOTIVO_CONSULTA_ATEN_URGEN').val().toUpperCase(),
                hi_ESTADO_GENERAL_ATEN_URGEN:  $('#hi_ESTADO_GENERAL_ATEN_URGEN').val().toUpperCase(),
                hi_ENFERMEDAD_ACTUAL_ATEN_URGEN:  $('#hi_ENFERMEDAD_ACTUAL_ATEN_URGEN').val().toUpperCase(),
                hi_ANTECEDENTES_ATEN_URGEN:  $('#hi_ANTECEDENTES_ATEN_URGEN').val().toUpperCase(),
                hi_REVISION_SISTEMAS_ATEN_URGEN:  $('#hi_REVISION_SISTEMAS_ATEN_URGEN').val().toUpperCase(),
                hi_TA_ATEN_URGEN:  $('#hi_TA_ATEN_URGEN').val().toUpperCase(),
                hi_FC_ATEN_URGEN:  $('#hi_FC_ATEN_URGEN').val().toUpperCase(),
                hi_FR_ATEN_URGEN:  $('#hi_FR_ATEN_URGEN').val().toUpperCase(),
                hi_TEMP_ATEN_URGEN:  $('#hi_TEMP_ATEN_URGEN').val().toUpperCase(),
                hi_TALLA_ATEN_URGEN:  $('#hi_TALLA_ATEN_URGEN').val().toUpperCase(),
                hi_SAT02_ATEN_URGEN:  $('#hi_SAT02_ATEN_URGEN').val().toUpperCase(),
                hi_DESCRIPCION_EXAMEN_FISICO_ATEN_URGEN:  $('#hi_DESCRIPCION_EXAMEN_FISICO_ATEN_URGEN').val().toUpperCase(),
//                hi_DIAGNOSTICO_ATEN_URGEN:  $('#hi_DIAGNOSTICO_ATEN_URGEN').val().toUpperCase(),
                hi_CONDUCTA_ATEN_URGEN:  $('#hi_CONDUCTA_ATEN_URGEN').val().toUpperCase(),
                hi_PLAN_MANEJO_ATEN_URGEN:  $('#hi_PLAN_MANEJO_ATEN_URGEN').val().toUpperCase(),
//                hi_DX_PRESUNTIVOS_ATEN_URGEN:  $('#hi_DX_PRESUNTIVOS_ATEN_URGEN').val().toUpperCase(),
                hi_CONDICIONES_GENERAL_ATEN_URGEN:  $('#hi_CONDICIONES_GENERAL_ATEN_URGEN').val().toUpperCase(),
                hi_PLAN_AMBULATORIO_ATEN_URGEN:  $('#hi_PLAN_AMBULATORIO_ATEN_URGEN').val().toUpperCase(),
                
                hi_CODDIAGPPAL_ATEN_URGEN:  $('#txtcoddx1').val().toUpperCase(),
                hi_DIAGPPAL_ATEN_URGEN:  $('#txtdesdx1').val().toUpperCase(),
                hi_CODDIAG2_ATEN_URGEN:  $('#txtcoddx2').val().toUpperCase(),
                hi_DIAG2_ATEN_URGEN:  $('#txtdesdx2').val().toUpperCase(),
                hi_CODDIAG3_ATEN_URGEN:  $('#txtcoddx3').val().toUpperCase(),
                hi_DIAG3_ATEN_URGEN:  $('#txtdesdx3').val().toUpperCase(),
                hi_CODDIAG4_ATEN_URGEN:  $('#txtcoddx4').val().toUpperCase(),
                hi_DIAG4_ATEN_URGEN:  $('#txtdesdx4').val().toUpperCase(),
                
                
                hi_CODDIAGPPAL5_ATEN_URGEN:  $('#txtcoddx5').val().toUpperCase(),
                hi_DIAGPPAL5_ATEN_URGEN:  $('#txtdesdx5').val().toUpperCase(),
                hi_CODDIAG6_ATEN_URGEN:  $('#txtcoddx6').val().toUpperCase(),
                hi_DIAG6_ATEN_URGEN:  $('#txtdesdx6').val().toUpperCase(),
                hi_CODDIAG7_ATEN_URGEN:  $('#txtcoddx7').val().toUpperCase(),
                hi_DIAG7_ATEN_URGEN:  $('#txtdesdx7').val().toUpperCase(),
                hi_CODDIAG8_ATEN_URGEN:  $('#txtcoddx8').val().toUpperCase(),
                hi_DIAG8_ATEN_URGEN:  $('#txtdesdx8').val().toUpperCase()                
            }
            if(confirm("¿DESEA GUARDAR LOS DATOS?")){
                $.ajax({
                    type: "POST",
                    url: "../gestionar_atenurgencias",
                    data: datos,
                    success: function(data){
                        if(data==1){
                            alert('DATOS GUARDADOS DE MANERA EXITOSA...');
                            setTimeout(function(){
                                window.location.href = "../ges_ateurg";		
                            },1000);                          
                        }                    
                    },
                    error: function(error_messages){
                        alert('HA OCURRIDO UN ERROR');
                    }
                });                        
            }
        },500);
        
    }); 
    //////////////////////////////////////////////////////////////
    $('#btn_mod').live('click', function(){
        setTimeout(function(){
            if($('#txtdoc').val() == ""){
                alert('Por Favor Seleccione El Paciente..');
                $('#txtdoc').focus();
                return;				
            }
            if($('#txtfecha_llegpac').val() == ""){
                alert('Por Favor Seleccione La Fecha De Llegada Del Paciente..');
                $('#txtfecha_llegpac').focus();
                return;				
            }      
            if($('#comhora_llegpac').val() == "0"){
                alert('Por Favor Seleccione La Hora De Llegada Del Paciente..');
                $('#comhora_llegpac').focus();
                return;				
            }              
            if($('#commin_llegpac').val() == "0"){
                alert('Por Favor Seleccione Los Minutos De Llegada Del Paciente..');
                $('#commin_llegpac').focus();
                return;				
            }               
            if($('#comest_llegpac').val() == "0"){
                alert('Por Favor Seleccione El Estado En Que Llego El Paciente..');
                $('#comest_llegpac').focus();
                return;				
            }  
            
            var id1 = $("#comnotipoli").find(':selected').val();
            if(id1=='SI'){
                if($('#txtfecha_notpol').val() == ""){
                    alert('Por Favor Seleccione La Fecha De Notificacion A La Policia..');
                    $('#txtfecha_notpol').focus();
                    return;				
                }   
                if($('#comhora_notpol').val() == "0"){
                    alert('Por Favor Seleccione La Hora De Notificacion A La Policia..');
                    $('#comhora_notpol').focus();
                    return;				
                }  
                if($('#commin_notpol').val() == "0"){
                    alert('Por Favor Seleccione Los Minutos De Notificacion A La Policia..');
                    $('#commin_notpol').focus();
                    return;				
                }                                                
            }
            
            var id2 = $("#comnotifami").find(':selected').val();            
            if(id2=='SI'){
                if($('#txtfecha_notifami').val() == ""){
                    alert('Por Favor Seleccione La Fecha De Notificacion A Los Familiares..');
                    $('#txtfecha_notifami').focus();
                    return;				
                }   
                if($('#comhora_notifami').val() == "0"){
                    alert('Por Favor Seleccione La Hora De Notificacion A Los Familiares..');
                    $('#comhora_notifami').focus();
                    return;				
                }  
                if($('#commin_notifami').val() == "0"){
                    alert('Por Favor Seleccione Los Minutos De Notificacion A Los Familiares..');
                    $('#commin_notifami').focus();
                    return;				
                }                                                
            }            

            var id3 = $("#comnotisersal").find(':selected').val();            
            if(id3=='SI'){
                if($('#txtfecha_notisersal').val() == ""){
                    alert('Por Favor Seleccione La Fecha De Notificacion Al Servicio De Salud..');
                    $('#txtfecha_notisersal').focus();
                    return;				
                }   
                if($('#comhora_notisersal').val() == "0"){
                    alert('Por Favor Seleccione La Hora De Notificacion Al Servicio De Salud..');
                    $('#comhora_notisersal').focus();
                    return;				
                }  
                if($('#commin_notisersal').val() == "0"){
                    alert('Por Favor Seleccione Los Minutos De Notificacion Al Servicio De Salud..');
                    $('#commin_notisersal').focus();
                    return;				
                }                                                
            }            

            var datos={
                opcion: "modificar",
                hi_FECHA_ATEN_URGEN: $('#txtfecha_llegpac').val(),
                hi_MEDIOS_PROPIOS_ATEN_URGEN: $('#compromed_llegpac').val(),
                hi_CUAL_ATEN_URGEN: $('#txtcual_llegpac').val().toUpperCase(),
                hi_ESTADO_PACIENTE_ATEN_URGEN: $('#comest_llegpac').val(),
                hi_NOMBRE_ACOMP_ACTUAL_ATEN_URGEN: $('#txtnomacomp_llegpac').val().toUpperCase(),            
                hi_DIRECCION_ACOMP_ACTUAL_ATEN_URGEN: $('#txtdiracomp_llegpac').val().toUpperCase(),
                hi_MUNICIPIO_ACOMP_ACTUAL_ATEN_URGEN: $('#txtmunacomp_llegpac').val().toUpperCase(),
                hi_DEPARTAMENTO_ACOMP_ACTUAL_ATEN_URGEN: $('#txtdepacomp_llegpac').val().toUpperCase(),
                hi_TELEFONO_ACOMP_ACTUAL_ATEN_URGEN: $('#txttelacomp_llegpac').val().toUpperCase(),
                hi_FECHA_EN_CASO_ATEN_URGEN: $('#txtfecha_concu').val().toUpperCase(),
                hi_HORA_EN_CASO_ATEN_URGEN: $('#comhora_concu').val() +":"+ $('#commin_concu').val() + " " +$('#comtipohora_concu').val(),
                hi_SITIO_EN_CASO_ATEN_URGEN: $('#txtsitio_concu').val().toUpperCase(),
                hi_CAUSA_EN_CASO_ATEN_URGEN: $('#txtcausa_concu').val().toUpperCase(),
                hi_NOT_POL_ATEN_URGEN: $('#comnotipoli').val(),
                hi_FECHA_NOT_POL_ATEN_URGEN: $('#txtfecha_notpol').val(),
                hi_HORA_NOT_POL_ATEN_URGEN: $('#comhora_notpol').val()+":"+$('#commin_notpol').val()+" "+$('#comtipohora_notpol').val(),
                hi_NOT_FAM_ATEN_URGEN: $('#comnotifami').val(),
                hi_FECHA_NOT_FAM_ATEN_URGEN: $('#txtfecha_notifami').val(),
                hi_HORA_NOT_FAM_ATEN_URGEN: $('#comhora_notifami').val()+":"+$('#commin_notifami').val()+" "+$('#comtipohora_notifami').val(),
                hi_NOT_SER_ATEN_URGEN: $('#comnotisersal').val(),
                hi_FECHA_NOT_SER_ATEN_URGEN: $('#txtfecha_notisersal').val(),
                hi_HORA_NOT_SER_ATEN_URGEN: $('#comhora_notisersal').val()+":"+$('#commin_notisersal').val()+" "+$('#comtipohora_notisersal').val(),

                hi_FECHA_SALIDA_ATEN_URGEN: $('#txtfecha_salida').val(),
                hi_HORA_SALIDA_ATEN_URGEN: $('#comhora_salida').val()+":"+$('#commin_salida').val()+" "+$('#comtipohora_salida').val(),
                hi_CONDICION_SALIDA_ATEN_URGEN: $('#comsalpaci').val().toUpperCase(),
                hi_CONDICION_REMI_SALIDA_ATEN_URGEN: $('#comrema').val(),
                hi_OTRO_SALIDA_ATEN_URGEN: $('#txtcual').val().toUpperCase(),
                hi_SERVICIO_SALIDA_ATEN_URGEN: $('#txtremser').val().toUpperCase(),
                hi_NOMBRE_SALIDA: $('#txtremnom').val().toUpperCase(),
                hi_CIUDAD_SALIDA: $('#txtremciu').val().toUpperCase(),
                hi_N_HISTORIA:$('#txtnumhis').val(),
                hi_ESTADO: "ACTIVO",
                id_paciente: id_paciente, 
                ident_paciente: ident_paciente,
                hi_ID_ATEN_URGEN: hi_ID_ATEN_URGEN,
                hi_HORA_ATEN_URGEN: $('#comhora_llegpac').val()+":"+$('#commin_llegpac').val()+" "+$('#comtipohora_llegpac').val(),
                hi_entidad_ATEN_URGEN:  $('#txtentidad').val().toUpperCase(),
                
                
                hi_MOTIVO_CONSULTA_ATEN_URGEN:  $('#hi_MOTIVO_CONSULTA_ATEN_URGEN').val().toUpperCase(),
                hi_ESTADO_GENERAL_ATEN_URGEN:  $('#hi_ESTADO_GENERAL_ATEN_URGEN').val().toUpperCase(),
                hi_ENFERMEDAD_ACTUAL_ATEN_URGEN:  $('#hi_ENFERMEDAD_ACTUAL_ATEN_URGEN').val().toUpperCase(),
                hi_ANTECEDENTES_ATEN_URGEN:  $('#hi_ANTECEDENTES_ATEN_URGEN').val().toUpperCase(),
                hi_REVISION_SISTEMAS_ATEN_URGEN:  $('#hi_REVISION_SISTEMAS_ATEN_URGEN').val().toUpperCase(),
                hi_TA_ATEN_URGEN:  $('#hi_TA_ATEN_URGEN').val().toUpperCase(),
                hi_FC_ATEN_URGEN:  $('#hi_FC_ATEN_URGEN').val().toUpperCase(),
                hi_FR_ATEN_URGEN:  $('#hi_FR_ATEN_URGEN').val().toUpperCase(),
                hi_TEMP_ATEN_URGEN:  $('#hi_TEMP_ATEN_URGEN').val().toUpperCase(),
                hi_TALLA_ATEN_URGEN:  $('#hi_TALLA_ATEN_URGEN').val().toUpperCase(),
                hi_SAT02_ATEN_URGEN:  $('#hi_SAT02_ATEN_URGEN').val().toUpperCase(),
                hi_DESCRIPCION_EXAMEN_FISICO_ATEN_URGEN:  $('#hi_DESCRIPCION_EXAMEN_FISICO_ATEN_URGEN').val().toUpperCase(),
//                hi_DIAGNOSTICO_ATEN_URGEN:  $('#hi_DIAGNOSTICO_ATEN_URGEN').val().toUpperCase(),
                hi_CONDUCTA_ATEN_URGEN:  $('#hi_CONDUCTA_ATEN_URGEN').val().toUpperCase(),
                hi_PLAN_MANEJO_ATEN_URGEN:  $('#hi_PLAN_MANEJO_ATEN_URGEN').val().toUpperCase(),
//                hi_DX_PRESUNTIVOS_ATEN_URGEN:  $('#hi_DX_PRESUNTIVOS_ATEN_URGEN').val().toUpperCase(),
                hi_CONDICIONES_GENERAL_ATEN_URGEN:  $('#hi_CONDICIONES_GENERAL_ATEN_URGEN').val().toUpperCase(),
                hi_PLAN_AMBULATORIO_ATEN_URGEN:  $('#hi_PLAN_AMBULATORIO_ATEN_URGEN').val().toUpperCase(),
                
                hi_CODDIAGPPAL_ATEN_URGEN:  $('#txtcoddx1').val().toUpperCase(),
                hi_DIAGPPAL_ATEN_URGEN:  $('#txtdesdx1').val().toUpperCase(),
                hi_CODDIAG2_ATEN_URGEN:  $('#txtcoddx2').val().toUpperCase(),
                hi_DIAG2_ATEN_URGEN:  $('#txtdesdx2').val().toUpperCase(),
                hi_CODDIAG3_ATEN_URGEN:  $('#txtcoddx3').val().toUpperCase(),
                hi_DIAG3_ATEN_URGEN:  $('#txtdesdx3').val().toUpperCase(),
                hi_CODDIAG4_ATEN_URGEN:  $('#txtcoddx4').val().toUpperCase(),
                hi_DIAG4_ATEN_URGEN:  $('#txtdesdx4').val().toUpperCase(),
                
                
                hi_CODDIAGPPAL5_ATEN_URGEN:  $('#txtcoddx5').val().toUpperCase(),
                hi_DIAGPPAL5_ATEN_URGEN:  $('#txtdesdx5').val().toUpperCase(),
                hi_CODDIAG6_ATEN_URGEN:  $('#txtcoddx6').val().toUpperCase(),
                hi_DIAG6_ATEN_URGEN:  $('#txtdesdx6').val().toUpperCase(),
                hi_CODDIAG7_ATEN_URGEN:  $('#txtcoddx7').val().toUpperCase(),
                hi_DIAG7_ATEN_URGEN:  $('#txtdesdx7').val().toUpperCase(),
                hi_CODDIAG8_ATEN_URGEN:  $('#txtcoddx8').val().toUpperCase(),
                hi_DIAG8_ATEN_URGEN:  $('#txtdesdx8').val().toUpperCase()                  
                
            }
            if(confirm("¿DESEA MODIFICAR LOS DATOS?")){
                $.ajax({
                    type: "POST",
                    url: "../gestionar_atenurgencias",
                    data: datos,
                    success: function(data){
                        if(data==1){
                            alert('DATOS MODIFICADOS DE MANERA EXITOSA...');
                            setTimeout(function(){
                                window.location.href = "../ges_ateurg";		
                            },1000);                          
                        }                    
                    },
                    error: function(error_messages){
                        alert('HA OCURRIDO UN ERROR');
                    }
                });   
            }
        },500);
    }); 
    //////////////////////////////////////////////////////////////
    $('#btn_eli').live('click', function(){
        setTimeout(function(){
            var datos={
                opcion: "eliminar",
                hi_FECHA_ATEN_URGEN: $('#txtfecha_llegpac').val(),
                hi_MEDIOS_PROPIOS_ATEN_URGEN: $('#compromed_llegpac').val(),
                hi_CUAL_ATEN_URGEN: $('#txtcual_llegpac').val().toUpperCase(),
                hi_ESTADO_PACIENTE_ATEN_URGEN: $('#comest_llegpac').val(),
                hi_NOMBRE_ACOMP_ACTUAL_ATEN_URGEN: $('#txtnomacomp_llegpac').val().toUpperCase(),            
                hi_DIRECCION_ACOMP_ACTUAL_ATEN_URGEN: $('#txtdiracomp_llegpac').val().toUpperCase(),
                hi_MUNICIPIO_ACOMP_ACTUAL_ATEN_URGEN: $('#txtmunacomp_llegpac').val().toUpperCase(),
                hi_DEPARTAMENTO_ACOMP_ACTUAL_ATEN_URGEN: $('#txtdepacomp_llegpac').val().toUpperCase(),
                hi_TELEFONO_ACOMP_ACTUAL_ATEN_URGEN: $('#txttelacomp_llegpac').val().toUpperCase(),
                hi_FECHA_EN_CASO_ATEN_URGEN: $('#txtfecha_concu').val().toUpperCase(),
                hi_HORA_EN_CASO_ATEN_URGEN: $('#comhora_concu').val() +":"+ $('#commin_concu').val() + " " +$('#comtipohora_concu').val(),
                hi_SITIO_EN_CASO_ATEN_URGEN: $('#txtsitio_concu').val().toUpperCase(),
                hi_CAUSA_EN_CASO_ATEN_URGEN: $('#txtcausa_concu').val().toUpperCase(),
                hi_NOT_POL_ATEN_URGEN: $('#comnotipoli').val(),
                hi_FECHA_NOT_POL_ATEN_URGEN: $('#txtfecha_notpol').val(),
                hi_HORA_NOT_POL_ATEN_URGEN: $('#comhora_notpol').val()+":"+$('#commin_notpol').val()+" "+$('#comtipohora_notpol').val(),
                hi_NOT_FAM_ATEN_URGEN: $('#comnotifami').val(),
                hi_FECHA_NOT_FAM_ATEN_URGEN: $('#txtfecha_notifami').val(),
                hi_HORA_NOT_FAM_ATEN_URGEN: $('#comhora_notifami').val()+":"+$('#commin_notifami').val()+" "+$('#comtipohora_notifami').val(),
                hi_NOT_SER_ATEN_URGEN: $('#comnotisersal').val(),
                hi_FECHA_NOT_SER_ATEN_URGEN: $('#txtfecha_notisersal').val(),
                hi_HORA_NOT_SER_ATEN_URGEN: $('#comhora_notisersal').val()+":"+$('#commin_notisersal').val()+" "+$('#comtipohora_notisersal').val(),
                hi_FECHA_SALIDA_ATEN_URGEN: $('#txtfecha_salida').val(),
                hi_HORA_SALIDA_ATEN_URGEN: $('#comhora_salida').val()+":"+$('#commin_salida').val()+" "+$('#comtipohora_salida').val(),
                hi_CONDICION_SALIDA_ATEN_URGEN: $('#comsalpaci').val().toUpperCase(),
                hi_CONDICION_REMI_SALIDA_ATEN_URGEN: $('#comrema').val(),
                hi_OTRO_SALIDA_ATEN_URGEN: $('#txtcual').val().toUpperCase(),
                hi_SERVICIO_SALIDA_ATEN_URGEN: $('#txtremser').val().toUpperCase(),
                hi_NOMBRE_SALIDA: $('#txtremnom').val().toUpperCase(),
                hi_CIUDAD_SALIDA: $('#txtremciu').val().toUpperCase(),
                hi_N_HISTORIA:$('#txtnumhis').val(),
                hi_ESTADO: "INACTIVO",
                id_paciente: id_paciente, 
                ident_paciente: ident_paciente,
                hi_ID_ATEN_URGEN: hi_ID_ATEN_URGEN,
                hi_HORA_ATEN_URGEN: $('#comhora_llegpac').val()+":"+$('#commin_llegpac').val()+" "+$('#comtipohora_llegpac').val(),
                hi_entidad_ATEN_URGEN:  $('#txtentidad').val().toUpperCase(),
                hi_MOTIVO_CONSULTA_ATEN_URGEN:  $('#hi_MOTIVO_CONSULTA_ATEN_URGEN').val().toUpperCase(),
                hi_ESTADO_GENERAL_ATEN_URGEN:  $('#hi_ESTADO_GENERAL_ATEN_URGEN').val().toUpperCase(),
                hi_ENFERMEDAD_ACTUAL_ATEN_URGEN:  $('#hi_ENFERMEDAD_ACTUAL_ATEN_URGEN').val().toUpperCase(),
                hi_ANTECEDENTES_ATEN_URGEN:  $('#hi_ANTECEDENTES_ATEN_URGEN').val().toUpperCase(),
                hi_REVISION_SISTEMAS_ATEN_URGEN:  $('#hi_REVISION_SISTEMAS_ATEN_URGEN').val().toUpperCase(),
                hi_TA_ATEN_URGEN:  $('#hi_TA_ATEN_URGEN').val().toUpperCase(),
                hi_FC_ATEN_URGEN:  $('#hi_FC_ATEN_URGEN').val().toUpperCase(),
                hi_FR_ATEN_URGEN:  $('#hi_FR_ATEN_URGEN').val().toUpperCase(),
                hi_TEMP_ATEN_URGEN:  $('#hi_TEMP_ATEN_URGEN').val().toUpperCase(),
                hi_TALLA_ATEN_URGEN:  $('#hi_TALLA_ATEN_URGEN').val().toUpperCase(),
                hi_SAT02_ATEN_URGEN:  $('#hi_SAT02_ATEN_URGEN').val().toUpperCase(),
                hi_DESCRIPCION_EXAMEN_FISICO_ATEN_URGEN:  $('#hi_DESCRIPCION_EXAMEN_FISICO_ATEN_URGEN').val().toUpperCase(),
//                hi_DIAGNOSTICO_ATEN_URGEN:  $('#hi_DIAGNOSTICO_ATEN_URGEN').val().toUpperCase(),
                hi_CONDUCTA_ATEN_URGEN:  $('#hi_CONDUCTA_ATEN_URGEN').val().toUpperCase(),
                hi_PLAN_MANEJO_ATEN_URGEN:  $('#hi_PLAN_MANEJO_ATEN_URGEN').val().toUpperCase(),
//                hi_DX_PRESUNTIVOS_ATEN_URGEN:  $('#hi_DX_PRESUNTIVOS_ATEN_URGEN').val().toUpperCase(),
                hi_CONDICIONES_GENERAL_ATEN_URGEN:  $('#hi_CONDICIONES_GENERAL_ATEN_URGEN').val().toUpperCase(),
                hi_PLAN_AMBULATORIO_ATEN_URGEN:  $('#hi_PLAN_AMBULATORIO_ATEN_URGEN').val().toUpperCase(),
                
                hi_CODDIAGPPAL_ATEN_URGEN:  $('#txtcoddx1').val().toUpperCase(),
                hi_DIAGPPAL_ATEN_URGEN:  $('#txtdesdx1').val().toUpperCase(),
                hi_CODDIAG2_ATEN_URGEN:  $('#txtcoddx2').val().toUpperCase(),
                hi_DIAG2_ATEN_URGEN:  $('#txtdesdx2').val().toUpperCase(),
                hi_CODDIAG3_ATEN_URGEN:  $('#txtcoddx3').val().toUpperCase(),
                hi_DIAG3_ATEN_URGEN:  $('#txtdesdx3').val().toUpperCase(),
                hi_CODDIAG4_ATEN_URGEN:  $('#txtcoddx4').val().toUpperCase(),
                hi_DIAG4_ATEN_URGEN:  $('#txtdesdx4').val().toUpperCase(),
                
                hi_CODDIAGPPAL5_ATEN_URGEN:  $('#txtcoddx5').val().toUpperCase(),
                hi_DIAGPPAL5_ATEN_URGEN:  $('#txtdesdx5').val().toUpperCase(),
                hi_CODDIAG6_ATEN_URGEN:  $('#txtcoddx6').val().toUpperCase(),
                hi_DIAG6_ATEN_URGEN:  $('#txtdesdx6').val().toUpperCase(),
                hi_CODDIAG7_ATEN_URGEN:  $('#txtcoddx7').val().toUpperCase(),
                hi_DIAG7_ATEN_URGEN:  $('#txtdesdx7').val().toUpperCase(),
                hi_CODDIAG8_ATEN_URGEN:  $('#txtcoddx8').val().toUpperCase(),
                hi_DIAG8_ATEN_URGEN:  $('#txtdesdx8').val().toUpperCase()                  
            }
            if(confirm("¿DESEA ELIMINAR LOS DATOS?")){
                $.ajax({
                    type: "POST",
                    url: "../gestionar_atenurgencias",
                    data: datos,
                    success: function(data){
                        if(data==1){
                            alert('DATOS ELIMINADOS DE MANERA EXITOSA...');
                            setTimeout(function(){
                                window.location.href = "../ges_ateurg";		
                            },1000);                          
                        }                    
                    },
                    error: function(error_messages){
                        alert('HA OCURRIDO UN ERROR');
                    }
                });  
            }
        },500);
    });    
    
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
            
            if(opc==5){
                $('#txtcoddx5').val(cadena[0]);
                $('#txtdesdx5').val(cadena[1]);   
            }   
            if(opc==6){
                $('#txtcoddx6').val(cadena[0]);
                $('#txtdesdx6').val(cadena[1]);   
            }   
            if(opc==7){
                $('#txtcoddx7').val(cadena[0]);
                $('#txtdesdx7').val(cadena[1]);   
            }   
            if(opc==8){
                $('#txtcoddx8').val(cadena[0]);
                $('#txtdesdx8').val(cadena[1]);   
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
    
    $('#btn_add1').live('click', function(){
        if(numdiag1<=8){
            numdiag1=numdiag1+1;
            $('#di'+numdiag1).css('display','inline-block');
        }        
    });
    //**************************************************//        
    
    //******************BTN IMPRIMIR**********************//
    $('#btn_imp').live('click',function(){
        var datos={
            hi_ID_ATEN_URGEN: hi_ID_ATEN_URGEN,
            id_paciente: id_paciente,
            ident_paciente: ident_paciente
        }
        $.ajax({
            type: "POST",
            url: "../imp_aten_urg",
            data: datos,
            success: function(data){
                alert('Reporte generado..');
                window.open('../reportes/ATENCION_URGENCIAS.pdf', 'Historias Clinicas', data);
//                    setTimeout(function(){
//                        window.location.href = "../ges_ateurg";		
//                    },1000);                          
//                }                    
            },
            error: function(error_messages){
                alert('HA OCURRIDO UN ERROR');
            }

        });
    });
    //****************************************************//    
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