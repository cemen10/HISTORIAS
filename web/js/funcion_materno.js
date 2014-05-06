$(document).ready(function() {
    //////////////////VARIABLES GLOBALES///////////////////////////////////////////////////
    var id_paciente;
    var ident_paciente;
    var hi_ID_MAT_PER;
    var camponuevo = 0;
    
    var cn=0;
    var vac=1;
    var cuan=0;
    
    var vacia=1;
    var cuantos=0;
    var vector=new Array();
    var vector1=new Array();
    var entrar=1;
        
    var intenso1=0;
    var intenso2=0;
    var ca1=0;
    var ca2=0;
    var ca3=0;    

    var hi_ID_ANTFAM;
    var hi_ID_ANTPER;
    var hi_ID_ANTGIN;
    var hi_ID_HISREP;
    var hi_ID_CONASO;
    var hi_ID_EMBACT;
    var hi_ID_RIEPSI;
    var hi_ID_RIEBIO;
    var hi_ID_EXAGLI;
    var hi_ID_EXACTGO;
    var hi_ID_PARA;
    var hi_ID_PARA2;
    var hi_ID_SULLI;
    var hi_ID_ECO;
//    var hi_ID_CON_PRE;
    var hi_ID_PREE;
    var hi_ID_EXAMEN;
    var hi_ID_MOR_MAT;
    var hi_ID_PRO;
    var hi_ID_PAR;
    var hi_ID_ORD;
    var hi_ID_TER;
    var hi_ID_MED;
    var hi_ID_INS;
    var hi_ID_RECNAC;
    var hi_ID_MOVREM;

    ////////////////////////////////////////////////////////////////////////////////////
    //////////////////////INICIALIZAR OBJETOS//////////////////////////////////////////////////////////////////////////
    $('#form_materno').find('input, textarea, button, select').attr('disabled','disabled'); 
    $('#abrir_venpaci').attr('id','otro-id1');
    $('#abrir_vendiagnostico').attr('id','otro-id3');
    $("#txtcual1").autoResize();
    $("#txtcual1").css("height","20px");      
    $("#txtcual2").autoResize();
    $("#txtcual2").css("height","20px"); 
    $("#txtcual3").autoResize();
    $("#txtcual3").css("height","20px");     
    $("#txtcual4").autoResize();
    $("#txtcual4").css("height","20px");     
    $("#txtanam").autoResize();
    $("#txtanam").css("height","20px");      
    $("#hi_OBSERVACIONES1C_ECO").autoResize();
    $("#hi_OBSERVACIONES1C_ECO").css("height","20px");   
    $("#hi_OBSERVACIONES1TRI_ECO").autoResize();
    $("#hi_OBSERVACIONES1TRI_ECO").css("height","20px");   
    $("#hi_OTRAS_ANO2TRI_ECO").autoResize();
    $("#hi_OTRAS_ANO2TRI_ECO").css("height","20px");   
    $("#hi_OBSERVA2TRI_ECO").autoResize();
    $("#hi_OBSERVA2TRI_ECO").css("height","20px");     
    $("#hi_OTRAS_ANO3TRI_ECO").autoResize();
    $("#hi_OTRAS_ANO3TRI_ECO").css("height","20px");  
    $("#hi_OBSERVA3TRI_ECO").autoResize();
    $("#hi_OBSERVA3TRI_ECO").css("height","20px");       
    $("#hi_CUALITS_ANTGIN").autoResize();
    $("#hi_CUALITS_ANTGIN").css("height","20px");      
    $("#hi_OTRA_PRO").autoResize();
    $("#hi_OTRA_PRO").css("height","20px");  
    $("#hi_DX_EVOLUCION").autoResize();
    $("#hi_DX_EVOLUCION").css("height","20px");     
    $("#txtdxevo").autoResize();
    $("#txtdxevo").css("height","20px");     
    
    $("#txtg,#txtp,#txtc,#txta,#txte,#txtv,#txtm").numeric({decimal: false, negative: false}, function() {this.value = "";this.focus();});
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
        $('#form_materno').find('input, textarea, button, select').attr('disabled',false); 
        $('#otro-id1').attr('id','abrir_venpaci');     
        $('#otro-id3').attr('id','abrir_vendiagnostico');     
        $('#txtdoc').focus();
        $('#btn_add').css('display','inline-block');       
        $('#btn_add3').css('display','inline-block');   
//        $('#txtfinicial').addClass("calen");
    });    
    ////////////////////BTN_CANCELAR//////////////////////////////////
    $('#btn_can').live('click', function(){
        setTimeout(function(){
            window.location.href = "../ges_materno_per";								 							
	}, 300);        
    });    
    ///////////////////////////////////////////////////////////////////////////     
    ////////////////////BTN_GUARDAR//////////////////////////////////
    $('#btn_gua').live('click', function(){        
       setTimeout(function(){
           //////////////////////VALIDAR CAMPOS////////////////////////////////////////
           resul=$.validatxt('#txtdoc','Por Favor Seleccione El Paciente..');
           if(resul=="1"){return;}
           resul=$.validatxt('#txtfinicial','Por Seleccione La Fecha De La Historia..');
           if(resul=="1"){return;}
           datos="";
           //****************************TABLA MATERNO PERINATAL**********************************//
           datos+="opcion=guardar&hi_FECHA_MAT_PER="+$('#txtfinicial').val()+"&hi_ESTADO_MAT_PER=ACTIVO&id_paciente="+id_paciente+"&ident_paciente="+ident_paciente;
           //****************************TABLA ANTECEDENTES FAMILIARES****************************//
           datos+="&hi_HTA_CRONICA_ANTFAM=" + $('#combohta1').val() +"&hi_PREECLAMPSIA1_ANTFAM=" +$('#combopree1').val()+"&hi_DIABETES1_ANTFAM=" +$('#combodiab1').val();
           datos+="&hi_ECLAMPSIA1_ANTFAM="+$('#comboecla1').val()+"&hi_GEMELARES_ANTFAM=" +$('#combogeme').val()+"&hi_CARDIOPATIA_ANTFAM="+ $('#combocardiopa').val();
           datos+="&hi_TBC_ANTFAM=" +$('#combotbc').val()+"&hi_METABOLICOS_ANTFAM=" +$('#combometab').val()+"&hi_AUTOINMUNES_ANTFAM="+$('#comboautoi').val();
           datos+="&hi_INFECCIOSAS_ANTFAM=" +$('#comboinfe').val()+"&hi_CONGENITAS_ANTFAM="+$('#comboconge').val()+"&hi_NEOPLASIAS_ANTFAM="+ $('#comboneopla').val();
           datos+="&hi_EPILEPSIA_ANTFAM="+ $('#comboepile').val()+"&hi_OTROS1_ANTFAM="+ $('#combootros1').val()+"&hi_CUAL1_ANTFAM="+ $('#txtcual1').val();
           //*************************************************************************************//
           //****************************TABLA ANTECEDENTES PERSONALES****************************//
           datos+="&hi_TUBERCULOSIS_ANTPER="+ $('#combotuber').val()+"&hi_DIABETES2_ANTPER="+ $('#combodiab2').val()+"&hi_DIABETES_GES_ANTPER="+ $('#combodiabges').val()+"&hi_HTA_CRONICA2_ANTPER="+ $('#combohta2').val();
           datos+="&hi_CIRUGIAPELUTE_ANTPER="+ $('#combocirupel').val()+"&hi_PREECLAMPSIA2_ANTPER="+ $('#combopree2').val()+"&hi_ECLAMPSIA2_ANTPER="+ $('#comboecla2').val()+"&hi_ALERGICOS_ANTPER="+ $('#comboalerg').val();
           datos+="&hi_TABAQUISMO_ANTPER="+ $('#combotaba').val()+"&hi_ALCOHOLISMO_ANTPER="+ $('#comboalco').val()+"&hi_ANTITETANICA_ANTPER="+ $('#comboantite').val()+"&hi_MMR_ANTPER="+ $('#combommr').val();
           datos+="&hi_ENFERMEDAD_MEN_ANTPER="+ $('#comboenferme').val()+"&hi_ACTIVIDAD_FIS_ANTPER="+ $('#comboactifis').val()+"&hi_VICTIMA_MAL_ANTPER="+ $('#combovicti').val()+"&hi_OTROS2_ANTPER="+ $('#combootros2').val();
           datos+="&hi_CUAL2_ANTPER="+ $('#txtcual2').val();
           //*************************************************************************************//
           //****************************TABLA ANTECEDENTES GINECOLOGICOS****************************//
           datos+="&hi_MENARQUIA_ANTGIN="+ $('#txtmenar').val()+"&hi_G_ANTGIN="+ $('#txtg').val()+"&hi_P_ANTGIN="+ $('#txtp').val()+"&hi_C_ANTGIN="+ $('#txtc').val()+"&hi_A_ANTGIN="+ $('#txta').val();
           datos+="&hi_E_ANTGIN="+ $('#txte').val()+"&hi_V_ANTGIN="+ $('#txtv').val()+"&hi_M_ANTGIN="+ $('#txtm').val()+"&hi_CICLOS_ANTGIN="+ $('#combociclos').val()+"&hi_PLANIFICACION_FAM_ANTGIN="+ $('#comboplanif').val();
           datos+="&hi_FLUJO_VAG_ANTGIN="+ $('#comboflujov').val()+"&hi_ITS_ANTGIN="+ $('#comboits').val()+"&hi_CITOLOGIA_ULT_ANTGIN="+ $('#combocitol').val()+"&hi_COLCOPSCOPIA_ANTGIN="+ $('#combocolcops').val()+"&hi_PERIODO_INTER_ANTGIN="+ $('#txtperiointer').val();
           datos+="&hi_INFERTILIDAD_ANTGIN="+ $('#comboinfert').val()+"&hi_TTOS_INFER_ANTGIN="+ $('#combottos').val()+"&hi_RPM_ANTGIN="+ $('#comborpm').val()+"&hi_RCIU_ANTGIN="+ $('#comborciu').val()+"&hi_APP_ANTGIN="+ $('#comboapp').val();
           datos+="&hi_PARTO_PREM_ANTGIN="+ $('#combopartopre').val()+"&hi_GEMELAR_ANTGIN="+ $('#combogemelar').val()+"&hi_MALFORMACIONES_ANTGIN="+ $('#combomalform').val()+"&hi_POLIHIDRAMNIOS_ANTGIN="+ $('#combopolihri').val()+"&hi_OLIGOHIDRAMNIOS_ANTGIN="+ $('#combooligohri').val();
           datos+="&hi_EMB_PROLONGADO_ANTGIN="+ $('#comboembprolo').val()+"&hi_AMENAZA_ABO_ANTGIN="+ $('#comboameabort').val()+"&hi_OTROS3_ANTGIN="+ $('#combootros3').val()+"&hi_CUAL3_ANTGIN="+ $('#txtcual3').val()+"&hi_CUALITS_ANTGIN="+$('#hi_CUALITS_ANTGIN').val();
           //****************************TABLA HISTORIA REPRODUCTIVA****************************//
           hi_ABORTO_HABIT_HISREP=$('#chehabit').val();
           hi_RETENCION_PLA_HISREP=$('#cheretpla').val();
           hi_REC_NACIDO1_HISREP=$('#cherecnacmay').val();
           hi_REC_NACIDO2_HISREP=$('#cherecnac').val();
           hi_HTA_INDUCIDO_HISREP=$('#chehtaindu').val();
           hi_EMB_GEMEL_CES_HISREP=$('#cheembgemel').val();
           hi_MORTINATO_HISREP=$('#chemorti').val();
           hi_TP_PROLON_HISREP=$('#chetpprolon').val();
           datos+="&hi_EDAD_HISREP="+ $('#comboedad').val()+"&hi_PARIDAD_HISREP="+ $('#comboparidad').val()+"&hi_ABORTO_HABIT_HISREP="+ hi_ABORTO_HABIT_HISREP+"&hi_RETENCION_PLA_HISREP="+ hi_RETENCION_PLA_HISREP+"&hi_REC_NACIDO1_HISREP="+ hi_REC_NACIDO1_HISREP;
           datos+="&hi_REC_NACIDO2_HISREP="+ hi_REC_NACIDO2_HISREP+"&hi_HTA_INDUCIDO_HISREP="+ hi_HTA_INDUCIDO_HISREP+"&hi_EMB_GEMEL_CES_HISREP="+ hi_EMB_GEMEL_CES_HISREP+"&hi_MORTINATO_HISREP="+ hi_MORTINATO_HISREP+"&hi_TP_PROLON_HISREP="+ hi_TP_PROLON_HISREP;           
           //*************************************************************************************//
           //****************************TABLA CONDICIONES ASOCIADAS****************************//
           datos+="&hi_QX_GINECOLOGIAS1_CONASO="+ $('#comboqxgines1').val()+"&hi_ENF_RENS1_CONASO="+ $('#comborenalcros1').val()+"&hi_DIABETES_GESS1_CONASO="+ $('#combodiabges1').val()+"&hi_DIABETES_MELLIS1_CONASO="+ $('#combodiabmells1').val()+"&hi_ENF_CARDIACAS1_CONASO="+ $('#comboenfcardis1').val();
           datos+="&hi_ENF_INFAGUDAS1_CONASO="+ $('#comboenfinfes1').val()+"&hi_ENF_AUTOINMUNES1_CONASO="+ $('#comboenfautoins1').val()+"&hi_ANEMIA_HBS1_CONASO="+ $('#comboanemias1').val()+"&hi_QX_GINECOLOGIAS2_CONASO="+ $('#comboqxgines2').val()+"&hi_ENF_RENS2_CONASO="+ $('#comborenalcros2').val();
           datos+="&hi_DIABETES_GESS2_CONASO="+ $('#combodiabges2').val()+"&hi_DIABETES_MELLIS2_CONASO="+ $('#combodiabmells2').val()+"&hi_ENF_CARDIACAS2_CONASO="+ $('#comboenfcardis2').val()+"&hi_ENF_INFAGUDAS2_CONASO="+ $('#comboenfinfes2').val()+"&hi_ENF_AUTOINMUNES2_CONASO="+ $('#comboenfautoins2').val();
           datos+="&hi_ANEMIA_HBS2_CONASO="+ $('#comboanemias2').val()+"&hi_QX_GINECOLOGIAS3_CONASO="+ $('#comboqxgines3').val()+"&hi_ENF_RENS3_CONASO="+ $('#comborenalcros3').val()+"&hi_DIABETES_GESS3_CONASO="+ $('#combodiabges3').val()+"&hi_DIABETES_MELLIS3_CONASO="+ $('#combodiabmells3').val();
           datos+="&hi_ENF_CARDIACAS3_CONASO="+ $('#comboenfcardis3').val()+"&hi_ENF_INFAGUDAS3_CONASO="+ $('#comboenfinfes3').val()+"&hi_ENF_AUTOINMUNES3_CONASO="+ $('#comboenfautoins3').val()+"&hi_ANEMIA_HBS3_CONASO="+ $('#comboanemias3').val();
           //*************************************************************************************//
           //****************************TABLA EMBARAZO ACTUAL************************************//
           datos+="&hi_HEMORRAGIAS1_MAL_EMBACT="+ $('#combohemomens1').val()+"&hi_VAGINAS1_MAL_EMBACT="+ $('#combovaginas1').val()+"&hi_E_PROLONGADOS1_MAL_EMBACT="+ $('#comboeprolongas1').val()+"&hi_HTAS1_MAL_EMBACT="+ $('#combohtas1').val()+"&hi_RPMS1_MAL_EMBACT="+ $('#comborpms1').val();
           datos+="&hi_POLIHRIDAMNIOSS1_MAL_EMBACT="+ $('#combopolihis1').val()+"&hi_RCIUS1_MAL_EMBACT="+ $('#comborcius1').val()+"&hi_EMB_MULTIPLES1_MAL_EMBACT="+ $('#comboembmultiples1').val()+"&hi_MALA_PRESENTS1_MAL_EMBACT="+ $('#combomalapres1').val()+"&hi_ISOS1_MAL_EMBACT="+ $('#comboisos1').val();
           datos+="&hi_HEMORRAGIAS2_MAL_EMBACT="+ $('#combohemomens2').val()+"&hi_VAGINAS2_MAL_EMBACT="+ $('#combovaginas2').val()+"&hi_E_PROLONGADOS2_MAL_EMBACT="+ $('#comboeprolongas2').val()+"&hi_HTAS2_MAL_EMBACT="+ $('#combohtas2').val()+"&hi_RPMS2_MAL_EMBACT="+ $('#comborpms2').val();
           datos+="&hi_POLIHRIDAMNIOSS2_MAL_EMBACT="+ $('#combopolihis2').val()+"&hi_RCIUS2_MAL_EMBACT="+ $('#comborcius2').val()+"&hi_EMB_MULTIPLES2_MAL_EMBACT="+ $('#comboembmultiples2').val()+"&hi_MALA_PRESENTS2_MAL_EMBACT="+ $('#combomalapres2').val()+"&hi_ISOS2_MAL_EMBACT="+ $('#comboisos2').val();
           datos+="&hi_HEMORRAGIAS3_MAL_EMBACT="+ $('#combohemomens3').val()+"&hi_VAGINAS3_MAL_EMBACT="+ $('#combovaginas3').val()+"&hi_E_PROLONGADOS3_MAL_EMBACT="+ $('#comboeprolongas3').val()+"&hi_HTAS3_MAL_EMBACT="+ $('#combohtas3').val()+"&hi_RPMS3_MAL_EMBACT="+ $('#comborpms3').val();
           datos+="&hi_POLIHRIDAMNIOSS3_MAL_EMBACT="+ $('#combopolihis3').val()+"&hi_RCIUS3_MAL_EMBACT="+ $('#comborcius3').val()+"&hi_EMB_MULTIPLES3_MAL_EMBACT="+ $('#comboembmultiples3').val()+"&hi_MALA_PRESENTS3_MAL_EMBACT="+ $('#combomalapres3').val()+"&hi_ISOS3_MAL_EMBACT="+ $('#comboisos3').val()+"&hi_INMUNIZACION_RH_MAL_EMBACT="+ $('#txtinmunizarh').val();          
           //*************************************************************************************//
           //****************************TABLA RIESGO PSICOSOCIAL************************************//
           datos+="&hi_TENSION_EMO_RIEPSI="+ $('#combotensionemo').val()+"&hi_HUMOR_DEPRE_RIEPSI="+ $('#combohumordepre').val()+"&hi_SINT_NEURO_RIEPSI="+ $('#comboneurovege').val()+"&hi_SOP_FAM_TIEM_RIEPSI="+ $('#comboeltiempo').val()+"&hi_SOP_FAM_ESPA_RIEPSI="+ $('#comboelespacio').val();
           datos+="&hi_SOP_FAM_DIN_RIEPSI="+ $('#comboeldinero').val()+"&hi_ES_VICTIMA_MAL_RIEPSI="+ $('#combovictimama').val()+"&hi_CUAL4_RIEPSI="+ $('#txtcual4').val()+"&hi_PARENTESCO_MAL_RIEPSI="+ $('#txtparentesco').val();
           //*************************************************************************************//
           //****************************TABLA RIESGO BIOPSICOSOCIAl************************************//
           datos+="&hi_TOTALS1_RIEBIO="+ $('#t1').val()+"&hi_TOTALS2_RIEBIO="+ $('#t2').val()+"&hi_TOTALS3_RIEBIO="+ $('#t3').val();           
           //*******************************************************************************************//
           //****************************TABLA EXAMENES GLICEMIA***********************************************//
           datos+="&hi_GLICEMIA_AYU_EXAGLI="+ $('#txtgliceayu').val()+"&hi_2GLICEMIA_EXAGLI="+ $('#txt2glicemia').val()+"&hi_FECHA_REALIZA_EXAGLI="+ $('#txtfrealiza').val()+"&hi_GRUPO_EXAGLI="+ $('#comgrupo').val()+"&hi_RH_EXAGLI="+ $('#comrh').val();
           //*******************************************************************************************//
           //****************************TABLA EXAMENES CTGO***********************************************//
           datos+="&hi_CTGO_EXACTGO="+ $('#txtctgo').val()+"&hi_GLICEMIA_PRIMERA_EXACTGO="+ $('#comgliceexa1').val()+"&hi_FECHA_GLICE_PRI_EXACTGO="+ $('#txtfgliceexa1').val()+"&hi_GLICEMIA_SEGUNDA_EXACTGO="+ $('#comgliceexa2').val()+"&hi_FECHA_GLICE_SEG_EXACTGO="+ $('#txtfgliceexa2').val()+"&hi_CURVA_GLICE_EXACTGO="+ $('#comcurvaglice').val();
           //*******************************************************************************************//
           //****************************TABLA PARACLINICOS 1***********************************************//
           datos+="&hi_HBANT_PARA="+ $('#hi_HBANT_PARA').val()+"&hi_HCTOANT_PARA="+ $('#hi_HCTOANT_PARA').val()+"&hi_VDRLANT_PARA="+ $('#hi_VDRLANT_PARA').val()+"&hi_FROTIS_VAGANT_PARA="+ $('#hi_FROTIS_VAGANT_PARA').val()+"&hi_PARCIALANT_PARA="+ $('#hi_PARCIALANT_PARA').val();
           datos+="&hi_GRAMORINAANT_PARA="+ $('#hi_GRAMORINAANT_PARA').val()+"&hi_BACTANT_PARA="+ $('#hi_BACTANT_PARA').val()+"&hi_HB1TRI_PARA="+ $('#hi_HB1TRI_PARA').val()+"&hi_HCTO1TRI_PARA="+ $('#hi_HCTO1TRI_PARA').val()+"&hi_VDRL1TRI_PARA="+ $('#hi_VDRL1TRI_PARA').val();
           datos+="&hi_FROTIS_VAG1TRI_PARA="+ $('#hi_FROTIS_VAG1TRI_PARA').val()+"&hi_PARCIAL1TRI_PARA="+ $('#hi_PARCIAL1TRI_PARA').val()+"&hi_GRAMORINA1TRI_PARA="+ $('#hi_GRAMORINA1TRI_PARA').val()+"&hi_BACT1TRI_PARA="+ $('#hi_BACT1TRI_PARA').val()+"&hi_HB2TRI_PARA="+ $('#hi_HB2TRI_PARA').val();
           datos+="&hi_HCTO2TRI_PARA="+ $('#hi_HCTO2TRI_PARA').val()+"&hi_VDRL2TRI_PARA="+ $('#hi_VDRL2TRI_PARA').val()+"&hi_FROTIS_VAG2TRI_PARA="+ $('#hi_FROTIS_VAG2TRI_PARA').val()+"&hi_PARCIAL2TRI_PARA="+ $('#hi_PARCIAL2TRI_PARA').val()+"&hi_GRAMORINA2TRI_PARA="+ $('#hi_GRAMORINA2TRI_PARA').val();
           datos+="&hi_BACT2TRI_PARA="+ $('#hi_BACT2TRI_PARA').val()+"&hi_HB3TRI_PARA="+ $('#hi_HB3TRI_PARA').val()+"&hi_HCTO3TRI_PARA="+ $('#hi_HCTO3TRI_PARA').val()+"&hi_VDRL3TRI_PARA="+ $('#hi_VDRL3TRI_PARA').val()+"&hi_FROTIS_VAG3TRI_PARA="+ $('#hi_FROTIS_VAG3TRI_PARA').val();
           datos+="&hi_PARCIAL3TRI_PARA="+ $('#hi_PARCIAL3TRI_PARA').val()+"&hi_GRAMORINA3TRI_PARA="+ $('#hi_GRAMORINA3TRI_PARA').val()+"&hi_BACT3TRI_PARA="+ $('#hi_BACT3TRI_PARA').val();
           //*******************************************************************************************//
           //****************************TABLA PARACLINICOS 2***********************************************//
           datos+="&hi_UROCULTIVOANT_PARA2="+ $('#hi_UROCULTIVOANT_PARA2').val()+"&hi_FTAABSANT_PARA2="+ $('#hi_FTAABSANT_PARA2').val()+"&hi_HEPATITISBANT_PARA2="+ $('#hi_HEPATITISBANT_PARA2').val()+"&hi_ANTITETANICAANT_PARA2="+ $('#hi_ANTITETANICAANT_PARA2').val()+"&hi_HIVANT_PARA2="+ $('#hi_HIVANT_PARA2').val()+"&hi_CITOLOGIA_CERANT_PARA2="+ $('#hi_CITOLOGIA_CERANT_PARA2').val();
           datos+="&hi_UROCULTIVO1TRI_PARA2="+ $('#hi_UROCULTIVO1TRI_PARA2').val()+"&hi_FTAABS1TRI_PARA2="+ $('#hi_FTAABS1TRI_PARA2').val()+"&hi_HEPATITISB1TRI_PARA2="+ $('#hi_HEPATITISB1TRI_PARA2').val()+"&hi_ANTITETANICA1TRI_PARA2="+ $('#hi_ANTITETANICA1TRI_PARA2').val()+"&hi_HIV1TRI_PARA2="+ $('#hi_HIV1TRI_PARA2').val()+"&hi_CITOLOGIA_CER1TRI_PARA2="+ $('#hi_CITOLOGIA_CER1TRI_PARA2').val();
           datos+="&hi_UROCULTIVO2TRI_PARA2="+ $('#hi_UROCULTIVO2TRI_PARA2').val()+"&hi_FTAABS2TRI_PARA2="+ $('#hi_FTAABS2TRI_PARA2').val()+"&hi_HEPATITISB2TRI_PARA2="+ $('#hi_HEPATITISB2TRI_PARA2').val()+"&hi_ANTITETANICA2TRI_PARA2="+ $('#hi_ANTITETANICA2TRI_PARA2').val()+"&hi_HIV2TRI_PARA2="+ $('#hi_HIV2TRI_PARA2').val()+"&hi_CITOLOGIA_CER2TRI_PARA2="+ $('#hi_CITOLOGIA_CER2TRI_PARA2').val();
           datos+="&hi_UROCULTIVO3TRI_PARA2="+ $('#hi_UROCULTIVO3TRI_PARA2').val()+"&hi_FTAABS3TRI_PARA2="+ $('#hi_FTAABS3TRI_PARA2').val()+"&hi_HEPATITISB3TRI_PARA2="+ $('#hi_HEPATITISB3TRI_PARA2').val()+"&hi_ANTITETANICA3TRI_PARA2="+ $('#hi_ANTITETANICA3TRI_PARA2').val()+"&hi_HIV3TRI_PARA2="+ $('#hi_HIV3TRI_PARA2').val()+"&hi_CITOLOGIA_CER3TRI_PARA2="+ $('#hi_CITOLOGIA_CER3TRI_PARA2').val();           
           //*******************************************************************************************//
           //****************************TABLA O SULLIVAN***********************************************//           
           datos+="&hi_GLISEMIA_PRE_SULLI="+ $('#hi_GLISEMIA_PRE_SULLI').val()+"&hi_GLICEMIA_POST_SULLI="+ $('#hi_GLICEMIA_POST_SULLI').val()+"&hi_FECHA_RESULTADO_SULLI="+ $('#hi_FECHA_RESULTADO_SULLI').val()+"&hi_S16_SULLI="+ $('#hi_S16_SULLI').val()+"&hi_S20_SULLI="+ $('#hi_S20_SULLI').val();
           datos+="&hi_S24_SULLI="+ $('#hi_S24_SULLI').val()+"&hi_S28_SULLI="+ $('#hi_S28_SULLI').val()+"&hi_S32_SULLI="+ $('#hi_S32_SULLI').val()+"&hi_S36_SULLI="+ $('#hi_S36_SULLI').val()+"&hi_FECHAS16_SULLI="+ $('#hi_FECHAS16_SULLI').val();
           datos+="&hi_FECHAS20_SULLI="+ $('#hi_FECHAS20_SULLI').val()+"&hi_FECHAS24_SULLI="+ $('#hi_FECHAS24_SULLI').val()+"&hi_FECHAS28_SULLI="+ $('#hi_FECHAS28_SULLI').val()+"&hi_FECHAS32_SULLI="+ $('#hi_FECHAS32_SULLI').val()+"&hi_FECHAS36_SULLI="+ $('#hi_FECHAS36_SULLI').val()+"&hi_ROLLOVERTEXT_SULLI="+ $('#hi_ROLLOVERTEXT_SULLI').val();
           //*******************************************************************************************//
           //****************************TABLA ECO***********************************************// 
           hi_NORMA2TRI_ECO=$('#hi_NORMA2TRI_ECO').val();
           hi_POLIHRIDAMNIOS2TRI_ECO=$('#hi_POLIHRIDAMNIOS2TRI_ECO').val();
           hi_RCIU2TRI_ECO=$('#hi_RCIU2TRI_ECO').val();
           hi_OLIGOHIDRAMNIOS2TRI_ECO=$('#hi_OLIGOHIDRAMNIOS2TRI_ECO').val();
           hi_MACROSOMIA2TRI_ECO=$('#hi_MACROSOMIA2TRI_ECO').val();
           hi_MALFORMACION2TRI_ECO=$('#hi_MALFORMACION2TRI_ECO').val();
           hi_NORMA3TRI_ECO=$('#hi_NORMA3TRI_ECO').val();
           hi_POLIHRIDAMNIOS3TRI_ECO=$('#hi_POLIHRIDAMNIOS3TRI_ECO').val();
           hi_RCIU3TRI_ECO=$('#hi_RCIU3TRI_ECO').val();
           hi_OLIGOHIDRAMNIOS3TRI_ECO=$('#hi_OLIGOHIDRAMNIOS3TRI_ECO').val();
           hi_MACROSOMIA3TRI_ECO=$('#hi_MACROSOMIA3TRI_ECO').val();
           hi_MALFORMACION3TRI_ECO=$('#hi_MALFORMACION3TRI_ECO').val();
           
           datos+="&hi_EDAD_GEST1C_ECO="+ $('#hi_EDAD_GEST1C_ECO').val()+"&hi_GESTACIONALAMENO1C_ECO="+ $('#hi_GESTACIONALAMENO1C_ECO').val()+"&hi_PRESENCIA_HEMA1C_ECO="+ $('#hi_PRESENCIA_HEMA1C_ECO').val()+"&hi_OTROS_MARCADORES1C_ECO="+ $('#hi_OTROS_MARCADORES1C_ECO').val()+"&hi_SONOLUCENCIAS1C_ECO="+ $('#hi_SONOLUCENCIAS1C_ECO').val();
           datos+="&hi_OBSERVACIONES1C_ECO="+ $('#hi_OBSERVACIONES1C_ECO').val()+"&hi_EDAD_GEST1TRI_ECO="+ $('#hi_EDAD_GEST1TRI_ECO').val()+"&hi_GESTACIONALAMENO1TRI_ECO="+ $('#hi_GESTACIONALAMENO1TRI_ECO').val()+"&hi_PRESENCIA_HEMA1TRI_ECO="+ $('#hi_PRESENCIA_HEMA1TRI_ECO').val()+"&hi_OTROS_MARCADORES1TRI_ECO="+ $('#hi_OTROS_MARCADORES1TRI_ECO').val();
           datos+="&hi_SONOLUCENCIAS1TRI_ECO="+ $('#hi_SONOLUCENCIAS1TRI_ECO').val()+"&hi_OBSERVACIONES1TRI_ECO="+ $('#hi_OBSERVACIONES1TRI_ECO').val()+"&hi_NORMA2TRI_ECO="+ hi_NORMA2TRI_ECO+"&hi_POLIHRIDAMNIOS2TRI_ECO="+ hi_POLIHRIDAMNIOS2TRI_ECO+"&hi_RCIU2TRI_ECO="+ hi_RCIU2TRI_ECO;
           datos+="&hi_OLIGOHIDRAMNIOS2TRI_ECO="+hi_OLIGOHIDRAMNIOS2TRI_ECO+"&hi_MACROSOMIA2TRI_ECO="+hi_MACROSOMIA2TRI_ECO+"&hi_MALFORMACION2TRI_ECO="+ hi_MALFORMACION2TRI_ECO+"&hi_OTRAS_ANO2TRI_ECO="+ $('#hi_OTRAS_ANO2TRI_ECO').val()+"&hi_OBSERVA2TRI_ECO="+ $('#hi_OBSERVA2TRI_ECO').val();
           datos+="&hi_NORMA3TRI_ECO="+hi_NORMA3TRI_ECO+"&hi_POLIHRIDAMNIOS3TRI_ECO="+ hi_POLIHRIDAMNIOS3TRI_ECO+"&hi_RCIU3TRI_ECO="+hi_RCIU3TRI_ECO+"&hi_OLIGOHIDRAMNIOS3TRI_ECO="+hi_OLIGOHIDRAMNIOS3TRI_ECO+"&hi_MACROSOMIA3TRI_ECO="+hi_MACROSOMIA3TRI_ECO;
           datos+="&hi_MALFORMACION3TRI_ECO="+hi_MALFORMACION3TRI_ECO+"&hi_OTRAS_ANO3TRI_ECO="+ $('#hi_OTRAS_ANO3TRI_ECO').val()+"&hi_OBSERVA3TRI_ECO="+ $('#hi_OBSERVA3TRI_ECO').val();           
           //*******************************************************************************************//           
           //****************************TABLA CONTROL PRENATAL***********************************************// 
           var k=1,j=0,p=1;j;              
           $("#detalle").find(':input').each(function (index) {                
               var id = $(this).attr("id");
               var valor = $(this).val(); 
               if(j==0){datos+="&"+id+p+"="+ valor;}
               if(j==1){datos+="&"+id+p+"="+ valor;}               
               if(j==2){datos+="&"+id+p+"="+ valor;}            
               if(j==3){datos+="&"+id+p+"="+ valor;}                                    
               if(j==4){datos+="&"+id+p+"="+ valor;}      
               if(j==5){datos+="&"+id+p+"="+ valor;}      
               if(j==6){datos+="&"+id+p+"="+ valor;}      
               if(j==7){datos+="&"+id+p+"="+ valor;}      
               if(j==8){datos+="&"+id+p+"="+ valor;}      
               if(j==9){datos+="&"+id+p+"="+ valor;}      
               if(j==10){datos+="&"+id+p+"="+ valor;}      
               if(j==11){datos+="&"+id+p+"="+ valor;}      
               if(j==12){datos+="&"+id+p+"="+ valor;}      
               if(j==13){datos+="&"+id+p+"="+ valor;}      
               if(j==14){datos+="&"+id+p+"="+ valor;}      
               if(j==15){datos+="&"+id+p+"="+ valor;}                     
               k=k+1;j=j+1;               
               if(j==16){j=0;p=p+1;}
           });  
           tam=p-1;
           datos+="&tam="+tam;               
           //*******************************************************************************************//   
           //****************************TABLA MORBILIDADES TRAZADORAS***********************************************// 
           datos+="&hi_SIN_RIESGO_PREE="+ $('#hi_SIN_RIESGO_PREE').val()+"&hi_CON_RIESGO_SIN_PREE="+ $('#hi_CON_RIESGO_SIN_PREE').val()+"&hi_CON_RIESGO_UTI_PREE="+ $('#hi_CON_RIESGO_UTI_PREE').val();
           datos+="&hi_CON_RIESGO_BIO1_PREE="+ $('#hi_CON_RIESGO_BIO1_PREE').val()+"&hi_CON_RIESGO_BIO2_PREE="+ $('#hi_CON_RIESGO_BIO2_PREE').val()+"&hi_CON_RIESGO_CAL_PREE="+ $('#hi_CON_RIESGO_CAL_PREE').val()+"&hi_CON_RIESGO_NUTRI_PREE="+ $('#hi_CON_RIESGO_NUTRI_PREE').val();
           //*******************************************************************************************//   
           //****************************TABLA EXAMEN ***********************************************// 
           datos+="&hi_PARTO_PRESIN_EXAMEN="+ $('#hi_PARTO_PRESIN_EXAMEN').val()+"&hi_DIABETESSIN_EXAMEN="+ $('#hi_DIABETESSIN_EXAMEN').val()+"&hi_BAJOSIN_EXAMEN="+ $('#hi_BAJOSIN_EXAMEN').val()+"&hi_RIESGOSIN_EXAMEN="+ $('#hi_RIESGOSIN_EXAMEN').val()+"&hi_HPPSIN_EXAMEN="+ $('#hi_HPPSIN_EXAMEN').val();
           datos+="&hi_PARTO_PRECONSIN_EXAMEN="+ $('#hi_PARTO_PRECONSIN_EXAMEN').val()+"&hi_DIABETESCONSIN_EXAMEN="+ $('#hi_DIABETESCONSIN_EXAMEN').val()+"&hi_BAJOCONSIN_EXAMEN="+ $('#hi_BAJOCONSIN_EXAMEN').val()+"&hi_RIESGOCONSIN_EXAMEN="+ $('#hi_RIESGOCONSIN_EXAMEN').val()+"&hi_HPPCONSIN_EXAMEN="+ $('#hi_HPPCONSIN_EXAMEN').val();
           datos+="&hi_PARTO_PRECONTRA_EXAMEN="+ $('#hi_PARTO_PRECONTRA_EXAMEN').val()+"&hi_DIABETESCONTRA_EXAMEN="+ $('#hi_DIABETESCONTRA_EXAMEN').val()+"&hi_BAJOCONTRA_EXAMEN="+ $('#hi_BAJOCONTRA_EXAMEN').val()+"&hi_RIESGOCONTRA_EXAMEN="+ $('#hi_RIESGOCONTRA_EXAMEN').val()+"&hi_HPPCONTRA_EXAMEN="+ $('#hi_HPPCONTRA_EXAMEN').val();
           //*******************************************************************************************//   
           //****************************TABLA MORBILIDAD MATERNA ***********************************************// 
           datos+="&hi_NINGUNA_MOR_MAT="+ $('#hi_NINGUNA_MOR_MAT').val()+"&hi_ABRUPTIO_MOR_MAT="+ $('#hi_ABRUPTIO_MOR_MAT').val()+"&hi_AMENAZA_MOR_MAT="+ $('#hi_AMENAZA_MOR_MAT').val()+"&hi_ANEMIA_MOR_MAT="+ $('#hi_ANEMIA_MOR_MAT').val()+"&hi_ATONIA_MOR_MAT="+ $('#hi_ATONIA_MOR_MAT').val();
           datos+="&hi_CARDIOPATIA_MOR_MAT="+ $('#hi_CARDIOPATIA_MOR_MAT').val()+"&hi_CID_MOR_MAT="+ $('#hi_CID_MOR_MAT').val()+"&hi_DESGARROS_MOR_MAT="+ $('#hi_DESGARROS_MOR_MAT').val()+"&hi_DIABETES_GES_MOR_MAT="+ $('#hi_DIABETES_GES_MOR_MAT').val()+"&hi_DIABETES_MELLI_MOR_MAT="+ $('#hi_DIABETES_MELLI_MOR_MAT').val();
           datos+="&hi_ECLAMPSIA_MOR_MAT="+ $('#hi_ECLAMPSIA_MOR_MAT').val()+"&hi_PREECLAMPSIA_LEVE_MOR_MAT="+ $('#hi_PREECLAMPSIA_LEVE_MOR_MAT').val()+"&hi_PRECLAMPSIA_SEVERA_MOR_MAT="+ $('#hi_PRECLAMPSIA_SEVERA_MOR_MAT').val()+"&hi_PRECLAMPSIA_SEVERACON_MOR_MAT="+ $('#hi_PRECLAMPSIA_SEVERACON_MOR_MAT').val()+"&hi_HEPATITIS_MOR_MAT="+ $('#hi_HEPATITIS_MOR_MAT').val();
           datos+="&hi_HIPERTENCION_CRO_MOR_MAT="+ $('#hi_HIPERTENCION_CRO_MOR_MAT').val()+"&hi_HIPERTENCION_GES_MOR_MAT="+ $('#hi_HIPERTENCION_GES_MOR_MAT').val()+"&hi_INFECCION_MOR_MAT="+ $('#hi_INFECCION_MOR_MAT').val()+"&hi_MALARIA_MOR_MAT="+ $('#hi_MALARIA_MOR_MAT').val()+"&hi_PLACENTA_PRE_MOR_MAT="+ $('#hi_PLACENTA_PRE_MOR_MAT').val();
           datos+="&hi_PLACENTA_RETE_MOR_MAT="+ $('#hi_PLACENTA_RETE_MOR_MAT').val()+"&hi_RCIU_MOR_MAT="+ $('#hi_RCIU_MOR_MAT').val()+"&hi_RUPTURA_MOR_MAT="+ $('#hi_RUPTURA_MOR_MAT').val()+"&hi_SEPSIS_MOR_MAT="+ $('#hi_SEPSIS_MOR_MAT').val()+"&hi_SIFILIS_MOR_MAT="+ $('#hi_SIFILIS_MOR_MAT').val();
           datos+="&hi_TBC_MOR_MAT="+ $('#hi_TBC_MOR_MAT').val()+"&hi_HEMORRAGIA_DEL_MOR_MAT="+ $('#hi_HEMORRAGIA_DEL_MOR_MAT').val()+"&hi_HEMORRAGIA_POST_MOR_MAT="+ $('#hi_HEMORRAGIA_POST_MOR_MAT').val()+"&hi_EMBARAZO_MUL_MOR_MAT="+ $('#hi_EMBARAZO_MUL_MOR_MAT').val()+"&hi_TROMBOEMBOLISMO_MOR_MAT="+ $('#hi_TROMBOEMBOLISMO_MOR_MAT').val();
           datos+="&hi_VIH_MOR_MAT="+ $('#hi_VIH_MOR_MAT').val()+"&hi_OTRAS_MOR_MAT="+ $('#hi_OTRAS_MOR_MAT').val();           
           //*******************************************************************************************//   
           //****************************TABLA PROCEDENCIA ***********************************************// 
           datos+="&hi_DOMICILIO_PRO="+ $('#hi_DOMICILIO_PRO').val()+"&hi_HOGAR_PRO="+ $('#hi_HOGAR_PRO').val()+"&hi_PARTERA_PRO="+ $('#hi_PARTERA_PRO').val()+"&hi_IPS_PRO="+ $('#hi_IPS_PRO').val()+"&hi_OTRA_PRO="+ $('#hi_OTRA_PRO').val();
           //*******************************************************************************************//   
           //****************************TABLA PARTO ***********************************************// 
           hh=$('#thora1').val();
           if($('#thora2').val()==""){
               $('#thora2').val(hh);
           }
           datos+="&hi_EDAD_GES_PAR="+ $('#hi_EDAD_GES_PAR').val()+"&hi_TAMA_PAR="+ $('#hi_TAMA_PAR').val()+"&hi_INICIO_PAR="+ $('#hi_INICIO_PAR').val()+"&hi_MEMBRANA_PAR="+ $('#hi_MEMBRANA_PAR').val()+"&hi_FECHA_MEM_PAR="+ $('#hi_FECHA_MEM_PAR').val();
           datos+="&hi_HORA_MEM_PAR="+ $('#thora2').val()+"&hi_PRESENTACION_PAR="+ $('#hi_PRESENTACION_PAR').val();
           //*******************************************************************************************//   
           //****************************TABLA ORDEN DE NACIMIENTO ***********************************************// 
           datos+="&hi_FETO_ORD="+ $('#hi_FETO_ORD').val()+"&hi_MANEJO_ORD="+ $('#hi_MANEJO_ORD').val()+"&hi_PARTOLOGIA_ORD="+ $('#hi_PARTOLOGIA_ORD').val()+"&hi_EPISIOTOMIA_ORD="+ $('#hi_EPISIOTOMIA_ORD').val()+"&hi_DESGARROS_ORD="+ $('#hi_DESGARROS_ORD').val();
           //*******************************************************************************************//   
           //****************************TABLA TERMINACION ***********************************************// 
           hhh=$('#thora11').val();
           if($('#thora22').val()==""){
               $('#thora22').val(hhh);
           }           
           datos+="&hi_ESPONTANEA_TER="+ $('#hi_ESPONTANEA_TER').val()+"&hi_FORCEPS_TER="+ $('#hi_FORCEPS_TER').val()+"&hi_CESAREA_TER="+ $('#hi_CESAREA_TER').val()+"&hi_CESAREA_HIS_TER="+ $('#hi_CESAREA_HIS_TER').val()+"&hi_FECHA_TER="+ $('#hi_FECHA_TER').val();
           datos+="&hi_HORA_TER="+ $('#thora22').val()+"&hi_CESAREA_PRE_TER="+ $('#hi_CESAREA_PRE_TER').val()+"&hi_SUFRIMIENTO_FA_TER="+ $('#hi_SUFRIMIENTO_FA_TER').val()+"&hi_SESPROPORCION_TER="+ $('#hi_SESPROPORCION_TER').val()+"&hi_ALTERACION_TER="+ $('#hi_ALTERACION_TER').val();
           datos+="&hi_PARTO_PRO_TER="+ $('#hi_PARTO_PRO_TER').val()+"&hi_FRACASO_TER="+ $('#hi_FRACASO_TER').val()+"&hi_DESCENSO_TER="+ $('#hi_DESCENSO_TER').val()+"&hi_EMBARAZO_MUL_TER="+ $('#hi_EMBARAZO_MUL_TER').val()+"&hi_RCIU_TER="+ $('#hi_RCIU_TER').val();
           datos+="&hi_PARTO_PRETE1_TER="+ $('#hi_PARTO_PRETE1_TER').val()+"&hi_PARTO_PRETE2_TER="+ $('#hi_PARTO_PRETE2_TER').val()+"&hi_PRESENTACION_POD_TER="+ $('#hi_PRESENTACION_POD_TER').val()+"&hi_PRESENTACION_POS_TER="+ $('#hi_PRESENTACION_POS_TER').val()+"&hi_POSICION_TER="+ $('#hi_POSICION_TER').val();
           datos+="&hi_RUPTURA_TER="+ $('#hi_RUPTURA_TER').val()+"&hi_INFECCION_TER="+ $('#hi_INFECCION_TER').val()+"&hi_PLACENTA_PRE_TER="+ $('#hi_PLACENTA_PRE_TER').val()+"&hi_ABRUPTIO_TER="+ $('#hi_ABRUPTIO_TER').val()+"&hi_PRECLAMPSIAECLA_TER="+ $('#hi_PRECLAMPSIAECLA_TER').val();
           datos+="&hi_HERPES_TER="+ $('#hi_HERPES_TER').val()+"&hi_CONDILOMATOSIS_TER="+ $('#hi_CONDILOMATOSIS_TER').val()+"&hi_OTRAS_ENF_TER="+ $('#hi_OTRAS_ENF_TER').val()+"&hi_MUERTE_FET_TER="+ $('#hi_MUERTE_FET_TER').val()+"&hi_MADRE_EXA_TER="+ $('#hi_MADRE_EXA_TER').val();
           datos+="&hi_DIABETES_TER="+ $('#hi_DIABETES_TER').val()+"&hi_VIH_TER="+ $('#hi_VIH_TER').val()+"&hi_OTRAS_TER="+ $('#hi_OTRAS_TER').val()+"&hi_EXTRA_MANU_PLACEN_TER="+ $('#hi_EXTRA_MANU_PLACEN_TER').val()+"&hi_PLACENTA_COMPLETA_TER="+ $('#hi_PLACENTA_COMPLETA_TER').val();
           datos+="&hi_HIPOTOMIA_UTERINA_TER="+ $('#hi_HIPOTOMIA_UTERINA_TER').val()+"&hi_MUERTE_FETAL2_TER="+ $('#hi_MUERTE_FETAL2_TER').val()+"&hi_PARTO_DESCONO_TER="+ $('#hi_PARTO_DESCONO_TER').val();
           
           //*******************************************************************************************//   
           //****************************TABLA MEDICAMENTOS ***********************************************// 
           datos+="&hi_ANESTESIA_LO_MED="+ $('#hi_ANESTESIA_LO_MED').val()+"&hi_ANESTESIA_RE_MED="+ $('#hi_ANESTESIA_RE_MED').val()+"&hi_ANESTESIA_GE_MED="+ $('#hi_ANESTESIA_GE_MED').val()+"&hi_TRANQUIZANTE_MED="+ $('#hi_TRANQUIZANTE_MED').val()+"&hi_OXITOCINA_MED="+ $('#hi_OXITOCINA_MED').val();
           datos+="&hi_ANTIBIOTICO_MED="+ $('#hi_ANTIBIOTICO_MED').val()+"&hi_ANALGESICO_MED="+ $('#hi_ANALGESICO_MED').val()+"&hi_OTRAH_MED="+ $('#hi_OTRAH_MED').val()+"&hi_NINGUNA_MED="+ $('#hi_NINGUNA_MED').val();
           //*******************************************************************************************//   
           //****************************TABLA INSTITUCION ***********************************************// 
           datos+="&hi_INSTITU_INS="+ $('#hi_INSTITU_INS').val()+"&hi_NIVEL_INS="+ $('#hi_NIVEL_INS').val()+"&hi_ATENDIOPAR_INS="+ $('#hi_ATENDIOPAR_INS').val()+"&hi_ATENDIONEO_INS="+ $('#hi_ATENDIONEO_INS').val();
           //*******************************************************************************************//   
           //****************************TABLA RECIEN NACIDO ***********************************************// 
           datos+="&hi_HISTORIA_RECNAC="+ $('#hi_HISTORIA_RECNAC').val()+"&hi_NOMBRE1_RECNAC="+ $('#hi_NOMBRE1_RECNAC').val()+"&hi_NOMBRE2_RECNAC="+ $('#hi_NOMBRE2_RECNAC').val()+"&hi_NOMBRE3_RECNAC="+ $('#hi_NOMBRE3_RECNAC').val()+"&hi_NECREMI_RECNAC="+ $('#hi_NECREMI_RECNAC').val()+"&hi_INSTITU_RECNAC="+ $('#hi_INSTITU_RECNAC').val();           
           //*******************************************************************************************//  
           //****************************TABLA MOVIMIENTO DE REMISION ***********************************************// 
           datos+="&hi_RIESGO_MOVREM="+ $('#hi_RIESGO_MOVREM').val()+"&hi_CESAREA_MOVREM="+ $('#hi_CESAREA_MOVREM').val()+"&hi_PARTO_MOVREM="+ $('#hi_PARTO_MOVREM').val()+"&hi_PATOLOGIA_MOVREM="+ $('#hi_PATOLOGIA_MOVREM').val()+"&hi_DESPROPORCION_MOVREM="+ $('#hi_DESPROPORCION_MOVREM').val();
           datos+="&hi_DISTOCIA_MOVREM="+ $('#hi_DISTOCIA_MOVREM').val()+"&hi_TRABAJO_MOVREM="+ $('#hi_TRABAJO_MOVREM').val()+"&hi_INDUCCION_MOVREM="+ $('#hi_INDUCCION_MOVREM').val()+"&hi_SUFRIMIENTO_MOVREM="+ $('#hi_SUFRIMIENTO_MOVREM').val()+"&hi_RUPTURA_MOVREM="+ $('#hi_RUPTURA_MOVREM').val();
           datos+="&hi_HEMORRAGIA_MOVREM="+ $('#hi_HEMORRAGIA_MOVREM').val()+"&hi_OTROS_MOVREM="+ $('#hi_OTROS_MOVREM').val();          
           //*******************************************************************************************//  
           
           //****************************TABLA EVOLUCION************************************************//
           datos+="&vac="+vac;
           if(vac==2){
               datos+="&hi_SERVICIO_EVOLUCION="+ $('#hi_SERVICIO_EVOLUCION').val()+"&hi_SALA_EVOLUCION="+ $('#hi_SALA_EVOLUCION').val();
               datos+="&hi_N_CAMA_EVOLUCION="+ $('#hi_N_CAMA_EVOLUCION').val();
               var k=1,j=0,p=1;j;    
               $("#detaevolu").find(':input').each(function (index) {                
                   var id = $(this).attr("id");
                   var valor = $(this).val(); 
//                   alert("id= "+id+"   VALOR="+valor);
                   if(j==0){datos+="&"+id+p+"="+ valor;}
                   if(j==1){datos+="&"+id+p+"="+ valor;}               
                   if(j==2){datos+="&"+id+p+"="+ valor;}            
                   if(j==3){datos+="&"+id+p+"="+ valor;}                                    
                   k=k+1;j=j+1;               
                   if(j==4){j=0;p=p+1;}
               });  
               tamanio=p-1;
               datos+="&tamanio="+tamanio;                              
           }
           //*******************************************************************************************//
           if(confirm("¿DESEA GUARDAR LOS DATOS?")){
               $.enviar1("POST","../gestionar_materno_per",datos,"DATOS GUARDADOS DE MANERA EXITOSA...","../ges_materno_per");
           }    
           ////////////////////////////////////////////////////////////////          
       }, 500);    
    });   
    //***********************RECORRER SUBTOTALES****************************************//
    $("#txtsubto").val("0");
    $('#combohemomens1,#combohemomens2,#combohemomens3,#combovaginas1,#combovaginas2,#combovaginas3,#comborcius1,#comborcius2,#comborcius3,#comboeprolongas1,#comboeprolongas2,#comboeprolongas3,#comboembmultiples1,#comboembmultiples2,#comboembmultiples3,#combohtas1,#combohtas2,#combohtas3,#combomalapres1,#combomalapres2,#combomalapres3,#comborpms1,#comborpms2,#comborpms3,#comboisos1,#comboisos2,#comboisos3,#combopolihis1,#combopolihis2,#combopolihis3').live('click', function(){           
        $.reco1();
    });   
    var to1=0;var to2=0;var to3=0;var emac1=0;var emac2=0;var emac3=0;   
    $('#combotensionemo,#combohumordepre,#comboneurovege,#comboeltiempo,#comboelespacio,#comboeldinero').live('click', function(){           
        $.reco2();
    });     
    $('#comboqxgines1,#comboqxgines2,#comboqxgines3,#comborenalcros1,#comborenalcros2,#comborenalcros3,#combodiabges1,#combodiabges2,#combodiabges3,#combodiabmells1,#combodiabmells2,#combodiabmells3,#comboenfcardis1,#comboenfcardis2,#comboenfcardis3,#comboenfinfes1,#comboenfinfes2,#comboenfinfes3,#comboenfautoins1,#comboenfautoins2,#comboenfautoins3,#comboanemias1,#comboanemias2,#comboanemias3').live('click', function(){              
        $.reco3();
    });      
    //**********************************************************************************//
    //***********************BTN AGREGAR****************************************//
    $('#btn_add').live('click', function(){
        resul=$.validatxt('#hi_FECHA_CON_PRE','Por Favor Seleccione La Fecha..');
        if(resul=="1"){return;}        
        hi_FECHA_CON_PRE=$('#hi_FECHA_CON_PRE').val();
        hi_SEMANAS_CON_PRE=$('#hi_SEMANAS_CON_PRE').val();
        hi_PESO_CON_PRE=$('#hi_PESO_CON_PRE').val();
        hi_TALLA_CON_PRE=$('#hi_TALLA_CON_PRE').val();
        hi_TENSION_CON_PRE=$('#hi_TENSION_CON_PRE').val();
        hi_ALTURA_CON_PRE=$('#hi_ALTURA_CON_PRE').val();
        hi_FCF_CON_PRE=$('#hi_FCF_CON_PRE').val();
        hi_PRESENTACION_CON_PRE=$('#hi_PRESENTACION_CON_PRE').val();
        hi_MOVIMIENTOS_CON_PRE=$('#hi_MOVIMIENTOS_CON_PRE').val();
        hi_VALORACION_CON_PRE=$('#hi_VALORACION_CON_PRE').val();
        hi_EDEMAS_CON_PRE=$('#hi_EDEMAS_CON_PRE').val();
        hi_MONITOREO_CON_PRE=$('#hi_MONITOREO_CON_PRE').val();
        hi_RESPONSABLE_CON_PRE=$('#hi_RESPONSABLE_CON_PRE').val();
        hi_EXAMEN_MA_CON_PRE=$('#hi_EXAMEN_MA_CON_PRE').val();
        hi_EXAMEN_GE_CON_PRE=$('#hi_EXAMEN_GE_CON_PRE').val();
        $.limpiar();
        $.funagregar(hi_FECHA_CON_PRE,hi_SEMANAS_CON_PRE,hi_PESO_CON_PRE,hi_TALLA_CON_PRE,hi_TENSION_CON_PRE,hi_ALTURA_CON_PRE,hi_FCF_CON_PRE,hi_PRESENTACION_CON_PRE,hi_MOVIMIENTOS_CON_PRE,hi_VALORACION_CON_PRE,hi_EDEMAS_CON_PRE,hi_MONITOREO_CON_PRE,hi_RESPONSABLE_CON_PRE,hi_EXAMEN_MA_CON_PRE,hi_EXAMEN_GE_CON_PRE);        
    });

    //**********************************************************************************//
    //***********************BTN REMOVER****************************************//
    $('.remover').live('click', function(e){
        e.preventDefault(e);
        var fila = $(this).attr('fila'); 

        delete vector[fila];        
        $("tr.fila"+fila).remove();         
        cuantos=cuantos-1;  
        camponuevo=camponuevo-1;
        if(cuantos==0){
            vacia=1;
        }
    });	         
    //**************************************************************************//
    var k=1,j=0,p=1;j; 
    $.extend({    
        limpiar: function(){
            $('#hi_FECHA_CON_PRE').val("");
            $('#hi_SEMANAS_CON_PRE').val("");
            $('#hi_PESO_CON_PRE').val("");
            $('#hi_TALLA_CON_PRE').val("");
            $('#hi_TENSION_CON_PRE').val("");
            $('#hi_ALTURA_CON_PRE').val("");
            $('#hi_FCF_CON_PRE').val("");
            $('#hi_PRESENTACION_CON_PRE').val("");
            $('#hi_MOVIMIENTOS_CON_PRE').val("");
            $('#hi_VALORACION_CON_PRE').val("");
            $('#hi_EDEMAS_CON_PRE').val("");
            $('#hi_MONITOREO_CON_PRE').val("");
//            $('#hi_RESPONSABLE_CON_PRE').val("");
            $('#hi_EXAMEN_MA_CON_PRE').val("");
            $('#hi_EXAMEN_GE_CON_PRE').val("");       
        },    
        funagregar:function(hi_FECHA_CON_PRE,hi_SEMANAS_CON_PRE,hi_PESO_CON_PRE,hi_TALLA_CON_PRE,hi_TENSION_CON_PRE,hi_ALTURA_CON_PRE,hi_FCF_CON_PRE,hi_PRESENTACION_CON_PRE,hi_MOVIMIENTOS_CON_PRE,hi_VALORACION_CON_PRE,hi_EDEMAS_CON_PRE,hi_MONITOREO_CON_PRE,hi_RESPONSABLE_CON_PRE,hi_EXAMEN_MA_CON_PRE,hi_EXAMEN_GE_CON_PRE){            
            camponuevo=camponuevo+1;
            campo="<tr class='fila"+ camponuevo +"'>";
                campo+="<td>";
                    campo+="<input type='text' id='hi_FECHA_CON_PRE' name='hi_FECHA_CON_PRE' value='"+hi_FECHA_CON_PRE+"' disabled size='10' style='font-size:7pt;'>";
                campo+="</td>";
                campo+="<td>";
                    campo+="<input type='text' id='hi_SEMANAS_CON_PRE' name='hi_SEMANAS_CON_PRE' value='"+hi_SEMANAS_CON_PRE+"' disabled size='5' style='font-size:7pt;'>";
                campo+="</td>";            
                campo+="<td>";
                    campo+="<input type='text' id='hi_PESO_CON_PRE' name='hi_PESO_CON_PRE' value='"+hi_PESO_CON_PRE+"' disabled size='5' style='font-size:7pt;'>";
                campo+="</td>";                        
                campo+="<td>";
                    campo+="<input type='text' id='hi_TALLA_CON_PRE' name='hi_TALLA_CON_PRE' value='"+hi_TALLA_CON_PRE+"' disabled size='5' style='font-size:7pt;'>";
                campo+="</td>"; 
                campo+="<td>";
                    campo+="<input type='text' id='hi_TENSION_CON_PRE' name='hi_TENSION_CON_PRE' value='"+hi_TENSION_CON_PRE+"' disabled size='7' style='font-size:7pt;'>";
                campo+="</td>"; 
                campo+="<td>";
                    campo+="<input type='text' id='hi_ALTURA_CON_PRE' name='hi_ALTURA_CON_PRE' value='"+hi_ALTURA_CON_PRE+"' disabled size='5' style='font-size:7pt;'>";
                campo+="</td>"; 
                campo+="<td>";
                    campo+="<input type='text' id='hi_FCF_CON_PRE' name='hi_FCF_CON_PRE' value='"+hi_FCF_CON_PRE+"' disabled size='5' style='font-size:7pt;'>";
                campo+="</td>"; 
                campo+="<td>";
                    campo+="<input type='text' id='hi_PRESENTACION_CON_PRE' name='hi_PRESENTACION_CON_PRE' value='"+hi_PRESENTACION_CON_PRE+"' disabled size='11' style='font-size:7pt;'>";
                campo+="</td>"; 
                campo+="<td>";
                    campo+="<input type='text' id='hi_MOVIMIENTOS_CON_PRE' name='hi_MOVIMIENTOS_CON_PRE' value='"+hi_MOVIMIENTOS_CON_PRE+"' disabled size='11' style='font-size:7pt;'>";
                campo+="</td>"; 
                campo+="<td>";
                    campo+="<input type='text' id='hi_VALORACION_CON_PRE' name='hi_VALORACION_CON_PRE' value='"+hi_VALORACION_CON_PRE+"' disabled size='11' style='font-size:7pt;'>";
                campo+="</td>"; 
                campo+="<td>";
                    campo+="<input type='text' id='hi_EDEMAS_CON_PRE' name='hi_EDEMAS_CON_PRE' value='"+hi_EDEMAS_CON_PRE+"' disabled size='6' style='font-size:7pt;'>";
                campo+="</td>"; 
                campo+="<td>";
                    campo+="<input type='text' id='hi_MONITOREO_CON_PRE' name='hi_MONITOREO_CON_PRE' value='"+hi_MONITOREO_CON_PRE+"' disabled size='8' style='font-size:7pt;'>";
                campo+="</td>"; 
                campo+="<td>";
                    campo+="<input type='text' id='hi_RESPONSABLE_CON_PRE' name='hi_RESPONSABLE_CON_PRE' value='"+hi_RESPONSABLE_CON_PRE+"' disabled size='25' style='font-size:7pt;'>";
                campo+="</td>"; 
                campo+="<td>";
                    campo+="<input type='text' id='hi_EXAMEN_MA_CON_PRE' name='hi_EXAMEN_MA_CON_PRE' value='"+hi_EXAMEN_MA_CON_PRE+"' disabled size='10' style='font-size:7pt;'>";
                campo+="</td>"; 
                campo+="<td>";
                    campo+="<input type='text' id='hi_EXAMEN_GE_CON_PRE' name='hi_EXAMEN_GE_CON_PRE' value='"+hi_EXAMEN_GE_CON_PRE+"' disabled size='10' style='font-size:7pt;'>";
                campo+="</td>";                 
                campo+="<td>";
                    campo+="<input class='remover' fila='"+ camponuevo +"' type='button' value='X' id='boton1' title='Quitar de la lista' style='font-size:7pt; padding:2px 2px 2px 2px; margin; margin: 0px 4px 4px 0px'>";
                campo+="</td>";                       
            campo+="</tr>";
            $("#detalle").append(campo);
            vacia=2;
            cuantos=cuantos+1;            
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
                    if(data==2){
                        alert("ESTE PACIENTE YA TIENE REGISTRADO UNA HISTORIA MATERNO PERINATAL");
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
            $('#form_materno').find('input, textarea, button, select').attr('disabled',false); 
            $('#abrir_venpaci').attr('id','otro-id1');
            $('#abrir_vendiagnostico').attr('id','otro-id3');
            $("#txttipodoc, #txtdoc, #txtnompac,#txtedad,#combosex,#txttel,#txtdir,#txtmun,#comgrupoetn,#txtnomres,#txtparent,#txtdirresp,#txtnumhis").attr('disabled', true);                           

            $('#conte').css("display",'block');
            $('#busqueda_materno').fadeOut(500);
            $('#oscuro').css('visibility','hidden');
            $("body").css("overflow", "auto");        
            $('#zona_materno').html("");
            $('#zona_materno2').html("");
            $('#area_fecha').css('display','none');
            $('#tablafecha').css('display','none');
            $('#tfec').val("");                
        },
        agre: function(hi_FECHA_CON_PRE,hi_SEMANAS_CON_PRE,hi_PESO_CON_PRE,hi_TALLA_CON_PRE,hi_TENSION_CON_PRE,hi_ALTURA_CON_PRE,hi_FCF_CON_PRE,hi_PRESENTACION_CON_PRE,hi_MOVIMIENTOS_CON_PRE,hi_VALORACION_CON_PRE,hi_EDEMAS_CON_PRE,hi_MONITOREO_CON_PRE,hi_RESPONSABLE_CON_PRE,hi_EXAMEN_MA_CON_PRE,hi_EXAMEN_GE_CON_PRE,i){              
            camponuevo=i;
            campo="<tr class='fila"+ camponuevo +"'>";
                campo+="<td>";
                    campo+="<input type='text' id='hi_FECHA_CON_PRE' name='hi_FECHA_CON_PRE' value='"+hi_FECHA_CON_PRE+"' disabled size='10' style='font-size:7pt;'>";
                campo+="</td>";
                campo+="<td>";
                    campo+="<input type='text' id='hi_SEMANAS_CON_PRE' name='hi_SEMANAS_CON_PRE' value='"+hi_SEMANAS_CON_PRE+"' disabled size='5' style='font-size:7pt;'>";
                campo+="</td>";            
                campo+="<td>";
                    campo+="<input type='text' id='hi_PESO_CON_PRE' name='hi_PESO_CON_PRE' value='"+hi_PESO_CON_PRE+"' disabled size='5' style='font-size:7pt;'>";
                campo+="</td>";                        
                campo+="<td>";
                    campo+="<input type='text' id='hi_TALLA_CON_PRE' name='hi_TALLA_CON_PRE' value='"+hi_TALLA_CON_PRE+"' disabled size='5' style='font-size:7pt;'>";
                campo+="</td>"; 
                campo+="<td>";
                    campo+="<input type='text' id='hi_TENSION_CON_PRE' name='hi_TENSION_CON_PRE' value='"+hi_TENSION_CON_PRE+"' disabled size='7' style='font-size:7pt;'>";
                campo+="</td>"; 
                campo+="<td>";
                    campo+="<input type='text' id='hi_ALTURA_CON_PRE' name='hi_ALTURA_CON_PRE' value='"+hi_ALTURA_CON_PRE+"' disabled size='5' style='font-size:7pt;'>";
                campo+="</td>"; 
                campo+="<td>";
                    campo+="<input type='text' id='hi_FCF_CON_PRE' name='hi_FCF_CON_PRE' value='"+hi_FCF_CON_PRE+"' disabled size='5' style='font-size:7pt;'>";
                campo+="</td>"; 
                campo+="<td>";
                    campo+="<input type='text' id='hi_PRESENTACION_CON_PRE' name='hi_PRESENTACION_CON_PRE' value='"+hi_PRESENTACION_CON_PRE+"' disabled size='11' style='font-size:7pt;'>";
                campo+="</td>"; 
                campo+="<td>";
                    campo+="<input type='text' id='hi_MOVIMIENTOS_CON_PRE' name='hi_MOVIMIENTOS_CON_PRE' value='"+hi_MOVIMIENTOS_CON_PRE+"' disabled size='11' style='font-size:7pt;'>";
                campo+="</td>"; 
                campo+="<td>";
                    campo+="<input type='text' id='hi_VALORACION_CON_PRE' name='hi_VALORACION_CON_PRE' value='"+hi_VALORACION_CON_PRE+"' disabled size='11' style='font-size:7pt;'>";
                campo+="</td>"; 
                campo+="<td>";
                    campo+="<input type='text' id='hi_EDEMAS_CON_PRE' name='hi_EDEMAS_CON_PRE' value='"+hi_EDEMAS_CON_PRE+"' disabled size='6' style='font-size:7pt;'>";
                campo+="</td>"; 
                campo+="<td>";
                    campo+="<input type='text' id='hi_MONITOREO_CON_PRE' name='hi_MONITOREO_CON_PRE' value='"+hi_MONITOREO_CON_PRE+"' disabled size='8' style='font-size:7pt;'>";
                campo+="</td>"; 
                campo+="<td>";
                    campo+="<input type='text' id='hi_RESPONSABLE_CON_PRE' name='hi_RESPONSABLE_CON_PRE' value='"+hi_RESPONSABLE_CON_PRE+"' disabled size='25' style='font-size:7pt;'>";
                campo+="</td>"; 
                campo+="<td>";
                    campo+="<input type='text' id='hi_EXAMEN_MA_CON_PRE' name='hi_EXAMEN_MA_CON_PRE' value='"+hi_EXAMEN_MA_CON_PRE+"' disabled size='10' style='font-size:7pt;'>";
                campo+="</td>"; 
                campo+="<td>";
                    campo+="<input type='text' id='hi_EXAMEN_GE_CON_PRE' name='hi_EXAMEN_GE_CON_PRE' value='"+hi_EXAMEN_GE_CON_PRE+"' disabled size='10' style='font-size:7pt;'>";
                campo+="</td>";                 
                campo+="<td>";
                    campo+="<input class='remover' fila='"+ camponuevo +"' type='button' value='X' id='boton1' title='Quitar de la lista' style='font-size:7pt; padding:2px 2px 2px 2px; margin; margin: 0px 4px 4px 0px;display:none;'>";
                campo+="</td>";                       
            campo+="</tr>";
            $("#detalle").append(campo);
            vacia=2;
            cuantos=cuantos+1;         
        } , 
        reco1: function(){
            var st1=0; var st2=0; var st3=0;
            $(".subtotala").find(':input').each(function (index) {                       
                var id = $(this).attr("id");
                var valor = $(this).val(); 
                if(valor=="1"){
                    if((id=="combohemomens1")||(id=="combohemomens2")||(id=="combohemomens3")||(id=="comboeprolongas1")||(id=="comboeprolongas2")||(id=="comboeprolongas3")){
                        if((id=="combohemomens1")||(id=="comboeprolongas1")){
                            st1=Number(st1)+1;                        
                        }
                        if((id=="combohemomens2")||(id=="comboeprolongas2")){
                            st2=Number(st2)+1;
                        }
                        if((id=="combohemomens3")||(id=="comboeprolongas3")){
                            st3=Number(st3)+1;
                        }                    
                    }
                    if((id=="combohtas1")||(id=="combohtas2")||(id=="combohtas3")||(id=="comborpms1")||(id=="comborpms2")||(id=="comborpms3")||(id=="combopolihis1")||(id=="combopolihis2")||(id=="combopolihis3")){
                        if((id=="combohtas1")||(id=="comborpms1")||(id=="combopolihis1")){
                            st1=Number(st1)+2;
                        }
                        if((id=="combohtas2")||(id=="comborpms2")||(id=="combopolihis2")){
                            st2=Number(st2)+2;
                        }                    
                        if((id=="combohtas3")||(id=="comborpms3")||(id=="combopolihis3")){
                            st3=Number(st3)+2;
                        }                       
                    }       
                    if((id=="combovaginas1")||(id=="combovaginas2")||(id=="combovaginas3")||(id=="comborcius1")||(id=="comborcius2")||(id=="comborcius3")||(id=="comboembmultiples1")||(id=="comboembmultiples2")||(id=="comboembmultiples3")||(id=="combomalapres1")||(id=="combomalapres2")||(id=="combomalapres3")||(id=="comboisos1")||(id=="comboisos2")||(id=="comboisos3")){
                        if((id=="combovaginas1")||(id=="comborcius1")||(id=="comboembmultiples1")||(id=="combomalapres1")||(id=="comboisos1")){
                            st1=Number(st1)+3;
                        }
                        if((id=="combovaginas2")||(id=="comborcius2")||(id=="comboembmultiples2")||(id=="combomalapres2")||(id=="comboisos2")){
                            st2=Number(st2)+3;
                        }                    
                        if((id=="combovaginas3")||(id=="comborcius3")||(id=="comboembmultiples3")||(id=="combomalapres3")||(id=="comboisos3")){
                            st3=Number(st3)+3;
                        }                    
                    }
                }                                  
            }); 
            t=Number(st1)+Number(st2)+Number(st3);
            $("#txtsubto").val(t);     

            to1=Number(st1);
            to2=Number(st2);
            to3=Number(st3);

            valortotal1=Number(to1)+Number(emac1);
            valortotal2=Number(to2)+Number(emac2);
            valortotal3=Number(to3)+Number(emac3);
            if(Number(valortotal1)<=3){$("#caja1").val("BAJO");}else{$("#caja1").val("ALTO");}
            if(Number(valortotal2)<=3){$("#caja2").val("BAJO");}else{$("#caja2").val("ALTO");}
            if(Number(valortotal3)<=3){$("#caja3").val("BAJO");}else{$("#caja3").val("ALTO");}
            $("#t1").val(valortotal1);           
            $("#t2").val(valortotal2);           
            $("#t3").val(valortotal3);                         
        },
        reco2: function(){
            var subto2=0;
            var subto3=0;      
            var intenso1=0;
            var intenso2=0;        
            $(".psico").find(':input').each(function (index) {                       
                var id = $(this).attr("id");
                var valor = $(this).val(); 
                if(valor=="2"){
                    if((id=="combotensionemo")||(id=="combohumordepre")||(id=="comboneurovege")){
                        subto2=Number(subto2)+1;
                    }
                    if((id=="comboeltiempo")||(id=="comboelespacio")||(id=="comboeldinero")){
                        subto3=Number(subto3)+1;
                    }                
                }            
            });  
            if(subto2>1){intenso1=1;}else{intenso1=0;}  
            if(subto3>1){intenso2=1;}else{intenso2=0;}       
        },
        reco3: function(){
            var st1=0; var st2=0; var st3=0;
            $(".sto").find(':input').each(function (index) {                       
                var id = $(this).attr("id");
                var valor = $(this).val(); 
                if(valor=="1"){
                    if((id=="comboqxgines1")||(id=="comboqxgines2")||(id=="comboqxgines3")||(id=="comborenalcros1")||(id=="comborenalcros2")||(id=="comborenalcros3")||(id=="comboenfinfes1")||(id=="comboenfinfes2")||(id=="comboenfinfes3")){
                        if((id=="comboqxgines1")||(id=="comborenalcros1")||(id=="comboenfinfes1")){
                            st1=Number(st1)+1;
                        }
                        if((id=="comboqxgines2")||(id=="comborenalcros2")||(id=="comboenfinfes2")){
                            st2=Number(st2)+1;
                        }                    
                        if((id=="comboqxgines3")||(id=="comborenalcros3")||(id=="comboenfinfes3")){
                            st3=Number(st3)+1;
                        }                    
                    }
                    if((id=="combodiabges1")||(id=="combodiabges2")||(id=="combodiabges3")){
                        if((id=="combodiabges1")){
                            st1=Number(st1)+2;
                        }
                        if((id=="combodiabges2")){
                            st2=Number(st2)+2;
                        }
                        if((id=="combodiabges3")){
                            st3=Number(st3)+2;
                        }                    
                    }       
                    if((id=="combodiabmells1")||(id=="combodiabmells2")||(id=="combodiabmells3")||(id=="comboenfcardis1")||(id=="comboenfcardis2")||(id=="comboenfcardis3")||(id=="comboenfautoins1")||(id=="comboenfautoins2")||(id=="comboenfautoins3")||(id=="comboanemias1")||(id=="comboanemias2")||(id=="comboanemias3")){
                        if((id=="combodiabmells1")||(id=="comboenfcardis1")||(id=="comboenfautoins1")||(id=="comboanemias1")){
                            st1=Number(st1)+3;
                        }
                        if((id=="combodiabmells2")||(id=="comboenfcardis2")||(id=="comboenfautoins2")||(id=="comboanemias2")){
                            st2=Number(st2)+3;
                        }
                        if((id=="combodiabmells3")||(id=="comboenfcardis3")||(id=="comboenfautoins3")||(id=="comboanemias3")){
                            st3=Number(st3)+3;
                        }
                    }
                }          
            });  
            emac1=Number(st1);
            emac2=Number(st2);
            emac3=Number(st3);

            valortotal1=Number(to1)+Number(emac1);
            valortotal2=Number(to2)+Number(emac2);
            valortotal3=Number(to3)+Number(emac3);
            if(Number(valortotal1)<=3){$("#caja1").val("BAJO");}else{$("#caja1").val("ALTO");}
            if(Number(valortotal2)<=3){$("#caja2").val("BAJO");}else{$("#caja2").val("ALTO");}
            if(Number(valortotal3)<=3){$("#caja3").val("BAJO");}else{$("#caja3").val("ALTO");}        
            $("#t1").val(valortotal1);           
            $("#t2").val(valortotal2);           
            $("#t3").val(valortotal3);        
        },
        agrediag: function(hi_FECHA_EVOLUCION,hi_HORA_EVOLUCION,hi_DX_EVOLUCION){
            cn=cn+1;
            campo="<tr class='fila"+ cn +"'>";
                campo+="<td>";
                    campo+="<input type='text' id='hi_FECHA_EVOLUCION' name='hi_FECHA_EVOLUCION' value='"+hi_FECHA_EVOLUCION+"' disabled size='10' style='font-size:7pt;'>";
                campo+="</td>";
                campo+="<td>";
                    campo+="<input type='text' id='hi_HORA_EVOLUCION' name='hi_HORA_EVOLUCION' value='"+hi_HORA_EVOLUCION+"' disabled size='10' style='font-size:7pt;'>";
                campo+="</td>";                               
                campo+="<td>";
                    campo+="<input type='text' id='hi_DX_EVOLUCION' name='hi_DX_EVOLUCION' value='"+hi_DX_EVOLUCION+"' disabled size='135' style='font-size:7pt;'>";
                campo+="</td>";                
                campo+="<td>";
                    campo+="<input class='remover2' fila='"+ cn +"' type='button' value='X' id='boton1' title='Quitar de la lista' style='font-size:7pt; padding:2px 2px 2px 2px; margin; margin: 0px 4px 4px 0px'>";
                campo+="</td>";                       
            campo+="</tr>";
            $("#detaevolu").append(campo);
            vac=2;
            cuan=cuan+1;               
        },
        agrediag1: function(hi_FECHA_EVOLUCION,hi_HORA_EVOLUCION,hi_DX_EVOLUCION,i){              
            cn=i;
            campo="<tr class='fila"+ cn +"'>";
                campo+="<td>";
                    campo+="<input type='text' id='hi_FECHA_EVOLUCION' name='hi_FECHA_EVOLUCION' value='"+hi_FECHA_EVOLUCION+"' disabled size='10' style='font-size:7pt;'>";
                campo+="</td>";
                campo+="<td>";
                    campo+="<input type='text' id='hi_HORA_EVOLUCION' name='hi_HORA_EVOLUCION' value='"+hi_HORA_EVOLUCION+"' disabled size='10' style='font-size:7pt;'>";
                campo+="</td>";                                 
                campo+="<td>";
                    campo+="<input type='text' id='hi_DX_EVOLUCION' name='hi_DX_EVOLUCION' value='"+hi_DX_EVOLUCION+"' disabled size='135' style='font-size:7pt;'>";
                campo+="</td>";                
                campo+="<td>";
                    campo+=" <button type='button' id='verevolu' hi_FECHA_EVOLUCION='"+hi_FECHA_EVOLUCION+"' hi_HORA_EVOLUCION='"+hi_HORA_EVOLUCION+"' hi_DX_EVOLUCION='"+hi_DX_EVOLUCION+"' style='width: 20px; cursor: pointer; height: 22px;border: 1px solid #CDCDCD; border-radius: 3px 3px 3px 3px; display: table-cell;  vertical-align: middle; position: relative;visibility: visible;  margin-top:-3px;'   title='Ver Evoluciones'><img src='../images/buscar.png' style='padding-bottom:3px; margin: -5px auto; border: 0px;width: 15px; height:15px;'/></button>" ;
                campo+="</td>";                       
            campo+="</tr>";
            $("#detaevolu").append(campo);
            vac=2;
            cuan=cuan+1;      
        } ,         
        limpiar1: function(){
            $('#hi_DX_EVOLUCION').val("");
        }        
    });           
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
    /////////////////////////////////MANEJO HORA2/////////////////////////////////          
    $("#comhora1").change(function(event){
        var h = $("#comhora1").find(':selected').val();
        var m = $("#commin1").find(':selected').val();
        tipo="am";
        if(h>12){
            h=h-12;
            tipo="pm";
        }
        if(h<=9){
            h="0"+h;
        }        
        hora=h+":"+m+" "+tipo;
        $('#thora22').val(hora);
        $('#thora11').css('display','none');
        $('#thora22').css('display','inline-block');          
    });  
    $("#commin1").change(function(event){
        var h = $("#comhora1").find(':selected').val();
        var m = $("#commin1").find(':selected').val();
        tipo="am";
        if(h>12){
            h=h-12;
            tipo="pm";
        }
         if(h<=9){
            h="0"+h;
        }
        hora=h+":"+m+" "+tipo;
        $('#thora22').val(hora);        
        $('#thora11').css('display','none');
        $('#thora22').css('display','inline-block');  
    });  
    var hora1=$.now();
    setInterval(function(){currentTime1("#thora11")}, 500);     
    function currentTime1(field) {
        var h = $("#comhora1").find(':selected').val();
        var m = $("#commin1").find(':selected').val();
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
                $('#thora22').css('display','none');                
            }
        }else{
            $(field).css('display','none');
            $('#thora22').css('display','inline-block');            
        }
    } 
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////          
    /////////////////////////////////MANEJO HORA3/////////////////////////////////          
    $("#comhora11").change(function(event){
        var h = $("#comhora11").find(':selected').val();
        var m = $("#commin11").find(':selected').val();
        tipo="am";
        if(h>12){
            h=h-12;
            tipo="pm";
        }
        if(h<=9){
            h="0"+h;
        }        
        hora=h+":"+m+" "+tipo;
        $('#thora222').val(hora);
        $('#thora111').css('display','none');
        $('#thora222').css('display','inline-block');          
    });  
    $("#commin11").change(function(event){
        var h = $("#comhora11").find(':selected').val();
        var m = $("#commin11").find(':selected').val();
        tipo="am";
        if(h>12){
            h=h-12;
            tipo="pm";
        }
         if(h<=9){
            h="0"+h;
        }
        hora=h+":"+m+" "+tipo;
        $('#thora222').val(hora);        
        $('#thora111').css('display','none');
        $('#thora222').css('display','inline-block');  
    });  
    var hora11=$.now();
    setInterval(function(){currentTime11("#thora111")}, 500);     
    function currentTime11(field) {
        var h = $("#comhora11").find(':selected').val();
        var m = $("#commin11").find(':selected').val();
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
                $('#thora222').css('display','none');                
            }
        }else{
            $(field).css('display','none');
            $('#thora222').css('display','inline-block');            
        }
    } 
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////      
    //////////////////BTN_BUSCAR///////////////////////////////
    $('#btn_bus').live('click', function(){
        $('#conte').css("display",'none');
        $('#busqueda_materno').fadeIn(500);
        $('#oscuro').css('visibility','visible');
        $('#txtbus').val("");       
        $("body").css("overflow", "hidden");
        $('#txtbus').focus(); 
        $('#zona_materno').html("");
        $('#zona_materno2').html("");
        $('#busqueda_materno').css('height','360px');
    });   
    $('#cer_venmater').live('click', function(){
        $('#conte').css("display",'block');
        $('#busqueda_materno').fadeOut(500);
        $('#oscuro').css('visibility','hidden');
        $("body").css("overflow", "auto");        
        $('#zona_materno').html("");
        $('#zona_materno2').html("");
        $('#area_fecha').css('display','none');
        $('#tablafecha').css('display','none');
        $('#tfec').val("");      
        $(":text").each(function(){	
            $($(this)).val('');
	});        
    });     
    $('#busqueda_materno').live('mouseout',function(){ 
        $('#oscuro').live("click",function(){ 
            $('#conte').css("display",'block');
            $('#busqueda_materno').fadeOut(500);
            $('#oscuro').css('visibility','hidden');
            $("body").css("overflow", "auto");        
            $('#zona_materno').html("");
            $('#zona_materno2').html("");
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
        $('#zona_materno').html("");
        $('#busqueda_materno').css('height','360px');        
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
        $.enviar2("POST","../car_pac",datos,'#zona_materno');        
    });     
    $('.marcado').live('click', function(){  
        var ident = $(this).attr('ident'); 
        $('#tid').val(ident);
        $('#area_fecha').css('display','none');
        $('#tablafecha').css('display','none');
        $('#tfec').val("");
        $('#busqueda_materno').css('height','600px');
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
            auxiliar: "MATERNO"
        }
        $.enviar3("POST","../mostrar_materno_per",datos,'#zona_materno2','#area_fecha','#tablafecha');   
    });      
    $('.marcado2').live('click', function(){             
        //******************MATERNO PERINATAL*********************//
        hi_ID_MAT_PER=$(this).attr('hi_ID_MAT_PER');
        $('#txtfinicial').val($(this).attr('hi_FECHA_MAT_PER'));  
//        $('#txtfinicial').removeClass("calen");
//        $('#txtfinicial').attr('readonly','-1')
        hi_ESTADO_MAT_PER=$(this).attr('hi_ESTADO_MAT_PER');
        //********************************************************//                       
        var datos={
            hi_ID_MAT_PER: hi_ID_MAT_PER
        }
        $.ajax({
            type: "POST",
            url: "../car_materno_perinatal",
            data: datos,
            dataType: "json",            
            success: function(data){             
                //*************************TABLA ANTECEDENTES FAMILIARES***************//
                hi_ID_ANTFAM = data['hi_ID_ANTFAM'];
                $("#combohta1 option[value=" + data['hi_HTA_CRONICA_ANTFAM'] + "]").attr("selected",true); 
                $("#combopree1 option[value=" + data['hi_PREECLAMPSIA1_ANTFAM'] + "]").attr("selected",true); 
                $("#combodiab1 option[value=" + data['hi_DIABETES1_ANTFAM'] + "]").attr("selected",true); 
                $("#comboecla1 option[value=" + data['hi_ECLAMPSIA1_ANTFAM'] + "]").attr("selected",true); 
                $("#combogeme option[value=" + data['hi_GEMELARES_ANTFAM'] + "]").attr("selected",true); 
                $("#combocardiopa option[value=" + data['hi_CARDIOPATIA_ANTFAM'] + "]").attr("selected",true); 
                $("#combotbc option[value=" + data['hi_TBC_ANTFAM'] + "]").attr("selected",true); 
                $("#combometab option[value=" + data['hi_METABOLICOS_ANTFAM'] + "]").attr("selected",true); 
                $("#comboautoi option[value=" + data['hi_AUTOINMUNES_ANTFAM'] + "]").attr("selected",true); 
                $("#comboinfe option[value=" + data['hi_INFECCIOSAS_ANTFAM'] + "]").attr("selected",true); 
                $("#comboconge option[value=" + data['hi_CONGENITAS_ANTFAM'] + "]").attr("selected",true); 
                $("#comboneopla option[value=" + data['hi_NEOPLASIAS_ANTFAM'] + "]").attr("selected",true); 
                $("#comboepile option[value=" + data['hi_EPILEPSIA_ANTFAM'] + "]").attr("selected",true); 
                $("#combootros1 option[value=" + data['hi_OTROS1_ANTFAM'] + "]").attr("selected",true); 
                $('#txtcual1').val(data['hi_CUAL1_ANTFAM']);
                //*********************************************************************//     
                //*************************TABLA ANTECEDENTES PERSONALES***************//
                hi_ID_ANTPER = data['hi_ID_ANTPER'];
                $("#combotuber option[value=" + data['hi_TUBERCULOSIS_ANTPER'] + "]").attr("selected",true); 
                $("#combodiab2 option[value=" + data['hi_DIABETES2_ANTPER'] + "]").attr("selected",true); 
                $("#combodiabges option[value=" + data['hi_DIABETES_GES_ANTPER'] + "]").attr("selected",true); 
                $("#combohta2 option[value=" + data['hi_HTA_CRONICA2_ANTPER'] + "]").attr("selected",true); 
                $("#combocirupel option[value=" + data['hi_CIRUGIAPELUTE_ANTPER'] + "]").attr("selected",true); 
                $("#combopree2 option[value=" + data['hi_PREECLAMPSIA2_ANTPER'] + "]").attr("selected",true); 
                $("#comboecla2 option[value=" + data['hi_ECLAMPSIA2_ANTPER'] + "]").attr("selected",true); 
                $("#comboalerg option[value=" + data['hi_ALERGICOS_ANTPER'] + "]").attr("selected",true); 
                $("#combotaba option[value=" + data['hi_TABAQUISMO_ANTPER'] + "]").attr("selected",true); 
                $("#comboalco option[value=" + data['hi_ALCOHOLISMO_ANTPER'] + "]").attr("selected",true); 
                $("#comboantite option[value=" + data['hi_ANTITETANICA_ANTPER'] + "]").attr("selected",true); 
                $("#combommr option[value=" + data['hi_MMR_ANTPER'] + "]").attr("selected",true); 
                $("#comboenferme option[value=" + data['hi_ENFERMEDAD_MEN_ANTPER'] + "]").attr("selected",true); 
                $("#comboactifis option[value=" + data['hi_ACTIVIDAD_FIS_ANTPER'] + "]").attr("selected",true); 
                $("#combovicti option[value=" + data['hi_VICTIMA_MAL_ANTPER'] + "]").attr("selected",true); 
                $("#combootros2 option[value=" + data['hi_OTROS2_ANTPER'] + "]").attr("selected",true); 
                $('#txtcual2').val(data['hi_CUAL2_ANTPER']);
                //*********************************************************************//     
                //****************************ANTECEDENTES GINECOLOGICOS***************//
                hi_ID_ANTGIN = data['hi_ID_ANTGIN'];
                $('#txtmenar').val(data['hi_MENARQUIA_ANTGIN']);
                $('#txtg').val(data['hi_G_ANTGIN']);
                $('#txtp').val(data['hi_P_ANTGIN']);
                $('#txtc').val(data['hi_C_ANTGIN']);
                $('#txta').val(data['hi_A_ANTGIN']);
                $('#txte').val(data['hi_E_ANTGIN']);
                $('#txtv').val(data['hi_V_ANTGIN']);
                $('#txtm').val(data['hi_M_ANTGIN']);
                $("#combociclos option[value=" + data['hi_CICLOS_ANTGIN'] + "]").attr("selected",true); 
                $("#comboplanif option[value=" + data['hi_PLANIFICACION_FAM_ANTGIN'] + "]").attr("selected",true); 
                $("#comboflujov option[value=" + data['hi_FLUJO_VAG_ANTGIN'] + "]").attr("selected",true);                 
                $("#comboits option[value=" + data['hi_ITS_ANTGIN'] + "]").attr("selected",true); 
                $("#combocitol option[value=" + data['hi_CITOLOGIA_ULT_ANTGIN'] + "]").attr("selected",true); 
                $("#combocolcops option[value=" + data['hi_COLCOPSCOPIA_ANTGIN'] + "]").attr("selected",true); 
                $('#txtperiointer').val(data['hi_PERIODO_INTER_ANTGIN']);
                $("#comboinfert option[value=" + data['hi_INFERTILIDAD_ANTGIN'] + "]").attr("selected",true); 
                $("#combottos option[value=" + data['hi_TTOS_INFER_ANTGIN'] + "]").attr("selected",true); 
                $("#comborpm option[value=" + data['hi_RPM_ANTGIN'] + "]").attr("selected",true); 
                $("#comborciu option[value=" + data['hi_RCIU_ANTGIN'] + "]").attr("selected",true); 
                $("#comboapp option[value=" + data['hi_APP_ANTGIN'] + "]").attr("selected",true); 
                $("#combopartopre option[value=" + data['hi_PARTO_PREM_ANTGIN'] + "]").attr("selected",true); 
                $("#combogemelar option[value=" + data['hi_GEMELAR_ANTGIN'] + "]").attr("selected",true); 
                $("#combomalform option[value=" + data['hi_MALFORMACIONES_ANTGIN'] + "]").attr("selected",true); 
                $("#combopolihri option[value=" + data['hi_POLIHIDRAMNIOS_ANTGIN'] + "]").attr("selected",true); 
                $("#combooligohri option[value=" + data['hi_OLIGOHIDRAMNIOS_ANTGIN'] + "]").attr("selected",true); 
                $("#comboembprolo option[value=" + data['hi_EMB_PROLONGADO_ANTGIN'] + "]").attr("selected",true); 
                $("#comboameabort option[value=" + data['hi_AMENAZA_ABO_ANTGIN'] + "]").attr("selected",true);                 
                $("#combootros3 option[value=" + data['hi_OTROS3_ANTGIN'] + "]").attr("selected",true); 
                $('#txtcual3').val(data['hi_CUAL3_ANTGIN']);
                $('#hi_CUALITS_ANTGIN').val(data['hi_CUALITS_ANTGIN']);             
                //*********************************************************************//     
                //****************************HISTORIA REPRODUCTIVA********************//
                hi_ID_HISREP = data['hi_ID_HISREP'];
                $("#comboedad option[value=" + data['hi_EDAD_HISREP'] + "]").attr("selected",true); 
                $("#comboparidad option[value=" + data['hi_PARIDAD_HISREP'] + "]").attr("selected",true); 
                $("#chehabit option[value=" + data['hi_ABORTO_HABIT_HISREP'] + "]").attr("selected",true); 
                $("#cheretpla option[value=" + data['hi_RETENCION_PLA_HISREP'] + "]").attr("selected",true); 
                $("#cherecnacmay option[value=" + data['hi_REC_NACIDO1_HISREP'] + "]").attr("selected",true); 
                $("#cherecnac option[value=" + data['hi_REC_NACIDO2_HISREP'] + "]").attr("selected",true); 
                $("#chehtaindu option[value=" + data['hi_HTA_INDUCIDO_HISREP'] + "]").attr("selected",true); 
                $("#cheembgemel option[value=" + data['hi_EMB_GEMEL_CES_HISREP'] + "]").attr("selected",true); 
                $("#chemorti option[value=" + data['hi_MORTINATO_HISREP'] + "]").attr("selected",true); 
                $("#chetpprolon option[value=" + data['hi_TP_PROLON_HISREP'] + "]").attr("selected",true); 
                //*********************************************************************//     
                //*******************HISTORIA CONDICIONES ASOCIADAS********************//
                hi_ID_CONASO = data['hi_ID_CONASO'];
                $("#comboqxgines1 option[value=" + data['hi_QX_GINECOLOGIAS1_CONASO'] + "]").attr("selected",true); 
                $("#comborenalcros1 option[value=" + data['hi_ENF_RENS1_CONASO'] + "]").attr("selected",true); 
                $("#combodiabges1 option[value=" + data['hi_DIABETES_GESS1_CONASO'] + "]").attr("selected",true); 
                $("#combodiabmells1 option[value=" + data['hi_DIABETES_MELLIS1_CONASO'] + "]").attr("selected",true); 
                $("#comboenfcardis1 option[value=" + data['hi_ENF_CARDIACAS1_CONASO'] + "]").attr("selected",true); 
                $("#comboenfinfes1 option[value=" + data['hi_ENF_INFAGUDAS1_CONASO'] + "]").attr("selected",true); 
                $("#comboenfautoins1 option[value=" + data['hi_ENF_AUTOINMUNES1_CONASO'] + "]").attr("selected",true); 
                $("#comboanemias1 option[value=" + data['hi_ANEMIA_HBS1_CONASO'] + "]").attr("selected",true); 
                $("#comboqxgines2 option[value=" + data['hi_QX_GINECOLOGIAS2_CONASO'] + "]").attr("selected",true); 
                $("#comborenalcros2 option[value=" + data['hi_ENF_RENS2_CONASO'] + "]").attr("selected",true); 
                $("#combodiabges2 option[value=" + data['hi_DIABETES_GESS2_CONASO'] + "]").attr("selected",true); 
                $("#combodiabmells2 option[value=" + data['hi_DIABETES_MELLIS2_CONASO'] + "]").attr("selected",true); 
                $("#comboenfcardis2 option[value=" + data['hi_ENF_CARDIACAS2_CONASO'] + "]").attr("selected",true); 
                $("#comboenfinfes2 option[value=" + data['hi_ENF_INFAGUDAS2_CONASO'] + "]").attr("selected",true); 
                $("#comboenfautoins2 option[value=" + data['hi_ENF_AUTOINMUNES2_CONASO'] + "]").attr("selected",true); 
                $("#comboanemias2 option[value=" + data['hi_ANEMIA_HBS2_CONASO'] + "]").attr("selected",true); 
                $("#comboqxgines3 option[value=" + data['hi_QX_GINECOLOGIAS3_CONASO'] + "]").attr("selected",true); 
                $("#comborenalcros3 option[value=" + data['hi_ENF_RENS3_CONASO'] + "]").attr("selected",true); 
                $("#combodiabges3 option[value=" + data['hi_DIABETES_GESS3_CONASO'] + "]").attr("selected",true); 
                $("#combodiabmells3 option[value=" + data['hi_DIABETES_MELLIS3_CONASO'] + "]").attr("selected",true); 
                $("#comboenfcardis3 option[value=" + data['hi_ENF_CARDIACAS3_CONASO'] + "]").attr("selected",true); 
                $("#comboenfinfes3 option[value=" + data['hi_ENF_INFAGUDAS3_CONASO'] + "]").attr("selected",true); 
                $("#comboenfautoins3 option[value=" + data['hi_ENF_AUTOINMUNES3_CONASO'] + "]").attr("selected",true); 
                $("#comboanemias3 option[value=" + data['hi_ANEMIA_HBS3_CONASO'] + "]").attr("selected",true);                  
                //*********************************************************************//   
                //*******************HISTORIA EMBARAZO ACTUAL**************************//
                hi_ID_EMBACT = data['hi_ID_EMBACT'];
                $("#combohemomens1 option[value=" + data['hi_HEMORRAGIAS1_MAL_EMBACT'] + "]").attr("selected",true);
                $("#combovaginas1 option[value=" + data['hi_VAGINAS1_MAL_EMBACT'] + "]").attr("selected",true);
                $("#comboeprolongas1 option[value=" + data['hi_E_PROLONGADOS1_MAL_EMBACT'] + "]").attr("selected",true);
                $("#combohtas1 option[value=" + data['hi_HTAS1_MAL_EMBACT'] + "]").attr("selected",true);
                $("#comborpms1 option[value=" + data['hi_RPMS1_MAL_EMBACT'] + "]").attr("selected",true);
                $("#combopolihis1 option[value=" + data['hi_POLIHRIDAMNIOSS1_MAL_EMBACT'] + "]").attr("selected",true);
                $("#comborcius1 option[value=" + data['hi_RCIUS1_MAL_EMBACT'] + "]").attr("selected",true);
                $("#comboembmultiples1 option[value=" + data['hi_EMB_MULTIPLES1_MAL_EMBACT'] + "]").attr("selected",true);
                $("#combomalapres1 option[value=" + data['hi_MALA_PRESENTS1_MAL_EMBACT'] + "]").attr("selected",true);
                $("#comboisos1 option[value=" + data['hi_ISOS1_MAL_EMBACT'] + "]").attr("selected",true);
                
                $("#combohemomens2 option[value=" + data['hi_HEMORRAGIAS2_MAL_EMBACT'] + "]").attr("selected",true);
                $("#combovaginas2 option[value=" + data['hi_VAGINAS2_MAL_EMBACT'] + "]").attr("selected",true);
                $("#comboeprolongas2 option[value=" + data['hi_E_PROLONGADOS2_MAL_EMBACT'] + "]").attr("selected",true);
                $("#combohtas2 option[value=" + data['hi_HTAS2_MAL_EMBACT'] + "]").attr("selected",true);
                $("#comborpms2 option[value=" + data['hi_RPMS2_MAL_EMBACT'] + "]").attr("selected",true);
                $("#combopolihis2 option[value=" + data['hi_POLIHRIDAMNIOSS2_MAL_EMBACT'] + "]").attr("selected",true);
                $("#comborcius2 option[value=" + data['hi_RCIUS2_MAL_EMBACT'] + "]").attr("selected",true);
                $("#comboembmultiples2 option[value=" + data['hi_EMB_MULTIPLES2_MAL_EMBACT'] + "]").attr("selected",true);
                $("#combomalapres2 option[value=" + data['hi_MALA_PRESENTS2_MAL_EMBACT'] + "]").attr("selected",true);
                $("#comboisos2 option[value=" + data['hi_ISOS2_MAL_EMBACT'] + "]").attr("selected",true);
                
                $("#combohemomens3 option[value=" + data['hi_HEMORRAGIAS3_MAL_EMBACT'] + "]").attr("selected",true);
                $("#combovaginas3 option[value=" + data['hi_VAGINAS3_MAL_EMBACT'] + "]").attr("selected",true);
                $("#comboeprolongas3 option[value=" + data['hi_E_PROLONGADOS3_MAL_EMBACT'] + "]").attr("selected",true);
                $("#combohtas3 option[value=" + data['hi_HTAS3_MAL_EMBACT'] + "]").attr("selected",true);
                $("#comborpms3 option[value=" + data['hi_RPMS3_MAL_EMBACT'] + "]").attr("selected",true);
                $("#combopolihis3 option[value=" + data['hi_POLIHRIDAMNIOSS3_MAL_EMBACT'] + "]").attr("selected",true);
                $("#comborcius3 option[value=" + data['hi_RCIUS3_MAL_EMBACT'] + "]").attr("selected",true);
                $("#comboembmultiples3 option[value=" + data['hi_EMB_MULTIPLES3_MAL_EMBACT'] + "]").attr("selected",true);
                $("#combomalapres3 option[value=" + data['hi_MALA_PRESENTS3_MAL_EMBACT'] + "]").attr("selected",true);
                $("#comboisos3 option[value=" + data['hi_ISOS3_MAL_EMBACT'] + "]").attr("selected",true);
                $('#txtinmunizarh').val(data['hi_INMUNIZACION_RH_MAL_EMBACT']);        
                //*********************************************************************//   
                //*******************HISTORIA RIESGO PSICOSOCIAL***********************//
                hi_ID_RIEPSI = data['hi_ID_RIEPSI'];
                $("#combotensionemo option[value=" + data['hi_TENSION_EMO_RIEPSI'] + "]").attr("selected",true);
                $("#combohumordepre option[value=" + data['hi_HUMOR_DEPRE_RIEPSI'] + "]").attr("selected",true);
                $("#comboneurovege option[value=" + data['hi_SINT_NEURO_RIEPSI'] + "]").attr("selected",true);
                $("#comboeltiempo option[value=" + data['hi_SOP_FAM_TIEM_RIEPSI'] + "]").attr("selected",true);
                $("#comboelespacio option[value=" + data['hi_SOP_FAM_ESPA_RIEPSI'] + "]").attr("selected",true);
                $("#comboeldinero option[value=" + data['hi_SOP_FAM_DIN_RIEPSI'] + "]").attr("selected",true);
                $("#combovictimama option[value=" + data['hi_ES_VICTIMA_MAL_RIEPSI'] + "]").attr("selected",true);
                $('#txtcual4').val(data['hi_CUAL4_RIEPSI']);   
                $('#txtparentesco').val(data['hi_PARENTESCO_MAL_RIEPSI']);   
                //*********************************************************************// 
                //*******************RIESGO BIOPSICOSOCIAL PRENATAL********************//
                hi_ID_RIEBIO = data['hi_ID_RIEBIO'];
                $.reco1();
                $.reco2();
                $.reco3();
                $('#t1').val(data['hi_TOTALS1_RIEBIO']);   
                $('#t2').val(data['hi_TOTALS2_RIEBIO']);   
                $('#t3').val(data['hi_TOTALS3_RIEBIO']);                   
                //*********************************************************************// 
                //*****************************EXAMENES GLICEMIA***********************//
                hi_ID_EXAGLI = data['hi_ID_EXAGLI'];
                $('#txtgliceayu').val(data['hi_GLICEMIA_AYU_EXAGLI']);     
                $('#txt2glicemia').val(data['hi_2GLICEMIA_EXAGLI']);     
                $('#txtfrealiza').val(data['hi_FECHA_REALIZA_EXAGLI']);     
                $("#comgrupo option[value=" + data['hi_GRUPO_EXAGLI'] + "]").attr("selected",true);
                $("#comrh option[value=" + data['hi_RH_EXAGLI'] + "]").attr("selected",true);                
                //*********************************************************************// 
                //*****************************EXAMENES CTGO***************************//
                hi_ID_EXACTGO = data['hi_ID_EXACTGO'];
                $('#txtctgo').val(data['hi_CTGO_EXACTGO']);     
                $("#comgliceexa1 option[value=" + data['hi_GLICEMIA_PRIMERA_EXACTGO'] + "]").attr("selected",true);
                $("#comgliceexa2 option[value=" + data['hi_GLICEMIA_SEGUNDA_EXACTGO'] + "]").attr("selected",true);
                $('#txtfgliceexa1').val(data['hi_FECHA_GLICE_PRI_EXACTGO']);    
                $('#txtfgliceexa2').val(data['hi_FECHA_GLICE_SEG_EXACTGO']);    
                $("#comcurvaglice option[value=" + data['hi_CURVA_GLICE_EXACTGO'] + "]").attr("selected",true);
                //*********************************************************************// 
                //*****************************PARACLINICOS 1***************************//
                hi_ID_PARA = data['hi_ID_PARA'];
                $('#hi_HBANT_PARA').val(data['hi_HBANT_PARA']);   
                $('#hi_HCTOANT_PARA').val(data['hi_HCTOANT_PARA']);   
                $('#hi_VDRLANT_PARA').val(data['hi_VDRLANT_PARA']);   
                $('#hi_FROTIS_VAGANT_PARA').val(data['hi_FROTIS_VAGANT_PARA']);   
                $('#hi_PARCIALANT_PARA').val(data['hi_PARCIALANT_PARA']);   
                $('#hi_GRAMORINAANT_PARA').val(data['hi_GRAMORINAANT_PARA']);   
                $('#hi_BACTANT_PARA').val(data['hi_BACTANT_PARA']);  
                
                $('#hi_HB1TRI_PARA').val(data['hi_HB1TRI_PARA']);   
                $('#hi_HCTO1TRI_PARA').val(data['hi_HCTO1TRI_PARA']);   
                $('#hi_VDRL1TRI_PARA').val(data['hi_VDRL1TRI_PARA']);   
                $('#hi_FROTIS_VAG1TRI_PARA').val(data['hi_FROTIS_VAG1TRI_PARA']);   
                $('#hi_PARCIAL1TRI_PARA').val(data['hi_PARCIAL1TRI_PARA']);   
                $('#hi_GRAMORINA1TRI_PARA').val(data['hi_GRAMORINA1TRI_PARA']);   
                $('#hi_BACT1TRI_PARA').val(data['hi_BACT1TRI_PARA']);   
                
                $('#hi_HB2TRI_PARA').val(data['hi_HB2TRI_PARA']);   
                $('#hi_HCTO2TRI_PARA').val(data['hi_HCTO2TRI_PARA']);   
                $('#hi_VDRL2TRI_PARA').val(data['hi_VDRL2TRI_PARA']);   
                $('#hi_FROTIS_VAG2TRI_PARA').val(data['hi_FROTIS_VAG2TRI_PARA']);   
                $('#hi_PARCIAL2TRI_PARA').val(data['hi_PARCIAL2TRI_PARA']);   
                $('#hi_GRAMORINA2TRI_PARA').val(data['hi_GRAMORINA2TRI_PARA']);   
                $('#hi_BACT2TRI_PARA').val(data['hi_BACT2TRI_PARA']);   
                
                $('#hi_HB3TRI_PARA').val(data['hi_HB3TRI_PARA']);   
                $('#hi_HCTO3TRI_PARA').val(data['hi_HCTO3TRI_PARA']);   
                $('#hi_VDRL3TRI_PARA').val(data['hi_VDRL3TRI_PARA']);   
                $('#hi_FROTIS_VAG3TRI_PARA').val(data['hi_FROTIS_VAG3TRI_PARA']);   
                $('#hi_PARCIAL3TRI_PARA').val(data['hi_PARCIAL3TRI_PARA']);   
                $('#hi_GRAMORINA3TRI_PARA').val(data['hi_GRAMORINA3TRI_PARA']);   
                $('#hi_BACT3TRI_PARA').val(data['hi_BACT3TRI_PARA']);                   
                //*********************************************************************// 
                //*****************************PARACLINICOS 2***************************//    
                hi_ID_PARA2 = data['hi_ID_PARA2'];
                $("#hi_UROCULTIVOANT_PARA2 option[value=" + data['hi_UROCULTIVOANT_PARA2'] + "]").attr("selected",true);
                $("#hi_FTAABSANT_PARA2 option[value=" + data['hi_FTAABSANT_PARA2'] + "]").attr("selected",true);
                $("#hi_HEPATITISBANT_PARA2 option[value=" + data['hi_HEPATITISBANT_PARA2'] + "]").attr("selected",true);
                $("#hi_ANTITETANICAANT_PARA2 option[value=" + data['hi_ANTITETANICAANT_PARA2'] + "]").attr("selected",true);
                $("#hi_HIVANT_PARA2 option[value=" + data['hi_HIVANT_PARA2'] + "]").attr("selected",true);
                $("#hi_CITOLOGIA_CERANT_PARA2 option[value=" + data['hi_CITOLOGIA_CERANT_PARA2'] + "]").attr("selected",true);
                $("#hi_UROCULTIVO1TRI_PARA2 option[value=" + data['hi_UROCULTIVO1TRI_PARA2'] + "]").attr("selected",true);
                $("#hi_FTAABS1TRI_PARA2 option[value=" + data['hi_FTAABS1TRI_PARA2'] + "]").attr("selected",true);
                $("#hi_HEPATITISB1TRI_PARA2 option[value=" + data['hi_HEPATITISB1TRI_PARA2'] + "]").attr("selected",true);
                $("#hi_ANTITETANICA1TRI_PARA2 option[value=" + data['hi_ANTITETANICA1TRI_PARA2'] + "]").attr("selected",true);
                $("#hi_HIV1TRI_PARA2 option[value=" + data['hi_HIV1TRI_PARA2'] + "]").attr("selected",true);
                $("#hi_CITOLOGIA_CER1TRI_PARA2 option[value=" + data['hi_CITOLOGIA_CER1TRI_PARA2'] + "]").attr("selected",true);
                $("#hi_UROCULTIVO2TRI_PARA2 option[value=" + data['hi_UROCULTIVO2TRI_PARA2'] + "]").attr("selected",true);
                $("#hi_FTAABS2TRI_PARA2 option[value=" + data['hi_FTAABS2TRI_PARA2'] + "]").attr("selected",true);
                $("#hi_HEPATITISB2TRI_PARA2 option[value=" + data['hi_HEPATITISB2TRI_PARA2'] + "]").attr("selected",true);
                $("#hi_ANTITETANICA2TRI_PARA2 option[value=" + data['hi_ANTITETANICA2TRI_PARA2'] + "]").attr("selected",true);
                $("#hi_HIV2TRI_PARA2 option[value=" + data['hi_HIV2TRI_PARA2'] + "]").attr("selected",true);
                $("#hi_CITOLOGIA_CER2TRI_PARA2 option[value=" + data['hi_CITOLOGIA_CER2TRI_PARA2'] + "]").attr("selected",true);
                $("#hi_UROCULTIVO3TRI_PARA2 option[value=" + data['hi_UROCULTIVO3TRI_PARA2'] + "]").attr("selected",true);
                $("#hi_FTAABS3TRI_PARA2 option[value=" + data['hi_FTAABS3TRI_PARA2'] + "]").attr("selected",true);
                $("#hi_HEPATITISB3TRI_PARA2 option[value=" + data['hi_HEPATITISB3TRI_PARA2'] + "]").attr("selected",true);
                $("#hi_ANTITETANICA3TRI_PARA2 option[value=" + data['hi_ANTITETANICA3TRI_PARA2'] + "]").attr("selected",true);
                $("#hi_HIV3TRI_PARA2 option[value=" + data['hi_HIV3TRI_PARA2'] + "]").attr("selected",true);
                $("#hi_CITOLOGIA_CER3TRI_PARA2 option[value=" + data['hi_CITOLOGIA_CER3TRI_PARA2'] + "]").attr("selected",true);                
                //*********************************************************************// 
                //*****************************O SULLIVAN******************************//
                hi_ID_SULLI = data['hi_ID_SULLI'];
                $('#hi_GLISEMIA_PRE_SULLI').val(data['hi_GLISEMIA_PRE_SULLI']); 
                $('#hi_GLICEMIA_POST_SULLI').val(data['hi_GLICEMIA_POST_SULLI']); 
                $('#hi_FECHA_RESULTADO_SULLI').val(data['hi_FECHA_RESULTADO_SULLI']); 
                $("#hi_S16_SULLI option[value=" + data['hi_S16_SULLI'] + "]").attr("selected",true);    
                $("#hi_S20_SULLI option[value=" + data['hi_S20_SULLI'] + "]").attr("selected",true);    
                $("#hi_S24_SULLI option[value=" + data['hi_S24_SULLI'] + "]").attr("selected",true);    
                $("#hi_S28_SULLI option[value=" + data['hi_S28_SULLI'] + "]").attr("selected",true);    
                $("#hi_S32_SULLI option[value=" + data['hi_S32_SULLI'] + "]").attr("selected",true);    
                $("#hi_S36_SULLI option[value=" + data['hi_S36_SULLI'] + "]").attr("selected",true);    
                $('#hi_FECHAS16_SULLI').val(data['hi_FECHAS16_SULLI']); 
                $('#hi_FECHAS20_SULLI').val(data['hi_FECHAS20_SULLI']); 
                $('#hi_FECHAS24_SULLI').val(data['hi_FECHAS24_SULLI']); 
                $('#hi_FECHAS28_SULLI').val(data['hi_FECHAS28_SULLI']); 
                $('#hi_FECHAS32_SULLI').val(data['hi_FECHAS32_SULLI']); 
                $('#hi_FECHAS36_SULLI').val(data['hi_FECHAS36_SULLI']); 
                $("#hi_ROLLOVERTEXT_SULLI option[value=" + data['hi_ROLLOVERTEXT_SULLI'] + "]").attr("selected",true);    
                //*********************************************************************// 
                //*****************************ECO*************************************//
                hi_ID_ECO = data['hi_ID_ECO'];
                $('#hi_EDAD_GEST1C_ECO').val(data['hi_EDAD_GEST1C_ECO']); 
                $("#hi_GESTACIONALAMENO1C_ECO option[value=" + data['hi_GESTACIONALAMENO1C_ECO'] + "]").attr("selected",true);   
                $("#hi_PRESENCIA_HEMA1C_ECO option[value=" + data['hi_PRESENCIA_HEMA1C_ECO'] + "]").attr("selected",true);   
                $("#hi_OTROS_MARCADORES1C_ECO option[value=" + data['hi_OTROS_MARCADORES1C_ECO'] + "]").attr("selected",true);   
                $("#hi_SONOLUCENCIAS1C_ECO option[value=" + data['hi_SONOLUCENCIAS1C_ECO'] + "]").attr("selected",true);   
                $('#hi_OBSERVACIONES1C_ECO').val(data['hi_OBSERVACIONES1C_ECO']); 
                
                $('#hi_EDAD_GEST1TRI_ECO').val(data['hi_EDAD_GEST1TRI_ECO']); 
                $("#hi_GESTACIONALAMENO1TRI_ECO option[value=" + data['hi_GESTACIONALAMENO1TRI_ECO'] + "]").attr("selected",true);  
                $("#hi_PRESENCIA_HEMA1TRI_ECO option[value=" + data['hi_PRESENCIA_HEMA1TRI_ECO'] + "]").attr("selected",true);  
                $("#hi_OTROS_MARCADORES1TRI_ECO option[value=" + data['hi_OTROS_MARCADORES1TRI_ECO'] + "]").attr("selected",true);  
                $("#hi_SONOLUCENCIAS1TRI_ECO option[value=" + data['hi_SONOLUCENCIAS1TRI_ECO'] + "]").attr("selected",true);  
                $('#hi_OBSERVACIONES1TRI_ECO').val(data['hi_OBSERVACIONES1TRI_ECO']); 
                
                $("#hi_NORMA2TRI_ECO option[value=" + data['hi_NORMA2TRI_ECO'] + "]").attr("selected",true);  
                $("#hi_POLIHRIDAMNIOS2TRI_ECO option[value=" + data['hi_POLIHRIDAMNIOS2TRI_ECO'] + "]").attr("selected",true);  
                $("#hi_RCIU2TRI_ECO option[value=" + data['hi_RCIU2TRI_ECO'] + "]").attr("selected",true);  
                $("#hi_OLIGOHIDRAMNIOS2TRI_ECO option[value=" + data['hi_OLIGOHIDRAMNIOS2TRI_ECO'] + "]").attr("selected",true);  
                $("#hi_MACROSOMIA2TRI_ECO option[value=" + data['hi_MACROSOMIA2TRI_ECO'] + "]").attr("selected",true);  
                $("#hi_MALFORMACION2TRI_ECO option[value=" + data['hi_MALFORMACION2TRI_ECO'] + "]").attr("selected",true);  
                $('#hi_OTRAS_ANO2TRI_ECO').val(data['hi_OTRAS_ANO2TRI_ECO']); 
                $('#hi_OBSERVA2TRI_ECO').val(data['hi_OBSERVA2TRI_ECO']); 
                
                $("#hi_NORMA3TRI_ECO option[value=" + data['hi_NORMA3TRI_ECO'] + "]").attr("selected",true);  
                $("#hi_POLIHRIDAMNIOS3TRI_ECO option[value=" + data['hi_POLIHRIDAMNIOS3TRI_ECO'] + "]").attr("selected",true);  
                $("#hi_RCIU3TRI_ECO option[value=" + data['hi_RCIU3TRI_ECO'] + "]").attr("selected",true);  
                $("#hi_OLIGOHIDRAMNIOS3TRI_ECO option[value=" + data['hi_OLIGOHIDRAMNIOS3TRI_ECO'] + "]").attr("selected",true);  
                $("#hi_MACROSOMIA3TRI_ECO option[value=" + data['hi_MACROSOMIA3TRI_ECO'] + "]").attr("selected",true);  
                $("#hi_MALFORMACION3TRI_ECO option[value=" + data['hi_MALFORMACION3TRI_ECO'] + "]").attr("selected",true);  
                $('#hi_OTRAS_ANO3TRI_ECO').val(data['hi_OTRAS_ANO3TRI_ECO']); 
                $('#hi_OBSERVA3TRI_ECO').val(data['hi_OBSERVA3TRI_ECO']); 
                //*********************************************************************// 
                //*****************************CONTROL PRENATAL************************//
                cuantos=0;
                var tama= data.tam;
                var i;
                for(i=1;i<=tama;i++){    
                    vector[i]=data['hi_ID_CON_PRE'+i];
                    $.agre(data['hi_FECHA_CON_PRE'+i],data['hi_SEMANAS_CON_PRE'+i],data['hi_PESO_CON_PRE'+i],data['hi_TALLA_CON_PRE'+i],data['hi_TENSION_CON_PRE'+i],data['hi_ALTURA_CON_PRE'+i],data['hi_FCF_CON_PRE'+i],data['hi_PRESENTACION_CON_PRE'+i],data['hi_MOVIMIENTOS_CON_PRE'+i],data['hi_VALORACION_CON_PRE'+i],data['hi_EDEMAS_CON_PRE'+i],data['hi_MONITOREO_CON_PRE'+i],data['hi_RESPONSABLE_CON_PRE'+i],data['hi_EXAMEN_MA_CON_PRE'+i],data['hi_EXAMEN_GE_CON_PRE'+i],i);        
                }                 
                $('#btn_add').css('display','inline-block'); 
                //*********************************************************************// 
                //*****************************MORBILIDADES TRAZADORAS*****************//
                hi_ID_PREE = data['hi_ID_PREE'];
                $("#hi_ID_PREE option[value=" + data['hi_ID_PREE'] + "]").attr("selected",true);
                $("#hi_ID_MAT_PER option[value=" + data['hi_ID_MAT_PER'] + "]").attr("selected",true);
                $("#hi_SIN_RIESGO_PREE option[value=" + data['hi_SIN_RIESGO_PREE'] + "]").attr("selected",true);
                $("#hi_CON_RIESGO_SIN_PREE option[value=" + data['hi_CON_RIESGO_SIN_PREE'] + "]").attr("selected",true);
                $("#hi_CON_RIESGO_UTI_PREE option[value=" + data['hi_CON_RIESGO_UTI_PREE'] + "]").attr("selected",true);
                $("#hi_CON_RIESGO_BIO1_PREE option[value=" + data['hi_CON_RIESGO_BIO1_PREE'] + "]").attr("selected",true);
                $("#hi_CON_RIESGO_BIO2_PREE option[value=" + data['hi_CON_RIESGO_BIO2_PREE'] + "]").attr("selected",true);
                $("#hi_CON_RIESGO_CAL_PREE option[value=" + data['hi_CON_RIESGO_CAL_PREE'] + "]").attr("selected",true);
                $("#hi_CON_RIESGO_NUTRI_PREE option[value=" + data['hi_CON_RIESGO_NUTRI_PREE'] + "]").attr("selected",true);                
                //*********************************************************************// 
                //*****************************EXAMEN**********************************//
                hi_ID_EXAMEN = data['hi_ID_EXAMEN'];
                $('#hi_PARTO_PRESIN_EXAMEN').val(data['hi_PARTO_PRESIN_EXAMEN']);
                $('#hi_DIABETESSIN_EXAMEN').val(data['hi_DIABETESSIN_EXAMEN']);
                $('#hi_BAJOSIN_EXAMEN').val(data['hi_BAJOSIN_EXAMEN']);
                $('#hi_RIESGOSIN_EXAMEN').val(data['hi_RIESGOSIN_EXAMEN']);
                $('#hi_HPPSIN_EXAMEN').val(data['hi_HPPSIN_EXAMEN']);
                $('#hi_PARTO_PRECONSIN_EXAMEN').val(data['hi_PARTO_PRECONSIN_EXAMEN']);
                $('#hi_DIABETESCONSIN_EXAMEN').val(data['hi_DIABETESCONSIN_EXAMEN']);
                $('#hi_BAJOCONSIN_EXAMEN').val(data['hi_BAJOCONSIN_EXAMEN']);
                $('#hi_RIESGOCONSIN_EXAMEN').val(data['hi_RIESGOCONSIN_EXAMEN']);
                $('#hi_HPPCONSIN_EXAMEN').val(data['hi_HPPCONSIN_EXAMEN']);
                $('#hi_PARTO_PRECONTRA_EXAMEN').val(data['hi_PARTO_PRECONTRA_EXAMEN']);
                $('#hi_DIABETESCONTRA_EXAMEN').val(data['hi_DIABETESCONTRA_EXAMEN']);
                $('#hi_BAJOCONTRA_EXAMEN').val(data['hi_BAJOCONTRA_EXAMEN']);
                $('#hi_RIESGOCONTRA_EXAMEN').val(data['hi_RIESGOCONTRA_EXAMEN']);
                $('#hi_HPPCONTRA_EXAMEN').val(data['hi_HPPCONTRA_EXAMEN']);                
                //*********************************************************************// 
                //*****************************MORBILIDAD MATERNA**********************//
                hi_ID_MOR_MAT = data['hi_ID_MOR_MAT'];
                $('#hi_NINGUNA_MOR_MAT').val(data['hi_NINGUNA_MOR_MAT']);
                $('#hi_ABRUPTIO_MOR_MAT').val(data['hi_ABRUPTIO_MOR_MAT']);
                $('#hi_AMENAZA_MOR_MAT').val(data['hi_AMENAZA_MOR_MAT']);
                $('#hi_ANEMIA_MOR_MAT').val(data['hi_ANEMIA_MOR_MAT']);
                $('#hi_ATONIA_MOR_MAT').val(data['hi_ATONIA_MOR_MAT']);
                $('#hi_CARDIOPATIA_MOR_MAT').val(data['hi_CARDIOPATIA_MOR_MAT']);
                $('#hi_CID_MOR_MAT').val(data['hi_CID_MOR_MAT']);
                $('#hi_DESGARROS_MOR_MAT').val(data['hi_DESGARROS_MOR_MAT']);
                $('#hi_DIABETES_GES_MOR_MAT').val(data['hi_DIABETES_GES_MOR_MAT']);
                $('#hi_DIABETES_MELLI_MOR_MAT').val(data['hi_DIABETES_MELLI_MOR_MAT']);
                $('#hi_ECLAMPSIA_MOR_MAT').val(data['hi_ECLAMPSIA_MOR_MAT']);
                $('#hi_PREECLAMPSIA_LEVE_MOR_MAT').val(data['hi_PREECLAMPSIA_LEVE_MOR_MAT']);
                $('#hi_PRECLAMPSIA_SEVERA_MOR_MAT').val(data['hi_PRECLAMPSIA_SEVERA_MOR_MAT']);
                $('#hi_PRECLAMPSIA_SEVERACON_MOR_MAT').val(data['hi_PRECLAMPSIA_SEVERACON_MOR_MAT']);
                $('#hi_HEPATITIS_MOR_MAT').val(data['hi_HEPATITIS_MOR_MAT']);
                $('#hi_HIPERTENCION_CRO_MOR_MAT').val(data['hi_HIPERTENCION_CRO_MOR_MAT']);
                $('#hi_HIPERTENCION_GES_MOR_MAT').val(data['hi_HIPERTENCION_GES_MOR_MAT']);
                $('#hi_INFECCION_MOR_MAT').val(data['hi_INFECCION_MOR_MAT']);
                $('#hi_MALARIA_MOR_MAT').val(data['hi_MALARIA_MOR_MAT']);
                $('#hi_PLACENTA_PRE_MOR_MAT').val(data['hi_PLACENTA_PRE_MOR_MAT']);
                $('#hi_PLACENTA_RETE_MOR_MAT').val(data['hi_PLACENTA_RETE_MOR_MAT']);
                $('#hi_RCIU_MOR_MAT').val(data['hi_RCIU_MOR_MAT']);
                $('#hi_RUPTURA_MOR_MAT').val(data['hi_RUPTURA_MOR_MAT']);
                $('#hi_SEPSIS_MOR_MAT').val(data['hi_SEPSIS_MOR_MAT']);
                $('#hi_SIFILIS_MOR_MAT').val(data['hi_SIFILIS_MOR_MAT']);
                $('#hi_TBC_MOR_MAT').val(data['hi_TBC_MOR_MAT']);
                $('#hi_HEMORRAGIA_DEL_MOR_MAT').val(data['hi_HEMORRAGIA_DEL_MOR_MAT']);
                $('#hi_HEMORRAGIA_POST_MOR_MAT').val(data['hi_HEMORRAGIA_POST_MOR_MAT']);
                $('#hi_EMBARAZO_MUL_MOR_MAT').val(data['hi_EMBARAZO_MUL_MOR_MAT']);
                $('#hi_TROMBOEMBOLISMO_MOR_MAT').val(data['hi_TROMBOEMBOLISMO_MOR_MAT']);
                $('#hi_VIH_MOR_MAT').val(data['hi_VIH_MOR_MAT']);
                $('#hi_OTRAS_MOR_MAT').val(data['hi_OTRAS_MOR_MAT']);                
                //*********************************************************************// 
                //*****************************PROCEDENCIA*****************************//
                hi_ID_PRO = data['hi_ID_PRO'];                
                $('#hi_DOMICILIO_PRO').val(data['hi_DOMICILIO_PRO']);
                $('#hi_HOGAR_PRO').val(data['hi_HOGAR_PRO']);
                $('#hi_PARTERA_PRO').val(data['hi_PARTERA_PRO']);
                $('#hi_IPS_PRO').val(data['hi_IPS_PRO']);
                $('#hi_OTRA_PRO').val(data['hi_OTRA_PRO']);                
                //*********************************************************************// 
                //*****************************PARTO***********************************//
                hi_ID_PAR = data['hi_ID_PAR'];
                $('#hi_EDAD_GES_PAR').val(data['hi_EDAD_GES_PAR']);
                $("#hi_TAMA_PAR option[value=" + data['hi_TAMA_PAR'] + "]").attr("selected",true);
                $("#hi_INICIO_PAR option[value=" + data['hi_INICIO_PAR'] + "]").attr("selected",true);
                $("#hi_MEMBRANA_PAR option[value=" + data['hi_MEMBRANA_PAR'] + "]").attr("selected",true);
                $('#hi_FECHA_MEM_PAR').val(data['hi_FECHA_MEM_PAR']);
                
                hora=data['hi_HORA_MEM_PAR'];
                hora=hora.split(":");
                hora1=hora[0].split("0");
                min=hora[1].split(" ");                
                $("#comhora option[value=" + hora1[1] + "]").attr("selected",true);
                $("#commin option[value=" + min[0] + "]").attr("selected",true);
                $('#thora2').val(data['hi_HORA_MEM_PAR']);
                
                $("#hi_PRESENTACION_PAR option[value=" + data['hi_PRESENTACION_PAR'] + "]").attr("selected",true);
                //*********************************************************************// 
                //*****************************ORDEN DE NACIMIENTO*********************//
                hi_ID_ORD = data['hi_ID_ORD'];
                $("#hi_FETO_ORD option[value=" + data['hi_FETO_ORD'] + "]").attr("selected",true);
                $("#hi_MANEJO_ORD option[value=" + data['hi_MANEJO_ORD'] + "]").attr("selected",true);
                $("#hi_PARTOLOGIA_ORD option[value=" + data['hi_PARTOLOGIA_ORD'] + "]").attr("selected",true);
                $("#hi_EPISIOTOMIA_ORD option[value=" + data['hi_EPISIOTOMIA_ORD'] + "]").attr("selected",true);
                $("#hi_DESGARROS_ORD option[value=" + data['hi_DESGARROS_ORD'] + "]").attr("selected",true);                
                //*********************************************************************//          
                //*****************************TERMINACIÓN*****************************//
                hi_ID_TER = data['hi_ID_TER'];
                $("#hi_ESPONTANEA_TER option[value=" + data['hi_ESPONTANEA_TER'] + "]").attr("selected",true);
                $("#hi_FORCEPS_TER option[value=" + data['hi_FORCEPS_TER'] + "]").attr("selected",true);
                $("#hi_CESAREA_TER option[value=" + data['hi_CESAREA_TER'] + "]").attr("selected",true);
                $("#hi_CESAREA_HIS_TER option[value=" + data['hi_CESAREA_HIS_TER'] + "]").attr("selected",true);
                $('#hi_FECHA_TER').val(data['hi_FECHA_TER']);
                
                hora=data['hi_HORA_TER'];
                hora=hora.split(":");
                hora1=hora[0].split("0");
                min=hora[1].split(" ");                  
                $("#comhora1 option[value=" + hora1[1] + "]").attr("selected",true);
                $("#commin1 option[value=" + min[0] + "]").attr("selected",true);
                $('#thora22').val(data['hi_HORA_TER']);
                
                $("#hi_CESAREA_PRE_TER option[value=" + data['hi_CESAREA_PRE_TER'] + "]").attr("selected",true);
                $("#hi_SUFRIMIENTO_FA_TER option[value=" + data['hi_SUFRIMIENTO_FA_TER'] + "]").attr("selected",true);
                $("#hi_SESPROPORCION_TER option[value=" + data['hi_SESPROPORCION_TER'] + "]").attr("selected",true);
                $("#hi_ALTERACION_TER option[value=" + data['hi_ALTERACION_TER'] + "]").attr("selected",true);
                $("#hi_PARTO_PRO_TER option[value=" + data['hi_PARTO_PRO_TER'] + "]").attr("selected",true);
                $("#hi_FRACASO_TER option[value=" + data['hi_FRACASO_TER'] + "]").attr("selected",true);
                $("#hi_DESCENSO_TER option[value=" + data['hi_DESCENSO_TER'] + "]").attr("selected",true);
                $("#hi_EMBARAZO_MUL_TER option[value=" + data['hi_EMBARAZO_MUL_TER'] + "]").attr("selected",true);
                $("#hi_RCIU_TER option[value=" + data['hi_RCIU_TER'] + "]").attr("selected",true);
                $("#hi_PARTO_PRETE1_TER option[value=" + data['hi_PARTO_PRETE1_TER'] + "]").attr("selected",true);
                $("#hi_PARTO_PRETE2_TER option[value=" + data['hi_PARTO_PRETE2_TER'] + "]").attr("selected",true);
                $("#hi_PRESENTACION_POD_TER option[value=" + data['hi_PRESENTACION_POD_TER'] + "]").attr("selected",true);
                $("#hi_PRESENTACION_POS_TER option[value=" + data['hi_PRESENTACION_POS_TER'] + "]").attr("selected",true);
                $("#hi_POSICION_TER option[value=" + data['hi_POSICION_TER'] + "]").attr("selected",true);
                $("#hi_RUPTURA_TER option[value=" + data['hi_RUPTURA_TER'] + "]").attr("selected",true);
                $("#hi_INFECCION_TER option[value=" + data['hi_INFECCION_TER'] + "]").attr("selected",true);
                $("#hi_PLACENTA_PRE_TER option[value=" + data['hi_PLACENTA_PRE_TER'] + "]").attr("selected",true);
                $("#hi_ABRUPTIO_TER option[value=" + data['hi_ABRUPTIO_TER'] + "]").attr("selected",true);
                $("#hi_PRECLAMPSIAECLA_TER option[value=" + data['hi_PRECLAMPSIAECLA_TER'] + "]").attr("selected",true);
                $("#hi_HERPES_TER option[value=" + data['hi_HERPES_TER'] + "]").attr("selected",true);
                $("#hi_CONDILOMATOSIS_TER option[value=" + data['hi_CONDILOMATOSIS_TER'] + "]").attr("selected",true);
                $("#hi_OTRAS_ENF_TER option[value=" + data['hi_OTRAS_ENF_TER'] + "]").attr("selected",true);
                $("#hi_MUERTE_FET_TER option[value=" + data['hi_MUERTE_FET_TER'] + "]").attr("selected",true);
                $("#hi_MADRE_EXA_TER option[value=" + data['hi_MADRE_EXA_TER'] + "]").attr("selected",true);
                $("#hi_DIABETES_TER option[value=" + data['hi_DIABETES_TER'] + "]").attr("selected",true);
                $("#hi_VIH_TER option[value=" + data['hi_VIH_TER'] + "]").attr("selected",true);
                $("#hi_OTRAS_TER option[value=" + data['hi_OTRAS_TER'] + "]").attr("selected",true);
                $("#hi_EXTRA_MANU_PLACEN_TER option[value=" + data['hi_EXTRA_MANU_PLACEN_TER'] + "]").attr("selected",true);
                $("#hi_PLACENTA_COMPLETA_TER option[value=" + data['hi_PLACENTA_COMPLETA_TER'] + "]").attr("selected",true);
                $("#hi_HIPOTOMIA_UTERINA_TER option[value=" + data['hi_HIPOTOMIA_UTERINA_TER'] + "]").attr("selected",true);
                $("#hi_MUERTE_FETAL2_TER option[value=" + data['hi_MUERTE_FETAL2_TER'] + "]").attr("selected",true);
                $("#hi_PARTO_DESCONO_TER option[value=" + data['hi_PARTO_DESCONO_TER'] + "]").attr("selected",true);                
                //*********************************************************************//      
                //*****************************MEDICAMENTOS****************************//
                hi_ID_MED = data['hi_ID_MED'];
                $("#hi_ANESTESIA_LO_MED option[value=" + data['hi_ANESTESIA_LO_MED'] + "]").attr("selected",true);
                $("#hi_ANESTESIA_RE_MED option[value=" + data['hi_ANESTESIA_RE_MED'] + "]").attr("selected",true);
                $("#hi_ANESTESIA_GE_MED option[value=" + data['hi_ANESTESIA_GE_MED'] + "]").attr("selected",true);
                $("#hi_TRANQUIZANTE_MED option[value=" + data['hi_TRANQUIZANTE_MED'] + "]").attr("selected",true);
                $("#hi_OXITOCINA_MED option[value=" + data['hi_OXITOCINA_MED'] + "]").attr("selected",true);
                $("#hi_ANTIBIOTICO_MED option[value=" + data['hi_ANTIBIOTICO_MED'] + "]").attr("selected",true);
                $("#hi_ANALGESICO_MED option[value=" + data['hi_ANALGESICO_MED'] + "]").attr("selected",true);
                $("#hi_OTRAH_MED option[value=" + data['hi_OTRAH_MED'] + "]").attr("selected",true);
                $("#hi_NINGUNA_MED option[value=" + data['hi_NINGUNA_MED'] + "]").attr("selected",true);                
                //*********************************************************************//    
                //*****************************INSTITUCIÓN*****************************//
                hi_ID_INS = data['hi_ID_INS'];
                $('#hi_INSTITU_INS').val(data['hi_INSTITU_INS']);
                $("#hi_NIVEL_INS option[value=" + data['hi_NIVEL_INS'] + "]").attr("selected",true);
                $("#hi_ATENDIOPAR_INS option[value=" + data['hi_ATENDIOPAR_INS'] + "]").attr("selected",true);
                $("#hi_ATENDIONEO_INS option[value=" + data['hi_ATENDIONEO_INS'] + "]").attr("selected",true);                
                //*********************************************************************//  
                //*****************************REMISIÓN********************************//
                hi_ID_RECNAC = data['hi_ID_RECNAC'];
                $('#hi_HISTORIA_RECNAC').val(data['hi_HISTORIA_RECNAC']);
                $('#hi_NOMBRE1_RECNAC').val(data['hi_NOMBRE1_RECNAC']);
                $('#hi_NOMBRE2_RECNAC').val(data['hi_NOMBRE2_RECNAC']);
                $('#hi_NOMBRE3_RECNAC').val(data['hi_NOMBRE3_RECNAC']);
                $("#hi_NECREMI_RECNAC option[value=" + data['hi_NECREMI_RECNAC'] + "]").attr("selected",true);
                $('#hi_INSTITU_RECNAC').val(data['hi_INSTITU_RECNAC']);               
                //*********************************************************************//  
                //**********************MOVIMIENTO DE REMISIÓN*************************//
                hi_ID_MOVREM = data['hi_ID_MOVREM'];
                $("#hi_RIESGO_MOVREM option[value=" + data['hi_RIESGO_MOVREM'] + "]").attr("selected",true);
                $("#hi_CESAREA_MOVREM option[value=" + data['hi_CESAREA_MOVREM'] + "]").attr("selected",true);
                $("#hi_PARTO_MOVREM option[value=" + data['hi_PARTO_MOVREM'] + "]").attr("selected",true);
                $("#hi_PATOLOGIA_MOVREM option[value=" + data['hi_PATOLOGIA_MOVREM'] + "]").attr("selected",true);
                $("#hi_DESPROPORCION_MOVREM option[value=" + data['hi_DESPROPORCION_MOVREM'] + "]").attr("selected",true);
                $("#hi_DISTOCIA_MOVREM option[value=" + data['hi_DISTOCIA_MOVREM'] + "]").attr("selected",true);
                $("#hi_TRABAJO_MOVREM option[value=" + data['hi_TRABAJO_MOVREM'] + "]").attr("selected",true);
                $("#hi_INDUCCION_MOVREM option[value=" + data['hi_INDUCCION_MOVREM'] + "]").attr("selected",true);
                $("#hi_SUFRIMIENTO_MOVREM option[value=" + data['hi_SUFRIMIENTO_MOVREM'] + "]").attr("selected",true);
                $("#hi_RUPTURA_MOVREM option[value=" + data['hi_RUPTURA_MOVREM'] + "]").attr("selected",true);
                $("#hi_HEMORRAGIA_MOVREM option[value=" + data['hi_HEMORRAGIA_MOVREM'] + "]").attr("selected",true);
                $("#hi_OTROS_MOVREM option[value=" + data['hi_OTROS_MOVREM'] + "]").attr("selected",true);                
                //*********************************************************************//  
                //**********************EVOLUCION*************************//
                cuan=0;
                var tamanio= data.tamanio;
                var i;
                $("#hi_SERVICIO_EVOLUCION option[value=" + data['hi_SERVICIO_EVOLUCION1'] + "]").attr("selected",true);    
                $('#hi_SALA_EVOLUCION').val(data['hi_SALA_EVOLUCION1']);
                $('#hi_N_CAMA_EVOLUCION').val(data['hi_N_CAMA_EVOLUCION1']);
                for(i=1;i<=tamanio;i++){    
                    vector1[i]=data['hi_ID_EVOLUCION'+i];
                    $.agrediag1(data['hi_FECHA_EVOLUCION'+i],data['hi_HORA_EVOLUCION'+i],data['hi_DX_EVOLUCION'+i],i);        
                }                 
                $('#btn_add3').css('display','inline-block');   
                $('#otro-id3').attr('id','abrir_vendiagnostico');
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
            auxiliar: "MATERNO"
        }
        $.enviar3("POST","../mostrar_materno_per",datos,'#zona_materno2','#area_fecha','#tablafecha');                             
    });   
    
    $('#btn_mod').live('click', function(){        
       setTimeout(function(){
           //////////////////////VALIDAR CAMPOS////////////////////////////////////////
           resul=$.validatxt('#txtdoc','Por Favor Seleccione El Paciente..');
           if(resul=="1"){return;}
           resul=$.validatxt('#txtfinicial','Por Seleccione La Fecha De La Historia..');
           if(resul=="1"){return;}
           datos="";
           //****************************TABLA MATERNO PERINATAL**********************************//
           datos+="opcion=modificar&hi_FECHA_MAT_PER="+$('#txtfinicial').val()+"&hi_ESTADO_MAT_PER=ACTIVO&id_paciente="+id_paciente+"&ident_paciente="+ident_paciente;
           //****************************TABLA ANTECEDENTES FAMILIARES****************************//
           datos+="&hi_HTA_CRONICA_ANTFAM=" + $('#combohta1').val() +"&hi_PREECLAMPSIA1_ANTFAM=" +$('#combopree1').val()+"&hi_DIABETES1_ANTFAM=" +$('#combodiab1').val();
           datos+="&hi_ECLAMPSIA1_ANTFAM="+$('#comboecla1').val()+"&hi_GEMELARES_ANTFAM=" +$('#combogeme').val()+"&hi_CARDIOPATIA_ANTFAM="+ $('#combocardiopa').val();
           datos+="&hi_TBC_ANTFAM=" +$('#combotbc').val()+"&hi_METABOLICOS_ANTFAM=" +$('#combometab').val()+"&hi_AUTOINMUNES_ANTFAM="+$('#comboautoi').val();
           datos+="&hi_INFECCIOSAS_ANTFAM=" +$('#comboinfe').val()+"&hi_CONGENITAS_ANTFAM="+$('#comboconge').val()+"&hi_NEOPLASIAS_ANTFAM="+ $('#comboneopla').val();
           datos+="&hi_EPILEPSIA_ANTFAM="+ $('#comboepile').val()+"&hi_OTROS1_ANTFAM="+ $('#combootros1').val()+"&hi_CUAL1_ANTFAM="+ $('#txtcual1').val();
           //*************************************************************************************//
           //****************************TABLA ANTECEDENTES PERSONALES****************************//
           datos+="&hi_TUBERCULOSIS_ANTPER="+ $('#combotuber').val()+"&hi_DIABETES2_ANTPER="+ $('#combodiab2').val()+"&hi_DIABETES_GES_ANTPER="+ $('#combodiabges').val()+"&hi_HTA_CRONICA2_ANTPER="+ $('#combohta2').val();
           datos+="&hi_CIRUGIAPELUTE_ANTPER="+ $('#combocirupel').val()+"&hi_PREECLAMPSIA2_ANTPER="+ $('#combopree2').val()+"&hi_ECLAMPSIA2_ANTPER="+ $('#comboecla2').val()+"&hi_ALERGICOS_ANTPER="+ $('#comboalerg').val();
           datos+="&hi_TABAQUISMO_ANTPER="+ $('#combotaba').val()+"&hi_ALCOHOLISMO_ANTPER="+ $('#comboalco').val()+"&hi_ANTITETANICA_ANTPER="+ $('#comboantite').val()+"&hi_MMR_ANTPER="+ $('#combommr').val();
           datos+="&hi_ENFERMEDAD_MEN_ANTPER="+ $('#comboenferme').val()+"&hi_ACTIVIDAD_FIS_ANTPER="+ $('#comboactifis').val()+"&hi_VICTIMA_MAL_ANTPER="+ $('#combovicti').val()+"&hi_OTROS2_ANTPER="+ $('#combootros2').val();
           datos+="&hi_CUAL2_ANTPER="+ $('#txtcual2').val();
           //*************************************************************************************//
           //****************************TABLA ANTECEDENTES GINECOLOGICOS****************************//
           datos+="&hi_MENARQUIA_ANTGIN="+ $('#txtmenar').val()+"&hi_G_ANTGIN="+ $('#txtg').val()+"&hi_P_ANTGIN="+ $('#txtp').val()+"&hi_C_ANTGIN="+ $('#txtc').val()+"&hi_A_ANTGIN="+ $('#txta').val();
           datos+="&hi_E_ANTGIN="+ $('#txte').val()+"&hi_V_ANTGIN="+ $('#txtv').val()+"&hi_M_ANTGIN="+ $('#txtm').val()+"&hi_CICLOS_ANTGIN="+ $('#combociclos').val()+"&hi_PLANIFICACION_FAM_ANTGIN="+ $('#comboplanif').val();
           datos+="&hi_FLUJO_VAG_ANTGIN="+ $('#comboflujov').val()+"&hi_ITS_ANTGIN="+ $('#comboits').val()+"&hi_CITOLOGIA_ULT_ANTGIN="+ $('#combocitol').val()+"&hi_COLCOPSCOPIA_ANTGIN="+ $('#combocolcops').val()+"&hi_PERIODO_INTER_ANTGIN="+ $('#txtperiointer').val();
           datos+="&hi_INFERTILIDAD_ANTGIN="+ $('#comboinfert').val()+"&hi_TTOS_INFER_ANTGIN="+ $('#combottos').val()+"&hi_RPM_ANTGIN="+ $('#comborpm').val()+"&hi_RCIU_ANTGIN="+ $('#comborciu').val()+"&hi_APP_ANTGIN="+ $('#comboapp').val();
           datos+="&hi_PARTO_PREM_ANTGIN="+ $('#combopartopre').val()+"&hi_GEMELAR_ANTGIN="+ $('#combogemelar').val()+"&hi_MALFORMACIONES_ANTGIN="+ $('#combomalform').val()+"&hi_POLIHIDRAMNIOS_ANTGIN="+ $('#combopolihri').val()+"&hi_OLIGOHIDRAMNIOS_ANTGIN="+ $('#combooligohri').val();
           datos+="&hi_EMB_PROLONGADO_ANTGIN="+ $('#comboembprolo').val()+"&hi_AMENAZA_ABO_ANTGIN="+ $('#comboameabort').val()+"&hi_OTROS3_ANTGIN="+ $('#combootros3').val()+"&hi_CUAL3_ANTGIN="+ $('#txtcual3').val()+"&hi_CUALITS_ANTGIN="+$('#hi_CUALITS_ANTGIN').val();
           //****************************TABLA HISTORIA REPRODUCTIVA****************************//
           hi_ABORTO_HABIT_HISREP=$('#chehabit').val();
           hi_RETENCION_PLA_HISREP=$('#cheretpla').val();
           hi_REC_NACIDO1_HISREP=$('#cherecnacmay').val();
           hi_REC_NACIDO2_HISREP=$('#cherecnac').val();
           hi_HTA_INDUCIDO_HISREP=$('#chehtaindu').val();
           hi_EMB_GEMEL_CES_HISREP=$('#cheembgemel').val();
           hi_MORTINATO_HISREP=$('#chemorti').val();
           hi_TP_PROLON_HISREP=$('#chetpprolon').val();
           datos+="&hi_EDAD_HISREP="+ $('#comboedad').val()+"&hi_PARIDAD_HISREP="+ $('#comboparidad').val()+"&hi_ABORTO_HABIT_HISREP="+ hi_ABORTO_HABIT_HISREP+"&hi_RETENCION_PLA_HISREP="+ hi_RETENCION_PLA_HISREP+"&hi_REC_NACIDO1_HISREP="+ hi_REC_NACIDO1_HISREP;
           datos+="&hi_REC_NACIDO2_HISREP="+ hi_REC_NACIDO2_HISREP+"&hi_HTA_INDUCIDO_HISREP="+ hi_HTA_INDUCIDO_HISREP+"&hi_EMB_GEMEL_CES_HISREP="+ hi_EMB_GEMEL_CES_HISREP+"&hi_MORTINATO_HISREP="+ hi_MORTINATO_HISREP+"&hi_TP_PROLON_HISREP="+ hi_TP_PROLON_HISREP;           
           //*************************************************************************************//
           //****************************TABLA CONDICIONES ASOCIADAS****************************//
           datos+="&hi_QX_GINECOLOGIAS1_CONASO="+ $('#comboqxgines1').val()+"&hi_ENF_RENS1_CONASO="+ $('#comborenalcros1').val()+"&hi_DIABETES_GESS1_CONASO="+ $('#combodiabges1').val()+"&hi_DIABETES_MELLIS1_CONASO="+ $('#combodiabmells1').val()+"&hi_ENF_CARDIACAS1_CONASO="+ $('#comboenfcardis1').val();
           datos+="&hi_ENF_INFAGUDAS1_CONASO="+ $('#comboenfinfes1').val()+"&hi_ENF_AUTOINMUNES1_CONASO="+ $('#comboenfautoins1').val()+"&hi_ANEMIA_HBS1_CONASO="+ $('#comboanemias1').val()+"&hi_QX_GINECOLOGIAS2_CONASO="+ $('#comboqxgines2').val()+"&hi_ENF_RENS2_CONASO="+ $('#comborenalcros2').val();
           datos+="&hi_DIABETES_GESS2_CONASO="+ $('#combodiabges2').val()+"&hi_DIABETES_MELLIS2_CONASO="+ $('#combodiabmells2').val()+"&hi_ENF_CARDIACAS2_CONASO="+ $('#comboenfcardis2').val()+"&hi_ENF_INFAGUDAS2_CONASO="+ $('#comboenfinfes2').val()+"&hi_ENF_AUTOINMUNES2_CONASO="+ $('#comboenfautoins2').val();
           datos+="&hi_ANEMIA_HBS2_CONASO="+ $('#comboanemias2').val()+"&hi_QX_GINECOLOGIAS3_CONASO="+ $('#comboqxgines3').val()+"&hi_ENF_RENS3_CONASO="+ $('#comborenalcros3').val()+"&hi_DIABETES_GESS3_CONASO="+ $('#combodiabges3').val()+"&hi_DIABETES_MELLIS3_CONASO="+ $('#combodiabmells3').val();
           datos+="&hi_ENF_CARDIACAS3_CONASO="+ $('#comboenfcardis3').val()+"&hi_ENF_INFAGUDAS3_CONASO="+ $('#comboenfinfes3').val()+"&hi_ENF_AUTOINMUNES3_CONASO="+ $('#comboenfautoins3').val()+"&hi_ANEMIA_HBS3_CONASO="+ $('#comboanemias3').val();
           //*************************************************************************************//
           //****************************TABLA EMBARAZO ACTUAL************************************//
           datos+="&hi_HEMORRAGIAS1_MAL_EMBACT="+ $('#combohemomens1').val()+"&hi_VAGINAS1_MAL_EMBACT="+ $('#combovaginas1').val()+"&hi_E_PROLONGADOS1_MAL_EMBACT="+ $('#comboeprolongas1').val()+"&hi_HTAS1_MAL_EMBACT="+ $('#combohtas1').val()+"&hi_RPMS1_MAL_EMBACT="+ $('#comborpms1').val();
           datos+="&hi_POLIHRIDAMNIOSS1_MAL_EMBACT="+ $('#combopolihis1').val()+"&hi_RCIUS1_MAL_EMBACT="+ $('#comborcius1').val()+"&hi_EMB_MULTIPLES1_MAL_EMBACT="+ $('#comboembmultiples1').val()+"&hi_MALA_PRESENTS1_MAL_EMBACT="+ $('#combomalapres1').val()+"&hi_ISOS1_MAL_EMBACT="+ $('#comboisos1').val();
           datos+="&hi_HEMORRAGIAS2_MAL_EMBACT="+ $('#combohemomens2').val()+"&hi_VAGINAS2_MAL_EMBACT="+ $('#combovaginas2').val()+"&hi_E_PROLONGADOS2_MAL_EMBACT="+ $('#comboeprolongas2').val()+"&hi_HTAS2_MAL_EMBACT="+ $('#combohtas2').val()+"&hi_RPMS2_MAL_EMBACT="+ $('#comborpms2').val();
           datos+="&hi_POLIHRIDAMNIOSS2_MAL_EMBACT="+ $('#combopolihis2').val()+"&hi_RCIUS2_MAL_EMBACT="+ $('#comborcius2').val()+"&hi_EMB_MULTIPLES2_MAL_EMBACT="+ $('#comboembmultiples2').val()+"&hi_MALA_PRESENTS2_MAL_EMBACT="+ $('#combomalapres2').val()+"&hi_ISOS2_MAL_EMBACT="+ $('#comboisos2').val();
           datos+="&hi_HEMORRAGIAS3_MAL_EMBACT="+ $('#combohemomens3').val()+"&hi_VAGINAS3_MAL_EMBACT="+ $('#combovaginas3').val()+"&hi_E_PROLONGADOS3_MAL_EMBACT="+ $('#comboeprolongas3').val()+"&hi_HTAS3_MAL_EMBACT="+ $('#combohtas3').val()+"&hi_RPMS3_MAL_EMBACT="+ $('#comborpms3').val();
           datos+="&hi_POLIHRIDAMNIOSS3_MAL_EMBACT="+ $('#combopolihis3').val()+"&hi_RCIUS3_MAL_EMBACT="+ $('#comborcius3').val()+"&hi_EMB_MULTIPLES3_MAL_EMBACT="+ $('#comboembmultiples3').val()+"&hi_MALA_PRESENTS3_MAL_EMBACT="+ $('#combomalapres3').val()+"&hi_ISOS3_MAL_EMBACT="+ $('#comboisos3').val()+"&hi_INMUNIZACION_RH_MAL_EMBACT="+ $('#txtinmunizarh').val();          
           //*************************************************************************************//
           //****************************TABLA RIESGO PSICOSOCIAL************************************//
           datos+="&hi_TENSION_EMO_RIEPSI="+ $('#combotensionemo').val()+"&hi_HUMOR_DEPRE_RIEPSI="+ $('#combohumordepre').val()+"&hi_SINT_NEURO_RIEPSI="+ $('#comboneurovege').val()+"&hi_SOP_FAM_TIEM_RIEPSI="+ $('#comboeltiempo').val()+"&hi_SOP_FAM_ESPA_RIEPSI="+ $('#comboelespacio').val();
           datos+="&hi_SOP_FAM_DIN_RIEPSI="+ $('#comboeldinero').val()+"&hi_ES_VICTIMA_MAL_RIEPSI="+ $('#combovictimama').val()+"&hi_CUAL4_RIEPSI="+ $('#txtcual4').val()+"&hi_PARENTESCO_MAL_RIEPSI="+ $('#txtparentesco').val();
           //*************************************************************************************//
           //****************************TABLA RIESGO BIOPSICOSOCIAl************************************//
           datos+="&hi_TOTALS1_RIEBIO="+ $('#t1').val()+"&hi_TOTALS2_RIEBIO="+ $('#t2').val()+"&hi_TOTALS3_RIEBIO="+ $('#t3').val();           
           //*******************************************************************************************//
           //****************************TABLA EXAMENES GLICEMIA***********************************************//
           datos+="&hi_GLICEMIA_AYU_EXAGLI="+ $('#txtgliceayu').val()+"&hi_2GLICEMIA_EXAGLI="+ $('#txt2glicemia').val()+"&hi_FECHA_REALIZA_EXAGLI="+ $('#txtfrealiza').val()+"&hi_GRUPO_EXAGLI="+ $('#comgrupo').val()+"&hi_RH_EXAGLI="+ $('#comrh').val();
           //*******************************************************************************************//
           //****************************TABLA EXAMENES CTGO***********************************************//
           datos+="&hi_CTGO_EXACTGO="+ $('#txtctgo').val()+"&hi_GLICEMIA_PRIMERA_EXACTGO="+ $('#comgliceexa1').val()+"&hi_FECHA_GLICE_PRI_EXACTGO="+ $('#txtfgliceexa1').val()+"&hi_GLICEMIA_SEGUNDA_EXACTGO="+ $('#comgliceexa2').val()+"&hi_FECHA_GLICE_SEG_EXACTGO="+ $('#txtfgliceexa2').val()+"&hi_CURVA_GLICE_EXACTGO="+ $('#comcurvaglice').val();
           //*******************************************************************************************//
           //****************************TABLA PARACLINICOS 1***********************************************//
           datos+="&hi_HBANT_PARA="+ $('#hi_HBANT_PARA').val()+"&hi_HCTOANT_PARA="+ $('#hi_HCTOANT_PARA').val()+"&hi_VDRLANT_PARA="+ $('#hi_VDRLANT_PARA').val()+"&hi_FROTIS_VAGANT_PARA="+ $('#hi_FROTIS_VAGANT_PARA').val()+"&hi_PARCIALANT_PARA="+ $('#hi_PARCIALANT_PARA').val();
           datos+="&hi_GRAMORINAANT_PARA="+ $('#hi_GRAMORINAANT_PARA').val()+"&hi_BACTANT_PARA="+ $('#hi_BACTANT_PARA').val()+"&hi_HB1TRI_PARA="+ $('#hi_HB1TRI_PARA').val()+"&hi_HCTO1TRI_PARA="+ $('#hi_HCTO1TRI_PARA').val()+"&hi_VDRL1TRI_PARA="+ $('#hi_VDRL1TRI_PARA').val();
           datos+="&hi_FROTIS_VAG1TRI_PARA="+ $('#hi_FROTIS_VAG1TRI_PARA').val()+"&hi_PARCIAL1TRI_PARA="+ $('#hi_PARCIAL1TRI_PARA').val()+"&hi_GRAMORINA1TRI_PARA="+ $('#hi_GRAMORINA1TRI_PARA').val()+"&hi_BACT1TRI_PARA="+ $('#hi_BACT1TRI_PARA').val()+"&hi_HB2TRI_PARA="+ $('#hi_HB2TRI_PARA').val();
           datos+="&hi_HCTO2TRI_PARA="+ $('#hi_HCTO2TRI_PARA').val()+"&hi_VDRL2TRI_PARA="+ $('#hi_VDRL2TRI_PARA').val()+"&hi_FROTIS_VAG2TRI_PARA="+ $('#hi_FROTIS_VAG2TRI_PARA').val()+"&hi_PARCIAL2TRI_PARA="+ $('#hi_PARCIAL2TRI_PARA').val()+"&hi_GRAMORINA2TRI_PARA="+ $('#hi_GRAMORINA2TRI_PARA').val();
           datos+="&hi_BACT2TRI_PARA="+ $('#hi_BACT2TRI_PARA').val()+"&hi_HB3TRI_PARA="+ $('#hi_HB3TRI_PARA').val()+"&hi_HCTO3TRI_PARA="+ $('#hi_HCTO3TRI_PARA').val()+"&hi_VDRL3TRI_PARA="+ $('#hi_VDRL3TRI_PARA').val()+"&hi_FROTIS_VAG3TRI_PARA="+ $('#hi_FROTIS_VAG3TRI_PARA').val();
           datos+="&hi_PARCIAL3TRI_PARA="+ $('#hi_PARCIAL3TRI_PARA').val()+"&hi_GRAMORINA3TRI_PARA="+ $('#hi_GRAMORINA3TRI_PARA').val()+"&hi_BACT3TRI_PARA="+ $('#hi_BACT3TRI_PARA').val();
           //*******************************************************************************************//
           //****************************TABLA PARACLINICOS 2***********************************************//
           datos+="&hi_UROCULTIVOANT_PARA2="+ $('#hi_UROCULTIVOANT_PARA2').val()+"&hi_FTAABSANT_PARA2="+ $('#hi_FTAABSANT_PARA2').val()+"&hi_HEPATITISBANT_PARA2="+ $('#hi_HEPATITISBANT_PARA2').val()+"&hi_ANTITETANICAANT_PARA2="+ $('#hi_ANTITETANICAANT_PARA2').val()+"&hi_HIVANT_PARA2="+ $('#hi_HIVANT_PARA2').val()+"&hi_CITOLOGIA_CERANT_PARA2="+ $('#hi_CITOLOGIA_CERANT_PARA2').val();
           datos+="&hi_UROCULTIVO1TRI_PARA2="+ $('#hi_UROCULTIVO1TRI_PARA2').val()+"&hi_FTAABS1TRI_PARA2="+ $('#hi_FTAABS1TRI_PARA2').val()+"&hi_HEPATITISB1TRI_PARA2="+ $('#hi_HEPATITISB1TRI_PARA2').val()+"&hi_ANTITETANICA1TRI_PARA2="+ $('#hi_ANTITETANICA1TRI_PARA2').val()+"&hi_HIV1TRI_PARA2="+ $('#hi_HIV1TRI_PARA2').val()+"&hi_CITOLOGIA_CER1TRI_PARA2="+ $('#hi_CITOLOGIA_CER1TRI_PARA2').val();
           datos+="&hi_UROCULTIVO2TRI_PARA2="+ $('#hi_UROCULTIVO2TRI_PARA2').val()+"&hi_FTAABS2TRI_PARA2="+ $('#hi_FTAABS2TRI_PARA2').val()+"&hi_HEPATITISB2TRI_PARA2="+ $('#hi_HEPATITISB2TRI_PARA2').val()+"&hi_ANTITETANICA2TRI_PARA2="+ $('#hi_ANTITETANICA2TRI_PARA2').val()+"&hi_HIV2TRI_PARA2="+ $('#hi_HIV2TRI_PARA2').val()+"&hi_CITOLOGIA_CER2TRI_PARA2="+ $('#hi_CITOLOGIA_CER2TRI_PARA2').val();
           datos+="&hi_UROCULTIVO3TRI_PARA2="+ $('#hi_UROCULTIVO3TRI_PARA2').val()+"&hi_FTAABS3TRI_PARA2="+ $('#hi_FTAABS3TRI_PARA2').val()+"&hi_HEPATITISB3TRI_PARA2="+ $('#hi_HEPATITISB3TRI_PARA2').val()+"&hi_ANTITETANICA3TRI_PARA2="+ $('#hi_ANTITETANICA3TRI_PARA2').val()+"&hi_HIV3TRI_PARA2="+ $('#hi_HIV3TRI_PARA2').val()+"&hi_CITOLOGIA_CER3TRI_PARA2="+ $('#hi_CITOLOGIA_CER3TRI_PARA2').val();           
           //*******************************************************************************************//
           //****************************TABLA O SULLIVAN***********************************************//           
           datos+="&hi_GLISEMIA_PRE_SULLI="+ $('#hi_GLISEMIA_PRE_SULLI').val()+"&hi_GLICEMIA_POST_SULLI="+ $('#hi_GLICEMIA_POST_SULLI').val()+"&hi_FECHA_RESULTADO_SULLI="+ $('#hi_FECHA_RESULTADO_SULLI').val()+"&hi_S16_SULLI="+ $('#hi_S16_SULLI').val()+"&hi_S20_SULLI="+ $('#hi_S20_SULLI').val();
           datos+="&hi_S24_SULLI="+ $('#hi_S24_SULLI').val()+"&hi_S28_SULLI="+ $('#hi_S28_SULLI').val()+"&hi_S32_SULLI="+ $('#hi_S32_SULLI').val()+"&hi_S36_SULLI="+ $('#hi_S36_SULLI').val()+"&hi_FECHAS16_SULLI="+ $('#hi_FECHAS16_SULLI').val();
           datos+="&hi_FECHAS20_SULLI="+ $('#hi_FECHAS20_SULLI').val()+"&hi_FECHAS24_SULLI="+ $('#hi_FECHAS24_SULLI').val()+"&hi_FECHAS28_SULLI="+ $('#hi_FECHAS28_SULLI').val()+"&hi_FECHAS32_SULLI="+ $('#hi_FECHAS32_SULLI').val()+"&hi_FECHAS36_SULLI="+ $('#hi_FECHAS36_SULLI').val()+"&hi_ROLLOVERTEXT_SULLI="+ $('#hi_ROLLOVERTEXT_SULLI').val();
           //*******************************************************************************************//
           //****************************TABLA ECO***********************************************// 
           hi_NORMA2TRI_ECO=$('#hi_NORMA2TRI_ECO').val();
           hi_POLIHRIDAMNIOS2TRI_ECO=$('#hi_POLIHRIDAMNIOS2TRI_ECO').val();
           hi_RCIU2TRI_ECO=$('#hi_RCIU2TRI_ECO').val();
           hi_OLIGOHIDRAMNIOS2TRI_ECO=$('#hi_OLIGOHIDRAMNIOS2TRI_ECO').val();
           hi_MACROSOMIA2TRI_ECO=$('#hi_MACROSOMIA2TRI_ECO').val();
           hi_MALFORMACION2TRI_ECO=$('#hi_MALFORMACION2TRI_ECO').val();
           hi_NORMA3TRI_ECO=$('#hi_NORMA3TRI_ECO').val();
           hi_POLIHRIDAMNIOS3TRI_ECO=$('#hi_POLIHRIDAMNIOS3TRI_ECO').val();
           hi_RCIU3TRI_ECO=$('#hi_RCIU3TRI_ECO').val();
           hi_OLIGOHIDRAMNIOS3TRI_ECO=$('#hi_OLIGOHIDRAMNIOS3TRI_ECO').val();
           hi_MACROSOMIA3TRI_ECO=$('#hi_MACROSOMIA3TRI_ECO').val();
           hi_MALFORMACION3TRI_ECO=$('#hi_MALFORMACION3TRI_ECO').val();
           
           datos+="&hi_EDAD_GEST1C_ECO="+ $('#hi_EDAD_GEST1C_ECO').val()+"&hi_GESTACIONALAMENO1C_ECO="+ $('#hi_GESTACIONALAMENO1C_ECO').val()+"&hi_PRESENCIA_HEMA1C_ECO="+ $('#hi_PRESENCIA_HEMA1C_ECO').val()+"&hi_OTROS_MARCADORES1C_ECO="+ $('#hi_OTROS_MARCADORES1C_ECO').val()+"&hi_SONOLUCENCIAS1C_ECO="+ $('#hi_SONOLUCENCIAS1C_ECO').val();
           datos+="&hi_OBSERVACIONES1C_ECO="+ $('#hi_OBSERVACIONES1C_ECO').val()+"&hi_EDAD_GEST1TRI_ECO="+ $('#hi_EDAD_GEST1TRI_ECO').val()+"&hi_GESTACIONALAMENO1TRI_ECO="+ $('#hi_GESTACIONALAMENO1TRI_ECO').val()+"&hi_PRESENCIA_HEMA1TRI_ECO="+ $('#hi_PRESENCIA_HEMA1TRI_ECO').val()+"&hi_OTROS_MARCADORES1TRI_ECO="+ $('#hi_OTROS_MARCADORES1TRI_ECO').val();
           datos+="&hi_SONOLUCENCIAS1TRI_ECO="+ $('#hi_SONOLUCENCIAS1TRI_ECO').val()+"&hi_OBSERVACIONES1TRI_ECO="+ $('#hi_OBSERVACIONES1TRI_ECO').val()+"&hi_NORMA2TRI_ECO="+ hi_NORMA2TRI_ECO+"&hi_POLIHRIDAMNIOS2TRI_ECO="+ hi_POLIHRIDAMNIOS2TRI_ECO+"&hi_RCIU2TRI_ECO="+ hi_RCIU2TRI_ECO;
           datos+="&hi_OLIGOHIDRAMNIOS2TRI_ECO="+hi_OLIGOHIDRAMNIOS2TRI_ECO+"&hi_MACROSOMIA2TRI_ECO="+hi_MACROSOMIA2TRI_ECO+"&hi_MALFORMACION2TRI_ECO="+ hi_MALFORMACION2TRI_ECO+"&hi_OTRAS_ANO2TRI_ECO="+ $('#hi_OTRAS_ANO2TRI_ECO').val()+"&hi_OBSERVA2TRI_ECO="+ $('#hi_OBSERVA2TRI_ECO').val();
           datos+="&hi_NORMA3TRI_ECO="+hi_NORMA3TRI_ECO+"&hi_POLIHRIDAMNIOS3TRI_ECO="+ hi_POLIHRIDAMNIOS3TRI_ECO+"&hi_RCIU3TRI_ECO="+hi_RCIU3TRI_ECO+"&hi_OLIGOHIDRAMNIOS3TRI_ECO="+hi_OLIGOHIDRAMNIOS3TRI_ECO+"&hi_MACROSOMIA3TRI_ECO="+hi_MACROSOMIA3TRI_ECO;
           datos+="&hi_MALFORMACION3TRI_ECO="+hi_MALFORMACION3TRI_ECO+"&hi_OTRAS_ANO3TRI_ECO="+ $('#hi_OTRAS_ANO3TRI_ECO').val()+"&hi_OBSERVA3TRI_ECO="+ $('#hi_OBSERVA3TRI_ECO').val();           
           //*******************************************************************************************//           
           //****************************TABLA CONTROL PRENATAL***********************************************// 
           var k=1,j=0,p=1;j;              
           $("#detalle").find(':input').each(function (index) {                
               var id = $(this).attr("id");
               var valor = $(this).val(); 
               if(j==0){datos+="&"+id+p+"="+ valor;}
               if(j==1){datos+="&"+id+p+"="+ valor;}               
               if(j==2){datos+="&"+id+p+"="+ valor;}            
               if(j==3){datos+="&"+id+p+"="+ valor;}                                    
               if(j==4){datos+="&"+id+p+"="+ valor;}      
               if(j==5){datos+="&"+id+p+"="+ valor;}      
               if(j==6){datos+="&"+id+p+"="+ valor;}      
               if(j==7){datos+="&"+id+p+"="+ valor;}      
               if(j==8){datos+="&"+id+p+"="+ valor;}      
               if(j==9){datos+="&"+id+p+"="+ valor;}      
               if(j==10){datos+="&"+id+p+"="+ valor;}      
               if(j==11){datos+="&"+id+p+"="+ valor;}      
               if(j==12){datos+="&"+id+p+"="+ valor;}      
               if(j==13){datos+="&"+id+p+"="+ valor;}      
               if(j==14){datos+="&"+id+p+"="+ valor;}      
               if(j==15){datos+="&"+id+p+"="+ valor;}                     
               k=k+1;j=j+1;               
               if(j==16){j=0;p=p+1;}
           });  
           f=1;
           for(i=1; i<vector.length;i++){
               if(vector[i]!=undefined){
                   datos+="&hi_ID_CON_PRE"+f+"="+ vector[i];
                   f=f+1;
               }
           }             
           tam=p-1;
           datos+="&tam="+tam;      
           
           //*******************************************************************************************//   
           //****************************TABLA MORBILIDADES TRAZADORAS***********************************************// 
           datos+="&hi_SIN_RIESGO_PREE="+ $('#hi_SIN_RIESGO_PREE').val()+"&hi_CON_RIESGO_SIN_PREE="+ $('#hi_CON_RIESGO_SIN_PREE').val()+"&hi_CON_RIESGO_UTI_PREE="+ $('#hi_CON_RIESGO_UTI_PREE').val();
           datos+="&hi_CON_RIESGO_BIO1_PREE="+ $('#hi_CON_RIESGO_BIO1_PREE').val()+"&hi_CON_RIESGO_BIO2_PREE="+ $('#hi_CON_RIESGO_BIO2_PREE').val()+"&hi_CON_RIESGO_CAL_PREE="+ $('#hi_CON_RIESGO_CAL_PREE').val()+"&hi_CON_RIESGO_NUTRI_PREE="+ $('#hi_CON_RIESGO_NUTRI_PREE').val();
           //*******************************************************************************************//   
           //****************************TABLA EXAMEN ***********************************************// 
           datos+="&hi_PARTO_PRESIN_EXAMEN="+ $('#hi_PARTO_PRESIN_EXAMEN').val()+"&hi_DIABETESSIN_EXAMEN="+ $('#hi_DIABETESSIN_EXAMEN').val()+"&hi_BAJOSIN_EXAMEN="+ $('#hi_BAJOSIN_EXAMEN').val()+"&hi_RIESGOSIN_EXAMEN="+ $('#hi_RIESGOSIN_EXAMEN').val()+"&hi_HPPSIN_EXAMEN="+ $('#hi_HPPSIN_EXAMEN').val();
           datos+="&hi_PARTO_PRECONSIN_EXAMEN="+ $('#hi_PARTO_PRECONSIN_EXAMEN').val()+"&hi_DIABETESCONSIN_EXAMEN="+ $('#hi_DIABETESCONSIN_EXAMEN').val()+"&hi_BAJOCONSIN_EXAMEN="+ $('#hi_BAJOCONSIN_EXAMEN').val()+"&hi_RIESGOCONSIN_EXAMEN="+ $('#hi_RIESGOCONSIN_EXAMEN').val()+"&hi_HPPCONSIN_EXAMEN="+ $('#hi_HPPCONSIN_EXAMEN').val();
           datos+="&hi_PARTO_PRECONTRA_EXAMEN="+ $('#hi_PARTO_PRECONTRA_EXAMEN').val()+"&hi_DIABETESCONTRA_EXAMEN="+ $('#hi_DIABETESCONTRA_EXAMEN').val()+"&hi_BAJOCONTRA_EXAMEN="+ $('#hi_BAJOCONTRA_EXAMEN').val()+"&hi_RIESGOCONTRA_EXAMEN="+ $('#hi_RIESGOCONTRA_EXAMEN').val()+"&hi_HPPCONTRA_EXAMEN="+ $('#hi_HPPCONTRA_EXAMEN').val();
           //*******************************************************************************************//   
           //****************************TABLA MORBILIDAD MATERNA ***********************************************// 
           datos+="&hi_NINGUNA_MOR_MAT="+ $('#hi_NINGUNA_MOR_MAT').val()+"&hi_ABRUPTIO_MOR_MAT="+ $('#hi_ABRUPTIO_MOR_MAT').val()+"&hi_AMENAZA_MOR_MAT="+ $('#hi_AMENAZA_MOR_MAT').val()+"&hi_ANEMIA_MOR_MAT="+ $('#hi_ANEMIA_MOR_MAT').val()+"&hi_ATONIA_MOR_MAT="+ $('#hi_ATONIA_MOR_MAT').val();
           datos+="&hi_CARDIOPATIA_MOR_MAT="+ $('#hi_CARDIOPATIA_MOR_MAT').val()+"&hi_CID_MOR_MAT="+ $('#hi_CID_MOR_MAT').val()+"&hi_DESGARROS_MOR_MAT="+ $('#hi_DESGARROS_MOR_MAT').val()+"&hi_DIABETES_GES_MOR_MAT="+ $('#hi_DIABETES_GES_MOR_MAT').val()+"&hi_DIABETES_MELLI_MOR_MAT="+ $('#hi_DIABETES_MELLI_MOR_MAT').val();
           datos+="&hi_ECLAMPSIA_MOR_MAT="+ $('#hi_ECLAMPSIA_MOR_MAT').val()+"&hi_PREECLAMPSIA_LEVE_MOR_MAT="+ $('#hi_PREECLAMPSIA_LEVE_MOR_MAT').val()+"&hi_PRECLAMPSIA_SEVERA_MOR_MAT="+ $('#hi_PRECLAMPSIA_SEVERA_MOR_MAT').val()+"&hi_PRECLAMPSIA_SEVERACON_MOR_MAT="+ $('#hi_PRECLAMPSIA_SEVERACON_MOR_MAT').val()+"&hi_HEPATITIS_MOR_MAT="+ $('#hi_HEPATITIS_MOR_MAT').val();
           datos+="&hi_HIPERTENCION_CRO_MOR_MAT="+ $('#hi_HIPERTENCION_CRO_MOR_MAT').val()+"&hi_HIPERTENCION_GES_MOR_MAT="+ $('#hi_HIPERTENCION_GES_MOR_MAT').val()+"&hi_INFECCION_MOR_MAT="+ $('#hi_INFECCION_MOR_MAT').val()+"&hi_MALARIA_MOR_MAT="+ $('#hi_MALARIA_MOR_MAT').val()+"&hi_PLACENTA_PRE_MOR_MAT="+ $('#hi_PLACENTA_PRE_MOR_MAT').val();
           datos+="&hi_PLACENTA_RETE_MOR_MAT="+ $('#hi_PLACENTA_RETE_MOR_MAT').val()+"&hi_RCIU_MOR_MAT="+ $('#hi_RCIU_MOR_MAT').val()+"&hi_RUPTURA_MOR_MAT="+ $('#hi_RUPTURA_MOR_MAT').val()+"&hi_SEPSIS_MOR_MAT="+ $('#hi_SEPSIS_MOR_MAT').val()+"&hi_SIFILIS_MOR_MAT="+ $('#hi_SIFILIS_MOR_MAT').val();
           datos+="&hi_TBC_MOR_MAT="+ $('#hi_TBC_MOR_MAT').val()+"&hi_HEMORRAGIA_DEL_MOR_MAT="+ $('#hi_HEMORRAGIA_DEL_MOR_MAT').val()+"&hi_HEMORRAGIA_POST_MOR_MAT="+ $('#hi_HEMORRAGIA_POST_MOR_MAT').val()+"&hi_EMBARAZO_MUL_MOR_MAT="+ $('#hi_EMBARAZO_MUL_MOR_MAT').val()+"&hi_TROMBOEMBOLISMO_MOR_MAT="+ $('#hi_TROMBOEMBOLISMO_MOR_MAT').val();
           datos+="&hi_VIH_MOR_MAT="+ $('#hi_VIH_MOR_MAT').val()+"&hi_OTRAS_MOR_MAT="+ $('#hi_OTRAS_MOR_MAT').val();           
           //*******************************************************************************************//   
           //****************************TABLA PROCEDENCIA ***********************************************// 
           datos+="&hi_DOMICILIO_PRO="+ $('#hi_DOMICILIO_PRO').val()+"&hi_HOGAR_PRO="+ $('#hi_HOGAR_PRO').val()+"&hi_PARTERA_PRO="+ $('#hi_PARTERA_PRO').val()+"&hi_IPS_PRO="+ $('#hi_IPS_PRO').val()+"&hi_OTRA_PRO="+ $('#hi_OTRA_PRO').val();
           //*******************************************************************************************//   
           //****************************TABLA PARTO ***********************************************// 
           hh=$('#thora1').val();
           if($('#thora2').val()==""){
               $('#thora2').val(hh);
           }
           datos+="&hi_EDAD_GES_PAR="+ $('#hi_EDAD_GES_PAR').val()+"&hi_TAMA_PAR="+ $('#hi_TAMA_PAR').val()+"&hi_INICIO_PAR="+ $('#hi_INICIO_PAR').val()+"&hi_MEMBRANA_PAR="+ $('#hi_MEMBRANA_PAR').val()+"&hi_FECHA_MEM_PAR="+ $('#hi_FECHA_MEM_PAR').val();
           datos+="&hi_HORA_MEM_PAR="+ $('#thora2').val()+"&hi_PRESENTACION_PAR="+ $('#hi_PRESENTACION_PAR').val();
           //*******************************************************************************************//   
           //****************************TABLA ORDEN DE NACIMIENTO ***********************************************// 
           datos+="&hi_FETO_ORD="+ $('#hi_FETO_ORD').val()+"&hi_MANEJO_ORD="+ $('#hi_MANEJO_ORD').val()+"&hi_PARTOLOGIA_ORD="+ $('#hi_PARTOLOGIA_ORD').val()+"&hi_EPISIOTOMIA_ORD="+ $('#hi_EPISIOTOMIA_ORD').val()+"&hi_DESGARROS_ORD="+ $('#hi_DESGARROS_ORD').val();
           //*******************************************************************************************//   
           //****************************TABLA TERMINACION ***********************************************// 
           hhh=$('#thora11').val();
           if($('#thora22').val()==""){
               $('#thora22').val(hhh);
           }           
           datos+="&hi_ESPONTANEA_TER="+ $('#hi_ESPONTANEA_TER').val()+"&hi_FORCEPS_TER="+ $('#hi_FORCEPS_TER').val()+"&hi_CESAREA_TER="+ $('#hi_CESAREA_TER').val()+"&hi_CESAREA_HIS_TER="+ $('#hi_CESAREA_HIS_TER').val()+"&hi_FECHA_TER="+ $('#hi_FECHA_TER').val();
           datos+="&hi_HORA_TER="+ $('#thora22').val()+"&hi_CESAREA_PRE_TER="+ $('#hi_CESAREA_PRE_TER').val()+"&hi_SUFRIMIENTO_FA_TER="+ $('#hi_SUFRIMIENTO_FA_TER').val()+"&hi_SESPROPORCION_TER="+ $('#hi_SESPROPORCION_TER').val()+"&hi_ALTERACION_TER="+ $('#hi_ALTERACION_TER').val();
           datos+="&hi_PARTO_PRO_TER="+ $('#hi_PARTO_PRO_TER').val()+"&hi_FRACASO_TER="+ $('#hi_FRACASO_TER').val()+"&hi_DESCENSO_TER="+ $('#hi_DESCENSO_TER').val()+"&hi_EMBARAZO_MUL_TER="+ $('#hi_EMBARAZO_MUL_TER').val()+"&hi_RCIU_TER="+ $('#hi_RCIU_TER').val();
           datos+="&hi_PARTO_PRETE1_TER="+ $('#hi_PARTO_PRETE1_TER').val()+"&hi_PARTO_PRETE2_TER="+ $('#hi_PARTO_PRETE2_TER').val()+"&hi_PRESENTACION_POD_TER="+ $('#hi_PRESENTACION_POD_TER').val()+"&hi_PRESENTACION_POS_TER="+ $('#hi_PRESENTACION_POS_TER').val()+"&hi_POSICION_TER="+ $('#hi_POSICION_TER').val();
           datos+="&hi_RUPTURA_TER="+ $('#hi_RUPTURA_TER').val()+"&hi_INFECCION_TER="+ $('#hi_INFECCION_TER').val()+"&hi_PLACENTA_PRE_TER="+ $('#hi_PLACENTA_PRE_TER').val()+"&hi_ABRUPTIO_TER="+ $('#hi_ABRUPTIO_TER').val()+"&hi_PRECLAMPSIAECLA_TER="+ $('#hi_PRECLAMPSIAECLA_TER').val();
           datos+="&hi_HERPES_TER="+ $('#hi_HERPES_TER').val()+"&hi_CONDILOMATOSIS_TER="+ $('#hi_CONDILOMATOSIS_TER').val()+"&hi_OTRAS_ENF_TER="+ $('#hi_OTRAS_ENF_TER').val()+"&hi_MUERTE_FET_TER="+ $('#hi_MUERTE_FET_TER').val()+"&hi_MADRE_EXA_TER="+ $('#hi_MADRE_EXA_TER').val();
           datos+="&hi_DIABETES_TER="+ $('#hi_DIABETES_TER').val()+"&hi_VIH_TER="+ $('#hi_VIH_TER').val()+"&hi_OTRAS_TER="+ $('#hi_OTRAS_TER').val()+"&hi_EXTRA_MANU_PLACEN_TER="+ $('#hi_EXTRA_MANU_PLACEN_TER').val()+"&hi_PLACENTA_COMPLETA_TER="+ $('#hi_PLACENTA_COMPLETA_TER').val();
           datos+="&hi_HIPOTOMIA_UTERINA_TER="+ $('#hi_HIPOTOMIA_UTERINA_TER').val()+"&hi_MUERTE_FETAL2_TER="+ $('#hi_MUERTE_FETAL2_TER').val()+"&hi_PARTO_DESCONO_TER="+ $('#hi_PARTO_DESCONO_TER').val();
           
           //*******************************************************************************************//   
           //****************************TABLA MEDICAMENTOS ***********************************************// 
           datos+="&hi_ANESTESIA_LO_MED="+ $('#hi_ANESTESIA_LO_MED').val()+"&hi_ANESTESIA_RE_MED="+ $('#hi_ANESTESIA_RE_MED').val()+"&hi_ANESTESIA_GE_MED="+ $('#hi_ANESTESIA_GE_MED').val()+"&hi_TRANQUIZANTE_MED="+ $('#hi_TRANQUIZANTE_MED').val()+"&hi_OXITOCINA_MED="+ $('#hi_OXITOCINA_MED').val();
           datos+="&hi_ANTIBIOTICO_MED="+ $('#hi_ANTIBIOTICO_MED').val()+"&hi_ANALGESICO_MED="+ $('#hi_ANALGESICO_MED').val()+"&hi_OTRAH_MED="+ $('#hi_OTRAH_MED').val()+"&hi_NINGUNA_MED="+ $('#hi_NINGUNA_MED').val();
           //*******************************************************************************************//   
           //****************************TABLA INSTITUCION ***********************************************// 
           datos+="&hi_INSTITU_INS="+ $('#hi_INSTITU_INS').val()+"&hi_NIVEL_INS="+ $('#hi_NIVEL_INS').val()+"&hi_ATENDIOPAR_INS="+ $('#hi_ATENDIOPAR_INS').val()+"&hi_ATENDIONEO_INS="+ $('#hi_ATENDIONEO_INS').val();
           //*******************************************************************************************//   
           //****************************TABLA RECIEN NACIDO ***********************************************// 
           datos+="&hi_HISTORIA_RECNAC="+ $('#hi_HISTORIA_RECNAC').val()+"&hi_NOMBRE1_RECNAC="+ $('#hi_NOMBRE1_RECNAC').val()+"&hi_NOMBRE2_RECNAC="+ $('#hi_NOMBRE2_RECNAC').val()+"&hi_NOMBRE3_RECNAC="+ $('#hi_NOMBRE3_RECNAC').val()+"&hi_NECREMI_RECNAC="+ $('#hi_NECREMI_RECNAC').val()+"&hi_INSTITU_RECNAC="+ $('#hi_INSTITU_RECNAC').val();           
           //*******************************************************************************************//  
           //****************************TABLA MOVIMIENTO DE REMISION ***********************************************// 
           datos+="&hi_RIESGO_MOVREM="+ $('#hi_RIESGO_MOVREM').val()+"&hi_CESAREA_MOVREM="+ $('#hi_CESAREA_MOVREM').val()+"&hi_PARTO_MOVREM="+ $('#hi_PARTO_MOVREM').val()+"&hi_PATOLOGIA_MOVREM="+ $('#hi_PATOLOGIA_MOVREM').val()+"&hi_DESPROPORCION_MOVREM="+ $('#hi_DESPROPORCION_MOVREM').val();
           datos+="&hi_DISTOCIA_MOVREM="+ $('#hi_DISTOCIA_MOVREM').val()+"&hi_TRABAJO_MOVREM="+ $('#hi_TRABAJO_MOVREM').val()+"&hi_INDUCCION_MOVREM="+ $('#hi_INDUCCION_MOVREM').val()+"&hi_SUFRIMIENTO_MOVREM="+ $('#hi_SUFRIMIENTO_MOVREM').val()+"&hi_RUPTURA_MOVREM="+ $('#hi_RUPTURA_MOVREM').val();
           datos+="&hi_HEMORRAGIA_MOVREM="+ $('#hi_HEMORRAGIA_MOVREM').val()+"&hi_OTROS_MOVREM="+ $('#hi_OTROS_MOVREM').val();      
           datos+="&hi_ID_ANTFAM="+ hi_ID_ANTFAM+"&hi_ID_ANTPER="+ hi_ID_ANTPER+"&hi_ID_ANTGIN="+ hi_ID_ANTGIN+"&hi_ID_HISREP="+ hi_ID_HISREP+"&hi_ID_CONASO="+ hi_ID_CONASO;
           datos+="&hi_ID_EMBACT="+ hi_ID_EMBACT+"&hi_ID_RIEPSI="+ hi_ID_RIEPSI+"&hi_ID_RIEBIO="+ hi_ID_RIEBIO+"&hi_ID_EXAGLI="+ hi_ID_EXAGLI+"&hi_ID_EXACTGO="+ hi_ID_EXACTGO;
           datos+="&hi_ID_PARA="+ hi_ID_PARA+"&hi_ID_PARA2="+ hi_ID_PARA2+"&hi_ID_SULLI="+ hi_ID_SULLI+"&hi_ID_ECO="+ hi_ID_ECO+"&hi_ID_PREE="+ hi_ID_PREE;
           datos+="&hi_ID_EXAMEN="+ hi_ID_EXAMEN+"&hi_ID_MOR_MAT="+ hi_ID_MOR_MAT+"&hi_ID_PRO="+ hi_ID_PRO+"&hi_ID_PAR="+ hi_ID_PAR+"&hi_ID_ORD="+ hi_ID_ORD;
           datos+="&hi_ID_TER="+ hi_ID_TER+"&hi_ID_MED="+ hi_ID_MED+"&hi_ID_INS="+ hi_ID_INS+"&hi_ID_RECNAC="+ hi_ID_RECNAC+"&hi_ID_MOVREM="+ hi_ID_MOVREM+"&hi_ID_MAT_PER="+hi_ID_MAT_PER;
           //*******************************************************************************************//  
           //****************************TABLA EVOLUCION***********************************************// 
           datos+="&vac="+vac+"&hi_SERVICIO_EVOLUCION="+ $('#hi_SERVICIO_EVOLUCION').val()+"&hi_SALA_EVOLUCION="+ $('#hi_SALA_EVOLUCION').val();
           datos+="&hi_N_CAMA_EVOLUCION="+ $('#hi_N_CAMA_EVOLUCION').val();           
           var k=1,j=0,p=1;              
           $("#detaevolu").find(':input').each(function (index) {                
               var id = $(this).attr("id");
               var valor = $(this).val(); 
//               alert("id"+p+" = "+id+"   valor "+p+" = "+valor+"   j= "+j);
               if(j==0){datos+="&"+id+p+"="+ valor;}
               if(j==1){datos+="&"+id+p+"="+ valor;}               
               if(j==2){datos+="&"+id+p+"="+ valor;}            
               if(j==3){datos+="&"+id+p+"="+ valor;}                                                       
               k=k+1;j=j+1;               
               if(j==4){j=0;p=p+1;}
           });  
           f=1;
           for(i=1; i<vector1.length;i++){
               if(vector1[i]!=undefined){
                   datos+="&hi_ID_EVOLUCION"+f+"="+ vector1[i];
                   f=f+1;
               }
           }             
           tamanio=p-1;
           datos+="&tamanio="+tamanio;      
           
           //*******************************************************************************************//              
           if(confirm("¿DESEA MODIFICAR LOS DATOS?")){
               $.enviar1("POST","../gestionar_materno_per",datos,"DATOS MODIFICADOS DE MANERA EXITOSA...","../ges_materno_per");
           }    
           ////////////////////////////////////////////////////////////////          
       }, 500);    
    });   
    $('#btn_eli').live('click', function(){        
       setTimeout(function(){
           //////////////////////VALIDAR CAMPOS////////////////////////////////////////
           resul=$.validatxt('#txtdoc','Por Favor Seleccione El Paciente..');
           if(resul=="1"){return;}
           resul=$.validatxt('#txtfinicial','Por Seleccione La Fecha De La Historia..');
           if(resul=="1"){return;}
           datos="";
           //****************************TABLA MATERNO PERINATAL**********************************//
           datos+="opcion=eliminar&hi_FECHA_MAT_PER="+$('#txtfinicial').val()+"&hi_ESTADO_MAT_PER=INACTIVO&id_paciente="+id_paciente+"&ident_paciente="+ident_paciente;
           //****************************TABLA ANTECEDENTES FAMILIARES****************************//
           datos+="&hi_HTA_CRONICA_ANTFAM=" + $('#combohta1').val() +"&hi_PREECLAMPSIA1_ANTFAM=" +$('#combopree1').val()+"&hi_DIABETES1_ANTFAM=" +$('#combodiab1').val();
           datos+="&hi_ECLAMPSIA1_ANTFAM="+$('#comboecla1').val()+"&hi_GEMELARES_ANTFAM=" +$('#combogeme').val()+"&hi_CARDIOPATIA_ANTFAM="+ $('#combocardiopa').val();
           datos+="&hi_TBC_ANTFAM=" +$('#combotbc').val()+"&hi_METABOLICOS_ANTFAM=" +$('#combometab').val()+"&hi_AUTOINMUNES_ANTFAM="+$('#comboautoi').val();
           datos+="&hi_INFECCIOSAS_ANTFAM=" +$('#comboinfe').val()+"&hi_CONGENITAS_ANTFAM="+$('#comboconge').val()+"&hi_NEOPLASIAS_ANTFAM="+ $('#comboneopla').val();
           datos+="&hi_EPILEPSIA_ANTFAM="+ $('#comboepile').val()+"&hi_OTROS1_ANTFAM="+ $('#combootros1').val()+"&hi_CUAL1_ANTFAM="+ $('#txtcual1').val();
           //*************************************************************************************//
           //****************************TABLA ANTECEDENTES PERSONALES****************************//
           datos+="&hi_TUBERCULOSIS_ANTPER="+ $('#combotuber').val()+"&hi_DIABETES2_ANTPER="+ $('#combodiab2').val()+"&hi_DIABETES_GES_ANTPER="+ $('#combodiabges').val()+"&hi_HTA_CRONICA2_ANTPER="+ $('#combohta2').val();
           datos+="&hi_CIRUGIAPELUTE_ANTPER="+ $('#combocirupel').val()+"&hi_PREECLAMPSIA2_ANTPER="+ $('#combopree2').val()+"&hi_ECLAMPSIA2_ANTPER="+ $('#comboecla2').val()+"&hi_ALERGICOS_ANTPER="+ $('#comboalerg').val();
           datos+="&hi_TABAQUISMO_ANTPER="+ $('#combotaba').val()+"&hi_ALCOHOLISMO_ANTPER="+ $('#comboalco').val()+"&hi_ANTITETANICA_ANTPER="+ $('#comboantite').val()+"&hi_MMR_ANTPER="+ $('#combommr').val();
           datos+="&hi_ENFERMEDAD_MEN_ANTPER="+ $('#comboenferme').val()+"&hi_ACTIVIDAD_FIS_ANTPER="+ $('#comboactifis').val()+"&hi_VICTIMA_MAL_ANTPER="+ $('#combovicti').val()+"&hi_OTROS2_ANTPER="+ $('#combootros2').val();
           datos+="&hi_CUAL2_ANTPER="+ $('#txtcual2').val();
           //*************************************************************************************//
           //****************************TABLA ANTECEDENTES GINECOLOGICOS****************************//
           datos+="&hi_MENARQUIA_ANTGIN="+ $('#txtmenar').val()+"&hi_G_ANTGIN="+ $('#txtg').val()+"&hi_P_ANTGIN="+ $('#txtp').val()+"&hi_C_ANTGIN="+ $('#txtc').val()+"&hi_A_ANTGIN="+ $('#txta').val();
           datos+="&hi_E_ANTGIN="+ $('#txte').val()+"&hi_V_ANTGIN="+ $('#txtv').val()+"&hi_M_ANTGIN="+ $('#txtm').val()+"&hi_CICLOS_ANTGIN="+ $('#combociclos').val()+"&hi_PLANIFICACION_FAM_ANTGIN="+ $('#comboplanif').val();
           datos+="&hi_FLUJO_VAG_ANTGIN="+ $('#comboflujov').val()+"&hi_ITS_ANTGIN="+ $('#comboits').val()+"&hi_CITOLOGIA_ULT_ANTGIN="+ $('#combocitol').val()+"&hi_COLCOPSCOPIA_ANTGIN="+ $('#combocolcops').val()+"&hi_PERIODO_INTER_ANTGIN="+ $('#txtperiointer').val();
           datos+="&hi_INFERTILIDAD_ANTGIN="+ $('#comboinfert').val()+"&hi_TTOS_INFER_ANTGIN="+ $('#combottos').val()+"&hi_RPM_ANTGIN="+ $('#comborpm').val()+"&hi_RCIU_ANTGIN="+ $('#comborciu').val()+"&hi_APP_ANTGIN="+ $('#comboapp').val();
           datos+="&hi_PARTO_PREM_ANTGIN="+ $('#combopartopre').val()+"&hi_GEMELAR_ANTGIN="+ $('#combogemelar').val()+"&hi_MALFORMACIONES_ANTGIN="+ $('#combomalform').val()+"&hi_POLIHIDRAMNIOS_ANTGIN="+ $('#combopolihri').val()+"&hi_OLIGOHIDRAMNIOS_ANTGIN="+ $('#combooligohri').val();
           datos+="&hi_EMB_PROLONGADO_ANTGIN="+ $('#comboembprolo').val()+"&hi_AMENAZA_ABO_ANTGIN="+ $('#comboameabort').val()+"&hi_OTROS3_ANTGIN="+ $('#combootros3').val()+"&hi_CUAL3_ANTGIN="+ $('#txtcual3').val()+"&hi_CUALITS_ANTGIN="+$('#hi_CUALITS_ANTGIN').val();
           //****************************TABLA HISTORIA REPRODUCTIVA****************************//
           hi_ABORTO_HABIT_HISREP=$('#chehabit').val();
           hi_RETENCION_PLA_HISREP=$('#cheretpla').val();
           hi_REC_NACIDO1_HISREP=$('#cherecnacmay').val();
           hi_REC_NACIDO2_HISREP=$('#cherecnac').val();
           hi_HTA_INDUCIDO_HISREP=$('#chehtaindu').val();
           hi_EMB_GEMEL_CES_HISREP=$('#cheembgemel').val();
           hi_MORTINATO_HISREP=$('#chemorti').val();
           hi_TP_PROLON_HISREP=$('#chetpprolon').val();
           datos+="&hi_EDAD_HISREP="+ $('#comboedad').val()+"&hi_PARIDAD_HISREP="+ $('#comboparidad').val()+"&hi_ABORTO_HABIT_HISREP="+ hi_ABORTO_HABIT_HISREP+"&hi_RETENCION_PLA_HISREP="+ hi_RETENCION_PLA_HISREP+"&hi_REC_NACIDO1_HISREP="+ hi_REC_NACIDO1_HISREP;
           datos+="&hi_REC_NACIDO2_HISREP="+ hi_REC_NACIDO2_HISREP+"&hi_HTA_INDUCIDO_HISREP="+ hi_HTA_INDUCIDO_HISREP+"&hi_EMB_GEMEL_CES_HISREP="+ hi_EMB_GEMEL_CES_HISREP+"&hi_MORTINATO_HISREP="+ hi_MORTINATO_HISREP+"&hi_TP_PROLON_HISREP="+ hi_TP_PROLON_HISREP;           
           //*************************************************************************************//
           //****************************TABLA CONDICIONES ASOCIADAS****************************//
           datos+="&hi_QX_GINECOLOGIAS1_CONASO="+ $('#comboqxgines1').val()+"&hi_ENF_RENS1_CONASO="+ $('#comborenalcros1').val()+"&hi_DIABETES_GESS1_CONASO="+ $('#combodiabges1').val()+"&hi_DIABETES_MELLIS1_CONASO="+ $('#combodiabmells1').val()+"&hi_ENF_CARDIACAS1_CONASO="+ $('#comboenfcardis1').val();
           datos+="&hi_ENF_INFAGUDAS1_CONASO="+ $('#comboenfinfes1').val()+"&hi_ENF_AUTOINMUNES1_CONASO="+ $('#comboenfautoins1').val()+"&hi_ANEMIA_HBS1_CONASO="+ $('#comboanemias1').val()+"&hi_QX_GINECOLOGIAS2_CONASO="+ $('#comboqxgines2').val()+"&hi_ENF_RENS2_CONASO="+ $('#comborenalcros2').val();
           datos+="&hi_DIABETES_GESS2_CONASO="+ $('#combodiabges2').val()+"&hi_DIABETES_MELLIS2_CONASO="+ $('#combodiabmells2').val()+"&hi_ENF_CARDIACAS2_CONASO="+ $('#comboenfcardis2').val()+"&hi_ENF_INFAGUDAS2_CONASO="+ $('#comboenfinfes2').val()+"&hi_ENF_AUTOINMUNES2_CONASO="+ $('#comboenfautoins2').val();
           datos+="&hi_ANEMIA_HBS2_CONASO="+ $('#comboanemias2').val()+"&hi_QX_GINECOLOGIAS3_CONASO="+ $('#comboqxgines3').val()+"&hi_ENF_RENS3_CONASO="+ $('#comborenalcros3').val()+"&hi_DIABETES_GESS3_CONASO="+ $('#combodiabges3').val()+"&hi_DIABETES_MELLIS3_CONASO="+ $('#combodiabmells3').val();
           datos+="&hi_ENF_CARDIACAS3_CONASO="+ $('#comboenfcardis3').val()+"&hi_ENF_INFAGUDAS3_CONASO="+ $('#comboenfinfes3').val()+"&hi_ENF_AUTOINMUNES3_CONASO="+ $('#comboenfautoins3').val()+"&hi_ANEMIA_HBS3_CONASO="+ $('#comboanemias3').val();
           //*************************************************************************************//
           //****************************TABLA EMBARAZO ACTUAL************************************//
           datos+="&hi_HEMORRAGIAS1_MAL_EMBACT="+ $('#combohemomens1').val()+"&hi_VAGINAS1_MAL_EMBACT="+ $('#combovaginas1').val()+"&hi_E_PROLONGADOS1_MAL_EMBACT="+ $('#comboeprolongas1').val()+"&hi_HTAS1_MAL_EMBACT="+ $('#combohtas1').val()+"&hi_RPMS1_MAL_EMBACT="+ $('#comborpms1').val();
           datos+="&hi_POLIHRIDAMNIOSS1_MAL_EMBACT="+ $('#combopolihis1').val()+"&hi_RCIUS1_MAL_EMBACT="+ $('#comborcius1').val()+"&hi_EMB_MULTIPLES1_MAL_EMBACT="+ $('#comboembmultiples1').val()+"&hi_MALA_PRESENTS1_MAL_EMBACT="+ $('#combomalapres1').val()+"&hi_ISOS1_MAL_EMBACT="+ $('#comboisos1').val();
           datos+="&hi_HEMORRAGIAS2_MAL_EMBACT="+ $('#combohemomens2').val()+"&hi_VAGINAS2_MAL_EMBACT="+ $('#combovaginas2').val()+"&hi_E_PROLONGADOS2_MAL_EMBACT="+ $('#comboeprolongas2').val()+"&hi_HTAS2_MAL_EMBACT="+ $('#combohtas2').val()+"&hi_RPMS2_MAL_EMBACT="+ $('#comborpms2').val();
           datos+="&hi_POLIHRIDAMNIOSS2_MAL_EMBACT="+ $('#combopolihis2').val()+"&hi_RCIUS2_MAL_EMBACT="+ $('#comborcius2').val()+"&hi_EMB_MULTIPLES2_MAL_EMBACT="+ $('#comboembmultiples2').val()+"&hi_MALA_PRESENTS2_MAL_EMBACT="+ $('#combomalapres2').val()+"&hi_ISOS2_MAL_EMBACT="+ $('#comboisos2').val();
           datos+="&hi_HEMORRAGIAS3_MAL_EMBACT="+ $('#combohemomens3').val()+"&hi_VAGINAS3_MAL_EMBACT="+ $('#combovaginas3').val()+"&hi_E_PROLONGADOS3_MAL_EMBACT="+ $('#comboeprolongas3').val()+"&hi_HTAS3_MAL_EMBACT="+ $('#combohtas3').val()+"&hi_RPMS3_MAL_EMBACT="+ $('#comborpms3').val();
           datos+="&hi_POLIHRIDAMNIOSS3_MAL_EMBACT="+ $('#combopolihis3').val()+"&hi_RCIUS3_MAL_EMBACT="+ $('#comborcius3').val()+"&hi_EMB_MULTIPLES3_MAL_EMBACT="+ $('#comboembmultiples3').val()+"&hi_MALA_PRESENTS3_MAL_EMBACT="+ $('#combomalapres3').val()+"&hi_ISOS3_MAL_EMBACT="+ $('#comboisos3').val()+"&hi_INMUNIZACION_RH_MAL_EMBACT="+ $('#txtinmunizarh').val();          
           //*************************************************************************************//
           //****************************TABLA RIESGO PSICOSOCIAL************************************//
           datos+="&hi_TENSION_EMO_RIEPSI="+ $('#combotensionemo').val()+"&hi_HUMOR_DEPRE_RIEPSI="+ $('#combohumordepre').val()+"&hi_SINT_NEURO_RIEPSI="+ $('#comboneurovege').val()+"&hi_SOP_FAM_TIEM_RIEPSI="+ $('#comboeltiempo').val()+"&hi_SOP_FAM_ESPA_RIEPSI="+ $('#comboelespacio').val();
           datos+="&hi_SOP_FAM_DIN_RIEPSI="+ $('#comboeldinero').val()+"&hi_ES_VICTIMA_MAL_RIEPSI="+ $('#combovictimama').val()+"&hi_CUAL4_RIEPSI="+ $('#txtcual4').val()+"&hi_PARENTESCO_MAL_RIEPSI="+ $('#txtparentesco').val();
           //*************************************************************************************//
           //****************************TABLA RIESGO BIOPSICOSOCIAl************************************//
           datos+="&hi_TOTALS1_RIEBIO="+ $('#t1').val()+"&hi_TOTALS2_RIEBIO="+ $('#t2').val()+"&hi_TOTALS3_RIEBIO="+ $('#t3').val();           
           //*******************************************************************************************//
           //****************************TABLA EXAMENES GLICEMIA***********************************************//
           datos+="&hi_GLICEMIA_AYU_EXAGLI="+ $('#txtgliceayu').val()+"&hi_2GLICEMIA_EXAGLI="+ $('#txt2glicemia').val()+"&hi_FECHA_REALIZA_EXAGLI="+ $('#txtfrealiza').val()+"&hi_GRUPO_EXAGLI="+ $('#comgrupo').val()+"&hi_RH_EXAGLI="+ $('#comrh').val();
           //*******************************************************************************************//
           //****************************TABLA EXAMENES CTGO***********************************************//
           datos+="&hi_CTGO_EXACTGO="+ $('#txtctgo').val()+"&hi_GLICEMIA_PRIMERA_EXACTGO="+ $('#comgliceexa1').val()+"&hi_FECHA_GLICE_PRI_EXACTGO="+ $('#txtfgliceexa1').val()+"&hi_GLICEMIA_SEGUNDA_EXACTGO="+ $('#comgliceexa2').val()+"&hi_FECHA_GLICE_SEG_EXACTGO="+ $('#txtfgliceexa2').val()+"&hi_CURVA_GLICE_EXACTGO="+ $('#comcurvaglice').val();
           //*******************************************************************************************//
           //****************************TABLA PARACLINICOS 1***********************************************//
           datos+="&hi_HBANT_PARA="+ $('#hi_HBANT_PARA').val()+"&hi_HCTOANT_PARA="+ $('#hi_HCTOANT_PARA').val()+"&hi_VDRLANT_PARA="+ $('#hi_VDRLANT_PARA').val()+"&hi_FROTIS_VAGANT_PARA="+ $('#hi_FROTIS_VAGANT_PARA').val()+"&hi_PARCIALANT_PARA="+ $('#hi_PARCIALANT_PARA').val();
           datos+="&hi_GRAMORINAANT_PARA="+ $('#hi_GRAMORINAANT_PARA').val()+"&hi_BACTANT_PARA="+ $('#hi_BACTANT_PARA').val()+"&hi_HB1TRI_PARA="+ $('#hi_HB1TRI_PARA').val()+"&hi_HCTO1TRI_PARA="+ $('#hi_HCTO1TRI_PARA').val()+"&hi_VDRL1TRI_PARA="+ $('#hi_VDRL1TRI_PARA').val();
           datos+="&hi_FROTIS_VAG1TRI_PARA="+ $('#hi_FROTIS_VAG1TRI_PARA').val()+"&hi_PARCIAL1TRI_PARA="+ $('#hi_PARCIAL1TRI_PARA').val()+"&hi_GRAMORINA1TRI_PARA="+ $('#hi_GRAMORINA1TRI_PARA').val()+"&hi_BACT1TRI_PARA="+ $('#hi_BACT1TRI_PARA').val()+"&hi_HB2TRI_PARA="+ $('#hi_HB2TRI_PARA').val();
           datos+="&hi_HCTO2TRI_PARA="+ $('#hi_HCTO2TRI_PARA').val()+"&hi_VDRL2TRI_PARA="+ $('#hi_VDRL2TRI_PARA').val()+"&hi_FROTIS_VAG2TRI_PARA="+ $('#hi_FROTIS_VAG2TRI_PARA').val()+"&hi_PARCIAL2TRI_PARA="+ $('#hi_PARCIAL2TRI_PARA').val()+"&hi_GRAMORINA2TRI_PARA="+ $('#hi_GRAMORINA2TRI_PARA').val();
           datos+="&hi_BACT2TRI_PARA="+ $('#hi_BACT2TRI_PARA').val()+"&hi_HB3TRI_PARA="+ $('#hi_HB3TRI_PARA').val()+"&hi_HCTO3TRI_PARA="+ $('#hi_HCTO3TRI_PARA').val()+"&hi_VDRL3TRI_PARA="+ $('#hi_VDRL3TRI_PARA').val()+"&hi_FROTIS_VAG3TRI_PARA="+ $('#hi_FROTIS_VAG3TRI_PARA').val();
           datos+="&hi_PARCIAL3TRI_PARA="+ $('#hi_PARCIAL3TRI_PARA').val()+"&hi_GRAMORINA3TRI_PARA="+ $('#hi_GRAMORINA3TRI_PARA').val()+"&hi_BACT3TRI_PARA="+ $('#hi_BACT3TRI_PARA').val();
           //*******************************************************************************************//
           //****************************TABLA PARACLINICOS 2***********************************************//
           datos+="&hi_UROCULTIVOANT_PARA2="+ $('#hi_UROCULTIVOANT_PARA2').val()+"&hi_FTAABSANT_PARA2="+ $('#hi_FTAABSANT_PARA2').val()+"&hi_HEPATITISBANT_PARA2="+ $('#hi_HEPATITISBANT_PARA2').val()+"&hi_ANTITETANICAANT_PARA2="+ $('#hi_ANTITETANICAANT_PARA2').val()+"&hi_HIVANT_PARA2="+ $('#hi_HIVANT_PARA2').val()+"&hi_CITOLOGIA_CERANT_PARA2="+ $('#hi_CITOLOGIA_CERANT_PARA2').val();
           datos+="&hi_UROCULTIVO1TRI_PARA2="+ $('#hi_UROCULTIVO1TRI_PARA2').val()+"&hi_FTAABS1TRI_PARA2="+ $('#hi_FTAABS1TRI_PARA2').val()+"&hi_HEPATITISB1TRI_PARA2="+ $('#hi_HEPATITISB1TRI_PARA2').val()+"&hi_ANTITETANICA1TRI_PARA2="+ $('#hi_ANTITETANICA1TRI_PARA2').val()+"&hi_HIV1TRI_PARA2="+ $('#hi_HIV1TRI_PARA2').val()+"&hi_CITOLOGIA_CER1TRI_PARA2="+ $('#hi_CITOLOGIA_CER1TRI_PARA2').val();
           datos+="&hi_UROCULTIVO2TRI_PARA2="+ $('#hi_UROCULTIVO2TRI_PARA2').val()+"&hi_FTAABS2TRI_PARA2="+ $('#hi_FTAABS2TRI_PARA2').val()+"&hi_HEPATITISB2TRI_PARA2="+ $('#hi_HEPATITISB2TRI_PARA2').val()+"&hi_ANTITETANICA2TRI_PARA2="+ $('#hi_ANTITETANICA2TRI_PARA2').val()+"&hi_HIV2TRI_PARA2="+ $('#hi_HIV2TRI_PARA2').val()+"&hi_CITOLOGIA_CER2TRI_PARA2="+ $('#hi_CITOLOGIA_CER2TRI_PARA2').val();
           datos+="&hi_UROCULTIVO3TRI_PARA2="+ $('#hi_UROCULTIVO3TRI_PARA2').val()+"&hi_FTAABS3TRI_PARA2="+ $('#hi_FTAABS3TRI_PARA2').val()+"&hi_HEPATITISB3TRI_PARA2="+ $('#hi_HEPATITISB3TRI_PARA2').val()+"&hi_ANTITETANICA3TRI_PARA2="+ $('#hi_ANTITETANICA3TRI_PARA2').val()+"&hi_HIV3TRI_PARA2="+ $('#hi_HIV3TRI_PARA2').val()+"&hi_CITOLOGIA_CER3TRI_PARA2="+ $('#hi_CITOLOGIA_CER3TRI_PARA2').val();           
           //*******************************************************************************************//
           //****************************TABLA O SULLIVAN***********************************************//           
           datos+="&hi_GLISEMIA_PRE_SULLI="+ $('#hi_GLISEMIA_PRE_SULLI').val()+"&hi_GLICEMIA_POST_SULLI="+ $('#hi_GLICEMIA_POST_SULLI').val()+"&hi_FECHA_RESULTADO_SULLI="+ $('#hi_FECHA_RESULTADO_SULLI').val()+"&hi_S16_SULLI="+ $('#hi_S16_SULLI').val()+"&hi_S20_SULLI="+ $('#hi_S20_SULLI').val();
           datos+="&hi_S24_SULLI="+ $('#hi_S24_SULLI').val()+"&hi_S28_SULLI="+ $('#hi_S28_SULLI').val()+"&hi_S32_SULLI="+ $('#hi_S32_SULLI').val()+"&hi_S36_SULLI="+ $('#hi_S36_SULLI').val()+"&hi_FECHAS16_SULLI="+ $('#hi_FECHAS16_SULLI').val();
           datos+="&hi_FECHAS20_SULLI="+ $('#hi_FECHAS20_SULLI').val()+"&hi_FECHAS24_SULLI="+ $('#hi_FECHAS24_SULLI').val()+"&hi_FECHAS28_SULLI="+ $('#hi_FECHAS28_SULLI').val()+"&hi_FECHAS32_SULLI="+ $('#hi_FECHAS32_SULLI').val()+"&hi_FECHAS36_SULLI="+ $('#hi_FECHAS36_SULLI').val()+"&hi_ROLLOVERTEXT_SULLI="+ $('#hi_ROLLOVERTEXT_SULLI').val();
           //*******************************************************************************************//
           //****************************TABLA ECO***********************************************// 
           hi_NORMA2TRI_ECO=$('#hi_NORMA2TRI_ECO').val();
           hi_POLIHRIDAMNIOS2TRI_ECO=$('#hi_POLIHRIDAMNIOS2TRI_ECO').val();
           hi_RCIU2TRI_ECO=$('#hi_RCIU2TRI_ECO').val();
           hi_OLIGOHIDRAMNIOS2TRI_ECO=$('#hi_OLIGOHIDRAMNIOS2TRI_ECO').val();
           hi_MACROSOMIA2TRI_ECO=$('#hi_MACROSOMIA2TRI_ECO').val();
           hi_MALFORMACION2TRI_ECO=$('#hi_MALFORMACION2TRI_ECO').val();
           hi_NORMA3TRI_ECO=$('#hi_NORMA3TRI_ECO').val();
           hi_POLIHRIDAMNIOS3TRI_ECO=$('#hi_POLIHRIDAMNIOS3TRI_ECO').val();
           hi_RCIU3TRI_ECO=$('#hi_RCIU3TRI_ECO').val();
           hi_OLIGOHIDRAMNIOS3TRI_ECO=$('#hi_OLIGOHIDRAMNIOS3TRI_ECO').val();
           hi_MACROSOMIA3TRI_ECO=$('#hi_MACROSOMIA3TRI_ECO').val();
           hi_MALFORMACION3TRI_ECO=$('#hi_MALFORMACION3TRI_ECO').val();
           
           datos+="&hi_EDAD_GEST1C_ECO="+ $('#hi_EDAD_GEST1C_ECO').val()+"&hi_GESTACIONALAMENO1C_ECO="+ $('#hi_GESTACIONALAMENO1C_ECO').val()+"&hi_PRESENCIA_HEMA1C_ECO="+ $('#hi_PRESENCIA_HEMA1C_ECO').val()+"&hi_OTROS_MARCADORES1C_ECO="+ $('#hi_OTROS_MARCADORES1C_ECO').val()+"&hi_SONOLUCENCIAS1C_ECO="+ $('#hi_SONOLUCENCIAS1C_ECO').val();
           datos+="&hi_OBSERVACIONES1C_ECO="+ $('#hi_OBSERVACIONES1C_ECO').val()+"&hi_EDAD_GEST1TRI_ECO="+ $('#hi_EDAD_GEST1TRI_ECO').val()+"&hi_GESTACIONALAMENO1TRI_ECO="+ $('#hi_GESTACIONALAMENO1TRI_ECO').val()+"&hi_PRESENCIA_HEMA1TRI_ECO="+ $('#hi_PRESENCIA_HEMA1TRI_ECO').val()+"&hi_OTROS_MARCADORES1TRI_ECO="+ $('#hi_OTROS_MARCADORES1TRI_ECO').val();
           datos+="&hi_SONOLUCENCIAS1TRI_ECO="+ $('#hi_SONOLUCENCIAS1TRI_ECO').val()+"&hi_OBSERVACIONES1TRI_ECO="+ $('#hi_OBSERVACIONES1TRI_ECO').val()+"&hi_NORMA2TRI_ECO="+ hi_NORMA2TRI_ECO+"&hi_POLIHRIDAMNIOS2TRI_ECO="+ hi_POLIHRIDAMNIOS2TRI_ECO+"&hi_RCIU2TRI_ECO="+ hi_RCIU2TRI_ECO;
           datos+="&hi_OLIGOHIDRAMNIOS2TRI_ECO="+hi_OLIGOHIDRAMNIOS2TRI_ECO+"&hi_MACROSOMIA2TRI_ECO="+hi_MACROSOMIA2TRI_ECO+"&hi_MALFORMACION2TRI_ECO="+ hi_MALFORMACION2TRI_ECO+"&hi_OTRAS_ANO2TRI_ECO="+ $('#hi_OTRAS_ANO2TRI_ECO').val()+"&hi_OBSERVA2TRI_ECO="+ $('#hi_OBSERVA2TRI_ECO').val();
           datos+="&hi_NORMA3TRI_ECO="+hi_NORMA3TRI_ECO+"&hi_POLIHRIDAMNIOS3TRI_ECO="+ hi_POLIHRIDAMNIOS3TRI_ECO+"&hi_RCIU3TRI_ECO="+hi_RCIU3TRI_ECO+"&hi_OLIGOHIDRAMNIOS3TRI_ECO="+hi_OLIGOHIDRAMNIOS3TRI_ECO+"&hi_MACROSOMIA3TRI_ECO="+hi_MACROSOMIA3TRI_ECO;
           datos+="&hi_MALFORMACION3TRI_ECO="+hi_MALFORMACION3TRI_ECO+"&hi_OTRAS_ANO3TRI_ECO="+ $('#hi_OTRAS_ANO3TRI_ECO').val()+"&hi_OBSERVA3TRI_ECO="+ $('#hi_OBSERVA3TRI_ECO').val();           
           //*******************************************************************************************//           
           //****************************TABLA CONTROL PRENATAL***********************************************// 
           var k=1,j=0,p=1;j;              
           $("#detalle").find(':input').each(function (index) {                
               var id = $(this).attr("id");
               var valor = $(this).val(); 
               if(j==0){datos+="&"+id+p+"="+ valor;}
               if(j==1){datos+="&"+id+p+"="+ valor;}               
               if(j==2){datos+="&"+id+p+"="+ valor;}            
               if(j==3){datos+="&"+id+p+"="+ valor;}                                    
               if(j==4){datos+="&"+id+p+"="+ valor;}      
               if(j==5){datos+="&"+id+p+"="+ valor;}      
               if(j==6){datos+="&"+id+p+"="+ valor;}      
               if(j==7){datos+="&"+id+p+"="+ valor;}      
               if(j==8){datos+="&"+id+p+"="+ valor;}      
               if(j==9){datos+="&"+id+p+"="+ valor;}      
               if(j==10){datos+="&"+id+p+"="+ valor;}      
               if(j==11){datos+="&"+id+p+"="+ valor;}      
               if(j==12){datos+="&"+id+p+"="+ valor;}      
               if(j==13){datos+="&"+id+p+"="+ valor;}      
               if(j==14){datos+="&"+id+p+"="+ valor;}      
               if(j==15){datos+="&"+id+p+"="+ valor;}                     
               k=k+1;j=j+1;               
               if(j==16){j=0;p=p+1;}
           });  
           f=1;
           for(i=1; i<vector.length;i++){
               if(vector[i]!=undefined){
                   datos+="&hi_ID_CON_PRE"+f+"="+ vector[i];
                   f=f+1;
               }
           }             
           tam=p-1;
           datos+="&tam="+tam;      
           
           //*******************************************************************************************//   
           //****************************TABLA MORBILIDADES TRAZADORAS***********************************************// 
           datos+="&hi_SIN_RIESGO_PREE="+ $('#hi_SIN_RIESGO_PREE').val()+"&hi_CON_RIESGO_SIN_PREE="+ $('#hi_CON_RIESGO_SIN_PREE').val()+"&hi_CON_RIESGO_UTI_PREE="+ $('#hi_CON_RIESGO_UTI_PREE').val();
           datos+="&hi_CON_RIESGO_BIO1_PREE="+ $('#hi_CON_RIESGO_BIO1_PREE').val()+"&hi_CON_RIESGO_BIO2_PREE="+ $('#hi_CON_RIESGO_BIO2_PREE').val()+"&hi_CON_RIESGO_CAL_PREE="+ $('#hi_CON_RIESGO_CAL_PREE').val()+"&hi_CON_RIESGO_NUTRI_PREE="+ $('#hi_CON_RIESGO_NUTRI_PREE').val();
           //*******************************************************************************************//   
           //****************************TABLA EXAMEN ***********************************************// 
           datos+="&hi_PARTO_PRESIN_EXAMEN="+ $('#hi_PARTO_PRESIN_EXAMEN').val()+"&hi_DIABETESSIN_EXAMEN="+ $('#hi_DIABETESSIN_EXAMEN').val()+"&hi_BAJOSIN_EXAMEN="+ $('#hi_BAJOSIN_EXAMEN').val()+"&hi_RIESGOSIN_EXAMEN="+ $('#hi_RIESGOSIN_EXAMEN').val()+"&hi_HPPSIN_EXAMEN="+ $('#hi_HPPSIN_EXAMEN').val();
           datos+="&hi_PARTO_PRECONSIN_EXAMEN="+ $('#hi_PARTO_PRECONSIN_EXAMEN').val()+"&hi_DIABETESCONSIN_EXAMEN="+ $('#hi_DIABETESCONSIN_EXAMEN').val()+"&hi_BAJOCONSIN_EXAMEN="+ $('#hi_BAJOCONSIN_EXAMEN').val()+"&hi_RIESGOCONSIN_EXAMEN="+ $('#hi_RIESGOCONSIN_EXAMEN').val()+"&hi_HPPCONSIN_EXAMEN="+ $('#hi_HPPCONSIN_EXAMEN').val();
           datos+="&hi_PARTO_PRECONTRA_EXAMEN="+ $('#hi_PARTO_PRECONTRA_EXAMEN').val()+"&hi_DIABETESCONTRA_EXAMEN="+ $('#hi_DIABETESCONTRA_EXAMEN').val()+"&hi_BAJOCONTRA_EXAMEN="+ $('#hi_BAJOCONTRA_EXAMEN').val()+"&hi_RIESGOCONTRA_EXAMEN="+ $('#hi_RIESGOCONTRA_EXAMEN').val()+"&hi_HPPCONTRA_EXAMEN="+ $('#hi_HPPCONTRA_EXAMEN').val();
           //*******************************************************************************************//   
           //****************************TABLA MORBILIDAD MATERNA ***********************************************// 
           datos+="&hi_NINGUNA_MOR_MAT="+ $('#hi_NINGUNA_MOR_MAT').val()+"&hi_ABRUPTIO_MOR_MAT="+ $('#hi_ABRUPTIO_MOR_MAT').val()+"&hi_AMENAZA_MOR_MAT="+ $('#hi_AMENAZA_MOR_MAT').val()+"&hi_ANEMIA_MOR_MAT="+ $('#hi_ANEMIA_MOR_MAT').val()+"&hi_ATONIA_MOR_MAT="+ $('#hi_ATONIA_MOR_MAT').val();
           datos+="&hi_CARDIOPATIA_MOR_MAT="+ $('#hi_CARDIOPATIA_MOR_MAT').val()+"&hi_CID_MOR_MAT="+ $('#hi_CID_MOR_MAT').val()+"&hi_DESGARROS_MOR_MAT="+ $('#hi_DESGARROS_MOR_MAT').val()+"&hi_DIABETES_GES_MOR_MAT="+ $('#hi_DIABETES_GES_MOR_MAT').val()+"&hi_DIABETES_MELLI_MOR_MAT="+ $('#hi_DIABETES_MELLI_MOR_MAT').val();
           datos+="&hi_ECLAMPSIA_MOR_MAT="+ $('#hi_ECLAMPSIA_MOR_MAT').val()+"&hi_PREECLAMPSIA_LEVE_MOR_MAT="+ $('#hi_PREECLAMPSIA_LEVE_MOR_MAT').val()+"&hi_PRECLAMPSIA_SEVERA_MOR_MAT="+ $('#hi_PRECLAMPSIA_SEVERA_MOR_MAT').val()+"&hi_PRECLAMPSIA_SEVERACON_MOR_MAT="+ $('#hi_PRECLAMPSIA_SEVERACON_MOR_MAT').val()+"&hi_HEPATITIS_MOR_MAT="+ $('#hi_HEPATITIS_MOR_MAT').val();
           datos+="&hi_HIPERTENCION_CRO_MOR_MAT="+ $('#hi_HIPERTENCION_CRO_MOR_MAT').val()+"&hi_HIPERTENCION_GES_MOR_MAT="+ $('#hi_HIPERTENCION_GES_MOR_MAT').val()+"&hi_INFECCION_MOR_MAT="+ $('#hi_INFECCION_MOR_MAT').val()+"&hi_MALARIA_MOR_MAT="+ $('#hi_MALARIA_MOR_MAT').val()+"&hi_PLACENTA_PRE_MOR_MAT="+ $('#hi_PLACENTA_PRE_MOR_MAT').val();
           datos+="&hi_PLACENTA_RETE_MOR_MAT="+ $('#hi_PLACENTA_RETE_MOR_MAT').val()+"&hi_RCIU_MOR_MAT="+ $('#hi_RCIU_MOR_MAT').val()+"&hi_RUPTURA_MOR_MAT="+ $('#hi_RUPTURA_MOR_MAT').val()+"&hi_SEPSIS_MOR_MAT="+ $('#hi_SEPSIS_MOR_MAT').val()+"&hi_SIFILIS_MOR_MAT="+ $('#hi_SIFILIS_MOR_MAT').val();
           datos+="&hi_TBC_MOR_MAT="+ $('#hi_TBC_MOR_MAT').val()+"&hi_HEMORRAGIA_DEL_MOR_MAT="+ $('#hi_HEMORRAGIA_DEL_MOR_MAT').val()+"&hi_HEMORRAGIA_POST_MOR_MAT="+ $('#hi_HEMORRAGIA_POST_MOR_MAT').val()+"&hi_EMBARAZO_MUL_MOR_MAT="+ $('#hi_EMBARAZO_MUL_MOR_MAT').val()+"&hi_TROMBOEMBOLISMO_MOR_MAT="+ $('#hi_TROMBOEMBOLISMO_MOR_MAT').val();
           datos+="&hi_VIH_MOR_MAT="+ $('#hi_VIH_MOR_MAT').val()+"&hi_OTRAS_MOR_MAT="+ $('#hi_OTRAS_MOR_MAT').val();           
           //*******************************************************************************************//   
           //****************************TABLA PROCEDENCIA ***********************************************// 
           datos+="&hi_DOMICILIO_PRO="+ $('#hi_DOMICILIO_PRO').val()+"&hi_HOGAR_PRO="+ $('#hi_HOGAR_PRO').val()+"&hi_PARTERA_PRO="+ $('#hi_PARTERA_PRO').val()+"&hi_IPS_PRO="+ $('#hi_IPS_PRO').val()+"&hi_OTRA_PRO="+ $('#hi_OTRA_PRO').val();
           //*******************************************************************************************//   
           //****************************TABLA PARTO ***********************************************// 
           hh=$('#thora1').val();
           if($('#thora2').val()==""){
               $('#thora2').val(hh);
           }
           datos+="&hi_EDAD_GES_PAR="+ $('#hi_EDAD_GES_PAR').val()+"&hi_TAMA_PAR="+ $('#hi_TAMA_PAR').val()+"&hi_INICIO_PAR="+ $('#hi_INICIO_PAR').val()+"&hi_MEMBRANA_PAR="+ $('#hi_MEMBRANA_PAR').val()+"&hi_FECHA_MEM_PAR="+ $('#hi_FECHA_MEM_PAR').val();
           datos+="&hi_HORA_MEM_PAR="+ $('#thora2').val()+"&hi_PRESENTACION_PAR="+ $('#hi_PRESENTACION_PAR').val();
           //*******************************************************************************************//   
           //****************************TABLA ORDEN DE NACIMIENTO ***********************************************// 
           datos+="&hi_FETO_ORD="+ $('#hi_FETO_ORD').val()+"&hi_MANEJO_ORD="+ $('#hi_MANEJO_ORD').val()+"&hi_PARTOLOGIA_ORD="+ $('#hi_PARTOLOGIA_ORD').val()+"&hi_EPISIOTOMIA_ORD="+ $('#hi_EPISIOTOMIA_ORD').val()+"&hi_DESGARROS_ORD="+ $('#hi_DESGARROS_ORD').val();
           //*******************************************************************************************//   
           //****************************TABLA TERMINACION ***********************************************// 
           hhh=$('#thora11').val();
           if($('#thora22').val()==""){
               $('#thora22').val(hhh);
           }           
           datos+="&hi_ESPONTANEA_TER="+ $('#hi_ESPONTANEA_TER').val()+"&hi_FORCEPS_TER="+ $('#hi_FORCEPS_TER').val()+"&hi_CESAREA_TER="+ $('#hi_CESAREA_TER').val()+"&hi_CESAREA_HIS_TER="+ $('#hi_CESAREA_HIS_TER').val()+"&hi_FECHA_TER="+ $('#hi_FECHA_TER').val();
           datos+="&hi_HORA_TER="+ $('#thora22').val()+"&hi_CESAREA_PRE_TER="+ $('#hi_CESAREA_PRE_TER').val()+"&hi_SUFRIMIENTO_FA_TER="+ $('#hi_SUFRIMIENTO_FA_TER').val()+"&hi_SESPROPORCION_TER="+ $('#hi_SESPROPORCION_TER').val()+"&hi_ALTERACION_TER="+ $('#hi_ALTERACION_TER').val();
           datos+="&hi_PARTO_PRO_TER="+ $('#hi_PARTO_PRO_TER').val()+"&hi_FRACASO_TER="+ $('#hi_FRACASO_TER').val()+"&hi_DESCENSO_TER="+ $('#hi_DESCENSO_TER').val()+"&hi_EMBARAZO_MUL_TER="+ $('#hi_EMBARAZO_MUL_TER').val()+"&hi_RCIU_TER="+ $('#hi_RCIU_TER').val();
           datos+="&hi_PARTO_PRETE1_TER="+ $('#hi_PARTO_PRETE1_TER').val()+"&hi_PARTO_PRETE2_TER="+ $('#hi_PARTO_PRETE2_TER').val()+"&hi_PRESENTACION_POD_TER="+ $('#hi_PRESENTACION_POD_TER').val()+"&hi_PRESENTACION_POS_TER="+ $('#hi_PRESENTACION_POS_TER').val()+"&hi_POSICION_TER="+ $('#hi_POSICION_TER').val();
           datos+="&hi_RUPTURA_TER="+ $('#hi_RUPTURA_TER').val()+"&hi_INFECCION_TER="+ $('#hi_INFECCION_TER').val()+"&hi_PLACENTA_PRE_TER="+ $('#hi_PLACENTA_PRE_TER').val()+"&hi_ABRUPTIO_TER="+ $('#hi_ABRUPTIO_TER').val()+"&hi_PRECLAMPSIAECLA_TER="+ $('#hi_PRECLAMPSIAECLA_TER').val();
           datos+="&hi_HERPES_TER="+ $('#hi_HERPES_TER').val()+"&hi_CONDILOMATOSIS_TER="+ $('#hi_CONDILOMATOSIS_TER').val()+"&hi_OTRAS_ENF_TER="+ $('#hi_OTRAS_ENF_TER').val()+"&hi_MUERTE_FET_TER="+ $('#hi_MUERTE_FET_TER').val()+"&hi_MADRE_EXA_TER="+ $('#hi_MADRE_EXA_TER').val();
           datos+="&hi_DIABETES_TER="+ $('#hi_DIABETES_TER').val()+"&hi_VIH_TER="+ $('#hi_VIH_TER').val()+"&hi_OTRAS_TER="+ $('#hi_OTRAS_TER').val()+"&hi_EXTRA_MANU_PLACEN_TER="+ $('#hi_EXTRA_MANU_PLACEN_TER').val()+"&hi_PLACENTA_COMPLETA_TER="+ $('#hi_PLACENTA_COMPLETA_TER').val();
           datos+="&hi_HIPOTOMIA_UTERINA_TER="+ $('#hi_HIPOTOMIA_UTERINA_TER').val()+"&hi_MUERTE_FETAL2_TER="+ $('#hi_MUERTE_FETAL2_TER').val()+"&hi_PARTO_DESCONO_TER="+ $('#hi_PARTO_DESCONO_TER').val();
           
           //*******************************************************************************************//   
           //****************************TABLA MEDICAMENTOS ***********************************************// 
           datos+="&hi_ANESTESIA_LO_MED="+ $('#hi_ANESTESIA_LO_MED').val()+"&hi_ANESTESIA_RE_MED="+ $('#hi_ANESTESIA_RE_MED').val()+"&hi_ANESTESIA_GE_MED="+ $('#hi_ANESTESIA_GE_MED').val()+"&hi_TRANQUIZANTE_MED="+ $('#hi_TRANQUIZANTE_MED').val()+"&hi_OXITOCINA_MED="+ $('#hi_OXITOCINA_MED').val();
           datos+="&hi_ANTIBIOTICO_MED="+ $('#hi_ANTIBIOTICO_MED').val()+"&hi_ANALGESICO_MED="+ $('#hi_ANALGESICO_MED').val()+"&hi_OTRAH_MED="+ $('#hi_OTRAH_MED').val()+"&hi_NINGUNA_MED="+ $('#hi_NINGUNA_MED').val();
           //*******************************************************************************************//   
           //****************************TABLA INSTITUCION ***********************************************// 
           datos+="&hi_INSTITU_INS="+ $('#hi_INSTITU_INS').val()+"&hi_NIVEL_INS="+ $('#hi_NIVEL_INS').val()+"&hi_ATENDIOPAR_INS="+ $('#hi_ATENDIOPAR_INS').val()+"&hi_ATENDIONEO_INS="+ $('#hi_ATENDIONEO_INS').val();
           //*******************************************************************************************//   
           //****************************TABLA RECIEN NACIDO ***********************************************// 
           datos+="&hi_HISTORIA_RECNAC="+ $('#hi_HISTORIA_RECNAC').val()+"&hi_NOMBRE1_RECNAC="+ $('#hi_NOMBRE1_RECNAC').val()+"&hi_NOMBRE2_RECNAC="+ $('#hi_NOMBRE2_RECNAC').val()+"&hi_NOMBRE3_RECNAC="+ $('#hi_NOMBRE3_RECNAC').val()+"&hi_NECREMI_RECNAC="+ $('#hi_NECREMI_RECNAC').val()+"&hi_INSTITU_RECNAC="+ $('#hi_INSTITU_RECNAC').val();           
           //*******************************************************************************************//  
           //****************************TABLA MOVIMIENTO DE REMISION ***********************************************// 
           datos+="&hi_RIESGO_MOVREM="+ $('#hi_RIESGO_MOVREM').val()+"&hi_CESAREA_MOVREM="+ $('#hi_CESAREA_MOVREM').val()+"&hi_PARTO_MOVREM="+ $('#hi_PARTO_MOVREM').val()+"&hi_PATOLOGIA_MOVREM="+ $('#hi_PATOLOGIA_MOVREM').val()+"&hi_DESPROPORCION_MOVREM="+ $('#hi_DESPROPORCION_MOVREM').val();
           datos+="&hi_DISTOCIA_MOVREM="+ $('#hi_DISTOCIA_MOVREM').val()+"&hi_TRABAJO_MOVREM="+ $('#hi_TRABAJO_MOVREM').val()+"&hi_INDUCCION_MOVREM="+ $('#hi_INDUCCION_MOVREM').val()+"&hi_SUFRIMIENTO_MOVREM="+ $('#hi_SUFRIMIENTO_MOVREM').val()+"&hi_RUPTURA_MOVREM="+ $('#hi_RUPTURA_MOVREM').val();
           datos+="&hi_HEMORRAGIA_MOVREM="+ $('#hi_HEMORRAGIA_MOVREM').val()+"&hi_OTROS_MOVREM="+ $('#hi_OTROS_MOVREM').val();      
           datos+="&hi_ID_ANTFAM="+ hi_ID_ANTFAM+"&hi_ID_ANTPER="+ hi_ID_ANTPER+"&hi_ID_ANTGIN="+ hi_ID_ANTGIN+"&hi_ID_HISREP="+ hi_ID_HISREP+"&hi_ID_CONASO="+ hi_ID_CONASO;
           datos+="&hi_ID_EMBACT="+ hi_ID_EMBACT+"&hi_ID_RIEPSI="+ hi_ID_RIEPSI+"&hi_ID_RIEBIO="+ hi_ID_RIEBIO+"&hi_ID_EXAGLI="+ hi_ID_EXAGLI+"&hi_ID_EXACTGO="+ hi_ID_EXACTGO;
           datos+="&hi_ID_PARA="+ hi_ID_PARA+"&hi_ID_PARA2="+ hi_ID_PARA2+"&hi_ID_SULLI="+ hi_ID_SULLI+"&hi_ID_ECO="+ hi_ID_ECO+"&hi_ID_PREE="+ hi_ID_PREE;
           datos+="&hi_ID_EXAMEN="+ hi_ID_EXAMEN+"&hi_ID_MOR_MAT="+ hi_ID_MOR_MAT+"&hi_ID_PRO="+ hi_ID_PRO+"&hi_ID_PAR="+ hi_ID_PAR+"&hi_ID_ORD="+ hi_ID_ORD;
           datos+="&hi_ID_TER="+ hi_ID_TER+"&hi_ID_MED="+ hi_ID_MED+"&hi_ID_INS="+ hi_ID_INS+"&hi_ID_RECNAC="+ hi_ID_RECNAC+"&hi_ID_MOVREM="+ hi_ID_MOVREM+"&hi_ID_MAT_PER="+hi_ID_MAT_PER;
           //*******************************************************************************************//  
           if(confirm("¿DESEA ELIMINAR LOS DATOS?")){
               $.enviar1("POST","../gestionar_materno_per",datos,"DATOS ELIMINADOS DE MANERA EXITOSA...","../ges_materno_per");
           }    
           ////////////////////////////////////////////////////////////////          
       }, 500);    
    });    
    
    //********************DIAGNOSTICOS************************//
    $('#abrir_vendiagnostico').live('click', function(){
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

            $('#txtcoddx').val(cadena[0]);
            $('#txtdesdx').val(cadena[1]);   

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
    
    $('#btn_add3').live('click', function(){
        resul=$.validatxt('#hi_FECHA_EVOLUCION','Por Favor Seleccione La Fecha..');
        if(resul=="1"){return;}           
        if($('#thora222').val() == ""){
            if($("#comhora11").val()=="0"){
                alert('Por Favor Seleccione La Hora..');
                $('#thora222').focus();
                return;
            }                      
        }    
        if($("#commin11").val()=="0"){
            alert('Por Favor Seleccione Los Minutos..');
            $('#thora222').focus();
            return;
        }      
        resul=$.validatxt('#hi_DX_EVOLUCION','Por Favor Digite El Diagnostico..');
        if(resul=="1"){return;}   
        hi_FECHA_EVOLUCION=$('#hi_FECHA_EVOLUCION').val();
        hi_HORA_EVOLUCION=$('#thora222').val();
        hi_DX_EVOLUCION=$('#hi_DX_EVOLUCION').val();
        $.agrediag(hi_FECHA_EVOLUCION,hi_HORA_EVOLUCION,hi_DX_EVOLUCION);
        $.limpiar1();        
    });    
    $('.remover2').live('click', function(e){
        e.preventDefault(e);
        var fila = $(this).attr('fila'); 
        $("tr.fila"+fila).remove();         
        cuan=cuan-1;cn=cn-1;
        if(cuan==0){vac=1;}
    });	
    
    $('#verevolu').live('click', function(){        
        $("body").css("overflow", "hidden");
        $('#conte').css("display",'none');
        $('#ver_evo').fadeIn(500);
        //$('#oscuro').css('visibility','visible');
        $('#txtfechaevo').val("");
        $('#txthoraevo').val("");
        $('#txtdxevo').val("");
        var hi_FECHA_EVOLUCION = $(this).attr('hi_FECHA_EVOLUCION'); 
        var hi_HORA_EVOLUCION = $(this).attr('hi_HORA_EVOLUCION'); 
        var hi_DX_EVOLUCION = $(this).attr('hi_DX_EVOLUCION'); 
        $('#txtfechaevo').val(hi_FECHA_EVOLUCION);
        $('#txthoraevo').val(hi_HORA_EVOLUCION);
        $('#txtdxevo').val(hi_DX_EVOLUCION);
    });
    $('#cer_venevo').live('click', function(){
        $('#conte').css("display",'block');
        $('#ver_evo').fadeOut(500);
        $('#oscuro').css('visibility','hidden');
        $("body").css("overflow", "auto"); 
    });   
    $('#ver_evo').live('mouseout',function(){ 
        $('#oscuro').live("click",function(){ 
            //$('#oscuro').css('visibility','hidden');
            $('#ver_evo').fadeOut('slow'); 
            $('#conte').css("display",'block');
            $("body").css("overflow", "auto"); 
        });
        return false; // Para evitar el efecto de burbujeo                
    });     
    //****************************************************************//
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

