# Nehal Bhuttu — Portfolio Website

A plain HTML/CSS/JavaScript portfolio site. No build step, no framework,
no dependencies — you can open `index.html` directly in a browser, or
deploy it as-is.

## File structure

```
nehal-portfolio/
├── index.html                        ← all page content lives here
├── css/
│   └── style.css                     ← all styling (colours, fonts, spacing)
├── js/
│   └── main.js                       ← nav, animations, video-card behaviour
├── assets/
│   ├── images/
│   │   ├── thumbnails/                 ← put video thumbnail images here
│   │   └── profile/                    ← put your profile photo here (optional)
│   └── videos/                        ← put self-hosted MP4 files here
└── README.md                          ← this file
```

## What to edit, and where

| To change...              | Edit this file | Where                                         |
|----------------------------|-----------------|-----------------------------------------------|
| Portfolio videos & thumbnails | `index.html`  | `<article class="video-card ...">` blocks in the Work section |
| Project titles/descriptions  | `index.html`  | the `<h3>` and `<p>` inside each video card    |
| Skills list                | `index.html`    | `<ul class="skills-list">` in the Skills section |
| Client / experience entries | `index.html`   | `<li class="experience-item">` blocks         |
| Email address              | `index.html`    | the `mailto:` link in the Contact section      |
| Instagram / LinkedIn / YouTube links | `index.html` | `<ul class="contact-links">` in the Contact section |
| Profile photo               | `index.html` + `assets/images/profile/` | see the comment in the About section |
| Colours, fonts, spacing    | `css/style.css` | the `:root { ... }` block at the top          |

Every editable spot in `index.html` has an HTML comment right above it
explaining exactly what to change.

## Adding a portfolio video

Each project is one `<article class="video-card ...">` block in the Work
section of `index.html`. There are two things to set on the button inside it:

**For a YouTube video (or YouTube Short):**
```html
<button class="video-card__media" data-type="youtube" data-src="dQw4w9WgXcQ" ...>
```
`data-src` is just the video ID — the part of the YouTube URL after `v=`
(or after `youtu.be/`).

**For a self-hosted MP4 file:**
```html
<button class="video-card__media" data-type="video" data-src="assets/videos/my-edit.mp4" ...>
```
Put the actual `.mp4` file in `assets/videos/` first, then point `data-src`
at it.

**Horizontal vs. vertical:** each card's outer `<article>` has either
`video-card--horizontal` (16:9, wider) or `video-card--vertical` (9:16,
tall — for Shorts/Reels-style content) as a class. Use whichever matches
your video's shape.

**Thumbnails:** each button has a `style="background-image:url('...')"`
attribute. Replace the first URL in there with the path to your thumbnail
image in `assets/images/thumbnails/`. If you leave it pointing at a file
that doesn't exist, a plain dark-green placeholder shows instead — nothing
breaks.

**To add a 7th, 8th, etc. project:** copy one whole `<article
class="video-card ...">...</article>` block and paste it after the last
one, then edit its contents.

## About Instagram Reels specifically

There's no separate "Instagram" video type, since embedding Instagram's own
player requires loading their external script (which adds a dependency and
slows the page down). Instead, for Reels-style content:
- Export the Reel as an MP4 and use `data-type="video"`, or
- Re-upload it as a YouTube Short and use `data-type="youtube"`

Either way, use the `video-card--vertical` class so it displays at the
correct 9:16 shape.

## Deploying

**To GitHub:**
1. Create a new repository on GitHub.
2. Upload this whole folder's contents (or use `git init`, `git add .`,
   `git commit -m "Initial portfolio"`, then push to your new repo).

**To Vercel:**
1. In Vercel, choose "Add New Project" and import the GitHub repo.
2. Framework preset: choose "Other" (this is a static site — no build
   command or output directory settings are needed).
3. Deploy. That's it.

You can also drag the project folder straight into Vercel's dashboard
without GitHub, if you'd rather skip that step for now.

## Notes

- Fonts (Fraunces + Inter) load from Google Fonts via a `<link>` tag in
  `index.html` — no local font files needed.
- The site has no analytics, cookies, or tracking scripts built in.
- Everything is responsive from mobile up to large desktop, and respects
  the "reduce motion" accessibility setting if a visitor has it turned on.
