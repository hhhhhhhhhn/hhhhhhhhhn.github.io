# Understanding Backpropagation with Simple Derivatives
Backpropagation is the backbone of deep learning,
responsible for the training phase of neural networks.
Despite its importance,
it is often left out of most explanations of neural networks
due to its complexity.
Many summaries of backpropagation
either assume a level of background knowledge that is unnecessary
for understanding the algorithm
or focus explicitly on implementation,
leaving a working program but no insight.

This article will explain backpropagation
using the bare minimum amount of knowledge required
—in this case, only basic derivatives—
and to an extent in which you can comfortably
implement your own neural networks.
For this, a few detours are needed,
starting with a refresher on neural networks.

## Neural Networks
The basic neural network structure consists of a series of layers
made up of multiple neurons.
Each neuron is connected to every neuron in the previous layer by a *weight*,
which represents the strength of the connection.
A small neural network may look something like this:

```!dot -Tsvg | base64 -w0
digraph math {
  bgcolor=transparent
	rankdir="LR"
	splines = false
	subgraph l0 {
		node [shape = "circle"]
		rank = "same"
		rankdir = "BT"
		x0 -> x1 [style="invis"]
		x0 [label = <x<sub>0</sub>>]
		x1 [label = <x<sub>1</sub>>]
	}
	subgraph l1 {
		node [shape = "circle"]
		rank = "same"
		rankdir = "BT"
		y0 -> y1 -> y2 [style="invis"]
		y0 [label = <y<sub>0</sub>>]
		y1 [label = <y<sub>1</sub>>]
		y2 [label = <y<sub>2</sub>>]
	}
	subgraph l2 {
		node [shape = "circle"]
		rank = "same"
		rankdir = "BT"
		z0 -> z1 [style="invis"]
		z0 [label = <z<sub>0</sub>>]
		z1 [label = <z<sub>1</sub>>]
	}
	{x0;x1} -> {y0;y1;y2} -> {z0;z1} [arrowsize=0.2, color = "#666666"]
}
!<img class="small" alt="Neural net" src="data:image/svg+xml;base64,{}">
```

The value of each neuron is calculated by adding up the
values of the previous layer's neurons multiplied with their respective weights,
plus an extra term called the *bias* (`math b`).
All of this is passed through an *activation function*
(generally written as `math sigma`)
giving us a final result.
For example, the value of `math z_0` can be calculated as:

```math
z_0 = sigma(w_0y_0 + w_1y_1 + w_2y_2 + b)
```

Where `math w_i` is the weight of the connection between `math z_0` and `math y_i`,
and `math b` is the bias of `math z_0`.

The activation function is there to make sure the neural network
is not just a big system of linear equations
by adding some extra complexity.
Popular examples include `math max(0, x)`, known as ReLU, and `math tanh(x)`.

To evaluate a neural network,
you simply set the first layer's neurons to the input
and then calculate the value of each neuron layer by layer
until the last one, which is the output.
This is called *forward propagation*.
The problem then becomes finding a set of weights and biases
that gives us the output we want.
To do this, we first need to define our needs explicitly
with a *loss function*.
A common goal for a network is to learn what to do
based on a set of examples;
that is, we know the correct results and want the network to replicate and extrapolate them.
This falls under *supervised learning*
and has the advantage of having an easy way of spelling out what we want.
We simply need to minimize the difference between the outputs we want and the outputs we get.
There are many functions to calculate this error,
one of the simplest being the *Mean Squared Error* (MSE, for short),
which is exactly what it sounds like:

```math
MSE = ((y_1 - hat y_1)^2 + (y_2 - hat y_2)^2 + ... + (y_n - hat y_n)^2)/n
```
```math
= 1/n sum_(i=1)^n (y_i - hat y_i)^2
```

Where `math hat y_i` is the expected output and `math y_i` is the real one.

For example, if we wanted the two outputs to be `math [-0.5, 1]`,
but we got `math [0, 0.5]`,
we would calculate the error in these steps:

```math
MSE = ((0 - (-0.5))^2 + (0.5 - 1)^2)/2
```
```math
= (0.25 + 0.25)/2
```
```math
= 0.25
```

Now, we can finally set our goal to finding a set of parameters
that minimizes the MSE.
To do this, we first need to look at the simplest case:
minimizing a function from a single parameter.
The simplest algorithm for this task is called *gradient descent*
and will be our starting point for machine learning.

## Gradient Descent
Gradient descent is an algorithm that helps you
find the minimum of a function with a small number of evaluations,
as long as you know the function's derivative.
To understand how it works,
consider the simple function `math f(x) = x^2`,
and how its slope changes depending on where you are.

```!gnuplot | base64 -w0
set term png size 1200, 400
set multiplot layout 1, 3

f(x) = x**2
df(x) = 2*x
tf(px, x) = df(px)*x + (f(px) - df(px)*px)

set xzeroaxis
set yzeroaxis
set xrange[-3:3]
set yrange[-1:5]

px = -1
plot f(x) lc black title "f(-1)", [px-0.5:px+0.5] tf(px, x) lc "#00ffff" lw 3 title "f'(-1)"

px = 1
plot f(x) lc black title "f(1)", [px-0.5:px+0.5] tf(px, x) lc "#00ffff" lw 3 title "f'(1)"

px = 0
plot f(x) lc black title "f(0)", [px-0.5:px+0.5] tf(px, x) lc "#00ffff" lw 3 title "f'(0)"

!<img class="large" alt="Function slopes" src="data:image/png;base64,{}">
```

If the minimum is to the left of the `math x` value,
the slope is positive.
If it is to its right, it is negative.
Finally, if the `math x` value is spot on,
the slope is just `math 0`.
This gives us reason to try subtracting the slope
from the `math x` value to get closer to the minimum.
This is the essence of gradient descent.
An extra factor, called the *learning rate* (`math alpha`),
is added to control the size of each step.
Each iteration of the algorithm looks like this:

```math
x larr x - alpha * f^'(x)
```

For example, starting with `math x = 1`
and using a learning of `math alpha = 0.3`,
we can minimize `math f(x) = x^2` using these calculations:

```math
x larr x - alpha * f^'(x)
```
```math
x larr 1 - 0.3 * f^'(1) = 0.4
```
```math
x larr 0.4 - 0.3 * f^'(0.4) = 0.16
```
```math
x larr 0.016 - 0.3 * f^'(0.16) = 0.064
```

As we can see, `math x` is slowly converging into the minimum of `math 0`.
We can get some more insight by visualizing the algorithm.
For example, this is how minimizing `math f(x) = x^3 + 3x^2` looks
with a small learning rate of `math 0.04`:

```!gnuplot | gifsicle -O1 | base64 -w0
set term gif size 400, 400 animate delay 8

f(x) = x**3 + 3*x**2
df(x) = 3*x**2 + 6*x
tf(px, x) = df(px)*x + (f(px) - df(px)*px)

set xzeroaxis
set yzeroaxis
set xrange[-5:5]
set yrange[-2:8]

px = -1.99

do for [t=0:50] {
	px = px - 0.04 * df(px)
	plot f(x) lc black title "f(x)", [px-0.5:px+0.5] tf(px, x) lc "#00ffff" lw 3 title "f'(x)"
}
!<img alt="Gradient descent animation" class="medium" src="data:image/gif;base64,{}">
```

There are two notable behaviors.
First, the steeper the slope, the faster the `math x` value moves.
Second, the algorithm does not actually converge to the minimum of the function
but rather the closest *local minimum*.
If the starting point was just an inch more negative,
the algorithm would just end up going to the left indefinitely.

Choosing the right learning rate is usually a process of trial and error.
The last example used an extremely small one to make the animation smoother,
making the convergence slow.
Nevertheless, you can overdo it,
as learning rates that are too high make the algorithm bounce back and forth.
For example, using `math alpha = 0.45` on the last example makes it behave erratically:

```!gnuplot | gifsicle -O1 | base64 -w0
set term gif size 400, 400 animate delay 32

f(x) = x**3 + 3*x**2
df(x) = 3*x**2 + 6*x
tf(px, x) = df(px)*x + (f(px) - df(px)*px)

set xzeroaxis
set yzeroaxis
set xrange[-5:5]
set yrange[-2:8]

px = -1.99

do for [t=0:50] {
	px = px - 0.45 * df(px)
	plot f(x) lc black title "f(x)", [px-0.5:px+0.5] tf(px, x) lc "#00ffff" lw 3 title "f'(x)"
}
!<img alt="Gradient descent with learning rate too high" class="medium" src="data:image/gif;base64,{}">
```

Now that we know how to minimize a function,
we can set our goal to minimizing our error.
The only thing we need is the derivative of the error `math E`
in terms of each parameter `math p`,
which we can write as `math (dE)/(dp)` for now.
Then, we can just update each parameter with gradient descent:

```math
p larr p - alpha(dE)/(dp)
```

This means we can reduce our problem to finding the derivative of the error
with respect to each parameter.
But, because our neural network has a large number of parameters
that affect each other in complex ways,
we first need to understand how derivatives
work with multiple variables.

## Derivatives with Multiple Variables
Consider the basic derivative,
where a function is defined in terms of one variable,
and we need to calculate its derivative.
For example:

```math
f(x) = x^3
```
```math
f^'(x) = 3x^2
```

First, we should stop using the function notation:

```math
y = x^3
```
```math
dy/dx = 3x^2
```

This gives us a few benefits,
starting with being able to calculate the derivative
the other way around:

```math
x = root(3)(y)
```
```math
dx/dy = 1/(3 root(3)(y^2)) = y^(-3/2)//3
```

We should take a minute to analyze what these values mean.
If you change `math x` by a small value `math epsilon`,
then `math y` will be changed by `math epsilon * 3x^2`.
Similarly, if you change `math y` by a small value `math epsilon`,
then `math x` will be changed by `math epsilon * y^(-3/2)//3`.
We can visualize these derivatives like this:

```!twopi -Tsvg | base64 -w0
digraph {
  bgcolor=transparent
  rankdir="RL"
  node[shape=none]
  nodesep=1
  ranksep=3
  y -> x [label = <y<sup>-³⁄₂</sup>/3>]
  x -> y [label = <<BR/>3x<sup>2</sup><BR/><BR/>>]
}
!<img class="medium" alt="x and y relationship" src="data:image/svg+xml;base64,{}">
```

We can now get started with more variables.
Take this simple system:

```math
b = 3a^4
```
```math
c = sin(b)
```

We can see the relationship using the same visualization:

```!dot -Tsvg | base64 -w0
digraph {
  rankdir="LR"
  bgcolor=transparent
  node[shape=none]
  a -> b -> c
}
!<img class="medium" alt="x and y relationship" src="data:image/svg+xml;base64,{}">
```

We can easily calculate that `math (db)/(da) = 12a^3` and `math (dc)/(db) = cos(b)`,
but what about `math (dc)/(db)`?
First of all, when working with multiple variables,
we usually change the `math d` to a `math del`.
An approach feasible for simple systems is solving `math (del c)/(del a)`
manually using the chain rule:

```math
c = sin(b) = sin(3a^4)
```
```math
(del c)/(del a) = cos(3a^4) * 12a^3 = cos(b) * 12a^3
```

But consider the meaning of the graph with our derivatives:

```!dot -Tsvg | base64 -w0
digraph {
  rankdir="LR"
  bgcolor=transparent
  node[shape=none]
  a -> b [label=<12a<sup>3</sup>>]
  b -> c [label="cos(b)"]
}
!<img class="medium" alt="a, b, and c relationship" src="data:image/svg+xml;base64,{}">
```

If each small change `math epsilon` in `math a`
causes a `math epsilon * 12a^3` change in `math b`,
and each small change `math delta` in `math b`
causes a `math delta * cos(b)` change in `math c`,
then we just have a total `math (epsilon * 12a^3) * cos(b)`
change in `math c`.
This logic holds up in general,
resulting in a new rule for derivatives involving
three variables, `math a`, `math b`, and `math c`,
defined sequentially in terms of one another:

```math
(del c)/(del a) = (del c)/(del b) * (del b)/(del a)
```

Naturally, we can reuse this property multiple times.
For example, with four variables:

```!dot -Tsvg | base64 -w0
digraph {
  rankdir="LR"
  bgcolor=transparent
  node[shape=none]
  a -> b -> c -> d
}
!<img class="medium" alt="a, b, c and d relationship" src="data:image/svg+xml;base64,{}">
```

First, we can calculate `math (del d)/(del a)` as `math (del d)/(del b) * (del b)/(del a)`.
The process is then repeated for `math (del d)/(del b) = (del d)/(del c) * (del c)/(del b)`,
yielding a final answer of `math (del d)/(del a) = (del d)/(del c) * (del c)/(del b) * (del b)/(del a)`.
For more variables, the result is the same: the product of the derivatives of neighboring variables.
This is the generalized version of the chain rule.
We are almost done with multi-variable derivatives,
except for a special case.
Say you have:

```math
b = a^2
```
```math
c = -7a
```
```math
d = b*c
```

How do you calculate `math (del d)/(del a)`? The shape of the graph is different:

```!dot -Tsvg | base64 -w0
digraph {
  bgcolor=transparent
  rankdir="LR"
  node[shape=none]
  a -> b -> d [color=yellow]
  a -> c -> d [color=magenta]
}
!<img class="medium" alt="a to b to d and a to c to d" src="data:image/svg+xml;base64,{}">
```

Consider each one of the paths,
`math (del b)/(del a)*(del d)/(del b) = 2a*c` (in blue),
and `math (del c)/(del a)*(del d)/(del c) = -7*b` (in green).
You can understand them as the effect `math a` has over `math d`
through `math b` and `math c`, respectively.
So, if a small change `math epsilon` causes a
`math epsilon * 2a*c` change in `math d` through `math b`,
and that same change also causes a
`math epsilon * (-7)*b` change in `math d` through `math c`,
then, the total change is simply their sum
`math epsilon*2a*c + epsilon*(-7)*b = epsilon*(2ac - 7b)`.
The derivative is `math (del d)/(del a) = (del b)/(del a)*(del d)/(del b) + (del c)/(del a)*(del d)/(del c) = 2ac - 7b`.
So, generally, if we have a variable that affects another through different paths,
we simply add the derivatives through each path to get our result.

With this, we are finally ready to tackle how neural networks learn.

## Training Neural Networks
We now just need to apply gradient descent to each of the weights and biases
of the neural network.
Unfortunately, a problem quickly arises.
Say you wanted to calculate the derivative of the error in terms of the green weight (`math (del E)/(del w)`)
to do a step of gradient descent
in this simple neural network:

```!dot -Tsvg | base64 -w0
digraph math {
  bgcolor=transparent
	rankdir="LR"
	splines = false
	subgraph li {
		node [shape = "circle"]
		rank = "same"
		rankdir = "BT"
		w0 [label = <w<sub>0</sub>>]
	}
	subgraph l0 {
		node [shape = "circle"]
		rank = "same"
		rankdir = "BT"
		x0 -> x1 [style="invis"]
		x0 [label = <x<sub>0</sub>>, color=cyan]
		x1 [label = <x<sub>1</sub>>]
	}
	subgraph l1 {
		node [shape = "circle"]
		rank = "same"
		rankdir = "BT"
		y0 -> y1 -> y2 [style="invis"]
		y0 [label = <y<sub>0</sub>>, color=cyan]
		y1 [label = <y<sub>1</sub>>, color=cyan]
		y2 [label = <y<sub>2</sub>>, color=cyan]
	}
	subgraph l2 {
		node [shape = "circle"]
		rank = "same"
		rankdir = "BT"
		z0 -> z1 [style="invis"]
		z0 [label = <z<sub>0</sub>>, color=cyan]
		z1 [label = <z<sub>1</sub>>, color=cyan]
	}
  E [shape=none, label="E (MSE)"]
  w0 -> x0 [arrowsize = 0.2, color=magenta]
	{w0} -> {x1} [arrowsize=0.2, color = "#666666"]
  {x0} -> {y0;y1;y2} [arrowsize = 0.2, color=cyan]
  {x1} -> {y0;y1;y2} [arrowsize=0.2, color = "#666666"]
  {y0;y1;y2} -> {z0;z1} [arrowsize=0.2, color = cyan]
  {z0; z1} -> E [style=dotted, arrowsize=0.2, color=cyan]
}
!<img alt="Relationship from the weight to the error" src="data:image/svg+xml;base64,{}">
```

It is not a trivial calculation;
there is a complex path with multiple intermediate variables (in red).
All for just one weight in one iteration of a toy neural network.
There is also no intuitive generalization for all weights
that we can simplify into a simple expression.
Imagine this, but with a million parameters.

The solution comes from the simple observation that
every parameter is connected to the error exclusively
through the neurons of the next layer.
Everything from then on forward can be treated as a black box.
This gives us reason to try to calculate the derivative of the error
in terms of every neuron of the final layer,
and use those values to calculate the derivative of the error
in terms of the second to last layer,
and so on, working backwards from the error.
This is the essence of backpropagation,
an algorithm which follows these steps:

1. Calculate the derivative of the error in terms of the output of the final layer.
2. Calculate the derivative of the error in terms of the output of the previous layer.
3. Calculate the derivative of the parameters of the layer.
4. Apply a step of gradient descent using those derivatives.
5. Repeat steps 2-4 for all layers, going backwards.

But before that, we need to take some time to establish the notation system.
When talking about an individual layer,
the `math i`th input
(i.e., the activation of the `math i`th neuron of the previous layer)
will be written as `math x_i`,
and the `math j`th output will be written as `math y^j`.
The bias of the `math j`th neuron will be called `math b^j`,
and the weight from `math x_i` to `math y^j` will be `math w_i^j`.
Notice that the subscripts correspond to the input space
and the superscripts to the output space.

We can make a small simplification to make our jobs easier.
We currently define the outputs of one of our layers like this:

```math
y^j = sigma(w_0^j x_0 + w_1^j x_1 + w_2^j x_2 + ... + w_i^j x_i + b^j)
```

We are doing two different tasks here:
the weighted sum and the activation function.
We can split them into different layers.

The first one is called a *Fully Connected Layer*,
and the outputs can be calculated as the sum:

```math
y^j = w_0^j x_0 + w_1^j x_1 + w_2^j x_2 + ... + w_i^j x_i + b^j
```

It has `math i*j` weights, and `math j` biases,
and looks like this:

```!dot -Tsvg | base64 -w0
digraph math {
  bgcolor=transparent
	rankdir="LR"
	splines = false
	subgraph input {
		node [shape = "circle"]
		rank = "same"
		rankdir = "BT"
		x0 -> x1 -> x2 -> x3 -> xe -> xi [style="invis"]
		x0 [label = <x<sub>0</sub>>]
		x1 [label = <x<sub>1</sub>>]
		x2 [label = <x<sub>2</sub>>]
		x3 [label = <x<sub>3</sub>>]
		xe [label = "⋮", shape = none ]
		xi [label = <x<sub>i</sub>>]
	}
	subgraph output {
		node [shape = "circle"]
		rank = "same"
		rankdir = "BT"
		y0 -> y1 -> y2 -> ye -> yj [style="invis"]
		y0 [label = <y<sup>0</sup>>]
		y1 [label = <y<sup>1</sup>>]
		y2 [label = <y<sup>2</sup>>]
		ye [label = "⋮", shape = none]
		yj [label = <y<sup>j</sup>>]
	}
	inputlabel [label = "input layer", shape=plaintext]
	outputlabel [label = "output layer", shape=plaintext]
	inputlabel -> x0 [style=invis]
	{rank=same; inputlabel x0}
	outputlabel -> y0 [style=invis, len=0.01]
	{rank=same; outputlabel y0}
	{x0;x1;x2;x3;xi} -> {y0;y1;y2;yj} [arrowsize=0.2, color = "#666666"]
}
!<img id="fullyconnected" class="small" alt="Fully Connected Layer" src="data:image/svg+xml;base64,{}">
```

The second one is an *Activation Layer*,
which simply applies an activation function
to its input:

```math
y^i = sigma(x_i)
```

It has a simpler structure and no trainable parameters:

```!dot -Tsvg | base64 -w0
digraph math {
  bgcolor=transparent
	rankdir="LR"
	splines = false
	subgraph input {
		node [shape = "circle"]
		rank = "same"
		rankdir = "BT"
		x0 -> x1 -> x2 -> xe -> xi [style="invis"]
		x0 [label = <x<sub>0</sub>>]
		x1 [label = <x<sub>1</sub>>]
		x2 [label = <x<sub>2</sub>>]
		xe [label = "⋮", shape = none ]
		xi [label = <x<sub>i</sub>>]
	}
	subgraph output {
		node [shape = "circle"]
		rank = "same"
		rankdir = "BT"
		y0 -> y1 -> y2 -> ye -> yj [style="invis"]
		y0 [label = <y<sup>0</sup>>]
		y1 [label = <y<sup>1</sup>>]
		y2 [label = <y<sup>2</sup>>]
		ye [label = "⋮", shape = none]
		yj [label = <y<sup>i</sup>>]
	}
	inputlabel [label = "input layer", shape=plaintext]
	outputlabel [label = "output layer", shape=plaintext]
	inputlabel -> x0 [style=invis]
	{rank=same; inputlabel x0}
	outputlabel -> y0 [style=invis, len=0.01]
	{rank=same; outputlabel y0}
	x0 -> y0 [arrowsize=0.2, color = "#666666"]
	x1 -> y1 [arrowsize=0.2, color = "#666666"]
	x2 -> y2 [arrowsize=0.2, color = "#666666"]
	xi -> yj [arrowsize=0.2, color = "#666666"]
}
!<img class="small" alt="Activation Layer" src="data:image/svg+xml;base64,{}">
```

Now, we can start tackling each of the steps,
and then joining them.

### Derivative of the Error
Our first step will be to calculate the derivative of the error
in terms of the outputs `math y^j` of the network.
This calculation is trivial:

```math
E = ((y^0 - hat y^0)^2 + (y^1 - hat y^1)^2 + ... + (y^j - hat y^j)^2)/n
```
```math
(del E)/(del y^j) = 2(y^j - hat y^j)/n
```

> *Note: The formula was changed to be zero-indexed.*

### Propagating Backwards the Error of a Fully Connected Layer
To allow the computation of the previous layers,
we need to calculate the derivative of the inputs `math (del E)/(del x_i)`
knowing the derivative of the outputs `math (del E)/(del y^j)`.
Take a look at our formula for the output:

```math
y^j = w_0^j x_0 + w_1^j x_1 + w_2^j x_2 + ... + w_i^j x_i + b^j
```

We can easily compute `math (del y^j)/(del x_i)` to be `math w_i^j`.
Also, all of the input neurons are present when calculating each output neuron.
Because the input neurons are connected to the error solely through the output neurons,
we have this situation:

```!dot -Tsvg | base64 -w0
digraph math {
  bgcolor=transparent
  rankdir="LR"
  node [shape=none]
  x [label = <x<sub>i</sub>>]
  y0 [label = <y<sup>0</sup>>]
  y1 [label = <y<sup>1</sup>>]
  y2 [label = <y<sup>2</sup>>]
  ye [label = "⋮", shape=none]
  yj [label = <y<sup>j</sup>>]

  x -> y0
  x -> y1
  x -> y2
  x -> ye [style=invis]
  x -> yj

  {y0;y1;y2;yj} -> E
  ye -> E [style=invis]
}
!<img class="medium" alt="Variables of FCN backpropagation" src="data:image/svg+xml;base64,{}">
```

We can start calculating:

```math
(del E)/(del x_i) =
  (del y^0)/(del x_i) * (del E)/(del y^0)
+ (del y^1)/(del x_i) * (del E)/(del y^1)
+ (del y^2)/(del x_i) * (del E)/(del y^2)
+ ...
+ (del y^j)/(del x_i) * (del E)/(del y^j)
```
```math
=
  w_i^0 * (del E)/(del y^0)
+ w_i^1 * (del E)/(del y^1)
+ w_i^2 * (del E)/(del y^2)
+ ...
+ w_i^j * (del E)/(del y^j)
```

And with this, we are done,
and we can use this as the derivative of the errors
in terms of the output of the previous layer.

### Updating the Parameters of a Fully Connected Layer
We can use the same logic for calculating the derivatives of the
error in terms of the parameters.
Starting with the weights:

```math
y^j = w_0^j x_0 + w_1^j x_1 + w_2^j x_2 + ... + w_i^j x_i + b^j
```

The derivative `math (del y^j)/(del w_i^j)` is simply `math x_i`.
Each weight is exclusive to one input and one output,
so the relationship is very simple:

```!dot -Tsvg | base64 -w0
digraph math {
  bgcolor=transparent
  rankdir="LR"
  node [shape=none]
  w[label = <w<sub>i</sub><sup>j</sup>>]
  y[label = <y<sup>j</sup>>]

  w -> y -> E
}
!<img class="medium" alt="Variables in δE/δw" src="data:image/svg+xml;base64,{}">
```

Our final calculation will be:

```math
(del E)/(del w_i^j) = (del y^j)/(del w_i^j) * (del E)/(del y^j)
```
```math
= x_i * (del E)/(del y^j)
```

For the biases, it is equally simple:

```math
y^j = w_0^j x_0 + w_1^j x_1 + w_2^j x_2 + ... + w_i^j x_i + b^j
```

Each bias is exclusive to an output neuron,
with the derivative `math (del y^j)/(del b^j)` being just `math 1`.
The relationship is the same as the weight:

```!dot -Tsvg | base64 -w0
digraph math {
  bgcolor=transparent
  rankdir="LR"
  node [shape=none]
  b[label = <b<sup>j</sup>>]
  y[label = <y<sup>j</sup>>]

  b -> y -> E
}
!<img class="medium" alt="Variables in δE/δb" src="data:image/svg+xml;base64,{}">
```

But our result will be even simpler:

```math
(del E)/(del b^j) = (del y^j)/(del b^j) * (del E)/(del y^j)
```
```math
= (del E)/(del y^j)
```

With both of our derivatives,
we can now calculate the new values of the parameters through gradient descent:

```math
w_i^j larr w_i^j - alpha*(del E)/(del w_i^j)
```
```math
w_i^j larr w_i^j - alpha*x_i*(del E)/(del y^j)
```

And:

```math
b^j larr b^j - alpha*(del E)/(del b^j)
```
```math
b^j larr b^j - alpha*(del E)/(del y^j)
```

### Propagating Backwards the Error of an Activation Layer
For the final step of our puzzle,
we just need to calculate the derivative of the error
in terms of the input of the activation layer `math (del E)/(del x_i)`,
knowing it in terms of the output `math (del E)/(del y^i)`.
The formula for the Activation Layer is the simplest one yet:

```math
y^i = sigma(x_i)
```

The derivative `math (del y^i)/(del x_i)` is equal to `math sigma^'(x_i)`.
The relationship to the error is straightforward:

```!dot -Tsvg | base64 -w0
digraph math {
  bgcolor=transparent
  rankdir="LR"
  node [shape=none]
  x[label = <x<sub>i</sub>>]
  y[label = <y<sup>i</sup>>]

  x -> y -> E
}
!<img class="medium" alt="Propagating backwards an activation layer" src="data:image/svg+xml;base64,{}">
```

With this, we can get our derivative:

```math
(del E)/(del x_i) = (del y^i)/(del x_i) * (del E)/(del y^i)
```
```math
= sigma^'(x_i) * (del E)/(del y^i)
```

This is the last piece of knowledge needed to implement backpropagation.
But, for clarity's sake,
let's go through a simple example part by part.

## Putting It Together: A Simple Example
To understand backpropagation,
it is useful to go through a single iteration
in a small neural network,
like this one:

```!dot -Tsvg | base64 -w0
digraph math {
  bgcolor=transparent
	rankdir="LR"
	splines = false
  subgraph lm1 {
		node [shape = "circle"]
		rank = "same"
		rankdir = "BT"
		i0 -> i1 -> i2 [style="invis"]
		i0 [label = <i<sub>0</sub>>]
		i1 [label = <i<sub>1</sub>>]
		i2 [label = <i<sub>2</sub>>]
  }
	subgraph l0 {
		node [shape = "circle"]
		rank = "same"
		rankdir = "BT"
		a0 [label = <a<sub>0</sub>>]
	}
	subgraph l1 {
		node [shape = "circle"]
		rank = "same"
		rankdir = "BT"
		b0 [label = <b<sub>0</sub>>]
	}
	subgraph l2 {
		node [shape = "circle"]
		rank = "same"
		rankdir = "BT"
		c0 -> c1 [style="invis"]
		c0 [label = <c<sub>0</sub>>]
		c1 [label = <c<sub>1</sub>>]
	}
	subgraph l3 {
		node [shape = "circle"]
		rank = "same"
		rankdir = "BT"
		d0 -> d1 [style="invis"]
		d0 [label = <o<sub>0</sub>>]
		d1 [label = <o<sub>1</sub>>]
	}
  i0 -> a0 [arrowsize=0.2, color = "#666666", label="0.5"]
  i1 -> a0 [arrowsize=0.2, color = "#666666", label="1"]
  i2 -> a0 [arrowsize=0.2, color = "#666666", label="-0.5"]

	a0 -> b0 [arrowsize=0.2, color = "#666666", style=dashed]

	b0 -> c0 [arrowsize=0.2, color = "#666666", label="-1"]
	b0 -> c1 [arrowsize=0.2, color = "#666666", label="1"]

	c0 -> d0 [arrowsize=0.2, color = "#666666", style=dashed]
	c1 -> d1 [arrowsize=0.2, color = "#666666", style=dashed]
}
!<img alt="Neural networks" src="data:image/svg+xml;base64,{}">
```

The dashed lines are from the activation layers,
the values in the lines are the weights,
and for simplicity, all of the biases will start at `math 0`.
The learning rate to be set to `math alpha = 0.1`
and out activation function to ReLU (`math max(x, 0)`).
First, we need some data.
Assume inputs are `math [1, 0.5, 1]`,
and the expected output is `math [0.5, 1]`.
Evaluating the network does not give us the result we want:

```!dot -Tsvg | base64 -w0
digraph math {
  bgcolor=transparent
	rankdir="LR"
	splines = false
  node[fixedsize=true]
  subgraph lm1 {
		node [shape = "circle"]
		rank = "same"
		rankdir = "BT"
		i0 -> i1 -> i2 [style="invis"]
		i0 [label = "1"]
		i1 [label = "0.5"]
		i2 [label = "1"]
  }
	subgraph l0 {
		node [shape = "circle"]
		rank = "same"
		rankdir = "BT"
		a0 [label = "0.5"]
	}
	subgraph l1 {
		node [shape = "circle"]
		rank = "same"
		rankdir = "BT"
		b0 [label = 0.5]
	}
	subgraph l2 {
		node [shape = "circle"]
		rank = "same"
		rankdir = "BT"
		c0 -> c1 [style="invis"]
		c0 [label = "-0.5"]
		c1 [label = "0.5"]
	}
	subgraph l3 {
		node [shape = "circle"]
		rank = "same"
		rankdir = "BT"
		d0 -> d1 [style="invis"]
		d0 [label = "0"]
		d1 [label = "0.5"]
	}
  i0 -> a0 [arrowsize=0.2, color = "#666666", label="0.5"]
  i1 -> a0 [arrowsize=0.2, color = "#666666", label="1"]
  i2 -> a0 [arrowsize=0.2, color = "#666666", label="-0.5"]

	a0 -> b0 [arrowsize=0.2, color = "#666666", style=dashed]

	b0 -> c0 [arrowsize=0.2, color = "#666666", label="-1"]
	b0 -> c1 [arrowsize=0.2, color = "#666666", label="1"]

	c0 -> d0 [arrowsize=0.2, color = "#666666", style=dashed]
	c1 -> d1 [arrowsize=0.2, color = "#666666", style=dashed]
}
!<img alt="Evaluated values of neural network" src="data:image/svg+xml;base64,{}">
```

The output is not quite right.
Our error is `math MSE = 0.25`.
Now, we can update our parameters using backpropagation,
step by step.

### Step 1: Derivative of the Error in Terms of the Outputs
We can just use our formula:

```math
(del E)/(del y^j) = 2(y^j - hat y^j)/n
```

Substituting in our values:

```math
(del E)/(del o_0) = 2(0 - 0.5)/2 = -0.5
```
```math
(del E)/(del o_1) = 2(0.5 - 1)/2 = -0.5
```

### Step 2: Propagating Back the First Activation Layer
For this, we will need the derivative of our error function.
In this case, the derivative of ReLU is:

```math
sigma^'(x) = "ReLU"^'(x) = {(0, "if "x<0),(1, "if " x>0):}
```

Now, we can use our formula:

```math
(del E)/(del x_i) = sigma^'(x_i) * (del E)/(del y^j)
```

And once again evaluate:

```math
(del E)/(del c_0) = sigma^'(c_0) * (del E)/(del o_0)
```
```math
= sigma^'(-0.5) * (-0.5) = 0
```

And:

```math
(del E)/(del c_1) = sigma^'(c_1) * (del E)/(del o_1)
```
```math
= sigma^'(0.5) * (-0.5) = -0.5
```

### Step 3: Propagating Back the First Fully Connected Layer
Using our formula to substitute:

```math
(del E)/(del x_i) =
  w_i^0 * (del E)/(del y^0)
+ w_i^1 * (del E)/(del y^1)
+ w_i^2 * (del E)/(del y^2)
+ ...
+ w_i^j * (del E)/(del y^j)
```

We get:

```math
(del E)/(del b_0) =
  (-1) * (del E)/(del c_0)
+ 1    * (del E)/(del c_1)
```
```math
= (-1) * 0 + 1 * (-0.5) = -0.5
```

### Step 4: Updating the Parameters of the First Fully Connected Layer
Starting with the weights:

```math
w_i^j larr w_i^j - alpha*x_i*(del E)/(del y^j)
```

Applying it to our network, we get:

```math
w_(b_0)^(c_0) larr -1 - 0.1*0.5*(del E)/(del c_0) = -1
```
```math
w_(b_0)^(c_1) larr 1 - 0.1*0.5*(del E)/(del c_1) = 1.025
```

The biases are similar:

```math
b^j larr b^j - alpha*(del E)/(del y^j)
```

Substituting:

```math
b^(c_0) larr 0 - 0.1*(del E)/(del c_0) = 0
```
```math
b^(c_1) larr 0 - 0.1*(del E)/(del c_1) = 0.05
```

### Step 5: Repeat
Now, we just need to repeat backwards:

```math
(del E)/(del a_0) = sigma^'(0.5) * (-0.5) = -0.5
```

```math
w_(i_0)^(a_0) larr 0.5 - 0.1*1*(-0.5) = 0.55
```

```math
w_(i_1)^(a_0) larr 1 - 0.1*0.5*(-0.5) = 1.025
```

```math
w_(i_2)^(a_0) larr -0.5 - 0.1*1*(-0.5) = -0.45
```

```math
b^(a_0) larr 0 - 0.1*(-0.5) = 0.05
```

Calculating the derivative of the output in terms of the
first layer is not necessary,
because all the parameters were already updated.
Our new parameters are 
`math w_(b_0)^(c_0) = -1`,
`math w_(b_0)^(c_1) = 1.025`,
`math b^(c_0) = 0`,
`math b^(c_1) = 0.05`,
`math w_(i_0)^(a_0) = 0.55`,
`math w_(i_1)^(a_0) = 1.025`,
`math w_(i_2)^(a_0) = -0.45`, and
`math b^(a_0) = 0.05`.
To train a neural network,
we just need to do this many times with multiple data points.

## Conclusion
Congratulations!
If you followed everything so far,
you have the knowledge necessary to implement backpropagation.
I would recommend trying to replicate the formulas without looking at the article
to better understand the process used to derive them,
which is applicable to many other areas.
If you want to check how this algorithm
translates to code,
check out [my Rust implementation](https://github.com/hhhhhhhhhn/neural).

### Next Steps
This article focuses on the math of the most basic way of implementing basic neural networks,
so it is just a starting point for deep learning.
From here, you might be interested in diving into:
- **Matrices**: Our algorithm can be expressed more elegantly using matrices,
  with a huge boost in performance if the work is offloaded to the GPU.
- **Other Layers**: The two layers we have learned so far are very powerful,
  but other types have their own advantages.
  For example, *convolutional layers* are widely used in image processing.
- **Optimizers**: Gradient descent is the basis for almost all ML optimization algorithms,
  but by itself it is rather inefficient.
  Today, a plethora of algorithms that converge faster are available.
- **Regularization**: Larger neural networks can suffer several flaws,
  including *overfitting*
  (a tendency to memorize the data rather than learn the fundamental pattern).
  Regularization techniques like *dropout* help counter these problems.
- **Different Architectures**: For some tasks, new architectures are needed.
  For example, when working with sequences, *recurrent neural networks* (RNNs)
  are commonly used, which can hold on to memory.
- **Unlabeled Data**: Sometimes you do not know the ideal output,
  so you require a new way of learning.
  For example, for learning to play games *reinforcement learning* is used,
  using rewards and punishments to steer the network towards desired behaviors.
  Likewise, for compressing data into a smaller size,
  the *autoencoder* architecture is useful.

### Resources
To learn more about machine learning,
Omar Aflak's [Data Towards Science article](https://towardsdatascience.com/math-neural-network-from-scratch-in-python-d6da9f29ce65) is a good resource
that explains how to derive the matrix version of the operations
and places a greater emphasis on architecture and implementation
(for example, it introduced me to the idea of splitting the activation layer).
For video content,
the [Coding Lane channel](https://www.youtube.com/@CodingLane/featured)
has several series with advanced concepts.
I recommend the [Improving Neural Networks](https://www.youtube.com/playlist?list=PLuhqtP7jdD8DKUBtucBD0mGS7y0rT9alz) series,
which covers regularization and optimizers.

Tags: Math, Programming
Wed Jan 25 04:33:23 PM -03 2023
