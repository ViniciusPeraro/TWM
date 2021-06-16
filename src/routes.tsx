import React from 'react';
import{BrowserRouter, Route} from 'react-router-dom'
import Landing from './pages/Landing';
import TeacherForm from './pages/TeacherForm';
import TeacherList from './pages/TeacherList';

// BrowserRouter é usado para fazer o roteamento do lado do cliente com segmentos de URL. 
// Você pode carregar um componente de nível superior para cada rota.

function Routes(){
    return (
        <BrowserRouter>
            <Route path="/" exact component={Landing} />
            <Route path="/study" exact component={TeacherList} />
            <Route path="/give-classes" exact component={TeacherForm} />
        </ BrowserRouter>
    )
}

export default Routes;