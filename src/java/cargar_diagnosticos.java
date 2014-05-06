

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
public class cargar_diagnosticos extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        Conexion conect= new Conexion();
        Connection conex=conect.getConnection();
        HttpSession session= request.getSession(true);
        HttpSession sa= request.getSession(true);
        String usuario= (String) session.getAttribute("USUARIO");
        String [] buscar= new String[10]; 
        String sql="";
        String pac="";           
        try {
            if(usuario==null){
                usuario="";
                out.println("<script>alert('Su Sesion Ha Terminado. Inicie Sesion Nuevamente'); location.href='../index.jsp'</script>");
            }else{
                ResultSet rs;
                Statement s=conex.createStatement();
                String auxiliar=request.getParameter("auxiliar");
                //////////////////////////TABLA DE DIAGNOSTICOS/////////////////////////
                
                pac="<div style='width:100%; height: 330px; overflow: auto;'>"
                        + "<table width='100%' cellpading='0' cellspacing='0' class='data' id='box-table-a'  overflow: scroll;>"
                            + "<thead style='font-size: 12px;'>"
                                + "<tr>"
                                    + "<th width='2'>SEL...</th>"
                                    + "<th width='12'>CODIO</th>"
                                    + "<th width='60'>DESCRIPCI&Oacute;N</th>"
                                + "</tr>"
                            + "</thead>";    
                if(auxiliar.equals("1")){
                         sql="SELECT "
                           + " * FROM "
                           + " diagnostico "
                           + " LIMIT 20"; 
                }else{
                    ///////////////////////SI LA BUSQUEDA ES POR CODIGO//////////////////////////////
                    String combusdiag=request.getParameter("combusdiag");
                    String txtbusdiag=request.getParameter("txtbusdiag");
                    String tipo=request.getParameter("tipo");  
                    if(tipo.equals("VACIO")){
                         sql="SELECT "
                           + " * FROM "
                           + " diagnostico "
                           + " LIMIT 20"; 
                    }else{
                        if(combusdiag.equals("CODIGO")){
                             sql="SELECT "
                               + " * FROM "
                               + " diagnostico "
                               + " WHERE cod_diagnostico LIKE '" + txtbusdiag + "%'"
                               + " LIMIT 20";                                 
                        }
                        if(combusdiag.equals("NOMBRE")){
                             sql="SELECT "
                               + " * FROM "
                               + " diagnostico "
                               + " WHERE des_diagnostico LIKE '" + txtbusdiag + "%'"
                               + " LIMIT 20";                             
                        }                        
                    }                     
                } 
                rs=s.executeQuery(sql);
                     pac+= "<tbody id='tabemp' style='font-size: 14px;'>";
                     int contador=0;
                     while(rs.next()){
                         contador=contador+1;
                         pac+="<tr style='cursor: pointer;' id='f"+ contador +"' onmouseover=\"cambiacolor_over(this.id)\";  onClick=\"sel_fila(this.id)\"; onmouseout=\"cambiacolor_out(this.id)\";>"
                                 + "<td>"
                                    + "<input type='radio' id='check" + contador + "' name='seleccion' "
                                        + "value='" 
                                        + rs.getString("cod_diagnostico") 
                                        + ";" + rs.getString("des_diagnostico")
                                        + "'>"
                                 + "</td>"
                                 
                                 + "<td style='font-size: 10px;'>" + rs.getString("cod_diagnostico") + "</td>"
                                 + "<td style='font-size: 10px;'>" + rs.getString("des_diagnostico") + "</td>"
                            + "</tr>";
                     }                  
                ///////////////////////FIN TABLA DE MUNICIPIOS///////////////////////////////////     
                
                            pac+= "</tbody>";
                        pac+= "</table>"
                  + "</div>";                
                out.println(pac);
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
