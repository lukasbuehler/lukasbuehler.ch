---
title: Project Aegis
description: Investigating whether an open-weight language model’s internal activations can predict deceptive goal pursuit before generation begins. In other words; can we tell by the internal state of an LLM, whether that will lead to an attempt to deceive the user.
kind: project
draft: false
featured: 3
topics: [AI safety, Machine learning]
status: Experimental
---


Project Aegis grew out of an idea I had in a lecture on proving software mathematically on barrier functions. They are mathematical functions used to show that a dynamical system will remain within a safe region of its state space. The thought was that maybe there is a way to learn if an
LLM stays within a certain barrier of it's embedding space, in which it is proven to not try
to deceive the user, or scheme.

Formally, the idea behind Project Aegis is to treat an open-weight language model’s internal activations as the state of a dynamical system and its autoregressive generation as a trajectory through latent space. The question is, could we learn a barrier function that identifies, immediately after the user’s prompt, whether that trajectory with the user prompt is likely to lead the LLM to a to deceptive goal pursuit?

This remains an experimental analogy rather than a formal safety guarantee. Language-model generation is stochastic, the relevant notion of scheming had to be defined operationally, and a learned boundary is not automatically a mathematically verified barrier certificate. Project Aegis is investigating whether those gaps can be narrowed.
