
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
public class gestionar_formula extends HttpServlet {

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
                String  hi_FECHA_FORMULA = request.getParameter("hi_FECHA_FORMULA");
                String  hi_TA_FORMULA = request.getParameter("hi_TA_FORMULA");
                String  hi_TEMP_FORMULA = request.getParameter("hi_TEMP_FORMULA");
                String  hi_TALLA_FORMULA = request.getParameter("hi_TALLA_FORMULA");
                String  hi_PESO_FORMULA = request.getParameter("hi_PESO_FORMULA");
                String  hi_ESTADO_FORMULA = request.getParameter("hi_ESTADO_FORMULA");
                String  id_paciente = request.getParameter("id_paciente");
                String  ident_paciente = request.getParameter("ident_paciente");      
                ResultSet rs;
                Statement s= conex.createStatement();
                if(opcion.equals("guardar")){
                    sql="INSERT INTO salud_formula"
                            + "("
                                + " hi_ID_FORMULA,hi_FECHA_FORMULA,hi_TA_FORMULA,hi_TEMP_FORMULA,hi_TALLA_FORMULA,"
                                + " hi_PESO_FORMULA,hi_ESTADO_FORMULA,usuario,id_paciente,ident_paciente"
                            + ")"
                            + " VALUES("
                            + " null,'" + hi_FECHA_FORMULA + "','" + hi_TA_FORMULA + "','" + hi_TEMP_FORMULA + "','" + hi_TALLA_FORMULA + "',"
                            + " '" + hi_PESO_FORMULA + "','" + hi_ESTADO_FORMULA + "','" + usuario + "','" + id_paciente + "','" + ident_paciente + "'"
                            + ")";
                    s.executeUpdate(sql);
                    ////////////////////////////AVERIGUAR CUAL ES EL AUTO INCREMENTO///////////////
                    sql="SHOW TABLE STATUS FROM historias_clinicas LIKE 'salud_formula'";
                    rs=s.executeQuery(sql);rs.next();
                    int sig=rs.getInt("Auto_increment");
                    int auto=sig-1;
                    /////////////////////////////////////////////////////////////////////////////////                    
                    String tam=request.getParameter("tam");                    
                    int t=Integer.parseInt(tam);
                    for(int i=1;i<=t;i++){
                        sql="";
                        sql="INSERT INTO salud_detalle_formula"
                            + "("
                                + " hi_ID_DETALLE_FORMULA,hi_ID_FORMULA,hi_COD_FORMULA,hi_ELEMENPROC_FORMULA,hi_CANTIDAD_FORMULA,hi_NOMBRE_FORMULA"
                            + ")"                                
                            + " VALUES("
                            + " null,'" + auto + "','" + request.getParameter("hi_COD_FORMULA"+i) + "','" + request.getParameter("hi_ELEMENPROC_FORMULA"+i) + "','" + request.getParameter("hi_CANTIDAD_FORMULA"+i) + "','" + request.getParameter("hi_NOMBRE_FORMULA"+i) + "'"
                            + ")";                                
                        s.executeUpdate(sql);
                    }
                    out.println("1");
                }
                if(opcion.equals("modificar")){    
                    String  hi_ID_FORMULA = request.getParameter("hi_ID_FORMULA");
                    String tam=request.getParameter("tam");
                    sql="UPDATE salud_formula SET "
                        + " hi_FECHA_FORMULA='" + hi_FECHA_FORMULA + "',hi_TA_FORMULA='" + hi_TA_FORMULA + "',hi_TEMP_FORMULA='" + hi_TEMP_FORMULA + "',hi_TALLA_FORMULA='" + hi_TALLA_FORMULA + "',hi_PESO_FORMULA='" + hi_PESO_FORMULA + "',hi_ESTADO_FORMULA='" + hi_ESTADO_FORMULA + "'"
                        + " WHERE ident_paciente='"+ ident_paciente +"' AND id_paciente='"+ id_paciente +"' AND hi_ID_FORMULA='"+ hi_ID_FORMULA +"'";                              
                    s.executeUpdate(sql);                    
                    int t=Integer.parseInt(tam);
                    sql="DELETE FROM "
                            + "salud_detalle_formula "
                            + " WHERE  hi_ID_FORMULA='"+ hi_ID_FORMULA +"'";  
                    s.executeUpdate(sql);                    
                    for(int i=1;i<=t;i++){
                        sql="";
                        sql="INSERT INTO salud_detalle_formula"
                            + "("
                                + " hi_ID_DETALLE_FORMULA,hi_ID_FORMULA,hi_COD_FORMULA,hi_ELEMENPROC_FORMULA,hi_CANTIDAD_FORMULA,hi_NOMBRE_FORMULA"
                            + ")"                                
                            + " VALUES("
                            + " (SELECT IF('" + request.getParameter("hi_ID_DETALLE_FORMULA"+i) + "'='null',null,'" + request.getParameter("hi_ID_DETALLE_FORMULA"+i) + "')),'" + hi_ID_FORMULA + "','" + request.getParameter("hi_COD_FORMULA"+i) + "','" + request.getParameter("hi_ELEMENPROC_FORMULA"+i) + "','" + request.getParameter("hi_CANTIDAD_FORMULA"+i) + "','" + request.getParameter("hi_NOMBRE_FORMULA"+i) + "'"
                            + ")";                          
                        s.executeUpdate(sql);
                    }
                    out.println("1");                       
                }    
                if(opcion.equals("eliminar")){    
                    String  hi_ID_FORMULA = request.getParameter("hi_ID_FORMULA");
                    String tam=request.getParameter("tam");
                    sql="UPDATE salud_formula SET "
                        + " hi_ESTADO_FORMULA='" + hi_ESTADO_FORMULA + "'"
                        + " WHERE ident_paciente='"+ ident_paciente +"' AND id_paciente='"+ id_paciente +"' AND hi_ID_FORMULA='"+ hi_ID_FORMULA +"'";                              
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
