# The Loss of User Control and UserScripts
One of the defining characteristics of the modern internet is the loss of control users have over their experience.
Companies, thirsting for tech-hype-cycle money keep pushing unsolicited AI features,
as the best engineers in the world work on perfecting their ways of keeping people hooked to their platforms,
against their will, and [even against their well-being](https://www.bbc.com/news/technology-58570353).
Even the small things,
like having a feed with only the things you *chose* to subscribe to,
can't be taken for granted anymore,
as some platforms now include suggested posts in them.

We have, in general, become way more complaisant with platforms catering
every single part of our internet experience,
in ways that are, more often than not, a net negative to our lives.
It is likely that you have found yourself scrolling through one of your feeds mindlessly,
only to find out three hours passed,
and you have no time left in your day.
Or, even worse, taking a look back over a year and noticing how many of the hours
you have spent on your phone could have been better used
on more entertaining or fulfilling tasks.

This article will focus on UserScripts as a tool for *conscious computing*,
that is, removing the elements of the programs you use that exploit your subconscious brain
for outcomes your conscious brain doesn't want.
This can be achieved by taking control what your computer or phone does,
instead of relying on what companies want them to do.
We'll go through some examples on what you can do,
how to get started on your computer and phone,
and the general workflow of writing your own UserScripts.

Finally, although UserScripts are a great choice,
this should not stop you from considering alternative.
In fact, if this article convinced you only to do one thing,
I would prefer it to be to try the [Unhook](https://unhook.app/)
and [IGPlus](https://github.com/gerwld/igplus-extension) extensions.

## UserScripts
A UserScript is, in essence,
just a custom JavaScript snippet that you add to your browser.
It is basically a stripped-down version of a browser extension.
But it surely does not feel that way.
What they really are is an easy way to control your web experience.
Tired of AI overviews?

```javascript
onDomChange(() => {
  removeElement(document.querySelector(".YNk70c.EjQTId"))
})
```

They are no more.

Once you learn the general flow of writing UserScripts,
it is trivial to write a new one,
often taking less than a minute for simple things,
and something like a half-hour to completely change how you interact with a website.
Once used to it, you begin to remember that it is *your* computer,
and as such, it does what *you* want.
If you find yourself watching Reels,
and you do not want it,
but you need Instagram to talk to your friends,
just tell your computer not to show them to you.
That is the whole point of computers,
they do what you tell them,
despite companies trying to jam themselves in the middle.

Getting started is quite easy, actually.
Just install [ViolentMonkey](https://violentmonkey.github.io/)
on your preferred browser (See below for how to install them on your phone),
and browse [Greasy Fork](https://greasyfork.org/) for UserScripts that match your needs.
Take the time to read the code, most of them are under a screen in size,
and are quite informative for writing your own.

UserScripts have two parts: A metadata header,
and the actual code.
For example, the complete UserScript for removing the AI overview looks like this:

```javascript
// ==UserScript==
// @name        Remove AI Overview
// @match       https://www.google.com/search*
// @require     https://github.com/hhhhhhhhhn/tamper/raw/refs/heads/dev/lib.js
// ==/UserScript==

onDomChange(() => {
  removeElement(document.querySelector(".YNk70c.EjQTId"))
})
```

This metadata header includes the name,
a pattern saying that it should only run on the google search website,
and a dependency (in this case, a small library I built which has the `onDomChange` and `removeElement` functions).
You can always read more on the excellent [ViolentMonkey documentation](https://violentmonkey.github.io/api/matching/),
in which you will also learn about some extra APIs UserScripts give you,
allowing you, for example, to use UserScript-specific key-value storage,
or to make custom requests, sidestepping CORS hell.
You are now ready to start taking back control of your web experience!

## Using them on your phone
Despite most people using UserScripts primarily for desktop browsing,
the have had a lot more impact on my life on my phone.
Phones have a worrying amount of influence over our behaviours,
and we have become used to them constantly demanding our attention,
against our will.

Since learning about UserScripts,
my relationship to my phone has changed dramatically,
and I have been able to correct harmful habits almost painlessly,
whereas previous attempts, based on willpower,
left me only with shame of my inability to change my own behaviour.
I now understand that shame to be ridiculous,
it is only natural that you find yourself helplessly hooked to those applications,
as they are carefully engineered to exploit your brain's natural weaknesses for attention.
The trick to overcoming this is changing the application's behaviour,
carefully engineering them to foster a healthier interaction.

To get started,
download either the [Kiwi Browser](https://play.google.com/store/apps/details?id=com.kiwibrowser.browser) on Android,
or the [Orion Browser](https://apps.apple.com/us/app/orion-browser-by-kagi/id1484498200) on IOS.
They both allow for web extensions,
so you can download ViolentMonkey on them.
Kiwi Browser is now unmaintained,
unfortunately, but you can still download it,
and it'll probably still be good for a couple more years.
Hopefully we'll have an alternative by then.

Then, simply uninstall problematic apps,
and add their respective webapps to your homescreen using your browser.
You have now replaced the apps with slightly worse versions of themselves.
But, crucially, they are versions *you have total control over*,
so you can change them as you wish.

## Some Tips
### Using UserScripts effectively
I think the best way of using UserScripts is by leveraging them as a tool to stop mindless actions.
Most of the time you click on a recommended video,
you don't really consciously choose to watch more content,
it's just your half-asleep brain noticing a nicely tailored distraction,
and your fingers executing a movement their muscle memory knows too well.
When I removed recommended feeds,
I noticed that I sought out much less content,
only to realize that I was never actually seeking what I used to consume.

It is also important to be realistic.
I found out that I was more addicted to the platforms I used than I thought,
to the point that I found ways to rationalize disabling the UserScripts and extensions I was using.
But, I had learned my lessons, and instead of blaming myself,
I just learned to take it more slowly.
For example, instead of disabling Instagram feeds entirely,
I just imposed a scroll limit,
which still had a positive, albeit smaller effect.
But, more importantly, it was a strategy I stuck with.
I found myself sometimes reaching the bottom of my artificially limited feed and then *putting the phone down*,
with the carefully engineered engagement loop interrupted just long enough for my brain wake up for a second.
A couple months later,
when my brain was slightly less rotted,
I tried disabling recommendations again,
this time with much more success.

It took over a year to completely change the way I used platforms,
but by taking small steps and not blaming myself I made progress I wouldn't have made otherwise.

You may object to disabling recommendations,
as they do sometimes show good stuff.
In reality, I think automatic recommendations are a distraction from the much better
actual recommendations from actual people.
Try asking people for recommendations on things to read or watch or do.
You will notice that humans have a tendency of recommending things that they think
will improve the other person's life in some way or another.
Rarely will someone recommend you to scroll TikTok for an afternoon.

Also, it is important to consider how the changes you make affect your behaviour in unexpected ways.
For example, after removing YouTube recommendations using Unhook,
I made a UserScript that makes me solve a [24 puzzle](https://en.wikipedia.org/wiki/24_(puzzle))
at the start of every video.
I found myself naturally leaning more into longer videos to avoid this,
so I just changed the script to make me solve one every 10 minutes of video.
This, alongside a small habit of unsubscribing to one channel every time
I got more than 5 videos in my subscription feed in a day,
drastically decreased my total watch time to a fraction of what it was before.

Finally, it is necessary to give yourself immediate alternative things to do.
After all, if you put your phone down, only to get bored and pick it up again,
you didn't do yourself many favours.
I recommend having a book with you,
or a Kindle, which you can get used for cheap on eBay.
Or, have an instrument nearby on your room,
or another hobby, as long as it is immediately accesible
for when your mind is craving for something to do.

### Writing UserScripts
Modifying existing websites can be surprisingly different from writing new ones,
so there are some new patterns you should get used to.

In a UserScript you generally do three things:
- Watch for changes
- Find elements
- Modify them in some way

#### Watching for Changes
Most modern webapps are actually client-rendered multi-page applications,
which means you cannot simply modify the DOM once you receive it and be done,
as navigating does not actually trigger a reload on the browser.
Instead, you must constantly watch for changes.
The best way I have found to do this is to use the [Mutation Observer API](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver),
which watches for changes on the DOM.
Most of my userscripts are based on a simple function which looks like this:

```javascript
let domchangelisteners = []
function onDomChange(f) {
    document.addEventListener("DOMContentLoaded", f)
	domchangelisteners.push(f)
}

let observer = new MutationObserver(() => {
	domchangelisteners.forEach(f => f())
})
observer.observe(document.body, { attributes: true, childList: true, subtree: true })
```

You may also want to do something when the URL changes.
This turns out to be surprisingly difficult,
as typical techniques like using the `navigate` event don't work.
The best way I have found of doing it is using the same Mutation Observer,
which, admittedly, is a bit hacky,
but it gets the job done.
I also only consider the path and query of the URL,
because most of the time hash changes don't correspond to different pages.


```javascript
let domchangelisteners = []
let urlchangelisteners = []

function onDomChange(f) {
	document.addEventListener("DOMContentLoaded", f)
	domchangelisteners.push(f)
}

function onUrlChange(f) {
	urlchangelisteners.push(f)
}

let url = location.pathname + location.search
let observer = new MutationObserver(() => {
	if (location.pathname + location.search != url) {
		url = location.pathname + location.search
		urlchangelisteners.forEach(f => f())
	}
	domchangelisteners.forEach(f => f())
})
observer.observe(document.body, { attributes: true, childList: true, subtree: true })
```

The general workflow, then,
is to create a callback on the Mutation Observer
which looks for certain elements, and modifies them as needed.

**A note on performance:** This approach may seem a bit inefficient,
as we are searching globally with every local change,
instead of actually looking at what actually changed.
Furthermore, you generally want to modify the DOM when something,
which causes the Mutation Observer to fire again,
possibly causing in infinite loop.
In my experience, this does not actually cause any problems.
You do have to make sure your operations are idempotent,
as to prevent infinite loops,
but apart from that,
I could not perceive any performance difference
with or without the UserScripts running.
An that is with a six-year-old entry-level phone,
so you'll probably be fine.

#### Finding Elements
Finding elements for UserScripts is similar to finding elements for normal web development,
with a few differences.
Most of the time, you just need to inspect element of the relevant element,
and use its CSS classes to find it using `document.querySelector` (or `document.querySelectorAll`, if multiple).

```javascript
[...document.querySelectorAll(".left-sidebar .js-pinned-left-sidebar .ps-relative")].forEach(anAction)
```

These functions work using CSS selectors, which make them quite easy to use.
The `querySelectorAll` function doesn't return an array,
so you have to create one using the spread operator to use array methods.

Some websites (like Google search) don't use semantic CSS class names,
so class names look like a random string:

```javascript
document.querySelector(".YNk70c.EjQTId")
```

You would think this means that they change constantly
and that you should try another method,
but in my experience,
especially on websites not updated that frequently,
they don't really change that much.
Instagram's webapp hasn't changed the class names
in at least six months,
and even if they do,
the fix is trivial.

Sadly, not all websites are like this,
and some make it hard to tamper (intentionally or not)
by regularly changing the class names.

Fortunately, all things must eventually be displayed to the user,
so in the worst case scenario you can still find elements by the text they display.
You can do so manually, by iterating over all elements of a certain type,
or you can use `document.evaluate`, which is like a more powerful `document.querySelector`
that uses XPath to find elements more effectively.
For example, if you want to find all `<p>` elements containing the word "Suggested",
you would do:

```javascript
let iterator = document.evaluate("//p[contains(text(),'Suggested')]", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE)
while((node = iterator.iterateNext()) != null) {
    anAction(node)
}
```

The power of this function you pay in its awful semantics.
This function acts like 5 different functions, with different return types,
depending on the arguments you give it,
and not only does it not return an array (understandable, as it allows it to be lazy),
but it doesn't even return a standard iterator,
so you can't use the spread operator on it.
But, when everything else fails,
`document.evaluate` is generally the answer (and you can always write a wrapper for it).

Also, it is sometimes easier to find an element by its children,
and in that case, having found your `element`,
you can always just use `element.parentElement.parentElement.parentElement`
and so on.
It can be useful to have a `nthParent(element, 3)` helper for particularly tricky websites.
Other properties like `element.nextSibling` and `element.previousSibling` can also be helpful.

With the elements selected, it is now time to modify them.

#### Modifying and Removing Elements
This part the most similar to regular WebDev,
but there are still some things to consider.
Changing an element's style can be done the `element.style` object.
For example, before actually doing anything with a query,
I generally verify I have selected all the elements correctly by setting
their color to red:

```javascript
[...document.querySelectorAll(someQuery)].filter(filterFunc).forEach(e => e.style.backgroundColor = "red")
```

The most common operation is to remove elements,
which can be done in different ways.

Firstly, you can just straight up remove it from the DOM:

```javascript
function removeElement(element) {
    element.parentElement.removeChild(element)
}
```

You have to do this from the parent element, for some reason,
but apart from that, it is quite simple.
Sometimes, websites detect this and complain,
or just break, so you have to try other methods.
For example, you can just stop displaying it.

```javascript
function undisplayElement(element) {
    element.style.display = "none"
}
```

This is functionally equivalent to the last example,
but the element stays in the DOM.
Sadly, some websites (like Instagram) also detect this,
so there is a third way, by setting its opacity to a low value.

```javascript
function hideElement(element) {
    element.style.opacity = 0.01
}
```

This is not the same as the other two,
because it leaves a gap where the element should be,
but I have yet to find a website that detects this.

## Next Steps
Although most of the computing done today is done through a web browser,
the same idea can be applied to different programs.
I have recently changed my phone to use the excellent [CCLauncher](https://github.com/mlm-games/cclauncher),
which you can configure not to list your apps,
replacing your homescreen with a black screen from which you can open apps by typing their name.
This has the consequence of only allowing you to open apps that you were intending to open,
which is less common than you would think.

I have also enjoyed reading some people's blogs, exploring websites on [neocities](https://neocities.org/),
and I've also started using IRC, which has been fun.
The internet is much more fun without constant manipulation of platforms trying to extract profit.
Who would have guessed.

Tags: Programming
Wed Jul 23 01:25:30 PM -04 2025
