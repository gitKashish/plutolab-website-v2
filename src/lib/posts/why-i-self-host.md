---
title: Why I Self-Host Everything
date: '2026-01-17'
description: On control, simplicity, and understanding your own infrastructure.
---

I self-host most of the services I use because it forces me to understand the systems I depend on. Managed cloud services optimize for speed and comfort, but in doing so they hide fundamentals I care about learning.

Self-hosting forces one to confront the full stack. Networking, storage, backups, security, failures — none of it is optional. That constraint is uncomfortable, but it's also where the learning happens.

If that's all you wanted to know, you can stop here. The rest of this post is the long version — how curiosity, bad assumptions, and a lot of broken setups led me here.

## Curiosity getting the better of me

This goes way back when I started getting into programming during school days. I got into game development and started building a simple RPG. At some point, I stopped thinking about animations and mechanics and got stuck on a different problem: how do NPCs know how to behave?

This was when I first read about Artificial Intelligence, and more specifically chatbots. So, I left the game in between, and tried building a chatbot myself. It was terrible. At best, it was an N-dimensional k-nearest neighbours search that tried to match user input against a file full of manually written prompts and responses.

I didn't know any better — I was a school kid — but in the process I stumbled into NLP, basic AI concepts, and the idea of how software is not just applications where click on buttons, or game where you move characters. It is layers of systems talking to each other.

## My Early Bias Against the Web

Up until this point I had only experience working with games, and CLI (the "chatbot" I made). The only real purpose driven and somewhat useful application I made was a .Net windows application that provided a GUI that would stream my phone screen and audio to my PC using `scrcpy` and an audio capture tool I can't even remember anymore, mainly to resync audio and video when they drifted.

At the time, desktop applications felt like the "right" way to build software. I thought that websites were wasteful and unnecessary because you always need internet connection to do even the simplest stuff.

Over time, I realised why web won: zero friction, no installs, no system storage to worry about. Open a link and the software is there, on-demand.

## The illusion of simplicity

Now I wanted to get my hands on some web dev. So after watching a bunch of web dev roadmap videos I ended up trying to learn React and hated it. Writing HTML as strings in JS felt jank and like a workaround to something. I tried Vue, then Svelte — which felt better. I built the universal "hello world" of web dev: a [todo app](https://pluto-todo.netlify.app).

It worked. I was happy. Now it was time to deploy. But then I realised that I didn't know how websites actually worked. Up to that point, running a web app meant running `npm run dev` on my machine.

I looked around and realised that I would need a domain to host this web app on. But I did not want to buy a domain just to serve a todo app. I found Netlify, and I deployed reading their documentations. And to be honest, I still didn't understand how all this actually worked. I didn't have to care about buying a domain, connecting it to a server, setting up a server itself, etc. It was convenient.

At this point, I could build things — but I still didn't understand where they lived.

## Work, domains, and reality

Around this time, I started working full-time on a SaaS product. For the first time, I was exposed to real production infrastructure — not ideal, not perfectly designed, but real.

I learned that web servers are just Linux machines. That even the most modern frameworks eventually boil down to serving HTML, CSS, and JavaScript. Tools like nginx, which once felt mysterious, turned out to be simple and powerful once I understood what problem they were actually solving.

Ironically, this made me more curious, not less. I could see the pieces, but I still didn't feel like I owned the understanding. There were too many layers between me and the system.

Around the same time, while trying to understand how DNS worked for whitelabeling customer deployments, I ended up buying this domain. That’s when the question stopped being theoretical and became practical: what does it actually take to run this myself?

## Doing it myself

I considered the usual options — Netlify, Render, even AWS. But all of them felt like shortcuts around the exact things I wanted to learn. AWS also wanted my credit card, which I wasn't excited about.

Then I remembered an old laptop lying around at home. I had already watched enough homelab videos to know this wouldn't be smooth, but I wanted the friction.

It wasn't smooth. I didn't have a static IP, so I wrote a small DDNS script. I ran into CGNAT issues with my ISP. I misconfigured firewalls, broke things repeatedly, and fixed them again.

But it worked. And more importantly, everything finally made sense.

## Why I still self-host?

I don't self-host because it's more reliable or more scalable. It isn't.

I self-host because it forces me to understand the infrastructure I depend on — not through dashboards or abstractions, but through real machines, networks, and failures.

Managed services are great for velocity. But learning happens where abstractions end. For me, self-hosting is where that happens.