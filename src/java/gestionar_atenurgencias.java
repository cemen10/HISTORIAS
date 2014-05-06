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
public class gestionar_atenurgencias extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        //////////////////////////CONEXION//////////////////////////////////////////////////////////////////////        
        Conexion conect= new Conexion();
        Connection conex=conect.getConnection();
        HttpSession session= request.getSession(true);
        HttpSession sa= request.getSession(true);
        String usuario= (String) session.getAttribute("USUARIO");
        
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        try {
            if(usuario==null){
                usuario="";
                out.println("<script>alert('Su Sesion Ha Terminado. Inicie Sesion Nuevamente'); location.href='../index.jsp'</script>");
            }else{
                //////////////////////////////RECIBIR VALORES//////////////////////////////////////////////////////////////////////////
                String  opcion = request.getParameter("opcion");
                
                String  hi_ID_ATEN_URGEN = request.getParameter("hi_ID_ATEN_URGEN");                        
                String  hi_FECHA_ATEN_URGEN = request.getParameter("hi_FECHA_ATEN_URGEN");
                String  hi_MEDIOS_PROPIOS_ATEN_URGEN = request.getParameter("hi_MEDIOS_PROPIOS_ATEN_URGEN");
                String  hi_CUAL_ATEN_URGEN = request.getParameter("hi_CUAL_ATEN_URGEN");
                String  hi_ESTADO_PACIENTE_ATEN_URGEN = request.getParameter("hi_ESTADO_PACIENTE_ATEN_URGEN");
                String  hi_NOMBRE_ACOMP_ACTUAL_ATEN_URGEN = request.getParameter("hi_NOMBRE_ACOMP_ACTUAL_ATEN_URGEN");
                String  hi_DIRECCION_ACOMP_ACTUAL_ATEN_URGEN = request.getParameter("hi_DIRECCION_ACOMP_ACTUAL_ATEN_URGEN");
                String  hi_MUNICIPIO_ACOMP_ACTUAL_ATEN_URGEN = request.getParameter("hi_MUNICIPIO_ACOMP_ACTUAL_ATEN_URGEN");
                String  hi_DEPARTAMENTO_ACOMP_ACTUAL_ATEN_URGEN = request.getParameter("hi_DEPARTAMENTO_ACOMP_ACTUAL_ATEN_URGEN");
                String  hi_TELEFONO_ACOMP_ACTUAL_ATEN_URGEN = request.getParameter("hi_TELEFONO_ACOMP_ACTUAL_ATEN_URGEN");
                String  hi_FECHA_EN_CASO_ATEN_URGEN = request.getParameter("hi_FECHA_EN_CASO_ATEN_URGEN");
                String  hi_HORA_EN_CASO_ATEN_URGEN = request.getParameter("hi_HORA_EN_CASO_ATEN_URGEN");
                String  hi_SITIO_EN_CASO_ATEN_URGEN = request.getParameter("hi_SITIO_EN_CASO_ATEN_URGEN");
                String  hi_CAUSA_EN_CASO_ATEN_URGEN = request.getParameter("hi_CAUSA_EN_CASO_ATEN_URGEN");
                String  hi_NOT_POL_ATEN_URGEN = request.getParameter("hi_NOT_POL_ATEN_URGEN");
                String  hi_FECHA_NOT_POL_ATEN_URGEN = request.getParameter("hi_FECHA_NOT_POL_ATEN_URGEN");
                String  hi_HORA_NOT_POL_ATEN_URGEN = request.getParameter("hi_HORA_NOT_POL_ATEN_URGEN");
                String  hi_NOT_FAM_ATEN_URGEN = request.getParameter("hi_NOT_FAM_ATEN_URGEN");
                String  hi_FECHA_NOT_FAM_ATEN_URGEN = request.getParameter("hi_FECHA_NOT_FAM_ATEN_URGEN");
                String  hi_HORA_NOT_FAM_ATEN_URGEN = request.getParameter("hi_HORA_NOT_FAM_ATEN_URGEN");
                String  hi_NOT_SER_ATEN_URGEN = request.getParameter("hi_NOT_SER_ATEN_URGEN");
                String  hi_FECHA_NOT_SER_ATEN_URGEN = request.getParameter("hi_FECHA_NOT_SER_ATEN_URGEN");
                String  hi_HORA_NOT_SER_ATEN_URGEN = request.getParameter("hi_HORA_NOT_SER_ATEN_URGEN");
                String  hi_FECHA_SALIDA_ATEN_URGEN = request.getParameter("hi_FECHA_SALIDA_ATEN_URGEN");
                String  hi_HORA_SALIDA_ATEN_URGEN = request.getParameter("hi_HORA_SALIDA_ATEN_URGEN");
                String  hi_CONDICION_SALIDA_ATEN_URGEN = request.getParameter("hi_CONDICION_SALIDA_ATEN_URGEN");
                String  hi_CONDICION_REMI_SALIDA_ATEN_URGEN = request.getParameter("hi_CONDICION_REMI_SALIDA_ATEN_URGEN");
                String  hi_OTRO_SALIDA_ATEN_URGEN = request.getParameter("hi_OTRO_SALIDA_ATEN_URGEN");
                String  hi_SERVICIO_SALIDA_ATEN_URGEN = request.getParameter("hi_SERVICIO_SALIDA_ATEN_URGEN");
                String  hi_NOMBRE_SALIDA = request.getParameter("hi_NOMBRE_SALIDA");
                String  hi_CIUDAD_SALIDA = request.getParameter("hi_CIUDAD_SALIDA");
                String  hi_N_HISTORIA = request.getParameter("hi_N_HISTORIA");
                String  hi_estado = request.getParameter("hi_ESTADO");
                String  id_paciente = request.getParameter("id_paciente");
                String  ident_paciente = request.getParameter("ident_paciente");
                String hi_HORA_ATEN_URGEN=request.getParameter("hi_HORA_ATEN_URGEN");
                String hi_entidad_ATEN_URGEN=request.getParameter("hi_entidad_ATEN_URGEN");
                
                
                if(hi_FECHA_EN_CASO_ATEN_URGEN.equals("")){
                    hi_FECHA_EN_CASO_ATEN_URGEN="0001-01-01";
                }
                if(hi_FECHA_NOT_POL_ATEN_URGEN.equals("")){
                    hi_FECHA_NOT_POL_ATEN_URGEN="0001-01-01";
                }
                if(hi_FECHA_NOT_FAM_ATEN_URGEN.equals("")){
                    hi_FECHA_NOT_FAM_ATEN_URGEN="0001-01-01";
                }
                if(hi_FECHA_NOT_SER_ATEN_URGEN.equals("")){
                    hi_FECHA_NOT_SER_ATEN_URGEN="0001-01-01";
                }
                if(hi_FECHA_SALIDA_ATEN_URGEN.equals("")){
                    hi_FECHA_SALIDA_ATEN_URGEN="0001-01-01";
                }
                
                String hi_MOTIVO_CONSULTA_ATEN_URGEN=request.getParameter("hi_MOTIVO_CONSULTA_ATEN_URGEN");
                String hi_ESTADO_GENERAL_ATEN_URGEN=request.getParameter("hi_ESTADO_GENERAL_ATEN_URGEN");
                String hi_ENFERMEDAD_ACTUAL_ATEN_URGEN=request.getParameter("hi_ENFERMEDAD_ACTUAL_ATEN_URGEN");
                String hi_ANTECEDENTES_ATEN_URGEN=request.getParameter("hi_ANTECEDENTES_ATEN_URGEN");
                String hi_REVISION_SISTEMAS_ATEN_URGEN=request.getParameter("hi_REVISION_SISTEMAS_ATEN_URGEN");
                String hi_TA_ATEN_URGEN=request.getParameter("hi_TA_ATEN_URGEN");
                String hi_FC_ATEN_URGEN=request.getParameter("hi_FC_ATEN_URGEN");
                String hi_FR_ATEN_URGEN=request.getParameter("hi_FR_ATEN_URGEN");
                String hi_TEMP_ATEN_URGEN=request.getParameter("hi_TEMP_ATEN_URGEN");
                String hi_TALLA_ATEN_URGEN=request.getParameter("hi_TALLA_ATEN_URGEN");
                String hi_SAT02_ATEN_URGEN=request.getParameter("hi_SAT02_ATEN_URGEN");
                String hi_DESCRIPCION_EXAMEN_FISICO_ATEN_URGEN=request.getParameter("hi_DESCRIPCION_EXAMEN_FISICO_ATEN_URGEN");
//                String hi_DIAGNOSTICO_ATEN_URGEN=request.getParameter("hi_DIAGNOSTICO_ATEN_URGEN");
                String hi_CONDUCTA_ATEN_URGEN=request.getParameter("hi_CONDUCTA_ATEN_URGEN");
                String hi_PLAN_MANEJO_ATEN_URGEN=request.getParameter("hi_PLAN_MANEJO_ATEN_URGEN");
                String hi_DX_PRESUNTIVOS_ATEN_URGEN=request.getParameter("hi_DX_PRESUNTIVOS_ATEN_URGEN");
                String hi_CONDICIONES_GENERAL_ATEN_URGEN=request.getParameter("hi_CONDICIONES_GENERAL_ATEN_URGEN");
                String hi_PLAN_AMBULATORIO_ATEN_URGEN=request.getParameter("hi_PLAN_AMBULATORIO_ATEN_URGEN");
                
                String hi_CODDIAGPPAL_ATEN_URGEN=request.getParameter("hi_CODDIAGPPAL_ATEN_URGEN");
                String hi_DIAGPPAL_ATEN_URGEN=request.getParameter("hi_DIAGPPAL_ATEN_URGEN");
                String hi_CODDIAG2_ATEN_URGEN=request.getParameter("hi_CODDIAG2_ATEN_URGEN");
                String hi_DIAG2_ATEN_URGEN=request.getParameter("hi_DIAG2_ATEN_URGEN");
                String hi_CODDIAG3_ATEN_URGEN=request.getParameter("hi_CODDIAG3_ATEN_URGEN");
                String hi_DIAG3_ATEN_URGEN=request.getParameter("hi_DIAG3_ATEN_URGEN");
                String hi_CODDIAG4_ATEN_URGEN=request.getParameter("hi_CODDIAG4_ATEN_URGEN");
                String hi_DIAG4_ATEN_URGEN=request.getParameter("hi_DIAG4_ATEN_URGEN");

                
                String hi_CODDIAGPPAL5_ATEN_URGEN=request.getParameter("hi_CODDIAGPPAL5_ATEN_URGEN");
                String hi_DIAGPPAL5_ATEN_URGEN=request.getParameter("hi_DIAGPPAL5_ATEN_URGEN");
                String hi_CODDIAG6_ATEN_URGEN=request.getParameter("hi_CODDIAG6_ATEN_URGEN");
                String hi_DIAG6_ATEN_URGEN=request.getParameter("hi_DIAG6_ATEN_URGEN");
                String hi_CODDIAG7_ATEN_URGEN=request.getParameter("hi_CODDIAG7_ATEN_URGEN");
                String hi_DIAG7_ATEN_URGEN=request.getParameter("hi_DIAG7_ATEN_URGEN");
                String hi_CODDIAG8_ATEN_URGEN=request.getParameter("hi_CODDIAG8_ATEN_URGEN");
                String hi_DIAG8_ATEN_URGEN=request.getParameter("hi_DIAG8_ATEN_URGEN");                
                
                String sql="";  
                ResultSet rs;
                Statement s= conex.createStatement();
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////
                
                ///////////////////////OPCION GUARDAR/////////////////////////////////////////////////////////////////
                
                if(opcion.equals("guardar")){
                    sql="SELECT COUNT(*) AS total FROM salud_atencion_urgencia";
                    rs=s.executeQuery(sql);
                    int total=0,v=0;
                    if(rs.next()){
                        total=rs.getInt("total");
                    }
                    rs=null;
                    v=total+1;
                    sql="INSERT INTO salud_atencion_urgencia VALUES("
                            + " null,'"+ hi_FECHA_ATEN_URGEN +"','"+ hi_MEDIOS_PROPIOS_ATEN_URGEN +"','"+ hi_CUAL_ATEN_URGEN +"','"+ hi_ESTADO_PACIENTE_ATEN_URGEN +"',"
                            + "'"+ hi_NOMBRE_ACOMP_ACTUAL_ATEN_URGEN +"','"+ hi_DIRECCION_ACOMP_ACTUAL_ATEN_URGEN +"','"+ hi_MUNICIPIO_ACOMP_ACTUAL_ATEN_URGEN +"','"+ hi_DEPARTAMENTO_ACOMP_ACTUAL_ATEN_URGEN +"','"+ hi_TELEFONO_ACOMP_ACTUAL_ATEN_URGEN +"',"
                            + "'"+ hi_FECHA_EN_CASO_ATEN_URGEN +"','"+ hi_HORA_EN_CASO_ATEN_URGEN +"','"+ hi_SITIO_EN_CASO_ATEN_URGEN +"','"+ hi_CAUSA_EN_CASO_ATEN_URGEN +"','"+ hi_NOT_POL_ATEN_URGEN +"',"
                            + "'"+ hi_FECHA_NOT_POL_ATEN_URGEN +"','"+ hi_HORA_NOT_POL_ATEN_URGEN +"','"+ hi_NOT_FAM_ATEN_URGEN +"','"+ hi_FECHA_NOT_FAM_ATEN_URGEN +"','"+ hi_HORA_NOT_FAM_ATEN_URGEN +"',"
                            + "'"+ hi_NOT_SER_ATEN_URGEN +"','"+ hi_FECHA_NOT_SER_ATEN_URGEN +"','"+ hi_HORA_NOT_SER_ATEN_URGEN +"',"
                            + "'"+ hi_FECHA_SALIDA_ATEN_URGEN +"','"+ hi_HORA_SALIDA_ATEN_URGEN +"','"+ hi_CONDICION_SALIDA_ATEN_URGEN +"','"+ hi_CONDICION_REMI_SALIDA_ATEN_URGEN +"','"+ hi_OTRO_SALIDA_ATEN_URGEN +"',"
                            + "'"+ hi_SERVICIO_SALIDA_ATEN_URGEN +"','"+ hi_NOMBRE_SALIDA +"','"+ hi_CIUDAD_SALIDA +"','"+ hi_N_HISTORIA +"','"+ hi_estado +"',"
                            + "'"+ id_paciente +"','"+ ident_paciente +"','"+ hi_HORA_ATEN_URGEN +"','"+ hi_entidad_ATEN_URGEN +"',"
                            + " '"+hi_MOTIVO_CONSULTA_ATEN_URGEN+"','"+hi_ESTADO_GENERAL_ATEN_URGEN+"','"+hi_ENFERMEDAD_ACTUAL_ATEN_URGEN+"','"+hi_ANTECEDENTES_ATEN_URGEN+"','"+hi_REVISION_SISTEMAS_ATEN_URGEN+"', "
                            + " '"+hi_TA_ATEN_URGEN+"','"+hi_FC_ATEN_URGEN+"','"+hi_FR_ATEN_URGEN+"','"+hi_TEMP_ATEN_URGEN+"','"+hi_TALLA_ATEN_URGEN+"', "
                            + " '"+hi_SAT02_ATEN_URGEN+"','"+hi_DESCRIPCION_EXAMEN_FISICO_ATEN_URGEN+"','"+hi_CONDUCTA_ATEN_URGEN+"','"+hi_PLAN_MANEJO_ATEN_URGEN+"', "
                            + " '"+hi_DX_PRESUNTIVOS_ATEN_URGEN+"','"+hi_CONDICIONES_GENERAL_ATEN_URGEN+"','"+hi_PLAN_AMBULATORIO_ATEN_URGEN+"', " 
                            
                            + " '"+hi_CODDIAGPPAL_ATEN_URGEN+"','"+hi_DIAGPPAL_ATEN_URGEN+"','"+hi_CODDIAG2_ATEN_URGEN+"','"+hi_DIAG2_ATEN_URGEN+"', "
                            + " '"+hi_CODDIAG3_ATEN_URGEN+"','"+hi_DIAG3_ATEN_URGEN+"','"+hi_CODDIAG4_ATEN_URGEN+"','"+hi_DIAG4_ATEN_URGEN+"', "                            
                            
                            + " '"+hi_CODDIAGPPAL5_ATEN_URGEN+"','"+hi_DIAGPPAL5_ATEN_URGEN+"','"+hi_CODDIAG6_ATEN_URGEN+"','"+hi_DIAG6_ATEN_URGEN+"', "
                            + " '"+hi_CODDIAG7_ATEN_URGEN+"','"+hi_DIAG7_ATEN_URGEN+"','"+hi_CODDIAG8_ATEN_URGEN+"','"+hi_DIAG8_ATEN_URGEN+"' "                            
                            + ")";
                    s.executeUpdate(sql);
                    out.println("1");
                }
                if(opcion.equals("modificar")){
                    sql="UPDATE salud_atencion_urgencia SET "
                            + " hi_FECHA_ATEN_URGEN='"+ hi_FECHA_ATEN_URGEN +"',hi_MEDIOS_PROPIOS_ATEN_URGEN='"+ hi_MEDIOS_PROPIOS_ATEN_URGEN +"',hi_CUAL_ATEN_URGEN='"+ hi_CUAL_ATEN_URGEN +"',hi_ESTADO_PACIENTE_ATEN_URGEN='"+ hi_ESTADO_PACIENTE_ATEN_URGEN +"',"
                            + " hi_NOMBRE_ACOMP_ACTUAL_ATEN_URGEN='"+ hi_NOMBRE_ACOMP_ACTUAL_ATEN_URGEN +"',hi_DIRECCION_ACOMP_ACTUAL_ATEN_URGEN='"+ hi_DIRECCION_ACOMP_ACTUAL_ATEN_URGEN +"',hi_MUNICIPIO_ACOMP_ACTUAL_ATEN_URGEN='"+ hi_MUNICIPIO_ACOMP_ACTUAL_ATEN_URGEN +"',hi_DEPARTAMENTO_ACOMP_ACTUAL_ATEN_URGEN='"+ hi_DEPARTAMENTO_ACOMP_ACTUAL_ATEN_URGEN +"',hi_TELEFONO_ACOMP_ACTUAL_ATEN_URGEN='"+ hi_TELEFONO_ACOMP_ACTUAL_ATEN_URGEN +"',"
                            + " hi_FECHA_EN_CASO_ATEN_URGEN='"+ hi_FECHA_EN_CASO_ATEN_URGEN +"',hi_HORA_EN_CASO_ATEN_URGEN='"+ hi_HORA_EN_CASO_ATEN_URGEN +"',hi_SITIO_EN_CASO_ATEN_URGEN='"+ hi_SITIO_EN_CASO_ATEN_URGEN +"',hi_CAUSA_EN_CASO_ATEN_URGEN='"+ hi_CAUSA_EN_CASO_ATEN_URGEN +"',hi_NOT_POL_ATEN_URGEN='"+ hi_NOT_POL_ATEN_URGEN +"',"
                            + " hi_FECHA_NOT_POL_ATEN_URGEN='"+ hi_FECHA_NOT_POL_ATEN_URGEN +"',hi_HORA_NOT_POL_ATEN_URGEN='"+ hi_HORA_NOT_POL_ATEN_URGEN +"',hi_NOT_FAM_ATEN_URGEN='"+ hi_NOT_FAM_ATEN_URGEN +"',hi_FECHA_NOT_FAM_ATEN_URGEN='"+ hi_FECHA_NOT_FAM_ATEN_URGEN +"',hi_HORA_NOT_FAM_ATEN_URGEN='"+ hi_HORA_NOT_FAM_ATEN_URGEN +"',"
                            + " hi_NOT_SER_ATEN_URGEN='"+ hi_NOT_SER_ATEN_URGEN +"',hi_FECHA_NOT_SER_ATEN_URGEN='"+ hi_FECHA_NOT_SER_ATEN_URGEN +"',hi_HORA_NOT_SER_ATEN_URGEN='"+ hi_HORA_NOT_SER_ATEN_URGEN +"',"
                            + " hi_FECHA_SALIDA_ATEN_URGEN='"+ hi_FECHA_SALIDA_ATEN_URGEN +"',hi_HORA_SALIDA_ATEN_URGEN='"+ hi_HORA_SALIDA_ATEN_URGEN +"',hi_CONDICION_SALIDA_ATEN_URGEN='"+ hi_CONDICION_SALIDA_ATEN_URGEN +"',hi_CONDICION_REMI_SALIDA_ATEN_URGEN='"+ hi_CONDICION_REMI_SALIDA_ATEN_URGEN +"',hi_OTRO_SALIDA_ATEN_URGEN='"+ hi_OTRO_SALIDA_ATEN_URGEN +"',"
                            + " hi_SERVICIO_SALIDA_ATEN_URGEN='"+ hi_SERVICIO_SALIDA_ATEN_URGEN +"',hi_NOMBRE_SALIDA='"+ hi_NOMBRE_SALIDA +"',hi_CIUDAD_SALIDA='"+ hi_CIUDAD_SALIDA +"',hi_N_HISTORIA='"+ hi_N_HISTORIA +"',hi_estado='"+ hi_estado +"',"
                            + " hi_HORA_ATEN_URGEN='"+ hi_HORA_ATEN_URGEN +"',hi_entidad_ATEN_URGEN='"+ hi_entidad_ATEN_URGEN +"', "

                            + " hi_MOTIVO_CONSULTA_ATEN_URGEN='"+hi_MOTIVO_CONSULTA_ATEN_URGEN+"',hi_ESTADO_GENERAL_ATEN_URGEN='"+hi_ESTADO_GENERAL_ATEN_URGEN+"',hi_ENFERMEDAD_ACTUAL_ATEN_URGEN='"+hi_ENFERMEDAD_ACTUAL_ATEN_URGEN+"',hi_ANTECEDENTES_ATEN_URGEN='"+hi_ANTECEDENTES_ATEN_URGEN+"',hi_REVISION_SISTEMAS_ATEN_URGEN='"+hi_REVISION_SISTEMAS_ATEN_URGEN+"', "
                            + " hi_TA_ATEN_URGEN='"+hi_TA_ATEN_URGEN+"',hi_FC_ATEN_URGEN='"+hi_FC_ATEN_URGEN+"',hi_FR_ATEN_URGEN='"+hi_FR_ATEN_URGEN+"',hi_TEMP_ATEN_URGEN='"+hi_TEMP_ATEN_URGEN+"',hi_TALLA_ATEN_URGEN='"+hi_TALLA_ATEN_URGEN+"', "
                            + " hi_SAT02_ATEN_URGEN='"+hi_SAT02_ATEN_URGEN+"',hi_DESCRIPCION_EXAMEN_FISICO_ATEN_URGEN='"+hi_DESCRIPCION_EXAMEN_FISICO_ATEN_URGEN+"',hi_CONDUCTA_ATEN_URGEN='"+hi_CONDUCTA_ATEN_URGEN+"',hi_PLAN_MANEJO_ATEN_URGEN='"+hi_PLAN_MANEJO_ATEN_URGEN+"', "
                            + " hi_DX_PRESUNTIVOS_ATEN_URGEN='"+hi_DX_PRESUNTIVOS_ATEN_URGEN+"',hi_CONDICIONES_GENERAL_ATEN_URGEN='"+hi_CONDICIONES_GENERAL_ATEN_URGEN+"',hi_PLAN_AMBULATORIO_ATEN_URGEN='"+hi_PLAN_AMBULATORIO_ATEN_URGEN+"', " 

                            + " hi_CODDIAGPPAL_ATEN_URGEN='"+hi_CODDIAGPPAL_ATEN_URGEN+"',hi_DIAGPPAL_ATEN_URGEN='"+hi_DIAGPPAL_ATEN_URGEN+"',hi_CODDIAG2_ATEN_URGEN='"+hi_CODDIAG2_ATEN_URGEN+"',hi_DIAG2_ATEN_URGEN='"+hi_DIAG2_ATEN_URGEN+"', "
                            + " hi_CODDIAG3_ATEN_URGEN='"+hi_CODDIAG3_ATEN_URGEN+"',hi_DIAG3_ATEN_URGEN='"+hi_DIAG3_ATEN_URGEN+"',hi_CODDIAG4_ATEN_URGEN='"+hi_CODDIAG4_ATEN_URGEN+"',hi_DIAG4_ATEN_URGEN='"+hi_DIAG4_ATEN_URGEN+"', " 

                            + " hi_CODDIAGPPAL5_ATEN_URGEN='"+hi_CODDIAGPPAL5_ATEN_URGEN+"',hi_DIAGPPAL5_ATEN_URGEN='"+hi_DIAGPPAL5_ATEN_URGEN+"',hi_CODDIAG6_ATEN_URGEN='"+hi_CODDIAG6_ATEN_URGEN+"',hi_DIAG6_ATEN_URGEN='"+hi_DIAG6_ATEN_URGEN+"', "
                            + " hi_CODDIAG7_ATEN_URGEN='"+hi_CODDIAG7_ATEN_URGEN+"',hi_DIAG7_ATEN_URGEN='"+hi_DIAG7_ATEN_URGEN+"',hi_CODDIAG8_ATEN_URGEN='"+hi_CODDIAG8_ATEN_URGEN+"',hi_DIAG8_ATEN_URGEN='"+hi_DIAG8_ATEN_URGEN+"' "                                                        
                            
                            + " WHERE ident_paciente='"+ ident_paciente +"' AND id_paciente='"+ id_paciente +"' AND hi_ID_ATEN_URGEN='"+ hi_ID_ATEN_URGEN +"'";
                    s.executeUpdate(sql);
                    out.println("1");
                    
                }
                if(opcion.equals("eliminar")){
                    sql="UPDATE salud_atencion_urgencia SET "
                            + " hi_estado='"+ hi_estado +"' "
                            + " WHERE ident_paciente='"+ ident_paciente +"' AND id_paciente='"+ id_paciente +"' AND hi_ID_ATEN_URGEN='"+ hi_ID_ATEN_URGEN +"'";
                    s.executeUpdate(sql);
                    out.println("1");                    
                }
                /////////////////////////////////////////////////////////////////////////////////////////////////////
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
