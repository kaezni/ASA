from app import assets, app
import flask_login
from flask_assets import Bundle

mainPageCss= Bundle("css/style.css", "css/animate.css" )
assets.register("mainPageCss", mainPageCss)

frameworks_css = Bundle("frameworks/bxslider/src/css/jquery.bxslider.css",
        "fonts/icomoon/style.css")
assets.register("frameworks_css", frameworks_css) 

frameworks_js = Bundle("frameworks/jquery-3.3.1.min.js", "frameworks/bxslider/src/js/jquery.bxslider.js", "frameworks/bxslider/src/js/initScript.js") 
assets.register("frameworks_js", frameworks_js) 


mainPageScripts= Bundle("scripts/bxslider.js", "scripts/mainPageScripts.js") 
assets.register("mainPageScripts", mainPageScripts) 


class Conf():

    app.secret_key = "VTJACGXkknV/eH3/00qOAF81wWeA11f3Y0SFbBrKCgjLX/rgH6G9Xjub09NVFxBfoOo="
    try: 
        app.config['MYSQL_DATABASE_USER'] = 'asaelectronia'
        app.config['MYSQL_DATABASE_PASSWORD'] = 'thr0ugh_4tr4v'
        app.config['MYSQL_DATABASE_DB'] = 'ASA'
        app.config['MYSQL_DATABASE_HOST'] = 'localhost'
    except:
        print('error')

