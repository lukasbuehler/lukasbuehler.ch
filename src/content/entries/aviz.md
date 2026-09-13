---
title: Project Aviz
description: Designing and simulating a quadcopter with four independently tilting motors, from mechanical layout to flight control.
kind: project
projectGroup: personal
draft: false
model: aviz-mk1
image:
  src: /images/projects/aviz-mk1.png
  alt: CAD rendering of Aviz Mk1 with four individually tilting rotor assemblies.
  caption: Aviz Mk1 CAD model. Mechanical design in progress.
topics: [Robotics, Mechanical design, Simulation]
status: CAD and simulation · Experimental prototype
---

Aviz is my personal aerial-robotics project: a challenge to design a tilt-rotor quadcopter from scratch. Its hardware design and project-specific software are being developed independently, separately from my academic work.

The first prototype, Aviz Mk1, is a 7-inch quadcopter whose four motors can individually tilt as well as spin. The aim is to take off and hover like a conventional quadcopter, then explore what directing the thrust can make possible for movement and control.

## From design to simulation

Before building and flying it, I’m developing the mechanical design in CAD and testing it in ROS 2 and Gazebo. The current work is translating the mechanical layout into a simulation model and validating basic hover and control before hardware integration.

The planned architecture gives a flight controller responsibility for safety-critical low-level control, with an NVIDIA Jetson intended for higher-level autonomy and advanced control algorithms.

This is an experimental learning and research prototype. Flight capabilities remain goals to validate through simulation and hardware testing.

The rough aircraft hardware budget is CHF 945, excluding a radio transmitter, charger, and workshop equipment.
