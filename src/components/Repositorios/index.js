import React from 'react';
import RelationRightSide from '../RelationRightSide';

function Repositorios(props) {
    const [repositorios, setRepositorios] = React.useState([]);

    React.useEffect(() => {
        fetch(`https://api.github.com/users/${props.usuarioAleatorio}/repos`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setRepositorios(data);
            })
    }, []);
    return (
        <>
        <RelationRightSide title={"Repositórios"} items={repositorios} />
        </>
    )
}
export default Repositorios;