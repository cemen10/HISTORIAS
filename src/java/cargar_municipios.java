/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

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
public class cargar_municipios extends HttpServlet {

    /** 
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code> methods.
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
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
        String mun="";
        
        try {
            if(usuario==null){
                usuario="";
                out.println("<script>alert('Su Sesion Ha Terminado. Inicie Sesion Nuevamente'); location.href='../index.jsp'</script>");
            }else{
                ResultSet rs;
                Statement s= conex.createStatement();
                String auxiliar=request.getParameter("auxiliar");

                //////////////////////////TABLA DE MUNICIPIOS Y DEPARTAMENTOS/////////////////////////
                mun="<div style='width: 100%;height: 225px;overflow: auto;'>"
                    + "<table width='100%' cellpadding='0' cellspacing='0' class='data' id='box-table-a'>"
                        + "<thead style='font-size: 12px;'>"
                            + "<tr>"
                                + "<th width='2' scope='col'>SELECCIONAR...</th>"
                                + "<th width='5' scope='col'>C&Oacute;DIGO</th>"
                                + "<th width='24' scope='col'>NOMBRES</th>"
                                + "<th width='24' scope='col'>DEPARTAMENTO</th>"
                            + "</tr>"
                        + "</thead>";
                                          
                
                if(auxiliar.equals("1")){
                    sql="SELECT m.id, m.opcion, UCASE(d.nom_depart) AS nomdepa FROM mun m INNER JOIN depart d ON m.relacion=d.cod_depart LIMIT 20";                                          
                }else{
                    ///////////////////////SI LA BUSQUEDA ES POR CODIGO//////////////////////////////
                    String combomunicipio=request.getParameter("combomunicipio");
                    String txtbusmunicipio=request.getParameter("txtbusmunicipio");
                    String tipo=request.getParameter("tipo");
                    if(tipo.equals("VACIO")){
                        sql="SELECT m.id, m.opcion, UCASE(d.nom_depart) AS nomdepa FROM mun m INNER JOIN depart d ON m.relacion=d.cod_depart LIMIT 20";
                    }else{
                        if(combomunicipio.equals("CODIGO")){
                            sql = "SELECT m.id, m.opcion, UCASE(d.nom_depart) AS nomdepa FROM mun m INNER JOIN depart d ON m.relacion=d.cod_depart WHERE m.id LIKE '" + txtbusmunicipio + "%' LIMIT 20";
                        }else{
                            sql = "SELECT m.id, m.opcion, UCASE(d.nom_depart) AS nomdepa FROM mun m INNER JOIN depart d ON m.relacion=d.cod_depart WHERE m.opcion LIKE '" + txtbusmunicipio + "%' LIMIT 20";
                        }                                                
                    }                                        
                    ////////////////////////////////////////////////////////////////////////////////                                                            
                }
                rs=s.executeQuery(sql);
                     mun+= "<tbody id='tabemp' style='font-size: 14px;'>";
                     int contador=0;
                     while(rs.next()){
                         contador=contador+1;
                         mun+="<tr style='cursor: pointer;' id='f"+ contador +"' onmouseover=\"cambiacolor_over(this.id)\"; onClick=\"sel_fila(this.id)\"; onmouseout=\"cambiacolor_out(this.id)\";>"
                                 + "<td><input type='radio' id='check" + contador + "' name='seleccion' value='" + rs.getString("id") + "-" + rs.getString("opcion") + "-" + rs.getString("nomdepa") + "'></td>"
                                 + "<td style='font-size: 10px;'>" + rs.getString("id") + "</td>"
                                 + "<td style='font-size: 10px;'>" + rs.getString("opcion") + "</td>"
                                 + "<td style='font-size: 10px;'>" + rs.getString("nomdepa") + "</td>"
                            + "</tr>";
                     }                  
                ///////////////////////FIN TABLA DE MUNICIPIOS///////////////////////////////////     
                    mun+= "</tbody>"
                    + "</table>"
                + "</div>";                 
                out.println(mun);
            }
            
        } catch (Exception e) {
            out.println("No se ha completado la petici&oacute;n...");
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
