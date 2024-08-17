<template>
  <div class="displayPlayer">
    <PlayerCard v-for="player in playerStore.playerList" :key="player.getName()" :player-entity="player" />
  </div>
  <q-btn round icon="fa-solid fa-circle-xmark" @click="savePlayer" />
  <q-btn color="black" label="Reset score" @click="resetScore"/>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { server } from 'src/boot/server';
import { DomainEntityPlayer } from 'src/domain/Entity/DomainEntityPlayer';
import PlayerCard from 'components/Player/List/PlayerCard.vue';
import { usePlayerStore } from 'src/stores/PlayerStore';

const playerStore = usePlayerStore();
const playerList = ref<DomainEntityPlayer[]>([]);

onMounted(async () => {
  playerStore.savePlayerList(await server.getPlayerList());
  playerList.value = playerStore.playerList;
});

async function savePlayer(): Promise<void> {
  for (const player of playerStore.playerList) {
    if (player instanceof DomainEntityPlayer) {
      await server.saveScoreByPlayer(player);
    }
  }
}

async function resetScore():Promise<void> {
  await server.resetScore(playerList.value);
}
</script>

<style scoped lang="scss">
@media only screen and (max-width: 412px) {
  .displayPlayer {
    display: flex;
    flex-direction: column;
  }
}

@media only screen and (min-width: 450px) {
  .displayPlayer {
    display: flex;
    flex-direction: row;
  }
}
</style>
