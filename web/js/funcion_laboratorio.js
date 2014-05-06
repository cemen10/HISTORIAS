$(document).ready(function() {
    //////////////////VARIABLES GLOBALES///////////////////////////////////////////////////
    var id_paciente;
    var ident_paciente;
    var hi_ID_LABO;
    ////////////////////////////////////////////////////////////////////////////////////
    //////////////////////INICIALIZAR OBJETOS//////////////////////////////////////////////////////////////////////////
    $('#form_labora').find('input, textarea, button, select').attr('disabled','disabled'); 
    $("#txthemato,#txthemoglo,#txtplaque,#txtleuco,#txtneutro").numeric({decimal: false, negative: false}, function() {this.value = "";this.focus();}); 	
    $("#txtlinfo,#txteosi,#txtcaya,#txttp,#txtvn1").numeric({decimal: false, negative: false}, function() {this.value = "";this.focus();});
    $("#txtvsg,#txtxmm,#txtbaso,#txtmono,#txtjuve").numeric({decimal: false, negative: false}, function() {this.value = "";this.focus();});  
    $("#txtati,#txttpt,#txtvn2,#txtmmhr").numeric({decimal: false, negative: false}, function() {this.value = "";this.focus();});  
    $('#abrir_venpaci').attr('id','otro-id1');

    $("#hi_OBSERVACION_HEMA_LABO").autoResize();
    $("#hi_OBSERVACION_HEMA_LABO").css("height","20px"); 
    $("#txtotrosuria").autoResize();
    $("#txtotrosuria").css("height","20px");  
    $("#hi_OBSERVACION_URI_LABO").autoResize();
    $("#hi_OBSERVACION_URI_LABO").css("height","20px");      
    $("#txtotroscopro").autoResize();
    $("#txtotroscopro").css("height","20px");      
    $("#hi_OBSERVACION_COPRO_LABO").autoResize();
    $("#hi_OBSERVACION_COPRO_LABO").css("height","20px");  
    $("#hi_OBSERVACION_QUI_LABO").autoResize();
    $("#hi_OBSERVACION_QUI_LABO").css("height","20px");
    $("#txtobserinmu").autoResize();
    $("#txtobserinmu").css("height","20px");    
    $("#hi_OBSERVACION_MICRO_LABO").autoResize();
    $("#hi_OBSERVACION_MICRO_LABO").css("height","20px");      
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
        $('#form_labora').find('input, textarea, button, select').attr('disabled',false); 
        $('#otro-id1').attr('id','abrir_venpaci');
        $("#txttipodoc, #txtdoc, #txtnompac,#txtedad,#combosex,#txttel,#txtdir,#txtmun,#comgrupoetn,#txtnomres,#txtparent,#txtdirresp,#txtnumhis").attr('disabled', true);           
    });
    //////////////////////////////////////////////////////////////
    ////////////////////BTN_CANCELAR//////////////////////////////////
    $('#btn_can').live('click', function(){
        setTimeout(function(){
            window.location.href = "../ges_labora";								 							
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
            if($('#txtfecha').val() == ""){
                alert('Por Favor Seleccione La Fecha..');
                $('#txtfecha').focus();
                return;				
            }        
            var datos={
                opcion: "guardar",
                hi_FECHA_LABO : $('#txtfecha').val(),
                ///////////HEMATOLOGIA///////////////////////
                
                hi_HEMATOCRITO_HEMA_LABO : $('#txthemato').val(),
                hi_HEMOGLOBINA_HEMA_LABO : $('#txthemoglo').val(),
                hi_PLAQUETAS_HEMA_LABO : $('#txtplaque').val(),
                hi_LEUCOCITOS_HEMA_LABO : $('#txtleuco').val(),
                hi_NEUTROFILOS_HEMA_LABO : $('#txtneutro').val(),
                hi_LINFOCITOS_HEMA_LABO : $('#txtlinfo').val(),
                hi_EOSINOFILOS_HEMA_LABO : $('#txteosi').val(),
                hi_CAYADO_HEMA_LABO : $('#txtcaya').val(),
                hi_TP_HEMA_LABO : $('#txttp').val(),
                hi_VN1_HEMA_LABO : $('#txtvn1').val(),
                hi_VSG_HEMA_LABO : $('#txtvsg').val(),
                hi_BASOFILOS_HEMA_LABO : $('#txtbaso').val(),
                hi_MONOCITOS_HEMA_LABO : $('#txtmono').val(),
                hi_JUVENILES_HEMA_LABO : $('#txtjuve').val(),
                hi_ATIPICO_HEMA_LABO : $('#txtati').val(),
                hi_TPT_HEMA_LABO : $('#txttpt').val(),
                hi_VN2_HEMA_LABO : $('#txtvn2').val(),
                hi_GRUPO_SANGUINEO_HEMA_LABO : $('#comgrupo').val(),
                hi_RH_HEMA_LABO : $('#comrh').val(),              
                hi_OBSERVACION_HEMA_LABO: $('#hi_OBSERVACION_HEMA_LABO').val(),
                
                /////////////URIANALISIS///////////////////////
                hi_ASPECTO_URI_LABO : $('#txtaspe').val(),
                hi_COLOR_URI_LABO : $('#txtcolor').val(),
                hi_PH_URI_LABO : $('#txtph').val(),
                hi_DENSIDAD_URI_LABO : $('#txtdensi').val(),
                hi_ALBUMINA_URI_LABO : $('#txtalbu').val(),
                hi_GLUCOSA_URI_LABO : $('#txtgluco').val(),
                hi_ACETONA_URI_LABO : $('#txtacet').val(),
                hi_SANGRE_URI_LABO : $('#txtsangre').val(),
                hi_BILIRRUBINA_URI_LABO : $('#txtbili').val(),
                hi_UROBILINOGENO_URI_LABO : $('#txturobili').val(),
                hi_NITRITOS_URI_LABO : $('#txtnitri').val(),
                hi_LEUCOCITOS_URI_LABO : $('#txtleuco1').val(),
                hi_HEMATIES_URI_LABO : $('#txthemati').val(),
                hi_C_EPITELIALES_URI_LABO : $('#txtcepite').val(),
                hi_CILINDROS_URI_LABO : $('#txtcilin').val(),
                hi_CRISTALES_URI_LABO : $('#txtcrista').val(),
                hi_MOCO_URI_LABO : $('#txtmoco').val(),
                hi_BACTERIAS_URI_LABO : $('#txtbacte').val(),
                hi_LEVADURAS_URI_LABO : $('#txtleva').val(),
                hi_TRICOMONAS_URI_LABO : $('#txttrico').val(),
                hi_OTROS_URI_LABO : $('#txtotrosuria').val(),
                hi_OBSERVACION_URI_LABO : $('#hi_OBSERVACION_URI_LABO').val(),
                
                ////////////COPROLOGICO//////////////////////////////////////
                hi_COLOR_COPRO_LABO : $('#txtcolor1').val(),
                hi_CONSISTENCIA_COPRO_LABO : $('#txtconsis').val(),
                hi_PH_COPRO_LABO : $('#txtph1').val(),
                hi_AZ_REDUCTORES_COPRO_LABO : $('#txtazredu').val(),
                hi_MOCO_COPRO_LABO : $('#txtmoco1').val(),
                hi_EXAMEN_MICROSCOPICO_COPRO_LABO : $('#txtexmicro').val(),
                hi_F_VEGETALES_COPRO_LABO : $('#txtfvege').val(),
                hi_ALMIDONES_COPRO_LABO : $('#txtalmi').val(),
                hi_CELULOSA_COPRO_LABO : $('#txtcelulo').val(),
                hi_GRASAS_NEUTRAS_COPRO_LABO : $('#txtgraneu').val(),
                hi_JABONES_COPRO_LABO : $('#txtjabon').val(),
                hi_LEUCOSITOS_COPRO_LABO : $('#txtleuco2').val(),
                hi_HEMATIES_COPRO_LABO : $('#txthemati1').val(),
                hi_LEVADURAS_COPRO_LABO : $('#txtleva2').val(),
                hi_MICELIOS_COPRO_LABO : $('#txtmiceli').val(),
                hi_FLORA_COPRO_LABO : $('#txtflora').val(),
                hi_H_TRICOCEFALO_COPRO_LABO : $('#txthtrico').val(),
                hi_H_ASCARIS_COPRO_LABO : $('#txthasca').val(),
                hi_H_UNCINARIA_COPRO_LABO : $('#txthuncina').val(),
                hi_H_TENIA_COPRO_LABO : $('#txthtenia').val(),
                hi_H_OXYUROS_COPRO_LABO : $('#txthoxy').val(),
                hi_L_STRONGYLOIDE_COPRO_LABO : $('#txtlstrong').val(),
                hi_Q_HISTOLICA_COPRO_LABO : $('#txtqhisto').val(),
                hi_Q_COLI_COPRO_LABO : $('#txtqcoli').val(),
                hi_QG_LAMBIA_COPRO_LABO : $('#txtqglam').val(),
                hi_Q_LODAMOEBA_COPRO_LABO : $('#txtqloda').val(),
                hi_Q_NANA_COPRO_LABO : $('#txtqnana').val(),
                hi_TROCOMONA_HOMINIS_COPRO_LABO : $('#txttrocohomi').val(),
                hi_TROFOZOITO_AMEBA_COPRO_LABO : $('#txttrozoame').val(),
                hi_HOMINIS_COPRO_LABO : $('#txtbhominis').val(),
                hi_OTROS_COPRO_LABO : $('#txtotroscopro').val(),
                hi_COPROSCOPICO_COPRO_LABO: $('#txtcoproscopico').val(),
                hi_OBSERVACION_COPRO_LABO : $('#hi_OBSERVACION_COPRO_LABO').val(),
                
                ///////////////INMUNOLOGIA//////////////                
                hi_PCR_INMU_LABO : $('#txtpcr').val(),
                hi_RA_INMU_LABO : $('#txtra').val(),
                hi_ASTO_INMU_LABO : $('#txtasto').val(),
                hi_VDRL_INMU_LABO : $('#txtvdrl').val(),
                hi_TOXOPLASMA_INMU_LABO : $('#txttoxoplasma').val(),
                hi_GRAVINDEZ_INMU_LABO : $('#txtgravinsan').val(),
                hi_VIH_INMU_LABO : $('#txtvih').val(),
                hi_HB_INMU_LABO : $('#txthb').val(),
                hi_TSH_INMU_LABO : $('#txttsh').val(),
                hi_NEONATAL_PR_INMU_LABO_LABO : $('#hi_NEONATAL_PR_INMU_LABO_LABO').val(),
                hi_OBSERVACION_INMU_LABO : $('#txtobserinmu').val(),
                
                /////////////QUIMICA///////////////////////                                
                hi_GLICEMIA_A_QUI_LABO : $('#txtglicea').val(),
                hi_GLICEMIA_B_QUI_LABO : $('#txtgliceb').val(),
                hi_COLESTEROL_TOTAL_QUI_LABO : $('#txtcolest').val(),
                hi_COLESTEROL_HDL_QUI_LABO : $('#txtcoleshdl').val(),
                hi_COLESTEROL_LDL_QUI_LABO : $('#txtcolesldl').val(),
                hi_COLESTEROL_VLDL_QUI_LABO : $('#txtcolesvldl').val(),
                hi_TRIGLICERIDOS_QUI_LABO : $('#txttriglice').val(),
                hi_ACIDO_URICO_QUI_LABO : $('#txtaciuri').val(),
                hi_N_UREICO_QUI_LABO : $('#txtnuri').val(),
                hi_CREATININA_QUI_LABO : $('#txtcreati').val(),
                hi_UREA_QUI_LABO : $('#txturea').val(),
                hi_BILIRRUBINA_TOTAL_QUI_LABO : $('#txtbilitotal').val(),
                hi_BILIRRUBINA_DIRECTA_QUI_LABO : $('#txtbilidire').val(),
                hi_BILIRRUBINA_INDIRECTA_QUI_LABO : $('#txtbiliindire').val(),
                hi_OBSERVACION_QUI_LABO : $('#hi_OBSERVACION_QUI_LABO').val(),
                
                //**************MICROBIOLOGIA*****************************//
                hi_KOH_MICRO_LABO : $('#hi_KOH_MICRO_LABO').val(),
                hi_FROTIS_GAR_MICRO_LABO : $('#hi_FROTIS_GAR_MICRO_LABO').val(),
                hi_OBSERVACION_MICRO_LABO : $('#hi_OBSERVACION_MICRO_LABO').val(),
                //**************************************************************//

                //**************SECRECIONES VAGINALES*****************************//
                hi_CELULAS_EPITE_VAGINALES_LABO : $('#hi_CELULAS_EPITE_VAGINALES_LABO').val(),
                hi_LEUCOCITOS_VAGINALES_LABO : $('#hi_LEUCOCITOS_VAGINALES_LABO').val(),
                hi_HEMATIES_VAGINALES_LABO : $('#hi_HEMATIES_VAGINALES_LABO').val(),
                hi_TRICOMONAS_VAGINALES_LABO : $('#hi_TRICOMONAS_VAGINALES_LABO').val(),
                hi_LEVADURAS_VAGINALES_LABO : $('#hi_LEVADURAS_VAGINALES_LABO').val(),
                hi_PH_VAGINALES_LABO : $('#hi_PH_VAGINALES_LABO').val(),
                
                hi_OBSER_CEL_VAGINALES_LABO : $('#hi_OBSER_CEL_VAGINALES_LABO').val(),
                hi_OBSER_LEUCO_VAGINALES_LABO : $('#hi_OBSER_LEUCO_VAGINALES_LABO').val(),
                hi_OBSER_HEMA_VAGINALES_LABO : $('#hi_OBSER_HEMA_VAGINALES_LABO').val(),
                hi_OBSER_TRICO_VAGINALES_LABO : $('#hi_OBSER_TRICO_VAGINALES_LABO').val(),
                hi_OBSER_LEVA_VAGINALES_LABO : $('#hi_OBSER_LEVA_VAGINALES_LABO').val(),
                hi_OBSER_PH_VAGINALES_LABO : $('#hi_OBSER_PH_VAGINALES_LABO').val(),
                //**************************************************************//
                
                //**************SECRECIONES URETRALES*****************************//
                hi_CELULAS_EPITE_URETRALES_LABO : $('#hi_CELULAS_EPITE_URETRALES_LABO').val(),
                hi_LEUCOCITOS_URETRALES_LABO : $('#hi_LEUCOCITOS_URETRALES_LABO').val(),
                hi_HEMATIES_URETRALES_LABO : $('#hi_HEMATIES_URETRALES_LABO').val(),
                hi_PH_URETRALES_LABO : $('#hi_PH_URETRALES_LABO').val(),
                
                hi_OBSER_CEL_URETRALES_LABO : $('#hi_OBSER_CEL_URETRALES_LABO').val(),
                hi_OBSER_LEUCO_URETRALES_LABO : $('#hi_OBSER_LEUCO_URETRALES_LABO').val(),
                hi_OBSER_HEMA_URETRALES_LABO : $('#hi_OBSER_HEMA_URETRALES_LABO').val(),
                hi_OBSER_PH_URETRALES_LABO : $('#hi_OBSER_PH_URETRALES_LABO').val(),
                //**************************************************************//
                hi_estado_LABO: "ACTIVO",
                id_paciente: id_paciente, 
                ident_paciente: ident_paciente                
            }
            if(confirm("¿DESEA GUARDAR LOS DATOS?")){
                $.ajax({
                    type: "POST",
                    url: "../gestionar_laboratorio",
                    data: datos,
                    success: function(data){
                        if(data==1){
                            alert('DATOS GUARDADOS DE MANERA EXITOSA...');
                            setTimeout(function(){
                                window.location.href = "../ges_labora";		
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
    
    ///////////////////BTN MODIFICAR////////////////////////////////////////////////////////    
    $('#btn_mod').live('click', function(){
        setTimeout(function(){
            if($('#txtdoc').val() == ""){
                alert('Por Favor Seleccione El Paciente..');
                $('#txtdoc').focus();
                return;				
            }            
            if($('#txtfecha').val() == ""){
                alert('Por Favor Seleccione La Fecha..');
                $('#txtfecha').focus();
                return;				
            }        
            var datos={
                opcion: "modificar",
                hi_FECHA_LABO : $('#txtfecha').val(),
                hi_ID_LABO:hi_ID_LABO,
                ///////////HEMATOLOGIA///////////////////////
                
                hi_HEMATOCRITO_HEMA_LABO : $('#txthemato').val(),
                hi_HEMOGLOBINA_HEMA_LABO : $('#txthemoglo').val(),
                hi_PLAQUETAS_HEMA_LABO : $('#txtplaque').val(),
                hi_LEUCOCITOS_HEMA_LABO : $('#txtleuco').val(),
                hi_NEUTROFILOS_HEMA_LABO : $('#txtneutro').val(),
                hi_LINFOCITOS_HEMA_LABO : $('#txtlinfo').val(),
                hi_EOSINOFILOS_HEMA_LABO : $('#txteosi').val(),
                hi_CAYADO_HEMA_LABO : $('#txtcaya').val(),
                hi_TP_HEMA_LABO : $('#txttp').val(),
                hi_VN1_HEMA_LABO : $('#txtvn1').val(),
                hi_VSG_HEMA_LABO : $('#txtvsg').val(),
                hi_BASOFILOS_HEMA_LABO : $('#txtbaso').val(),
                hi_MONOCITOS_HEMA_LABO : $('#txtmono').val(),
                hi_JUVENILES_HEMA_LABO : $('#txtjuve').val(),
                hi_ATIPICO_HEMA_LABO : $('#txtati').val(),
                hi_TPT_HEMA_LABO : $('#txttpt').val(),
                hi_VN2_HEMA_LABO : $('#txtvn2').val(),
                hi_GRUPO_SANGUINEO_HEMA_LABO : $('#comgrupo').val(),
                hi_RH_HEMA_LABO : $('#comrh').val(),              
                hi_OBSERVACION_HEMA_LABO: $('#hi_OBSERVACION_HEMA_LABO').val(),
                
                /////////////URIANALISIS///////////////////////
                hi_ASPECTO_URI_LABO : $('#txtaspe').val(),
                hi_COLOR_URI_LABO : $('#txtcolor').val(),
                hi_PH_URI_LABO : $('#txtph').val(),
                hi_DENSIDAD_URI_LABO : $('#txtdensi').val(),
                hi_ALBUMINA_URI_LABO : $('#txtalbu').val(),
                hi_GLUCOSA_URI_LABO : $('#txtgluco').val(),
                hi_ACETONA_URI_LABO : $('#txtacet').val(),
                hi_SANGRE_URI_LABO : $('#txtsangre').val(),
                hi_BILIRRUBINA_URI_LABO : $('#txtbili').val(),
                hi_UROBILINOGENO_URI_LABO : $('#txturobili').val(),
                hi_NITRITOS_URI_LABO : $('#txtnitri').val(),
                hi_LEUCOCITOS_URI_LABO : $('#txtleuco1').val(),
                hi_HEMATIES_URI_LABO : $('#txthemati').val(),
                hi_C_EPITELIALES_URI_LABO : $('#txtcepite').val(),
                hi_CILINDROS_URI_LABO : $('#txtcilin').val(),
                hi_CRISTALES_URI_LABO : $('#txtcrista').val(),
                hi_MOCO_URI_LABO : $('#txtmoco').val(),
                hi_BACTERIAS_URI_LABO : $('#txtbacte').val(),
                hi_LEVADURAS_URI_LABO : $('#txtleva').val(),
                hi_TRICOMONAS_URI_LABO : $('#txttrico').val(),
                hi_OTROS_URI_LABO : $('#txtotrosuria').val(),
                hi_OBSERVACION_URI_LABO : $('#hi_OBSERVACION_URI_LABO').val(),
                
                ////////////COPROLOGICO//////////////////////////////////////
                hi_COLOR_COPRO_LABO : $('#txtcolor1').val(),
                hi_CONSISTENCIA_COPRO_LABO : $('#txtconsis').val(),
                hi_PH_COPRO_LABO : $('#txtph1').val(),
                hi_AZ_REDUCTORES_COPRO_LABO : $('#txtazredu').val(),
                hi_MOCO_COPRO_LABO : $('#txtmoco1').val(),
                hi_EXAMEN_MICROSCOPICO_COPRO_LABO : $('#txtexmicro').val(),
                hi_F_VEGETALES_COPRO_LABO : $('#txtfvege').val(),
                hi_ALMIDONES_COPRO_LABO : $('#txtalmi').val(),
                hi_CELULOSA_COPRO_LABO : $('#txtcelulo').val(),
                hi_GRASAS_NEUTRAS_COPRO_LABO : $('#txtgraneu').val(),
                hi_JABONES_COPRO_LABO : $('#txtjabon').val(),
                hi_LEUCOSITOS_COPRO_LABO : $('#txtleuco2').val(),
                hi_HEMATIES_COPRO_LABO : $('#txthemati1').val(),
                hi_LEVADURAS_COPRO_LABO : $('#txtleva2').val(),
                hi_MICELIOS_COPRO_LABO : $('#txtmiceli').val(),
                hi_FLORA_COPRO_LABO : $('#txtflora').val(),
                hi_H_TRICOCEFALO_COPRO_LABO : $('#txthtrico').val(),
                hi_H_ASCARIS_COPRO_LABO : $('#txthasca').val(),
                hi_H_UNCINARIA_COPRO_LABO : $('#txthuncina').val(),
                hi_H_TENIA_COPRO_LABO : $('#txthtenia').val(),
                hi_H_OXYUROS_COPRO_LABO : $('#txthoxy').val(),
                hi_L_STRONGYLOIDE_COPRO_LABO : $('#txtlstrong').val(),
                hi_Q_HISTOLICA_COPRO_LABO : $('#txtqhisto').val(),
                hi_Q_COLI_COPRO_LABO : $('#txtqcoli').val(),
                hi_QG_LAMBIA_COPRO_LABO : $('#txtqglam').val(),
                hi_Q_LODAMOEBA_COPRO_LABO : $('#txtqloda').val(),
                hi_Q_NANA_COPRO_LABO : $('#txtqnana').val(),
                hi_TROCOMONA_HOMINIS_COPRO_LABO : $('#txttrocohomi').val(),
                hi_TROFOZOITO_AMEBA_COPRO_LABO : $('#txttrozoame').val(),
                hi_HOMINIS_COPRO_LABO : $('#txtbhominis').val(),
                hi_OTROS_COPRO_LABO : $('#txtotroscopro').val(),
                hi_COPROSCOPICO_COPRO_LABO: $('#txtcoproscopico').val(),
                hi_OBSERVACION_COPRO_LABO : $('#hi_OBSERVACION_COPRO_LABO').val(),
                
                ///////////////INMUNOLOGIA//////////////                
                hi_PCR_INMU_LABO : $('#txtpcr').val(),
                hi_RA_INMU_LABO : $('#txtra').val(),
                hi_ASTO_INMU_LABO : $('#txtasto').val(),
                hi_VDRL_INMU_LABO : $('#txtvdrl').val(),
                hi_TOXOPLASMA_INMU_LABO : $('#txttoxoplasma').val(),
                hi_GRAVINDEZ_INMU_LABO : $('#txtgravinsan').val(),
                hi_VIH_INMU_LABO : $('#txtvih').val(),
                hi_HB_INMU_LABO : $('#txthb').val(),
                hi_TSH_INMU_LABO : $('#txttsh').val(),
                hi_NEONATAL_PR_INMU_LABO_LABO : $('#hi_NEONATAL_PR_INMU_LABO_LABO').val(),
                hi_OBSERVACION_INMU_LABO : $('#txtobserinmu').val(),
                
                /////////////QUIMICA///////////////////////                                
                hi_GLICEMIA_A_QUI_LABO : $('#txtglicea').val(),
                hi_GLICEMIA_B_QUI_LABO : $('#txtgliceb').val(),
                hi_COLESTEROL_TOTAL_QUI_LABO : $('#txtcolest').val(),
                hi_COLESTEROL_HDL_QUI_LABO : $('#txtcoleshdl').val(),
                hi_COLESTEROL_LDL_QUI_LABO : $('#txtcolesldl').val(),
                hi_COLESTEROL_VLDL_QUI_LABO : $('#txtcolesvldl').val(),
                hi_TRIGLICERIDOS_QUI_LABO : $('#txttriglice').val(),
                hi_ACIDO_URICO_QUI_LABO : $('#txtaciuri').val(),
                hi_N_UREICO_QUI_LABO : $('#txtnuri').val(),
                hi_CREATININA_QUI_LABO : $('#txtcreati').val(),
                hi_UREA_QUI_LABO : $('#txturea').val(),
                hi_BILIRRUBINA_TOTAL_QUI_LABO : $('#txtbilitotal').val(),
                hi_BILIRRUBINA_DIRECTA_QUI_LABO : $('#txtbilidire').val(),
                hi_BILIRRUBINA_INDIRECTA_QUI_LABO : $('#txtbiliindire').val(),
                hi_OBSERVACION_QUI_LABO : $('#hi_OBSERVACION_QUI_LABO').val(),
                
                //**************MICROBIOLOGIA*****************************//
                hi_KOH_MICRO_LABO : $('#hi_KOH_MICRO_LABO').val(),
                hi_FROTIS_GAR_MICRO_LABO : $('#hi_FROTIS_GAR_MICRO_LABO').val(),
                hi_OBSERVACION_MICRO_LABO : $('#hi_OBSERVACION_MICRO_LABO').val(),
                //**************************************************************//

                //**************SECRECIONES VAGINALES*****************************//
                hi_CELULAS_EPITE_VAGINALES_LABO : $('#hi_CELULAS_EPITE_VAGINALES_LABO').val(),
                hi_LEUCOCITOS_VAGINALES_LABO : $('#hi_LEUCOCITOS_VAGINALES_LABO').val(),
                hi_HEMATIES_VAGINALES_LABO : $('#hi_HEMATIES_VAGINALES_LABO').val(),
                hi_TRICOMONAS_VAGINALES_LABO : $('#hi_TRICOMONAS_VAGINALES_LABO').val(),
                hi_LEVADURAS_VAGINALES_LABO : $('#hi_LEVADURAS_VAGINALES_LABO').val(),
                hi_PH_VAGINALES_LABO : $('#hi_PH_VAGINALES_LABO').val(),
                
                hi_OBSER_CEL_VAGINALES_LABO : $('#hi_OBSER_CEL_VAGINALES_LABO').val(),
                hi_OBSER_LEUCO_VAGINALES_LABO : $('#hi_OBSER_LEUCO_VAGINALES_LABO').val(),
                hi_OBSER_HEMA_VAGINALES_LABO : $('#hi_OBSER_HEMA_VAGINALES_LABO').val(),
                hi_OBSER_TRICO_VAGINALES_LABO : $('#hi_OBSER_TRICO_VAGINALES_LABO').val(),
                hi_OBSER_LEVA_VAGINALES_LABO : $('#hi_OBSER_LEVA_VAGINALES_LABO').val(),
                hi_OBSER_PH_VAGINALES_LABO : $('#hi_OBSER_PH_VAGINALES_LABO').val(),
                //**************************************************************//
                
                //**************SECRECIONES URETRALES*****************************//
                hi_CELULAS_EPITE_URETRALES_LABO : $('#hi_CELULAS_EPITE_URETRALES_LABO').val(),
                hi_LEUCOCITOS_URETRALES_LABO : $('#hi_LEUCOCITOS_URETRALES_LABO').val(),
                hi_HEMATIES_URETRALES_LABO : $('#hi_HEMATIES_URETRALES_LABO').val(),
                hi_PH_URETRALES_LABO : $('#hi_PH_URETRALES_LABO').val(),
                
                hi_OBSER_CEL_URETRALES_LABO : $('#hi_OBSER_CEL_URETRALES_LABO').val(),
                hi_OBSER_LEUCO_URETRALES_LABO : $('#hi_OBSER_LEUCO_URETRALES_LABO').val(),
                hi_OBSER_HEMA_URETRALES_LABO : $('#hi_OBSER_HEMA_URETRALES_LABO').val(),
                hi_OBSER_PH_URETRALES_LABO : $('#hi_OBSER_PH_URETRALES_LABO').val(),
                //**************************************************************//
                
                
                ///////////////////////////////////////////////////
                hi_estado_LABO: "ACTIVO",
                id_paciente: id_paciente, 
                ident_paciente: ident_paciente                
            }
            if(confirm("¿DESEA MODIFICAR LOS DATOS?")){
                $.ajax({
                    type: "POST",
                    url: "../gestionar_laboratorio",
                    data: datos,
                    success: function(data){
                        if(data==1){
                            alert('DATOS MODIFICADOS DE MANERA EXITOSA...');
                            setTimeout(function(){
                                window.location.href = "../ges_labora";		
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
    ////////////////////BTN ELIMINAR///////////////////////////////
    $('#btn_eli').live('click', function(){    
        setTimeout(function(){
            var datos={
                opcion: "eliminar",
                hi_FECHA_LABO : $('#txtfecha').val(),
                hi_ID_LABO:hi_ID_LABO,
                ///////////HEMATOLOGIA///////////////////////
                
                hi_HEMATOCRITO_HEMA_LABO : $('#txthemato').val(),
                hi_HEMOGLOBINA_HEMA_LABO : $('#txthemoglo').val(),
                hi_PLAQUETAS_HEMA_LABO : $('#txtplaque').val(),
                hi_LEUCOCITOS_HEMA_LABO : $('#txtleuco').val(),
                hi_NEUTROFILOS_HEMA_LABO : $('#txtneutro').val(),
                hi_LINFOCITOS_HEMA_LABO : $('#txtlinfo').val(),
                hi_EOSINOFILOS_HEMA_LABO : $('#txteosi').val(),
                hi_CAYADO_HEMA_LABO : $('#txtcaya').val(),
                hi_TP_HEMA_LABO : $('#txttp').val(),
                hi_VN1_HEMA_LABO : $('#txtvn1').val(),
                hi_VSG_HEMA_LABO : $('#txtvsg').val(),
                hi_BASOFILOS_HEMA_LABO : $('#txtbaso').val(),
                hi_MONOCITOS_HEMA_LABO : $('#txtmono').val(),
                hi_JUVENILES_HEMA_LABO : $('#txtjuve').val(),
                hi_ATIPICO_HEMA_LABO : $('#txtati').val(),
                hi_TPT_HEMA_LABO : $('#txttpt').val(),
                hi_VN2_HEMA_LABO : $('#txtvn2').val(),
                hi_GRUPO_SANGUINEO_HEMA_LABO : $('#comgrupo').val(),
                hi_RH_HEMA_LABO : $('#comrh').val(),              
                hi_OBSERVACION_HEMA_LABO: $('#hi_OBSERVACION_HEMA_LABO').val(),
                
                /////////////URIANALISIS///////////////////////
                hi_ASPECTO_URI_LABO : $('#txtaspe').val(),
                hi_COLOR_URI_LABO : $('#txtcolor').val(),
                hi_PH_URI_LABO : $('#txtph').val(),
                hi_DENSIDAD_URI_LABO : $('#txtdensi').val(),
                hi_ALBUMINA_URI_LABO : $('#txtalbu').val(),
                hi_GLUCOSA_URI_LABO : $('#txtgluco').val(),
                hi_ACETONA_URI_LABO : $('#txtacet').val(),
                hi_SANGRE_URI_LABO : $('#txtsangre').val(),
                hi_BILIRRUBINA_URI_LABO : $('#txtbili').val(),
                hi_UROBILINOGENO_URI_LABO : $('#txturobili').val(),
                hi_NITRITOS_URI_LABO : $('#txtnitri').val(),
                hi_LEUCOCITOS_URI_LABO : $('#txtleuco1').val(),
                hi_HEMATIES_URI_LABO : $('#txthemati').val(),
                hi_C_EPITELIALES_URI_LABO : $('#txtcepite').val(),
                hi_CILINDROS_URI_LABO : $('#txtcilin').val(),
                hi_CRISTALES_URI_LABO : $('#txtcrista').val(),
                hi_MOCO_URI_LABO : $('#txtmoco').val(),
                hi_BACTERIAS_URI_LABO : $('#txtbacte').val(),
                hi_LEVADURAS_URI_LABO : $('#txtleva').val(),
                hi_TRICOMONAS_URI_LABO : $('#txttrico').val(),
                hi_OTROS_URI_LABO : $('#txtotrosuria').val(),
                hi_OBSERVACION_URI_LABO : $('#hi_OBSERVACION_URI_LABO').val(),
                
                ////////////COPROLOGICO//////////////////////////////////////
                hi_COLOR_COPRO_LABO : $('#txtcolor1').val(),
                hi_CONSISTENCIA_COPRO_LABO : $('#txtconsis').val(),
                hi_PH_COPRO_LABO : $('#txtph1').val(),
                hi_AZ_REDUCTORES_COPRO_LABO : $('#txtazredu').val(),
                hi_MOCO_COPRO_LABO : $('#txtmoco1').val(),
                hi_EXAMEN_MICROSCOPICO_COPRO_LABO : $('#txtexmicro').val(),
                hi_F_VEGETALES_COPRO_LABO : $('#txtfvege').val(),
                hi_ALMIDONES_COPRO_LABO : $('#txtalmi').val(),
                hi_CELULOSA_COPRO_LABO : $('#txtcelulo').val(),
                hi_GRASAS_NEUTRAS_COPRO_LABO : $('#txtgraneu').val(),
                hi_JABONES_COPRO_LABO : $('#txtjabon').val(),
                hi_LEUCOSITOS_COPRO_LABO : $('#txtleuco2').val(),
                hi_HEMATIES_COPRO_LABO : $('#txthemati1').val(),
                hi_LEVADURAS_COPRO_LABO : $('#txtleva2').val(),
                hi_MICELIOS_COPRO_LABO : $('#txtmiceli').val(),
                hi_FLORA_COPRO_LABO : $('#txtflora').val(),
                hi_H_TRICOCEFALO_COPRO_LABO : $('#txthtrico').val(),
                hi_H_ASCARIS_COPRO_LABO : $('#txthasca').val(),
                hi_H_UNCINARIA_COPRO_LABO : $('#txthuncina').val(),
                hi_H_TENIA_COPRO_LABO : $('#txthtenia').val(),
                hi_H_OXYUROS_COPRO_LABO : $('#txthoxy').val(),
                hi_L_STRONGYLOIDE_COPRO_LABO : $('#txtlstrong').val(),
                hi_Q_HISTOLICA_COPRO_LABO : $('#txtqhisto').val(),
                hi_Q_COLI_COPRO_LABO : $('#txtqcoli').val(),
                hi_QG_LAMBIA_COPRO_LABO : $('#txtqglam').val(),
                hi_Q_LODAMOEBA_COPRO_LABO : $('#txtqloda').val(),
                hi_Q_NANA_COPRO_LABO : $('#txtqnana').val(),
                hi_TROCOMONA_HOMINIS_COPRO_LABO : $('#txttrocohomi').val(),
                hi_TROFOZOITO_AMEBA_COPRO_LABO : $('#txttrozoame').val(),
                hi_HOMINIS_COPRO_LABO : $('#txtbhominis').val(),
                hi_OTROS_COPRO_LABO : $('#txtotroscopro').val(),
                hi_COPROSCOPICO_COPRO_LABO: $('#txtcoproscopico').val(),
                hi_OBSERVACION_COPRO_LABO : $('#hi_OBSERVACION_COPRO_LABO').val(),
                
                ///////////////INMUNOLOGIA//////////////                
                hi_PCR_INMU_LABO : $('#txtpcr').val(),
                hi_RA_INMU_LABO : $('#txtra').val(),
                hi_ASTO_INMU_LABO : $('#txtasto').val(),
                hi_VDRL_INMU_LABO : $('#txtvdrl').val(),
                hi_TOXOPLASMA_INMU_LABO : $('#txttoxoplasma').val(),
                hi_GRAVINDEZ_INMU_LABO : $('#txtgravinsan').val(),
                hi_VIH_INMU_LABO : $('#txtvih').val(),
                hi_HB_INMU_LABO : $('#txthb').val(),
                hi_TSH_INMU_LABO : $('#txttsh').val(),
                hi_NEONATAL_PR_INMU_LABO_LABO : $('#hi_NEONATAL_PR_INMU_LABO_LABO').val(),
                hi_OBSERVACION_INMU_LABO : $('#txtobserinmu').val(),
                
                /////////////QUIMICA///////////////////////                                
                hi_GLICEMIA_A_QUI_LABO : $('#txtglicea').val(),
                hi_GLICEMIA_B_QUI_LABO : $('#txtgliceb').val(),
                hi_COLESTEROL_TOTAL_QUI_LABO : $('#txtcolest').val(),
                hi_COLESTEROL_HDL_QUI_LABO : $('#txtcoleshdl').val(),
                hi_COLESTEROL_LDL_QUI_LABO : $('#txtcolesldl').val(),
                hi_COLESTEROL_VLDL_QUI_LABO : $('#txtcolesvldl').val(),
                hi_TRIGLICERIDOS_QUI_LABO : $('#txttriglice').val(),
                hi_ACIDO_URICO_QUI_LABO : $('#txtaciuri').val(),
                hi_N_UREICO_QUI_LABO : $('#txtnuri').val(),
                hi_CREATININA_QUI_LABO : $('#txtcreati').val(),
                hi_UREA_QUI_LABO : $('#txturea').val(),
                hi_BILIRRUBINA_TOTAL_QUI_LABO : $('#txtbilitotal').val(),
                hi_BILIRRUBINA_DIRECTA_QUI_LABO : $('#txtbilidire').val(),
                hi_BILIRRUBINA_INDIRECTA_QUI_LABO : $('#txtbiliindire').val(),
                hi_OBSERVACION_QUI_LABO : $('#hi_OBSERVACION_QUI_LABO').val(),
                
                //**************MICROBIOLOGIA*****************************//
                hi_KOH_MICRO_LABO : $('#hi_KOH_MICRO_LABO').val(),
                hi_FROTIS_GAR_MICRO_LABO : $('#hi_FROTIS_GAR_MICRO_LABO').val(),
                hi_OBSERVACION_MICRO_LABO : $('#hi_OBSERVACION_MICRO_LABO').val(),
                //**************************************************************//

                //**************SECRECIONES VAGINALES*****************************//
                hi_CELULAS_EPITE_VAGINALES_LABO : $('#hi_CELULAS_EPITE_VAGINALES_LABO').val(),
                hi_LEUCOCITOS_VAGINALES_LABO : $('#hi_LEUCOCITOS_VAGINALES_LABO').val(),
                hi_HEMATIES_VAGINALES_LABO : $('#hi_HEMATIES_VAGINALES_LABO').val(),
                hi_TRICOMONAS_VAGINALES_LABO : $('#hi_TRICOMONAS_VAGINALES_LABO').val(),
                hi_LEVADURAS_VAGINALES_LABO : $('#hi_LEVADURAS_VAGINALES_LABO').val(),
                hi_PH_VAGINALES_LABO : $('#hi_PH_VAGINALES_LABO').val(),
                
                hi_OBSER_CEL_VAGINALES_LABO : $('#hi_OBSER_CEL_VAGINALES_LABO').val(),
                hi_OBSER_LEUCO_VAGINALES_LABO : $('#hi_OBSER_LEUCO_VAGINALES_LABO').val(),
                hi_OBSER_HEMA_VAGINALES_LABO : $('#hi_OBSER_HEMA_VAGINALES_LABO').val(),
                hi_OBSER_TRICO_VAGINALES_LABO : $('#hi_OBSER_TRICO_VAGINALES_LABO').val(),
                hi_OBSER_LEVA_VAGINALES_LABO : $('#hi_OBSER_LEVA_VAGINALES_LABO').val(),
                hi_OBSER_PH_VAGINALES_LABO : $('#hi_OBSER_PH_VAGINALES_LABO').val(),
                //**************************************************************//
                
                //**************SECRECIONES URETRALES*****************************//
                hi_CELULAS_EPITE_URETRALES_LABO : $('#hi_CELULAS_EPITE_URETRALES_LABO').val(),
                hi_LEUCOCITOS_URETRALES_LABO : $('#hi_LEUCOCITOS_URETRALES_LABO').val(),
                hi_HEMATIES_URETRALES_LABO : $('#hi_HEMATIES_URETRALES_LABO').val(),
                hi_PH_URETRALES_LABO : $('#hi_PH_URETRALES_LABO').val(),
                
                hi_OBSER_CEL_URETRALES_LABO : $('#hi_OBSER_CEL_URETRALES_LABO').val(),
                hi_OBSER_LEUCO_URETRALES_LABO : $('#hi_OBSER_LEUCO_URETRALES_LABO').val(),
                hi_OBSER_HEMA_URETRALES_LABO : $('#hi_OBSER_HEMA_URETRALES_LABO').val(),
                hi_OBSER_PH_URETRALES_LABO : $('#hi_OBSER_PH_URETRALES_LABO').val(),
                //**************************************************************//

                hi_estado_LABO: "INACTIVO",
                id_paciente: id_paciente, 
                ident_paciente: ident_paciente                
            }
            if(confirm("¿DESEA ELIMINAR LOS DATOS?")){
                $.ajax({
                    type: "POST",
                    url: "../gestionar_laboratorio",
                    data: datos,
                    success: function(data){
                        if(data==1){
                            alert('DATOS ELIMINADOS DE MANERA EXITOSA...');
                            setTimeout(function(){
                                window.location.href = "../ges_labora";		
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
        $('#busqueda_laboratorio').fadeIn(500);
        $('#oscuro').css('visibility','visible');
        $('#txtbuslabo').val("");       
        $("body").css("overflow", "hidden");
        $('#txtbuslabo').focus(); 
        $('#zona_laboratorio').html("");
        $('#zona_laboratorio2').html("");
        $('#busqueda_laboratorio').css('height','360px');
    });      
    $('#cer_venlabo').live('click', function(){
        $('#conte').css("display",'block');
        $('#busqueda_laboratorio').fadeOut(500);
        $('#oscuro').css('visibility','hidden');
        $("body").css("overflow", "auto");        
        $('#zona_laboratorio').html("");
        $('#zona_laboratorio2').html("");
        $('#area_fecha').css('display','none');
        $('#tablafecha').css('display','none');
        $('#tfec').val("");      
        $(":text").each(function(){	
            $($(this)).val('');
	});        
    }); 
    $('#busqueda_laboratorio').live('mouseout',function(){ 
        $('#oscuro').live("click",function(){ 
            $('#oscuro').css('visibility','hidden');
            $('#busqueda_laboratorio').fadeOut('slow'); 
            $('#conte').css("display",'block');
            $("body").css("overflow", "auto"); 
            $('#zona_laboratorio').html("");
            $('#zona_laboratorio2').html("");
            $('#area_fecha').css('display','none');
            $('#tablafecha').css('display','none');
            $('#tfec').val("");
            $(":text").each(function(){	
                $($(this)).val('');
            });             
        });
        return false; // Para evitar el efecto de burbujeo                
    });    
    $('#txtbuslabo').live('keyup', function(e){
        e.preventDefault(e);     
        $('#zona_laboratorio2').html("");
        $('#busqueda_laboratorio').css('height','360px');
        var combo=$('#combuslabo').find(':selected').val();
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
            combuslabo: combo,
            txtbuslabo: $('#txtbuslabo').val(),
            auxiliar: "PACIENTES"
        }
        $.ajax({
            type: "POST",
            url: "../cargar_examenes_laboratorio",
            data: datos,
            success: function(data){
                $('#zona_laboratorio').show(100).html(data);
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
        $('#busqueda_laboratorio').css('height','600px');
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
            auxiliar: "ATENCION"
        }
        $.ajax({
            type: "POST",
            url: "../mostrar_examenes_laboratorio",
            data: datos,
            success: function(data){
                $('#zona_laboratorio2').show(100).html(data);
                $('#area_fecha').slideDown(500);
                $('#tablafecha').slideDown(500);               
            },
            error: function(error_messages){
                alert('HA OCURRIDO UN ERROR');
            }
        });            
    }); 
    $('.marcado2').live('click', function(){     
        
        hi_ID_LABO=$(this).attr('hi_ID_LABO');
        $('#txtfecha').val($(this).attr('hi_FECHA_LABO'));

        ///////////HEMATOLOGIA///////////////////////
        $('#txthemato').val( $(this).attr('hi_HEMATOCRITO_HEMA_LABO'));
        $('#txthemoglo').val($(this).attr('hi_HEMOGLOBINA_HEMA_LABO'));
        $('#txtplaque').val($(this).attr('hi_PLAQUETAS_HEMA_LABO'));
        $('#txtleuco').val($(this).attr('hi_LEUCOCITOS_HEMA_LABO'));
        $('#txtneutro').val($(this).attr('hi_NEUTROFILOS_HEMA_LABO'));
        $('#txtlinfo').val($(this).attr('hi_LINFOCITOS_HEMA_LABO'));
        $('#txteosi').val($(this).attr('hi_EOSINOFILOS_HEMA_LABO'));
        $('#txtcaya').val($(this).attr('hi_CAYADO_HEMA_LABO'));
        $('#txttp').val($(this).attr('hi_TP_HEMA_LABO'));
        $('#txtvn1').val($(this).attr('hi_VN1_HEMA_LABO'));
        $('#txtvsg').val($(this).attr('hi_VSG_HEMA_LABO'));
        $('#txtbaso').val($(this).attr('hi_BASOFILOS_HEMA_LABO'));
        $('#txtmono').val($(this).attr('hi_MONOCITOS_HEMA_LABO'));
        $('#txtjuve').val($(this).attr('hi_JUVENILES_HEMA_LABO'));
        $('#txtati').val($(this).attr('hi_ATIPICO_HEMA_LABO'));
        $('#txttpt').val($(this).attr('hi_TPT_HEMA_LABO'));
        $('#txtvn2').val($(this).attr('hi_VN2_HEMA_LABO'));
        $('#comgrupo').val($(this).attr('hi_GRUPO_SANGUINEO_HEMA_LABO'));
        $('#comrh').val($(this).attr('hi_RH_HEMA_LABO'));
        $('#hi_OBSERVACION_HEMA_LABO').val($(this).attr('hi_OBSERVACION_HEMA_LABO'));
        
        /////////////URIANALISIS///////////////////////
        $('#txtaspe').val($(this).attr('hi_ASPECTO_URI_LABO'));
        $('#txtcolor').val($(this).attr('hi_COLOR_URI_LABO'));
        $('#txtph').val($(this).attr('hi_PH_URI_LABO'));
        $('#txtdensi').val($(this).attr('hi_DENSIDAD_URI_LABO'));
        $('#txtalbu').val($(this).attr('hi_ALBUMINA_URI_LABO'));
        $('#txtgluco').val($(this).attr('hi_GLUCOSA_URI_LABO'));
        $('#txtacet').val($(this).attr('hi_ACETONA_URI_LABO'));
        $('#txtsangre').val($(this).attr('hi_SANGRE_URI_LABO'));
        $('#txtbili').val($(this).attr('hi_BILIRRUBINA_URI_LABO'));
        $('#txturobili').val($(this).attr('hi_UROBILINOGENO_URI_LABO'));
        $('#txtnitri').val($(this).attr('hi_NITRITOS_URI_LABO'));
        $('#txtleuco1').val($(this).attr('hi_LEUCOCITOS_URI_LABO'));
        $('#txthemati').val($(this).attr('hi_HEMATIES_URI_LABO'));
        $('#txtcepite').val($(this).attr('hi_C_EPITELIALES_URI_LABO'));
        $('#txtcilin').val($(this).attr('hi_CILINDROS_URI_LABO'));
        $('#txtcrista').val($(this).attr('hi_CRISTALES_URI_LABO'));
        $('#txtmoco').val($(this).attr('hi_MOCO_URI_LABO'));
        $('#txtbacte').val($(this).attr('hi_BACTERIAS_URI_LABO'));
        $('#txtleva').val($(this).attr('hi_LEVADURAS_URI_LABO'));
        $('#txttrico').val($(this).attr('hi_TRICOMONAS_URI_LABO'));
        $('#txtotrosuria').val($(this).attr('hi_OTROS_URI_LABO'));
        $('#hi_OBSERVACION_URI_LABO').val($(this).attr('hi_OBSERVACION_URI_LABO'));
        
        ////////////COPROLOGICO//////////////////////////////////////
        $('#txtcolor1').val($(this).attr('hi_COLOR_COPRO_LABO'));
        $('#txtconsis').val($(this).attr('hi_CONSISTENCIA_COPRO_LABO'));
        $('#txtph1').val($(this).attr('hi_PH_COPRO_LABO'));
        $('#txtazredu').val($(this).attr('hi_AZ_REDUCTORES_COPRO_LABO'));
        $('#txtmoco1').val($(this).attr('hi_MOCO_COPRO_LABO'));
        $('#txtexmicro').val($(this).attr('hi_EXAMEN_MICROSCOPICO_COPRO_LABO'));
        $('#txtfvege').val($(this).attr('hi_F_VEGETALES_COPRO_LABO'));
        $('#txtalmi').val($(this).attr('hi_ALMIDONES_COPRO_LABO'));
        $('#txtcelulo').val($(this).attr('hi_CELULOSA_COPRO_LABO'));
        $('#txtgraneu').val($(this).attr('hi_GRASAS_NEUTRAS_COPRO_LABO'));
        $('#txtjabon').val($(this).attr('hi_JABONES_COPRO_LABO'));
        $('#txtleuco2').val($(this).attr('hi_LEUCOSITOS_COPRO_LABO'));
        $('#txthemati1').val($(this).attr('hi_HEMATIES_COPRO_LABO'));
        $('#txtleva2').val($(this).attr('hi_LEVADURAS_COPRO_LABO'));
        $('#txtmiceli').val($(this).attr('hi_MICELIOS_COPRO_LABO'));
        $('#txtflora').val($(this).attr('hi_FLORA_COPRO_LABO'));
        $('#txthtrico').val($(this).attr('hi_H_TRICOCEFALO_COPRO_LABO'));
        $('#txthasca').val($(this).attr('hi_H_ASCARIS_COPRO_LABO'));
        $('#txthuncina').val($(this).attr('hi_H_UNCINARIA_COPRO_LABO'));
        $('#txthtenia').val($(this).attr('hi_H_TENIA_COPRO_LABO'));
        $('#txthoxy').val($(this).attr('hi_H_OXYUROS_COPRO_LABO'));
        $('#txtlstrong').val($(this).attr('hi_L_STRONGYLOIDE_COPRO_LABO'));
        $('#txtqhisto').val($(this).attr('hi_Q_HISTOLICA_COPRO_LABO'));
        $('#txtqcoli').val($(this).attr('hi_Q_COLI_COPRO_LABO'));
        $('#txtqglam').val($(this).attr('hi_QG_LAMBIA_COPRO_LABO'));
        $('#txtqloda').val($(this).attr('hi_Q_LODAMOEBA_COPRO_LABO'));
        $('#txtqnana').val($(this).attr('hi_Q_NANA_COPRO_LABO'));
        $('#txttrocohomi').val($(this).attr('hi_TROCOMONA_HOMINIS_COPRO_LABO'));
        $('#txttrozoame').val($(this).attr('hi_TROFOZOITO_AMEBA_COPRO_LABO'));
        $('#txtbhominis').val($(this).attr('hi_HOMINIS_COPRO_LABO'));
        $('#txtotroscopro').val($(this).attr('hi_OTROS_COPRO_LABO'));
        $('#txtcoproscopico').val($(this).attr('hi_COPROSCOPICO_COPRO_LABO'));
        $('#hi_OBSERVACION_COPRO_LABO').val($(this).attr('hi_OBSERVACION_COPRO_LABO'));
        
        /////////////QUIMICA///////////////////////                                                
        $('#txtglicea').val($(this).attr('hi_GLICEMIA_A_QUI_LABO'));
        $('#txtgliceb').val($(this).attr('hi_GLICEMIA_B_QUI_LABO'));
        $('#txtcolest').val($(this).attr('hi_COLESTEROL_TOTAL_QUI_LABO'));
        $('#txtcoleshdl').val($(this).attr('hi_COLESTEROL_HDL_QUI_LABO'));
        $('#txtcolesldl').val($(this).attr('hi_COLESTEROL_LDL_QUI_LABO'));
        $('#txtcolesvldl').val($(this).attr('hi_COLESTEROL_VLDL_QUI_LABO'));
        $('#txttriglice').val($(this).attr('hi_TRIGLICERIDOS_QUI_LABO'));
        $('#txtaciuri').val($(this).attr('hi_ACIDO_URICO_QUI_LABO'));
        $('#txtnuri').val($(this).attr('hi_N_UREICO_QUI_LABO'));
        $('#txtcreati').val($(this).attr('hi_CREATININA_QUI_LABO'));
        $('#txturea').val($(this).attr('hi_UREA_QUI_LABO'));
        $('#txtbilitotal').val($(this).attr('hi_BILIRRUBINA_TOTAL_QUI_LABO'));
        $('#txtbilidire').val($(this).attr('hi_BILIRRUBINA_DIRECTA_QUI_LABO'));
        $('#txtbiliindire').val($(this).attr('hi_BILIRRUBINA_INDIRECTA_QUI_LABO'));
        $('#hi_OBSERVACION_QUI_LABO').val($(this).attr('hi_OBSERVACION_QUI_LABO'));
                
        ///////////////INMUNOLOGIA//////////////
        $('#txtpcr').val($(this).attr('hi_PCR_INMU_LABO'));
        $('#txtra').val($(this).attr('hi_RA_INMU_LABO'));
        $('#txtasto').val($(this).attr('hi_ASTO_INMU_LABO'));
        $('#txtvdrl').val($(this).attr('hi_VDRL_INMU_LABO'));
        $('#txttoxoplasma').val($(this).attr('hi_TOXOPLASMA_INMU_LABO'));
        $('#txtgravinsan').val($(this).attr('hi_GRAVINDEZ_INMU_LABO'));
        $('#txtvih').val($(this).attr('hi_VIH_INMU_LABO'));
        $('#txthb').val($(this).attr('hi_HB_INMU_LABO'));
        $('#txttsh').val($(this).attr('hi_TSH_INMU_LABO'));
        $('#txtobserinmu').val($(this).attr('hi_OBSERVACION_INMU_LABO'));
        $('#hi_NEONATAL_PR_INMU_LABO_LABO').val($(this).attr('hi_NEONATAL_PR_INMU_LABO_LABO'));
        
        //*************MICROBIOLOGIA********************//
        $('#hi_KOH_MICRO_LABO').val($(this).attr('hi_KOH_MICRO_LABO'));
        $('#hi_FROTIS_GAR_MICRO_LABO').val($(this).attr('hi_FROTIS_GAR_MICRO_LABO'));
        $('#hi_OBSERVACION_MICRO_LABO').val($(this).attr('hi_OBSERVACION_MICRO_LABO'));
        
        //*************SECRECION VAGINAL********************//
        $('#hi_CELULAS_EPITE_VAGINALES_LABO').val($(this).attr('hi_CELULAS_EPITE_VAGINALES_LABO'));
        $('#hi_LEUCOCITOS_VAGINALES_LABO').val($(this).attr('hi_LEUCOCITOS_VAGINALES_LABO'));
        $('#hi_HEMATIES_VAGINALES_LABO').val($(this).attr('hi_HEMATIES_VAGINALES_LABO'));
        $('#hi_TRICOMONAS_VAGINALES_LABO').val($(this).attr('hi_TRICOMONAS_VAGINALES_LABO'));
        $('#hi_LEVADURAS_VAGINALES_LABO').val($(this).attr('hi_LEVADURAS_VAGINALES_LABO'));
        $('#hi_PH_VAGINALES_LABO').val($(this).attr('hi_PH_VAGINALES_LABO'));
        $('#hi_OBSER_CEL_VAGINALES_LABO').val($(this).attr('hi_OBSER_CEL_VAGINALES_LABO'));
        $('#hi_OBSER_LEUCO_VAGINALES_LABO').val($(this).attr('hi_OBSER_LEUCO_VAGINALES_LABO'));
        $('#hi_OBSER_HEMA_VAGINALES_LABO').val($(this).attr('hi_OBSER_HEMA_VAGINALES_LABO'));
        $('#hi_OBSER_TRICO_VAGINALES_LABO').val($(this).attr('hi_OBSER_TRICO_VAGINALES_LABO'));
        $('#hi_OBSER_LEVA_VAGINALES_LABO').val($(this).attr('hi_OBSER_LEVA_VAGINALES_LABO'));
        $('#hi_OBSER_PH_VAGINALES_LABO').val($(this).attr('hi_OBSER_PH_VAGINALES_LABO'));
        
        //*************SECRECION URETRAL********************//
        $('#hi_CELULAS_EPITE_URETRALES_LABO').val($(this).attr('hi_CELULAS_EPITE_URETRALES_LABO'));
        $('#hi_LEUCOCITOS_URETRALES_LABO').val($(this).attr('hi_LEUCOCITOS_URETRALES_LABO'));
        $('#hi_HEMATIES_URETRALES_LABO').val($(this).attr('hi_HEMATIES_URETRALES_LABO'));
        $('#hi_PH_URETRALES_LABO').val($(this).attr('hi_PH_URETRALES_LABO'));
        $('#hi_OBSER_CEL_URETRALES_LABO').val($(this).attr('hi_OBSER_CEL_URETRALES_LABO'));
        $('#hi_OBSER_LEUCO_URETRALES_LABO').val($(this).attr('hi_OBSER_LEUCO_URETRALES_LABO'));
        $('#hi_OBSER_HEMA_URETRALES_LABO').val($(this).attr('hi_OBSER_HEMA_URETRALES_LABO'));
        $('#hi_OBSER_PH_URETRALES_LABO').val($(this).attr('hi_OBSER_PH_URETRALES_LABO'));
        
        $('#btn_mod').css('display','block');
        $('#btn_eli').css('display','block');
        $('#btn_bus').css('display','none');
        $('#btn_gua').css('display','none');
        $('#btn_nue').css('display','none');
        $('#form_labora').find('input, textarea, button, select').attr('disabled',false); 
        //$('#otro-id1').attr('id','abrir_venpaci');
        $('#abrir_venpaci').attr('id','otro-id1');
        $("#txttipodoc, #txtdoc, #txtnompac,#txtedad,#combosex,#txttel,#txtdir,#txtmun,#comgrupoetn,#txtnomres,#txtparent,#txtdirresp,#txtnumhis").attr('disabled', true);                           
        
        $('#conte').css("display",'block');
        $('#busqueda_laboratorio').fadeOut(500);
        $('#oscuro').css('visibility','hidden');
        $("body").css("overflow", "auto");        
        $('#zona_laboratorio').html("");
        $('#zona_laboratorio2').html("");
        $('#area_fecha').css('display','none');
        $('#tablafecha').css('display','none');
        $('#tfec').val("");         
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
            url: "../mostrar_examenes_laboratorio",
            data: datos,
            success: function(data){
                $('#zona_laboratorio2').show(100).html(data);
                $('#area_fecha').slideDown(500);
                $('#tablafecha').slideDown(500);
            },
            error: function(error_messages){
                alert('HA OCURRIDO UN ERROR');
            }
        });                    
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
