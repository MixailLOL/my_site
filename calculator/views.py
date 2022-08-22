from django.shortcuts import render, redirect
from .models import player
from .forms import player_form
import requests
from bs4 import BeautifulSoup
import os

def index(request):
	return render(request, 'calculator/index.html')

def about(request):
	return render(request, 'calculator/about.html')

def add_account(request):
	if request.method == 'POST':
		form = player_form(request.POST, request.FILES)
		if form.is_valid() and 'https://www.facebook.com' in request.POST['url']:
			form.save()
			img_obj = form.instance
			return redirect('players_table')
		else:
			return redirect('calculator')

	form = player_form()
	context = {
		'form': form
	}
	return render(request, 'calculator/add_account.html', context)

def players_table(request):
	players_table = player.objects.order_by('-evo')
	return render(request, 'calculator/players_table.html', {'players': players_table})

def page_random(request):
	return render(request, 'calculator/random.html')

def page_quiz(request):
	data = parser()
	return render(request, 'calculator/quiz.html',{"data_from_py": data})

def parser():
	url = 'https://pokradex.org/MutantsGG/tabla-Mutantes.html'
	response = requests.get(url)
	soup = BeautifulSoup(response.text, "html.parser")

	mutants_row = soup.find_all('tr')

	mutants_names = []
	mutants_pick_urls = []

	for mutant in mutants_row[1:]:
		mutant_data = mutant.find_all('td')
		mutant_name = mutant_data[3].find('b')
		mutants_names.append((mutant_name.text)[1:-1])

	for mutant in mutants_row[1:]:
		mutant_data = mutant.find_all('td')
		mutant_url = mutant_data[2].find('img')
		mutants_pick_urls.append(mutant_url['src'])

	mutants_info = []

	for i in range(len(mutants_names)):
		couple = []
		couple.append(mutants_names[i])
		couple.append(mutants_pick_urls[i])
		mutants_info.append(couple)

	return(mutants_info)