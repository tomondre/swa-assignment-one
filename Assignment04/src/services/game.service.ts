import axios from 'axios';
import { Subject } from 'rxjs';

export async function getGame(gameId : number, token : string) {
    try {
        const response = await axios.get(
          `http://localhost:9090/games/${gameId}?token=${token}`
        );
        console.log('Response for getGame: ', response);
        return response.data;
    } catch (error) {

    }
};