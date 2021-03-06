import React from 'react';
import { useRouter } from 'next/router';
import nookies from 'nookies';

export default function loginScreen() {
    const router = useRouter();
    const [githubUser, setGithubUser] = React.useState('');

    return (
        <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <div className="loginScreen">
                <section className="logoArea">
                    <img src="https://alurakut.vercel.app/logo.svg" />

                    <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
                    <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
                    <p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
                </section>

                <section className="formArea">
                    <form className="box" onSubmit={(infosDoEvento) => {
                        infosDoEvento.preventDefault();
                        console.log('Usuário: ', githubUser)
                        fetch(`https://api.github.com/users/${githubUser}`)
                            .then(async (response) => {
                                return await response.json();
                            })
                            .then((data) => {
                                nookies.set(null, 'USER', JSON.stringify(data), {
                                    path: '/',
                                    maxAge: 86400 * 7
                                })
                                router.push('/')
                            })
                    }}>
                        <p>
                            Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
                        </p>
                        <small className="help-text">
                            {githubUser.length === 0
                                ? 'Informe o Usuário do Github'
                                : ''
                            }
                        </small>
                        <input
                            placeholder="Usuário do Github"
                            value={githubUser}
                            onChange={(evento) => {
                                setGithubUser(evento.target.value)
                            }}
                        />
                        <button type="submit">
                            Login
                        </button>
                    </form>

                    <footer className="box">
                        <p>
                            Ainda não é membro? <br />
                            <a href="/login">
                                <strong>
                                    ENTRAR JÁ
                                </strong>
                            </a>
                        </p>
                    </footer>
                </section>
                <footer className="footerArea">
                    <p>
                        © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
                    </p>
                </footer>
            </div>
        </main>
    )
}