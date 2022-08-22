from .models import player
from django.forms import ModelForm, TextInput

class player_form(ModelForm):
	class Meta:
		model = player
		fields = ['url', 'evo', 'name', 'image']
		widget = {
			'url':TextInput(attrs={
				'class':'bg-blue-200',
				'type':'text'
			}),
			'evo':TextInput(attrs={
				'type':'numbers'
				}),
			'game_id':TextInput(attrs={
				'type':'text'
				})

		}