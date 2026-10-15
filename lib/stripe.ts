import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2026-09-30.endive",
    appInfo: {
        name: "blog-builder",
        url: "https://blog-builder.com",
    },
});
