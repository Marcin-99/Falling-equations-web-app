from django.db import models
from django.contrib.auth.models import User
from PIL import Image


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(default='user-default.png', upload_to='profile_pictures')
    '''
    It only works on local machine. Currently app is not resizing profile pictures.
    
    def save(self, *args, **kwargs):
        super().save()
        img = Image.open(self.image.path)
        if img.height > 400 or img.width > 400:
            size = (400, 400)
            img.thumbnail(size)
            img.save(self.image.path)
    '''

    def __str__(self):
        return f'Profile for {self.user.username}.'