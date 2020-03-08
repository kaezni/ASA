from app import mysql
import flask_login


class Articles():

    def __init__(self,cursor,conn):
        self.cursor = cursor
        self.conn = conn 
        
        
    def setArticle(self, image_name, artic_name, artic_descr, artic_categ):

        self.cursor.execute('INSERT INTO articles(image_name, artic_name, artic_descr) VALUES(%s, %s, %s)', (image_name, artic_name, artic_descr)) 
        self.cursor.execute('INSERT INTO categories(artic_categ) VALUES(%s)', (artic_categ)) 
        
        self.conn.commit() 
        
        self.cursor.execute('SELECT artic_id FROM articles WHERE artic_name=%s ORDER By artic_id DESC LIMIT 1', (artic_name)) 
        
        artic_ind = (self.cursor.fetchone()) 
        self.cursor.execute('SELECT categ_id FROM categories WHERE artic_categ=%s ORDER By categ_id DESC LIMIT 1', (artic_categ)) 
        categ_ind = self.cursor.fetchone()

        self.cursor.execute('INSERT INTO cat_art(artic_id, categ_id) VALUES(%s, %s)', (artic_ind[0], categ_ind[0])) 
        self.conn.commit()


    def getArticles(self): 
        self.cursor.execute('SELECT artic_name, artic_descr FROM articles') 
        data = self.cursor.fetchall() 
        return data


    def getArticleByID(self, artic_id): 
        self.cursor.execute('SELECT artic_price, artic_descr, image_name FROM articles WHERE artic_id=%s', artic_id) 
        data = self.cursor.fetchall() 
        return data


    def getArticleByName(self, artic_name): 
        self.cursor.execute('SELECT artic_categ, artic_name, a.artic_id, image_name FROM articles a, categories c, cat_art ca  WHERE artic_name=%s and (a.artic_id=ca.artic_id and c.categ_id=ca.categ_id)', artic_name ) 
        data = self.cursor.fetchall()
        return data

    def getSections(self):
        self.cursor.execute('SELECT DISTINCT artic_categ FROM categories') 
        return self.cursor.fetchall() 

    def newSection(self, new_sect):
        self.cursor.execute('INSERT INTO categories(artic_categ) VALUE(%s)', (new_sect)) 
    

    def delArtic(self, artic_id):
        from os import remove
        self.cursor.execute('SELECT image_name FROM articles WHERE articles.artic_id=%s', artic_id) 
        remove("app/static/images/articles/"+self.cursor.fetchall()[0][0]) 
        self.cursor.execute('DELETE FROM articles WHERE articles.artic_id=%s', artic_id) 
        self.conn.commit()
        

    def getArticlesBySection(self):

        arts_by_sects={} 
        arts_sects = self.getSections() 

        for arts_sect in arts_sects:
            self.cursor.execute('select a.artic_id, a.image_name, a.artic_name, a.artic_descr from articles a, categories c, cat_art ca where a.artic_id=ca.artic_id and c.categ_id=ca.categ_id and c.artic_categ=%s', (arts_sect[0]))

            arts_by_sect = self.cursor.fetchall()

            if not arts_by_sect:
                continue 

            arts_by_sects[arts_sect[0]]=arts_by_sect

        return arts_by_sects



class User(flask_login.UserMixin):

    def __init__(self, cursor):
        id=''
        name=''
        pswd=''
        self.cursor = cursor


    def getUserById(self, user_id):
        self.cursor.execute('SELECT user_name, user_id, user_pswd FROM users where user_id=%s', user_id) 
        self.name, self.id ,self.pswd = self.cursor.fetchall()[0]


    def getUserByName(self, user_name): 
        self.cursor.execute('SELECT user_id FROM users where user_name=%s', user_name) 
        self.id= self.cursor.fetchall()[0]


    def checkUser(self, user_name, user_password_form):
        self.cursor.execute('SELECT user_id, user_name, user_pswd FROM users where user_name=%s', user_name) 
        cont_query = self.cursor.fetchall()

        if cont_query:
            self.id, self.name, self.pswd = cont_query[0]
            if (self.pswd == user_password_form ): 
                return True
            else:
                return False

        else:
            return False
