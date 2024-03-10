import { ref } from "vue";
import { defineStore } from "pinia";

const useCounterStore = defineStore("counter", () => {
  let id: number;
  const count = ref(0);
  const countdown = (sec: number, action: () => void) => {
    count.value = sec;
    id = setInterval(() => {
      count.value--;
      if (count.value === 0) {
        stop();
        action();
      }
    }, 1000);
  };
  const set = (sec: number) => {
    count.value = sec;
  };
  const stop = () => {
    clearInterval(id);
  };

  return { count, set, countdown, stop };
});

export default useCounterStore;
