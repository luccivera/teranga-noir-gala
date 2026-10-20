TERENAGA NOIR GALA — website files

index.html   The whole page. Desktop layout first, mobile layout second (search "tn-mobile").
styles.css   Colours, fonts, animations and the desktop/mobile switch (900px).
main.js      Opens and closes the mobile menu.
assets/      favicon.svg, og-image.jpg (link preview). Add hero.mp4, hero-poster.jpg and photos here.

HOW TO UPDATE THE DETAILS (date, prices, links, emails…)
  1. Open content.js in any text editor (TextEdit, Notepad, VS Code).
  2. Fill in the values between the quotes. Leave the quotes and commas.
  3. Save, then re-upload the whole folder to Cloudflare (Create new deployment).
  Everything updates on desktop AND mobile, including the "Add to calendar" file.
  Anything left as "" keeps its [placeholder] showing, so you can see what is missing.

To change longer wording (descriptions, headings), edit index.html. Text appears twice
(desktop + mobile), so change both.

Hero film: see the comment "HERO FILM" in index.html.

COMMUNITY PHOTOS
Drop these five files into assets/photos/ (exact names, .jpg, about 1600px on the long side):
  elders.jpg         - community elders (18 Years of Impact)
  town-hall.jpg      - town hall (18 Years of Impact)
  blood-drive.jpg    - blood drive (The Power of Your Giving)
  girls-program.jpg  - young girls program (The Power of Your Giving)
  staff.jpg          - staff group photo (The Future We Build Together)
Until a file is there, a dark red placeholder shows in its place. Photos are cropped to fit, so keep faces near the centre.
