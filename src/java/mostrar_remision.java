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
public class mostrar_remision extends HttpServlet {

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
        String remisi="";           
                
        try {
            if(usuario==null){
                usuario="";
                out.println("<script>alert('Su Sesion Ha Terminado. Inicie Sesion Nuevamente'); location.href='../index.jsp'</script>");
            }else{
                ResultSet rs;
                Statement s=conex.createStatement();
                String auxiliar=request.getParameter("auxiliar");
                if(auxiliar.equals("REMISION")){
                    //////////////////////////TABLA DE EPICRISIS ATENCION DE URGENCIAS/////////////////////////                    
                    String ident=request.getParameter("ident");
                    String fecha=request.getParameter("fecha");       
                    ////////////////////////////CAMBIAR SQL//////////////////////////////////////////////////
                    if(fecha.equals("")){
                        sql="SELECT " +
                            " * " + 
                            " FROM " +
                            "  salud_remision_pacientes " +
                            " INNER JOIN pacientes "+
                            "    ON salud_remision_pacientes.ident_paciente = pacientes.ident_paciente " +                                 
                            " WHERE pacientes.ident_paciente LIKE '" + ident + "%' AND hi_ESTADO_REM_PAC='ACTIVO'";                           
                    }else{
                        sql="SELECT " +                           
                            " * " + 
                            " FROM " +
                            "  salud_remision_pacientes " +
                            " INNER JOIN pacientes "+
                            "    ON salud_remision_pacientes.ident_paciente = pacientes.ident_paciente " + 
                            " WHERE pacientes.ident_paciente LIKE '" + ident + "%' AND hi_FECHA_REM_PAC='"+ fecha +"'  AND hi_ESTADO_REM_PAC='ACTIVO'";                                                                    
                    }   
                    //////////////////////////////////////////////////////////////////////////////////////
                    
                    
                    String nomcompleto="";
                    rs=s.executeQuery(sql);
                    int j=1;
                    int contador=0;
                    remisi= "<div style='width:100%; height: 105px; overflow: auto;'>"
                            + "<table width='100%' cellpading='2' cellspacing='2' class='data' id='box-table-a' border='1'>"
                                + "<thead style='font-size: 12px;'>"
                                    + "<tr>"
                                        + "<th style='font-weight:bold;  background:#b9d1ea; width: 5%;'>SEL...</th>"
                                        + "<th style='font-weight:bold;  background:#b9d1ea; width: 15%;'>ID REMISI&Oacute;N</th>"
                                        + "<th style='font-weight:bold;  background:#b9d1ea; width: 30%;'>SERVICIO</th>"
                                        + "<th style='font-weight:bold;  background:#b9d1ea; width: 30%;'>FECHA</th>"
                                    + "</tr>"
                                + "</thead>"
                                + "<tbody id='tabemp' style='font-size: 11px;'>";                                        
                    while(rs.next()){
                        /////////////////////////////CAMBIAR///////////////////////////////////////////////////
                        contador=contador+1;
                        nomcompleto= rs.getString("pacientes.nomb_paciente") + " " + rs.getString("pacientes.segnomb_paciente") + " " + rs.getString("pacientes.priapell_paciente")+ " " + rs.getString("pacientes.segapell_paciente");                                    
                        String servicio="";
                        if(rs.getString("hi_SERVICIO_REM_PAC").equals("1")){
                            servicio="MEDICINA INTERNA";
                        }
                        if(rs.getString("hi_SERVICIO_REM_PAC").equals("2")){
                            servicio="UROLOGIA";
                        }
                        if(rs.getString("hi_SERVICIO_REM_PAC").equals("3")){
                            servicio="PEDIATRIA";
                        }
                        if(rs.getString("hi_SERVICIO_REM_PAC").equals("4")){
                            servicio="ORTOPEDIA";
                        }       
                        if(rs.getString("hi_SERVICIO_REM_PAC").equals("5")){
                            servicio="NEUROLOGIA";
                        }   
                        if(rs.getString("hi_SERVICIO_REM_PAC").equals("6")){
                            servicio="GINECOLOGIA";
                        }   
                        if(rs.getString("hi_SERVICIO_REM_PAC").equals("7")){
                            servicio="CIRUGIA";
                        }                           
                                             
                        
                        remisi += "<tr class='marcado2' "    
                                
                                    ///////////////////////////////////CAMBIAR //////////////////////////////////////////////////////////////
                                    +  "hi_ID_REM_PAC='" + rs.getString("hi_ID_REM_PAC") + "'  "
                                    +  "hi_DE_REM_PAC='" + rs.getString("hi_DE_REM_PAC") + "'  "
                                    +  "hi_A_REM_PAC='" + rs.getString("hi_A_REM_PAC") + "'  "
                                    +  "hi_HIS_CLI_REC_REM_PAC='" + rs.getString("hi_HIS_CLI_REC_REM_PAC") + "'  "
                                    +  "hi_FECHA_REM_PAC='" + rs.getString("hi_FECHA_REM_PAC") + "'  "
                                    +  "hi_MEDICO_REM_PAC='" + rs.getString("hi_MEDICO_REM_PAC") + "'  "
                                    +  "hi_SERVICIO_REM_PAC='" + rs.getString("hi_SERVICIO_REM_PAC") + "'  "
                                
                                    +  "hi_ENFER_ACT_REM_PAC='" + rs.getString("hi_ENFER_ACT_REM_PAC") + "'  "
                                    +  "hi_ANTECE_REM_PAC='" + rs.getString("hi_ANTECE_REM_PAC") + "'  "
                                    +  "hi_TA_REM_PAC='" + rs.getString("hi_TA_REM_PAC") + "'  "
                                    +  "hi_FC_REM_PAC='" + rs.getString("hi_FC_REM_PAC") + "'  "
                                    +  "hi_FR_REM_PAC='" + rs.getString("hi_FR_REM_PAC") + "'  "
                                    +  "hi_TEMP_REM_PAC='" + rs.getString("hi_TEMP_REM_PAC") + "'  "
                                    +  "hi_TALLA_REM_PAC='" + rs.getString("hi_TALLA_REM_PAC") + "'  "
                                    +  "hi_SAT02_REM_PAC='" + rs.getString("hi_SAT02_REM_PAC") + "'  "
                                    +  "hi_DESCRIPCION_EXAMEN_FISICO_REM_PAC='" + rs.getString("hi_DESCRIPCION_EXAMEN_FISICO_REM_PAC") + "'  "
//                                    +  "hi_DIAGNOSTICO_REM_PAC='" + rs.getString("hi_DIAGNOSTICO_REM_PAC") + "'  "
                                    +  "hi_PLAN_MANEJO_REM_PAC='" + rs.getString("hi_PLAN_MANEJO_REM_PAC") + "'  "
                                
                                    +  "hi_ESTADO_REM_PAC='" + rs.getString("hi_ESTADO_REM_PAC") + "'  "
                                
                                    + " hi_CODDIAGPPAL_REM_PAC='" + rs.getString("hi_CODDIAGPPAL_REM_PAC") + "' "
                                    + " hi_DIAGPPAL_REM_PAC='" + rs.getString("hi_DIAGPPAL_REM_PAC") + "' "
                                    + " hi_CODDIAG2_REM_PAC='" + rs.getString("hi_CODDIAG2_REM_PAC") + "' "
                                    + " hi_DIAG2_REM_PAC='" + rs.getString("hi_DIAG2_REM_PAC") + "' "
                                    + " hi_CODDIAG3_REM_PAC='" + rs.getString("hi_CODDIAG3_REM_PAC") + "' "
                                    + " hi_DIAG3_REM_PAC='" + rs.getString("hi_DIAG3_REM_PAC") + "' "
                                    + " hi_CODDIAG4_REM_PAC='" + rs.getString("hi_CODDIAG4_REM_PAC") + "' "
                                    + " hi_DIAG4_REM_PAC='" + rs.getString("hi_DIAG4_REM_PAC") + "' "                                
                                
                                  ////////////////////////////////////////////////////////////////////////////////////////7
                                                                
                                  + " style='cursor: pointer;' id='ff"+ contador +"' onmouseover=\"cambiacolor_over1(this.id)\";  onclick=\"sel_fila1(this.id)\";  onmouseout=\"cambiacolor_out1(this.id)\";"
                              + ">"
                                  + "<td><input type='radio' id='ch" + contador + "' name='sele' value=''></td>"
                                  + "<td style='font-weight:bold;'>" + rs.getString("hi_ID_REM_PAC") + "</td>"
                                  + "<td style='font-weight:bold;'>" + servicio + "</td>"
                                  + "<td style='font-weight:bold;'>" + rs.getDate("hi_FECHA_REM_PAC") + "</td>"
                              + "</tr>";
                        
                        ///////////////////////////////////////////////////////////////////////////////////////
                    }
                                remisi+= "</tbody>"
                            + "</table>"
                       + "</div>";                      
                }    
                out.println(remisi);             
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
