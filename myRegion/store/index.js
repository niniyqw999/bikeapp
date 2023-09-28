import * as Pinia from 'pinia';
import { createUnistorage } from '@/uni_modules/pinia-plugin-unistorage'
 
const store = Pinia.createPinia();
 
store.use(createUnistorage())
 
export default store;