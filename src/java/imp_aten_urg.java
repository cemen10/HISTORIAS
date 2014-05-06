import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.*;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpSession;
import net.sf.jasperreports.engine.JRResultSetDataSource;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.view.JasperViewer;
import java.text.*;
import java.util.Date;
import net.sf.jasperreports.engine.JasperExportManager;
import com.lowagie.text.pdf.PdfCopyFields;
import com.lowagie.text.pdf.PdfReader;


public class imp_aten_urg extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        
        Conexion conect= new Conexion();
        Connection conex=conect.getConnection();
        HttpSession session= request.getSession(true);
        HttpSession sa= request.getSession(true);
        String usuario= (String) session.getAttribute("USUARIO");
        
        String hi_ID_ATEN_URGEN="";
        String hi_FECHA_ATEN_URGEN="";
        String hi_MEDIOS_PROPIOS_ATEN_URGEN="";
        String hi_CUAL_ATEN_URGEN="";
        String hi_ESTADO_PACIENTE_ATEN_URGEN="";
        String hi_NOMBRE_ACOMP_ACTUAL_ATEN_URGEN="";
        String hi_DIRECCION_ACOMP_ACTUAL_ATEN_URGEN="";
        String hi_MUNICIPIO_ACOMP_ACTUAL_ATEN_URGEN="";
        String hi_DEPARTAMENTO_ACOMP_ACTUAL_ATEN_URGEN="";
        String hi_TELEFONO_ACOMP_ACTUAL_ATEN_URGEN="";
        String hi_FECHA_EN_CASO_ATEN_URGEN="";
        String hi_HORA_EN_CASO_ATEN_URGEN="";
        String hi_SITIO_EN_CASO_ATEN_URGEN="";
        String hi_CAUSA_EN_CASO_ATEN_URGEN="";
        String hi_NOT_POL_ATEN_URGEN="";
        String hi_FECHA_NOT_POL_ATEN_URGEN="";
        String hi_HORA_NOT_POL_ATEN_URGEN="";
        String hi_NOT_FAM_ATEN_URGEN="";
        String hi_FECHA_NOT_FAM_ATEN_URGEN="";
        String hi_HORA_NOT_FAM_ATEN_URGEN="";
        String hi_NOT_SER_ATEN_URGEN="";
        String hi_FECHA_NOT_SER_ATEN_URGEN="";
        String hi_HORA_NOT_SER_ATEN_URGEN="";
        String hi_FECHA_SALIDA_ATEN_URGEN="";
        String hi_HORA_SALIDA_ATEN_URGEN="";
        String hi_CONDICION_SALIDA_ATEN_URGEN="";
        String hi_CONDICION_REMI_SALIDA_ATEN_URGEN="";
        String hi_OTRO_SALIDA_ATEN_URGEN="";
        String hi_SERVICIO_SALIDA_ATEN_URGEN="";
        String hi_NOMBRE_SALIDA="";
        String hi_CIUDAD_SALIDA="";
        String hi_N_HISTORIA="";
        String hi_estado="";
        String id_paciente="";
        String ident_paciente="";
        String hi_HORA_ATEN_URGEN="";
        String hi_entidad_ATEN_URGEN="";
        String hi_MOTIVO_CONSULTA_ATEN_URGEN="";
        String hi_ESTADO_GENERAL_ATEN_URGEN="";
        String hi_ENFERMEDAD_ACTUAL_ATEN_URGEN="";
        String hi_ANTECEDENTES_ATEN_URGEN="";
        String hi_REVISION_SISTEMAS_ATEN_URGEN="";
        String hi_TA_ATEN_URGEN="";
        String hi_FC_ATEN_URGEN="";
        String hi_FR_ATEN_URGEN="";
        String hi_TEMP_ATEN_URGEN="";
        String hi_TALLA_ATEN_URGEN="";
        String hi_SAT02_ATEN_URGEN="";
        String hi_DESCRIPCION_EXAMEN_FISICO_ATEN_URGEN="";
        String hi_CONDUCTA_ATEN_URGEN="";
        String hi_PLAN_MANEJO_ATEN_URGEN="";
        String hi_DX_PRESUNTIVOS_ATEN_URGEN="";
        String hi_CONDICIONES_GENERAL_ATEN_URGEN="";
        String hi_PLAN_AMBULATORIO_ATEN_URGEN="";
        String hi_CODDIAGPPAL_ATEN_URGEN="";
        String hi_DIAGPPAL_ATEN_URGEN="";
        String hi_CODDIAG2_ATEN_URGEN="";
        String hi_DIAG2_ATEN_URGEN="";
        String hi_CODDIAG3_ATEN_URGEN="";
        String hi_DIAG3_ATEN_URGEN="";
        String hi_CODDIAG4_ATEN_URGEN="";
        String hi_DIAG4_ATEN_URGEN="";
        
        String logo="";
        InputStream is=null;
        FileOutputStream fos=null;
        File image=null;
        
        String informe="";
        String RutaReporte="",RutaReporte1="",RutaReporte2="";
        String consulta="";
        


        try {
            Map parametros= new HashMap();
            Map parametros1= new HashMap();
            parametros.clear();
            parametros1.clear();
            
            hi_ID_ATEN_URGEN=request.getParameter("hi_ID_ATEN_URGEN");
            id_paciente=request.getParameter("id_paciente");
            ident_paciente=request.getParameter("ident_paciente");
            
            
            
            Statement s=conex.createStatement();
            ResultSet rs;            
            
            consulta="SELECT * FROM imagenes ";
            rs=s.executeQuery(consulta);
            while(rs.next()){
                is=rs.getBlob("imagen").getBinaryStream();
            }        
            
            consulta="SELECT "
                + "pacientes.histor_paciente,"
                + "pacientes.ident_paciente,"
                + "pacientes.nomb_paciente,"
                + "pacientes.segnomb_paciente,"
                + "pacientes.priapell_paciente,"
                + "pacientes.segapell_paciente,"
                + "pacientes.fnac_paciente,"
                + "pacientes.sexo_paciente,"
                + "pacientes.telres_paciente,"
                + "pacientes.dirafi_paciente,"
                + "pacientes.etnia_paciente,"
                + "pacientes.mun_paciente,"
                + "pacientes.resp_paciente,"
                + "pacientes.carnet_paciente,"
                + "mun.opcion, "
                + "YEAR(CURDATE())-YEAR(pacientes.fnac_paciente) +  IF(DATE_FORMAT(CURDATE(),'%m-%d')>DATE_FORMAT(pacientes.fnac_paciente,'%m-%d'),0,-1) AS edad_actual, "
                + "pacientes.tipid_paciente, "
                + "pacientes.id_paciente, "
                    

                + "YEAR(CURDATE()) - YEAR(pacientes.`fnac_paciente`) - IF( "
                  + "MONTH(CURDATE()) < MONTH(pacientes.`fnac_paciente`), "
                  + "1, "
                  + "IF ( "
                    + "MONTH(CURDATE()) = MONTH(pacientes.`fnac_paciente`), "
                    + "IF ( "
                      + "DAY(CURDATE()) < DAY(pacientes.`fnac_paciente`), "
                      + "1, "
                      + "0 "
                    + "), "
                    + "0 "
                  + ") "
                + ") AS anios, "
                + "MONTH(CURDATE()) - MONTH(pacientes.`fnac_paciente`) + 12 * IF( "
                  + "MONTH(CURDATE()) < MONTH(pacientes.`fnac_paciente`), "
                  + "1, "
                  + "IF( "
                    + "MONTH(CURDATE()) = MONTH(pacientes.`fnac_paciente`), "
                    + "IF ( "
                      + "DAY(CURDATE()) < DAY(pacientes.`fnac_paciente`), "
                      + "1, "
                      + "0 "
                    + "), "
                    + "0 "
                  + ") "
                + ") - IF( "
                  + "MONTH(CURDATE()) <> MONTH(pacientes.`fnac_paciente`), "
                  + "( "
                    + "DAY(CURDATE()) < DAY(pacientes.`fnac_paciente`) "
                  + "), "
                  + "IF ( "
                    + "DAY(CURDATE()) < DAY(pacientes.`fnac_paciente`), "
                    + "1, "
                    + "0 "
                  + ") "
                + ") AS meses, "
                + "( "
                  + "DAY(CURDATE()) - DAY(pacientes.`fnac_paciente`) + 30 * ( "
                    + "DAY(CURDATE()) < DAY(pacientes.`fnac_paciente`) "
                  + ") "
                + ") AS dias  "
                   
                + "FROM pacientes INNER JOIN mun "
                + "ON pacientes.mun_paciente=mun.id "                                                            
                + "WHERE pacientes.ident_paciente = '" + ident_paciente + "' ";  
//            out.println(consulta);
            String sexo1="";
            String sexo2="";
            String nombre="";
            String indi="",rom="",raizal="",pale="",negro="",ningu="";
            String tipoid="";
            rs=s.executeQuery(consulta);
            String espacio=" ";
            while(rs.next()){
                parametros.put("histor_paciente", rs.getString("histor_paciente"));
                parametros.put("ident_paciente", rs.getString("ident_paciente"));
                nombre=rs.getString("priapell_paciente")+"      "+rs.getString("segapell_paciente")+"       "+rs.getString("nomb_paciente")+"       "+rs.getString("segnomb_paciente");
                parametros.put("nombre",nombre );
                parametros.put("fnac_paciente", rs.getString("fnac_paciente"));
                if(rs.getString("sexo_paciente").equals("M")){sexo1="X";sexo2="";}else{sexo1="";sexo2="X";}
                if(rs.getString("etnia_paciente").equals("1")){indi="X";rom="";raizal="";pale="";negro="";ningu="";}
                if(rs.getString("etnia_paciente").equals("2")){indi="";rom="X";raizal="";pale="";negro="";ningu="";}
                if(rs.getString("etnia_paciente").equals("3")){indi="";rom="";raizal="X";pale="";negro="";ningu="";}
                if(rs.getString("etnia_paciente").equals("4")){indi="";rom="";raizal="";pale="X";negro="";ningu="";}
                if(rs.getString("etnia_paciente").equals("5")){indi="";rom="";raizal="";pale="";negro="X";ningu="";}
                if(rs.getString("etnia_paciente").equals("6")){indi="";rom="";raizal="";pale="";negro="";ningu="X";}
                parametros.put("sexo1", sexo1);
                parametros.put("sexo2", sexo2);
                parametros.put("anios", rs.getString("anios"));
                parametros.put("meses", rs.getString("meses"));
                parametros.put("dias",  rs.getString("dias"));
            
                parametros.put("telres_paciente", rs.getString("telres_paciente"));
                parametros.put("dirafi_paciente", rs.getString("dirafi_paciente"));
                
                parametros.put("indi", indi);
                parametros.put("rom", rom);
                parametros.put("raizal", raizal);
                parametros.put("pale", pale);
                parametros.put("negro", negro);
                parametros.put("ningu", ningu);
                
                parametros.put("municipio", rs.getString("mun.opcion"));
                parametros.put("resp_paciente", rs.getString("resp_paciente"));
                parametros.put("carnet_paciente", rs.getString("carnet_paciente"));
                parametros.put("edad", rs.getString("edad_actual"));
                
                parametros.put("tipid_paciente", rs.getString("tipid_paciente"));
                if(rs.getString("tipid_paciente").equals("RC")){tipoid="REGISTRO CIVIL";}
                if(rs.getString("tipid_paciente").equals("TI")){tipoid="TARGETA DE IDENTIDAD";}
                if(rs.getString("tipid_paciente").equals("CE")){tipoid="CEDULA DE EXTRANJERIA";}
                if(rs.getString("tipid_paciente").equals("CC")){tipoid="CEDULA DE CIUDADANIA";}
                if(rs.getString("tipid_paciente").equals("PA")){tipoid="PASAPORTE";}
                if(rs.getString("tipid_paciente").equals("MS")){tipoid="MENOR SIN IDENTIFICACION";}
                if(rs.getString("tipid_paciente").equals("AS")){tipoid="ADULTO SIN IDENTIFICACION";}
                if(rs.getString("tipid_paciente").equals("NV")){tipoid="CERTIFICADO NACIDO VIVO";}
                
                parametros.put("tipoid", tipoid);

            }
            consulta="SELECT "
                + " * FROM salud_atencion_urgencia "
                + "WHERE ident_paciente LIKE '" + ident_paciente + "%' AND hi_ID_ATEN_URGEN='"+ hi_ID_ATEN_URGEN +"' AND id_paciente='"+id_paciente+"' AND hi_estado='ACTIVO'";                                                                    
            rs=s.executeQuery(consulta);
            String csm="",csv="";
            String crdom="",crcon="",crhos="",crrem="",crotr="";
            while(rs.next()){
                parametros.put("hi_ID_ATEN_URGEN",rs.getString("hi_ID_ATEN_URGEN"));
                parametros.put("hi_FECHA_ATEN_URGEN",rs.getString("hi_FECHA_ATEN_URGEN"));
                parametros.put("hi_MEDIOS_PROPIOS_ATEN_URGEN",rs.getString("hi_MEDIOS_PROPIOS_ATEN_URGEN"));
                parametros.put("hi_CUAL_ATEN_URGEN",rs.getString("hi_CUAL_ATEN_URGEN"));
                parametros.put("hi_ESTADO_PACIENTE_ATEN_URGEN",rs.getString("hi_ESTADO_PACIENTE_ATEN_URGEN"));
                parametros.put("hi_NOMBRE_ACOMP_ACTUAL_ATEN_URGEN",rs.getString("hi_NOMBRE_ACOMP_ACTUAL_ATEN_URGEN"));
                parametros.put("hi_DIRECCION_ACOMP_ACTUAL_ATEN_URGEN",rs.getString("hi_DIRECCION_ACOMP_ACTUAL_ATEN_URGEN"));
                parametros.put("hi_MUNICIPIO_ACOMP_ACTUAL_ATEN_URGEN",rs.getString("hi_MUNICIPIO_ACOMP_ACTUAL_ATEN_URGEN"));
                parametros.put("hi_DEPARTAMENTO_ACOMP_ACTUAL_ATEN_URGEN",rs.getString("hi_DEPARTAMENTO_ACOMP_ACTUAL_ATEN_URGEN"));
                parametros.put("hi_TELEFONO_ACOMP_ACTUAL_ATEN_URGEN",rs.getString("hi_TELEFONO_ACOMP_ACTUAL_ATEN_URGEN"));
                parametros.put("hi_FECHA_EN_CASO_ATEN_URGEN",rs.getString("hi_FECHA_EN_CASO_ATEN_URGEN"));
                parametros.put("hi_HORA_EN_CASO_ATEN_URGEN",rs.getString("hi_HORA_EN_CASO_ATEN_URGEN"));
                parametros.put("hi_SITIO_EN_CASO_ATEN_URGEN",rs.getString("hi_SITIO_EN_CASO_ATEN_URGEN"));
                parametros.put("hi_CAUSA_EN_CASO_ATEN_URGEN",rs.getString("hi_CAUSA_EN_CASO_ATEN_URGEN"));
                parametros.put("hi_NOT_POL_ATEN_URGEN",rs.getString("hi_NOT_POL_ATEN_URGEN"));
                parametros.put("hi_FECHA_NOT_POL_ATEN_URGEN",rs.getString("hi_FECHA_NOT_POL_ATEN_URGEN"));
                parametros.put("hi_HORA_NOT_POL_ATEN_URGEN",rs.getString("hi_HORA_NOT_POL_ATEN_URGEN"));
                parametros.put("hi_NOT_FAM_ATEN_URGEN",rs.getString("hi_NOT_FAM_ATEN_URGEN"));
                parametros.put("hi_FECHA_NOT_FAM_ATEN_URGEN",rs.getString("hi_FECHA_NOT_FAM_ATEN_URGEN"));
                parametros.put("hi_HORA_NOT_FAM_ATEN_URGEN",rs.getString("hi_HORA_NOT_FAM_ATEN_URGEN"));
                parametros.put("hi_NOT_SER_ATEN_URGEN",rs.getString("hi_NOT_SER_ATEN_URGEN"));
                parametros.put("hi_FECHA_NOT_SER_ATEN_URGEN",rs.getString("hi_FECHA_NOT_SER_ATEN_URGEN"));
                parametros.put("hi_HORA_NOT_SER_ATEN_URGEN",rs.getString("hi_HORA_NOT_SER_ATEN_URGEN"));
                parametros.put("hi_FECHA_SALIDA_ATEN_URGEN",rs.getString("hi_FECHA_SALIDA_ATEN_URGEN"));
                parametros.put("hi_HORA_SALIDA_ATEN_URGEN",rs.getString("hi_HORA_SALIDA_ATEN_URGEN"));
//                parametros.put("hi_CONDICION_SALIDA_ATEN_URGEN",rs.getString("hi_CONDICION_SALIDA_ATEN_URGEN"));
                if(rs.getString("hi_CONDICION_SALIDA_ATEN_URGEN").equals("VIVO")){csv="X";csm="";}else{csv="";csm="X";}
                parametros.put("csv", csv);
                parametros.put("csm", csm);

                parametros.put("hi_CONDICION_REMI_SALIDA_ATEN_URGEN",rs.getString("hi_CONDICION_REMI_SALIDA_ATEN_URGEN"));
                if(rs.getString("hi_CONDICION_REMI_SALIDA_ATEN_URGEN").equals("1")){crdom="X";}
                if(rs.getString("hi_CONDICION_REMI_SALIDA_ATEN_URGEN").equals("2")){crcon="X";}
                if(rs.getString("hi_CONDICION_REMI_SALIDA_ATEN_URGEN").equals("3")){crhos="X";}
                if(rs.getString("hi_CONDICION_REMI_SALIDA_ATEN_URGEN").equals("4")){crrem="X";}
                if(rs.getString("hi_CONDICION_REMI_SALIDA_ATEN_URGEN").equals("5")){crotr="X";}
                
                parametros.put("crdom", crdom);
                parametros.put("crcon", crcon);
                parametros.put("crhos", crhos);
                parametros.put("crrem", crrem);
                parametros.put("crotr", crotr);
                
                parametros.put("hi_OTRO_SALIDA_ATEN_URGEN",rs.getString("hi_OTRO_SALIDA_ATEN_URGEN"));
                parametros.put("hi_SERVICIO_SALIDA_ATEN_URGEN",rs.getString("hi_SERVICIO_SALIDA_ATEN_URGEN"));
                parametros.put("hi_NOMBRE_SALIDA",rs.getString("hi_NOMBRE_SALIDA"));
                parametros.put("hi_CIUDAD_SALIDA",rs.getString("hi_CIUDAD_SALIDA"));
                parametros.put("hi_N_HISTORIA",rs.getString("hi_N_HISTORIA"));
                parametros.put("hi_estado",rs.getString("hi_estado"));
                parametros.put("id_paciente",rs.getString("id_paciente"));
                parametros.put("ident_paciente",rs.getString("ident_paciente"));
                parametros.put("hi_HORA_ATEN_URGEN",rs.getString("hi_HORA_ATEN_URGEN"));
                parametros.put("hi_entidad_ATEN_URGEN",rs.getString("hi_entidad_ATEN_URGEN"));
                parametros.put("hi_MOTIVO_CONSULTA_ATEN_URGEN",rs.getString("hi_MOTIVO_CONSULTA_ATEN_URGEN"));
                parametros.put("hi_ESTADO_GENERAL_ATEN_URGEN",rs.getString("hi_ESTADO_GENERAL_ATEN_URGEN"));
                parametros.put("hi_ENFERMEDAD_ACTUAL_ATEN_URGEN",rs.getString("hi_ENFERMEDAD_ACTUAL_ATEN_URGEN"));
                parametros.put("hi_ANTECEDENTES_ATEN_URGEN",rs.getString("hi_ANTECEDENTES_ATEN_URGEN"));
                parametros.put("hi_REVISION_SISTEMAS_ATEN_URGEN",rs.getString("hi_REVISION_SISTEMAS_ATEN_URGEN"));
                parametros.put("hi_TA_ATEN_URGEN",rs.getString("hi_TA_ATEN_URGEN"));
                parametros.put("hi_FC_ATEN_URGEN",rs.getString("hi_FC_ATEN_URGEN"));
                parametros.put("hi_FR_ATEN_URGEN",rs.getString("hi_FR_ATEN_URGEN"));
                parametros.put("hi_TEMP_ATEN_URGEN",rs.getString("hi_TEMP_ATEN_URGEN"));
                parametros.put("hi_TALLA_ATEN_URGEN",rs.getString("hi_TALLA_ATEN_URGEN"));
                parametros.put("hi_SAT02_ATEN_URGEN",rs.getString("hi_SAT02_ATEN_URGEN"));
                parametros.put("hi_DESCRIPCION_EXAMEN_FISICO_ATEN_URGEN",rs.getString("hi_DESCRIPCION_EXAMEN_FISICO_ATEN_URGEN"));
                parametros.put("hi_CONDUCTA_ATEN_URGEN",rs.getString("hi_CONDUCTA_ATEN_URGEN"));
                parametros.put("hi_PLAN_MANEJO_ATEN_URGEN",rs.getString("hi_PLAN_MANEJO_ATEN_URGEN"));
                parametros.put("hi_DX_PRESUNTIVOS_ATEN_URGEN",rs.getString("hi_DX_PRESUNTIVOS_ATEN_URGEN"));
                parametros.put("hi_CONDICIONES_GENERAL_ATEN_URGEN",rs.getString("hi_CONDICIONES_GENERAL_ATEN_URGEN"));
                parametros.put("hi_PLAN_AMBULATORIO_ATEN_URGEN",rs.getString("hi_PLAN_AMBULATORIO_ATEN_URGEN"));
                parametros.put("hi_CODDIAGPPAL_ATEN_URGEN",rs.getString("hi_CODDIAGPPAL_ATEN_URGEN"));
                parametros.put("hi_DIAGPPAL_ATEN_URGEN",rs.getString("hi_DIAGPPAL_ATEN_URGEN"));
                parametros.put("hi_CODDIAG2_ATEN_URGEN",rs.getString("hi_CODDIAG2_ATEN_URGEN"));
                parametros.put("hi_DIAG2_ATEN_URGEN",rs.getString("hi_DIAG2_ATEN_URGEN"));
                parametros.put("hi_CODDIAG3_ATEN_URGEN",rs.getString("hi_CODDIAG3_ATEN_URGEN"));
                parametros.put("hi_DIAG3_ATEN_URGEN",rs.getString("hi_DIAG3_ATEN_URGEN"));
                parametros.put("hi_CODDIAG4_ATEN_URGEN",rs.getString("hi_CODDIAG4_ATEN_URGEN"));
                parametros.put("hi_DIAG4_ATEN_URGEN",rs.getString("hi_DIAG4_ATEN_URGEN"));     
                
                parametros.put("hi_CODDIAGPPAL5_ATEN_URGEN",rs.getString("hi_CODDIAGPPAL5_ATEN_URGEN"));
                parametros.put("hi_DIAGPPAL5_ATEN_URGEN",rs.getString("hi_DIAGPPAL5_ATEN_URGEN"));
                parametros.put("hi_CODDIAG6_ATEN_URGEN",rs.getString("hi_CODDIAG6_ATEN_URGEN"));
                parametros.put("hi_DIAG6_ATEN_URGEN",rs.getString("hi_DIAG6_ATEN_URGEN"));
                parametros.put("hi_CODDIAG7_ATEN_URGEN",rs.getString("hi_CODDIAG7_ATEN_URGEN"));
                parametros.put("hi_DIAG7_ATEN_URGEN",rs.getString("hi_DIAG7_ATEN_URGEN"));
                parametros.put("hi_CODDIAG8_ATEN_URGEN",rs.getString("hi_CODDIAG8_ATEN_URGEN"));
                parametros.put("hi_DIAG8_ATEN_URGEN",rs.getString("hi_DIAG8_ATEN_URGEN"));                  
                
            }

               
            //**************************Llenar parametros que se enviaran*********************************//            
            parametros.put("logo" , is);     
            
            //********************************************************************************************//
   
            //************************* PRIMERA PAGINA*******************************//
            rs=s.executeQuery(consulta);
            RutaReporte = request.getSession().getServletContext().getRealPath("reportes/imp_aten_urg.jrxml");
            String rutapdf = request.getSession().getServletContext().getRealPath("reportes/Atencion.pdf");
            String rutalogo= request.getSession().getServletContext().getRealPath("logo/cabeza.jpg");
            File reportFile = new File(RutaReporte);

            JasperReport repote = JasperCompileManager.compileReport(RutaReporte);
            JRResultSetDataSource ds = new JRResultSetDataSource(rs);
            JasperPrint print = JasperFillManager.fillReport(repote, parametros, ds);
            JasperExportManager.exportReportToPdfFile(print, rutapdf);
            //********************************************************************************************//
            
            //************************* SEGUNDA PAGINA*******************************//
    
            consulta="SELECT "
                + " * FROM salud_atencion_urgencia "
                + "WHERE ident_paciente LIKE '" + ident_paciente + "%' AND hi_ID_ATEN_URGEN='"+ hi_ID_ATEN_URGEN +"' AND id_paciente='"+id_paciente+"' AND hi_estado='ACTIVO'";                                                                    
            rs=s.executeQuery(consulta);
            RutaReporte1 = request.getSession().getServletContext().getRealPath("reportes/imp_aten_urg1.jrxml");
            String rutapdf1 = request.getSession().getServletContext().getRealPath("reportes/Atencion1.pdf");
            
            JasperReport repote1 = JasperCompileManager.compileReport(RutaReporte1);
            JRResultSetDataSource ds1 = new JRResultSetDataSource(rs);
            JasperPrint print1 = JasperFillManager.fillReport(repote1, parametros, ds1);
            JasperExportManager.exportReportToPdfFile(print1, rutapdf1);                        
            //********************************************************************************************//
                        
            //************************* TERCERA PAGINA*******************************//

    
            consulta="SELECT "
                + " * FROM salud_atencion_urgencia "
                + "WHERE ident_paciente LIKE '" + ident_paciente + "%' AND hi_ID_ATEN_URGEN='"+ hi_ID_ATEN_URGEN +"' AND id_paciente='"+id_paciente+"' AND hi_estado='ACTIVO'";                                                                    
            rs=s.executeQuery(consulta);
            RutaReporte2 = request.getSession().getServletContext().getRealPath("reportes/imp_aten_urg2.jrxml");
            String rutapdf2 = request.getSession().getServletContext().getRealPath("reportes/Atencion2.pdf");
            
            JasperReport repote2 = JasperCompileManager.compileReport(RutaReporte2);
            JRResultSetDataSource ds2 = new JRResultSetDataSource(rs);
            JasperPrint print2 = JasperFillManager.fillReport(repote2, parametros, ds2);
            JasperExportManager.exportReportToPdfFile(print2, rutapdf2);                
            
            //********************************************************************************************//
            
            
            String rutapdfinal = request.getSession().getServletContext().getRealPath("reportes/ATENCION_URGENCIAS.pdf");
            PdfReader reader1 = new PdfReader(rutapdf);
            PdfReader reader2 = new PdfReader(rutapdf1);
            PdfReader reader3 = new PdfReader(rutapdf2);
            PdfCopyFields copy = new PdfCopyFields(new FileOutputStream(rutapdfinal));
            copy.addDocument(reader1);
            copy.addDocument(reader2);
            copy.addDocument(reader3);
            copy.close();            
            
            conex.close();
            String caracteristicas="menubar=yes,toolbar=yes,scrollbars=yes,status=yes,directories=yes,height=700,width=1400";
            out.println(caracteristicas);   
//            out.println("<script>alert('Reporte generado..');</script>");
//            out.println("<script>window.open('reportes/ATENCION_URGENCIAS.pdf','Historias Clinicas',"+caracteristicas+");</script>");
//            out.println("<script>history.back()</script>");
        
            conex.close();
            //**************************************************************//
            
        }catch (Exception e){
                out.println("error");
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
