
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
public class gestionar_laboratorio extends HttpServlet {


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
                //////////////////////PROCESO/////////////////////////////////////////
                opcion=request.getParameter("opcion");
                String hi_FECHA_LABO = request.getParameter("hi_FECHA_LABO");
                String hi_ID_LABO = request.getParameter("hi_ID_LABO");

                ///////////////////HEMATOLOGIA///////////////////////////////////////////////////                
                String hi_HEMATOCRITO_HEMA_LABO = request.getParameter("hi_HEMATOCRITO_HEMA_LABO");
                String hi_HEMOGLOBINA_HEMA_LABO = request.getParameter("hi_HEMOGLOBINA_HEMA_LABO");
                String hi_PLAQUETAS_HEMA_LABO = request.getParameter("hi_PLAQUETAS_HEMA_LABO");
                String hi_LEUCOCITOS_HEMA_LABO = request.getParameter("hi_LEUCOCITOS_HEMA_LABO");
                String hi_NEUTROFILOS_HEMA_LABO = request.getParameter("hi_NEUTROFILOS_HEMA_LABO");
                String hi_LINFOCITOS_HEMA_LABO = request.getParameter("hi_LINFOCITOS_HEMA_LABO");
                String hi_EOSINOFILOS_HEMA_LABO = request.getParameter("hi_EOSINOFILOS_HEMA_LABO");
                String hi_CAYADO_HEMA_LABO = request.getParameter("hi_CAYADO_HEMA_LABO");
                String hi_TP_HEMA_LABO = request.getParameter("hi_TP_HEMA_LABO");
                String hi_VN1_HEMA_LABO = request.getParameter("hi_VN1_HEMA_LABO");
                String hi_VSG_HEMA_LABO = request.getParameter("hi_VSG_HEMA_LABO");
                String hi_BASOFILOS_HEMA_LABO = request.getParameter("hi_BASOFILOS_HEMA_LABO");
                String hi_MONOCITOS_HEMA_LABO = request.getParameter("hi_MONOCITOS_HEMA_LABO");
                String hi_JUVENILES_HEMA_LABO = request.getParameter("hi_JUVENILES_HEMA_LABO");
                String hi_ATIPICO_HEMA_LABO = request.getParameter("hi_ATIPICO_HEMA_LABO");
                String hi_TPT_HEMA_LABO = request.getParameter("hi_TPT_HEMA_LABO");
                String hi_VN2_HEMA_LABO = request.getParameter("hi_VN2_HEMA_LABO");
                String hi_GRUPO_SANGUINEO_HEMA_LABO = request.getParameter("hi_GRUPO_SANGUINEO_HEMA_LABO");
                String hi_RH_HEMA_LABO = request.getParameter("hi_RH_HEMA_LABO");
                String hi_OBSERVACION_HEMA_LABO = request.getParameter("hi_OBSERVACION_HEMA_LABO");
                
                ////////////////////URIANALISIS////////////////////////////////////////////
                String hi_ASPECTO_URI_LABO = request.getParameter("hi_ASPECTO_URI_LABO");
                String hi_COLOR_URI_LABO = request.getParameter("hi_COLOR_URI_LABO");
                String hi_PH_URI_LABO = request.getParameter("hi_PH_URI_LABO");
                String hi_DENSIDAD_URI_LABO = request.getParameter("hi_DENSIDAD_URI_LABO");
                String hi_ALBUMINA_URI_LABO = request.getParameter("hi_ALBUMINA_URI_LABO");
                String hi_GLUCOSA_URI_LABO = request.getParameter("hi_GLUCOSA_URI_LABO");
                String hi_ACETONA_URI_LABO = request.getParameter("hi_ACETONA_URI_LABO");
                String hi_SANGRE_URI_LABO = request.getParameter("hi_SANGRE_URI_LABO");
                String hi_BILIRRUBINA_URI_LABO = request.getParameter("hi_BILIRRUBINA_URI_LABO");
                String hi_UROBILINOGENO_URI_LABO = request.getParameter("hi_UROBILINOGENO_URI_LABO");
                String hi_NITRITOS_URI_LABO = request.getParameter("hi_NITRITOS_URI_LABO");
                String hi_LEUCOCITOS_URI_LABO = request.getParameter("hi_LEUCOCITOS_URI_LABO");
                String hi_HEMATIES_URI_LABO = request.getParameter("hi_HEMATIES_URI_LABO");
                String hi_C_EPITELIALES_URI_LABO = request.getParameter("hi_C_EPITELIALES_URI_LABO");
                String hi_CILINDROS_URI_LABO = request.getParameter("hi_CILINDROS_URI_LABO");
                String hi_CRISTALES_URI_LABO = request.getParameter("hi_CRISTALES_URI_LABO");
                String hi_MOCO_URI_LABO = request.getParameter("hi_MOCO_URI_LABO");
                String hi_BACTERIAS_URI_LABO = request.getParameter("hi_BACTERIAS_URI_LABO");
                String hi_LEVADURAS_URI_LABO = request.getParameter("hi_LEVADURAS_URI_LABO");
                String hi_TRICOMONAS_URI_LABO = request.getParameter("hi_TRICOMONAS_URI_LABO");
                String hi_OTROS_URI_LABO = request.getParameter("hi_OTROS_URI_LABO");
                String hi_OBSERVACION_URI_LABO = request.getParameter("hi_OBSERVACION_URI_LABO");

                /////////////////COPROLOGICO/////////////////////////////////////////////////////
                String hi_COLOR_COPRO_LABO = request.getParameter("hi_COLOR_COPRO_LABO");
                String hi_CONSISTENCIA_COPRO_LABO = request.getParameter("hi_CONSISTENCIA_COPRO_LABO");
                String hi_PH_COPRO_LABO = request.getParameter("hi_PH_COPRO_LABO");
                String hi_AZ_REDUCTORES_COPRO_LABO = request.getParameter("hi_AZ_REDUCTORES_COPRO_LABO");
                String hi_MOCO_COPRO_LABO = request.getParameter("hi_MOCO_COPRO_LABO");
                String hi_EXAMEN_MICROSCOPICO_COPRO_LABO = request.getParameter("hi_EXAMEN_MICROSCOPICO_COPRO_LABO");
                String hi_F_VEGETALES_COPRO_LABO = request.getParameter("hi_F_VEGETALES_COPRO_LABO");
                String hi_ALMIDONES_COPRO_LABO = request.getParameter("hi_ALMIDONES_COPRO_LABO");
                String hi_CELULOSA_COPRO_LABO = request.getParameter("hi_CELULOSA_COPRO_LABO");
                String hi_GRASAS_NEUTRAS_COPRO_LABO = request.getParameter("hi_GRASAS_NEUTRAS_COPRO_LABO");
                String hi_JABONES_COPRO_LABO = request.getParameter("hi_JABONES_COPRO_LABO");
                String hi_LEUCOSITOS_COPRO_LABO = request.getParameter("hi_LEUCOSITOS_COPRO_LABO");
                String hi_HEMATIES_COPRO_LABO = request.getParameter("hi_HEMATIES_COPRO_LABO");
                String hi_LEVADURAS_COPRO_LABO = request.getParameter("hi_LEVADURAS_COPRO_LABO");
                String hi_MICELIOS_COPRO_LABO = request.getParameter("hi_MICELIOS_COPRO_LABO");
                String hi_FLORA_COPRO_LABO = request.getParameter("hi_FLORA_COPRO_LABO");
                String hi_H_TRICOCEFALO_COPRO_LABO = request.getParameter("hi_H_TRICOCEFALO_COPRO_LABO");
                String hi_H_ASCARIS_COPRO_LABO = request.getParameter("hi_H_ASCARIS_COPRO_LABO");
                String hi_H_UNCINARIA_COPRO_LABO = request.getParameter("hi_H_UNCINARIA_COPRO_LABO");
                String hi_H_TENIA_COPRO_LABO = request.getParameter("hi_H_TENIA_COPRO_LABO");
                String hi_H_OXYUROS_COPRO_LABO = request.getParameter("hi_H_OXYUROS_COPRO_LABO");
                String hi_L_STRONGYLOIDE_COPRO_LABO = request.getParameter("hi_L_STRONGYLOIDE_COPRO_LABO");
                String hi_Q_HISTOLICA_COPRO_LABO = request.getParameter("hi_Q_HISTOLICA_COPRO_LABO");
                String hi_Q_COLI_COPRO_LABO = request.getParameter("hi_Q_COLI_COPRO_LABO");
                String hi_QG_LAMBIA_COPRO_LABO = request.getParameter("hi_QG_LAMBIA_COPRO_LABO");
                String hi_Q_LODAMOEBA_COPRO_LABO = request.getParameter("hi_Q_LODAMOEBA_COPRO_LABO");
                String hi_Q_NANA_COPRO_LABO = request.getParameter("hi_Q_NANA_COPRO_LABO");
                String hi_TROCOMONA_HOMINIS_COPRO_LABO = request.getParameter("hi_TROCOMONA_HOMINIS_COPRO_LABO");
                String hi_TROFOZOITO_AMEBA_COPRO_LABO = request.getParameter("hi_TROFOZOITO_AMEBA_COPRO_LABO");
                String hi_HOMINIS_COPRO_LABO = request.getParameter("hi_HOMINIS_COPRO_LABO");
                String hi_OTROS_COPRO_LABO = request.getParameter("hi_OTROS_COPRO_LABO");
                String hi_OBSERVACION_COPRO_LABO = request.getParameter("hi_OBSERVACION_COPRO_LABO");
                String hi_COPROSCOPICO_COPRO_LABO = request.getParameter("hi_COPROSCOPICO_COPRO_LABO");
                
                /////////////////////INMUNOLOGIA//////////////////////////                
                String hi_PCR_INMU_LABO = request.getParameter("hi_PCR_INMU_LABO");
                String hi_RA_INMU_LABO = request.getParameter("hi_RA_INMU_LABO");
                String hi_ASTO_INMU_LABO = request.getParameter("hi_ASTO_INMU_LABO");
                String hi_VDRL_INMU_LABO = request.getParameter("hi_VDRL_INMU_LABO");
                String hi_TOXOPLASMA_INMU_LABO = request.getParameter("hi_TOXOPLASMA_INMU_LABO");
                String hi_GRAVINDEZ_INMU_LABO = request.getParameter("hi_GRAVINDEZ_INMU_LABO");
                String hi_VIH_INMU_LABO = request.getParameter("hi_VIH_INMU_LABO");
                String hi_HB_INMU_LABO = request.getParameter("hi_HB_INMU_LABO");
                String hi_TSH_INMU_LABO = request.getParameter("hi_TSH_INMU_LABO");
                String hi_NEONATAL_PR_INMU_LABO_LABO = request.getParameter("hi_NEONATAL_PR_INMU_LABO_LABO");
                String hi_OBSERVACION_INMU_LABO = request.getParameter("hi_OBSERVACION_INMU_LABO");
                ////////////////QUIMICA/////////////////////////////
                
                String hi_GLICEMIA_A_QUI_LABO = request.getParameter("hi_GLICEMIA_A_QUI_LABO");
                String hi_GLICEMIA_B_QUI_LABO = request.getParameter("hi_GLICEMIA_B_QUI_LABO");
                String hi_COLESTEROL_TOTAL_QUI_LABO = request.getParameter("hi_COLESTEROL_TOTAL_QUI_LABO");
                String hi_COLESTEROL_HDL_QUI_LABO = request.getParameter("hi_COLESTEROL_HDL_QUI_LABO");
                String hi_COLESTEROL_LDL_QUI_LABO = request.getParameter("hi_COLESTEROL_LDL_QUI_LABO");
                String hi_COLESTEROL_VLDL_QUI_LABO = request.getParameter("hi_COLESTEROL_VLDL_QUI_LABO");
                String hi_TRIGLICERIDOS_QUI_LABO = request.getParameter("hi_TRIGLICERIDOS_QUI_LABO");
                String hi_ACIDO_URICO_QUI_LABO = request.getParameter("hi_ACIDO_URICO_QUI_LABO");
                String hi_N_UREICO_QUI_LABO = request.getParameter("hi_N_UREICO_QUI_LABO");
                String hi_CREATININA_QUI_LABO = request.getParameter("hi_CREATININA_QUI_LABO");
                String hi_UREA_QUI_LABO = request.getParameter("hi_UREA_QUI_LABO");
                String hi_BILIRRUBINA_TOTAL_QUI_LABO = request.getParameter("hi_BILIRRUBINA_TOTAL_QUI_LABO");
                String hi_BILIRRUBINA_DIRECTA_QUI_LABO = request.getParameter("hi_BILIRRUBINA_DIRECTA_QUI_LABO");
                String hi_BILIRRUBINA_INDIRECTA_QUI_LABO = request.getParameter("hi_BILIRRUBINA_INDIRECTA_QUI_LABO");
                String hi_OBSERVACION_QUI_LABO = request.getParameter("hi_OBSERVACION_QUI_LABO");                
                ////////////////////////////////////////////////////////////////////////////////////
                
                //***********************************MICROBIOLOGIA*****************************//
                String hi_KOH_MICRO_LABO = request.getParameter("hi_KOH_MICRO_LABO");       
                String hi_FROTIS_GAR_MICRO_LABO = request.getParameter("hi_FROTIS_GAR_MICRO_LABO");       
                String hi_OBSERVACION_MICRO_LABO = request.getParameter("hi_OBSERVACION_MICRO_LABO");       
                //*****************************************************************************//
                
                //*************************SECRECIONES VAGINALES*****************************//
                String hi_CELULAS_EPITE_VAGINALES_LABO = request.getParameter("hi_CELULAS_EPITE_VAGINALES_LABO");      
                String hi_LEUCOCITOS_VAGINALES_LABO = request.getParameter("hi_LEUCOCITOS_VAGINALES_LABO");      
                String hi_HEMATIES_VAGINALES_LABO = request.getParameter("hi_HEMATIES_VAGINALES_LABO");      
                String hi_TRICOMONAS_VAGINALES_LABO = request.getParameter("hi_TRICOMONAS_VAGINALES_LABO");      
                String hi_LEVADURAS_VAGINALES_LABO = request.getParameter("hi_LEVADURAS_VAGINALES_LABO");      
                String hi_PH_VAGINALES_LABO = request.getParameter("hi_PH_VAGINALES_LABO");      
                
                String hi_OBSER_CEL_VAGINALES_LABO = request.getParameter("hi_OBSER_CEL_VAGINALES_LABO");      
                String hi_OBSER_LEUCO_VAGINALES_LABO = request.getParameter("hi_OBSER_LEUCO_VAGINALES_LABO");      
                String hi_OBSER_HEMA_VAGINALES_LABO = request.getParameter("hi_OBSER_HEMA_VAGINALES_LABO");      
                String hi_OBSER_TRICO_VAGINALES_LABO = request.getParameter("hi_OBSER_TRICO_VAGINALES_LABO");      
                String hi_OBSER_LEVA_VAGINALES_LABO = request.getParameter("hi_OBSER_LEVA_VAGINALES_LABO");      
                String hi_OBSER_PH_VAGINALES_LABO = request.getParameter("hi_OBSER_PH_VAGINALES_LABO");      
                //*****************************************************************************//
                
                //***************************SECRECIONES URETRALES*****************************//
                String hi_CELULAS_EPITE_URETRALES_LABO = request.getParameter("hi_CELULAS_EPITE_URETRALES_LABO");      
                String hi_LEUCOCITOS_URETRALES_LABO = request.getParameter("hi_LEUCOCITOS_URETRALES_LABO");      
                String hi_HEMATIES_URETRALES_LABO = request.getParameter("hi_HEMATIES_URETRALES_LABO");      
                String hi_PH_URETRALES_LABO = request.getParameter("hi_PH_URETRALES_LABO");      
                
                String hi_OBSER_CEL_URETRALES_LABO = request.getParameter("hi_OBSER_CEL_URETRALES_LABO");      
                String hi_OBSER_LEUCO_URETRALES_LABO = request.getParameter("hi_OBSER_LEUCO_URETRALES_LABO");      
                String hi_OBSER_HEMA_URETRALES_LABO = request.getParameter("hi_OBSER_HEMA_URETRALES_LABO");      
                String hi_OBSER_PH_URETRALES_LABO = request.getParameter("hi_OBSER_PH_URETRALES_LABO");      
                //*****************************************************************************//
                String OBSERVACION_GENERAL_LABO = request.getParameter("OBSERVACION_GENERAL_LABO");
                String  hi_estado_LABO = request.getParameter("hi_estado_LABO");
                String  id_paciente = request.getParameter("id_paciente");
                String  ident_paciente = request.getParameter("ident_paciente");                
                
                ResultSet rs;
                Statement s= conex.createStatement();
                if(opcion.equals("guardar")){
                    sql="INSERT INTO salud_laboratorio "
                            + "("
                                + " hi_ID_LABO,hi_FECHA_LABO,hi_HEMATOCRITO_HEMA_LABO,hi_HEMOGLOBINA_HEMA_LABO,hi_PLAQUETAS_HEMA_LABO," 
                                + " hi_LEUCOCITOS_HEMA_LABO,hi_NEUTROFILOS_HEMA_LABO,hi_LINFOCITOS_HEMA_LABO,hi_EOSINOFILOS_HEMA_LABO,hi_CAYADO_HEMA_LABO,"
                                + " hi_TP_HEMA_LABO,hi_VN1_HEMA_LABO,hi_VSG_HEMA_LABO,hi_BASOFILOS_HEMA_LABO,hi_MONOCITOS_HEMA_LABO,"
                                + " hi_JUVENILES_HEMA_LABO,hi_ATIPICO_HEMA_LABO,hi_TPT_HEMA_LABO,hi_VN2_HEMA_LABO,hi_GRUPO_SANGUINEO_HEMA_LABO,"
                                + " hi_RH_HEMA_LABO,hi_OBSERVACION_HEMA_LABO,"
                            
                                + " hi_ASPECTO_URI_LABO,hi_COLOR_URI_LABO,hi_PH_URI_LABO,hi_DENSIDAD_URI_LABO,hi_ALBUMINA_URI_LABO,"
                                + " hi_GLUCOSA_URI_LABO,hi_ACETONA_URI_LABO,hi_SANGRE_URI_LABO,hi_BILIRRUBINA_URI_LABO,hi_UROBILINOGENO_URI_LABO,"
                                + " hi_NITRITOS_URI_LABO,hi_LEUCOCITOS_URI_LABO,hi_HEMATIES_URI_LABO,hi_C_EPITELIALES_URI_LABO,hi_CILINDROS_URI_LABO,hi_CRISTALES_URI_LABO,"
                                + " hi_MOCO_URI_LABO,hi_BACTERIAS_URI_LABO,hi_LEVADURAS_URI_LABO,hi_TRICOMONAS_URI_LABO,hi_OBSERVACION_URI_LABO,hi_OTROS_URI_LABO,"
                            
                                + " hi_COLOR_COPRO_LABO,hi_CONSISTENCIA_COPRO_LABO,hi_PH_COPRO_LABO,hi_AZ_REDUCTORES_COPRO_LABO,hi_MOCO_COPRO_LABO,"
                                + " hi_EXAMEN_MICROSCOPICO_COPRO_LABO,hi_F_VEGETALES_COPRO_LABO,hi_ALMIDONES_COPRO_LABO,hi_CELULOSA_COPRO_LABO,hi_GRASAS_NEUTRAS_COPRO_LABO,"
                                + " hi_JABONES_COPRO_LABO,hi_LEUCOSITOS_COPRO_LABO,hi_HEMATIES_COPRO_LABO,hi_LEVADURAS_COPRO_LABO,hi_MICELIOS_COPRO_LABO,"
                                + " hi_FLORA_COPRO_LABO,hi_H_TRICOCEFALO_COPRO_LABO,hi_H_ASCARIS_COPRO_LABO,hi_H_UNCINARIA_COPRO_LABO,hi_H_TENIA_COPRO_LABO,"
                                + " hi_H_OXYUROS_COPRO_LABO,hi_L_STRONGYLOIDE_COPRO_LABO,hi_Q_HISTOLICA_COPRO_LABO,hi_Q_COLI_COPRO_LABO,hi_QG_LAMBIA_COPRO_LABO,"
                                + " hi_Q_LODAMOEBA_COPRO_LABO,hi_Q_NANA_COPRO_LABO,hi_TROCOMONA_HOMINIS_COPRO_LABO,hi_TROFOZOITO_AMEBA_COPRO_LABO,hi_HOMINIS_COPRO_LABO,hi_COPROSCOPICO_COPRO_LABO,hi_OBSERVACION_COPRO_LABO,hi_OTROS_COPRO_LABO,"
                    
                                + " hi_GLICEMIA_A_QUI_LABO,hi_GLICEMIA_B_QUI_LABO,hi_COLESTEROL_TOTAL_QUI_LABO,"
                                + " hi_COLESTEROL_HDL_QUI_LABO,hi_COLESTEROL_LDL_QUI_LABO,"
                                + " hi_COLESTEROL_VLDL_QUI_LABO,hi_TRIGLICERIDOS_QUI_LABO,hi_ACIDO_URICO_QUI_LABO,"
                                + " hi_N_UREICO_QUI_LABO,hi_CREATININA_QUI_LABO,"
                                + " hi_UREA_QUI_LABO,hi_BILIRRUBINA_TOTAL_QUI_LABO,hi_BILIRRUBINA_DIRECTA_QUI_LABO,"
                                + " hi_BILIRRUBINA_INDIRECTA_QUI_LABO,hi_OBSERVACION_QUI_LABO,"
                                                        
                                + " hi_PCR_INMU_LABO,hi_RA_INMU_LABO,hi_ASTO_INMU_LABO,hi_VDRL_INMU_LABO,hi_TOXOPLASMA_INMU_LABO,"
                                + " hi_GRAVINDEZ_INMU_LABO,hi_VIH_INMU_LABO,hi_HB_INMU_LABO,hi_TSH_INMU_LABO,hi_NEONATAL_PR_INMU_LABO_LABO,hi_OBSERVACION_INMU_LABO,"
                                                 
                                + " hi_KOH_MICRO_LABO,hi_FROTIS_GAR_MICRO_LABO,hi_OBSERVACION_MICRO_LABO,"
                            
                                + " hi_CELULAS_EPITE_VAGINALES_LABO,hi_LEUCOCITOS_VAGINALES_LABO,hi_HEMATIES_VAGINALES_LABO,hi_TRICOMONAS_VAGINALES_LABO,hi_LEVADURAS_VAGINALES_LABO,hi_PH_VAGINALES_LABO,"
                                + " hi_OBSER_CEL_VAGINALES_LABO,hi_OBSER_LEUCO_VAGINALES_LABO,hi_OBSER_HEMA_VAGINALES_LABO,hi_OBSER_TRICO_VAGINALES_LABO,hi_OBSER_LEVA_VAGINALES_LABO,hi_OBSER_PH_VAGINALES_LABO,"
                            
                                + " hi_CELULAS_EPITE_URETRALES_LABO,hi_LEUCOCITOS_URETRALES_LABO,hi_HEMATIES_URETRALES_LABO,hi_PH_URETRALES_LABO,"
                                + " hi_OBSER_CEL_URETRALES_LABO,hi_OBSER_LEUCO_URETRALES_LABO,hi_OBSER_HEMA_URETRALES_LABO,hi_OBSER_PH_URETRALES_LABO,"
                                
                                + " FIRMA_LABO,usuario,hi_estado_LABO,id_paciente,ident_paciente"
                            + ") "                            
                            + " VALUES("
                                + " null,'" + hi_FECHA_LABO + "','" + hi_HEMATOCRITO_HEMA_LABO + "','" + hi_HEMOGLOBINA_HEMA_LABO + "','" + hi_PLAQUETAS_HEMA_LABO + "',"
                                + " '" + hi_LEUCOCITOS_HEMA_LABO + "','" + hi_NEUTROFILOS_HEMA_LABO + "','" + hi_LINFOCITOS_HEMA_LABO + "','" + hi_EOSINOFILOS_HEMA_LABO + "','" + hi_CAYADO_HEMA_LABO + "',"
                                + " '" + hi_TP_HEMA_LABO + "','" + hi_VN1_HEMA_LABO + "','" + hi_VSG_HEMA_LABO + "','" + hi_BASOFILOS_HEMA_LABO + "','" + hi_MONOCITOS_HEMA_LABO + "',"
                                + " '" + hi_JUVENILES_HEMA_LABO + "','" + hi_ATIPICO_HEMA_LABO + "','" + hi_TPT_HEMA_LABO + "','" + hi_VN2_HEMA_LABO + "','" + hi_GRUPO_SANGUINEO_HEMA_LABO + "','" + hi_RH_HEMA_LABO + "','" + hi_OBSERVACION_HEMA_LABO + "',"
                                    
                                + " '" + hi_ASPECTO_URI_LABO + "','" + hi_COLOR_URI_LABO + "','" + hi_PH_URI_LABO + "','" + hi_DENSIDAD_URI_LABO + "','" + hi_ALBUMINA_URI_LABO + "',"
                                + " '" + hi_GLUCOSA_URI_LABO + "','" + hi_ACETONA_URI_LABO + "','" + hi_SANGRE_URI_LABO + "','" + hi_BILIRRUBINA_URI_LABO + "','" + hi_UROBILINOGENO_URI_LABO + "',"
                                + " '" + hi_NITRITOS_URI_LABO + "','" + hi_LEUCOCITOS_URI_LABO + "','" + hi_HEMATIES_URI_LABO + "','" + hi_C_EPITELIALES_URI_LABO + "','" + hi_CILINDROS_URI_LABO + "',"
                                + " '" + hi_CRISTALES_URI_LABO + "','" + hi_MOCO_URI_LABO + "','" + hi_BACTERIAS_URI_LABO + "','" + hi_LEVADURAS_URI_LABO + "','" + hi_TRICOMONAS_URI_LABO + "','" + hi_OBSERVACION_URI_LABO + "','" + hi_OTROS_URI_LABO + "',"
                            
                                + " '" + hi_COLOR_COPRO_LABO + "','" + hi_CONSISTENCIA_COPRO_LABO + "','" + hi_PH_COPRO_LABO + "','" + hi_AZ_REDUCTORES_COPRO_LABO + "','" + hi_MOCO_COPRO_LABO + "',"
                                + " '" + hi_EXAMEN_MICROSCOPICO_COPRO_LABO + "','" + hi_F_VEGETALES_COPRO_LABO + "','" + hi_ALMIDONES_COPRO_LABO + "','" + hi_CELULOSA_COPRO_LABO + "','" + hi_GRASAS_NEUTRAS_COPRO_LABO + "',"
                                + " '" + hi_JABONES_COPRO_LABO + "','" + hi_LEUCOSITOS_COPRO_LABO + "','" + hi_HEMATIES_COPRO_LABO + "','" + hi_LEVADURAS_COPRO_LABO + "','" + hi_MICELIOS_COPRO_LABO + "',"
                                + " '" + hi_FLORA_COPRO_LABO + "','" + hi_H_TRICOCEFALO_COPRO_LABO + "','" + hi_H_ASCARIS_COPRO_LABO + "','" + hi_H_UNCINARIA_COPRO_LABO + "','" + hi_H_TENIA_COPRO_LABO + "',"
                                + " '" + hi_H_OXYUROS_COPRO_LABO + "','" + hi_L_STRONGYLOIDE_COPRO_LABO + "','" + hi_Q_HISTOLICA_COPRO_LABO + "','" + hi_Q_COLI_COPRO_LABO + "','" + hi_QG_LAMBIA_COPRO_LABO + "',"
                                + " '" + hi_Q_LODAMOEBA_COPRO_LABO + "','" + hi_Q_NANA_COPRO_LABO + "','" + hi_TROCOMONA_HOMINIS_COPRO_LABO + "','" + hi_TROFOZOITO_AMEBA_COPRO_LABO + "','" + hi_HOMINIS_COPRO_LABO + "','" + hi_COPROSCOPICO_COPRO_LABO + "','" + hi_OBSERVACION_COPRO_LABO + "','" + hi_OTROS_COPRO_LABO + "',"
                                         
                                + " '" + hi_GLICEMIA_A_QUI_LABO + "','" + hi_GLICEMIA_B_QUI_LABO + "','" + hi_COLESTEROL_TOTAL_QUI_LABO + "',"
                                + " '" + hi_COLESTEROL_HDL_QUI_LABO + "','" + hi_COLESTEROL_LDL_QUI_LABO + "',"
                                + " '" + hi_COLESTEROL_VLDL_QUI_LABO + "','" + hi_TRIGLICERIDOS_QUI_LABO + "','" + hi_ACIDO_URICO_QUI_LABO + "',"
                                + " '" + hi_N_UREICO_QUI_LABO + "','" + hi_CREATININA_QUI_LABO + "',"
                                + " '" + hi_UREA_QUI_LABO + "','" + hi_BILIRRUBINA_TOTAL_QUI_LABO + "','" + hi_BILIRRUBINA_DIRECTA_QUI_LABO + "',"
                                + " '" + hi_BILIRRUBINA_INDIRECTA_QUI_LABO + "','" + hi_OBSERVACION_QUI_LABO + "',"
                            
                                + " '" + hi_PCR_INMU_LABO + "','" + hi_RA_INMU_LABO + "','" + hi_ASTO_INMU_LABO + "','" + hi_VDRL_INMU_LABO + "','" + hi_TOXOPLASMA_INMU_LABO + "',"
                                + " '" + hi_GRAVINDEZ_INMU_LABO + "','" + hi_VIH_INMU_LABO + "','" + hi_HB_INMU_LABO + "','" + hi_TSH_INMU_LABO + "','" + hi_NEONATAL_PR_INMU_LABO_LABO + "','" + hi_OBSERVACION_INMU_LABO + "',"
                                    
                                + " '" + hi_KOH_MICRO_LABO + "','" + hi_FROTIS_GAR_MICRO_LABO + "','" + hi_OBSERVACION_MICRO_LABO + "',"
                            
                                + " '" + hi_CELULAS_EPITE_VAGINALES_LABO + "','" + hi_LEUCOCITOS_VAGINALES_LABO + "','" + hi_HEMATIES_VAGINALES_LABO + "','" + hi_TRICOMONAS_VAGINALES_LABO + "','" + hi_LEVADURAS_VAGINALES_LABO + "','" + hi_PH_VAGINALES_LABO + "',"
                                + " '" + hi_OBSER_CEL_VAGINALES_LABO + "','" + hi_OBSER_LEUCO_VAGINALES_LABO + "','" + hi_OBSER_HEMA_VAGINALES_LABO + "','" + hi_OBSER_TRICO_VAGINALES_LABO + "','" + hi_OBSER_LEVA_VAGINALES_LABO + "','" + hi_OBSER_PH_VAGINALES_LABO + "',"
                            
                                + " '" + hi_CELULAS_EPITE_URETRALES_LABO + "','" + hi_LEUCOCITOS_URETRALES_LABO + "','" + hi_HEMATIES_URETRALES_LABO + "','" + hi_PH_URETRALES_LABO + "',"
                                + " '" + hi_OBSER_CEL_URETRALES_LABO + "','" + hi_OBSER_LEUCO_URETRALES_LABO + "','" + hi_OBSER_HEMA_URETRALES_LABO + "','" + hi_OBSER_PH_URETRALES_LABO + "',"
                            
                                + " '" + firma + "','" + usuario + "','" + hi_estado_LABO + "','"+ id_paciente +"','"+ ident_paciente +"'"                            
                            + ")";
                    //out.println(sql);
                    s.executeUpdate(sql);
                    out.println("1");                                        
                }
                
                //////////////////////////////////////////////////////////////////////
                if(opcion.equals("modificar")){
                    sql="UPDATE salud_laboratorio SET "

                                + " hi_FECHA_LABO='" + hi_FECHA_LABO + "',hi_HEMATOCRITO_HEMA_LABO='" + hi_HEMATOCRITO_HEMA_LABO + "',hi_HEMOGLOBINA_HEMA_LABO='" + hi_HEMOGLOBINA_HEMA_LABO + "',hi_PLAQUETAS_HEMA_LABO='" + hi_PLAQUETAS_HEMA_LABO + "',"
                                + " hi_LEUCOCITOS_HEMA_LABO='" + hi_LEUCOCITOS_HEMA_LABO + "',hi_NEUTROFILOS_HEMA_LABO='" + hi_NEUTROFILOS_HEMA_LABO + "',hi_LINFOCITOS_HEMA_LABO='" + hi_LINFOCITOS_HEMA_LABO + "',hi_EOSINOFILOS_HEMA_LABO='" + hi_EOSINOFILOS_HEMA_LABO + "',hi_CAYADO_HEMA_LABO='" + hi_CAYADO_HEMA_LABO + "',"
                                + " hi_TP_HEMA_LABO='" + hi_TP_HEMA_LABO + "',hi_VN1_HEMA_LABO='" + hi_VN1_HEMA_LABO + "',hi_VSG_HEMA_LABO='" + hi_VSG_HEMA_LABO + "',hi_BASOFILOS_HEMA_LABO='" + hi_BASOFILOS_HEMA_LABO + "',hi_MONOCITOS_HEMA_LABO='" + hi_MONOCITOS_HEMA_LABO + "',"
                                + " hi_JUVENILES_HEMA_LABO='" + hi_JUVENILES_HEMA_LABO + "',hi_ATIPICO_HEMA_LABO='" + hi_ATIPICO_HEMA_LABO + "',hi_TPT_HEMA_LABO='" + hi_TPT_HEMA_LABO + "',hi_VN2_HEMA_LABO='" + hi_VN2_HEMA_LABO + "',hi_GRUPO_SANGUINEO_HEMA_LABO='" + hi_GRUPO_SANGUINEO_HEMA_LABO + "',hi_RH_HEMA_LABO='" + hi_RH_HEMA_LABO + "',"
                                + " hi_OBSERVACION_HEMA_LABO='" + hi_OBSERVACION_HEMA_LABO + "',"
                            
                                + " hi_ASPECTO_URI_LABO='" + hi_ASPECTO_URI_LABO + "',hi_COLOR_URI_LABO='" + hi_COLOR_URI_LABO + "',hi_PH_URI_LABO='" + hi_PH_URI_LABO + "',hi_DENSIDAD_URI_LABO='" + hi_DENSIDAD_URI_LABO + "',hi_ALBUMINA_URI_LABO='" + hi_ALBUMINA_URI_LABO + "',"
                                + " hi_GLUCOSA_URI_LABO= '" + hi_GLUCOSA_URI_LABO + "',hi_ACETONA_URI_LABO='" + hi_ACETONA_URI_LABO + "',hi_SANGRE_URI_LABO='" + hi_SANGRE_URI_LABO + "',hi_BILIRRUBINA_URI_LABO='" + hi_BILIRRUBINA_URI_LABO + "',hi_UROBILINOGENO_URI_LABO='" + hi_UROBILINOGENO_URI_LABO + "',"
                                + " hi_NITRITOS_URI_LABO='" + hi_NITRITOS_URI_LABO + "',hi_LEUCOCITOS_URI_LABO='" + hi_LEUCOCITOS_URI_LABO + "',hi_HEMATIES_URI_LABO='" + hi_HEMATIES_URI_LABO + "',hi_C_EPITELIALES_URI_LABO='" + hi_C_EPITELIALES_URI_LABO + "',hi_CILINDROS_URI_LABO='" + hi_CILINDROS_URI_LABO + "',"
                                + " hi_CRISTALES_URI_LABO='" + hi_CRISTALES_URI_LABO + "',hi_MOCO_URI_LABO='" + hi_MOCO_URI_LABO + "',hi_BACTERIAS_URI_LABO='" + hi_BACTERIAS_URI_LABO + "',hi_LEVADURAS_URI_LABO='" + hi_LEVADURAS_URI_LABO + "',hi_TRICOMONAS_URI_LABO='" + hi_TRICOMONAS_URI_LABO + "',hi_OTROS_URI_LABO='" + hi_OTROS_URI_LABO + "',"
                                + " hi_OBSERVACION_URI_LABO='" + hi_OBSERVACION_URI_LABO + "',"
                                
                                + " hi_COLOR_COPRO_LABO='" + hi_COLOR_COPRO_LABO + "',hi_CONSISTENCIA_COPRO_LABO='" + hi_CONSISTENCIA_COPRO_LABO + "',hi_PH_COPRO_LABO='" + hi_PH_COPRO_LABO + "',hi_AZ_REDUCTORES_COPRO_LABO='" + hi_AZ_REDUCTORES_COPRO_LABO + "',hi_MOCO_COPRO_LABO='" + hi_MOCO_COPRO_LABO + "',"
                                + " hi_EXAMEN_MICROSCOPICO_COPRO_LABO='" + hi_EXAMEN_MICROSCOPICO_COPRO_LABO + "',hi_F_VEGETALES_COPRO_LABO='" + hi_F_VEGETALES_COPRO_LABO + "',hi_ALMIDONES_COPRO_LABO='" + hi_ALMIDONES_COPRO_LABO + "',hi_CELULOSA_COPRO_LABO='" + hi_CELULOSA_COPRO_LABO + "',hi_GRASAS_NEUTRAS_COPRO_LABO='" + hi_GRASAS_NEUTRAS_COPRO_LABO + "',"
                                + " hi_JABONES_COPRO_LABO='" + hi_JABONES_COPRO_LABO + "',hi_LEUCOSITOS_COPRO_LABO='" + hi_LEUCOSITOS_COPRO_LABO + "',hi_HEMATIES_COPRO_LABO='" + hi_HEMATIES_COPRO_LABO + "',hi_LEVADURAS_COPRO_LABO='" + hi_LEVADURAS_COPRO_LABO + "',hi_MICELIOS_COPRO_LABO='" + hi_MICELIOS_COPRO_LABO + "',"
                                + " hi_FLORA_COPRO_LABO='" + hi_FLORA_COPRO_LABO + "',hi_H_TRICOCEFALO_COPRO_LABO='" + hi_H_TRICOCEFALO_COPRO_LABO + "',hi_H_ASCARIS_COPRO_LABO='" + hi_H_ASCARIS_COPRO_LABO + "',hi_H_UNCINARIA_COPRO_LABO='" + hi_H_UNCINARIA_COPRO_LABO + "',hi_H_TENIA_COPRO_LABO='" + hi_H_TENIA_COPRO_LABO + "',"
                                + " hi_H_OXYUROS_COPRO_LABO='" + hi_H_OXYUROS_COPRO_LABO + "',hi_L_STRONGYLOIDE_COPRO_LABO='" + hi_L_STRONGYLOIDE_COPRO_LABO + "',hi_Q_HISTOLICA_COPRO_LABO='" + hi_Q_HISTOLICA_COPRO_LABO + "',hi_Q_COLI_COPRO_LABO='" + hi_Q_COLI_COPRO_LABO + "',hi_QG_LAMBIA_COPRO_LABO='" + hi_QG_LAMBIA_COPRO_LABO + "',"
                                + " hi_Q_LODAMOEBA_COPRO_LABO='" + hi_Q_LODAMOEBA_COPRO_LABO + "',hi_Q_NANA_COPRO_LABO='" + hi_Q_NANA_COPRO_LABO + "',hi_TROCOMONA_HOMINIS_COPRO_LABO='" + hi_TROCOMONA_HOMINIS_COPRO_LABO + "',hi_TROFOZOITO_AMEBA_COPRO_LABO='" + hi_TROFOZOITO_AMEBA_COPRO_LABO + "',hi_HOMINIS_COPRO_LABO='" + hi_HOMINIS_COPRO_LABO + "',hi_OTROS_COPRO_LABO='" + hi_OTROS_COPRO_LABO + "',"
                                + " hi_COPROSCOPICO_COPRO_LABO='" + hi_COPROSCOPICO_COPRO_LABO + "',hi_OBSERVACION_COPRO_LABO='" + hi_OBSERVACION_COPRO_LABO + "',"
                                
                                + " hi_GLICEMIA_A_QUI_LABO='" + hi_GLICEMIA_A_QUI_LABO + "',hi_GLICEMIA_B_QUI_LABO='" + hi_GLICEMIA_B_QUI_LABO + "',hi_COLESTEROL_TOTAL_QUI_LABO='" + hi_COLESTEROL_TOTAL_QUI_LABO + "',"
                                + " hi_COLESTEROL_HDL_QUI_LABO='" + hi_COLESTEROL_HDL_QUI_LABO + "',hi_COLESTEROL_LDL_QUI_LABO='" + hi_COLESTEROL_LDL_QUI_LABO + "',"
                                + " hi_COLESTEROL_VLDL_QUI_LABO='" + hi_COLESTEROL_VLDL_QUI_LABO + "',hi_TRIGLICERIDOS_QUI_LABO='" + hi_TRIGLICERIDOS_QUI_LABO + "',hi_ACIDO_URICO_QUI_LABO='" + hi_ACIDO_URICO_QUI_LABO + "',"
                                + " hi_N_UREICO_QUI_LABO='" + hi_N_UREICO_QUI_LABO + "',hi_CREATININA_QUI_LABO='" + hi_CREATININA_QUI_LABO + "',"
                                + " hi_UREA_QUI_LABO='" + hi_UREA_QUI_LABO + "',hi_BILIRRUBINA_TOTAL_QUI_LABO='" + hi_BILIRRUBINA_TOTAL_QUI_LABO + "',hi_BILIRRUBINA_DIRECTA_QUI_LABO='" + hi_BILIRRUBINA_DIRECTA_QUI_LABO + "',"
                                + " hi_BILIRRUBINA_INDIRECTA_QUI_LABO='" + hi_BILIRRUBINA_INDIRECTA_QUI_LABO + "',"
                                + " hi_OBSERVACION_QUI_LABO='" + hi_OBSERVACION_QUI_LABO + "',"
                            
                                + " hi_PCR_INMU_LABO='" + hi_PCR_INMU_LABO + "',hi_RA_INMU_LABO='" + hi_RA_INMU_LABO + "',hi_ASTO_INMU_LABO='" + hi_ASTO_INMU_LABO + "',hi_VDRL_INMU_LABO='" + hi_VDRL_INMU_LABO + "',hi_TOXOPLASMA_INMU_LABO='" + hi_TOXOPLASMA_INMU_LABO + "',"
                                + " hi_GRAVINDEZ_INMU_LABO='" + hi_GRAVINDEZ_INMU_LABO + "',hi_VIH_INMU_LABO='" + hi_VIH_INMU_LABO + "',hi_HB_INMU_LABO='" + hi_HB_INMU_LABO + "',hi_TSH_INMU_LABO='" + hi_TSH_INMU_LABO + "',"
                                + " hi_NEONATAL_PR_INMU_LABO_LABO='" + hi_NEONATAL_PR_INMU_LABO_LABO + "',hi_OBSERVACION_INMU_LABO='" + hi_OBSERVACION_INMU_LABO + "',"                        
                                
                                + " hi_KOH_MICRO_LABO='" + hi_KOH_MICRO_LABO + "',hi_FROTIS_GAR_MICRO_LABO='" + hi_FROTIS_GAR_MICRO_LABO + "',hi_OBSERVACION_MICRO_LABO='" + hi_OBSERVACION_MICRO_LABO + "',"
                            
                                + " hi_CELULAS_EPITE_VAGINALES_LABO='" + hi_CELULAS_EPITE_VAGINALES_LABO + "',hi_LEUCOCITOS_VAGINALES_LABO='" + hi_LEUCOCITOS_VAGINALES_LABO + "',hi_HEMATIES_VAGINALES_LABO='" + hi_HEMATIES_VAGINALES_LABO + "',hi_TRICOMONAS_VAGINALES_LABO='" + hi_TRICOMONAS_VAGINALES_LABO + "',hi_LEVADURAS_VAGINALES_LABO='" + hi_LEVADURAS_VAGINALES_LABO + "',hi_PH_VAGINALES_LABO='" + hi_PH_VAGINALES_LABO + "',"
                                + " hi_OBSER_CEL_VAGINALES_LABO='" + hi_OBSER_CEL_VAGINALES_LABO + "',hi_OBSER_LEUCO_VAGINALES_LABO='" + hi_OBSER_LEUCO_VAGINALES_LABO + "',hi_OBSER_HEMA_VAGINALES_LABO='" + hi_OBSER_HEMA_VAGINALES_LABO + "',hi_OBSER_TRICO_VAGINALES_LABO='" + hi_OBSER_TRICO_VAGINALES_LABO + "',hi_OBSER_LEVA_VAGINALES_LABO='" + hi_OBSER_LEVA_VAGINALES_LABO + "',hi_OBSER_PH_VAGINALES_LABO='" + hi_OBSER_PH_VAGINALES_LABO + "',"
                            
                                + " hi_CELULAS_EPITE_URETRALES_LABO='" + hi_CELULAS_EPITE_URETRALES_LABO + "',hi_LEUCOCITOS_URETRALES_LABO='" + hi_LEUCOCITOS_URETRALES_LABO + "',hi_HEMATIES_URETRALES_LABO='" + hi_HEMATIES_URETRALES_LABO + "',hi_PH_URETRALES_LABO='" + hi_PH_URETRALES_LABO + "',"
                                + " hi_OBSER_CEL_URETRALES_LABO='" + hi_OBSER_CEL_URETRALES_LABO + "',hi_OBSER_LEUCO_URETRALES_LABO='" + hi_OBSER_LEUCO_URETRALES_LABO + "',hi_OBSER_HEMA_URETRALES_LABO='" + hi_OBSER_HEMA_URETRALES_LABO + "',hi_OBSER_PH_URETRALES_LABO='" + hi_OBSER_PH_URETRALES_LABO + "',"
                                                                                    
                                + " FIRMA_LABO='" + firma + "',hi_estado_LABO='" + hi_estado_LABO + "' "                            
                            
                                + " WHERE ident_paciente='"+ ident_paciente +"' AND id_paciente='"+ id_paciente +"' AND hi_ID_LABO='"+ hi_ID_LABO +"'";                            
                    //out.println(sql);
                    s.executeUpdate(sql);
                    out.println("1");                                        
                }
                if(opcion.equals("eliminar")){
                    sql="UPDATE salud_laboratorio SET "
                            + " hi_estado_LABO='"+ hi_estado_LABO +"' "
                            + " WHERE ident_paciente='"+ ident_paciente +"' AND id_paciente='"+ id_paciente +"' AND hi_ID_LABO='"+ hi_ID_LABO +"'";
                    s.executeUpdate(sql);
                    out.println("1");                    
                }                
                //////////////////////////////////////////////////////////////////////
                
            }            
        } catch (Exception e) {
            out.println("No se ha completado la peticiÃ³n...");
            e.printStackTrace(new java.io.PrintWriter(out)); 
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /** 
     * Handles the HTTP <code>GET</code> method.
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
     * Handles the HTTP <code>POST</code> method.
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
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
}
