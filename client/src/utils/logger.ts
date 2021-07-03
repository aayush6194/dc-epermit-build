import * as Sentry from '@sentry/browser';

export default {
    log: (error: any) => {
        console.log(error)
        Sentry.captureException(error)
    }
}