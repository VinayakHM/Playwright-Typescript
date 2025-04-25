import { test, expect, Page } from '@playwright/test';

test('Example test 1',async()=>{
  console.log('Print the env file fields : '+process.env.user);
  await expect(process.env.user).toEqual('vinayak');
})
