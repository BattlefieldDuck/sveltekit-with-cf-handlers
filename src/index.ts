import sveltekit from '../.svelte-kit/cloudflare/_worker.js'

export default {
    fetch: sveltekit.fetch,

    // The scheduled handler is invoked at the interval set in our wrangler.jsonc's
    // [[triggers]] configuration.
    async scheduled(event, env, ctx): Promise<void> {
        // A Cron Trigger can make requests to other endpoints on the Internet,
        // publish to a Queue, query a D1 Database, and much more.
        //
        // We'll keep it simple and make an API call to a Cloudflare API:
        let resp = await fetch('https://api.cloudflare.com/client/v4/ips');
        let wasSuccessful = resp.ok ? 'success' : 'fail';

        // You could store this result in KV, write to a D1 Database, or publish to a Queue.
        // In this template, we'll just log the result:
        console.log(`trigger fired at ${event.cron}: ${wasSuccessful}`);
    },
} satisfies ExportedHandler<Env>;
