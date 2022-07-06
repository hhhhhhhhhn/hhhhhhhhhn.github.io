# Projects

## wr

A work-in-progress simple vim-like text editor,
with multiple cursors as its base concept.
It is written from scratch in Go,
using my custom [rope implementation](#rope)
and [curses alternative](#hexes).
Its goal is to be kept simple and customizable,
so it uses higher order functions to represent
both actions and movements.

It can be found is [here](https://github.com/hhhhhhhhhn/wr)


Technologies: Linux, Go, curses

## hexes

Simple curses alternative written from scratch in Go
using ANSI escape codes,
which includes both cursor optimizations and
an event system for keyboard and mouse inputs.

It includes a series of examples,
including Snake, Game of Life and an Image Viewer.

[Here](https://github.com/hhhhhhhhhn/hexeshttps://github.com/hhhhhhhhhn/hexeshttps://github.com/hhhhhhhhhn/hexes) is the code


Technologies: Go, curses

## This website

It shows all my projects,
and is made with some custom Node SSG.
Despite this, it does not use JavaScript!

The code is [here](https://github.com/hhhhhhhhhn/hhhhhhhhhn.github.io)


Technologies: JavaScript, Node JS, HTML + CSS, SSG

## mdgraph

A program which generates graphic organizers
from hierarchical markdown lists,
using parser combinators and graphviz.

The code is [here](https://github.com/hhhhhhhhhn/mdgraph)


Technologies: Lua, Parsing

## sent fork

A fork of suckless' text based presentation program,
with added command line flags,
and preprocessors to allow dynamic shell scripting
and code formatting.

The code is [here](https://github.com/hhhhhhhhhn/sent)


Technologies: C/C++, Linux, Shell/Bash/Zsh

## autoarch

An automated installer for Arch Linux,
with a simple TUI interface.
The main focus was on the extensibility and native support,
so it's written in POSIX compliant shell.

You can find the main part [here](https://github.com/hhhhhhhhhn/autoarch),
an LXDE example [here](https://github.com/hhhhhhhhhn/autoarchlxde)
and the ISO image creator [here](https://github.com/hhhhhhhhhn/autoarchiso)


Technologies: Linux, Shell/Bash/Zsh

## bbn

A simple shell script allowing to take
automatically timestamped notes at any time.

The main file is [here](https://github.com/hhhhhhhhhn/bbn/blob/master/bbn.sh)


Technologies: Linux, Shell/Bash/Zsh

## bitprint

A simple program which creates banners from the input
with bitmap fonts,
using Unicode block elements.

The code is found [here](https://github.com/hhhhhhhhhn/bitprint)


Technologies: Go, Linux

## boringbad

An electron app meant to trim long videos
to small highlights.

You can find it [here](https://github.com/hhhhhhhhhn/boringbad)


Technologies: JavaScript, Node JS, Electron

## bush

A simple templating program,
based on Shell scripts.
It is a simple tool for Static Site Generation.

Find it [here](https://github.com/hhhhhhhhhn/bush)


Technologies: Shell/Bash/Zsh, HTML + CSS, SSG

## Color Studio

A simple website made to test terminal colorschemes.
Find it [here](https://github.com/hhhhhhhhhn/color-studio)


Technologies: JavaScript, HTML + CSS

## .dotfiles

My personal collection of dotfiles,
configuration files for my linux system.
They are mainly focused in vim
and zsh (my preferred shell).

You can find them [here](https://github.com/hhhhhhhhhn/.dotfiles)


Technologies: Vim, Shell/Bash/Zsh, Linux

## Duono

A simple interface which includes a pomodoro timer,
scheduler and todo list, all divided into color-coded categories.
I still use it to this day.
It was built on a standard website with Vanilla JS.

The website is [here](https://hhhhhhhhhn.github.io/duono/),
and the code is [here](https://github.com/hhhhhhhhhn/duono)


Technologies: HTML + CSS, JavaScript

## dvtm build

My custom build of the dynamic virtual terminal manager,
which acts like an alternative to TMUX.
It is customized to look and feel like my [dwm build](dwm-build),
and work on [Termux](https://termux.com/) for android.

Find it [here](https://github.com/hhhhhhhhhn/dvtm)


Technologies: C/C++, Android, Shell/Bash/Zsh, Linux

## dwm build

A customized build of the dwm window manager,
including some patches from the suckless website
and some manual modifications,
like removing the bar,
and a workspace-like interface.

You can find it [here](https://github.com/hhhhhhhhhn/dwm)


Technologies: C/C++, Linux, Shell/Bash/Zsh

## Expressifier

A simple library that automates exposing a list of functions as an API.
It was made using Express.js

It can be found [here](https://github.com/hhhhhhhhhn/expressify)


Technologies: JavaScript, Node JS, Web Server, API

## gol

A simple game of life implementation in python.
Not much to say here.
The code is [here](https://github.com/hhhhhhhhhn/gol)


Technologies: Python

## Hooke

Second re-write of the open source plagiarism detection engine,
this time with an special enfasis on the cleaness of the code
and modularity.

Go was chosen because of its great speed and package system.

You can see the code [here](https://github.com/hhhhhhhhhn/hooke)


Technologies: Go, NLP

## Hooke Desktop

An electron frontend for [HookeJs](#hookejs)

You can find it [here](https://github.com/hhhhhhhhhn/HookeDesktop)


Technologies: Node JS, JavaScript, HTML + CSS, NLP, Electron

## HookeJs

Plagiarism detection engine with Node.
Also, if CORS is disabled,
it works on the browser.

You can see the code [here](https://github.com/hhhhhhhhhn/HookeJs)


Technologies: Node JS, JavaScript, NLP

## hookepl

Fourth version of the Hooke plagiarism detection system,
written in Prolog,
which allows some interesting symmetries.

You can find it [here](https://github.com/hhhhhhhhhn/hookepl)


Technologies: Prolog, NLP

## Hooke Website

Website frontend for HookeJs.
sadly, it only works with CORS unlocked.
Also, has a 5mb limit.

The website is [here](https://github.com/hhhhhhhhhn/HookeWebsite)


Technologies: JavaScript, HTML + CSS, NLP

## input

Shell-agnostic `read` alternative,
meant to help with the inconsitencies of
some shells with POSIX standards.
It also allows for using the arrow keys
and having script-specific history.

The repository is [here](https://github.com/hhhhhhhhhn/input)


Technologies: Linux, C/C++

## ItWorks

A simple Node unit testing library,
made to have a simpler syntax
and being able to access non-exported functions.

The code is [here](https://github.com/hhhhhhhhhn/itworks),
and the README has examples.


Technologies: JavaScript, Node JS

## Jailed fork

A simple fork of [Jailed](https://github.com/asvd/jailed),
changing the naming convention to stop using underscores,
for compatibility with github pages.

It is [here](https://github.com/hhhhhhhhhn/jailed)


Technologies: Node JS, JavaScript

## Game Jam

A simple platformer inspired by 80s command line games.
It uses Conway's Game of Life as the ground,
and is generally a very difficult game.
It was made in a day, so it's generally unpolished.

If you're up to the challenge, the game is [here](https://hhhhhhhhhn.github.io/jam/),
and the code is [here](https://github.com/hhhhhhhhhn/jam)


Technologies: HTML + CSS, JavaScript

## Journal

A markdown cli journal made with Node.
It was made to take a lot of small notes very quick,
and have them timestamped automatically.

[Here's](https://github.com/hhhhhhhhhn/journal) the repo.


Technologies: Node JS, JavaScript

## Mathdown

A markdown text editor,
mixing the powers of markdown-it
with the simplicity of the AsciiMath format,
to create a generally pleasant math typing experience.

The code is [here](https://github.com/hhhhhhhhhn/mathdown)


Technologies: HTML + CSS, JavaScript

## mds

A simple superset of markdown which
includes the ability to create interactive programs.

You can the code [here](https://github.com/hhhhhhhhhn/mds),
or see it in practice [here](https://hhhhhhhhhn.github.io/script-repo/)


Technologies: JavaScript, HTML + CSS

## mmd

Simple command line markdown parser and formatter.
It was the center piece of my last note-taking workflow
([bbn](./index.html#bbn) + [mmd](#mmd) + [mww](./index.html#bbn))

Here's the [repo](https://github.com/hhhhhhhhhn/mmd)


Technologies: Linux, Shell/Bash/Zsh, C/C++

## mmenu

A simple UNIX-like command, allowing users to select from different texts.
It uses ncurses, and is meant as an alternative to fzf and dmenu.

Find it [here](https://github.com/hhhhhhhhhn/mmenu)


Technologies: C/C++, curses, Shell/Bash/Zsh, Linux

## mva

A simple bulk rename utility,
meant as a simple unix-like command.

The code is [here](https://github.com/hhhhhhhhhn/mva)


Technologies: Go, Shell/Bash/Zsh

## mww

A simple UNIX-like command, allowing to word wrap text in long lines,
considering escape sequences, common in the output of many commands.

Find it [here](https://github.com/hhhhhhhhhn/mww)


Technologies: C/C++, Linux, Shell/Bash/Zsh

## openage Website Redesign

A redesign for the website of openage,
an open source engine for games like Age of Empires.
The new website includes simpler design and an animated website.

See the original fork [here](https://github.com/hhhhhhhhhn/openage-pr),
and the current version of the project [here](https://openage.sft.mx/)


Technologies: HTML + CSS

## Pandemiary

Simple game based on Pictionary.
It was made using PeerJs with Vanilla JS.

The code is [here](https://github.com/hhhhhhhhhn/virus)


Technologies: JavaScript, HTML + CSS, P2P

## parser

A parser combinator library for go,
with support for regular expressions.
It also has a test calculator-like language,
which can evaluate mathematical expressions.

The code is [here](https://github.com/hhhhhhhhhn/parser)


Technologies: Go, Parsing

## Peerroom

A small library on top of PeerJs,
made to allow a simple party system.
Find it [here](https://github.com/hhhhhhhhhn/peerroom)


Technologies: JavaScript, P2P

## pl

A simple UNIX-like program that prints between lines of the stardard input.
Meant to be a replacement for head | tail.

Find it [here](https://github.com/hhhhhhhhhn/pl)


Technologies: C/C++, Shell/Bash/Zsh, Linux

## proper

A Property Testing library written in Go,
using the built-in reflection features.
Properties are defined as functions
which must return true on randomly generated inputs.

[Here](https://github.com/hhhhhhhhhn/proper) is the repo


Technologies: Go

## rope

An implementation of a generic persistent rope data structure
using the new Go 1.18 generics.
It uses only nondestructive operations,
and allows fast insertion in long strings
with snapshots of every version.

The repository is [here](https://github.com/hhhhhhhhhn/rope)


Technologies: Go

## Routines

Exercise webapp built with Svelte,
with minimalistic design and an android port using CapacitorJs.

You can test it [here](https://hhhhhhhhhn.github.io/routine)
and see the code [on github](https://github.com/hhhhhhhhhn/routine)


Technologies: Svelte, JavaScript, HTML + CSS, Node JS, Android, CapacitorJS

## Shell Scripts

A collection of Shell scripts y use in all
my Linux installations.
These are way too many to explain here,
if you want to read more see the
[README](https://github.com/hhhhhhhhhn/shell_scripts#readme)


Technologies: Linux, Shell/Bash/Zsh

## Spot

A command line client for Spotify Web,
being controlled by a Selenium instance.
Was made to use Spotify without the mouse.

It is [here](https://github.com/hhhhhhhhhn/spot)


Technologies: Python, Selenium

## sssss

A small compiler which gives reactivity to simple
static sites with the power of javascript.


Technologies: HTML + CSS, JavaScript, Node JS

## st fork

Fork of the suckless st terminal,
which includes suport for a system similar to Plan9's plumb.

[Here](https://github.com/hhhhhhhhhn/st) is the code


Technologies: Linux, C/C++

## td

A minimalistic hierarchical todo list program,
written using go and ncurses.
It allows for the use of a unit of effort/time,
and partial completion with it.

The code is [here](https://github.com/hhhhhhhhhn/td)


Technologies: Go, curses

## Terminal Grid

A simple javascript library,
allowing to diplay graphics in a textarea,
in a terminal style.

It is [here](https://github.com/hhhhhhhhhn/terminalGrid)


Technologies: HTML + CSS, JavaScript

## termplot

A go package for generating graphs of arbitrary functions,
including comparisons.
It uses standard ANSI escape codes to display.

You can find it [here](https://github.com/hhhhhhhhhn/termplot)


Technologies: Go, Linux

## Timan

A program that manages and limits time on Windows apps.
It was built with Go, and it consists of a small
webserver which uses windows commands to manage
running applications.

You can find the code [here](https://github.com/hhhhhhhhhn/timan)


Technologies: Go, Web Server, Windows, HTML + CSS, JavaScript

## TNotes

A simple program form taking notes in the command line,
with simple one letter commands.

The repo is [here](https://github.com/hhhhhhhhhn/TNotes)


Technologies: Python, Shell/Bash/Zsh, Linux

## tw

A tool for writing with greater focus by only showing a handfull of characters,
and removing the ability to correct.
It is meant to be used in the terminal, and uses ncurses.

It can be found [here](https://github.com/hhhhhhhhhn/tw)


Technologies: C/C++, Shell/Bash/Zsh, curses, Linux

## Youtube Sync

A website that allows party watching videos,
using the Youtube iFrame API and Peer to Peer with Peer.js

The code is [here](https://github.com/hhhhhhhhhn/youtube-sync)


Technologies: HTML + CSS, JavaScript, P2P

## trandr

A simple TUI wrapper for xrandr,
made in go.

The code is [here](https://github.com/hhhhhhhhhn/trandr)


Technologies: Go, Linux, Shell/Bash/Zsh

