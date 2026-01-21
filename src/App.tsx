import { authService } from './api/authService';
import './App.css'
import type { LoginDto } from './dto/loginDto'
import type { RegisterDto } from './dto/registerDto';

function App() {

  const credentials: RegisterDto = { username: "1", password: "1" };
  const credentials2: LoginDto = {username: credentials.username, password: credentials.password }  

  const onRegister = async (): Promise<void> => {
    try {
      await authService.register(credentials);
    } catch(e) {
      console.log(e);
    }
  }

  const onLogin = async (): Promise<void>=> {
    try {
      await authService.login(credentials2);
    } catch(e) {
      console.log(e);
    }
  }

  const onLogout = async (): Promise<void> => {
    try {
      await authService.logout();
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <>
      <button onClick={onRegister}>register</button>
      <button onClick={onLogin}>login</button>
      <button onClick={onLogout}>logout</button>
    </>
  )
}

export default App
