# obs-now-playing

HTML widget to be used as a Browser source in [obsproject/obs-studio](https://github.com/obsproject/obs-studio) for displaying currently playing song informationg sourced from a flat text file.

## Set up

1. Set up your favourite audio player to output the current song information to an external text file.

   The default format [script.js](script.js) is expecting is the following:
   ```
   var data = "Artist|Album|Song|Duration|Elapsed Time|C:/Path/To/Song/File/"
   ```
   This is a bit unconventional as it requires the JavaScript variable in the file itself. This is to circumvent browser security which normally disallow loading local files through JavaScript. Embedding it as a script allows browsers to read data from the file during run-time.

   For [foobar2000](https://www.foobar2000.org/) I am currently using the (outdated) Skipyrich's [foo_np_simple](https://web.archive.org/web/20200201202714/https://skipyrich.com/wiki/Foobar2000:Now_Playing_Simple) with the following formatting:
   ```
   var data = "$if(%isplaying%,%artist%|%album%|%title%|%length%|%playback_time%|$replace($directory_path(%path%),\,/)")
   ```
   You can choose to use another foobar2000 plugin, like [foxx1337/foo_nowplaying2](https://github.com/foxx1337/foo_nowplaying2), though it currently does not support writing output every n milliseconds. Currently you would have to modify this widget to get rid of the current elapsed playback time.

3. Add a Browser source in OBS and choose the [obs-now-playing.html](obs-now-playing.html) file as the _URL_. Make sure it not set as _Local file_ as this would disable support for cover artwork.

   If you did not edit the included CSS file, give the width and height as 480 × 180 pixels.
   
   Change the _Custom CSS_ from the default to ```body { background-color: rgba(0, 0, 0, 0); margin: 15px auto auto 15px; overflow: hidden; }``` to get the intended margins.
  
## Example image

![example default output](https://github.com/Daedolon/obs-now-playing/blob/main/example-output.png?raw=true)
