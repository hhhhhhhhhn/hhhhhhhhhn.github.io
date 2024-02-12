# Understanding RSA
RSA is a beautifully simple algorithm for asymmetric encryption,
which uses the properties of modular arithmetic to transmit small messages securely.
This article presents a possible thought process from which the algorithm could be derived,
based on some key mathematical facts.

> Note: This article requires some knowledge of modular arithmetic.

## A Small Overview
RSA is an asymmetric encryption algorithm,
which means that its goal is to create a message which is encrypted using one key,
but decrypted using a different one.
In practice, it is a way to ensure that a message is only received by a specific person.
To do this, the receiver of the messages creates a public encryption key,
which any person can use to send them a message,
and a decryption key,
which they keep private and is the only way to read the messages sent.

## The Key Insight
The starting point for the RSA algorithm is a simple fact derived from Euler's Theorem:
If you have a congruence `math m` (for message) in a modulo `math n`,
and they share no common factors, then there are infinitely many powers `math x` such that:

```math
m^x ≡ m " (mod n)"
```

For instance:

```math
1^25 ≡ 1 " (mod 35)"
```
```math
2^25 ≡ 2 " (mod 35)"
```
```math
3^25 ≡ 3 " (mod 35)"
```
```math
4^25 ≡ 4 " (mod 35)"
```

Basically, the entire exponentiation becomes a no-op.
This may not seem very useful, but if we rewrite `math x` as the product of two numbers,
let's say, `math x = e*d`, then, it must hold that:

```math
m^(e*d) ≡ m " (mod n)"
```
```math
(m^e)^d ≡ m " (mod n)"
```

Which, if you look at it, is exactly what we want.
Anyone with the encryption key `math e` can encode a message:

```math
"encrypted message" ≡ m^e " (mod n)"
```

And, from the encrypted message,
you can only recover the original one with the decryption key `math d`.

```math
("encrypted message")^d ≡ m " (mod n)"
```

This is the base of how the encryption scheme works.
We create public `math n` and `math e` values, which anyone can use to encrypt a message,
and we, and only we, can use our private key `math d` to decrypt it.
But now, we need to find a way of actually creating `math n`, `math e` and `math d`,
such that the original property holds, and more importantly,
such that it is not easily possible to derive the decryption key `math d` from the other variables,
which would defeat the whole point.

## Diving Deeper into Euler's Theorem
First of all, we must understand Euler's Theorem, the source of our key insight.
It states that for a congruence `math m` in a modulo `math n`,
with no common factors between `math m` and `math n`, it holds that:

```math
m^(φ(n)) ≡ 1 " (mod n)"
```

Where `math φ(n)` is Euler's totient function,
which requires finding the prime factors of `math n`, and is generally hard to compute.

This equation, in turn, means that multiplying anything by `math m^(φ(n))` has no effect (as it is congruent to 1),
and we can do it freely.
From this, we get that:

```math
m ≡ m*m^(φ(n)) ≡ m*m^(φ(n))*m^(φ(n)) ≡ m*m^(φ(n))*...*m^(φ(n)) ≡ m^(1+qφ(n)) " (mod n)"
```
```math
m^(qφ(n)+1) ≡ m " (mod n)"
```

Where `math q` is a whole number.

Now, if we set `math x = e*d = qφ(n)+1`, we have recreated the original property:

```math
m^x ≡ m^(e*d) ≡ m " (mod n)"
```

We have also greatly constrained the possible values of `math e` and `math d`,
with `math e*d = qφ(n)+1`.
This equation can be rewritten in a modular form:

```math
e*d ≡ 1 " (mod φ(n))"
```
```math
d ≡ e^(-1) " (mod φ(n))"
```

This establishes a clear relationship between `math e` and `math d`,
which can be further simplified by the fact that `math e` is supposed to be public,
which allows us to use a preset value (usually the prime `math 2^16+1`)
without worrying too much about security.
We then only need to make sure `math e` is coprime with `math φ(n)` for `math d` to exist (made easier by the primality of `math e`).
We have also gained an important requirement:
To compute `math d`, we basically only need to know `math φ(n)`.
This means `math φ(n)` should be kept private as well.
Then, finding `math d` from `math e` is just a multiplicative inverse,
which can be done using the Extended Euclidean Algorithm.

## Euler's Totient Function
To complete the algorithm, we need to actually compute `math φ(n)`.
For our purposes, it necessary to know that the totient function is computed
with all of `math n`'s unique prime factors `math p_1, p_2, ..., p_k`:

```math
φ(n) = n*(p_1-1)/p_1*(p_2-1)/p_2*...*(p_k-1)/p_k
```

For example, `math φ(12) = 12*(1/2)*(2/3) = 4`,
because the unique prime factors of `math 12` are `math 2` and `math 3`.
Computationally, this means that finding `math φ(n)` requires factoring `math n`,
which is a famously hard problem to do efficiently with large numbers.
On one hand, this means that people will not be able to easily compute
`math φ(n)`, and, by extension, `math d`, which is exactly what we want.
On the other hand, this also means we cannot either,
which makes the entire algorithm unworkable.

The solution is to backwards:
Instead of starting with an `math n` and factoring it,
we start with the prime factors and multiply them to compute `math n`.
The simplest non-trivial case for this is when `math n`
is a product of two primes `math n = p*q`. Then,

```math
φ(n) = φ(p*q) = p*q*(p-1)/p*(q-1)/q = (p-1)(q-1)
```

Now, if we generate two primes, computing `math n` and `math φ(n)` is trivial,
but, given `math n`, finding `math φ(n)` requires finding the factors
`math p` and `math q`, which for large enough numbers, becomes computationally unfeasible.
This is the last step to our puzzle, and we are ready to describe the algorithm in full.

## Putting It All Together
The first step in our algorithm is to generate two primes, `math p` and `math q`,
from which we can compute our `math n = p*q` and `math φ(n) = (p-1)(q-1)`.
We share `math n` with everyone, as part of our public key,
while keeping the other values private.

We then choose a value for our `math e`, usually `math e = 2^16+1`, and share it
as the final part of our public encryption key.
Then, using our private `math φ(n)`, we compute the private decryption key `math d ≡ e^(-1) " (mod φ(n))"`.
We have now finished the key generation, and it is time to send some messages.

Any person that knows both `math n` and `math e` can encrypt a message `math m`
with a simple exponential:

```math
"encrypted message" ≡ m^e " (mod n)"
```

This message cannot be decrypted by anyone, even the original sender,
without the private decryption key `math d`.
Since we know it, we can decrypt it just as easily as it was encrypted:

```math
m ≡ ("encrypted message")^d " (mod n)"
```

And thus, we have gotten back the original message,
without the possibility of snooping by third parties.

## Conclusion
In this article we have gone through the mathematical principles that allow the RSA algorithm to work,
alongside a possible process for going from these insights to an actual algorithm.
That said, there is still some more to it.
First of all, generating large primes is not trivial,
and requires the use of probabilistic primality tests, like [Miller-Rabin](https://en.wikipedia.org/wiki/Miller%E2%80%93Rabin_primality_test).
Similarly, the Extended Euclidean Algorithm is rather complex, at least conceptually.
There are also many possible optimizations, like replacing the totient function
with the [reduced totient function](https://en.wikipedia.org/wiki/Carmichael_function),
for which Euler's Theorem also holds.
Finally, it is very important to know that you must be very mindful about security with RSA,
as it is [extremely easy to shoot yourself in the foot](https://blog.trailofbits.com/2019/07/08/fuck-rsa/),
making the entire algorithm unsecure.
If you are not an expert, do not ever use a home-baked implementation of RSA for anything that actually needs to be secure.
That said, understanding and implementing RSA is a fun and relatively easy project,
and trying to improve its speed an security is a great learning experience in math, programming, and cryptography.

Tags: Math, Programming
Tue Feb  6 03:31:19 PM -03 2024
