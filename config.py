from app import assets, app
import flask_login
from flask_assets import Bundle

css = Bundle("css/style.css", "css/animate.css" )
assets.register("all_css", css)

frameworks_css = Bundle("frameworks/bxslider/src/css/jquery.bxslider.css",
        "fonts/icomoon/style.css")
assets.register("frameworks_css", frameworks_css) 

frameworks_js = Bundle("frameworks/jquery-3.3.1.min.js", "frameworks/bxslider/src/js/jquery.bxslider.js", "frameworks/bxslider/src/js/initScript.js") 
assets.register("frameworks_js", frameworks_js) 


my_js= Bundle("scripts/bxslider.js", "scripts/scripts.js", "scripts/googlemap.js") 
assets.register("my_js", my_js) 


class Conf():

    app.secret_key = "VTJACGXkknV/eH3/00qOAF81wWeA11f3Y0SFbBrKCgjLX/rgH6G9Xjub09NVFxBfoOo="

    app.config['MYSQL_DATABASE_USER'] = 'asaelectronia'
    app.config['MYSQL_DATABASE_PASSWORD'] = 'thr0ugh_4tr4v'
    app.config['MYSQL_DATABASE_DB'] = 'ASA'
    app.config['MYSQL_DATABASE_HOST'] = 'localhost'

