---
title: GPT-6 Astra is crazy good at CAD and simulation
description: I got stuck building a custom drone in CAD. With GPT-6 Astra, I got the CAD working and took it into simulation.
kind: note
draft: false
featured: 1
published: 2026-09-13
---

For [[projects/aviz|Project Aviz]], my tilt-rotor quadcopter project, I picked up Autodesk Fusion and imported the open-source frame and parts I was using. Then I followed random tutorials to put together this very, very early CAD model of Aviz Mk1:

![Early CAD model of Aviz Mk1](/images/projects/aviz-mk1.png)

The only custom part at this stage was an angle bracket intended to connect each motor to its tilting servo. The next step was to define the joints and relationships between the parts, then export a URDF (a robot description file) to test a first controller in Gazebo.

I got quite far, but somewhere in the process of mirroring and linking parts I just got lost. Then I didn't pick it up again for a couple of months.

When the [GPT-6 Astra introduction video](https://www.youtube.com/watch?v=1QNsdr-Qx_I) dropped, I was stunned by its capabilities in Blender. Its CAD benchmark results also caught my attention.

I dropped into Codex and asked it to fix what I had started. And it did. Then I asked it to generate a URDF and get it running in simulation. And it did. My weekly usage limit was about to reset, so I kept going.

After some back and forth, I ended up with the model predictive controller (MPC) I wanted. That ugly CAD model I had started and Astra helped fix was now doing a full, slow cartwheel in simulation.

I will let it speak for itself.

<figure>
  <video controls playsinline preload="metadata" width="2560" height="1440" aria-label="Aviz Mk1 performing a cartwheel in simulation">
    <source src="/videos/aviz-simulated-cartwheel.mp4" type="video/mp4" />
    <a href="/videos/aviz-simulated-cartwheel.mp4">Download the simulation video</a>.
  </video>
  <figcaption>Aviz Mk1 performing a cartwheel in simulation.</figcaption>
</figure>

Mind you, this is fully simulated, but not all aerodynamic effects are modeled. The simulation does account for the changing center of mass, the defined servo limits and the motor thrust curves.
The controller receives a target attitude and rotation, then determines how to reach them by adjusting each rotor’s tilt and thrust.

This took iteration, and a simulated cartwheel doesn't tell me how the real drone will fly. But getting a project I had left sitting into a working simulation feels like a big step forward. I'm excited to see how much further I can take it.
