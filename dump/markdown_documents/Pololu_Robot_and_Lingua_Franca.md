---
title: "Pololu Robot and Lingua Franca"
date: Sat Sep 23 2023 01:28:45
type: other
---
This post describes my journey with Pololu Robot and Lingua Franca
language.

## Why?

So this semester I am taking embedded system(because I had been
practically declined from all other classes I am interested in and OS is
too much work), and they use Pololu Robot and Lingua Franca, that\'s why
I am learning them.

## What?

The class uses Pololu Robot RP2040 3pi+, and I need to connect a wire to
the robot and run programs on my computer to make it execute stuff.

I bought the robot for 200 dollars since I was very curious, and didn\'t
want to work only in the labs but also work at home.

Lingua Franca is a little like React Nodejs to be honest, and when I
first started with React I was very bad (I still wasn\'t really good at
it), like it have all those reactors and trigggers to make the program
work. But mostly is just C Program, which I am also very bad at. As a
result, I faced obstacles and bugs at the start of the course, making me
weary and sad indeed.

But mostly it was because I am too stupid, and also I wasn\'t working
hard enough.

## ChatGPT

Lingua Franca is a new and not so widely-used language, so ChatGPT have
limited abilities(unlike C or Python or Javascript), but it is still
very good in generating code. The only difference is that you have to
manually debug with GPT\'s generation.

## Printf

So basically I had a really hard time making the printf statements in
Lingua Franca work. At the end it turned out everything was fine except
that the manuel wan\'t clear and the TA had limited experience.

So basically connect and make it bootsel mode (RP1-RP2 appearing in the
media) and run

    lfc src/[program].lf && picotool load -x bin/[program].elf -f
    sudo screen /dev/ttyACM0 115200

The problem was I couldn\'t find the ttyACM when connected, and it was
because I hadn\'t used picotool to load the program into the robot. And
it took so long for TA to figure it out. But anyways it went fine.

## Display

First import the library.

    import Display from "lib/Display.lf"

Then, use a New Display and set the line0

        d = new Display()
        reaction() -> d.line0 {=
            static char buf0[17];
            snprintf(buf0, 17, "dsfasdfsadf");
            lf_set(d.line0, buf0);
        =}

## Logical time vs Physical Time

Logical Time: In LF, logical time is used to order events in a
predictable manner within the model, independent of the actual passage
of real-world time. Physical Time: Physical time in LF is used when the
model needs to interact with the physical world or external components
that operate in real-time.

Also, their types are different, and not specifying the right type, like
ld vs lld can cause problems. This is an example of correctly printing
out

    int64_t x=lf_time_logical();
    int64_t y=lf_time_physical();
    printf("Physical Action Triggered: Logical Time: %lld msec, Physical Time: %lld msec\n", x/1000000,y/1000000);

An example code to demonstrate the difference

    main reactor {
      physical action tick

      reaction(startup) -> tick {=
        lf_schedule(tick, 0); // 1 second in nanoseconds
      =}

      reaction(tick) -> tick {=
        int64_t logical_time = lf_time_logical();
        int64_t physical_time = lf_time_physical();
        printf("Function Enters: Logical Time: %lld msec, Physical Time: %lld msec\n",
          logical_time / 1000000,
          physical_time / 1000000);

        while (lf_time_physical() < physical_time + 300000000);

        int64_t logical_time_after = lf_time_logical();
        int64_t physical_time_after = lf_time_physical();
        printf("After Delay: Logical Time: %lld msec, Physical Time: %lld msec\n",
          logical_time_after / 1000000,
          physical_time_after / 1000000);

        lf_schedule(tick, 1000000000); // Schedule the next occurrence of tick.
      =}
    }

prints out

    Function Enters: Logical Time: 3902 msec, Physical Time: 3902 msec
    After Delay: Logical Time: 3902 msec, Physical Time: 4202 msec
    Function Enters: Logical Time: 5202 msec, Physical Time: 5203 msec
    After Delay: Logical Time: 5202 msec, Physical Time: 5503 msec
    Function Enters: Logical Time: 6503 msec, Physical Time: 6503 msec
    After Delay: Logical Time: 6503 msec, Physical Time: 6803 msec
    Function Enters: Logical Time: 7803 msec, Physical Time: 7803 msec
    After Delay: Logical Time: 7803 msec, Physical Time: 8103 msec
    Function Enters: Logical Time: 9103 msec, Physical Time: 9103 msec

## Input and Output

We can get input basically from the output of another reactor, and then
specifying the output to input, for example, below is a code that passes
x and y to the Destination reactor, then outputs the sum. Write
`s.x -> d.x` to pass it.

    reactor Source {
      output x: int
      timer t(0, 1 sec)

      reaction(t) -> x {=
        lf_set(x,1);
      =}
    }

    reactor Destination {
      input x: int

      reaction(x) {=
        if (x->is_present) {
          printf("Received %d.\n", x->value);
        }
      =}
    }

    main reactor {
      s = new Source()
      d = new Destination()
      s.x -> d.x
    }

### Mutable Input and Arrays

So input is usually not mutable, but we can set it. Below is an example
of modifying array

    reactor Source {
      output data: int[10]
      timer t(0, 1 sec)
      reaction(t) -> data {=
        for(int i = 0; i < 10; i++) {
            data->value[i] = i;
        }
        lf_set_present(data); // Notify that the output data is set
      =}
    }

    reactor Processor {
      mutable input data: int[10]
      reaction(data) {=
        if(data->is_present) {
            for(int i = 0; i < 10; i++) {
                printf("%d ", data->value[i]);
            }
            //0 1 2 3 4 5 6 7 8 9

            // Modify the mutable input directly
            for(int i = 0; i < 10; i++) {
                data->value[i] += 2023;
            }

            for(int i = 0; i < 10; i++) {
                printf("%d ", data->value[i]);
            }
            //2023 2024 2025 2026 2027 2028 2029 2030 2031 2032
        }
      =}
    }

    main reactor {
      src = new Source()
      proc = new Processor()

      src.data -> proc.data
    }

## Robot Going in a Square

So after a while I wrote a program to make the robot go in a square. See my video in [anonytube](https://anonytube.jimchen.me).

## References

- [Pololu Robot RP2040 3pi+](https://www.pololu.com/product/5029)
- [Lingua Franca](https://www.lf-lang.org/)
- [Picotool Documentation](https://github.com/raspberrypi/picotool)
