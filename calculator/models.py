from django.db import models

# Create your models here.
class player(models.Model):
	url = models.CharField('url', max_length=50)
	evo = models.IntegerField('evo')
	name = models.CharField('name', max_length=50)
	image = models.ImageField(upload_to='images')
	def __str__(self):
		return self.url