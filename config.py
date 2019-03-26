from app import assets, app
from flask_assets import Bundle

css = Bundle("css/style.css" )
assets.register("all_css", css)

frameworks_css = Bundle("frameworks/bxslider/src/css/jquery.bxslider.css",
        "fonts/icomoon/style.css")
assets.register("frameworks_css", frameworks_css) 

frameworks_js = Bundle("frameworks/jquery-3.3.1.min.js", "frameworks/bxslider/src/js/jquery.bxslider.js", "frameworks/bxslider/src/js/initScript.js") 
assets.register("frameworks_js", frameworks_js) 


my_js= Bundle("scripts/bxslider.js", "scripts/menu.js", "scripts/googlemap.js") 
assets.register("my_js", my_js) 



class ConfDb():
    app.config['MYSQL_DATABASE_USER'] = 'arquemis'
    app.config['MYSQL_DATABASE_PASSWORD'] = ''
    app.config['MYSQL_DATABASE_DB'] = 'ASA'
    app.config['MYSQL_DATABASE_HOST'] = 'localhost'
