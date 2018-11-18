### ZIZO

... is a cute 2.5D Graphic Engine for Canvas based Games.

Uses [gloop](https://github.com/monkeydioude/gloop) as its core for drawing on canvas.
This engine:
- wraps around `gloop` and handles Isometric coordinates over {x,y} Canvas' coordinates
- draw the map before anything else
- has an Objects system that allows to draw over the map with a depth fashion. Which means no matter the order Objects are declared, their Isometric coordinates and Z value will define their place and order they are drawn on the map.
- has a Camera entity (which is critical in this engine), defining where the focus of the Tile Map is and where it should be drawn on the canvas
- has a Map entity is most likely the entity you can identify yourself to. It's pretty shitty atm but, as every monomyth story, will realise its weaknesses and will overcome them with great effort and be the HERO.
