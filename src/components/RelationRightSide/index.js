import { ProfileRelationsBoxWrapper } from '../ProfileRelation';

function RelationRightSide(props) {
	return (
		<ProfileRelationsBoxWrapper>
			<h2 className="smallTitle">{props.title} ({props.items.length})</h2>
			<ul>
				{props.items.slice(0, 6).map((itemAtual) => {
					{
						if (!itemAtual.image) {
							itemAtual.image = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/600px-Octicons-mark-github.svg.png";
						};
					}
					return (
						<li key={itemAtual.id}>
							<a href={itemAtual.html_url ? itemAtual.html_url : itemAtual.url} >
								{console.log(itemAtual)}
								{itemAtual.login
								 ? <img src={`https://github.com/${itemAtual.login}.png`} />
								 : <img src={itemAtual.image} />
								}
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
export default RelationRightSide;