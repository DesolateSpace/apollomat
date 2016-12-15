# Mat
"Mat" stylesheet sources for apollo.

## Building the stylesheet

You need to have node installed on your computer (0.12+)

This project makes use of Gulp, PostCSS and of a few PotstCSS plugins.

Run `npm install` to set up all of the required dependecies.

To compile the stylesheet, simply run `gulp` - the output will be saved to the `dist` folder.

You can run "gulp watch" to have the sources rebuilt whenever you change something in `src`.
The main colors are defined in `src/settings.css`, you can tweak them here to create variants of this skin.
