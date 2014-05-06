$(document).ready(function() {  
    //////////////////VARIABLES GLOBALES///////////////////////////////////////////////////
    var id_paciente;
    var ident_paciente;
    var hi_ID_MAN_MEDICA;
    var cod_med;
    var nom_med;
    var camponuevo = 0;
    var subto=0;
    var total=0;
    var vacia=1;
    var cuantos=0;
    var vector=new Array();
    var numdiag=1;
    
    ////////////////////////////////////////////////////////////////////////////////////
    //////////////////////INICIALIZAR OBJETOS//////////////////////////////////////////////////////////////////////////
    $('#form_manejo').find('input, textarea, button, select').attr('disabled','disabled'); 
    $('#abrir_venpaci').attr('id','otro-id1');
    $('#abrir_venmed').attr('id','otro-id2');
    $("#txtcantidad,#txtvalor").numeric({decimal: false, negative: false}, function() {this.value = "";this.focus();});
//    $("#txtdiag").autoResize();
//    $("#txtdiag").css("height","20px");    
    $("#txtelepro").autoResize();
    $("#txtelepro").css("height","20px");    
    
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
        $('#form_manejo').find('input, textarea, button, select').attr('disabled',false); 
        $('#otro-id1').attr('id','abrir_venpaci');                
        $('#txtdoc').focus();
        $('#txtvalor').attr('disabled',true);
        $('#txttotal').attr('disabled',true);
        $('#txtcantidad').attr('disabled',true);
        $('#btn_add').css('display','inline-block');        
        $('#otro-id2').attr('id','abrir_venmed');
        $('#otro-id3').attr('id','abrir_vendiagnostico'); 
        $('#btn_add1').css('display','inline-block');  
    });        
    ////////////////////BTN_CANCELAR//////////////////////////////////
    $('#btn_can').live('click', function(){
        setTimeout(function(){
            window.location.href = "../ges_manejo_medica";								 							
	}, 300);        
    });    
    ///////////////////////////////////////////////////////////////////////////    
    /////////////////////////////////MANEJO HORA/////////////////////////////////          
    $("#comhora").change(function(event){
        var h = $("#comhora").find(':selected').val();
        var m = $("#commin").find(':selected').val();
        tipo="am";
        if(h>12){
            h=h-12;
            tipo="pm";
        }
        if(h<=9){
            h="0"+h;
        }        
        hora=h+":"+m+" "+tipo;
        $('#thora2').val(hora);
        $('#thora1').css('display','none');
        $('#thora2').css('display','inline-block');          
    });  
    $("#commin").change(function(event){
        var h = $("#comhora").find(':selected').val();
        var m = $("#commin").find(':selected').val();
        tipo="am";
        if(h>12){
            h=h-12;
            tipo="pm";
        }
         if(h<=9){
            h="0"+h;
        }
        hora=h+":"+m+" "+tipo;
        $('#thora2').val(hora);        
        $('#thora1').css('display','none');
        $('#thora2').css('display','inline-block');  
    });  
    var hora=$.now();
    setInterval(function(){currentTime("#thora1")}, 500);     
    function currentTime(field) {
        var h = $("#comhora").find(':selected').val();
        var m = $("#commin").find(':selected').val();
        if(h==0){            
            if(m==0){
                var now = new Date();
                hora=now.getHours();
                min=now.getMinutes();
                seg=now.getSeconds();

                if(hora>12){hora=hora-12;}
                if(min<=9){min="0"+min}
                if(seg<=9){seg="0"+seg}
                now = hora + ':' + min + ':' + seg;    
                $(field).val(now);     
                $(field).css('display','inline-block');
                $('#thora2').css('display','none');                
            }
        }else{
            $(field).css('display','none');
            $('#thora2').css('display','inline-block');            
        }
    } 
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////        
    ///////////////////BOTON ADD/////////////////////////////////////////    
    $('#btn_add').live('click', function(){
        if($('#txtcodigo').val() == ""){
            alert('Por Favor Seleccione El Medicamento..');
            $('#txtcodigo').focus();
            return;				            
        }
        if($('#txtdesmedica').val() == ""){
            alert('Por Favor Seleccione El Medicamento..');
            $('#txtdesmedica').focus();
            return;				            
        }     
        if($('#txtfec').val() == ""){
            alert('Por Favor Seleccione La Fecha..');
            $('#txtfec').focus();
            return;				            
        }
        if($('#thora2').val() == ""){
            if($("#comhora").val()=="0"){
                alert('Por Favor Seleccione La Hora..');
                $('#thora2').focus();
                return;
            }                      
        }    
        if($("#commin").val()=="0"){
            alert('Por Favor Seleccione Los Minutos..');
            $('#thora2').focus();
            return;
        }          
        if($('#txtcantidad').val() == ""){
            alert('Por Favor Seleccione La Cantidad..');
            $('#txtcantidad').focus();
            return;				            
        }               
        codigo=$('#txtcodigo').val();
        descri=$('#txtdesmedica').val();
        fecha=$('#txtfec').val();
        hor=$('#thora2').val();
        canti=$('#txtcantidad').val();
        valor=$('#txtvalo').val();
        tota=$('#txttotal').val();
        proce=$('#txtelepro').val();    
        
        can=Number($('#txtcantidad').val());
        valo=Number($('#txtvalo').val());
        total=can*valo;
        subto=subto+Number(total);
        $('#txtto').val(subto);
        textm(subto,$('#txtt').attr("id"));    
        $.limpiar();
        $.funagregar();
    });    
    $('.remover').live('click', function(e){
        e.preventDefault(e);
        var fila = $(this).attr('fila'); 

        delete vector[fila];
        
        var s= $(this).attr('s'); 
        subto=subto-Number(s);
        $('#txtto').val(subto);
        textm(subto,$('#txtt').attr("id"));           
        $("tr.fila"+fila).remove();         
        cuantos=cuantos-1;  
        camponuevo=camponuevo-1;
        //alert("cuantos="+cuantos+"CAMPONUEVO="+camponuevo);
        if(cuantos==0){
            vacia=1;
        }
    });	    
    /////////////////////////////////////////////////////////////////////
    ////////////////boton abrir ventana medicamentos///////////////////////
    $('#abrir_venmed').live('click', function(){
        $("body").css("overflow", "hidden");
        $('#conte').css("display",'none');
        $('#busqueda_medicamentos').fadeIn(500);
        //$('#oscuro').css('visibility','visible');
        $('#txtbusmed').val("");
        $('#txtbusmed').focus();
        $('#zona_medicamentos').html("");     
        $('#txtvalor').val("");
        $('#txtvalo').val("");
        $('#txtcodigo').val("");
        $('#txtdesmedica').val("");
        $('#txttotal').val("");
        var datos={
            auxiliar: "1"
        }
        $.ajax({
           type: 'POST',
           url: '../cargar_medicamentos',
           data: datos,
           success: function(data){
               $('#zona_medicamentos').show(1000).html(data);
           },
           error: function(error_messages){
            alert('HA OCURRIDO UN ERROR');
           }
        });        
    });     
    //////////////////////////////////////////////////////////  
    ////////////////boton abrir ventana pacientes///////////////////////
    $('#cer_venmed').live('click', function(){
        $('#conte').css("display",'block');
        $('#busqueda_medicamentos').fadeOut(500);
        $('#zona_medicamentos').html("");
        $('#oscuro').css('visibility','hidden');
        $("body").css("overflow", "auto"); 
        $('#txtvalor').val("");
        $('#txtvalo').val("");
        $('#txtcodigo').val("");
        $('#txtdesmedica').val("");    
        $('#txttotal').val("");
    });    
    //////////////////////////////////////////////////////////      
    /////////////////////////OCULTA CUANDO SE DA CLICK FUERA DEL DIV/////////////////////////////////
//    $('#busqueda_medicamentos').live('mouseout',function(){ 
//        $('#oscuro').live("click",function(){ 
//            $('#conte').css("display",'block');
//            $('#busqueda_medicamentos').fadeOut(500);
//            $('#zona_medicamentos').html("");
//            $('#oscuro').css('visibility','hidden');
//            $("body").css("overflow", "auto"); 
//            $('#txtvalor').val("");
//            $('#txtvalo').val("");
//            $('#txtcodigo').val("");
//            $('#txtdesmedica').val("");    
//            $('#txttotal').val("");
//        });
//        return false; // Para evitar el efecto de burbujeo                
//    });          
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////        
    ///////////////////busqueda de medicamentos//////////////////    
    $('#txtbusmed').live('keyup', function(e){
        e.preventDefault(e);        
        var combo=$('#combusmed').find(':selected').val();
        //var combuspac="";
        var tipo="";
        if(combo=="1"){
            combo="CODIGO";
        }
        if(combo=="2"){
            combo="NOMBRE";
        }     
        if($('#txtbusmed').val()==""){
            tipo="VACIA";
        }else{
            tipo="LLENA";
        }        
        
        var datos={
            auxiliar: "2",
            combusmed: combo,
            txtbusmed: $('#txtbusmed').val(),
            tipo: tipo
        }
        $.ajax({
            type: "POST",
            url: "../cargar_medicamentos",
            data: datos,
            success: function(data){
                $('#zona_medicamentos').show(100).html(data);
            },
            error: function(error_messages){
                alert('HA OCURRIDO UN ERROR');
            }
        });
    });     
    //////////////////////////////////////////////////////////    
    //////////////SELECCIONAR MEDICAMENTOS/////////////////////
    $('.marcado1').live('click', function(){        
        //////////////////////VARIABLES PARA LOS DATOS PERSONALES////////////////////
        var cod_medicamentos = $(this).attr('cod_medicamentos');
        var nomGene_medicamentos = $(this).attr('nomGene_medicamentos');
        var valor = $(this).attr('valor');
        $('#txtcodigo').val(cod_medicamentos);
        $('#txtdesmedica').val(nomGene_medicamentos);
        textm(valor,$('#txtvalor').attr("id"));   
        $('#txtvalo').val(valor);
        $('#txtcantidad').attr('disabled',false);
        /////////////GUARDAR VALORES EN LAS VARIABLES GLOBALES///////////////////
        cod_med=cod_medicamentos;
        nom_med=nomGene_medicamentos;
                
        ////////////////////////////////////////////////////////////////////
        $('#conte').css("display",'block');
        $('#busqueda_medicamentos').fadeOut(500);
        $('#zona_medicamentos').html("");
        $('#oscuro').css('visibility','hidden');
        $("body").css("overflow", "auto"); 
    });
    //////////////////////////////////////////////////////////        
    $('#txtcantidad').keyup(function(){
        if ( ($('#txtcantidad').val()) == "0" ){
            $('#txtcantidad').val("");
        }else{
            if( ($('#txtcantidad').val())<0 ){
                $('#txtcantidad').val("");
            }	
        }    
        can=Number($('#txtcantidad').val());
        valo=Number($('#txtvalo').val());
        var total=can*valo;
        textm(total,$('#txttotal').attr("id"));   
    });
    ////////////////////BTN_GUARDAR//////////////////////////////////
    $('#btn_gua').live('click', function(){        
       setTimeout(function(){
           //////////////////////VALIDAR CAMPOS////////////////////////////////////////
           resul=$.validatxt('#txtdoc','Por Favor Seleccione El Paciente..');
           if(resul=="1"){return;}
           resul=$.validacombo('#combosering','Por Favor Seleccione El Servicio de Ingreso..');
           if(resul=="1"){return;}
           resul=$.validatxt('#txtfecha_ing','Por Favor Seleccione La Fecha de Ingreso..');
           if(resul=="1"){return;}
           if(vacia==1){
               alert("SELECCIONE POR LO MENOS 1 MEDICAMENTO");
               return;
           }
           ///////////////////RECORRER LA TABLA DE DETALLES///////////////
           var query = ""; 
           var k=1;           
           var cam;
           var j=7;
           var suma=0;           
           $("#detalle").find(':input').each(function (index) { 
               cam=$(this).val();
               query = query + "&campo" + k+ "=" + cam;
               k=k+1;                
           });                  
           tam=k-1;
           /////////////////////////////////////////////////////////
           var datos="opcion=guardar&hi_SERVICIO_MAN_MEDICA="+$('#combosering').val()+"&hi_N_CAMA_MAN_MEDICA="+$('#txtncama').val()
                    +"&hi_FECHA_INGRESO_MAN_MEDICA="+$('#txtfecha_ing').val()
                    +"&hi_FECHA_EGRESO_MAN_MEDICA="+$('#txtfecha_egre').val()+"&hi_TIPO_MAN_MEDICA="+$('#combotipo').val()
                    +"&hi_ESTADO_MAN_MEDICA=ACTIVO&id_paciente="+id_paciente+"&ident_paciente="+ident_paciente;
            
                    datos+="&hi_CODDIAGPPAL_MAN_MEDICA=" +$('#txtcoddx1').val().toUpperCase();
                    datos+="&hi_DIAGPPAL_MAN_MEDICA="+$('#txtdesdx1').val().toUpperCase();
                    datos+="&hi_CODDIAG2_MAN_MEDICA="+$('#txtcoddx2').val().toUpperCase();
                    datos+="&hi_DIAG2_MAN_MEDICA="+$('#txtdesdx2').val().toUpperCase();
                    datos+="&hi_CODDIAG3_MAN_MEDICA="+$('#txtcoddx3').val().toUpperCase();
                    datos+="&hi_DIAG3_MAN_MEDICA="+$('#txtdesdx3').val().toUpperCase();
                    datos+="&hi_CODDIAG4_MAN_MEDICA="+$('#txtcoddx4').val().toUpperCase();
                    datos+="&hi_DIAG4_MAN_MEDICA="+$('#txtdesdx4').val().toUpperCase();               
           query="&tam="+tam+query;
        
           /////////////////////////////////////////////////////////////////
           //alert(datos);
           que=datos+query;
           if(confirm("¿DESEA GUARDAR LOS DATOS?")){
               $.enviar1("POST","../gestionar_manejo_medica",que,"DATOS GUARDADOS DE MANERA EXITOSA...","../ges_manejo_medica");
           }    
           ////////////////////////////////////////////////////////////////          
       }, 500);    
    });       
    //////////////////////////////////////////////////////////        
    //////////////////BTN_BUSCAR///////////////////////////////
    $('#btn_bus').live('click', function(){
        $('#conte').css("display",'none');
        $('#busqueda_manejo').fadeIn(500);
        $('#oscuro').css('visibility','visible');
        $('#txtbus').val("");       
        $("body").css("overflow", "hidden");
        $('#txtbus').focus(); 
        $('#zona_manejo').html("");
        $('#zona_manejo2').html("");
        $('#busqueda_manejo').css('height','360px');

    });         
    $('#cer_venmane').live('click', function(){
        $('#conte').css("display",'block');
        $('#busqueda_manejo').fadeOut(500);
        $('#oscuro').css('visibility','hidden');
        $("body").css("overflow", "auto");        
        $('#zona_manejo').html("");
        $('#zona_manejo2').html("");
        $('#area_fecha').css('display','none');
        $('#tablafecha').css('display','none');
        $('#tfec').val("");      
        $(":text").each(function(){	
            $($(this)).val('');
	});        
    });  
    $('#busqueda_manejo').live('mouseout',function(){ 
        $('#oscuro').live("click",function(){ 
            $('#conte').css("display",'block');
            $('#busqueda_manejo').fadeOut(500);
            $('#oscuro').css('visibility','hidden');
            $("body").css("overflow", "auto");        
            $('#zona_manejo').html("");
            $('#zona_manejo2').html("");
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
        $('#zona_manejo').html("");
        $('#busqueda_manejo').css('height','360px');        
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
        $.enviar2("POST","../car_pac",datos,'#zona_manejo');        
    });       
    $('.marcado').live('click', function(){  
        var ident = $(this).attr('ident'); 
        $('#tid').val(ident);
        $('#area_fecha').css('display','none');
        $('#tablafecha').css('display','none');
        $('#tfec').val("");
        $('#busqueda_manejo').css('height','600px');
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
            auxiliar: "MANEJO"
        }
        $.enviar3("POST","../mostrar_manejo_medica",datos,'#zona_manejo2','#area_fecha','#tablafecha');   
    });      
    $('.marcado2').live('click', function(){             
        hi_ID_MAN_MEDICA=$(this).attr('hi_ID_MAN_MEDICA');
        var hi_SERVICIO_MAN_MEDICA = $(this).attr('hi_SERVICIO_MAN_MEDICA');
        $("#combosering option[value=" + hi_SERVICIO_MAN_MEDICA + "]").attr("selected",true); 
        $('#txtncama').val($(this).attr('hi_N_CAMA_MAN_MEDICA'));        
//        $('#txtdiag').val($(this).attr('hi_DIAGNOSTICO_MAN_MEDICA'));
        
        var hi_FECHA_INGRESO_MAN_MEDICA = $(this).attr('hi_FECHA_INGRESO_MAN_MEDICA');
        if(hi_FECHA_INGRESO_MAN_MEDICA=="0001-01-01"){
            hi_FECHA_INGRESO_MAN_MEDICA="";
        }            
        $('#txtfecha_ing').val(hi_FECHA_INGRESO_MAN_MEDICA);
                
        var hi_FECHA_EGRESO_MAN_MEDICA = $(this).attr('hi_FECHA_EGRESO_MAN_MEDICA');
        if(hi_FECHA_EGRESO_MAN_MEDICA=="0001-01-01"){
            hi_FECHA_EGRESO_MAN_MEDICA="";
        }           
        $('#txtfecha_egre').val(hi_FECHA_EGRESO_MAN_MEDICA);
                
        var hi_TIPO_MAN_MEDICA = $(this).attr('hi_TIPO_MAN_MEDICA');
        $("#combotipo option[value=" + hi_TIPO_MAN_MEDICA + "]").attr("selected",true); 
        
        var hi_CODDIAGPPAL_MAN_MEDICA=$(this).attr('hi_CODDIAGPPAL_MAN_MEDICA');
        var hi_DIAGPPAL_MAN_MEDICA=$(this).attr('hi_DIAGPPAL_MAN_MEDICA');
        var hi_CODDIAG2_MAN_MEDICA=$(this).attr('hi_CODDIAG2_MAN_MEDICA');
        var hi_DIAG2_MAN_MEDICA=$(this).attr('hi_DIAG2_MAN_MEDICA');
        var hi_CODDIAG3_MAN_MEDICA=$(this).attr('hi_CODDIAG3_MAN_MEDICA');
        var hi_DIAG3_MAN_MEDICA=$(this).attr('hi_DIAG3_MAN_MEDICA');
        var hi_CODDIAG4_MAN_MEDICA=$(this).attr('hi_CODDIAG4_MAN_MEDICA');
        var hi_DIAG4_MAN_MEDICA=$(this).attr('hi_DIAG4_MAN_MEDICA');
        $('#txtcoddx1').val(hi_CODDIAGPPAL_MAN_MEDICA);
        $('#txtdesdx1').val(hi_DIAGPPAL_MAN_MEDICA);      

        if(hi_CODDIAG2_MAN_MEDICA!=""){
            $('#txtcoddx2').val(hi_CODDIAG2_MAN_MEDICA);
            $('#txtdesdx2').val(hi_DIAG2_MAN_MEDICA);
            $('#di2').css('display','inline-block');
            numdiag=numdiag+1;
        }
        if(hi_CODDIAG3_MAN_MEDICA!=""){
            $('#txtcoddx3').val(hi_CODDIAG3_MAN_MEDICA);
            $('#txtdesdx3').val(hi_DIAG3_MAN_MEDICA);     
            $('#di3').css('display','inline-block');
            numdiag=numdiag+1;
        }
        if(hi_CODDIAG4_MAN_MEDICA!=""){
            $('#txtcoddx4').val(hi_CODDIAG4_MAN_MEDICA);
            $('#txtdesdx4').val(hi_DIAG4_MAN_MEDICA);     
            $('#di4').css('display','inline-block');
            numdiag=numdiag+1;
        }
          
        
        var datos={
            hi_ID_MAN_MEDICA: hi_ID_MAN_MEDICA
        }
        $.ajax({
            type: "POST",
            url: "../car_detalle_manejo",
            data: datos,
            dataType: "json",            
            success: function(data){       
               cuantos=0;
               var tama= data.tam;
               var to;
               var i;
               for(i=1;i<=tama;i++){   
                   to=Number(data['hi_VALOR_MEDICA'+i])*Number(data['hi_CANTIDAD_MEDICA'+i]);
                   vector[i]=data['hi_ID_DETALLE_MAN_MEDICA'+i];
                   $.agre(data['hi_COD_MEDICA'+i],data['nomGene_medicamentos'+i],data['hi_ELEMENPROC_MEDICA'+i],data['hi_FECHA'+i],data['hi_HORA'+i],data['hi_CANTIDAD_MEDICA'+i],data['hi_VALOR_MEDICA'+i],to,i);
               } 
               $('#otro-id2').attr('id','abrir_venmed');
               $('#btn_add').css('display','inline-block'); 
            },
            error: function(error_messages){
                alert('HA OCURRIDO UN ERROR');
            }                
        });       
        
        $.cerrar_v();          
    });      
    $('#buscafecha').live('click', function(){  
        var datos={
            ident: $('#tid').val(),
            fecha: $('#tfec').val(),
            auxiliar: "MANEJO"
        }
        $.enviar3("POST","../mostrar_manejo_medica",datos,'#zona_manejo2','#area_fecha','#tablafecha');                             
    });      
    //////////////////////////////////////////////////////////      
    $('#btn_mod').live('click', function(){
       setTimeout(function(){            
           //////////////////////VALIDAR CAMPOS////////////////////////////////////////
           resul=$.validatxt('#txtdoc','Por Favor Seleccione El Paciente..');
           if(resul=="1"){return;}
           resul=$.validacombo('#combosering','Por Favor Seleccione El Servicio de Ingreso..');
           if(resul=="1"){return;}
           resul=$.validatxt('#txtfecha_ing','Por Favor Seleccione La Fecha de Ingreso..');
           if(resul=="1"){return;}
           if(vacia==1){
               alert("SELECCIONE POR LO MENOS 1 MEDICAMENTO");
               return;
           }           
           var k=1,j=0,p=1;jsonObj = [];   
           datos="";
           datos+="opcion=modificar";
           $("#detalle").find(':input').each(function (index) {                
               var id = $(this).attr("id");
               var valor = $(this).val();                                   
               if(j==0){
                   datos+="&hi_COD_MEDICA"+p+"="+ valor;                   
               }
               if(j==1){
                   datos+="&nomGene_medicamentos"+p+"="+ valor;
               }               
               if(j==2){     
                   datos+="&hi_ELEMENPROC_MEDICA"+p+"="+ valor;
               }            
               if(j==3){  
                   datos+="&hi_FECHA"+p+"="+ valor;
               }            
               if(j==4){ 
                   datos+="&hi_HORA"+p+"="+ valor;
               }                           
               if(j==5){  
                   datos+="&hi_CANTIDAD_MEDICA"+p+"="+ valor;
               }            
               if(j==6){ 
                   datos+="&hi_VALOR_MEDICA"+p+"="+ valor;
               }            
               if(j==7){   
                   datos+="&TOTAL"+p+"="+ valor;
               }            
               if(j==8){
                   datos+="&X"+p+"="+ valor;
               }                           
               k=k+1;
               j=j+1;               
               if(j==9){
                   j=0;
                   p=p+1;
               }
           });  
           tam=p-1;
           datos+="&tam="+tam;
           f=1;
           for(i=1; i<vector.length;i++){
               if(vector[i]!=undefined){
                   datos+="&hi_ID_DETALLE_MAN_MEDICA"+f+"="+ vector[i];
                   f=f+1;
               }
           }           
           datos+="&hi_ID_MAN_MEDICA="+hi_ID_MAN_MEDICA+"&hi_SERVICIO_MAN_MEDICA="+$('#combosering').val()+"&hi_N_CAMA_MAN_MEDICA="+$('#txtncama').val()
                 +"&hi_FECHA_INGRESO_MAN_MEDICA="+$('#txtfecha_ing').val()
                 +"&hi_FECHA_EGRESO_MAN_MEDICA="+$('#txtfecha_egre').val()+"&hi_TIPO_MAN_MEDICA="+$('#combotipo').val()
                 +"&hi_ESTADO_MAN_MEDICA=ACTIVO&id_paciente="+id_paciente+"&ident_paciente="+ident_paciente;         

                    datos+="&hi_CODDIAGPPAL_MAN_MEDICA=" +$('#txtcoddx1').val().toUpperCase();
                    datos+="&hi_DIAGPPAL_MAN_MEDICA="+$('#txtdesdx1').val().toUpperCase();
                    datos+="&hi_CODDIAG2_MAN_MEDICA="+$('#txtcoddx2').val().toUpperCase();
                    datos+="&hi_DIAG2_MAN_MEDICA="+$('#txtdesdx2').val().toUpperCase();
                    datos+="&hi_CODDIAG3_MAN_MEDICA="+$('#txtcoddx3').val().toUpperCase();
                    datos+="&hi_DIAG3_MAN_MEDICA="+$('#txtdesdx3').val().toUpperCase();
                    datos+="&hi_CODDIAG4_MAN_MEDICA="+$('#txtcoddx4').val().toUpperCase();
                    datos+="&hi_DIAG4_MAN_MEDICA="+$('#txtdesdx4').val().toUpperCase();            
           if(confirm("¿DESEA MODIFICAR LOS DATOS?")){
               $.enviar1("POST","../gestionar_manejo_medica",datos,"DATOS MODIFICADOS DE MANERA EXITOSA...","../ges_manejo_medica");
           }
           /////////////////////////////////////////////////////////                      
       }, 500);    
    });         
    $('#btn_eli').live('click', function(){
       setTimeout(function(){            
           //////////////////////VALIDAR CAMPOS////////////////////////////////////////
           resul=$.validatxt('#txtdoc','Por Favor Seleccione El Paciente..');
           if(resul=="1"){return;}
           resul=$.validacombo('#combosering','Por Favor Seleccione El Servicio de Ingreso..');
           if(resul=="1"){return;}
           resul=$.validatxt('#txtfecha_ing','Por Favor Seleccione La Fecha de Ingreso..');
           if(resul=="1"){return;}
           if(vacia==1){
               alert("SELECCIONE POR LO MENOS 1 MEDICAMENTO");
               return;
           }           
           var k=1,j=0,p=1;jsonObj = [];   
           datos="";
           datos+="opcion=eliminar";
           $("#detalle").find(':input').each(function (index) {                
               var id = $(this).attr("id");
               var valor = $(this).val();                                   
               if(j==0){
                   datos+="&hi_COD_MEDICA"+p+"="+ valor;                   
               }
               if(j==1){
                   datos+="&nomGene_medicamentos"+p+"="+ valor;
               }               
               if(j==2){     
                   datos+="&hi_ELEMENPROC_MEDICA"+p+"="+ valor;
               }            
               if(j==3){  
                   datos+="&hi_FECHA"+p+"="+ valor;
               }            
               if(j==4){ 
                   datos+="&hi_HORA"+p+"="+ valor;
               }                           
               if(j==5){  
                   datos+="&hi_CANTIDAD_MEDICA"+p+"="+ valor;
               }            
               if(j==6){ 
                   datos+="&hi_VALOR_MEDICA"+p+"="+ valor;
               }            
               if(j==7){   
                   datos+="&TOTAL"+p+"="+ valor;
               }            
               if(j==8){
                   datos+="&X"+p+"="+ valor;
               }                           
               k=k+1;
               j=j+1;               
               if(j==9){
                   j=0;
                   p=p+1;
               }
           });  
           tam=p-1;
           datos+="&tam="+tam;
           f=1;
           for(i=1; i<vector.length;i++){
               if(vector[i]!=undefined){
                   datos+="&hi_ID_DETALLE_MAN_MEDICA"+f+"="+ vector[i];
                   f=f+1;
               }
           }           
           datos+="&hi_ID_MAN_MEDICA="+hi_ID_MAN_MEDICA+"&hi_SERVICIO_MAN_MEDICA="+$('#combosering').val()+"&hi_N_CAMA_MAN_MEDICA="+$('#txtncama').val()
                 +"&hi_FECHA_INGRESO_MAN_MEDICA="+$('#txtfecha_ing').val()
                 +"&hi_FECHA_EGRESO_MAN_MEDICA="+$('#txtfecha_egre').val()+"&hi_TIPO_MAN_MEDICA="+$('#combotipo').val()
                 +"&hi_ESTADO_MAN_MEDICA=INACTIVO&id_paciente="+id_paciente+"&ident_paciente="+ident_paciente;   
         
                    datos+="&hi_CODDIAGPPAL_MAN_MEDICA=" +$('#txtcoddx1').val().toUpperCase();
                    datos+="&hi_DIAGPPAL_MAN_MEDICA="+$('#txtdesdx1').val().toUpperCase();
                    datos+="&hi_CODDIAG2_MAN_MEDICA="+$('#txtcoddx2').val().toUpperCase();
                    datos+="&hi_DIAG2_MAN_MEDICA="+$('#txtdesdx2').val().toUpperCase();
                    datos+="&hi_CODDIAG3_MAN_MEDICA="+$('#txtcoddx3').val().toUpperCase();
                    datos+="&hi_DIAG3_MAN_MEDICA="+$('#txtdesdx3').val().toUpperCase();
                    datos+="&hi_CODDIAG4_MAN_MEDICA="+$('#txtcoddx4').val().toUpperCase();
                    datos+="&hi_DIAG4_MAN_MEDICA="+$('#txtdesdx4').val().toUpperCase();            
           if(confirm("¿DESEA ELIMINAR LOS DATOS?")){
               $.enviar1("POST","../gestionar_manejo_medica",datos,"DATOS ELIMINADOS DE MANERA EXITOSA...","../ges_manejo_medica");
           }
           /////////////////////////////////////////////////////////                      
       }, 500);    
    });         
    /////////////////FUNCIONES/////////////////////////////////    
    $.extend({
        funagregar: function(){
            camponuevo=camponuevo+1;
            campo="<tr class='fila"+ camponuevo +"'>";
                campo+="<td>";
                    campo+="<input type='text' id='caja"+camponuevo+"' name='caja"+camponuevo+"' value='"+codigo+"' disabled size='8' style='font-size:7pt;'>";
                campo+="</td>";
                campo+="<td>";
                    campo+="<input type='text' id='caja"+camponuevo+"' name='caja"+camponuevo+"' value='"+descri+"' disabled size='45' style='font-size:7pt;'>";
                campo+="</td>";            
                campo+="<td>";
                    campo+="<input type='text' id='caja"+camponuevo+"' name='caja"+camponuevo+"' value='"+proce+"' disabled size='40' style='font-size:7pt;'>";
                campo+="</td>";                        
                campo+="<td>";
                    campo+="<input type='text' id='caja"+camponuevo+"' name='caja"+camponuevo+"' value='"+fecha+"' disabled size='8' style='font-size:7pt;'>";
                campo+="</td>"; 
                campo+="<td>";
                    campo+="<input type='text' id='caja"+camponuevo+"' name='caja"+camponuevo+"' value='"+hor+"' disabled size='8' style='font-size:7pt;'>";
                campo+="</td>";    
                campo+="<td>";
                    campo+="<input type='text' id='caja"+camponuevo+"' name='caja"+camponuevo+"' value='"+canti+"' disabled size='6' style='font-size:7pt;'>";
                campo+="</td>";     
                campo+="<td>";
                    campo+="<input type='text' id='caja"+camponuevo+"' name='caja"+camponuevo+"' value='"+valor+"' disabled size='8' style='font-size:7pt;'>";
                campo+="</td>";  
                campo+="<td>";
                    campo+="<input type='text' id='caja"+camponuevo+"' name='caja"+camponuevo+"' value='"+tota+"' disabled size='11' style='font-size:7pt;'>";
                campo+="</td>";
                campo+="<td>";
                    campo+="<input class='remover' s='"+ total +"' fila='"+ camponuevo +"' type='button' value='X' id='boton1' title='Quitar de la lista' style='font-size:7pt; padding:2px 2px 2px 2px; margin; margin: 0px 4px 4px 0px'>";
                campo+="</td>";                       
            campo+="</tr>";
            $("#detalle").append(campo);
            vacia=2;
            cuantos=cuantos+1;       
        }, 
        limpiar: function(){
            $('#txtcodigo').val("");
            $('#txtdesmedica').val("");
            //$('#txtfec').val("");
            //$('#thora2').val("");
            $('#txtcantidad').val("");
            $('#txtvalo').val("");
            $('#txtvalor').val("");
            $('#txttotal').val("");
            $('#txtelepro').val("");            
        },
        validatxt: function(caja,msg){
            if($(caja).val()==""){
                alert(msg);
                $(caja).focus();
                return "1";
            }
        },        
        validacombo: function(caja,msg){
            if($(caja).val()=="0"){
                alert(msg);
                $(caja).focus();
                return "1";
            }
        },
        enviar1: function(type,url1,datos,msg,url2){
            $.ajax({
                type: type,
                url: url1,
                data: datos,
                dataType: "json",
                success: function(data){
                    if(data==1){    
                        alert(msg);
                        setTimeout(function(){
                            window.location.href = url2;		
                        },1000);                          
                    }                    
                },
                error: function(error_messages){
                    alert('HA OCURRIDO UN ERROR');
                }                
            });
        },
        enviar2: function(type,url1,datos,zona){
            $.ajax({
                type: type,
                url: url1,
                data: datos,
                success: function(data){
                    $(zona).show(100).html(data);
                },
                error: function(error_messages){
                    alert('HA OCURRIDO UN ERROR');
                }
            });            
        },        
        enviar3: function(type,url1,datos,zona,areaf,tablaf){
            $.ajax({
                type: type,
                url: url1,
                data: datos,
                success: function(data){
                    $(zona).show(100).html(data);
                    $(areaf).slideDown(500);
                    $(tablaf).slideDown(500);                       
                },
                error: function(error_messages){
                    alert('HA OCURRIDO UN ERROR');
                }
            });             
        },
        cerrar_v: function(){
            $('#btn_mod').css('display','block');
            $('#btn_eli').css('display','block');
            $('#btn_bus').css('display','none');
            $('#btn_gua').css('display','none');
            $('#btn_nue').css('display','none');
            $('#form_manejo').find('input, textarea, button, select').attr('disabled',false); 
            $('#abrir_venpaci').attr('id','otro-id1');
            $("#txttipodoc, #txtdoc, #txtnompac,#txtedad,#combosex,#txttel,#txtdir,#txtmun,#comgrupoetn,#txtnomres,#txtparent,#txtdirresp,#txtnumhis").attr('disabled', true);                           

            $('#conte').css("display",'block');
            $('#busqueda_manejo').fadeOut(500);
            $('#oscuro').css('visibility','hidden');
            $("body").css("overflow", "auto");        
            $('#zona_manejo').html("");
            $('#zona_manejo2').html("");
            $('#area_fecha').css('display','none');
            $('#tablafecha').css('display','none');
            $('#tfec').val("");     
            $('#otro-id3').attr('id','abrir_vendiagnostico');
            $('#btn_add1').css('display','inline-block');             
        },
        agre: function(codigo,descri,proce,fecha,hor,canti,valor,tota,i){      
            
            can=Number(canti);
            valo=Number(valor);            
            total=can*valo;            
            subto=subto+Number(total);
            $('#txtto').val(subto);
            textm(subto,$('#txtt').attr("id"));    
        
            camponuevo=i;
            campo="<tr class='fila"+ camponuevo +"'>";
                campo+="<td>";
                    campo+="<input type='text' id='caja"+camponuevo+"' name='caja"+camponuevo+"' value='"+codigo+"' disabled size='8' style='font-size:7pt;'>";
                campo+="</td>";
                campo+="<td>";
                    campo+="<input type='text' id='caja"+camponuevo+"' name='caja"+camponuevo+"' value='"+descri+"' disabled size='45' style='font-size:7pt;'>";
                campo+="</td>";            
                campo+="<td>";
                    campo+="<input type='text' id='caja"+camponuevo+"' name='caja"+camponuevo+"' value='"+proce+"' disabled size='40' style='font-size:7pt;'>";
                campo+="</td>";                        
                campo+="<td>";
                    campo+="<input type='text' id='caja"+camponuevo+"' name='caja"+camponuevo+"' value='"+fecha+"' disabled size='8' style='font-size:7pt;'>";
                campo+="</td>"; 
                campo+="<td>";
                    campo+="<input type='text' id='caja"+camponuevo+"' name='caja"+camponuevo+"' value='"+hor+"' disabled size='8' style='font-size:7pt;'>";
                campo+="</td>";    
                campo+="<td>";
                    campo+="<input type='text' id='caja"+camponuevo+"' name='caja"+camponuevo+"' value='"+canti+"' disabled size='6' style='font-size:7pt;'>";
                campo+="</td>";     
                campo+="<td>";
                    campo+="<input type='text' id='caja"+camponuevo+"' name='caja"+camponuevo+"' value='"+valor+"' disabled size='8' style='font-size:7pt;'>";
                campo+="</td>";  
                campo+="<td>";
                    campo+="<input type='text' id='caja"+camponuevo+"' name='caja"+camponuevo+"' value='"+tota+"' disabled size='11' style='font-size:7pt;'>";
                campo+="</td>";
                campo+="<td>";
                    campo+="<input class='remover' s='"+ total +"' fila='"+ camponuevo +"' type='button' value='X' id='boton1' title='Quitar de la lista' style='font-size:7pt; padding:2px 2px 2px 2px; margin; margin: 0px 4px 4px 0px'>";
                campo+="</td>";                       
            campo+="</tr>";
            $("#detalle").append(campo);
            vacia=2;            
            cuantos=cuantos+1;      
        }        
    });    
    ////////////////////////////////////////////////////////////////////            
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
    
    $('#btn_add1').live('click', function(){
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
function textm(txt,id){
//    if (document.getElementById(id).value==''){
  //      document.getElementById(id).value='0,00'
    //}else{
        document.getElementById(id).value=number_format2(txt, 2, ',', '.');
    //}
}
function number_format2(a, b, c, d){
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
