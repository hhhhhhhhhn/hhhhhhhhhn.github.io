# Rust is Nice
After putting it off for years,
I finally learned Rust.
Even though it has been the most loved programming language [since 2016](https://insights.stackoverflow.com/survey/2016#technology-most-loved-dreaded-and-wanted),
I still could not get over the complex-appearing syntax.
Luckily, I was planning on making a program in C and had a lot of free time,
so I decided to do it in a new programming language.
After quickly considering APL,
I noticed that it was probably the time to learn Rust.
Now I understand why people like it.

## The Good
To start, Rust is fast.
Like within-ten-percent-of-C fast.
I think this saves time in the long term,
because it prevents programmers from having to work around the language when optimising programs.
Writing Python is enjoyable,
but it is no coincidence that many of its libraries[1](#python-c){.footnote} are written partly in C.
To test it,
I rewrote the [𝑒 program](./approximating----in-6--programming-languages.html) in Rust.
To my surprise, it was somehow 7% faster than the C alternative (`gcc` with `-O3`),
even though it uses the same library (GMP) in the backend[2](#fast){.footnote}.

Moreover, it is safe.
But it is not safe by abstracting everything away.
It simply forbids you from doing anything unsafe.
This requires a cleverer compiler,
but it delivers a significant advantage in relation to other languages.
I have had many crashes in Go,
including ones I have needed hours of runtime to reproduce.
And it is arguably a higher level language.
With Rust crashing is something you do explicitly,
usually with the `unwrap()` function,
and it is always easily replaced with a safe alternative.
This is also noticeable in the lack of null,
which is an objectively great decision.

Thirdly, it is syntactically pretty decent.
Take, for example, the 𝑒 program:

```rust
use rug::Float;

fn e(k: i32) -> Float {
	let mut approx = Float::with_val(100_000, 1) + Float::with_val(100_000, -k).exp2();
    for _ in 0..k {
		approx.square_mut();
    }
    return approx
}

fn main() {
    println!("{}", e(10_000))
}
```

Is it the best?
No.
But it is good,
way better than most languages.
A bit noisy, but with lots to love,
including operator overloading,
built-in ranges,
and intuitive for loops.

This is coupled with some great features.
Coming from Go,
Rust's type system is refreshing.
It is simply a very clever language.
Its iterators make you feel powerful,
the `Option` and `Result` enums are extremely useful in conjunction with pattern matching,
using blocks as values is a great idea,
and the trait system makes object hierarchies look antiquated.
Take a look at this accelerated gradient descent implementation:

```rust
pub fn gradient_descent_acc<const N: usize>(f: fn([f64; N]) -> f64, rate: f64, decay: f64) -> [f64; N] {
    let mut guess: [f64; N] = [0.0; N];
    let mut accelaration: [f64; N] = [0.0; N];

    for _ in 0..1000 {
        let image = f(guess);

        accelaration = accelaration.iter()
            .enumerate()
            .map(|(i, a)| {a*decay - rate*calculate_gradient(f, guess, image, i)})
            .collect_array();

        guess = guess.iter()
            .zip(accelaration.iter())
            .map(|(n, a)| n + a)
            .collect_array();

        if accelaration.iter().map(|x| x.abs()).sum::<f64>() < GOOD_ENOUGH {
            break
        }
    }
    return guess;
}
```
[(Go comparison)](#go-comparison)

First of all, the implementation is tiny.
Notice the constant generics, which allow for fixed-size arrays.
Also, the `map`s and `collect`s,
which allow operating in lists without lengthy for loops.
This is what most imperative languages are missing.
Lambdas are written simply with vertical bars,
which is way better than Go's `func(...) {...}` nonsense.

Finally,
an appreciation for Rust macros.
Metaprogramming is something you usually miss outside of Lisp.
Macros allow for complex new functionality.
But it is not there where you notice it the most.
Small things, like the `todo!()` macro,
which lets you test out ideas without a valid function return,
are huge time savers.
Rust is filled with those small things,
starting with helpful compiler errors.
I originally thought I was going to be slower with Rust.
The price for performance and safety, I thought.
In reality, I am faster.
Noticeably faster.

## The Bad
Then again, Rust is not perfect.
To start, it is verbose.
I understand that being explicit is necessary,
but sometimes it is excessive.
It was painfully obvious when reading about lifetimes.
Read this part of ["the book"](https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html):

> ```rust
> fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
>     if x.len() > y.len() {
>         x
>     } else {
>         y
>     }
> }
> ```
>
> *The function signature now tells Rust that for some lifetime `'a`,
> the function takes two parameters,
> both of which are string slices that live at least as long as lifetime `'a`.
> The function signature also tells Rust that the string slice returned from the function
> will live at least as long as lifetime `'a`.
> In practice, it means that the lifetime of the reference returned by the longest function
> is the same as the smaller of the lifetimes of the references passed in.
> These relationships are what we want Rust to use when analyzing this code.*

In essence, the parameters must live for as long as the return does.
Was it really necessary to spell that out?
It is evident.
I think, with the time the Rust compiler takes, it should be able to infer that.
This kind of verbosity is littered throughout the language.
And I thought we were past semicolons[4](#semicolon){.footnote}.

The compilation time is hard to ignore,
especially on older hardware.
I am used to Go's instant runtime,
and waiting an extra second seems alienating.
Even harder is installing a big project,
which can take tens of minutes.
Cargo seems to have the same dependency sprawl that npm has,
making it not only slower,
but also vulnerable to supply chain attacks
(most recently, [CrateDepression](https://www.sentinelone.com/labs/cratedepression-rust-supply-chain-attack-infects-cloud-ci-pipelines-with-go-malware/)).

Another thing I dislike is the rigid project structure.
For small projects, I enjoy having everything in the root directory.
Rust, or rather, Cargo, doesn't allow that.
You cannot create programs with dependencies without adhering to the
`src/` folder convention,
or compiling and linking everything manually.

And finally, the `String` vs. `&str` problem.
I understand allowing the use of a low-level construct,
but sometimes you just want to abstract some of that away.
You can not really write a program with strings without using both,
and I think that hurts usability.
Strings in general are weirdly designed,
like concatenation needing to manually clone the first string.

## Conclusions
- Rust is
  - fast,
  - safe,
  - clever, and
  - generally nice to use.
- But, Rust is also
  - sometimes too verbose,
  - slow to compile,
  - rigid in project structure, and
  - littered with quirks.
- Nevertheless, I really like it.

## Footnotes
1. For example, [numpy](https://github.com/numpy/numpy) is 35% C,
  [Tensorflow](https://github.com/tensorflow/tensorflow) is 62% C++,
  and [Python itself](https://github.com/python/cpython) is 32% C. {#python-c}

2. This is probably a problem with my C version
  rather than an improvement from Rust,
  but it is still faster than all the other programming I tested. {#fast}

3. Go version, without generic array size: {#go-comparison}
```go
func gradientDescentAcc(f func([]float64) float64, arguments int, rate float64, decay float64) []float64 {
	guess := make([]float64, arguments)
	accelaration := make([]float64, arguments)

	for i := 0; i < 1000; i++ {
		image := f(guess)

		for j := range accelaration {
			accelaration[j] = accelaration[j]*decay - rate*calculateGradient(f, guess, image, j)
		}

		for j := range guess {
			guess[j] = guess[j] + accelaration[j]
		}

		var total float64
		for _, acc := range accelaration {
			total += math.Abs(acc)
		}

		if total < GOOD_ENOUGH {
			break
		}
	}
	return guess
}
```

4. This is mostly a nitpick,
  but it is more noticeable on non-English keyboards.
  In the Latin American layout, the semicolon is next to the "M" key
  and needs Shift to be pressed. {#semicolon}

Tags: Programming, Opinion
Sat Jul 16 05:58:24 PM -04 2022
