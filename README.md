# earthworks-website

EarthWorks Website with new look and feel. New features:
Search
EarthWorks logo
Team Photos populated (mostly).

To just have the website popup in your browser locally:

just click on earthworks_website/index.html

To run the website locally, do the following:

To test without security issues that prevent searching, you'll need to run the site through a local web server. 
Note, choose whichever matches the tools suits your environment.

Navigate to ./earthworks-website
You should see index.html
Then:

1. Using Python (if installed):
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

2. Using Node.js:
```bash
npx http-server
```

Then access your site in your browser enter `http://localhost:8000` and the EarthWorks page will be servered there via the index.html file.

