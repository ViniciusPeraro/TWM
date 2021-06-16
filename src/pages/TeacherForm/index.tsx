import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader/indes';

import warningIcon from '../../assets/images/icons/warning.svg'

import './styles.css';
import Select from '../../components/Select';
import api from '../../services/api';

function TeacherForm() {
    
    const history = useHistory();
    const [name,setName] = useState('');
    const [avatar,setAvatar] = useState('');
    const [whatsapp,setWhatsApp] = useState('');
    const [bio,setBiografia] = useState('');

    const [subject,setSubject] = useState('');
    const [cost,setCost] = useState('');
    
    //Substitui o valor do scheduleItems 
    const [scheduleItems, setScheduleItems] = useState ([        
        {week_day:  0,from: '',to: ''}
    ]);

    //Conceito de Imutabilidade
    //Copiar o Array e incluir uma nova info neles // React entende que a gente alterou a variavel -> Inclui um novo horario.
    //Começa zerado (nada preenchido) 
    function addNewScheduleItem(){ 
        setScheduleItems([
            ...scheduleItems,
            {week_day:  0,from: '',to: ''}
        ]);
    }

    function setScheduleItemValue(position: number, field: string, value: string){
      const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
        if (index === position) {
            return {...scheduleItem , [field]: value};
        }

        return scheduleItem;
      });
      
      setScheduleItems(updatedScheduleItems);
    }

    function handleCreateClass(e: FormEvent){
        e.preventDefault();

        api.post('classes',{
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems

        }).then(() => {
            alert('Cadastro Realizado com Sucesso"')

            history.push('/');
        }).catch(() => {
            alert('Erro no cadastro"')
        })
    }

    return(
        <div id="page-teacher-form" className="container">
            <PageHeader 
            title="Que Incrivel que você quer dar aulas." 
            description="O primeiro passo é prencher esse formulário de inscrição."
            /> 

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input 
                            name="name" 
                            label="Nome Completo" 
                            value={name}
                            onChange={(e) => {setName(e.target.value)}} 
                        />

                        <Input 
                            name="avatar" 
                            label="Avatar" 
                            value={avatar}
                            onChange={(e) => {setAvatar(e.target.value)}} 
                        />

                        <Input 
                            name="whatsapp" 
                            label="WhatsApp(DDI + DDD + Numero)" 
                            value={whatsapp}
                            onChange={(e) => {setWhatsApp(e.target.value)}} 
                        />

                        <Input 
                            name="Bio" 
                            label="Biografia" 
                            value={bio}
                            onChange={(e) => {setBiografia(e.target.value)}} 
                        /> 

                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select 
                            name="subject" 
                            label="Matéria"
                            value={subject}
                            onChange={(e) => {setSubject(e.target.value)}} 
                            options={[
                                {value: 'Artes', label: 'Artes'},
                                {value: 'Educação Física', label: 'Educação Física'},
                                {value: 'Desenho', label: 'Desenho'},
                                {value: 'Teatro', label: 'Teatro'},
                                {value: 'Sociologia', label: 'Sociologia'},
                                {value: 'Filosofia', label: 'Filosofia'},
                                {value: 'História', label: 'História'},
                                {value: 'Geografia', label: 'Geografia'},
                                {value: 'Matemática', label: 'História'},
                                {value: 'Português', label: 'Matemática'},
                                {value: 'Biologia', label: 'Biologia'},
                                {value: 'Física', label: 'Física'},  
                                {value: 'Química', label: 'Química'}       
                            ]} 
                        />

                        <Input 
                            name="cost" 
                            label="Custo da hora por aula (em R$)" 
                            value={cost}
                            onChange={(e) => {setCost(e.target.value)}} 
                        />

                    </fieldset>
                    
                    <fieldset>
                        <legend>
                            Horários Disponíveis
                            <button type="button" onClick={addNewScheduleItem}>
                                + Novo Horário
                            </button>             
                        </legend>
                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">  
                                    <Select 
                                        name="week_day" 
                                        label="Dia da Semana"
                                        value={scheduleItem.week_day}
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                        options={[
                                            {value: '0', label: 'Domingo'},
                                            {value: '1', label: 'Segunda-feira'},
                                            {value: '2', label: 'Terça-feira'},
                                            {value: '3', label: 'Quarta-feira'},
                                            {value: '4', label: 'Quinta-feira'},
                                            {value: '5', label: 'Sexta-feira'},
                                            {value: '6', label: 'Sábado'},   
                                        ]} 
                                    />  

                                    <Input 
                                        name="from" 
                                        label="Das" 
                                        type="time"
                                        value={scheduleItem.from} 
                                        onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                    />
                                    <Input 
                                        name="to" 
                                        label="Até" 
                                        type="time"
                                        value={scheduleItem.to}
                                        onChange={e => setScheduleItemValue(index, 'to', e.target.value)} 
                                    />

                                </div> 
                            );
                        })} 
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso Importante" />
                            Importante! <br />
                            Preencha todos os dados
                        </p>
                        <button type="submit">Salvar Cadastro</button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;