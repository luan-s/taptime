/// Função para phonegap
var app = {
	initialize: function() {
		this.bindEvents();
	},
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	onDeviceReady: function() {
		app.receivedEvent('deviceready');
	},
	receivedEvent: function(id) {
		var parentElement = document.getElementById(id);
		var listeningElement = parentElement.querySelector('.listening');
		var receivedElement = parentElement.querySelector('.received');

		listeningElement.setAttribute('style', 'display:none;');
		receivedElement.setAttribute('style', 'display:block;');

		console.log('Received Event: ' + id);
	}
};

levelAtual = 0;
tempoRodada = 15;
var vet = [];
var rodada = 0;
tentativas = 0;
var porcent = 0;
var cores = ['#616161', '#009688', '#4caf50', '#03a9f4', '#ff5722', '#f44336', '#9C27B0', '#9C27B0', '#8BC34A', '#795548', '#03A9F4'];
dec = 100;
min = 0;
seg = 15;
tempo = null;
porcent = 0;
vidas = 2;

v = [1, 2, 3, 4];



function setLevel(level) {
	console.log("Vidas: "+vidas)
	if(vidas==0){
		levelAtual = level = 0 ;
		console.log("zerou");
		v = [1,2,3,4];
		vidas = 5;
	} 

	if (level == 0) tempoRodada = 15;

	if (level == 1) tempoRodada = 10;

	if (level == 2) tempoRodada = 5;

	if (level == 3) {
		tempoRodada = 20;
		v = [1,2,3,4,5,6];
	}

	if (level == 4) tempoRodada = 12;

	if (level == 5) tempoRodada = 10;

	if (level == 6) {
		tempoRodada = 25;
		v = [1,2,3,4,5,6,7,8];
	}

	constroi(v);
}

function sorteia(qtd) {
	vet.length = 0;
	for (i = 0; i < qtd; i++) {
		do {
			achou = 0;
			num = Math.floor(Math.random() * 10);
			num++;
			for (y in vet) {
				if (vet[y] == num)
					achou = 1;
			}
		} while (num >= qtd + 1 || achou == 1);
		vet.push(num);
	}
}

function constroi(vet) {
	if (vet.length == 4) tam = "170px";
	if (vet.length == 6) tam = "130px";
	if (vet.length == 8) tam = "100px";
	if (vet.length == 10) tam = "65px";

	$(".botoes").empty();
	$(".life").empty();
	for (i = 1; i <= vet.length; i++) {
		$(".botoes").append('<div class="cont col-xs-6"><a href="javascript:void(0)" id="' + i + '" class="btn btn-raised btn-primary nums col-xs-11">' + i + '</a></div>');
		$("#" + i).css("background-color", cores[i]);
		$("#1").css("background-color", '#616161');
		$(".nums").css("height", tam);
		$(".nums").css("padding", (300 / vet.length).toString() + 'px');
		$("#level").text("Level " + (levelAtual + 1));
	}

	for (i = 0; i < vidas; i++)
		$(".life").append('<img src="img/cora.png" class="cora">');


	sorteia(vet.length);

}


function restart() {
	porcent = 0;
	$('.progress-bar').css("width", porcent.toString() + '%');
	$('a').css('transform', 'scale(1,1)');
	rodada = 0;
	$('.app').css('background-color', '#f5f5f5');
}

function resultado(r) {
	if (r) {
		var resu = "Parabéns"
		levelAtual++;
	} else {
		var resu = "Acabou o tempo!";
		vidas--;
	}
	$('.content-1').addClass("hidden");
	$('.content-2').removeClass("hidden");
	$('#tentativas').text("Tentativas: " + tentativas)
	$('#resu').text(resu)
	clearInterval(tempo);
	setLevel(levelAtual);
}

$(document).on('click', '.nums', function(e) {
	if (tentativas == 0) {
		tempo = startTime(tempoRodada);
		console.log(rodada);
	}
	tentativas += 1;

	var indice = parseInt(this.text);

	if (indice == vet[rodada]) {
		$('#' + indice.toString()).css('transform', 'scale(0)');
		porcent += 100 / v.length;
		// $('.progress-bar').css("width",porcent.toString()+'%');
		rodada++;
		$('.app').css('background-color', cores[indice - 1]);
	} else {
		restart();
	}

	if (rodada == vet.length) {
		resultado(1);
	}

})

$('.restart').click(function() {
	$('.content-1').removeClass("hidden");
	$('.content-2').addClass("hidden");
	vet.length = 0;
	sorteia(v.length);

	dec = 100;
	min = 10;
	seg = 1;

	$('.seg').text(tempoRodada);
	$('.dec').text('00');
	$('.min').text('00');
	tentativas = 0;
	atualizaTempo();
	restart();
	clearInterval(tempo);

})

///Cronometro

function startTime(t) {
	seg = t;
	tempo = setInterval(function() {
		if (dec < 10)
			$('.dec').text('0' + (--dec).toString());
		else
			$('.dec').text((--dec).toString());
		atualizaTempo();
	}, 10);
	return tempo;
}

function atualizaTempo() {

	if (dec == 0) {

		if (seg <= 10)
			$('.seg').text('0' + (--seg).toString());
		else
			$('.seg').text((--seg).toString());
		dec = 100;
	}

	if (seg == 0) {
		resultado(0);
	}
	var porcent = tempoRodada;
	porcent = (seg) * 100 / tempoRodada - 2;
	$('.progress-bar').css("width", porcent + '%');
}

setLevel(0);