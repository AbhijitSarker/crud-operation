import { Link } from 'react-router-dom';
import './App.css'

function App() {

  const handleUser = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email }
    console.log(user);
    // form.reset();

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.insertedId) {
          alert('Inserted');
          form.reset()
        }
      })
  }

  return (
    <>
      <h1>CRUD</h1>

      <Link to='/users'>Users</Link>
      <form onSubmit={handleUser} action="">
        <input type="text" name='name' />
        <br />
        <input type="email" name='email' />
        <br />
        <input type="submit" value='Add User' />
      </form>
    </>
  )
}

export default App
