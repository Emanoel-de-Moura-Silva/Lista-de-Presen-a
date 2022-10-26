import React, {useState, useEffect} from 'react'
import './Style.css'
import { Card } from '../../components/Card'


 export function Home() {
  const [studentName, setStudentName] = useState('');
  const [student, setStudent] = useState([]);
  const [user, setUser] = useState({name: '', avatar: ''});

  function handleAddStudent(){
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br",{
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    };
    setStudent(prevState => [ ...prevState, newStudent ]);
  }

  useEffect(() =>{
   fetch('https://api.github.com/users/Emanoel-de-Moura-Silva')
   .then(response => response.json())
   .then(date => {
    setUser({
      avatar: date.avatar_url,
      name: date.name 
    })
   })
  },[])

  return ( 
    <div className='container'>
      <header>
      <h1>Lista de Presença</h1>
      <div>
        <strong>{user.name}</strong>
        <img src={user.avatar} alt="foto de perfil" />
      </div>

      </header>
      <input type="text"
       placeholder="Digite seu nome..."
       onChange={e => setStudentName(e.target.value)}/>

      <button type='button'
      onClick={handleAddStudent}>
        Adicionar</button>
      {
        student.map(student => (
        <Card
         key={student.time}
         name={student.name}
         time={student.time}
         />))
        
      }
    </div>
  )
}


