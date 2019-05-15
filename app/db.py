from app import mysql, conn, cursor
import flask_login


class Articles():


    def __init__(self):
        pass
    

    def setArticle(self, image_name, artic_name, artic_descr, artic_categ):

        cursor.execute('INSERT INTO articles(image_name, artic_name, artic_descr) VALUES(%s, %s, %s)', (image_name, artic_name, artic_descr)) 
        cursor.execute('INSERT INTO categories(artic_categ) VALUES(%s)', (artic_categ)) 
        
        conn.commit() 
        
        cursor.execute('SELECT artic_id FROM articles WHERE artic_name=%s ORDER By artic_id DESC LIMIT 1', (artic_name)) 
        
        artic_ind = (cursor.fetchone()) 
        cursor.execute('SELECT categ_id FROM categories WHERE artic_categ=%s ORDER By categ_id DESC LIMIT 1', (artic_categ)) 
        categ_ind = cursor.fetchone()



        cursor.execute('INSERT INTO cat_art(artic_id, categ_id) VALUES(%s, %s)', (artic_ind[0], categ_ind[0]))

        conn.commit()

    def getArticles(self): 
        cursor.execute('SELECT artic_name, artic_descr FROM articles') 
        data = cursor.fetchall() 
        return data


    def getSections(self):
        cursor.execute('SELECT DISTINCT artic_categ FROM categories') 
        return cursor.fetchall() 

    def newSection(self, new_sect):
        cursor.execute('INSERT INTO categories(artic_categ) VALUE(%s)', (new_sect)) 
    

    def delArtic(self, artic_id):
        cursor.execute('DELETE FROM articles  WHERE articles.artic_id=%s', artic_id) 
        conn.commit()
        

    def getArticlesBySection(self):

       arts_by_sects={} 
       arts_sects = self.getSections() 

       print(arts_sects)
       for arts_sect in arts_sects: 

          cursor.execute('select a.artic_id, a.image_name, a.artic_name, a.artic_descr from articles a, categories c, cat_art ca where a.artic_id=ca.artic_id and c.categ_id=ca.categ_id and c.artic_categ=%s', (arts_sect[0]))

          arts_by_sect = cursor.fetchall()
          if not arts_by_sect:
             continue 

          arts_by_sects[arts_sect[0]]=arts_by_sect

       
       return arts_by_sects



class User(flask_login.UserMixin):



    def __init__(self):
        id=''
        name=''
        pswd=''


    def getUserById(self, user_id):
        cursor.execute('SELECT user_name, user_id, user_pswd FROM users where user_id=%s', user_id) 
        self.name, self.id ,self.pswd  = cursor.fetchall()[0]


    def getUserByName(self, user_name):

        cursor.execute('SELECT user_id FROM users where user_name=%s', user_name) 

        self.id= cursor.fetchall()[0]

