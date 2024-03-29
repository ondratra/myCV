# myCV

[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)

Static webpage for your CV. It can be deployed on a webserver or shared as static files in an email, on a USB stick, etc.
Visit [ondratra.eu](https://ondratra.eu) to see what this CV might look like.
It is created using only HTML, JavaScript, and CSS, thus it can be easily edited without any compilation needed.

To view the CV, open the file `cv.html` in your web browser. You might need to do [mandatory steps](#mandatory-steps) first.

## Create your own CV

### Mandatory steps
- Fork this repository or simply download all files to your computer
- Put your profile photography to file `data/portrait.jpg` (or copy `data/portrait.example.svg` to `data/portrait.svg`).
- Copy file `data/dataset.example.js` to `data/dataset.js` and fill in some information about yourself into it.

### Optional
- You can change colors by changing values in `src/colorScheme.css`.
- Edit variable `boxes` in `src/scripts.js` to hide or edit information boxes of your CV.
  In the same file, you can change all icons by setting different Font Awesome classes by editing the `settings` variable.
  For a list of Font Awesome icons' classes, visit [fontawesome.com/icons](https://fontawesome.com/icons).
