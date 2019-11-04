import uuid

class GenerateUniqueName():

    def __init__(self,cursor):
        self.cursor = cursor
    
    def generateAndValidate(self): 

        while True:

            generated_name = str(uuid.uuid4())

            if(not self.cursor.execute('SELECT image_name FROM articles WHERE image_name=%s', (generated_name))):
                return generated_name


