
import { ProfileRelationsBoxWrapper } from '../ProfileRelation';

function RelationRightSide(props){
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
export default RelationRightSide;