import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.*;
import java.util.ArrayList;
import javax.servlet.http.HttpSession;
import org.json.simple.JSONArray;
//import net.sf.json.JSONObject;
import org.json.simple.JSONObject;

/**
 *
 * @author carlosmario
 */
public class car_detalle_manejo extends HttpServlet {

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
        String manejo=""; 
        
        try {
            if(usuario==null){
                usuario="";
                out.println("<script>alert('Su Sesion Ha Terminado. Inicie Sesion Nuevamente'); location.href='../index.jsp'</script>");
            }else{
                ResultSet rs;
                Statement s=conex.createStatement();
                String hi_ID_MAN_MEDICA=request.getParameter("hi_ID_MAN_MEDICA");
     
                    ////////////////////////////CAMBIAR SQL//////////////////////////////////////////////////
      
                sql="SELECT " 
                        + " d.hi_ID_DETALLE_MAN_MEDICA, "
                        + " d.hi_ID_MAN_MEDICA, "
                        + " d.hi_FECHA, "
                        + " d.hi_HORA, "
                        + " d.hi_COD_MEDICA, "
                        + " d.hi_ELEMENPROC_MEDICA, "
                        + " d.hi_CANTIDAD_MEDICA, "
                        + " hi_VALOR_MEDICA, "
                        + " m.nomGene_medicamentos  "
                    + " FROM "
                        + " salud_detalle_manejo_medica d " 
                    + " INNER JOIN"
                        + " medicamentos m  "
                    + "  ON"
                        + " d.hi_COD_MEDICA = m.cod_medicamentos "
                    + " WHERE d.hi_ID_MAN_MEDICA='" + hi_ID_MAN_MEDICA + "'";        
                    //String [] campo= new String[100]; 
                //////////////////////////////////////////////////////////////////////////////////////
               
                rs=s.executeQuery(sql);     
                JSONObject datos=new JSONObject();  
                JSONArray lista = new JSONArray();
                int k=1;
                while(rs.next()){
                    datos.put("hi_ID_DETALLE_MAN_MEDICA"+k,rs.getString("hi_ID_DETALLE_MAN_MEDICA"));
                    datos.put("hi_ID_MAN_MEDICA"+k,rs.getString("hi_ID_MAN_MEDICA"));
                    datos.put("hi_FECHA"+k,rs.getString("hi_FECHA"));
                    datos.put("hi_HORA"+k,rs.getString("hi_HORA"));
                    datos.put("hi_COD_MEDICA"+k,rs.getString("hi_COD_MEDICA"));
                    datos.put("hi_ELEMENPROC_MEDICA"+k,rs.getString("hi_ELEMENPROC_MEDICA"));
                    datos.put("hi_CANTIDAD_MEDICA"+k,rs.getString("hi_CANTIDAD_MEDICA"));
                    datos.put("hi_VALOR_MEDICA"+k,rs.getString("hi_VALOR_MEDICA"));  
                    datos.put("nomGene_medicamentos"+k,rs.getString("nomGene_medicamentos"));
                    k=k+1;
                }          
                int tam=k-1;
                datos.put("tam", tam);
                out.println(datos);
                //out.println("1");
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
