import { valida } from './validacao.js'
// import from './node_modules/flipdown/src/flipdown.js'
// import * as FlipDown from '../node_modules/flipdown/dist/flipdown.js'

document.addEventListener('DOMContentLoaded', () => {

    // Unix timestamp (in seconds) to count down to
    var twoDaysFromNow = (new Date().getTime() / 1000) + (86400 * 7) + 1;
  
    // Set up FlipDown
    var flipdown = new FlipDown(twoDaysFromNow, {
        headings: ["Dias", "Horas", "Minutos", "Segundos"],
      })
  
      // Start the countdown
      .start()
  
      // Do something when the countdown ends
      .ifEnded(() => {
        console.log('The countdown has ended!');
      });


      const novaTarefa = document.getElementById("enviarEmail")
      console.log(novaTarefa);
});

const inputs = document.querySelectorAll('input')

inputs.forEach(input => {
    if(input.dataset.tipo === 'preco') {
        SimpleMaskMoney.setMask(input, {
            prefix: 'R$ ',
            fixed: true,
            fractionDigits: 2,
            decimalSeparator: ',',
            thousandsSeparator: '.',
            cursor: 'end'
        })
    }

    input.addEventListener('blur', (evento) => {
        valida(evento.target)
    })
})




// document.getElementById("enviarEmail").onclick = enviaEmail("CLIQUEI")

// function criarPopup(){
//     newWindow = window.open ('', 'pagina');
// window.open("cadastro_concluido.html", "", "top=40, left=40, width=250, height=100" );
//     newWindow.document.write ("Este é um novo popup <br/> <img src='imagem.jpg' width='100' height='100'>");
// }

// const novaTarefa = document.querySelector('[data-botao]')
// novaTarefa.addEventListener('click',criarPopup())


(function () {
    if (document.getElementsByTagName('form').length > 0) {
        document.getElementsByTagName('form')[0].addEventListener('submit', function (e) {
            e.preventDefault();

            // Check for spam
            if(document.getElementById('js-validate-robot').value !== '') { return false }

            // Get url for mailchimp
            var url = this.action.replace('/post?', '/post-json?');

            // Add form data to object
            var data = '';
            var inputs = this.querySelectorAll('#js-form-inputs input');
            for (var i = 0; i < inputs.length; i++) {
                data += '&' + inputs[i].name + '=' + encodeURIComponent(inputs[i].value);
            }

            // Create & add post script to the DOM
            var script = document.createElement('script');
            script.src = url + data;
            document.body.appendChild(script);

            // Callback function
            var callback = 'callback';
            window[callback] = function(data) {

                // Remove post script from the DOM
                delete window[callback];
                document.body.removeChild(script);

                // Display response message
                document.getElementById('js-subscribe-response').innerHTML = data.msg
            };
        });
    }
})();