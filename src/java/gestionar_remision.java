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
public class gestionar_remision extends HttpServlet {

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
                String  hi_DE_REM_PAC = request.getParameter("hi_DE_REM_PAC");
                String  hi_A_REM_PAC = request.getParameter("hi_A_REM_PAC");
                String  hi_HIS_CLI_REC_REM_PAC = request.getParameter("hi_HIS_CLI_REC_REM_PAC");
                String  hi_FECHA_REM_PAC = request.getParameter("hi_FECHA_REM_PAC");
                String  hi_MEDICO_REM_PAC = request.getParameter("hi_MEDICO_REM_PAC");
                String  hi_SERVICIO_REM_PAC = request.getParameter("hi_SERVICIO_REM_PAC");
                String  hi_ESTADO_REM_PAC = request.getParameter("hi_ESTADO_REM_PAC");
                
                String  hi_ENFER_ACT_REM_PAC = request.getParameter("hi_ENFER_ACT_REM_PAC");
                String  hi_ANTECE_REM_PAC = request.getParameter("hi_ANTECE_REM_PAC");
                String  hi_TA_REM_PAC = request.getParameter("hi_TA_REM_PAC");
                String  hi_FC_REM_PAC = request.getParameter("hi_FC_REM_PAC");
                String  hi_FR_REM_PAC = request.getParameter("hi_FR_REM_PAC");
                String  hi_TEMP_REM_PAC = request.getParameter("hi_TEMP_REM_PAC");
                String  hi_TALLA_REM_PAC = request.getParameter("hi_TALLA_REM_PAC");
                String  hi_SAT02_REM_PAC = request.getParameter("hi_SAT02_REM_PAC");
                String  hi_DESCRIPCION_EXAMEN_FISICO_REM_PAC = request.getParameter("hi_DESCRIPCION_EXAMEN_FISICO_REM_PAC");
//                String  hi_DIAGNOSTICO_REM_PAC = request.getParameter("hi_DIAGNOSTICO_REM_PAC");
                String  hi_PLAN_MANEJO_REM_PAC = request.getParameter("hi_PLAN_MANEJO_REM_PAC");
                
                String hi_CODDIAGPPAL_REM_PAC=request.getParameter("hi_CODDIAGPPAL_REM_PAC");
                String hi_DIAGPPAL_REM_PAC=request.getParameter("hi_DIAGPPAL_REM_PAC");
                String hi_CODDIAG2_REM_PAC=request.getParameter("hi_CODDIAG2_REM_PAC");
                String hi_DIAG2_REM_PAC=request.getParameter("hi_DIAG2_REM_PAC");
                String hi_CODDIAG3_REM_PAC=request.getParameter("hi_CODDIAG3_REM_PAC");
                String hi_DIAG3_REM_PAC=request.getParameter("hi_DIAG3_REM_PAC");
                String hi_CODDIAG4_REM_PAC=request.getParameter("hi_CODDIAG4_REM_PAC");
                String hi_DIAG4_REM_PAC=request.getParameter("hi_DIAG4_REM_PAC");                
                
                String  id_paciente = request.getParameter("id_paciente");
                String  ident_paciente = request.getParameter("ident_paciente");   
                if(hi_FECHA_REM_PAC.equals("")){
                    hi_FECHA_REM_PAC="0001-01-01";
                }         
                ResultSet rs;
                Statement s= conex.createStatement();
                if(opcion.equals("guardar")){
                    sql="INSERT INTO salud_remision_pacientes"
                            + " VALUES("
                            + " null,'" + hi_DE_REM_PAC + "','" + hi_A_REM_PAC + "','" + hi_HIS_CLI_REC_REM_PAC + "','" + hi_FECHA_REM_PAC + "','" + hi_MEDICO_REM_PAC + "','" + hi_SERVICIO_REM_PAC + "',"
                            
                            + " '" + hi_ENFER_ACT_REM_PAC + "','" + hi_ANTECE_REM_PAC + "','" + hi_TA_REM_PAC + "','" + hi_FC_REM_PAC + "','" + hi_FR_REM_PAC + "','" + hi_TEMP_REM_PAC + "',"
                            + " '" + hi_TALLA_REM_PAC + "','" + hi_SAT02_REM_PAC + "','" + hi_DESCRIPCION_EXAMEN_FISICO_REM_PAC + "','" + hi_PLAN_MANEJO_REM_PAC + "',"                            
                            
                            + " '" + hi_ESTADO_REM_PAC + "','" + usuario + "','" + id_paciente + "','" + ident_paciente + "', "
                            + " '" + hi_CODDIAGPPAL_REM_PAC + "','" + hi_DIAGPPAL_REM_PAC + "','" + hi_CODDIAG2_REM_PAC + "','" + hi_DIAG2_REM_PAC + "',"
                            + " '" + hi_CODDIAG3_REM_PAC + "','" + hi_DIAG3_REM_PAC + "','" + hi_CODDIAG4_REM_PAC + "','" + hi_DIAG4_REM_PAC + "' "                            
                            + ")";
                    s.executeUpdate(sql);
                    out.println("1");                       
                } 
                if(opcion.equals("modificar")){
                    String  hi_ID_REM_PAC = request.getParameter("hi_ID_REM_PAC");
                    sql="UPDATE salud_remision_pacientes SET "
                            + " hi_DE_REM_PAC='" + hi_DE_REM_PAC + "',hi_A_REM_PAC='" + hi_A_REM_PAC + "',hi_HIS_CLI_REC_REM_PAC='" + hi_HIS_CLI_REC_REM_PAC + "',hi_FECHA_REM_PAC='" + hi_FECHA_REM_PAC + "',hi_MEDICO_REM_PAC='" + hi_MEDICO_REM_PAC + "',"
                            + " hi_SERVICIO_REM_PAC='" + hi_SERVICIO_REM_PAC + "',hi_ESTADO_REM_PAC='" + hi_ESTADO_REM_PAC + "',"

                            + " hi_ENFER_ACT_REM_PAC='" + hi_ENFER_ACT_REM_PAC + "',hi_ANTECE_REM_PAC='" + hi_ANTECE_REM_PAC + "',hi_TA_REM_PAC='" + hi_TA_REM_PAC + "',hi_FC_REM_PAC='" + hi_FC_REM_PAC + "',hi_FR_REM_PAC='" + hi_FR_REM_PAC + "',hi_TEMP_REM_PAC='" + hi_TEMP_REM_PAC + "',"
                            + " hi_TALLA_REM_PAC='" + hi_TALLA_REM_PAC + "',hi_SAT02_REM_PAC='" + hi_SAT02_REM_PAC + "',hi_DESCRIPCION_EXAMEN_FISICO_REM_PAC='" + hi_DESCRIPCION_EXAMEN_FISICO_REM_PAC + "',hi_PLAN_MANEJO_REM_PAC='" + hi_PLAN_MANEJO_REM_PAC + "', "

                            + " hi_CODDIAGPPAL_REM_PAC='" + hi_CODDIAGPPAL_REM_PAC + "',hi_DIAGPPAL_REM_PAC='" + hi_DIAGPPAL_REM_PAC + "',hi_CODDIAG2_REM_PAC='" + hi_CODDIAG2_REM_PAC + "',hi_DIAG2_REM_PAC='" + hi_DIAG2_REM_PAC + "',"
                            + " hi_CODDIAG3_REM_PAC='" + hi_CODDIAG3_REM_PAC + "',hi_DIAG3_REM_PAC='" + hi_DIAG3_REM_PAC + "',hi_CODDIAG4_REM_PAC='" + hi_CODDIAG4_REM_PAC + "',hi_DIAG4_REM_PAC='" + hi_DIAG4_REM_PAC + "' "                            
                            
                            + " WHERE ident_paciente='"+ ident_paciente +"' AND id_paciente='"+ id_paciente +"' AND hi_ID_REM_PAC='"+ hi_ID_REM_PAC +"'";                              
                    s.executeUpdate(sql);
                    out.println("1");                       
                }  
                if(opcion.equals("eliminar")){
                    String  hi_ID_REM_PAC = request.getParameter("hi_ID_REM_PAC");
                    sql="UPDATE salud_remision_pacientes SET "
                            + " hi_ESTADO_REM_PAC='" + hi_ESTADO_REM_PAC + "'"
                            + " WHERE ident_paciente='"+ ident_paciente +"' AND id_paciente='"+ id_paciente +"' AND hi_ID_REM_PAC='"+ hi_ID_REM_PAC +"'";                              
                    s.executeUpdate(sql);
                    out.println("1");                       
                }                  
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
