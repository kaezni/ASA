from app import app
from flask_assets import Environment, Bundle

bundles = {

    'all_js':Bundle( 'scripts/googlemap.js','scripts/menu.js', 'scripts/dashBoard.js',),
                

    'all_css':Bundle('css/style.css',
                     'fonts/icomoon/style.css',
                     'css/animate.css')
}

assets = Environment(app)
assets.register(bundles)

