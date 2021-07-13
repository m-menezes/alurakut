import React from 'react';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelation';
import Box from '../src/components/Box'
import MainGrid from '../src/components/MainGrid'
import followers  from '../src/lib/followers.json';

function ProfileSidebar(propriedades) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr/>
      <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
        {propriedades.githubUser}
      </a>
	  <div className="description">
			<p>Masculino,</p>
			<p>Solteiro(a)</p>
			<p>Brasil</p>
	  </div>
      <hr/>
      <AlurakutProfileSidebarMenuDefault/>
    </Box>
  )
}

function RightSide(props){
	return (
		<ProfileRelationsBoxWrapper>
			<h2 className="smallTitle">{props.title} ({props.items.length})</h2>
			<ul>
				{props.items.slice(0, 6).map((itemAtual) => {
					return (
						<li key={itemAtual.id}>
							<a href={itemAtual.html_url ? itemAtual.html_url : itemAtual.url} >
							<img src={itemAtual.image ? itemAtual.image : `https://github.com/${itemAtual.login}.png`} />
							<span>{itemAtual.name ? itemAtual.name : itemAtual.login}</span>
							</a>
						</li>
						)
					})
				}
			</ul>
		</ProfileRelationsBoxWrapper>
	)
}

export default function Home() {
	const [ comunidades, setComunidades ] = React.useState([{
		id: new Date().toISOString,
		url: 'https://www.alura.com.br/',
		name: 'Alura',
		image: 'https://www.nerdstickers.com.br/wp-content/uploads/2020/11/Adesivo-Alura-Nerd-Stickers.png'
	}]);
	const usuarioAleatorio = 'm-menezes';
	return (
		<>
		<AlurakutMenu githubUser={usuarioAleatorio}/>
		<MainGrid>
			<div className="profileArea" style={{ gridArea: 'profileArea' }}>
				<ProfileSidebar githubUser={usuarioAleatorio} />
			</div>
			<div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
				<Box>
					<h1 className="title">Bem vindo, {usuarioAleatorio}</h1>
					<p className="sorte"><b>Sorte do dia:</b> Lucky day</p>
					<OrkutNostalgicIconSet />
				</Box>
				<Box>
					<h2 className="smallTitle">O que você deseja fazer?</h2>
					<form className="formInsertComunnity" onSubmit={ 
						function handleComunidades(e){
							e.preventDefault();
							const dados = new FormData(e.target);
							const comunidade = {
								id: new Date().toISOString(),
								name: dados.get('title'),
								url: dados.get('title'),
								image: dados.get('image')
							};
							setComunidades([...comunidades, comunidade]);
						}}>
						<button>Criar comunidade</button>
						<button disabled>Depoimentos</button>
						<input 
							type="text"
							name="title"
							placeholder="Qual vai ser o nome da sua comunidade?"
							aria-label="Qual vai ser o nome da sua comunidade?"
							/>
						<input 
							type="text"
							name="image"
							placeholder="Imagem da comunidade"
							aria-label="Imagem da comunidade"
						/>
					</form> 
				</Box>
			</div>
			<div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
				<RightSide title={"Comunidades"} items={comunidades}/>
				<RightSide title={"Amigos"} items={followers}/>
			</div>
		</MainGrid>
		</>
	)
}