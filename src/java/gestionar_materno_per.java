
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.*;
import javax.servlet.http.HttpSession;

/**
 *
 * @author carlosmario
 */
public class gestionar_materno_per extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        
            //////////////////////////VARIABLES DE CONEXION////////////////////////
            
            Conexion conect= new Conexion();
            Connection conex=conect.getConnection();
            HttpSession session= request.getSession(true);
            HttpSession sa= request.getSession(true);
            String usuario= (String) session.getAttribute("USUARIO");            
            String nombreusu = (String) session.getAttribute("NOMBRES");
            String apellidousu = (String) session.getAttribute("APELLIDOS");
            String firma=nombreusu + " " + apellidousu;
            //////////////////////////////////////////////////////////////////////
            //////////////////////INICIALIZAR VARIABLES///////////////////////////
            
            String sql="";
            String opcion="";        
        try {
            if(usuario==null){                
                usuario="";
                out.println("<script>alert('Su Sesion Ha Terminado. Inicie Sesion Nuevamente'); location.href='../index.jsp'</script>");
            }else{
                opcion=request.getParameter("opcion");   
                //*************************RECIBIR VARIABLES************************************//
                //*************************RECIBIR MATERNO PERINATAL************************************//
                String  hi_FECHA_MAT_PER = request.getParameter("hi_FECHA_MAT_PER");
                String  hi_ESTADO_MAT_PER = request.getParameter("hi_ESTADO_MAT_PER");        
                String  id_paciente = request.getParameter("id_paciente");
                String  ident_paciente = request.getParameter("ident_paciente");                  
                //******************************************************************************//
                //*************************RECIBIR ANTECEDENTES FAMILIARES************************************//
                String  hi_HTA_CRONICA_ANTFAM = request.getParameter("hi_HTA_CRONICA_ANTFAM");
                String  hi_PREECLAMPSIA1_ANTFAM = request.getParameter("hi_PREECLAMPSIA1_ANTFAM");
                String  hi_DIABETES1_ANTFAM = request.getParameter("hi_DIABETES1_ANTFAM");
                String  hi_ECLAMPSIA1_ANTFAM = request.getParameter("hi_ECLAMPSIA1_ANTFAM");
                String  hi_GEMELARES_ANTFAM = request.getParameter("hi_GEMELARES_ANTFAM");
                String  hi_CARDIOPATIA_ANTFAM = request.getParameter("hi_CARDIOPATIA_ANTFAM");
                String  hi_TBC_ANTFAM = request.getParameter("hi_TBC_ANTFAM");
                String  hi_METABOLICOS_ANTFAM = request.getParameter("hi_METABOLICOS_ANTFAM");
                String  hi_AUTOINMUNES_ANTFAM = request.getParameter("hi_AUTOINMUNES_ANTFAM");
                String  hi_INFECCIOSAS_ANTFAM = request.getParameter("hi_INFECCIOSAS_ANTFAM");
                String  hi_CONGENITAS_ANTFAM = request.getParameter("hi_CONGENITAS_ANTFAM");
                String  hi_NEOPLASIAS_ANTFAM = request.getParameter("hi_NEOPLASIAS_ANTFAM");
                String  hi_EPILEPSIA_ANTFAM = request.getParameter("hi_EPILEPSIA_ANTFAM");
                String  hi_OTROS1_ANTFAM = request.getParameter("hi_OTROS1_ANTFAM");
                String  hi_CUAL1_ANTFAM = request.getParameter("hi_CUAL1_ANTFAM");
                //******************************************************************************//
                //*************************RECIBIR ANTECEDENTES PERSONALES************************************//
                String  hi_TUBERCULOSIS_ANTPER = request.getParameter("hi_TUBERCULOSIS_ANTPER");
                String  hi_DIABETES2_ANTPER = request.getParameter("hi_DIABETES2_ANTPER");
                String  hi_DIABETES_GES_ANTPER = request.getParameter("hi_DIABETES_GES_ANTPER");
                String  hi_HTA_CRONICA2_ANTPER = request.getParameter("hi_HTA_CRONICA2_ANTPER");
                String  hi_CIRUGIAPELUTE_ANTPER = request.getParameter("hi_CIRUGIAPELUTE_ANTPER");
                String  hi_PREECLAMPSIA2_ANTPER = request.getParameter("hi_PREECLAMPSIA2_ANTPER");
                String  hi_ECLAMPSIA2_ANTPER = request.getParameter("hi_ECLAMPSIA2_ANTPER");
                String  hi_ALERGICOS_ANTPER = request.getParameter("hi_ALERGICOS_ANTPER");
                String  hi_TABAQUISMO_ANTPER = request.getParameter("hi_TABAQUISMO_ANTPER");
                String  hi_ALCOHOLISMO_ANTPER = request.getParameter("hi_ALCOHOLISMO_ANTPER");
                String  hi_ANTITETANICA_ANTPER = request.getParameter("hi_ANTITETANICA_ANTPER");
                String  hi_MMR_ANTPER = request.getParameter("hi_MMR_ANTPER");
                String  hi_ENFERMEDAD_MEN_ANTPER = request.getParameter("hi_ENFERMEDAD_MEN_ANTPER");
                String  hi_ACTIVIDAD_FIS_ANTPER = request.getParameter("hi_ACTIVIDAD_FIS_ANTPER");
                String  hi_VICTIMA_MAL_ANTPER = request.getParameter("hi_VICTIMA_MAL_ANTPER");
                String  hi_OTROS2_ANTPER = request.getParameter("hi_OTROS2_ANTPER");
                String  hi_CUAL2_ANTPER = request.getParameter("hi_CUAL2_ANTPER");
                //******************************************************************************//
                //*************************RECIBIR ANTECEDENTES GINECOLOGICOS************************************//
                String  hi_MENARQUIA_ANTGIN = request.getParameter("hi_MENARQUIA_ANTGIN");
                String  hi_G_ANTGIN = request.getParameter("hi_G_ANTGIN");
                String  hi_P_ANTGIN = request.getParameter("hi_P_ANTGIN");
                String  hi_C_ANTGIN = request.getParameter("hi_C_ANTGIN");
                String  hi_A_ANTGIN = request.getParameter("hi_A_ANTGIN");
                String  hi_E_ANTGIN = request.getParameter("hi_E_ANTGIN");
                String  hi_V_ANTGIN = request.getParameter("hi_V_ANTGIN");
                String  hi_M_ANTGIN = request.getParameter("hi_M_ANTGIN");
                String  hi_CICLOS_ANTGIN = request.getParameter("hi_CICLOS_ANTGIN");
                String  hi_PLANIFICACION_FAM_ANTGIN = request.getParameter("hi_PLANIFICACION_FAM_ANTGIN");
                String  hi_FLUJO_VAG_ANTGIN = request.getParameter("hi_FLUJO_VAG_ANTGIN");
                String  hi_ITS_ANTGIN = request.getParameter("hi_ITS_ANTGIN");
                String  hi_CITOLOGIA_ULT_ANTGIN = request.getParameter("hi_CITOLOGIA_ULT_ANTGIN");
                String  hi_COLCOPSCOPIA_ANTGIN = request.getParameter("hi_COLCOPSCOPIA_ANTGIN");
                String  hi_PERIODO_INTER_ANTGIN = request.getParameter("hi_PERIODO_INTER_ANTGIN");
                String  hi_INFERTILIDAD_ANTGIN = request.getParameter("hi_INFERTILIDAD_ANTGIN");
                String  hi_TTOS_INFER_ANTGIN = request.getParameter("hi_TTOS_INFER_ANTGIN");
                String  hi_RPM_ANTGIN = request.getParameter("hi_RPM_ANTGIN");
                String  hi_RCIU_ANTGIN = request.getParameter("hi_RCIU_ANTGIN");
                String  hi_APP_ANTGIN = request.getParameter("hi_APP_ANTGIN");
                String  hi_PARTO_PREM_ANTGIN = request.getParameter("hi_PARTO_PREM_ANTGIN");
                String  hi_GEMELAR_ANTGIN = request.getParameter("hi_GEMELAR_ANTGIN");
                String  hi_MALFORMACIONES_ANTGIN = request.getParameter("hi_MALFORMACIONES_ANTGIN");
                String  hi_POLIHIDRAMNIOS_ANTGIN = request.getParameter("hi_POLIHIDRAMNIOS_ANTGIN");
                String  hi_OLIGOHIDRAMNIOS_ANTGIN = request.getParameter("hi_OLIGOHIDRAMNIOS_ANTGIN");
                String  hi_EMB_PROLONGADO_ANTGIN = request.getParameter("hi_EMB_PROLONGADO_ANTGIN");
                String  hi_AMENAZA_ABO_ANTGIN = request.getParameter("hi_AMENAZA_ABO_ANTGIN");
                String  hi_OTROS3_ANTGIN = request.getParameter("hi_OTROS3_ANTGIN");
                String  hi_CUAL3_ANTGIN = request.getParameter("hi_CUAL3_ANTGIN");
                String  hi_CUALITS_ANTGIN = request.getParameter("hi_CUALITS_ANTGIN");
                //***********************************************************************************************//
                //*************************RECIBIR HISTORIA REPRODUCTIVA*****************************************//
                String  hi_EDAD_HISREP = request.getParameter("hi_EDAD_HISREP");
                String  hi_PARIDAD_HISREP = request.getParameter("hi_PARIDAD_HISREP");
                String  hi_ABORTO_HABIT_HISREP = request.getParameter("hi_ABORTO_HABIT_HISREP");
                String  hi_RETENCION_PLA_HISREP = request.getParameter("hi_RETENCION_PLA_HISREP");
                String  hi_REC_NACIDO1_HISREP = request.getParameter("hi_REC_NACIDO1_HISREP");
                String  hi_REC_NACIDO2_HISREP = request.getParameter("hi_REC_NACIDO2_HISREP");
                String  hi_HTA_INDUCIDO_HISREP = request.getParameter("hi_HTA_INDUCIDO_HISREP");
                String  hi_EMB_GEMEL_CES_HISREP = request.getParameter("hi_EMB_GEMEL_CES_HISREP");
                String  hi_MORTINATO_HISREP = request.getParameter("hi_MORTINATO_HISREP");
                String  hi_TP_PROLON_HISREP = request.getParameter("hi_TP_PROLON_HISREP");
                //***********************************************************************************************//
                //*************************RECIBIR CONDICIONES ASOCIADAS*****************************************//
                String  hi_QX_GINECOLOGIAS1_CONASO = request.getParameter("hi_QX_GINECOLOGIAS1_CONASO");
                String  hi_ENF_RENS1_CONASO = request.getParameter("hi_ENF_RENS1_CONASO");
                String  hi_DIABETES_GESS1_CONASO = request.getParameter("hi_DIABETES_GESS1_CONASO");
                String  hi_DIABETES_MELLIS1_CONASO = request.getParameter("hi_DIABETES_MELLIS1_CONASO");
                String  hi_ENF_CARDIACAS1_CONASO = request.getParameter("hi_ENF_CARDIACAS1_CONASO");
                String  hi_ENF_INFAGUDAS1_CONASO = request.getParameter("hi_ENF_INFAGUDAS1_CONASO");
                String  hi_ENF_AUTOINMUNES1_CONASO = request.getParameter("hi_ENF_AUTOINMUNES1_CONASO");
                String  hi_ANEMIA_HBS1_CONASO = request.getParameter("hi_ANEMIA_HBS1_CONASO");
                String  hi_QX_GINECOLOGIAS2_CONASO = request.getParameter("hi_QX_GINECOLOGIAS2_CONASO");
                String  hi_ENF_RENS2_CONASO = request.getParameter("hi_ENF_RENS2_CONASO");
                String  hi_DIABETES_GESS2_CONASO = request.getParameter("hi_DIABETES_GESS2_CONASO");
                String  hi_DIABETES_MELLIS2_CONASO = request.getParameter("hi_DIABETES_MELLIS2_CONASO");
                String  hi_ENF_CARDIACAS2_CONASO = request.getParameter("hi_ENF_CARDIACAS2_CONASO");
                String  hi_ENF_INFAGUDAS2_CONASO = request.getParameter("hi_ENF_INFAGUDAS2_CONASO");
                String  hi_ENF_AUTOINMUNES2_CONASO = request.getParameter("hi_ENF_AUTOINMUNES2_CONASO");
                String  hi_ANEMIA_HBS2_CONASO = request.getParameter("hi_ANEMIA_HBS2_CONASO");
                String  hi_QX_GINECOLOGIAS3_CONASO = request.getParameter("hi_QX_GINECOLOGIAS3_CONASO");
                String  hi_ENF_RENS3_CONASO = request.getParameter("hi_ENF_RENS3_CONASO");
                String  hi_DIABETES_GESS3_CONASO = request.getParameter("hi_DIABETES_GESS3_CONASO");
                String  hi_DIABETES_MELLIS3_CONASO = request.getParameter("hi_DIABETES_MELLIS3_CONASO");
                String  hi_ENF_CARDIACAS3_CONASO = request.getParameter("hi_ENF_CARDIACAS3_CONASO");
                String  hi_ENF_INFAGUDAS3_CONASO = request.getParameter("hi_ENF_INFAGUDAS3_CONASO");
                String  hi_ENF_AUTOINMUNES3_CONASO = request.getParameter("hi_ENF_AUTOINMUNES3_CONASO");
                String  hi_ANEMIA_HBS3_CONASO = request.getParameter("hi_ANEMIA_HBS3_CONASO");
                //***********************************************************************************************//
                //*************************RECIBIR EMBARAZO ACTUAL***********************************************//
                String  hi_HEMORRAGIAS1_MAL_EMBACT = request.getParameter("hi_HEMORRAGIAS1_MAL_EMBACT");
                String  hi_VAGINAS1_MAL_EMBACT = request.getParameter("hi_VAGINAS1_MAL_EMBACT");
                String  hi_E_PROLONGADOS1_MAL_EMBACT = request.getParameter("hi_E_PROLONGADOS1_MAL_EMBACT");
                String  hi_HTAS1_MAL_EMBACT = request.getParameter("hi_HTAS1_MAL_EMBACT");
                String  hi_RPMS1_MAL_EMBACT = request.getParameter("hi_RPMS1_MAL_EMBACT");
                String  hi_POLIHRIDAMNIOSS1_MAL_EMBACT = request.getParameter("hi_POLIHRIDAMNIOSS1_MAL_EMBACT");
                String  hi_RCIUS1_MAL_EMBACT = request.getParameter("hi_RCIUS1_MAL_EMBACT");
                String  hi_EMB_MULTIPLES1_MAL_EMBACT = request.getParameter("hi_EMB_MULTIPLES1_MAL_EMBACT");
                String  hi_MALA_PRESENTS1_MAL_EMBACT = request.getParameter("hi_MALA_PRESENTS1_MAL_EMBACT");
                String  hi_ISOS1_MAL_EMBACT = request.getParameter("hi_ISOS1_MAL_EMBACT");
                String  hi_HEMORRAGIAS2_MAL_EMBACT = request.getParameter("hi_HEMORRAGIAS2_MAL_EMBACT");
                String  hi_VAGINAS2_MAL_EMBACT = request.getParameter("hi_VAGINAS2_MAL_EMBACT");
                String  hi_E_PROLONGADOS2_MAL_EMBACT = request.getParameter("hi_E_PROLONGADOS2_MAL_EMBACT");
                String  hi_HTAS2_MAL_EMBACT = request.getParameter("hi_HTAS2_MAL_EMBACT");
                String  hi_RPMS2_MAL_EMBACT = request.getParameter("hi_RPMS2_MAL_EMBACT");
                String  hi_POLIHRIDAMNIOSS2_MAL_EMBACT = request.getParameter("hi_POLIHRIDAMNIOSS2_MAL_EMBACT");
                String  hi_RCIUS2_MAL_EMBACT = request.getParameter("hi_RCIUS2_MAL_EMBACT");
                String  hi_EMB_MULTIPLES2_MAL_EMBACT = request.getParameter("hi_EMB_MULTIPLES2_MAL_EMBACT");
                String  hi_MALA_PRESENTS2_MAL_EMBACT = request.getParameter("hi_MALA_PRESENTS2_MAL_EMBACT");
                String  hi_ISOS2_MAL_EMBACT = request.getParameter("hi_ISOS2_MAL_EMBACT");
                String  hi_HEMORRAGIAS3_MAL_EMBACT = request.getParameter("hi_HEMORRAGIAS3_MAL_EMBACT");                
                String  hi_VAGINAS3_MAL_EMBACT = request.getParameter("hi_VAGINAS3_MAL_EMBACT");
                String  hi_E_PROLONGADOS3_MAL_EMBACT = request.getParameter("hi_E_PROLONGADOS3_MAL_EMBACT");
                String  hi_HTAS3_MAL_EMBACT = request.getParameter("hi_HTAS3_MAL_EMBACT");
                String  hi_RPMS3_MAL_EMBACT = request.getParameter("hi_RPMS3_MAL_EMBACT");
                String  hi_POLIHRIDAMNIOSS3_MAL_EMBACT = request.getParameter("hi_POLIHRIDAMNIOSS3_MAL_EMBACT");
                String  hi_RCIUS3_MAL_EMBACT = request.getParameter("hi_RCIUS3_MAL_EMBACT");
                String  hi_EMB_MULTIPLES3_MAL_EMBACT = request.getParameter("hi_EMB_MULTIPLES3_MAL_EMBACT");
                String  hi_MALA_PRESENTS3_MAL_EMBACT = request.getParameter("hi_MALA_PRESENTS3_MAL_EMBACT");
                String  hi_ISOS3_MAL_EMBACT = request.getParameter("hi_ISOS3_MAL_EMBACT");
                String  hi_INMUNIZACION_RH_MAL_EMBACT = request.getParameter("hi_INMUNIZACION_RH_MAL_EMBACT");                
                //***********************************************************************************************//
                //*************************RECIBIR RIESGO PSICOSOCIAL***********************************************//
                String  hi_TENSION_EMO_RIEPSI = request.getParameter("hi_TENSION_EMO_RIEPSI");
                String  hi_HUMOR_DEPRE_RIEPSI = request.getParameter("hi_HUMOR_DEPRE_RIEPSI");
                String  hi_SINT_NEURO_RIEPSI = request.getParameter("hi_SINT_NEURO_RIEPSI");
                String  hi_SOP_FAM_TIEM_RIEPSI = request.getParameter("hi_SOP_FAM_TIEM_RIEPSI");
                String  hi_SOP_FAM_ESPA_RIEPSI = request.getParameter("hi_SOP_FAM_ESPA_RIEPSI");
                String  hi_SOP_FAM_DIN_RIEPSI = request.getParameter("hi_SOP_FAM_DIN_RIEPSI");
                String  hi_ES_VICTIMA_MAL_RIEPSI = request.getParameter("hi_ES_VICTIMA_MAL_RIEPSI");
                String  hi_CUAL4_RIEPSI = request.getParameter("hi_CUAL4_RIEPSI");
                String  hi_PARENTESCO_MAL_RIEPSI = request.getParameter("hi_PARENTESCO_MAL_RIEPSI");
                //***********************************************************************************************//
                //*************************RECIBIR RIESGO BIOPSICOSOCIAL***********************************************//
                String hi_TOTALS1_RIEBIO=request.getParameter("hi_TOTALS1_RIEBIO");
                String hi_TOTALS2_RIEBIO=request.getParameter("hi_TOTALS2_RIEBIO");
                String hi_TOTALS3_RIEBIO=request.getParameter("hi_TOTALS3_RIEBIO");
                //**************************************************************************************************//
                //*************************RECIBIR EXAMENES 1***********************************************//
                String hi_GLICEMIA_AYU_EXAGLI=request.getParameter("hi_GLICEMIA_AYU_EXAGLI");
                String hi_2GLICEMIA_EXAGLI=request.getParameter("hi_2GLICEMIA_EXAGLI");
                String hi_FECHA_REALIZA_EXAGLI=request.getParameter("hi_FECHA_REALIZA_EXAGLI");
                if(hi_FECHA_REALIZA_EXAGLI.equals("")){hi_FECHA_REALIZA_EXAGLI="0001-01-01";}    
                String hi_GRUPO_EXAGLI=request.getParameter("hi_GRUPO_EXAGLI");
                String hi_RH_EXAGLI=request.getParameter("hi_RH_EXAGLI");
                //**************************************************************************************************//
                //*************************RECIBIR EXAMENES GLICEMIA***********************************************//
                String hi_CTGO_EXACTGO=request.getParameter("hi_CTGO_EXACTGO");
                String hi_GLICEMIA_PRIMERA_EXACTGO=request.getParameter("hi_GLICEMIA_PRIMERA_EXACTGO");
                String hi_FECHA_GLICE_PRI_EXACTGO=request.getParameter("hi_FECHA_GLICE_PRI_EXACTGO");
                if(hi_FECHA_GLICE_PRI_EXACTGO.equals("")){hi_FECHA_GLICE_PRI_EXACTGO="0001-01-01";}                
                String hi_GLICEMIA_SEGUNDA_EXACTGO=request.getParameter("hi_GLICEMIA_SEGUNDA_EXACTGO");
                String hi_FECHA_GLICE_SEG_EXACTGO=request.getParameter("hi_FECHA_GLICE_SEG_EXACTGO");
                if(hi_FECHA_GLICE_SEG_EXACTGO.equals("")){hi_FECHA_GLICE_SEG_EXACTGO="0001-01-01";}  
                String hi_CURVA_GLICE_EXACTGO=request.getParameter("hi_CURVA_GLICE_EXACTGO");
                //**************************************************************************************************//
                //*************************RECIBIR PARACLINICOS 1***********************************************//
                String hi_HBANT_PARA=request.getParameter("hi_HBANT_PARA");
                String hi_HCTOANT_PARA=request.getParameter("hi_HCTOANT_PARA");
                String hi_VDRLANT_PARA=request.getParameter("hi_VDRLANT_PARA");
                String hi_FROTIS_VAGANT_PARA=request.getParameter("hi_FROTIS_VAGANT_PARA");
                String hi_PARCIALANT_PARA=request.getParameter("hi_PARCIALANT_PARA");
                String hi_GRAMORINAANT_PARA=request.getParameter("hi_GRAMORINAANT_PARA");
                String hi_BACTANT_PARA=request.getParameter("hi_BACTANT_PARA");
                String hi_HB1TRI_PARA=request.getParameter("hi_HB1TRI_PARA");
                String hi_HCTO1TRI_PARA=request.getParameter("hi_HCTO1TRI_PARA");
                String hi_VDRL1TRI_PARA=request.getParameter("hi_VDRL1TRI_PARA");
                String hi_FROTIS_VAG1TRI_PARA=request.getParameter("hi_FROTIS_VAG1TRI_PARA");
                String hi_PARCIAL1TRI_PARA=request.getParameter("hi_PARCIAL1TRI_PARA");
                String hi_GRAMORINA1TRI_PARA=request.getParameter("hi_GRAMORINA1TRI_PARA");
                String hi_BACT1TRI_PARA=request.getParameter("hi_BACT1TRI_PARA");
                String hi_HB2TRI_PARA=request.getParameter("hi_HB2TRI_PARA");
                String hi_HCTO2TRI_PARA=request.getParameter("hi_HCTO2TRI_PARA");
                String hi_VDRL2TRI_PARA=request.getParameter("hi_VDRL2TRI_PARA");
                String hi_FROTIS_VAG2TRI_PARA=request.getParameter("hi_FROTIS_VAG2TRI_PARA");
                String hi_PARCIAL2TRI_PARA=request.getParameter("hi_PARCIAL2TRI_PARA");
                String hi_GRAMORINA2TRI_PARA=request.getParameter("hi_GRAMORINA2TRI_PARA");
                String hi_BACT2TRI_PARA=request.getParameter("hi_BACT2TRI_PARA");
                String hi_HB3TRI_PARA=request.getParameter("hi_HB3TRI_PARA");
                String hi_HCTO3TRI_PARA=request.getParameter("hi_HCTO3TRI_PARA");
                String hi_VDRL3TRI_PARA=request.getParameter("hi_VDRL3TRI_PARA");
                String hi_FROTIS_VAG3TRI_PARA=request.getParameter("hi_FROTIS_VAG3TRI_PARA");
                String hi_PARCIAL3TRI_PARA=request.getParameter("hi_PARCIAL3TRI_PARA");
                String hi_GRAMORINA3TRI_PARA=request.getParameter("hi_GRAMORINA3TRI_PARA");
                String hi_BACT3TRI_PARA=request.getParameter("hi_BACT3TRI_PARA");
                //**************************************************************************************************//
                //*************************RECIBIR PARACLINICOS 2***********************************************//
                String hi_UROCULTIVOANT_PARA2=request.getParameter("hi_UROCULTIVOANT_PARA2");
                String hi_FTAABSANT_PARA2=request.getParameter("hi_FTAABSANT_PARA2");
                String hi_HEPATITISBANT_PARA2=request.getParameter("hi_HEPATITISBANT_PARA2");
                String hi_ANTITETANICAANT_PARA2=request.getParameter("hi_ANTITETANICAANT_PARA2");
                String hi_HIVANT_PARA2=request.getParameter("hi_HIVANT_PARA2");
                String hi_CITOLOGIA_CERANT_PARA2=request.getParameter("hi_CITOLOGIA_CERANT_PARA2");
                String hi_UROCULTIVO1TRI_PARA2=request.getParameter("hi_UROCULTIVO1TRI_PARA2");
                String hi_FTAABS1TRI_PARA2=request.getParameter("hi_FTAABS1TRI_PARA2");
                String hi_HEPATITISB1TRI_PARA2=request.getParameter("hi_HEPATITISB1TRI_PARA2");
                String hi_ANTITETANICA1TRI_PARA2=request.getParameter("hi_ANTITETANICA1TRI_PARA2");
                String hi_HIV1TRI_PARA2=request.getParameter("hi_HIV1TRI_PARA2");
                String hi_CITOLOGIA_CER1TRI_PARA2=request.getParameter("hi_CITOLOGIA_CER1TRI_PARA2");
                String hi_UROCULTIVO2TRI_PARA2=request.getParameter("hi_UROCULTIVO2TRI_PARA2");
                String hi_FTAABS2TRI_PARA2=request.getParameter("hi_FTAABS2TRI_PARA2");
                String hi_HEPATITISB2TRI_PARA2=request.getParameter("hi_HEPATITISB2TRI_PARA2");
                String hi_ANTITETANICA2TRI_PARA2=request.getParameter("hi_ANTITETANICA2TRI_PARA2");
                String hi_HIV2TRI_PARA2=request.getParameter("hi_HIV2TRI_PARA2");
                String hi_CITOLOGIA_CER2TRI_PARA2=request.getParameter("hi_CITOLOGIA_CER2TRI_PARA2");
                String hi_UROCULTIVO3TRI_PARA2=request.getParameter("hi_UROCULTIVO3TRI_PARA2");
                String hi_FTAABS3TRI_PARA2=request.getParameter("hi_FTAABS3TRI_PARA2");
                String hi_HEPATITISB3TRI_PARA2=request.getParameter("hi_HEPATITISB3TRI_PARA2");
                String hi_ANTITETANICA3TRI_PARA2=request.getParameter("hi_ANTITETANICA3TRI_PARA2");
                String hi_HIV3TRI_PARA2=request.getParameter("hi_HIV3TRI_PARA2");
                String hi_CITOLOGIA_CER3TRI_PARA2=request.getParameter("hi_CITOLOGIA_CER3TRI_PARA2");
                //**************************************************************************************************//
                //*************************RECIBIR O SULLIVAN***********************************************//
                
                String hi_GLISEMIA_PRE_SULLI=request.getParameter("hi_GLISEMIA_PRE_SULLI");
                String hi_GLICEMIA_POST_SULLI=request.getParameter("hi_GLICEMIA_POST_SULLI");
                String hi_FECHA_RESULTADO_SULLI=request.getParameter("hi_FECHA_RESULTADO_SULLI");
                String hi_S16_SULLI=request.getParameter("hi_S16_SULLI");
                String hi_S20_SULLI=request.getParameter("hi_S20_SULLI");
                String hi_S24_SULLI=request.getParameter("hi_S24_SULLI");
                String hi_S28_SULLI=request.getParameter("hi_S28_SULLI");
                String hi_S32_SULLI=request.getParameter("hi_S32_SULLI");
                String hi_S36_SULLI=request.getParameter("hi_S36_SULLI");
                String hi_FECHAS16_SULLI=request.getParameter("hi_FECHAS16_SULLI");
                String hi_FECHAS20_SULLI=request.getParameter("hi_FECHAS20_SULLI");
                String hi_FECHAS24_SULLI=request.getParameter("hi_FECHAS24_SULLI");
                String hi_FECHAS28_SULLI=request.getParameter("hi_FECHAS28_SULLI");
                String hi_FECHAS32_SULLI=request.getParameter("hi_FECHAS32_SULLI");
                String hi_FECHAS36_SULLI=request.getParameter("hi_FECHAS36_SULLI");
                String hi_ROLLOVERTEXT_SULLI=request.getParameter("hi_ROLLOVERTEXT_SULLI");
                if(hi_FECHAS16_SULLI.equals("")){hi_FECHAS16_SULLI="0001-01-01";}
                if(hi_FECHAS20_SULLI.equals("")){hi_FECHAS20_SULLI="0001-01-01";}
                if(hi_FECHAS24_SULLI.equals("")){hi_FECHAS24_SULLI="0001-01-01";}
                if(hi_FECHAS28_SULLI.equals("")){hi_FECHAS28_SULLI="0001-01-01";}
                if(hi_FECHAS32_SULLI.equals("")){hi_FECHAS32_SULLI="0001-01-01";}
                if(hi_FECHAS36_SULLI.equals("")){hi_FECHAS36_SULLI="0001-01-01";}
                //**************************************************************************************************//
                //*************************RECIBIR ECO***********************************************//
                String hi_EDAD_GEST1C_ECO=request.getParameter("hi_EDAD_GEST1C_ECO");
                String hi_GESTACIONALAMENO1C_ECO=request.getParameter("hi_GESTACIONALAMENO1C_ECO");
                String hi_PRESENCIA_HEMA1C_ECO=request.getParameter("hi_PRESENCIA_HEMA1C_ECO");
                String hi_OTROS_MARCADORES1C_ECO=request.getParameter("hi_OTROS_MARCADORES1C_ECO");
                String hi_SONOLUCENCIAS1C_ECO=request.getParameter("hi_SONOLUCENCIAS1C_ECO");
                String hi_OBSERVACIONES1C_ECO=request.getParameter("hi_OBSERVACIONES1C_ECO");
                String hi_EDAD_GEST1TRI_ECO=request.getParameter("hi_EDAD_GEST1TRI_ECO");
                String hi_GESTACIONALAMENO1TRI_ECO=request.getParameter("hi_GESTACIONALAMENO1TRI_ECO");
                String hi_PRESENCIA_HEMA1TRI_ECO=request.getParameter("hi_PRESENCIA_HEMA1TRI_ECO");
                String hi_OTROS_MARCADORES1TRI_ECO=request.getParameter("hi_OTROS_MARCADORES1TRI_ECO");
                String hi_SONOLUCENCIAS1TRI_ECO=request.getParameter("hi_SONOLUCENCIAS1TRI_ECO");
                String hi_OBSERVACIONES1TRI_ECO=request.getParameter("hi_OBSERVACIONES1TRI_ECO");
                String hi_NORMA2TRI_ECO=request.getParameter("hi_NORMA2TRI_ECO");
                String hi_POLIHRIDAMNIOS2TRI_ECO=request.getParameter("hi_POLIHRIDAMNIOS2TRI_ECO");
                String hi_RCIU2TRI_ECO=request.getParameter("hi_RCIU2TRI_ECO");
                String hi_OLIGOHIDRAMNIOS2TRI_ECO=request.getParameter("hi_OLIGOHIDRAMNIOS2TRI_ECO");
                String hi_MACROSOMIA2TRI_ECO=request.getParameter("hi_MACROSOMIA2TRI_ECO");
                String hi_MALFORMACION2TRI_ECO=request.getParameter("hi_MALFORMACION2TRI_ECO");
                String hi_OTRAS_ANO2TRI_ECO=request.getParameter("hi_OTRAS_ANO2TRI_ECO");
                String hi_OBSERVA2TRI_ECO=request.getParameter("hi_OBSERVA2TRI_ECO");
                String hi_NORMA3TRI_ECO=request.getParameter("hi_NORMA3TRI_ECO");
                String hi_POLIHRIDAMNIOS3TRI_ECO=request.getParameter("hi_POLIHRIDAMNIOS3TRI_ECO");
                String hi_RCIU3TRI_ECO=request.getParameter("hi_RCIU3TRI_ECO");
                String hi_OLIGOHIDRAMNIOS3TRI_ECO=request.getParameter("hi_OLIGOHIDRAMNIOS3TRI_ECO");
                String hi_MACROSOMIA3TRI_ECO=request.getParameter("hi_MACROSOMIA3TRI_ECO");
                String hi_MALFORMACION3TRI_ECO=request.getParameter("hi_MALFORMACION3TRI_ECO");
                String hi_OTRAS_ANO3TRI_ECO=request.getParameter("hi_OTRAS_ANO3TRI_ECO");
                String hi_OBSERVA3TRI_ECO=request.getParameter("hi_OBSERVA3TRI_ECO");
                //**************************************************************************************************//
                //*************************RECIBIR MORBILIDADES TRAZADORAS***********************************************//
                String hi_SIN_RIESGO_PREE=request.getParameter("hi_SIN_RIESGO_PREE");
                String hi_CON_RIESGO_SIN_PREE=request.getParameter("hi_CON_RIESGO_SIN_PREE");
                String hi_CON_RIESGO_UTI_PREE=request.getParameter("hi_CON_RIESGO_UTI_PREE");
                String hi_CON_RIESGO_BIO1_PREE=request.getParameter("hi_CON_RIESGO_BIO1_PREE");
                String hi_CON_RIESGO_BIO2_PREE=request.getParameter("hi_CON_RIESGO_BIO2_PREE");
                String hi_CON_RIESGO_CAL_PREE=request.getParameter("hi_CON_RIESGO_CAL_PREE");
                String hi_CON_RIESGO_NUTRI_PREE=request.getParameter("hi_CON_RIESGO_NUTRI_PREE");
                //**************************************************************************************************//
                //*************************************RECIBIR EXAMEN***********************************************//
                String hi_PARTO_PRESIN_EXAMEN=request.getParameter("hi_PARTO_PRESIN_EXAMEN");
                String hi_DIABETESSIN_EXAMEN=request.getParameter("hi_DIABETESSIN_EXAMEN");
                String hi_BAJOSIN_EXAMEN=request.getParameter("hi_BAJOSIN_EXAMEN");
                String hi_RIESGOSIN_EXAMEN=request.getParameter("hi_RIESGOSIN_EXAMEN");
                String hi_HPPSIN_EXAMEN=request.getParameter("hi_HPPSIN_EXAMEN");
                String hi_PARTO_PRECONSIN_EXAMEN=request.getParameter("hi_PARTO_PRECONSIN_EXAMEN");
                String hi_DIABETESCONSIN_EXAMEN=request.getParameter("hi_DIABETESCONSIN_EXAMEN");
                String hi_BAJOCONSIN_EXAMEN=request.getParameter("hi_BAJOCONSIN_EXAMEN");
                String hi_RIESGOCONSIN_EXAMEN=request.getParameter("hi_RIESGOCONSIN_EXAMEN");
                String hi_HPPCONSIN_EXAMEN=request.getParameter("hi_HPPCONSIN_EXAMEN");
                String hi_PARTO_PRECONTRA_EXAMEN=request.getParameter("hi_PARTO_PRECONTRA_EXAMEN");
                String hi_DIABETESCONTRA_EXAMEN=request.getParameter("hi_DIABETESCONTRA_EXAMEN");
                String hi_BAJOCONTRA_EXAMEN=request.getParameter("hi_BAJOCONTRA_EXAMEN");
                String hi_RIESGOCONTRA_EXAMEN=request.getParameter("hi_RIESGOCONTRA_EXAMEN");
                String hi_HPPCONTRA_EXAMEN=request.getParameter("hi_HPPCONTRA_EXAMEN");
                //**************************************************************************************************//
                //*************************************RECIBIR MORBILIDAD MATERNA***********************************//
                String hi_NINGUNA_MOR_MAT=request.getParameter("hi_NINGUNA_MOR_MAT");
                String hi_ABRUPTIO_MOR_MAT=request.getParameter("hi_ABRUPTIO_MOR_MAT");
                String hi_AMENAZA_MOR_MAT=request.getParameter("hi_AMENAZA_MOR_MAT");
                String hi_ANEMIA_MOR_MAT=request.getParameter("hi_ANEMIA_MOR_MAT");
                String hi_ATONIA_MOR_MAT=request.getParameter("hi_ATONIA_MOR_MAT");
                String hi_CARDIOPATIA_MOR_MAT=request.getParameter("hi_CARDIOPATIA_MOR_MAT");
                String hi_CID_MOR_MAT=request.getParameter("hi_CID_MOR_MAT");
                String hi_DESGARROS_MOR_MAT=request.getParameter("hi_DESGARROS_MOR_MAT");
                String hi_DIABETES_GES_MOR_MAT=request.getParameter("hi_DIABETES_GES_MOR_MAT");
                String hi_DIABETES_MELLI_MOR_MAT=request.getParameter("hi_DIABETES_MELLI_MOR_MAT");
                String hi_ECLAMPSIA_MOR_MAT=request.getParameter("hi_ECLAMPSIA_MOR_MAT");
                String hi_PREECLAMPSIA_LEVE_MOR_MAT=request.getParameter("hi_PREECLAMPSIA_LEVE_MOR_MAT");
                String hi_PRECLAMPSIA_SEVERA_MOR_MAT=request.getParameter("hi_PRECLAMPSIA_SEVERA_MOR_MAT");
                String hi_PRECLAMPSIA_SEVERACON_MOR_MAT=request.getParameter("hi_PRECLAMPSIA_SEVERACON_MOR_MAT");
                String hi_HEPATITIS_MOR_MAT=request.getParameter("hi_HEPATITIS_MOR_MAT");
                String hi_HIPERTENCION_CRO_MOR_MAT=request.getParameter("hi_HIPERTENCION_CRO_MOR_MAT");
                String hi_HIPERTENCION_GES_MOR_MAT=request.getParameter("hi_HIPERTENCION_GES_MOR_MAT");
                String hi_INFECCION_MOR_MAT=request.getParameter("hi_INFECCION_MOR_MAT");
                String hi_MALARIA_MOR_MAT=request.getParameter("hi_MALARIA_MOR_MAT");
                String hi_PLACENTA_PRE_MOR_MAT=request.getParameter("hi_PLACENTA_PRE_MOR_MAT");
                String hi_PLACENTA_RETE_MOR_MAT=request.getParameter("hi_PLACENTA_RETE_MOR_MAT");
                String hi_RCIU_MOR_MAT=request.getParameter("hi_RCIU_MOR_MAT");
                String hi_RUPTURA_MOR_MAT=request.getParameter("hi_RUPTURA_MOR_MAT");
                String hi_SEPSIS_MOR_MAT=request.getParameter("hi_SEPSIS_MOR_MAT");
                String hi_SIFILIS_MOR_MAT=request.getParameter("hi_SIFILIS_MOR_MAT");
                String hi_TBC_MOR_MAT=request.getParameter("hi_TBC_MOR_MAT");
                String hi_HEMORRAGIA_DEL_MOR_MAT=request.getParameter("hi_HEMORRAGIA_DEL_MOR_MAT");
                String hi_HEMORRAGIA_POST_MOR_MAT=request.getParameter("hi_HEMORRAGIA_POST_MOR_MAT");
                String hi_EMBARAZO_MUL_MOR_MAT=request.getParameter("hi_EMBARAZO_MUL_MOR_MAT");
                String hi_TROMBOEMBOLISMO_MOR_MAT=request.getParameter("hi_TROMBOEMBOLISMO_MOR_MAT");
                String hi_VIH_MOR_MAT=request.getParameter("hi_VIH_MOR_MAT");
                String hi_OTRAS_MOR_MAT=request.getParameter("hi_OTRAS_MOR_MAT");                
                //**************************************************************************************************//
                //*************************************RECIBIR PROCEDENCIA***********************************//
                String hi_DOMICILIO_PRO=request.getParameter("hi_DOMICILIO_PRO");                
                String hi_HOGAR_PRO=request.getParameter("hi_HOGAR_PRO");                
                String hi_PARTERA_PRO=request.getParameter("hi_PARTERA_PRO");                
                String hi_IPS_PRO=request.getParameter("hi_IPS_PRO");                
                String hi_OTRA_PRO=request.getParameter("hi_OTRA_PRO");                
                //**************************************************************************************************//
                //*************************************RECIBIR PARTO***********************************//
                String hi_EDAD_GES_PAR=request.getParameter("hi_EDAD_GES_PAR");                
                String hi_TAMA_PAR=request.getParameter("hi_TAMA_PAR");                
                String hi_INICIO_PAR=request.getParameter("hi_INICIO_PAR");                
                String hi_MEMBRANA_PAR=request.getParameter("hi_MEMBRANA_PAR");                
                String hi_FECHA_MEM_PAR=request.getParameter("hi_FECHA_MEM_PAR");      
                if(hi_FECHA_MEM_PAR.equals("")){hi_FECHA_MEM_PAR="0001-01-01";}
                String hi_HORA_MEM_PAR=request.getParameter("hi_HORA_MEM_PAR");                
                String hi_PRESENTACION_PAR=request.getParameter("hi_PRESENTACION_PAR"); 
                //**************************************************************************************************//
                //*************************************RECIBIR ORDEN DE NACIMIENTO***********************************//
                String hi_FETO_ORD=request.getParameter("hi_FETO_ORD");    
                String hi_MANEJO_ORD=request.getParameter("hi_MANEJO_ORD");    
                String hi_PARTOLOGIA_ORD=request.getParameter("hi_PARTOLOGIA_ORD");    
                String hi_EPISIOTOMIA_ORD=request.getParameter("hi_EPISIOTOMIA_ORD");    
                String hi_DESGARROS_ORD=request.getParameter("hi_DESGARROS_ORD");  
                //**************************************************************************************************//
                //*************************************RECIBIR TERMINACION***********************************//
                String hi_ESPONTANEA_TER=request.getParameter("hi_ESPONTANEA_TER");
                String hi_FORCEPS_TER=request.getParameter("hi_FORCEPS_TER");
                String hi_CESAREA_TER=request.getParameter("hi_CESAREA_TER");
                String hi_CESAREA_HIS_TER=request.getParameter("hi_CESAREA_HIS_TER");
                String hi_FECHA_TER=request.getParameter("hi_FECHA_TER");
                if(hi_FECHA_TER.equals("")){hi_FECHA_TER="0001-01-01";}
                String hi_HORA_TER=request.getParameter("hi_HORA_TER");
                String hi_CESAREA_PRE_TER=request.getParameter("hi_CESAREA_PRE_TER");
                String hi_SUFRIMIENTO_FA_TER=request.getParameter("hi_SUFRIMIENTO_FA_TER");
                String hi_SESPROPORCION_TER=request.getParameter("hi_SESPROPORCION_TER");
                String hi_ALTERACION_TER=request.getParameter("hi_ALTERACION_TER");
                String hi_PARTO_PRO_TER=request.getParameter("hi_PARTO_PRO_TER");
                String hi_FRACASO_TER=request.getParameter("hi_FRACASO_TER");
                String hi_DESCENSO_TER=request.getParameter("hi_DESCENSO_TER");
                String hi_EMBARAZO_MUL_TER=request.getParameter("hi_EMBARAZO_MUL_TER");
                String hi_RCIU_TER=request.getParameter("hi_RCIU_TER");
                String hi_PARTO_PRETE1_TER=request.getParameter("hi_PARTO_PRETE1_TER");
                String hi_PARTO_PRETE2_TER=request.getParameter("hi_PARTO_PRETE2_TER");
                String hi_PRESENTACION_POD_TER=request.getParameter("hi_PRESENTACION_POD_TER");
                String hi_PRESENTACION_POS_TER=request.getParameter("hi_PRESENTACION_POS_TER");
                String hi_POSICION_TER=request.getParameter("hi_POSICION_TER");
                String hi_RUPTURA_TER=request.getParameter("hi_RUPTURA_TER");
                String hi_INFECCION_TER=request.getParameter("hi_INFECCION_TER");
                String hi_PLACENTA_PRE_TER=request.getParameter("hi_PLACENTA_PRE_TER");
                String hi_ABRUPTIO_TER=request.getParameter("hi_ABRUPTIO_TER");
                String hi_PRECLAMPSIAECLA_TER=request.getParameter("hi_PRECLAMPSIAECLA_TER");
                String hi_HERPES_TER=request.getParameter("hi_HERPES_TER");
                String hi_CONDILOMATOSIS_TER=request.getParameter("hi_CONDILOMATOSIS_TER");
                String hi_OTRAS_ENF_TER=request.getParameter("hi_OTRAS_ENF_TER");
                String hi_MUERTE_FET_TER=request.getParameter("hi_MUERTE_FET_TER");
                String hi_MADRE_EXA_TER=request.getParameter("hi_MADRE_EXA_TER");
                String hi_DIABETES_TER=request.getParameter("hi_DIABETES_TER");
                String hi_VIH_TER=request.getParameter("hi_VIH_TER");
                String hi_OTRAS_TER=request.getParameter("hi_OTRAS_TER");
                String hi_EXTRA_MANU_PLACEN_TER=request.getParameter("hi_EXTRA_MANU_PLACEN_TER");
                String hi_PLACENTA_COMPLETA_TER=request.getParameter("hi_PLACENTA_COMPLETA_TER");
                String hi_HIPOTOMIA_UTERINA_TER=request.getParameter("hi_HIPOTOMIA_UTERINA_TER");
                String hi_MUERTE_FETAL2_TER=request.getParameter("hi_MUERTE_FETAL2_TER");
                String hi_PARTO_DESCONO_TER=request.getParameter("hi_PARTO_DESCONO_TER");
                //**************************************************************************************************//
                //*************************************RECIBIR MEDICAMENTOS***********************************//
                String hi_ANESTESIA_LO_MED=request.getParameter("hi_ANESTESIA_LO_MED");
                String hi_ANESTESIA_RE_MED=request.getParameter("hi_ANESTESIA_RE_MED");
                String hi_ANESTESIA_GE_MED=request.getParameter("hi_ANESTESIA_GE_MED");
                String hi_TRANQUIZANTE_MED=request.getParameter("hi_TRANQUIZANTE_MED");
                String hi_OXITOCINA_MED=request.getParameter("hi_OXITOCINA_MED");
                String hi_ANTIBIOTICO_MED=request.getParameter("hi_ANTIBIOTICO_MED");
                String hi_ANALGESICO_MED=request.getParameter("hi_ANALGESICO_MED");
                String hi_OTRAH_MED=request.getParameter("hi_OTRAH_MED");
                String hi_NINGUNA_MED=request.getParameter("hi_NINGUNA_MED");
                //**************************************************************************************************//
                //*************************************RECIBIR INSTITUCION***********************************//
                String hi_INSTITU_INS=request.getParameter("hi_INSTITU_INS");
                String hi_NIVEL_INS=request.getParameter("hi_NIVEL_INS");
                String hi_ATENDIOPAR_INS=request.getParameter("hi_ATENDIOPAR_INS");
                String hi_ATENDIONEO_INS=request.getParameter("hi_ATENDIONEO_INS");
                //**************************************************************************************************//
                //*************************************RECIBIR RECIEN NACIDO***********************************//
                String hi_HISTORIA_RECNAC=request.getParameter("hi_HISTORIA_RECNAC");
                String hi_NOMBRE1_RECNAC=request.getParameter("hi_NOMBRE1_RECNAC");
                String hi_NOMBRE2_RECNAC=request.getParameter("hi_NOMBRE2_RECNAC");
                String hi_NOMBRE3_RECNAC=request.getParameter("hi_NOMBRE3_RECNAC");
                String hi_NECREMI_RECNAC=request.getParameter("hi_NECREMI_RECNAC");
                String hi_INSTITU_RECNAC=request.getParameter("hi_INSTITU_RECNAC");
                //**************************************************************************************************//
                //*************************************RECIBIR MOVIMIENTO DE REMISION***********************************//
                String hi_RIESGO_MOVREM=request.getParameter("hi_RIESGO_MOVREM");
                String hi_CESAREA_MOVREM=request.getParameter("hi_CESAREA_MOVREM");
                String hi_PARTO_MOVREM=request.getParameter("hi_PARTO_MOVREM");
                String hi_PATOLOGIA_MOVREM=request.getParameter("hi_PATOLOGIA_MOVREM");
                String hi_DESPROPORCION_MOVREM=request.getParameter("hi_DESPROPORCION_MOVREM");
                String hi_DISTOCIA_MOVREM=request.getParameter("hi_DISTOCIA_MOVREM");
                String hi_TRABAJO_MOVREM=request.getParameter("hi_TRABAJO_MOVREM");
                String hi_INDUCCION_MOVREM=request.getParameter("hi_INDUCCION_MOVREM");
                String hi_SUFRIMIENTO_MOVREM=request.getParameter("hi_SUFRIMIENTO_MOVREM");
                String hi_RUPTURA_MOVREM=request.getParameter("hi_RUPTURA_MOVREM");
                String hi_HEMORRAGIA_MOVREM=request.getParameter("hi_HEMORRAGIA_MOVREM");
                String hi_OTROS_MOVREM=request.getParameter("hi_OTROS_MOVREM");
                //**************************************************************************************************//
                ResultSet rs;
                Statement s= conex.createStatement();    
                int total=0;
                //********************************************GUARDAR***************************************************************//
                if(opcion.equals("guardar")){
                    sql="SELECT *FROM salud_materno_perinatal WHERE "
                        + " id_paciente = '" + id_paciente + "' AND "
                        + " ident_paciente = '" + ident_paciente + "' AND hi_ESTADO_MAT_PER='ACTIVO' LIMIT 1 ";
                    rs=s.executeQuery(sql);
                    rs.last();
                    total=rs.getRow();      
                    if(total<=0){                        
                        //******************************************GUARDAR TABLA MATERNO PERINATAL***********************************************//
                        sql="INSERT INTO salud_materno_perinatal "
                                + " VALUES("
                                    + " null,'"+hi_FECHA_MAT_PER+"','"+hi_ESTADO_MAT_PER+"','"+usuario+"','"+id_paciente+"','"+ident_paciente+"' "
                                + " )";
                        s.executeUpdate(sql);
                        //************************************************************************************************************************//
                        //***************************************AVERIGUAR CUAL ES EL AUTO INCREMENTO*********************************************//
                        sql="SHOW TABLE STATUS FROM historias_clinicas LIKE 'salud_materno_perinatal'";
                        rs=s.executeQuery(sql);rs.next();
                        int sig=rs.getInt("Auto_increment");
                        int auto=sig-1;
                        //************************************************************************************************************************//     
                        //******************************************GUARDAR ANTECEDENTES FAMILIARES***********************************************//
                        sql="INSERT INTO salud_antecedentes_fam "
                                + " VALUES("
                                        + " null,'"+auto+"','"+hi_HTA_CRONICA_ANTFAM+"','"+hi_PREECLAMPSIA1_ANTFAM+"','"+hi_DIABETES1_ANTFAM+"','"+hi_ECLAMPSIA1_ANTFAM+"', "
                                        + " '"+hi_GEMELARES_ANTFAM+"','"+hi_CARDIOPATIA_ANTFAM+"','"+hi_TBC_ANTFAM+"','"+hi_METABOLICOS_ANTFAM+"','"+hi_AUTOINMUNES_ANTFAM+"','"+hi_INFECCIOSAS_ANTFAM+"', "
                                        + " '"+hi_CONGENITAS_ANTFAM+"','"+hi_NEOPLASIAS_ANTFAM+"','"+hi_EPILEPSIA_ANTFAM+"','"+hi_OTROS1_ANTFAM+"','"+hi_CUAL1_ANTFAM+"' "
                                + " )";
                        s.executeUpdate(sql);
                        //************************************************************************************************************************//
                        //******************************************GUARDAR TABLA ANTECEDENTES PERSONALES*****************************************//
                        sql="INSERT INTO salud_antecedentes_per "
                                + " VALUES("
                                    + " null,'"+auto+"','"+hi_TUBERCULOSIS_ANTPER+"','"+hi_DIABETES2_ANTPER+"','"+hi_DIABETES_GES_ANTPER+"','"+hi_HTA_CRONICA2_ANTPER+"','"+hi_CIRUGIAPELUTE_ANTPER+"','"+hi_PREECLAMPSIA2_ANTPER+"', "
                                    + " '"+hi_ECLAMPSIA2_ANTPER+"','"+hi_ALERGICOS_ANTPER+"','"+hi_TABAQUISMO_ANTPER+"','"+hi_ALCOHOLISMO_ANTPER+"','"+hi_ANTITETANICA_ANTPER+"','"+hi_MMR_ANTPER+"', "
                                    + " '"+hi_ENFERMEDAD_MEN_ANTPER+"','"+hi_ACTIVIDAD_FIS_ANTPER+"','"+hi_VICTIMA_MAL_ANTPER+"','"+hi_OTROS2_ANTPER+"','"+hi_CUAL2_ANTPER+"'  "
                                + " )";
                        s.executeUpdate(sql);
                        //************************************************************************************************************************//
                        //******************************************GUARDAR TABLA ANTECEDENTES GINECOLOGICOS**************************************//
                        sql="INSERT INTO salud_antecedentes_gine "
                                + " VALUES("
                                    + " null,'"+auto+"','"+hi_MENARQUIA_ANTGIN+"','"+hi_G_ANTGIN+"','"+hi_P_ANTGIN+"','"+hi_C_ANTGIN+"','"+hi_A_ANTGIN+"', "
                                    + " '"+hi_E_ANTGIN+"','"+hi_V_ANTGIN+"','"+hi_M_ANTGIN+"','"+hi_CICLOS_ANTGIN+"','"+hi_PLANIFICACION_FAM_ANTGIN+"', "
                                    + " '"+hi_FLUJO_VAG_ANTGIN+"','"+hi_ITS_ANTGIN+"','"+hi_CITOLOGIA_ULT_ANTGIN+"','"+hi_COLCOPSCOPIA_ANTGIN+"','"+hi_PERIODO_INTER_ANTGIN+"', "
                                    + " '"+hi_INFERTILIDAD_ANTGIN+"','"+hi_TTOS_INFER_ANTGIN+"','"+hi_RPM_ANTGIN+"','"+hi_RCIU_ANTGIN+"','"+hi_APP_ANTGIN+"', "
                                    + " '"+hi_PARTO_PREM_ANTGIN+"','"+hi_GEMELAR_ANTGIN+"','"+hi_MALFORMACIONES_ANTGIN+"','"+hi_POLIHIDRAMNIOS_ANTGIN+"','"+hi_OLIGOHIDRAMNIOS_ANTGIN+"', "
                                    + " '"+hi_EMB_PROLONGADO_ANTGIN+"','"+hi_AMENAZA_ABO_ANTGIN+"','"+hi_OTROS3_ANTGIN+"','"+hi_CUAL3_ANTGIN+"','"+hi_CUALITS_ANTGIN+"' "        
                                + " )";
                        s.executeUpdate(sql);
                        //************************************************************************************************************************//
                        //******************************************GUARDAR TABLA HISTORIA REPRODUCTIVA*******************************************//
                        sql="INSERT INTO salud_historia_repro "
                                + " VALUES("
                                + " null,'"+auto+"','"+hi_EDAD_HISREP+"','"+hi_PARIDAD_HISREP+"','"+hi_ABORTO_HABIT_HISREP+"','"+hi_RETENCION_PLA_HISREP+"','"+hi_REC_NACIDO1_HISREP+"', "
                                + " '"+hi_REC_NACIDO2_HISREP+"','"+hi_HTA_INDUCIDO_HISREP+"','"+hi_EMB_GEMEL_CES_HISREP+"','"+hi_MORTINATO_HISREP+"','"+hi_TP_PROLON_HISREP+"' "
                                + " )";
                        s.executeUpdate(sql);
                        //************************************************************************************************************************//
                        //******************************************GUARDAR TABLA CONDICIONES ASOCCIADAS*******************************************//
                        sql="INSERT INTO salud_condiciones_asoc "
                                + " VALUES("
                                + " null,'"+auto+"','"+hi_QX_GINECOLOGIAS1_CONASO+"','"+hi_ENF_RENS1_CONASO+"','"+hi_DIABETES_GESS1_CONASO+"','"+hi_DIABETES_MELLIS1_CONASO+"','"+hi_ENF_CARDIACAS1_CONASO+"', "
                                + " '"+hi_ENF_INFAGUDAS1_CONASO+"','"+hi_ENF_AUTOINMUNES1_CONASO+"','"+hi_ANEMIA_HBS1_CONASO+"','"+hi_QX_GINECOLOGIAS2_CONASO+"','"+hi_ENF_RENS2_CONASO+"', "                                                        
                                + " '"+hi_DIABETES_GESS2_CONASO+"','"+hi_DIABETES_MELLIS2_CONASO+"','"+hi_ENF_CARDIACAS2_CONASO+"','"+hi_ENF_INFAGUDAS2_CONASO+"','"+hi_ENF_AUTOINMUNES2_CONASO+"', "                                                        
                                + " '"+hi_ANEMIA_HBS2_CONASO+"','"+hi_QX_GINECOLOGIAS3_CONASO+"','"+hi_ENF_RENS3_CONASO+"','"+hi_DIABETES_GESS3_CONASO+"','"+hi_DIABETES_MELLIS3_CONASO+"', "                                                        
                                + " '"+hi_ENF_CARDIACAS3_CONASO+"','"+hi_ENF_INFAGUDAS3_CONASO+"','"+hi_ENF_AUTOINMUNES3_CONASO+"','"+hi_ANEMIA_HBS3_CONASO+"' "
                                + " )";
                        s.executeUpdate(sql);    
                        //************************************************************************************************************************//
                        //******************************************GUARDAR TABLA EMBARAZO ACTUAL*************************************************//
                        sql="INSERT INTO salud_embarazo_act "
                                + " VALUES("
                                + " null,'"+auto+"','"+hi_HEMORRAGIAS1_MAL_EMBACT+"','"+hi_VAGINAS1_MAL_EMBACT+"','"+hi_E_PROLONGADOS1_MAL_EMBACT+"','"+hi_HTAS1_MAL_EMBACT+"','"+hi_RPMS1_MAL_EMBACT+"', "
                                + " '"+hi_POLIHRIDAMNIOSS1_MAL_EMBACT+"','"+hi_RCIUS1_MAL_EMBACT+"','"+hi_EMB_MULTIPLES1_MAL_EMBACT+"','"+hi_MALA_PRESENTS1_MAL_EMBACT+"','"+hi_ISOS1_MAL_EMBACT+"', "
                                + " '"+hi_HEMORRAGIAS2_MAL_EMBACT+"','"+hi_VAGINAS2_MAL_EMBACT+"','"+hi_E_PROLONGADOS2_MAL_EMBACT+"','"+hi_HTAS2_MAL_EMBACT+"','"+hi_RPMS2_MAL_EMBACT+"', "
                                + " '"+hi_POLIHRIDAMNIOSS2_MAL_EMBACT+"','"+hi_RCIUS2_MAL_EMBACT+"','"+hi_EMB_MULTIPLES2_MAL_EMBACT+"','"+hi_MALA_PRESENTS2_MAL_EMBACT+"','"+hi_ISOS2_MAL_EMBACT+"', "
                                + " '"+hi_HEMORRAGIAS3_MAL_EMBACT+"','"+hi_VAGINAS3_MAL_EMBACT+"','"+hi_E_PROLONGADOS3_MAL_EMBACT+"','"+hi_HTAS3_MAL_EMBACT+"','"+hi_RPMS3_MAL_EMBACT+"', "
                                + " '"+hi_POLIHRIDAMNIOSS3_MAL_EMBACT+"','"+hi_RCIUS3_MAL_EMBACT+"','"+hi_EMB_MULTIPLES3_MAL_EMBACT+"','"+hi_MALA_PRESENTS3_MAL_EMBACT+"','"+hi_ISOS3_MAL_EMBACT+"','"+hi_INMUNIZACION_RH_MAL_EMBACT+"' "                    
                                + " )";       
                        s.executeUpdate(sql);
                        //************************************************************************************************************************//
                        //******************************************GUARDAR TABLA RIESGO PSICOSOCIAL*************************************************//
                        sql="INSERT INTO salud_riesgo_psico "
                                + " VALUES("
                                + " null,'"+auto+"','"+hi_TENSION_EMO_RIEPSI+"','"+hi_HUMOR_DEPRE_RIEPSI+"','"+hi_SINT_NEURO_RIEPSI+"','"+hi_SOP_FAM_TIEM_RIEPSI+"', "
                                + " '"+hi_SOP_FAM_ESPA_RIEPSI+"','"+hi_SOP_FAM_DIN_RIEPSI+"','"+hi_ES_VICTIMA_MAL_RIEPSI+"','"+hi_CUAL4_RIEPSI+"','"+hi_PARENTESCO_MAL_RIEPSI+"' "
                                + " )";     
                        s.executeUpdate(sql);
                        //************************************************************************************************************************//                    
                        //******************************************GUARDAR TABLA RIESGO BIOPSICOSOCIAL*************************************************//                    
                        sql="INSERT INTO salud_riesgo_biop "
                                + " VALUES("       
                                + " null,'"+auto+"','"+hi_TOTALS1_RIEBIO+"','"+hi_TOTALS2_RIEBIO+"','"+hi_TOTALS3_RIEBIO+"' "
                                + " )";     
                        s.executeUpdate(sql);       
                        //******************************************************************************************************************************//                                  
                        //******************************************GUARDAR TABLA EXAMENES GLICEMIA*************************************************//
                        sql="INSERT INTO salud_examenes_glicemia "
                                + " VALUES("    
                                + " null,'"+auto+"','"+hi_GLICEMIA_AYU_EXAGLI+"','"+hi_2GLICEMIA_EXAGLI+"','"+hi_FECHA_REALIZA_EXAGLI+"','"+hi_GRUPO_EXAGLI+"','"+hi_RH_EXAGLI+"' "
                                + " )";     
                        s.executeUpdate(sql);     
                        //******************************************************************************************************************************//                          
                        //******************************************GUARDAR TABLA EXAMENES CTGO*************************************************//
                        sql="INSERT INTO salud_examenes_ctgo "
                                + " VALUES("    
                                + " null,'"+auto+"','"+hi_CTGO_EXACTGO+"','"+hi_GLICEMIA_PRIMERA_EXACTGO+"','"+hi_FECHA_GLICE_PRI_EXACTGO+"','"+hi_GLICEMIA_SEGUNDA_EXACTGO+"','"+hi_FECHA_GLICE_SEG_EXACTGO+"','"+hi_CURVA_GLICE_EXACTGO+"' "
                                + " )";     
                        s.executeUpdate(sql);     
                        //******************************************************************************************************************************//                              
                        //******************************************GUARDAR PARACLINICOS 1*************************************************//
                        sql="INSERT INTO salud_paraclinicos "
                                + " VALUES("              
                                + " null,'"+auto+"','"+hi_HBANT_PARA+"','"+hi_HCTOANT_PARA+"','"+hi_VDRLANT_PARA+"', "
                                + " '"+hi_FROTIS_VAGANT_PARA+"','"+hi_PARCIALANT_PARA+"','"+hi_GRAMORINAANT_PARA+"','"+hi_BACTANT_PARA+"','"+hi_HB1TRI_PARA+"', "
                                + " '"+hi_HCTO1TRI_PARA+"','"+hi_VDRL1TRI_PARA+"','"+hi_FROTIS_VAG1TRI_PARA+"','"+hi_PARCIAL1TRI_PARA+"','"+hi_GRAMORINA1TRI_PARA+"', "
                                + " '"+hi_BACT1TRI_PARA+"','"+hi_HB2TRI_PARA+"','"+hi_HCTO2TRI_PARA+"','"+hi_VDRL2TRI_PARA+"','"+hi_FROTIS_VAG2TRI_PARA+"', "
                                + " '"+hi_PARCIAL2TRI_PARA+"','"+hi_GRAMORINA2TRI_PARA+"','"+hi_BACT2TRI_PARA+"','"+hi_HB3TRI_PARA+"','"+hi_HCTO3TRI_PARA+"', "
                                + " '"+hi_VDRL3TRI_PARA+"','"+hi_FROTIS_VAG3TRI_PARA+"','"+hi_PARCIAL3TRI_PARA+"','"+hi_GRAMORINA3TRI_PARA+"','"+hi_BACT3TRI_PARA+"' "
                                + " )";     
                        s.executeUpdate(sql);     
                        //******************************************************************************************************************************//                              
                        //******************************************GUARDAR PARACLINICOS 2*************************************************//
                        sql="INSERT INTO salud_paraclinicos2 "
                                + " VALUES("              
                                + " null,'"+auto+"','"+hi_UROCULTIVOANT_PARA2+"','"+hi_FTAABSANT_PARA2+"','"+hi_HEPATITISBANT_PARA2+"', "
                                + " '"+hi_ANTITETANICAANT_PARA2+"','"+hi_HIVANT_PARA2+"','"+hi_CITOLOGIA_CERANT_PARA2+"','"+hi_UROCULTIVO1TRI_PARA2+"','"+hi_FTAABS1TRI_PARA2+"', "
                                + " '"+hi_HEPATITISB1TRI_PARA2+"','"+hi_ANTITETANICA1TRI_PARA2+"','"+hi_HIV1TRI_PARA2+"','"+hi_CITOLOGIA_CER1TRI_PARA2+"','"+hi_UROCULTIVO2TRI_PARA2+"', "
                                + " '"+hi_FTAABS2TRI_PARA2+"','"+hi_HEPATITISB2TRI_PARA2+"','"+hi_ANTITETANICA2TRI_PARA2+"','"+hi_HIV2TRI_PARA2+"','"+hi_CITOLOGIA_CER2TRI_PARA2+"', "
                                + " '"+hi_UROCULTIVO3TRI_PARA2+"','"+hi_FTAABS3TRI_PARA2+"','"+hi_HEPATITISB3TRI_PARA2+"','"+hi_ANTITETANICA3TRI_PARA2+"','"+hi_HIV3TRI_PARA2+"','"+hi_CITOLOGIA_CER3TRI_PARA2+"' "          
                                + " )";     
                        s.executeUpdate(sql);     
                        //******************************************************************************************************************************//                              
                        //******************************************GUARDAR O SULLIVAN*************************************************//
                        sql="INSERT INTO salud_exam_osullivan "
                                + " VALUES("     
                                + " null,'"+auto+"','"+hi_GLISEMIA_PRE_SULLI+"','"+hi_GLICEMIA_POST_SULLI+"','"+hi_FECHA_RESULTADO_SULLI+"', "
                                + " '"+hi_S16_SULLI+"','"+hi_S20_SULLI+"','"+hi_S24_SULLI+"','"+hi_S28_SULLI+"','"+hi_S32_SULLI+"','"+hi_S36_SULLI+"', "
                                + " '"+hi_FECHAS16_SULLI+"','"+hi_FECHAS20_SULLI+"','"+hi_FECHAS24_SULLI+"','"+hi_FECHAS28_SULLI+"','"+hi_FECHAS32_SULLI+"','"+hi_FECHAS36_SULLI+"','"+hi_ROLLOVERTEXT_SULLI+"' "
                                + " )";     
                        s.executeUpdate(sql);                       
                        //******************************************************************************************************************************// 
                        //******************************************GUARDAR ECO*************************************************//
                        sql="INSERT INTO salud_eco "
                                + " VALUES("    
                                + " null,'"+auto+"','"+hi_EDAD_GEST1C_ECO+"','"+hi_GESTACIONALAMENO1C_ECO+"','"+hi_PRESENCIA_HEMA1C_ECO+"', "
                                + " '"+hi_OTROS_MARCADORES1C_ECO+"','"+hi_SONOLUCENCIAS1C_ECO+"','"+hi_OBSERVACIONES1C_ECO+"','"+hi_EDAD_GEST1TRI_ECO+"','"+hi_GESTACIONALAMENO1TRI_ECO+"', "
                                + " '"+hi_PRESENCIA_HEMA1TRI_ECO+"','"+hi_OTROS_MARCADORES1TRI_ECO+"','"+hi_SONOLUCENCIAS1TRI_ECO+"','"+hi_OBSERVACIONES1TRI_ECO+"','"+hi_NORMA2TRI_ECO+"', "
                                + " '"+hi_POLIHRIDAMNIOS2TRI_ECO+"','"+hi_RCIU2TRI_ECO+"','"+hi_OLIGOHIDRAMNIOS2TRI_ECO+"','"+hi_MACROSOMIA2TRI_ECO+"','"+hi_MALFORMACION2TRI_ECO+"', "
                                + " '"+hi_OTRAS_ANO2TRI_ECO+"','"+hi_OBSERVA2TRI_ECO+"','"+hi_NORMA3TRI_ECO+"','"+hi_POLIHRIDAMNIOS3TRI_ECO+"','"+hi_RCIU3TRI_ECO+"', "
                                + " '"+hi_OLIGOHIDRAMNIOS3TRI_ECO+"','"+hi_MACROSOMIA3TRI_ECO+"','"+hi_MALFORMACION3TRI_ECO+"','"+hi_OTRAS_ANO3TRI_ECO+"','"+hi_OBSERVA3TRI_ECO+"' "
                                + " )";     
                        s.executeUpdate(sql);                       
                        //******************************************************************************************************************************//  
                        //******************************************CONTROL PRENATAL*************************************************//                    
                        String tam=request.getParameter("tam");                    
                        int t=Integer.parseInt(tam);
                        for(int i=1;i<=t;i++){
                            sql="";
                            sql="INSERT INTO salud_control_prenatal"                              
                                + " VALUES("
                                + " null,'" + auto + "','" + request.getParameter("hi_FECHA_CON_PRE"+i) + "','" + request.getParameter("hi_SEMANAS_CON_PRE"+i) + "','"+request.getParameter("hi_PESO_CON_PRE"+i)+"','"+request.getParameter("hi_TALLA_CON_PRE"+i)+"','"+request.getParameter("hi_TENSION_CON_PRE"+i)+"', "
                                + " '" + request.getParameter("hi_ALTURA_CON_PRE"+i) + "','" + request.getParameter("hi_FCF_CON_PRE"+i) + "','"+request.getParameter("hi_PRESENTACION_CON_PRE"+i)+"','"+request.getParameter("hi_MOVIMIENTOS_CON_PRE"+i)+"','"+request.getParameter("hi_VALORACION_CON_PRE"+i)+"', "
                                + " '"+request.getParameter("hi_EDEMAS_CON_PRE"+i)+"','"+request.getParameter("hi_MONITOREO_CON_PRE"+i)+"','"+request.getParameter("hi_RESPONSABLE_CON_PRE"+i)+"','"+request.getParameter("hi_EXAMEN_MA_CON_PRE"+i)+"','"+request.getParameter("hi_EXAMEN_GE_CON_PRE"+i)+"' "
                                + ")";                                
                            s.executeUpdate(sql);
                        }                                        
                        //******************************************************************************************************************************// 
                        //******************************************MORBILIDADES TRAZADORAS*************************************************//   
                        sql="INSERT INTO salud_preeclampsia "
                                + " VALUES("    
                                + " null,'"+auto+"','"+hi_SIN_RIESGO_PREE+"','"+hi_CON_RIESGO_SIN_PREE+"','"+hi_CON_RIESGO_UTI_PREE+"', "
                                + " '"+hi_CON_RIESGO_BIO1_PREE+"','"+hi_CON_RIESGO_BIO2_PREE+"','"+hi_CON_RIESGO_CAL_PREE+"','"+hi_CON_RIESGO_NUTRI_PREE+"' "
                                + " )";     
                        s.executeUpdate(sql);                         
                        //******************************************************************************************************************************// 
                        //******************************************EXAMEN******************************************************************************//   
                        sql="INSERT INTO salud_examen "
                                + " VALUES("    
                                + " null,'"+auto+"','"+hi_PARTO_PRESIN_EXAMEN+"','"+hi_DIABETESSIN_EXAMEN+"','"+hi_BAJOSIN_EXAMEN+"', "
                                + " '"+hi_RIESGOSIN_EXAMEN+"','"+hi_HPPSIN_EXAMEN+"','"+hi_PARTO_PRECONSIN_EXAMEN+"','"+hi_DIABETESCONSIN_EXAMEN+"','"+hi_BAJOCONSIN_EXAMEN+"', "
                                + " '"+hi_RIESGOCONSIN_EXAMEN+"','"+hi_HPPCONSIN_EXAMEN+"','"+hi_PARTO_PRECONTRA_EXAMEN+"','"+hi_DIABETESCONTRA_EXAMEN+"','"+hi_BAJOCONTRA_EXAMEN+"', "
                                + " '"+hi_RIESGOCONTRA_EXAMEN+"','"+hi_HPPCONTRA_EXAMEN+"' "
                                + " )";     
                        s.executeUpdate(sql);                        
                        //******************************************************************************************************************************//
                        //******************************************MORBILIDAD MATERNA******************************************************************//   
                        sql="INSERT INTO salud_morbilidad_materna "
                                + " VALUES("    
                                + " null,'"+auto+"','"+hi_NINGUNA_MOR_MAT+"','"+hi_ABRUPTIO_MOR_MAT+"','"+hi_AMENAZA_MOR_MAT+"', "
                                + " '"+hi_ANEMIA_MOR_MAT+"','"+hi_ATONIA_MOR_MAT+"','"+hi_CARDIOPATIA_MOR_MAT+"','"+hi_CID_MOR_MAT+"','"+hi_DESGARROS_MOR_MAT+"', "
                                + " '"+hi_DIABETES_GES_MOR_MAT+"','"+hi_DIABETES_MELLI_MOR_MAT+"','"+hi_ECLAMPSIA_MOR_MAT+"','"+hi_PREECLAMPSIA_LEVE_MOR_MAT+"','"+hi_PRECLAMPSIA_SEVERA_MOR_MAT+"', "
                                + " '"+hi_PRECLAMPSIA_SEVERACON_MOR_MAT+"','"+hi_HEPATITIS_MOR_MAT+"','"+hi_HIPERTENCION_CRO_MOR_MAT+"','"+hi_HIPERTENCION_GES_MOR_MAT+"','"+hi_INFECCION_MOR_MAT+"', "
                                + " '"+hi_MALARIA_MOR_MAT+"','"+hi_PLACENTA_PRE_MOR_MAT+"','"+hi_PLACENTA_RETE_MOR_MAT+"','"+hi_RCIU_MOR_MAT+"','"+hi_RUPTURA_MOR_MAT+"', "
                                + " '"+hi_SEPSIS_MOR_MAT+"','"+hi_SIFILIS_MOR_MAT+"','"+hi_TBC_MOR_MAT+"','"+hi_HEMORRAGIA_DEL_MOR_MAT+"','"+hi_HEMORRAGIA_POST_MOR_MAT+"', "
                                + " '"+hi_EMBARAZO_MUL_MOR_MAT+"','"+hi_TROMBOEMBOLISMO_MOR_MAT+"','"+hi_VIH_MOR_MAT+"','"+hi_OTRAS_MOR_MAT+"' "
                                + " )";     
                        s.executeUpdate(sql);
                        //******************************************************************************************************************************//
                        //******************************************PROCEDENCIA******************************************************************// 
                        sql="INSERT INTO salud_procedencia "
                                + " VALUES("    
                                + " null,'"+auto+"','"+hi_DOMICILIO_PRO+"','"+hi_HOGAR_PRO+"','"+hi_PARTERA_PRO+"', "
                                + " '"+hi_IPS_PRO+"','"+hi_OTRA_PRO+"' "
                                + " )";     
                        s.executeUpdate(sql);    
                        //******************************************************************************************************************************//
                        //******************************************PARTO******************************************************************// 
                        sql="INSERT INTO salud_parto "
                                + " VALUES("    
                                + " null,'"+auto+"','"+hi_EDAD_GES_PAR+"','"+hi_TAMA_PAR+"','"+hi_INICIO_PAR+"', "
                                + " '"+hi_MEMBRANA_PAR+"','"+hi_FECHA_MEM_PAR+"','"+hi_HORA_MEM_PAR+"','"+hi_PRESENTACION_PAR+"' "
                                + " )";     
                        s.executeUpdate(sql);   
                        //******************************************************************************************************************************//
                        //******************************************ORDEN DE NACIMIENTO******************************************************************// 
                        sql="INSERT INTO salud_orden_nac "
                                + " VALUES("    
                                + " null,'"+auto+"','"+hi_FETO_ORD+"','"+hi_MANEJO_ORD+"','"+hi_PARTOLOGIA_ORD+"', "
                                + " '"+hi_EPISIOTOMIA_ORD+"','"+hi_DESGARROS_ORD+"' "
                                + " )";     
                        s.executeUpdate(sql);   
                        //******************************************************************************************************************************// 
                        //******************************************TERMINACION******************************************************************// 
                        sql="INSERT INTO salud_terminacion "
                                + " VALUES("    
                                + " null,'"+auto+"','"+hi_ESPONTANEA_TER+"','"+hi_FORCEPS_TER+"','"+hi_CESAREA_TER+"', "
                                + " '"+hi_CESAREA_HIS_TER+"','"+hi_FECHA_TER+"','"+hi_HORA_TER+"','"+hi_CESAREA_PRE_TER+"','"+hi_SUFRIMIENTO_FA_TER+"', "                            
                                + " '"+hi_SESPROPORCION_TER+"','"+hi_ALTERACION_TER+"','"+hi_PARTO_PRO_TER+"','"+hi_FRACASO_TER+"','"+hi_DESCENSO_TER+"', "                            
                                + " '"+hi_EMBARAZO_MUL_TER+"','"+hi_RCIU_TER+"','"+hi_PARTO_PRETE1_TER+"','"+hi_PARTO_PRETE2_TER+"','"+hi_PRESENTACION_POD_TER+"', "                            
                                + " '"+hi_PRESENTACION_POS_TER+"','"+hi_POSICION_TER+"','"+hi_RUPTURA_TER+"','"+hi_INFECCION_TER+"','"+hi_PLACENTA_PRE_TER+"', "                            
                                + " '"+hi_ABRUPTIO_TER+"','"+hi_PRECLAMPSIAECLA_TER+"','"+hi_HERPES_TER+"','"+hi_CONDILOMATOSIS_TER+"','"+hi_OTRAS_ENF_TER+"', "                            
                                + " '"+hi_MUERTE_FET_TER+"','"+hi_MADRE_EXA_TER+"','"+hi_DIABETES_TER+"','"+hi_VIH_TER+"','"+hi_OTRAS_TER+"', "                            
                                + " '"+hi_EXTRA_MANU_PLACEN_TER+"','"+hi_PLACENTA_COMPLETA_TER+"','"+hi_HIPOTOMIA_UTERINA_TER+"','"+hi_MUERTE_FETAL2_TER+"','"+hi_PARTO_DESCONO_TER+"' "
                                + " )";     
                        s.executeUpdate(sql);   
                        //******************************************************************************************************************************// 
                        //******************************************MEDICAMENTOS******************************************************************// 
                        sql="INSERT INTO salud_med "
                                + " VALUES("    
                                + " null,'"+auto+"','"+hi_ANESTESIA_LO_MED+"','"+hi_ANESTESIA_RE_MED+"','"+hi_ANESTESIA_GE_MED+"', "
                                + " '"+hi_TRANQUIZANTE_MED+"','"+hi_OXITOCINA_MED+"','"+hi_ANTIBIOTICO_MED+"','"+hi_ANALGESICO_MED+"','"+hi_OTRAH_MED+"', "                            
                                + " '"+hi_NINGUNA_MED+"' "                            
                                + " )";     
                        s.executeUpdate(sql);                       
                        //******************************************************************************************************************************// 
                        //******************************************INSTITUCION******************************************************************// 
                        sql="INSERT INTO salud_insti "
                                + " VALUES("    
                                + " null,'"+auto+"','"+hi_INSTITU_INS+"','"+hi_NIVEL_INS+"','"+hi_ATENDIOPAR_INS+"', "
                                + " '"+hi_ATENDIONEO_INS+"' "
                                + " )";     
                        s.executeUpdate(sql);   
                        //******************************************************************************************************************************//    
                        //******************************************RECIEN NACIDO******************************************************************// 
                        sql="INSERT INTO salud_recien_nacido "
                                + " VALUES("    
                                + " null,'"+auto+"','"+hi_HISTORIA_RECNAC+"','"+hi_NOMBRE1_RECNAC+"','"+hi_NOMBRE2_RECNAC+"', "
                                + " '"+hi_NOMBRE3_RECNAC+"','"+hi_NECREMI_RECNAC+"','"+hi_INSTITU_RECNAC+"' "
                                + " )";     
                        s.executeUpdate(sql);  
                        //******************************************************************************************************************************//   
                        //******************************************MOVIMIENTO DE REMISION******************************************************************// 
                        sql="INSERT INTO salud_movimiento_rem "
                                + " VALUES("    
                                + " null,'"+auto+"','"+hi_RIESGO_MOVREM+"','"+hi_CESAREA_MOVREM+"','"+hi_PARTO_MOVREM+"', "
                                + " '"+hi_PATOLOGIA_MOVREM+"','"+hi_DESPROPORCION_MOVREM+"','"+hi_DISTOCIA_MOVREM+"','"+hi_TRABAJO_MOVREM+"','"+hi_INDUCCION_MOVREM+"', "                            
                                + " '"+hi_SUFRIMIENTO_MOVREM+"','"+hi_RUPTURA_MOVREM+"','"+hi_HEMORRAGIA_MOVREM+"','"+hi_OTROS_MOVREM+"' "                            
                                + " )";     
                        s.executeUpdate(sql);    
                        //******************************************************************************************************************************//                     
                        //********************************************EVOLUCION*************************************************************************//
                        String vac=request.getParameter("vac");
                        if(vac.equals("2")){
                            String tamanio=request.getParameter("tamanio");       
                            String hi_SERVICIO_EVOLUCION=request.getParameter("hi_SERVICIO_EVOLUCION");
                            String hi_SALA_EVOLUCION=request.getParameter("hi_SALA_EVOLUCION");
                            String hi_N_CAMA_EVOLUCION=request.getParameter("hi_N_CAMA_EVOLUCION");
                            int tt=Integer.parseInt(tamanio);
                            for(int i=1;i<=tt;i++){
                                sql="";
                                sql="INSERT INTO salud_evolucion_materno"                              
                                    + " VALUES("
                                    + " null,'" + auto + "','" + hi_SERVICIO_EVOLUCION + "','" + hi_SALA_EVOLUCION + "','"+hi_N_CAMA_EVOLUCION+"','"+request.getParameter("hi_FECHA_EVOLUCION"+i)+"','"+request.getParameter("hi_HORA_EVOLUCION"+i)+"', "
                                    + " '" + request.getParameter("hi_DX_EVOLUCION"+i) + "' "
                                    + ")";                                
                                s.executeUpdate(sql);
                            }                             
                        }
                        //******************************************************************************************************************************//                        
                        out.println("1");                          
                        
                    }else{
                        out.println("2");  
                    }

                }
                if(opcion.equals("modificar")){
                    //******************************************MODIFICAR TABLA MATERNO PERINATAL***********************************************//
                    String  hi_ID_MAT_PER = request.getParameter("hi_ID_MAT_PER");
                    sql="UPDATE salud_materno_perinatal SET "
                        + " hi_FECHA_MAT_PER='"+hi_FECHA_MAT_PER+"',hi_ESTADO_MAT_PER='"+hi_ESTADO_MAT_PER+"' "
                        + " WHERE ident_paciente='"+ ident_paciente +"' AND id_paciente='"+ id_paciente +"' AND hi_ID_MAT_PER='"+ hi_ID_MAT_PER +"'";                    
                    s.executeUpdate(sql);
                    //************************************************************************************************************************//        
                    //******************************************MODIFICAR ANTECEDENTES FAMILIARES***********************************************//
                    String  hi_ID_ANTFAM = request.getParameter("hi_ID_ANTFAM");
                    sql="UPDATE salud_antecedentes_fam SET "
                                    + " hi_HTA_CRONICA_ANTFAM='"+hi_HTA_CRONICA_ANTFAM+"',hi_PREECLAMPSIA1_ANTFAM='"+hi_PREECLAMPSIA1_ANTFAM+"',hi_DIABETES1_ANTFAM='"+hi_DIABETES1_ANTFAM+"',hi_ECLAMPSIA1_ANTFAM='"+hi_ECLAMPSIA1_ANTFAM+"', "
                                    + " hi_GEMELARES_ANTFAM='"+hi_GEMELARES_ANTFAM+"',hi_CARDIOPATIA_ANTFAM='"+hi_CARDIOPATIA_ANTFAM+"',hi_TBC_ANTFAM='"+hi_TBC_ANTFAM+"',hi_METABOLICOS_ANTFAM='"+hi_METABOLICOS_ANTFAM+"',hi_AUTOINMUNES_ANTFAM='"+hi_AUTOINMUNES_ANTFAM+"',hi_INFECCIOSAS_ANTFAM='"+hi_INFECCIOSAS_ANTFAM+"', "
                                    + " hi_CONGENITAS_ANTFAM='"+hi_CONGENITAS_ANTFAM+"',hi_NEOPLASIAS_ANTFAM='"+hi_NEOPLASIAS_ANTFAM+"',hi_EPILEPSIA_ANTFAM='"+hi_EPILEPSIA_ANTFAM+"',hi_OTROS1_ANTFAM='"+hi_OTROS1_ANTFAM+"',hi_CUAL1_ANTFAM='"+hi_CUAL1_ANTFAM+"' "
                            + " WHERE hi_ID_ANTFAM='"+ hi_ID_ANTFAM +"' AND hi_ID_MAT_PER='"+ hi_ID_MAT_PER +"' ";                                     
                    s.executeUpdate(sql);                    
                    //************************************************************************************************************************//     
                    //******************************************MODIFICAR ANTECEDENTES PERSONALES*****************************************//
                    String  hi_ID_ANTPER = request.getParameter("hi_ID_ANTPER");
                    sql="UPDATE salud_antecedentes_per SET "
                                + " hi_TUBERCULOSIS_ANTPER='"+hi_TUBERCULOSIS_ANTPER+"',hi_DIABETES2_ANTPER='"+hi_DIABETES2_ANTPER+"',hi_DIABETES_GES_ANTPER='"+hi_DIABETES_GES_ANTPER+"',hi_HTA_CRONICA2_ANTPER='"+hi_HTA_CRONICA2_ANTPER+"',hi_CIRUGIAPELUTE_ANTPER='"+hi_CIRUGIAPELUTE_ANTPER+"',hi_PREECLAMPSIA2_ANTPER='"+hi_PREECLAMPSIA2_ANTPER+"', "
                                + " hi_ECLAMPSIA2_ANTPER='"+hi_ECLAMPSIA2_ANTPER+"',hi_ALERGICOS_ANTPER='"+hi_ALERGICOS_ANTPER+"',hi_TABAQUISMO_ANTPER='"+hi_TABAQUISMO_ANTPER+"',hi_ALCOHOLISMO_ANTPER='"+hi_ALCOHOLISMO_ANTPER+"',hi_ANTITETANICA_ANTPER='"+hi_ANTITETANICA_ANTPER+"',hi_MMR_ANTPER='"+hi_MMR_ANTPER+"', "
                                + " hi_ENFERMEDAD_MEN_ANTPER='"+hi_ENFERMEDAD_MEN_ANTPER+"',hi_ACTIVIDAD_FIS_ANTPER='"+hi_ACTIVIDAD_FIS_ANTPER+"',hi_VICTIMA_MAL_ANTPER='"+hi_VICTIMA_MAL_ANTPER+"',hi_OTROS2_ANTPER='"+hi_OTROS2_ANTPER+"',hi_CUAL2_ANTPER='"+hi_CUAL2_ANTPER+"'  "
                            + " WHERE hi_ID_ANTPER='"+ hi_ID_ANTPER +"' AND hi_ID_MAT_PER='"+ hi_ID_MAT_PER +"' ";    
                    s.executeUpdate(sql);
                    //************************************************************************************************************************//     
                    //******************************************MODIFICAR ANTECEDENTES GINECOLOGICOS**************************************//
                    String  hi_ID_ANTGIN = request.getParameter("hi_ID_ANTGIN");
                    sql="UPDATE salud_antecedentes_gine SET "                            
                                + " hi_MENARQUIA_ANTGIN='"+hi_MENARQUIA_ANTGIN+"',hi_G_ANTGIN='"+hi_G_ANTGIN+"',hi_P_ANTGIN='"+hi_P_ANTGIN+"',hi_C_ANTGIN='"+hi_C_ANTGIN+"',hi_A_ANTGIN='"+hi_A_ANTGIN+"', "
                                + " hi_E_ANTGIN='"+hi_E_ANTGIN+"',hi_V_ANTGIN='"+hi_V_ANTGIN+"',hi_M_ANTGIN='"+hi_M_ANTGIN+"',hi_CICLOS_ANTGIN='"+hi_CICLOS_ANTGIN+"',hi_PLANIFICACION_FAM_ANTGIN='"+hi_PLANIFICACION_FAM_ANTGIN+"', "
                                + " hi_FLUJO_VAG_ANTGIN='"+hi_FLUJO_VAG_ANTGIN+"',hi_ITS_ANTGIN='"+hi_ITS_ANTGIN+"',hi_CITOLOGIA_ULT_ANTGIN='"+hi_CITOLOGIA_ULT_ANTGIN+"',hi_COLCOPSCOPIA_ANTGIN='"+hi_COLCOPSCOPIA_ANTGIN+"',hi_PERIODO_INTER_ANTGIN='"+hi_PERIODO_INTER_ANTGIN+"', "
                                + " hi_INFERTILIDAD_ANTGIN='"+hi_INFERTILIDAD_ANTGIN+"',hi_TTOS_INFER_ANTGIN='"+hi_TTOS_INFER_ANTGIN+"',hi_RPM_ANTGIN='"+hi_RPM_ANTGIN+"',hi_RCIU_ANTGIN='"+hi_RCIU_ANTGIN+"',hi_APP_ANTGIN='"+hi_APP_ANTGIN+"', "
                                + " hi_PARTO_PREM_ANTGIN='"+hi_PARTO_PREM_ANTGIN+"',hi_GEMELAR_ANTGIN='"+hi_GEMELAR_ANTGIN+"',hi_MALFORMACIONES_ANTGIN='"+hi_MALFORMACIONES_ANTGIN+"',hi_POLIHIDRAMNIOS_ANTGIN='"+hi_POLIHIDRAMNIOS_ANTGIN+"',hi_OLIGOHIDRAMNIOS_ANTGIN='"+hi_OLIGOHIDRAMNIOS_ANTGIN+"', "
                                + " hi_EMB_PROLONGADO_ANTGIN='"+hi_EMB_PROLONGADO_ANTGIN+"',hi_AMENAZA_ABO_ANTGIN='"+hi_AMENAZA_ABO_ANTGIN+"',hi_OTROS3_ANTGIN='"+hi_OTROS3_ANTGIN+"',hi_CUAL3_ANTGIN='"+hi_CUAL3_ANTGIN+"',hi_CUALITS_ANTGIN='"+hi_CUALITS_ANTGIN+"' "        
                            + " WHERE hi_ID_ANTGIN='"+ hi_ID_ANTGIN +"' AND hi_ID_MAT_PER='"+ hi_ID_MAT_PER +"' ";    
                    s.executeUpdate(sql);
                    //************************************************************************************************************************//      
                    //******************************************MODIFICAR HISTORIA REPRODUCTIVA*******************************************//
                    String  hi_ID_HISREP = request.getParameter("hi_ID_HISREP");
                    sql="UPDATE salud_historia_repro SET "  
                            + " hi_EDAD_HISREP='"+hi_EDAD_HISREP+"',hi_PARIDAD_HISREP='"+hi_PARIDAD_HISREP+"',hi_ABORTO_HABIT_HISREP='"+hi_ABORTO_HABIT_HISREP+"',hi_RETENCION_PLA_HISREP='"+hi_RETENCION_PLA_HISREP+"',hi_REC_NACIDO1_HISREP='"+hi_REC_NACIDO1_HISREP+"', "
                            + " hi_REC_NACIDO2_HISREP='"+hi_REC_NACIDO2_HISREP+"',hi_HTA_INDUCIDO_HISREP='"+hi_HTA_INDUCIDO_HISREP+"',hi_EMB_GEMEL_CES_HISREP='"+hi_EMB_GEMEL_CES_HISREP+"',hi_MORTINATO_HISREP='"+hi_MORTINATO_HISREP+"',hi_TP_PROLON_HISREP='"+hi_TP_PROLON_HISREP+"' "
                            + " WHERE hi_ID_HISREP='"+ hi_ID_HISREP +"' AND hi_ID_MAT_PER='"+ hi_ID_MAT_PER +"' ";    
                    s.executeUpdate(sql);
                    //************************************************************************************************************************//    
                    //******************************************MODIFICAR CONDICIONES ASOCCIADAS*******************************************//
                    String  hi_ID_CONASO = request.getParameter("hi_ID_CONASO");
                    sql="UPDATE salud_condiciones_asoc SET "  
                            + " hi_QX_GINECOLOGIAS1_CONASO='"+hi_QX_GINECOLOGIAS1_CONASO+"',hi_ENF_RENS1_CONASO='"+hi_ENF_RENS1_CONASO+"',hi_DIABETES_GESS1_CONASO='"+hi_DIABETES_GESS1_CONASO+"',hi_DIABETES_MELLIS1_CONASO='"+hi_DIABETES_MELLIS1_CONASO+"',hi_ENF_CARDIACAS1_CONASO='"+hi_ENF_CARDIACAS1_CONASO+"', "
                            + " hi_ENF_INFAGUDAS1_CONASO='"+hi_ENF_INFAGUDAS1_CONASO+"',hi_ENF_AUTOINMUNES1_CONASO='"+hi_ENF_AUTOINMUNES1_CONASO+"',hi_ANEMIA_HBS1_CONASO='"+hi_ANEMIA_HBS1_CONASO+"',hi_QX_GINECOLOGIAS2_CONASO='"+hi_QX_GINECOLOGIAS2_CONASO+"',hi_ENF_RENS2_CONASO='"+hi_ENF_RENS2_CONASO+"', "                                                        
                            + " hi_DIABETES_GESS2_CONASO='"+hi_DIABETES_GESS2_CONASO+"',hi_DIABETES_MELLIS2_CONASO='"+hi_DIABETES_MELLIS2_CONASO+"',hi_ENF_CARDIACAS2_CONASO='"+hi_ENF_CARDIACAS2_CONASO+"',hi_ENF_INFAGUDAS2_CONASO='"+hi_ENF_INFAGUDAS2_CONASO+"',hi_ENF_AUTOINMUNES2_CONASO='"+hi_ENF_AUTOINMUNES2_CONASO+"', "                                                        
                            + " hi_ANEMIA_HBS2_CONASO='"+hi_ANEMIA_HBS2_CONASO+"',hi_QX_GINECOLOGIAS3_CONASO='"+hi_QX_GINECOLOGIAS3_CONASO+"',hi_ENF_RENS3_CONASO='"+hi_ENF_RENS3_CONASO+"',hi_DIABETES_GESS3_CONASO='"+hi_DIABETES_GESS3_CONASO+"',hi_DIABETES_MELLIS3_CONASO='"+hi_DIABETES_MELLIS3_CONASO+"', "                                                        
                            + " hi_ENF_CARDIACAS3_CONASO='"+hi_ENF_CARDIACAS3_CONASO+"',hi_ENF_INFAGUDAS3_CONASO='"+hi_ENF_INFAGUDAS3_CONASO+"',hi_ENF_AUTOINMUNES3_CONASO='"+hi_ENF_AUTOINMUNES3_CONASO+"',hi_ANEMIA_HBS3_CONASO='"+hi_ANEMIA_HBS3_CONASO+"' "
                            + " WHERE hi_ID_CONASO='"+ hi_ID_CONASO +"' AND hi_ID_MAT_PER='"+ hi_ID_MAT_PER +"' ";    
                    s.executeUpdate(sql);    
                    //************************************************************************************************************************//  
                    //******************************************MODIFICAR EMBARAZO ACTUAL*************************************************//
                    String  hi_ID_EMBACT = request.getParameter("hi_ID_EMBACT");
                    sql="UPDATE salud_embarazo_act SET "  
                            + " hi_HEMORRAGIAS1_MAL_EMBACT='"+hi_HEMORRAGIAS1_MAL_EMBACT+"',hi_VAGINAS1_MAL_EMBACT='"+hi_VAGINAS1_MAL_EMBACT+"',hi_E_PROLONGADOS1_MAL_EMBACT='"+hi_E_PROLONGADOS1_MAL_EMBACT+"',hi_HTAS1_MAL_EMBACT='"+hi_HTAS1_MAL_EMBACT+"',hi_RPMS1_MAL_EMBACT='"+hi_RPMS1_MAL_EMBACT+"', "
                            + " hi_POLIHRIDAMNIOSS1_MAL_EMBACT='"+hi_POLIHRIDAMNIOSS1_MAL_EMBACT+"',hi_RCIUS1_MAL_EMBACT='"+hi_RCIUS1_MAL_EMBACT+"',hi_EMB_MULTIPLES1_MAL_EMBACT='"+hi_EMB_MULTIPLES1_MAL_EMBACT+"',hi_MALA_PRESENTS1_MAL_EMBACT='"+hi_MALA_PRESENTS1_MAL_EMBACT+"',hi_ISOS1_MAL_EMBACT='"+hi_ISOS1_MAL_EMBACT+"', "
                            + " hi_HEMORRAGIAS2_MAL_EMBACT='"+hi_HEMORRAGIAS2_MAL_EMBACT+"',hi_VAGINAS2_MAL_EMBACT='"+hi_VAGINAS2_MAL_EMBACT+"',hi_E_PROLONGADOS2_MAL_EMBACT='"+hi_E_PROLONGADOS2_MAL_EMBACT+"',hi_HTAS2_MAL_EMBACT='"+hi_HTAS2_MAL_EMBACT+"',hi_RPMS2_MAL_EMBACT='"+hi_RPMS2_MAL_EMBACT+"', "
                            + " hi_POLIHRIDAMNIOSS2_MAL_EMBACT='"+hi_POLIHRIDAMNIOSS2_MAL_EMBACT+"',hi_RCIUS2_MAL_EMBACT='"+hi_RCIUS2_MAL_EMBACT+"',hi_EMB_MULTIPLES2_MAL_EMBACT='"+hi_EMB_MULTIPLES2_MAL_EMBACT+"',hi_MALA_PRESENTS2_MAL_EMBACT='"+hi_MALA_PRESENTS2_MAL_EMBACT+"',hi_ISOS2_MAL_EMBACT='"+hi_ISOS2_MAL_EMBACT+"', "
                            + " hi_HEMORRAGIAS3_MAL_EMBACT='"+hi_HEMORRAGIAS3_MAL_EMBACT+"',hi_VAGINAS3_MAL_EMBACT='"+hi_VAGINAS3_MAL_EMBACT+"',hi_E_PROLONGADOS3_MAL_EMBACT='"+hi_E_PROLONGADOS3_MAL_EMBACT+"',hi_HTAS3_MAL_EMBACT='"+hi_HTAS3_MAL_EMBACT+"',hi_RPMS3_MAL_EMBACT='"+hi_RPMS3_MAL_EMBACT+"', "
                            + " hi_POLIHRIDAMNIOSS3_MAL_EMBACT='"+hi_POLIHRIDAMNIOSS3_MAL_EMBACT+"',hi_RCIUS3_MAL_EMBACT='"+hi_RCIUS3_MAL_EMBACT+"',hi_EMB_MULTIPLES3_MAL_EMBACT='"+hi_EMB_MULTIPLES3_MAL_EMBACT+"',hi_MALA_PRESENTS3_MAL_EMBACT='"+hi_MALA_PRESENTS3_MAL_EMBACT+"',hi_ISOS3_MAL_EMBACT='"+hi_ISOS3_MAL_EMBACT+"',hi_INMUNIZACION_RH_MAL_EMBACT='"+hi_INMUNIZACION_RH_MAL_EMBACT+"' "                    
                            + " WHERE hi_ID_EMBACT='"+ hi_ID_EMBACT +"' AND hi_ID_MAT_PER='"+ hi_ID_MAT_PER +"' ";    
                    s.executeUpdate(sql);
                    //************************************************************************************************************************//   
                    //******************************************MODIFICAR RIESGO PSICOSOCIAL*************************************************//
                    String  hi_ID_RIEPSI = request.getParameter("hi_ID_RIEPSI");
                    sql="UPDATE salud_riesgo_psico SET "                      
                            + " hi_TENSION_EMO_RIEPSI='"+hi_TENSION_EMO_RIEPSI+"',hi_HUMOR_DEPRE_RIEPSI='"+hi_HUMOR_DEPRE_RIEPSI+"',hi_SINT_NEURO_RIEPSI='"+hi_SINT_NEURO_RIEPSI+"',hi_SOP_FAM_TIEM_RIEPSI='"+hi_SOP_FAM_TIEM_RIEPSI+"', "
                            + " hi_SOP_FAM_ESPA_RIEPSI='"+hi_SOP_FAM_ESPA_RIEPSI+"',hi_SOP_FAM_DIN_RIEPSI='"+hi_SOP_FAM_DIN_RIEPSI+"',hi_ES_VICTIMA_MAL_RIEPSI='"+hi_ES_VICTIMA_MAL_RIEPSI+"',hi_CUAL4_RIEPSI='"+hi_CUAL4_RIEPSI+"',hi_PARENTESCO_MAL_RIEPSI='"+hi_PARENTESCO_MAL_RIEPSI+"' "
                            + " WHERE hi_ID_RIEPSI='"+ hi_ID_RIEPSI +"' AND hi_ID_MAT_PER='"+ hi_ID_MAT_PER +"' ";    
                    s.executeUpdate(sql);
                    //************************************************************************************************************************//   
                    //******************************************MODIFICAR RIESGO BIOPSICOSOCIAL*************************************************//                    
                    String  hi_ID_RIEBIO = request.getParameter("hi_ID_RIEBIO");
                    sql="UPDATE salud_riesgo_biop SET "                       
                            + " hi_TOTALS1_RIEBIO='"+hi_TOTALS1_RIEBIO+"',hi_TOTALS2_RIEBIO='"+hi_TOTALS2_RIEBIO+"',hi_TOTALS3_RIEBIO='"+hi_TOTALS3_RIEBIO+"' "
                            + " WHERE hi_ID_RIEBIO='"+ hi_ID_RIEBIO +"' AND hi_ID_MAT_PER='"+ hi_ID_MAT_PER +"' ";   
                    s.executeUpdate(sql);       
                    //******************************************************************************************************************************//  
                    //******************************************MODIFICAR EXAMENES GLICEMIA*************************************************//
                    String  hi_ID_EXAGLI = request.getParameter("hi_ID_EXAGLI");
                    sql="UPDATE salud_examenes_glicemia SET "                     
                            + " hi_GLICEMIA_AYU_EXAGLI='"+hi_GLICEMIA_AYU_EXAGLI+"',hi_2GLICEMIA_EXAGLI='"+hi_2GLICEMIA_EXAGLI+"',hi_FECHA_REALIZA_EXAGLI='"+hi_FECHA_REALIZA_EXAGLI+"',hi_GRUPO_EXAGLI='"+hi_GRUPO_EXAGLI+"',hi_RH_EXAGLI='"+hi_RH_EXAGLI+"' "
                            + " WHERE hi_ID_EXAGLI='"+ hi_ID_EXAGLI +"' AND hi_ID_MAT_PER='"+ hi_ID_MAT_PER +"' ";
                    s.executeUpdate(sql);     
                    //******************************************************************************************************************************// 
                    //******************************************MODIFICAR EXAMENES CTGO*************************************************//
                    String  hi_ID_EXACTGO = request.getParameter("hi_ID_EXACTGO");
                    sql="UPDATE salud_examenes_ctgo SET "                      
                            + " hi_CTGO_EXACTGO='"+hi_CTGO_EXACTGO+"',hi_GLICEMIA_PRIMERA_EXACTGO='"+hi_GLICEMIA_PRIMERA_EXACTGO+"',hi_FECHA_GLICE_PRI_EXACTGO='"+hi_FECHA_GLICE_PRI_EXACTGO+"',hi_GLICEMIA_SEGUNDA_EXACTGO='"+hi_GLICEMIA_SEGUNDA_EXACTGO+"',hi_FECHA_GLICE_SEG_EXACTGO='"+hi_FECHA_GLICE_SEG_EXACTGO+"',hi_CURVA_GLICE_EXACTGO='"+hi_CURVA_GLICE_EXACTGO+"' "
                            + " WHERE hi_ID_EXACTGO='"+ hi_ID_EXACTGO +"' AND hi_ID_MAT_PER='"+ hi_ID_MAT_PER +"' "; 
                    s.executeUpdate(sql);     
                    //******************************************************************************************************************************//  
                    //******************************************MODIFICAR PARACLINICOS 1*************************************************//
                    String  hi_ID_PARA = request.getParameter("hi_ID_PARA");
                    sql="UPDATE salud_paraclinicos SET "                       
                            + " hi_HBANT_PARA='"+hi_HBANT_PARA+"',hi_HCTOANT_PARA='"+hi_HCTOANT_PARA+"',hi_VDRLANT_PARA='"+hi_VDRLANT_PARA+"', "
                            + " hi_FROTIS_VAGANT_PARA='"+hi_FROTIS_VAGANT_PARA+"',hi_PARCIALANT_PARA='"+hi_PARCIALANT_PARA+"',hi_GRAMORINAANT_PARA='"+hi_GRAMORINAANT_PARA+"',hi_BACTANT_PARA='"+hi_BACTANT_PARA+"',hi_HB1TRI_PARA='"+hi_HB1TRI_PARA+"', "
                            + " hi_HCTO1TRI_PARA='"+hi_HCTO1TRI_PARA+"',hi_VDRL1TRI_PARA='"+hi_VDRL1TRI_PARA+"',hi_FROTIS_VAG1TRI_PARA='"+hi_FROTIS_VAG1TRI_PARA+"',hi_PARCIAL1TRI_PARA='"+hi_PARCIAL1TRI_PARA+"',hi_GRAMORINA1TRI_PARA='"+hi_GRAMORINA1TRI_PARA+"', "
                            + " hi_BACT1TRI_PARA='"+hi_BACT1TRI_PARA+"',hi_HB2TRI_PARA='"+hi_HB2TRI_PARA+"',hi_HCTO2TRI_PARA='"+hi_HCTO2TRI_PARA+"',hi_VDRL2TRI_PARA='"+hi_VDRL2TRI_PARA+"',hi_FROTIS_VAG2TRI_PARA='"+hi_FROTIS_VAG2TRI_PARA+"', "
                            + " hi_PARCIAL2TRI_PARA='"+hi_PARCIAL2TRI_PARA+"',hi_GRAMORINA2TRI_PARA='"+hi_GRAMORINA2TRI_PARA+"',hi_BACT2TRI_PARA='"+hi_BACT2TRI_PARA+"',hi_HB3TRI_PARA='"+hi_HB3TRI_PARA+"',hi_HCTO3TRI_PARA='"+hi_HCTO3TRI_PARA+"', "
                            + " hi_VDRL3TRI_PARA='"+hi_VDRL3TRI_PARA+"',hi_FROTIS_VAG3TRI_PARA='"+hi_FROTIS_VAG3TRI_PARA+"',hi_PARCIAL3TRI_PARA='"+hi_PARCIAL3TRI_PARA+"',hi_GRAMORINA3TRI_PARA='"+hi_GRAMORINA3TRI_PARA+"',hi_BACT3TRI_PARA='"+hi_BACT3TRI_PARA+"' "
                            + " WHERE hi_ID_PARA='"+ hi_ID_PARA +"' AND hi_ID_MAT_PER='"+ hi_ID_MAT_PER +"' ";     
                    s.executeUpdate(sql);     
                    //******************************************************************************************************************************//    
                    //******************************************MODIFICAR PARACLINICOS 2*************************************************//
                    String  hi_ID_PARA2 = request.getParameter("hi_ID_PARA2");
                    sql="UPDATE salud_paraclinicos2 SET "                       
                            + " hi_UROCULTIVOANT_PARA2='"+hi_UROCULTIVOANT_PARA2+"',hi_FTAABSANT_PARA2='"+hi_FTAABSANT_PARA2+"',hi_HEPATITISBANT_PARA2='"+hi_HEPATITISBANT_PARA2+"', "
                            + " hi_ANTITETANICAANT_PARA2='"+hi_ANTITETANICAANT_PARA2+"',hi_HIVANT_PARA2='"+hi_HIVANT_PARA2+"',hi_CITOLOGIA_CERANT_PARA2='"+hi_CITOLOGIA_CERANT_PARA2+"',hi_UROCULTIVO1TRI_PARA2='"+hi_UROCULTIVO1TRI_PARA2+"',hi_FTAABS1TRI_PARA2='"+hi_FTAABS1TRI_PARA2+"', "
                            + " hi_HEPATITISB1TRI_PARA2='"+hi_HEPATITISB1TRI_PARA2+"',hi_ANTITETANICA1TRI_PARA2='"+hi_ANTITETANICA1TRI_PARA2+"',hi_HIV1TRI_PARA2='"+hi_HIV1TRI_PARA2+"',hi_CITOLOGIA_CER1TRI_PARA2='"+hi_CITOLOGIA_CER1TRI_PARA2+"',hi_UROCULTIVO2TRI_PARA2='"+hi_UROCULTIVO2TRI_PARA2+"', "
                            + " hi_FTAABS2TRI_PARA2='"+hi_FTAABS2TRI_PARA2+"',hi_HEPATITISB2TRI_PARA2='"+hi_HEPATITISB2TRI_PARA2+"',hi_ANTITETANICA2TRI_PARA2='"+hi_ANTITETANICA2TRI_PARA2+"',hi_HIV2TRI_PARA2='"+hi_HIV2TRI_PARA2+"',hi_CITOLOGIA_CER2TRI_PARA2='"+hi_CITOLOGIA_CER2TRI_PARA2+"', "
                            + " hi_UROCULTIVO3TRI_PARA2='"+hi_UROCULTIVO3TRI_PARA2+"',hi_FTAABS3TRI_PARA2='"+hi_FTAABS3TRI_PARA2+"',hi_HEPATITISB3TRI_PARA2='"+hi_HEPATITISB3TRI_PARA2+"',hi_ANTITETANICA3TRI_PARA2='"+hi_ANTITETANICA3TRI_PARA2+"',hi_HIV3TRI_PARA2='"+hi_HIV3TRI_PARA2+"',hi_CITOLOGIA_CER3TRI_PARA2='"+hi_CITOLOGIA_CER3TRI_PARA2+"' "          
                            + " WHERE hi_ID_PARA2='"+ hi_ID_PARA2 +"' AND hi_ID_MAT_PER='"+ hi_ID_MAT_PER +"' ";     
                    s.executeUpdate(sql);     
                    //******************************************************************************************************************************//   
                    //******************************************MODIFICAR O SULLIVAN*************************************************//
                    String  hi_ID_SULLI = request.getParameter("hi_ID_SULLI");
                    sql="UPDATE salud_exam_osullivan SET "                      
                            + " hi_GLISEMIA_PRE_SULLI='"+hi_GLISEMIA_PRE_SULLI+"',hi_GLICEMIA_POST_SULLI='"+hi_GLICEMIA_POST_SULLI+"',hi_FECHA_RESULTADO_SULLI='"+hi_FECHA_RESULTADO_SULLI+"', "
                            + " hi_S16_SULLI='"+hi_S16_SULLI+"',hi_S20_SULLI='"+hi_S20_SULLI+"',hi_S24_SULLI='"+hi_S24_SULLI+"',hi_S28_SULLI='"+hi_S28_SULLI+"',hi_S32_SULLI='"+hi_S32_SULLI+"',hi_S36_SULLI='"+hi_S36_SULLI+"', "
                            + " hi_FECHAS16_SULLI='"+hi_FECHAS16_SULLI+"',hi_FECHAS20_SULLI='"+hi_FECHAS20_SULLI+"',hi_FECHAS24_SULLI='"+hi_FECHAS24_SULLI+"',hi_FECHAS28_SULLI='"+hi_FECHAS28_SULLI+"',hi_FECHAS32_SULLI='"+hi_FECHAS32_SULLI+"',hi_FECHAS36_SULLI='"+hi_FECHAS36_SULLI+"',hi_ROLLOVERTEXT_SULLI='"+hi_ROLLOVERTEXT_SULLI+"' "
                            + " WHERE hi_ID_SULLI='"+ hi_ID_SULLI +"' AND hi_ID_MAT_PER='"+ hi_ID_MAT_PER +"' ";    
                    s.executeUpdate(sql);                       
                    //******************************************************************************************************************************//  
                    //******************************************MODIFICAR ECO*************************************************//
                    String  hi_ID_ECO = request.getParameter("hi_ID_ECO");
                    sql="UPDATE salud_eco SET "                      
                            + " hi_EDAD_GEST1C_ECO='"+hi_EDAD_GEST1C_ECO+"',hi_GESTACIONALAMENO1C_ECO='"+hi_GESTACIONALAMENO1C_ECO+"',hi_PRESENCIA_HEMA1C_ECO='"+hi_PRESENCIA_HEMA1C_ECO+"', "
                            + " hi_OTROS_MARCADORES1C_ECO='"+hi_OTROS_MARCADORES1C_ECO+"',hi_SONOLUCENCIAS1C_ECO='"+hi_SONOLUCENCIAS1C_ECO+"',hi_OBSERVACIONES1C_ECO='"+hi_OBSERVACIONES1C_ECO+"',hi_EDAD_GEST1TRI_ECO='"+hi_EDAD_GEST1TRI_ECO+"',hi_GESTACIONALAMENO1TRI_ECO='"+hi_GESTACIONALAMENO1TRI_ECO+"', "
                            + " hi_PRESENCIA_HEMA1TRI_ECO='"+hi_PRESENCIA_HEMA1TRI_ECO+"',hi_OTROS_MARCADORES1TRI_ECO='"+hi_OTROS_MARCADORES1TRI_ECO+"',hi_SONOLUCENCIAS1TRI_ECO='"+hi_SONOLUCENCIAS1TRI_ECO+"',hi_OBSERVACIONES1TRI_ECO='"+hi_OBSERVACIONES1TRI_ECO+"',hi_NORMA2TRI_ECO='"+hi_NORMA2TRI_ECO+"', "
                            + " hi_POLIHRIDAMNIOS2TRI_ECO='"+hi_POLIHRIDAMNIOS2TRI_ECO+"',hi_RCIU2TRI_ECO='"+hi_RCIU2TRI_ECO+"',hi_OLIGOHIDRAMNIOS2TRI_ECO='"+hi_OLIGOHIDRAMNIOS2TRI_ECO+"',hi_MACROSOMIA2TRI_ECO='"+hi_MACROSOMIA2TRI_ECO+"',hi_MALFORMACION2TRI_ECO='"+hi_MALFORMACION2TRI_ECO+"', "
                            + " hi_OTRAS_ANO2TRI_ECO='"+hi_OTRAS_ANO2TRI_ECO+"',hi_OBSERVA2TRI_ECO='"+hi_OBSERVA2TRI_ECO+"',hi_NORMA3TRI_ECO='"+hi_NORMA3TRI_ECO+"',hi_POLIHRIDAMNIOS3TRI_ECO='"+hi_POLIHRIDAMNIOS3TRI_ECO+"',hi_RCIU3TRI_ECO='"+hi_RCIU3TRI_ECO+"', "
                            + " hi_OLIGOHIDRAMNIOS3TRI_ECO='"+hi_OLIGOHIDRAMNIOS3TRI_ECO+"',hi_MACROSOMIA3TRI_ECO='"+hi_MACROSOMIA3TRI_ECO+"',hi_MALFORMACION3TRI_ECO='"+hi_MALFORMACION3TRI_ECO+"',hi_OTRAS_ANO3TRI_ECO='"+hi_OTRAS_ANO3TRI_ECO+"',hi_OBSERVA3TRI_ECO='"+hi_OBSERVA3TRI_ECO+"' "
                            + " WHERE hi_ID_ECO='"+ hi_ID_ECO +"' AND hi_ID_MAT_PER='"+ hi_ID_MAT_PER +"' ";      
                    s.executeUpdate(sql);                       
                    //******************************************************************************************************************************//     
                    //******************************************MODIFICAR CONTROL PRENATAL*************************************************//                    
                    sql="DELETE FROM "
                            + "salud_control_prenatal "
                            + " WHERE  hi_ID_MAT_PER='"+ hi_ID_MAT_PER +"'";  
                    s.executeUpdate(sql);                      
                    String tam=request.getParameter("tam");                    
                    int t=Integer.parseInt(tam);
                    for(int i=1;i<=t;i++){
                        sql="";
                        sql="INSERT INTO salud_control_prenatal"                              
                            + " VALUES("
                            + " (SELECT IF('" + request.getParameter("hi_ID_CON_PRE"+i) + "'='null',null,'" + request.getParameter("hi_ID_CON_PRE"+i) + "')),'"+ hi_ID_MAT_PER +"','" + request.getParameter("hi_FECHA_CON_PRE"+i) + "','" + request.getParameter("hi_SEMANAS_CON_PRE"+i) + "','"+request.getParameter("hi_PESO_CON_PRE"+i)+"','"+request.getParameter("hi_TALLA_CON_PRE"+i)+"','"+request.getParameter("hi_TENSION_CON_PRE"+i)+"', "
                            + " '" + request.getParameter("hi_ALTURA_CON_PRE"+i) + "','" + request.getParameter("hi_FCF_CON_PRE"+i) + "','"+request.getParameter("hi_PRESENTACION_CON_PRE"+i)+"','"+request.getParameter("hi_MOVIMIENTOS_CON_PRE"+i)+"','"+request.getParameter("hi_VALORACION_CON_PRE"+i)+"', "
                            + " '"+request.getParameter("hi_EDEMAS_CON_PRE"+i)+"','"+request.getParameter("hi_MONITOREO_CON_PRE"+i)+"','"+request.getParameter("hi_RESPONSABLE_CON_PRE"+i)+"','"+request.getParameter("hi_EXAMEN_MA_CON_PRE"+i)+"','"+request.getParameter("hi_EXAMEN_GE_CON_PRE"+i)+"' "
                            + ")";                                
                        s.executeUpdate(sql);
                    }                                        
                    //******************************************************************************************************************************// 
                    //******************************************MODIFICAR MORBILIDADES TRAZADORAS*************************************************//   
                    String  hi_ID_PREE = request.getParameter("hi_ID_PREE");
                    sql="UPDATE salud_preeclampsia SET "                      
                            + " hi_SIN_RIESGO_PREE='"+hi_SIN_RIESGO_PREE+"',hi_CON_RIESGO_SIN_PREE='"+hi_CON_RIESGO_SIN_PREE+"',hi_CON_RIESGO_UTI_PREE='"+hi_CON_RIESGO_UTI_PREE+"', "
                            + " hi_CON_RIESGO_BIO1_PREE='"+hi_CON_RIESGO_BIO1_PREE+"',hi_CON_RIESGO_BIO2_PREE='"+hi_CON_RIESGO_BIO2_PREE+"',hi_CON_RIESGO_CAL_PREE='"+hi_CON_RIESGO_CAL_PREE+"',hi_CON_RIESGO_NUTRI_PREE='"+hi_CON_RIESGO_NUTRI_PREE+"' "
                            + " WHERE hi_ID_PREE='"+ hi_ID_PREE +"' AND hi_ID_MAT_PER='"+ hi_ID_MAT_PER +"' ";
                    s.executeUpdate(sql);                         
                    //******************************************************************************************************************************//  
                    //******************************************MODIFICAR EXAMEN******************************************************************************//   
                    String  hi_ID_EXAMEN = request.getParameter("hi_ID_EXAMEN");
                    sql="UPDATE salud_examen SET "                       
                            + " hi_PARTO_PRESIN_EXAMEN='"+hi_PARTO_PRESIN_EXAMEN+"',hi_DIABETESSIN_EXAMEN='"+hi_DIABETESSIN_EXAMEN+"',hi_BAJOSIN_EXAMEN='"+hi_BAJOSIN_EXAMEN+"', "
                            + " hi_RIESGOSIN_EXAMEN='"+hi_RIESGOSIN_EXAMEN+"',hi_HPPSIN_EXAMEN='"+hi_HPPSIN_EXAMEN+"',hi_PARTO_PRECONSIN_EXAMEN='"+hi_PARTO_PRECONSIN_EXAMEN+"',hi_DIABETESCONSIN_EXAMEN='"+hi_DIABETESCONSIN_EXAMEN+"',hi_BAJOCONSIN_EXAMEN='"+hi_BAJOCONSIN_EXAMEN+"', "
                            + " hi_RIESGOCONSIN_EXAMEN='"+hi_RIESGOCONSIN_EXAMEN+"',hi_HPPCONSIN_EXAMEN='"+hi_HPPCONSIN_EXAMEN+"',hi_PARTO_PRECONTRA_EXAMEN='"+hi_PARTO_PRECONTRA_EXAMEN+"',hi_DIABETESCONTRA_EXAMEN='"+hi_DIABETESCONTRA_EXAMEN+"',hi_BAJOCONTRA_EXAMEN='"+hi_BAJOCONTRA_EXAMEN+"', "
                            + " hi_RIESGOCONTRA_EXAMEN='"+hi_RIESGOCONTRA_EXAMEN+"',hi_HPPCONTRA_EXAMEN='"+hi_HPPCONTRA_EXAMEN+"' "
                            + " WHERE hi_ID_EXAMEN='"+ hi_ID_EXAMEN +"' AND hi_ID_MAT_PER='"+ hi_ID_MAT_PER +"' "; 
                    s.executeUpdate(sql);                        
                    //******************************************************************************************************************************//     
                    //******************************************MODIFICAR MORBILIDAD MATERNA******************************************************************//   
                    String  hi_ID_MOR_MAT = request.getParameter("hi_ID_MOR_MAT");
                    sql="UPDATE salud_morbilidad_materna SET "                    
                            + " hi_NINGUNA_MOR_MAT='"+hi_NINGUNA_MOR_MAT+"',hi_ABRUPTIO_MOR_MAT='"+hi_ABRUPTIO_MOR_MAT+"',hi_AMENAZA_MOR_MAT='"+hi_AMENAZA_MOR_MAT+"', "
                            + " hi_ANEMIA_MOR_MAT='"+hi_ANEMIA_MOR_MAT+"',hi_ATONIA_MOR_MAT='"+hi_ATONIA_MOR_MAT+"',hi_CARDIOPATIA_MOR_MAT='"+hi_CARDIOPATIA_MOR_MAT+"',hi_CID_MOR_MAT='"+hi_CID_MOR_MAT+"',hi_DESGARROS_MOR_MAT='"+hi_DESGARROS_MOR_MAT+"', "
                            + " hi_DIABETES_GES_MOR_MAT='"+hi_DIABETES_GES_MOR_MAT+"',hi_DIABETES_MELLI_MOR_MAT='"+hi_DIABETES_MELLI_MOR_MAT+"',hi_ECLAMPSIA_MOR_MAT='"+hi_ECLAMPSIA_MOR_MAT+"',hi_PREECLAMPSIA_LEVE_MOR_MAT='"+hi_PREECLAMPSIA_LEVE_MOR_MAT+"',hi_PRECLAMPSIA_SEVERA_MOR_MAT='"+hi_PRECLAMPSIA_SEVERA_MOR_MAT+"', "
                            + " hi_PRECLAMPSIA_SEVERACON_MOR_MAT='"+hi_PRECLAMPSIA_SEVERACON_MOR_MAT+"',hi_HEPATITIS_MOR_MAT='"+hi_HEPATITIS_MOR_MAT+"',hi_HIPERTENCION_CRO_MOR_MAT='"+hi_HIPERTENCION_CRO_MOR_MAT+"',hi_HIPERTENCION_GES_MOR_MAT='"+hi_HIPERTENCION_GES_MOR_MAT+"',hi_INFECCION_MOR_MAT='"+hi_INFECCION_MOR_MAT+"', "
                            + " hi_MALARIA_MOR_MAT='"+hi_MALARIA_MOR_MAT+"',hi_PLACENTA_PRE_MOR_MAT='"+hi_PLACENTA_PRE_MOR_MAT+"',hi_PLACENTA_RETE_MOR_MAT='"+hi_PLACENTA_RETE_MOR_MAT+"',hi_RCIU_MOR_MAT='"+hi_RCIU_MOR_MAT+"',hi_RUPTURA_MOR_MAT='"+hi_RUPTURA_MOR_MAT+"', "
                            + " hi_SEPSIS_MOR_MAT='"+hi_SEPSIS_MOR_MAT+"',hi_SIFILIS_MOR_MAT='"+hi_SIFILIS_MOR_MAT+"',hi_TBC_MOR_MAT='"+hi_TBC_MOR_MAT+"',hi_HEMORRAGIA_DEL_MOR_MAT='"+hi_HEMORRAGIA_DEL_MOR_MAT+"',hi_HEMORRAGIA_POST_MOR_MAT='"+hi_HEMORRAGIA_POST_MOR_MAT+"', "
                            + " hi_EMBARAZO_MUL_MOR_MAT='"+hi_EMBARAZO_MUL_MOR_MAT+"',hi_TROMBOEMBOLISMO_MOR_MAT='"+hi_TROMBOEMBOLISMO_MOR_MAT+"',hi_VIH_MOR_MAT='"+hi_VIH_MOR_MAT+"',hi_OTRAS_MOR_MAT='"+hi_OTRAS_MOR_MAT+"' "
                            + " WHERE hi_ID_MOR_MAT='"+ hi_ID_MOR_MAT +"' AND hi_ID_MAT_PER='"+ hi_ID_MAT_PER +"' ";     
                    s.executeUpdate(sql);
                    //******************************************************************************************************************************//   
                    //******************************************MODIFICAR PROCEDENCIA******************************************************************// 
                    String  hi_ID_PRO = request.getParameter("hi_ID_PRO");
                    sql="UPDATE salud_procedencia SET "                       
                            + " hi_DOMICILIO_PRO='"+hi_DOMICILIO_PRO+"',hi_HOGAR_PRO='"+hi_HOGAR_PRO+"',hi_PARTERA_PRO='"+hi_PARTERA_PRO+"', "
                            + " hi_IPS_PRO='"+hi_IPS_PRO+"',hi_OTRA_PRO='"+hi_OTRA_PRO+"' "
                            + " WHERE hi_ID_PRO='"+ hi_ID_PRO +"' AND hi_ID_MAT_PER_PRO='"+ hi_ID_MAT_PER +"' ";    
                    s.executeUpdate(sql);    
                    //******************************************************************************************************************************//    
                    //******************************************MODIFICAR PARTO******************************************************************// 
                    String  hi_ID_PAR = request.getParameter("hi_ID_PAR");
                    sql="UPDATE salud_parto SET "                     
                            + " hi_EDAD_GES_PAR='"+hi_EDAD_GES_PAR+"',hi_TAMA_PAR='"+hi_TAMA_PAR+"',hi_INICIO_PAR='"+hi_INICIO_PAR+"', "
                            + " hi_MEMBRANA_PAR='"+hi_MEMBRANA_PAR+"',hi_FECHA_MEM_PAR='"+hi_FECHA_MEM_PAR+"',hi_HORA_MEM_PAR='"+hi_HORA_MEM_PAR+"',hi_PRESENTACION_PAR='"+hi_PRESENTACION_PAR+"' "
                            + " WHERE hi_ID_PAR='"+ hi_ID_PAR +"' AND hi_ID_MAT_PER='"+ hi_ID_MAT_PER +"' ";    
                    s.executeUpdate(sql);   
                    //******************************************************************************************************************************//  
                    //******************************************MODIFICAR ORDEN DE NACIMIENTO******************************************************************// 
                    String  hi_ID_ORD = request.getParameter("hi_ID_ORD");
                    sql="UPDATE salud_orden_nac SET "                      
                            + " hi_FETO_ORD='"+hi_FETO_ORD+"',hi_MANEJO_ORD='"+hi_MANEJO_ORD+"',hi_PARTOLOGIA_ORD='"+hi_PARTOLOGIA_ORD+"', "
                            + " hi_EPISIOTOMIA_ORD='"+hi_EPISIOTOMIA_ORD+"',hi_DESGARROS_ORD='"+hi_DESGARROS_ORD+"' "
                            + " WHERE hi_ID_ORD='"+ hi_ID_ORD +"' AND hi_ID_MAT_PER='"+ hi_ID_MAT_PER +"' ";
                    s.executeUpdate(sql);   
                    //******************************************************************************************************************************// 
                    //******************************************MODIFICAR TERMINACION******************************************************************// 
                    String  hi_ID_TER = request.getParameter("hi_ID_TER");
                    sql="UPDATE salud_terminacion SET "                        
                            + " hi_ESPONTANEA_TER='"+hi_ESPONTANEA_TER+"',hi_FORCEPS_TER='"+hi_FORCEPS_TER+"',hi_CESAREA_TER='"+hi_CESAREA_TER+"', "
                            + " hi_CESAREA_HIS_TER='"+hi_CESAREA_HIS_TER+"',hi_FECHA_TER='"+hi_FECHA_TER+"',hi_HORA_TER='"+hi_HORA_TER+"',hi_CESAREA_PRE_TER='"+hi_CESAREA_PRE_TER+"',hi_SUFRIMIENTO_FA_TER='"+hi_SUFRIMIENTO_FA_TER+"', "                            
                            + " hi_SESPROPORCION_TER='"+hi_SESPROPORCION_TER+"',hi_ALTERACION_TER='"+hi_ALTERACION_TER+"',hi_PARTO_PRO_TER='"+hi_PARTO_PRO_TER+"',hi_FRACASO_TER='"+hi_FRACASO_TER+"',hi_DESCENSO_TER='"+hi_DESCENSO_TER+"', "                            
                            + " hi_EMBARAZO_MUL_TER='"+hi_EMBARAZO_MUL_TER+"',hi_RCIU_TER='"+hi_RCIU_TER+"',hi_PARTO_PRETE1_TER='"+hi_PARTO_PRETE1_TER+"',hi_PARTO_PRETE2_TER='"+hi_PARTO_PRETE2_TER+"',hi_PRESENTACION_POD_TER='"+hi_PRESENTACION_POD_TER+"', "                            
                            + " hi_PRESENTACION_POS_TER='"+hi_PRESENTACION_POS_TER+"',hi_POSICION_TER='"+hi_POSICION_TER+"',hi_RUPTURA_TER='"+hi_RUPTURA_TER+"',hi_INFECCION_TER='"+hi_INFECCION_TER+"',hi_PLACENTA_PRE_TER='"+hi_PLACENTA_PRE_TER+"', "                            
                            + " hi_ABRUPTIO_TER='"+hi_ABRUPTIO_TER+"',hi_PRECLAMPSIAECLA_TER='"+hi_PRECLAMPSIAECLA_TER+"',hi_HERPES_TER='"+hi_HERPES_TER+"',hi_CONDILOMATOSIS_TER='"+hi_CONDILOMATOSIS_TER+"',hi_OTRAS_ENF_TER='"+hi_OTRAS_ENF_TER+"', "                            
                            + " hi_MUERTE_FET_TER='"+hi_MUERTE_FET_TER+"',hi_MADRE_EXA_TER='"+hi_MADRE_EXA_TER+"',hi_DIABETES_TER='"+hi_DIABETES_TER+"',hi_VIH_TER='"+hi_VIH_TER+"',hi_OTRAS_TER='"+hi_OTRAS_TER+"', "                            
                            + " hi_EXTRA_MANU_PLACEN_TER='"+hi_EXTRA_MANU_PLACEN_TER+"',hi_PLACENTA_COMPLETA_TER='"+hi_PLACENTA_COMPLETA_TER+"',hi_HIPOTOMIA_UTERINA_TER='"+hi_HIPOTOMIA_UTERINA_TER+"',hi_MUERTE_FETAL2_TER='"+hi_MUERTE_FETAL2_TER+"',hi_PARTO_DESCONO_TER='"+hi_PARTO_DESCONO_TER+"' "
                            + " WHERE hi_ID_TER='"+ hi_ID_TER +"' AND hi_ID_MAT_PER='"+ hi_ID_MAT_PER +"' ";
                    s.executeUpdate(sql);   
                    //******************************************************************************************************************************//   
                    //******************************************MODIFICAR MEDICAMENTOS******************************************************************// 
                    String  hi_ID_MED = request.getParameter("hi_ID_MED");
                    sql="UPDATE salud_med SET "                     
                            + " hi_ANESTESIA_LO_MED='"+hi_ANESTESIA_LO_MED+"',hi_ANESTESIA_RE_MED='"+hi_ANESTESIA_RE_MED+"',hi_ANESTESIA_GE_MED='"+hi_ANESTESIA_GE_MED+"', "
                            + " hi_TRANQUIZANTE_MED='"+hi_TRANQUIZANTE_MED+"',hi_OXITOCINA_MED='"+hi_OXITOCINA_MED+"',hi_ANTIBIOTICO_MED='"+hi_ANTIBIOTICO_MED+"',hi_ANALGESICO_MED='"+hi_ANALGESICO_MED+"',hi_OTRAH_MED='"+hi_OTRAH_MED+"', "                            
                            + " hi_NINGUNA_MED='"+hi_NINGUNA_MED+"' "                            
                            + " WHERE hi_ID_MED='"+ hi_ID_MED +"' AND hi_ID_MAT_PER='"+ hi_ID_MAT_PER +"' ";    
                    s.executeUpdate(sql);                       
                    //******************************************************************************************************************************// 
                    //******************************************MODIFICAR INSTITUCION******************************************************************// 
                    String  hi_ID_INS = request.getParameter("hi_ID_INS");
                    sql="UPDATE salud_insti SET "                      
                            + " hi_INSTITU_INS='"+hi_INSTITU_INS+"',hi_NIVEL_INS='"+hi_NIVEL_INS+"',hi_ATENDIOPAR_INS='"+hi_ATENDIOPAR_INS+"', "
                            + " hi_ATENDIONEO_INS='"+hi_ATENDIONEO_INS+"' "
                            + " WHERE hi_ID_INS='"+ hi_ID_INS +"' AND hi_ID_MAT_PER='"+ hi_ID_MAT_PER +"' ";  
                    s.executeUpdate(sql);   
                    //******************************************************************************************************************************//                      
                    //******************************************MODIFICAR RECIEN NACIDO******************************************************************// 
                    String  hi_ID_RECNAC = request.getParameter("hi_ID_RECNAC");
                    sql="UPDATE salud_recien_nacido SET "                       
                            + " hi_HISTORIA_RECNAC='"+hi_HISTORIA_RECNAC+"',hi_NOMBRE1_RECNAC='"+hi_NOMBRE1_RECNAC+"',hi_NOMBRE2_RECNAC='"+hi_NOMBRE2_RECNAC+"', "
                            + " hi_NOMBRE3_RECNAC='"+hi_NOMBRE3_RECNAC+"',hi_NECREMI_RECNAC='"+hi_NECREMI_RECNAC+"',hi_INSTITU_RECNAC='"+hi_INSTITU_RECNAC+"' "
                            + " WHERE hi_ID_RECNAC='"+ hi_ID_RECNAC +"' AND hi_ID_MAT_PER='"+ hi_ID_MAT_PER +"' ";  
                    s.executeUpdate(sql);  
                    //******************************************************************************************************************************//                     
                    //******************************************MODIFICAR MOVIMIENTO DE REMISION******************************************************************// 
                    String  hi_ID_MOVREM = request.getParameter("hi_ID_MOVREM");
                    sql="UPDATE salud_movimiento_rem SET "                     
                            + " hi_RIESGO_MOVREM='"+hi_RIESGO_MOVREM+"',hi_CESAREA_MOVREM='"+hi_CESAREA_MOVREM+"',hi_PARTO_MOVREM='"+hi_PARTO_MOVREM+"', "
                            + " hi_PATOLOGIA_MOVREM='"+hi_PATOLOGIA_MOVREM+"',hi_DESPROPORCION_MOVREM='"+hi_DESPROPORCION_MOVREM+"',hi_DISTOCIA_MOVREM='"+hi_DISTOCIA_MOVREM+"',hi_TRABAJO_MOVREM='"+hi_TRABAJO_MOVREM+"',hi_INDUCCION_MOVREM='"+hi_INDUCCION_MOVREM+"', "                            
                            + " hi_SUFRIMIENTO_MOVREM='"+hi_SUFRIMIENTO_MOVREM+"',hi_RUPTURA_MOVREM='"+hi_RUPTURA_MOVREM+"',hi_HEMORRAGIA_MOVREM='"+hi_HEMORRAGIA_MOVREM+"',hi_OTROS_MOVREM='"+hi_OTROS_MOVREM+"' "                            
                            + " WHERE hi_ID_MOVREM='"+ hi_ID_MOVREM +"' AND hi_ID_MAT_PER='"+ hi_ID_MAT_PER +"' ";   
                    s.executeUpdate(sql);                       
                    //******************************************************************************************************************************//                     
                    //******************************************MODIFICAR EVOLUCION*************************************************//                    
                    String vac=request.getParameter("vac");
                    if(vac.equals("2")){
                        sql="DELETE FROM "
                                + "salud_evolucion_materno "
                                + " WHERE  hi_ID_MAT_PER='"+ hi_ID_MAT_PER +"'";  
                        s.executeUpdate(sql);                      
                        String hi_SERVICIO_EVOLUCION=request.getParameter("hi_SERVICIO_EVOLUCION");
                        String hi_SALA_EVOLUCION=request.getParameter("hi_SALA_EVOLUCION");
                        String hi_N_CAMA_EVOLUCION=request.getParameter("hi_N_CAMA_EVOLUCION");                    
                        String tamanio=request.getParameter("tamanio");                    
                        int tt=Integer.parseInt(tamanio);
                        for(int i=1;i<=tt;i++){
                            sql="";
                            sql="INSERT INTO salud_evolucion_materno"                              
                                + " VALUES("
                                + " (SELECT IF('" + request.getParameter("hi_ID_EVOLUCION"+i) + "'='null',null,'" + request.getParameter("hi_ID_EVOLUCION"+i) + "')),'"+ hi_ID_MAT_PER +"','" + hi_SERVICIO_EVOLUCION + "','" + hi_SALA_EVOLUCION + "','"+hi_N_CAMA_EVOLUCION+"','"+request.getParameter("hi_FECHA_EVOLUCION"+i)+"','"+request.getParameter("hi_HORA_EVOLUCION"+i)+"', "
                                + " '" + request.getParameter("hi_DX_EVOLUCION"+i) + "' "
                                + ")";                                
                            s.executeUpdate(sql);
                        }                   
                    }
                    //******************************************************************************************************************************//                     
                    out.println("1");  
                }
                if(opcion.equals("eliminar")){
                    //******************************************ELIMINAR TABLA MATERNO PERINATAL***********************************************//
                    String  hi_ID_MAT_PER = request.getParameter("hi_ID_MAT_PER");
                    sql="UPDATE salud_materno_perinatal SET "
                        + " hi_ESTADO_MAT_PER='"+hi_ESTADO_MAT_PER+"' "
                        + " WHERE ident_paciente='"+ ident_paciente +"' AND id_paciente='"+ id_paciente +"' AND hi_ID_MAT_PER='"+ hi_ID_MAT_PER +"'";                    
                    s.executeUpdate(sql);
                    out.println("1");  
                    //************************************************************************************************************************//                         
                }
                
                //******************************************************************************************************************//
            }
        } catch (Exception e) {
            out.println("No se ha completado la peticiÃ³n...");
            e.printStackTrace(new java.io.PrintWriter(out)); 
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP
     * <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP
     * <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
}
