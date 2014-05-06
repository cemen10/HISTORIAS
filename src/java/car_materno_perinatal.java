import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.*;
import javax.servlet.http.HttpSession;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

/**
 *
 * @author carlosmario
 */
public class car_materno_perinatal extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        
        Conexion conect= new Conexion();
        Connection conex=conect.getConnection();
        HttpSession session= request.getSession(true);
        HttpSession sa= request.getSession(true);
        String usuario= (String) session.getAttribute("USUARIO");
        String sql="";
        String materno=""; 
                
        try {
            if(usuario==null){
                usuario="";
                out.println("<script>alert('Su Sesion Ha Terminado. Inicie Sesion Nuevamente'); location.href='../index.jsp'</script>");
            }else{
                ResultSet rs;
                Statement s=conex.createStatement();
                JSONObject datos=new JSONObject();  
                String hi_ID_MAT_PER=request.getParameter("hi_ID_MAT_PER");
     
                ////////////////////////////CAMBIAR SQL//////////////////////////////////////////////////
                //*************************TABLA ANTECEDENTES FAMILIARES***************//
                sql="SELECT " 
                    + " *FROM "
                        + " salud_antecedentes_fam af " 
                    + " INNER JOIN"
                        + " salud_materno_perinatal mp  "
                    + "  ON"
                        + " af.hi_ID_MAT_PER = mp.hi_ID_MAT_PER  "
                    + " WHERE af.hi_ID_MAT_PER='" + hi_ID_MAT_PER + "'";        
                rs=s.executeQuery(sql);     
                rs.next();
                datos.put("hi_ID_ANTFAM",rs.getString("hi_ID_ANTFAM"));
                datos.put("hi_HTA_CRONICA_ANTFAM",rs.getString("hi_HTA_CRONICA_ANTFAM"));
                datos.put("hi_PREECLAMPSIA1_ANTFAM",rs.getString("hi_PREECLAMPSIA1_ANTFAM"));
                datos.put("hi_DIABETES1_ANTFAM",rs.getString("hi_DIABETES1_ANTFAM"));
                datos.put("hi_ECLAMPSIA1_ANTFAM",rs.getString("hi_ECLAMPSIA1_ANTFAM"));
                datos.put("hi_GEMELARES_ANTFAM",rs.getString("hi_GEMELARES_ANTFAM"));
                datos.put("hi_CARDIOPATIA_ANTFAM",rs.getString("hi_CARDIOPATIA_ANTFAM"));
                datos.put("hi_TBC_ANTFAM",rs.getString("hi_TBC_ANTFAM"));
                datos.put("hi_METABOLICOS_ANTFAM",rs.getString("hi_METABOLICOS_ANTFAM"));
                datos.put("hi_AUTOINMUNES_ANTFAM",rs.getString("hi_AUTOINMUNES_ANTFAM"));
                datos.put("hi_INFECCIOSAS_ANTFAM",rs.getString("hi_INFECCIOSAS_ANTFAM"));
                datos.put("hi_CONGENITAS_ANTFAM",rs.getString("hi_CONGENITAS_ANTFAM"));
                datos.put("hi_NEOPLASIAS_ANTFAM",rs.getString("hi_NEOPLASIAS_ANTFAM"));
                datos.put("hi_EPILEPSIA_ANTFAM",rs.getString("hi_EPILEPSIA_ANTFAM"));
                datos.put("hi_OTROS1_ANTFAM",rs.getString("hi_OTROS1_ANTFAM"));
                datos.put("hi_CUAL1_ANTFAM",rs.getString("hi_CUAL1_ANTFAM"));                                
                //*********************************************************************//     
                //*************************TABLA ANTECEDENTES PERSONALES***************//
                sql="SELECT " 
                    + " *FROM "
                        + " salud_antecedentes_per ap " 
                    + " INNER JOIN"
                        + " salud_materno_perinatal mp "
                    + "  ON"
                        + " ap.hi_ID_MAT_PER=mp.hi_ID_MAT_PER  "
                    + " WHERE ap.hi_ID_MAT_PER='" + hi_ID_MAT_PER + "'";        
                rs=s.executeQuery(sql);     
                rs.next();                
                datos.put("hi_ID_ANTPER",rs.getString("hi_ID_ANTPER"));
                datos.put("hi_TUBERCULOSIS_ANTPER",rs.getString("hi_TUBERCULOSIS_ANTPER"));
                datos.put("hi_DIABETES2_ANTPER",rs.getString("hi_DIABETES2_ANTPER"));
                datos.put("hi_DIABETES_GES_ANTPER",rs.getString("hi_DIABETES_GES_ANTPER"));
                datos.put("hi_HTA_CRONICA2_ANTPER",rs.getString("hi_HTA_CRONICA2_ANTPER"));
                datos.put("hi_CIRUGIAPELUTE_ANTPER",rs.getString("hi_CIRUGIAPELUTE_ANTPER"));
                datos.put("hi_PREECLAMPSIA2_ANTPER",rs.getString("hi_PREECLAMPSIA2_ANTPER"));
                datos.put("hi_ECLAMPSIA2_ANTPER",rs.getString("hi_ECLAMPSIA2_ANTPER"));
                datos.put("hi_ALERGICOS_ANTPER",rs.getString("hi_ALERGICOS_ANTPER"));
                datos.put("hi_TABAQUISMO_ANTPER",rs.getString("hi_TABAQUISMO_ANTPER"));
                datos.put("hi_ALCOHOLISMO_ANTPER",rs.getString("hi_ALCOHOLISMO_ANTPER"));
                datos.put("hi_ANTITETANICA_ANTPER",rs.getString("hi_ANTITETANICA_ANTPER"));
                datos.put("hi_MMR_ANTPER",rs.getString("hi_MMR_ANTPER"));
                datos.put("hi_ENFERMEDAD_MEN_ANTPER",rs.getString("hi_ENFERMEDAD_MEN_ANTPER"));
                datos.put("hi_ACTIVIDAD_FIS_ANTPER",rs.getString("hi_ACTIVIDAD_FIS_ANTPER"));
                datos.put("hi_VICTIMA_MAL_ANTPER",rs.getString("hi_VICTIMA_MAL_ANTPER"));
                datos.put("hi_OTROS2_ANTPER",rs.getString("hi_OTROS2_ANTPER"));
                datos.put("hi_CUAL2_ANTPER",rs.getString("hi_CUAL2_ANTPER"));
                //*********************************************************************//     
                //*********************TABLA GINECOLOGICOS Y OBSTETRICOS***************//
                sql="SELECT " 
                    + " *FROM "
                        + " salud_antecedentes_gine ap " 
                    + " INNER JOIN"
                        + " salud_materno_perinatal mp "
                    + "  ON"
                        + " ap.hi_ID_MAT_PER=mp.hi_ID_MAT_PER  "
                    + " WHERE ap.hi_ID_MAT_PER='" + hi_ID_MAT_PER + "'";        
                rs=s.executeQuery(sql);     
                rs.next();             
                datos.put("hi_ID_ANTGIN",rs.getString("hi_ID_ANTGIN"));
                datos.put("hi_MENARQUIA_ANTGIN",rs.getString("hi_MENARQUIA_ANTGIN"));
                datos.put("hi_G_ANTGIN",rs.getString("hi_G_ANTGIN"));
                datos.put("hi_P_ANTGIN",rs.getString("hi_P_ANTGIN"));
                datos.put("hi_C_ANTGIN",rs.getString("hi_C_ANTGIN"));
                datos.put("hi_A_ANTGIN",rs.getString("hi_A_ANTGIN"));
                datos.put("hi_E_ANTGIN",rs.getString("hi_E_ANTGIN"));
                datos.put("hi_V_ANTGIN",rs.getString("hi_V_ANTGIN"));
                datos.put("hi_M_ANTGIN",rs.getString("hi_M_ANTGIN"));
                datos.put("hi_CICLOS_ANTGIN",rs.getString("hi_CICLOS_ANTGIN"));
                datos.put("hi_PLANIFICACION_FAM_ANTGIN",rs.getString("hi_PLANIFICACION_FAM_ANTGIN"));
                datos.put("hi_FLUJO_VAG_ANTGIN",rs.getString("hi_FLUJO_VAG_ANTGIN"));
                datos.put("hi_ITS_ANTGIN",rs.getString("hi_ITS_ANTGIN"));
                datos.put("hi_CITOLOGIA_ULT_ANTGIN",rs.getString("hi_CITOLOGIA_ULT_ANTGIN"));
                datos.put("hi_COLCOPSCOPIA_ANTGIN",rs.getString("hi_COLCOPSCOPIA_ANTGIN"));
                datos.put("hi_PERIODO_INTER_ANTGIN",rs.getString("hi_PERIODO_INTER_ANTGIN"));
                datos.put("hi_INFERTILIDAD_ANTGIN",rs.getString("hi_INFERTILIDAD_ANTGIN"));
                datos.put("hi_TTOS_INFER_ANTGIN",rs.getString("hi_TTOS_INFER_ANTGIN"));
                datos.put("hi_RPM_ANTGIN",rs.getString("hi_RPM_ANTGIN"));
                datos.put("hi_RCIU_ANTGIN",rs.getString("hi_RCIU_ANTGIN"));
                datos.put("hi_APP_ANTGIN",rs.getString("hi_APP_ANTGIN"));
                datos.put("hi_PARTO_PREM_ANTGIN",rs.getString("hi_PARTO_PREM_ANTGIN"));
                datos.put("hi_GEMELAR_ANTGIN",rs.getString("hi_GEMELAR_ANTGIN"));
                datos.put("hi_MALFORMACIONES_ANTGIN",rs.getString("hi_MALFORMACIONES_ANTGIN"));
                datos.put("hi_POLIHIDRAMNIOS_ANTGIN",rs.getString("hi_POLIHIDRAMNIOS_ANTGIN"));
                datos.put("hi_OLIGOHIDRAMNIOS_ANTGIN",rs.getString("hi_OLIGOHIDRAMNIOS_ANTGIN"));
                datos.put("hi_EMB_PROLONGADO_ANTGIN",rs.getString("hi_EMB_PROLONGADO_ANTGIN"));
                datos.put("hi_AMENAZA_ABO_ANTGIN",rs.getString("hi_AMENAZA_ABO_ANTGIN"));
                datos.put("hi_OTROS3_ANTGIN",rs.getString("hi_OTROS3_ANTGIN"));
                datos.put("hi_CUAL3_ANTGIN",rs.getString("hi_CUAL3_ANTGIN"));
                datos.put("hi_CUALITS_ANTGIN",rs.getString("hi_CUALITS_ANTGIN"));
                //*********************************************************************//  
                //*********************TABLA HISTORIA REPRODUCTIVA*********************//
                sql="SELECT " 
                    + " *FROM "
                        + " salud_historia_repro ap " 
                    + " INNER JOIN"
                        + " salud_materno_perinatal mp "
                    + "  ON"
                        + " ap.hi_ID_MAT_PER=mp.hi_ID_MAT_PER  "
                    + " WHERE ap.hi_ID_MAT_PER='" + hi_ID_MAT_PER + "'";        
                rs=s.executeQuery(sql);     
                rs.next();                 
                datos.put("hi_ID_HISREP",rs.getString("hi_ID_HISREP"));
                datos.put("hi_EDAD_HISREP",rs.getString("hi_EDAD_HISREP"));
                datos.put("hi_PARIDAD_HISREP",rs.getString("hi_PARIDAD_HISREP"));
                datos.put("hi_ABORTO_HABIT_HISREP",rs.getString("hi_ABORTO_HABIT_HISREP"));
                datos.put("hi_RETENCION_PLA_HISREP",rs.getString("hi_RETENCION_PLA_HISREP"));
                datos.put("hi_REC_NACIDO1_HISREP",rs.getString("hi_REC_NACIDO1_HISREP"));
                datos.put("hi_REC_NACIDO2_HISREP",rs.getString("hi_REC_NACIDO2_HISREP"));
                datos.put("hi_HTA_INDUCIDO_HISREP",rs.getString("hi_HTA_INDUCIDO_HISREP"));
                datos.put("hi_EMB_GEMEL_CES_HISREP",rs.getString("hi_EMB_GEMEL_CES_HISREP"));
                datos.put("hi_MORTINATO_HISREP",rs.getString("hi_MORTINATO_HISREP"));
                datos.put("hi_TP_PROLON_HISREP",rs.getString("hi_TP_PROLON_HISREP"));                
                //*********************************************************************//  
                //*********************TABLA CONDICIONES ASOCIADAS*********************//
                sql="SELECT " 
                    + " *FROM "
                        + " salud_condiciones_asoc ap " 
                    + " INNER JOIN"
                        + " salud_materno_perinatal mp "
                    + "  ON"
                        + " ap.hi_ID_MAT_PER=mp.hi_ID_MAT_PER  "
                    + " WHERE ap.hi_ID_MAT_PER='" + hi_ID_MAT_PER + "'";        
                rs=s.executeQuery(sql);     
                rs.next();                 
                datos.put("hi_ID_CONASO",rs.getString("hi_ID_CONASO"));
                datos.put("hi_QX_GINECOLOGIAS1_CONASO",rs.getString("hi_QX_GINECOLOGIAS1_CONASO"));
                datos.put("hi_ENF_RENS1_CONASO",rs.getString("hi_ENF_RENS1_CONASO"));
                datos.put("hi_DIABETES_GESS1_CONASO",rs.getString("hi_DIABETES_GESS1_CONASO"));
                datos.put("hi_DIABETES_MELLIS1_CONASO",rs.getString("hi_DIABETES_MELLIS1_CONASO"));
                datos.put("hi_ENF_CARDIACAS1_CONASO",rs.getString("hi_ENF_CARDIACAS1_CONASO"));
                datos.put("hi_ENF_INFAGUDAS1_CONASO",rs.getString("hi_ENF_INFAGUDAS1_CONASO"));
                datos.put("hi_ENF_AUTOINMUNES1_CONASO",rs.getString("hi_ENF_AUTOINMUNES1_CONASO"));
                datos.put("hi_ANEMIA_HBS1_CONASO",rs.getString("hi_ANEMIA_HBS1_CONASO"));
                datos.put("hi_QX_GINECOLOGIAS2_CONASO",rs.getString("hi_QX_GINECOLOGIAS2_CONASO"));
                datos.put("hi_ENF_RENS2_CONASO",rs.getString("hi_ENF_RENS2_CONASO"));
                datos.put("hi_DIABETES_GESS2_CONASO",rs.getString("hi_DIABETES_GESS2_CONASO"));
                datos.put("hi_DIABETES_MELLIS2_CONASO",rs.getString("hi_DIABETES_MELLIS2_CONASO"));
                datos.put("hi_ENF_CARDIACAS2_CONASO",rs.getString("hi_ENF_CARDIACAS2_CONASO"));
                datos.put("hi_ENF_INFAGUDAS2_CONASO",rs.getString("hi_ENF_INFAGUDAS2_CONASO"));
                datos.put("hi_ENF_AUTOINMUNES2_CONASO",rs.getString("hi_ENF_AUTOINMUNES2_CONASO"));
                datos.put("hi_ANEMIA_HBS2_CONASO",rs.getString("hi_ANEMIA_HBS2_CONASO"));
                datos.put("hi_QX_GINECOLOGIAS3_CONASO",rs.getString("hi_QX_GINECOLOGIAS3_CONASO"));
                datos.put("hi_ENF_RENS3_CONASO",rs.getString("hi_ENF_RENS3_CONASO"));
                datos.put("hi_DIABETES_GESS3_CONASO",rs.getString("hi_DIABETES_GESS3_CONASO"));
                datos.put("hi_DIABETES_MELLIS3_CONASO",rs.getString("hi_DIABETES_MELLIS3_CONASO"));
                datos.put("hi_ENF_CARDIACAS3_CONASO",rs.getString("hi_ENF_CARDIACAS3_CONASO"));
                datos.put("hi_ENF_INFAGUDAS3_CONASO",rs.getString("hi_ENF_INFAGUDAS3_CONASO"));
                datos.put("hi_ENF_AUTOINMUNES3_CONASO",rs.getString("hi_ENF_AUTOINMUNES3_CONASO"));
                datos.put("hi_ANEMIA_HBS3_CONASO",rs.getString("hi_ANEMIA_HBS3_CONASO"));                
                //*********************************************************************//  
                //*********************TABLA EMBARAZO ACTUAL***************************//
                sql="SELECT " 
                    + " *FROM "
                        + " salud_embarazo_act ap " 
                    + " INNER JOIN"
                        + " salud_materno_perinatal mp "
                    + "  ON"
                        + " ap.hi_ID_MAT_PER=mp.hi_ID_MAT_PER  "
                    + " WHERE ap.hi_ID_MAT_PER='" + hi_ID_MAT_PER + "'";        
                rs=s.executeQuery(sql);     
                rs.next();                  
                datos.put("hi_ID_EMBACT",rs.getString("hi_ID_EMBACT"));
                datos.put("hi_HEMORRAGIAS1_MAL_EMBACT",rs.getString("hi_HEMORRAGIAS1_MAL_EMBACT"));
                datos.put("hi_VAGINAS1_MAL_EMBACT",rs.getString("hi_VAGINAS1_MAL_EMBACT"));
                datos.put("hi_E_PROLONGADOS1_MAL_EMBACT",rs.getString("hi_E_PROLONGADOS1_MAL_EMBACT"));
                datos.put("hi_HTAS1_MAL_EMBACT",rs.getString("hi_HTAS1_MAL_EMBACT"));
                datos.put("hi_RPMS1_MAL_EMBACT",rs.getString("hi_RPMS1_MAL_EMBACT"));
                datos.put("hi_POLIHRIDAMNIOSS1_MAL_EMBACT",rs.getString("hi_POLIHRIDAMNIOSS1_MAL_EMBACT"));
                datos.put("hi_RCIUS1_MAL_EMBACT",rs.getString("hi_RCIUS1_MAL_EMBACT"));
                datos.put("hi_EMB_MULTIPLES1_MAL_EMBACT",rs.getString("hi_EMB_MULTIPLES1_MAL_EMBACT"));
                datos.put("hi_MALA_PRESENTS1_MAL_EMBACT",rs.getString("hi_MALA_PRESENTS1_MAL_EMBACT"));
                datos.put("hi_ISOS1_MAL_EMBACT",rs.getString("hi_ISOS1_MAL_EMBACT"));
                datos.put("hi_HEMORRAGIAS2_MAL_EMBACT",rs.getString("hi_HEMORRAGIAS2_MAL_EMBACT"));
                datos.put("hi_VAGINAS2_MAL_EMBACT",rs.getString("hi_VAGINAS2_MAL_EMBACT"));
                datos.put("hi_E_PROLONGADOS2_MAL_EMBACT",rs.getString("hi_E_PROLONGADOS2_MAL_EMBACT"));
                datos.put("hi_HTAS2_MAL_EMBACT",rs.getString("hi_HTAS2_MAL_EMBACT"));
                datos.put("hi_RPMS2_MAL_EMBACT",rs.getString("hi_RPMS2_MAL_EMBACT"));
                datos.put("hi_POLIHRIDAMNIOSS2_MAL_EMBACT",rs.getString("hi_POLIHRIDAMNIOSS2_MAL_EMBACT"));
                datos.put("hi_RCIUS2_MAL_EMBACT",rs.getString("hi_RCIUS2_MAL_EMBACT"));
                datos.put("hi_EMB_MULTIPLES2_MAL_EMBACT",rs.getString("hi_EMB_MULTIPLES2_MAL_EMBACT"));
                datos.put("hi_MALA_PRESENTS2_MAL_EMBACT",rs.getString("hi_MALA_PRESENTS2_MAL_EMBACT"));
                datos.put("hi_ISOS2_MAL_EMBACT",rs.getString("hi_ISOS2_MAL_EMBACT"));
                datos.put("hi_HEMORRAGIAS3_MAL_EMBACT",rs.getString("hi_HEMORRAGIAS3_MAL_EMBACT"));
                datos.put("hi_VAGINAS3_MAL_EMBACT",rs.getString("hi_VAGINAS3_MAL_EMBACT"));
                datos.put("hi_E_PROLONGADOS3_MAL_EMBACT",rs.getString("hi_E_PROLONGADOS3_MAL_EMBACT"));
                datos.put("hi_HTAS3_MAL_EMBACT",rs.getString("hi_HTAS3_MAL_EMBACT"));
                datos.put("hi_RPMS3_MAL_EMBACT",rs.getString("hi_RPMS3_MAL_EMBACT"));
                datos.put("hi_POLIHRIDAMNIOSS3_MAL_EMBACT",rs.getString("hi_POLIHRIDAMNIOSS3_MAL_EMBACT"));
                datos.put("hi_RCIUS3_MAL_EMBACT",rs.getString("hi_RCIUS3_MAL_EMBACT"));
                datos.put("hi_EMB_MULTIPLES3_MAL_EMBACT",rs.getString("hi_EMB_MULTIPLES3_MAL_EMBACT"));
                datos.put("hi_MALA_PRESENTS3_MAL_EMBACT",rs.getString("hi_MALA_PRESENTS3_MAL_EMBACT"));
                datos.put("hi_ISOS3_MAL_EMBACT",rs.getString("hi_ISOS3_MAL_EMBACT"));
                datos.put("hi_INMUNIZACION_RH_MAL_EMBACT",rs.getString("hi_INMUNIZACION_RH_MAL_EMBACT"));                
                //*********************************************************************// 
                //*********************TABLA RIESGO PSICOSOCIAL************************//
                sql="SELECT " 
                    + " *FROM "
                        + " salud_riesgo_psico ap " 
                    + " INNER JOIN"
                        + " salud_materno_perinatal mp "
                    + "  ON"
                        + " ap.hi_ID_MAT_PER=mp.hi_ID_MAT_PER  "
                    + " WHERE ap.hi_ID_MAT_PER='" + hi_ID_MAT_PER + "'";        
                rs=s.executeQuery(sql);     
                rs.next();                
                datos.put("hi_ID_RIEPSI",rs.getString("hi_ID_RIEPSI"));
                datos.put("hi_TENSION_EMO_RIEPSI",rs.getString("hi_TENSION_EMO_RIEPSI"));
                datos.put("hi_HUMOR_DEPRE_RIEPSI",rs.getString("hi_HUMOR_DEPRE_RIEPSI"));
                datos.put("hi_SINT_NEURO_RIEPSI",rs.getString("hi_SINT_NEURO_RIEPSI"));
                datos.put("hi_SOP_FAM_TIEM_RIEPSI",rs.getString("hi_SOP_FAM_TIEM_RIEPSI"));
                datos.put("hi_SOP_FAM_ESPA_RIEPSI",rs.getString("hi_SOP_FAM_ESPA_RIEPSI"));
                datos.put("hi_SOP_FAM_DIN_RIEPSI",rs.getString("hi_SOP_FAM_DIN_RIEPSI"));
                datos.put("hi_ES_VICTIMA_MAL_RIEPSI",rs.getString("hi_ES_VICTIMA_MAL_RIEPSI"));
                datos.put("hi_CUAL4_RIEPSI",rs.getString("hi_CUAL4_RIEPSI"));
                datos.put("hi_PARENTESCO_MAL_RIEPSI",rs.getString("hi_PARENTESCO_MAL_RIEPSI"));                
                //*********************************************************************// 
                //*********************TABLA RIESGO BIOPSICOSOCIAL PRENATAL************//
                sql="SELECT " 
                    + " *FROM "
                        + " salud_riesgo_biop ap " 
                    + " INNER JOIN"
                        + " salud_materno_perinatal mp "
                    + "  ON"
                        + " ap.hi_ID_MAT_PER=mp.hi_ID_MAT_PER  "
                    + " WHERE ap.hi_ID_MAT_PER='" + hi_ID_MAT_PER + "'";        
                rs=s.executeQuery(sql);     
                rs.next();                  
                datos.put("hi_ID_RIEBIO",rs.getString("hi_ID_RIEBIO"));
                datos.put("hi_TOTALS1_RIEBIO",rs.getString("hi_TOTALS1_RIEBIO"));
                datos.put("hi_TOTALS2_RIEBIO",rs.getString("hi_TOTALS2_RIEBIO"));
                datos.put("hi_TOTALS3_RIEBIO",rs.getString("hi_TOTALS3_RIEBIO"));
                //*********************************************************************// 
                //*****************************EXAMENES GLICEMIA******************************//
                sql="SELECT " 
                    + " *FROM "
                        + " salud_examenes_glicemia ap " 
                    + " INNER JOIN"
                        + " salud_materno_perinatal mp "
                    + "  ON"
                        + " ap.hi_ID_MAT_PER=mp.hi_ID_MAT_PER  "
                    + " WHERE ap.hi_ID_MAT_PER='" + hi_ID_MAT_PER + "'";        
                rs=s.executeQuery(sql);     
                rs.next();                  
                datos.put("hi_ID_EXAGLI",rs.getString("hi_ID_EXAGLI"));
                datos.put("hi_GLICEMIA_AYU_EXAGLI",rs.getString("hi_GLICEMIA_AYU_EXAGLI"));
                datos.put("hi_2GLICEMIA_EXAGLI",rs.getString("hi_2GLICEMIA_EXAGLI"));
                datos.put("hi_FECHA_REALIZA_EXAGLI",rs.getString("hi_FECHA_REALIZA_EXAGLI"));
                datos.put("hi_GRUPO_EXAGLI",rs.getString("hi_GRUPO_EXAGLI"));
                datos.put("hi_RH_EXAGLI",rs.getString("hi_RH_EXAGLI"));                
                //*********************************************************************// 
                //*****************************EXAMENES CTGO******************************//
                sql="SELECT " 
                    + " *FROM "
                        + " salud_examenes_ctgo ap " 
                    + " INNER JOIN"
                        + " salud_materno_perinatal mp "
                    + "  ON"
                        + " ap.hi_ID_MAT_PER=mp.hi_ID_MAT_PER  "
                    + " WHERE ap.hi_ID_MAT_PER='" + hi_ID_MAT_PER + "'";        
                rs=s.executeQuery(sql);     
                rs.next(); 
                datos.put("hi_ID_EXACTGO",rs.getString("hi_ID_EXACTGO"));
                datos.put("hi_CTGO_EXACTGO",rs.getString("hi_CTGO_EXACTGO"));
                datos.put("hi_GLICEMIA_PRIMERA_EXACTGO",rs.getString("hi_GLICEMIA_PRIMERA_EXACTGO"));
                datos.put("hi_FECHA_GLICE_PRI_EXACTGO",rs.getString("hi_FECHA_GLICE_PRI_EXACTGO"));
                datos.put("hi_GLICEMIA_SEGUNDA_EXACTGO",rs.getString("hi_GLICEMIA_SEGUNDA_EXACTGO"));
                datos.put("hi_FECHA_GLICE_SEG_EXACTGO",rs.getString("hi_FECHA_GLICE_SEG_EXACTGO"));
                datos.put("hi_CURVA_GLICE_EXACTGO",rs.getString("hi_CURVA_GLICE_EXACTGO"));                
                //*********************************************************************// 
                //*****************************PARACLINICOS 1**************************//
                sql="SELECT " 
                    + " *FROM "
                        + " salud_paraclinicos ap " 
                    + " INNER JOIN"
                        + " salud_materno_perinatal mp "
                    + "  ON"
                        + " ap.hi_ID_MAT_PER=mp.hi_ID_MAT_PER  "
                    + " WHERE ap.hi_ID_MAT_PER='" + hi_ID_MAT_PER + "'";        
                rs=s.executeQuery(sql);     
                rs.next(); 
                datos.put("hi_ID_PARA",rs.getString("hi_ID_PARA"));
                datos.put("hi_HBANT_PARA",rs.getString("hi_HBANT_PARA"));
                datos.put("hi_HCTOANT_PARA",rs.getString("hi_HCTOANT_PARA"));
                datos.put("hi_VDRLANT_PARA",rs.getString("hi_VDRLANT_PARA"));
                datos.put("hi_FROTIS_VAGANT_PARA",rs.getString("hi_FROTIS_VAGANT_PARA"));
                datos.put("hi_PARCIALANT_PARA",rs.getString("hi_PARCIALANT_PARA"));
                datos.put("hi_GRAMORINAANT_PARA",rs.getString("hi_GRAMORINAANT_PARA"));
                datos.put("hi_BACTANT_PARA",rs.getString("hi_BACTANT_PARA"));
                datos.put("hi_HB1TRI_PARA",rs.getString("hi_HB1TRI_PARA"));
                datos.put("hi_HCTO1TRI_PARA",rs.getString("hi_HCTO1TRI_PARA"));
                datos.put("hi_VDRL1TRI_PARA",rs.getString("hi_VDRL1TRI_PARA"));
                datos.put("hi_FROTIS_VAG1TRI_PARA",rs.getString("hi_FROTIS_VAG1TRI_PARA"));
                datos.put("hi_PARCIAL1TRI_PARA",rs.getString("hi_PARCIAL1TRI_PARA"));
                datos.put("hi_GRAMORINA1TRI_PARA",rs.getString("hi_GRAMORINA1TRI_PARA"));
                datos.put("hi_BACT1TRI_PARA",rs.getString("hi_BACT1TRI_PARA"));
                datos.put("hi_HB2TRI_PARA",rs.getString("hi_HB2TRI_PARA"));
                datos.put("hi_HCTO2TRI_PARA",rs.getString("hi_HCTO2TRI_PARA"));
                datos.put("hi_VDRL2TRI_PARA",rs.getString("hi_VDRL2TRI_PARA"));
                datos.put("hi_FROTIS_VAG2TRI_PARA",rs.getString("hi_FROTIS_VAG2TRI_PARA"));
                datos.put("hi_PARCIAL2TRI_PARA",rs.getString("hi_PARCIAL2TRI_PARA"));
                datos.put("hi_GRAMORINA2TRI_PARA",rs.getString("hi_GRAMORINA2TRI_PARA"));
                datos.put("hi_BACT2TRI_PARA",rs.getString("hi_BACT2TRI_PARA"));
                datos.put("hi_HB3TRI_PARA",rs.getString("hi_HB3TRI_PARA"));
                datos.put("hi_HCTO3TRI_PARA",rs.getString("hi_HCTO3TRI_PARA"));
                datos.put("hi_VDRL3TRI_PARA",rs.getString("hi_VDRL3TRI_PARA"));
                datos.put("hi_FROTIS_VAG3TRI_PARA",rs.getString("hi_FROTIS_VAG3TRI_PARA"));
                datos.put("hi_PARCIAL3TRI_PARA",rs.getString("hi_PARCIAL3TRI_PARA"));
                datos.put("hi_GRAMORINA3TRI_PARA",rs.getString("hi_GRAMORINA3TRI_PARA"));
                datos.put("hi_BACT3TRI_PARA",rs.getString("hi_BACT3TRI_PARA"));                
                //*********************************************************************// 
                //*****************************PARACLINICOS 2**************************//
                sql="SELECT " 
                    + " *FROM "
                        + " salud_paraclinicos2 ap " 
                    + " INNER JOIN"
                        + " salud_materno_perinatal mp "
                    + "  ON"
                        + " ap.hi_ID_MAT_PER=mp.hi_ID_MAT_PER  "
                    + " WHERE ap.hi_ID_MAT_PER='" + hi_ID_MAT_PER + "'";        
                rs=s.executeQuery(sql);     
                rs.next(); 
                datos.put("hi_ID_PARA2",rs.getString("hi_ID_PARA2"));
                datos.put("hi_UROCULTIVOANT_PARA2",rs.getString("hi_UROCULTIVOANT_PARA2"));
                datos.put("hi_FTAABSANT_PARA2",rs.getString("hi_FTAABSANT_PARA2"));
                datos.put("hi_HEPATITISBANT_PARA2",rs.getString("hi_HEPATITISBANT_PARA2"));
                datos.put("hi_ANTITETANICAANT_PARA2",rs.getString("hi_ANTITETANICAANT_PARA2"));
                datos.put("hi_HIVANT_PARA2",rs.getString("hi_HIVANT_PARA2"));
                datos.put("hi_CITOLOGIA_CERANT_PARA2",rs.getString("hi_CITOLOGIA_CERANT_PARA2"));
                datos.put("hi_UROCULTIVO1TRI_PARA2",rs.getString("hi_UROCULTIVO1TRI_PARA2"));
                datos.put("hi_FTAABS1TRI_PARA2",rs.getString("hi_FTAABS1TRI_PARA2"));
                datos.put("hi_HEPATITISB1TRI_PARA2",rs.getString("hi_HEPATITISB1TRI_PARA2"));
                datos.put("hi_ANTITETANICA1TRI_PARA2",rs.getString("hi_ANTITETANICA1TRI_PARA2"));
                datos.put("hi_HIV1TRI_PARA2",rs.getString("hi_HIV1TRI_PARA2"));
                datos.put("hi_CITOLOGIA_CER1TRI_PARA2",rs.getString("hi_CITOLOGIA_CER1TRI_PARA2"));
                datos.put("hi_UROCULTIVO2TRI_PARA2",rs.getString("hi_UROCULTIVO2TRI_PARA2"));
                datos.put("hi_FTAABS2TRI_PARA2",rs.getString("hi_FTAABS2TRI_PARA2"));
                datos.put("hi_HEPATITISB2TRI_PARA2",rs.getString("hi_HEPATITISB2TRI_PARA2"));
                datos.put("hi_ANTITETANICA2TRI_PARA2",rs.getString("hi_ANTITETANICA2TRI_PARA2"));
                datos.put("hi_HIV2TRI_PARA2",rs.getString("hi_HIV2TRI_PARA2"));
                datos.put("hi_CITOLOGIA_CER2TRI_PARA2",rs.getString("hi_CITOLOGIA_CER2TRI_PARA2"));
                datos.put("hi_UROCULTIVO3TRI_PARA2",rs.getString("hi_UROCULTIVO3TRI_PARA2"));
                datos.put("hi_FTAABS3TRI_PARA2",rs.getString("hi_FTAABS3TRI_PARA2"));
                datos.put("hi_HEPATITISB3TRI_PARA2",rs.getString("hi_HEPATITISB3TRI_PARA2"));
                datos.put("hi_ANTITETANICA3TRI_PARA2",rs.getString("hi_ANTITETANICA3TRI_PARA2"));
                datos.put("hi_HIV3TRI_PARA2",rs.getString("hi_HIV3TRI_PARA2"));
                datos.put("hi_CITOLOGIA_CER3TRI_PARA2",rs.getString("hi_CITOLOGIA_CER3TRI_PARA2"));                
                //*********************************************************************// 
                //*****************************O SULLIVAN******************************//
                sql="SELECT " 
                    + " *FROM "
                        + " salud_exam_osullivan ap " 
                    + " INNER JOIN"
                        + " salud_materno_perinatal mp "
                    + "  ON"
                        + " ap.hi_ID_MAT_PER=mp.hi_ID_MAT_PER  "
                    + " WHERE ap.hi_ID_MAT_PER='" + hi_ID_MAT_PER + "'";        
                rs=s.executeQuery(sql);     
                rs.next();                 
                datos.put("hi_ID_SULLI",rs.getString("hi_ID_SULLI"));
                datos.put("hi_GLISEMIA_PRE_SULLI",rs.getString("hi_GLISEMIA_PRE_SULLI"));
                datos.put("hi_GLICEMIA_POST_SULLI",rs.getString("hi_GLICEMIA_POST_SULLI"));
                datos.put("hi_FECHA_RESULTADO_SULLI",rs.getString("hi_FECHA_RESULTADO_SULLI"));
                datos.put("hi_S16_SULLI",rs.getString("hi_S16_SULLI"));
                datos.put("hi_S20_SULLI",rs.getString("hi_S20_SULLI"));
                datos.put("hi_S24_SULLI",rs.getString("hi_S24_SULLI"));
                datos.put("hi_S28_SULLI",rs.getString("hi_S28_SULLI"));
                datos.put("hi_S32_SULLI",rs.getString("hi_S32_SULLI"));
                datos.put("hi_S36_SULLI",rs.getString("hi_S36_SULLI"));
                datos.put("hi_FECHAS16_SULLI",rs.getString("hi_FECHAS16_SULLI"));
                datos.put("hi_FECHAS20_SULLI",rs.getString("hi_FECHAS20_SULLI"));
                datos.put("hi_FECHAS24_SULLI",rs.getString("hi_FECHAS24_SULLI"));
                datos.put("hi_FECHAS28_SULLI",rs.getString("hi_FECHAS28_SULLI"));
                datos.put("hi_FECHAS32_SULLI",rs.getString("hi_FECHAS32_SULLI"));
                datos.put("hi_FECHAS36_SULLI",rs.getString("hi_FECHAS36_SULLI"));
                datos.put("hi_ROLLOVERTEXT_SULLI",rs.getString("hi_ROLLOVERTEXT_SULLI"));                
                //*********************************************************************// 
                //*****************************ECO*************************************//
                sql="SELECT " 
                    + " *FROM "
                        + " salud_eco ap " 
                    + " INNER JOIN"
                        + " salud_materno_perinatal mp "
                    + "  ON"
                        + " ap.hi_ID_MAT_PER=mp.hi_ID_MAT_PER  "
                    + " WHERE ap.hi_ID_MAT_PER='" + hi_ID_MAT_PER + "'";        
                rs=s.executeQuery(sql);     
                rs.next();      
                datos.put("hi_ID_ECO",rs.getString("hi_ID_ECO"));
                datos.put("hi_EDAD_GEST1C_ECO",rs.getString("hi_EDAD_GEST1C_ECO"));
                datos.put("hi_GESTACIONALAMENO1C_ECO",rs.getString("hi_GESTACIONALAMENO1C_ECO"));
                datos.put("hi_PRESENCIA_HEMA1C_ECO",rs.getString("hi_PRESENCIA_HEMA1C_ECO"));
                datos.put("hi_OTROS_MARCADORES1C_ECO",rs.getString("hi_OTROS_MARCADORES1C_ECO"));
                datos.put("hi_SONOLUCENCIAS1C_ECO",rs.getString("hi_SONOLUCENCIAS1C_ECO"));
                datos.put("hi_OBSERVACIONES1C_ECO",rs.getString("hi_OBSERVACIONES1C_ECO"));
                datos.put("hi_EDAD_GEST1TRI_ECO",rs.getString("hi_EDAD_GEST1TRI_ECO"));
                datos.put("hi_GESTACIONALAMENO1TRI_ECO",rs.getString("hi_GESTACIONALAMENO1TRI_ECO"));
                datos.put("hi_PRESENCIA_HEMA1TRI_ECO",rs.getString("hi_PRESENCIA_HEMA1TRI_ECO"));
                datos.put("hi_OTROS_MARCADORES1TRI_ECO",rs.getString("hi_OTROS_MARCADORES1TRI_ECO"));
                datos.put("hi_SONOLUCENCIAS1TRI_ECO",rs.getString("hi_SONOLUCENCIAS1TRI_ECO"));
                datos.put("hi_OBSERVACIONES1TRI_ECO",rs.getString("hi_OBSERVACIONES1TRI_ECO"));
                datos.put("hi_NORMA2TRI_ECO",rs.getString("hi_NORMA2TRI_ECO"));
                datos.put("hi_POLIHRIDAMNIOS2TRI_ECO",rs.getString("hi_POLIHRIDAMNIOS2TRI_ECO"));
                datos.put("hi_RCIU2TRI_ECO",rs.getString("hi_RCIU2TRI_ECO"));
                datos.put("hi_OLIGOHIDRAMNIOS2TRI_ECO",rs.getString("hi_OLIGOHIDRAMNIOS2TRI_ECO"));
                datos.put("hi_MACROSOMIA2TRI_ECO",rs.getString("hi_MACROSOMIA2TRI_ECO"));
                datos.put("hi_MALFORMACION2TRI_ECO",rs.getString("hi_MALFORMACION2TRI_ECO"));
                datos.put("hi_OTRAS_ANO2TRI_ECO",rs.getString("hi_OTRAS_ANO2TRI_ECO"));
                datos.put("hi_OBSERVA2TRI_ECO",rs.getString("hi_OBSERVA2TRI_ECO"));
                datos.put("hi_NORMA3TRI_ECO",rs.getString("hi_NORMA3TRI_ECO"));
                datos.put("hi_POLIHRIDAMNIOS3TRI_ECO",rs.getString("hi_POLIHRIDAMNIOS3TRI_ECO"));
                datos.put("hi_RCIU3TRI_ECO",rs.getString("hi_RCIU3TRI_ECO"));
                datos.put("hi_OLIGOHIDRAMNIOS3TRI_ECO",rs.getString("hi_OLIGOHIDRAMNIOS3TRI_ECO"));
                datos.put("hi_MACROSOMIA3TRI_ECO",rs.getString("hi_MACROSOMIA3TRI_ECO"));
                datos.put("hi_MALFORMACION3TRI_ECO",rs.getString("hi_MALFORMACION3TRI_ECO"));
                datos.put("hi_OTRAS_ANO3TRI_ECO",rs.getString("hi_OTRAS_ANO3TRI_ECO"));
                datos.put("hi_OBSERVA3TRI_ECO",rs.getString("hi_OBSERVA3TRI_ECO"));                
                //*********************************************************************// 
                //*****************************CONTROL PRENATAL************************//
                sql="SELECT " 
                    + " *FROM "
                        + " salud_control_prenatal ap " 
                    + " INNER JOIN"
                        + " salud_materno_perinatal mp "
                    + "  ON"
                        + " ap.hi_ID_MAT_PER=mp.hi_ID_MAT_PER  "
                    + " WHERE ap.hi_ID_MAT_PER='" + hi_ID_MAT_PER + "'";        
                rs=s.executeQuery(sql);     
                int k=1;
                while(rs.next()){
                    datos.put("hi_ID_CON_PRE"+k,rs.getString("hi_ID_CON_PRE"));
                    datos.put("hi_FECHA_CON_PRE"+k,rs.getString("hi_FECHA_CON_PRE"));
                    datos.put("hi_SEMANAS_CON_PRE"+k,rs.getString("hi_SEMANAS_CON_PRE"));
                    datos.put("hi_PESO_CON_PRE"+k,rs.getString("hi_PESO_CON_PRE"));
                    datos.put("hi_TALLA_CON_PRE"+k,rs.getString("hi_TALLA_CON_PRE"));
                    datos.put("hi_TENSION_CON_PRE"+k,rs.getString("hi_TENSION_CON_PRE"));
                    datos.put("hi_ALTURA_CON_PRE"+k,rs.getString("hi_ALTURA_CON_PRE"));
                    datos.put("hi_FCF_CON_PRE"+k,rs.getString("hi_FCF_CON_PRE"));
                    datos.put("hi_PRESENTACION_CON_PRE"+k,rs.getString("hi_PRESENTACION_CON_PRE"));
                    datos.put("hi_MOVIMIENTOS_CON_PRE"+k,rs.getString("hi_MOVIMIENTOS_CON_PRE"));
                    datos.put("hi_VALORACION_CON_PRE"+k,rs.getString("hi_VALORACION_CON_PRE"));
                    datos.put("hi_EDEMAS_CON_PRE"+k,rs.getString("hi_EDEMAS_CON_PRE"));
                    datos.put("hi_MONITOREO_CON_PRE"+k,rs.getString("hi_MONITOREO_CON_PRE"));
                    datos.put("hi_RESPONSABLE_CON_PRE"+k,rs.getString("hi_RESPONSABLE_CON_PRE"));
                    datos.put("hi_EXAMEN_MA_CON_PRE"+k,rs.getString("hi_EXAMEN_MA_CON_PRE"));
                    datos.put("hi_EXAMEN_GE_CON_PRE"+k,rs.getString("hi_EXAMEN_GE_CON_PRE"));
                    k=k+1;
                }          
                int tam=k-1;
                datos.put("tam", tam);                                               
                //*********************************************************************// 
                //*****************************MORBILIDADES TRAZADORAS*****************//
                sql="SELECT " 
                    + " *FROM "
                        + " salud_preeclampsia ap " 
                    + " INNER JOIN"
                        + " salud_materno_perinatal mp "
                    + "  ON"
                        + " ap.hi_ID_MAT_PER=mp.hi_ID_MAT_PER  "
                    + " WHERE ap.hi_ID_MAT_PER='" + hi_ID_MAT_PER + "'";        
                rs=s.executeQuery(sql);     
                rs.next();          
                datos.put("hi_ID_PREE",rs.getString("hi_ID_PREE"));
                datos.put("hi_SIN_RIESGO_PREE",rs.getString("hi_SIN_RIESGO_PREE"));
                datos.put("hi_CON_RIESGO_SIN_PREE",rs.getString("hi_CON_RIESGO_SIN_PREE"));
                datos.put("hi_CON_RIESGO_UTI_PREE",rs.getString("hi_CON_RIESGO_UTI_PREE"));
                datos.put("hi_CON_RIESGO_BIO1_PREE",rs.getString("hi_CON_RIESGO_BIO1_PREE"));
                datos.put("hi_CON_RIESGO_BIO2_PREE",rs.getString("hi_CON_RIESGO_BIO2_PREE"));
                datos.put("hi_CON_RIESGO_CAL_PREE",rs.getString("hi_CON_RIESGO_CAL_PREE"));
                datos.put("hi_CON_RIESGO_NUTRI_PREE",rs.getString("hi_CON_RIESGO_NUTRI_PREE"));                
                //*********************************************************************// 
                //*****************************EXAMEN**********************************//
                sql="SELECT " 
                    + " *FROM "
                        + " salud_examen ap " 
                    + " INNER JOIN"
                        + " salud_materno_perinatal mp "
                    + "  ON"
                        + " ap.hi_ID_MAT_PER=mp.hi_ID_MAT_PER  "
                    + " WHERE ap.hi_ID_MAT_PER='" + hi_ID_MAT_PER + "'";        
                rs=s.executeQuery(sql);     
                rs.next();              
                datos.put("hi_ID_EXAMEN",rs.getString("hi_ID_EXAMEN"));
                datos.put("hi_PARTO_PRESIN_EXAMEN",rs.getString("hi_PARTO_PRESIN_EXAMEN"));
                datos.put("hi_DIABETESSIN_EXAMEN",rs.getString("hi_DIABETESSIN_EXAMEN"));
                datos.put("hi_BAJOSIN_EXAMEN",rs.getString("hi_BAJOSIN_EXAMEN"));
                datos.put("hi_RIESGOSIN_EXAMEN",rs.getString("hi_RIESGOSIN_EXAMEN"));
                datos.put("hi_HPPSIN_EXAMEN",rs.getString("hi_HPPSIN_EXAMEN"));
                datos.put("hi_PARTO_PRECONSIN_EXAMEN",rs.getString("hi_PARTO_PRECONSIN_EXAMEN"));
                datos.put("hi_DIABETESCONSIN_EXAMEN",rs.getString("hi_DIABETESCONSIN_EXAMEN"));
                datos.put("hi_BAJOCONSIN_EXAMEN",rs.getString("hi_BAJOCONSIN_EXAMEN"));
                datos.put("hi_RIESGOCONSIN_EXAMEN",rs.getString("hi_RIESGOCONSIN_EXAMEN"));
                datos.put("hi_HPPCONSIN_EXAMEN",rs.getString("hi_HPPCONSIN_EXAMEN"));
                datos.put("hi_PARTO_PRECONTRA_EXAMEN",rs.getString("hi_PARTO_PRECONTRA_EXAMEN"));
                datos.put("hi_DIABETESCONTRA_EXAMEN",rs.getString("hi_DIABETESCONTRA_EXAMEN"));
                datos.put("hi_BAJOCONTRA_EXAMEN",rs.getString("hi_BAJOCONTRA_EXAMEN"));
                datos.put("hi_RIESGOCONTRA_EXAMEN",rs.getString("hi_RIESGOCONTRA_EXAMEN"));
                datos.put("hi_HPPCONTRA_EXAMEN",rs.getString("hi_HPPCONTRA_EXAMEN"));                
                //*********************************************************************// 
                //*****************************MORBILIDAD MATERNA**********************//
                sql="SELECT " 
                    + " *FROM "
                        + " salud_morbilidad_materna ap " 
                    + " INNER JOIN"
                        + " salud_materno_perinatal mp "
                    + "  ON"
                        + " ap.hi_ID_MAT_PER=mp.hi_ID_MAT_PER  "
                    + " WHERE ap.hi_ID_MAT_PER='" + hi_ID_MAT_PER + "'";        
                rs=s.executeQuery(sql);     
                rs.next();     
                datos.put("hi_ID_MOR_MAT",rs.getString("hi_ID_MOR_MAT"));
                datos.put("hi_NINGUNA_MOR_MAT",rs.getString("hi_NINGUNA_MOR_MAT"));
                datos.put("hi_ABRUPTIO_MOR_MAT",rs.getString("hi_ABRUPTIO_MOR_MAT"));
                datos.put("hi_AMENAZA_MOR_MAT",rs.getString("hi_AMENAZA_MOR_MAT"));
                datos.put("hi_ANEMIA_MOR_MAT",rs.getString("hi_ANEMIA_MOR_MAT"));
                datos.put("hi_ATONIA_MOR_MAT",rs.getString("hi_ATONIA_MOR_MAT"));
                datos.put("hi_CARDIOPATIA_MOR_MAT",rs.getString("hi_CARDIOPATIA_MOR_MAT"));
                datos.put("hi_CID_MOR_MAT",rs.getString("hi_CID_MOR_MAT"));
                datos.put("hi_DESGARROS_MOR_MAT",rs.getString("hi_DESGARROS_MOR_MAT"));
                datos.put("hi_DIABETES_GES_MOR_MAT",rs.getString("hi_DIABETES_GES_MOR_MAT"));
                datos.put("hi_DIABETES_MELLI_MOR_MAT",rs.getString("hi_DIABETES_MELLI_MOR_MAT"));
                datos.put("hi_ECLAMPSIA_MOR_MAT",rs.getString("hi_ECLAMPSIA_MOR_MAT"));
                datos.put("hi_PREECLAMPSIA_LEVE_MOR_MAT",rs.getString("hi_PREECLAMPSIA_LEVE_MOR_MAT"));
                datos.put("hi_PRECLAMPSIA_SEVERA_MOR_MAT",rs.getString("hi_PRECLAMPSIA_SEVERA_MOR_MAT"));
                datos.put("hi_PRECLAMPSIA_SEVERACON_MOR_MAT",rs.getString("hi_PRECLAMPSIA_SEVERACON_MOR_MAT"));
                datos.put("hi_HEPATITIS_MOR_MAT",rs.getString("hi_HEPATITIS_MOR_MAT"));
                datos.put("hi_HIPERTENCION_CRO_MOR_MAT",rs.getString("hi_HIPERTENCION_CRO_MOR_MAT"));
                datos.put("hi_HIPERTENCION_GES_MOR_MAT",rs.getString("hi_HIPERTENCION_GES_MOR_MAT"));
                datos.put("hi_INFECCION_MOR_MAT",rs.getString("hi_INFECCION_MOR_MAT"));
                datos.put("hi_MALARIA_MOR_MAT",rs.getString("hi_MALARIA_MOR_MAT"));
                datos.put("hi_PLACENTA_PRE_MOR_MAT",rs.getString("hi_PLACENTA_PRE_MOR_MAT"));
                datos.put("hi_PLACENTA_RETE_MOR_MAT",rs.getString("hi_PLACENTA_RETE_MOR_MAT"));
                datos.put("hi_RCIU_MOR_MAT",rs.getString("hi_RCIU_MOR_MAT"));
                datos.put("hi_RUPTURA_MOR_MAT",rs.getString("hi_RUPTURA_MOR_MAT"));
                datos.put("hi_SEPSIS_MOR_MAT",rs.getString("hi_SEPSIS_MOR_MAT"));
                datos.put("hi_SIFILIS_MOR_MAT",rs.getString("hi_SIFILIS_MOR_MAT"));
                datos.put("hi_TBC_MOR_MAT",rs.getString("hi_TBC_MOR_MAT"));
                datos.put("hi_HEMORRAGIA_DEL_MOR_MAT",rs.getString("hi_HEMORRAGIA_DEL_MOR_MAT"));
                datos.put("hi_HEMORRAGIA_POST_MOR_MAT",rs.getString("hi_HEMORRAGIA_POST_MOR_MAT"));
                datos.put("hi_EMBARAZO_MUL_MOR_MAT",rs.getString("hi_EMBARAZO_MUL_MOR_MAT"));
                datos.put("hi_TROMBOEMBOLISMO_MOR_MAT",rs.getString("hi_TROMBOEMBOLISMO_MOR_MAT"));
                datos.put("hi_VIH_MOR_MAT",rs.getString("hi_VIH_MOR_MAT"));
                datos.put("hi_OTRAS_MOR_MAT",rs.getString("hi_OTRAS_MOR_MAT"));
                
                //*********************************************************************// 
                //*****************************PROCEDENCIA*****************************//
                sql="SELECT " 
                    + " *FROM "
                        + " salud_procedencia ap " 
                    + " INNER JOIN"
                        + " salud_materno_perinatal mp "
                    + "  ON"
                        + " ap.hi_ID_MAT_PER_PRO=mp.hi_ID_MAT_PER  "
                    + " WHERE ap.hi_ID_MAT_PER_PRO='" + hi_ID_MAT_PER + "'";        
                rs=s.executeQuery(sql);     
                rs.next();       
                datos.put("hi_ID_PRO",rs.getString("hi_ID_PRO"));
                datos.put("hi_DOMICILIO_PRO",rs.getString("hi_DOMICILIO_PRO"));
                datos.put("hi_HOGAR_PRO",rs.getString("hi_HOGAR_PRO"));
                datos.put("hi_PARTERA_PRO",rs.getString("hi_PARTERA_PRO"));
                datos.put("hi_IPS_PRO",rs.getString("hi_IPS_PRO"));
                datos.put("hi_OTRA_PRO",rs.getString("hi_OTRA_PRO"));                
                //*********************************************************************// 
                //*****************************PARTO***********************************//
                sql="SELECT " 
                    + " *FROM "
                        + " salud_parto ap " 
                    + " INNER JOIN"
                        + " salud_materno_perinatal mp "
                    + "  ON"
                        + " ap.hi_ID_MAT_PER=mp.hi_ID_MAT_PER  "
                    + " WHERE ap.hi_ID_MAT_PER='" + hi_ID_MAT_PER + "'";        
                rs=s.executeQuery(sql);     
                rs.next();                 
                datos.put("hi_ID_PAR",rs.getString("hi_ID_PAR"));
                datos.put("hi_EDAD_GES_PAR",rs.getString("hi_EDAD_GES_PAR"));
                datos.put("hi_TAMA_PAR",rs.getString("hi_TAMA_PAR"));
                datos.put("hi_INICIO_PAR",rs.getString("hi_INICIO_PAR"));
                datos.put("hi_MEMBRANA_PAR",rs.getString("hi_MEMBRANA_PAR"));
                datos.put("hi_FECHA_MEM_PAR",rs.getString("hi_FECHA_MEM_PAR"));
                datos.put("hi_HORA_MEM_PAR",rs.getString("hi_HORA_MEM_PAR"));
                datos.put("hi_PRESENTACION_PAR",rs.getString("hi_PRESENTACION_PAR"));                
                //*********************************************************************// 
                //*****************************ORDEN DE NACIMIENTO*********************//
                sql="SELECT " 
                    + " *FROM "
                        + " salud_orden_nac ap " 
                    + " INNER JOIN"
                        + " salud_materno_perinatal mp "
                    + "  ON"
                        + " ap.hi_ID_MAT_PER=mp.hi_ID_MAT_PER  "
                    + " WHERE ap.hi_ID_MAT_PER='" + hi_ID_MAT_PER + "'";        
                rs=s.executeQuery(sql);     
                rs.next();        
                datos.put("hi_ID_ORD",rs.getString("hi_ID_ORD"));
                datos.put("hi_FETO_ORD",rs.getString("hi_FETO_ORD"));
                datos.put("hi_MANEJO_ORD",rs.getString("hi_MANEJO_ORD"));
                datos.put("hi_PARTOLOGIA_ORD",rs.getString("hi_PARTOLOGIA_ORD"));
                datos.put("hi_EPISIOTOMIA_ORD",rs.getString("hi_EPISIOTOMIA_ORD"));
                datos.put("hi_DESGARROS_ORD",rs.getString("hi_DESGARROS_ORD"));                
                //*********************************************************************// 
                //*****************************TERMINACIÓN*****************************//
                sql="SELECT " 
                    + " *FROM "
                        + " salud_terminacion ap " 
                    + " INNER JOIN"
                        + " salud_materno_perinatal mp "
                    + "  ON"
                        + " ap.hi_ID_MAT_PER=mp.hi_ID_MAT_PER  "
                    + " WHERE ap.hi_ID_MAT_PER='" + hi_ID_MAT_PER + "'";        
                rs=s.executeQuery(sql);     
                rs.next();       
                datos.put("hi_ID_TER",rs.getString("hi_ID_TER"));
                datos.put("hi_ESPONTANEA_TER",rs.getString("hi_ESPONTANEA_TER"));
                datos.put("hi_FORCEPS_TER",rs.getString("hi_FORCEPS_TER"));
                datos.put("hi_CESAREA_TER",rs.getString("hi_CESAREA_TER"));
                datos.put("hi_CESAREA_HIS_TER",rs.getString("hi_CESAREA_HIS_TER"));
                datos.put("hi_FECHA_TER",rs.getString("hi_FECHA_TER"));
                datos.put("hi_HORA_TER",rs.getString("hi_HORA_TER"));
                datos.put("hi_CESAREA_PRE_TER",rs.getString("hi_CESAREA_PRE_TER"));
                datos.put("hi_SUFRIMIENTO_FA_TER",rs.getString("hi_SUFRIMIENTO_FA_TER"));
                datos.put("hi_SESPROPORCION_TER",rs.getString("hi_SESPROPORCION_TER"));
                datos.put("hi_ALTERACION_TER",rs.getString("hi_ALTERACION_TER"));
                datos.put("hi_PARTO_PRO_TER",rs.getString("hi_PARTO_PRO_TER"));
                datos.put("hi_FRACASO_TER",rs.getString("hi_FRACASO_TER"));
                datos.put("hi_DESCENSO_TER",rs.getString("hi_DESCENSO_TER"));
                datos.put("hi_EMBARAZO_MUL_TER",rs.getString("hi_EMBARAZO_MUL_TER"));
                datos.put("hi_RCIU_TER",rs.getString("hi_RCIU_TER"));
                datos.put("hi_PARTO_PRETE1_TER",rs.getString("hi_PARTO_PRETE1_TER"));
                datos.put("hi_PARTO_PRETE2_TER",rs.getString("hi_PARTO_PRETE2_TER"));
                datos.put("hi_PRESENTACION_POD_TER",rs.getString("hi_PRESENTACION_POD_TER"));
                datos.put("hi_PRESENTACION_POS_TER",rs.getString("hi_PRESENTACION_POS_TER"));
                datos.put("hi_POSICION_TER",rs.getString("hi_POSICION_TER"));
                datos.put("hi_RUPTURA_TER",rs.getString("hi_RUPTURA_TER"));
                datos.put("hi_INFECCION_TER",rs.getString("hi_INFECCION_TER"));
                datos.put("hi_PLACENTA_PRE_TER",rs.getString("hi_PLACENTA_PRE_TER"));
                datos.put("hi_ABRUPTIO_TER",rs.getString("hi_ABRUPTIO_TER"));
                datos.put("hi_PRECLAMPSIAECLA_TER",rs.getString("hi_PRECLAMPSIAECLA_TER"));
                datos.put("hi_HERPES_TER",rs.getString("hi_HERPES_TER"));
                datos.put("hi_CONDILOMATOSIS_TER",rs.getString("hi_CONDILOMATOSIS_TER"));
                datos.put("hi_OTRAS_ENF_TER",rs.getString("hi_OTRAS_ENF_TER"));
                datos.put("hi_MUERTE_FET_TER",rs.getString("hi_MUERTE_FET_TER"));
                datos.put("hi_MADRE_EXA_TER",rs.getString("hi_MADRE_EXA_TER"));
                datos.put("hi_DIABETES_TER",rs.getString("hi_DIABETES_TER"));
                datos.put("hi_VIH_TER",rs.getString("hi_VIH_TER"));
                datos.put("hi_OTRAS_TER",rs.getString("hi_OTRAS_TER"));
                datos.put("hi_EXTRA_MANU_PLACEN_TER",rs.getString("hi_EXTRA_MANU_PLACEN_TER"));
                datos.put("hi_PLACENTA_COMPLETA_TER",rs.getString("hi_PLACENTA_COMPLETA_TER"));
                datos.put("hi_HIPOTOMIA_UTERINA_TER",rs.getString("hi_HIPOTOMIA_UTERINA_TER"));
                datos.put("hi_MUERTE_FETAL2_TER",rs.getString("hi_MUERTE_FETAL2_TER"));
                datos.put("hi_PARTO_DESCONO_TER",rs.getString("hi_PARTO_DESCONO_TER"));                
                //*********************************************************************// 
                //*****************************MEDICAMENTOS****************************//
                sql="SELECT " 
                    + " *FROM "
                        + " salud_med ap " 
                    + " INNER JOIN"
                        + " salud_materno_perinatal mp "
                    + "  ON"
                        + " ap.hi_ID_MAT_PER=mp.hi_ID_MAT_PER  "
                    + " WHERE ap.hi_ID_MAT_PER='" + hi_ID_MAT_PER + "'";        
                rs=s.executeQuery(sql);     
                rs.next();      
                datos.put("hi_ID_MED",rs.getString("hi_ID_MED"));
                datos.put("hi_ANESTESIA_LO_MED",rs.getString("hi_ANESTESIA_LO_MED"));
                datos.put("hi_ANESTESIA_RE_MED",rs.getString("hi_ANESTESIA_RE_MED"));
                datos.put("hi_ANESTESIA_GE_MED",rs.getString("hi_ANESTESIA_GE_MED"));
                datos.put("hi_TRANQUIZANTE_MED",rs.getString("hi_TRANQUIZANTE_MED"));
                datos.put("hi_OXITOCINA_MED",rs.getString("hi_OXITOCINA_MED"));
                datos.put("hi_ANTIBIOTICO_MED",rs.getString("hi_ANTIBIOTICO_MED"));
                datos.put("hi_ANALGESICO_MED",rs.getString("hi_ANALGESICO_MED"));
                datos.put("hi_OTRAH_MED",rs.getString("hi_OTRAH_MED"));
                datos.put("hi_NINGUNA_MED",rs.getString("hi_NINGUNA_MED"));                
                //*********************************************************************// 
                //*****************************INSTITUCIÓN*****************************//
                sql="SELECT " 
                    + " *FROM "
                        + " salud_insti ap " 
                    + " INNER JOIN"
                        + " salud_materno_perinatal mp "
                    + "  ON"
                        + " ap.hi_ID_MAT_PER=mp.hi_ID_MAT_PER  "
                    + " WHERE ap.hi_ID_MAT_PER='" + hi_ID_MAT_PER + "'";        
                rs=s.executeQuery(sql);     
                rs.next();
                datos.put("hi_ID_INS",rs.getString("hi_ID_INS"));
                datos.put("hi_INSTITU_INS",rs.getString("hi_INSTITU_INS"));
                datos.put("hi_NIVEL_INS",rs.getString("hi_NIVEL_INS"));
                datos.put("hi_ATENDIOPAR_INS",rs.getString("hi_ATENDIOPAR_INS"));
                datos.put("hi_ATENDIONEO_INS",rs.getString("hi_ATENDIONEO_INS"));                
                //*********************************************************************// 
                //*****************************REMISIÓN********************************//
                sql="SELECT " 
                    + " *FROM "
                        + " salud_recien_nacido ap " 
                    + " INNER JOIN"
                        + " salud_materno_perinatal mp "
                    + "  ON"
                        + " ap.hi_ID_MAT_PER=mp.hi_ID_MAT_PER  "
                    + " WHERE ap.hi_ID_MAT_PER='" + hi_ID_MAT_PER + "'";        
                rs=s.executeQuery(sql);     
                rs.next();
                datos.put("hi_ID_RECNAC",rs.getString("hi_ID_RECNAC"));
                datos.put("hi_HISTORIA_RECNAC",rs.getString("hi_HISTORIA_RECNAC"));
                datos.put("hi_NOMBRE1_RECNAC",rs.getString("hi_NOMBRE1_RECNAC"));
                datos.put("hi_NOMBRE2_RECNAC",rs.getString("hi_NOMBRE2_RECNAC"));
                datos.put("hi_NOMBRE3_RECNAC",rs.getString("hi_NOMBRE3_RECNAC"));
                datos.put("hi_NECREMI_RECNAC",rs.getString("hi_NECREMI_RECNAC"));
                datos.put("hi_INSTITU_RECNAC",rs.getString("hi_INSTITU_RECNAC"));                
                //*********************************************************************// 
                //***********************MOVIMIENTO DE REMISIÓN************************//
                sql="SELECT " 
                    + " *FROM "
                        + " salud_movimiento_rem ap " 
                    + " INNER JOIN"
                        + " salud_materno_perinatal mp "
                    + "  ON"
                        + " ap.hi_ID_MAT_PER=mp.hi_ID_MAT_PER  "
                    + " WHERE ap.hi_ID_MAT_PER='" + hi_ID_MAT_PER + "'";        
                rs=s.executeQuery(sql);     
                rs.next();       
                datos.put("hi_ID_MOVREM",rs.getString("hi_ID_MOVREM"));
                datos.put("hi_RIESGO_MOVREM",rs.getString("hi_RIESGO_MOVREM"));
                datos.put("hi_CESAREA_MOVREM",rs.getString("hi_CESAREA_MOVREM"));
                datos.put("hi_PARTO_MOVREM",rs.getString("hi_PARTO_MOVREM"));
                datos.put("hi_PATOLOGIA_MOVREM",rs.getString("hi_PATOLOGIA_MOVREM"));
                datos.put("hi_DESPROPORCION_MOVREM",rs.getString("hi_DESPROPORCION_MOVREM"));
                datos.put("hi_DISTOCIA_MOVREM",rs.getString("hi_DISTOCIA_MOVREM"));
                datos.put("hi_TRABAJO_MOVREM",rs.getString("hi_TRABAJO_MOVREM"));
                datos.put("hi_INDUCCION_MOVREM",rs.getString("hi_INDUCCION_MOVREM"));
                datos.put("hi_SUFRIMIENTO_MOVREM",rs.getString("hi_SUFRIMIENTO_MOVREM"));
                datos.put("hi_RUPTURA_MOVREM",rs.getString("hi_RUPTURA_MOVREM"));
                datos.put("hi_HEMORRAGIA_MOVREM",rs.getString("hi_HEMORRAGIA_MOVREM"));
                datos.put("hi_OTROS_MOVREM",rs.getString("hi_OTROS_MOVREM"));                
                //*********************************************************************// 
                //*****************************EVOLUCION*******************************//
                sql="SELECT " 
                    + " *FROM "
                        + " salud_evolucion_materno ap " 
                    + " INNER JOIN"
                        + " salud_materno_perinatal mp "
                    + "  ON"
                        + " ap.hi_ID_MAT_PER=mp.hi_ID_MAT_PER  "
                    + " WHERE ap.hi_ID_MAT_PER='" + hi_ID_MAT_PER + "' "
                        + " ORDER BY ap.hi_ID_EVOLUCION DESC ";        
                rs=s.executeQuery(sql);     
                k=1;
                while(rs.next()){
                    datos.put("hi_ID_EVOLUCION"+k,rs.getString("hi_ID_EVOLUCION"));
                    datos.put("hi_SERVICIO_EVOLUCION"+k,rs.getString("hi_SERVICIO_EVOLUCION"));
                    datos.put("hi_SALA_EVOLUCION"+k,rs.getString("hi_SALA_EVOLUCION"));
                    datos.put("hi_N_CAMA_EVOLUCION"+k,rs.getString("hi_N_CAMA_EVOLUCION"));
                    datos.put("hi_FECHA_EVOLUCION"+k,rs.getString("hi_FECHA_EVOLUCION"));
                    datos.put("hi_HORA_EVOLUCION"+k,rs.getString("hi_HORA_EVOLUCION"));
                    datos.put("hi_DX_EVOLUCION"+k,rs.getString("hi_DX_EVOLUCION"));
                    k=k+1;
                }          
                int tamanio=k-1;
                datos.put("tamanio", tamanio);                   
                //*********************************************************************// 
                out.println(datos);
                out.flush();
            }

        } catch (Exception e) {
            out.println("No se ha completado la petici&oacute;n...");
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
