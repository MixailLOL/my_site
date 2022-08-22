from django.shortcuts import render

def page_color_game(request):
	file = open("color_game/static/data/colors.txt", encoding="utf8")
	data = file.read()
	file.close()
	return render(request, 'color_game/color_game.html',{"data_from_py": data})