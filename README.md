
# Http attachment headers spike

Simple node express spike used to experiment with various http headers to force IE9 and IE10 to download PDF files instead of trying to display them inline.

    $ npm install
    $ node index.js

The content disposition header returns a mime field with a filename used to store the file locally by the browser:

    Content-Disposition: attachment;filename="INV12345678.pdf"
