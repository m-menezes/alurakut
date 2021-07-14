import React from 'react';

function SortedoDia(){
    const [ sortedodia, setSortedoDia ] = React.useState([]);
    
    React.useEffect( () => {
        fetch(`https://allugofrases.herokuapp.com/frases/random`)
        .then((response)=>{
            return response.json();
        })
        .then((data) => {
            setSortedoDia(data);
        })
    }, []);
    return(
        <>
        <p className="sorte">
            <b>Frase do dia:</b> {sortedodia['frase']}
        </p>
        <p className="autor">{sortedodia['autor']}</p>
        </>
    )
}
export default SortedoDia;