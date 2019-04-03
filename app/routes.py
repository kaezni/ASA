from subprocess import call
from app import app
from app.db import Articles
from app.nameGenerator import GenerateUniqueName
from flask import render_template, flash, redirect, url_for, request
import os


@app.route('/test')
def test():
    return(render_template("test.html"))


@app.route('/')
@app.route('/index')
def index():

    art = Articles()
    arts_and_sects = art.getArticlesBySection()
    
    return render_template('index.html',  title="Pagina principal", arts_and_sects=arts_and_sects)


@app.route('/login', methods=["POST", "GET"])
def login():

    return render_template('login.html',  title='Ingreso administrativo')



@app.route('/admin', methods=["POST", "GET"])
def admin():

    art = Articles()

    if request.method == "POST":
        artic_img = request.files['artic_img']
        gen_name = GenerateUniqueName() 

        image_name = gen_name.generateAndValidate()
        artic_name= request.form['artic_title']
        artic_sect = request.form['list_sect']
        artic_descr = request.form['artic_descr']
        new_sect = request.form['new_sect']

        if (new_sect):
            art.newSection(new_sect)
            artic_sect =  new_sect  


        art.setArticle(image_name, artic_name, artic_descr, artic_sect)
        artic_img.save('app/static/images/articles/'+image_name)

        return redirect(url_for('admin')) 


    sections = art.getSections()
    arts_and_sects = art.getArticlesBySection()


    return render_template('dashBoard.html',  title='administracion', sections=sections, arts_and_sects=arts_and_sects)


