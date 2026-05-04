# Bee Creek Farm — Mason, TX

Static landing page for Bee Creek Farm, a 32-acre property in Mason, Texas with two shipping-container Airbnb cabins (Big Bend and Nocona).

## Stack

- Hand-coded HTML / CSS / vanilla JS — no framework, no build step
- Hosted on GitHub Pages
- Domain managed via Cloudflare Registrar

## Local preview

```sh
cd /path/to/this/repo
python3 -m http.server 5193
# open http://localhost:5193
```

## Structure

```
.
├── index.html      # the page
├── styles.css      # design tokens + layout
├── main.js         # nav, reveals, form, Airbnb routing
├── assets/
│   ├── img/        # photos + favicon
│   └── fonts/
└── brand/          # logo SVGs and brand spec (not used by the page directly)
```

## Updating

Edit, commit, push to `main`. GitHub Pages redeploys in ~1 minute.

```sh
git add -A
git commit -m "your message"
git push
```
