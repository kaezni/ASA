from app import mysql, conn, cursor
import uuid

class GenerateUniqueName():

    
    def generateAndValidate(self):


        while True:

            generated_name = str(uuid.uuid4())

            if(not cursor.execute('SELECT image_name FROM articles WHERE image_name=%s', (generated_name))):
                return generated_name


