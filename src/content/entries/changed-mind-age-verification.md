---
title: I changed my mind about online age verification.
description: I used to dislike online age verification. I still kind of do, but I get it now.
kind: note
draft: false
published: 2026-09-12
---

I used to see no reason for online age verification.
I am a big supporter of online privacy. And I thought I would rather have privacy than having to upload some document proving who I was.
I still have that sentiment depending on the use case. But building [[projects/pk-spot|PK Spot]], I have had a change of heart,
from thinking age verification should never be useful to we might actually need it for certain things.

As the creator of [[projects/pk-spot|PK Spot]], I felt directly responsible for things users do on my website and app. As of writing, my user
base is still relatively small, but that does not matter; it is never too early for safety-by-design.
For example, on [[projects/pk-spot|PK Spot]], users can share places to practice Parkour, we call them spots.
These can be all sorts of locations, from paid gyms to a simple bench to jump over.
The site operates under a Wikipedia-style manner. Meaning every registered user can add spots and edit them,
and there is an edit history feature.
Now, as soon as you have real world locations and online users interacting, you should be hyper-vigilant.

I had the great idea of being able to display your favorite spots on your profile, so far so good.
Now, one day while building this feature, a question appeared. What happens if a kid, aged 13+ for this scenario, marks
all the spots closest to their home as their favorite spots. That could link their user account directly to a real world location
and/or their whereabouts. Thus, very bad idea.
I thought, ok, no more favorite spots on profiles, that can also protect adults.

Couple months pass, I am currently building a training-session planning feature to plan trainings with trainings your friends.
The question is: how do you prevent adults from meeting children through your site, if you want this feature?
The best way I found is to make some features adult-only and using age-verification to ensure that.

If you want to plan a public training session, and have it be show to other users, you have to be 18+.
A teen, or unverified user should not be able to expose themselves to others on my site.
If you want to see other public sessions from adult users on PK Spot, same thing, you have to be an adult yourself.
We can't have teens or unverified users going to meet people they possibly don't know.
I will still allow everyone to create private sessions and invite their friends they already know.
I am against locking out users, and I'm doing my best to have all the features available to everyone without verifying,
but in my case, this is the line, where age verification becomes necessary.

The problem now becomes, how do we verify how old a person is?
In my mind, your phone already knows, so it should be able share a signal for an age range like: 13-15, 16-17, 18+, for example and
that way the app/website doesn't have to ever get the birthday.
Apple and Google are working on this, but it's not quite ready, and the API has to differentiate between it being user indicated or verified, for example through a credit card, mobile phone provider, e-banking provider, etc.
Don't get me wrong, I still think having to upload your documents for no apparent reason is against all the privacy principles I stand for.
However, there needs to be a way to actually protect kids by preventing them of using certain features.

I also don't like all the companies coming up that take your documents at behest of the developer.
I think it should be very optional to have to go this route, but my opinion has now changed from "this should never be needed" to "this is necessary from time to time", for some features.
Now I would just wish there would be more privacy-friendly ways to do it.
P.S.: And please don't tell me the Blockchain solves this, because someone has to still look at the documents to mint a block.
It does solve tampering with the decision, but not the privacy aspect.
