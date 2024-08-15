import { api } from 'src/boot/axios';
import { DomainEntityPlayer } from '../Entity/DomainEntityPlayer';
import PlayerList from '@/components/Player/List/PlayerList.vue';

export default class DomainServiceServer {
  public async getPlayerList(): Promise<DomainEntityPlayer[]> {
    const response = await this.#apiGet('player');
    const playerList: DomainEntityPlayer[] = [];
    for (const player of response.data) {
      playerList.push(new DomainEntityPlayer({
        id: player.id,
        name: player.name,
        score: player.score
      }));
    }
    return playerList;
  }

  public async saveScoreByPlayer(player: DomainEntityPlayer): Promise<void> {
    await this.#apiPost('player/update/' + player.getId(), { score: player.getScore() });
  }

  public async resetScore(playerList: DomainEntityPlayer[]): Promise<void> {
    await this.#apiPost(('player/reset'), {playerList: playerList});
  }

  async #apiGet(url: string) {
    return await api.get(url).catch((error) => {
      if (error.response) {
        error.message = error.response.data;
      }
      throw error;
    });
  }

  async #apiPost(url: string, data: object) {
    const apiResult = await api.post(url, data).catch((error) => {
      if (error.response) {
        error.message = error.response.data;
      }
      throw error;
    });
    return apiResult.data;
  }
}
