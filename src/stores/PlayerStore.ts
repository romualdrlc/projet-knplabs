import { defineStore } from 'pinia';
import { DomainEntityPlayer } from 'src/domain/Entity/DomainEntityPlayer';

export const usePlayerStore = defineStore('player', {
  state: () => ({
    playerList: [] as DomainEntityPlayer[]
  }),
  actions: {
    savePlayerList(playerList: DomainEntityPlayer[]): void {
      this.playerList = playerList;
    }
  }
});
