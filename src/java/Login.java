

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
public class Login extends HttpServlet {
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        
        Conexion conect= new Conexion();
        Connection conex=conect.getConnection();
        HttpSession session= request.getSession(true);
        
        String sql="";
        String menu_left = "";
        String menu_leftsub = "";
        String usu=request.getParameter("txtusu");
        String con=request.getParameter("txtcon");        
        int total;
        try {
            ResultSet rs;
            Statement s=conex.createStatement();
            sql="SELECT *FROM usuarios WHERE "
                    + " user_usuario = '" + usu + "' AND "
                    + " pass_usuario = MD5('" + con + "') LIMIT 1 ";
            rs=s.executeQuery(sql);
            rs.last();
            total=rs.getRow();
            
            if(total==1){
                session.setAttribute("ID",rs.getString("id_usuario"));
                session.setAttribute("CED",rs.getString("ced_usuario"));
                session.setAttribute("NOMBRES",rs.getString("nom_usuario"));
                session.setAttribute("APELLIDOS",rs.getString("ape_usuario"));
                session.setAttribute("CORREO",rs.getString("cor_usuario"));
                session.setAttribute("TIPO",rs.getString("tipo_usuario"));
                session.setAttribute("USUARIO",rs.getString("user_usuario"));
                session.setAttribute("CONTRASEÑA",rs.getString("pass_usuario"));

                if(rs.getString("tipo_usuario").equals("ADMINISTRADOR")){
                    /////////////////////////////MENU PRINCIPAL ADMIN//////////////////////////////////////////
                    menu_left += "<a href='javascript:;' id='hide_menu'>&laquo;</a>"
                               + "<ul id='main_menu'>"
                                 + "<li><a href=''></a></li>";
                    
                    menu_left +=   "<li>"
                                   + "<a href='#'><img src='images/atencion.png' width='30' height='30' alt='configure'/>Urgencias</a>"
                                   + "<ul style='font-size: 10px;'>";
                    menu_left +=       "<li><a href='ges_ateurg' ><img src='images/ok.png' width='16' height='16' alt='check'/>Atenci&oacute;n de Urgencias</a></li>";
                    menu_left +=       "<li><a href='ges_epicrisis' ><img src='images/ok.png' width='16' height='16' alt='check'/>Epicrisis</a></li>";
                    menu_left +=       "<li><a href='ges_epicrisis_aten' ><img src='images/ok.png' width='16' height='16' alt='check'/>Epicrisis Atenci&oacute;n de Urgencias</a></li>";
                    menu_left +=       "<li><a href='ges_remision' ><img src='images/ok.png' width='16' height='16' alt='check'/>Remisi&oacute; de Pacientes</a></li>";
                    menu_left +=     "</ul>"
                                 + "</li>";
                           

                    menu_left +=   "<li>"
                                    + "<a href='#'><img src='images/medicamentos.png' width='30' height='30'  alt='configure'/>Medicamentos</a>"                        
                                    + "<ul  style='font-size: 10px;'>";
                    menu_left +=       "<li><a href='ges_manejo_medica' ><img src='images/ok.png' width='16' height='16' alt='check'/>Manejo de Medicamentos</a></li>";
                    menu_left +=       "<li><a href='ges_formula' ><img src='images/ok.png' width='16' height='16' alt='check'/>Formula Medica</a></li>";
                    menu_left +=     "</ul>"
                                 + "</li>";                    
                                   

                    menu_left +=   "<li>"
                                    + "<a href='#'><img src='images/notas.png' width='30' height='30'  alt='configure'/>Notas de Enfermeria</a>"                        
                                    + "<ul  style='font-size: 10px;'>";
                    menu_left +=       "<li><a href='ges_notas_enf' ><img src='images/ok.png' width='16' height='16' alt='check'/>Notas de Enfermeria</a></li>";
                    menu_left +=     "</ul>"
                                 + "</li>";                     

                    menu_left +=   "<li>"
                                    + "<a href='#'><img src='images/laboratorio.png' width='30' height='30'  alt='configure'/>Laboratorio</a>"                        
                                    + "<ul  style='font-size: 10px;'>";
                    menu_left +=       "<li><a href='ges_labora' ><img src='images/ok.png' width='16' height='16' alt='check'/>Laboratorio</a></li>";
                    menu_left +=     "</ul>"
                                 + "</li>";          
                    
                    menu_left +=   "<li>"
                                    + "<a href='#'><img src='images/hd.png' width='30' height='30'  alt='configure'/>Consulta Externa</a>"                        
                                    + "<ul  style='font-size: 10px;'>";
                    menu_left +=       "<li><a href='ges_materno_per' ><img src='images/ok.png' width='16' height='16' alt='check'/>Materno Perinatal</a></li>";
                    menu_left +=     "</ul>"
                                 + "</li>";        
                    
                    menu_left +=   "<li>"
                                    + "<a href='#'><img src='images/vacuna.png' width='30' height='30'  alt='configure'/>Vacunas</a>"                        
                                    + "<ul  style='font-size: 10px;'>";
                    menu_left +=       "<li><a href='#' ><img src='images/ok.png' width='16' height='16' alt='check'/>Vacunas</a></li>";
                    menu_left +=     "</ul>"
                                 + "</li>";                      
                    
                    menu_left +=   "<li>"
                                    + "<a href='#'><img src='images/diente.png' width='30' height='30'  alt='configure'/>Odontologia</a>"                        
                                    + "<ul  style='font-size: 10px;'>";
                    menu_left +=       "<li><a href='#' ><img src='images/ok.png' width='16' height='16' alt='check'/>Odontologia</a></li>";
                    menu_left +=     "</ul>"
                                 + "</li>";                      
                    
                    menu_left += "</ul>";
                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    
                }
                    
                
                if(rs.getString("tipo_usuario").equals("ADMINISTRADOR")){                    
                    /////////////////////MENU PRINCIPAL ADMIN SUB NIVEL//////////////////////////////////////
                    menu_leftsub += "<a href='javascript:;' id='hide_menu'>&laquo;</a>"
                               + "<ul id='main_menu'>"
                                 + "<li><a href=''></a></li>";
                    
                    menu_leftsub +="<li>"
                                   + "<a href='#'><img src='../images/atencion.png' width='30' height='30' alt='configure'/>Urgencias</a>"
                                   + "<ul style='font-size: 10px;'>";
                    menu_leftsub +=       "<li><a href='../ges_ateurg' ><img src='../images/ok.png' width='16' height='16' alt='check'/>Atenci&oacute;n de Urgencias</a></li>";
                    menu_leftsub +=       "<li><a href='../ges_epicrisis' ><img src='../images/ok.png' width='16' height='16' alt='check'/>Epicrisis</a></li>";
                    menu_leftsub +=       "<li><a href='../ges_epicrisis_aten' ><img src='../images/ok.png' width='16' height='16' alt='check'/>Epicrisis Atenci&oacute;n de Urgencias</a></li>";
                    menu_leftsub +=       "<li><a href='../ges_remision' ><img src='../images/ok.png' width='16' height='16' alt='check'/>Remisi&oacute; de Pacientes</a></li>";
                    menu_leftsub +=     "</ul>"
                                 + "</li>";                    
                    
                    menu_leftsub +="<li>"
                                    + "<a href='#'><img src='../images/medicamentos.png' width='30' height='30'  alt='configure'/>Medicamentos</a>"                        
                                    + "<ul  style='font-size: 10px;'>";
                    menu_leftsub +=       "<li><a href='../ges_manejo_medica' ><img src='../images/ok.png' width='16' height='16' alt='check'/>Manejo de Medicamentos</a></li>";
                    menu_leftsub +=       "<li><a href='../ges_formula' ><img src='../images/ok.png' width='16' height='16' alt='check'/>Formula Medica</a></li>";
                    menu_leftsub +=     "</ul>"
                                 + "</li>";                       
                    
                    menu_leftsub +="<li>"
                                    + "<a href='#'><img src='../images/notas.png' width='30' height='30'  alt='configure'/>Notas de Enfermeria</a>"                        
                                    + "<ul  style='font-size: 10px;'>";
                    menu_leftsub +=       "<li><a href='../ges_notas_enf' ><img src='../images/ok.png' width='16' height='16' alt='check'/>Notas de Enfermeria</a></li>";
                    menu_leftsub += "</ul>"
                                 + "</li>";     
                    

                    menu_leftsub +=   "<li>"
                                    + "<a href='#'><img src='../images/laboratorio.png' width='30' height='30'  alt='configure'/>Laboratorio</a>"                        
                                      + "<ul  style='font-size: 10px;'>";
                    menu_leftsub +=       "<li><a href='../ges_labora' ><img src='../images/ok.png' width='16' height='16' alt='check'/>Laboratorio</a></li>";
                    menu_leftsub +=     "</ul>"
                                 + "</li>";       
                    
                    menu_leftsub +=   "<li>"
                                    + "<a href='#'><img src='../images/hd.png' width='30' height='30'  alt='configure'/>Consulta Externa</a>"                        
                                    + "<ul  style='font-size: 10px;'>";
                    menu_leftsub +=       "<li><a href='../ges_materno_per' ><img src='../images/ok.png' width='16' height='16' alt='check'/>Materno Perinatal</a></li>";
                    menu_leftsub +=     "</ul>"
                                 + "</li>";   
                    
                    
                    menu_leftsub +=   "<li>"
                                    + "<a href='#'><img src='../images/vacuna.png' width='30' height='30'  alt='configure'/>Vacunas</a>"                        
                                    + "<ul  style='font-size: 10px;'>";
                    menu_leftsub +=       "<li><a href='#' ><img src='../images/ok.png' width='16' height='16' alt='check'/>Vacunas</a></li>";
                    menu_leftsub +=     "</ul>"
                                 + "</li>";                      
                    
                    menu_leftsub +=   "<li>"
                                    + "<a href='#'><img src='../images/diente.png' width='30' height='30'  alt='configure'/>Odontologia</a>"                        
                                    + "<ul  style='font-size: 10px;'>";
                    menu_leftsub +=       "<li><a href='#' ><img src='../images/ok.png' width='16' height='16' alt='check'/>Odontologia</a></li>";
                    menu_leftsub +=     "</ul>"
                                 + "</li>";                       
                    
                    menu_leftsub += "</ul>";

                    ///////////////////////////////////////////////////////////////////////////////////
                }
                session.setAttribute("menu_left", menu_left);
                session.setAttribute("menu_leftsub", menu_leftsub);
                
                out.println(1);
            }else{
                out.println(2);
            }
            rs.beforeFirst();
            
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
