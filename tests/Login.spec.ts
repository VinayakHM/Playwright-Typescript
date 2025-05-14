import { test, expect, Page } from '@playwright/test';

test('Example test 1',async()=>{
  console.log('Print the env file fields : '+process.env.user);
  console.log('Print the env file fields password : '+process.env.pwd');
  console.log('Hello');
  await expect(process.env.user).toEqual('vinayak');
})
