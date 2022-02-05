import Header from './componentes/Header'
import api from './services/api'
import React, {useState, useEffect} from "react";
import {Form} from './componentes/Form'
import './componentes/Style.css'

export default function App(){
    const [multas, setMultas] = useState([]);
    
    
    useEffect(async () => {
        const  respost = await api.get('');
        const data = await respost.data;

        setMultas(data);
    }, []);

    async function handleAdd(data){
        const placa = data.placa;
        const detalhe = data.detalhe;
        const url = data.url;

        const info = {placa,detalhe,url}
        const response = await api.post('', info)
        
        setMultas([...multas, response.data]);
    }

   
    async function handleDellMult (id) {
        if(window.confirm('quer mesmo deletar?')){
            const trecochato = await api.delete(`/${id}`);
            setMultas([...multas,trecochato.data])
        }
    }

    return (
            <ul>
                <Header/>
                <div className='teste'></div>
                <div className='divG'>
                    {multas.map(mult =>(
                        <p key={mult.id} className='funcs'>
                            <div className="multasstyle">
                                <li>Id da multa: {mult._id}<p/></li>
                                <li>Placa do Vaículo: {mult.placa}<p/></li>
                                <li>Motivo: {mult.detalhe}<p/></li>
                                <li>Url: {mult.url}<p/></li>
                                {mult.favorite && <span>(Teste)</span>}
                                <button className="botdel" onClick={() => handleDellMult(mult._id)}>Deletar Multa</button>
                            </div>
                        </p> ))}
                        <div className="tituloCad">
                            <h1>Cadastrar Multas:</h1>
                        </div>
                        <div className="style-form">
                            <Form onSubmit={handleAdd}/>
                        </div>
                </div>
            </ul>
    );
}
