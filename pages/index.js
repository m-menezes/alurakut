import React from 'react';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import Box from '../src/components/Box'
import MainGrid from '../src/components/MainGrid'
import ProfileSidebar from '../src/components/ProfileSidebar';
import RelationRightSide from '../src/components/RelationRightSide';
import SortedoDia from '../src/components/SortedoDia';


export default function Home() {
	const usuarioAleatorio = 'm-menezes';
	const [ followers, setFollowers ] = React.useState([]);
	const [ comunidades, setComunidades ] = React.useState([{
		id: new Date().toISOString,
		url: 'https://www.alura.com.br/',
		name: 'Alura',
		image: 'https://www.nerdstickers.com.br/wp-content/uploads/2020/11/Adesivo-Alura-Nerd-Stickers.png'
	}]);

	React.useEffect( () => {
		fetch(`https://api.github.com/users/${usuarioAleatorio}/followers`)
		.then((response)=>{
			return response.json();
		})
		.then((data) => {
			setFollowers(data);
		})
	}, []);

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
					<SortedoDia/>
					<hr/>
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
				<RelationRightSide title={"Comunidades"} items={comunidades}/>
				<RelationRightSide title={"Amigos"} items={followers}/>
			</div>
		</MainGrid>
		</>
	)
}