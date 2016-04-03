
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


var vet = [];
var rodada = 0;
tentativas = 0;
var porcent = 0;
var cores = ['#EEE','#009688','#4caf50','#03a9f4','#ff5722','#f44336'];
dec = 0;
min = 1;
seg = 1;

function sorteia(){
  for(i = 0;i<6;i++){
    do{
      achou = 0;
      num = Math.floor(Math.random() * 10);
      num++;
      for(y in vet){
        if(vet[y] == num)
          achou = 1;
      }
    }while(num>=7 || achou == 1);
    vet.push(num);
  }
}

sorteia();

function restart(){
  porcent = 0 ;
  $('.progress-bar').css("width",porcent.toString()+'%');
  $('a').css('transform','scale(1,1)');
  rodada = 0;
  $('.app').css('background-color','#f5f5f5');
}

$('a').click(function(){
  if(tentativas==0){
    startTime();
    console.log(rodada);
  }
  tentativas+=1;

  var indice = parseInt(this.text);

  if(indice == vet[rodada]){
    $('#'+indice.toString()).css('transform','scale(0)');


    porcent += 16.66;
    $('.progress-bar').css("width",porcent.toString()+'%');
    rodada++;
    $('.app').css('background-color',cores[indice-1]);
  }else{
    restart();
  }

  if(rodada == 6){
    $('.content-1').addClass("hidden");
    $('.content-2').removeClass("hidden"); 
    $('#tentativas').text("Tentativas: "+tentativas)
    clearInterval(tempo);
  }

})

$('.restart').click(function(){
  $('.content-1').removeClass("hidden");
  $('.content-2').addClass("hidden");  
  vet.length = 0; 
  sorteia();

  dec = 0;
  min = 1;
  seg = 1;

  $('.seg').text('00'); 
  $('.dec').text('00'); 
  $('.min').text('00'); 
  tentativas = 0;
  atualizaTempo();
  restart();
  clearInterval(tempo);
  
})

///Cronometro

function startTime(){
  tempo = setInterval(function(){
    if(dec<10)
      $('.dec').text('0'+(dec++).toString()); 
    else
      $('.dec').text((dec++).toString()); 
    atualizaTempo();
  }, 10);
}

  function atualizaTempo(){
      if(dec==100){

        if(seg<10)
           $('.seg').text('0'+(seg++).toString()); 
        else
           $('.seg').text((seg++).toString()); 
        dec = 0;
      }

      if(seg==61){
        if(min<10)
          $('.min').text('0'+(min++).toString()); 
        else
          $('.min').text((min++).toString()); 

        seg = 0;
      }
  }
