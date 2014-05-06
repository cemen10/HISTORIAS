
import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.*;
import javax.servlet.http.HttpSession;
/**
 *
 * @author carlosmario
 */
public class mostrar_examenes_laboratorio extends HttpServlet {

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
        String aten="";                   
        try {
            if(usuario==null){
                usuario="";
                out.println("<script>alert('Su Sesion Ha Terminado. Inicie Sesion Nuevamente'); location.href='../index.jsp'</script>");
            }else{
                ResultSet rs;
                Statement s=conex.createStatement();
                String auxiliar=request.getParameter("auxiliar");
                
                if(auxiliar.equals("ATENCION")){
                    //////////////////////////TABLA DE ATENCION DE URGENCIAS POR PACIENTES/////////////////////////                    
                    String ident=request.getParameter("ident");
                    String fecha=request.getParameter("fecha");

                    if(fecha.equals("")){
                        sql="SELECT "                                
                            + " *FROM salud_laboratorio INNER JOIN pacientes "
                            + " ON pacientes.ident_paciente = salud_laboratorio.ident_paciente "
                            + " WHERE pacientes.ident_paciente LIKE '" + ident + "%' AND hi_estado_LABO='ACTIVO'";   
                    }else{
                        sql="SELECT "                            
                            + " *FROM salud_laboratorio INNER JOIN pacientes "
                            + " ON pacientes.ident_paciente = salud_laboratorio.ident_paciente "
                            + " WHERE pacientes.ident_paciente LIKE '" + ident + "%' AND salud_laboratorio.hi_FECHA_LABO='"+ fecha +"'  AND hi_estado_LABO='ACTIVO'";                                                                    
                    }

                    String nomcompleto="";
                    rs=s.executeQuery(sql);
                    int j=1;
                    int contador=0;
                    aten= "<div style='width:100%; height: 105px; overflow: auto;'>"
                            + "<table width='100%' cellpading='2' cellspacing='2' class='data' id='box-table-a' border='1'>"
                                + "<thead style='font-size: 12px;'>"
                                    + "<tr>"
                                        + "<th style='font-weight:bold;  background:#b9d1ea; width: 5%;'>SEL...</th>"
                                        + "<th style='font-weight:bold;  background:#b9d1ea; width: 15%;'>ID ATENCI&Oacute;N</th>"
                                        + "<th style='font-weight:bold;  background:#b9d1ea; width: 45%;'>FECHA</th>"
                                    + "</tr>"
                                + "</thead>"
                                + "<tbody id='tabemp' style='font-size: 11px;'>";
                    while(rs.next()){
                        contador=contador+1;
                                   nomcompleto= rs.getString("pacientes.nomb_paciente") + " " + rs.getString("pacientes.segnomb_paciente") + " " + rs.getString("pacientes.priapell_paciente")+ " " + rs.getString("pacientes.segapell_paciente");                                    
                                   aten += "<tr class='marcado2' "
                                           
                                            +  "hi_ID_LABO='" + rs.getString("hi_ID_LABO") + "'  "
                                            +  "hi_FECHA_LABO='" + rs.getString("hi_FECHA_LABO") + "'  "
                                           
                                            +  "hi_HEMATOCRITO_HEMA_LABO='" + rs.getString("hi_HEMATOCRITO_HEMA_LABO") + "'  "
                                            +  "hi_HEMOGLOBINA_HEMA_LABO='" + rs.getString("hi_HEMOGLOBINA_HEMA_LABO") + "'  "
                                            +  "hi_PLAQUETAS_HEMA_LABO='" + rs.getString("hi_PLAQUETAS_HEMA_LABO") + "'  "
                                            +  "hi_LEUCOCITOS_HEMA_LABO='" + rs.getString("hi_LEUCOCITOS_HEMA_LABO") + "'  "
                                            +  "hi_NEUTROFILOS_HEMA_LABO='" + rs.getString("hi_NEUTROFILOS_HEMA_LABO") + "'  "
                                            +  "hi_LINFOCITOS_HEMA_LABO='" + rs.getString("hi_LINFOCITOS_HEMA_LABO") + "'  "
                                            +  "hi_EOSINOFILOS_HEMA_LABO='" + rs.getString("hi_EOSINOFILOS_HEMA_LABO") + "'  "
                                            +  "hi_CAYADO_HEMA_LABO='" + rs.getString("hi_CAYADO_HEMA_LABO") + "'  "
                                            +  "hi_TP_HEMA_LABO='" + rs.getString("hi_TP_HEMA_LABO") + "'  "
                                            +  "hi_VN1_HEMA_LABO='" + rs.getString("hi_VN1_HEMA_LABO") + "'  "
                                            +  "hi_VSG_HEMA_LABO='" + rs.getString("hi_VSG_HEMA_LABO") + "'  "
                                            +  "hi_BASOFILOS_HEMA_LABO='" + rs.getString("hi_BASOFILOS_HEMA_LABO") + "'  "
                                            +  "hi_MONOCITOS_HEMA_LABO='" + rs.getString("hi_MONOCITOS_HEMA_LABO") + "'  "
                                            +  "hi_JUVENILES_HEMA_LABO='" + rs.getString("hi_JUVENILES_HEMA_LABO") + "'  "
                                            +  "hi_ATIPICO_HEMA_LABO='" + rs.getString("hi_ATIPICO_HEMA_LABO") + "'  "
                                            +  "hi_TPT_HEMA_LABO='" + rs.getString("hi_TPT_HEMA_LABO") + "'  "
                                            +  "hi_VN2_HEMA_LABO='" + rs.getString("hi_VN2_HEMA_LABO") + "'  "
                                            +  "hi_GRUPO_SANGUINEO_HEMA_LABO='" + rs.getString("hi_GRUPO_SANGUINEO_HEMA_LABO") + "'  "
                                            +  "hi_RH_HEMA_LABO='" + rs.getString("hi_RH_HEMA_LABO") + "'  "
                                            +  "hi_OBSERVACION_HEMA_LABO='" + rs.getString("hi_OBSERVACION_HEMA_LABO") + "'  "
                                           
                                            +  "hi_ASPECTO_URI_LABO='" + rs.getString("hi_ASPECTO_URI_LABO") + "'  "
                                            +  "hi_COLOR_URI_LABO='" + rs.getString("hi_COLOR_URI_LABO") + "'  "
                                            +  "hi_PH_URI_LABO='" + rs.getString("hi_PH_URI_LABO") + "'  "
                                            +  "hi_DENSIDAD_URI_LABO='" + rs.getString("hi_DENSIDAD_URI_LABO") + "'  "
                                            +  "hi_ALBUMINA_URI_LABO='" + rs.getString("hi_ALBUMINA_URI_LABO") + "'  "
                                            +  "hi_GLUCOSA_URI_LABO='" + rs.getString("hi_GLUCOSA_URI_LABO") + "'  "
                                            +  "hi_ACETONA_URI_LABO='" + rs.getString("hi_ACETONA_URI_LABO") + "'  "
                                            +  "hi_SANGRE_URI_LABO='" + rs.getString("hi_SANGRE_URI_LABO") + "'  "
                                            +  "hi_BILIRRUBINA_URI_LABO='" + rs.getString("hi_BILIRRUBINA_URI_LABO") + "'  "
                                            +  "hi_UROBILINOGENO_URI_LABO='" + rs.getString("hi_UROBILINOGENO_URI_LABO") + "'  "
                                            +  "hi_NITRITOS_URI_LABO='" + rs.getString("hi_NITRITOS_URI_LABO") + "'  "
                                            +  "hi_LEUCOCITOS_URI_LABO='" + rs.getString("hi_LEUCOCITOS_URI_LABO") + "'  "
                                            +  "hi_HEMATIES_URI_LABO='" + rs.getString("hi_HEMATIES_URI_LABO") + "'  "
                                            +  "hi_C_EPITELIALES_URI_LABO='" + rs.getString("hi_C_EPITELIALES_URI_LABO") + "'  "
                                            +  "hi_CILINDROS_URI_LABO='" + rs.getString("hi_CILINDROS_URI_LABO") + "'  "
                                            +  "hi_CRISTALES_URI_LABO='" + rs.getString("hi_CRISTALES_URI_LABO") + "'  "
                                            +  "hi_MOCO_URI_LABO='" + rs.getString("hi_MOCO_URI_LABO") + "'  "
                                            +  "hi_BACTERIAS_URI_LABO='" + rs.getString("hi_BACTERIAS_URI_LABO") + "'  "
                                            +  "hi_LEVADURAS_URI_LABO='" + rs.getString("hi_LEVADURAS_URI_LABO") + "'  "
                                            +  "hi_TRICOMONAS_URI_LABO='" + rs.getString("hi_TRICOMONAS_URI_LABO") + "'  "
                                            +  "hi_OTROS_URI_LABO='" + rs.getString("hi_OTROS_URI_LABO") + "'  "
                                            +  "hi_OBSERVACION_URI_LABO='" + rs.getString("hi_OBSERVACION_URI_LABO") + "'  "
                                           
                                            +  "hi_COLOR_COPRO_LABO='" + rs.getString("hi_COLOR_COPRO_LABO") + "'  "
                                            +  "hi_CONSISTENCIA_COPRO_LABO='" + rs.getString("hi_CONSISTENCIA_COPRO_LABO") + "'  "
                                            +  "hi_PH_COPRO_LABO='" + rs.getString("hi_PH_COPRO_LABO") + "'  "
                                            +  "hi_AZ_REDUCTORES_COPRO_LABO='" + rs.getString("hi_AZ_REDUCTORES_COPRO_LABO") + "'  "
                                            +  "hi_MOCO_COPRO_LABO='" + rs.getString("hi_MOCO_COPRO_LABO") + "'  "
                                            +  "hi_EXAMEN_MICROSCOPICO_COPRO_LABO='" + rs.getString("hi_EXAMEN_MICROSCOPICO_COPRO_LABO") + "'  "
                                            +  "hi_F_VEGETALES_COPRO_LABO='" + rs.getString("hi_F_VEGETALES_COPRO_LABO") + "'  "
                                            +  "hi_ALMIDONES_COPRO_LABO='" + rs.getString("hi_ALMIDONES_COPRO_LABO") + "'  "
                                            +  "hi_CELULOSA_COPRO_LABO='" + rs.getString("hi_CELULOSA_COPRO_LABO") + "'  "
                                            +  "hi_GRASAS_NEUTRAS_COPRO_LABO='" + rs.getString("hi_GRASAS_NEUTRAS_COPRO_LABO") + "'  "
                                            +  "hi_JABONES_COPRO_LABO='" + rs.getString("hi_JABONES_COPRO_LABO") + "'  "
                                            +  "hi_LEUCOSITOS_COPRO_LABO='" + rs.getString("hi_LEUCOSITOS_COPRO_LABO") + "'  "
                                            +  "hi_HEMATIES_COPRO_LABO='" + rs.getString("hi_HEMATIES_COPRO_LABO") + "'  "
                                            +  "hi_LEVADURAS_COPRO_LABO='" + rs.getString("hi_LEVADURAS_COPRO_LABO") + "'  "
                                            +  "hi_MICELIOS_COPRO_LABO='" + rs.getString("hi_MICELIOS_COPRO_LABO") + "'  "
                                            +  "hi_FLORA_COPRO_LABO='" + rs.getString("hi_FLORA_COPRO_LABO") + "'  "
                                            +  "hi_H_TRICOCEFALO_COPRO_LABO='" + rs.getString("hi_H_TRICOCEFALO_COPRO_LABO") + "'  "
                                            +  "hi_H_ASCARIS_COPRO_LABO='" + rs.getString("hi_H_ASCARIS_COPRO_LABO") + "'  "
                                            +  "hi_H_UNCINARIA_COPRO_LABO='" + rs.getString("hi_H_UNCINARIA_COPRO_LABO") + "'  "
                                            +  "hi_H_TENIA_COPRO_LABO='" + rs.getString("hi_H_TENIA_COPRO_LABO") + "'  "
                                            +  "hi_H_OXYUROS_COPRO_LABO='" + rs.getString("hi_H_OXYUROS_COPRO_LABO") + "'  "
                                            +  "hi_L_STRONGYLOIDE_COPRO_LABO='" + rs.getString("hi_L_STRONGYLOIDE_COPRO_LABO") + "'  "
                                            +  "hi_Q_HISTOLICA_COPRO_LABO='" + rs.getString("hi_Q_HISTOLICA_COPRO_LABO") + "'  "
                                            +  "hi_Q_COLI_COPRO_LABO='" + rs.getString("hi_Q_COLI_COPRO_LABO") + "'  "
                                            +  "hi_QG_LAMBIA_COPRO_LABO='" + rs.getString("hi_QG_LAMBIA_COPRO_LABO") + "'  "
                                            +  "hi_Q_LODAMOEBA_COPRO_LABO='" + rs.getString("hi_Q_LODAMOEBA_COPRO_LABO") + "'  "
                                            +  "hi_Q_NANA_COPRO_LABO='" + rs.getString("hi_Q_NANA_COPRO_LABO") + "'  "
                                            +  "hi_TROCOMONA_HOMINIS_COPRO_LABO='" + rs.getString("hi_TROCOMONA_HOMINIS_COPRO_LABO") + "'  "
                                            +  "hi_TROFOZOITO_AMEBA_COPRO_LABO='" + rs.getString("hi_TROFOZOITO_AMEBA_COPRO_LABO") + "'  "
                                            +  "hi_HOMINIS_COPRO_LABO='" + rs.getString("hi_HOMINIS_COPRO_LABO") + "'  "
                                            +  "hi_OTROS_COPRO_LABO='" + rs.getString("hi_OTROS_COPRO_LABO") + "'  "
                                            +  "hi_COPROSCOPICO_COPRO_LABO='" + rs.getString("hi_COPROSCOPICO_COPRO_LABO") + "'  "
                                            +  "hi_OBSERVACION_COPRO_LABO='" + rs.getString("hi_OBSERVACION_COPRO_LABO") + "'  "
                                           
                                            +  "hi_GLICEMIA_A_QUI_LABO='" + rs.getString("hi_GLICEMIA_A_QUI_LABO") + "'  "
                                            +  "hi_GLICEMIA_B_QUI_LABO='" + rs.getString("hi_GLICEMIA_B_QUI_LABO") + "'  "
                                            +  "hi_COLESTEROL_TOTAL_QUI_LABO='" + rs.getString("hi_COLESTEROL_TOTAL_QUI_LABO") + "'  "
                                            +  "hi_COLESTEROL_HDL_QUI_LABO='" + rs.getString("hi_COLESTEROL_HDL_QUI_LABO") + "'  "
                                            +  "hi_COLESTEROL_LDL_QUI_LABO='" + rs.getString("hi_COLESTEROL_LDL_QUI_LABO") + "'  "
                                            +  "hi_COLESTEROL_VLDL_QUI_LABO='" + rs.getString("hi_COLESTEROL_VLDL_QUI_LABO") + "'  "
                                            +  "hi_TRIGLICERIDOS_QUI_LABO='" + rs.getString("hi_TRIGLICERIDOS_QUI_LABO") + "'  "
                                            +  "hi_ACIDO_URICO_QUI_LABO='" + rs.getString("hi_ACIDO_URICO_QUI_LABO") + "'  "
                                            +  "hi_N_UREICO_QUI_LABO='" + rs.getString("hi_N_UREICO_QUI_LABO") + "'  "
                                            +  "hi_CREATININA_QUI_LABO='" + rs.getString("hi_CREATININA_QUI_LABO") + "'  "
                                            +  "hi_UREA_QUI_LABO='" + rs.getString("hi_UREA_QUI_LABO") + "'  "
                                            +  "hi_BILIRRUBINA_TOTAL_QUI_LABO='" + rs.getString("hi_BILIRRUBINA_TOTAL_QUI_LABO") + "'  "
                                            +  "hi_BILIRRUBINA_DIRECTA_QUI_LABO='" + rs.getString("hi_BILIRRUBINA_DIRECTA_QUI_LABO") + "'  "
                                            +  "hi_BILIRRUBINA_INDIRECTA_QUI_LABO='" + rs.getString("hi_BILIRRUBINA_INDIRECTA_QUI_LABO") + "'  "
                                            +  "hi_OBSERVACION_QUI_LABO='" + rs.getString("hi_OBSERVACION_QUI_LABO") + "'  "
                                           
                                            +  "hi_PCR_INMU_LABO='" + rs.getString("hi_PCR_INMU_LABO") + "'  "
                                            +  "hi_RA_INMU_LABO='" + rs.getString("hi_RA_INMU_LABO") + "'  "
                                            +  "hi_ASTO_INMU_LABO='" + rs.getString("hi_ASTO_INMU_LABO") + "'  "
                                            +  "hi_VDRL_INMU_LABO='" + rs.getString("hi_VDRL_INMU_LABO") + "'  "
                                            +  "hi_TOXOPLASMA_INMU_LABO='" + rs.getString("hi_TOXOPLASMA_INMU_LABO") + "'  "
                                            +  "hi_GRAVINDEZ_INMU_LABO='" + rs.getString("hi_GRAVINDEZ_INMU_LABO") + "'  "
                                            +  "hi_VIH_INMU_LABO='" + rs.getString("hi_VIH_INMU_LABO") + "'  "
                                            +  "hi_HB_INMU_LABO='" + rs.getString("hi_HB_INMU_LABO") + "'  "
                                            +  "hi_TSH_INMU_LABO='" + rs.getString("hi_TSH_INMU_LABO") + "'  "
                                            +  "hi_OBSERVACION_INMU_LABO='" + rs.getString("hi_OBSERVACION_INMU_LABO") + "'  "
                                            +  "hi_NEONATAL_PR_INMU_LABO_LABO='" + rs.getString("hi_NEONATAL_PR_INMU_LABO_LABO") + "'  "
                                           
                                            +  "hi_KOH_MICRO_LABO='" + rs.getString("hi_KOH_MICRO_LABO") + "'  "
                                            +  "hi_FROTIS_GAR_MICRO_LABO='" + rs.getString("hi_FROTIS_GAR_MICRO_LABO") + "'  "
                                            +  "hi_OBSERVACION_MICRO_LABO='" + rs.getString("hi_OBSERVACION_MICRO_LABO") + "'  "
                                           
                                            +  "hi_CELULAS_EPITE_VAGINALES_LABO='" + rs.getString("hi_CELULAS_EPITE_VAGINALES_LABO") + "'  "
                                            +  "hi_LEUCOCITOS_VAGINALES_LABO='" + rs.getString("hi_LEUCOCITOS_VAGINALES_LABO") + "'  "
                                            +  "hi_HEMATIES_VAGINALES_LABO='" + rs.getString("hi_HEMATIES_VAGINALES_LABO") + "'  "
                                            +  "hi_TRICOMONAS_VAGINALES_LABO='" + rs.getString("hi_TRICOMONAS_VAGINALES_LABO") + "'  "
                                            +  "hi_LEVADURAS_VAGINALES_LABO='" + rs.getString("hi_LEVADURAS_VAGINALES_LABO") + "'  "
                                            +  "hi_PH_VAGINALES_LABO='" + rs.getString("hi_PH_VAGINALES_LABO") + "'  "
                                            +  "hi_OBSER_CEL_VAGINALES_LABO='" + rs.getString("hi_OBSER_CEL_VAGINALES_LABO") + "'  "
                                            +  "hi_OBSER_LEUCO_VAGINALES_LABO='" + rs.getString("hi_OBSER_LEUCO_VAGINALES_LABO") + "'  "
                                            +  "hi_OBSER_HEMA_VAGINALES_LABO='" + rs.getString("hi_OBSER_HEMA_VAGINALES_LABO") + "'  "
                                            +  "hi_OBSER_TRICO_VAGINALES_LABO='" + rs.getString("hi_OBSER_TRICO_VAGINALES_LABO") + "'  "
                                            +  "hi_OBSER_LEVA_VAGINALES_LABO='" + rs.getString("hi_OBSER_LEVA_VAGINALES_LABO") + "'  "
                                            +  "hi_OBSER_PH_VAGINALES_LABO='" + rs.getString("hi_OBSER_PH_VAGINALES_LABO") + "'  "
                                           
                                            +  "hi_CELULAS_EPITE_URETRALES_LABO='" + rs.getString("hi_CELULAS_EPITE_URETRALES_LABO") + "'  "
                                            +  "hi_LEUCOCITOS_URETRALES_LABO='" + rs.getString("hi_LEUCOCITOS_URETRALES_LABO") + "'  "
                                            +  "hi_HEMATIES_URETRALES_LABO='" + rs.getString("hi_HEMATIES_URETRALES_LABO") + "'  "
                                            +  "hi_PH_URETRALES_LABO='" + rs.getString("hi_PH_URETRALES_LABO") + "'  "
                                            +  "hi_OBSER_CEL_URETRALES_LABO='" + rs.getString("hi_OBSER_CEL_URETRALES_LABO") + "'  "
                                            +  "hi_OBSER_LEUCO_URETRALES_LABO='" + rs.getString("hi_OBSER_LEUCO_URETRALES_LABO") + "'  "
                                            +  "hi_OBSER_HEMA_URETRALES_LABO='" + rs.getString("hi_OBSER_HEMA_URETRALES_LABO") + "'  "
                                            +  "hi_OBSER_PH_URETRALES_LABO='" + rs.getString("hi_OBSER_PH_URETRALES_LABO") + "'  "
                                           
                                            +  "hi_estado_LABO='" + rs.getString("hi_estado_LABO") + "'  "
                                           
                                            + " style='cursor: pointer;' id='ff"+ contador +"' onmouseover=\"cambiacolor_over1(this.id)\";  onclick=\"sel_fila1(this.id)\";  onmouseout=\"cambiacolor_out1(this.id)\";"
                                        + ">"
                                            + "<td><input type='radio' id='ch" + contador + "' name='sele' value=''></td>"
                                            + "<td style='font-weight:bold;'>" + rs.getString("hi_ID_LABO") + "</td>"
                                            + "<td style='font-weight:bold;'>" + rs.getDate("hi_FECHA_LABO") + "</td>"
                                        + "</tr>";
                    }                    
                                aten+= "</tbody>"
                            + "</table>"
                       + "</div>";                   
                }                
                out.println(aten);
                
                ///////////////////////////////////////////////////////////////////////////////////////////////
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
