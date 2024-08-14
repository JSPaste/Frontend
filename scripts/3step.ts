import step1 from './3step/step1.ts';
import step2 from './3step/step2.ts';
import step3 from './3step/step3.ts';

console.info('[3STEP] Running...');
await step1();

console.info('[3STEP] Running...');
await step2();

console.info('[3STEP] Running...');
await step3();
