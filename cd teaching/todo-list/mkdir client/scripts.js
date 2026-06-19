// No StackBlitz, o servidor roda localmente na porta 5173
const API_URL = 'http://localhost:5173';

// ==========================================================================
// LÓGICA DA TELA DE CADASTRO (REGISTER)
// ==========================================================================
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede a página de recarregar o navegador

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            // Envia os dados para a rota de registro do servidor do professor
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Usuário cadastrado com sucesso! Vamos fazer o login.');
                window.location.href = 'index.html'; // Redireciona para a tela de login
            } else {
                alert('Erro no cadastro: ' + (data.error || 'Tente novamente.'));
            }
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            alert('Não foi possível conectar ao servidor.');
        }
    });
}

// ==========================================================================
// LÓGICA DA TELA DE LOGIN
// ==========================================================================
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede a página de recarregar

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            // Envia os dados para a rota de login do servidor
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // O servidor devolve um token (o "passaporte"). Vamos guardá-lo no navegador!
                localStorage.setItem('token', data.token);
                
                // Guarda o nome do usuário para mostrar boas-vindas mais tarde
                if (data.user && data.user.name) {
                    localStorage.setItem('userName', data.user.name);
                }

                alert('Login bem-sucedido!');
                window.location.href = 'dashboard.html'; // Manda para a página de tarefas
            } else {
                alert('Erro no login: ' + (data.error || 'E-mail ou senha incorretos.'));
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Não foi possível conectar ao servidor.');
        }
    });
}

// ==========================================================================
// LÓGICA DE LOGOUT (SAIR)
// ==========================================================================
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('token'); // Apaga o token do navegador
        localStorage.removeItem('userName');
        alert('Você saiu do sistema.');
        window.location.href = 'index.html'; // Volta para a tela de login
    });
}
