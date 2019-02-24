# Draws a spiral in turtle graphics.
# https://codehs.com/hourofcode/tracy

import turtle
# After drawing a spiral image, put the result of calling downloadThicknessMap() into the spiral variable.
spiral = []
turtle.tracer(40, 0)

penup()
for point in spiral:
    pensize(point[2])
    setposition(point[0] * 0.5, point[1] * 0.5)
    pendown()