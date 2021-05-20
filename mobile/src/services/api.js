import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;

// iOS com emulator: localhost
// iOS e Android com device fisico: IP da máquina
// Android com emulator: com adb reverse tcp:PORT tcp:PORT ou 10.0.2.2
