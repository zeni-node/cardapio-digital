const botao = document.getElementById('botao');

botao.addEventListener('click', abrirSite);

function abrirSite(){
	if (botao.classList.contains('loading')){
		return;
	}

	botao.classList.add('loading');
	botao.setAttribute('aria-busy', 'true');

	setTimeout(function(){
		window.location.href = '../site 2/index.html';
	}, 1500);
}
