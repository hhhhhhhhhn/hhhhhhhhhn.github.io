# This is a test

## Math (asciimath)
Here is a variable `math a` and a variable `math b`. An equation:

```math
int_0^(pi/2) sin(x)cos(x) dx; " " u = sin(x), du = cos(x)dx
```

```math
int_0^1 u du = [1/2 * u^2]_0^1 = 1/2 * 1^2 - 1/2 * 0^2 = 1/2
```

An inline equation like `math A = int_0^1 1/x dx` is smaller

## Shell
An svg turned to base64


```!sed "s/%/$(date)/" | base64 -w0
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 100">

  <text x="25" y="55" 
        font-family="'Lucida Grande', sans-serif" 
        font-size="32">

        %
  </text>

</svg>
!<img src="data:image/svg+xml;base64,{}">
```

Tags: Test
Mon Jan  2 11:20:35 AM -03 2023
