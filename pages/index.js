import React from 'react';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import Box from '../src/components/Box'
import MainGrid from '../src/components/MainGrid'
import ProfileSidebar from '../src/components/ProfileSidebar';
import RelationRightSide from '../src/components/RelationRightSide';
import SortedoDia from '../src/components/SortedoDia';
import Repositorios from '../src/components/Repositorios';


export default function Home() {
	const usuarioAleatorio = 'm-menezes';
	const [followers, setFollowers] = React.useState([]);
	const [comunidades, setComunidades] = React.useState([]);

	React.useEffect(() => {
		fetch(`https://api.github.com/users/${usuarioAleatorio}/followers`)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setFollowers(data);
			})

		fetch('https://graphql.datocms.com/', {
			method: 'POST',
			headers: {
				'Authorization': '1be46233a504021b8c45433e60ebd4',
				'Content-type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				"query": `query {
					allCommunities {
					  id
					  name
					  url
					  image
				    }
				}`
			})
		})
			.then((response) => response.json())
			.then((resposta) => {
				setComunidades(resposta.data.allCommunities)
			})
	}, []);

	return (
		<>
			<AlurakutMenu githubUser={usuarioAleatorio} />
			<MainGrid>
				<div className="profileArea" style={{ gridArea: 'profileArea' }}>
					<ProfileSidebar githubUser={usuarioAleatorio} />
				</div>
				<div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
					<Box>
						<h1 className="title">Bem vindo, {usuarioAleatorio}</h1>
						<SortedoDia />
						<hr />
						<OrkutNostalgicIconSet />
					</Box>
					<Box>
						<h2 className="smallTitle">O que você deseja fazer?</h2>
						<form className="formInsertCommunity" onSubmit={
							function handleComunidades(e) {
								e.preventDefault();
								const dados = new FormData(e.target);
								const comunidade = {
									name: dados.get('name'),
									url: dados.get('url'),
									image: dados.get('image'),
									creatorslug: usuarioAleatorio
								};

								fetch('/api/comunidades', {
									method: 'POST',
									headers: {
										'Content-Type': 'application/json',
									},
									body: JSON.stringify(comunidade)
								}).then(async (response) => {
									const dados = await response.json();
									setComunidades([...comunidades, dados.registro]);
								})
								console.log(e)
							}}>
							<button>Criar comunidade</button>
							<button disabled>Depoimentos</button>
							<div className="inputs">
								<input
									type="text"
									name="name"
									placeholder="Qual vai ser o nome da sua comunidade?"
									aria-label="Qual vai ser o nome da sua comunidade?"
								/>
								<input
									type="text"
									name="image"
									placeholder="Imagem da comunidade"
									aria-label="Imagem da comunidade"
								/>
								<input
									type="text"
									name="url"
									placeholder="Url da comunidade"
									aria-label="Url da comunidade"
								/>
							</div>
						</form>
					</Box>
				</div>
				<div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
					<Repositorios usuarioAleatorio={usuarioAleatorio} />
					<RelationRightSide title={"Comunidades"} items={comunidades} />
					<RelationRightSide title={"Amigos"} items={followers} />
				</div>
			</MainGrid>
		</>
	)
}