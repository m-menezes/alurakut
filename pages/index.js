import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import Box from '../src/components/Box'
import MainGrid from '../src/components/MainGrid'
import ProfileSidebar from '../src/components/ProfileSidebar';
import RelationRightSide from '../src/components/RelationRightSide';
import SortedoDia from '../src/components/SortedoDia';
import Repositorios from '../src/components/Repositorios';
import { isEmpty } from 'lodash';


export default function Home(props) {
	const usuario = props.githubUser;
	const [followers, setFollowers] = React.useState([]);
	const [comunidades, setComunidades] = React.useState([]);
	const [nComunidades, setNComunidades] = React.useState([0]);

	React.useEffect(() => {
		fetch(`https://api.github.com/users/${usuario}/followers`)
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
					allCommunities (first: 6){
					  id
					  name
					  url
					  image
				    }
					_allCommunitiesMeta{
						count
					}
				}`
			})
		})
			.then((response) => response.json())
			.then((resposta) => {
				setComunidades(resposta.data.allCommunities)
				setNComunidades(resposta.data._allCommunitiesMeta.count)
			})
	}, []);

	return (
		<>
			<AlurakutMenu githubUser={usuario} />
			<MainGrid>
				<div className="profileArea" style={{ gridArea: 'profileArea' }}>
					<ProfileSidebar githubUser={usuario} />
				</div>
				<div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
					<Box>
						<h1 className="title">Bem vindo, {props.name}</h1>
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
									creatorslug: usuario
								};

								fetch('/api/comunidades', {
									method: 'POST',
									headers: {
										'Content-Type': 'application/json',
									},
									body: JSON.stringify(comunidade)
								}).then(async (response) => {
									const dados = await response.json();
									setComunidades([dados.registro, ...comunidades]);
								})
							}}>
							<button>Criar comunidade</button>
							<button disabled>Depoimentos</button>
							<button disabled>Scrap</button>
							<div className="inputs">
								<input
									type="text"
									name="name"
									required
									placeholder="Qual vai ser o nome da sua comunidade?"
									aria-label="Qual vai ser o nome da sua comunidade?"
								/>
								<input
									type="text"
									name="image"
									required
									placeholder="Imagem da comunidade"
									aria-label="Imagem da comunidade"
								/>
								<input
									type="text"
									name="url"
									required
									placeholder="Url da comunidade"
									aria-label="Url da comunidade"
								/>
							</div>
						</form>
					</Box>
				</div>
				<div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
					<Repositorios usuario={usuario} public_repos={props.public_repos} />
					<RelationRightSide title={"Comunidades"} items={comunidades} count={nComunidades} />
					<RelationRightSide title={"Amigos"} items={followers} count={props.nFollowers} />
				</div>
			</MainGrid>
		</>
	)
}

export async function getServerSideProps(context) {
	const cookies = nookies.get(context);
	if (!isEmpty(cookies)) {
		const USER = JSON.parse(cookies.USER);
		if (!USER.login) {
			return {
				redirect: {
					destination: '/login',
					permanent: false,
				}
			}
		}
		return {
			props: {
				githubUser: USER.login,
				name: USER.name,
				nFollowers: USER.followers,
				public_repos: USER.public_repos
			},
		}
	} else {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			}
		}
	}
}