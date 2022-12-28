# A Reflection on Vim-like Text Editors
As a programmer, choosing the right text editor is crucial
since you may spend several hours a day working in it.
With so many options available,
Vim-like text editors have gained a special reputation among enthusiasts.
In this reflection,
I would like to consider how these editors hold up to scrutiny
and whether they still deserve their high status.

## A Brief History of Vim
Before delving into comparison,
it is worth taking a brief look into the history of these editors.
The story of Vim, like many others, begins with ed.
ed is a command-line text editor released in 1969
as part of the Unix operating system.
It uses two modes:
a command mode, for entering commands,
and an input mode, for writing the actual text.
A typical session in ed may look something like this:

[![ed asciicast](https://asciinema.org/a/ElikIvoSsBcUH6cAo8qbgMamG.svg){.medium}](https://asciinema.org/a/ElikIvoSsBcUH6cAo8qbgMamG){.invert-filter}

Following this release, in 1976, an extended version of ed was published, called ex.
One of the key new features it included was a new mode, called visual mode,
accessible through the `vi` command.
This mode allowed you to get a live preview of the changes you were making,
improving on the command-line-only interface of ed.
The modal text editor experience was changing dramatically:

[![ex/vi asciicast](https://asciinema.org/a/hvgTlMfyeSj4ET4Lrm2tbWzbG.svg){.medium}](https://asciinema.org/a/hvgTlMfyeSj4ET4Lrm2tbWzbG){.invert-filter}

Vim was originally released in 1991 as a clone of vi for the Amiga,
standing for "Vi IMitation".
But, as new features were added over time,
the meaning of its name changed to "Vi IMproved" in 1993.
In comparison to vi, Vim added several features in the 90s, including:
- a mode for selecting,
- a multi-level undo system,
- a command line history,
- some auto completion features,
- a configuration/extension language, and
- a simple GUI.

Today, Vim is still one of the most popular text editors,
despite its antiquated interface.
It has inspired many other editors,
like its most famous fork, Neovim,
and its community has created Vim plugins for virtually all development environments.
It was my exposure to these plugins that introduced me
to the world of modal text editors.

## My Experience With Vim
I first learned of Vim looking for a solution to
wrist pain I developed during an intense season of programming.
I installed the [Vim plugin for VSCode](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim)
and spent around an hour learning how to use it.
I noticed an improvement in my wrist pain and continued using it,
changing some keymaps and exploring what I could configure.
Wanting to tweak and create more advanced shortcuts,
I soon noticed that the plugin was not going to cut it[1](#vscode-vim){.footnote},
so, one afternoon, I installed Vim for Windows and started using the built-in GUI.

Admittedly, I would not get serious with Vim until I switched to Linux
and got comfortable with using the command line.
I took the time to polish my `.vimrc`
and learn the advanced movement options and commands.
Eventually, I heard about this new version called Neovim
and made the switch, which is what I am still using today.
After using Vim and Neovim for many hours,
I have formed an opinion of this type of editor.

## What Vim[2](#vim-not){.footnote} Excels At
Let us start with the good parts.
There are 3 aspects of the Vim family that I want to highlight,
which I believe are the reason they have gained the popularity they have.

### Ergonomics
Vim is a keyboard-first editor,
in which you do not usually touch your mouse.
And this is not because mouse support is lacking,
but because everything you can do with a mouse in your editor
can be done faster and easier with the keyboard in Vim.
Your fingers can stay in the home row[3](#home-row){.footnote}
and your wrist can stay in place,
removing all the unnecessary movement and mousing that occurs during programming,
especially on large projects.

But Vim is more than just physically ergonomic;
it is mentally ergonomic as well.
After familiarizing yourself with the building blocks of Vim
– modes, movements, commands, and registers –
using it becomes as intuitive as language.
This is because Vim just makes sense.
If you want to delete three words, you type `d3w`.
If you want to change what is inside the brackets,
you enter `ci{`.
The basic vocabulary is consistent and powerful enough for most editing tasks,
and it is laid out in a keypress-friendly manner.
Despite what people usually say,
Vim is extremely intuitive.
You can even get around just by learning how to quit[\[insert joke\]](https://stackoverflow.blog/2017/05/23/stack-overflow-helping-one-million-developers-exit-vim/){.footnote},
how to move with `hjkl`, and how to use `i` and `Esc` to enter and leave insert mode.

### Speed
Vim is extremely fast.
Common edits, such as deleting lines or changing blocks of text,
can be done with just a few keystrokes
and without the time it takes to reach for a mouse.
The [built-in tutorial speedruns](https://clips.twitch.tv/LittlePlainMarrowTinyFace)
are a non-practical showcase of this agility.
Nevertheless, when actually programming,
the speed is nothing but practical.
It halves the time between thinking of a change and actually making it in the code,
saving precious minutes every time you use it.
Vim makes your mind the bottleneck, not the editor.

Vim is also fast as a program.
There is no start-up time
nor an elaborate welcome screen;
you enter the command in your terminal,
and the file is immediately displayed on your screen,
ready for editing.
Instead of linking to websites when asking for help,
Vim has compact yet readable documentation built in
and accessible using the `:help` command.
Compared to text editors like VSCode and Atom (now discontinued),
Vim cuts out most of the unnecessary distractions that get in the way of coding.
Vim-like editors are the only ones I know that truly respect your time.

### Extensibility
No editor is perfect,
but it does not make sense switching every time a new editor
makes a small improvement over the previous one.
This is why people tend to stick with one editor for long periods of time.
Vim is designed with this in mind.
You can add functionality to Vim without waiting for a new version to be released.
For example, LSP code autocompletion (which seems basic)
is not a built-in feature[4](#nvim-lsp){.footnote}
but is usually done through plugins.
You do not need to wait for the developers to add something to the editor
because, most likely, someone will have written a plugin for it.
Or, you can do it yourself.
Vim can be anything you want it to be,
if you are willing to configure it.
This also prevents the base installation from being unnecessarily bloated,
as feature creep is something you do to yourself
and not something the maintainers do to everyone.

## What is Missing
That being said, there are certain things Vim lacks.
Some of them are just minor polish that needs to be added,
but others are simply part of the design.
One thing that comes to mind is the lack of visual feedback
when performing certain operations,
especially in multi-line ones.
Generally, you would try to do the operation in visual block mode,
but this only works if the text is aligned.
Otherwise, you can only use macros or the `:norm` command,
for which you only get feedback after finishing the whole edit.

Also, while the extensibility is notable, it is not very developer-friendly,
starting with the decision to create an obscure programming language specifically for Vim.
VimScript is an extra thing you need to learn.
It is not a bad scripting language,
but it is completely unnecessary.
Neovim fixed this by switching to Lua,
which is one of the reasons I use it.
Lua is much better at this use case than a domain-specific language,
and it shows in the significant growth of the plugin ecosystem
since Neovim made the switch.
But still, even with Lua, it is not easy to access low-level details using the API,
such as the renderer[5](#nvim-renderer){.footnote},
so if you want to implement changes at this level,
you have to either fork and edit the C code (which is huge and complex)
or write your own frontend for the server.

## What Has Been Done
Several projects have tried to build on Vim,
among which Kakoune and Helix stand out.
They both focus on the visual feedback issue
and adding new, fast commands,
while addressing some of the quirks inherent in Vim's design.
They are both easier to learn than Vim
and more cohesive in their language and features.
The main addition in both editors are multiple cursors,
which make multi-line operations fast and extremely intuitive,
providing instant feedback for the change made on each line.
However, they both have their own pitfalls that prevent
them from truly being the next big editor.

Kakoune, for some reason, relies heavily on modifier keys
for most of its selection operations,
losing most of the ergonomic quality.
It also has more keymaps to do the same things.
For example, instead of having a visual mode,
Kakoune has different keymaps for moving the cursors and extending them
(generally the lowercase and uppercase variants of each key).
The same happens with the multiple cursors,
for which a yet another variant of keymaps is needed.
Helix is *heavily* inspired by Kakoune,
so it inherits the most of its keyboard shortcuts
and the issues that come with them.

Nonetheless, the most glaring issue both editors have is their lack of good extensibility.
Kakoune followed Vim's lead and created its own cryptic scripting system,
while Helix, at least for now, simply does not have anything more than a TOML config.
I do not want to have a rigid text editor,
but I also do not want to learn another domain-specific language
just to learn that I cannot change some low-level details of the code.
This is what I hoped editors would improve upon,
yet the new ones only seem to get worse.

This experience with new editors made me think about what my ideal text editor would be.
I think it needs to be Vim-like, but
- with multiple cursors (like Kakoune),
- written in a modern programming language (like Helix),
- configurable directly in the source code (like suckless software),
- modular with easy-to-replace parts, and
- minimal, with a maximum of a few thousand lines of code.

I believe we are heading in the right direction,
but there is still a long way to go.

## wr: A Proof of Concept
A few months ago,
I started working on a small proof-of-concept text editor,
which I called [wr](https://github.com/hhhhhhhhhn/wr).
I worked on and off on it for a few months until
I got the basic functionality figured out
before leaving it more or less abandoned due to time constraints.
Still, I think it does show how a better text editor can be designed
not only from a UX standpoint
but also from a code architecture standpoint.

Here are some of the highlights:

- It is designed around the basic Vim keybinds.
- It has multiple cursor support,
  but instead of using special keybinds,
  the visual-block mode is replaced by a new mode
  that adds a new cursor instead of moving.
  For example, to add two new cursors down below where you are,
  you would press `<C-v>jj<Esc>`.
- It includes a simple and extensible command system.
- It is written in Go,
  making it easy to program and extend,
  with a quick compilation time of less than half a second.
- It is fast, with instant startup and the ability to perform
  multi-line edits on thousands of lines at a time.
- It is programmed in a functional, modular, and readable style,
  which takes advantage of Go's type system.
  For example, movements are simply functions
  that return a new position from the old one.
  Core components, like the buffer, are hot-swappable
  by implementing the basic interface.
- It uses immutable data structures,
  allowing for a fast and memory-efficient undo tree.
- It has tests for every component,
  which are consistent due to the functional style.
  Also, it is really easy to profile.
- It has just over 1500 lines of code,
  which are neatly divided into different modules.

Here is a quick demo of its usage:

<video alt="wr demo" class="invert-filter" autoplay muted loop>
  <source src="./assets/reflection-text-editor/wr.webm" type="video/webm">
</video>

That being said, there are a few design issues that came up during development.
For example, the code was unnecessarily complicated because I wanted proper
wide character support, aligning cursors vertically by column and not by character.
In hindsight, this was a huge mistake,
because most edits are character-based,
so you needed constant translation between the two for no good reason.
Also, before deciding it would be functional,
I, for some reason, thought it would be a good idea to make
each edit implement its own undo function.
The code was made much simpler after delegating the history to the buffer.
There is also a lot of functionality missing,
including more movements and commands.
I might continue working on wr during the summer if I have the time,
but I think it has already taught me valuable lessons in
text editor architecture, design, and implementation,
and helped me better appreciate the existing text editors.

## Conclusion
Vim-like text editors:
- Come from a long tradition of text editors, like ed and ex/vi.
- Have a lot of amazing benefits, like
  - good ergonomics, both physical and mental,
  - blazing speed, as part of their design, and
  - extensibility, allowing you to make them your own.
- Still, they lack
  - visual feedback, especially in multi-line operations,
  - advanced and friendly configuration capabilities, and
  - the ability to change core features.
- Inspired a new generation of editors, like Kakoune and Helix,
  which are closer to the ideal text editor but are not quite there yet.
- Gave rise to my wr project, which was a good opportunity to test out new ideas like
  - a multi-cursor mode,
  - a functional and modular architecture, and
  - the suckless design philosophy.

## Footnotes
1. Now the plugin seems to have improved in that regard,
   so this story probably would not have happened
   a couple of years later. {#vscode-vim}

2. Everything from here forward applies to most Vim-likes as well,
   especially forks like Neovim. {#vim-not}

3. Only the Esc and Caps Lock keys are remapped,
   which you should do anyway.
   The Caps Lock key is rarely used,
   despite having one of the best positions on the keyboard. {#home-row}

4. Neovim added a built-in LSP implementation in v0.5,
   released in mid-2021.
   It still usually requires a plugin to configure
   because it is mostly an API by default. {#nvim-lsp}

5. I learned this when trying to write a plugin that would
   allow images to be rendered using the now-dead
   [Ueberzug](https://github.com/seebye/ueberzug) project.
   Neovim's API only allows changing the rendering line by line
   so it was impossible. {#nvim-renderer}

Tags: Programming, Opinion
Wed Dec 28 08:49:53 AM -03 2022
