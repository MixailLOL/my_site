function get_color(colors) {
    color = getRandomInt(1017);
    return(colors[color])
}

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

function get_same_color(colors, rgb_clr_id, rgb_clr){
    var color;
    do {
        color = colors[getRandomInt(1017)];
        var rgb_array = get_numbers_from_text(color[1]);
    } while (rgb_array[rgb_clr_id] < rgb_clr);
    return(color)
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getArrayRandElement(arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}

function get_numbers_from_text(str) {
    let result = str.match(/(-?\d+(\.\d+)?)/g).map(v => +v);
    return(result)
}

var true_color;
var global_colors;
var global_bg_color;

function answer_check(btn_pressed){
    var colors = global_colors
    var btn_pressed_color = document.getElementById(btn_pressed).style.backgroundColor;
    document.getElementById("colors_to_choice").style.display = 'none';
    if(btn_pressed_color == true_color[1]){
        document.getElementById("text_area").style.display = 'none';
        document.getElementById("good_answers_counter").innerHTML = Number(document.getElementById("good_answers_counter").innerText)+1;
        document.getElementById("good_aswer_div").style.display = 'inline';
        document.getElementById("good_aswer").style.background = true_color[1];
        document.getElementById("good_aswer").innerHTML = 'Отлично! <br />Очки++  <br />'+String(true_color[0]);
        change_txt_color('good_aswer');
    }
    else{
        document.getElementById("text_area").style.display = 'none';
        document.getElementById("what_pressed").style.background = btn_pressed_color;
        document.getElementById("color_to_press").style.background = true_color[1];
        var prsed_color = (global_colors.find(el => el.includes(String(document.getElementById(btn_pressed).style.backgroundColor))));
        document.getElementById("what_pressed").innerHTML = 'Вы выбрали:\n'+prsed_color[0];
        document.getElementById("color_to_press").innerHTML = 'Искомый цвет:\n'+true_color[0];
        change_txt_color('what_pressed');
        change_txt_color('color_to_press');
        document.getElementById("answ_count").innerHTML = 'Всего очков : '+String(document.getElementById("good_answers_counter").innerHTML);
        document.getElementById("good_answers_counter").innerHTML = '0';
        document.getElementById("end_game").style.display = 'inline';
        document.getElementById("answer_div").style.display = 'inline';
    }
}

function change_color(colors){
    global_colors = colors;
    document.getElementById('colors').innerHTML = '';
    document.getElementById("good_aswer_div").style.display = 'none';
    document.getElementById("end_game").style.display = 'none';
    document.getElementById("answer_div").style.display = 'none';
    document.getElementById("text_area").style.display = 'inline';
    $colors_div = document.querySelector('#colors');
    var colors_number = Number(document.getElementById("good_answers_counter").innerText)+2;
    var color_arr = []
    if((colors_number-2)%5 == 0){
        var core_color = get_color(colors);
        var core_color_max = getMaxOfArray(get_numbers_from_text(core_color[1]));
        var core_color_id = (get_numbers_from_text(core_color[1])).indexOf(core_color_max);
        console.log('Now')
        for(let color = 0; color < Math.round(colors_number/5)+2; color++){
            var new_color = get_same_color(colors, core_color_id, core_color_max);
            color_arr.push(new_color)
            $colors_div.insertAdjacentHTML('afterbegin', '<div onclick="answer_check(\'color_'+color+'\')" id="color_'+color+'" class="p-0 m-0 h-full" style="background-color:'+new_color[1]+'; width:'+Math.round(100/(colors_number/5))+'%;"> </div>');
        }
    }else{
        for(let color = 0; color < Math.round(colors_number/5)+2; color++){
            var new_color = get_color(colors);
            color_arr.push(new_color)
            $colors_div.insertAdjacentHTML('afterbegin', '<div onclick="answer_check(\'color_'+color+'\')" id="color_'+color+'" class="p-0 m-0 h-full" style="background-color:'+new_color[1]+'; width:'+Math.round(100/(colors_number/5))+'%;"> </div>');
        }
    }
    console.log(color_arr)
    true_color = getArrayRandElement(color_arr);
    document.getElementById("color_name").innerHTML = true_color[0];
    document.getElementById("colors_to_choice").style.display = 'inline';
    document.getElementById("viberi_color").innerHTML = 'Выбери цвет:';
    change_bg_color(color_arr);
}

function change_bg_color(color_arr){
    var new_color = [0,0,0];
    for( i=0; i < (color_arr).length; i++){
        var color_numbers = get_numbers_from_text(color_arr[i][1]);
        new_color[0] += color_numbers[0];
        new_color[1] += color_numbers[1];
        new_color[2] += color_numbers[2];
    }
    new_color[0] = Math.round((new_color[0]/(color_arr).length)*3.5);
    new_color[1] = Math.round((new_color[1]/(color_arr).length)*3.5);
    new_color[2] = Math.round((new_color[2]/(color_arr).length)*3.5);
    document.getElementById("text_area").style.backgroundColor = 'rgb('+(new_color[0])+', '+(new_color[1])+', '+(new_color[2])+')';
    global_bg_color = 'rgb('+(new_color[0])+', '+(new_color[1])+', '+(new_color[2])+')';
    document.body.style.background = 'rgb('+(new_color[0])+', '+(new_color[1])+', '+(new_color[2])+')';
}

function change_txt_color(el_id){
    var bg_color = document.getElementById(el_id).style.backgroundColor;
    bg_color =  get_numbers_from_text(bg_color);
    if(bg_color[0] + bg_color[1] + bg_color[2] > ((255*3)*0.59)){
        document.getElementById(el_id).style.color = 'rgb(0,0,0)';
    }else{
        document.getElementById(el_id).style.color = global_bg_color;
    }
}