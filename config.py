from app import assets, app
import flask_login
from flask_assets import Bundle

#"static/fonts/icomoon/style.css"
#mainPagCssFrstRend= Bundle(,filters="cssmin", output="mainPageCss_min.css")
#assets.register("mainPagCssFrstRend", mainPagCssFrstRend)

#mainPageJsFirstRend= Bundle(, output="mainPagejs_min.js") 
#assets.register("mainPageJsFirstRend", mainPageJsFirstRend) 

#mainPagCssSecRend= Bundle(,filters="cssmin", output="mainPageCss_min.css")
#assets.register("mainPagCssSecRend", mainPagCssSecRend)

#mainPageJsSecRend= Bundle(, output="mainPagejs_min.js") 
#assets.register("mainPageJsSecRend", mainPageJsSecRend) 

mainPagJsLastRend= Bundle("scripts/mainPageScripts.js","frameworks/bxslider/src/js/jquery.bxslider.js", "frameworks/bxslider/src/js/initScript.js", "scripts/bxslider.js", output="mainPagJsLastRend_min.js") 
assets.register("mainPagJsLastRend", mainPagJsLastRend)

mainPagCssLastRend= Bundle("css/mainPageCss.css", "css/animate.css", "frameworks/bxslider/src/css/jquery.bxslider.css",  filters="cssmin", output="mainPagCssLastRend_min.css")
assets.register("mainPagCssLastRend", mainPagCssLastRend)

loginPage= Bundle("css/loginPage.css", filters="cssmin", output="loginPage_min.css")
assets.register("loginPage", loginPage)

adminPageCss= Bundle("css/adminPageCss.css", filters="cssmin", output="adminPageCss_min.css")
assets.register("adminPageCss", adminPageCss)

adminPageJs= Bundle("scripts/adminPageJs.js", filters="jsmin", output="adminPageJs_min.js")
assets.register("adminPageJs", adminPageJs)


class Conf():

    app.secret_key = "VTJACGXkknV/eH3/00qOAF81wWeA11f3Y0SFbBrKCgjLX/rgH6G9Xjub09NVFxBfoOo="
    try: 
        app.config['MYSQL_DATABASE_USER'] = 'asaelectronia'
        app.config['MYSQL_DATABASE_PASSWORD'] = 'thr0ugh_4tr4v'
        app.config['MYSQL_DATABASE_DB'] = 'ASA'
        app.config['MYSQL_DATABASE_HOST'] = 'localhost'
    except:
        print('error')

