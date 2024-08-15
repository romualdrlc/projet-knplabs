<template>
  <q-card
    class="my-card text-white q-ma-xs"
    style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
    v-if="player"
  >
    <q-card-section>
      <div class="text-h6 text-center"> {{ player.getName() }}</div>
    </q-card-section>
    <q-separator dark inset />
    <q-card-section class="q-pa-md">
      <q-input
        v-model="score"
        filled
        style="max-width: 200px"
        type="number"
        @update:modelValue="updateScore"
      />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { DomainEntityPlayer } from 'src/domain/Entity/DomainEntityPlayer';
import { onMounted, ref } from 'vue';

const props = defineProps<{
  playerEntity: DomainEntityPlayer
}>();

const player = ref<DomainEntityPlayer | null>(null);
const score = ref<number>(0);

onMounted(() => {
  if (props.playerEntity) {
    player.value = props.playerEntity;
    score.value = player.value.getScore();
  }
});

function updateScore(newScore: number | string | null): void {
  score.value = Number(newScore);
  if (player.value) {
    console.log(newScore);
    player.value.setNewScore(score.value);
    console.log(player.value.getScore());
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
