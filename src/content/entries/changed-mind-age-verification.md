---
title: I changed my mind about online age verification.
description: I used to dislike online age verification. I still kind of do, but I get it now.
kind: note
draft: false
published: 2026-09-12
---

I used to see no reason for online age verification.
I am a big supporter of online privacy. And I thought I would rather have privacy than having to upload some document proving who I was.
I still have that sentiment depending on the use case. But building [[projects/pk-spot|PK Spot]], I had to grow up.
As its creator, I felt directly responsible for things users do on my website and app. As of writing, my user
base is still relatively small, but that does not matter; it is never too early for safety-by-design.

For example, on [[projects/pk-spot|PK Spot]], users can share places to train Parkour together. 
These can be all sorts of locations, from paid gyms to a simple bench to jump over.
Now, as soon as you have real world locations and users interacting online, you should be hyper-vigilant.
I had the great idea for users to show their favorite spots on their profile, so far so good.
The site operates under a Wikipedia-style manner. Meaning every registered user can add spots and edit them,
and there is an edit history feature.

Now, one day while building this feature, a question appeared. What happens if a kid, aged 13+ for this scenario, marks
all the spots closest to their home as their favorite spots. That could link their user account directly to a real world location
and or their whereabouts. Thus, bad idea.
Ok, no more favorite spots on profiles.

Couple months later, I am building a training-session planning feature to plan trainings with your friends.
How do you prevent adults from meeting children through your site, if you want this feature?
There's really only one way: Age verification. 
(Please tell me if you have another idea)

If you want to plan a public training session, and have it be show, you have to be 18+. If you want to see them on PK Spot, same thing.
I am against locking out users, and I'm doing my best to have all the features I can be available to everyone without verifying,
but in my case, this is the line.

The problem now becomes, how do we verify how old a person is?
In my ideal world, your phone already knows, it can share a signal for an age range like: 13-15, 16-17, 18+, for example and 
that way the app/website doesn't have to ever get the birthday.
Apple and Google are working on this, but it's not ready and sometimes can even be user indicated, making it insufficient.

So yeah, we need privacy-friendly age verification ASAP.
