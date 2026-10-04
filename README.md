# Toysho — Static E-commerce Website

A simple black + yellow toy-car store that can be deployed directly with GitHub Pages.

## Files

- `index.html` — store layout
- `style.css` — responsive black/yellow design
- `script.js` — products, search, filtering, cart and WhatsApp ordering

## Deploy on GitHub Pages

1. Create a new GitHub repository, for example `toysho-store`.
2. Upload these three files plus this README.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select `main` and `/ (root)`.
6. Save.
7. GitHub will give you the public Pages URL.

## Before launch

Open `script.js` and replace:

`const WHATSAPP_NUMBER = "919999999999";`

with your real WhatsApp Business number, including the country code and without `+` or spaces.

Replace the demo products and prices in the `products` array with your real inventory.

## Important limitation

This is intentionally a static storefront. It does **not** process online payments, maintain server-side inventory, or securely collect customer data.

For real payments later, connect a proper payment gateway and backend rather than putting payment secrets in JavaScript.
