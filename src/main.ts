import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { PiniaSharedState } from 'pinia-shared-state';

import App from './App.vue';
import router from './router';

const app = createApp(App);

const pinia = createPinia();
pinia.use(PiniaSharedState({
  type: 'native',
  enable: true
}));

app.use(pinia);
app.use(router);

app.mount('#app');
