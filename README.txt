TERENAGA NOIR GALA — website files

index.html   The words and structure of the page. One copy that works on every screen size.
styles.css   All the styling: colours (top of the file), fonts, layout, animations.
             Sections are labelled with comments. Phone styles are near the bottom,
             under "@media (max-width: 899px)"; tablet styles just above them.
fr/index.html  The French page (teranganoir.com/fr/). Same layout and classes as index.html.
             A layout change must be made in BOTH index.html and fr/index.html.
             Wording changes only go in the page for that language.
main.js      Fills in content.js, runs the hero video, the menu and "Add to calendar".
assets/      favicon.svg, og-image.jpg (link preview), print-wide.svg and print-band.svg
             (the African print bands), wordmark-fr.webp (French logo). Add hero.mp4, hero-poster.jpg and photos here.

HOW TO UPDATE THE DETAILS (date, prices, links, emails…)
  1. Open content.js in any text editor (TextEdit, Notepad, VS Code).
  2. Fill in the values between the quotes. Leave the quotes and commas.
  3. Save, then commit and push. Cloudflare updates the site in a minute or two.
  Everything updates everywhere, including the "Add to calendar" file.
  Anything left as "" keeps its [placeholder] showing, so you can see what is missing.

To change longer wording (descriptions, headings), edit index.html. Each piece of text
appears once, so one edit changes desktop and phone.

To change how something looks, find its class name in index.html (e.g. class="tier")
and search for it in styles.css.

COMMUNITY PHOTOS
Drop these five files into assets/photos/ (exact names, .jpg, about 1600px on the long side):
  elders.jpg         - community elders (18 Years of Impact)
  town-hall.jpg      - town hall (18 Years of Impact)
  blood-drive.jpg    - blood drive (The Power of Your Giving)
  girls-program.jpg  - young girls program (The Power of Your Giving)
  staff.jpg          - staff group photo (The Future We Build Together)
Until a file is there, a dark red placeholder shows in its place. Photos are cropped to fit, so keep faces near the centre.

HERO VIDEO
Put these in assets/video/ (create the folder):
  hero.mp4          - 10-20 second loop, no sound needed (it plays muted), MP4 (H.264), 1920x1080, ideally under 8 MB
  hero-poster.jpg   - a still from the video; shows while it loads
The video only loads when the file is there; otherwise the red glow shows as before.
A pause button appears over the video (needed for accessibility). Visitors with "reduce motion" on see the still frame.


FRENCH PAGE
  The EN | FR links in the nav switch between index.html and fr/index.html.
  content.js is shared: dates, times and prices switch to French style automatically
  (29 novembre 2026, 18 h, 2 500 $), and Zeffy links open Zeffy's French page.
