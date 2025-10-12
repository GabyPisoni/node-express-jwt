import {RateLimiterMemory} from 'rate-limiter-flexible';
export const rateLimiter = new RateLimiterMemory({
    points:3,
    duration:60 * 10
});