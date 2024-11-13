import { createContext } from "react";
import { io } from 'socket.io-client'

let _socketContext = createContext(io("http://localhost:8000"));

export default _socketContext;