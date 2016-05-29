using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace TQS_Project
{
    public partial class demo_test_post : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string cb = Request.Params["callback"];

            Response.Clear();
            //Response.ContentType = "application/json";
            String Nome, Email, Telefone, Comentarios;
            Nome = Request.Form["Nome"];
            Email = Request.Form["Email"];
            Telefone = Request.Form["Telefone"];
            Comentarios = Request.Form["Comentarios"];
            String retVal = "<p>Caro " + Nome + ",<br> muito obrigado pelo seu contacto.<br>";
            retVal += "O seu pedido foi efetuado com sucessso. Receberá em breve uma mensagem de correio electrónico no seu endereço [" + Email + "]. Entraremos também em contacto consigo pelo telefone [" + Telefone + "].</p><p>&#10084; - imoQQCoisa</p>";
            if (!String.IsNullOrEmpty(cb)) //--- jsonp call
                retVal = cb + "(" + retVal + ")";
            Response.Write(retVal);
            Response.End();
        }
    }
}